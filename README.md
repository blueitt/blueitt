# Blueitt, codename: `Honolulu`

Blueitt is a Reddit client. This is the internal technical README.

In case the name "Blueitt" changes, this project is to be internally known as
"Honolulu" (like the capital of the US state Hawaii).

Honolulu is built with Webpack and written in ES6 React + Redux. It uses
Bootstrap 4 and Sass. **Please use `yarn`, not `npm`!**

## How to launch

This starts a server at `localhost:3000`.

```
$ yarn start
```

But first, make sure you have created `config.dev.json` and `config.prod.json`
with the following keys: (which will be injected via Webpack)

```json
{
    "appOauthKey": "wxaZ11pMAfDtLw",
    "authRedirectHost": "http://127.0.0.1:3000"
}
```
