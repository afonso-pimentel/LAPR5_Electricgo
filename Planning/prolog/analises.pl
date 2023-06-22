:-include('db.pl').
:-include('logica.pl').

entrega(4439, 20221205, 200, 1, 8, 10).
entrega(4440, 20221205, 300, 2, 15, 20).
entrega(4441, 20221205, 100, 3, 5, 7).
entrega(4442, 20221205, 300, 4, 15, 20).
entrega(4443, 20221205, 300, 5, 15, 20).
entrega(4444, 20221205, 300, 6, 15, 20).
entrega(4445, 20221205, 300, 7, 15, 20).
entrega(4446, 20221205, 120, 8, 6, 8).
entrega(4447, 20221205, 150, 9, 7, 9).
entrega(4448, 20221205, 300, 11, 15, 20).
entrega(4449, 20221205, 300, 12, 15, 20).
entrega(4450, 20221205, 300, 14, 15, 20).
entrega(4451, 20221205, 300, 15, 15, 20).
entrega(4452, 20221205, 300, 16, 15, 20).
entrega(4453, 20221205, 300, 17, 15, 20).

take([_|_], 0, []).
take([H|_], 1,[H]).
take([X|T1], N,[X|T2]):-N>=0,N1 is N-1,take(T1,N1,T2).

testAlgoritm(Num,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo):-statistics(walltime, [TimeSinceStart | [TimeSinceLastCall]]),take([4439,4440,4441,4442,4443,4444,4445,4446,4447,4448,4449,4450,4451,4452,4453], Num, ListEntregas),    sequencia_custo_min(ListEntregas,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo),statistics(walltime, [NewTimeSinceStart | [ExecutionTime]]),write('Execution took '), write(ExecutionTime), write(' ms.'), nl.

% Nº ENTREGAS: 2

