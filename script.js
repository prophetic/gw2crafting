var xmlhttp = new XMLHttpRequest();
var url = "https://api.guildwars2.com/v2/items/28445";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myFunction(xmlhttp.responseText);
    }
}
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(response) {
    var obj = JSON.parse(response);
    var out = obj.name;

    document.getElementById("body").innerHTML = out;
}
