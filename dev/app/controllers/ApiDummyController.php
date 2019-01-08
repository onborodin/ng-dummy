<?php

use Phalcon\Mvc\Controller;

class ApiDummyController extends JsonRPCController {

    public function rcpList($params) {
        return [];
    }

    public function rcpCreate($params) {
        return true;
    }

    public function rcpUpdate($params) {
        return true;
    }

    public function rcpDrop($params) {
        return true;
    }

    public function rcpGet($params) {
        return true;
    }

}
