<?php

use Phalcon\Mvc\Controller;
use Phalcon\Http\Response;

class DataController extends Controller {

    private $filePrefix = 'data';

    public function sendJson($data) {
        $this->view->disable();
        $this->response->setJsonContent($data);
        return $this->response;
    }

    public function indexAction() {
    }


    public function uploadAction() {
        if($this->request->hasFiles()) {
            $uploads = $this->request->getUploadedFiles();
        }

        $list = []; 

        foreach($uploads as $upload){
            switch($upload->getRealType()) {
                case "image/png":
                    $newExt = ".png";
                    break;
                case "image/jpeg":
                    $newExt = ".jpg";
                    break;
                case "text/x-shellscript":
                    $newExt = ".sh";
                    break;
                case "text/x-ruby":
                    $newExt = ".rb";
                    break;
                case "application/pdf":
                    $newExt = ".pdf";
                    break;
                case "application/javascript":
                    $newExt = ".js";
                    break;
                case "text/x-c":
                    $newExt = ".c";
                    break;
                case "text/html":
                    $newExt = ".html";
                    break;
                case "text/plain":
                    $newExt = ".txt";
                    break;
                case "application/postscript":
                    $newExt = ".ps";
                    break;
                case "video/mp4":
                    $newExt = ".mp4";
                    break;
                case "audio/ogg":
                    $newExt = ".ogg";
                    break;
                case "audio/mp3":
                    $newExt = ".mp3";
                    break;
                default:
                    $newExt = ".bin";
                    break;
            }

            $timestamp = date('Ymdhms');
            $uniqStr = md5(uniqid(rand() . $timestamp));
            $newName = $this->filePrefix .'-' .$timestamp . '-' . $uniqStr . $newExt;

            if ($newExt) {
                $dataDir = $this->config->application->dataDir;
                $newPath = $dataDir . '/' . $newName;
                $upload->moveTo($newPath);

                array_push($list, [
                    name => $newName,
                    size => filesize($newPath) 
                ]);
            }

        }

        return $this->sendJson([
            id => uniqid(),
            json => '2.0',
            result => $list
        ]);
    }

    public function downloadAction() {
        $name = $this->dispatcher->getParam('name');
        $dataDir = $this->config->application->dataDir;
        $path = $dataDir . '/' .$name; 
        $this->logger->debug("#get file $name");

        if (!file_exists($path)) {
            $this->response->setStatusCode(404, "Not Found");
            return $this->response->setContent("");
        }

        $pathInfo = pathinfo($path);
        $extension = $pathInfo['extension'];
        switch($extension) {
            case "png":
                $mime = "image/png";
                break;
            case "jpg":
                $mime = "image/jpeg";
                break;
            case "sh":
                $mime = "text/x-shellscript";
                break;
            case "rb":
                $mime = "text/x-ruby";
                break;
            case "pdf":
                $mime = "application/pdf";
                break;
            case "js":
                $mime = "application/javascript";
                break;
            case "c":
                $mime = "text/x-c";
                break;
            case "html":
                $mime = "text/html";
                break;
            case "txt":
                $mime = "text/plain";
                break;
            case "ps":
                $mime = "application/postscript";
                break;
            default:
                $mime = "xxxapplication/octet-stream";
                break;
        }

        $downloadName = "document.". $extension;
        $this->response->setContentLength(filesize($path));
        $this->response->setLastModified(new DateTime(date("D, d M Y H:i:s", filemtime($path))));
        $this->response->setFileToSend($path, $downloadName);
        $this->response->setContentType($mime);

    }

}
