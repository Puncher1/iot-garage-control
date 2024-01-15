#include <Arduino.h>
#include "boardCom.hpp"


BoardCom::BoardCom(){
    init();
}

void BoardCom::update()
{
    this->receive();
    
    if (tempPackage.isReady) {
        lastPackage = tempPackage;
        tempPackage.isReady = false;
        this->request(CMD::UPDATE);
    }
}

void BoardCom::request(CMD cmd) {
    Serial.print(static_cast<char>(cmd));
}

void BoardCom::init() {
    Serial.begin(9600);
    next = RX_package::LOGIN_TRY;
}


void BoardCom::receive() {
    switch (this->next) {
    case RX_package::IDLE:
        if (!this->tempPackage.isReady) {
            this->next = RX_package::LOGIN_TRY;
        }
    break;
    case RX_package::LOGIN_TRY:
        if (Serial.available() >= DATE_LENGTH + 1) {
            Serial.readBytes(this->tempPackage.lastLogin, DATE_LENGTH);
            if(Serial.read() == '\0') { // check if string got terminated
                this->next = RX_package::DOOR;
            }
            else {this->comError();}
        }
    break;
    case RX_package::DOOR:
        if (Serial.available() >= 1) {
            RX_decode state = static_cast<RX_decode>(Serial.read());
            if (state == RX_decode::GATE_CLOSED || state == RX_decode::GATE_OPEN) {
                this->tempPackage.isGate_open = state == RX_decode::GATE_OPEN;
                this->next = RX_package::CO2;
            }
            else {this->comError();}
        }
    break;
    case RX_package::CO2:
        if (Serial.available() >= 1) {
            RX_decode state = static_cast<RX_decode>(Serial.read());
            if (state == RX_decode::BAD || state == RX_decode::OK) {
                this->tempPackage.isCO2_ok = state == RX_decode::OK;
                this->next = RX_package::AIR_QUALITY;
            }
            else {this->comError();}
        }
    break;
    case RX_package::AIR_QUALITY:
        if (Serial.available() >= 1) {
            RX_decode state = static_cast<RX_decode>(Serial.read());
            if (state == RX_decode::BAD || state == RX_decode::OK) {
                this->tempPackage.isAir_ok = state == RX_decode::OK;
                this->next = RX_package::AIR_CONTROL;
            }
            else {this->comError();}
        }
    break;
    case RX_package::AIR_CONTROL:
        if (Serial.available() >= 1) {
            this->tempPackage.airControl = static_cast<int8_t>(Serial.read());
            this->tempPackage.isReady = true;
            this->next = RX_package::IDLE;
        }
    break;
    }
}

void BoardCom::comError() {
    this->request(CMD::ERROR);
    this->next = RX_package::IDLE;
}
