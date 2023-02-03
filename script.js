var hero=document.getElementById('search');
var button=document.getElementById('search-button');
var image=document.getElementById('super-image');
var named=document.getElementById('super-name');
var bio=document.getElementById('biography');
var search=document.getElementById('search');
var search_result = document.querySelector('.search-result')
var g_search = document.getElementById("g_seach");

let matching_results = [];
let matching_results_containers = [];

function select_result(elem) {
    search.value = elem.id;
    // console.log(elem.id);

    fetch(`https://www.superheroapi.com/api.php/3179832135614819/search/${elem.id}`)
    .then(response => response.json())
    .then(json => Caller(json));

    
    search_result.style.display = "none";
    g_search.style.height = "0px";
}


button.onclick = () =>{
    // console.log(hero.value);

    fetch(`https://www.superheroapi.com/api.php/3179832135614819/search/${hero.value}`)
    .then(response=>response.json())    
    .then(json => Caller(json))
    .catch(named.innerHTML=`<p>Doesn't work on NSUT network.</p><p>Shift to personal Hotspot</p>`,
            bio.innerHTML=``,
            image.innerHTML=``,
            image.innerHTML=``
          )
   
}

function add_elem(supe_name, img_url) {
    _div = document.createElement('div');
    _div.setAttribute('class', 'n_search');
    _div.setAttribute('id', supe_name);
    _div.setAttribute('onclick', 'select_result(this)');
    
    _img = document.createElement('img');
    _img.setAttribute('src', img_url);
    _div.appendChild(_img);
    
    _span = document.createElement('span');
    _span.innerHTML = supe_name;
    _div.appendChild(_span);

    search_result.appendChild(_div);
    matching_results_containers.push(_div);
}

async function show_result(incp_str) {
    // console.log(incp_str);
    if (incp_str == "") {
        search_result.style.display = "none";
        g_search.style.height = "0px"
    } else {
        if (incp_str.length == 1) {
            matching_results = sups_names.filter((data) => {
                return data.toLocaleLowerCase().startsWith(incp_str.toLocaleLowerCase());
            });
        } else {
            _data = await (await fetch(`https://www.superheroapi.com/api.php/3179832135614819/search/${incp_str}`)).json();
            matching_results = _data.results;
        }

        for (i in matching_results_containers)
            matching_results_containers[i].remove();

        for (result in matching_results) {
            add_elem(matching_results[result].name, matching_results[result].image.url);
        }


        g_search.style.height = "200px";
        search_result.style.display = "block";

    }
}

search.onkeyup = (e) => {
    show_result(hero.value);
    // console.log(hero.value);
    if(e.key=='Enter'){
        console.log(hero.value);

        fetch(`https://www.superheroapi.com/api.php/3179832135614819/search/${hero.value}`)
        .then(response=>response.json())
        .then(json => Caller(json));
        search_result.style.display = "none";
        g_search.style.height = "0px";
       
    }
}



function Caller(json_id){
    
    if(json_id.response=='error'){
        named.innerHTML=`<p>Supe Not found</p>`;
        console.log(json_id);
        bio.innerHTML=``;
        image.innerHTML=``;
        image.innerHTML=``;
        return;
    }
    
    Image(json_id.results[0].id);
    Biography(json_id);
    
    // console.log(json_id);

}


function Image(image_id){
    fetch(`https://www.superheroapi.com/api.php/3179832135614819/${image_id}/image`)
    .then( response => response.json())
    .then(json => {
        console.log(json) 
        console.log(json.url);
        image.innerHTML=` <img src="${json.url}" alt=""/>`
        named.innerHTML=`<p>${json.name}</p>`
    })
}

function Biography(json_id){
    // let fullname=json_id.full-name;
    console.log(json_id['full-name']);



    bio.innerHTML=`
                <div id="bio-left">
                    <p class="Left">Full Name:</p>
                    <p class="Left">Place of Birth:</p>
                    <p class="Left">First Appearance:</p>
                    <p class="Left">Publisher:</p>
                    <p class="Left">Alignment:</p>
                    <p class="Left">Occupation:</p>
                    <p class="Left">Gender:</p>
                    <p class="Left">Race:</p>
                    
                    <p class="Left">Eye Color:</p>
                    <p class="Left">Hair Color:</p>
                </div>

                <div id="bio-right">
                        <p class="right">${json_id.results[0].biography['full-name']}</p>
                        <p class="right">${json_id.results[0].biography['place-of-birth']}</p>
                        <p class="right">${json_id.results[0].biography['first-appearance']}</p>
                        <p class="right">${json_id.results[0].biography['publisher']}</p>
                        <p class="right">${json_id.results[0].biography['alignment']}</p>
                        <p class="right">${json_id.results[0].work['occupation']}</p>
                        <p class="right">${json_id.results[0].appearance['gender']}</p>
                        <p class="right">${json_id.results[0].appearance['race']}</p>
                      
                        <p class="right">${json_id.results[0].appearance['eye-color']}</p>
                        <p class="right">${json_id.results[0].appearance['hair-color']}</p>
                </div>
    `
    // names.innerHTML=`<p>${json_id['full-name']}</p>`

}




