#include <WiFi.h>

const char* ssid = "iPhone 12 Pro";
const char* password = "1234gggg";

WiFiServer server(80);

void initWiFi()
{
    Serial.println("Connecting to ");
    Serial.println(ssid);
 
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED){}

    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}


