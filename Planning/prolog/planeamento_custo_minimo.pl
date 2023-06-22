carateristicasCam(eTruck01,7500,4300,80,100,60).

limites_energia(EnergiaA80PorCento,EnergiaA20Porcento):-
    EnergiaA80PorCento is 64,
    EnergiaA20Porcento is 16.
    
carga_maxima(CargaMaxima) :-
    carateristicasCam(eTruck01,Tara,CapacidadeCarga,_,_,_),
    CargaMaxima is Tara + CapacidadeCarga.

energia_maxima(EnergiaMaxima) :-
    carateristicasCam(eTruck01,_,_,EnergiaMaxima,_,_).


%a soma_pesos

soma_pesos([],[],[],0).
soma_pesos([_|LC], [Peso|LP], [PesoAc|LPA], PesoAc) :-
    soma_pesos(LC, LP, LPA, PesoAc1), PesoAc is Peso + PesoAc1.

%b acrescenta_tara
acrescenta_tara(Tara,[],[Tara]).
acrescenta_tara(Tara,[Peso|LP],[PesoTara|LPT]):-
    acrescenta_tara(Tara,LP,LPT),
    PesoTara is Peso+Tara.

calculo_metricas_trajeto(ArmazemOrigem,ArmazemDestino,PesoAtual,Tempo,Energia):-
    tempo(ArmazemOrigem,ArmazemDestino,TempoComCargaMaxima),
    carga_maxima(CargaMaxima),
    TempoEmDecimal is (TempoComCargaMaxima*PesoAtual)/CargaMaxima,
    converter_decimal_para_minutos(TempoEmDecimal,Tempo),
    energia(ArmazemOrigem,ArmazemDestino,EnergiaComCargaMaxima),
    Energia is (EnergiaComCargaMaxima*PesoAtual)/CargaMaxima.

calculo_tempo_carregamento(CargaAtual,TempoCarga,QuantidadeCarga):-
    QuantidadeCarga is 64-CargaAtual,
    TempoCarga is QuantidadeCarga*(60/48).

calcula_tempo_espera(TempoCarregamentoBateria,NumeroEntrega,TempoEspera) :-
    entrega(NumeroEntrega,_,_,_,_,TempoDescarregamento),
    ((TempoCarregamentoBateria>TempoDescarregamento,!,TempoEspera is TempoCarregamentoBateria);
    (TempoEspera is TempoDescarregamento)).


calculo_tempo_trajeto_final(Entrega,CargaAtual,CustoTrajetoFinal,TempoCarga,QuantidadeCarga,TempoEspera) :-
    entrega(Entrega,_,_,_,_,TempoDescarregamento),
    limites_energia(_,EnergiaA20Porcento),
    Custo is CargaAtual-CustoTrajetoFinal,
    QuantidadeCarga is EnergiaA20Porcento-Custo,
    TempoCarga is QuantidadeCarga*(60/48),
    ((TempoCarga>TempoDescarregamento,!,TempoEspera is TempoDescarregamento-TempoCarga);
    (TempoEspera is 0)).

trajeto_atual_e_o_trajeto_retorno([]).

nao_tem_energia_suficiente(DiferencaEnergia):-
   limites_energia(_,EnergiaA20Porcento),
    (DiferencaEnergia<0;DiferencaEnergia<EnergiaA20Porcento).

converter_decimal_para_minutos(TempoComoDecimal,TempoEmMinutos):-
    ValorInteiro is float_integer_part(TempoComoDecimal),
    ValorDecimal is float_fractional_part(TempoComoDecimal),
    TempoEmMinutos is (ValorInteiro + ((ValorDecimal * (60/1))/100)).
    
encontrar_dados_para_entregas(ListaEntregas,ListaPesos,ListaArmazens) :-
    encontrar_dados_para_entregas1(ListaEntregas,[],[],ListaPesosAcc,ListaArmazensAcc),
    reverse(ListaPesosAcc,ListaPesos),
    reverse(ListaArmazensAcc,ListaArmazens).

