function atualizaRelogio(){
	var hoje = new Date();
	var h = hoje.getHours();
	if(h < 10)
		h = '0' + h;
	var m = hoje.getMinutes();
	if(m < 10)
		m = '0' + m;
	var s = hoje.getSeconds();
	if(s < 10)
		s = '0' + s;
	var r = document.getElementById('relogio').innerHTML = h + ':' + m + ':' + s;
}

setInterval(atualizaRelogio, 1000); // tempo em milisegundos

const raiz = document.getElementById('lista');
// trazer os dados do servidor na internet usando ajax
/*

var xhr = new XMLHttpRequest();
xhr.onload = function() {
	var data = JSON.parse(this.response);
	data.funcionarios.forEach(elemento => {

		// criamos uma linha da tabela
		var linha = document.createElement('tr');
		raiz.appendChild(linha);

		// criamos a coluna do nome do funcionario
		var funcionario = document.createElement('td');
		funcionario.textContent = elemento.nome_usuario;
		funcionario.setAttribute('class', 'nome');
		linha.appendChild(funcionario);

		// criamos a coluna com a hora que registrou o funcionario
		var hora = document.createElement('td');
		hora.textContent = elemento.data;
		linha.appendChild(hora);
	})
}

xhr.onerror = function(e){
    console.log('Erro na hora de trazer os dados');
}

function trazerDados(){
    xhr.open('GET', 'http://juliovasquez.pythonanywhere.com/api/funcionarios');
    xhr.send();
}
*/


function trazerDados(){
    fetch('http://juliovasquez.pythonanywhere.com/api/funcionarios')
    .then(res => {return res.json();})
    .then(data => {
    	data.funcionarios.forEach(elemento => {
    		// criamos uma linha da tabela
    		var linha = document.createElement('tr');
    		raiz.appendChild(linha);

    		// criamos a coluna do nome do funcionario
    		var funcionario = document.createElement('td');
    		funcionario.textContent = elemento.nome_usuario;
    		funcionario.setAttribute('class', 'nome');
    		linha.appendChild(funcionario);

    		// criamos a coluna com a hora que registrou o funcionario
    		var hora = document.createElement('td');
    		hora.textContent = elemento.data;
    		linha.appendChild(hora);
	    })
    })
    .catch(err => {
        console.log('Erro na hora de trazer os dados');
    })
    .finally(() => {
        console.log('Texto que aparece sempre com ou sem erro.');
    });
}


document.addEventListener("DOMContentLoaded", trazerDados);








