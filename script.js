$( "#crafting" ).change(function() {
    $("#box1").append( "<h2>"+this[this.selectedIndex].text+"</h2>" );
    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.guildwars2.com/v2/recipes/search?output="+this.value;
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myFunction(xmlhttp.responseText);
    }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send(null);
});

function myFunction(response) {
    var obj = JSON.parse(response);
    var xmlhttp = new XMLHttpRequest();
    var url = "https://api.guildwars2.com/v2/recipes/"+obj;
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        recipeFunction(xmlhttp.responseText);
    }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send(null);
}

function recipeFunction(response) {
    var obj = JSON.parse(response);
    var out = obj.ingredients;
    $("#box1").append("<p>"+out+"</p>");
}
