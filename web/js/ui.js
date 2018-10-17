function constructColours() {
     $("#sgsel").html(buildCharTable(128, 144))
}

function constructCharset() {
     $("#charsel").html(buildCharTable(0, 16))
}

function buildCharTable(startIndex, endIndex){
    let tableHtml = "<TABLE height=480 cellpadding=1 cellspacing=0 style='border:none'>";
    for (var i = startIndex; i < endIndex; i++) {
        tableHtml += "<TR>"

        for (var j = 0; j < 8; j++) {
            var char = (i + (j * 16)).toString(16)
            tableHtml += "<TD style='cursor:pointer'><IMG id=\"" + char + "\" oncontextmenu=\"return false\" onmousedown=\"state.setChar(event,'" + char + "');return false\" title='chr(" + (i + (j * 16)) + "/#$" + char + ")' src='grafix/" + char + ".jpg' border=1></TD>";
        }
        tableHtml += "</TR>"
    }
    tableHtml += "</TABLE>"
    return tableHtml
}