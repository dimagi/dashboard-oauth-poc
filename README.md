# A Proof of Concept OAuth2 Client for CommCare

This project consists of a stateless flask back end and a React front end that
interact with CommCare via oauth2.

A public demo [is available here](https://commcare-api-demo.herokuapp.com/).

## Architecture

Authentication is managed through a standard [OAuth2 Authorization code grant](https://oauth.net/2/grant-types/authorization-code/) 
to retrieve an access token. 

In order to protect their oauth client secret, as well as avoid any CORS-related issues,
external applications should have a server-side component that handles access token requests,
hence the need for the flask backend.
This application [does that here](https://github.com/dimagi/dashboard-oauth-poc/blob/master/server.py#L14-L52). 

Once an access token is retrieved it is stored in a Cookie and subsequent requests are made from the 
JavaScript client. The backend is completely stateless.

## Back end setup

Installation

```
pip install flask
```

Configuration:

```
cp .env.example .env
```

Then set values appropriately.

Running
```
export FLASK_APP=server.py
flask run
```

## Front end setup

Installation

```
npm install
```

Building

```
npm run dev
```

or

```
npm run dev-watch
```

for production use:


```
npm run build
```

## Future work

As this is just a proof of concept it is rather limited.

Future work includes properly handling [refresh token workflows](https://oauth.net/2/grant-types/refresh-token/)
as well as extracting relevant shareable functionality into more of a library that could be reused.
