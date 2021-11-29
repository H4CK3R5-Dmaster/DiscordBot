# emitters

Fancy [node][node]-compatible [event emitters][event_emitter], including bubbling and singleton ready events.

```js
var emitters = require('emitters');

// Polyfill for a node-compatible EventEmitter.
var ee = new emitters.EventEmitter();

var count = 0
,   counter = function (evt){
        console.log("Count: "+(count++)+" because "+this+" fired "+evt);
    };

// An emitter that auto-invokes listeners if the "ready" event has already occurred.
var re = new emitters.ReadyEmitter();
re.on('ready', counter);

// Fires the ready event unless already ready.
re.ready(true); // -> count == 1

// Invokes our callback because we're already ready.
re.on('ready', counter); // -> count == 2

// Or...
re.ready(counter); // -> count == 3

// A ChainedEmitter bubbles events to its parent.
var c1 = new emitters.ChainedEmitter(ee)
,   c2 = new emitters.ChainedEmitter(c1)
,   c3 = new emitters.ChainedEmitter()
;

// You can also get/set the parent emitter later.
c3.parentEmitter(c1);

// So we're bubbling from c2 -> c1, c3 -> c1, and c1 -> ee; let's listen in.
ee.on('bonk', counter);
c1.on('bonk', counter);
c2.on('bonk', counter);
c3.on('bonk', counter);

c2.emit('bonk'); // -> We see c2, c1, and ee all recieve events, putting our counter to 6.

// Event handlers can stop propagaion by returning false.
c1.on('bonk', function (){
    console.log('STOP!');
    return false;
});

c3.emit('bonk'); // -> c3 and c1 both have listeners who will get the event...
// But the second listener we just registered will end the bubbling. (Even if the 
// listener were first, the rest of c1's listeners would be notified. Stopping 
// propagation prevents the event from moving *up*.)
```


## Usage

For usage in [node.js][node], install it via [npm][npm]: `npm install emitters`.

A browser distribution is coming soon!

## API

Coming soon &mdash; use the source, Luke!


## Feedback

Find a bug or want to contribute? Open a ticket (or fork the source!) on [github][project]. 
You're also welcome to send me email at [dsc@less.ly][dsc_email].


## License

`emitters` was written by [David Schoonover][dsc] (in [Coco][coco], a dialect of [CoffeeScript][coffeescript] that compiles down to JavaScript). It is open-source software and freely available under the [MIT License][mit_license].



[project]: https://github.com/dsc/emitters "Emitters on GitHub"
[dsc]: https://github.com/dsc/ "David Schoonover"
[dsc_email]: mailto:dsc+emitters@less.ly?subject=emitters "dsc@less.ly"
[mit_license]: http://dsc.mit-license.org/ "MIT License"

[emitters_js]: https://raw.github.com/dsc/emitters/master/dist/emitters.js "emitters.js"
[emitters_min_js]: https://raw.github.com/dsc/emitters/master/dist/emitters.min.js "emitters.min.js"

[node]: http://nodejs.org/ "node.js"
[npm]: http://npmjs.org/ "npm"
[event_emitter]: http://nodejs.org/docs/latest/api/events.html#events_class_events_eventemitter "Node.js EventEmitter"
[coco]: https://github.com/satyr/coco "Coco: Unfancy CoffeeScript"
[coffeescript]: http://jashkenas.github.com/coffee-script/ "CoffeeScript: Unfancy JavaScript"

