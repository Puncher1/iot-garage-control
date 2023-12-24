#pragma once

#include "ESPAsyncWebServer.h"
#include "AsyncJson.h"
#include "ArduinoJson.h"

#include "boardCom.hpp"         // get data from there

using namespace std;

class Routes
{
    public:
        static void auth(AsyncWebServerRequest* request);
        static void gateControl(AsyncWebServerRequest* request);
        static void co2Meas(AsyncWebServerRequest* request);
        static void airMeas(AsyncWebServerRequest* request);
        static void airControl(AsyncWebServerRequest* request);
};
