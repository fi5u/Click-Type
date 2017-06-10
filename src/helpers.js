import { config } from './config'

export function conditionallyCapitalize(autoCapitalize, currentText, character, postSpace = false) {
    let output = currentText
    if(autoCapitalize && shouldCapitalize(currentText, character)) {
        // Find a character to capitalize
        const nonSpaceIndex = character.search(/\S/)
        output += character.slice(0, nonSpaceIndex + 1).toUpperCase() + character.slice(nonSpaceIndex + 1)
    }
    else {
        output += character
    }
    if(postSpace) {
        output += ' '
    }
    return output
}

export function shouldCapitalize(testString, character) {
    if(!testString.length) { return true }

    // If last two chars match config.capitalized after, or, if character passed,
    // also check that along with testString
    if(config.capitalizedAfter.indexOf(testString.slice(-2)) > -1 ||
        (character && character[0] === ' ' && config.capitalizedAfter.indexOf(testString.slice(-1) + character[0]) > -1)) {
        return true
    }

    return false
}
