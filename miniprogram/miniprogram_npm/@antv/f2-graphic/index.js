module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1667025884710, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BBox = void 0;
Object.defineProperty(exports, "Canvas", {
  enumerable: true,
  get: function get() {
    return _engine.Canvas;
  }
});
Object.defineProperty(exports, "Group", {
  enumerable: true,
  get: function get() {
    return _engine.Group;
  }
});
Object.defineProperty(exports, "Matrix", {
  enumerable: true,
  get: function get() {
    return _matrix.default;
  }
});
Object.defineProperty(exports, "Shape", {
  enumerable: true,
  get: function get() {
    return _engine.Shape;
  }
});
exports.Types = exports.Smooth = void 0;
Object.defineProperty(exports, "Vector2", {
  enumerable: true,
  get: function get() {
    return _vector.default;
  }
});
exports.createCanvas = createCanvas;
exports.getEngine = getEngine;
exports.registerEngine = registerEngine;

var _matrix = _interopRequireDefault(require("./util/matrix"));

var _vector = _interopRequireDefault(require("./util/vector2"));

var Smooth = _interopRequireWildcard(require("./util/smooth"));

exports.Smooth = Smooth;

var BBox = _interopRequireWildcard(require("./util/bbox"));

exports.BBox = BBox;

var _engine = require("./engine");

var Types = _interopRequireWildcard(require("./types"));

exports.Types = Types;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var engines = {};

function registerEngine(name, engine) {
  engines[name] = engine;
}

function getEngine(name) {
  var G = engines[name];

  if (G) {
    return G;
  }

  return {
    Canvas: _engine.Canvas,
    Group: _engine.Group,
    Shape: _engine.Shape
  };
}

function createCanvas(cfg) {
  var renderer = cfg.renderer;
  var G = getEngine(renderer);
  return new G.Canvas(cfg);
}
}, function(modId) {var map = {"./util/matrix":1667025884711,"./util/vector2":1667025884712,"./util/smooth":1667025884713,"./util/bbox":1667025884714,"./engine":1667025884715,"./types":1667025884742}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884711, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Matrix = {
  generateDefault: function generateDefault() {
    return [1, 0, 0, 1, 0, 0];
  },
  isChanged: function isChanged(m) {
    return m[0] !== 1 || m[1] !== 0 || m[2] !== 0 || m[3] !== 1 || m[4] !== 0 || m[5] !== 0;
  },
  multiply: function multiply(m1, m2) {
    var m11 = m1[0] * m2[0] + m1[2] * m2[1];
    var m12 = m1[1] * m2[0] + m1[3] * m2[1];
    var m21 = m1[0] * m2[2] + m1[2] * m2[3];
    var m22 = m1[1] * m2[2] + m1[3] * m2[3];
    var dx = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
    var dy = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
    return [m11, m12, m21, m22, dx, dy];
  },
  scale: function scale(out, m, v) {
    out[0] = m[0] * v[0];
    out[1] = m[1] * v[0];
    out[2] = m[2] * v[1];
    out[3] = m[3] * v[1];
    out[4] = m[4];
    out[5] = m[5];
    return out;
  },
  rotate: function rotate(out, m, radian) {
    var c = Math.cos(radian);
    var s = Math.sin(radian);
    var m11 = m[0] * c + m[2] * s;
    var m12 = m[1] * c + m[3] * s;
    var m21 = m[0] * -s + m[2] * c;
    var m22 = m[1] * -s + m[3] * c;
    out[0] = m11;
    out[1] = m12;
    out[2] = m21;
    out[3] = m22;
    out[4] = m[4];
    out[5] = m[5];
    return out;
  },
  translate: function translate(out, m, v) {
    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4] + m[0] * v[0] + m[2] * v[1];
    out[5] = m[5] + m[1] * v[0] + m[3] * v[1];
    return out;
  },
  transform: function transform(m, actions) {
    var out = [].concat(m);

    for (var i = 0, len = actions.length; i < len; i++) {
      var action = actions[i];

      switch (action[0]) {
        case 't':
          Matrix.translate(out, out, [action[1], action[2]]);
          break;

        case 's':
          Matrix.scale(out, out, [action[1], action[2]]);
          break;

        case 'r':
          Matrix.rotate(out, out, action[1]);
          break;

        default:
          break;
      }
    }

    return out;
  }
};
var _default = Matrix;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884712, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * 2 Dimensional Vector
 * @module vector2
 */
var _default = {
  /**
   * Creates a new, empty vector2
   *
   * @return {vector2} a new 2D vector
   */
  create: function create() {
    return [0, 0];
  },

  /**
   * Calculates the length of a vector2
   *
   * @param {vector2} v vector to calculate length of
   * @return {Number} length of v
   */
  length: function length(v) {
    var x = v[0];
    var y = v[1];
    return Math.sqrt(x * x + y * y);
  },

  /**
   * Normalize a vector2
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v vector to normalize
   * @return {vector2} out
   */
  normalize: function normalize(out, v) {
    var len = this.length(v);

    if (len === 0) {
      out[0] = 0;
      out[1] = 0;
    } else {
      out[0] = v[0] / len;
      out[1] = v[1] / len;
    }

    return out;
  },

  /**
   * Adds two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  add: function add(out, v1, v2) {
    out[0] = v1[0] + v2[0];
    out[1] = v1[1] + v2[1];
    return out;
  },

  /**
   * Subtracts vector v2 from vector v1
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  sub: function sub(out, v1, v2) {
    out[0] = v1[0] - v2[0];
    out[1] = v1[1] - v2[1];
    return out;
  },

  /**
   * Scales a vector2 by a scalar number
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v the vector to scale
   * @param {Number} s amount to scale the vector by
   * @return {vector2} out
   */
  scale: function scale(out, v, s) {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    return out;
  },

  /**
   * Calculates the dot product of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} dot product of v1 and v2
   */
  dot: function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
  },

  /**
   * Calculates the direction of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Boolean} the direction of v1 and v2
   */
  direction: function direction(v1, v2) {
    return v1[0] * v2[1] - v2[0] * v1[1];
  },

  /**
   * Calculates the angle of two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} angle of v1 and v2
   */
  angle: function angle(v1, v2) {
    var theta = this.dot(v1, v2) / (this.length(v1) * this.length(v2));
    return Math.acos(theta);
  },

  /**
   * Calculates the angle of two vector2's with direction
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @param {Boolean} direction the direction of two vector2's
   * @return {Number} angle of v1 and v2
   */
  angleTo: function angleTo(v1, v2, direction) {
    var angle = this.angle(v1, v2);
    var angleLargeThanPI = this.direction(v1, v2) >= 0;

    if (direction) {
      if (angleLargeThanPI) {
        return Math.PI * 2 - angle;
      }

      return angle;
    }

    if (angleLargeThanPI) {
      return angle;
    }

    return Math.PI * 2 - angle;
  },

  /**
   * whether a vector2 is zero vector
   *
   * @param  {vector2} v vector to calculate
   * @return {Boolean}   is or not a zero vector
   */
  zero: function zero(v) {
    return v[0] === 0 && v[1] === 0;
  },

  /**
   * Calculates the euclidian distance between two vector2's
   *
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {Number} distance between a and b
   */
  distance: function distance(v1, v2) {
    var x = v2[0] - v1[0];
    var y = v2[1] - v1[1];
    return Math.sqrt(x * x + y * y);
  },

  /**
   * Creates a new vector2 initialized with values from an existing vector
   *
   * @param {vector2} v vector to clone
   * @return {Array} a new 2D vector
   */
  clone: function clone(v) {
    return [v[0], v[1]];
  },

  /**
   * Return the minimum of two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  min: function min(out, v1, v2) {
    out[0] = Math.min(v1[0], v2[0]);
    out[1] = Math.min(v1[1], v2[1]);
    return out;
  },

  /**
   * Return the maximum of two vector2's
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v1 the first operand
   * @param {vector2} v2 the second operand
   * @return {vector2} out
   */
  max: function max(out, v1, v2) {
    out[0] = Math.max(v1[0], v2[0]);
    out[1] = Math.max(v1[1], v2[1]);
    return out;
  },

  /**
   * Transforms the vector2 with a mat2d
   *
   * @param {vector2} out the receiving vector
   * @param {vector2} v the vector to transform
   * @param {mat2d} m matrix to transform with
   * @return {vector2} out
   */
  transformMat2d: function transformMat2d(out, v, m) {
    var x = v[0];
    var y = v[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  }
};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884713, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.smooth = catmullRom2bezier;

var _vector = _interopRequireDefault(require("./vector2"));

/**
 * @fileOverview convert the line to curve
 * @author dxq613@gmail.com
 */
function getPoint(v) {
  return [v.x, v.y];
}

function smoothBezier(points, smooth, isLoop, constraint) {
  var cps = [];
  var prevPoint;
  var nextPoint;
  var hasConstraint = !!constraint;
  var min;
  var max;
  var point;
  var len;
  var l;
  var i;

  if (hasConstraint) {
    min = [Infinity, Infinity];
    max = [-Infinity, -Infinity];

    for (i = 0, l = points.length; i < l; i++) {
      point = getPoint(points[i]);

      _vector.default.min(min, min, point);

      _vector.default.max(max, max, point);
    }

    _vector.default.min(min, min, constraint[0]);

    _vector.default.max(max, max, constraint[1]);
  }

  for (i = 0, len = points.length; i < len; i++) {
    point = getPoint(points[i]);

    if (isLoop) {
      prevPoint = getPoint(points[i ? i - 1 : len - 1]);
      nextPoint = getPoint(points[(i + 1) % len]);
    } else {
      if (i === 0 || i === len - 1) {
        cps.push([point[0], point[1]]);
        continue;
      } else {
        prevPoint = getPoint(points[i - 1]);
        nextPoint = getPoint(points[i + 1]);
      }
    }

    var v = _vector.default.sub([], nextPoint, prevPoint);

    _vector.default.scale(v, v, smooth);

    var d0 = _vector.default.distance(point, prevPoint);

    var d1 = _vector.default.distance(point, nextPoint);

    var sum = d0 + d1;

    if (sum !== 0) {
      d0 /= sum;
      d1 /= sum;
    }

    var v1 = _vector.default.scale([], v, -d0);

    var v2 = _vector.default.scale([], v, d1);

    var cp0 = _vector.default.add([], point, v1);

    var cp1 = _vector.default.add([], point, v2);

    if (hasConstraint) {
      _vector.default.max(cp0, cp0, min);

      _vector.default.min(cp0, cp0, max);

      _vector.default.max(cp1, cp1, min);

      _vector.default.min(cp1, cp1, max);
    }

    cps.push([cp0[0], cp0[1]]);
    cps.push([cp1[0], cp1[1]]);
  }

  if (isLoop) {
    cps.push(cps.shift());
  }

  return cps;
}

