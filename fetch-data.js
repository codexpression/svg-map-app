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
 
 fetch("https://64.227.114.69/lga_list", requestOptions)
 .then(response => response.json()).then(data => {
    console.log(data.response.content.LGAs)
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

const fetchProject = () =>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"project":"PUBLIC WORKS SEEFOR_FINAL"});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://64.227.114.69/project_column_list", requestOptions)
      .then(response => response.text())
      .then(result => {
          console.log(result);
          data.response.content.LGAs.forEach(sub => {
            let li = document.createElement('li');
            document.querySelector('#sub').appendChild(li);
            document.querySelector('#sub li').className = 'active-sub';
            li.innerHTML += sub;
         });
        })
      .catch(error => console.log('error', error));
}

// Handle clicks below this line

let allNgStates = document.querySelectorAll('path');
allNgStates.forEach(state => {
    state.addEventListener('click', (e) => {
       fetchState(e.target.getAttribute('title').toLowerCase());
    })
})
