# Potatoe controller app

## About

This is an app is designed to control the Potatoe robot over bluetooth. Unless you are my dad, this is probably not of much interest to you.

The app is written using the Ionic framework (http://ionicframework.com/) which is based on Cordova (http://cordova.apache.org/).  

## Dependencies:

  Most dependencies of this project are maanged using npm, which you install by intalling nodejs:

  http://nodejs.org/download/

  Once npm is installed, install cordova and ionic by running:

  $ npm install -g ionic cordova

### Android

  To build for Android you need the Android SDK, available here: http://developer.android.com/sdk/index.html. You only need the SDK tools, not the entire "Studio."   

### ios

  To build for ios, you will need a mac with xcode installed on it.

## Developing

The UI is basically just a single-page web application running in a web view. Thus, you can do a significant amount of development in the web browser. To do so, run:

  $ ionic serve

When you make changes to the code, the app will update immediately in the browser.

## Building

### Android

  Plug in your android device, and run

  $ ionic run android