encontrar_dados_para_entregas1([],A,B,A,B).
encontrar_dados_para_entregas1([Entrega|ListaEntregas],ListaPesos,ListaArmazens,ListaPesosFinal,ListaArmazensFinal) :-
    entrega(Entrega,_,Peso,Armazem,_,_),!,
    encontrar_dados_para_entregas1(ListaEntregas,[Peso|ListaPesos],[Armazem|ListaArmazens],ListaPesosFinal,ListaArmazensFinal);
    encontrar_dados_para_entregas1(ListaEntregas,ListaPesos,ListaArmazens,ListaPesosFinal,ListaArmazensFinal).

atualiza(LOrdemEntregas,LOrdemArmazens,Custo,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem):-
  custo_min(_,_,_,_,_,CustoMin),
  ((Custo<CustoMin,!,retract(custo_min(_,_,_,_,_,_)),assertz(custo_min(LOrdemEntregas,LOrdemArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo)))
    ;true).

%c calcula_custo
calcula_custo(ListaEntregas,ListaArmazens,ListaPesos,Custo,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem):-
    soma_pesos(ListaArmazens,ListaPesos,ListaPesosAcumulados,_),
    carateristicasCam(eTruck01,Tara,_,_,_,_),
    acrescenta_tara(Tara,ListaPesosAcumulados,ListaPesosTotais),
    armazem_principal(ArmazemPrincipal,_),
    append([ArmazemPrincipal|ListaArmazens],[ArmazemPrincipal],ListaArmazensCompleta),
    last(ListaEntregas,UltimoElementoListaEntregas),
    ListaTrajetosEntregas=[UltimoElementoListaEntregas],
    append(ListaEntregas,ListaTrajetosEntregas,ListaEntregasFinal),
    energia_maxima(EnergiaMaxima),
    custo(ListaEntregasFinal,ListaArmazensCompleta,ListaPesosTotais,EnergiaMaxima,Custo,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem).

custo(_,[_],[],_,0,[],[],[]).
custo([Entrega|ListaEntregas],[Armazem1,Armazem2|ListaArmazens],[PesoTotal|ListaPesosTotais],EnergiaAtual,Custo,ListaCarregamentos,ListaQuantidadesCarregamento,ListaTemposCarregamento):-
    limites_energia(EnergiaA80PorCento,EnergiaA20Porcento),
    calculo_metricas_trajeto(Armazem1,Armazem2,PesoTotal,TempoTrajeto,EnergiaNecessaria),
    DiferencaEnergia is EnergiaAtual-EnergiaNecessaria,
    (((nao_tem_energia_suficiente(DiferencaEnergia)),!,
        ((trajeto_atual_e_o_trajeto_retorno(ListaArmazens),!,calculo_tempo_trajeto_final(Entrega,EnergiaAtual,EnergiaNecessaria,TempoCarga,QuantidadeCarga,TempoEspera);
                            calculo_tempo_carregamento(EnergiaAtual,TempoCarga,QuantidadeCarga),calcula_tempo_espera(TempoCarga,Entrega,TempoEspera))),
        EnergiaAtualCalc is EnergiaA80PorCento-EnergiaNecessaria,
        ListaCarregamentos=[Armazem1|ListaCArmazens],
        ListaQuantidadesCarregamento=[QuantidadeCarga|ListaQCarregamento],
        ListaTemposCarregamento=[TempoCarga|ListaTCarregamento]);
      (EnergiaAtualCalc is EnergiaAtual-EnergiaNecessaria,
      TempoCarga is 0,
      calcula_tempo_espera(TempoCarga,Entrega,TempoEspera),
      ListaCarregamentos=ListaCArmazens,
      ListaQuantidadesCarregamento=ListaQCarregamento),
      ListaTemposCarregamento=ListaTCarregamento),
      tempo_extra(Armazem1,Armazem2,TempoExtra),
    ((TempoExtra>0,EnergiaAtual1 is EnergiaA20Porcento);
     (TempoExtra is 0, EnergiaAtual1 is EnergiaAtualCalc)),
    custo(ListaEntregas,[Armazem2|ListaArmazens],ListaPesosTotais,EnergiaAtual1,Custo1,ListaCArmazens,ListaQCarregamento,ListaTCarregamento),
    Custo is Custo1+TempoTrajeto+TempoEspera+TempoExtra.


