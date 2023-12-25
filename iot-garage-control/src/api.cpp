#include <stdlib.h>
#include "api.hpp"


void Routes::auth(AsyncWebServerRequest *request)
{
    /*
    GET Response:
        lastLogin:  Date and time of last login as string   // TODO
        status:     0: Successful, 1: Failed
    */

    if (request->method() == HTTP_GET)
    {
        AsyncJsonResponse *response = new AsyncJsonResponse();
        JsonVariant &root = response->getRoot();

        root["lastLogin"] = "10.12.2023";   // TODO: maybe timestamp
        root["status"] = 0;

        response->setLength();
        request->send(response);
    }
    else
    {
        request->send(405);
    }
}

void Routes::gateControl(AsyncWebServerRequest *request)
{
    /*
    GET Response:
        status:     0: Successful, 1: Closed, 2: Paused
    POST Params:
        status:     0: Successful, 1: Closed, 2: Paused
    */

    if (request->method() == HTTP_GET)
    {
        AsyncJsonResponse *response = new AsyncJsonResponse();
        JsonVariant &root = response->getRoot();

        root["status"] = 1;

        response->setLength();
        request->send(response);
    }
    else if (request->method() == HTTP_POST)
    {
        // TODO: Handle data + update state
        request->send(200);
    }
    else
    {
        request->send(405);     // Error 405: Not Allowed
    }
}

void Routes::co2Meas(AsyncWebServerRequest *request)
{
    /*
    GET Response:
        status:     0: Good, 1: Bad
    */

    if (request->method() == HTTP_GET)
    {
        AsyncJsonResponse *response = new AsyncJsonResponse();
        JsonVariant &root = response->getRoot();

        root["status"] = 0;

        response->setLength();
        request->send(response);
    }
    else
    {
        request->send(405);
    }
}

void Routes::airMeas(AsyncWebServerRequest *request)
{
    /*
    GET Response:
        status:     0: Good, 1: Bad
    */

    if (request->method() == HTTP_GET)
    {
        AsyncJsonResponse *response = new AsyncJsonResponse();
        JsonVariant &root = response->getRoot();

        root["status"] = 1;

        response->setLength();
        request->send(response);
    }
    else
    {
        request->send(405);
    }
}

void Routes::airControl(AsyncWebServerRequest *request)
{
    /*
    GET Response:
        status:     0: 0%, 1: 25%, 2: 50%, 3: 75%, 4: 100%
    POST Params:
        status:     0: 0%, 1: 25%, 2: 50%, 3: 75%, 4: 100%
    */
    if (request->method() == HTTP_GET)
    {
        AsyncJsonResponse *response = new AsyncJsonResponse();
        JsonVariant &root = response->getRoot();

        root["status"] = 3;

        response->setLength();
        request->send(response);
    }

    else if (request->method() == HTTP_POST)
    {
        // TODO: Handle data + update state -> only allowed if manual control (air is ok)
        request->send(200);
    }
    else
    {
        request->send(405); // Error 405: Not Allowed
    }
}