module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1667025884709, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var WILDCARD = '*';
/* event-emitter */
var EventEmitter = /** @class */ (function () {
    function EventEmitter() {
        this._events = {};
    }
    /**
     * 监听一个事件
     * @param evt
     * @param callback
     * @param once
     */
    EventEmitter.prototype.on = function (evt, callback, once) {
        if (!this._events[evt]) {
            this._events[evt] = [];
        }
        this._events[evt].push({
            callback: callback,
            once: !!once,
        });
        return this;
    };
    /**
     * 监听一个事件一次
     * @param evt
     * @param callback
     */
    EventEmitter.prototype.once = function (evt, callback) {
        return this.on(evt, callback, true);
    };
    /**
     * 触发一个事件
     * @param evt
     * @param args
     */
    EventEmitter.prototype.emit = function (evt) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var events = this._events[evt] || [];
        var wildcardEvents = this._events[WILDCARD] || [];
        // 实际的处理 emit 方法
        var doEmit = function (es) {
            var length = es.length;
            for (var i = 0; i < length; i++) {
                if (!es[i]) {
                    continue;
                }
                var _a = es[i], callback = _a.callback, once = _a.once;
                if (once) {
                    es.splice(i, 1);
                    if (es.length === 0) {
                        delete _this._events[evt];
                    }
                    length--;
                    i--;
                }
                callback.apply(_this, args);
            }
        };
        doEmit(events);
        doEmit(wildcardEvents);
    };
    /**
     * 取消监听一个事件，或者一个channel
     * @param evt
     * @param callback
     */
    EventEmitter.prototype.off = function (evt, callback) {
        if (!evt) {
            // evt 为空全部清除
            this._events = {};
        }
        else {
            if (!callback) {
                // evt 存在，callback 为空，清除事件所有方法
                delete this._events[evt];
            }
            else {
                // evt 存在，callback 存在，清除匹配的
                var events = this._events[evt] || [];
                var length_1 = events.length;
                for (var i = 0; i < length_1; i++) {
                    if (events[i].callback === callback) {
                        events.splice(i, 1);
                        length_1--;
                        i--;
                    }
                }
                if (events.length === 0) {
                    delete this._events[evt];
                }
            }
        }
        return this;
    };
    /* 当前所有的事件 */
    EventEmitter.prototype.getEvents = function () {
        return this._events;
    };
    return EventEmitter;
}());
exports.default = EventEmitter;
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1667025884709);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map