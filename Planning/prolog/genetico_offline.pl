:-include('db.pl').
:-include('logica.pl').


% <<<<<<<<<<<<<<<<<<<< Descricao >>>>>>>>>>>>>>>>>>>>>
%
% Este ficheiro contem o codigo que permite a execucao do algoritmo genetico offline para a obtencao de um caminho de custo minimo sem recorrer ao SPA


% <<<<<<<<<<<<<<<<<<<< Utilizacao >>>>>>>>>>>>>>>>>>>>>
%
% swipl
% [gen].
% gera_com_tempo_limitado([4439, 4440, 4441, 4442, 4443], L).
%
% as regras abaixo permitem a parametrizacao do algoritmo genetico,
% no entanto o numero de elites é fixo a 2, pois nao referia a ncessidade de ser parametrizavel



% parametros do algoritmo genetico
numero_geracoes(40). % numero de geracoes a gerar
numero_populacao(40). % numero de individuos da populacao
numero_elite(2). % numero de individuos da elite
probabilidade_de_cruzamento(0.6). % 0.2 = 20%
probabilidade_de_mutacao(0.2). % 0.2 = 20%
tempo_limite(1). % 1 segundo
numero_de_geracoes_a_analisar_estagnacao(3).
tolerancia_de_estagnacao(0.1).


entrega(4439, 20221205, 100, 1, 8, 10).
entrega(4440, 20221205, 300, 2, 15, 20).
entrega(4441, 20221205, 100, 3, 5, 7).
entrega(4442, 20221205, 400, 4, 15, 20).
entrega(4443, 20221205, 700, 10, 15, 20).
entrega(4444, 20221205, 250, 6, 15, 20).
entrega(4445, 20221205, 700, 7, 15, 20).
entrega(4446, 20221205, 120, 8, 6, 8).
entrega(4447, 20221205, 150, 9, 7, 9).
entrega(4448, 20221205, 600, 11, 15, 20).
entrega(4449, 20221205, 900, 12, 15, 20).
entrega(4450, 20221205, 540, 14, 15, 20).
entrega(4451, 20221205, 340, 15, 15, 20).
entrega(4452, 20221205, 720, 16, 15, 20).
entrega(4453, 20221205, 900, 17, 15, 20).
entrega(4454, 20221205, 900, 13, 15, 20).



% ecapsula o algoritmo genetico com um tempo limite de execucao guardado em tempo_limite/1e
gera_com_tempo_limitado(ListaEntregas, ListaEntregasFinal) :-
	tempo_limite(Tl),
    catch(call_with_time_limit(Tl, gera(ListaEntregas, ListaEntregasFinal)),
	Exception,
		(
			write(Exception), nl,
			fail
		)).



% entrada do algoritmo genetico, TODO: vai ter de retornar a lista de entregas ordenada como segundo argumento
gera(ListaEntregas, ListaEntregasFinal):-

	inicializa(ListaEntregas),
	gera_populacao(PopulacaoEntregas),!,
	write('+++++++++++++++++++ Populacao Inicial +++++++++++++++++++++ '), nl,
	write(PopulacaoEntregas), nl,
	avalia_populacao(PopulacaoEntregas,PopulacaoEntregasAvaliada),
	ordena_populacao(PopulacaoEntregasAvaliada,PopulacaoEntregasOrdenada),
	numero_geracoes(NumeroGeracoes),
	gera_geracao(0,NumeroGeracoes,PopulacaoEntregasOrdenada, ListaEntregasFinal),
	write('+++++++++++++++++++ Lista Final +++++++++++++++++++++ '), nl,
	write(ListaEntregasFinal), nl.


% ------------------------------------------------------------------
% inicializa ficheiro de conhecimento inicializa/1 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
% ------------------------------------------------------------------


% parameterizacao do algoritmo genetico (nesta fase nao inicializa, apenas imprime os valores)
inicializa(ListaEntregas):-
	% limpa melhor_avalicao do ficheiro de conhecimento
	(retractall(melhor_avalicao(_));true),!,
	% adiciona temporariamente a lista de entregas a processar ao ficheiro de conhecimento
	(retractall(entregas_para_genetico(_));true), asserta(entregas_para_genetico(ListaEntregas)),!,
	% adiciona temporariamente o numero de entregas a processar ao ficheiro de conhecimento
	length(ListaEntregas,NumEntregas),
	(retractall(numero_entregas(_));true), asserta(numero_entregas(NumEntregas)),!.
	


