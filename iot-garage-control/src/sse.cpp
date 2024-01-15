#include "sse.hpp"


int gateStatus = 0;
int airStatus = 5;

void setGateStatus(int status)
{   
    if (status == 3) 
    {
        gateStatus = 1;
    }
    else 
    {
        gateStatus = 0;
    }
}

void setAirStatus(int status) 
{
    airStatus = status;
}

void SSEConnectEvent(AsyncEventSourceClient* client) 
{
    if(client->lastId()){
      Serial.printf("Client reconnected! Last message ID that it got is: %u\n", client->lastId());
    }
    client->send("Connected", NULL, millis(), 1000);
}

void SSEHandler(AsyncEventSource* eventSource, BoardCom::RX data) 
{  
    if (true)
    {
        DynamicJsonDocument jsonObj(1024);
        jsonObj["auth"]["last_login"] = "10.10.3049";
        jsonObj["gate_control"]["status"] = gateStatus;
        jsonObj["co2_meas"]["status"] = 0;
        jsonObj["air_meas"]["status"] = 0;
        jsonObj["air_control"]["status"] = airStatus;

        String jsonString;
        serializeJson(jsonObj, jsonString);
        eventSource->send(jsonString.c_str(), "data", millis());
    }
}
