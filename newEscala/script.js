var diasAtras = 31;
function Pessoa (nome, tipoEscala, dataEscala, postos)
{
	this.nome = nome;
	this.postos = postos;
	this.gerarFolgas = function()
	{
		var folgas = {};
		for(var i = 1; i<=diasAtras; i++) 
			folgas[i] = 0;
		
		for(var i = 1; i<=diasAtras; i++)
		{
			if(tipoEscala == 1)
			{
				if(i%10 == (dataEscala)%10)
					folgas[i] = "F";
				else
				if(i%10 == (dataEscala+1)%10)
					folgas[i] = "DSR";
				else
				if(i%10 == (dataEscala+6)%10)
					folgas[i] = "DSR";
			}
			if(tipoEscala == 2)
			{
				if(i%10 == (dataEscala)%10)
					folgas[i] = "F";
				else
				if(i%10 == (dataEscala+1)%10)
					folgas[i] = "DSR";
				else
				if(i%10 == (dataEscala+5)%10)
					folgas[i] = "DSR";
			}
			if(tipoEscala == 3)
			{
				if(i%7 == (dataEscala)%7)
					folgas[i] = "F";
				else
				if(i%7 == (dataEscala+1)%7)
					folgas[i] = "DSR";
			}
		}
		return folgas;
	};
}

var pessoas = [];

var escala = {};
var postoInicial;

function trocaGabriel(fc, ft)
{
	escala["Gabriel M"][fc] = "FC";
	escala["Gabriel M"][ft] = 0;
}


function obterPessoaMenosEscalada(pessoasEscaladas, posto, dia)
{
	var pessoaMenosEscalada = undefined, quantidadeEscalada;
	
	for (var k = 0; k < pessoasEscaladas.length; k++)
	{
		for (var permitido in funcPostos[pessoasEscaladas[k]])
		{
			if(postos[permitido] == posto)
			{
				var quantidadeDias = 0;
				
				for (var p = 0; p < dia; p++)
				{
					console.log(posto, escala[pessoasEscaladas[k]][p]);
					if(escala[pessoasEscaladas[k]][p] == posto)
					{
						quantidadeDias++;
					}
				}
				if(quantidadeDias<=quantidadeEscalada || pessoaMenosEscalada === undefined)
				{
					pessoaMenosEscalada = pessoasEscaladas[k];
					quantidadeEscalada = quantidadeDias;
				}
			}
		}
	}
	return pessoaMenosEscalada;
}

function ctrlcv(pessoasEscaladas)
{
	for(posto = 1; posto<9; posto++)
	{
		console.log(posto);
		for (var k = 0; k < pessoasEscaladas.length; k++)
		{
			var quantidadeDias = 0;
			
			for (var p = 0; p <= dia; p++)
				if(escala[pessoasEscaladas[k]][p] == posto)
					quantidadeDias++;
					
			console.log (pessoasEscaladas[k], quantidadeDias);
		}
	}
}

function obterPessoasNãoEscaladas(dia)
{
	var lista = [];
	for(var pessoa in escala)
		if(escala[pessoa][dia] == 0)
			lista.push(pessoa);
	return lista;
}


function definirPostos(dia)
{
	
	var pessoasEscaladasGeral = obterPessoasNãoEscaladas(dia);
	var postosDia = [];
	var postosPessoasDia = [[]];
	for (var i = 0; i<pessoasEscaladasGeral.length; i++)
	{
		postosDia.push(postos[i]);
	}

	for (i = 0; i<postosDia.length; i++)
	{
		postosPessoasDia[i][0] = postosDia[i];
		postosPessoasDia[i][1] = 0;
		for (var j = 0; j<pessoasEscaladasGeral.length; j++)
		{
			for(var k = 0; k<pessoasEscaladasGeral[j].postos.length; k++)
			{
				if(pessoasEscaladasGeral[j].postos[k] == postosDia[i])
				{
					postosPessoasDia[i][1]++;
				}
			}
		}
	}
	for(i = 0; i <postosPessoasDia.length; i++)
	{
		for (var j = i; j<postosPessoasDia.length; j++)
		{
			if(postosPessoas[j][1]>postosPessoas[j+1][1])
			{
				var aux = postosPessoas[j];
				postosPessoas[j] = postosPessoas[j+1];
				postosPessoas[j+1] = aux;
			}
		}
	}
	for(i = 0; i <postosPessoasDia.length; i++)
	{
		document.write(postosPessoasDia[i][0]+dia +"<br>");
		var robert = obterPessoaMenosEscalada(obterPessoasNãoEscaladas(dia), postosPessoasDia[i][0], dia);
		if(robert !== undefined)
			escala[robert][dia] = postosPessoasDia[i][0];
	}
	/*for (var i=0; i<postos.length; i++)
	{
		var robert = obterPessoaMenosEscalada(obterPessoasNãoEscaladas(dia), postos[i], dia);
		if(robert !== undefined)
			escala[robert][dia] = postos[i];
	}*/
	//substituiRepeticao(dia, pessoasEscaladasGeral);
}
	

