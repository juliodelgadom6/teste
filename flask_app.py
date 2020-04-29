import os # para configurar a porta de teste
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
# from pytz import timezone

app = Flask(__name__)

# Configurar o banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///bancoDeDados.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Definição do modelo
class Apontamento(db.Model):
	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	nome_usuario = db.Column(db.String(15), nullable=True)
	data = db.Column(db.DateTime, default=datetime.now) #  ().astimezone(timezone('America/Sao_Paulo')))

	@property
	def serializar(self):
		return {
			'id': self.id,
			'nome_usuario': self.nome_usuario,
			'data': str(self.data)[11:16]
		}


@app.route('/inicio')
def inicio():
	return render_template('index.html')

@app.route('/api/funcionarios', methods=['GET','POST'])
def funcionarios():
	if request.method == 'POST':
		primeiro = Apontamento(nome_usuario = request.form['nome'].upper())
		db.session.add(primeiro)
		db.session.commit()
		return render_template('index.html')

	if request.method == 'GET':
		ultimos = Apontamento.query.order_by(-Apontamento.id).limit(10).all()
		return jsonify(funcionarios=[i.serializar for i in ultimos])


@app.route('/teste')
def teste():
	return render_template('teste.html')


@app.route('/sobre')
def sobre():
	return render_template('sobre.html')

if __name__=='__main__':
    # port = int(os.environ.get("PORT", 5000)) # flask default port 5000
	app.run(debug=True, host='0.0.0.0', port=port)