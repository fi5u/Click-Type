export default class LanguageProcessing {
    /** Create suggested words when the last char is apostrophe
        Pass the word plus apostrophe */
    getApostrophizedWords(preWord) {
        const apostrophes = ['’', '\'']
        const word = preWord.slice(0, preWord.length - 1) // minus apostrophe
        const apostrophe = preWord.slice(-1)

        // If no final apostrophe, return empty suggestion
        if(apostrophes.indexOf(apostrophe) === -1) {
            return []
        }

        const personalPronouns = [
            'he',
            'i',
            'it',
            'she',
            'they',
            'we',
            'you',
        ]
        const results = []

        // I’m
        if(this._testApostropheWord(word, ['i'])) {
            results.push(`${word}${apostrophe}m`)
        }

        // 'are' words
        if(this._testApostropheWord(word, [
            'they',
            'we',
            'you',
        ])) {
            results.push(`${word}${apostrophe}re`)
        }

        // 'will' words
        if(this._testApostropheWord(word, personalPronouns)) {
            results.push(`${word}${apostrophe}ll`)
        }

        // 'not' words
        if(this._testApostropheWord(word, [
            'aren',
            'can',
            'couldn',
            'didn',
            'doesn',
            'don',
            'hadn',
            'hasn',
            'haven',
            'isn',
            'mustn',
            'needn',
            'oughtn',
            'shan',
            'shouldn',
            'wasn',
            'weren',
            'won',
            'wouldn',
        ])) {
            results.push(`${word}${apostrophe}t`)
        }

        // 'have' words
        if(this._testApostropheWord(word, [
            'i',
            'they',
            'we',
            'you',
        ])) {
            results.push(`${word}${apostrophe}ve`)
        }

        // 'had' words
        if(this._testApostropheWord(word, personalPronouns)) {
            results.push(`${word}${apostrophe}d`)
        }

        // personal ownership words
        if(this._testApostropheWord(word, [
            'he',
            'it',
            'she',
        ])) {
            results.push(`${word}${apostrophe}s`)
        }

        // will words
        if(this._testApostropheWord(word, personalPronouns)) {
            results.push(`${word}${apostrophe}ll`)
        }

        if(results.length === 0) {
            // Default to `’s`
            return [`${word}${apostrophe}s`]
        }
        return results
    }

    /** Determines if the last word should have a question mark */
    async shouldBeAQuestion(sentence) {
        const words = sentence.trim().toLowerCase().split(' ')
        const tags = await this._getTags(sentence)
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
    async _getTags(sentence) {
        try {
            const pos = await import('pos')
            const words = new pos.Lexer().lex(sentence.trim())
            const tagger = new pos.Tagger()
            const taggedWords = tagger.tag(words)
            return taggedWords.map(taggedWord => taggedWord[1])
        }
        catch(e) {
            console.log('Error getting tags')
        }
    }

    _testApostropheWord(word, list) {
        return list.indexOf(word) > -1
    }
}
