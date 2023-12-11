#include <Arduino.h>
#include "webserver.hpp"


// Test program
void setup()
{
    Serial.begin(9600);
    initWiFi();
}

void loop() 
{
    Serial.println("Hello world!");
    delay(1000);
}
