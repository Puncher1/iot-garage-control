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
    void update();
    

private:
    enum class UART_codec {          // Decode received package
        BAD = 1,
        OK,
        GATE_OPEN,
        GATE_CLOSED,
        AC0,
        AC25,
        AC50,
        AC75,
        AC100
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
    
    enum class CMD {                // Commands sent over UART
        ERROR,
        OPEN_GATE,
        AIR_CTRL,
        UPDATE
    };

    RX tempPackage;

    void init();
    void receive();
    void comError();
    void request(CMD cmd);
};


