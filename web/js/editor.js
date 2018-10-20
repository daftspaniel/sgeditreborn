class Editor {
    constructor() {
        this.primary = localStorage.primaryChar ? localStorage.primaryChar : '8f'
        this.secondary = localStorage.secondaryChar ? localStorage.secondaryChar : '80'
        this.unit = 8
        this.mouseDown = false
    }

    initGUIState() {
        this.setPrimaryChar(this.primary)
        this.setSecondaryChar(this.secondary)
    }

    initMode(mode) {
        if (mode === 'sg4') {
            this.screen = new SG4Mode()
        }
        else if (mode === 'cocoVGA') {
            this.screen = new CocoVGAMode()
        }
        else {
            alert('error - mode request -' + mode)
            return
        }
        this.screen.init()
    }

    setChar(event, char) {
        if (event.button === 0) {
            this.setPrimaryChar(char)
        } else {
            this.setSecondaryChar(char)
        }
        return false
    }

    setPrimaryChar(char) {
        $('#primaryBlock').attr('src', getImg(char))
        localStorage.primaryChar = char
        this.primary = char
    }

    setSecondaryChar(char) {
        $('#secondaryBlock').attr('src', getImg(char))
        localStorage.secondaryChar = char
        this.secondary = char
    }

    actionOnBlock(pos, id, char) {
        $(id).css('background-image', getImgUrl(char))
        this.screen.set(pos[0], pos[1], char)
    }
}