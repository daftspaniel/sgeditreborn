function constructColours() {
    $("#sgsel").html(buildCharTable(128, 144))
}

function constructCharset() {
    $("#charsel").html(buildCharTable(0, 16))
}

function buildCharTable(startIndex, endIndex) {
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


function showGrid() {
    $('.cell').css('border', '1px solid #111111')
    $('.cell').css('margin', '0px')
    $('.row').css('margin', '0px')
}

function hideGrid() {
    $('.cell').css('border', '')
    $('.cell').css('margin', '')
    $('.row').css('margin', '')
}

function zoomIn() {
    state.unit += 2
    updateZoom()
}

function  updateZoom() {
    if (state.unit === 0){state.unit = 2}else if(state.unit >20) {state.unit=20}
    $('.row').css('height', state.unit * 1.5 + 'px')
    $('.cell').css('width', state.unit + 'px')
    $('.cell').css('height', state.unit * 1.5 + 'px')
    $('.cell').css('background-size', state.unit + 'px ' + (state.unit * 1.5) + 'px')
}
function zoomOut() {
    state.unit -= 2
    updateZoom()
}