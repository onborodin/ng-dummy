<?php

use Phalcon\Mvc\Controller;

class ApiLoginController extends JsonRPCController {

    public function login($params) {
        $model = new User;
        $elem = $model->findFirst([
            "name = '$params->name' and password = '$params->password'",
            'columns' => 'id, name, gecos, superuser'
        ]);

        if ($elem->name) {
            $this->session->set('user', $elem);
            return [ $elem ];
        }
        return [];
    }

    public function logout($params) {
        $this->session->destroy();
    }
}
