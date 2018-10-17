// Semi-graphics 24 - Element size 64 x 192
// 6144 bytes - 8 colours - Black border

class Mode {
    constructor() {
        this.columns = 10
        this.rows = 10
    }

    init() {
        this.data = buildGrid(this.columns, this.rows)
    }

    set(x, y, value) {
        this.data[x][y].value = value
        localStorage.screenData = JSON.stringify(this.data)
    }

}

class SG24Mode {
    constructor() {
        this.columns = 64
        this.rows = 192
    }

    init() {
        this.data = buildGrid(this.columns, this.rows)

        if (localStorage.screenData) {
            this.data = localStorage.screenData
        }
    }

    set(x, y, value) {
        this.data[x][y].value = value
        localStorage.screenData = JSON.stringify(this.data)
    }
}
class SG4Mode {
    constructor() {
        this.columns = 32
        this.rows = 16
    }

    init() {
        this.data = buildGrid(this.columns, this.rows)

        if (localStorage.screenData) {
            this.data = JSON.parse(localStorage.screenData)
        }
    }

    set(x, y, value) {
        this.data[x][y].value = value
        localStorage.screenData = JSON.stringify(this.data)
    }
}

class CocoVGAMode {
    constructor() {
        this.columns = 64
        this.rows = 32
    }

    init() {
        this.data = buildGrid(this.columns, this.rows)
        if (localStorage.screenData) {
            this.data = localStorage.screenData
        }
    }

    set(x, y, value) {
        this.data[x][y].value = value
        localStorage.screenData = JSON.stringify(this.data)
    }
}

let screenData = new CocoVGAMode()
screenData.init()