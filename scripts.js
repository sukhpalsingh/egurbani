var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');
var shabadContent;
var homeLine = 1;
var currentLine = 1;

function search() {
    var query = "SELECT ID, Gurmukhi FROM Verse WHERE FirstLetterEng like '%" + $('#search-text').val() + "%'" ;
    var response = "";
    db.each(query, function(err, row) {
        response += "<li class='list-group-item amber lighten-4' onclick='showShabad(" + row.ID + ")'>" + row.Gurmukhi + "</li>";
    }, function() {
        $('#search-results').html(response);
    });
}

function showShabad(verseId) {
    shabadContent = [];
    var query = "SELECT ID, Gurmukhi, English, Punjabi FROM Verse WHERE ID IN ("
        + "SELECT VerseID FROM Shabad WHERE ShabadID = (SELECT ShabadID FROM Shabad WHERE VerseID = " + verseId + ") "
        + ")" ;
    var response = "";
    var line = 1;
    var count = 0;
    db.each(query, function(err, row) {
        if (shabadContent.hasOwnProperty(line) !== true) {
            shabadContent[line] = [];
        }

        shabadContent[line][count] = row;
        if (verseId === row.ID) {
            homeLine = line;
        }
        response += "<li class='list-group-item amber lighten-4' onclick='showLine(" + line + ")'>" + row.Gurmukhi + "</li>";
        count++;

        if (row.Gurmukhi.indexOf("]1]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]2]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]3]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]4]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]5]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]6]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]7]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]8]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]9]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]10]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]11]") > 0) {
            line++;
            count = 0;
        } else if (row.Gurmukhi.indexOf("]12]") > 0) {
            line++;
            count = 0;
        }
    }, function() {
        currentLine = homeLine;
        showLine(homeLine);
        $('#shabad-results').html(response);
        $('#shabad-tab').tab('show');
    });
}

function showLine(line) {
    var content = {'gurmukhi' : '', 'punjabi' : '', 'english' : ''};
    for(var i = 0; i < shabadContent[line].length; i++) {
        content['gurmukhi'] += shabadContent[line][i].Gurmukhi + '<br />';
        content['punjabi'] += shabadContent[line][i].Punjabi + ' ';
        content['english'] += shabadContent[line][i].English + ' ';
    }

    $('#gurmukhi').css('font-size', settings.gurmukhiFontSize + 'px');
    $('#punjabi').css('font-size', settings.punjabiFontSize + 'px');
    $('#english').css('font-size', settings.englishFontSize + 'px');
    $('#gurmukhi').html(content['gurmukhi']);
    $('#punjabi').html(content['punjabi']);
    $('#english').html(content['english']);
    $('#gurmukhi').autoSizr();
    $('#punjabi').autoSizr();
    $('#english').autoSizr();
}

$('#search-text').keypress(function(e) {
    if(e.which == 13) {
        search();
    }
});

var shabad = {
    goToHome: function() {
        currentLine = homeLine;
        showLine(homeLine);
    },
    nextLine: function() {
        if (currentLine === shabadContent.length) {
            return;
        }
        showLine(++currentLine);
    },
    prevLine: function() {
        if (currentLine === 1) {
            return;
        }
        showLine(--currentLine);
    }
};

var settings = {
    updateFontSizes: function() {
        $('.gurmukhi').css('font-size', $('#gurmukhi-font-size').val() + 'px');
        $('.punjabi').css('font-size', $('#punjabi-font-size').val() + 'px');
        $('.english').css('font-size', $('#english-font-size').val() + 'px');
    },
    gurmukhiFontSize: 67,
    punjabiFontSize: 45,
    englishFontSize: 35
};

$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        shabad.prevLine();
        break;

        case 38: // up
        show.goToHome();
        break;

        case 39: // right
        shabad.nextLine();
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }

    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$.fn.autoSizr = function () {
    var el, elements, _i, _len, _results;
    elements = $(this);
    if (elements.length < 0) {
      return;
    }
    _results = [];
    for (_i = 0, _len = elements.length; _i < _len; _i++) {
      el = elements[_i];
      _results.push((function(el) {
        var resizeText, _results1;
        resizeText = function() {
          var elNewFontSize;
          elNewFontSize = (parseInt($(el).css('font-size').slice(0, -2)) - 1) + 'px';
          return $(el).css('font-size', elNewFontSize);
        };
        _results1 = [];
        while (el.scrollHeight > el.offsetHeight) {
          _results1.push(resizeText());
        }
        return _results1;
      })(el));
    }
    return $(this); 
};

function resizeFields() {
    var totalHeight = $(window).height();
    var fieldHeight = Math.floor(totalHeight / 3);
    $('#gurmukhi').css('height', fieldHeight + 'px');
    $('#punjabi').css('height', fieldHeight + 'px');
    $('#english').css('height', fieldHeight + 'px');
}

resizeFields();
