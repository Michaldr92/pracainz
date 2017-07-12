	$(document).ready(function() {

	    GetArduinoIO();
		
		$(".monitoring").click(function() {
	        $("#myModal").modal();
	    });
		
	    var myVar = setInterval(myTimer, 1000);
		var myTime = setInterval(setTemp, 3000);

	    function myTimer() {
	        var d = new Date();
	        document.getElementById("czas").innerHTML = d.toLocaleTimeString() + " - " + d.toLocaleDateString();
	    }

		function setTemp() {
			var tempOut = Math.floor((Math.random() * (40 - 1)) + 1);
			document.getElementById("odczyt_tempzewn").innerHTML = tempOut;
			
			var tempIn = Math.floor((Math.random() * (35 - 10)) + 10);
			document.getElementById("odczyt_tempwewn").innerHTML = tempIn;
			
			var huma = Math.floor((Math.random() * (70 - 40)) + 40);
			document.getElementById("odczyt_wilgotnosc").innerHTML = huma;	

			smoke = Math.floor((Math.random() * (400 - 1)) + 1);
			document.getElementById("odczyt_dymu").innerHTML = smoke;		

			var co = Math.floor((Math.random() * (200 - 1)) + 1);
			document.getElementById("odczyt_co").innerHTML = co;				
		}


	});

	strLED_pokoj1 = "";
	var LED_pokoj1_state = 0;

	strLED_pokoj2 = "";
	var LED_pokoj2_state = 0;

	strLED_kuchnia = "";
	var LED_kuchnia_state = 0;

	strLED_lazienka = "";
	var LED_lazienka_state = 0;

	strLED_garaz = "";
	var LED_garaz_state = 0;

	strLED_salon = "";
	var LED_salon_state = 0;

	strLED_zewnatrz1 = "";
	var LED_zewnatrz1_state = 0;

	strLED_zewnatrz2 = "";
	var LED_zewnatrz2_state = 0;

	//-----

	strALARM_dom = "";
	var ALARM_house_state = 0;

	strALARM_fire = "";
	var ALARM_fire_state = 0;

	//------

	strGATE_main = "";
	var GATE_main_state = 0;

	strGATE_garage = "";
	var GATE_garage_state = 0;

	strGATE_roleta = "";
	var GATE_roleta_state = 0;

	//------

	strAIR_manual = "";
	var Air_manual_state = 0;

	strAIR_auto = "";
	var Air_auto_state = 0;

	//-------


	function GetArduinoIO() {
	    nocache = "&nocache=" + Math.random() * 1000000;
	    var request = new XMLHttpRequest();
	    request.onreadystatechange = function() {
	        if (this.readyState == 4) {
	            if (this.status == 200) {
	                if (this.responseXML != null) {
	                    // XML - odpowiedź zwrotna

	                    var count_door;
	                    var num_ad = this.responseXML.getElementsByTagName('drzwi').length;

	                    for (count_door = 0; count_door < num_ad; count_door++) {
	                        //-------------------------DRZWI-------------------------//
	                        if (this.responseXML.getElementsByTagName('drzwi')[count_door].childNodes[0].nodeValue === "ON") {
	                            $($(".doors").get(count_door)).css('background', '#72bf48');
	                        } else {
	                            $($(".doors").get(count_door)).css('background', '#FB6648');
	                        }
	                    }

	                    var count_alarmH;
	                    var num_alh = this.responseXML.getElementsByTagName('alarm_domowy').length;
	                    for (count_alarmH = 0; count_alarmH < num_alh; count_alarmH++) {
	                        //-------------------------ALARM_DOMOWY-------------------------//
	                        if (this.responseXML.getElementsByTagName('alarm_domowy')[count_alarmH].childNodes[0].nodeValue === "ON") {
	                            $($(".czujkapir").get(count_alarmH)).css('background', 'yellow');

	                        } else {
	                            $($(".czujkapir").get(count_alarmH)).css('background', 'gray');
	                        }
	                    }

	                    document.getElementById("odczyt_dymu").innerHTML =
	                        this.responseXML.getElementsByTagName('dym')[0].childNodes[0].nodeValue;
	                    data_val = this.responseXML.getElementsByTagName('dym')[0].childNodes[0].nodeValue;

	                    if (data_val > 250) {
	                        $('.czujkadymu').css('background', 'yellow');
	                        sweetAlert({
	                                title: "Wykryto Pożar!",
	                                text: "Pożar w pomieszczeniu Kuchnia został wykryty, zawiadomić straż pożarną?",
	                                type: "warning",
	                                showCancelButton: true,
	                                confirmButtonColor: "#DD6B55",
	                                confirmButtonText: "Tak, zawiadom straż pożarną!",
	                                cancelButtonText: "Nie zawiadamiaj straży pożarnej!",
	                                closeOnConfirm: false,
	                                closeOnCancel: false
	                            },
	                            function(isConfirm) {
	                                if (isConfirm) {
	                                    sweetAlert("Powiadomiono!", "Straż pożarna została powiadomiona!", "success");
	                                } else {
	                                    sweetAlert("Nie powiadomiono!", "Straż pożarna nie została powiadomiona", "error");
	                                }
	                            });
	                    } else {
	                        $('.czujkadymu').css('background', 'gray');
	                    }

	                    document.getElementById("odczyt_wilgotnosc").innerHTML =
	                        this.responseXML.getElementsByTagName('wilgotnosc')[0].childNodes[0].nodeValue;

	                    document.getElementById("odczyt_tempzewn").innerHTML =
	                        this.responseXML.getElementsByTagName('temp_zewn')[0].childNodes[0].nodeValue;
	                    odczytTempZewn = this.responseXML.getElementsByTagName('temp_zewn')[0].childNodes[0].nodeValue;

	                    document.getElementById("odczyt_tempwewn").innerHTML =
	                        this.responseXML.getElementsByTagName('temp_wewn')[0].childNodes[0].nodeValue;
	                    odczytTempWewn = this.responseXML.getElementsByTagName('temp_wewn')[0].childNodes[0].nodeValue;

	                    document.getElementById("odczyt_co").innerHTML =
	                        this.responseXML.getElementsByTagName('co_odczyt')[0].childNodes[0].nodeValue;


	                    //---------------------OŚWIETLENIE---------------------//
	                    // LED Pokój-1
	                    if (this.responseXML.getElementsByTagName('LED')[0].childNodes[0].nodeValue === "on") {
	                        LED_pokoj1_state = 1;
	                    } else {
	                        LED_pokoj1_state = 0;
	                    }

	                    // LED Pokój-2
	                    if (this.responseXML.getElementsByTagName('LED')[1].childNodes[0].nodeValue === "on") {
	                        LED_pokoj2_state = 1;
	                    } else {
	                        LED_pokoj2_state = 0;
	                    }

	                    // LED Kuchnia
	                    if (this.responseXML.getElementsByTagName('LED')[2].childNodes[0].nodeValue === "on") {
	                        LED_kuchnia_state = 1;
	                    } else {
	                        LED_kuchnia_state = 0;
	                    }

	                    // LED Łazienka
	                    if (this.responseXML.getElementsByTagName('LED')[3].childNodes[0].nodeValue === "on") {
	                        LED_lazienka_state = 1;
	                    } else {
	                        LED_lazienka_state = 0;
	                    }

	                    // LED Garaż
	                    if (this.responseXML.getElementsByTagName('LED')[4].childNodes[0].nodeValue === "on") {
	                        LED_garaz_state = 1;
	                    } else {
	                        LED_garaz_state = 0;
	                    }

	                    // LED Przedpokój
	                    if (this.responseXML.getElementsByTagName('LED')[5].childNodes[0].nodeValue === "on") {
	                        LED_salon_state = 1;
	                    } else {
	                        LED_salon_state = 0;
	                    }

	                    // LED Na zewnątrz1
	                    if (this.responseXML.getElementsByTagName('LED')[6].childNodes[0].nodeValue === "on") {
	                        LED_zewnatrz1_state = 1;
	                    } else {
	                        LED_zewnatrz1_state = 0;
	                    }

	                    // LED Na zewnątrz2
	                    if (this.responseXML.getElementsByTagName('LED')[7].childNodes[0].nodeValue === "on") {
	                        LED_zewnatrz2_state = 1;
	                    } else {
	                        LED_zewnatrz2_state = 0;
	                    }
	                    //------
	                    if (this.responseXML.getElementsByTagName('ALARM_DOMOWY')[0].childNodes[0].nodeValue === "ON") {
	                        ALARM_house_state = 1;
	                    } else {
	                        ALARM_house_state = 0;
	                    }
	                    //------
	                    if (this.responseXML.getElementsByTagName('ALARM_POZAROWY')[0].childNodes[0].nodeValue === "ON") {
	                        ALARM_fire_state = 1;
	                    } else {
	                        ALARM_fire_state = 0;
	                    }
	                    //------
	                    if (this.responseXML.getElementsByTagName('GATES')[0].childNodes[0].nodeValue === "on") {
	                        GATE_main_state = 1;
	                        $(".pirMainGate").css('background', 'yellow');
	                    } else {
	                        GATE_main_state = 0;
	                        $(".pirMainGate").css('background', 'gray');
	                    }
	                    //------
	                    if (this.responseXML.getElementsByTagName('GATES')[1].childNodes[0].nodeValue === "on") {
	                        GATE_garage_state = 1;
	                        $(".pirGarageGate").css('background', 'yellow');
	                    } else {
	                        GATE_garage_state = 0;
	                        $(".pirGarageGate").css('background', 'gray');
	                    }

	                    if (this.responseXML.getElementsByTagName('GATES')[2].childNodes[0].nodeValue === "on") {
	                        GATE_roleta_state = 1;
	                    } else {
	                        GATE_roleta_state = 0;
	                    }

	                    if (this.responseXML.getElementsByTagName('klima_manual')[0].childNodes[0].nodeValue === "on") {
	                        Air_manual_state = 1;
	                    } else {
	                        Air_manual_state = 0;
	                    }

	                    if (this.responseXML.getElementsByTagName('klima_auto')[0].childNodes[0].nodeValue === "on") {
	                        Air_auto_state = 1;
	                    } else {
	                        Air_auto_state = 0;
	                    }

	                }
	            }
	        }
	    }
	    // send HTTP GET request with LEDs to switch on/off if any
	    request.open("GET", "ajax_inputs" + strLED_pokoj1 + strLED_pokoj2 + strLED_lazienka + strLED_kuchnia + strLED_garaz +
	        strLED_salon + strLED_zewnatrz1 + strLED_zewnatrz2 + strALARM_dom + strALARM_fire + strGATE_main + strGATE_garage + strGATE_roleta +
	        strAIR_auto + strAIR_manual + nocache, true);
	    request.send(null);
	    setTimeout('GetArduinoIO()', 1000);

	    strLED_pokoj1 = "";
	    strLED_pokoj2 = "";
	    strLED_lazienka = "";
	    strLED_kuchnia = "";
	    strLED_garaz = "";
	    strLED_salon = "";
	    strLED_zewnatrz1 = "";
	    strLED_zewnatrz2 = "";
	    strALARM_dom = "";
	    strALARM_fire = "";
	    strGATE_main = "";
	    strGATE_garage = "";
	    strGATE_roleta = "";
	    strAIR_manual = "";
	    strAIR_auto = "";
	}

	function LedPokoj1() {
	    if (LED_pokoj1_state == 1) {
	        LED_pokoj1_state = 0;
	        document.getElementById('room1_light').src = 'http://www.mdrop.pl/inz/images/bulb.png';
	        $('.pokoj1').css('background', '#989898');
	        strLED_pokoj1 = "&LED1=0";

	    } else {
	        LED_pokoj1_state = 1;
	        document.getElementById('room1_light').src = 'http://www.mdrop.pl/inz/images/bulb_on.png';
	        $('.pokoj1').css('background', '#FA6900');
	        strLED_pokoj1 = "&LED1=1";
	    }
	}

	function LedPokoj2() {
	    if (LED_pokoj2_state == 1) {
	        LED_pokoj2_state = 0;
	        document.getElementById('room2_light').src = 'http://www.mdrop.pl/inz/images/bulb.png';
	        $('.pokoj2').css('background', '#989898');
	        strLED_pokoj2 = "&LED2=0";
	    } else {
	        LED_pokoj2_state = 1;
	        document.getElementById('room2_light').src = 'http://www.mdrop.pl/inz/images/bulb_on.png';
	        $('.pokoj2').css('background', '#FA6900');
	        strLED_pokoj2 = "&LED2=1";
	    }
	}

	function LedKuchnia() {
	    if (LED_kuchnia_state == 1) {
	        LED_kuchnia_state = 0;
	        document.getElementById('kitchen_light').src = 'http://www.mdrop.pl/inz/images/bulb.png';
	        $('.kuchnia').css('background', '#989898');
	        strLED_kuchnia = "&LED3=0";
	    } else {
	        LED_kuchnia_state = 1;
	        document.getElementById('kitchen_light').src = 'http://www.mdrop.pl/inz/images/bulb_on.png';
	        $('.kuchnia').css('background', '#FA6900');
	        strLED_kuchnia = "&LED3=1";
	    }
	}

	function LedLazienka() {
	    if (LED_lazienka_state == 1) {
	        LED_lazienka_state = 0;
	        document.getElementById('bathroom_light').src = 'http://www.mdrop.pl/inz/images/bulb.png';
	        $('.lazienka').css('background', '#989898');
	        strLED_lazienka = "&LED4=0";
	    } else {
	        LED_lazienka_state = 1;
	        document.getElementById('bathroom_light').src = 'http://www.mdrop.pl/inz/images/bulb_on.png';
	        $('.lazienka').css('background', '#FA6900');
	        strLED_lazienka = "&LED4=1";
	    }
	}

	function LedGaraz() {
	    if (LED_garaz_state == 1) {
	        LED_garaz_state = 0;
	        document.getElementById('garage_light').src = 'http://www.mdrop.pl/inz/images/bulb.png';
			$('.garaz').css('background', '#989898');
	        strLED_garaz = "&LED5=0";
	    } else {
	        LED_garaz_state = 1;
	        document.getElementById('garage_light').src = 'http://www.mdrop.pl/inz/images/bulb_on.png';
			$('.garaz').css('background', '#FA6900');
	        strLED_garaz = "&LED5=1";
	    }
	}

	function Ledsalon() {
	    if (LED_salon_state == 1) {
	        LED_salon_state = 0;
	        document.getElementById('salon_light').src = 'http://www.mdrop.pl/inz/images/bulb.png';
			$('.salon').css('background', '#989898');			
	        strLED_salon = "&LED6=0";
	    } else {
	        LED_salon_state = 1;
	        document.getElementById('salon_light').src = 'http://www.mdrop.pl/inz/images/bulb_on.png';
			$('.salon').css('background', '#FA6900');			
	        strLED_salon = "&LED6=1";
	    }
	}

	function LedZewnatrz1() {
	    if (LED_zewnatrz1_state == 1) {
	        LED_zewnatrz1_state = 0;
	        document.getElementById('outside1_light').src = 'http://www.mdrop.pl/inz/images/bulb.png';
	        $('.zewnatrz1').css('background', '#989898');			
	        strLED_zewnatrz1 = "&LED7=0";
	    } else {
	        LED_zewnatrz1_state = 1;
	        document.getElementById('outside1_light').src = 'http://www.mdrop.pl/inz/images/bulb_on.png';
	        $('.zewnatrz1').css('background', '#FA6900');				
	        strLED_zewnatrz1 = "&LED7=1";
	    }
	}

	function LedZewnatrz2() {
	    if (LED_zewnatrz2_state == 1) {
	        LED_zewnatrz2_state = 0;
	        document.getElementById('outside2_light').src = 'http://www.mdrop.pl/inz/images/bulb.png';
	        $('.zewnatrz2').css('background', '#989898');				
	        strLED_zewnatrz2 = "&LED8=0";
	    } else {
	        LED_zewnatrz2_state = 1;
	        document.getElementById('outside2_light').src = 'http://www.mdrop.pl/inz/images/bulb_on.png';
	        $('.zewnatrz2').css('background', '#FA6900');			
	        strLED_zewnatrz2 = "&LED8=1";
	    }
	}

	//--------------------------------------------------		

	function AlarmHouse() {
	    if (ALARM_house_state == 1) {
	        var pin = prompt("Podaj kod 4-znakowy, żeby wyłączyć alarm(1234): ", "");

	        if (pin == 1234) {
	            $('.alarmdom').css('background', '#72bf48');
	            $('.alarmdom').click(function() {
	                $('p#ahouse').text('Włącz')
	            })
	            ALARM_house_state = 0;
	            if (ALARM_house_state == 0) {
	                sweetAlert("Alarm", "Dezaktywowano", "error");
	            }
	            strALARM_dom = "&ALARM1=0";
	        } else {
	            sweetAlert("Alarm", "Zły PIN! Spróbuj Ponownie!", "warning");
	        }

	    } else {
	        var pin = prompt("Podaj kod 4-znakowy, żeby włączyć alarm(1234): ", "");
	        if (pin == 1234) {
	            $('.alarmdom').css('background', '#FF432E');
	            $('.alarmdom').click(function() {
	                $('p#ahouse').text('Wyłącz')
	            });
	            ALARM_house_state = 1;
	            if (ALARM_house_state == 1) {
	                sweetAlert("Alarm", "Aktywowano", "success");
	            }
	            strALARM_dom = "&ALARM1=1";
	        } else {
	            //alert("Zły kod PIN! Spróbuj Ponownie!");
	            sweetAlert("Alarm", "Zły PIN! Spróbuj Ponownie!", "warning");
	        }
	    }
	}

	function AlarmFire() {
	    if (ALARM_fire_state == 1) {
	        ALARM_fire_state = 0;
	        $('.alarmpozar').css('background', '#72bf48');
	        $('.alarmpozar').click(function() {
	            $('p#fire').text('Włącz')
	        });
	        strALARM_fire = "&ALARM2=0";
	        if (ALARM_fire_state == 0) {
	            sweetAlert("Alarm Pożarowy", "Wyłączony", "error");
	        }
	    } else {
	        ALARM_fire_state = 1;
	        $('.alarmpozar').css('background', '#FF432E');
	        $('.alarmpozar').click(function() {
	            $('p#fire').text('Wyłącz')
	        });		
	        strALARM_fire = "&ALARM2=1";
	        if (ALARM_fire_state == 1) {				
				 sweetAlert({
	                title: "Wykryto Pożar!",
	                text: "Pożar w pomieszczeniu Kuchnia został wykryty, zawiadomić straż pożarną?",
	                type: "warning",
	                showCancelButton: true,
	                confirmButtonColor: "#DD6B55",
	                confirmButtonText: "Tak, zawiadom straż pożarną!",
	                cancelButtonText: "Nie zawiadamiaj straży pożarnej!",
	                closeOnConfirm: false,
	                closeOnCancel: false
	            },
	            function(isConfirm) {
	                if (isConfirm) {
	                    sweetAlert("Powiadomiono!", "Straż pożarna została powiadomiona!", "success");
	                } else {
	                    sweetAlert("Nie powiadomiono!", "Straż pożarna nie została powiadomiona", "error");
	                }
	             });
	        }
	    }
	}

	//--------------------------------------------------
	
	function GateMain() {
	    if (GATE_main_state == 1) {
	        GATE_main_state = 0;
	        strGATE_main = "&MGATE=0";
	        if (GATE_main_state == 0) {
	            sweetAlert("Brama", "Zamknięta", "error");
	        }
	        $('.gatemain').css('background', '#72bf48');
	        $('.gatemain').click(function() {
	            $('p#gmain').text('Otwórz');
	        });
	    } else {
	        GATE_main_state = 1;
	        strGATE_main = "&MGATE=1";
	        if (GATE_main_state == 1) {
	            sweetAlert("Brama", "Otwarta", "success");
	        }
	        $('.gatemain').css('background', '#FF432E');
	        $('.gatemain').click(function() {
	            $('p#gmain').text('Zamknij');
	        });
	    }
	}

	function GateGarage() {
	    if (GATE_garage_state == 1) {
	        GATE_garage_state = 0;
	        strGATE_garage = "&GGATE=0";
	        if (GATE_garage_state == 0) {
	            sweetAlert("Brama", "Zamknięta", "error");
	        }
	        $('.gategarage').css('background', '#72bf48');
	        $('.gategarage').click(function() {
	            $('p#ggarage').text('Otwórz');
	        });
	    } else {
	        GATE_garage_state = 1;
	        strGATE_garage = "&GGATE=1";
	        if (GATE_garage_state == 1) {
	            sweetAlert("Brama", "Otwarta", "success");
	        }
	        $('.gategarage').css('background', '#FF432E');
	        $('.gategarage').click(function() {
	            $('p#ggarage').text('Zamknij');
	        });
	    }
	}

	function GateRoleta() {
	    if (GATE_roleta_state == 1) {
	        GATE_roleta_state = 0;
	        strGATE_roleta = "&ROLETA=0";
	        $('.roleta').css('background', '#72bf48');
	        if (GATE_roleta_state == 0) {
	            sweetAlert("Roleta", "Zamknięta", "warning");
	        }
	    } else {
	        GATE_roleta_state = 1;
	        strGATE_roleta = "&ROLETA=1";
	        $('.roleta').css('background', '#FF432E');
	        if (GATE_roleta_state == 1) {
	            sweetAlert("Roleta", "Otwarta", "success");
	        }
	    }
	}

	function AirManual() {
	    if (Air_manual_state == 1) {
	        Air_manual_state = 0;
	        $('.klima_m').css('background', '#72bf48');
	        $('.klima_m').click(function() {
	            $('p#manual').text('Włącz')
	        });
	        strAIR_manual = "&AirManual=0";
	        if (Air_manual_state == 0) {
	            sweetAlert("Klimatyzacja - tryb manualny", "Wyłączona", "warning");
	        }
	        $('.stan_klimatyzacji').css('background', 'gray');
	        $('p#stan_chlodzenie').text('...');
	    } else {
	        Air_manual_state = 1;
	        $('.klima_m').css('background', '#FF432E');
	        $('.klima_m').click(function() {
	            $('p#manual').text('Wyłącz')
	        });
	        strAIR_manual = "&AirManual=1";
	        if (Air_manual_state == 1) {
	            sweetAlert("Klimatyzacja - tryb manualny", "Włączona", "success");
	        }
	        $('.stan_klimatyzacji').css('background', '#28ABE3');
	        $('p#stan_chlodzenie').text('Chłodzenie');
	    }
	}

	function AirAuto() {
	    if (Air_auto_state == 1) {
	        Air_auto_state = 0;
	        $('.klima_a').css('background', '#72bf48');
	        $('.klima_a').click(function() {
	            $('p#auto').text('Włącz')
	        });
	        strAIR_auto = "&AirAuto=0";
	        if (Air_auto_state == 0) {
	            sweetAlert("Klimatyzacja - tryb automatyczny", "Wyłączona", "warning");
	        }
	        $('.stan_klimatyzacji').css('background', 'gray');
	        $('p#stan_chlodzenie').text('...');
	    } else {
	        Air_auto_state = 1;
	        $('.klima_a').css('background', '#FF432E');
	        $('.klima_a').click(function() {
	            $('p#auto').text('Wyłącz')
	        });
	        strAIR_auto = "&AirAuto=1";
	        if (Air_auto_state == 1) {
	            sweetAlert("Klimatyzacja - tryb automatyczny", "Włączona", "success");
	        }
	        $('.stan_klimatyzacji').css('background', '#28ABE3');
	        $('p#stan_chlodzenie').text('Chłodzenie');
	    }
	}