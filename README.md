
# WeedMobile app IOS/Android for BitCanna

This is the official repo for bitcanna's ios/android mobile app.  
We use vueJs3 and capacitorJs technology to link the different mobile APIs.

| Actual version  | Ios | Android |
| ------------- | ------------- | ------------- |
| 1.10.98 | Only on testFlight  | Only for beta tester  |


## Screenshots



| App home  | Account view | Generate QRcode | Scan QRcode |
| ------------- | ------------- | ------------- | ------------- |
| ![App home](https://i.imgur.com/fBXVzlW.png) | ![Account view](https://i.imgur.com/y9a3gHW.png)  | ![Generate QRcode](https://i.imgur.com/MhFOnB4.png)  | ![Scan QRcode](https://i.imgur.com/uLjM1cw.png) 


## Dev mode

To try the app in dev mode (browser only)

```bash
  git clone https://github.com/BitCannaGlobal/WeedMobile.git
  # if you want to work on new verions
  # git checkout v*.**.**
  cd WeedMobile
  yarn
  yarn dev
```
    
## Authors

- [@BitCannaGlobal](https://github.com/BitCannaGlobal)

## Features

- [x]  Cross platform (ios/android)
- [x]  Secure import/create wallet
- [x]  Multi langages
- [x]  Create qr code on app
- [x]  Scan qr code on app
- [ ]  Implant cosmos SDK message
    - [x]  Send transaction
    - [x]  Claim reward
    - [x]  Delegate
    - [ ]  Undelegate 
    - [ ]  Redelegate 
