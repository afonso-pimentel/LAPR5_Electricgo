%idArmazem(<local>,<codigo>)
idArmazem('Arouca',1).
idArmazem('Espinho',2).
idArmazem('Gondomar',3).
idArmazem('Maia',4).
idArmazem('Matosinhos',5).
idArmazem('Oliveira de Azemeis',6).
idArmazem('Paredes',7).
idArmazem('Porto',8).
idArmazem('Povoa de Varzim',9).
idArmazem('Santa Maria da Feira',10).
idArmazem('Santo Tirso',11).
idArmazem('Sao Joao da Madeira',12).
idArmazem('Trofa',13).
idArmazem('Vale de Cambra',14).
idArmazem('Valongo',15).
idArmazem('Vila do Conde',16).
idArmazem('Vila Nova de Gaia',17).

armazem_principal(5, 'Matosinhos').

%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
%carateristicasCam(eTruck01,7500,4300,80,100,60).

%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
dadosCam_t_e_ta(eTruck01,1,2,122,42,0).
dadosCam_t_e_ta(eTruck01,1,3,122,46,0).
dadosCam_t_e_ta(eTruck01,1,4,151,54,25).
dadosCam_t_e_ta(eTruck01,1,5,147,52,25).
dadosCam_t_e_ta(eTruck01,1,6,74,24,0).
dadosCam_t_e_ta(eTruck01,1,7,116,35,0).
dadosCam_t_e_ta(eTruck01,1,8,141,46,0).
dadosCam_t_e_ta(eTruck01,1,9,185,74,53).
dadosCam_t_e_ta(eTruck01,1,10,97,30,0).
dadosCam_t_e_ta(eTruck01,1,11,164,64,40).
dadosCam_t_e_ta(eTruck01,1,12,76,23,0).
dadosCam_t_e_ta(eTruck01,1,13,174,66,45).
dadosCam_t_e_ta(eTruck01,1,14,59,18,0).
dadosCam_t_e_ta(eTruck01,1,15,132,51,24).
dadosCam_t_e_ta(eTruck01,1,16,181,68,45).
dadosCam_t_e_ta(eTruck01,1,17,128,45,0).

dadosCam_t_e_ta(eTruck01,2,1,116,42,0).
dadosCam_t_e_ta(eTruck01,2,3,55,22,0).
dadosCam_t_e_ta(eTruck01,2,4,74,25,0).
dadosCam_t_e_ta(eTruck01,2,5,65,22,0).
dadosCam_t_e_ta(eTruck01,2,6,69,27,0).
dadosCam_t_e_ta(eTruck01,2,7,74,38,0).
dadosCam_t_e_ta(eTruck01,2,8,61,18,0).
dadosCam_t_e_ta(eTruck01,2,9,103,44,0).
dadosCam_t_e_ta(eTruck01,2,10,36,14,0).
dadosCam_t_e_ta(eTruck01,2,11,88,41,0).
dadosCam_t_e_ta(eTruck01,2,12,61,19,0).
dadosCam_t_e_ta(eTruck01,2,13,95,42,0).
dadosCam_t_e_ta(eTruck01,2,14,78,34,0).
dadosCam_t_e_ta(eTruck01,2,15,69,30,0).
dadosCam_t_e_ta(eTruck01,2,16,99,38,0).
dadosCam_t_e_ta(eTruck01,2,17,46,14,0).

dadosCam_t_e_ta(eTruck01,3,1,120,45,0).
dadosCam_t_e_ta(eTruck01,3,2,50,22,0).
dadosCam_t_e_ta(eTruck01,3,4,46,15,0).
dadosCam_t_e_ta(eTruck01,3,5,46,14,0).
dadosCam_t_e_ta(eTruck01,3,6,74,37,0).
dadosCam_t_e_ta(eTruck01,3,7,63,23,0).
dadosCam_t_e_ta(eTruck01,3,8,38,8,0).
dadosCam_t_e_ta(eTruck01,3,9,84,36,0).
dadosCam_t_e_ta(eTruck01,3,10,59,28,0).
dadosCam_t_e_ta(eTruck01,3,11,61,27,0).
dadosCam_t_e_ta(eTruck01,3,12,67,32,0).
dadosCam_t_e_ta(eTruck01,3,13,67,29,0).
dadosCam_t_e_ta(eTruck01,3,14,82,38,0).
dadosCam_t_e_ta(eTruck01,3,15,34,8,0).
dadosCam_t_e_ta(eTruck01,3,16,80,30,0).
dadosCam_t_e_ta(eTruck01,3,17,36,10,0).

dadosCam_t_e_ta(eTruck01,4,1,149,54,25).
dadosCam_t_e_ta(eTruck01,4,2,65,24,0).
dadosCam_t_e_ta(eTruck01,4,3,46,16,0).
dadosCam_t_e_ta(eTruck01,4,5,27,10,0).
dadosCam_t_e_ta(eTruck01,4,6,103,47,0).
dadosCam_t_e_ta(eTruck01,4,7,55,27,0).
dadosCam_t_e_ta(eTruck01,4,8,36,10,0).
dadosCam_t_e_ta(eTruck01,4,9,50,26,0).
dadosCam_t_e_ta(eTruck01,4,10,78,34,0).
dadosCam_t_e_ta(eTruck01,4,11,42,19,0).
dadosCam_t_e_ta(eTruck01,4,12,97,42,0).
dadosCam_t_e_ta(eTruck01,4,13,44,11,0).
dadosCam_t_e_ta(eTruck01,4,14,111,48,0).
dadosCam_t_e_ta(eTruck01,4,15,32,13,0).
dadosCam_t_e_ta(eTruck01,4,16,53,14,0).
dadosCam_t_e_ta(eTruck01,4,17,38,11,0).

dadosCam_t_e_ta(eTruck01,5,1,141,51,24).
dadosCam_t_e_ta(eTruck01,5,2,55,20,0).
dadosCam_t_e_ta(eTruck01,5,3,48,14,0).
dadosCam_t_e_ta(eTruck01,5,4,25,9,0).
dadosCam_t_e_ta(eTruck01,5,6,97,44,0).
dadosCam_t_e_ta(eTruck01,5,7,55,28,0).
dadosCam_t_e_ta(eTruck01,5,8,29,7,0).
dadosCam_t_e_ta(eTruck01,5,9,48,24,0).
dadosCam_t_e_ta(eTruck01,5,10,69,30,0).
dadosCam_t_e_ta(eTruck01,5,11,53,26,0).
dadosCam_t_e_ta(eTruck01,5,12,95,36,0).
dadosCam_t_e_ta(eTruck01,5,13,63,20,0).
dadosCam_t_e_ta(eTruck01,5,14,105,45,0).
dadosCam_t_e_ta(eTruck01,5,15,34,14,0).
dadosCam_t_e_ta(eTruck01,5,16,46,18,0).
dadosCam_t_e_ta(eTruck01,5,17,27,7,0).

