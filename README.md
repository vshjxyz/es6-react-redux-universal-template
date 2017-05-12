es6-react-redux-universal-template
====

A simple template powered by webpack that allows you to use
 * ES6 client and server side
 * React
 * Redux
 * Isomorphic architecture
 * Webpack
 * Express.js
 * SCSS + compass support

I'm trying to [KISS](http://en.wikipedia.org/wiki/KISS_principle) because I've seen far too many es6 projects with thousands of dependencies / optimizations that are way too hard to approach.

As I'm learning this tech stack I will create tags on the steps that took me to the repository's `HEAD`

Installation
---
Just run `npm install` and use `npm run dev` to run the development server with hot reload.

Visit `localhost:8080` after the bundle is marked as VALID

Directory structure
---
```
.
├── README.md
├── app
│   ├── actions       // Where actions live
│   ├── components    // Components have their own folders here
│   │   └── App.jsx   // Root component
│   ├── images        // Image assets
│   ├── index.js      // Entry point file for client-side
│   ├── pages         // Page-level components
│   ├── reducers      // Where all the reducers should be
│   ├── routes.jsx    // React-router routes (Needs to be updated to V4 as they broke everything...again)
│   ├── store         // Redux store creation script(s)
│   └── styles        // Scss common styles, the component-level styles should live in /components/componentname/componentname.scss
├── node_modules
├── dist              // Dist folder will contain the built file for production use (populated with yarn run build)
├── package.json
├── server
│   ├── glob-promise.js     // Utility to glob using promise pattern
│   ├── index.js            // Server entry-point
│   ├── react-renderer.js   // React-router render methods to map to real HTTP statuses
│   ├── server.js           // Express Js code and calls to react-renderer in order to provide proper output when SSR
│   └── views               // Outlining view, this might be avoided completely with a bit more work
├── webpack
│   ├── dev-server.js       // Webpack dev server init code
│   ├── dev.config.js       // Webpack dev mode code (used when running yarn run dev)
│   └── prod.config.js      // Webpack production mode code (used when running yarn run build)
└── yarn.lock
```

TODOs
---
 * ~~Find out how webpack is building the production's assets~~
 * ~~Go Isomorphic (using react server/client side)~~
 * ~~Find out how react handles routing and enable pushState~~
 * ~~Use Redux instead of plain flux~~
 * Test coverage
