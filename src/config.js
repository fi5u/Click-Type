const chars = {
    backspace: '⌫',
    backup: '⇡',
    space: '[]',
}

const suggestedWords = ['I', 'you', 'what', 'when']

const config = {
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
        punctuation: [
            [chars.space, '.', ',', '?','!']
        ],
        suggestedWords: suggestedWords,
    },
    suggestedWordCount: 4,
    tickDuration: 500,
}

export { config }
