#include "sse.hpp"


int gateStatus = 1;     // 0: open, 1: paused, 2: closed
int airStatus = 3;      // 0: 0%, 1: 25%, 2: 50%, 3: 75%, 4: 100%


void setGateStatus(int status) {
    gateStatus = status;
}

void setAirStatus(int status) {
    airStatus = status;
}

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
    jsonObj["gate_control"]["status"] = gateStatus;
    jsonObj["co2_meas"]["status"] = 0;
    jsonObj["air_meas"]["status"] = 1;
    jsonObj["air_control"]["status"] = airStatus;

    String jsonString;
    serializeJson(jsonObj, jsonString);
    
    eventSource->send(jsonString.c_str(), "data", millis());
}
