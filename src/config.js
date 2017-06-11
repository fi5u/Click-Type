const chars = {
    backspace: '⌫',
    backup: '⇡',
    capsLock: '⇪',
    space: '[]',
}

const punctuation = [
    chars.space,
    '.',
    ',',
    '’',
    '?',
    '!',
    '⇪',
]

const tightPunctuation = [
    // Should not have space before
    '.',
    ',',
    '’',
    '?',
    '!',
]

const suggestedWords = ['I', 'you', 'what', 'when']

const config = {
    capitalizedAfter: [
        '. ',
        '? ',
        '! ',
    ],
    chars: chars,
    gridParts: {
        additionals: {
            pre: [chars.backup, chars.backspace],
            post: [],
        },
        letters: [
            ['a', 'b', 'c', 'd', 'e'],
            ['f', 'g', 'h', 'i', 'j'],
            ['k', 'l', 'm', 'n', 'o'],
            ['p', 'q', 'r', 's', 't'],
            ['u', 'v', 'w', 'x', 'y', 'z']
        ],
        punctuation: [punctuation],
        suggestedWords: suggestedWords,
    },
    punctuation: punctuation,
    suggestedWordCount: 4,
    tickDuration: 400,
    tightPunctuation: tightPunctuation,
}

export { config }
