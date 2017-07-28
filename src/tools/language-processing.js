/** Used to log out a predictive words object from an array
 * of sentences. Used for initial setting of predictive
 * words.
 */

import predictive from '../reducers/predictive'
import sentences from '../data/sentences.json'

let state = {
    words: {},
}

for(let i = sentences.length - 1; i >= 0; i--) {
    const wordArr = sentences[i].split(' ')
    const prevWords = []
    for(const word of wordArr) {
        prevWords.push(word)
        state = predictive(state, {
            type: 'ADD_PREDICTIVE_WORD',
            words: prevWords,
        })
    }

}

//console.log(JSON.stringify(state))
