var diasAtras = 31;
function Pessoa (nome, tipoEscala, dataEscala, renda)
{
	this.nome = nome;
	this.gerarFolgas = function()
	{
		var folgas = {};
		for(var i = 1; i<=diasAtras; i++) 
			folgas[i] = 0;
		
		for(var i = 1; i<=diasAtras; i++)
		{
			if(tipoEscala == 1)
			{
				if(i%10 == (dataEscala-1)%10)
					folgas[i] = -1;
				else
				if(i%10 == (dataEscala)%10)
					folgas[i] = -2;
				else
				if(i%10 == (dataEscala+5)%10)
					folgas[i] = -2;
			}
			if(tipoEscala == 2)
			{
				if(i%10 == (dataEscala-1)%10)
					folgas[i] = -1;
				else
				if(i%10 == (dataEscala)%10)
					folgas[i] = -2;
				else
				if(i%10 == (dataEscala+4)%10)
					folgas[i] = -2;
			}
			if(tipoEscala == 3)
			{
				if(i%7 == (dataEscala-1)%7)
					folgas[i] = -1;
				else
				if(i%7 == (dataEscala)%7)
					folgas[i] = -2
			}
		}
		return folgas;
	};
}

var pessoas = 
[
	new Pessoa("Ana", 3, 7),
	new Pessoa("Milton", 3, 1),
	new Pessoa("Rosangela", 2, 7),
	new Pessoa("Sergio", 2, 9),
	new Pessoa("Gabriel M", 2, 9),
	new Pessoa("Gabriel C", 2, 8),
	new Pessoa("Massami", 2, 10),
	new Pessoa("João Paulo", 1, 6),
	new Pessoa("Vinicius", 1, 5)
]

var escala = {};

var mesAnterior = 
{
"Ana": [-1, -2, 1, 1, 1, 1, 1, -1, -2, 1, 1, 1, 1, 1, -1, -2, 1, 1, 1, 1, 1, -1, -2, 1, 1, 1, 1, 1, -1, -2],
"Milton": [1, -1, -2, 8, 8, 8, 8, 1, -1, -2, 8, 8, 8, 8, 1, -1, -2, 8, 8, 8, 8, 1, -1, -2, 8, 8, 8, 8, 1, -1],
"Sergio": [3, -1, -2, 4, 5, 3, 2, -1, -2, 2, 3, 6, -2, 4, 6, 2, 5, -1, -2, 3, 4, 2, -2, 3, 6, 4, 5, -1, -2, 3],
"Gabriel M": [-1, 5, -2, 3, 4, 5, 7, -1, 6, 7, 4, 3, -2, 5, 2, 4, 6, -1, -2, 7, 2, 4, -2, 6, 5, 3, 2, -1, -2, 6],
"Rosangela": [-2, 4, 2, 6, 3, -1, -2, 5, 4, 6, -2, 2, 4, 3, 4, -1, -2, 2, 5, 4, -2, 3, 2, 7, 4, -1, -2, 5, 3, 1],
"Gabriel C": [2, -2, 3, 2, 4, 4, -1, -2, 5, 3, 6, -2, 7, 2, 5, 3, -1, -2, 4, 6, 3, -2, 5, 4, 3, 2, -1, -2, 5, 4],
"João Paulo": [-2, 2, 5, 4, -1, -2, 4, 2, 3, 4, -2, 5, 6, 7, -1, -2, 4, 5, 3, 2, -2, 5, 1, 2, -1, -2, 3, 4, 6, 2],
"Vinicius": [4, 3, 6, -1, -2, 2, 5, 4, 2, -2, 7, 4, 5, -1, -2, 5, 3, 6, 2, -2, 5, 6, 4, -1, -2, 5, 4, 3, 2, -2],
"Massami": [5, -2, 4, 5, 7, -1, -2, 3, 1, 5, 2, -2, 3, 6, 3, -1, -2, 4, 6, 5, 6, -2, 3, 5, 2, -1, -2, 2, 4, 5]

};

var postoInicial;


function trocaGabriel(fc, ft)
{
	escala["Gabriel M"][fc] = "FC";
	escala["Gabriel M"][ft] = 0;
}

function getPessoaMenosEscalada(pessoasEscaladas, posto, dia)
{
	var pessoaMenosEscalada = undefined, quantidadeEscalada;
	for (var k = 0; k < pessoasEscaladas.length; k++)
	{
		var quantidadeDias = 0;
		if(mesAnterior[pessoasEscaladas[k]] !== undefined)
		{
			for (var p = 0; p < 30; p++)
			{
				if(mesAnterior[pessoasEscaladas[k]][p] == posto)
				{
					quantidadeDias++;
					if(posto == 3 &&(pessoasEscaladas[k] == "João Paulo" || pessoasEscaladas[k] == "Vinicius"))
					{
						quantidadeDias++;
					}
				}
			}
		}
		for (var p = 0; p <= dia; p++)
		{
			if(escala[pessoasEscaladas[k]][p] == posto)
			{
				quantidadeDias++;
			}
		}
		if(posto == 3 &&(pessoasEscaladas[k] == "João Paulo" || pessoasEscaladas[k] == "Vinicius"))
		{
			quantidadeDias /= 3;
		}
		if(quantidadeDias<=quantidadeEscalada || pessoaMenosEscalada === undefined)
		{
			pessoaMenosEscalada = pessoasEscaladas[k];
			quantidadeEscalada = quantidadeDias;
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
			
			for (var p = 0; p < 30; p++)
			{
				if(mesAnterior[pessoasEscaladas[k]][p] == posto)
				{
					quantidadeDias++;
				}
			}
			for (var p = 0; p <= dia; p++)
			{
				if(escala[pessoasEscaladas[k]][p] == posto)
				{
					quantidadeDias++;
				}
			}
			console.log (pessoasEscaladas[k], quantidadeDias);
		}
	}
}

