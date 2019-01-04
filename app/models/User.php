<?php

use Phalcon\Mvc\Model;

class User extends Model {
    public $id;
    public $name;
    public $password;
    public $gecos;
    public $superuser;
}
