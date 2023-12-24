#include "api.hpp"


void Routes::auth(AsyncWebServerRequest* request)
{
    /*
    Response:
        lastLogin:  Date and time of last login as string   // TODO
        status:     0: Successful, 1: Failed
    */

    AsyncJsonResponse * response = new AsyncJsonResponse();
    JsonVariant& root = response->getRoot();

    root["lastLogin"] = "10.12.2023";   // TODO: maybe timestamp
    root["status"] = 0;

    response->setLength();
    request->send(response);
}
