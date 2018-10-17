
function buildGrid(gridWidth, gridHeight) {
    let data = new Array()

    for (var row = 0; row < gridHeight; row++) {
        data.push(new Array())

        for (var column = 0; column < gridWidth; column++) {
            data[row].push({
                x: column,
                y: row,
                value: null
            })
        }
    }
    return data
}