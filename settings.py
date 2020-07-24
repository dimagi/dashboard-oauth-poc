import os
from dotenv import load_dotenv
load_dotenv()


COMMCARE_CLIENT_ID = os.environ.get('COMMCARE_CLIENT_ID', '')
COMMCARE_CLIENT_SECRET = os.environ.get('COMMCARE_CLIENT_SECRET', '')
COMMCARE_REDIRECT_URI = os.environ.get('COMMCARE_REDIRECT_URI', '')
COMMCARE_URL = os.environ.get('COMMCARE_URL', '')

COMMCARE_DEFAULT_API  = os.environ.get('COMMCARE_DEFAULT_API', '')

COMMCARE_DOMAIN = os.environ.get('COMMCARE_DOMAIN', '')
COMMCARE_AGGREGATE_REPORT = os.environ.get('COMMCARE_AGGREGATE_REPORT', '')
COMMCARE_LIST_REPORT = os.environ.get('COMMCARE_LIST_REPORT', '')
COMMCARE_DEV_MODE = os.environ.get('COMMCARE_DEV_MODE', '')
