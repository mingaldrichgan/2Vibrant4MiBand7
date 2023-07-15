# SmartBand7-VibrantExtended
Modification of preinstalled watchface with additional features

## Details of this version
As I use Gadgetbridge and no other app to connect to my Xiaomi Smart Band 7, there is still pending work to fully support [OpenWeatherMap codes](https://codeberg.org/Freeyourgadget/Gadgetbridge/src/branch/master/app/src/main/java/nodomain/freeyourgadget/gadgetbridge/devices/huami/HuamiWeatherConditions.java), as there is no distinction between day and night statuses. Because of this, I have fixed this at least on the main screen when using this watchface, as this checks every 10 minutes if the current time is between sunrise and sunset times. This needs to be optimised, but it works for now.

## How-to build
Use [zmake](https://mmk.pw/en/zmake)

