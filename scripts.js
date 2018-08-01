var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');
var shabadContent = {};

function search() {
    var query = "SELECT ID, Gurmukhi FROM Verse WHERE FirstLetterEng like '%" + $('#search-text').val() + "%'" ;
    var response = "";
    db.each(query, function(err, row) {
        response += "<li class='list-group-item' onclick='showShabad(" + row.ID + ")'>" + row.Gurmukhi + "</li>";
    }, function() {
        $('#search-results').html(response);
    });
}

function showShabad(verseId) {
    var query = "SELECT ID, Gurmukhi, English, Punjabi FROM Verse WHERE ID IN ("
        + "SELECT VerseID FROM Shabad WHERE ShabadID = (SELECT ShabadID FROM Shabad WHERE VerseID = " + verseId + ") "
        + ")" ;
    var response = "";
    db.each(query, function(err, row) {
        shabadContent[row.ID] = row;
        if (verseId === row.ID) {
            $('#gurmukhi1').html(row.Gurmukhi);
            $('#english1').html(row.English);
            $('#punjabi1').html(row.Punjabi);
        } else if ((verseId+1) === row.ID) {
            $('#gurmukhi2').html(row.Gurmukhi);
            $('#english2').html(row.English);
            $('#punjabi2').html(row.Punjabi);
        }
        response += "<li class='list-group-item' onclick='showLine(" + row.ID + ")'>" + row.Gurmukhi + "</li>";
    }, function() {
        $('#shabad-results').html(response);
        $('#shabad-tab').tab('show');
    });
}

$('#search-text').keypress(function(e) {
    if(e.which == 13) {
        search();
    }
});