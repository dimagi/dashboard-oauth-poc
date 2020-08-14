# A Proof of Concept OAuth2 Client for CommCare

This project consists of a stateless flask back end and a React front end that
interact with CommCare via oauth2.

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