dadosCam_t_e_ta(eTruck01,6,1,69,23,0).
dadosCam_t_e_ta(eTruck01,6,2,71,27,0).
dadosCam_t_e_ta(eTruck01,6,3,74,38,0).
dadosCam_t_e_ta(eTruck01,6,4,103,46,0).
dadosCam_t_e_ta(eTruck01,6,5,99,44,0).
dadosCam_t_e_ta(eTruck01,6,7,88,48,0).
dadosCam_t_e_ta(eTruck01,6,8,92,38,0).
dadosCam_t_e_ta(eTruck01,6,9,134,66,45).
dadosCam_t_e_ta(eTruck01,6,10,42,14,0).
dadosCam_t_e_ta(eTruck01,6,11,116,56,30).
dadosCam_t_e_ta(eTruck01,6,12,23,9,0).
dadosCam_t_e_ta(eTruck01,6,13,126,58,33).
dadosCam_t_e_ta(eTruck01,6,14,25,9,0).
dadosCam_t_e_ta(eTruck01,6,15,84,44,0).
dadosCam_t_e_ta(eTruck01,6,16,132,60,35).
dadosCam_t_e_ta(eTruck01,6,17,80,38,0).

dadosCam_t_e_ta(eTruck01,7,1,116,36,0).
dadosCam_t_e_ta(eTruck01,7,2,71,38,0).
dadosCam_t_e_ta(eTruck01,7,3,61,22,0).
dadosCam_t_e_ta(eTruck01,7,4,53,26,0).
dadosCam_t_e_ta(eTruck01,7,5,53,28,0).
dadosCam_t_e_ta(eTruck01,7,6,88,48,0).
dadosCam_t_e_ta(eTruck01,7,8,59,26,0).
dadosCam_t_e_ta(eTruck01,7,9,88,48,0).
dadosCam_t_e_ta(eTruck01,7,10,84,44,0).
dadosCam_t_e_ta(eTruck01,7,11,74,22,0).
dadosCam_t_e_ta(eTruck01,7,12,82,42,0).
dadosCam_t_e_ta(eTruck01,7,13,76,31,0).
dadosCam_t_e_ta(eTruck01,7,14,97,49,21).
dadosCam_t_e_ta(eTruck01,7,15,29,16,0).
dadosCam_t_e_ta(eTruck01,7,16,84,42,0).
dadosCam_t_e_ta(eTruck01,7,17,69,30,0).

dadosCam_t_e_ta(eTruck01,8,1,134,46,0).
dadosCam_t_e_ta(eTruck01,8,2,59,18,0).
dadosCam_t_e_ta(eTruck01,8,3,32,6,0).
dadosCam_t_e_ta(eTruck01,8,4,34,10,0).
dadosCam_t_e_ta(eTruck01,8,5,32,7,0).
dadosCam_t_e_ta(eTruck01,8,6,88,38,0).
dadosCam_t_e_ta(eTruck01,8,7,57,26,0).
dadosCam_t_e_ta(eTruck01,8,9,69,30,0).
dadosCam_t_e_ta(eTruck01,8,10,65,26,0).
dadosCam_t_e_ta(eTruck01,8,11,53,22,0).
dadosCam_t_e_ta(eTruck01,8,12,82,34,0).
dadosCam_t_e_ta(eTruck01,8,13,61,24,0).
dadosCam_t_e_ta(eTruck01,8,14,97,40,0).
dadosCam_t_e_ta(eTruck01,8,15,36,12,0).
dadosCam_t_e_ta(eTruck01,8,16,65,23,0).
dadosCam_t_e_ta(eTruck01,8,17,32,6,0).

dadosCam_t_e_ta(eTruck01,9,1,181,72,50).
dadosCam_t_e_ta(eTruck01,9,2,95,41,0).
dadosCam_t_e_ta(eTruck01,9,3,86,35,0).
dadosCam_t_e_ta(eTruck01,9,4,55,24,0).
dadosCam_t_e_ta(eTruck01,9,5,48,23,0).
dadosCam_t_e_ta(eTruck01,9,6,134,65,42).
dadosCam_t_e_ta(eTruck01,9,7,95,47,0).
dadosCam_t_e_ta(eTruck01,9,8,69,28,0).
dadosCam_t_e_ta(eTruck01,9,10,109,51,24).
dadosCam_t_e_ta(eTruck01,9,11,61,29,0).
dadosCam_t_e_ta(eTruck01,9,12,132,57,31).
dadosCam_t_e_ta(eTruck01,9,13,67,19,0).
dadosCam_t_e_ta(eTruck01,9,14,143,66,45).
dadosCam_t_e_ta(eTruck01,9,15,71,34,0).
dadosCam_t_e_ta(eTruck01,9,16,15,3,0).
dadosCam_t_e_ta(eTruck01,9,17,67,28,0).

dadosCam_t_e_ta(eTruck01,10,1,97,30,0).
dadosCam_t_e_ta(eTruck01,10,2,34,14,0).
dadosCam_t_e_ta(eTruck01,10,3,59,27,0).
dadosCam_t_e_ta(eTruck01,10,4,78,33,0).
dadosCam_t_e_ta(eTruck01,10,5,71,30,0).
dadosCam_t_e_ta(eTruck01,10,6,40,14,0).
dadosCam_t_e_ta(eTruck01,10,7,82,42,0).
dadosCam_t_e_ta(eTruck01,10,8,65,24,0).
dadosCam_t_e_ta(eTruck01,10,9,109,52,25).
dadosCam_t_e_ta(eTruck01,10,11,92,46,0).
dadosCam_t_e_ta(eTruck01,10,12,32,6,0).
dadosCam_t_e_ta(eTruck01,10,13,99,46,0).
dadosCam_t_e_ta(eTruck01,10,14,63,17,0).
dadosCam_t_e_ta(eTruck01,10,15,74,34,0).
dadosCam_t_e_ta(eTruck01,10,16,105,46,0).
dadosCam_t_e_ta(eTruck01,10,17,53,23,0).

