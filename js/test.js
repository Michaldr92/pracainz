$( document ).ready(function() {
	
	GetArduinoIO();
	
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
		
		strLED_przedpokoj = "";
		var LED_przedpokoj_state = 0;
		
		strLED_zewnatrz1 = "";
		var LED_zewnatrz1_state = 0;
		
		strLED_zewnatrz2 = "";
		var LED_zewnatrz2_state = 0;
		
		//-----
		
		strALARM_house = "";
		var ALARM_house_state = 0;
		
		strALARM_house_active = "";
		var ALARM_active = 0;
		
		strAlarm_fire = "";
		var ALARM_fire_state = 0;
		
		//------
		
		strGATE_main = "";
		var GATE_main_state = 0;
		
		strGATE_garage = "";
		var GATE_garage_state = 0;
		
		
		
		function GetArduinoIO()
		{
			nocache = "&nocache=" + Math.random() * 1000000;
			var request = new XMLHttpRequest();
			request.onreadystatechange = function()
			{
				if (this.readyState == 4) {
					if (this.status == 200) {
						if (this.responseXML != null) {
							// XML file received - contains analog values, switch values and LED states

							//-----------------------------------------------------------------
							// LED 3
							if (this.responseXML.getElementsByTagName('LED')[2].childNodes[0].nodeValue === "on") {
								alert(test)
								//document.getElementsByClassName(".menu-item").css('background-color', '#000000');
								document.getElementById("LED4").css('background', '#FA6900');
								LED_pokoj1_state = 1;
							}
							else {
								//document.getElementsByClassName(".menu-item").css('background-color', '#111111');//innerHTML = "LED 3 is OFF (D8)";
								$('.menu-item').css('background', '#FA6900');
								LED_pokoj1_state = 0;
							}

						}
					}
				}
			}
			// send HTTP GET request with LEDs to switch on/off if any
			request.open("GET", "ajax_inputs" + strLED_pokoj1 + strLED_pokoj2 + strLED_lazienka + strLED_kuchnia + strLED_garaz +
			strLED_przedpokoj + strLED_zewnatrz1 + strLED_zewnatrz2 + strGATE_main +  strGATE_garage + nocache, true);
			request.send(null);
			setTimeout('GetArduinoIO()', 1000);
			
			strLED_pokoj1 = "";
			strLED_pokoj2 = "";
			strLED_lazienka = "";
			strLED_kuchnia = "";
			strLED_garaz = "";
			strLED_przedpokoj = "";
			strLED_zewnatrz1 = "";
			strLED_zewnatrz2 = "";
			strGATE_main = "";
			strGATE_garage = "";
		}
		// service LEDs when checkbox checked/unchecked

		function LedPokoj1()
		{
			if (LED_pokoj1_state === 1) {
				LED_pokoj1_state = 0;
				strLED_pokoj1 = "&LED1=0";
				$('.pokoj1').css('background', '#989898');	
					
				//alert(LED_pokoj1_state);
			}
			else {
				LED_pokoj1_state = 1;
				strLED_pokoj1 = "&LED1=1";
				$('.pokoj1').css('background', '#FA6900');
				//alert(LED_pokoj1_state);
			}
		}

		function LedPokoj2()
		{
			if (LED_pokoj2_state === 1) {
				LED_pokoj2_state = 0;
				strLED_pokoj2 = "&LED2=0";
				$('.pokoj2').css('background', '#989898');	
					
				//alert(LED_pokoj1_state);
			}
			else {
				LED_pokoj2_state = 1;
				strLED_pokoj2 = "&LED2=1";
				$('.pokoj2').css('background', '#FA6900');
				//alert(LED_pokoj1_state);
			}
		}	

		function LedKuchnia()
		{
			if (LED_kuchnia_state === 1) {
				LED_kuchnia_state = 0;
				strLED_kuchnia = "&LED3=0";
				$('.kuchnia').css('background', '#989898');	
					
				//alert(LED_pokoj1_state);
			}
			else {
				LED_kuchnia_state = 1;
				strLED_kuchnia = "&LED3=1";
				$('.kuchnia').css('background', '#FA6900');
				//alert(LED_pokoj1_state);
			}
		}	

		function LedLazienka()
		{
			if (LED_lazienka_state === 1) {
				LED_lazienka_state = 0;
				strLED_lazienka = "&LED4=0";
				$('.lazienka').css('background', '#989898');	
					
				//alert(LED_pokoj1_state);
			}
			else {
				LED_lazienka_state = 1;
				strLED_lazienka = "&LED4=1";
				$('.lazienka').css('background', '#FA6900');
				//alert(LED_pokoj1_state);
			}
		}	
	
		function LedGaraz()
		{
			if (LED_garaz_state === 1) {
				LED_garaz_state = 0;
				strLED_garaz = "&LED5=0";
				$('.garaz').css('background', '#989898');	
					
				//alert(LED_pokoj1_state);
			}
			else {
				LED_garaz_state = 1;
				strLED_garaz = "&LED5=1";
				$('.garaz').css('background', '#FA6900');
				//alert(LED_pokoj1_state);
			}
		}	

		function LedPrzedpokoj()
		{
			if (LED_przedpokoj_state === 1) {
				LED_przedpokoj_state = 0;
				strLED_przedpokoj = "&LED6=0";
				$('.przedpokoj').css('background', '#989898');	
					
				//alert(LED_pokoj1_state);
			}
			else {
				LED_przedpokoj_state = 1;
				strLED_przedpokoj = "&LED6=1";
				$('.przedpokoj').css('background', '#FA6900');
				//alert(LED_pokoj1_state);
			}
		}	

		function LedZewnatrz1()
		{
			if (LED_zewnatrz1_state === 1) {
				LED_zewnatrz1_state = 0;
				strLED_zewnatrz1 = "&LED7=0";
				$('.zewnatrz1').css('background', '#989898');	
					
				//alert(LED_pokoj1_state);
			}
			else {
				LED_zewnatrz1_state = 1;
				strLED_zewnatrz1 = "&LED7=1";
				$('.zewnatrz1').css('background', '#FA6900');
				//alert(LED_pokoj1_state);
			}
		}	

		function LedZewnatrz2()
		{
			if (LED_zewnatrz2_state === 1) {
				LED_zewnatrz2_state = 0;
				strLED_zewnatrz2 = "&LED8=0";
				$('.zewnatrz2').css('background', '#989898');	
					
				//alert(LED_pokoj1_state);
			}
			else {
				LED_zewnatrz2_state = 1;
				strLED_zewnatrz2 = "&LED8=1";
				$('.zewnatrz2').css('background', '#FA6900');
				//alert(LED_pokoj1_state);
			}
		}	

//--------------------------------------------------		

		function AlarmFire()
		{
			if (ALARM_fire_state === 1) {
				ALARM_fire_state = 0;
				strAlarm_fire = "&LED3=0";
				$('.alarmpozar').css('background', '#72bf48');	
					$('.alarmpozar').click(function(){
						$('p#fire').text('Włącz')
					})	
				//alert(ALARM_fire_state);
			}
			else {
				ALARM_fire_state = 1;
				strAlarm_fire = "&LED3=1";
				$('.alarmpozar').css('background', '#FF432E');
					$('.alarmpozar').click(function(){
						$('p#fire').text('Wyłącz')
					})
				//alert(ALARM_fire_state);
			}
		}	
		
		function AlarmHouse()
		{
			if (ALARM_house_state === 1) {
				
				var pin = prompt("Podaj kod 4-znakowy, żeby wyłączyć alarm: ", "");
					if (pin == 1234) {
						$('.alarmdom').css('background', '#72bf48');	
							$('.alarmdom').click(function(){
								$('p#ahouse').text('Włącz')	
							})
						ALARM_house_state = 0;
						strALARM_house = "&LED3=0";							
					}
					else {
						alert("Zły kod PIN! Spróbuj Ponownie!")
					}

			}
			else {
				
				var pin = prompt("Podaj kod 4-znakowy, żeby włączyć alarm: ", "");
					if (pin == 1234) {
						$('.alarmdom').css('background', '#FF432E');
							$('.alarmdom').click(function(){
								$('p#ahouse').text('Wyłącz')
							})	
						ALARM_house_state = 1;
						strALARM_house = "&LED3=1";
					}
					else {
						alert("Zły kod PIN! Spróbuj Ponownie!")
					}

			}
		}	
		
		//--------------------------------------------------		

		function GateMain()
		{
			if (GATE_main_state === 1) {
				GATE_main_state = 0;
				strGATE_main = "&LED3=0";
				$('.gatemain').css('background', '#72bf48');	
					$('.gatemain').click(function(){
						$('p#gmain').text('Otwórz')
					})	
				//alert(ALARM_fire_state);
			}
			else {
				GATE_main_state = 1;
				strGATE_main = "&LED3=1";
				$('.gatemain').css('background', '#FF432E');
					$('.gatemain').click(function(){
						$('p#gmain').text('Zamknij')
					})
				//alert(ALARM_fire_state);
			}
		}	
		
		function GateGarage()
		{
			if (GATE_garage_state === 1) {
				GATE_garage_state = 0;
				strGATE_garage = "&LED3=0";
				$('.gategarage').css('background', '#72bf48');	
					$('.gategarage').click(function(){
						$('p#ggarage').text('Otwórz')
					})	
				//alert(LED_pokoj1_state);
			}
			else {
				GATE_garage_state = 1;
				strGATE_garage = "&LED3=1";
				$('.gategarage').css('background', '#FF432E');
					$('.gategarage').click(function(){
						$('p#ggarage').text('Zamknij')
					})	
				//alert(LED_pokoj1_state);
			}
		}	