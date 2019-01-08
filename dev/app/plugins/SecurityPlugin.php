<?php

use Phalcon\Acl;
use Phalcon\Acl\Role;
use Phalcon\Acl\Resource;
use Phalcon\Events\Event;
use Phalcon\Mvc\User\Plugin;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Acl\Adapter\Memory as AclList;

class SecurityPlugin extends Plugin {

    public function beforeExecuteRoute(Event $event, Dispatcher $dispatcher) {

        $controller = $dispatcher->getControllerName();
        $action = $dispatcher->getActionName();

        //$this->logger->debug("#call controller=$controller action=$action");

        $sessionData = $this->session->get('user');
        //$this->logger->debug("sessionData=$sessionData->superuser");

        //if ($controller == 'api-users' && !$sessionData->superuser ) {
        //    $dispatcher->forward([
        //        'controller' => 'api-dummy',
        //        'action'     => $action
        //    ]);
        //    return false;
        //}
        return true;
    }
}
