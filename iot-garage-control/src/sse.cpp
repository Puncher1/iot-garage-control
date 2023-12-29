#include "sse.hpp"


void SSEConnectEvent(AsyncEventSourceClient* client) 
{
    if(client->lastId()){
      Serial.printf("Client reconnected! Last message ID that it got is: %u\n", client->lastId());
    }
    client->send("Connected", NULL, millis(), 1000);
}

void SSEHandler(AsyncEventSource* eventSource) 
{  
    DynamicJsonDocument jsonObj(1024);
    jsonObj["auth"]["last_login"] = "10.12.23";
    jsonObj["auth"]["status"] = 0;
    jsonObj["gate_control"]["status"] = 1;
    jsonObj["co2_meas"]["status"] = 0;
    jsonObj["air_meas"]["status"] = 1;
    jsonObj["air_control"]["status"] = 3;

    String jsonString;
    serializeJson(jsonObj, jsonString);
    
    eventSource->send(jsonString.c_str(), "data", millis());
}
