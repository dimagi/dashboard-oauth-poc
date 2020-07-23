
def get_commcare_auth_config(config):
    return {
        'client_id': config['COMMCARE_CLIENT_ID'],
        'client_secret': config['COMMCARE_CLIENT_SECRET'],
        'access_token_url': f'{config["COMMCARE_URL"]}/oauth/token/',
        'authorize_url': f'{config["COMMCARE_URL"]}/oauth/authorize/',
        'redirect_uri': config["COMMCARE_REDIRECT_URI"],
    }
