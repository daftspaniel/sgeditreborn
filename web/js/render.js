function reset() {
    container = document.getElementById('grid')
    container.innerHTML = ''
}

function main(state) {
    container = document.getElementById('grid')
    container.innerHTML = ''

    let screen = state.screen
    console.log('SCREEN', screen)
    let width = screen.columns
    let height = screen.rows
    let cellWidth = state.unit + 'px'
    let cellHeight = state.unit * 1.5 + 'px'
    let rowDiv = null
    let newDiv = null

    for (let j = 0; j < height; j++) {
        rowDiv = document.createElement("div")
        rowDiv.classList.add('row')
        rowDiv.style.height = cellHeight

        for (let i = 0; i < width; i++) {
            newDiv = document.createElement("div")
            newDiv.classList.add('cell')
            newDiv.style.backgroundColor = '#ffffff'

            if (screen.data && screen.data[i][j].value)
                newDiv.style.backgroundImage = 'url("grafix/' + screen.data[i][j].value + '.jpg")'
            else
                newDiv.style.backgroundImage = 'url("grafix/60.jpg")'

            newDiv.style.backgroundSize = state.unit + 'px ' + (state.unit * 1.5) + 'px'
            console.log(newDiv.style.backgroundSize)
            newDiv.style.backgroundRepeat= 'no-repeat'

            newDiv.style.display = 'inline-block'
            newDiv.style.height = cellHeight
            newDiv.style.width = cellWidth

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
