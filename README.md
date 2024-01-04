# iot-garage-control

## Introduction
This project was for school. The goal was to create an IoT garage to control the garage over the internet. 
To control this potential garge a website was created which displays the current data/states and allows the user to execute certain commands. 

<br>

## Website
The website uses following stack:
* React
* Typescirpt
* Tailwind-CSS (mixed with vanilla CSS)
* daisyUI
* Vite
* axios (API client)

### Setup
1. Go to the client source: `cd client/src`
2. Install all dependencies: `npm i`
3. Run website in dev mode with `npm run dev` or build for production with `npm run build` (output dir: `./data` 

<br>

## Firmware
Firmware is made with Arduino to simplify the making of the webserver.
The webserver has following feautures:
* Serving the website
* API
* SSE (Server-sent events)

The data is sent via SSE to the website. The API handles POST requests to forward commands sent by the user.
The communication to receive data and send commands from/to the main controler is done with UART.

### Setup
To flash the firmware onto the ESP32 controller, we use PlatformIO in Visual Studio Code. 

1. Build website (see [Website Setup](#setup))
2. Upload firmware: `PlatformIO > Upload`
3. Upload data: `PlatformIO > Upload Filesystem Image`
