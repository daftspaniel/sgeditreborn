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
        console.log('Init - skipStorage: ', skipStorage)
        if (!skipStorage && localStorage.screenData) {
            console.log('LOADING SCREEN DATA')
            this.loadFromStorage()
        } else {
            console.log('BUILDING GRID')
            this.data = buildGrid(this.columns, this.rows, this.defaultValue)
            this.save()
        }
    }

    loadFromStorage() {
        console.log('Loading from storage')
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
        const noval = 60;	//hex
        let fullcode = '10 CLEAR2000:DIMT,A:CLS\r\n'
        fullcode += '20 FORT=1024TO1535:READA:POKET,A:NEXT\r\n'
        fullcode += '30 A$=INKEY$:IFA$="" THEN 30\r\n'

        let lineNo = 100
        let dataval

        for (var j = 0; j < this.rows; j++) {
            var dataline = "DATA" + String.fromCharCode(32)
            for (var i = 0; i < this.columns; i++) {
                dataval = parseInt(this.data[i][j].value, 16)
                dataline += dataval + ","
            }
            dataline = lineNo + ' ' + dataline.substr(0, dataline.length - 1) + String.fromCharCode(13)

            fullcode += dataline
            lineNo += 10
        }
        var progend = "\r\n"
        return fullcode + progend
    }


    export_assembly() {
        const noval = 60;	//hex
        let fcbval, charval, line
        let fullASMCode = "        ORG $4E21\r\n" +
            "        PSHS X,Y,U,A,B\r\n" +
            "        \r\n" +
            "        LDX #$400\r\n" +
            "        LDY #TSB\r\n" +
            "        \r\n" +
            "DRAW    LDD ,Y++\r\n" +
            "        STD ,X++\r\n" +
            "        CMPX #$600\r\n" +
            "        BNE DRAW\r\n" +
            "        \r\n" +
            "EXIT    PULS X,Y,U,A,B\r\n" +
            "        RTS ; EXIT PROGRAM\r\n\r\nTSB    "
        let data = ''
        for (let j = 0; j < this.rows; j++) {
            line = String.fromCharCode(9) + "FCB    "
            for (let i = 0; i < this.columns; i++) {
                fcbval = '$' + this.data[i][j].value + ','
                line += fcbval
            }
            fullASMCode += line.substr(0, line.length - 1) + "\r\n"
        }
        return fullASMCode.substring(0)
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

    scrollUp() {
        let tmp = []
        for (let i = 0; i < this.columns; i++) {
            tmp.push(this.data[i][0].value)
        }

        for (let j = 0; j < this.rows - 1; j++) {
            for (let i = 0; i < this.columns; i++) {
                this.data[i][j].value = this.data[i][j + 1].value
            }
        }

        for (let i = 0; i < this.columns; i++) {
            this.data[i][15].value = tmp[i]
        }

        this.save()
    }

    scrollDown() {
        let tmp = []
        for (let i = 0; i < this.columns; i++) {
            tmp.push(this.data[i][15].value)
        }

        for (let j = this.rows - 1; j > 0; j--) {
            for (let i = 0; i < this.columns; i++) {
                this.data[i][j].value = this.data[i][j - 1].value
            }
        }

        for (let i = 0; i < this.columns; i++) {
            this.data[i][0].value = tmp[i]
        }

        this.save()
    }

    scrollLeft() {
        for (let j = 0; j < this.rows; j++) {
            let tmp = this.data[0][j].value
            for (let i = 1; i < this.columns; i++) {
                this.data[i - 1][j].value = this.data[i][j].value
            }
            this.data[31][j].value = tmp
        }
        this.save()
    }

    scrollRight() {
        for (let j = 0; j < this.rows; j++) {
            let tmp = this.data[this.columns - 1][j].value
            for (let i = this.columns - 1; i > 0; i--) {
                this.data[i][j].value = this.data[i - 1][j].value
            }
            this.data[0][j].value = tmp
        }
        this.save()
    }

    mirrorLtoR() {
        const midPoint = this.columns / 2
        const endPoint = this.columns - 1

        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < midPoint; i++) {
                this.data[endPoint - i][j].value = this.data[i][j].value
            }
        }
        this.save()
    }
    
    mirrorRtoL() {
        const midPoint = this.columns / 2
        const endPoint = this.columns - 1

        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < midPoint; i++) {
                this.data[i][j].value = this.data[endPoint - i][j].value
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
        this.defaultUnit = 20
    }
}

class SG24Mode extends Mode {
    constructor() {
        super()
        this.columns = 64
        this.rows = 192
        this.defaultValue = '00'
        this.customCellHeight = 1
    }
}

class CocoVGAMode extends Mode {
    constructor() {
        super()
        this.columns = 64
        this.rows = 32
    }
}
