#pragma once

#include <stdlib.h>
#include "ArduinoJson.h"
#include "ESPAsyncWebServer.h"
#include "boardCom.hpp"         // get data from there

using namespace std;

void SSEConnectEvent(AsyncEventSourceClient* client);
void SSEHandler(AsyncEventSource* eventSource, BoardCom::RX data);
