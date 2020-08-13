import requests
from flask import Flask, url_for, request, make_response
from flask import render_template

from commcare.auth import get_commcare_auth_config

app = Flask(__name__)
app.config.from_object('settings')

ACCESS_TOKEN_COOKIE_NAME = 'commcare-access-token'
REFRESH_TOKEN_COOKIE_NAME = 'commcare-refresh-token'


@app.route('/oauth-callback/')
def oauth_callback():
    """
    The view called by the oauth callback
    """
    if 'error' in request.args:
        return "Sorry, that didn't work. Please try again."
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
    hq_response = requests.post(
        auth_config['access_token_url'],
        data=post_data,
    )
    if hq_response.status_code == 200:
        hq_json = hq_response.json()
        access_token = hq_json['access_token']
        refresh_token = hq_json['refresh_token']
        bundle_url = url_for('static', filename='index-bundle.js')
        resp = make_response(
            render_template(
                'home.html',
                bundle_url=bundle_url,
                commcare_config=_scrub_config(config),
        ))
        # set cookies so they are available to the front end
        resp.set_cookie(ACCESS_TOKEN_COOKIE_NAME, access_token)
        resp.set_cookie(REFRESH_TOKEN_COOKIE_NAME, refresh_token)
        return resp
    else:
        # todo: better handle error case and such
        return "Oops, something went wrong. Please try again."


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def home(path):
    bundle_url = url_for('static', filename='index-bundle.js')
    return render_template(
        'home.html',
        bundle_url=bundle_url,
        commcare_config=_get_front_end_commcare_config(),
    )


def _get_front_end_commcare_config():
    return _scrub_config(_get_commcare_config())


def _get_commcare_config():
    return {k: v for k, v in app.config.items() if k.startswith('COMMCARE_')}


def _scrub_config(config):
    return {k: v for k, v in config.items() if k not in ('COMMCARE_CLIENT_SECRET')}


