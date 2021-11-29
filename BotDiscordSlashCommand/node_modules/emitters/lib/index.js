var emitter, chained_emitter, ready_emitter, waiting_emitter;
emitter = require('./emitter');
chained_emitter = require('./chained-emitter');
ready_emitter = require('./ready-emitter');
waiting_emitter = require('./waiting-emitter');
import$(import$(import$(import$(exports, emitter), chained_emitter), ready_emitter), waiting_emitter);
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}