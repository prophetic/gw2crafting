$( "#crafting" ).change(function() {
    $("#main").empty();
    $("#main").append( "<ul id='level1' class='list'></ul>" );  
    $("#level1").append("<l1 id='mainlist'>"+this[this.selectedIndex].text+"</l1>" );
    buildList(this.value,'mainlist');
});

function itemCall(itemID,callback) {
    var xmlhttp = new XMLHttpRequest();
    var url ="https://api.guildwars2.com/v2/items/"+itemID;
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var obj = JSON.parse(xmlhttp.responseText);
        var out = obj.name;
        callback(out);
    }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send(null);
}

function recipeSearch(itemID,callback) {
    var xmlhttp = new XMLHttpRequest();
    var url ="https://api.guildwars2.com/v2/recipes/search?output="+itemID;
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var obj = JSON.parse(xmlhttp.responseText);
        var out = obj;
        callback(out);
    }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send(null);
}

function recipeCall(itemID,callback) {
    var xmlhttp = new XMLHttpRequest();
    var url ="https://api.guildwars2.com/v2/recipes/"+itemID;
    xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var obj = JSON.parse(xmlhttp.responseText);
        var out = obj.ingredients;
        callback(out);
    }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send(null);
}

function buildList(itemID,clist) {
   recipeSearch(itemID,function(name) {
        recipeCall(name,function(ingredients) {
            var aList = $('<ul/>');
            aList.addClass("list");
            $.each(ingredients, function(i) {
                var li = $('<li/>')
                .addClass('craft-item')
                .attr('level', clist)
                .attr('itemID',this.item_id)
                .appendTo(aList);
                
                var val = $('<a/>')
                .text(this.count + " ")
                .appendTo(li);
                
                itemCall(this.item_id, function(name) {
                    var val = $('<a/>')
                    .text(name)
                    .appendTo(li);
                    li.attr('name',name);
                    li.attr('id',clist + name.toLowerCase().trim().replace(/[^a-z0-9]+/gi,'-'));
                });
            });
            aList.appendTo($("#"+clist));
            $('li[level="'+clist+'"]').each(function(i) {
                buildList($(this).attr("itemID"),$(this).attr("id"));
            });
        });
    });
}
