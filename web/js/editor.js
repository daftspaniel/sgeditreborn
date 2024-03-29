class Editor {
    constructor() {
        this.primary = localStorage.primaryChar ? localStorage.primaryChar : '8f'
        this.secondary = localStorage.secondaryChar ? localStorage.secondaryChar : '80'
        this.mouseDown = false
        this.brushSize = 1
    }

    initGUIState() {
        this.setPrimaryChar(this.primary)
        this.setSecondaryChar(this.secondary)
    }

    initMode(mode, cls) {
        console.log('Init Mode', mode)
        if (!mode) {
            mode = localStorage.mode ? localStorage.mode : 'sg4'
        }
        else {
            localStorage.mode = mode
        }

        console.log('Setting up mode :', mode)

        if (mode === 'sg4') {
            this.screen = new SG4Mode()
            this.unit = localStorage.unit ? parseInt(localStorage.unit) : this.screen.defaultUnit
        }
        else if (mode === 'sg24') {
            this.screen = new SG24Mode()
        }
        else if (mode === 'cocoVGA') {
            this.screen = new CocoVGAMode()
        }
        else {
            alert('error - mode request -' + mode)
            return
        }
        this.screen.init(cls)
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

        if (this.brushSize == 2) {
            this.screen.set(pos[0] + 1, pos[1] + 1, char)
            $('#' + (pos[0]+1) + '-' + (pos[1]+1)).css('background-image', getImgUrl(char))

            this.screen.set(pos[0], pos[1] + 1, char)
            $('#' + pos[0] + '-' + (pos[1]+1)).css('background-image', getImgUrl(char))
            
            this.screen.set(pos[0] + 1, pos[1], char)
            $('#' + (pos[0]+1) + '-' + pos[1]).css('background-image', getImgUrl(char))
        }
    }
}