run(ListaEntregas):-
    retractall(custo_min(_,_,_,_,_,_)),
    assertz(custo_min(_,_,_,_,_,100000)),
    permutation(ListaEntregas,ListaEntregasPermutada),
    encontrar_dados_para_entregas(ListaEntregasPermutada,ListaPesos,ListaArmazens),
    calcula_custo(ListaEntregasPermutada,ListaArmazens,ListaPesos,Custo,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem),
    atualiza(ListaEntregasPermutada,ListaArmazens,Custo,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem),
    fail.

%d sequencia_custo_min

sequencia_custo_min(ListaEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo):-
    (run(ListaEntregas);true),
    custo_min(LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).

gerar_combinacoes_de_entregas(ListaEntregas,ListaCombinacoes) :-
      findall(ListaEntregasPermutada,permutation(ListaEntregas,ListaEntregasPermutada),ListaCombinacoes).


heuristica_peso(ListaEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo):-
    ordenar_entregas_por_peso(ListaEntregas,LOrdemDeEntregas),
    encontrar_dados_para_entregas(LOrdemDeEntregas,ListaPesos,LOrdemDeArmazens),
    calcula_custo(LOrdemDeEntregas,LOrdemDeArmazens,ListaPesos,Custo,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem).

ordenar_entregas_por_peso(ListaEntregas,Result) :- findall([Entrega,Peso],(entrega(Entrega,_,Peso,_,_,_),member(Entrega,ListaEntregas)),List),
            sort(2, @=<, List, Res),
            reverse(Res,Res2),
            maplist(nth0(0), Res2, Result).

heuristica_distancia(ListaEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo) :-
    encontrar_dados_para_entregas(ListaEntregas,ListaPesos,LOrdemDeArmazens1),
    armazem_principal(IdArmazemPrincipal,_),
    ListaTrajeto=[IdArmazemPrincipal|LOrdemDeArmazens1],
    determinar_trajeto_distancia(ListaTrajeto,TrajetoFinal1),
    append(TrajetoFinal1,[IdArmazemPrincipal],TrajetoFinal),
    encontrar_identificadores_entregas_para_armazens(TrajetoFinal,IdArmazemPrincipal,ListaEntregasFinal),
    encontrar_dados_para_entregas(ListaEntregasFinal,ListaPesos2,LOrdemDeArmazens2),
    calcula_custo(ListaEntregasFinal,LOrdemDeArmazens2,ListaPesos2,Custo,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem),
    LOrdemDeEntregas=ListaEntregasFinal,
    LOrdemDeArmazens=LOrdemDeArmazens2.

determinar_trajeto_distancia([],[]).
determinar_trajeto_distancia([ArmazemAtual|ListaArmazens],[ArmazemAtual|TrajetoFinal]):-
    Origem = ArmazemAtual,
    proximo_destino_com_menor_distancia(ListaArmazens,Origem,ProximoDestino,_),
    NovoArmazemAtual = ProximoDestino,
    atualizar_lista(ListaArmazens,ProximoDestino,NovoArmazemAtual,ListaArmazensAtualizadaComNovoArmazemAtual),
    determinar_trajeto_distancia(ListaArmazensAtualizadaComNovoArmazemAtual,TrajetoFinal),!.

atualizar_lista([],_,_,[]).
atualizar_lista(ListaArmazens,ProximoDestino,NovoArmazemAtual,ListaArmazensAtualizadaComNovoArmazemAtual):-
    delete(ListaArmazens,ProximoDestino,ListaArmazensSemProximoDestino),
    ListaArmazensAtualizadaComNovoArmazemAtual=[NovoArmazemAtual|ListaArmazensSemProximoDestino].

proximo_destino_com_menor_distancia([],_,-1,10000).

