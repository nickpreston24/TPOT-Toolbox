<div id="welcome" align="center">

  <h1>
    TPOT Toolbox App
  </h1>

  __A web app for ThePathOfTruth.com with offline & mobile support__

  <a href="https://www.thepathoftruth.com">
    <img src="./public/images/icons/icon-384x384.png" alt="Extension Boilerplate">
  </a>

</div>

# Getting Started

> Click on the description that best describes you!

### [Toolbox User](#Toolbox User)

### [Owner]()

### [Coder](#developer)

# Toolbox User

Hello there! If you are not very tech savy or you have never used this app before, we are here to help out as best as we possibly can. The TPOT Toolbox App has been developed with everyone we serve in mind and we want to help everyone to enjoy the same experience as much as possible.

- [__What Is This App?__](#whats-new?)
- [__Features__](#features)
- [__Is My Device Compatible?__](#is-my-device-compatible)
- [__How to Install__](#how-to-install)
- [__Using the App__](#usage)

## What is this App?

The TPOT Toolbox App is a special website that can anyone can take with them whether you are on your computer, your tablet or phone. We chose not to go through the hurtles of mobile app development through Google and Apple and have put together something called a 'PWA', that allows us to share the same experience with both desktop and mobile device users. It also makes it easier for us to keep the app updated and distributed for all. We hope you like it!

## Features

- Take TPOT Letters with you.

##### [[back to Toolbox User]](#Toolbox User)

---

## Is My Device Compatible?

>***Devices tested so far...***

`Desktop`

    Windows
        Chrome 73+ ?
    Mac OS
        Chrome 73+

`Mobile`

    Android
        Chrome 73+
        Firefox 66+

##### [[back to Toolbox User]](#Toolbox User)

---

## How To Install

  - [__At Home__](#how-to-install)
    - [__Visiting the Website__](#how-to-install)
    - [__Device Helper__](#how-to-install)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper erat non orci cursus, vitae ultricies orci fermentum. Pellentesque aliquam, turpis in dictum auctor, risus ipsum rutrum magna, sit amet hendrerit elit nibh sit amet orci. Praesent aliquam scelerisque quam, vitae mollis nunc. Sed egestas mattis faucibus. Aenean eros arcu, dignissim sit amet dui commodo, sodales luctus dolor. Aenean eget leo neque. Proin pharetra facilisis magna, vitae dapibus arcu euismod a. Cras sem erat, tincidunt a consectetur et, elementum quis nisi. Vivamus vel consectetur dui, a suscipit quam. Suspendisse varius ante consequat neque tempor maximus.

- [__Mobile__](#how-to-install)
- [__Desktop__](#how-to-install)

Phasellus nec purus porttitor, porttitor nunc non, mollis dui. Donec eleifend risus sed diam imperdiet rhoncus. Praesent pulvinar, dolor a ultrices venenatis, augue diam ornare mi, vitae laoreet elit nisi eu dui. Morbi ut nisi tristique, rhoncus est ut, hendrerit massa. Sed quis purus vestibulum, interdum enim quis, facilisis diam. Sed consequat, ex vel tempor sagittis, turpis eros consectetur justo, et rutrum nunc augue eu massa.

##### [[back to Toolbox User]](#Toolbox User)

## Device Install Guides

  - [__Mobile__](#how-to-install)
    - [__iPhone__](#how-to-install)
      - [__Safari__](#how-to-install)
      - [__Chrome__](#how-to-install)
      - [__Firefox__](#how-to-install)
    - [__Android__](#how-to-install)
      - [__Chrome__](#how-to-install)
      - [__Firefox__](#how-to-install)

##### [[back to Toolbox User]](#Toolbox User)

---


# Developer

> __This is the ___[`developer`]()___ section and is NOT for the faint of heart or for our valued Toolbox Users. If you are one of these, click here to [go back to safety!](#Toolbox User)__

<div align="center">

  <img height="100" src="https://cdn.pixabay.com/photo/2016/07/01/22/33/industrial-safety-1492046_960_720.png" alt="Extension Boilerplate">
</div>

---

### Navigation

- [__Basic Information__](#basic-information)
- [__Development Tools__](#development-tools)
- [__Quick Start__](#quick-start)
- [__Required Features__](#required-features)
- [__Package Purposes__](#packages)
- [__Application Lifecycles__](#application-lifecycles)

---

## Basic Information

> __Note for all developers:__ If you are having trouble of any kind, tag [Braden](https://github.com/Braden-Preston) or [Michael](https://github.com/MikePreston17) or submit an issue to the [repo](https://github.com/Harvest-Haven/TPOT-Toolbox/issues).  This requires a GitHub account.

This application is a PWA (Progressive Website Application) that is developed in JavaScript using the Node Framework. It employs a serverless stack that is most closely aligned with the MERN stack.

It was bootstrapped with [Create React App 2.0](https://facebook.github.io/create-react-app/). CRA has been rewired so that its configuration is  accessible by [craco](https://www.npmjs.com/package/@craco/craco), This allows us to tweak and add additional functionality into the default Webpack configuration. [Webpack](https://webpack.js.org/) in CRA is responsible for bundling, linting, shaking and splitting code for making the app as lightweight as possible.

The PWA also employs an experimental service worker using Google's [Workbox](https://developers.google.com/web/tools/workbox/) to enable offline support for users where it is possible. Offline support is satisfied by [IndexedDB](https://caniuse.com/#feat=indexeddb) with fallbacks for [WebSQL](https://caniuse.com/#search=websql), and [LocalStorage](https://caniuse.com/#search=localstorage), depending on the user's device.

> This app is still [experimental](), so some of these features may change as the application or device support changes. Features have been selected to be as future-proof as possible with fallbacks at the expense of bundle size and speed.

---

## Development Tools

We are using VSCode! :)
Netlify

##### [[back to Developer Navigation]](#navigation)

---

## Quick Start

First, clone the repository by copying this link:

    https://github.com/HarvestHaven/TPOT-Toolbox.git

Then, open up [Git Bash](https://git-scm.com/downloads) in preferred folder (I like Desktop), or, alternatively, [Visual Studio Code](https://code.visualstudio.com/download) and type:

    git clone https://github.com/HarvestHaven/TPOT-Toolbox.git

Then hit enter and the repo will be cloned.

**TIP** When using VSCode, type CMD/CTRL + ` to access the terminal.  The default terminal will be node, but you can change it to be git bash by default.

Once you have cloned the repository from the [repo](https://github.com/HarvestHaven/TPOT-Toolbox), open the root directory in VSCode.  You can do this from Git Bash by typing `code .`.  You should have access to the `public` and `src` folders. Make sure you are in the correct directory in your terminal.  To get there, you may use `cd public` or `cd src`.

We are using [yarn](https://yarnpkg.com/en/) as our package manger, but you may use `npm` or `npx` as desired, just make sure you prepend your command with 'run' when using npm and not yarn.  Note that yarn will create a `yarn.lock` file while npm will create a `package-lock.json` file.  Transitioning from npm to yarn requires `package-lock.json` to be deleted.  See [Migrating from NPM](https://yarnpkg.com/lang/en/docs/migrating-from-npm/).

| Package Manager | Command |
| --- | --- |
| **`yarn`** | `yarn` test |
| **`npm`** | `npm` run test |
| **`npx`** | `npx` run test |

---

## Install

This is the first command you should run after cloning the repo. It will build the `node_modules` directory and download all necessary packages needed for development as specified in [package.json](https://github.com/HarvestHaven/TPOT-Toolbox/blob/master/package.json).

    yarn install

## Start

Runs the application in `development` mode but [does not attach the service worker](). This mode is perfect for UI and UX development, but not for adjusting service worker or caching functionality. Run and serve a static [build](#build) for that.

    yarn start

> View app in browser at [localhost:3000](http://localhost:3000/)

## Build

Runs the application in `production` mode and is optimized for performance, as it has been bundled and cleaned by `Webpack`. It is served locally and a service worker is attached using `Workbox`

    yarn build

> View app in browser at [localhost:5000](http://localhost:5000/)

##

## Deploy

Triggers a build on [Netlify](https://www.netlify.com/) and / or [Heroku](https://www.netlify.com/). Netlify will monitor the repo and on pushes to the working branch will package, bundle, clean and host the app on their servers.

    yarn deploy

> View app in browser at [tpot-toolbox.netlify.com](http://www.tpot-toolbox.netlify.com/) or [tpot-toolbox.herokuapp.com](http://www.tpot-toolbox.herokuapp.com/)

## Test

Runs the application in `test` mode. CRA by default uses [jest]() at its test runner. See [Running Tests](https://facebook.github.io/create-react-app/docs/running-tests).

    yarn test

## Other Commands

Less used but still important to development are the following:

| Command | Purpose |
| --- | --- |
| `serve` | Quickly host the contents of the `build` director at [localhost:5000](http://localhost:5000/)|
| `build-storybook` | Takes your storybook and builds a static site that can be served|
| `eject` | **NEVER** use this! Use at your own [risk!](https://facebook.github.io/create-react-app/docs/alternatives-to-ejecting) |

##### [[back to Developer Navigation]](#navigation)

---

## Required Features

The following features are required to create the minimum viable product:

- [x] The app needs to be installable on Desktop and have the ability to be ran as an executable. The operating system will be either Windows or OSX. The app should be able to run on startup and at certain times via a scheduler.
- [x] The app should be simple enough that one of the Harvest Haven kids are able to relaunch it if they are passing by and have noticed it isn't working properly.
- [x] This will require the use of either local storage (Electron) or persisted browser storage (LocalForage)

###

##### [[back to Developer Navigation]](#navigation)

---

## Packages

### Client Bundle

| Package | Version | Purpose |
| --- | --- | --- |
| [`@craco/craco`](https://www.npmjs.com/package/@craco/craco) | ^4.0.1 | Overrides CRA /  `react-scripts`'s configuration file to allow custom Webpack and ESLint configurations |
| [`@material-ui/core`](https://www.npmjs.com/package/@material-ui/core) | ^3.9.3 | Most used staple components for React UI development |
| [`@material-ui/icons`](https://www.npmjs.com/package/@material-ui/icons) | ^3.0.2 | Large package containing Material Design Icons |
| [`@material-ui/styles`](https://www.npmjs.com/package/@material-ui/styles) | ^3.0.0-alpha.10 | Material-UI's custom implementation of JSS among other feature support such as `styled-components` |
| [`@material-ui/system`](https://www.npmjs.com/package/@material-ui/system) | ^3.0.0-alpha.2 | Experimental but extremely useful component composition helper library. |
| [`localforage`](https://www.npmjs.com/package/localforage) | ^1.7.3 | IndexedDB storage simplified, with fallback for other persistent browser storage types |
| [`mobx`](https://www.npmjs.com/package/mobx) | ^5.9.0 | Property access management library for implementing reactive components & observable states |
| [`mobx-react`](https://www.npmjs.com/package/`mobx-react) | ^5.4.3 | React style bindings for MobX, such as `@inject` and `@observer` |
| [`react`](https://www.npmjs.com/package/react) | ^16.8.6 | Efficient Virtual DOM managment library for class based UI components |
| [`react-dom`](https://www.npmjs.com/package/react-dom) | ^16.8.6 | Render compoents manually to browser DOM without exisiting React DOM |
| [`react-router-dom`](https://www.npmjs.com/package/react-router-dom) | ^5.0.0 | Simplified bindings for react-router, such as `BrowserRouter` |
| [`react-scripts`](https://www.npmjs.com/package/react-scripts) | 2.1.8 | Create React App's bundled collection of scripts for development and production |
| [`styled-components`](https://www.npmjs.com/package/styled-components) | ^4.2.0 | JSS to CSS mapper to convert JS code into CSS classes dynamically |
<!--
| [``]() |  |  | -->

### Development

| Package | Version | Purpose |
| --- | --- | --- |
| [`@babel/plugin-proposal-decorators`](https://www.npmjs.com/package/@babel/plugin-proposal-decorators) | ^7.4.0 | Webpack plugin that adds support for decorators in Typescript and MobX |
| [`@storybook/addon-actions`](https://www.npmjs.com/package/@storybook/addon-actions) | ^5.0.5 | Adds a panel to call synthetic actions within your stories |
| [`@storybook/addon-console`](https://www.npmjs.com/package/@storybook/addon-console) | ^1.1.0 | Enables `console.log()` output in storybook drawer |
| [`@storybook/addon-knobs`](https://www.npmjs.com/package/@storybook/addon-knobs) | ^5.0.5 | Enables UI to control story props passed to React components |
| [`@storybook/addon-viewport`](https://www.npmjs.com/package/@storybook/addon-viewport) | ^5.0.5 | Simulate different device resolutions inside storybook |
| [`@storybook/addons`](https://www.npmjs.com/package/@storybook/addons) | ^5.0.5 | Enable addon support for storybook |
| [`@storybook/react`](https://www.npmjs.com/package/@storybook/react) | ^5.0.5 | Support for React components inside storybook |
| [`craco-workbox`](https://www.npmjs.com/package/craco-workbox) | ^0.1.0 | Craco plugin for overriding the [GenerateSW](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#generatesw_plugin_1) configuration for CRA's `webpack-workbox-plugin` |
| [`storybook-addon-material-ui`](https://www.npmjs.com/package/storybook-addon-material-ui) |  | <div>Adjust MUI color palettes with detailed UI on the fly and wrap stories in &lt;Provider /&gt;<blockquote>Note: This cannot be implemented until it supports storybook 5.0 :(</blockquote><div> |
| [`workbox-cli`](https://www.npmjs.com/package/workbox-cli) | ^4.2.0 | Create a custom service worker & implement default strategies for offline support |
<!--
| [``]() |  |  | -->

##### [[back to Developer Navigation]](#navigation)

<!-- - [__Required Features__](#development)
- [__Package Purposes__](#development) -->

---

## Application Lifecycles

  - [__General__](#general)
  - [__Service Worker__](#service-worker)
  - __App Shell__
  - __App State__
  - __User Data__


##### [[back to Developer Navigation]](#navigation)

## General

### Startup

1) Browser loads hosted site ([tpot-toolbox.netlify.com](http://www.tpot-toolbox.netlify.com/) or [tpot-toolbox.herokuapp.com](http://www.tpot-toolbox.herokuapp.com/))
1) `index.html` is loaded with `manifest.json`
1) `manifest.json` loads the main bundle of the `src` directory
1) `index.js` is loaded and simple loads the full web app into the DOM
1) MobX store is instantiated inside `app.js` and passed in a provider to the routed app
1) MobX internally instantiates the service worker inside services.js
1) The app will start to install the service worker and precache bundles.
1) A Material UI theme instance is also instantiated and is provided to the routed app.
1) The web app's root class, App is mounted
2) RoutedApp is mounted and it hoists the

// braden left off here.... :()


[***This Section is OUT OF DATE and will be refactored](#application-lifecycle)

### Initalization

>  Occurs when the app is online and not installed or it is installed, but is updating with the latest version of the web app.

1) Browser loads hosted site ([tpot-toolbox.netlify.com](http://www.tpot-toolbox.netlify.com/) or [tpot-toolbox.herokuapp.com](http://www.tpot-toolbox.herokuapp.com/))
1) `public/index.html` is loaded with src for manifest
1) `public/manifest.json` loads icons, app name, and scripts
1) `index.js` is loaded and the react tree is mounted and `serviceWorker.js` is called to register
1) `serviceWorker.js` makes sure build type is production, then registers the service worker, `sw.js`
1) `sw.js` grabs all the bundles from the precache_manifest, as generated by webpack and caches them to the browsers storage
1) `sw.js` is now the registered service worker and enables the main bundle and routing/fetch requests to be handled offline
1) the app is now officially available offline, but is not installed
1) If the user is still authenticated, pull down their preferences from firebase and load them into mobx-persist
1) prompt user to install app
1) If the app is already installed, notify user that the app is ready to used offline
1) While the app is waiting for all this caching display the splash screen briefly and then move into the [app shell skeleton]().

### Loading / Fetching

>  Occurs when the app is offline / online and / or installed / not installed.

1) When components have no content or are fetching content, attach the prop `loading={true}` to all relative affected components.
1) When routes are loading a page, give a few ms of loading for visual consistency, even when the page content is already available. Use react-loadable
1) When fetching a resource for the first time, display the components skeleton
1) When the componets recieves its first valid props, display the component.
1) If the component has recovered from offline failure, set `loading` and `offline` props to `false`
1) Online and offline callbacks should be subscribed to by MobX with @autorun to allow components to quickly react to online / offline state changes.

##### [[back to Developer Application Lifecycles]](#application-lifecycles)

---

## Service Worker

> A Service worker is a [`persistent`]() task runner that always runs in the background of your browser even when you are offline or your tabs are closed. It is primarily responsible for allowing the application to run `offline` when there is no internet connection available. It also provides substantial network savings by `caching` assets as part of the larger [Progressive Web App]() development standards.

### Responsibilities

 - Initialize with page and begin caching all necessary resources needed for the [app shell]() to run offline.
 - Iteratvely [cache less important resources]() (images, fonts, etc.) as they are needed to allow almost instantaneous reloads of site content.
 - Register [routes for future nagivation]() as smaller bundles that don't impede the main shell's [First Paint]() & [Time to Interactive]()
 - Handle online and offline [fetch requests]() from the web app.
 - Manage other instances of itself and force updates based on [user controlled input]().

### Registration

Ordinarily, in Create React App there is a service worker that is created for you. Internally, CRA uses [workbox-webpack-plugin](), which uses the simplified [`GenerateSW()`]() function to generate a worker and place it in the `build` directory. That file is then registered by CRA's `serviceWorker.js` function in `index.js` at runtime.

The `GenerateSW` function is great for getting a service worker up quickly, because it will cache every resource in your bundles and register all your routes. However, it doesn't allow you much of any fine-grained control. For instance in this app, we need to set up [custom routes](), improve performance of the app shell via [selective caching of bundles](), and utilizing IndexedDB and other packages as part of our [caching strategy](). For this we need to use workbox [`InjectManifest()`]() instead.

### Template File

>Uses the [`workbox-sw`]() package

`InjectManifest` requires a template file to begin with. We have set up [`serviceWorkerCustom`](./src/serviceWorkerCustom.js) in the `src` directory. Inside this file you have access to the global property `self`, which is an equivalent stand-in for the `this` keyword in service workers. You can write code using `self` like normal in the [service worker documentation](). You can also utilize `workbox-sw` and implement any of their [custom strategies]() and [plugins]().

```javascript
if ('serviceWorker' in navigator) {
    const wb = new Workbox(`${process.env.PUBLIC_URL}/service-worker.js`);
}
```

CRA is already creating service-worker.js in the `build` directory using `GenerateSW`. You need to run the workbox `injectManifest` command after the build. This will create a new `service-worker.js`, replacing the one generated by CRA. We can then register it by referencing the `PUBLIC_URL` inside the `workbox-window` registrar file .

> Note: You need a workbox-config.js file in the root directory in order to use workbow injectManifest correctly. Ex:

```json
module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,js,ico,html,css,svg}"
  ],
  "swDest": "build/service-worker.js",
  "swSrc": "src/serviceWorkerCustom.js",
};
```

### Registrant File



>Uses the [`workbox-window`]() package

The template file has now created `service-worker.js` in the `build` directory, but it needs to be registered in order to be used by the web app. The easiest way to do this is with [`workbox-window`](). Use the following code in the web app to register it:

```javascript
import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
    const wb = new Workbox(`${process.env.PUBLIC_URL}/service-worker.js`);
}
```

That's it. Basically if the browser supports service workers, register it, otherwise leave it alone. The app will use the network by default and behave just an app without a service worker would if it was offline.

> Just make sure the web app knows how to handle itself when it has no cached resources and no network to connect to. Obviously it isn't going to be perfect.

In the interest of keeping the service worker closely connected with the client and having the ability to notifiy them, the above code is actually registered locally in a MobX store, [`services.js`](./src/stores/services.js). Since the store is only instantiated [once](), there is no problem keeping service worker registration there. The benefit is direct access to a notification function and listeners for online & offline status:

```javascript
class ServicesStore {
    // : Reference the parent store
    this.root = rootStore

    // : Set Listeners for Online/Offline Status
    window.addEventListener('online', this.online);
    window.addEventListener('offline', this.offline);

    ...

    // Service worker registration (code above)

    ...

    @action notify = (message, config) =>
        this.enqueueSnackbar(message, config)

}
```

### Event Notifications

As stated earlier, we are using the [`workbox-window`]() package to create an instance, `wb`. We can attach listeners to the registered service worker for instance that notify users of updates.

```javascript
this.wb.addEventListener('installed', (event) => {
    // A worker is being instaled for the first time
    if (!event.isUpdate) {
        this.notify('App can now be used offline!', { variant: 'success' });
    }
});
```

### User Interaction

We can also prompt the user specifically to make a choice about updates when they are available. The following prompts a user to update now or later. If they choose to update, it forces the next service worker to activate and refreshes the page to claim the current client.

```javascript
wb.addEventListener('waiting', (event) => {
    if (!event.isUpdate) {
        this.notify('A waiting new service worker has installed (for the first time)');
    } else if (event.isUpdate) {
        // : A service updated worker has installed but it's stuck in the waiting phase
        this.notify("TPOT Toolbox is ready to be updated", {
            persist: true,
            variant: 'info',
            action: (
              // : JSX Code for Snackbar Buttons
            ),
        });
    } else { }
});

@action.bound updateAndRestart = () => {
    this.wb.addEventListener('controlling', (event) => {
        window.location.reload()
    });
    // : Send a message telling the service worker to skip waiting && claim clients.
    // : This will trigger the newly added `controlling` event handler above.
    this.wb.messageSW({ type: 'SKIP_WAITING' });
```

### Automatic Updates

___This section is hopefully subject to change___

> "Just close out of everything and restart..." _- Braden_

In their default behavior, service workers don't actually activate the moment they are installed ([unless forced](#user-interraction)). They also don't check for updates on their own. Both checking for an update and activation of installed workers does not occur unless the following conditions are met:

 - The user closes out ALL tabs that are running the app and makes a clean load of the page in a new tab.
 - The user is on a mobile device and they fully close out the app. Minimization or swiping to refresh the page doesn't do it.

> The reason for this is that browsing to a page for the first time gives you fresh [response headers](). These are what identify that a new version of the site exists. The only way to get new response headers is a clean load of the page. Google states this may [change in the future]().

##### [[back to Developer Application Lifecycles]](#application-lifecycles)

---

## User Quick Start

The following instructions will help new users get familiar with TPOT Toolbox's Letters App:

### How to use the Editor

#### Sign In

First thing's first, you must sign in or register with your email and password.  If you are not registered or forgot your password, that's ok.  
  You can recover your password by clicking the "Forgot Your Password?" link.  
  Alternatively, you may create a new account by clicking the "Create an Account" link.

![Login or Register](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/Login-and-register.png)

Once that's done, you should see your email show up in the top right corner of the application.

![User email](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/current-user-indicator.png)

#### Actions

![Typing Text](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/TPOT-Toolbox-type-normally.gif)

Or, you can load an existing letter or paper from your local disk:
![Loading a File From Disk](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/Load%20a%20file%20from%20disk.gif)

![Setting Quotes](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/TPOT-Toolbox-quote-button.gif)

![Adding a Line Break](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/TPOT-Toolbox-line-break.gif)

![Adding Bullets](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/TPOT-Toolbox-bullets.gif)

![Adding Emphases](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/TPOT-Toolbox-bold-italics-and-underlines.gif)

![Adding Colors](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/TPOT-Toolbox-add-colors.gif)

![Aligning Text](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/TPOT-Toolbox-align-text.gif)

![Adding a Link to a Teaching](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/TPOT-Toolbox-add-teachings-and-links.gif)

#### Publishing a New Letter or Paper
![Publishing](https://github.com/HarvestHaven/TPOT-Toolbox/blob/Documentation-MikePreston17/screenshots/TPOT-Toolbox-publish-letter.gif)
