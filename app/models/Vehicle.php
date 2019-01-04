<?php

use Phalcon\Mvc\Model;

use Connection;

class Vehicle extends Model {
    public $id;
    public $name;

    public function initialize() {
        $this->hasMany(
            'id',
            'Connection',
            'vehicleId'
        );
    }

}
