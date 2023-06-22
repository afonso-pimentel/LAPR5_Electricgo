% ------------------------------------------------------------------
%  algoritmo genetico frota >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
% ------------------------------------------------------------------
algoritmo_genetico_frota(ListaCamioes,ListaEntregas,ListaEntregasPorCamiao) :-
    length(ListaCamioes,NumeroCamioesDisponiveis),
    obter_numero_camioes_necessarios(ListaEntregas,NumeroCamioesNecessarios),
    verificar_pre_requisitos(NumeroCamioesDisponiveis,NumeroCamioesNecessarios),
    floor(NumeroCamioesNecessarios,NumeroCamioesNecessariosCalc),
    gera_com_tempo_limitado_frota(NumeroCamioesNecessariosCalc,ListaEntregas,LOrdemDeEntregas),
    distribuir_entregas_por_camioes(ListaCamioes,ListaEntregas,ListaEntregasPorCamiao),
    imprimir_entregas_camiao(ListaEntregasPorCamiao).

imprimir_entregas_camiao([]).

imprimir_entregas_camiao([EntregasCamiao|ListaEntregasPorCamiao]):-
    imprimir(EntregasCamiao),
    imprimir_entregas_camiao(ListaEntregasPorCamiao).

imprimir([Camiao|ListaEntregas]):-
        format(user_output,'Camião: ~p~n',Camiao),
        format(user_output,'Lista: ~p~n',ListaEntregas),
        format(user_output,'------------~p~n','').

% ecapsula o algoritmo genetico com um tempo limite de execucao guardado em tempo_limite/1e
gera_com_tempo_limitado_frota(NumeroCamioes,ListaEntregas, ListaEntregasFinal) :-
	tempo_limite(Tl),
    catch(call_with_time_limit(Tl, gera_frota(NumeroCamioes,ListaEntregas, ListaEntregasFinal)),
	Exception,
		(
			fail
		)).


% entrada do algoritmo genetico, TODO: vai ter de retornar a lista de entregas ordenada como segundo argumento
gera_frota(NumeroCamioes,ListaEntregas, ListaEntregasFinal):-
	inicializa(ListaEntregas),
	gera_populacao(PopulacaoEntregas),!,
	avalia_populacao(PopulacaoEntregas,PopulacaoEntregasAvaliada),
	ordena_populacao(PopulacaoEntregasAvaliada,PopulacaoEntregasOrdenada),
	numero_geracoes(NumeroGeracoes),
	gera_geracao_frota(NumeroCamioes,0,NumeroGeracoes,PopulacaoEntregasOrdenada, ListaEntregasFinal).

chama_geracao_frota() :-
    findall(Entrega,entrega(Entrega,_,_,_,_,_),ListaEntregas),
    numero_geracoes(NumeroGeracoes),
    gera_geracao_frota(4,0,NumeroGeracoes,ListaEntregas, ListaEntregasFinal).


% gera geracoes final
gera_geracao_frota(NumeroCamioes,NumeroDeGeracoes,NumeroDeGeracoes,PopulacaoOrdenada,ListaEntregasfinal):-!,
	% obtem o melhor individuo da populacao ordenada sem a avaliacao
	primeiraListaEntregasSemAvaliacao(PopulacaoOrdenada,ListaEntregasfinal).

% gera geracoes recursivo
gera_geracao_frota(NumeroCamioes,NumeroAtualDeGeracao,NumeroDeGeracoes,PopulacaoOrdenada, ListaEntregasfinal):-
	% obtem os elementos elite da populacao para ListaElites
	nElitesDaPopulacao(PopulacaoOrdenada, ListaElites),
	obter_sequencia_valida(NumeroCamioes,PopulacaoOrdenada,PopulacaoCruzadaEMutada),
	% adiciona os elementos elite a populacao cruzada e mutada
	append(ListaElites,PopulacaoCruzadaEMutada,PopulacaoCruzadaEMutadaComElites),
	avalia_populacao(PopulacaoCruzadaEMutadaComElites,PopulacaoAvaliada),
	ordena_populacao(PopulacaoAvaliada,NovaPopulacaoOrdenada),
	[IndividuoMelhorAvaliacao*ValorMelhorAvaliacao|_] = NovaPopulacaoOrdenada,
	% retira repetidos
	list_to_set(NovaPopulacaoOrdenada, NovaPopulacaoOrdenadaSemRepetidos),
	% corta a lista para ficar com o numero de individuos da populacao definido em numero_populacao/1
	numero_populacao(NumeroPopulacao),
	findall(Individuo, ( nth1(Indice,NovaPopulacaoOrdenadaSemRepetidos,Individuo), Indice =< NumeroPopulacao), NovaPopulacaoProntaParaProximaGeracao),
	% se as geracoes estabilizaram, coloca o numero de geracao seguinte  para o maximo para terminar
	verificaSeGeracaoEstabilizou(NumeroAtualDeGeracao, NovaPopulacaoProntaParaProximaGeracao, NumeroSeguinteDeGeracao),
	% recursao para gerar a proxima geracao
	gera_geracao_frota(NumeroCamioes,NumeroSeguinteDeGeracao,NumeroDeGeracoes,NovaPopulacaoProntaParaProximaGeracao,ListaEntregasfinal).


