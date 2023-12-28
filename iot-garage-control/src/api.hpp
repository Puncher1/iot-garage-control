#pragma once

#include "ESPAsyncWebServer.h"
#include "boardCom.hpp"         // set data there


using namespace std;

class Routes
{
    public:
        static void gateControl(AsyncWebServerRequest* request);
        static void airControl(AsyncWebServerRequest* request);
};