function definirBilheteria2(dia)
{
	var bilheteria = [];
	for (var pessoa in escala)
	{	
		if(escala[pessoa][dia] == 0 && pessoa != "João Paulo" && pessoa != "Vinicius" && pessoa != "Rodrigo"&& pessoa != "Ana"&& pessoa != "Milton" && escala[pessoa][dia-1] != 2)
		{
			bilheteria.push(pessoa);
		}	
	}
	escala[getPessoaMenosEscalada(bilheteria, 2, dia)][dia] = 2;
}

function definirRenda(dia)
{
	if(escala["Ana"][dia]>=0)
	{
		escala["Ana"][dia] = 1;
	}
	else
	{
		if(escala["Milton"][dia]>=0)
		{
			escala["Milton"][dia] = 1;
		}
		else
		{
			var temp = [];
			for (var pessoa in escala) 
			{
				if(escala[pessoa][dia] == 0)
				{
					temp.push(pessoa);
				}
			}
			escala[getPessoaMenosEscalada(temp, 1, dia)][dia] = 1;
		}
	}
}

function definirApoio(dia)
{
	if(escala["Milton"][dia] == 0)
	{
		escala["Milton"][dia] = 8;
	}
}

function definirPostos(dia)
{
	postoInicial = 3;
	definirBilheteria2(dia);
	definirRenda(dia);
	definirApoio(dia);
	
	var pessoasEscaladasGeral = getPessoasEscaladasGeral(dia);
	
	for (var posto = pessoasEscaladasGeral.length+postoInicial-1; posto >= postoInicial; posto--)
	{
		var pessoasEscaladas = [];
		for(var pessoa in escala)
			if(escala[pessoa][dia] == 0)
				pessoasEscaladas.push(pessoa);
		escala[getPessoaMenosEscalada(pessoasEscaladas, posto, dia)][dia] = posto;
	}
	
	substituiRepeticao(dia, pessoasEscaladasGeral);
}

function getPessoasEscaladasGeral(dia)
{
	var pessoasEscaladasGeral = [];
	for(var pessoa in escala)
		if(escala[pessoa][dia] == 0)
			pessoasEscaladasGeral.push(pessoa);
	return pessoasEscaladasGeral;
}

function substituiRepeticao(dia, pessoasEscaladasGeral)
{
	for (var pessoa in escala)
		if(escala[pessoa][dia] == escala[pessoa][dia-1] && escala[pessoa][dia] !=1 && escala[pessoa][dia] !=8)
		{
			for (var i = 0; i<pessoasEscaladasGeral.length; i++)
				if(pessoasEscaladasGeral[i] == pessoa)
					pessoasEscaladasGeral.splice(i, 1);
				
			var substituto;
				
			if(escala[pessoa][dia] !=2)
				substituto = getPessoaMenosEscalada(pessoasEscaladasGeral, escala[pessoa][dia], dia);
			else
			{
				var novo = [];
				for (var j = 0; i<pessoasEscaladasGeral.length; i++)
					if(pessoasEscaladasGeral[i] != "João Paulo" && pessoasEscaladasGeral[i] != "Vinicius" && pessoasEscaladasGeral[i] != "Rodrigo")
						novo.push(pessoasEscaladasGeral[i]);
				substituto = getPessoaMenosEscalada(novo, 2, dia);
			}
			
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
			if(escala[pessoa][dia] > 0 && escala[pessoa][dia] < 8)
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
			switch(escala[pessoa][dia])
			{
				case -1:
					document.write(" F ");
				break;

				case -2:
					document.write("DSR");
				break;

				case 1:
					document.write("1;2");
				break;

				case 2:
					document.write("6;2");
				break;

				case 3:
					document.write("2;6");
				break;

				case 4:
					document.write("3;5");
				break;

				case 5:
					document.write("5;3");
				break;

				case 6:
					document.write("7");
				break;

				case 7:
					document.write("4");
				break;

				default:
					document.write(escala[pessoa][dia]);
				break;

			}
			document.write("</td>");
		}

		document.write("<td>");
		document.write(pessoa);
		document.write("</td>");
		document.write("</tr>");
	}
	exibeNumFuncionarioDia();
	document.write("</table>");
}

function init()
{
	for (var i = 0; i<pessoas.length; i++)
		escala[pessoas[i].nome] = pessoas[i].gerarFolgas();
		
	trocaGabriel(6, 8);
	trocaGabriel(20, 19);	
	trocaGabriel(27, 28);
	
	for (var dia in escala[pessoas[0].nome])
		definirPostos(dia);

	/*var todos = [];
	for(var pessoa in escala)
		todos.push(pessoa);
	ctrlcv(todos);
	*/

	exibe();
}
init();

