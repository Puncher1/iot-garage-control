#include "boardCom.hpp"

#include <Arduino.h>


BoardCom::BoardCom(){
    init();
}

void BoardCom::update()
{
    
}

void BoardCom::init() {
    Serial.begin(9600);
}