dadosCam_t_e_ta(eTruck01,11,1,164,65,42).
dadosCam_t_e_ta(eTruck01,11,2,88,41,0).
dadosCam_t_e_ta(eTruck01,11,3,65,28,0).
dadosCam_t_e_ta(eTruck01,11,4,42,18,0).
dadosCam_t_e_ta(eTruck01,11,5,55,25,0).
dadosCam_t_e_ta(eTruck01,11,6,118,57,31).
dadosCam_t_e_ta(eTruck01,11,7,74,23,0).
dadosCam_t_e_ta(eTruck01,11,8,59,23,0).
dadosCam_t_e_ta(eTruck01,11,9,63,28,0).
dadosCam_t_e_ta(eTruck01,11,10,97,46,0).
dadosCam_t_e_ta(eTruck01,11,12,111,52,25).
dadosCam_t_e_ta(eTruck01,11,13,25,7,0).
dadosCam_t_e_ta(eTruck01,11,14,126,58,33).
dadosCam_t_e_ta(eTruck01,11,15,53,25,0).
dadosCam_t_e_ta(eTruck01,11,16,59,27,0).
dadosCam_t_e_ta(eTruck01,11,17,67,27,0).

dadosCam_t_e_ta(eTruck01,12,1,76,23,0).
dadosCam_t_e_ta(eTruck01,12,2,61,19,0).
dadosCam_t_e_ta(eTruck01,12,3,67,32,0).
dadosCam_t_e_ta(eTruck01,12,4,97,41,0).
dadosCam_t_e_ta(eTruck01,12,5,92,38,0).
dadosCam_t_e_ta(eTruck01,12,6,19,8,0).
dadosCam_t_e_ta(eTruck01,12,7,82,42,0).
dadosCam_t_e_ta(eTruck01,12,8,86,33,0).
dadosCam_t_e_ta(eTruck01,12,9,128,61,37).
dadosCam_t_e_ta(eTruck01,12,10,32,6,0).
dadosCam_t_e_ta(eTruck01,12,11,109,50,23).
dadosCam_t_e_ta(eTruck01,12,13,120,53,26).
dadosCam_t_e_ta(eTruck01,12,14,40,10,0).
dadosCam_t_e_ta(eTruck01,12,15,78,38,0).
dadosCam_t_e_ta(eTruck01,12,16,126,54,28).
dadosCam_t_e_ta(eTruck01,12,17,74,32,0).

dadosCam_t_e_ta(eTruck01,13,1,174,65,42).
dadosCam_t_e_ta(eTruck01,13,2,107,35,0).
dadosCam_t_e_ta(eTruck01,13,3,74,29,0).
dadosCam_t_e_ta(eTruck01,13,4,46,11,0).
dadosCam_t_e_ta(eTruck01,13,5,67,20,0).
dadosCam_t_e_ta(eTruck01,13,6,128,57,31).
dadosCam_t_e_ta(eTruck01,13,7,80,30,0).
dadosCam_t_e_ta(eTruck01,13,8,76,20,0).
dadosCam_t_e_ta(eTruck01,13,9,67,20,0).
dadosCam_t_e_ta(eTruck01,13,10,105,47,0).
dadosCam_t_e_ta(eTruck01,13,11,27,7,0).
dadosCam_t_e_ta(eTruck01,13,12,122,52,25).
dadosCam_t_e_ta(eTruck01,13,14,137,58,33).
dadosCam_t_e_ta(eTruck01,13,15,67,17,0).
dadosCam_t_e_ta(eTruck01,13,16,59,15,0).
dadosCam_t_e_ta(eTruck01,13,17,78,22,0).

dadosCam_t_e_ta(eTruck01,14,1,59,18,0).
dadosCam_t_e_ta(eTruck01,14,2,80,35,0).
dadosCam_t_e_ta(eTruck01,14,3,80,38,0).
dadosCam_t_e_ta(eTruck01,14,4,109,46,0).
dadosCam_t_e_ta(eTruck01,14,5,105,45,0).
dadosCam_t_e_ta(eTruck01,14,6,27,9,0).
dadosCam_t_e_ta(eTruck01,14,7,97,48,0).
dadosCam_t_e_ta(eTruck01,14,8,99,38,0).
dadosCam_t_e_ta(eTruck01,14,9,143,66,45).
dadosCam_t_e_ta(eTruck01,14,10,61,17,0).
dadosCam_t_e_ta(eTruck01,14,11,122,57,31).
dadosCam_t_e_ta(eTruck01,14,12,42,10,0).
dadosCam_t_e_ta(eTruck01,14,13,132,58,35).
dadosCam_t_e_ta(eTruck01,14,15,90,44,0).
dadosCam_t_e_ta(eTruck01,14,16,139,61,37).
dadosCam_t_e_ta(eTruck01,14,17,86,38,0).

dadosCam_t_e_ta(eTruck01,15,1,132,51,24).
dadosCam_t_e_ta(eTruck01,15,2,74,30,0).
dadosCam_t_e_ta(eTruck01,15,3,34,8,0).
dadosCam_t_e_ta(eTruck01,15,4,36,12,0).
dadosCam_t_e_ta(eTruck01,15,5,36,14,0).
dadosCam_t_e_ta(eTruck01,15,6,86,44,0).
dadosCam_t_e_ta(eTruck01,15,7,34,16,0).
dadosCam_t_e_ta(eTruck01,15,8,42,13,0).
dadosCam_t_e_ta(eTruck01,15,9,71,35,0).
dadosCam_t_e_ta(eTruck01,15,10,82,36,0).
dadosCam_t_e_ta(eTruck01,15,11,53,25,0).
dadosCam_t_e_ta(eTruck01,15,12,80,38,0).
dadosCam_t_e_ta(eTruck01,15,13,69,18,0).
dadosCam_t_e_ta(eTruck01,15,14,95,45,0).
dadosCam_t_e_ta(eTruck01,15,16,69,29,0).
dadosCam_t_e_ta(eTruck01,15,17,53,17,0).

dadosCam_t_e_ta(eTruck01,16,1,179,68,45).
dadosCam_t_e_ta(eTruck01,16,2,92,37,0).
dadosCam_t_e_ta(eTruck01,16,3,84,31,0).
dadosCam_t_e_ta(eTruck01,16,4,57,16,0).
dadosCam_t_e_ta(eTruck01,16,5,46,18,0).
dadosCam_t_e_ta(eTruck01,16,6,132,60,35).
dadosCam_t_e_ta(eTruck01,16,7,92,42,0).
dadosCam_t_e_ta(eTruck01,16,8,67,23,0).
dadosCam_t_e_ta(eTruck01,16,9,15,3,0).
dadosCam_t_e_ta(eTruck01,16,10,105,46,0).
dadosCam_t_e_ta(eTruck01,16,11,57,28,0).
dadosCam_t_e_ta(eTruck01,16,12,130,52,25).
dadosCam_t_e_ta(eTruck01,16,13,61,15,0).
dadosCam_t_e_ta(eTruck01,16,14,141,61,37).
dadosCam_t_e_ta(eTruck01,16,15,69,29,0).
dadosCam_t_e_ta(eTruck01,16,17,65,24,0).