function catmullRom2bezier(pointList, z, constraint) {
  var isLoop = !!z;
  var controlPointList = smoothBezier(pointList, 0.4, isLoop, constraint);
  var len = pointList.length;
  var d1 = [];
  var cp1;
  var cp2;
  var p;

  for (var i = 0; i < len - 1; i++) {
    cp1 = controlPointList[i * 2];
    cp2 = controlPointList[i * 2 + 1];
    p = pointList[i + 1];
    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p.x, p.y]);
  }

  if (isLoop) {
    cp1 = controlPointList[len];
    cp2 = controlPointList[len + 1];
    p = pointList[0];
    d1.push(['C', cp1[0], cp1[1], cp2[0], cp2[1], p.x, p.y]);
  }

  return d1;
}
}, function(modId) { var map = {"./vector2":1667025884712}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884714, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBBoxFromArc = getBBoxFromArc;
exports.getBBoxFromBezierGroup = getBBoxFromBezierGroup;
exports.getBBoxFromLine = getBBoxFromLine;
exports.getBBoxFromPoints = getBBoxFromPoints;

var _vector = _interopRequireDefault(require("./vector2"));

var start = _vector.default.create();

var end = _vector.default.create();

var extremity = _vector.default.create();

function getCubicBezierXYatT(startPt, controlPt1, controlPt2, endPt, T) {
  var x = CubicN(T, startPt.x, controlPt1.x, controlPt2.x, endPt.x);
  var y = CubicN(T, startPt.y, controlPt1.y, controlPt2.y, endPt.y);
  return {
    x: x,
    y: y
  };
} // cubic helper formula at T distance


function CubicN(T, a, b, c, d) {
  var t2 = T * T;
  var t3 = t2 * T;
  return a + (-a * 3 + T * (3 * a - a * T)) * T + (3 * b + T * (-6 * b + b * 3 * T)) * T + (c * 3 - c * 3 * T) * t2 + d * t3;
}

function cubicBezierBounds(c) {
  var minX = Infinity;
  var maxX = -Infinity;
  var minY = Infinity;
  var maxY = -Infinity;
  var s = {
    x: c[0],
    y: c[1]
  };
  var c1 = {
    x: c[2],
    y: c[3]
  };
  var c2 = {
    x: c[4],
    y: c[5]
  };
  var e = {
    x: c[6],
    y: c[7]
  };

  for (var t = 0; t < 100; t++) {
    var pt = getCubicBezierXYatT(s, c1, c2, e, t / 100);

    if (pt.x < minX) {
      minX = pt.x;
    }

    if (pt.x > maxX) {
      maxX = pt.x;
    }

    if (pt.y < minY) {
      minY = pt.y;
    }

    if (pt.y > maxY) {
      maxY = pt.y;
    }
  }

  return {
    minX: minX,
    minY: minY,
    maxX: maxX,
    maxY: maxY
  };
}

function getBBoxFromPoints(points, lineWidth) {
  if (points.length === 0) {
    return;
  }

  var p = points[0];
  var left = p.x;
  var right = p.x;
  var top = p.y;
  var bottom = p.y;
  var len = points.length;

  for (var i = 1; i < len; i++) {
    p = points[i];
    left = Math.min(left, p.x);
    right = Math.max(right, p.x);
    top = Math.min(top, p.y);
    bottom = Math.max(bottom, p.y);
  }

  lineWidth = lineWidth / 2 || 0;
  return {
    minX: left - lineWidth,
    minY: top - lineWidth,
    maxX: right + lineWidth,
    maxY: bottom + lineWidth
  };
}

function getBBoxFromLine(x0, y0, x1, y1, lineWidth) {
  lineWidth = lineWidth / 2 || 0;
  return {
    minX: Math.min(x0, x1) - lineWidth,
    minY: Math.min(y0, y1) - lineWidth,
    maxX: Math.max(x0, x1) + lineWidth,
    maxY: Math.max(y0, y1) + lineWidth
  };
}

function getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise) {
  var diff = Math.abs(startAngle - endAngle);

  if (diff % (Math.PI * 2) < 1e-4 && diff > 1e-4) {
    // Is a circle
    return {
      minX: x - r,
      minY: y - r,
      maxX: x + r,
      maxY: y + r
    };
  }

  start[0] = Math.cos(startAngle) * r + x;
  start[1] = Math.sin(startAngle) * r + y;
  end[0] = Math.cos(endAngle) * r + x;
  end[1] = Math.sin(endAngle) * r + y;
  var min = [0, 0];
  var max = [0, 0];

  _vector.default.min(min, start, end);

  _vector.default.max(max, start, end); // Thresh to [0, Math.PI * 2]


  startAngle = startAngle % (Math.PI * 2);

  if (startAngle < 0) {
    startAngle = startAngle + Math.PI * 2;
  }

  endAngle = endAngle % (Math.PI * 2);

  if (endAngle < 0) {
    endAngle = endAngle + Math.PI * 2;
  }

  if (startAngle > endAngle && !anticlockwise) {
    endAngle += Math.PI * 2;
  } else if (startAngle < endAngle && anticlockwise) {
    startAngle += Math.PI * 2;
  }

  if (anticlockwise) {
    var tmp = endAngle;
    endAngle = startAngle;
    startAngle = tmp;
  }

  for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
    if (angle > startAngle) {
      extremity[0] = Math.cos(angle) * r + x;
      extremity[1] = Math.sin(angle) * r + y;

      _vector.default.min(min, extremity, min);

      _vector.default.max(max, extremity, max);
    }
  }

  return {
    minX: min[0],
    minY: min[1],
    maxX: max[0],
    maxY: max[1]
  };
}

function getBBoxFromBezierGroup(points, lineWidth) {
  var minX = Infinity;
  var maxX = -Infinity;
  var minY = Infinity;
  var maxY = -Infinity;

  for (var i = 0, len = points.length; i < len; i++) {
    var bbox = cubicBezierBounds(points[i]);

    if (bbox.minX < minX) {
      minX = bbox.minX;
    }

    if (bbox.maxX > maxX) {
      maxX = bbox.maxX;
    }

    if (bbox.minY < minY) {
      minY = bbox.minY;
    }

    if (bbox.maxY > maxY) {
      maxY = bbox.maxY;
    }
  }

  lineWidth = lineWidth / 2 || 0;
  return {
    minX: minX - lineWidth,
    minY: minY - lineWidth,
    maxX: maxX + lineWidth,
    maxY: maxY + lineWidth
  };
}
}, function(modId) { var map = {"./vector2":1667025884712}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884715, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Canvas", {
  enumerable: true,
  get: function get() {
    return _canvas.default;
  }
});
Object.defineProperty(exports, "Group", {
  enumerable: true,
  get: function get() {
    return _group.default;
  }
});
Object.defineProperty(exports, "Shape", {
  enumerable: true,
  get: function get() {
    return _shape.default;
  }
});

var _canvas = _interopRequireDefault(require("./canvas"));

var _group = _interopRequireDefault(require("./group"));

