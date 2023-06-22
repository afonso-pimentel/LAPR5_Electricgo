:-include('db.pl').
:-include('logica.pl').

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

take([_|_], 0, []).
take([H|_], 1,[H]).
take([X|T1], N,[X|T2]):-N>=0,N1 is N-1,take(T1,N1,T2).

testAlgoritm(Num,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo):-
statistics(walltime, [TimeSinceStart | [TimeSinceLastCall]]),take([4439,4440,4441,4442,4443,4444,4445,4446,4447,4448,4449,4450,4451,4452,4453,4454], Num, ListEntregas),
sequencia_custo_min(ListEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo),
statistics(walltime, [NewTimeSinceStart | [ExecutionTime]]),write('Execution took '), write(ExecutionTime), write(' ms.'), nl.

test_heuristica_peso(Num,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo):-
statistics(walltime, [TimeSinceStart | [TimeSinceLastCall]]),take([4439,4440,4441,4442,4443,4444,4445,4446,4447,4448,4449,4450,4451,4452,4453,4454], Num, ListEntregas),
heuristica_peso(ListEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo),
statistics(walltime, [NewTimeSinceStart | [ExecutionTime]]),
write('Execution took '), write(ExecutionTime), write(' ms.'), nl.

test_heuristica_distancia(Num,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo):-
statistics(walltime, [TimeSinceStart | [TimeSinceLastCall]]),take([4439,4440,4441,4442,4443,4444,4445,4446,4447,4448,4449,4450,4451,4452,4453,4454], Num, ListEntregas),
heuristica_distancia(ListEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo),
statistics(walltime, [NewTimeSinceStart | [ExecutionTime]]),
write('Execution took '), write(ExecutionTime), write(' ms.'), nl.

test_heuristica_produto(Num,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo):-
statistics(walltime, [TimeSinceStart | [TimeSinceLastCall]]),take([4439,4440,4441,4442,4443,4444,4445,4446,4447,4448,4449,4450,4451,4452,4453], Num, ListEntregas),
heuristica_produto(ListEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo),statistics(walltime, [NewTimeSinceStart | [ExecutionTime]]),
write('Execution took '), write(ExecutionTime), write(' ms.'), nl.


