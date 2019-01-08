<?php

use Phalcon\Di;
use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Manager as ModelsManager;
use Phalcon\Db\Adapter\Pdo\Sqlite as Connection;
use Phalcon\Mvc\Model\Metadata\Memory as MetaData;

$di = new Di();

$di->set(
    'db', new Connection([ 'dbname' => 'sample.db' ])
);

$di->set('modelsManager', new ModelsManager());
$di->set('modelsMetadata', new MetaData());

class Robot extends Model {
    public $id;
    public $name;
};

$robot = new Robot;
$robot->name = 'Ivo';
$robot->save();

print $robot->count() . "\n";

