<?php

use Phalcon\Mvc\Controller;
use Phalcon\Http\Response;

class IndexController extends Controller {

    public function indexAction() {
        return $this->response->redirect('/main.html');
    }
}
