const fetchState = (stateTitle) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    var raw = JSON.stringify({"project":"CDD ECONOMIC SEEFOR_FINAL","state":stateTitle});
 
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
 
 fetch("https://data4gov.pythonanywhere.com/lga_list", requestOptions)
 .then(response => response.json()).then(data => {
    // console.log(data.response.content.LGAs)
       document.getElementById('info-block').style.display = 'block'; 
       data.response.content.LGAs.forEach(lga => {
           let li = document.createElement('li');
           document.querySelector('#lga').appendChild(li);
           document.querySelector('#lga li').className = 'active-lga';
           li.innerHTML += lga;
        });
        document.querySelectorAll('#lga li').forEach((lga)=>{
            lga.addEventListener('click', e=>{
                // console.log('clicked');
                // console.log(e.target.innerHTML)
                lgaTitle = e.target.innerHTML;
                fetchProject();
            })
        })
        
    })
}

const fetchProject = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"project":"CDD ECONOMIC SEEFOR_FINAL"});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://data4gov.pythonanywhere.com/project_column_list", requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result);
          result.response.content.LGAs.forEach(sub => {
            let li = document.createElement('li');
            document.querySelector('#sub').appendChild(li);
            document.querySelector('#sub li').className = 'active-sub';
            li.innerHTML += sub;
            console.log(li)
         });
        })
      .catch(error => console.log('error', error));
}
fetchProject()
// Handle clicks below this line

let allNgStates = document.querySelectorAll('path');
allNgStates.forEach(state => {
    state.addEventListener('click', (e) => {
        // alert(e.target.getAttribute('title'))
       fetchState(e.target.getAttribute('title').toLowerCase());
       var val = e.target.getAttribute('title');

    //    alert(val);
       var sel = document.getElementById('state-dropdown');
       console.dir(sel.value =val)
       var opts = sel.options;
        
    })
})

