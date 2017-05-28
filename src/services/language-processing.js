import pos from 'pos'

export default class LanguageProcessing {
    /** Determines if the last word should have a question mark */
    shouldBeAQuestion(sentence) {
        const words = sentence.trim().toLowerCase().split(' ')
        const tags = this._getTags(sentence)
        const firstTag = tags[0]
        const lastTag = tags[tags.length - 1]
        const startTags = ['MD', 'WDT', 'WP', 'WP$', 'WRB']
        const startWords = ['are', 'do', 'have']
        const endTags = ['NN', 'NNP', 'NNPS', 'NNS', 'PRP', 'PRP$', 'VB', 'VBG', 'VBN', 'VBP', 'EX', 'IN']
        const isQuestion = (startTags.indexOf(firstTag) > -1 || startWords.indexOf(words[0]) > -1) && endTags.indexOf(lastTag) > -1
        if(!isQuestion) { return false }

        // Exceptions
        // minimum three words
        if(tags.length < 3) {
            return false
        }

        // "what do i" : WP VBP PRP (but allow WP who)
        if((lastTag === 'PRP' || lastTag === 'PRP$') && tags.length < 4 && words[0] !== 'who') {
            return false
        }

        // "when we go out, you drive" - do not dismiss "when we go out, will you drive"
        if(firstTag === 'WRB' && tags.indexOf(',') > -1) {
            const tagAfterComma = tags[tags.indexOf(',') + 1]
            const wordAfterComma = sentence.split(',')[1].trim().split(' ')[0]
            if(startTags.indexOf(tagAfterComma) === -1 && startWords.indexOf(wordAfterComma) === -1) {
                return false
            }
        }

        // "when we read" : WRB, PRP, VB - 3 word sentence with WRB then PRP should not be question
        // "would you like" : MD, PRP, IN - but allow "can I come" : MD, PRP, VB
        if(tags.length === 3) {
            if((firstTag === 'WRB' || firstTag === 'WP$' || firstTag === 'MD') && tags[1] === 'PRP') {
                return false
            }
        }
        return isQuestion
    }

    /** Returns an array of tags */
    _getTags(sentence) {
        const words = new pos.Lexer().lex(sentence.trim())
        const tagger = new pos.Tagger()
        const taggedWords = tagger.tag(words)
        return taggedWords.map(taggedWord => taggedWord[1])
    }
}
