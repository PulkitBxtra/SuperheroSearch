var hero=document.getElementById('search');
var button=document.getElementById('search-button');
var image=document.getElementById('super-image');
var named=document.getElementById('super-name');
var bio=document.getElementById('biography');
var search=document.getElementById('search');



button.onclick = () =>{
    console.log(hero.value);

    fetch(`https://superheroapi.com/api.php/3179832135614819/search/${hero.value}`)
    .then(response=>response.json())
    .then(json => Caller(json))
    .catch(named.innerHTML=`<p>Doesn't work on NSUT network.</p><p>Shift to personal Hotspot</p>`;
            bio.innerHTML=``;
            image.innerHTML=``;
            image.innerHTML=``;
          )
   
}

search.addEventListener('keypress',(event) =>{
    // console.log(event.key);
    if(event.key=='Enter'){
        console.log(hero.value);

        fetch(`https://superheroapi.com/api.php/3179832135614819/search/${hero.value}`)
        .then(response=>response.json())
        .then(json => Caller(json))
       
    }
});



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
    fetch(`https://superheroapi.com/api.php/3179832135614819/${image_id}/image`)
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





