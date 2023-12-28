#include <stdlib.h>
#include "api.hpp"


void Routes::gateControl(AsyncWebServerRequest *request)
{
    /*
    POST Params:
        status:     0: Successful, 1: Closed, 2: Paused
    */

    if (request->method() == HTTP_POST)
    {
        // TODO: Handle data + update state
        request->send(200);
    }
    else
    {
        request->send(405);     // Error 405: Not Allowed
    }
}

void Routes::airControl(AsyncWebServerRequest *request)
{
    /*
    POST Params:
        status:     0: 0%, 1: 25%, 2: 50%, 3: 75%, 4: 100%
    */
    if (request->method() == HTTP_POST)
    {
        // TODO: Handle data + update state -> only allowed if manual control (air is ok)
        request->send(200);
    }
    else
    {
        request->send(405); // Error 405: Not Allowed
    }
}