var _shape = _interopRequireDefault(require("./shape"));
}, function(modId) { var map = {"./canvas":1667025884716,"./group":1667025884739,"./shape":1667025884723}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884716, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _emit = _interopRequireDefault(require("../event/emit"));

var _controller = _interopRequireDefault(require("../event/controller"));

var _canvasElement = _interopRequireDefault(require("./canvas-element"));

var _util = require("@antv/util");

var DOMUtil = _interopRequireWildcard(require("../util/dom"));

var _container = _interopRequireDefault(require("./container"));

var _group = _interopRequireDefault(require("./group"));

var _requestAnimationFrame = require("../util/requestAnimationFrame");

var _lang = _interopRequireDefault(require("./lang"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getPixelRatio = DOMUtil.getPixelRatio,
    getDomById = DOMUtil.getDomById,
    getWidth = DOMUtil.getWidth,
    getHeight = DOMUtil.getHeight,
    isCanvasElement = DOMUtil.isCanvasElement;

var Canvas = /*#__PURE__*/function (_EventEmit) {
  (0, _inherits2.default)(Canvas, _EventEmit);

  var _super = (0, _createSuper2.default)(Canvas);

  function Canvas(cfg) {
    var _this;

    (0, _classCallCheck2.default)(this, Canvas);
    _this = _super.call(this);
    var title = cfg.title;
    var ariaLabel = title ? (0, _util.substitute)(_lang.default.general.withTitle, {
      title: title
    }) : _lang.default.general.title;
    _this._attrs = (0, _util.mix)({
      type: 'canvas',
      children: [],
      ariaLabel: ariaLabel
    }, cfg);

    _this._initPixelRatio();

    _this._initCanvas();

    return _this;
  }
  /* eslint-enable */


  (0, _createClass2.default)(Canvas, [{
    key: "get",
    value: function get(name) {
      return this._attrs[name];
    }
  }, {
    key: "set",
    value: function set(name, value) {
      this._attrs[name] = value;
    }
  }, {
    key: "_initPixelRatio",
    value: function _initPixelRatio() {
      var pixelRatio = this.get('pixelRatio');

      if (!pixelRatio) {
        this.set('pixelRatio', getPixelRatio());
      }
    }
  }, {
    key: "beforeDraw",
    value: function beforeDraw() {
      var context = this._attrs.context;
      var el = this._attrs.el;
      context && context.clearRect && context.clearRect(0, 0, el.width, el.height);
    }
  }, {
    key: "_initCanvas",
    value: function _initCanvas() {
      var el = this.get('el');
      var context = this.get('context');

      if (!el && !context) {
        throw new Error('Please specify the id, el or context of the chart!');
      }

      var canvas;

      if (el) {
        // DOMElement or String
        canvas = (0, _util.isString)(el) ? getDomById(el) : el;
      } else {
        // 说明没有指定el
        canvas = _canvasElement.default.create(context);
      }

      if (context && canvas && !canvas.getContext) {
        canvas.getContext = function () {
          return context;
        };
      }

      var width = this.get('width') || getWidth(canvas) || canvas.width;
      var height = this.get('height') || getHeight(canvas) || canvas.height;
      this.set('canvas', this);
      this.set('el', canvas);
      this.set('context', context || canvas.getContext('2d'));
      this.changeSize(width, height); // 初始化事件控制器

      var eventController = new _controller.default({
        canvas: this,
        el: canvas
      });
      this.set('eventController', eventController);
    }
  }, {
    key: "changeSize",
    value: function changeSize(width, height) {
      var pixelRatio = this.get('pixelRatio');
      var canvasDOM = this.get('el'); // HTMLCanvasElement or canvasElement
      // 浏览器环境设置style样式

      if (canvasDOM.style) {
        canvasDOM.style.width = width + 'px';
        canvasDOM.style.height = height + 'px';
      }

      if (isCanvasElement(canvasDOM)) {
        canvasDOM.width = width * pixelRatio;
        canvasDOM.height = height * pixelRatio;

        if (pixelRatio !== 1) {
          var ctx = this.get('context');
          ctx.scale(pixelRatio, pixelRatio);
        }
      }

      this.set('width', width);
      this.set('height', height);
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      var pixelRatio = this.get('pixelRatio');
      var width = this.get('width');
      return width * pixelRatio;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      var pixelRatio = this.get('pixelRatio');
      var height = this.get('height');
      return height * pixelRatio;
    }
  }, {
    key: "getPointByClient",
    value: function getPointByClient(clientX, clientY) {
      var el = this.get('el');
      var bbox = el.getBoundingClientRect();
      var width = bbox.right - bbox.left;
      var height = bbox.bottom - bbox.top;
      return {
        x: (clientX - bbox.left) * (el.width / width),
        y: (clientY - bbox.top) * (el.height / height)
      };
    }
  }, {
    key: "_beginDraw",
    value: function _beginDraw() {
      this._attrs.toDraw = true;
    }
  }, {
    key: "_endDraw",
    value: function _endDraw() {
      this._attrs.toDraw = false;
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this2 = this;

      var drawInner = function drawInner() {
        _this2.set('animateHandler', (0, _requestAnimationFrame.requestAnimationFrame)(function () {
          _this2.set('animateHandler', undefined);

          if (_this2.get('toDraw')) {
            drawInner();
          }
        }));

        _this2.beforeDraw();

        try {
          var context = _this2._attrs.context;

          _this2.drawChildren(context); // 支付宝，微信小程序，需要调context.draw才能完成绘制， 所以这里直接判断是否有.draw方法


          if (context.draw) {
            context.draw();
          } // 设置无障碍文本


          _this2.setAriaLabel();
        } catch (ev) {
          console.warn('error in draw canvas, detail as:');
          console.warn(ev);

          _this2._endDraw();
        }

        _this2._endDraw();
      };

      if (this.get('destroyed')) {
        return;
      }

      if (this.get('animateHandler')) {
        this._beginDraw();
      } else {
        drawInner();
      }
    } // 设置无障碍文本

  }, {
    key: "setAriaLabel",
    value: function setAriaLabel() {
      var el = this._attrs.el;

      var ariaLabel = this._getAriaLabel();

      if (ariaLabel && el.setAttribute) {
        el.setAttribute('aria-label', ariaLabel);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.get('destroyed')) {
        return;
      } // 需要清理 canvas 画布内容，否则会导致 spa 应用 ios 下 canvas 白屏
      // https://stackoverflow.com/questions/52532614/total-canvas-memory-use-exceeds-the-maximum-limit-safari-12
      // https://github.com/antvis/F2/issues/630


      var el = this.get('el');
      el.width = 0;
      el.height = 0;
      this.clear();
      this._attrs = {};
      this.set('destroyed', true);
    }
  }, {
    key: "isDestroyed",
    value: function isDestroyed() {
      return this.get('destroyed');
    }
  }]);
  return Canvas;
}(_emit.default); // @ts-ignore


(0, _util.mix)(Canvas.prototype, _container.default, {
  getGroupClass: function getGroupClass() {
    return _group.default;
  }
});
var _default = Canvas;
exports.default = _default;
}, function(modId) { var map = {"../event/emit":1667025884717,"../event/controller":1667025884718,"./canvas-element":1667025884720,"../util/dom":1667025884719,"./container":1667025884721,"./group":1667025884739,"../util/requestAnimationFrame":1667025884740,"./lang":1667025884741}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884717, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _util = require("@antv/util");

// 实现简单的事件机制
var EventEmit = /*#__PURE__*/function () {
  function EventEmit() {
    (0, _classCallCheck2.default)(this, EventEmit);
    this.__events = {};
  }

  (0, _createClass2.default)(EventEmit, [{
    key: "on",
    value: function on(type, listener) {
      if (!type || !listener) {
        return;
      }

      var events = this.__events[type] || [];
      events.push(listener);
      this.__events[type] = events;
    }
  }, {
    key: "emit",
    value: function emit(type, e) {
      var _this = this;

      if ((0, _util.isObject)(type)) {
        e = type;
        type = e && e.type;
      }

      if (!type) {
        return;
      }

      var events = this.__events[type];

      if (!events || !events.length) {
        return;
      }

      events.forEach(function (listener) {
        listener.call(_this, e);
      });
    }
  }, {
    key: "off",
    value: function off(type, listener) {
      var __events = this.__events;
      var events = __events[type];

      if (!events || !events.length) {
        return;
      } // 如果没有指定方法，则删除所有项


      if (!listener) {
        delete __events[type];
        return;
      } // 删除指定的 listener


      for (var i = 0, len = events.length; i < len; i++) {
        if (events[i] === listener) {
          events.splice(i, 1);
          i--;
        }
      }
    }
  }]);
  return EventEmit;
}();

var _default = EventEmit;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884718, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var DOMUtil = _interopRequireWildcard(require("../util/dom"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var convertPoints = DOMUtil.convertPoints; // 计算滑动的方向

var calcDirection = function calcDirection(start, end) {
  var xDistance = end.x - start.x;
  var yDistance = end.y - start.y; // x 的距离大于y 说明是横向，否则就是纵向

  if (Math.abs(xDistance) > Math.abs(yDistance)) {
    return xDistance > 0 ? 'right' : 'left';
  }

  return yDistance > 0 ? 'down' : 'up';
}; // 计算2点之间的距离


var calcDistance = function calcDistance(point1, point2) {
  var xDistance = Math.abs(point2.x - point1.x);
  var yDistance = Math.abs(point2.y - point1.y);
  return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
};

var getCenter = function getCenter(point1, point2) {
  var x = point1.x + (point2.x - point1.x) / 2;
  var y = point1.y + (point2.y - point1.y) / 2;
  return {
    x: x,
    y: y
  };
};

var PRESS_DELAY = 250;

var EventController = /*#__PURE__*/function () {
  function EventController(_ref) {
    var _this = this;

    var canvas = _ref.canvas,
        el = _ref.el;
    (0, _classCallCheck2.default)(this, EventController);

    this._click = function (ev) {
      var points = convertPoints(ev, _this.canvas);
      ev.points = points;

      _this.emitEvent('click', ev);
    };

    this._start = function (ev) {
      var points = convertPoints(ev, _this.canvas);

      if (!points) {
        return;
      }

      ev.points = points;

      _this.emitEvent('touchstart', ev); // 防止上次的内容没有清理掉，重新reset下


      _this.reset(); // 记录touch start 的时间


      _this.startTime = Date.now(); // 记录touch start 的点

      _this.startPoints = points;

      if (points.length > 1) {
        _this.startDistance = calcDistance(points[0], points[1]);
        _this.center = getCenter(points[0], points[1]);
      } else {
        // 如果touchstart后停顿250ms, 则也触发press事件
        _this.pressTimeout = setTimeout(function () {
          // 这里固定触发press事件
          var eventType = 'press';
          var direction = 'none';
          ev.direction = direction;

          _this.emitStart(eventType, ev);

          _this.emitEvent(eventType, ev);

          _this.eventType = eventType;
          _this.direction = direction;
        }, PRESS_DELAY);
      }
    };

    this._move = function (ev) {
      var points = convertPoints(ev, _this.canvas);
      if (!points) return;

      _this.clearPressTimeout();

      ev.points = points;

      _this.emitEvent('touchmove', ev);

      var startPoints = _this.startPoints;
      if (!startPoints) return; // 多指触控

      if (points.length > 1) {
        // touchstart的距离
        var startDistance = _this.startDistance;
        var currentDistance = calcDistance(points[0], points[1]);
        ev.zoom = currentDistance / startDistance;
        ev.center = _this.center; // 触发缩放事件

        _this.emitStart('pinch', ev);

        _this.emitEvent('pinch', ev);
      } else {
        var deltaX = points[0].x - startPoints[0].x;
        var deltaY = points[0].y - startPoints[0].y;
        var direction = _this.direction || calcDirection(startPoints[0], points[0]);
        _this.direction = direction; // 获取press或者pan的事件类型
        // press 按住滑动, pan表示平移
        // 如果start后立刻move，则触发pan, 如果有停顿，则触发press

        var eventType = _this.getEventType(points);

        ev.direction = direction;
        ev.deltaX = deltaX;
        ev.deltaY = deltaY;

        _this.emitStart(eventType, ev);

        _this.emitEvent(eventType, ev); // 记录最后2次move的时间和坐标，为了给swipe事件用


        var prevMoveTime = _this.lastMoveTime;
        var now = Date.now(); // 最后2次的时间间隔一定要大于0，否则swipe没发计算

        if (now - prevMoveTime > 0) {
          _this.prevMoveTime = prevMoveTime;
          _this.prevMovePoints = _this.lastMovePoints;
          _this.lastMoveTime = now;
          _this.lastMovePoints = points;
        }
      }
    };

    this._end = function (ev) {
      var points = convertPoints(ev, _this.canvas);
      ev.points = points;

      _this.emitEnd(ev);

      _this.emitEvent('touchend', ev); // swipe事件处理, 在touchend之后触发


      var lastMoveTime = _this.lastMoveTime;
      var now = Date.now(); // 做这个判断是为了最后一次touchmove后到end前，还有一个停顿的过程
      // 100 是拍的一个值，理论这个值会很短，一般不卡顿的话在10ms以内

      if (now - lastMoveTime < 100) {
        var prevMoveTime = _this.prevMoveTime || _this.startTime;
        var intervalTime = lastMoveTime - prevMoveTime; // 时间间隔一定要大于0, 否则计算没意义

        if (intervalTime > 0) {
          var prevMovePoints = _this.prevMovePoints || _this.startPoints;
          var lastMovePoints = _this.lastMovePoints; // move速率

          var velocity = calcDistance(prevMovePoints[0], lastMovePoints[0]) / intervalTime; // 0.3 是参考hammerjs的设置

          if (velocity > 0.3) {
            ev.velocity = velocity;
            ev.direction = calcDirection(prevMovePoints[0], lastMovePoints[0]);
            ev.velocityX = (lastMovePoints[0].x - prevMovePoints[0].x) / intervalTime;
            ev.velocityY = (lastMovePoints[0].y - prevMovePoints[0].y) / intervalTime;

            _this.emitEvent('swipe', ev);
          }
        }
      }

      _this.reset();

      var touches = ev.touches; // 当多指只释放了1指时也会触发end, 这时重新触发一次start

      if (touches && touches.length > 0) {
        _this._start(ev);
      }
    };

    this._cancel = function (ev) {
      _this.emitEvent('touchcancel', ev);

      _this.reset();
    }; // canvasEl


    this.canvas = canvas;
    this.delegateEvent(el); // 用来记录当前触发的事件

    this.processEvent = {};
  }

  (0, _createClass2.default)(EventController, [{
    key: "delegateEvent",
    value: function delegateEvent(canvasEl) {
      // 代理这几个事件
      canvasEl.addEventListener('click', this._click);
      canvasEl.addEventListener('touchstart', this._start);
      canvasEl.addEventListener('touchmove', this._move);
      canvasEl.addEventListener('touchend', this._end);
      canvasEl.addEventListener('touchcancel', this._cancel);
    }
  }, {
    key: "emitEvent",
    value: function emitEvent(type, ev) {
      var canvas = this.canvas;
      canvas.emit(type, ev);
    }
  }, {
    key: "getEventType",
    value: function getEventType(points) {
      var eventType = this.eventType,
          canvas = this.canvas,
          startTime = this.startTime,
          startPoints = this.startPoints;

      if (eventType) {
        return eventType;
      }

      var type;
      var panEventListeners = canvas.__events.pan; // 如果没有pan事件的监听，默认都是press

      if (!panEventListeners || !panEventListeners.length) {
        type = 'press';
      } else {
        // 如果有pan事件的处理，press则需要停顿250ms, 且移动距离小于10
        var now = Date.now();

        if (now - startTime > PRESS_DELAY && calcDistance(startPoints[0], points[0]) < 10) {
          type = 'press';
        } else {
          type = 'pan';
        }
      }

      this.eventType = type;
      return type;
    }
  }, {
    key: "enable",
    value: function enable(eventType) {
      this.processEvent[eventType] = true;
    } // 是否进行中的事件

  }, {
    key: "isProcess",
    value: function isProcess(eventType) {
      return this.processEvent[eventType];
    } // 触发start事件

  }, {
    key: "emitStart",
    value: function emitStart(type, ev) {
      if (this.isProcess(type)) {
        return;
      }

      this.enable(type);
      this.emitEvent("".concat(type, "start"), ev);
    } // 触发end事件

  }, {
    key: "emitEnd",
    value: function emitEnd(ev) {
      var _this2 = this;

      var processEvent = this.processEvent;
      Object.keys(processEvent).forEach(function (type) {
        _this2.emitEvent("".concat(type, "end"), ev);

        delete processEvent[type];
      });
    }
  }, {
    key: "clearPressTimeout",
    value: function clearPressTimeout() {
      if (this.pressTimeout) {
        clearTimeout(this.pressTimeout);
        this.pressTimeout = null;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.clearPressTimeout();
      this.startTime = 0;
      this.startPoints = null;
      this.startDistance = 0;
      this.direction = null;
      this.eventType = null;
      this.pinch = false;
      this.prevMoveTime = 0;
      this.prevMovePoints = null;
      this.lastMoveTime = 0;
      this.lastMovePoints = null;
    }
  }]);
  return EventController;
}();

var _default = EventController;
exports.default = _default;
}, function(modId) { var map = {"../util/dom":1667025884719}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884719, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListener = addEventListener;
exports.convertPoints = convertPoints;
exports.createEvent = createEvent;
exports.getDomById = getDomById;
exports.getHeight = getHeight;
exports.getPixelRatio = getPixelRatio;
exports.getRelativePosition = getRelativePosition;
exports.getStyle = getStyle;
exports.getWidth = getWidth;
exports.isBrowser = void 0;
exports.isCanvasElement = isCanvasElement;
exports.isWx = exports.isNode = exports.isMy = void 0;
exports.measureText = measureText;
exports.removeEventListener = removeEventListener;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _util = require("@antv/util");

/**
 * Detects support for options object argument in addEventListener.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 * @private
 */
var supportsEventListenerOptions = function () {
  var supports = false;

  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        supports = true;
      }
    });
    window.addEventListener('e', null, options);
  } catch (e) {// continue regardless of error
  }

  return supports;
}(); // Default passive to true as expected by Chrome for 'touchstart' and 'touchend' events.
// https://github.com/chartjs/Chart.js/issues/4287


var eventListenerOptions = supportsEventListenerOptions ? {
  passive: true
} : false;
/* global wx, my */
// weixin miniprogram
// @ts-ignore

var isWx = (typeof wx === "undefined" ? "undefined" : (0, _typeof2.default)(wx)) === 'object' && typeof wx.getSystemInfoSync === 'function'; // ant miniprogram
// @ts-ignore

exports.isWx = isWx;
var isMy = (typeof my === "undefined" ? "undefined" : (0, _typeof2.default)(my)) === 'object' && typeof my.getSystemInfoSync === 'function'; // in node
// @ts-ignore

exports.isMy = isMy;
var isNode = (typeof global === "undefined" ? "undefined" : (0, _typeof2.default)(global)) && !(typeof window === "undefined" ? "undefined" : (0, _typeof2.default)(window)); // in browser

exports.isNode = isNode;
var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.sessionStorage !== 'undefined';
exports.isBrowser = isBrowser;

function isCanvasElement(el) {
  if (!el || (0, _typeof2.default)(el) !== 'object') return false;

  if (el.nodeType === 1 && el.nodeName) {
    // HTMLCanvasElement
    return true;
  } // CanvasElement


  return !!el.isCanvasElement;
}

function getPixelRatio() {
  return window && window.devicePixelRatio || 1;
}

function getStyle(el, property) {
  return el.currentStyle ? el.currentStyle[property] : document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
}

function getWidth(el) {
  var width = getStyle(el, 'width');

  if (width === 'auto') {
    width = el.offsetWidth;
  }

  return parseFloat(width);
}

function getHeight(el) {
  var height = getStyle(el, 'height');

  if (height === 'auto') {
    height = el.offsetHeight;
  }

  return parseFloat(height);
}

function getDomById(id) {
  if (!id) {
    return null;
  }

  return document.getElementById(id);
}

function getRelativePosition(point, canvas) {
  var canvasDom = canvas.get('el');
  if (!canvasDom) return point;

  var _canvasDom$getBoundin = canvasDom.getBoundingClientRect(),
      top = _canvasDom$getBoundin.top,
      left = _canvasDom$getBoundin.left;

  var paddingLeft = parseFloat(getStyle(canvasDom, 'padding-left'));
  var paddingTop = parseFloat(getStyle(canvasDom, 'padding-top'));
  var mouseX = point.x - left - paddingLeft;
  var mouseY = point.y - top - paddingTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

function addEventListener(source, type, listener) {
  source.addEventListener(type, listener, eventListenerOptions);
}

function removeEventListener(source, type, listener) {
  source.removeEventListener(type, listener, eventListenerOptions);
}

function landscapePoint(point, canvas) {
  var landscape = canvas.get('landscape');

  if (!landscape) {
    return point;
  }

  if ((0, _util.isFunction)(landscape)) {
    return landscape(point, canvas);
  } // 默认顺时针旋转90度


  var height = canvas.get('height');
  var x = point.y;
  var y = height - point.x;
  return {
    x: x,
    y: y
  };
}

function convertPoints(ev, canvas) {
  var touches = ev.touches; // 认为是mouse事件

  if (!touches) {
    var point = getRelativePosition({
      x: ev.clientX,
      y: ev.clientY
    }, canvas);
    return [landscapePoint(point, canvas)];
  } // 单指 touchend 后，touchs 会变空，最后的触点要从changedTouches里拿


  if (!touches.length) {
    // 为了防止万一，加个空逻辑
    touches = ev.changedTouches || [];
  }

  var points = [];

  for (var i = 0, len = touches.length; i < len; i++) {
    var touch = touches[i]; // x, y: 相对canvas原点的位置，clientX, clientY 相对于可视窗口的位置

    var x = touch.x,
        y = touch.y,
        clientX = touch.clientX,
        clientY = touch.clientY;

    var _point = void 0; // 小程序环境会有x,y


    if ((0, _util.isNumber)(x) || (0, _util.isNumber)(y)) {
      _point = {
        x: x,
        y: y
      };
    } else {
      // 浏览器环境再计算下canvas的相对位置
      _point = getRelativePosition({
        x: clientX,
        y: clientY
      }, canvas);
    }

    points.push(landscapePoint(_point, canvas));
  }

  return points;
}

function createEvent(event, chart) {
  var canvas = chart.get('canvas');
  var points = convertPoints(event, canvas); // touchend会没有points

  var point = points[0] || {};
  return {
    type: event.type,
    chart: chart,
    native: event,
    x: point.x,
    y: point.y
  };
}

function measureText(text, font, ctx) {
  if (!ctx) {
    ctx = document.createElement('canvas').getContext('2d');
  }

  ctx.font = font || '12px sans-serif';
  return ctx.measureText(text);
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884720, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _emit = _interopRequireDefault(require("../event/emit"));

var CanvasElement = /*#__PURE__*/function (_EventEmit) {
  (0, _inherits2.default)(CanvasElement, _EventEmit);

  var _super = (0, _createSuper2.default)(CanvasElement);

  /* eslint-enable */
  function CanvasElement(ctx) {
    var _this;

    (0, _classCallCheck2.default)(this, CanvasElement);
    _this = _super.call(this);
    _this.context = ctx; // canvas实际的宽高 (width/height) * pixelRatio
    // 有可能是 node canvas 创建的 context 对象

    var canvas = ctx.canvas || {};
    _this.width = canvas.width || 0;
    _this.height = canvas.height || 0;
    _this.style = {};
    _this.currentStyle = {};
    _this.attrs = {}; // 用来标识是CanvasElement实例

    _this.isCanvasElement = true;
    return _this;
  }

  (0, _createClass2.default)(CanvasElement, [{
    key: "getContext",
    value: function
      /* type */
    getContext() {
      return this.context;
    }
  }, {
    key: "getBoundingClientRect",
    value: function getBoundingClientRect() {
      var width = this.width;
      var height = this.height; // 默认都处理成可视窗口的顶部位置

      return {
        top: 0,
        right: width,
        bottom: height,
        left: 0
      };
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(key, value) {
      this.attrs[key] = value;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(type, listener) {
      this.on(type, listener);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(type, listener) {
      this.off(type, listener);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(type, e) {
      this.emit(type, e);
    }
  }]);
  return CanvasElement;
}(_emit.default);

function supportEventListener(canvas) {
  if (!canvas) {
    return false;
  } // 非 HTMLCanvasElement


  if (canvas.nodeType !== 1 || !canvas.nodeName || canvas.nodeName.toLowerCase() !== 'canvas') {
    return false;
  } // 微信小程序canvas.getContext('2d')时也是CanvasRenderingContext2D
  // 也会有ctx.canvas, 而且nodeType也是1，所以还要在看下是否支持addEventListener


  var support = false;

  try {
    canvas.addEventListener('eventTest', function () {
      support = true;
    });
    canvas.dispatchEvent(new Event('eventTest'));
  } catch (error) {
    support = false;
  }

  return support;
}

var _default = {
  create: function create(ctx) {
    if (!ctx) {
      return null;
    }

    if (supportEventListener(ctx.canvas)) {
      return ctx.canvas;
    }

    return new CanvasElement(ctx);
  }
};
exports.default = _default;
}, function(modId) { var map = {"../event/emit":1667025884717}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884721, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("@antv/util");

var _array = require("../util/array");

var _shape = _interopRequireDefault(require("./shape"));

var SHAPE_MAP = {};
var INDEX = '_INDEX';

function getComparer(compare) {
  return function (left, right) {
    var result = compare(left, right);
    return result === 0 ? left[INDEX] - right[INDEX] : result;
  };
}

var _default = {
  getGroupClass: function getGroupClass() {},
  getChildren: function getChildren() {
    return this.get('children');
  },
  addShape: function addShape(type) {
    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var shapeType = SHAPE_MAP[type];

    if (!shapeType) {
      shapeType = (0, _util.upperFirst)(type);
      SHAPE_MAP[type] = shapeType;
    }

    var shape = new _shape.default[shapeType](cfg);
    this.add(shape);
    return shape;
  },
  addGroup: function addGroup(cfg) {
    var groupClass = this.getGroupClass();
    var rst = new groupClass(cfg);
    this.add(rst);
    return rst;
  },
  contain: function contain(item) {
    var children = this.get('children');
    return children.indexOf(item) > -1;
  },
  sort: function sort() {
    var children = this.get('children');

    for (var i = 0, len = children.length; i < len; i++) {
      var child = children[i];
      child[INDEX] = i;
    }

    children.sort(getComparer(function (obj1, obj2) {
      return obj1.get('zIndex') - obj2.get('zIndex');
    }));
    return this;
  },
  drawChildren: function drawChildren(context) {
    this.sort();
    var children = this.get('children');

    for (var i = 0, len = children.length; i < len; i++) {
      var child = children[i];
      child.draw(context);
    }

    return this;
  },
  clear: function clear() {
    var children = this.get('children') || [];

    while (children.length !== 0) {
      children[children.length - 1].remove(true);
    }

    return this;
  },
  add: function add(items) {
    var children = this.get('children');

    if (!children) {
      children = [];
      this.set('children', children);
    }

    if (!(0, _util.isArray)(items)) {
      items = [items];
    }

    for (var i = 0, len = items.length; i < len; i++) {
      var item = items[i];
      var parent = item.get('parent');

      if (parent) {
        var descendants = parent.get('children');
        (0, _array.remove)(descendants, item);
      }

      this._setEvn(item);

      children.push(item);
    }

    return this;
  },
  _setEvn: function _setEvn(item) {
    var _item$_attrs$attrs, _item$_attrs$attrs2;

    var _this$_attrs = this._attrs,
        context = _this$_attrs.context,
        canvas = _this$_attrs.canvas,
        aria = _this$_attrs.aria;
    var _item$_attrs = item._attrs,
        isGroup = _item$_attrs.isGroup,
        type = _item$_attrs.type;
    item._attrs.parent = this;
    item._attrs.context = context;
    item._attrs.canvas = canvas; // 是否需要无障碍处理

    if (aria && item._attrs.aria !== false) {
      item._attrs.aria = aria;
    }

    if (type === 'text' && canvas && canvas.get('fontFamily') && !((_item$_attrs$attrs = item._attrs.attrs) === null || _item$_attrs$attrs === void 0 ? void 0 : _item$_attrs$attrs.fontFamily)) {
      item.attr('fontFamily', canvas.get('fontFamily'));
    }

    var clip = (_item$_attrs$attrs2 = item._attrs.attrs) === null || _item$_attrs$attrs2 === void 0 ? void 0 : _item$_attrs$attrs2.clip;

    if (clip) {
      clip._attrs.parent = this;
      clip._attrs.context = context;
      clip._attrs.canvas = canvas;
    }

    if (isGroup) {
      var children = item._attrs.children;

      for (var i = 0, len = children.length; i < len; i++) {
        item._setEvn(children[i]);
      }
    }
  },
  _getAriaLabel: function _getAriaLabel() {
    var _this$_attrs2 = this._attrs,
        aria = _this$_attrs2.aria,
        ariaLabel = _this$_attrs2.ariaLabel,
        children = _this$_attrs2.children; // 主动关闭

    if (!aria) return;
    var childAriaLabels = [];

    if (children && children.length) {
      for (var i = 0, len = children.length; i < len; i++) {
        var _childAriaLabel = children[i].getAriaLabel();

        if (_childAriaLabel) {
          childAriaLabels.push(_childAriaLabel);
        }
      }
    }

    var childAriaLabel = childAriaLabels.join(' '); // 2个都有时拼接成完整句子

    if (ariaLabel && childAriaLabel) {
      return "".concat(ariaLabel, " ").concat(childAriaLabel, " ");
    } // 只有1个，或者都没有


    return ariaLabel || childAriaLabel;
  }
};
exports.default = _default;
}, function(modId) { var map = {"../util/array":1667025884722,"./shape":1667025884723}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884722, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = remove;

function remove(arr, obj) {
  if (!arr) {
    return;
  }

  var index = arr.indexOf(obj);

  if (index !== -1) {
    arr.splice(index, 1);
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884723, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _shape = _interopRequireDefault(require("./shape"));

var _rect = _interopRequireDefault(require("./rect"));

var _image = _interopRequireDefault(require("./image"));

var _circle = _interopRequireDefault(require("./circle"));

var _line = _interopRequireDefault(require("./line"));

var _polygon = _interopRequireDefault(require("./polygon"));

var _polyline = _interopRequireDefault(require("./polyline"));

var _arc = _interopRequireDefault(require("./arc"));

var _sector = _interopRequireDefault(require("./sector"));

var _text = _interopRequireDefault(require("./text"));

var _custom = _interopRequireDefault(require("./custom"));

var _marker = _interopRequireDefault(require("./marker"));

_shape.default.Rect = _rect.default;
_shape.default.Image = _image.default;
_shape.default.Circle = _circle.default;
_shape.default.Line = _line.default;
_shape.default.Polygon = _polygon.default;
_shape.default.Polyline = _polyline.default;
_shape.default.Arc = _arc.default;
_shape.default.Sector = _sector.default;
_shape.default.Text = _text.default;
_shape.default.Custom = _custom.default;
_shape.default.Marker = _marker.default;
var _default = _shape.default;
exports.default = _default;
}, function(modId) { var map = {"./shape":1667025884724,"./rect":1667025884727,"./image":1667025884728,"./circle":1667025884729,"./line":1667025884730,"./polygon":1667025884731,"./polyline":1667025884732,"./arc":1667025884733,"./sector":1667025884734,"./text":1667025884735,"./custom":1667025884737,"./marker":1667025884738}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884724, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _util = require("@antv/util");

var _element = _interopRequireDefault(require("../element"));

var Shape = /*#__PURE__*/function (_Element) {
  (0, _inherits2.default)(Shape, _Element);

  var _super = (0, _createSuper2.default)(Shape);

  function Shape() {
    (0, _classCallCheck2.default)(this, Shape);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Shape, [{
    key: "_initProperties",
    value:
    /* eslint-enable */
    function _initProperties() {
      this._attrs = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, this._attrs), {}, {
        zIndex: 0,
        visible: true,
        destroyed: false,
        isShape: true,
        attrs: {}
      });
    }
  }, {
    key: "getType",
    value: function getType() {
      return this._attrs.type;
    }
  }, {
    key: "drawInner",
    value: function drawInner(context) {
      var attrs = this.get('attrs');
      this.createPath(context);
      var originOpacity = context.globalAlpha;

      if (this.hasFill()) {
        var fillOpacity = attrs.fillOpacity;

        if (!(0, _util.isNil)(fillOpacity) && fillOpacity !== 1) {
          context.globalAlpha = fillOpacity;
          context.fill();
          context.globalAlpha = originOpacity;
        } else {
          context.fill();
        }
      }

      if (this.hasStroke()) {
        var lineWidth = attrs.lineWidth;

        if (lineWidth > 0) {
          var strokeOpacity = attrs.strokeOpacity;

          if (!(0, _util.isNil)(strokeOpacity) && strokeOpacity !== 1) {
            context.globalAlpha = strokeOpacity;
          }

          context.stroke();
        }
      }
    }
  }, {
    key: "getBBox",
    value: function getBBox() {
      var bbox = this._attrs.bbox;

      if (!bbox) {
        bbox = this.calculateBox();

        if (bbox) {
          bbox.x = bbox.minX;
          bbox.y = bbox.minY;
          bbox.width = bbox.maxX - bbox.minX;
          bbox.height = bbox.maxY - bbox.minY;
        }

        this._attrs.bbox = bbox;
      }

      return bbox;
    }
  }, {
    key: "calculateBox",
    value: function calculateBox() {
      return null;
    }
  }, {
    key: "createPath",
    value: function createPath(_context) {}
  }]);
  return Shape;
}(_element.default);

var _default = Shape;
exports.default = _default;
}, function(modId) { var map = {"../element":1667025884725}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884725, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _util = require("@antv/util");

var _array = require("../util/array");

var _matrix = _interopRequireDefault(require("../util/matrix"));

var _styleParse = require("../util/style-parse");

var _vector = _interopRequireDefault(require("../util/vector2"));

var ALIAS_ATTRS_MAP = {
  stroke: 'strokeStyle',
  fill: 'fillStyle',
  opacity: 'globalAlpha'
};
var SHAPE_ATTRS = ['fillStyle', 'font', 'globalAlpha', 'lineCap', 'lineWidth', 'lineJoin', 'miterLimit', 'shadowBlur', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY', 'strokeStyle', 'textAlign', 'textBaseline', 'lineDash', 'shadow' // 兼容支付宝小程序
];
var CLIP_SHAPES = ['circle', 'sector', 'polygon', 'rect', 'polyline', 'custom'];

var Element = /*#__PURE__*/function () {
  function Element(cfg) {
    (0, _classCallCheck2.default)(this, Element);

    this._initProperties();

    (0, _util.mix)(this._attrs, cfg);
    var attrs = this._attrs.attrs;

    if (attrs) {
      this.initAttrs(attrs);
    }

    this.initTransform();
  }

  (0, _createClass2.default)(Element, [{
    key: "_initProperties",
    value: function _initProperties() {
      this._attrs = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, this._attrs), {}, {
        zIndex: 0,
        visible: true,
        destroyed: false
      });
    }
  }, {
    key: "get",
    value: function get(name) {
      return this._attrs[name];
    }
  }, {
    key: "set",
    value: function set(name, value) {
      this._attrs[name] = value;
    }
  }, {
    key: "isGroup",
    value: function isGroup() {
      return this.get('isGroup');
    }
  }, {
    key: "isShape",
    value: function isShape() {
      return this.get('isShape');
    }
  }, {
    key: "initAttrs",
    value: function initAttrs(attrs) {
      this.attr((0, _util.mix)(this.getDefaultAttrs(), attrs));
    }
  }, {
    key: "getDefaultAttrs",
    value: function getDefaultAttrs() {
      return {};
    }
  }, {
    key: "_setAttr",
    value: function _setAttr(name, value) {
      var attrs = this._attrs.attrs;

      if (name === 'clip') {
        value = this._setAttrClip(value);
      } else {
        var alias = ALIAS_ATTRS_MAP[name];

        if (alias) {
          attrs[alias] = value;
        }
      }

      attrs[name] = value;
    }
  }, {
    key: "_getAttr",
    value: function _getAttr(name) {
      var _this$_attrs, _this$_attrs$attrs;

      return (_this$_attrs = this._attrs) === null || _this$_attrs === void 0 ? void 0 : (_this$_attrs$attrs = _this$_attrs.attrs) === null || _this$_attrs$attrs === void 0 ? void 0 : _this$_attrs$attrs[name];
    }
  }, {
    key: "_afterAttrsSet",
    value: function _afterAttrsSet() {}
  }, {
    key: "_setAttrClip",
    value: function _setAttrClip(clip) {
      if (clip && CLIP_SHAPES.indexOf(clip._attrs.type) > -1) {
        if (clip.get('canvas') === null) {
          clip = (0, _objectSpread2.default)({}, clip);
        }

        clip.set('parent', this.get('parent'));
        clip.set('context', this.get('context'));
        return clip;
      }

      return null;
    }
  }, {
    key: "attr",
    value: function attr(name, value) {
      if (this.get('destroyed')) return null;
      var argumentsLen = arguments.length;

      if (argumentsLen === 0) {
        return this._attrs.attrs;
      }

      if ((0, _util.isObject)(name)) {
        this._attrs.bbox = null;

        for (var k in name) {
          this._setAttr(k, name[k]);
        }

        if (this._afterAttrsSet) {
          this._afterAttrsSet();
        }

        return this;
      }

      if (argumentsLen === 2) {
        this._attrs.bbox = null;

        this._setAttr(name, value);

        if (this._afterAttrsSet) {
          this._afterAttrsSet();
        }

        return this;
      }

      return this._getAttr(name);
    }
  }, {
    key: "getParent",
    value: function getParent() {
      return this.get('parent');
    }
  }, {
    key: "draw",
    value: function draw(context) {
      if (this.get('destroyed')) {
        return;
      }

      if (this.get('visible')) {
        this.setContext(context);
        this.drawInner(context);
        this.restoreContext(context);
      }
    }
  }, {
    key: "setContext",
    value: function setContext(context) {
      var clip = this._attrs.attrs.clip;
      context.save();

      if (clip && !clip._attrs.destroyed) {
        clip.resetTransform(context);
        clip.createPath(context);
        context.clip();
      }

      this.resetContext(context);
      this.resetTransform(context);
    }
  }, {
    key: "restoreContext",
    value: function restoreContext(context) {
      context.restore();
    }
  }, {
    key: "resetContext",
    value: function resetContext(context) {
      var elAttrs = this._attrs.attrs;

      for (var k in elAttrs) {
        if (SHAPE_ATTRS.indexOf(k) > -1) {
          var v = elAttrs[k];

          if ((k === 'fillStyle' || k === 'strokeStyle') && v) {
            v = (0, _styleParse.parseStyle)(v, this, context);
          }

          if (k === 'lineDash' && context.setLineDash && (0, _util.isArray)(v)) {
            context.setLineDash(v);
          } else {
            context[k] = v;
          }
        }
      }
    }
  }, {
    key: "hasFill",
    value: function hasFill() {
      return this.get('canFill') && this._attrs.attrs.fillStyle;
    }
  }, {
    key: "hasStroke",
    value: function hasStroke() {
      return this.get('canStroke') && this._attrs.attrs.strokeStyle;
    }
  }, {
    key: "drawInner",
    value: function drawInner(_context) {}
  }, {
    key: "show",
    value: function show() {
      this.set('visible', true);
      return this;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.set('visible', false);
      return this;
    }
  }, {
    key: "isVisible",
    value: function isVisible() {
      return this.get('visible');
    }
  }, {
    key: "getAriaLabel",
    value: function getAriaLabel() {
      var _this$_attrs2 = this._attrs,
          destroyed = _this$_attrs2.destroyed,
          visible = _this$_attrs2.visible,
          isShape = _this$_attrs2.isShape,
          aria = _this$_attrs2.aria;

      if (destroyed || !visible || isShape && !aria) {
        return;
      }

      return this._getAriaLabel();
    }
  }, {
    key: "_getAriaLabel",
    value: function _getAriaLabel() {
      return this._attrs.ariaLabel;
    }
  }, {
    key: "_removeFromParent",
    value: function _removeFromParent() {
      var parent = this.get('parent');

      if (parent) {
        var children = parent.get('children');
        (0, _array.remove)(children, this);
      }

      return this;
    }
  }, {
    key: "remove",
    value: function remove(destroy) {
      if (destroy) {
        this.destroy();
      } else {
        this._removeFromParent();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var destroyed = this.get('destroyed');

      if (destroyed) {
        return null;
      }

      this._removeFromParent(); // 保留 attrs


      var attrs = this._attrs.attrs;
      this._attrs = {
        attrs: attrs
      };
      this.set('destroyed', true);
    }
  }, {
    key: "getBBox",
    value: function getBBox() {
      return {
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,
        width: 0,
        height: 0
      };
    }
  }, {
    key: "initTransform",
    value: function initTransform() {
      var attrs = this._attrs.attrs;

      if (!attrs) {
        attrs = {};
      }

      if (!attrs.matrix) {
        attrs.matrix = [1, 0, 0, 1, 0, 0];
      }

      this._attrs.attrs = attrs;
    }
  }, {
    key: "getMatrix",
    value: function getMatrix() {
      return this._attrs.attrs.matrix;
    }
  }, {
    key: "setMatrix",
    value: function setMatrix(m) {
      this._attrs.attrs.matrix = [m[0], m[1], m[2], m[3], m[4], m[5]];
    }
  }, {
    key: "transform",
    value: function transform(actions) {
      var matrix = this._attrs.attrs.matrix;
      this._attrs.attrs.matrix = _matrix.default.transform(matrix, actions);
      return this;
    }
  }, {
    key: "setTransform",
    value: function setTransform(actions) {
      this._attrs.attrs.matrix = [1, 0, 0, 1, 0, 0];
      return this.transform(actions);
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      var matrix = this._attrs.attrs.matrix;

      _matrix.default.translate(matrix, matrix, [x, y]);
    }
  }, {
    key: "rotate",
    value: function rotate(rad) {
      var matrix = this._attrs.attrs.matrix;

      _matrix.default.rotate(matrix, matrix, rad);
    }
  }, {
    key: "scale",
    value: function scale(sx, sy) {
      var matrix = this._attrs.attrs.matrix;

      _matrix.default.scale(matrix, matrix, [sx, sy]);
    }
  }, {
    key: "moveTo",
    value: function moveTo(x, y) {
      var cx = this._attrs.x || 0;
      var cy = this._attrs.y || 0;
      this.translate(x - cx, y - cy);
      this.set('x', x);
      this.set('y', y);
    }
  }, {
    key: "apply",
    value: function apply(v) {
      var m = this._attrs.attrs.matrix;

      _vector.default.transformMat2d(v, v, m);

      return this;
    }
  }, {
    key: "resetTransform",
    value: function resetTransform(context) {
      var mo = this._attrs.attrs.matrix;

      if (_matrix.default.isChanged(mo)) {
        context.transform(mo[0], mo[1], mo[2], mo[3], mo[4], mo[5]);
      }
    }
  }, {
    key: "isDestroyed",
    value: function isDestroyed() {
      return this.get('destroyed');
    }
  }]);
  return Element;
}();

var _default = Element;
exports.default = _default;
}, function(modId) { var map = {"../util/array":1667025884722,"../util/matrix":1667025884711,"../util/style-parse":1667025884726,"../util/vector2":1667025884712}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884726, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.parseStyle = parseStyle;

var _util = require("@antv/util");

function _mod(n, m) {
  return (n % m + m) % m;
}

function _addStop(steps, gradient) {
  (0, _util.each)(steps, function (item) {
    item = item.split(':');
    gradient.addColorStop(Number(item[0]), item[1]);
  });
} // the string format: 'l(0) 0:#ffffff 0.5:#7ec2f3 1:#1890ff'


function _parseLineGradient(color, shape, context) {
  var arr = color.split(' ');
  var angle = arr[0].slice(2, arr[0].length - 1);
  angle = _mod(parseFloat(angle) * Math.PI / 180, Math.PI * 2);
  var steps = arr.slice(1);

  var _shape$getBBox = shape.getBBox(),
      minX = _shape$getBBox.minX,
      minY = _shape$getBBox.minY,
      maxX = _shape$getBBox.maxX,
      maxY = _shape$getBBox.maxY;

  var start;
  var end;

  if (angle >= 0 && angle < 0.5 * Math.PI) {
    start = {
      x: minX,
      y: minY
    };
    end = {
      x: maxX,
      y: maxY
    };
  } else if (0.5 * Math.PI <= angle && angle < Math.PI) {
    start = {
      x: maxX,
      y: minY
    };
    end = {
      x: minX,
      y: maxY
    };
  } else if (Math.PI <= angle && angle < 1.5 * Math.PI) {
    start = {
      x: maxX,
      y: maxY
    };
    end = {
      x: minX,
      y: minY
    };
  } else {
    start = {
      x: minX,
      y: maxY
    };
    end = {
      x: maxX,
      y: minY
    };
  }

  var tanTheta = Math.tan(angle);
  var tanTheta2 = tanTheta * tanTheta;
  var x = (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.x;
  var y = tanTheta * (end.x - start.x + tanTheta * (end.y - start.y)) / (tanTheta2 + 1) + start.y;
  var gradient = context.createLinearGradient(start.x, start.y, x, y);

  _addStop(steps, gradient);

  return gradient;
} // the string format: 'r(0.5, 0.5, 0.1) 0:#ffffff 1:#1890ff'


function _parseRadialGradient(color, shape, context) {
  var arr = color.split(' ');
  var circleCfg = arr[0].slice(2, arr[0].length - 1);
  circleCfg = circleCfg.split(',');
  var fx = parseFloat(circleCfg[0]);
  var fy = parseFloat(circleCfg[1]);
  var fr = parseFloat(circleCfg[2]);
  var steps = arr.slice(1); // if radius is 0, no gradient, stroke with the last color

  if (fr === 0) {
    var _color = steps[steps.length - 1];
    return _color.split(':')[1];
  }

  var _shape$getBBox2 = shape.getBBox(),
      width = _shape$getBBox2.width,
      height = _shape$getBBox2.height,
      minX = _shape$getBBox2.minX,
      minY = _shape$getBBox2.minY;

  var r = Math.sqrt(width * width + height * height) / 2;
  var gradient = context.createRadialGradient(minX + width * fx, minY + height * fy, fr * r, minX + width / 2, minY + height / 2, r);

  _addStop(steps, gradient);

  return gradient;
}

function parseStyle(color, shape, context) {
  if (color[1] === '(') {
    try {
      var firstCode = color[0];

      if (firstCode === 'l') {
        return _parseLineGradient(color, shape, context);
      } else if (firstCode === 'r') {
        return _parseRadialGradient(color, shape, context);
      }
    } catch (ev) {
      console.error('error in parsing gradient string, please check if there are any extra whitespaces.');
      console.error(ev);
    }
  }

  return color;
}

var _default = {
  parseStyle: parseStyle
};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884727, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _shape = _interopRequireDefault(require("./shape"));

var _util = require("@antv/util");

function parsePadding(padding) {
  var top = 0;
  var right = 0;
  var bottom = 0;
  var left = 0;

  if ((0, _util.isNumber)(padding)) {
    top = bottom = left = right = padding;
  } else if ((0, _util.isArray)(padding)) {
    top = padding[0];
    right = !(0, _util.isNil)(padding[1]) ? padding[1] : padding[0];
    bottom = !(0, _util.isNil)(padding[2]) ? padding[2] : padding[0];
    left = !(0, _util.isNil)(padding[3]) ? padding[3] : right;
  }

  return [top, right, bottom, left];
} // 为了处理radius 大于 width 或 height 的场景


function parseRadius(radius, width, height) {
  radius = parsePadding(radius); // 都为0

  if (!radius[0] && !radius[1] && !radius[2] && !radius[3]) {
    return radius;
  }

  var minWidth = Math.max(radius[0] + radius[1], radius[2] + radius[3]);
  var minHeight = Math.max(radius[0] + radius[3], radius[1] + radius[2]);
  var scale = Math.min(width / minWidth, height / minHeight);

  if (scale < 1) {
    return radius.map(function (r) {
      return r * scale;
    });
  }

  return radius;
}

var Rect = /*#__PURE__*/function (_Shape) {
  (0, _inherits2.default)(Rect, _Shape);

  var _super = (0, _createSuper2.default)(Rect);

  function Rect() {
    (0, _classCallCheck2.default)(this, Rect);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Rect, [{
    key: "_initProperties",
    value: function _initProperties() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Rect.prototype), "_initProperties", this).call(this);
      this._attrs.canFill = true;
      this._attrs.canStroke = true;
      this._attrs.type = 'rect';
    }
  }, {
    key: "getDefaultAttrs",
    value: function getDefaultAttrs() {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        radius: 0,
        lineWidth: 0
      };
    }
  }, {
    key: "createRadiusPath",
    value: function createRadiusPath(context, x, y, width, height, radius) {
      radius = parseRadius(radius, width, height);
      context.moveTo(x + radius[0], y);
      context.lineTo(x + width - radius[1], y);
      context.arc(x + width - radius[1], y + radius[1], radius[1], -Math.PI / 2, 0, false);
      context.lineTo(x + width, y + height - radius[2]);
      context.arc(x + width - radius[2], y + height - radius[2], radius[2], 0, Math.PI / 2, false);
      context.lineTo(x + radius[3], y + height);
      context.arc(x + radius[3], y + height - radius[3], radius[3], Math.PI / 2, Math.PI, false);
      context.lineTo(x, y + radius[0]);
      context.arc(x + radius[0], y + radius[0], radius[0], Math.PI, Math.PI * 3 / 2, false);
      context.closePath();
    }
  }, {
    key: "createPath",
    value: function createPath(context) {
      var attrs = this.get('attrs');
      var x = attrs.x,
          y = attrs.y,
          width = attrs.width,
          height = attrs.height,
          radius = attrs.radius;
      context.beginPath();

      if (!radius || !(width * height)) {
        context.rect(x, y, width, height);
      } else {
        this.createRadiusPath(context, x, y, width, height, radius);
      }
    }
  }, {
    key: "calculateBox",
    value: function calculateBox() {
      var attrs = this.get('attrs');
      var x = attrs.x,
          y = attrs.y,
          width = attrs.width,
          height = attrs.height;
      return {
        minX: x,
        minY: y,
        maxX: x + width,
        maxY: y + height
      };
    }
  }]);
  return Rect;
}(_shape.default);

var _default = Rect;
exports.default = _default;
}, function(modId) { var map = {"./shape":1667025884724}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884728, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _util = require("@antv/util");

var _rect = _interopRequireDefault(require("./rect"));

var imageCaches = {};

var ImageShape = /*#__PURE__*/function (_Rect) {
  (0, _inherits2.default)(ImageShape, _Rect);

  var _super = (0, _createSuper2.default)(ImageShape);

  function ImageShape() {
    (0, _classCallCheck2.default)(this, ImageShape);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(ImageShape, [{
    key: "_initProperties",
    value: function _initProperties() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(ImageShape.prototype), "_initProperties", this).call(this);
      this._attrs.canFill = false;
      this._attrs.canStroke = false;
      this._attrs.loading = false;
      this._attrs.image = null;
      this._attrs.type = 'image';
    }
  }, {
    key: "draw",
    value: function draw(context) {
      var _this = this;

      // 如果图片还在loading中直接返回，等下次绘制
      if (this.get('loading')) {
        return;
      } // 如果已经有image对象，直接绘制，会调用createPath绘制


      var image = this.get('image');

      if (image) {
        (0, _get2.default)((0, _getPrototypeOf2.default)(ImageShape.prototype), "draw", this).call(this, context);
        return;
      }

      var attrs = this.get('attrs');
      var src = attrs.src;

      if (src) {
        var cacheImage = this.get('cacheImage'); // 如果有缓存，则直接从缓存中拿

        if (cacheImage && imageCaches[src]) {
          this.set('image', imageCaches[src]);
          this.draw(context);
          return;
        }

        var _image = null;
        var canvas = this.get('canvas');

        if (canvas && canvas.get('createImage')) {
          var createImage = canvas.get('createImage');
          _image = createImage();
        } else if (window.Image) {
          _image = new Image();
        }

        if (_image) {
          this.set('loading', true); // 设置跨域, 等同于 image.crossOrigin = 'anonymous'

          _image.crossOrigin = '';

          _image.onload = function () {
            _this.set('loading', false);

            _this.set('image', _image); // this.draw(context);
            // 这里需要调用 canvas.draw 进行重新绘制，否则 image 会一直在最上层


            canvas.draw();
          }; // src 一定要在 crossOrigin 之后，否则 toDataURL 就会报 SecurityError


          _image.src = src; // 设置全局缓存

          if (cacheImage) {
            imageCaches[src] = _image;
          }
        }
      }
    }
  }, {
    key: "createPath",
    value: function createPath(context) {
      var image = this.get('image');
      this.drawImage(context, image);
    }
  }, {
    key: "drawImage",
    value: function drawImage(context, image) {
      var _this$_attrs = this._attrs,
          attrs = _this$_attrs.attrs,
          destroyed = _this$_attrs.destroyed;

      if (destroyed) {
        return;
      }

      var x = attrs.x,
          y = attrs.y,
          width = attrs.width,
          height = attrs.height,
          sx = attrs.sx,
          sy = attrs.sy,
          swidth = attrs.swidth,
          sheight = attrs.sheight,
          radius = attrs.radius,
          fillOpacity = attrs.fillOpacity;

      if (radius) {
        context.save();
        this.createRadiusPath(context, x, y, width, height, radius);
        context.clip();
      } // 设置透明度


      var originOpacity = context.globalAlpha;

      if (!(0, _util.isNil)(fillOpacity)) {
        context.globalAlpha = fillOpacity;
      }

      if (!(0, _util.isNil)(sx) && !(0, _util.isNil)(sy) && !(0, _util.isNil)(swidth) && !(0, _util.isNil)(sheight)) {
        context.drawImage(image, sx, sy, swidth, sheight, x, y, width, height);
      } else {
        context.drawImage(image, x, y, width, height);
      }

      context.globalAlpha = originOpacity;

      if (radius) {
        // 因为 save 和 restore 会一定程度上影响绘图性能，所以只在必要是调用
        context.restore();
      }
    }
  }]);
  return ImageShape;
}(_rect.default);

var _default = ImageShape;
exports.default = _default;
}, function(modId) { var map = {"./rect":1667025884727}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884729, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _shape = _interopRequireDefault(require("./shape"));

var Circle = /*#__PURE__*/function (_Shape) {
  (0, _inherits2.default)(Circle, _Shape);

  var _super = (0, _createSuper2.default)(Circle);

  function Circle() {
    (0, _classCallCheck2.default)(this, Circle);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Circle, [{
    key: "_initProperties",
    value: function _initProperties() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Circle.prototype), "_initProperties", this).call(this);
      this._attrs.canFill = true;
      this._attrs.canStroke = true;
      this._attrs.type = 'circle';
    }
  }, {
    key: "getDefaultAttrs",
    value: function getDefaultAttrs() {
      return {
        x: 0,
        y: 0,
        r: 0,
        lineWidth: 0
      };
    }
  }, {
    key: "createPath",
    value: function createPath(context) {
      var attrs = this.get('attrs');
      var x = attrs.x,
          y = attrs.y,
          r = attrs.r;
      context.beginPath();
      context.arc(x, y, r, 0, Math.PI * 2, false);
      context.closePath();
    }
  }, {
    key: "calculateBox",
    value: function calculateBox() {
      var attrs = this.get('attrs');
      var x = attrs.x,
          y = attrs.y,
          r = attrs.r;
      return {
        minX: x - r,
        maxX: x + r,
        minY: y - r,
        maxY: y + r
      };
    }
  }]);
  return Circle;
}(_shape.default);

