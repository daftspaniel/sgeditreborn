class Editor {
    constructor() {
        this.primary = localStorage.primaryChar ? localStorage.primaryChar : '8f'
        this.secondary = localStorage.secondaryChar ? localStorage.secondaryChar : '80'
        this.unit = 8
    }

    update() {
        this.setPrimaryChar(this.primary)
        this.setSecondaryChar(this.secondary)
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
        $('#primaryBlock').attr('src', 'grafix/' + char + '.jpg')
        localStorage.primaryChar = char
        this.primary = char
    }

    setSecondaryChar(char) {
        $('#secondaryBlock').attr('src', 'grafix/' + char + '.jpg')
        localStorage.secondaryChar = char
        this.secondary = char        
    }

    actionOnBlock(pos, id) {
        $(id).css('background-image' ,'url("grafix/' + this.primary + '.jpg")')
        this.screen.set(pos[0],pos[1],this.primary)
    }
}