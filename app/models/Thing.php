<?php

use Phalcon\Mvc\Model;

class Thing extends Model {

    public $id;
    public $name;

    public function initialize() {
        $this->hasMany("id", "Blob", "thing_id");
    }
}
