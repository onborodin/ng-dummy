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
            $this->logger->info("#login successeful userName=$params->name");
            $this->session->set('user', $elem);
            return [ $elem ];
        }
        $this->logger->info("#login incorrect userName=$params->name");
        return [];
    }

    public function logout($params) {
        $this->session->destroy();
    }
}
