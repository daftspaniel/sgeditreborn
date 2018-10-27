// Semi-graphics 24 - Element size 64 x 192
// 6144 bytes - 8 colours - Black border

class Mode {
    constructor() {
        this.columns = 10
        this.rows = 10
        this.defaultUnit = 8

        this.export_csv = this.export_csv.bind(this)
    }

    init() {
        if (localStorage.screenData) {
            this.data = JSON.parse(localStorage.screenData)
        }
        else
            this.data = buildGrid(this.columns, this.rows)
    }

    set(x, y, value) {
        this.data[x][y].value = value
        localStorage.screenData = JSON.stringify(this.data)
    }

    export_csv() {
        let csv = ''
        for (let j = 0; j < this.rows; j++) {
            let dataline = '';
            for (let i = 0; i < this.columns; i++) {
                dataline += hexToInt(this.data[i][j].value) + ","
            }
            csv += dataline + '\n';
        }
        return csv
    }

    reset_data(value) {
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.columns; i++) {
                this.data[i][j].value = value
            }
        }
        localStorage.screenData = JSON.stringify(this.data)
    }

}

class SG4Mode extends Mode {
    constructor() {
        super()
        this.columns = 32
        this.rows = 16
    }
}

class SG24Mode extends Mode {
    constructor() {
        super()
        this.columns = 64
        this.rows = 192
    }
}

class CocoVGAMode extends Mode {
    constructor() {
        super()
        this.columns = 64
        this.rows = 32
    }
}
