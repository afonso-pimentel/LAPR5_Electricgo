limpar_base_conhecimento_frota():-
    retractall(armazem_principal(_,_)),
    retractall(idArmazem(_,_)),
    retractall(distancia(_,_,_)),
    retractall(tempo(_,_,_)),
    retractall(energia(_,_,_)),
    retractall(tempo_extra(_,_,_)),
    retractall(entrega(_,_,_,_,_,_)),
    retractall(camiao(_)).

criar_base_conhecimento_frota(Data):-
    assert_armazens(Data.warehouses),
    assert_armazem_principal(Data.primaryWarehouse),
    assert_caminhos(Data.paths),
    assert_entregas(Data.deliveries),
    assert_camioes(Data.trucks).

assert_camioes([]).

assert_camioes([Camiao|ListaCamioes]) :-
    assertz(camiao(Camiao.id)),
    assert_camioes(ListaCamioes).


limpar_base_conhecimento():-
    retractall(armazem_principal(_,_)),
    retractall(idArmazem(_,_)),
    retractall(distancia(_,_,_)),
    retractall(tempo(_,_,_)),
    retractall(energia(_,_,_)),
    retractall(tempo_extra(_,_,_)),
    retractall(entrega(_,_,_,_,_,_)),
    retractall(heuristica(_)).

criar_base_conhecimento(Data):-
    assert_armazens(Data.warehouses),
    assert_armazem_principal(Data.primaryWarehouse),
    assert_caminhos(Data.paths),
    assert_entregas(Data.deliveries),
    assert_heuristicas(Data.heuristic).
    
assert_heuristicas(Heuristica):-
    obter_numero_seguro(Heuristica,NumeroHeuristica),
    assertz(heuristica(NumeroHeuristica)).

assert_armazem_principal(ArmazemPrincipal):-
    assertz(armazem_principal(ArmazemPrincipal.id,ArmazemPrincipal.name)).

assert_entregas([]).
assert_entregas([Entrega|ListaEntregas]):-
    obter_numero_seguro(Entrega.load,Load),
    obter_numero_seguro(Entrega.loadTime,LoadTime),
    obter_numero_seguro(Entrega.unloadtime,UnloadTime),
    assertz(entrega(Entrega.id,Entrega.date,Load,Entrega.warehouseId,LoadTime,UnloadTime)),
    assert_entregas(ListaEntregas).

obter_numero_seguro(NumeroEmString,Numero):-
    ((number(NumeroEmString),Numero is NumeroEmString,!);!,
    atom_number(NumeroEmString,Numero)).

assert_caminhos([]).

assert_caminhos([Caminho|ListaCaminhos]):-
    obter_numero_seguro(Caminho.distance,Distancia),
    obter_numero_seguro(Caminho.time,Tempo),
    obter_numero_seguro(Caminho.energy,Energia),
    obter_numero_seguro(Caminho.extraTime,TempoExtra),
    assertz(distancia(Caminho.originId,Caminho.destinationId,Distancia)),
    assertz(tempo(Caminho.originId,Caminho.destinationId,Tempo)),
    assertz(energia(Caminho.originId,Caminho.destinationId,Energia)),
    assertz(tempo_extra(Caminho.originId,Caminho.destinationId,TempoExtra)),
    assert_caminhos(ListaCaminhos).

assert_armazens([]).

assert_armazens([Armazem|ListaArmazens]) :-
    assertz(idArmazem(Armazem.name,Armazem.id)),
    assert_armazens(ListaArmazens).
    