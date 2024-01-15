#pragma once

#include <string>

#define DATE_LENGTH 9   // length of the date in bytes


class BoardCom{
public:
    BoardCom();

    struct RX {                     // enum to store the received data
        bool isReady = false;
        char lastLogin[DATE_LENGTH];
        bool isGate_open;
        bool isCO2_ok;
        bool isAir_ok;
        int8_t airControl;          // %
    } lastPackage;
    
    enum class CMD {                // Commands sent over UART
        ERROR,
        OPEN_GATE,
        AIR_CTRL,
        UPDATE
    };

    void update();
    void request(CMD cmd);
    

private:

    enum class RX_decode {          // Decode received package
        BAD = 1,
        OK,
        GATE_OPEN,
        GATE_CLOSED
    };

    enum class RX_package {
        IDLE,
        LOGIN_TRY,  	            // Date as "%d %m %Y %H:%M"
        DOOR,                       // bool
        CO2,                        // bool
        AIR_QUALITY,                // bool
        AIR_CONTROL,                // bool
        CLOSE_COM
    } next;

    RX tempPackage;

    void init();
    void receive();
    void comError();
};


