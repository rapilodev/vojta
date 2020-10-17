#!/bin/sh

export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64/
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools/

# build release to platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
cordova build --release android || exit 1

# sign release
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../android.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk android

# align release
zipalign -vf 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk platforms/android/app/build/outputs/apk/release/app-release.apk

cp platforms/android/app/build/outputs/apk/release/app-release.apk vojta.apk

read -p "Press enter to continue"
