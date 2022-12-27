if (aussentemp >=-30) {     //if 1 
    if (aussentemp <-10) {  // if 2
 
       Shelly.call(
       "temperature.getstatus",
       { 
       id: 100,
       },
       
       function (result, error_code, error_message) {
       let temp =(result.tC);
       print ("Vorlauftemperatur ="+JSON.stringify(temp)+ " Grad C"); 
       MQTT.publish(TRVTemp,JSON.stringify(temp));  //Vorlauftemperatur in TRV Ext_t schreiben         
     
      
          Shelly.call(
          "http.get",
          { url: "http://192.168.178.99/thermostats/0" },
          function (response, error_code, error_message) {
          //console.log(JSON.stringify(response))
          let body = JSON.parse(response.body);  
          let VLtemp=(body.tmp.value);  //Vorlauftemperatur aus TRV ExtT auslesen
          print("VLTemp =  "+JSON.stringify(VLtemp));
          let vpos=(body.pos);
          print("Ventilposition alt = "+JSON.stringify(vpos)); //Ventilposition auslesen
          
          
          if (20 < VLtemp) {  //Solltemperatur mit Vorlauftemperatur vergleichen 
          let diff=-1; // Ventilstellungsdifferenz
          print ("Ventildifferenz  ="+JSON.stringify(diff));
          let posnew = (vpos+diff);                   
          MQTT.publish(TRVpos,JSON.stringify(posnew)); //Ventilposition senden
          print ("Ventilposition neu  = "+JSON.stringify(posnew)); // jg, 27.12.2022: Ein Plus hat hier gefehlt
          let vpos = posnew;
          }
          else
          {
                           
          let diff=1;
          print (diff);
          let posnew = (vpos+diff);                   
          MQTT.publish(TRVpos,JSON.stringify(posnew)); //Ventilposition senden
          print (posnew);
          let vpos = posnew;
                           
          }
                                   
          } //function Ende
                          
          ); //shelly call Ende 
       
     
     
      } //function Ende
       
      ); //shelly call Ende  

       
        //print("temp1 =  "+JSON.stringify(temp));                      
        //print("VLTemp1 =  "+JSON.stringify(VLtemp));                
        //print("Ventilposition1 alt = "+JSON.stringify(vpos));   
       
}  //if2 Ende
}  //if1 Ende