var _default = Circle;
exports.default = _default;
}, function(modId) { var map = {"./shape":1667025884724}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884730, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _shape = _interopRequireDefault(require("./shape"));

var _bbox = require("../../util/bbox");

var Line = /*#__PURE__*/function (_Shape) {
  (0, _inherits2.default)(Line, _Shape);

  var _super = (0, _createSuper2.default)(Line);

  function Line() {
    (0, _classCallCheck2.default)(this, Line);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Line, [{
    key: "_initProperties",
    value: function _initProperties() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Line.prototype), "_initProperties", this).call(this);
      this._attrs.canStroke = true;
      this._attrs.type = 'line';
    }
  }, {
    key: "getDefaultAttrs",
    value: function getDefaultAttrs() {
      return {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        lineWidth: 1
      };
    }
  }, {
    key: "createPath",
    value: function createPath(context) {
      var attrs = this.get('attrs');
      var x1 = attrs.x1,
          y1 = attrs.y1,
          x2 = attrs.x2,
          y2 = attrs.y2;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
    }
  }, {
    key: "calculateBox",
    value: function calculateBox() {
      var attrs = this.get('attrs');
      var x1 = attrs.x1,
          y1 = attrs.y1,
          x2 = attrs.x2,
          y2 = attrs.y2,
          lineWidth = attrs.lineWidth;
      return (0, _bbox.getBBoxFromLine)(x1, y1, x2, y2, lineWidth);
    }
  }]);
  return Line;
}(_shape.default);

