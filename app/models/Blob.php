<?php

use Phalcon\Mvc\Model;

class Blob extends Model {

    public $id;
    public $thing_id;
    public $name;

    public function initialize() {
        $this->belongsTo("thingId", "Thing", "id");
    }
}
