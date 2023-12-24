#pragma once

#include <WiFi.h>
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"

using namespace std;
typedef void (* vRequestFunction)(AsyncWebServerRequest* request);

class WebServer 
{
    public:
        WebServer(IPAddress serverIP, uint16_t serverPort);
        void serve(string uri, bool isDefault, string defaultFileName);
        void on(string route, vRequestFunction func);   
        void begin();
    
    private:
        void initWifi();
        void initSPIFFS();
        void initServer();

        const string apiBaseURL = "/api";
        IPAddress ip;
        uint16_t port;
        AsyncWebServer *_server;
};
