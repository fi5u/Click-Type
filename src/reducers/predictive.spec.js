/* global expect, it */
import * as types from '../actions/action-types'
import { initialState } from './predictive'
import reducer from './predictive'

const emptyState = {
    words: {}
}

it('should return the initial state', () => {
    expect(
        reducer(undefined, {})
    ).toEqual(initialState)
})

it('should handle ADD_PREDICTIVE_WORD', () => {
    expect(
        reducer(emptyState, {
            type: types.ADD_PREDICTIVE_WORD,
            words: [],
        })
    ).toEqual(emptyState)

    expect(
        reducer(emptyState, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['apples', 'are'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                apples: {
                    freq: 1,
                    words: {
                        are: {
                            freq: 1,
                        }
                    }
                }
            },
        }
    })

    expect(
        reducer({
            ...emptyState,
            ...{
                words: {
                    apples: {
                        freq: 1,
                        words: {
                            are: {
                                freq: 1,
                            }
                        }
                    }
                },
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['apples', 'can'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                apples: {
                    freq: 2,
                    words: {
                        are: {
                            freq: 1,
                        },
                        can: {
                            freq: 1,
                        }
                    }
                }
            },
        }
    })

    expect(
        reducer({
            ...emptyState,
            ...{
                words: {
                    apples: {
                        freq: 1,
                        words: {
                            are: {
                                freq: 1,
                            }
                        }
                    }
                },
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['what'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                apples: {
                    freq: 1,
                    words: {
                        are: {
                            freq: 1,
                        },
                    }
                },
                what: {
                    freq: 1,
                }
            },
        }
    })

    expect(
        reducer({
            ...emptyState,
            ...{
                words: {
                    apples: {
                        freq: 1,
                        words: {
                            are: {
                                freq: 1,
                            }
                        }
                    }
                },
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['apples', 'take', 'time'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                apples: {
                    freq: 2,
                    words: {
                        are: {
                            freq: 1,
                        },
                        take: {
                            freq: 1,
                            words: {
                                time: {
                                    freq: 1,
                                },
                            },
                        },
                    },
                },
            },
        }
    })

    expect(
        reducer({
            words: {},
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['i'],
        })
    ).toEqual({
        words: {
            i: {
                freq: 1,
            },
        },
    })

    expect(
        reducer({
            words: {},
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['i', 'love'],
        })
    ).toEqual({
        words: {
            i: {
                freq: 1,
                words: {
                    love: {
                        freq: 1,
                    },
                },
            },
        },
    })

    expect(
        reducer({
            words: {
                i: {
                    freq: 1,
                    words: {
                        love: {
                            freq: 1,
                        },
                    },
                },
            },
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['i', 'love', 'my'],
        })
    ).toEqual({
        words: {
            i: {
                freq: 2,
                words: {
                    love: {
                        freq: 2,
                        words: {
                            my: {
                                freq: 1,
                            },
                        },
                    },
                },
            },
        },
    })

    expect(
        reducer({
            words: {
                i: {
                    freq: 2,
                    words: {
                        love: {
                            freq: 2,
                            words: {
                                my: {
                                    freq: 1,
                                },
                            },
                        },
                    },
                },
            },
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['i', 'love', 'my', 'canary'],
        })
    ).toEqual({
        words: {
            i: {
                freq: 2,
                words: {
                    love: {
                        freq: 2,
                        words: {
                            my: {
                                freq: 1,
                            },
                        },
                    },
                },
            },
            love: {
                freq: 1,
                words: {
                    my: {
                        freq: 1,
                        words: {
                            canary: {
                                freq: 1,
                            },
                        },
                    },
                },
            },
        },
    })

    expect(
        reducer({
            ...emptyState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['Apples', 'are'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                apples: {
                    freq: 1,
                    words: {
                        are: {
                            freq: 1,
                        }
                    }
                }
            },
        }
    })

    expect(
        reducer({
            ...emptyState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['I', 'love', 'apples.'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                i: {
                    freq: 1,
                    words: {
                        love: {
                            freq: 1,
                            words: {
                                apples: {
                                    freq: 1,
                                }
                            }
                        }
                    }
                }
            },
        }
    })
})

it('should handle ADD_PREDICTIVE_WORD and not add a non-dictionary word', () => {
    expect(
        reducer({
            ...emptyState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['I', 'elvo', 'apples.'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                i: {
                    freq: 1,
                }
            },
        }
    })

    expect(
        reducer({
            ...emptyState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['I', 'love', 'ppleas.'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                i: {
                    freq: 1,
                    words: {
                        'love': {
                            freq: 1,
                        },
                    },
                },
            },
        }
    })

    expect(
        reducer({
            ...emptyState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['sfdlk', 'love', 'apples'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {},
        }
    })
})

it('should handle ADD_PREDICTIVE_WORD that contains an apostrophe', () => {
    expect(
        reducer({
            ...emptyState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['mum’s', 'house'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                'mum’s': {
                    freq: 1,
                    words: {
                        house: {
                            freq: 1,
                        }
                    }
                },
            },
        }
    })

    expect(
        reducer({
            ...emptyState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['mum\'s', 'house'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                'mum\'s': {
                    freq: 1,
                    words: {
                        house: {
                            freq: 1,
                        }
                    }
                },
            },
        }
    })

    expect(
        reducer({
            ...emptyState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['mustn’t', 'go'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                'mustn’t': {
                    freq: 1,
                    words: {
                        go: {
                            freq: 1,
                        }
                    }
                },
            },
        }
    })

    expect(
        reducer({
            ...emptyState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['shan’t', 'go'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                'shan’t': {
                    freq: 1,
                    words: {
                        go: {
                            freq: 1,
                        }
                    }
                },
            },
        }
    })
})

it('should handle ADD_PREDICTIVE_WORD that contains a sentence-ending punctuation mark', () => {
    expect(
        reducer({
            ...emptyState,
            ...{
                words: {},
            }
        }, {
            type: types.ADD_PREDICTIVE_WORD,
            words: ['will.', 'Hello', 'you'],
        })
    ).toEqual({
        ...emptyState,
        ...{
            words: {
                'will': {
                    freq: 1,
                },
            },
        }
    })
})
