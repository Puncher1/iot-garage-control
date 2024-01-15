#pragma once

#include <stdlib.h>
#include "ArduinoJson.h"
#include "ESPAsyncWebServer.h"
#include "boardCom.hpp"         // get data from there

using namespace std;

void setGateStatus(int status);
void setAirStatus(int status);
void SSEConnectEvent(AsyncEventSourceClient* client);
void SSEHandler(AsyncEventSource* eventSource, BoardCom::RX* data);
