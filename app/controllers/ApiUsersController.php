<?php

use Phalcon\Mvc\Controller;

class ApiUsersController extends JsonRPCController {

    public function list($params) {
        $model = new User;
        $result = User::find();
        return $result;
    }

    public function create($params) {
        $model = new User;
        $elem = $model->findFirst("name = '$params->name'");
        if ($elem->name) {
            return $elem;
        }
        $model->name = $params->name;
        $model->gecos = $params->gecos;
        $model->password = $params->password;
        $model->superuser = $params->superuser;
        $result = $model->create();
        return $result;
    }

    public function update($params) {
        $model = new User;
        $model = $model->findFirst($params->$id);
        $model->name = $params->name;
        $model->gecos = $params->gecos;
        $model->password = $params->password;
        $result = $model->update();
        return $result;
    }

    public function drop($params) {
        $model = new User;
        $elem = $model->findFirst($params->$id);
        if ($elem->name) {
            $result = $elem->delete();
            return $result;
        }
        return false;
    }
}