dadosCam_t_e_ta(eTruck01,17,1,128,46,0).
dadosCam_t_e_ta(eTruck01,17,2,42,14,0).
dadosCam_t_e_ta(eTruck01,17,3,40,11,0).
dadosCam_t_e_ta(eTruck01,17,4,42,13,0).
dadosCam_t_e_ta(eTruck01,17,5,34,10,0).
dadosCam_t_e_ta(eTruck01,17,6,82,38,0).
dadosCam_t_e_ta(eTruck01,17,7,74,30,0).
dadosCam_t_e_ta(eTruck01,17,8,29,6,0).
dadosCam_t_e_ta(eTruck01,17,9,69,31,0).
dadosCam_t_e_ta(eTruck01,17,10,55,24,0).
dadosCam_t_e_ta(eTruck01,17,11,69,29,0).
dadosCam_t_e_ta(eTruck01,17,12,80,30,0).
dadosCam_t_e_ta(eTruck01,17,13,82,23,0).
dadosCam_t_e_ta(eTruck01,17,14,90,38,0).
dadosCam_t_e_ta(eTruck01,17,15,53,18,0).
dadosCam_t_e_ta(eTruck01,17,16,67,25,0).

distancia(1,1,0).
distancia(1,2,53).
distancia(1,3,57).
distancia(1,4,67).
distancia(1,5,65).
distancia(1,6,30).
distancia(1,7,44).
distancia(1,8,57).
distancia(1,9,92).
distancia(1,10,37).
distancia(1,11,80).
distancia(1,12,29).
distancia(1,13,83).
distancia(1,14,22).
distancia(1,15,64).
distancia(1,16,85).
distancia(1,17,56).
distancia(2,1,52).
distancia(2,2,0).
distancia(2,3,28).
distancia(2,4,31).
distancia(2,5,27).
distancia(2,6,34).
distancia(2,7,48).
distancia(2,8,22).
distancia(2,9,55).
distancia(2,10,17).
distancia(2,11,51).
distancia(2,12,24).
distancia(2,13,53).
distancia(2,14,43).
distancia(2,15,37).
distancia(2,16,47).
distancia(2,17,18).
distancia(3,1,56).
distancia(3,2,28).
distancia(3,3,0).
distancia(3,4,19).
distancia(3,5,18).
distancia(3,6,46).
distancia(3,7,29).
distancia(3,8,10).
distancia(3,9,45).
distancia(3,10,35).
distancia(3,11,34).
distancia(3,12,40).
distancia(3,13,36).
distancia(3,14,47).
distancia(3,15,10).
distancia(3,16,38).
distancia(3,17,13).
distancia(4,1,68).
distancia(4,2,30).
distancia(4,3,20).
distancia(4,4,0).
distancia(4,5,12).
distancia(4,6,59).
distancia(4,7,34).
distancia(4,8,12).
distancia(4,9,32).
distancia(4,10,43).
distancia(4,11,24).
distancia(4,12,52).
distancia(4,13,14).
distancia(4,14,60).
distancia(4,15,16).
distancia(4,16,18).
distancia(4,17,14).
distancia(5,1,64).
distancia(5,2,25).
distancia(5,3,18).
distancia(5,4,11).
distancia(5,5,0).
distancia(5,6,55).
distancia(5,7,35).
distancia(5,8,9).
distancia(5,9,30).
distancia(5,10,37).
distancia(5,11,32).
distancia(5,12,45).
distancia(5,13,25).
distancia(5,14,56).
distancia(5,15,18).
distancia(5,16,23).
distancia(5,17,9).
distancia(6,1,29).
distancia(6,2,34).
distancia(6,3,47).
distancia(6,4,58).
distancia(6,5,55).
distancia(6,6,0).
distancia(6,7,60).
distancia(6,8,48).
distancia(6,9,83).
distancia(6,10,18).
distancia(6,11,70).
distancia(6,12,11).
distancia(6,13,73).
distancia(6,14,11).
distancia(6,15,55).
distancia(6,16,75).
distancia(6,17,47).
distancia(7,1,45).
distancia(7,2,48).
distancia(7,3,28).
distancia(7,4,32).
distancia(7,5,35).
distancia(7,6,60).
distancia(7,7,0).
distancia(7,8,33).
distancia(7,9,60).
distancia(7,10,55).
distancia(7,11,28).
distancia(7,12,53).
distancia(7,13,39).
distancia(7,14,61).
distancia(7,15,20).
distancia(7,16,52).
distancia(7,17,38).
distancia(8,1,58).
distancia(8,2,23).
distancia(8,3,8).
distancia(8,4,12).
distancia(8,5,9).
distancia(8,6,48).
distancia(8,7,32).
distancia(8,8,0).
distancia(8,9,37).
distancia(8,10,32).
distancia(8,11,28).
distancia(8,12,42).
distancia(8,13,30).
distancia(8,14,50).
distancia(8,15,15).
distancia(8,16,29).
distancia(8,17,7).
distancia(9,1,90).
distancia(9,2,51).
distancia(9,3,44).
distancia(9,4,30).
distancia(9,5,29).
distancia(9,6,81).
distancia(9,7,59).
distancia(9,8,35).
distancia(9,9,0).
distancia(9,10,64).
distancia(9,11,36).
distancia(9,12,71).
distancia(9,13,24).
distancia(9,14,82).
distancia(9,15,42).
distancia(9,16,4).
distancia(9,17,35).
distancia(10,1,37).
distancia(10,2,17).
distancia(10,3,34).
distancia(10,4,41).
distancia(10,5,38).
distancia(10,6,18).
distancia(10,7,53).
distancia(10,8,30).
distancia(10,9,65).
distancia(10,10,0).
distancia(10,11,57).
distancia(10,12,8).
distancia(10,13,58).
distancia(10,14,21).
distancia(10,15,43).
distancia(10,16,58).
distancia(10,17,29).
distancia(11,1,81).
distancia(11,2,51).
distancia(11,3,35).
distancia(11,4,22).
distancia(11,5,31).
distancia(11,6,71).
distancia(11,7,29).
distancia(11,8,29).
distancia(11,9,35).
distancia(11,10,57).
distancia(11,11,0).
distancia(11,12,65).
distancia(11,13,9).
distancia(11,14,73).
distancia(11,15,31).
distancia(11,16,34).
distancia(11,17,34).
distancia(12,1,29).
distancia(12,2,24).
distancia(12,3,40).
distancia(12,4,51).
distancia(12,5,48).
distancia(12,6,10).
distancia(12,7,53).
distancia(12,8,41).
distancia(12,9,76).
distancia(12,10,8).
distancia(12,11,63).
distancia(12,12,0).
distancia(12,13,66).
distancia(12,14,13).
distancia(12,15,48).
distancia(12,16,68).
distancia(12,17,40).
distancia(13,1,81).
distancia(13,2,44).
distancia(13,3,36).
distancia(13,4,14).
distancia(13,5,25).
distancia(13,6,71).
distancia(13,7,38).
distancia(13,8,25).
distancia(13,9,25).
distancia(13,10,59).
distancia(13,11,9).
distancia(13,12,65).
distancia(13,13,0).
distancia(13,14,73).
distancia(13,15,21).
distancia(13,16,19).
distancia(13,17,27).
distancia(14,1,22).
distancia(14,2,44).
distancia(14,3,48).
distancia(14,4,58).
distancia(14,5,56).
distancia(14,6,11).
distancia(14,7,60).
distancia(14,8,48).
distancia(14,9,83).
distancia(14,10,21).
distancia(14,11,71).
distancia(14,12,13).
distancia(14,13,73).
distancia(14,14,0).
distancia(14,15,55).
distancia(14,16,76).
distancia(14,17,47).
distancia(15,1,64).
distancia(15,2,38).
distancia(15,3,10).
distancia(15,4,15).
distancia(15,5,18).
distancia(15,6,55).
distancia(15,7,20).
distancia(15,8,16).
distancia(15,9,44).
distancia(15,10,45).
distancia(15,11,31).
distancia(15,12,48).
distancia(15,13,22).
distancia(15,14,56).
distancia(15,15,0).
distancia(15,16,36).
distancia(15,17,21).
distancia(16,1,85).
distancia(16,2,46).
distancia(16,3,39).
distancia(16,4,20).
distancia(16,5,23).
distancia(16,6,75).
distancia(16,7,53).
distancia(16,8,29).
distancia(16,9,4).
distancia(16,10,58).
distancia(16,11,35).
distancia(16,12,65).
distancia(16,13,19).
distancia(16,14,76).
distancia(16,15,36).
distancia(16,16,0).
distancia(16,17,30).
distancia(17,1,57).
distancia(17,2,18).
distancia(17,3,14).
distancia(17,4,16).
distancia(17,5,12).
distancia(17,6,47).
distancia(17,7,38).
distancia(17,8,8).
distancia(17,9,39).
distancia(17,10,30).
distancia(17,11,36).
distancia(17,12,37).
distancia(17,13,29).
distancia(17,14,48).
distancia(17,15,22).
distancia(17,16,31).
distancia(17,17,0).
tempo(1,2,122).
tempo(1,3,122).
tempo(1,4,151).
tempo(1,5,147).
tempo(1,6,74).
tempo(1,7,116).
tempo(1,8,141).
tempo(1,9,185).
tempo(1,10,97).
tempo(1,11,164).
tempo(1,12,76).
tempo(1,13,174).
tempo(1,14,59).
tempo(1,15,132).
tempo(1,16,181).
tempo(1,17,128).
tempo(2,1,116).
tempo(2,3,55).
tempo(2,4,74).
tempo(2,5,65).
tempo(2,6,69).
tempo(2,7,74).
tempo(2,8,61).
tempo(2,9,103).
tempo(2,10,36).
tempo(2,11,88).
tempo(2,12,61).
tempo(2,13,95).
tempo(2,14,78).
tempo(2,15,69).
tempo(2,16,99).
tempo(2,17,46).
tempo(3,1,120).
tempo(3,2,50).
tempo(3,4,46).
tempo(3,5,46).
tempo(3,6,74).
tempo(3,7,63).
tempo(3,8,38).
tempo(3,9,84).
tempo(3,10,59).
tempo(3,11,61).
tempo(3,12,67).
tempo(3,13,67).
tempo(3,14,82).
tempo(3,15,34).
tempo(3,16,80).
tempo(3,17,36).
tempo(4,1,149).
tempo(4,2,65).
tempo(4,3,46).
tempo(4,5,27).
tempo(4,6,103).
tempo(4,7,55).
tempo(4,8,36).
tempo(4,9,50).
tempo(4,10,78).
tempo(4,11,42).
tempo(4,12,97).
tempo(4,13,44).
tempo(4,14,111).
tempo(4,15,32).
tempo(4,16,53).
tempo(4,17,38).
tempo(5,1,141).
tempo(5,2,55).
tempo(5,3,48).
tempo(5,4,25).
tempo(5,6,97).
tempo(5,7,55).
tempo(5,8,29).
tempo(5,9,48).
tempo(5,10,69).
tempo(5,11,53).
tempo(5,12,95).
tempo(5,13,63).
tempo(5,14,105).
tempo(5,15,34).
tempo(5,16,46).
tempo(5,17,27).
tempo(6,1,69).
tempo(6,2,71).
tempo(6,3,74).
tempo(6,4,103).
tempo(6,5,99).
tempo(6,7,88).
tempo(6,8,92).
tempo(6,9,134).
tempo(6,10,42).
tempo(6,11,116).
tempo(6,12,23).
tempo(6,13,126).
tempo(6,14,25).
tempo(6,15,84).
tempo(6,16,132).
tempo(6,17,80).
tempo(7,1,116).
tempo(7,2,71).
tempo(7,3,61).
tempo(7,4,53).
tempo(7,5,53).
tempo(7,6,88).
tempo(7,8,59).
tempo(7,9,88).
tempo(7,10,84).
tempo(7,11,74).
tempo(7,12,82).
tempo(7,13,76).
tempo(7,14,97).
tempo(7,15,29).
tempo(7,16,84).
tempo(7,17,69).
tempo(8,1,134).
tempo(8,2,59).
tempo(8,3,32).
tempo(8,4,34).
tempo(8,5,32).
tempo(8,6,88).
tempo(8,7,57).
tempo(8,9,69).
tempo(8,10,65).
tempo(8,11,53).
tempo(8,12,82).
tempo(8,13,61).
tempo(8,14,97).
tempo(8,15,36).
tempo(8,16,65).
tempo(8,17,32).
tempo(9,1,181).
tempo(9,2,95).
tempo(9,3,86).
tempo(9,4,55).
tempo(9,5,48).
tempo(9,6,134).
tempo(9,7,95).
tempo(9,8,69).
tempo(9,10,109).
tempo(9,11,61).
tempo(9,12,132).
tempo(9,13,67).
tempo(9,14,143).
tempo(9,15,71).
tempo(9,16,15).
tempo(9,17,67).
tempo(10,1,97).
tempo(10,2,34).
tempo(10,3,59).
tempo(10,4,78).
tempo(10,5,71).
tempo(10,6,40).
tempo(10,7,82).
tempo(10,8,65).
tempo(10,9,109).
tempo(10,11,92).
tempo(10,12,32).
tempo(10,13,99).
tempo(10,14,63).
tempo(10,15,74).
tempo(10,16,105).
tempo(10,17,53).
tempo(11,1,164).
tempo(11,2,88).
tempo(11,3,65).
tempo(11,4,42).
tempo(11,5,55).
tempo(11,6,118).
tempo(11,7,74).
tempo(11,8,59).
tempo(11,9,63).
tempo(11,10,97).
tempo(11,12,111).
tempo(11,13,25).
tempo(11,14,126).
tempo(11,15,53).
tempo(11,16,59).
tempo(11,17,67).
tempo(12,1,76).
tempo(12,2,61).
tempo(12,3,67).
tempo(12,4,97).
tempo(12,5,92).
tempo(12,6,19).
tempo(12,7,82).
tempo(12,8,86).
tempo(12,9,128).
tempo(12,10,32).
tempo(12,11,109).
tempo(12,13,120).
tempo(12,14,40).
tempo(12,15,78).
tempo(12,16,126).
tempo(12,17,74).
tempo(13,1,174).
tempo(13,2,107).
tempo(13,3,74).
tempo(13,4,46).
tempo(13,5,67).
tempo(13,6,128).
tempo(13,7,80).
tempo(13,8,76).
tempo(13,9,67).
tempo(13,10,105).
tempo(13,11,27).
tempo(13,12,122).
tempo(13,14,137).
tempo(13,15,67).
tempo(13,16,59).
tempo(13,17,78).
tempo(14,1,59).
tempo(14,2,80).
tempo(14,3,80).
tempo(14,4,109).
tempo(14,5,105).
tempo(14,6,27).
tempo(14,7,97).
tempo(14,8,99).
tempo(14,9,143).
tempo(14,10,61).
tempo(14,11,122).
tempo(14,12,42).
tempo(14,13,132).
tempo(14,15,90).
tempo(14,16,139).
tempo(14,17,86).
tempo(15,1,132).
tempo(15,2,74).
tempo(15,3,34).
tempo(15,4,36).
tempo(15,5,36).
tempo(15,6,86).
tempo(15,7,34).
tempo(15,8,42).
tempo(15,9,71).
tempo(15,10,82).
tempo(15,11,53).
tempo(15,12,80).
tempo(15,13,69).
tempo(15,14,95).
tempo(15,16,69).
tempo(15,17,53).
tempo(16,1,179).
tempo(16,2,92).
tempo(16,3,84).
tempo(16,4,57).
tempo(16,5,46).
tempo(16,6,132).
tempo(16,7,92).
tempo(16,8,67).
tempo(16,9,15).
tempo(16,10,105).
tempo(16,11,57).
tempo(16,12,130).
tempo(16,13,61).
tempo(16,14,141).
tempo(16,15,69).
tempo(16,17,65).
tempo(17,1,128).
tempo(17,2,42).
tempo(17,3,40).
tempo(17,4,42).
tempo(17,5,34).
tempo(17,6,82).
tempo(17,7,74).
tempo(17,8,29).
tempo(17,9,69).
tempo(17,10,55).
tempo(17,11,69).
tempo(17,12,80).
tempo(17,13,82).
tempo(17,14,90).
tempo(17,15,53).
tempo(17,16,67).
energia(1,2,42).
energia(1,3,46).
energia(1,4,54).
energia(1,5,52).
energia(1,6,24).
energia(1,7,35).
energia(1,8,46).
energia(1,9,74).
energia(1,10,30).
energia(1,11,64).
energia(1,12,23).
energia(1,13,66).
energia(1,14,18).
energia(1,15,51).
energia(1,16,68).
energia(1,17,45).
energia(2,1,42).
energia(2,3,22).
energia(2,4,25).
energia(2,5,22).
energia(2,6,27).
energia(2,7,38).
energia(2,8,18).
energia(2,9,44).
energia(2,10,14).
energia(2,11,41).
energia(2,12,19).
energia(2,13,42).
energia(2,14,34).
energia(2,15,30).
energia(2,16,38).
energia(2,17,14).
energia(3,1,45).
energia(3,2,22).
energia(3,4,15).
energia(3,5,14).
energia(3,6,37).
energia(3,7,23).
energia(3,8,8).
energia(3,9,36).
energia(3,10,28).
energia(3,11,27).
energia(3,12,32).
energia(3,13,29).
energia(3,14,38).
energia(3,15,8).
energia(3,16,30).
energia(3,17,10).
energia(4,1,54).
energia(4,2,24).
energia(4,3,16).
energia(4,5,10).
energia(4,6,47).
energia(4,7,27).
energia(4,8,10).
energia(4,9,26).
energia(4,10,34).
energia(4,11,19).
energia(4,12,42).
energia(4,13,11).
energia(4,14,48).
energia(4,15,13).
energia(4,16,14).
energia(4,17,11).
energia(5,1,51).
energia(5,2,20).
energia(5,3,14).
energia(5,4,9).
energia(5,6,44).
energia(5,7,28).
energia(5,8,7).
energia(5,9,24).
energia(5,10,30).
energia(5,11,26).
energia(5,12,36).
energia(5,13,20).
energia(5,14,45).
energia(5,15,14).
energia(5,16,18).
energia(5,17,7).
energia(6,1,23).
energia(6,2,27).
energia(6,3,38).
energia(6,4,46).
energia(6,5,44).
energia(6,7,48).
energia(6,8,38).
energia(6,9,66).
energia(6,10,14).
energia(6,11,56).
energia(6,12,9).
energia(6,13,58).
energia(6,14,9).
energia(6,15,44).
energia(6,16,60).
energia(6,17,38).
energia(7,1,36).
energia(7,2,38).
energia(7,3,22).
energia(7,4,26).
energia(7,5,28).
energia(7,6,48).
energia(7,8,26).
energia(7,9,48).
energia(7,10,44).
energia(7,11,22).
energia(7,12,42).
energia(7,13,31).
energia(7,14,49).
energia(7,15,16).
energia(7,16,42).
energia(7,17,30).
energia(8,1,46).
energia(8,2,18).
energia(8,3,6).
energia(8,4,10).
energia(8,5,7).
energia(8,6,38).
energia(8,7,26).
energia(8,9,30).
energia(8,10,26).
energia(8,11,22).
energia(8,12,34).
energia(8,13,24).
energia(8,14,40).
energia(8,15,12).
energia(8,16,23).
energia(8,17,6).
energia(9,1,72).
energia(9,2,41).
energia(9,3,35).
energia(9,4,24).
energia(9,5,23).
energia(9,6,65).
energia(9,7,47).
energia(9,8,28).
energia(9,10,51).
energia(9,11,29).
energia(9,12,57).
energia(9,13,19).
energia(9,14,66).
energia(9,15,34).
energia(9,16,3).
energia(9,17,28).
energia(10,1,30).
energia(10,2,14).
energia(10,3,27).
energia(10,4,33).
energia(10,5,30).
energia(10,6,14).
energia(10,7,42).
energia(10,8,24).
energia(10,9,52).
energia(10,11,46).
energia(10,12,6).
energia(10,13,46).
energia(10,14,17).
energia(10,15,34).
energia(10,16,46).
energia(10,17,23).
energia(11,1,65).
energia(11,2,41).
energia(11,3,28).
energia(11,4,18).
energia(11,5,25).
energia(11,6,57).
energia(11,7,23).
energia(11,8,23).
energia(11,9,28).
energia(11,10,46).
energia(11,12,52).
energia(11,13,7).
energia(11,14,58).
energia(11,15,25).
energia(11,16,27).
energia(11,17,27).
energia(12,1,23).
energia(12,2,19).
energia(12,3,32).
energia(12,4,41).
energia(12,5,38).
energia(12,6,8).
energia(12,7,42).
energia(12,8,33).
energia(12,9,61).
energia(12,10,6).
energia(12,11,50).
energia(12,13,53).
energia(12,14,10).
energia(12,15,38).
energia(12,16,54).
energia(12,17,32).
energia(13,1,65).
energia(13,2,35).
energia(13,3,29).
energia(13,4,11).
energia(13,5,20).
energia(13,6,57).
energia(13,7,30).
energia(13,8,20).
energia(13,9,20).
energia(13,10,47).
energia(13,11,7).
energia(13,12,52).
energia(13,14,58).
energia(13,15,17).
energia(13,16,15).
energia(13,17,22).
energia(14,1,18).
energia(14,2,35).
energia(14,3,38).
energia(14,4,46).
energia(14,5,45).
energia(14,6,9).
energia(14,7,48).
energia(14,8,38).
energia(14,9,66).
energia(14,10,17).
energia(14,11,57).
energia(14,12,10).
energia(14,13,58).
energia(14,15,44).
energia(14,16,61).
energia(14,17,38).
energia(15,1,51).
energia(15,2,30).
energia(15,3,8).
energia(15,4,12).
energia(15,5,14).
energia(15,6,44).
energia(15,7,16).
energia(15,8,13).
energia(15,9,35).
energia(15,10,36).
energia(15,11,25).
energia(15,12,38).
energia(15,13,18).
energia(15,14,45).
energia(15,16,29).
energia(15,17,17).
energia(16,1,68).
energia(16,2,37).
energia(16,3,31).
energia(16,4,16).
energia(16,5,18).
energia(16,6,60).
energia(16,7,42).
energia(16,8,23).
energia(16,9,3).
energia(16,10,46).
energia(16,11,28).
energia(16,12,52).
energia(16,13,15).
energia(16,14,61).
energia(16,15,29).
energia(16,17,24).
energia(17,1,46).
energia(17,2,14).
energia(17,3,11).
energia(17,4,13).
energia(17,5,10).
energia(17,6,38).
energia(17,7,30).
energia(17,8,6).
energia(17,9,31).
energia(17,10,24).
energia(17,11,29).
energia(17,12,30).
energia(17,13,23).
energia(17,14,38).
energia(17,15,18).
energia(17,16,25).

