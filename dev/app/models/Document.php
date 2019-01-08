<?php

use Phalcon\Mvc\Model;

use Connection;
use Vehicle;

class Document extends Model {

    public $id;
    public $name;

    public function initialize() {
        $this->setSource('documents');
    }

    public function columnMap() {
        return [
            'id' => 'id',
            'name' => 'name',
        ];
    }



}