var _default = Line;
exports.default = _default;
}, function(modId) { var map = {"./shape":1667025884724,"../../util/bbox":1667025884714}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884731, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _shape = _interopRequireDefault(require("./shape"));

var _bbox = require("../../util/bbox");

var Polygon = /*#__PURE__*/function (_Shape) {
  (0, _inherits2.default)(Polygon, _Shape);

  var _super = (0, _createSuper2.default)(Polygon);

  function Polygon() {
    (0, _classCallCheck2.default)(this, Polygon);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Polygon, [{
    key: "_initProperties",
    value: function _initProperties() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Polygon.prototype), "_initProperties", this).call(this);
      this._attrs.canFill = true;
      this._attrs.canStroke = true;
      this._attrs.type = 'polygon';
    }
  }, {
    key: "getDefaultAttrs",
    value: function getDefaultAttrs() {
      return {
        points: null,
        lineWidth: 0
      };
    }
  }, {
    key: "createPath",
    value: function createPath(context) {
      var attrs = this.get('attrs');
      var points = attrs.points;
      context.beginPath();

      for (var i = 0, len = points.length; i < len; i++) {
        var point = points[i];

        if (i === 0) {
          context.moveTo(point.x, point.y);
        } else {
          context.lineTo(point.x, point.y);
        }
      }

      context.closePath();
    }
  }, {
    key: "calculateBox",
    value: function calculateBox() {
      var attrs = this.get('attrs');
      var points = attrs.points;
      return (0, _bbox.getBBoxFromPoints)(points);
    }
  }]);
  return Polygon;
}(_shape.default);

