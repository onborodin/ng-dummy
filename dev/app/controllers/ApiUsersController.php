<?php

use Phalcon\Mvc\Controller;

class ApiUsersController extends JsonRPCController {

    public function rpcList($params) {
        $model = new User;
        $result = $model->find([ 'order' => 'name' ]);
        return $result;
    }

    public function rpcCreate($params) {
        $model = new User;

        $elem = $model->findFirst("name = '$params->name'");
        if ($elem->name) {
            return $elem;
        }
        $model->name = $params->name;
        $model->gecos = $params->gecos;
        $model->password = $params->password;
        $model->superuser = $params->superuser;

        $result = $model->save();
        return $result;
    }

    public function rpcUpdate($params) {
        $model = new User;

        $elem = $model->findFirst("id = '$params->id'");

        if ($elem->name !== $params->name) {
            $alter = $model->findFirst("name = '$params->name'");
            if ($alter->name) {
                return 0;
            }
        }

        $elem->name = $params->name;
        $elem->gecos = $params->gecos;
        $elem->password = $params->password;
        $elem->superuser = $params->superuser;

        $result = $elem->update();

        return $result;
    }

    public function rpcDrop($params) {
        $model = new User;
        $elem = $model->findFirst("id = '$params->id'");
        if ($elem->name) {
            $result = $elem->delete();
            return $result;
        }
        return 0;
    }
}
