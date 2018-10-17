function reset() {
    container = document.getElementById('grid')
    container.innerHTML = ''
}

function draw(container, width, height) {
    container = document.getElementById('grid')
    container.innerHTML = ''

    width = screenData.columns
    height = screenData.rows

    let rowDiv = null
    let newDiv = null

    for (let j = 0; j < height; j++) {
        rowDiv = document.createElement("div")
        rowDiv.classList.add('row')
        rowDiv.style.height = '16px'

        for (let i = 0; i < width; i++) {
            newDiv = document.createElement("div")
            newDiv.classList.add('cell')

            newDiv.style.backgroundColor = '#ffffff'
            newDiv.style.backgroundImage = 'url("grafix/60.jpg")'
            newDiv.style.display = 'inline-block'
            newDiv.style.height = '16px'
            newDiv.style.width = '8px'

            newDiv.innerHtml = '&nbsp;'
            newDiv.id = i + '-' + j
            newDiv.addEventListener('click', (event) => {
                state.actionOnBlock([i, j], '#' + i + '-' + j)
            })
            newDiv.title = '[' + (i) + ',' + (j) + ']'
            rowDiv.append(newDiv)
        }
        container.append(rowDiv)
    }
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
    $('.row').css('height', '64px')
    $('.cell').css('width', '32px')
    $('.cell').css('height', '64px')
}

function zoomOut() {
    $('.row').css('height', '32px')
    $('.cell').css('width', '16px')
    $('.cell').css('height', '32px')
}