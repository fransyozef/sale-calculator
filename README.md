# Percentage Calculator
A percentage calculator PWA using IONIC (Angular).

## Pre
  - Node 10.x is installed
  - [IONIC CLI] is installed

## Installing

```sh
$ npm i
```

## Running the application

```sh
$ npm start
```

## Assets

For the icons and splashscreen I used [pwa-asset-generator].

In the /assets/ folder there are 2 PDS files

* icon.psd
* splash.psd

You can modify it and then export as png in the same folder.

### Generate the assets

Navigate to the /src folder in your terminal and execute these commands:

```sh
$ pwa-asset-generator ../assets/icon.png assets/icons/ -b "#dcdcdc" --icon-only --favicon
$ pwa-asset-generator ../assets/splash.png assets/splashes/ -b "#dcdcdc" --splash-only
```


[pwa-asset-generator]: <https://github.com/onderceylan/pwa-asset-generator>
[IONIC CLI]: <https://ionicframework.com/docs/installation/cli>