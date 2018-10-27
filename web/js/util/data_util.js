function buildGrid(gridWidth, gridHeight, defaultValue) {
    let data = new Array()


    for (var column = 0; column < gridWidth; column++) {
        data.push(new Array())
        for (var row = 0; row < gridHeight; row++) {
            data[column].push({
                x: column,
                y: row,
                value: defaultValue
            })
        }
    }
    return data
}

function hexToInt(dataval) {
    return parseInt(dataval, 16)
}

function intToHex(dataval) {
    return parseInt(dataval).toString(16)
}