var EventEmitter, e, objToString, isArray, slice, ref$;
try {
  EventEmitter = require('events').EventEmitter;
} catch (e$) {
  e = e$;
  objToString = Object.prototype.toString;
  isArray = Array.isArray || function(o){
    return objToString.call(o) === '[object Array]';
  };
  slice = [].slice;
  EventEmitter = (function(){
    EventEmitter.displayName = 'EventEmitter';
    var prototype = EventEmitter.prototype, constructor = EventEmitter;
    prototype.emit = function(type){
      var arg, ref$, queue, listener, args, i$, len$;
      arg = arguments[1];
      if (type === 'error' && !((ref$ = this._events) != null && ref$.error) || (isArray(this._events.error) && !this._events.error.length)) {
        if (arg instanceof Error) {
          throw arg;
        } else {
          throw new Error("Uncaught, unspecified 'error' event.");
        }
        return false;
      }
      queue = (ref$ = this._events) != null ? ref$[type] : void 8;
      if (typeof queue === 'function') {
        listener = queue;
        switch (arguments.length) {
        case 1:
          listener.call(this);
          break;
        case 2:
          listener.call(this, arg);
          break;
        case 3:
          listener.call(this, arg, arguments[2]);
          break;
        default:
          listener.apply(this, slice.call(arguments, 1));
        }
      } else if (isArray(queue)) {
        args = slice.call(arguments, 1);
        for (i$ = 0, len$ = queue.length; i$ < len$; ++i$) {
          listener = queue[i$];
          listener.apply(this, args);
        }
      } else {
        return false;
      }
      return true;
    };
    prototype.on = function(type, listener){
      var events, queue;
      if (typeof listener !== 'function') {
        throw new TypeError("addListener only takes instances of Function");
      }
      this.emit('newListener', type, typeof listener.listener === 'function' ? listener.listener : listener);
      events = this._events || (this._events = {});
      if (!(queue = events[type])) {
        events[type] = listener;
      } else if (!isArray(queue)) {
        events[type] = [queue, listener];
      } else {
        (events[type] = queue.slice()).push(listener);
      }
      return this;
    };
    prototype.addListener = EventEmitter.prototype.on;
    prototype.removeListener = function(type, listener){
      var ref$, queue, idx, i, len$, fn;
      if (typeof listener !== 'function') {
        throw new TypeError("addListener only takes instances of Function");
      }
      queue = (ref$ = this._events) != null ? ref$[type] : void 8;
      if (!queue) {
        return this;
      }
      if (typeof queue === 'function') {
        if (queue === listener || queue.listener === listener) {
          delete this._events[type];
        }
        return this;
      }
      idx = -1;
      for (i = 0, len$ = queue.length; i < len$; ++i) {
        fn = queue[i];
        if (fn === listener || fn.listener === listener) {
          idx = i;
          break;
        }
      }
      if (idx < 0) {
        return this;
      }
      if (queue.length === 1) {
        delete this._events[type];
      } else {
        queue = this._events[type] = queue.slice();
        queue.splice(idx, 1);
      }
      return this;
    };
    prototype.removeAllListeners = function(type){
      var ref$;
      if (arguments.length === 0) {
        this._events = {};
        return this;
      }
      if ((ref$ = this._events) != null && ref$[type]) {
        delete this._events[type];
      }
      return this;
    };
    prototype.once = function(type, listener){
      var self, _once;
      if (typeof listener !== 'function') {
        throw new TypeError("once only takes instances of Function");
      }
      self = this;
      _once = function(){
        self.removeListener(type, _once);
        listener.apply(this, arguments);
      };
      _once.listener = listener;
      return this.on(type, _once);
    };
    prototype.listeners = function(type){
      var events, queue;
      events = this._events || (this._events = {});
      queue = events[type] || (events[type] = []);
      if (!isArray(queue)) {
        queue = events[type] = [events[type]];
      }
      return queue;
    };
    prototype.setMaxListeners = function(n){
      return console.debug('setMaxListeners is unsupported');
    };
    function EventEmitter(){}
    return EventEmitter;
  }());
}
(ref$ = EventEmitter.prototype).trigger || (ref$.trigger = EventEmitter.prototype.emit);
(ref$ = EventEmitter.prototype).off || (ref$.off = EventEmitter.prototype.removeListener);
exports.EventEmitter = EventEmitter;