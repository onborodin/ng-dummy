<?php

use Phalcon\Mvc\Controller;

class ApiLoginController extends JsonRPCController {

    public function rpcLogin($params) {
        $model = new Users;
        $elem = $model->findFirst([
            "name = '$params->name' and password = '$params->password'",
            'columns' => 'id, name, gecos, superuser'
        ]);

        if ($elem->name) {
            $this->session->set('user', $elem);
            return $elem;
        }
        return new stdClass();
    }

    public function rpcLogout($params) {
        $this->session->destroy();
    }
}