proximo_destino_com_menor_distancia([OpcaoArmazem|ListaOpcoesArmazens],Origem,ProximoDestino,MenorDistancia) :-
    distancia(Origem,OpcaoArmazem,Distancia),
    proximo_destino_com_menor_distancia(ListaOpcoesArmazens,Origem,OpcaoEscolhida1,MenorDistanciaCalculado1),
    (
        (
            Distancia<MenorDistanciaCalculado1,
            !,
            MenorDistancia is Distancia,
            ProximoDestino = OpcaoArmazem
        );
        ( 
        !,
        MenorDistancia is MenorDistanciaCalculado1,
        ProximoDestino = OpcaoEscolhida1
        )
    ).


heuristica_produto(ListaEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo) :-
    encontrar_dados_para_entregas(ListaEntregas,ListaPesos,LOrdemDeArmazens1),
    armazem_principal(IdArmazemPrincipal,_),
    ListaTrajeto=[IdArmazemPrincipal|LOrdemDeArmazens1],
    determinar_trajeto_produto(ListaTrajeto,TrajetoFinal1),
    append(TrajetoFinal1,[IdArmazemPrincipal],TrajetoFinal),
    encontrar_identificadores_entregas_para_armazens(TrajetoFinal,IdArmazemPrincipal,ListaEntregasFinal),
    encontrar_dados_para_entregas(ListaEntregasFinal,ListaPesos2,LOrdemDeArmazens2),
    calcula_custo(ListaEntregasFinal,LOrdemDeArmazens2,ListaPesos2,Custo,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem),
    LOrdemDeEntregas=ListaEntregasFinal,
    LOrdemDeArmazens=LOrdemDeArmazens2.

determinar_trajeto_produto([],[]).
determinar_trajeto_produto([ArmazemAtual|ListaArmazens],[ArmazemAtual|TrajetoFinal]):-
    Origem = ArmazemAtual,
    proximo_destino_com_menor_produto(ListaArmazens,Origem,ProximoDestino,_),
    NovoArmazemAtual = ProximoDestino,
    atualizar_lista(ListaArmazens,ProximoDestino,NovoArmazemAtual,ListaArmazensAtualizadaComNovoArmazemAtual),
    determinar_trajeto_produto(ListaArmazensAtualizadaComNovoArmazemAtual,TrajetoFinal),!.

proximo_destino_com_menor_produto([],_,-1,9999999).

proximo_destino_com_menor_produto([OpcaoArmazem|ListaOpcoesArmazens],Origem,ProximoDestino,MenorProduto) :-
    entrega(_,_,Peso,OpcaoArmazem,_,_),
    distancia(Origem,OpcaoArmazem,Distancia),
    carateristicasCam(eTruck01,Tara,_,_,_,_),
    proximo_destino_com_menor_produto(ListaOpcoesArmazens,Origem,OpcaoEscolhida1,MenorProdutoCalculado1),
    Massa is Tara+Peso,
    Produto is Distancia*Massa,
    (
        (
            Produto<MenorProdutoCalculado1,
            !,
            MenorProduto is Produto,
            ProximoDestino = OpcaoArmazem
        );
        ( 
        !,
        MenorProduto is MenorProdutoCalculado1,
        ProximoDestino = OpcaoEscolhida1
        )
    ).

encontrar_identificadores_entregas_para_armazens(ListaArmazens,ArmazemPrincipal,ListaEntregas):-
    delete(ListaArmazens,ArmazemPrincipal,ListaArmazensAtualizada),
    encontrar_identificadores_entregas_para_armazens1(ListaArmazensAtualizada,[],ListaEntregasCalc),
    reverse(ListaEntregasCalc,ListaEntregas).

encontrar_identificadores_entregas_para_armazens1([],A,A).
encontrar_identificadores_entregas_para_armazens1([Armazem|ListaArmazens],ListaEntregasAcumulada,ListaEntregasFinal):-
    entrega(Entrega,_,_,Armazem,_,_),!,
    encontrar_identificadores_entregas_para_armazens1(ListaArmazens,[Entrega|ListaEntregasAcumulada],ListaEntregasFinal).
