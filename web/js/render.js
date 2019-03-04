function reset() {
    container = getById('grid')
    container.innerHTML = ''
}

function updateEditorWithData() {
    console.log('Update Editor With Data')
    let screen = state.screen
    let width = screen.columns
    let height = screen.rows
    let value = null
    for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
            $('#' + i + '-' + j).css('backgroundImage', 'url("grafix/' + screen.data[i][j].value + '.jpg")')
        }
    }
}

function initContainer() {
    container = getById('grid')
    container.innerHTML = ''
    container.draggable = false
}

function initMainWin() {
    mainWin = getById('main')
    if (mainWin) {
        mainWin.scrollTop = 0
        mainWin.scrollLeft = 0
    } else {
        console.log('Cannot find mainWin.')
    }
}

function main(state) {
    initContainer()
    initMainWin()
    const backgroundSize = state.unit + 'px ' + (state.unit * 1.5) + 'px'
    const screen = state.screen
    const width = screen.columns
    const height = screen.rows
    const cellWidth = state.unit + 'px'
    const cellHeight = state.unit * 1.5 + 'px'
    let rowDiv = null
    let newDiv = null

    for (let j = 0; j < height; j++) {
        rowDiv = document.createElement("div")
        rowDiv.classList.add('row')
        rowDiv.style.height = cellHeight
        rowDiv.draggable = false

        for (let i = 0; i < width; i++) {
            newDiv = document.createElement("div")
            newDiv.classList.add('cell')
            newDiv.id = i + '-' + j
            newDiv.title = '[' + (i) + ',' + (j) + ']'
            newDiv.draggable = false
            newDiv.addEventListener('ondragstart', (event) => {
                return false
            })

            if (screen.data && screen.data[i][j].value)
                newDiv.style.backgroundImage = 'url("grafix/' + screen.data[i][j].value + '.jpg")'
            else
                newDiv.style.backgroundImage = 'url("grafix/60.jpg")'

            newDiv.style.backgroundSize = backgroundSize
            newDiv.style.height = cellHeight
            newDiv.style.width = cellWidth

            newDiv.addEventListener('mousedown', (event) => {
                state.actingBlock = event.button === 0 ? state.primary : state.secondary
                state.actionOnBlock([i, j], '#' + i + '-' + j, state.actingBlock)
                state.mouseDown = true
                //console.log('Mouse Down TRUE')
                return false
            })

            newDiv.addEventListener('mouseenter', (event) => {
                //console.log('ENTERING')
                if (state.mouseDown)
                    state.actionOnBlock([i, j], '#' + i + '-' + j, state.actingBlock)
                return false
            })

            newDiv.addEventListener('mouseup', (event) => {
                state.mouseDown = false
                //console.log('Mouse Down FALSE')
                return false
            })
            newDiv.addEventListener('contextmenu', event => event.preventDefault())

            rowDiv.append(newDiv)
        }
        container.append(rowDiv)
    }
}
