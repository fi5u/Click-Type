/* global expect, it */
import LanguageProcessing from './language-processing'

const langProcess = new LanguageProcessing()

it('should correctly suggest words from a word ending with an apostrophe', () => {
    expect(langProcess.getApostrophizedWords('cat')).toEqual([])
    expect(langProcess.getApostrophizedWords('cat\'').indexOf('cat\'s')).toBeGreaterThan(-1)
    expect(langProcess.getApostrophizedWords('cat’').indexOf('cat’s')).toBeGreaterThan(-1)
    expect(langProcess.getApostrophizedWords('i’').indexOf('i’m')).toBeGreaterThan(-1)
    expect(langProcess.getApostrophizedWords('i’').indexOf('i’ll')).toBeGreaterThan(-1)
    expect(langProcess.getApostrophizedWords('i’').indexOf('i’ve')).toBeGreaterThan(-1)
    expect(langProcess.getApostrophizedWords('they’').indexOf('they’ve')).toBeGreaterThan(-1)
    expect(langProcess.getApostrophizedWords('they’').indexOf('they’re')).toBeGreaterThan(-1)
    expect(langProcess.getApostrophizedWords('they’').indexOf('they’ll')).toBeGreaterThan(-1)
    expect(langProcess.getApostrophizedWords('wasn’').indexOf('wasn’t')).toBeGreaterThan(-1)
    expect(langProcess.getApostrophizedWords('she’').indexOf('she’s')).toBeGreaterThan(-1)
    expect(langProcess.getApostrophizedWords('it’').indexOf('it’s')).toBeGreaterThan(-1)
})

it('should correctly suggest the final word to have a question mark', () => {
    expect(langProcess.shouldBeAQuestion('I am happy')).toEqual(false)
    expect(langProcess.shouldBeAQuestion('We don\'t like cheese')).toEqual(false)
    expect(langProcess.shouldBeAQuestion('Would you like')).toEqual(false)
    expect(langProcess.shouldBeAQuestion('What are')).toEqual(false)
    expect(langProcess.shouldBeAQuestion('When we go out, you drive')).toEqual(false)
    expect(langProcess.shouldBeAQuestion('When we go out, will you drive')).toEqual(true)
    expect(langProcess.shouldBeAQuestion('What will we do when we get there')).toEqual(true)
    expect(langProcess.shouldBeAQuestion('Would you like to go to the shop')).toEqual(true)
    expect(langProcess.shouldBeAQuestion('Who are you')).toEqual(true)
    expect(langProcess.shouldBeAQuestion('Can I help you')).toEqual(true)
    expect(langProcess.shouldBeAQuestion('Do you like her')).toEqual(true)
    expect(langProcess.shouldBeAQuestion('How do')).toEqual(false)
    expect(langProcess.shouldBeAQuestion('When we read')).toEqual(false)
    expect(langProcess.shouldBeAQuestion('What kind of cheese sauce do you like')).toEqual(true)
})