tempo_extra(1,1,0).
tempo_extra(1,2,0).
tempo_extra(1,3,0).
tempo_extra(1,4,25).
tempo_extra(1,5,25).
tempo_extra(1,6,0).
tempo_extra(1,7,0).
tempo_extra(1,8,0).
tempo_extra(1,9,53).
tempo_extra(1,10,0).
tempo_extra(1,11,40).
tempo_extra(1,12,0).
tempo_extra(1,13,45).
tempo_extra(1,14,0).
tempo_extra(1,15,24).
tempo_extra(1,16,45).
tempo_extra(1,17,0).
tempo_extra(2,1,0).
tempo_extra(2,2,0).
tempo_extra(2,3,0).
tempo_extra(2,4,0).
tempo_extra(2,5,0).
tempo_extra(2,6,0).
tempo_extra(2,7,0).
tempo_extra(2,8,0).
tempo_extra(2,9,0).
tempo_extra(2,10,0).
tempo_extra(2,11,0).
tempo_extra(2,12,0).
tempo_extra(2,13,0).
tempo_extra(2,14,0).
tempo_extra(2,15,0).
tempo_extra(2,16,0).
tempo_extra(2,17,0).
tempo_extra(3,1,0).
tempo_extra(3,2,0).
tempo_extra(3,3,0).
tempo_extra(3,4,0).
tempo_extra(3,5,0).
tempo_extra(3,6,0).
tempo_extra(3,7,0).
tempo_extra(3,8,0).
tempo_extra(3,9,0).
tempo_extra(3,10,0).
tempo_extra(3,11,0).
tempo_extra(3,12,0).
tempo_extra(3,13,0).
tempo_extra(3,14,0).
tempo_extra(3,15,0).
tempo_extra(3,16,0).
tempo_extra(3,17,0).
tempo_extra(4,1,25).
tempo_extra(4,2,0).
tempo_extra(4,3,0).
tempo_extra(4,4,0).
tempo_extra(4,5,0).
tempo_extra(4,6,0).
tempo_extra(4,7,0).
tempo_extra(4,8,0).
tempo_extra(4,9,0).
tempo_extra(4,10,0).
tempo_extra(4,11,0).
tempo_extra(4,12,0).
tempo_extra(4,13,0).
tempo_extra(4,14,0).
tempo_extra(4,15,0).
tempo_extra(4,16,0).
tempo_extra(4,17,0).
tempo_extra(5,1,0).
tempo_extra(5,2,0).
tempo_extra(5,3,0).
tempo_extra(5,4,0).
tempo_extra(5,5,0).
tempo_extra(5,6,0).
tempo_extra(5,7,0).
tempo_extra(5,8,0).
tempo_extra(5,9,0).
tempo_extra(5,10,0).
tempo_extra(5,11,0).
tempo_extra(5,12,0).
tempo_extra(5,13,0).
tempo_extra(5,14,0).
tempo_extra(5,15,0).
tempo_extra(5,16,0).
tempo_extra(5,17,0).
tempo_extra(6,1,0).
tempo_extra(6,2,0).
tempo_extra(6,3,0).
tempo_extra(6,4,0).
tempo_extra(6,5,0).
tempo_extra(6,6,0).
tempo_extra(6,7,0).
tempo_extra(6,8,0).
tempo_extra(6,9,45).
tempo_extra(6,10,0).
tempo_extra(6,11,30).
tempo_extra(6,12,0).
tempo_extra(6,13,33).
tempo_extra(6,14,0).
tempo_extra(6,15,0).
tempo_extra(6,16,35).
tempo_extra(6,17,0).
tempo_extra(7,1,0).
tempo_extra(7,2,0).
tempo_extra(7,3,0).
tempo_extra(7,4,0).
tempo_extra(7,5,0).
tempo_extra(7,6,0).
tempo_extra(7,7,0).
tempo_extra(7,8,0).
tempo_extra(7,9,0).
tempo_extra(7,10,0).
tempo_extra(7,11,0).
tempo_extra(7,12,0).
tempo_extra(7,13,0).
tempo_extra(7,14,21).
tempo_extra(7,15,0).
tempo_extra(7,16,0).
tempo_extra(7,17,0).
tempo_extra(8,1,0).
tempo_extra(8,2,0).
tempo_extra(8,3,0).
tempo_extra(8,4,0).
tempo_extra(8,5,0).
tempo_extra(8,6,0).
tempo_extra(8,7,0).
tempo_extra(8,8,0).
tempo_extra(8,9,0).
tempo_extra(8,10,0).
tempo_extra(8,11,0).
tempo_extra(8,12,0).
tempo_extra(8,13,0).
tempo_extra(8,14,0).
tempo_extra(8,15,0).
tempo_extra(8,16,0).
tempo_extra(8,17,0).
tempo_extra(9,1,50).
tempo_extra(9,2,0).
tempo_extra(9,3,0).
tempo_extra(9,4,0).
tempo_extra(9,5,0).
tempo_extra(9,6,42).
tempo_extra(9,7,0).
tempo_extra(9,8,0).
tempo_extra(9,9,0).
tempo_extra(9,10,24).
tempo_extra(9,11,0).
tempo_extra(9,12,31).
tempo_extra(9,13,0).
tempo_extra(9,14,45).
tempo_extra(9,15,0).
tempo_extra(9,16,0).
tempo_extra(9,17,0).
tempo_extra(10,1,0).
tempo_extra(10,2,0).
tempo_extra(10,3,0).
tempo_extra(10,4,0).
tempo_extra(10,5,0).
tempo_extra(10,6,0).
tempo_extra(10,7,0).
tempo_extra(10,8,0).
tempo_extra(10,9,25).
tempo_extra(10,10,0).
tempo_extra(10,11,0).
tempo_extra(10,12,0).
tempo_extra(10,13,0).
tempo_extra(10,14,0).
tempo_extra(10,15,0).
tempo_extra(10,16,0).
tempo_extra(10,17,0).
tempo_extra(11,1,42).
tempo_extra(11,2,0).
tempo_extra(11,3,0).
tempo_extra(11,4,0).
tempo_extra(11,5,0).
tempo_extra(11,6,31).
tempo_extra(11,7,0).
tempo_extra(11,8,0).
tempo_extra(11,9,0).
tempo_extra(11,10,0).
tempo_extra(11,11,0).
tempo_extra(11,12,25).
tempo_extra(11,13,0).
tempo_extra(11,14,33).
tempo_extra(11,15,0).
tempo_extra(11,16,0).
tempo_extra(11,17,0).
tempo_extra(12,1,0).
tempo_extra(12,2,0).
tempo_extra(12,3,0).
tempo_extra(12,4,0).
tempo_extra(12,5,0).
tempo_extra(12,6,0).
tempo_extra(12,7,0).
tempo_extra(12,8,0).
tempo_extra(12,9,37).
tempo_extra(12,10,0).
tempo_extra(12,11,23).
tempo_extra(12,12,0).
tempo_extra(12,13,26).
tempo_extra(12,14,0).
tempo_extra(12,15,0).
tempo_extra(12,16,28).
tempo_extra(12,17,0).
tempo_extra(13,1,42).
tempo_extra(13,2,0).
tempo_extra(13,3,0).
tempo_extra(13,4,0).
tempo_extra(13,5,0).
tempo_extra(13,6,31).
tempo_extra(13,7,0).
tempo_extra(13,8,0).
tempo_extra(13,9,0).
tempo_extra(13,10,0).
tempo_extra(13,11,0).
tempo_extra(13,12,25).
tempo_extra(13,13,0).
tempo_extra(13,14,33).
tempo_extra(13,15,0).
tempo_extra(13,16,0).
tempo_extra(13,17,0).
tempo_extra(14,1,0).
tempo_extra(14,2,0).
tempo_extra(14,3,0).
tempo_extra(14,4,0).
tempo_extra(14,5,0).
tempo_extra(14,6,0).
tempo_extra(14,7,0).
tempo_extra(14,8,0).
tempo_extra(14,9,45).
tempo_extra(14,10,0).
tempo_extra(14,11,31).
tempo_extra(14,12,0).
tempo_extra(14,13,35).
tempo_extra(14,14,0).
tempo_extra(14,15,0).
tempo_extra(14,16,37).
tempo_extra(14,17,0).
tempo_extra(15,1,24).
tempo_extra(15,2,0).
tempo_extra(15,3,0).
tempo_extra(15,4,0).
tempo_extra(15,5,0).
tempo_extra(15,6,0).
tempo_extra(15,7,0).
tempo_extra(15,8,0).
tempo_extra(15,9,0).
tempo_extra(15,10,0).
tempo_extra(15,11,0).
tempo_extra(15,12,0).
tempo_extra(15,13,0).
tempo_extra(15,14,0).
tempo_extra(15,15,0).
tempo_extra(15,16,0).
tempo_extra(15,17,0).
tempo_extra(16,1,45).
tempo_extra(16,2,0).
tempo_extra(16,3,0).
tempo_extra(16,4,0).
tempo_extra(16,5,0).
tempo_extra(16,6,35).
tempo_extra(16,7,0).
tempo_extra(16,8,0).
tempo_extra(16,9,0).
tempo_extra(16,10,0).
tempo_extra(16,11,0).
tempo_extra(16,12,25).
tempo_extra(16,13,0).
tempo_extra(16,14,37).
tempo_extra(16,15,0).
tempo_extra(16,16,0).
tempo_extra(16,17,0).
tempo_extra(17,1,0).
tempo_extra(17,2,0).
tempo_extra(17,3,0).
tempo_extra(17,4,0).
tempo_extra(17,5,0).
tempo_extra(17,6,0).
tempo_extra(17,7,0).
tempo_extra(17,8,0).
tempo_extra(17,9,0).
tempo_extra(17,10,0).
tempo_extra(17,11,0).
tempo_extra(17,12,0).
tempo_extra(17,13,0).
tempo_extra(17,14,0).
tempo_extra(17,15,0).
tempo_extra(17,16,0).
tempo_extra(17,17,0).
