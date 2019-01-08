<?

$router->setDefaults([
    'controller' => 'index',
    'action'     => 'index'
]);

$router->add('/', [ 
    'controller' => 'index', 
    'action' => 'index'
]);

$router->add('/api/login', [
    'controller' => 'api-login',
    'action' => 'index'
]);

$router->add('/api/users', [
    'controller' => 'api-users',
    'action' => 'index'
]);

$router->add('/api/drivers', [
    'controller' => 'api-drivers',
    'action' => 'index'
]);

$router->add('/api/vehicles', [
    'controller' => 'api-vehicles',
    'action' => 'index'
]);


$router->add('/data/upload', [
    'controller' => 'data',
    'action' => 'upload'
]);

$router->add('/data/download/([0-9a-zA-Z.\-]+)', [
    'controller' => 'data',
    'action' => 'download',
    'name' => '1'
]);

$router->notFound([
    'controller' => 'index',
    'action' => 'index'
]);
