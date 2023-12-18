#include "webserver.hpp"
#include <WiFi.h>
#include "ESPAsyncWebServer.h"
#include "SPIFFS.h"

const String SSID = "iPhone 12 Pro";
const String PASSWORD = "1234gggg";

AsyncWebServer server(80);
// IPAddress local_IP(192, 168, 1, 184);
// IPAddress gateway(172, 20, 10, 1);
// IPAddress subnet(255, 255, 255, 240);

void initWiFi()
{   
    if(!SPIFFS.begin()){
        Serial.println("An Error has occurred while mounting SPIFFS");
        return;
    }

    File file = SPIFFS.open("/index.html");
    if(!file){
        Serial.println("Failed to open file for reading");
        return;
    }
    
    Serial.println("File Content:");
    while(file.available()){
        Serial.write(file.read());
    }
    file.close();

    // if (!WiFi.config(local_IP, gateway, subnet)) {
    //     Serial.println("WiFi Config failed");
    // }

    Serial.println("Connecting to ");
    Serial.println(SSID);
 
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED){}

    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    server.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");
    server.serveStatic("/assets/", SPIFFS, "/");

    server.begin();
}


