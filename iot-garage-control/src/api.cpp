#include <stdlib.h>
#include "api.hpp"
#include "sse.hpp"
#include "boardCom.hpp"


boolean handleGateStatus(String value) {
    if (value == "3" || value == "4") {
        BoardCom::gateRequest(value.toInt());
        return true;
    }
    return false;
}

boolean handleAirStatus(String value) {
    if (value == "5" || value == "6" || value == "7" || value == "8" || value == "9") {
        BoardCom::acRequest(value.toInt());
        return true;
    }
    return false;
}

void Routes::gateControl(AsyncWebServerRequest *request)
{
    /*
    POST Params:
        status:     0: Open, 1: Paused, 2: Closed
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
                    request->send(400, "application/json", "{\"message\":\"'status' must be one of 3, 4\"}");     // Bad Request
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
                    request->send(400, "application/json", "{\"message\":\"'status' must be one of 5, 6, 7, 8, 9\"}");     // Bad Request
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