#include "webserver.hpp"
#include "api.hpp"

// use defines for char array and String compability
#define SSID            "iPhone 12 Pro"
#define PASSWORD        "1234gggg"          // :')
#define MAIN_HTML       "index.html"

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
    if (!SPIFFS.begin())
    { 
        // Serial.println("An Error has occurred while mounting SPIFFS");
        return;
    }
}

void WebServer::initWifi()
{
    if (!WiFi.config(ip, gateway, subnet))
    {
        Serial.println("WiFi Config failed");
    }

    Serial.println("Connecting...");
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED){}
    Serial.println("Connected");
}

void WebServer::initServer()
{
    _server = new AsyncWebServer(port);
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Methods", "GET, POST, PUT");
    DefaultHeaders::Instance().addHeader("Access-Control-Allow-Headers", "Content-Type");

    _server->onNotFound([](AsyncWebServerRequest *request) 
    { 
        if (request->method() == HTTP_OPTIONS) 
        {
            request->send(200);
        } 
        else 
        {
            request->send(404, "application/json", "{\"message\":\"Not found\"}");
        }
    });
}

void WebServer::serve(string uri, bool isDefault, string defaultFileName)
{
    AsyncStaticWebHandler *handler = new AsyncStaticWebHandler(uri.c_str(), SPIFFS, "/", NULL);
    if (isDefault)
    {
        handler->setDefaultFile(defaultFileName.c_str());
    }
    _server->addHandler(handler);
}

void WebServer::on(string route, WebRequestMethod method, vAPIRequestFunction func)
{
    _server->on((apiBaseURL + route).c_str(), method, func);
}

void WebServer::sse(string route, vSSEEventFunction onConnectFunc) 
{
    events = new AsyncEventSource((sseBaseURL + route).c_str());
    events->onConnect(onConnectFunc);
    _server->addHandler(events);
}

void WebServer::begin()
{
    _server->begin();
}
