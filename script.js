var zoomLevel = 14;
var minZoomLevel = 14;
var InfoWindowNum = 0;
var infoWindow;
var Num;
var Poeng = 0;
var PoengSteder = new Array();


var marker = new Array;
var Steder = new Array;
Steder[0] = {navn:"Ibsenhuset", lat:59.207864, lng:9.603876, åpenFra:"12.00",åpenTil:"19.00",Info:"<img src='Bilder/ibsenhuset.PNG'><p>Opplev kultur-norge slik du aldri har sett det før!</p>", filter:"kunst", synlighet:0};
Steder[1] = {navn:"Rema 1000", lat:59.207666,lng:9.605999, åpenFra:"07.00",åpenTil:"16.00",Info:"<img src='Bilder/rema1000.PNG'><p>Spar penger med 'Æ'!</p>", filter:"butikker", synlighet:0};
Steder[2] = {navn:"Arkaden",lat:59.207244,lng:9.608155,åpenFra:"10.00",åpenTil:"20.00",Info:"<img src='Bilder/arkaden.PNG'><p>Det største kjøpesenteret i Skien.</p>", filter:"butikker", synlighet:0};
Steder[3] = {navn:"SF Kino Skien",lat:59.205061,lng:9.604573,åpenFra:"16.00", åpenTil:"23.00",Info:"<img src='Bilder/sfkino.PNG'><p>Få en større opplevelse av de nye filmene.</p>", filter:"kunst", synlighet:0};
Steder[4] = {navn:"Strøm Mat & Bar",lat:59.206040,lng:9.607338,åpenFra:"11.00",åpenTil:"00.00",Info:"<img src='Bilder/strømmatogbar.PNG'><p>Samle inn nok poeng og få en gratis kaffe!</p>", filter:"kafe", synlighet:0};
Steder[5] = {navn:"Rådhuset", lat:59.208888, lng:9.605111, åpenFra:"08.00",åpenTil:"19.00", Info:"<img src='Bilder/rådhuset.PNG'><p>Rådhuset i Skien.</p>", filter:"severdigheter", synlighet:0};

window.onload = oppstart; //Dette får funksjonen oppstart til å kjøre med en gang html dokumentet er ferdig lastet

function oppstart() { //Inne i denne funksjonen er kode som aktiveres med en gang html-dokumentet er ferdig lastet
  myMap();
 
  document.getElementById("kafe").onclick = function(){filterFunksjon("kafe")};
  document.getElementById("kunst").onclick = function(){filterFunksjon("kunst")};
  document.getElementById("butikker").onclick = function(){filterFunksjon("butikker")};
  document.getElementById("severdigheter").onclick = function(){filterFunksjon("severdigheter")};
}

function myMap() {
  var myLatLng = {lat: 59.208283, lng:9.605863};
    var mapOptions = {
        center: myLatLng,
        zoom: zoomLevel,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    google.maps.event.addListener(map, 'dragend', function(){
      var Map_Center = map.getCenter();
      var x = Map_Center.lng();
      var y = Map_Center.lat();



 //Setter en grense for koordinatene slik at det ikke kan dras lenger enn til de oppgitt koordinatene funnet med google
      if (y < 59.192935) {
        y = 59.192935;
      } if (y > 59.225566) {
        y = 59.225566;
      } if (x < 9.553125) {
        x = 9.553125;
      } if (x > 9.643838) {
        x = 9.643838;
      }
      map.setCenter( new google.maps.LatLng(y,x)); //Setter verdien for centeret utfra verdiene til x og y variablene
    });
	for (var s = 0; s < marker.length; s++) {
		marker.pop();
	}
    for (var i = 0; i < Steder.length; i++) {
 
    marker[i] = new google.maps.Marker({
      position: {lat: Steder[i].lat, lng: Steder[i].lng},
      title:"Senter",
      ID:"Merke"+i
	
    });
	
    marker[i].setMap(map);
	if (Steder[i].synlighet == 0) {
		marker[i].setVisible(true);
	}
	else {
		marker[i].setVisible(false);
	}
	}
    marker[0].addListener('click', function(){
      infoWindowFunction(0);
      PoengFunksjon(0);
	  rabatt();
    });
    marker[1].addListener('click', function(){
      infoWindowFunction(1);
      PoengFunksjon(1);
	  rabatt();
    });
    marker[2].addListener('click', function(){
      infoWindowFunction(2);
      PoengFunksjon(2);
	  rabatt();
    });
    marker[3].addListener('click', function(){
      infoWindowFunction(3);
      PoengFunksjon(3);
	  rabatt();
    });
    marker[4].addListener('click', function(){
      infoWindowFunction(4);
      PoengFunksjon(4);
	  rabatt();
    });
	marker[5].addListener('click', function(){
      infoWindowFunction(5);
      PoengFunksjon(5);
	  rabatt();
    });


    google.maps.event.addListener(map, 'zoom_changed', function(){
      if (map.getZoom() < zoomLevel) {
        map.setZoom(zoomLevel);
      }
    });
}

function infoWindowFunction(j) {
  if (Num == 1) {
    infoWindow.close();
  }
   infoWindow = new google.maps.InfoWindow({
        content: "<h3>"+Steder[j].navn+"</h3>Åpent fra:<br>Fra:"+Steder[j].åpenFra+"<br>Til:"+Steder[j].åpenTil+"<br><br>"+Steder[j].Info
  });
  infoWindow.open(map, marker[j]);
  Num=1;
}
function filterFunksjon(kategori) {
	for (var w = 0; w < marker.length; w++) {
	if (kategori == "kafe" && Steder[w].filter == "kafe") {
		if (Steder[w].synlighet == 0) {
	
		Steder[w].synlighet = 1;
		}
		else {
		
			Steder[w].synlighet = 0;
		}
	}
	else if (kategori == "kunst" && Steder[w].filter == "kunst") {
		if (Steder[w].synlighet == 0) {

		Steder[w].synlighet = 1;
		}
		else {
	
			Steder[w].synlighet = 0;
		}
	}
	else if (kategori == "butikker" && Steder[w].filter == "butikker") {
		if (Steder[w].synlighet == 0) {
	
		Steder[w].synlighet = 1;
		}
		else {
	
			Steder[w].synlighet = 0;
		}
	}
	else if (kategori == "severdigheter" && Steder[w].filter == "severdigheter") {
		if (Steder[w].synlighet == 0) {
		
		Steder[w].synlighet = 1;
		}
		else {
			
			Steder[w].synlighet = 0;
		}
	}
	}
	myMap();
}
function PoengFunksjon(s) {
  for (var k = 0; k <= PoengSteder.length; k++) {
    if (k == PoengSteder.length && PoengSteder[k] !== s) {
      Poeng += 50;
      PoengSteder[PoengSteder.length] = s;
      return document.getElementById("poeng").innerHTML = "<p>Besøk steder og sank inn poeng.</p><p>Poeng: " + Poeng + ".</p>"
    } else if (PoengSteder[k] == s) {
      return;
    }
  }
}
function rabatt() {
	if (Poeng == 300) {
	  document.getElementById("poeng").innerHTML = "<p>Besøk steder og sank inn poeng.</p><p>Poeng: " + Poeng + ".</p><p>Gratulerer! Du har vunnet en kaffe på Strøm Mat & Bar.</p><p>Vis Strøm følgende kode: 123456.</p>";
	}
	else {
	}
}
