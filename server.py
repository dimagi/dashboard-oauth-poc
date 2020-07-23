import json

import requests
from flask import Flask, url_for, request
from flask import render_template

from commcare.auth import get_commcare_service, get_commcare_auth_config

app = Flask(__name__)
app.config.from_object('settings')

@app.route('/')
def home():
    commcare_config = _get_commcare_config()
    bundle_url = url_for('static', filename='index-bundle.js')
    return render_template(
        'hello.html',
        bundle_url=bundle_url,
        commcare_config=commcare_config,
    )



@app.route('/oauth-callback/')
def oauth_callback():
    """
    The view called by the oauth callback
    """
    code = request.args['code']
    config = _get_commcare_config()
    auth_config = get_commcare_auth_config(config)
    post_data = {
        'grant_type': 'authorization_code',
        'code': code,
        'client_id': auth_config['client_id'],
        'client_secret': auth_config['client_secret'],
        'redirect_uri': auth_config['redirect_uri'],
    }
    print(json.dumps(post_data, indent=2))
    resp = requests.post(
        auth_config['access_token_url'],
        data=post_data,
    )
    print(resp.json())
    bundle_url = url_for('static', filename='index-bundle.js')
    return render_template(
        'hello.html',
        bundle_url=bundle_url,
        commcare_config=config,
    )


def _get_commcare_config():
    return {k: v for k, v in app.config.items() if k.startswith('COMMCARE_')}
