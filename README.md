# nodered-portable
#### Node-RED Portable Version via Electron

Node-RED source: https://github.com/node-red/node-red

## Download

### https://sourceforge.net/projects/nodered-portable

![nodered-portable](https://user-images.githubusercontent.com/66855036/140457489-48035e8e-ad47-43a8-b982-aa95c8ce4784.png)


## Make

#### Follow these instructions if you want to build from scratch

First you will need to have Node and NPM installed, to confirm:
```
\\> node -v
v14.17.6
\\> npm -v
6.14.15
```
(above were used for development, exact versions may not be critical)

To begin, clone the repository and open it.
```
git clone https://github.com/mdkrieg/nodered-portable.git
cd nodered-portable
```
Then install dependencies using NPM.
```
npm install
```
Then, if that completes successfully run the make script.
```
npm run make
```
This will save the compiled program to the "./out" directory (creating if needed).

If the above fails you may need to install windows build tools using ***Administrator Prompt***
```
npm install -g windows-build-tools
```

#### For Mac OS or Linux

Currently I have only needed this for Windows but to build for other targets, research Electron Forge (https://www.electronforge.io/), and look into the following configuration in the package.json:
```
"config": {
  "forge": {
    "make_targets": {
      "win32": [
        "squirrel"
      ]
    },
  ...
  }
```

These are the "make_targets" listed in the default package.json:
```
"make_targets": {
  "win32": [
    "squirrel"
  ],
  "darwin": [
    "zip"
  ],
  "linux": [
    "deb",
    "rpm"
  ]
},
```
#### Changing Port

To change the port used, modify the following line in "./src/run-nodered.js"
```
server.listen(50820);
```
And modify the following line in "./src/index.html"
```
var url = 'http://localhost:50820/red';
```
