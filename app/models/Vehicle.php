<?php

use Phalcon\Mvc\Model;

use Connection;

class Vehicle extends Model {
    public $id;
    public $name;

    public function initialize() {
        $this->setSource('vehicles');
        $this->hasMany(
            'id',
            'Connection',
            'vehicleId'
        );
    }

    public function getSequenceName() {
        return "vehicles_id_seq";
    }

}
