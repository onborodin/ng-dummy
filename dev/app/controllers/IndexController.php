<?php

use Phalcon\Mvc\Controller;
use Phalcon\Http\Response;

class IndexController extends Controller {

    public function indexAction() {
        $index = file_get_contents($this->config->application->publicDir . '/main.html');
        return $this->response->setContent($index);
    }
}
