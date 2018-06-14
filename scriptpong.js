	//"The Immortals Techno Syndrome "
	//audio
	const punch = new Audio();
	punch.src = "PUNCH.mp3"
	const finish = new Audio();
	finish.src = "finishhim.mp3"
	const excellent = new Audio();
	excellent.src = "excellent.mp3"
	const fatality = new Audio();
	fatality.src = "mkfatality.mp3"
	//punkty
	let pkl = 0;
	let pkr = 0;
	let punkty=document.getElementById("pkt")
	//stawianiae canvasa
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');
	//rozmaiaryry pola
	canvas.width = 1000;
	canvas.height = 500;
	//dopisywanie rozmiaru
	const canszer = canvas.width;
	const canwys = canvas.height; 
	const ballS=20;//srednica pilki(wysokosc , szerokosc);
	//Polozenie startowe
	let bX = canszer/2-ballS/2;
	let bY = canwys/2-ballS/2;
	//rozmiar paleczki 
	const paleczkaWys = 100;
	const paleczkaSzer = 20;
	//polozenie paleczek (na osi x)
	const graczX = 70;
	const botX= 910; 
	//polozenie paleczek (na osi y)
	let graczY = 200;
	let botY= 200; 
	//rozmiar kresek podzialu
	const kreskiWidth = 6;
	const kreskiHeight = 16;
	//Startowy kierunek piłki przez ustalenie początkowej predkosci
	let ballVX = Math.floor(Math.random() * 2 -1);
	let ballVY = Math.floor(Math.random() * 2 -1);
	if(ballVX==0){ballVX+=1;}
	if(ballVY==0){ballVY+=1;}
	//prędkość przesuwania paletek
	let graczVY=0;
	let botVY=0;
	function gracz(){
	ctx.fillStyle="red";
	ctx.fillRect(graczX,graczY,paleczkaSzer,paleczkaWys); //rysowanie lewej paletki
	graczY+=graczVY;
	}
	function bot(){
	ctx.fillStyle='#0000ff';
	ctx.fillRect(botX,botY,paleczkaSzer,paleczkaWys); //rysowanie prawej paletki
	botY+=botVY;
	}
	function ball(){ //rysowanie pilki
	ctx.fillStyle="white";
	ctx.fillRect(bX,bY,ballS,ballS);
		//dodawanie predkosci po odbiciach
		bX+=ballVX;
		bY+=ballVY;
		//odbicie gora i dol canvasa 
		if(bY<=0 || bY +ballS>=canwys){
		ballVY=-ballVY;
		acceleration() //wywoalenie funkcji dodającej predkosc
		}
		//odbicie od paletek
		if((bX<=90 && bY+ballS>=graczY && bY<=graczY+paleczkaWys)  || (bX +ballS>=canszer-90 && bY+ballS>=botY && bY<=botY+paleczkaWys)){  //warunki odbic
		punch.play(); //wywoalenie efektu dzwiekowego
		ballVX=-ballVX; //zmaina kierunku ruchu po odbicu
		acceleration()
		}else if(bX<graczX+paleczkaSzer){ //warunek  zdobycia punktu gracza po lewej stronie
				pkr+=1;
				punkty.innerText=pkl+"||"+pkr; //rysowanie licznika i ponowne ustawienie pilki na start(środek canvasa)
				bX=canszer/2-ballS/2;
				bY=canwys/2-ballS/2;
				ballVX = Math.floor(Math.random() * 2 -1);
	            ballVY = Math.floor(Math.random() * 2 -1);
	            if(ballVX==0){ballVX+=1;}
	            if(ballVY==0){ballVY+=1;}
				}else if(bX +ballS>botX){//warunek  zdobycia punktu gracza po prawej stronie
						pkl+=1;
						punkty.innerText=pkl+"||"+pkr;//rysowanie licznika i ponowne ustawienie pilki na start(środek canvasa)
						bX=canszer/2-ballS/2;
						bY=canwys/2-ballS/2;
						ballVX = Math.floor(Math.random() * 2 -1);
	                    ballVY = Math.floor(Math.random() * 2 -1);
	                    if(ballVX==0){ballVX+=1;}
	                    if(ballVY==0){ballVY+=1;}
						}
						sound();//funkcja z efektami
						przegrana();//wywoałeni funkcji sprwadzajacej czy gracz przegrał
	}
	//dodatkowe efekty dzwiekowe
	function sound(pkl,pkr){
	if((pkr==4 && pkl==0 )||(pkl==4 && pkr==0) ) {fatality.play()}
		else if(pkr==4 ||pkl==4){finish.play();}
				if((pkr==5 && pkl==0 )||(pkl==5 && pkr==0 )){
					excellent.play();
				}
	}
	function table(){
		//Stół
		ctx.fillStyle = 'black'; //zmiana koloru
		ctx.fillRect(0,0,canszer,canwys);  // wypełneinie przestrzenią (x0,y0,xk,yk)
		//kreski podzialu (lp-pozycja lini)
		for(let lp = 20;lp<canwys;lp+=30){ 
		ctx.fillStyle = "gray";
		ctx.fillRect(canszer/2-kreskiWidth/2,lp,kreskiWidth,kreskiHeight);
		}
	}
	topCanvas= canvas.offsetTop; //odleglosc canvasa od gory strony
	pressedKeys = []; //tablica kliknietych klawiszy
	//poruszanie paletkami
