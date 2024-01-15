#include <Arduino.h>
#include "boardCom.hpp"


BoardCom::BoardCom(){
    init();
}

void BoardCom::init() {
    Serial.begin(9600);
    next = RX_package::IDLE;                    // Start receiver statemachine
}

void BoardCom::gateRequest(int request) {       // send an open or close request
    if (request == static_cast<int>(UART_codec::GATE_OPEN) || request == static_cast<int>(UART_codec::GATE_CLOSED)) {
        Serial.print(static_cast<char>(request));
    }
}

void BoardCom::acRequest(int request) {         // send request to set the aircontrol
    if (request == static_cast<int>(UART_codec::AC0) || request == static_cast<int>(UART_codec::AC25)
        || request == static_cast<int>(UART_codec::AC50) || request == static_cast<int>(UART_codec::AC75)
        || request == static_cast<int>(UART_codec::AC100)) {
        Serial.print(static_cast<char>(request));
    }
}

void BoardCom::update() {                       // called every loop
    this->receive();
    
    if (tempPackage.isReady) {
        lastPackage = tempPackage;
        tempPackage.isReady = false;
        this->request(CMD::UPDATE);
    }
}

void BoardCom::request(CMD cmd) {               // send request for basic operation
    Serial.print(static_cast<char>(cmd));
}

void BoardCom::receive() {                      // statemachine to process recieved packages
    switch (this->next) {
    case RX_package::IDLE:
        if (!this->tempPackage.isReady) {
            this->next = RX_package::LOGIN_TRY;
        }
    break;
    case RX_package::LOGIN_TRY:
        if (Serial.available() >= DATE_LENGTH + 1) {
            Serial.readBytes(this->tempPackage.lastLogin, DATE_LENGTH);
            if(Serial.read() == '\0') {         // check if string got terminated
                this->next = RX_package::DOOR;
            }
            else {this->comError();}
        }
    break;
    case RX_package::DOOR:
        if (Serial.available() >= 1) {
            UART_codec state = static_cast<UART_codec>(Serial.read());
            if (state == UART_codec::GATE_CLOSED || state == UART_codec::GATE_OPEN) {
                this->tempPackage.isGate_open = state == UART_codec::GATE_OPEN;
                this->next = RX_package::CO2;
            }
            else {this->comError();}
        }
    break;
    case RX_package::CO2:
        if (Serial.available() >= 1) {
            UART_codec state = static_cast<UART_codec>(Serial.read());
            if (state == UART_codec::BAD || state == UART_codec::OK) {
                this->tempPackage.isCO2_ok = state == UART_codec::OK;
                this->next = RX_package::AIR_QUALITY;
            }
            else {this->comError();}
        }
    break;
    case RX_package::AIR_QUALITY:
        if (Serial.available() >= 1) {
            UART_codec state = static_cast<UART_codec>(Serial.read());
            if (state == UART_codec::BAD || state == UART_codec::OK) {
                this->tempPackage.isAir_ok = state == UART_codec::OK;
                this->next = RX_package::AIR_CONTROL;
            }
            else {this->comError();}
        }
    break;
    case RX_package::AIR_CONTROL:
        if (Serial.available() >= 1) {
            UART_codec state = static_cast<UART_codec>(Serial.read());
            if (state == UART_codec::AC0 || state == UART_codec::AC25 || 
                state == UART_codec::AC50 || state == UART_codec::AC75 || state == UART_codec::AC100) {
                this->tempPackage.airControl = static_cast<int>(state);
                // complete the package
                this->tempPackage.isReady = true;
                this->next = RX_package::IDLE;
            }
            else {this->comError();}
        }
    break;
    }
}

void BoardCom::comError() {             // is done at receiving an error
    this->request(CMD::ERROR);
    this->next = RX_package::IDLE;
}
