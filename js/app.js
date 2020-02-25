let ourStates = document.querySelectorAll('path');

fetch('js/states.json')
.then(response => {
   return response.json();
})
.then(data => {   
   for (let count = 0; count < ourStates.length; count++) {
      $('#facts').hide();
     

      $(ourStates[count]).mouseover(function () {
         $('#facts').show();   
         document.getElementById('state').innerHTML = data[count].states;   
         document.getElementById('capital').innerHTML = data[count].capital;
         document.getElementById('slogan').innerHTML = data[count].slogan;
         document.getElementById('write-up').innerHTML = data[count].facts;
      });
      $(ourStates[count]).mouseout(function () {
            $('#facts').hide(); 
      });
   }
})