% ------------------------------------------------------------------
% inicializa ficheiro de conhecimento inicializa/1 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
% ------------------------------------------------------------------





% ------------------------------------------------------------------
% geracao da populacao inicial gera_populacao/1 >>>>>>>>>>>>>>>>>>>>
% ------------------------------------------------------------------


% gera a geracao 0 usando duas heuristica e populacao aleatoria
gera_populacao(PopulacaoInicial):-
	% obtem a lista de entregas a processar e usa a heuristica para gerar o primeiro individuo da populacao
	entregas_para_genetico(ListaEntregas),
	obtemDoisResultadosHeuristica(ListaEntregas,ListaDeListaEntregasComHeuristica),

	write('+++++++++++++++++++++ Lista de Lista de Entregas com Heuristica +++++++++++++++++++++'), nl,
	write(ListaDeListaEntregasComHeuristica), nl,

	numero_populacao(NumeroPopulacao),
	numero_entregas(NumeroEntregas),
	% obtem a lista de ids das entregas
	entregas_para_genetico(ListaIdEntregas),
	% findall(IdEntrega,entregas_para_genetico(IdEntrega),ListaIdEntregas),
	% gera a populacao aleatoria
	gera_populacao(NumeroPopulacao, ListaIdEntregas, NumeroEntregas, PopulacaoEntregas),
	% write('+++++++++++++++++++++ Populacao Aleatoria +++++++++++++++++++++'), nl,
	% write(PopulacaoEntregas), nl,
	% adiciona as heuristicas a populacao aleatoria
	append(ListaDeListaEntregasComHeuristica, PopulacaoEntregas, PopulacaoEntregasComHeuristica),
	% remove os individuos repetidos
	list_to_set(PopulacaoEntregasComHeuristica, PopulacaoEntregasComHeuristicaSemRepetidos),
	% corta a lista para ficar com o numero de individuos da populacao definido em numero_populacao/1
    findall(Individuo, ( nth1(Indice,PopulacaoEntregasComHeuristicaSemRepetidos,Individuo), Indice =< NumeroPopulacao), PopulacaoInicial).



% reutilizado do pdf professor (gera_populacao)
gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).
gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).


% ------------------------------------------------------------------
% geracao da populacao inicial gera_populacao/1 <<<<<<<<<<<<<<<<<<<<
% ------------------------------------------------------------------


% ------------------------------------------------------------------
% avalia populacao avalia_populacao/2 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
% ------------------------------------------------------------------



avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(ListaEntregas,V):-
	% usa a funcao de calculo de custo para avaliar o individuo
    encontrar_dados_para_entregas(ListaEntregas,ListaPesos2,LOrdemDeArmazens2),
    calcula_custo(ListaEntregas,LOrdemDeArmazens2,ListaPesos2,Custo,_,_,_),
	V is Custo.



% ------------------------------------------------------------------
% avalia populacao avalia_populacao/2 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
% ------------------------------------------------------------------


% ------------------------------------------------------------------
% ordena a populacao pela avaliacao ordena_populacao/2 >>>>>>>>>>>>>
% ------------------------------------------------------------------

% reutilizado do pdf professor (ordena_populacao)
ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).


% ------------------------------------------------------------------
% ordena a populacao pela avaliacao ordena_populacao/2 <<<<<<<<<<<<<
% ------------------------------------------------------------------



% ------------------------------------------------------------------
% gera geracoes gera_geracao/3 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
% ------------------------------------------------------------------

% gera geracoes final
gera_geracao(NumeroDeGeracoes,NumeroDeGeracoes,PopulacaoOrdenada,ListaEntregasfinal):-!,
	% obtem o melhor individuo da populacao ordenada sem a avaliacao
	primeiraListaEntregasSemAvaliacao(PopulacaoOrdenada,ListaEntregasfinal).

