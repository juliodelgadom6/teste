from flask import Flask

app = Flask(__name__)

@app.route('/')
@app.route('inicio')
def inicio():
	return '<h1>Olá mundo</h1>'
