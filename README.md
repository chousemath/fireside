### Building for Android

```bash
$ cd /Users/jo/Desktop/fireside/platforms/android/app/build/outputs/apk/release
$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk firesideapp
$ ~/Library/Android/sdk/build-tools/27.0.3/zipalign -v 4 app-release-unsigned.apk fireside-0.0.1.apk
```

```bash
Alias name: androiddebugkey
Creation date: Jan 17, 2017
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: C=US, O=Android, CN=Android Debug
Issuer: C=US, O=Android, CN=Android Debug
Serial number: 1
Valid from: Tue Jan 17 04:13:23 KST 2017 until: Thu Jan 10 04:13:23 KST 2047
Certificate fingerprints:
	 MD5:  5C:7A:9A:87:CE:CA:24:22:3F:97:BB:24:8B:3E:65:CA
	 SHA1: 8B:62:F7:A6:08:EF:14:65:C0:8A:26:09:7B:F6:F3:54:3D:DB:79:A0
	 SHA256: 31:90:0B:8F:E7:14:5D:00:80:BD:E8:77:0F:6D:DD:A8:91:4E:37:04:4E:1F:5F:9E:9A:8A:45:26:6B:61:3D:7E
Signature algorithm name: SHA1withRSA
Subject Public Key Algorithm: 1024-bit RSA key
Version: 1

Warning:
The JKS keystore uses a proprietary format. It is recommended to migrate to PKCS12 which is an industry standard format using "keytool -importkeystore -srckeystore /Users/jo/.android/debug.keystore -destkeystore /Users/jo/.android/debug.keystore -deststoretype pkcs12".
```

```bash
Keystore type: JKS
Keystore provider: SUN

Your keystore contains 1 entry

Alias name: fireside
Creation date: Mar 6, 2018
Entry type: PrivateKeyEntry
Certificate chain length: 1
Certificate[1]:
Owner: CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown
Issuer: CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown
Serial number: 769a372c
Valid from: Tue Mar 06 05:04:31 KST 2018 until: Sat Jul 22 05:04:31 KST 2045
Certificate fingerprints:
	 MD5:  F4:EC:A0:FE:80:52:35:00:DD:A2:B5:E1:50:0D:25:D7
	 SHA1: 84:4F:4A:8B:3A:9C:40:C4:D9:73:AD:78:EE:48:11:86:DB:47:26:9C
	 SHA256: 3F:36:1B:28:D4:CC:AD:77:5A:6D:43:78:C6:11:94:5E:15:F6:98:64:2A:75:5A:DA:45:92:44:43:6E:15:75:AC
Signature algorithm name: SHA256withRSA
Subject Public Key Algorithm: 2048-bit RSA key
Version: 3

Extensions:

#1: ObjectId: 2.5.29.14 Criticality=false
SubjectKeyIdentifier [
KeyIdentifier [
0000: 28 A9 E6 C2 87 5C E1 F6   90 A9 91 DB 9A 89 C7 5F  (....\........._
0010: A6 31 15 8B                                        .1..
]
]



*******************************************
*******************************************
```
