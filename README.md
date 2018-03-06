### Building for Android

```bash
$ cd /Users/jo/Desktop/fireside/platforms/android/app/build/outputs/apk/release
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk firesideapp
$ ~/Library/Android/sdk/build-tools/27.0.3/zipalign -v 4 app-release-unsigned.apk fireside-0.0.1.apk
```
