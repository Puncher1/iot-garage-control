#pragma once

#include "WiFi.h"
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"

using namespace std;
typedef void (* vAPIRequestFunction)(AsyncWebServerRequest* request);
typedef void (* vSSEEventFunction)(AsyncEventSourceClient* client);

class WebServer 
{
    public:
        WebServer(IPAddress serverIP, uint16_t serverPort);
        void serve(string uri, bool isDefault, string defaultFileName);
        void on(string route, vAPIRequestFunction func);   
        void sse(string route, vSSEEventFunction onConnectFunc);
        void begin();

        AsyncEventSource *events;

    private:
        void initWifi();
        void initSPIFFS();
        void initServer();

        const string apiBaseURL = "/api";
        IPAddress ip;
        uint16_t port;
        AsyncWebServer *_server;
};
