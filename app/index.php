<?php

use Phalcon\DI;
use Phalcon\Loader;
use Phalcon\Di\FactoryDefault;


use Phalcon\Mvc\Url as UrlProvider;

use Phalcon\Mvc\Router;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Mvc\View;

use Phalcon\Http\Response;
use Phalcon\Http\Request;

use Phalcon\Db\Adapter\Pdo\Postgresql as DbAdapter;

use Phalcon\Mvc\Application as Application;
use Phalcon\Mvc\Model\Metadata\Memory as MemoryMetadata;
use Phalcon\Mvc\Model\Manager as ModelsManager;

use Phalcon\Cache\Backend\File as BackFile;
use Phalcon\Cache\Frontend\Data as FrontData;

use Phalcon\Http\Response\Cookies;

use Phalcon\Session\Adapter\Files as SessionAdapter;
use Phalcon\Crypt;
use Phalcon\Security;
use Phalcon\Config;
use Phalcon\Config\Adapter\Ini as ConfigAdapter;


use Phalcon\Mvc\Dispatcher as MvcDispatcher;
use Phalcon\Events\Event;
use Phalcon\Events\Manager as EventsManager;

use Phalcon\Logger;
use Phalcon\Logger\Adapter\File as LogFileAdapter;
use Phalcon\Logger\Formatter\Line as logFormatter;

class MyApplication extends Application {

    protected function registerServices() {

        $di = new FactoryDefault();
        $this->setDI($di);

        $this->di->setShared('config',
            function () {
                $filename = realpath(dirname(__FILE__) . '/../app/config/config.ini');
                $config = new ConfigAdapter($filename);

                foreach ($config->application as $key => $value) {
                    $config->application[$key] = realpath(dirname(__FILE__)) . '/../' . $value;
                }
                foreach ($config->application as $key => $value) {
                    $config->application[$key] = realpath($value);
                }
                return $config;
            }
        );

        $_config = $this->config;

        $this->di->set('logger',
            function () use ($_config){
                $logger = new LogFileAdapter($_config->application->logPath);
                $logFormatter = new LogFormatter;
                $logFormatter->setFormat('%date% %type% %message%');
                $logFormatter->setDateFormat('Y:m:d H:i:sT');
                $logger->setFormatter($logFormatter);
                return $logger;
        });

        $cacheDir = $this->config->application->cacheDir;
        $this->di->set('viewCache',
            function () use ($cacheDir) {
                $frontCache = new FrontData([ 
                        'lifetime' => 172800 
                ]);

                $cache = new BackFile(
                        $frontCache, [
                        'cacheDir' => $cacheDir,
                ]);
                return $cache;
            }
        );

        $this->di->set('crypt',
            function() {
                $crypt = new Crypt();
                $crypt->setCipher('aes-256-ctr');
                $key = "thesuperkey";
                $crypt->setKey($key);
                return $crypt;
            }
        );

        $this->di->set('cookies',
            function () {
                $cookies1 = new Cookies();
                $cookies->useEncryption(true);
                return $cookies;
            }, true
        );

        $this->di->setShared('session',
            function () {
                $session = new SessionAdapter([
                    'uniqueId' => 'session',
                    'persistent' => false,
                    'lifetime'   => 600
                ]);
                session_name('session');
                $session->start();
                return $session;
            }
        );

        $this->di->set('security',
            function () {
                $security = new Security();
                $security->setWorkFactor(12);
                return $security;
            },
            true
        );

        $this->di->setShared("router", 
            function () {
                $router = new Router(false);
                $router->removeExtraSlashes(true);

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

                $router->notFound([
                        'controller' => 'index',
                        'action' => 'index'
                ]);

                return $router;
        });

        $this->di->set('url',
            function () {
                $url = new UrlProvider();
                $url->setBaseUri('/');
                return $url;
            }
        );

        $this->di->setShared("view",
            function () use ($_config) {
                $view = new View();
                $view->setViewsDir($_config->application->viewsDir);
                return $view;
            }
        );


        $this->di->set("db",
            function () use ($_config) {
                return new DbAdapter([
                    'host' => $_config->database->host,
                    'username' => $_config->database->username,
                    'password' => $_config->database->password,
                    'dbname' => $_config->database->dbname,
                ]);
            }
        );

    }

    protected function registerAutoloaders() {
        $loader = new Loader();

        $controllersDir = $this->config->application->controllersDir;
        $modelsDir = $this->config->application->modelsDir;
        $pluginsDir = $this->config->application->pluginsDir;
        $utilsDir = $this->config->application->utilsDir;


        $loader->registerDirs([
                $controllersDir,
                $modelsDir,
                $pluginsDir,
                $utilsDir
        ]);
        $loader->register();
    }

    public function registerDispatchService() {

        $this->di->set('dispatcher',
                function () {
                    $eventsManager = new EventsManager();

                    //$eventsManager->attach('dispatch',
                    //    function (Event $event, $dispatcher) {
                    //        // ...
                    //    }
                    //);

                    $eventsManager->attach('dispatch:beforeExecuteRoute', new SecurityPlugin);

                    $dispatcher = new MvcDispatcher();
                    $dispatcher->setEventsManager($eventsManager);
                    return $dispatcher;
                },
                true
        );
    }

    public function main() {
        $this->registerServices();
        $this->registerAutoloaders();
        $this->registerDispatchService();

        $response = $this->handle();
        $response->send();
    }
}

try {
    $app = new MyApplication();
    //$app->useImplicitView(false); // Disable automatic rendering
    $app->main();

} catch (\Exception $e) {
    $response = new Response();
    $response->setContentType('text/html', 'UTF-8');
    $response->setStatusCode(404);
    $response->setContent("<html><body><pre>Exeption: " . $e->getMessage() . "</pre></body></html>");
    $response->send();
}
#EOF
