# iot-garage-control

## Introduction
This project was for school. The goal was to create an IoT garage control to control a potential garage over the internet. 
To control this potential garage a website was created which displays the current data/states and allows the user to execute certain commands. 

<br>

## Website
The website uses following stack:
* React
* Typescirpt
* Tailwind-CSS (mixed with vanilla CSS)
* daisyUI
* Heroicons
* Vite
* axios (API client)

### Setup
1. Go to the client source: `cd client/src`
2. Install all dependencies: `npm i`
3. Run website in dev mode with `npm run dev` or build for production with `npm run build` (output dir: `./data`)

**Use the `testing` branch to get dummy data from the server.**

<br>

## Firmware
Firmware is made with Arduino to simplify the making of the webserver.
The webserver has following features:
* Serving the website
* API
* SSE (Server-sent events)

The data is sent via SSE to the website. The API handles POST requests to forward commands sent by the user.

Another section is the board communication where the ESP32 controller communicates with the main controller via UART.
This allows receiving data of the garage and sending commands to control the garage.


### Setup
To flash the firmware onto the ESP32 controller, we use PlatformIO in Visual Studio Code (you can install it from the Extensions in VSC. It should automatically install everything needed). 

1. Build website (see [Website Setup](#setup))
2. Upload firmware: `PlatformIO > Upload`
3. Upload data: `PlatformIO > Upload Filesystem Image`

#### Note
* The website runs locally, means you have to be in the same network as the ESP32.
* The SSID and password of the WiFi can be set in `webserver.ccp`. 
* The local IP can be changed with the `serverIP` parameter of the `WebServer` constructor in `main.cpp` (typically only the last number is changed + gateway should be changed accordingly in `webserver.cpp`)