desemcapsular_lista([ListaEntrega|_],ListaEntrega).

obter_sequencia_valida(NumeroCamioes,PopulacaoOrdenada,PopulacaoCruzadaEMutada):-
    % baralha a populacao para evitar que o cruzamento seja sempre o mesmo
    random_permutation(PopulacaoOrdenada,PopulacaoEmbaralhada), 
	cruzamento(PopulacaoEmbaralhada,PopulacaoCruzada),!,
	mutacao(PopulacaoCruzada,PopulacaoCruzadaEMutada1),
    sequencia_de_entregas_valida(NumeroCamioes,PopulacaoCruzadaEMutada1,EValida),
    (
        (EValida=0,obter_sequencia_valida(NumeroCamioes,PopulacaoOrdenada,PopulacaoCruzadaEMutada));
        (PopulacaoCruzadaEMutada=PopulacaoCruzadaEMutada1)
    ).

distribuir_entregas_por_camioes([],_,[]).
distribuir_entregas_por_camioes([Camiao|ListaCamioes],ListaEntregas,ListaEncomendasPorCamioes):-
     distribuir_entregas_por_camiao(ListaEntregas, ListaEntregasParaCamiao, ListaEntregasRestante),
    EntregasParaCamiao = [Camiao|[ListaEntregasParaCamiao]],
    (ListaCamioes = [] -> ListaEncomendasPorCamioes = [EntregasParaCamiao];
     distribuir_entregas_por_camioes(ListaCamioes, ListaEntregasRestante, Tail)),
    ListaEncomendasPorCamioes = [EntregasParaCamiao|Tail].

distribuir_entregas_por_camiao(ListaEntregasAtual,ListaEntregasParaCamiao,ListaEntregasRestante) :-
    associar_entregas_a_camiao(ListaEntregasAtual,0,[],ListaEntregasParaCamiao),
    subtract(ListaEntregasAtual,ListaEntregasParaCamiao,ListaEntregasRestante).

sequencia_de_entregas_valida(NumeroDeCamioes,ListaEntregas,SequenciaEValida):-
    desemcapsular_lista(ListaEntregas,ListaEntregas2),
    sequencia_de_entregas_valida1(ListaEntregas2,NumeroDeCamioes,0,SequenciaEValida).
    
sequencia_de_entregas_valida1([],_,_,1).
sequencia_de_entregas_valida1(ListaEntregas,NumeroDeCamioes,NumeroCamioesUtilizado,SequenciaEValida):-
        NumeroCamioesUtilizadoCalc is NumeroCamioesUtilizado + 1,
    (
        (NumeroCamioesUtilizadoCalc>NumeroDeCamioes,!,SequenciaEValida is 0,true);
        (associar_entregas_a_camiao(ListaEntregas,0,[],Entregas),
        subtract(ListaEntregas,Entregas,ListaRestante),
        sequencia_de_entregas_valida1(ListaRestante,NumeroDeCamioes,NumeroCamioesUtilizadoCalc,SequenciaEValida))
    ).