var _default = Polygon;
exports.default = _default;
}, function(modId) { var map = {"./shape":1667025884724,"../../util/bbox":1667025884714}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884732, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _shape = _interopRequireDefault(require("./shape"));

var _bbox = require("../../util/bbox");

var Smooth = _interopRequireWildcard(require("../../util/smooth"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// filter the point which x or y is NaN
function _filterPoints(points) {
  var filteredPoints = [];

  for (var i = 0, len = points.length; i < len; i++) {
    var point = points[i];

    if (!isNaN(point.x) && !isNaN(point.y)) {
      filteredPoints.push(point);
    }
  }

  return filteredPoints;
}

var Polyline = /*#__PURE__*/function (_Shape) {
  (0, _inherits2.default)(Polyline, _Shape);

  var _super = (0, _createSuper2.default)(Polyline);

  function Polyline() {
    (0, _classCallCheck2.default)(this, Polyline);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Polyline, [{
    key: "_initProperties",
    value: function _initProperties() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Polyline.prototype), "_initProperties", this).call(this);
      this._attrs.canFill = true;
      this._attrs.canStroke = true;
      this._attrs.type = 'polyline';
    }
  }, {
    key: "getDefaultAttrs",
    value: function getDefaultAttrs() {
      return {
        points: null,
        lineWidth: 1,
        smooth: false
      };
    }
  }, {
    key: "createPath",
    value: function createPath(context) {
      var attrs = this.get('attrs');
      var points = attrs.points,
          smooth = attrs.smooth;

      var filteredPoints = _filterPoints(points);

      context.beginPath();

      if (filteredPoints.length) {
        context.moveTo(filteredPoints[0].x, filteredPoints[0].y);

        if (smooth) {
          var constaint = [[0, 0], [1, 1]];
          var sps = Smooth.smooth(filteredPoints, false, constaint);

          for (var i = 0, n = sps.length; i < n; i++) {
            var sp = sps[i];
            context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
          }
        } else {
          var _i;

          var l;

          for (_i = 1, l = filteredPoints.length - 1; _i < l; _i++) {
            context.lineTo(filteredPoints[_i].x, filteredPoints[_i].y);
          }

          context.lineTo(filteredPoints[l].x, filteredPoints[l].y);
        }
      }
    }
  }, {
    key: "calculateBox",
    value: function calculateBox() {
      var attrs = this.get('attrs');
      var points = attrs.points,
          smooth = attrs.smooth,
          lineWidth = attrs.lineWidth;

      var filteredPoints = _filterPoints(points);

      if (smooth) {
        var newPoints = [];
        var constaint = [[0, 0], [1, 1]];
        var sps = Smooth.smooth(filteredPoints, false, constaint);

        for (var i = 0, n = sps.length; i < n; i++) {
          var sp = sps[i];

          if (i === 0) {
            newPoints.push([filteredPoints[0].x, filteredPoints[0].y, sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
          } else {
            var lastPoint = sps[i - 1];
            newPoints.push([lastPoint[5], lastPoint[6], sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]]);
          }
        }

        return (0, _bbox.getBBoxFromBezierGroup)(newPoints, lineWidth);
      }

      return (0, _bbox.getBBoxFromPoints)(filteredPoints, lineWidth);
    }
  }]);
  return Polyline;
}(_shape.default);

var _default = Polyline;
exports.default = _default;
}, function(modId) { var map = {"./shape":1667025884724,"../../util/bbox":1667025884714,"../../util/smooth":1667025884713}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884733, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _shape = _interopRequireDefault(require("./shape"));

var _bbox = require("../../util/bbox");

var Arc = /*#__PURE__*/function (_Shape) {
  (0, _inherits2.default)(Arc, _Shape);

  var _super = (0, _createSuper2.default)(Arc);

  function Arc() {
    (0, _classCallCheck2.default)(this, Arc);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Arc, [{
    key: "_initProperties",
    value: function _initProperties() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Arc.prototype), "_initProperties", this).call(this);
      this._attrs.canStroke = true;
      this._attrs.canFill = true;
      this._attrs.type = 'arc';
    }
  }, {
    key: "getDefaultAttrs",
    value: function getDefaultAttrs() {
      return {
        x: 0,
        y: 0,
        r: 0,
        startAngle: 0,
        endAngle: Math.PI * 2,
        anticlockwise: false,
        lineWidth: 1
      };
    }
  }, {
    key: "createPath",
    value: function createPath(context) {
      var attrs = this.get('attrs');
      var x = attrs.x,
          y = attrs.y,
          r = attrs.r,
          startAngle = attrs.startAngle,
          endAngle = attrs.endAngle,
          anticlockwise = attrs.anticlockwise;
      context.beginPath();

      if (startAngle !== endAngle) {
        context.arc(x, y, r, startAngle, endAngle, anticlockwise);
      }
    }
  }, {
    key: "calculateBox",
    value: function calculateBox() {
      var attrs = this.get('attrs');
      var x = attrs.x,
          y = attrs.y,
          r = attrs.r,
          startAngle = attrs.startAngle,
          endAngle = attrs.endAngle,
          anticlockwise = attrs.anticlockwise;
      return (0, _bbox.getBBoxFromArc)(x, y, r, startAngle, endAngle, anticlockwise);
    }
  }]);
  return Arc;
}(_shape.default);

