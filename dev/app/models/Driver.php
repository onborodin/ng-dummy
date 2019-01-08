<?php

use Phalcon\Mvc\Model;

use Connection;
use Vehicle;

class Driver extends Model {

    public $id;
    public $name;

    public function initialize() {
        $this->setSource('drivers');
        $this->hasManyToMany(
            'id',
            'Connection',
            'driverId',
            'vehicleId',
            'Vehicle',
            'id'
        );
    }

    public function columnMap() {
        return [
            'id' => 'id',
            'name' => 'name',
        ];
    }



}
