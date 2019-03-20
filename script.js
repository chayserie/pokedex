let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
      let data = JSON.parse(xhttp.responseText);
      let ul = document.getElementById("pokeList");
        
      data.results.forEach(function (pokemon){
        ul.innerHTML+="<li class='list-group-item'><a href='#' onclick = 'view(\"" + pokemon.name +
         "\")' data-toggle = 'modal' class='text-decoration-none text-secondary'>"
        +pokemon.name+"</a></li>";
        
      });
      
      console.log(data);
    }
};
xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151", true);
xhttp.send();

var xhttpss = new XMLHttpRequest();
var eachPokemon;
xhttpss.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log("Getting Pokemon:")
        //parse the pokemon details
        eachPokemon = JSON.parse(xhttpss.responseText);

        //get the name of clicked pokemon
        document.getElementById("pokeTitle").innerHTML = eachPokemon.name;
        //declare the body element
        var pokeBody = document.getElementById("pokeBody");
        //declare the div for detail container
        var detailContainer = document.getElementById("detailContainer");
        //declare the ul
        var det = document.getElementById("detail");
        //get picture of each pokemon
        pokeBody.innerHTML = "<img src = "+eachPokemon.sprites.front_default+">";
        //append the container into body
        pokeBody.appendChild(detailContainer);
        //append the ul to container
        detailContainer.appendChild(det);
        //append abilities in container
        det.innerHTML ="<li class='list-group-item font-weight-bold'>Pokemon Information</li><li class='list-group-item'>id : "+
        eachPokemon.id+
        "</li><li class='list-group-item'> Height: "+ eachPokemon.height + "</li><li class='list-group-item'> Weight: "+
         eachPokemon.weight +"</li><li class='list-group-item font-weight-bold'>Abilities</li>";
       //loop each abilities
        eachPokemon.abilities.forEach(function(ab){
            det.innerHTML += "<li class='list-group-item'>"+ ab.ability.name +"</li>";   
        });
        det.innerHTML += "</li><li class='list-group-item font-weight-bold'>Types</li>";
        eachPokemon.types.forEach(function(type){
            det.innerHTML += "<li class='list-group-item'>"+ type.type.name +"</li>";   
        });    
        $("#details").modal("show");
    }
}

function view(pokemon){
    
   
    console.log("https://pokeapi.co/api/v2/pokemon/"+ pokemon +"");
    xhttpss.open("GET", "https://pokeapi.co/api/v2/pokemon/"+ pokemon +"", true);
    xhttpss.send();
}   