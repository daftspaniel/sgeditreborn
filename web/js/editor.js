class Editor {
    constructor() {
        this.primary = '8f'
        this.secondary = '80'
    }

    update() {
        this.setPrimaryChar(this.primary)
        this.setSecondaryChar(this.secondary)
    }

    setChar(event, char) {
        console.log(event, char)
        if (event.button === 0) {
            this.setPrimaryChar(char)
        } else {
            this.setSecondaryChar(char)
        }
        return false
    }

    setPrimaryChar(char) {
        $('#primaryBlock').attr('src', 'grafix/' + char + '.jpg')
    }

    setSecondaryChar(char) {
        $('#secondaryBlock').attr('src', 'grafix/' + char + '.jpg')
    }
}

let state = new Editor()