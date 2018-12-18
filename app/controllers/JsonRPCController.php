<?php

use Phalcon\Mvc\Controller;

class JsonRPCController extends Controller {

    public $invalidRequest = [
        jsonrpc => "2.0",
        error => [
            code => -32600,
            message => "Invalid Request"
        ],
        id => null
    ];

    public $parseError = [
        jsonrpc=> "2.0",
        error=> [
            code=> -32700,
            message=> "Parse error"
        ],
        id=> null
    ];

    public $methodNotFound = [
        jsonrpc=> "2.0",
        error=> [
            code=> -32601,
            message=> "Method not found"
        ],
        id=> 1
    ];

    public $internalError = [
        jsonrpc=> "2.0",
        error=> [
            code=> -32603,
            message=> "Internal error"
        ],
        id=> 0
    ];


    public function getJson() {
        return json_decode($this->request->getRawBody());
    }

    public function sendJson($data) {
        $this->view->disable();
        $this->response->setJsonContent($data);
        return $this->response;
    }

    public function indexAction() {
        $req = $this->getJson();

        $method = $req->method;
        $params = $req->params;
        $id = $req->id;

        if (!$method) {
            return $this->sendJson($this->invalidRequest);
        }

        if (!$id) {
            return $this->sendJson($this->invalidRequest);
        }

        if (!$params) {
            return $this->sendJson($this->invalidRequest);
        }

        //$this->logger->debug(var_export($req, true));

        if (method_exists($this, $method)) {
            $result = $this->$method($params);
        } else {
            return $this->sendJson($this->methodNotFound);
        }

        //$this->logger->debug(var_export([ result => $result ], true));


        return $this->sendJson([
            id => $id,
            json => '2.0',
            result => $result
        ]);
    }

}
