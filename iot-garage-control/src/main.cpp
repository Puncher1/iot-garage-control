#include <Arduino.h>
#include "webserver.hpp"
#include "api.hpp"


void initServer()
{
    IPAddress localIP(172, 20, 10, 2);
    WebServer server = WebServer(localIP, 80);
    // Website serving
    server.serve("/", true, "index.html");

    // API
    server.on("/auth", HTTP_GET, (vRequestFunction)Routes::auth);

    server.begin();
}

void setup()
{
    Serial.begin(9600);

    initServer();    
}

void loop() 
{
    Serial.println("Hello world!");
    delay(1000);
}
