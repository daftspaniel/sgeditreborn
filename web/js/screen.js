// Semi-graphics 24 - Element size 64 x 192
// 6144 bytes - 8 colours - Black border

class SG24Mode {
    constructor() {
        this.columns = 64
        this.rows = 192
    }

    init() {
        this.data = buildGrid(this.columns, this.rows)
    }
}

class CocoVGAMode {
    constructor() {
        this.columns = 64
        this.rows = 32
    }

    init() {
        this.data = buildGrid(this.columns, this.rows)
    }
}

let screenData = new CocoVGAMode()
screenData.init()