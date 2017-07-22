## ClickType

For some people, typing on a traditional keyboard may be difficult. However, if they can press a single key, then they are able to write text with ClickType. By cycling through rows of letters and predicted words, the user can select them by just clicking the space bar.

ClickType is built with [React](https://facebook.github.io/react/) library. State is managed with [Redux](http://redux.js.org).

The [POS](https://www.npmjs.com/package/pos) library is used to (somewhat) intelligently predict upcoming words. A store of common word sequences (both in general, and for the user) is kept and referred to when deciding words to suggest.