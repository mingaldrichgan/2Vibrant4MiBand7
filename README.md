# SmartBand7-VibrantExtended
Modification of preinstalled watchface with additional features

## Details of this version
As I use [Gadgetbridge](https://codeberg.org/Freeyourgadget/Gadgetbridge/) and no other apps to connect to my Xiaomi Smart Band 7, I get weather statuses from [OpenWeatherMap](https://openweathermap.org/) (translated status values sent by Gadgetbridge can be seen [here](https://codeberg.org/Freeyourgadget/Gadgetbridge/src/branch/master/app/src/main/java/nodomain/freeyourgadget/gadgetbridge/devices/huami/HuamiWeatherConditions.java)). At the moment of writing this, there is no distinction between [day and night statuses](https://docs.zepp.com/docs/1.0/reference/device-app-api/hmSensor/sensorId/WEATHER/#:~:text=index%20value). I have fixed this at least on the main screen when using this watchface; every time the screen is turned on, this checks if the current time is between sunrise and sunset times, so at night it translates index values `0`, `1` and `3` into values `26`, `27` and `28`, respectively. This may need to be optimised, but it works well for me.

## How-to build
Use [zmake](https://mmk.pw/en/zmake)