%testAlgoritm(5,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 8 ms.
%LOrdemDeEntregas = [4442, 4441, 4440, 4443, 4439], 
%LOrdemDeArmazens = [4, 3, 2, 10, 1],
%ListaCarregamentosArmazem = [1],
%ListaQuantidadesCarregamento = [32.99152542372882],
%ListaTemposCarregamentoArmazem = [41.239406779661024],
%Custo = 340.47923728813555
%%test_heuristica_peso(5,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 9 ms.
%LOrdemDeEntregas = [4443, 4442, 4440, 4441, 4439],
%LOrdemDeArmazens = [10, 4, 2, 3, 1],
%ListaCarregamentosArmazem = [2, 1],
%ListaQuantidadesCarregamento = [46.89830508474576, 28.389830508474574],
%ListaTemposCarregamentoArmazem = [58.62288135593219, 35.48728813559322],
%Custo = 486.5847457627118
%%test_heuristica_distancia(5,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4442, 4441, 4440, 4443, 4439],
%LOrdemDeArmazens = [4, 3, 2, 10, 1],
%ListaCarregamentosArmazem = [1],
%ListaQuantidadesCarregamento = [32.99152542372882],
%ListaTemposCarregamentoArmazem = [41.239406779661024],
%Custo = 340.47923728813555
%%test_heuristica_produto(5,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4442, 4441, 4440, 4443, 4439],
%LOrdemDeArmazens = [4, 3, 2, 10, 1],
%ListaCarregamentosArmazem = [1],
%ListaQuantidadesCarregamento = [32.99152542372882],
%ListaTemposCarregamentoArmazem = [41.239406779661024],
%Custo = 340.47923728813555


%%testAlgoritm(6,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 20 ms.
%LOrdemDeEntregas = [4442, 4440, 4443, 4439, 4444, 4441],
%LOrdemDeArmazens = [4, 2, 10, 1, 6, 3],
%ListaCarregamentosArmazem = [1, 3],
%ListaQuantidadesCarregamento = [39.809322033898304, 1.338983050847455],
%ListaTemposCarregamentoArmazem = [49.76165254237288, 1.6737288135593187],
%Custo = 412.548940677966
%%test_heuristica_peso(6,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4443, 4442, 4440, 4444, 4441, 4439],
%LOrdemDeArmazens = [10, 4, 2, 6, 3, 1],
%ListaCarregamentosArmazem = [4, 6, 3, 1],
%ListaQuantidadesCarregamento = [31.96186440677966, 34.970338983050844, 24.79661016949153, 14.033898305084747],
%ListaTemposCarregamentoArmazem = [39.952330508474574, 43.71292372881356, 30.995762711864412, 17.542372881355934],
%Custo = 613.7940677966102
%%test_heuristica_distancia(6,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4442, 4441, 4440, 4443, 4444, 4439],
%LOrdemDeArmazens = [4, 3, 2, 10, 6, 1],
%ListaCarregamentosArmazem = [6],
%ListaQuantidadesCarregamento = [39.224576271186436],
%ListaTemposCarregamentoArmazem = [49.030720338983045],
%Custo = 452.2908898305085
%%test_heuristica_produto(6,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4442, 4441, 4440, 4443, 4444, 4439],
%LOrdemDeArmazens = [4, 3, 2, 10, 6, 1],
%ListaCarregamentosArmazem = [6],
%ListaQuantidadesCarregamento = [39.224576271186436],
%ListaTemposCarregamentoArmazem = [49.030720338983045],
%Custo = 452.2908898305085


%%testAlgoritm(7,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 155 ms.
%LOrdemDeEntregas = [4442, 4441, 4440, 4443, 4444, 4439, 4445],
%LOrdemDeArmazens = [4, 3, 2, 10, 6, 1, 7],
%ListaCarregamentosArmazem = [6, 7],
%ListaQuantidadesCarregamento = [43.67372881355932, 10.29661016949153],
%ListaTemposCarregamentoArmazem = [54.59216101694915, 12.870762711864412],
%Custo = 479.23877118644066
%%%test_heuristica_peso(7,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4445, 4443, 4442, 4440, 4444, 4441, 4439],
%LOrdemDeArmazens = [7, 10, 4, 2, 6, 3, 1],
%ListaCarregamentosArmazem = [10, 2, 3, 1],
%ListaQuantidadesCarregamento = [42.71186440677966, 40.97033898305085, 42.98728813559322, 14.033898305084747],
%ListaTemposCarregamentoArmazem = [53.389830508474574, 51.212923728813564, 53.73411016949152, 17.542372881355934],
%Custo = 722.9072033898306
%%%test_heuristica_distancia(7,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4442, 4441, 4440, 4443, 4444, 4439, 4445],
%LOrdemDeArmazens = [4, 3, 2, 10, 6, 1, 7],
%ListaCarregamentosArmazem = [6, 7],
%ListaQuantidadesCarregamento = [43.67372881355932, 10.29661016949153],
%ListaTemposCarregamentoArmazem = [54.59216101694915, 12.870762711864412],
%Custo = 479.23877118644066
%%%test_heuristica_produto(7,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4442, 4441, 4440, 4443, 4444, 4439, 4445],
%LOrdemDeArmazens = [4, 3, 2, 10, 6, 1, 7],
%ListaCarregamentosArmazem = [6, 7],
%ListaQuantidadesCarregamento = [43.67372881355932, 10.29661016949153],
%ListaTemposCarregamentoArmazem = [54.59216101694915, 12.870762711864412],
%Custo = 479.23877118644066


%%%testAlgoritm(8,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 1405 ms.
%LOrdemDeEntregas = [4442, 4446, 4441, 4440, 4443, 4444, 4439, 4445],
%LOrdemDeArmazens = [4, 8, 3, 2, 10, 6, 1, 7],
%ListaCarregamentosArmazem = [6, 7],
%ListaQuantidadesCarregamento = [43.866949152542375, 10.29661016949153],
%ListaTemposCarregamentoArmazem = [54.833686440677965, 12.870762711864412],
%Custo = 505.8474152542373
%%%test_heuristica_peso(8,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4445, 4443, 4442, 4440, 4444, 4446, 4441, 4439],
%LOrdemDeArmazens = [7, 10, 4, 2, 6, 8, 3, 1],
%ListaCarregamentosArmazem = [10, 2, 3, 1],
%ListaQuantidadesCarregamento = [43.44406779661017, 41.550000000000004, 47.563559322033896, 14.033898305084747],
%ListaTemposCarregamentoArmazem = [54.30508474576271, 51.93750000000001, 59.45444915254237, 17.542372881355934],
%Custo = 774.9466949152543
%%%test_heuristica_distancia(8,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4442, 4440, 4443, 4444, 4439, 4445],
%LOrdemDeArmazens = [8, 3, 4, 2, 10, 6, 1, 7],
%ListaCarregamentosArmazem = [10, 1],
%ListaQuantidadesCarregamento = [38.189830508474586, 26.322033898305094],
%ListaTemposCarregamentoArmazem = [47.73728813559323, 32.90254237288137],
%Custo = 547.0455932203391
%%%test_heuristica_produto(8,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4442, 4440, 4443, 4444, 4439, 4445],
%LOrdemDeArmazens = [8, 3, 4, 2, 10, 6, 1, 7],
%ListaCarregamentosArmazem = [10, 1],
%ListaQuantidadesCarregamento = [38.189830508474586, 26.322033898305094],
%ListaTemposCarregamentoArmazem = [47.73728813559323, 32.90254237288137],
%Custo = 547.0455932203391


%%testAlgoritm(9,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 14052 ms.
%LOrdemDeEntregas = [4446, 4441, 4440, 4443, 4444, 4439, 4445, 4442, 4447],
%LOrdemDeArmazens = [8, 3, 2, 10, 6, 1, 7, 4, 9],
%ListaCarregamentosArmazem = [6, 7, 9],
%ListaQuantidadesCarregamento = [36.56271186440679, 43.20338983050847, 1.2118644067796591],    
%ListaTemposCarregamentoArmazem = [45.70338983050849, 54.004237288135585, 1.514830508474574],  
%Custo = 594.9557627118644
%%%test_heuristica_peso(9,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4445, 4443, 4442, 4440, 4444, 4447, 4446, 4441, 4439],
%LOrdemDeArmazens = [7, 10, 4, 2, 6, 9, 8, 3, 1],
%ListaCarregamentosArmazem = [10, 2, 6, 9, 3, 1],
%ListaQuantidadesCarregamento = [44.3593220338983, 42.27457627118643, 18.808474576271188, 48, 22.471186440677968, 14.033898305084747],
%ListaTemposCarregamentoArmazem = [55.44915254237288, 52.843220338983045, 23.510593220338983, 60.0, 28.08898305084746, 17.542372881355934],
%Custo = 945.577372881356
%%%test_heuristica_distancia(9,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4442, 4440, 4443, 4444, 4439, 4445, 4447],
%LOrdemDeArmazens = [8, 3, 4, 2, 10, 6, 1, 7, 9],
%ListaCarregamentosArmazem = [10, 1, 7],
%ListaQuantidadesCarregamento = [39.028813559322046, 26.79237288135593, 24.766949152542374],
%ListaTemposCarregamentoArmazem = [48.786016949152554, 33.49046610169491, 30.958686440677965],
%Custo = 628.6672033898304
%%%test_heuristica_produto(9,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4442, 4440, 4443, 4444, 4439, 4445, 4447],
%LOrdemDeArmazens = [8, 3, 4, 2, 10, 6, 1, 7, 9],
%ListaCarregamentosArmazem = [10, 1, 7],
%ListaQuantidadesCarregamento = [39.028813559322046, 26.79237288135593, 24.766949152542374],
%ListaTemposCarregamentoArmazem = [48.786016949152554, 33.49046610169491, 30.958686440677965],
%Custo = 628.6672033898304


%%%testAlgoritm(10,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 158077 ms.
%LOrdemDeEntregas = [4446, 4441, 4440, 4443, 4444, 4439, 4445, 4448, 4442|...],
%LOrdemDeArmazens = [8, 3, 2, 10, 6, 1, 7, 11, 4|...],
%ListaCarregamentosArmazem = [6, 7, 9],
%ListaQuantidadesCarregamento = [39.766101694915264, 46.152542372881356, 11.881355932203382],
%ListaTemposCarregamentoArmazem = [49.70762711864408, 57.690677966101696, 14.851694915254228],
%Custo = 682.188813559322
%%%test_heuristica_peso(10,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4445, 4443, 4448, 4442, 4440, 4444, 4447, 4446, 4441|...],
%LOrdemDeArmazens = [7, 10, 11, 4, 2, 6, 9, 8, 3|...],
%ListaCarregamentosArmazem = [7, 10, 11, 2, 6, 9, 3, 1],
%ListaQuantidadesCarregamento = [9.911864406779657, 38.108474576271185, 37.11186440677966, 30.935593220338987, 18.808474576271188, 48, 22.471186440677968, 14.033898305084747],
%ListaTemposCarregamentoArmazem = [12.38983050847457, 47.63559322033898, 46.389830508474574, 38.66949152542374, 23.510593220338983, 60.0, 28.08898305084746, 17.542372881355934],
%Custo = 1023.6266949152543
%%%test_heuristica_distancia(10,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4442, 4448, 4445, 4439, 4444, 4443, 4440|...],
%LOrdemDeArmazens = [8, 3, 4, 11, 7, 1, 6, 10, 2|...],
%ListaCarregamentosArmazem = [7, 6, 2],
%ListaQuantidadesCarregamento = [45.062711864406786, 45.55932203389831, 19.694915254237287],
%ListaTemposCarregamentoArmazem = [56.328389830508485, 56.949152542372886, 24.61864406779661],
%Custo = 749.4536440677966
%%%test_heuristica_produto(10,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4442, 4448, 4445, 4439, 4444, 4443, 4440|...],
%LOrdemDeArmazens = [8, 3, 4, 11, 7, 1, 6, 10, 2|...],
%ListaCarregamentosArmazem = [7, 6, 2],
%ListaQuantidadesCarregamento = [45.062711864406786, 45.55932203389831, 19.694915254237287],
%ListaTemposCarregamentoArmazem = [56.328389830508485, 56.949152542372886, 24.61864406779661],
%Custo = 749.4536440677966


%%%testAlgoritm(11,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
% Execution took 1858332 ms.
% LOrdemDeEntregas = [4446, 4441, 4440, 4443, 4449, 4444, 4439, 4445, 4448|...],
% LOrdemDeArmazens = [8, 3, 2, 10, 12, 6, 1, 7, 11|...],
% ListaCarregamentosArmazem = [6, 7, 9],
% ListaQuantidadesCarregamento = [43.961016949152544, 46.152542372881356, 11.881355932203382],
% ListaTemposCarregamentoArmazem = [54.95127118644068, 57.690677966101696, 14.851694915254228],
% Custo = 730.2494067796611

%%%test_heuristica_peso(11,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 13 ms.
%LOrdemDeEntregas = [4449, 4445, 4443, 4448, 4442, 4440, 4444, 4447, 4446|...],
%LOrdemDeArmazens = [12, 7, 10, 11, 4, 2, 6, 9, 8|...],
%ListaCarregamentosArmazem = [12, 7, 10, 11, 2, 6, 9, 3, 1],
%ListaQuantidadesCarregamento = [20.061016949152545, 38.86779661016949, 38.108474576271185, 37.11186440677966, 30.935593220338987, 18.808474576271188, 48, 22.471186440677968, 14.033898305084747],ListaTemposCarregamentoArmazem = [25.07627118644068, 48.58474576271186, 47.63559322033898, 46.389830508474574, 38.66949152542374, 23.510593220338983, 60.0, 28.08898305084746, 17.542372881355934],
%Custo = 1197.3761864406779
%%%test_heuristica_distancia(11,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4442, 4448, 4445, 4439, 4449, 4443, 4440|...],
%LOrdemDeArmazens = [8, 3, 4, 11, 7, 1, 12, 10, 2|...],
%ListaCarregamentosArmazem = [11, 7, 1, 2, 6, 9],
%ListaQuantidadesCarregamento = [29.740677966101707, 20.66101694915254, 30.20338983050847, 33.355932203389834, 18.076271186440678, 14.61864406779661],
%ListaTemposCarregamentoArmazem = [37.175847457627135, 25.826271186440675, 37.754237288135585, 41.694915254237294, 22.595338983050848, 18.273305084745765],
%Custo = 877.8434745762711
%%%test_heuristica_produto(11,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4442, 4448, 4445, 4439, 4444, 4449, 4443|...],
%LOrdemDeArmazens = [8, 3, 4, 11, 7, 1, 6, 12, 10|...],
%ListaCarregamentosArmazem = [11, 7, 1, 2],
%ListaQuantidadesCarregamento = [29.740677966101707, 20.66101694915254, 30.20338983050847, 41.04661016949153],
%ListaTemposCarregamentoArmazem = [37.175847457627135, 25.826271186440675, 37.754237288135585, 51.308262711864415],
%Custo = 806.8924152542373


%%%test_heuristica_peso(12,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4449, 4445, 4443, 4448, 4450, 4442, 4440, 4444, 4447|...],
%LOrdemDeArmazens = [12, 7, 10, 11, 14, 4, 2, 6, 9|...],
%ListaCarregamentosArmazem = [12, 7, 10, 11, 14, 4, 6, 9, 3|...],
%ListaQuantidadesCarregamento = [21.708474576271186, 40.78983050847457, 40.122033898305084, 39.21694915254237, 48, 34.772881355932206, 36.13728813559322, 48, 22.471186440677968|...],
%ListaTemposCarregamentoArmazem = [27.135593220338983, 50.98728813559322, 50.152542372881356, 49.021186440677965, 60.0, 43.46610169491526, 45.17161016949152, 60.0, 28.08898305084746|...],        
%Custo = 1494.3331355932203
%%%test_heuristica_distancia(12,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4442, 4448, 4445, 4439, 4450, 4444, 4449|...],
%LOrdemDeArmazens = [8, 3, 4, 11, 7, 1, 14, 6, 12|...],
%ListaCarregamentosArmazem = [11, 7, 14, 2],
%ListaQuantidadesCarregamento = [31.891525423728808, 21.713559322033902, 47.623728813559325, 28.58898305084746],
%ListaTemposCarregamentoArmazem = [39.86440677966101, 27.141949152542377, 59.529661016949156, 35.73622881355932],
%Custo = 864.8078389830508
%%%test_heuristica_produto(12,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4442, 4448, 4445, 4439, 4450, 4444, 4449|...],
%LOrdemDeArmazens = [8, 3, 4, 11, 7, 1, 14, 6, 12|...],
%ListaCarregamentosArmazem = [11, 7, 14, 2],
%ListaQuantidadesCarregamento = [31.891525423728808, 21.713559322033902, 47.623728813559325, 28.58898305084746],
%ListaTemposCarregamentoArmazem = [39.86440677966101, 27.141949152542377, 59.529661016949156, 35.73622881355932],
%Custo = 864.8078389830508


%%%test_heuristica_peso(13,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4449, 4445, 4443, 4448, 4450, 4442, 4451, 4440, 4444|...],
%LOrdemDeArmazens = [12, 7, 10, 11, 14, 4, 15, 2, 6|...],
%ListaCarregamentosArmazem = [12, 7, 10, 11, 14, 15, 6, 9, 3|...],
%ListaQuantidadesCarregamento = [22.74576271186441, 42, 41.389830508474574, 40.54237288135593, 48, 45.8593220338983, 40.46949152542373, 48, 22.471186440677968|...],
%ListaTemposCarregamentoArmazem = [28.432203389830512, 52.5, 51.73728813559322, 50.67796610169491, 60.0, 57.32415254237288, 50.58686440677966, 60.0, 28.08898305084746|...],
%Custo = 1587.7379661016948
%%%test_heuristica_distancia(13,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4451, 4442, 4448, 4445, 4439, 4450, 4444|...],
%LOrdemDeArmazens = [8, 3, 15, 4, 11, 7, 1, 14, 6|...],
%ListaCarregamentosArmazem = [11, 7, 14, 2],
%ListaQuantidadesCarregamento = [37.64067796610169, 21.713559322033902, 47.623728813559325, 28.58898305084746],
%ListaTemposCarregamentoArmazem = [47.050847457627114, 27.141949152542377, 59.529661016949156, 35.73622881355932],
%Custo = 919.2515677966102
%%%test_heuristica_produto(13,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4451, 4442, 4448, 4445, 4439, 4450, 4444|...],
%LOrdemDeArmazens = [8, 3, 15, 4, 11, 7, 1, 14, 6|...],
%ListaCarregamentosArmazem = [11, 7, 14, 2],
%ListaQuantidadesCarregamento = [37.64067796610169, 21.713559322033902, 47.623728813559325, 28.58898305084746],
%ListaTemposCarregamentoArmazem = [47.050847457627114, 27.141949152542377, 59.529661016949156, 35.73622881355932],
%Custo = 919.2515677966102


%%%test_heuristica_peso(14,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4449, 4452, 4445, 4443, 4448, 4450, 4442, 4451, 4440|...],
%LOrdemDeArmazens = [12, 16, 7, 10, 11, 14, 4, 15, 2|...],
%ListaCarregamentosArmazem = [12, 16, 7, 10, 11, 14, 15, 6, 9|...],
%ListaQuantidadesCarregamento = [24.94237288135593, 48, 42, 41.389830508474574, 40.54237288135593, 48, 45.8593220338983, 40.46949152542373, 48|...],
%ListaTemposCarregamentoArmazem = [31.177966101694913, 60.0, 52.5, 51.73728813559322, 50.67796610169491, 60.0, 57.32415254237288, 50.58686440677966, 60.0|...],
%Custo = 1827.7745762711866
%%%test_heuristica_distancia(14,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4451, 4442, 4452, 4447, 4448, 4445, 4439|...],
%LOrdemDeArmazens = [8, 3, 15, 4, 16, 9, 11, 7, 1|...],
%ListaCarregamentosArmazem = [9, 11, 7, 14],
%ListaQuantidadesCarregamento = [38.51864406779661, 28.48389830508475, 21.42118644067797, 46.93728813559322],
%ListaTemposCarregamentoArmazem = [48.14830508474576, 35.60487288135594, 26.776483050847464, 58.67161016949153],
%Custo = 975.6336440677967
%%%test_heuristica_produto(14,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4441, 4451, 4442, 4452, 4447, 4448, 4445, 4439|...],
%LOrdemDeArmazens = [8, 3, 15, 4, 16, 9, 11, 7, 1|...],
%ListaCarregamentosArmazem = [9, 11, 7, 14],
%ListaQuantidadesCarregamento = [38.51864406779661, 28.48389830508475, 21.42118644067797, 46.93728813559322],
%ListaTemposCarregamentoArmazem = [48.14830508474576, 35.60487288135594, 26.776483050847464, 58.67161016949153],
%Custo = 975.6336440677967


%%%test_heuristica_peso(15,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4449, 4452, 4445, 4443, 4448, 4450, 4453, 4442, 4451|...],
%LOrdemDeArmazens = [12, 16, 7, 10, 11, 14, 17, 4, 15|...],
%ListaCarregamentosArmazem = [12, 16, 7, 10, 11, 14, 4, 2, 6|...],
%ListaQuantidadesCarregamento = [26.406779661016948, 48, 43.708474576271186, 43.179661016949154, 42.4135593220339, 48, 41.567796610169495, 31.422033898305088, 18.808474576271188|...],
%ListaTemposCarregamentoArmazem = [33.00847457627118, 60.0, 54.63559322033898, 53.97457627118644, 53.016949152542374, 60.0, 51.95974576271187, 39.277542372881356, 23.510593220338983|...],        
%Custo = 1884.80906779661
%%%test_heuristica_distancia(15,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4453, 4446, 4441, 4451, 4442, 4452, 4447, 4448, 4445|...],
%LOrdemDeArmazens = [17, 8, 3, 15, 4, 16, 9, 11, 7|...],
%ListaCarregamentosArmazem = [9, 11, 7, 14],
%ListaQuantidadesCarregamento = [45.6271186440678, 28.48389830508475, 21.42118644067797, 46.93728813559322],
%ListaTemposCarregamentoArmazem = [57.03389830508475, 35.60487288135594, 26.776483050847464, 58.67161016949153],
%Custo = 1036.0022881355935
%%%test_heuristica_produto(15,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4446, 4453, 4441, 4451, 4442, 4452, 4447, 4448, 4445|...],
%LOrdemDeArmazens = [8, 17, 3, 15, 4, 16, 9, 11, 7|...],
%ListaCarregamentosArmazem = [4, 11, 7, 14],
%ListaQuantidadesCarregamento = [33.677966101694906, 46.25169491525425, 21.42118644067797, 46.93728813559322],
%ListaTemposCarregamentoArmazem = [42.09745762711863, 57.81461864406781, 26.776483050847464, 58.67161016949153],
%Custo = 1059.5322033898306