#include "sse.hpp"


void SSEConnectEvent(AsyncEventSourceClient* client) 
{
    if(client->lastId()){
      Serial.printf("Client reconnected! Last message ID that it got is: %u\n", client->lastId());
    }
    client->send("Connected", NULL, millis(), 1000);
}

void SSEHandler(AsyncEventSource* eventSource, BoardCom::RX data) 
{  
    if (true)   // if (data.isReady)
    {
        DynamicJsonDocument jsonObj(1024);
        jsonObj["auth"]["last_login"] = data.lastLogin;
        jsonObj["gate_control"]["status"] = static_cast<int>(data.isGate_open);
        jsonObj["co2_meas"]["status"] = static_cast<int>(data.isCO2_ok);
        jsonObj["air_meas"]["status"] = static_cast<int>(data.isAir_ok);
        jsonObj["air_control"]["status"] = data.airControl;

        String jsonString;
        serializeJson(jsonObj, jsonString);
        eventSource->send(jsonString.c_str(), "data", millis());
    }
    else 
    {
        eventSource->send("notReady", "error", millis());
    }
}
