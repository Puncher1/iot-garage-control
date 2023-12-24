#include "webserver.hpp"
#include "api.hpp"


// use defines for char array and String compability
#define SSID                "iPhone 12 Pro"
#define PASSWORD            "1234gggg"        // :') 
#define MAIN_HTML           "index.html"

IPAddress gateway(172, 20, 10, 1);
IPAddress subnet(255, 255, 255, 240);

WebServer::WebServer(IPAddress serverIP, uint16_t serverPort) 
{
    ip = serverIP;
    port = serverPort;

    initSPIFFS();
    initWifi();
    initServer();
}

void WebServer::initSPIFFS()
{
    if(!SPIFFS.begin()){/* Serial.println("An Error has occurred while mounting SPIFFS"); */ return;}
}

void WebServer::initWifi()
{   
    if (!WiFi.config(ip, gateway, subnet)) {Serial.println("WiFi Config failed");}

    Serial.println("Connecting...");
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED){}
    Serial.println("Connected");
}

void WebServer::initServer()
{
    _server = new AsyncWebServer(port);
    _server->onNotFound([](AsyncWebServerRequest *request) {
        request->send(404);
    });
}

void WebServer::serve(string uri, bool isDefault, string defaultFileName)
{
    AsyncStaticWebHandler* handler = new AsyncStaticWebHandler(uri.c_str(), SPIFFS, "/", NULL);
    if (isDefault)
    {
        handler->setDefaultFile(defaultFileName.c_str());
    }
    _server->addHandler(handler);
}

void WebServer::on(string route, vRequestFunction func)
{
    _server->on((apiBaseURL + route).c_str(), HTTP_ANY, func);
}

void WebServer::begin()
{
    _server->begin();
}