function substituiRepeticao(dia, pessoasEscaladasGeral)
{
	for (var pessoa in escala)
		if(escala[pessoa][dia] == escala[pessoa][dia-1])
		{
			for (var i = 0; i<pessoasEscaladasGeral.length; i++)
				if(pessoasEscaladasGeral[i] == pessoa)
					pessoasEscaladasGeral.splice(i, 1);
				
			var substituto;

			substituto = obterPessoaMenosEscalada(pessoasEscaladasGeral, escala[pessoa][dia], dia);
			
			var aux = escala[pessoa][dia];
			escala[pessoa][dia] = escala[substituto][dia];
			escala[substituto][dia] = aux;
		}
}

function exibeNumFuncionarioDia()
{
	document.write("<tr>");
	for (var dia in escala[pessoas[0].nome])
	{
		document.write("<td>");
		
		var totalPostos = 0;
		for (var pessoa in escala)
		{
			if(escala[pessoa][dia]!="F" && escala[pessoa][dia]!="DSR")
			{
				totalPostos++;
			}
		}
		document.write(totalPostos);
		document.write("</td>");
	}
	document.write("</tr>");
}

function exibe()
{
	document.write("<table border=1>");
	document.write("<tr>");

	for (var dia in escala[pessoas[0].nome])
	{
		document.write("<td>");
		document.write(dia);
		document.write("</td>");
	}
	document.write("</tr>");
	
	for (var pessoa in escala)
	{
		document.write("<tr>");
		for (var dia in escala[pessoa])
		{
			document.write("<td>");
			document.write(escala[pessoa][dia]);
			document.write("</td>");
		}

		document.write("<td>");
		document.write(pessoa);
		document.write("</td>");
		document.write("</tr>");
	}
	exibeNumFuncionarioDia();
	document.write("</table>");
	document.write("<a href='?'>Voltar para a página anterior</a>");
}
var funcPostos = {};
function init()
{
	for(var i = 0; i<funcionarios.length; i++)
	{
		funcPostos[funcionarios[i]] = [];
		for(var j = 0; j<postos.length; j++)
		{
			if(document.getElementById(funcionarios[i]+postos[j]).checked)
			{
				funcPostos[funcionarios[i]].push(postos[j]);
			}
		}
	}
	for (var i=0; i<funcionarios.length; i++)
	{
		pessoas.push(new Pessoa(funcionarios[i], parseInt(document.getElementById("sel"+funcionarios[i]).value), parseInt(document.getElementById("num"+funcionarios[i]).value), funcPostos[funcionarios[i]]));
	}
	for (var i = 0; i<pessoas.length; i++)
	{
		escala[pessoas[i].nome] = pessoas[i].gerarFolgas();
	}

	for (var dia in escala[pessoas[0].nome])
		definirPostos(dia);

	/*var todos = [];
	for(var pessoa in escala)
		todos.push(pessoa);
	ctrlcv(todos);
	*/

	exibe();
}
//init();
var funcionarios = [];
var postos = [];
function gerarEquipe()
{
	funcionarios = document.getElementById("funcionarios").value.match(/^..*$/gm);
	postos = document.getElementById("postos").value.match(/^..*$/gm);
	document.getElementById("right").style.display = "initial";
	document.getElementById("escala").innerHTML = "<tr><th colspan='3'><h2>Definição de Escalas</h2></th></tr><tr><th>Nome do Funcionário</th><th>Tipo de Escala</th><th>Dia da 1ª Folga (F)</th></tr>";
	for (var i = 0; i<funcionarios.length; i++)
	{
		document.getElementById("escala").innerHTML += "<tr><td>"+funcionarios[i]+"</td><th><select id='sel"+funcionarios[i]+"'><option value='1'>4132</option><option value='2'>4231</option><option value='3'>5X2</option></select></th><td><input type='number' id='num"+funcionarios[i]+"'/></td></tr>";
	}
	var stringHtml;
	stringHtml = "<tr><th colspan='"+(postos.length+1)+"'><h2>Permissao de Postos</h2></th></tr>"
	stringHtml +="<tr><td></td>";
	for (var j = 0; j<postos.length; j++)
	{
		stringHtml+="<th>"+postos[j]+"</th>"
	}
	stringHtml +="</tr>";
	for (i = 0; i<funcionarios.length; i++)
	{
		stringHtml += "<tr><td>"+funcionarios[i]+"</td>";
		for (j = 0; j<postos.length; j++)
		{
			stringHtml +="<td><input checked='true' type='checkbox' id='"+funcionarios[i]+postos[j]+"' /></td>"
		}
		stringHtml += "</tr>";
	}
	document.getElementById("funcPosto").innerHTML = stringHtml;
}