var _default = Arc;
exports.default = _default;
}, function(modId) { var map = {"./shape":1667025884724,"../../util/bbox":1667025884714}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884734, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _shape = _interopRequireDefault(require("./shape"));

var _bbox = require("../../util/bbox");

var Sector = /*#__PURE__*/function (_Shape) {
  (0, _inherits2.default)(Sector, _Shape);

  var _super = (0, _createSuper2.default)(Sector);

  function Sector() {
    (0, _classCallCheck2.default)(this, Sector);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Sector, [{
    key: "_initProperties",
    value: function _initProperties() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Sector.prototype), "_initProperties", this).call(this);
      this._attrs.canFill = true;
      this._attrs.canStroke = true;
      this._attrs.type = 'sector';
    }
  }, {
    key: "getDefaultAttrs",
    value: function getDefaultAttrs() {
      return {
        x: 0,
        y: 0,
        lineWidth: 0,
        r: 0,
        r0: 0,
        startAngle: 0,
        endAngle: Math.PI * 2,
        anticlockwise: false
      };
    }
  }, {
    key: "createPath",
    value: function createPath(context) {
      var attrs = this.get('attrs');
      var x = attrs.x,
          y = attrs.y,
          startAngle = attrs.startAngle,
          r = attrs.r,
          r0 = attrs.r0,
          anticlockwise = attrs.anticlockwise; // 最大为整个圆

      var endAngle = Math.min(attrs.endAngle, startAngle + Math.PI * 2);
      context.beginPath();
      var unitX = Math.cos(startAngle);
      var unitY = Math.sin(startAngle);
      context.moveTo(unitX * r0 + x, unitY * r0 + y);
      context.lineTo(unitX * r + x, unitY * r + y); // 当扇形的角度非常小的时候，就不进行弧线的绘制；或者整个只有1个扇形时，会出现end<0的情况不绘制

      if (Math.abs(endAngle - startAngle) > 0.0001 || startAngle === 0 && endAngle < 0) {
        context.arc(x, y, r, startAngle, endAngle, anticlockwise);
        context.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y);

        if (r0 !== 0) {
          context.arc(x, y, r0, endAngle, startAngle, !anticlockwise);
        }
      }

      context.closePath();
    }
  }, {
    key: "calculateBox",
    value: function calculateBox() {
      var attrs = this.get('attrs');
      var x = attrs.x,
          y = attrs.y,
          r = attrs.r,
          r0 = attrs.r0,
          startAngle = attrs.startAngle,
          endAngle = attrs.endAngle,
          anticlockwise = attrs.anticlockwise;
      var outerBBox = (0, _bbox.getBBoxFromArc)(x, y, r, startAngle, endAngle, anticlockwise);
      var innerBBox = (0, _bbox.getBBoxFromArc)(x, y, r0, startAngle, endAngle, anticlockwise);
      return {
        minX: Math.min(outerBBox.minX, innerBBox.minX),
        minY: Math.min(outerBBox.minY, innerBBox.minY),
        maxX: Math.max(outerBBox.maxX, innerBBox.maxX),
        maxY: Math.max(outerBBox.maxY, innerBBox.maxY)
      };
    }
  }]);
  return Sector;
}(_shape.default);