associar_entregas_a_camiao([],_,EntregasAcc,EntregasAcc).
associar_entregas_a_camiao([Entrega|ListaEntregas],PesoAtualAcc,EntregasAcc,Entregas):-
    entrega(Entrega,_,PesoEntrega,_,_,_),
    PesoAtualCalculado is PesoAtualAcc + PesoEntrega,
    (
        (PesoAtualCalculado > 4300,Entregas=EntregasAcc,!,true);
        (associar_entregas_a_camiao(ListaEntregas,PesoAtualCalculado,[Entrega|EntregasAcc],Entregas1),
        reverse(Entregas1,Entregas))
    ).
    
distribuir_entregas(ListaCamioes, ListaEntregas, ListaEntregasDistribuidasPorCamiao) :-
    distribuir_entregas1(ListaCamioes,ListaEntregas,0,ListaEntregasDistribuidasPorCamiao).

distribuir_entregas1([],_, _,[]).

distribuir_entregas1([Camiao|ListaCamioes],ListaEntregas, NumeroCamiaoAcc, [EntregasParaCamiaoAcc|ListaEntregasDistribuidasPorCamiao]):-
    NumeroCamiaoCalc is NumeroCamiaoAcc + 1,
    obter_entregas_para_camiao(NumeroCamiaoCalc,ListaEntregas,ListaEntregasParaCamiao),
    EntregasParaCamiao=[Camiao|ListaEntregasParaCamiao],
    distribuir_entregas1(ListaCamioes,ListaEntregas,NumeroCamiaoCalc,EntregasParaCamiao).


obter_conjunto_camioes(ListaCamioes,NumeroCamioes,ListaConjuntoCamioes):-
    NumeroCamioesCalc is NumeroCamioes - 1,
    findall(X, (between(0,NumeroCamioesCalc, I),nth0(I,ListaCamioes, X)),ListaConjuntoCamioes).

obter_numero_camioes_necessarios(ListaEntregas,NumeroCamioesNecessario) :-
    obter_peso_total_entregas(ListaEntregas,PesoTotalEntregas),
    NumeroCamioesNecessario1 is PesoTotalEntregas/4300,
    obter_parte_decimal(NumeroCamioesNecessario1,ParteDecimal),
    NumeroCamioesNecessarioCalc is NumeroCamioesNecessario1 - ParteDecimal,
    ((ParteDecimal >= 0.8,!,NumeroCamioesNecessario is NumeroCamioesNecessarioCalc + 2);
    (NumeroCamioesNecessario is NumeroCamioesNecessarioCalc+1)).

verificar_pre_requisitos(NumeroCamioesDisponiveis,NumeroCamioesNecessarios) :-
     ((NumeroCamioesDisponiveis >= NumeroCamioesNecessarios,!,format(user_output,'Número de camiões disponíveis é suficiente para o número de camiões necessários. Número de camiões necessários: ~p~n', NumeroCamioesNecessarios))
    ;format(user_output,'Número de camiões disponíveis é insuficiente para o número de camiões necessários. 
                         Número de camiões necessários: ~p. Número de camiões disponíveis:~p~n', 
                         [NumeroCamioesNecessarios,NumeroCamioesDisponiveis]),
    fail).

obter_entregas_para_camiao(NumeroCamiao,ListaEntregas,ListaEntregasParaOCamiao):-
    NumeroCamiaoCalc is NumeroCamiao - 1,
    OffSet is NumeroCamiaoCalc * 4,
    PosicaoFinal is OffSet + 3,
    length(ListaEntregas,NumeroEntregas),
    ((PosicaoFinal > NumeroEntregas,!,PosicaoFinalCalc is NumeroEntregas - 1);
    (PosicaoFinalCalc is PosicaoFinal)),
    findall(X, (between(OffSet,PosicaoFinalCalc, I),nth0(I,ListaEntregas, X)),ListaEntregasParaOCamiao),
    length(ListaEntregasParaOCamiao,Tamanho).

obter_peso_total_entregas(ListaEntregas,Peso) :-
    obter_peso_total_entregas1(ListaEntregas,0,Peso).

obter_peso_total_entregas1([],Peso,Peso).
obter_peso_total_entregas1([Entrega|ListaEntregas],Peso1,Peso):-
    entrega(Entrega,_,PesoEntrega,_,_,_),
    PesoCalc is Peso1 + PesoEntrega,
    obter_peso_total_entregas1(ListaEntregas,PesoCalc,Peso).

obter_parte_decimal(X, Y) :-
    floor(X, Z),
    Y is X - Z.
