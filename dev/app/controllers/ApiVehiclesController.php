<?php

use Phalcon\Mvc\Controller;

class ApiVehiclesController extends JsonRPCController {

    public function rpcList($params) {
        $model = new Vehicle;
        $result = $model->find([ 'order' => 'name' ]);
        return $result;
    }

    public function rpcCreate($params) {
        $model = new Vehicle;

        $elem = $model->findFirst("name = '$params->name'");
        if ($elem->name) {
            return $elem;
        }

        $model->name = $params->name;
        $result = $model->create();
        return $result;
    }

    public function rpcUpdate($params) {
        $model = new Vehicle;

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
        $model = new Vehicle;
        $elem = $model->findFirst("id = '$params->id'");
        if ($elem->name) {
            $result = $elem->delete();
            return $result;
        }
        return 0;
    }
}