var _default = Sector;
exports.default = _default;
}, function(modId) { var map = {"./shape":1667025884724,"../../util/bbox":1667025884714}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884735, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _util = require("@antv/util");

var DOMUtil = _interopRequireWildcard(require("../../util/dom"));

var _shape = _interopRequireDefault(require("./shape"));

var _rect = _interopRequireDefault(require("../../util/rect"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var measureText = DOMUtil.measureText;
var textWidthCacheCounter = 0;
var textWidthCache = {};
var TEXT_CACHE_MAX = 5000;

var Text = /*#__PURE__*/function (_Shape) {
  (0, _inherits2.default)(Text, _Shape);

  var _super = (0, _createSuper2.default)(Text);

  function Text() {
    (0, _classCallCheck2.default)(this, Text);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Text, [{
    key: "_initProperties",
    value: function _initProperties() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Text.prototype), "_initProperties", this).call(this);
      this._attrs.canFill = true;
      this._attrs.canStroke = true;
      this._attrs.type = 'text';
    }
  }, {
    key: "getDefaultAttrs",
    value: function getDefaultAttrs() {
      return {
        lineWidth: 0,
        lineCount: 1,
        fontSize: 12,
        fontFamily: '',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontVariant: 'normal',
        textAlign: 'start',
        textBaseline: 'bottom',
        lineHeight: null,
        textArr: null
      };
    }
  }, {
    key: "_getFontStyle",
    value: function _getFontStyle() {
      var attrs = this._attrs.attrs;
      var fontSize = attrs.fontSize,
          fontFamily = attrs.fontFamily,
          fontWeight = attrs.fontWeight,
          fontStyle = attrs.fontStyle,
          fontVariant = attrs.fontVariant;
      return "".concat(fontStyle, " ").concat(fontVariant, " ").concat(fontWeight, " ").concat(fontSize, "px ").concat(fontFamily);
    }
  }, {
    key: "_afterAttrsSet",
    value: function _afterAttrsSet() {
      var attrs = this._attrs.attrs;
      attrs.font = this._getFontStyle();

      if (attrs.text) {
        var text = attrs.text;
        var textArr = null;
        var lineCount = 1;

        if ((0, _util.isString)(text) && text.indexOf('\n') !== -1) {
          textArr = text.split('\n');
          lineCount = textArr.length;
        }

        attrs.lineCount = lineCount;
        attrs.textArr = textArr;
      }

      this.set('attrs', attrs);
    }
  }, {
    key: "_getTextHeight",
    value: function _getTextHeight() {
      var attrs = this._attrs.attrs;

      if (attrs.height) {
        return attrs.height;
      }

      var lineCount = attrs.lineCount;
      var fontSize = attrs.fontSize * 1;

      if (lineCount > 1) {
        var spaceingY = this._getSpaceingY();

        return fontSize * lineCount + spaceingY * (lineCount - 1);
      }

      return fontSize;
    }
  }, {
    key: "_getSpaceingY",
    value: function _getSpaceingY() {
      var attrs = this._attrs.attrs;
      var lineHeight = attrs.lineHeight;
      var fontSize = attrs.fontSize * 1;
      return lineHeight ? lineHeight - fontSize : fontSize * 0.14;
    }
  }, {
    key: "drawInner",
    value: function drawInner(context) {
      var attrs = this._attrs.attrs;
      var text = attrs.text;
      var x = attrs.x;
      var y = attrs.y;

      if ((0, _util.isNil)(text) || isNaN(x) || isNaN(y)) {
        // text will be 0
        return;
      }

      var textArr = attrs.textArr;
      var fontSize = attrs.fontSize * 1;

      var spaceingY = this._getSpaceingY();

      if (attrs.rotate) {
        // do rotation
        context.translate(x, y);
        context.rotate(attrs.rotate);
        x = 0;
        y = 0;
      }

      var textBaseline = attrs.textBaseline;
      var height;

      if (textArr) {
        height = this._getTextHeight();
      }

      var subY; // context.beginPath();

      if (this.hasFill()) {
        var fillOpacity = attrs.fillOpacity;

        if (!(0, _util.isNil)(fillOpacity) && fillOpacity !== 1) {
          context.globalAlpha = fillOpacity;
        }

        if (textArr) {
          for (var i = 0, len = textArr.length; i < len; i++) {
            var subText = textArr[i];
            subY = y + i * (spaceingY + fontSize) - height + fontSize; // bottom;

            if (textBaseline === 'middle') {
              subY += height - fontSize - (height - fontSize) / 2;
            }

            if (textBaseline === 'top') {
              subY += height - fontSize;
            }

            context.fillText(subText, x, subY);
          }
        } else {
          context.fillText(text, x, y);
        }
      }

      if (this.hasStroke()) {
        if (textArr) {
          for (var _i = 0, _len = textArr.length; _i < _len; _i++) {
            var _subText = textArr[_i];
            subY = y + _i * (spaceingY + fontSize) - height + fontSize; // bottom;

            if (textBaseline === 'middle') {
              subY += height - fontSize - (height - fontSize) / 2;
            }

            if (textBaseline === 'top') {
              subY += height - fontSize;
            }

            context.strokeText(_subText, x, subY);
          }
        } else {
          context.strokeText(text, x, y);
        }
      }
    }
  }, {
    key: "_getAriaLabel",
    value: function _getAriaLabel() {
      return this._attrs.attrs.text;
    }
  }, {
    key: "calculateBox",
    value: function calculateBox() {
      var attrs = this._attrs.attrs;
      var x = attrs.x,
          y = attrs.y,
          textAlign = attrs.textAlign,
          textBaseline = attrs.textBaseline;

      var width = this._getTextWidth(); // attrs.width


      if (!width) {
        return {
          minX: x,
          minY: y,
          maxX: x,
          maxY: y
        };
      }

      var height = this._getTextHeight(); // attrs.height


      if (attrs.rotate) {
        var rotatedBox = _rect.default.calcRotatedBox({
          width: width,
          height: height,
          rotate: attrs.rotate
        });

        width = rotatedBox.width;
        height = rotatedBox.height;
      }

      var point = {
        x: x,
        y: y - height
      }; // default textAlign: start, textBaseline: bottom

      if (textAlign) {
        if (textAlign === 'end' || textAlign === 'right') {
          point.x -= width;
        } else if (textAlign === 'center') {
          point.x -= width / 2;
        }
      }

      if (textBaseline) {
        if (textBaseline === 'top') {
          point.y += height;
        } else if (textBaseline === 'middle') {
          point.y += height / 2;
        }
      }

      return {
        minX: point.x,
        minY: point.y,
        maxX: point.x + width,
        maxY: point.y + height
      };
    }
  }, {
    key: "_getTextWidth",
    value: function _getTextWidth() {
      var attrs = this._attrs.attrs;

      if (attrs.width) {
        return attrs.width;
      }

      var text = attrs.text;
      var context = this.get('context');
      if ((0, _util.isNil)(text)) return undefined;
      var font = attrs.font;
      var textArr = attrs.textArr;
      var key = text + '' + font;

      if (textWidthCache[key]) {
        return textWidthCache[key];
      }

      var width = 0;

      if (textArr) {
        for (var i = 0, length = textArr.length; i < length; i++) {
          var subText = textArr[i];
          width = Math.max(width, measureText(subText, font, context).width);
        }
      } else {
        width = measureText(text, font, context).width;
      }

      if (textWidthCacheCounter > TEXT_CACHE_MAX) {
        textWidthCacheCounter = 0;
        textWidthCache = {};
      }

      textWidthCacheCounter++;
      textWidthCache[key] = width;
      return width;
    }
  }]);
  return Text;
}(_shape.default);

var _default = Text;
exports.default = _default;
}, function(modId) { var map = {"../../util/dom":1667025884719,"./shape":1667025884724,"../../util/rect":1667025884736}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884736, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Rect = {
  calcRotatedBox: function calcRotatedBox(_ref) {
    var width = _ref.width,
        height = _ref.height,
        rotate = _ref.rotate;
    var absRotate = Math.abs(rotate);
    return {
      width: Math.abs(width * Math.cos(absRotate) + height * Math.sin(absRotate)),
      height: Math.abs(height * Math.cos(absRotate) + width * Math.sin(absRotate))
    };
  }
};
var _default = Rect;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884737, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _shape = _interopRequireDefault(require("./shape"));

var Custom = /*#__PURE__*/function (_Shape) {
  (0, _inherits2.default)(Custom, _Shape);

  var _super = (0, _createSuper2.default)(Custom);

  function Custom() {
    (0, _classCallCheck2.default)(this, Custom);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Custom, [{
    key: "_initProperties",
    value: function _initProperties() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Custom.prototype), "_initProperties", this).call(this);
      this._attrs.canFill = true;
      this._attrs.canStroke = true;
      this._attrs.createPath = null;
      this._attrs.type = 'custom';
    }
  }, {
    key: "createPath",
    value: function createPath(context) {
      var createPath = this.get('createPath');
      createPath && createPath.call(this, context);
    }
  }, {
    key: "calculateBox",
    value: function calculateBox() {
      var calculateBox = this.get('calculateBox');
      return calculateBox && calculateBox.call(this);
    }
  }]);
  return Custom;
}(_shape.default);

var _default = Custom;
exports.default = _default;
}, function(modId) { var map = {"./shape":1667025884724}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884738, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _util = require("@antv/util");

var _shape = _interopRequireDefault(require("./shape"));

/**
 * marker shapes，used for tooltip and legend
 */
var SYMBOLS = {
  circle: function circle(x, y, r, ctx) {
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
  },
  square: function square(x, y, r, ctx) {
    ctx.moveTo(x - r, y - r);
    ctx.lineTo(x + r, y - r);
    ctx.lineTo(x + r, y + r);
    ctx.lineTo(x - r, y + r);
    ctx.closePath();
  }
};

var Marker = /*#__PURE__*/function (_Shape) {
  (0, _inherits2.default)(Marker, _Shape);

  var _super = (0, _createSuper2.default)(Marker);

  function Marker() {
    (0, _classCallCheck2.default)(this, Marker);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Marker, [{
    key: "_initProperties",
    value: function _initProperties() {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Marker.prototype), "_initProperties", this).call(this);
      this._attrs.canFill = true;
      this._attrs.canStroke = true;
      this._attrs.type = 'marker';
    }
  }, {
    key: "getDefaultAttrs",
    value: function getDefaultAttrs() {
      return {
        x: 0,
        y: 0,
        lineWidth: 0
      };
    }
  }, {
    key: "createPath",
    value: function createPath(context) {
      var attrs = this.get('attrs');
      var x = attrs.x,
          y = attrs.y,
          radius = attrs.radius;
      var symbol = attrs.symbol || 'circle';
      var method;

      if ((0, _util.isFunction)(symbol)) {
        method = symbol;
      } else {
        method = SYMBOLS[symbol];
      }

      context.beginPath();
      method(x, y, radius, context, this);
    }
  }, {
    key: "calculateBox",
    value: function calculateBox() {
      var attrs = this.get('attrs');
      var x = attrs.x,
          y = attrs.y,
          radius = attrs.radius;
      return {
        minX: x - radius,
        minY: y - radius,
        maxX: x + radius,
        maxY: y + radius
      };
    }
  }]);
  return Marker;
}(_shape.default);

var _default = Marker;
exports.default = _default;
}, function(modId) { var map = {"./shape":1667025884724}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884739, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var _util = require("@antv/util");

var _rect = _interopRequireDefault(require("./shape/rect"));

var _container = _interopRequireDefault(require("./container"));

var _vector = _interopRequireDefault(require("../util/vector2"));

var Group = /*#__PURE__*/function (_Rect) {
  (0, _inherits2.default)(Group, _Rect);

  var _super = (0, _createSuper2.default)(Group);

  function Group() {
    (0, _classCallCheck2.default)(this, Group);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Group, [{
    key: "_initProperties",
    value:
    /* eslint-enable */
    function _initProperties() {
      this._attrs = {
        type: 'group',
        zIndex: 0,
        visible: true,
        destroyed: false,
        isGroup: true,
        canFill: true,
        canStroke: true,
        children: [],
        attrs: {
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          radius: 0,
          lineWidth: 0
        }
      };
    }
  }, {
    key: "getBBox",
    value: function getBBox() {
      var minX = Infinity;
      var maxX = -Infinity;
      var minY = Infinity;
      var maxY = -Infinity;
      var children = this.get('children');

      for (var i = 0, length = children.length; i < length; i++) {
        var child = children[i];

        if (child.get('visible')) {
          var box = child.getBBox();

          if (!box) {
            continue;
          }

          var leftTop = [box.minX, box.minY];
          var leftBottom = [box.minX, box.maxY];
          var rightTop = [box.maxX, box.minY];
          var rightBottom = [box.maxX, box.maxY];
          var matrix = child.attr('matrix');

          _vector.default.transformMat2d(leftTop, leftTop, matrix);

          _vector.default.transformMat2d(leftBottom, leftBottom, matrix);

          _vector.default.transformMat2d(rightTop, rightTop, matrix);

          _vector.default.transformMat2d(rightBottom, rightBottom, matrix);

          minX = Math.min(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], minX);
          maxX = Math.max(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], maxX);
          minY = Math.min(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], minY);
          maxY = Math.max(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], maxY);
        }
      }

      return {
        minX: minX,
        minY: minY,
        maxX: maxX,
        maxY: maxY,
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY
      };
    }
  }, {
    key: "createPath",
    value: function createPath(context) {
      var attrs = this.get('attrs'); // 只有在有fillStyle或strokeStyle 时才需要绘制

      if (!attrs.fillStyle && !attrs.strokeStyle) {
        return;
      }

      (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "createPath", this).call(this, context);
    }
  }, {
    key: "drawInner",
    value: function drawInner(context) {
      (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "drawInner", this).call(this, context);
      this.drawChildren(context);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.get('destroyed')) {
        return;
      }

      this.clear();
      (0, _get2.default)((0, _getPrototypeOf2.default)(Group.prototype), "destroy", this).call(this);
    }
  }]);
  return Group;
}(_rect.default); // @ts-ignore


(0, _util.mix)(Group.prototype, _container.default, {
  getGroupClass: function getGroupClass() {
    return Group;
  }
});
var _default = Group;
exports.default = _default;
}, function(modId) { var map = {"./shape/rect":1667025884727,"./container":1667025884721,"../util/vector2":1667025884712}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884740, function(require, module, exports) {


var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestAnimationFrame = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var requestAnimationFrame = (typeof window === "undefined" ? "undefined" : (0, _typeof2.default)(window)) === 'object' && window.requestAnimationFrame ? window.requestAnimationFrame : function (fn) {
  return setTimeout(fn, 16);
};
exports.requestAnimationFrame = requestAnimationFrame;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884741, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  general: {
    title: '这是一个图表，',
    withTitle: '这是一个关于“{title}”的图表。'
  },
  coord: {
    cartesian: 'X轴是{xLabel}Y轴是{yLabel}' // polar: '弧度是{xLabel}半径是{yLabel}'

  },
  scale: {
    linear: '数值型，数据最小值为{min}，最大值为{max}；',
    cat: '分类型, 分类类型有：{values}；',
    timeCat: '时间型，时间范围从{start}到{end}；'
  },
  geometry: {
    prefix: '共有{count}种分类组成，',
    oneData: '第{index}类是{name}，数据是{values};',
    partData: '第{index}类是{name}，共有{count}项数据，前{part}项是{values};',
    allData: '第{index}类是{name}，有{count}项数据，分别是{values};'
  },
  legend: {
    prefix: '图例分类有：'
  }
};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884742, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1667025884710);
})()
//miniprogram-npm-outsideDeps=["@babel/runtime/helpers/interopRequireDefault","@babel/runtime/helpers/typeof","@babel/runtime/helpers/classCallCheck","@babel/runtime/helpers/createClass","@babel/runtime/helpers/inherits","@babel/runtime/helpers/createSuper","@antv/util","@babel/runtime/helpers/objectSpread2","@babel/runtime/helpers/get","@babel/runtime/helpers/getPrototypeOf"]
//# sourceMappingURL=index.js.map