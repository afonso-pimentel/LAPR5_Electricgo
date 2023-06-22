:-consult("../../Planning/prolog/factosissue5.pl").
%Minorante


minorante(Orig,Dest,C):-
		%retractall(min(_)), assertz(min(1000)),
		%min(MA),
		conta(Dest,I),	
	   menor(Orig,Dest,C1,I),
	   C is C1.
	 
	   
%Majorante

	majorante(Orig,Dest,C):-
		conta(Dest,I),	
	   maior(Orig,Dest,C1,I),
	   C is C1.	
		
		
%predicados usados

	menor(_,[],_,0).
	menor(Ai,[H|T],C,I):-
	Min is 1000,
	menor(Ai1,T,C1,I1),
		\+ visited(H,[H|_]),
		(En is 0,
		procura(Ai,[H|T],Min,C,En),
		Ai1 is Ai,
		C1 is C + C1,
		I1 is I -1,
		visited(En,[En|_]),
		I1 = 0 ,
		(tempo(Ai1,1,T),
		tempo_extra(Ai1,1,TE),
		TT is T + TE,
		C1 is C1 + TT)),
		;
		procura(Ai,T,Min,En),
		Ai1 is Ai,
		C1 is C + C1,
		I1 is I -1,
		visited(En,[En|_]),
		I1 = 0 ,
		(tempo(Ai1,1,T),
		tempo_extra(Ai1,1,TE),
		TT is T + TE,
		C1 is C1 + TT).
		
		
	procura(_,[],0,_,_).
	procura(A,[H|T],Min,C,E):-	
		procura(A1,T,Min1,C1,E1),	
		X is A1,		
		calcula(H,TP,X,En),
		TP=<Min,
		((A1 is A,
		Min1 is TP,C1 is TP,E1 is En);Min1 is Min,A1 is A,C1 is C,E1 is E).
	
	
	calcula(Id,TP,A,E):-
	entrega(Id,_,_,AF,_,_),
	tempo(A,AF,T),
	tempo_extra(A,AF,TE),
	%write(A),write("-"),
	%write(AF),write("-"),
	%write(TE),
	A is AF ,
	E is Id,
	TP is T + TE.
	
	
	procura2(_,[],0,_,_).
	procura2(A,[H|T],Max,C,E):-	
		procura3(A1,T,Max1,C1,E1),	
		X is A1,		
		calcula(H,TP,X,En),
		TP>=Min,
		((A1 is A,
		Min1 is TP,C1 is TP,E1 is En);Max1 is Max,A1 is A,C1 is C,E1 is E).
		
		
		
		
	maior(_,[],_,0).
	maior(Ai,[H|T],C,I):-
	Max is 1000,
	maior(Ai1,T,C1,I1),
		\+ visited(H,[H|_]),
		(En is 0,
		procura2(Ai,[H|T],Max,C,En),
		Ai1 is Ai,
		C1 is C + C1,
		I1 is I -1,
		visited(En,[En|_]),
		I1 = 0 ,
		(tempo(Ai1,1,T),
		tempo_extra(Ai1,1,TE),
		TT is T + TE,
		C1 is C1 + TT)),
		;
		procura2(Ai,T,Max,En),
		Ai1 is Ai,
		C1 is C + C1,
		I1 is I -1,
		visited(En,[En|_]),
		I1 = 0 ,
		(tempo(Ai1,1,T),
		tempo_extra(Ai1,1,TE),
		TT is T + TE,
		C1 is C1 + TT).	
	
	visited(X,[X|_]) :- ! .             
	visited(X,[_|Xs]) :- visited(X,Xs).
	
	conta([],0).
	conta([_|T],C):-conta(T,C1),C is C1 + 1.
	
%predicados nao usados

minorante2(_,[],0,_).
minorante2(A,[H|T],Min,MA):-
	%write(A),write("-"),
	%write(H),write("-"),
	%write(Min),
	
	minorante2(A,T,Min1,MA1),
	
	%write(T),
	%min is 1000,
	%write(min),
	
	entrega(H,_,_,AF,_,_),
	
	%write(H),write("-"),write(AF),
	%write(AF),write("-"),
	%armazeminicial(A),write(A),
	
	tempo(A,AF,Tmp),
	
	%write(Tmp),
	%write(A),write("-"),write(AF),
	
	tempo_extra(A,AF,Te),	
	%write(A),write("-"),write(AF),
	
	%write(Te),
	
	X is Tmp + Te,
	
	%write(X),
	%write(Min1),
	%min(MA),
	%write(min),
	
	X=<MA1,
	(Min1 is X ;Min1 is MA),
	MA1 is Min1,
	Min is Min1.
	
	