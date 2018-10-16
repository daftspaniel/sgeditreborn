// Semi-graphics 24 - Element size 64 x 192
// 6144 bytes - 8 colours - Black border
const columns = 64
const rows = 192

class SG24Mode {
    constructor() {
        this.columns = 64
        this.rows = 192
    }

    init() {
        this.data = buildGrid(64, 192)
    }
}

class CocoVGAMode {
    constructor() {
        this.columns = 64
        this.rows = 32
    }

    init() {
        this.data = buildGrid(64, 32)
    }
}


let screenData = new CocoVGAMode()
screenData.init()