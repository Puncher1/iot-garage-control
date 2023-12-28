#include "sse.hpp"


void SSEConnectEvent(AsyncEventSourceClient* client) 
{
    if(client->lastId()){
      Serial.printf("Client reconnected! Last message ID that it gat is: %u\n", client->lastId());
    }
    client->send("Connected", NULL, millis(), 1000);
}

void SSEHandler(AsyncEventSource* eventSource) 
{
    DynamicJsonDocument doc(1024);
    JsonObject obj = doc.as<JsonObject>();

    obj["auth"]["last_login"] = "10.12.23";
    obj["auth"]["status"] = 0;
    obj["gate_control"]["status"] = 1;
    obj["co2_meas"]["status"] = 0;
    obj["air_meas"]["status"] = 1;
    obj["air_control"]["status"] = 3;

    String jsonString;
    serializeJson(doc, jsonString);
    eventSource->send(jsonString.c_str(), "data", millis());
}
