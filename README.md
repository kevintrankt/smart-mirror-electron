# Smart Mirror

[![License](http://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE)

# Introduction

Smart Mirror frontend build with Angular 6(+) and Electron (Typescript + SASS + Hot Reload).

- Angular v6.1.2
- Electron v2.0.7
- Electron Builder v20.28.1

## Getting Started

Clone this repository locally and install dependencies with npm :

```bash
git clone https://github.com/kevintrankt/smart-mirror-electron.git
```

```bash
cd smart-mirror-electron
```

```bash
npm install
```

## To build for development

- **in a terminal window** -> npm start

## Commands

| Command                    | Description                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------- |
| `npm run ng:serve:web`     | Execute the app in the browser                                                                    |
| `npm run build`            | Build the app. Built files are in the /dist folder.                                               |
| `npm run build:prod`       | Build the app with Angular aot. Built files are in the /dist folder.                              |
| `npm run electron:local`   | Builds application and start electron                                                             |
| `npm run electron:linux`   | Builds application and creates an app consumable on linux system                                  |
| `npm run electron:windows` | On a Windows OS, builds application and creates an app consumable in windows 32/64 bit systems    |
| `npm run electron:mac`     | On a MAC OS, builds application and generates a `.app` file of application that can be run on Mac |
