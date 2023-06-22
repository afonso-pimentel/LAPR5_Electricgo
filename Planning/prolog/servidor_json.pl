:- json_object planeamento_frota_json(planeamentoFrota:list(planeamento_camiao_json)).

:- json_object planeamento_camiao_json(camiao:string,
                                  listaOrdemEntregas:list(string),
                                  listaOrdemArmazens:list(string),
                                  listaCarregamentosArmazem:list(string),
                                  listaQuantidadesCarregamento:list(string),
                                  listaTemposCarregamentoArmazem:list(string),
                                  custo:float).

:- json_object planeamento_rota(listaOrdemEntregas:list(string),
                                listaOrdemArmazens:list(string),
                                listaCarregamentosArmazem:list(string),
                                listaQuantidadesCarregamento:list(string),
                                listaTemposCarregamentoArmazem:list(string),
                                custo:float).