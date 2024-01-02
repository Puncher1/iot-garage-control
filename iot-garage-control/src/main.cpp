#include "Arduino.h"

#include "webserver.hpp"
#include "api.hpp"
#include "sse.hpp"


WebServer* server;
uint16_t eventWait_cyc = 1000;  // in ms
uint16_t eventWait_pv = 0;      // in ms

void initWebserver()
{
    IPAddress localIP(172, 20, 10, 2);
    server = new WebServer(localIP, 80);
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
    Serial.begin(9600);
    initWebserver();
}

void loop()
{
    if (eventWait_pv >= eventWait_cyc) {
        eventWait_pv = 0;
        SSEHandler(server->events);
    }
    else {
        eventWait_pv++;
    }
    delay(1);
}
