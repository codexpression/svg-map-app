// This is the file for loading the state, LGAs and Projects
const fetchState = (stateTitle) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    var raw = JSON.stringify({"project":"CDD ECONOMIC SEEFOR_FINAL","state":stateTitle.toUpperCase()});
 
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
        //    document.querySelector('#lga li').className = 'active-lga';
           li.innerHTML += lga;
        });
        document.querySelectorAll('#lga li').forEach((lga)=>{
            let listItems = document.querySelectorAll('#lga li');
            lga.addEventListener('click', e=>{
                    document.querySelectorAll('#lga li').forEach(lga => {
                        lga.classList.remove('active-lga');
                    })
                e.target.classList.add('active-lga');
                document.querySelector('#playground').innerHTML = `<div id="pieChart13" style="height: 70vh; width:70vw; -webkit-tap-highlight-color: transparent; user-select: none; position: relative; background: transparent;color:white;" _echarts_instance_="ec_1582761989307"><div style="position: relative; overflow: hidden; width: 1029px; height: 700px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;color: #fff;"><canvas width="1029" height="700" data-zr-dom-id="zr_0" style="position: absolute; left: 0px; top: 0px; width: 1029px; height: 700px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div style="position: absolute; display: none; border-style: solid; white-space: nowrap; z-index: 9999999; transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s; background-color: rgba(50, 50, 50, 0.7); border-width: 0px; border-color: rgb(51, 51, 51); border-radius: 4px; color: rgb(255, 255, 255); font: 14px / 21px Poppins; padding: 5px; left: 786px; top: 371px;"></div></div>`
                lgaTitle = e.target.innerHTML;
                document.querySelector('#sub').innerHTML = '';
                fetchProject();
                if (e.target.className == 'active-lga') {                 
                    renderPieChart();
                }
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
            li.innerHTML = sub;
            // console.log(li)
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

document.getElementById('state-dropdown').addEventListener('change', fixDropDown);

function fixDropDown() {
    document.querySelector('#lga').innerHTML = ''
    fetchState(this.options[this.selectedIndex].text);
}