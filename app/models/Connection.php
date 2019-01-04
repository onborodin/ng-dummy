<?php

use Phalcon\Mvc\Model;

class Connection extends Model {

    public $id;
    public $driver_id;
    public $vehicle_id;

    public function initialize() {
        $this->belongsTo('driver_id', 'Driver', 'id' );
        $this->belongsTo('vehicle_id', 'Vehicle', 'id');
    }

    public function columnMap() {
        return [
            'id' => 'id',
            'driver_id' => 'driverId',
            'vehicle_id' => 'vehicleId',
        ];
    }

}
