#pragma once

#include "ArduinoJson.h"
#include "ESPAsyncWebServer.h"
#include "boardCom.hpp"         // get data from there


void SSEConnectEvent(AsyncEventSourceClient* client);
void SSEHandler(AsyncEventSource* eventSource);
