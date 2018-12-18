<?php

use Phalcon\Mvc\Controller;

class ApiDummyController extends JsonRPCController {

    public function list($params) {
        return [];
    }

    public function create($params) {
        return true;
    }

    public function update($params) {
        return true;
    }

    public function drop($params) {
        return true;
    }
}