$(document.body).keydown(function (evt) { //fukcja  uruchamian przy wcisienitych kaliwszach
    var li = pressedKeys[evt.keyCode];
    if (!li) {
        pressedKeys[evt.keyCode] = li;
		//console.log(evt.keyCode);
		}
		switch(evt.keyCode){
		case 87: if(graczY<=0){ //klikniecie klawisza W
			graczY=0;
			graczVY=0;		
		}else graczVY=-paleczkaWys/10 //zmina polozenia o 25
			break;
		case 83: if(graczY>=canwys-paleczkaWys){ //klikniecie klawisza S
			graczY=canwys - paleczkaWys;	
			graczVY=0;
		}else graczVY=paleczkaWys/10 //zmina polozenia o 25
			break;
		case 38: if(botY<=0){ // klikniecie strzalki w gore
			botY=0;
			botVY=0;
		}else botVY=-paleczkaWys/10
			break;
		case 40: if(botY>=canwys-paleczkaWys){ // klikniecie strzalki w dół
				botY=canwys - paleczkaWys;
				botVY=0;
		}else botVY=paleczkaWys/10
			break;
		}
});
$(document.body).keyup(function (evt) { //fukcja  uruchamian przy puszczeniu kaliwszy
    var li = pressedKeys[evt.keyCode];
    if (!li) {
        pressedKeys[evt.keyCode] = li;
		//console.log(evt.keyCode);
		}
		switch(evt.keyCode){
		case 87: if(graczY<=0){ //puszczenie klawisza W
			graczY=0;
			graczVY=0;			
		}else graczVY=0 //zmina polozenia o 25
			break;
		case 83: if(graczY>=canwys-paleczkaWys){ //puszczenie klawisza S
			graczY=canwys -paleczkaWys;	
			graczVY=0;
		}else graczVY=0 //zmina polozenia o 25
			break;
		case 38: if(botY<=0){ // puszczenie strzalki w gore
			botY=0;
			botVY=0;
		}else botVY=0
			break;
		case 40: if(botY>=canwys-paleczkaWys){ // puszczenie strzalki w dół
					botY=canwys -paleczkaWys;
					botVY=0;
		}else botVY=0
			break;
		}
    
   
});
	//Funkcja  dodając przsypieszenie przy odbiciach
	function acceleration(){
		//console.log("przyspiesza" + "||"+Math.abs(ballVX)) //sprawdzanie przysp
		if(ballVX > 0 && ballVX <15){  //maxymalne przyspieszenie 10
		ballVX +=0.5; //przyspieszenie co krok 0.4
		}
		else if(ballVX < 0 && ballVX >-15){
			ballVX -=0.5;
			}
		if(ballVY > 0 && ballVY <15){
		ballVY +=0.5;
		}
		else if(ballVY < 0 && ballVY >-15){
			ballVY -=0.5;
			}
	}
	//warunki przegranej/wygranej
	function przegrana(){
		if(pkr==5){ //warunek maksymalnej liczby punktów
		pkl=0;//zerowanie wyniku
		pkr=0;//zerowanie wyniku
		location.href="end.html"; //przekierowanie na strone końcową
		}
		if(pkl==5){ //warunek maksymalnej liczby punktów
		pkl=0;//zerowanie wyniku
		pkr=0;//zerowanie wyniku
		location.href="endl.html"; //przekierowanie na strone końcową
		}
		punkty.innerText=pkl+"||"+pkr; //zerowanie licznika  na stronie
	}
	function rysuj(){
	table(); //zamalowywuje  na czarno
	ball(); //tworzy pilke
	gracz();//gracza
	bot();// i bota
	//dla myszki
	//pozycjaBota();
	}
	setInterval(rysuj,1000/60) //60 klatek na sekunde
	