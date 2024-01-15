#include "Arduino.h"

#include "webserver.hpp"
#include "api.hpp"
#include "sse.hpp"

#include "boardCom.hpp"

WebServer* server;
uint16_t eventWait_cyc = 1000;  // in ms
uint16_t eventWait_pv = 0;      // in ms
BoardCom* boardCom;


void initWebserver()
{
    server = new WebServer(IPAddress(172, 20, 10, 2), 80);
    // Website serving
    server->serve("/", true, "index.html");
    // API
    server->on("/gate-control", HTTP_POST, Routes::gateControl);
    server->on("/air-control", HTTP_POST, Routes::airControl);
    // Server-Sent Events
    server->sse("/data", SSEConnectEvent);

    server->begin();
}

void setup()
{
    initWebserver();
    boardCom = new BoardCom();
}

void loop()
{
    if (eventWait_pv >= eventWait_cyc) {
        eventWait_pv = 0;
        SSEHandler(server->events, boardCom.lastPackage);
    }
    else {
        eventWait_pv++;
    }
    delay(1);
}
