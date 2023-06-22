:- use_module(library(http/http_server)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- use_module(library(term_to_json)).

:-include('logica.pl').
:-include('servidor_base_conhecimento_dinamica.pl').
:-include('servidor_json.pl').

startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).

:- http_handler('/fleetPlanning',handle_planeamento_frota,[]).
:- http_handler('/planning',handle_planeamento,[]).

% Planeamento da frota com recurso a algoritmo genético
handle_planeamento_frota(Request) :-
    http_read_json_dict(Request, JSONIn,[json_object(term)]),
    Data = JSONIn,
    limpar_base_conhecimento_frota(),
    criar_base_conhecimento_frota(Data),
    obter_lista_identificadores_de_entregas_para_fazer_planeamento(Data.deliveries,ListaIdentificadorEntregas),
    obter_lista_camioes(ListaCamioes),
    algoritmo_genetico_frota(ListaCamioes,ListaIdentificadorEntregas,ListaEntregasPorCamiao),
    planeamento_frota(ListaEntregasPorCamiao,PlaneamentoFrota),
    Planeamento=planeamento_frota_json(PlaneamentoFrota),
    prolog_to_json(Planeamento,RespostaJson),
    reply_json(RespostaJson).

planeamento_frota([EntregasCamiao|ListaEntregasPorCamiao],PlaneamentoFrota):-
    planeamento_frota([EntregasCamiao|ListaEntregasPorCamiao],[],PlaneamentoFrota).

planeamento_frota([],Acc,Acc).
planeamento_frota([H|T],Acc,ReversedList):-
    (
        (is_empty_list(H),planeamento_frota(T,Acc,ReversedList));
        (planeamento_camiao(H,PlaneamentoCamiao),planeamento_frota(T,[PlaneamentoCamiao|Acc],ReversedList))
    ).

planeamento_camiao([_,[]],[]).
planeamento_camiao([Camiao|ListaEntregas],PlaneamentoCamiao):-
    desemcapsular_lista(ListaEntregas,ListaEntregas2),
    encontrar_dados_para_entregas(ListaEntregas2,ListaPesos,LOrdemDeArmazens),
    calcula_custo(ListaEntregas2,LOrdemDeArmazens,ListaPesos,Custo,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem),
    PlaneamentoCamiao=planeamento_camiao_json(Camiao,ListaEntregas2,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).

obter_lista_camioes(ListaCamioes):-
    findall(Camiao,camiao(Camiao),ListaCamioes).

% Planning para obtenção de custo mínimo com recurso a heuristicas
handle_planeamento(Request) :-
    http_read_json_dict(Request, JSONIn,[json_object(term)]),
    Data = JSONIn,
    limpar_base_conhecimento(),
    criar_base_conhecimento(Data),
    obter_lista_identificadores_de_entregas_para_fazer_planeamento(Data.deliveries,ListaIdentificadorEntregas),
    obter_planning(ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo),
    DictOut=Data,
    RespostaJson=planeamento_rota(LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo),
    prolog_to_json(RespostaJson,Resposta),
    format(user_output,'Resposta: ~p~n',Resposta),
    reply_json(Resposta).

obter_planning(ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo):-
    length(ListaIdentificadorEntregas,QuantidadeEntregas),
    heuristica(Heuristica),
    format(user_output,"Utilizador escolheu heuristica: ~p~n",Heuristica),
    (
        (
            QuantidadeEntregas < 2,
            format(user_output,"Quantidade de entregas detetada é inferior ao número de entregas máximo para a obtenção de um caminho de custo minimo. A utilizar sequência de custo minimo!~n",[]),
            sequencia_custo_min(ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo));
    (
            gerar_planning_heuristica(Heuristica,ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo)
    )
    ).

gerar_planning_heuristica(1,ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo):-
    format(user_output,'A utilizar heuristica de peso!~n',[]),
    heuristica_peso(ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).

gerar_planning_heuristica(2,ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo) :-
    format(user_output,'A utilizar heuristica de distância!~n',[]),
    heuristica_distancia(ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).

gerar_planning_heuristica(3,ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo):-
    format(user_output,'A utilizar heuristica de produto!~n',[]),
    heuristica_produto(ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).

gerar_planning_heuristica(4,ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo):-
    format(user_output,'A utilizar algoritmo genetico!~n',[]),
    algoritmo_genetico(ListaIdentificadorEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).

imprimir_ordem_entregas([]) :- format(user_output,'Empty list detected~n',[]).

imprimir_ordem_entregas([Entrega|ListaOrdemEntregas]):-
    format(user_output,'Entrega: ~p~n', Entrega),
    imprimir_ordem_entregas(ListaOrdemEntregas).

obter_lista_identificadores_de_entregas_para_fazer_planeamento(ListaEntregas,ListaIdentificadorEntregas):-
    obter_lista_identificadores_de_entregas_para_fazer_planeamento1(ListaEntregas,[],ListaIdentificadorEntregas1),
    reverse(ListaIdentificadorEntregas1,ListaIdentificadorEntregas).

obter_lista_identificadores_de_entregas_para_fazer_planeamento1([],ListaIdentificadorEntregasAcc,ListaIdentificadorEntregasAcc).

obter_lista_identificadores_de_entregas_para_fazer_planeamento1([Entrega|ListaEntregas],ListaIdentificadorEntregasAcc,ListaIdentificadorEntregas):-
    obter_lista_identificadores_de_entregas_para_fazer_planeamento1(ListaEntregas,[Entrega.id|ListaIdentificadorEntregasAcc],ListaIdentificadorEntregas).