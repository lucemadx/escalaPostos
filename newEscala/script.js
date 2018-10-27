var diasAtras = 31;
function Pessoa (nome, tipoEscala, dataEscala, horario)
{
	this.horario = horario;
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
	new Pessoa("Ana", 3, 7, "6h00"),
	new Pessoa("Milton", 3, 1, "6h00"),
	new Pessoa("Rosangela", 2, 7, "6h00"),
	new Pessoa("Sergio", 2, 9, "6h00"),
	new Pessoa("Gabriel M", 2, 9, "6h00"),
	new Pessoa("Gabriel C", 2, 8, "6h00"),
	new Pessoa("Massami", 2, 10, "6h00"),
	new Pessoa("João Paulo", 1, 6, "5h30"),
	new Pessoa("Vinicius", 1, 5, "5h30")
];

var escala = {};
var horarios = {};

var postoInicial;

function trocaGabriel(fc, ft)
{
	escala["Gabriel M"][fc] = "FC";
	escala["Gabriel M"][ft] = 0;
}

var mesAnterior = 
{
"Ana":			[0, 20, 0, 0, 0, 0, 0, 0, 0],
"Milton":		[0, 5, 0, 0, 0, 0, 0, 0, 16],
"Sergio":		[0, 0, 4, 6, 4, 3, 3, 0, 0],
"Gabriel M":	[0, 0, 3, 3, 4, 4, 4, 3, 0],
"Rosangela":	[0, 1, 4, 4, 6, 3, 2, 1, 0],
"Gabriel C":	[0, 0, 4, 5, 5, 4, 2, 1, 0],
"João Paulo":	[0, 1, 5, 3, 5, 4, 2, 1, 0],
"Vinicius":		[0, 0, 4, 3, 5, 5, 3, 1, 0],
"Massami":		[0, 1, 3, 4, 3, 6, 3, 1, 0]

};


function obterPessoaMenosEscalada(pessoasEscaladas, posto, dia)
{
	var pessoaMenosEscalada = undefined, quantidadeEscalada;
	for (var k = 0; k < pessoasEscaladas.length; k++)
	{
		var quantidadeDias = mesAnterior[pessoasEscaladas[k]][posto];
		
		for (var p = 0; p <= dia; p++)
			if(escala[pessoasEscaladas[k]][p] == posto)
				quantidadeDias++;
			
		if(posto == 3 && horarios[pessoasEscaladas[k]] === "5h30")
			quantidadeDias /= 3;
		
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
			
			for (var p = 0; p <= dia; p++)
				if(escala[pessoasEscaladas[k]][p] == posto)
					quantidadeDias++;
					
			console.log (pessoasEscaladas[k], quantidadeDias);
		}
	}
}

function definirBilheteria2(dia)
{
	var bilheteria = [];
	for (var pessoa in escala)
		if(escala[pessoa][dia] == 0 && horarios[pessoa] === "6h00" && pessoa != "Ana"&& pessoa != "Milton" && escala[pessoa][dia-1] != 2)
			bilheteria.push(pessoa);

	escala[obterPessoaMenosEscalada(bilheteria, 2, dia)][dia] = 2;
}

function definirRenda(dia)
{
	if(escala["Ana"][dia]>=0)
		escala["Ana"][dia] = 1;
	else
		if(escala["Milton"][dia]>=0)
			escala["Milton"][dia] = 1;
		else
			escala[obterPessoaMenosEscalada(obterPessoasNãoEscaladas(dia), 1, dia)][dia] = 1;
}

function obterPessoasNãoEscaladas(dia)
{
	var lista = [];
	for(var pessoa in escala)
		if(escala[pessoa][dia] == 0)
			lista.push(pessoa);
	return lista;
}

function definirApoio(dia)
{
	if(escala["Milton"][dia] == 0)
		escala["Milton"][dia] = 8;
}

function definirPostos(dia)
{
	var postoInicial = 3;
	definirBilheteria2(dia);
	definirRenda(dia);
	definirApoio(dia);
	
	var pessoasEscaladasGeral = obterPessoasNãoEscaladas(dia);
	for (var posto = pessoasEscaladasGeral.length+postoInicial-1; posto >= postoInicial; posto--)
		escala[obterPessoaMenosEscalada(obterPessoasNãoEscaladas(dia), posto, dia)][dia] = posto;
	
	substituiRepeticao(dia, pessoasEscaladasGeral);
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
				substituto = obterPessoaMenosEscalada(pessoasEscaladasGeral, escala[pessoa][dia], dia);
			else
			{
				var novo = [];
				for (var j = 0; i<pessoasEscaladasGeral.length; i++)
					if(horarios[pessoa] == "6h00")
						novo.push(pessoasEscaladasGeral[i]);
				substituto = obterPessoaMenosEscalada(novo, 2, dia);
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
	{
		escala[pessoas[i].nome] = pessoas[i].gerarFolgas();
		horarios[pessoas[i].nome] = pessoas[i].horario;
	}
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

