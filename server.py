from flask import Flask, url_for
from flask import render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    bundle_url = url_for('static', filename='index-bundle.js')
    return render_template('hello.html', bundle_url=bundle_url)



