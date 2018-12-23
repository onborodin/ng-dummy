<?php

use Phalcon\Mvc\Controller;

class ApiThingsController extends JsonRPCController {

    public function rpcList($params) {
        $model = new Thing;
        $list = $model->find([ 'order' => 'name' ]);

        $result = [];
        foreach ($list as $elem) {
            $data = $elem->toArray();
            $data[blob] = $elem->blob->toArray();
            $data[count_blob] = $elem->countBlob();
            array_push($result, $data);
        }
        return $result;
    }

    public function rpcGet($params) {

        $model = new Thing;
        $elem = $model->findFirst($params->id);

        $result = $elem->toArray();
        $result[blob] = $elem->blob->toArray();;
        $result[count_blob] = $elem->countBlob();

        return $result;
    }

    public function rpcBlob($params) {
        $id = $params->id;
        $model = new Thing;
        $elem = $model->findFirst($id);
        $result = $elem->getBlob();
        return $result;
    }

    public function rpcCreate($params) {
        $model = new Thing;

        $elem = $model->findFirst("name = '$params->name'");
        if ($elem->name) {
            return $elem;
        }
        $model->name = $params->name;

        $result = $model->create();
        return $result;
    }

    public function rpcUpdate($params) {
        $model = new Thing;
        $elem = $model->findFirst($params->id);

        if ($elem->name !== $params->name) {
            $alter = $model->findFirst("name = '$params->name'");
            if ($alter->name) {
                return 0;
            }
        }
        $elem->name = $params->name;
        $result = $elem->save();

        return $result;
    }

    public function rpcDrop($params) {
        $model = new Thing;
        $elem = $model->findFirst($params->id);
        if ($elem->name) {
            $result = $elem->delete();
            return $result;
        }
        return 0;
    }
}
