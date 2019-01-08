<?php

use Phalcon\Mvc\Controller;

//use Connection;

class ApiDriversController extends JsonRPCController {

    public function rpcList($params) {
        $model = new Driver;
        $drivers = $model->find([ 'order' => 'name' ]);

        $arr = [];
        foreach ($drivers as $driver) {
            $d[id] = $driver->id;
            $d[name] = $driver->name;
            $v = [];
                foreach($driver->vehicle as $vehicle) {
                    $v[id] = $vehicle->id;
                    $v[name] = $vehicle->name;
                }
            $d[vehicle] = $v;
            $d[vehicle_count] = count($v);
            $arr[] = $d;
        }
        return $arr;
    }

    public function rpcCreate($params) {
        $model = new Driver;

        $elem = $model->findFirst("name = '$params->name'");
        if ($elem->name) {
            return $elem;
        }
        $model->name = $params->name;

        $result = $model->save();
        return $result;
    }

    public function rpcUpdate($params) {
        $model = new Driver;

        $elem = $model->findFirst("id = '$params->id'");

        if ($elem->name !== $params->name) {
            $alter = $model->findFirst("name = '$params->name'");
            if ($alter->name) {
                return 0;
            }
        }

        $elem->name = $params->name;
        $result = $elem->update();

        return $result;
    }

    public function rpcDrop($params) {
        $model = new Driver;
        $elem = $model->findFirst("id = '$params->id'");
        if ($elem->name) {
            $result = $elem->delete();
            return $result;
        }
        return 0;
    }
}
