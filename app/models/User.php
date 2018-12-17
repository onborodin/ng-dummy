<?php

use Phalcon\Mvc\Model;

class User extends Model {

    public $id;
    public $name;
    public $password;
    public $gecos;
    public $superuser;

    public function initialize() {
        $this->setSource("user");
    }

    public function getSource() {
        return 'user';
    }

    public static function find($parameters = null) {
        return parent::find($parameters);
    }

    public static function findFirst($parameters = null) {
        return parent::findFirst($parameters);
    }

    public function columnMap() {
        return [
            'id' => 'id',
            'name' => 'name',
            'password' => 'password',
            'gecos' => 'gecos',
            'superuser' => 'superuser',
        ];
    }

}
