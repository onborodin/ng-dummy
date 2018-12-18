<?php

use Phalcon\Mvc\Controller;

class ApiUsersController extends JsonRPCController {

    public function list($params) {
        $model = new User;
        $result = User::find();
        $this->logger->info("#user data list session.username=" . $this->sessionData->name);
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
        $this->logger->info("#user data create username=".$params->name." session.username=" . $this->sessionData->name);
        return $result;
    }

    public function update($params) {
        $model = new User;
        $model = $model->findFirst($params->$id);
        $model->name = $params->name;
        $model->gecos = $params->gecos;
        $model->password = $params->password;
        $result = $model->update();
        $this->logger->info("#user data update username=".$params->name." session.username=" . $this->sessionData->name);
        return $result;
    }

    public function drop($params) {
        $model = new User;
        $elem = $model->findFirst($params->$id);
        if ($elem->name) {
            $result = $elem->delete();
            $this->logger->info("#user data drop username=".$params->name." session.username=" . $this->sessionData->name);
            return $result;
        }
        return false;
    }
}
