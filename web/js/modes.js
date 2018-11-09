// Semi-graphics 24 - Element size 64 x 192
// 6144 bytes - 8 colours - Black border

class Mode {
    constructor() {
        this.columns = 10
        this.rows = 10
        this.defaultUnit = 8
        this.defaultValue = '0'
        this.export_csv = this.export_csv.bind(this)
    }

    init(skipStorage) {
        if (!skipStorage && localStorage.screenData) {
            console.log('LOADING SCREEN DATA')
            this.data = JSON.parse(localStorage.screenData)
        }
        else {
            console.log('BUILDING GRID')
            this.data = buildGrid(this.columns, this.rows, this.defaultValue)
        }
    }

    loadFromStorage(){
        this.data = JSON.parse(localStorage.screenData)
    }

    set(x, y, value) {
        this.data[x][y].value = value
        this.save()
    }

    save() {
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


    export_basic() {
        return 'BASIC!'
    }


    export_assembly() {
       return 'ASSEMBLY!'
    }

    import_csv(csvdata) {
        let index = 0
        let newdata = csvdata.replace('\r\n', '').replace('\n', '').replace('\r', '')
        newdata = newdata.split(',')

        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.columns; i++) {
                this.data[i][j].value = intToHex(newdata[index])
                index++
            }
        }
        this.save()
    }

    reset_data(value) {
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.columns; i++) {
                this.data[i][j].value = value
            }
        }
        this.save()
    }

    set_testcard() {
        let char = 0
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.columns; i++) {
                this.data[i][j].value = intToHex(char)
                char++
                if (char > 255) char = 0
            }
        }
        this.save()
    }

}

class SG4Mode extends Mode {
    constructor() {
        super()
        this.columns = 32
        this.rows = 16
        this.defaultValue = '8f'
    }
}

class SG24Mode extends Mode {
    constructor() {
        super()
        this.columns = 64
        this.rows = 192
        this.defaultValue = '00'
    }
}

class CocoVGAMode extends Mode {
    constructor() {
        super()
        this.columns = 64
        this.rows = 32
    }
}
