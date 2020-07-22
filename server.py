import json

from flask import Flask, url_for
from flask import render_template

app = Flask(__name__)
app.config.from_object('settings')

@app.route('/')
def hello_world():
    commcare_config = {k: v for k, v in app.config.items() if k.startswith('COMMCARE_')}
    bundle_url = url_for('static', filename='index-bundle.js')
    return render_template(
        'hello.html',
        bundle_url=bundle_url,
        commcare_config=commcare_config,
    )