% testAlgoritm(2,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
% Execution took 0 ms.
% LOrdemDeEntregas = [4439, 4440],
% LOrdemDeArmazens = [1, 2],
% ListaCarregamentosArmazem = [2],
% ListaQuantidadesCarregamento = [12.322033898305083],
% ListaTemposCarregamentoArmazem = [15.402542372881353],
% Custo = 246.9305084745763.


% Nº ENTREGAS: 3

% testAlgoritm(3,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4441, 4440, 4439],
%LOrdemDeArmazens = [3, 2, 1],
%ListaCarregamentosArmazem = [1],
%ListaQuantidadesCarregamento = [20.983050847457633],
%ListaTemposCarregamentoArmazem = [26.22881355932204],
%Custo = 280.55593220338983.


% Nº ENTREGAS: 4

% testAlgoritm(4,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 0 ms.
%LOrdemDeEntregas = [4442, 4441, 4440, 4439],
%LOrdemDeArmazens = [4, 3, 2, 1],
%ListaCarregamentosArmazem = [1],
%ListaQuantidadesCarregamento = [28.762711864406782],
%ListaTemposCarregamentoArmazem = [35.95338983050848],
%Custo = 307.085593220339.


% Nº ENTREGAS: 5

% testAlgoritm(5,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 2 ms.
%LOrdemDeEntregas = [4442, 4443, 4439, 4440, 4441],
%LOrdemDeArmazens = [4, 5, 1, 2, 3],
%ListaCarregamentosArmazem = [1, 3],
%ListaQuantidadesCarregamento = [32.76271186440678, 3.186440677966102],
%ListaTemposCarregamentoArmazem = [40.95338983050848, 3.9830508474576276],
%Custo = 377.621186440678.


% Nº ENTREGAS: 6

% testAlgoritm(6,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 16 ms.
%LOrdemDeEntregas = [4442, 4443, 4441, 4440, 4439, 4444],
%LOrdemDeArmazens = [4, 5, 3, 2, 1, 6],
%ListaCarregamentosArmazem = [2, 6],
%ListaQuantidadesCarregamento = [23.677966101694913, 24.305084745762706],
%ListaTemposCarregamentoArmazem = [29.597457627118644, 30.381355932203384],
%Custo = 403.4940677966102.


% Nº ENTREGAS: 7

% testAlgoritm(7,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 133 ms.
%LOrdemDeEntregas = [4442, 4443, 4441, 4440, 4444, 4439, 4445],
%LOrdemDeArmazens = [4, 5, 3, 2, 6, 1, 7],
%ListaCarregamentosArmazem = [6, 7],
%ListaQuantidadesCarregamento = [44.06779661016948, 8.52542372881356],
%ListaTemposCarregamentoArmazem = [55.08474576271185, 10.656779661016952],
%Custo = 477.96779661016944.


% Nº ENTREGAS: 8

% testAlgoritm(8,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 1235 ms.
%LOrdemDeEntregas = [4442, 4443, 4446, 4441, 4440, 4444, 4439, 4445],
%LOrdemDeArmazens = [4, 5, 8, 3, 2, 6, 1, 7],
%ListaCarregamentosArmazem = [6, 7],
%ListaQuantidadesCarregamento = [43.59491525423729, 8.52542372881356],
%ListaTemposCarregamentoArmazem = [54.493644067796616, 10.656779661016952],
%Custo = 495.22177966101697.


% Nº ENTREGAS: 9

% testAlgoritm(9,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 12362 ms.
%LOrdemDeEntregas = [4442, 4447, 4443, 4446, 4441, 4440, 4444, 4439, 4445],
%LOrdemDeArmazens = [4, 9, 5, 8, 3, 2, 6, 1, 7],
%ListaCarregamentosArmazem = [3, 6, 7],
%ListaQuantidadesCarregamento = [39.15677966101695, 35.025423728813564, 8.52542372881356],
%ListaTemposCarregamentoArmazem = [48.94597457627118, 43.781779661016955, 10.656779661016952],
%Custo = 578.7526694915254.


% Nº ENTREGAS: 10

% testAlgoritm(10,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 142407 ms.
%LOrdemDeEntregas = [4442, 4443, 4446, 4441, 4440, 4444, 4439, 4445, 4448|...],
%LOrdemDeArmazens = [4, 5, 8, 3, 2, 6, 1, 7, 11|...],
%ListaCarregamentosArmazem = [6, 7],
%ListaQuantidadesCarregamento = [46.68389830508475, 40.9406779661017],
%ListaTemposCarregamentoArmazem = [58.354872881355945, 51.17584745762713],
%Custo = 671.513093220339.


% Nº ENTREGAS: 11

% testAlgoritm(11,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 1722435 ms.
%LOrdemDeEntregas = [4442, 4443, 4446, 4441, 4440, 4449, 4444, 4439, 4445|...],
%LOrdemDeArmazens = [4, 5, 8, 3, 2, 12, 6, 1, 7|...],
%ListaCarregamentosArmazem = [12, 7],
%ListaQuantidadesCarregamento = [42.60762711864407, 46.87288135593221],
%ListaTemposCarregamentoArmazem = [53.25953389830509, 58.59110169491526],
%Custo = 697.7440254237288.


% Nº ENTREGAS: 12

% testAlgoritm(12,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Execution took 21981775 ms.
%LOrdemDeEntregas = [4442, 4446, 4441, 4440, 4449, 4444, 4450, 4439, 4445|...],
%LOrdemDeArmazens = [4, 8, 3, 2, 12, 6, 14, 1, 7|...],
%ListaCarregamentosArmazem = [6, 7, 9],
%ListaQuantidadesCarregamento = [46.142372881355925, 45.610169491525426, 14.402542372881358], 
%ListaTemposCarregamentoArmazem = [57.677966101694906, 57.01271186440678, 18.0031779661017],
%Custo = 743.0630932203389

% Nº ENTREGAS: 13

% testAlgoritm(13,LOrdemDeEntregas,LOrdemDeArmazens,ListaCarregamentosArmazem,ListaQuantidadesCarregamento,ListaTemposCarregamentoArmazem,Custo).
%Não foi possivel obter os dados ao fim de mais de 15H
