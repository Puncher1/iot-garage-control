#include <stdlib.h>
#include "api.hpp"
#include "sse.hpp"


boolean handleGateStatus(String value) {
    if (value == "0" || value == "1" || value == "2") {
        setGateStatus(value.toInt());
        return true;
    }
    return false;
}

boolean handleAirStatus(String value) {
    if (value == "0" || value == "1" || value == "2" || value == "3" || value == "4") {
        setAirStatus(value.toInt());
        return true;
    }
    return false;
}

void Routes::gateControl(AsyncWebServerRequest *request)
{
    /*
    POST Params:
        status:     0: Successful, 1: Paused, 2: Closed
    */

    if (request->hasParam("status", true))
    {
        int params = request->params();
        for (int i = 0; i < params; i++)
        {
            AsyncWebParameter* p = request->getParam(i);
            if (p->name() == "status") 
            {
                boolean isOK = handleGateStatus(p->value());
                if (isOK)
                {
                    request->send(200);     // OK
                    return;
                }
                else
                {
                    request->send(400, "application/json", "{\"message\":\"'status' must be one of 0, 1, 2\"}");     // Bad Request
                    return;
                }
            }

        }
        request->send(500);     // Internal Server Error
        return;
    }
    else
    {
        request->send(400, "application/json", "{\"message\":\"'status' is a required parameter that is missing\"}");     // Bad Request
        return;
    }

    request->send(500);     // Internal Server Error
    return;
}

void Routes::airControl(AsyncWebServerRequest *request)
{
    /*
    POST Params:
        status:     0: 0%, 1: 25%, 2: 50%, 3: 75%, 4: 100%
    */
    if (request->hasParam("status", true))
    {
        int params = request->params();
        for (int i = 0; i < params; i++)
        {
            AsyncWebParameter* p = request->getParam(i);
            if (p->name() == "status") 
            {
                boolean isOK = handleAirStatus(p->value());
                if (isOK)
                {
                    request->send(200);     // OK
                    return;
                }
                else
                {
                    request->send(400, "application/json", "{\"message\":\"'status' must be one of 0, 1, 2, 3, 4\"}");     // Bad Request
                    return;
                }
            }

        }
        request->send(500);     // Internal Server Error
        return;
    }
    else
    {
        request->send(400, "application/json", "{\"message\":\"'status' is a required parameter that is missing\"}");     // Bad Request
        return;
    }

    request->send(500);     // Internal Server Error
}