% gera geracoes recursivo
gera_geracao(NumeroAtualDeGeracao,NumeroDeGeracoes,PopulacaoOrdenada, ListaEntregasfinal):-
	% obtem os elementos elite da populacao para ListaElites
	nElitesDaPopulacao(PopulacaoOrdenada, ListaElites),
	% baralha a populacao para evitar que o cruzamento seja sempre o mesmo
	random_permutation(PopulacaoOrdenada,PopulacaoEmbaralhada), 
	cruzamento(PopulacaoEmbaralhada,PopulacaoCruzada),!,
	mutacao(PopulacaoCruzada,PopulacaoCruzadaEMutada),

	% adiciona os elementos elite a populacao cruzada e mutada
	append(ListaElites,PopulacaoCruzadaEMutada,PopulacaoCruzadaEMutadaComElites),
	avalia_populacao(PopulacaoCruzadaEMutadaComElites,PopulacaoAvaliada),
	ordena_populacao(PopulacaoAvaliada,NovaPopulacaoOrdenada),
	[IndividuoMelhorAvaliacao*ValorMelhorAvaliacao|_] = NovaPopulacaoOrdenada,
	write('+++++++++++++++++++++ avaliacao da melhor na geracao n= '), write(NumeroAtualDeGeracao), write(' +++++++++++++++++++++'), nl,
	write(ValorMelhorAvaliacao), nl,
	% retira repetidos
	list_to_set(NovaPopulacaoOrdenada, NovaPopulacaoOrdenadaSemRepetidos),
	% corta a lista para ficar com o numero de individuos da populacao definido em numero_populacao/1
	numero_populacao(NumeroPopulacao),
	findall(Individuo, ( nth1(Indice,NovaPopulacaoOrdenadaSemRepetidos,Individuo), Indice =< NumeroPopulacao), NovaPopulacaoProntaParaProximaGeracao),
	
	% se as geracoes estabilizaram, coloca o numero de geracao seguinte  para o maximo para terminar
	verificaSeGeracaoEstabilizou(NumeroAtualDeGeracao, NovaPopulacaoProntaParaProximaGeracao, NumeroSeguinteDeGeracao),
	% recursao para gerar a proxima geracao
	gera_geracao(NumeroSeguinteDeGeracao,NumeroDeGeracoes,NovaPopulacaoProntaParaProximaGeracao,ListaEntregasfinal).


% reutilizado do pdf professor (cruzamento)
cruzamento([],[]).
cruzamento([Individuo*_],[Individuo]).
cruzamento([Individuo1*_,Individuo2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	probabilidade_de_cruzamento(ProbabilidadeDeCruzarDefinida),random(0.0,1.0,ProbabilidadeDeCruzarAleatoria),
	((ProbabilidadeDeCruzarAleatoria =< ProbabilidadeDeCruzarDefinida,!,
        cruzar(Individuo1,Individuo2,P1,P2,NInd1),
	  	cruzar(Individuo2,Individuo1,P1,P2,NInd2));
		(NInd1=Individuo1,NInd2=Individuo2)),

	cruzamento(Resto,Resto1).


gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	numero_entregas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	numero_entregas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	probabilidade_de_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).

% ------------------------------------------------------------------
% gera geracoes gera_geracao/3 <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
% ------------------------------------------------------------------



% ------------------------------------------------------------------
% utilitarios >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
% ------------------------------------------------------------------

% reutilizado do pdf professor (utilitarios)
retira(1,[G|Resto],G,Resto).

retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).


preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	numero_entregas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).


insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	numero_entregas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

% fim de utilitarios do pdf professor <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<




primeiraListaEntregasSemAvaliacao(NovaPopulacaoOrdenada,MelhorListaEntrega):-
	[MelhorListaEntrega*_|_] = NovaPopulacaoOrdenada.
	
nElitesDaPopulacao(PopulacaoOrdenada, ListaElites):-
	numero_elite(NumeroElites),
    findall(Elite, ( NumeroElites > 0, nth1(Indice,PopulacaoOrdenada,Elite*_), Indice =< NumeroElites), ListaElites).


guardaMelhorAposN(GeracaoAtual, PopulacaoOrdenada):-
	numero_geracoes(NumeroGeracoes),
	[_*MelhorAvaliacao|_] = PopulacaoOrdenada,
	Index is div(NumeroGeracoes,2),
	GeracaoAtual >= Index,
	asserta(melhor_avalicao(MelhorAvaliacao)).

guardaMelhorAposN(_,_). % caso a de cima nao seja verdadeira, nao faz nada

% obtem a lista de melhores avaliacoes temporariamente guardadas no ficheiro de conhecimento
listaDeMelhoresAvaliacoes(ListaMelhoresAvaliacoes):-
	findall(MelhorAvaliacao, melhor_avalicao(MelhorAvaliacao), ListaMelhoresAvaliacoes).


% verifica se estabilizou a geracao, e se estabilizou, retorna o numero da geracao maximo para parar
verificaSeGeracaoEstabilizou(NumeroAtualDeGeracao, NovaPopulacaoOrdenada, NumeroSeguinteDeGeracao):-
	%guarda a melhor avaliacao da geracao atual, mas so a partir da geracaoatual igual a metade do numero de geracoes 
	guardaMelhorAposN(NumeroAtualDeGeracao, NovaPopulacaoOrdenada),

	listaDeMelhoresAvaliacoes(ListaMelhoresAvaliacoes),
	length(ListaMelhoresAvaliacoes,NumeroMelhorAvaliacoes),
	numero_de_geracoes_a_analisar_estagnacao(NumeroDeGeracoesParaAnalisar),
	NumeroMelhorAvaliacoes >= NumeroDeGeracoesParaAnalisar,

    findall(Avaliacao, ( nth1(Indice,ListaMelhoresAvaliacoes,Avaliacao), Indice =< NumeroDeGeracoesParaAnalisar), ListaAvaliacoesParaAnalisarTolerancia),
	differencas_subtracao(ListaAvaliacoesParaAnalisarTolerancia, Diferencas),
	numero_geracoes(NumeroGeracoes),
	estagnou(Diferencas), NumeroSeguinteDeGeracao is NumeroGeracoes; NumeroSeguinteDeGeracao is NumeroAtualDeGeracao + 1.


% faz a diferenca entre os elementos de uma lista de avaliacoes e retorna a lista de diferencas
differencas_subtracao([], []).
differencas_subtracao([_], []).
differencas_subtracao([H1,H2|T], [D|Differences]) :-
    differencas_subtracao([H2|T], Differences),
    D is abs(H1 - H2).

% verifica se a lista de diferencas esta dentro da tolerancia de estagnacao
estagnou([]).
estagnou([Diferenca|RestoDiferencas]):-
	tolerancia_de_estagnacao(Tolerancia),
	Diferenca =< Tolerancia,
	estagnou(RestoDiferencas).



% obtem resultado da heuristica de distancia e produto e junta as duas listas sem repeticao
obtemDoisResultadosHeuristica(ListaEntregas,ListaDeListaEntregasComHeuristica):-
    heuristica_distancia(ListaEntregas,ListaEntregasComHeuristicaDistancia,_,_,_,_,_),
	write('heuristica_distancia'),nl, write(ListaEntregasComHeuristicaDistancia),nl,
	heuristica_peso(ListaEntregas,ListaEntregasComHeuristicaPeso,_,_,_,_,_),
	write('heuristica_peso'),nl, write(ListaEntregasComHeuristicaPeso),nl,
	juntaListasEntregasSemRepeticao(ListaEntregasComHeuristicaDistancia,ListaEntregasComHeuristicaPeso,ListaDeListaEntregasComHeuristica).

% junta as duas listas com repeticao, embaralhando uma delas
juntaListasEntregasSemRepeticao(ListaEntregasComHeuristicaIgual,ListaEntregasComHeuristicaIgual,ListaDeListaEntregasComHeuristicaSemRepeticao):-
	write('juntaListasEntregasSemRepeticao'),nl,
	random_permutation(ListaEntregasComHeuristicaIgual,ListaEntregasComHeuristicaIgualEmbaralhada), 
	ListaDeListaEntregasComHeuristicaSemRepeticao = [ListaEntregasComHeuristicaIgual,ListaEntregasComHeuristicaIgualEmbaralhada].

% junta as duas listas sem repeticao
juntaListasEntregasSemRepeticao(ListaEntregasComHeuristicaDistancia,ListaEntregasComHeuristicaPeso,ListaDeListaEntregasComHeuristicaSemRepeticao):-
	ListaDeListaEntregasComHeuristicaSemRepeticao = [ListaEntregasComHeuristicaDistancia,ListaEntregasComHeuristicaPeso].

% ------------------------------------------------------------------
% utilitarios <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
% ------------------------------------------------------------------



