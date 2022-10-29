module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1667025884700, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.Adjust = exports.registerAdjust = exports.getAdjust = void 0;
var tslib_1 = require("tslib");
var factory_1 = require("./factory");
Object.defineProperty(exports, "getAdjust", { enumerable: true, get: function () { return factory_1.getAdjust; } });
Object.defineProperty(exports, "registerAdjust", { enumerable: true, get: function () { return factory_1.registerAdjust; } });
var adjust_1 = require("./adjusts/adjust");
exports.Adjust = adjust_1.default;
var dodge_1 = require("./adjusts/dodge");
var jitter_1 = require("./adjusts/jitter");
var stack_1 = require("./adjusts/stack");
var symmetric_1 = require("./adjusts/symmetric");
// 注册内置的 adjust
factory_1.registerAdjust('Dodge', dodge_1.default);
factory_1.registerAdjust('Jitter', jitter_1.default);
factory_1.registerAdjust('Stack', stack_1.default);
factory_1.registerAdjust('Symmetric', symmetric_1.default);
tslib_1.__exportStar(require("./interface"), exports);
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./factory":1667025884701,"./adjusts/adjust":1667025884702,"./adjusts/dodge":1667025884705,"./adjusts/jitter":1667025884706,"./adjusts/stack":1667025884707,"./adjusts/symmetric":1667025884708,"./interface":1667025884704}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884701, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.Adjust = exports.registerAdjust = exports.getAdjust = void 0;
var tslib_1 = require("tslib");
var adjust_1 = require("./adjusts/adjust");
exports.Adjust = adjust_1.default;
var ADJUST_MAP = {};
/**
 * 根据类型获取 Adjust 类
 * @param type
 */
var getAdjust = function (type) {
    return ADJUST_MAP[type.toLowerCase()];
};
exports.getAdjust = getAdjust;
/**
 * 注册自定义 Adjust
 * @param type
 * @param ctor
 */
var registerAdjust = function (type, ctor) {
    // 注册的时候，需要校验 type 重名，不区分大小写
    if (getAdjust(type)) {
        throw new Error("Adjust type '" + type + "' existed.");
    }
    // 存储到 map 中
    ADJUST_MAP[type.toLowerCase()] = ctor;
};
exports.registerAdjust = registerAdjust;
tslib_1.__exportStar(require("./interface"), exports);
//# sourceMappingURL=factory.js.map
}, function(modId) { var map = {"./adjusts/adjust":1667025884702,"./interface":1667025884704}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884702, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("@antv/util");
var constant_1 = require("../constant");
var Adjust = /** @class */ (function () {
    function Adjust(cfg) {
        var xField = cfg.xField, yField = cfg.yField, _a = cfg.adjustNames, adjustNames = _a === void 0 ? ['x', 'y'] : _a, dimValuesMap = cfg.dimValuesMap;
        this.adjustNames = adjustNames;
        this.xField = xField;
        this.yField = yField;
        this.dimValuesMap = dimValuesMap;
    }
    /**
     * 查看维度是否是 adjust 字段
     * @param dim
     */
    Adjust.prototype.isAdjust = function (dim) {
        return this.adjustNames.indexOf(dim) >= 0;
    };
    Adjust.prototype.getAdjustRange = function (dim, dimValue, values) {
        var yField = this.yField;
        var index = values.indexOf(dimValue);
        var length = values.length;
        var pre;
        var next;
        // 没有 y 字段，但是需要根据 y 调整
        if (!yField && this.isAdjust('y')) {
            pre = 0;
            next = 1;
        }
        else if (length > 1) {
            // 如果以其开头，则取之，否则取他前面一个
            pre = values[index === 0 ? 0 : index - 1];
            // 如果以其结尾，则取之，否则取他后面一个
            next = values[index === length - 1 ? length - 1 : index + 1];
            if (index !== 0) {
                pre += (dimValue - pre) / 2;
            }
            else {
                pre -= (next - dimValue) / 2;
            }
            if (index !== length - 1) {
                next -= (next - dimValue) / 2;
            }
            else {
                next += (dimValue - values[length - 2]) / 2;
            }
        }
        else {
            pre = dimValue === 0 ? 0 : dimValue - 0.5;
            next = dimValue === 0 ? 1 : dimValue + 0.5;
        }
        return {
            pre: pre,
            next: next,
        };
    };
    Adjust.prototype.adjustData = function (groupedDataArray, mergedData) {
        var _this = this;
        // 所有调整维度的值数组
        var dimValuesMap = this.getDimValues(mergedData);
        // 按照每一个分组来进行调整
        _.each(groupedDataArray, function (dataArray, index) {
            // 遍历所有数据集合
            // 每个分组中，分别按照不同的 dim 进行调整
            _.each(dimValuesMap, function (values, dim) {
                // 根据不同的度量分别调整位置
                _this.adjustDim(dim, values, dataArray, index);
            });
        });
    };
    /**
     * 对数据进行分组adjustData
     * @param data 数据
     * @param dim 分组的字段
     * @return 分组结果
     */
    Adjust.prototype.groupData = function (data, dim) {
        // 补齐数据空数据为默认值
        _.each(data, function (record) {
            if (record[dim] === undefined) {
                record[dim] = constant_1.DEFAULT_Y;
            }
        });
        // 按照 dim 维度分组
        return _.groupBy(data, dim);
    };
    /** @override */
    Adjust.prototype.adjustDim = function (dim, values, data, index) { };
    /**
     * 获取可调整度量对应的值
     * @param mergedData 数据
     * @return 值的映射
     */
    Adjust.prototype.getDimValues = function (mergedData) {
        var _a = this, xField = _a.xField, yField = _a.yField;
        var dimValuesMap = _.assign({}, this.dimValuesMap);
        // 所有的维度
        var dims = [];
        if (xField && this.isAdjust('x')) {
            dims.push(xField);
        }
        if (yField && this.isAdjust('y')) {
            dims.push(yField);
        }
        dims.forEach(function (dim) {
            if (dimValuesMap && dimValuesMap[dim]) {
                return;
            }
            // 在每个维度上，所有的值
            dimValuesMap[dim] = _.valuesOfKey(mergedData, dim).sort(function (v1, v2) { return v1 - v2; });
        });
        // 只有一维的情况下，同时调整 y，赋予默认值
        if (!yField && this.isAdjust('y')) {
            var dim = 'y';
            dimValuesMap[dim] = [constant_1.DEFAULT_Y, 1]; // 默认分布在 y 轴的 0 与 1 之间
        }
        return dimValuesMap;
    };
    return Adjust;
}());
exports.default = Adjust;
//# sourceMappingURL=adjust.js.map
}, function(modId) { var map = {"../constant":1667025884703}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884703, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.GAP = exports.DODGE_RATIO = exports.MARGIN_RATIO = exports.DEFAULT_Y = void 0;
exports.DEFAULT_Y = 0; // 默认的 y 的值
// 偏移之后，间距
exports.MARGIN_RATIO = 1 / 2;
exports.DODGE_RATIO = 1 / 2;
// 散点分开之后，距离边界的距离
exports.GAP = 0.05;
//# sourceMappingURL=constant.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884704, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=interface.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884705, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _ = require("@antv/util");
var constant_1 = require("../constant");
var adjust_1 = require("./adjust");
var Dodge = /** @class */ (function (_super) {
    tslib_1.__extends(Dodge, _super);
    function Dodge(cfg) {
        var _this = _super.call(this, cfg) || this;
        _this.cacheMap = {};
        _this.adjustDataArray = [];
        _this.mergeData = [];
        var _a = cfg.marginRatio, marginRatio = _a === void 0 ? constant_1.MARGIN_RATIO : _a, _b = cfg.dodgeRatio, dodgeRatio = _b === void 0 ? constant_1.DODGE_RATIO : _b, dodgeBy = cfg.dodgeBy, intervalPadding = cfg.intervalPadding, dodgePadding = cfg.dodgePadding, xDimensionLength = cfg.xDimensionLength, groupNum = cfg.groupNum, defaultSize = cfg.defaultSize, maxColumnWidth = cfg.maxColumnWidth, minColumnWidth = cfg.minColumnWidth, columnWidthRatio = cfg.columnWidthRatio, customOffset = cfg.customOffset;
        _this.marginRatio = marginRatio;
        _this.dodgeRatio = dodgeRatio;
        _this.dodgeBy = dodgeBy;
        _this.intervalPadding = intervalPadding;
        _this.dodgePadding = dodgePadding;
        _this.xDimensionLegenth = xDimensionLength;
        _this.groupNum = groupNum;
        _this.defaultSize = defaultSize;
        _this.maxColumnWidth = maxColumnWidth;
        _this.minColumnWidth = minColumnWidth;
        _this.columnWidthRatio = columnWidthRatio;
        _this.customOffset = customOffset;
        return _this;
    }
    Dodge.prototype.process = function (groupDataArray) {
        var groupedDataArray = _.clone(groupDataArray);
        // 将数据数组展开一层
        var mergeData = _.flatten(groupedDataArray);
        var dodgeBy = this.dodgeBy;
        // 如果指定了分组 dim 的字段
        var adjustDataArray = dodgeBy ? _.group(mergeData, dodgeBy) : groupedDataArray;
        this.cacheMap = {};
        this.adjustDataArray = adjustDataArray;
        this.mergeData = mergeData;
        this.adjustData(adjustDataArray, mergeData);
        this.adjustDataArray = [];
        this.mergeData = [];
        return groupedDataArray;
    };
    Dodge.prototype.adjustDim = function (dim, values, data, frameIndex) {
        var _this = this;
        var customOffset = this.customOffset;
        var map = this.getDistribution(dim);
        var groupData = this.groupData(data, dim); // 根据值分组
        _.each(groupData, function (group, key) {
            var range;
            // xField 中只有一个值，不需要做 dodge
            if (values.length === 1) {
                range = {
                    pre: values[0] - 1,
                    next: values[0] + 1,
                };
            }
            else {
                // 如果有多个，则需要获取调整的范围
                range = _this.getAdjustRange(dim, parseFloat(key), values);
            }
            _.each(group, function (d) {
                var value = d[dim];
                var valueArr = map[value];
                var valIndex = valueArr.indexOf(frameIndex);
                if (!_.isNil(customOffset)) {
                    var pre = range.pre, next = range.next;
                    d[dim] = _.isFunction(customOffset) ? customOffset(d, range) : (pre + next) / 2 + customOffset;
                }
                else {
                    d[dim] = _this.getDodgeOffset(range, valIndex, valueArr.length);
                }
            });
        });
        return [];
    };
    Dodge.prototype.getDodgeOffset = function (range, idx, len) {
        var _a = this, dodgeRatio = _a.dodgeRatio, marginRatio = _a.marginRatio, intervalPadding = _a.intervalPadding, dodgePadding = _a.dodgePadding;
        var pre = range.pre, next = range.next;
        var tickLength = next - pre;
        var position;
        // 分多种输入情况
        if (!_.isNil(intervalPadding) && _.isNil(dodgePadding) && intervalPadding >= 0) {
            // 仅配置intervalPadding
            var offset = this.getIntervalOnlyOffset(len, idx);
            position = pre + offset;
        }
        else if (!_.isNil(dodgePadding) && _.isNil(intervalPadding) && dodgePadding >= 0) {
            // 仅配置dodgePadding
            var offset = this.getDodgeOnlyOffset(len, idx);
            position = pre + offset;
        }
        else if (!_.isNil(intervalPadding) &&
            !_.isNil(dodgePadding) &&
            intervalPadding >= 0 &&
            dodgePadding >= 0) {
            // 同时配置intervalPadding和dodgePadding
            var offset = this.getIntervalAndDodgeOffset(len, idx);
            position = pre + offset;
        }
        else {
            // 默认情况
            var width = (tickLength * dodgeRatio) / len;
            var margin = marginRatio * width;
            var offset = (1 / 2) * (tickLength - len * width - (len - 1) * margin) +
                ((idx + 1) * width + idx * margin) -
                (1 / 2) * width -
                (1 / 2) * tickLength;
            position = (pre + next) / 2 + offset;
        }
        return position;
    };
    Dodge.prototype.getIntervalOnlyOffset = function (len, idx) {
        var _a = this, defaultSize = _a.defaultSize, intervalPadding = _a.intervalPadding, xDimensionLegenth = _a.xDimensionLegenth, groupNum = _a.groupNum, dodgeRatio = _a.dodgeRatio, maxColumnWidth = _a.maxColumnWidth, minColumnWidth = _a.minColumnWidth, columnWidthRatio = _a.columnWidthRatio;
        var normalizedIntervalPadding = intervalPadding / xDimensionLegenth;
        var normalizedDodgePadding = (1 - (groupNum - 1) * normalizedIntervalPadding) / groupNum * dodgeRatio / (len - 1);
        var geomWidth = ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum - normalizedDodgePadding * (len - 1)) / len;
        // 根据columnWidthRatio/defaultSize/maxColumnWidth/minColumnWidth调整宽度
        geomWidth = (!_.isNil(columnWidthRatio)) ? 1 / groupNum / len * columnWidthRatio : geomWidth;
        if (!_.isNil(maxColumnWidth)) {
            var normalizedMaxWidht = maxColumnWidth / xDimensionLegenth;
            geomWidth = Math.min(geomWidth, normalizedMaxWidht);
        }
        if (!_.isNil(minColumnWidth)) {
            var normalizedMinWidht = minColumnWidth / xDimensionLegenth;
            geomWidth = Math.max(geomWidth, normalizedMinWidht);
        }
        geomWidth = defaultSize ? (defaultSize / xDimensionLegenth) : geomWidth;
        // 调整组内间隔
        normalizedDodgePadding = ((1 - (groupNum - 1) * normalizedIntervalPadding) / groupNum - len * geomWidth) / (len - 1);
        var offset = ((1 / 2 + idx) * geomWidth + idx * normalizedDodgePadding +
            (1 / 2) * normalizedIntervalPadding) * groupNum -
            normalizedIntervalPadding / 2;
        return offset;
    };
    Dodge.prototype.getDodgeOnlyOffset = function (len, idx) {
        var _a = this, defaultSize = _a.defaultSize, dodgePadding = _a.dodgePadding, xDimensionLegenth = _a.xDimensionLegenth, groupNum = _a.groupNum, marginRatio = _a.marginRatio, maxColumnWidth = _a.maxColumnWidth, minColumnWidth = _a.minColumnWidth, columnWidthRatio = _a.columnWidthRatio;
        var normalizedDodgePadding = dodgePadding / xDimensionLegenth;
        var normalizedIntervalPadding = 1 * marginRatio / (groupNum - 1);
        var geomWidth = ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum - normalizedDodgePadding * (len - 1)) / len;
        // 根据columnWidthRatio/defaultSize/maxColumnWidth/minColumnWidth调整宽度
        geomWidth = columnWidthRatio ? 1 / groupNum / len * columnWidthRatio : geomWidth;
        if (!_.isNil(maxColumnWidth)) {
            var normalizedMaxWidht = maxColumnWidth / xDimensionLegenth;
            geomWidth = Math.min(geomWidth, normalizedMaxWidht);
        }
        if (!_.isNil(minColumnWidth)) {
            var normalizedMinWidht = minColumnWidth / xDimensionLegenth;
            geomWidth = Math.max(geomWidth, normalizedMinWidht);
        }
        geomWidth = defaultSize ? (defaultSize / xDimensionLegenth) : geomWidth;
        // 调整组间距
        normalizedIntervalPadding = (1 - (geomWidth * len + normalizedDodgePadding * (len - 1)) * groupNum) / (groupNum - 1);
        var offset = ((1 / 2 + idx) * geomWidth + idx * normalizedDodgePadding +
            (1 / 2) * normalizedIntervalPadding) * groupNum -
            normalizedIntervalPadding / 2;
        return offset;
    };
    Dodge.prototype.getIntervalAndDodgeOffset = function (len, idx) {
        var _a = this, intervalPadding = _a.intervalPadding, dodgePadding = _a.dodgePadding, xDimensionLegenth = _a.xDimensionLegenth, groupNum = _a.groupNum;
        var normalizedIntervalPadding = intervalPadding / xDimensionLegenth;
        var normalizedDodgePadding = dodgePadding / xDimensionLegenth;
        var geomWidth = ((1 - normalizedIntervalPadding * (groupNum - 1)) / groupNum - normalizedDodgePadding * (len - 1)) / len;
        var offset = ((1 / 2 + idx) * geomWidth + idx * normalizedDodgePadding +
            (1 / 2) * normalizedIntervalPadding) * groupNum -
            normalizedIntervalPadding / 2;
        return offset;
    };
    Dodge.prototype.getDistribution = function (dim) {
        var groupedDataArray = this.adjustDataArray;
        var cacheMap = this.cacheMap;
        var map = cacheMap[dim];
        if (!map) {
            map = {};
            _.each(groupedDataArray, function (data, index) {
                var values = _.valuesOfKey(data, dim);
                if (!values.length) {
                    values.push(0);
                }
                _.each(values, function (val) {
                    if (!map[val]) {
                        map[val] = [];
                    }
                    map[val].push(index);
                });
            });
            cacheMap[dim] = map;
        }
        return map;
    };
    return Dodge;
}(adjust_1.default));
exports.default = Dodge;
//# sourceMappingURL=dodge.js.map
}, function(modId) { var map = {"../constant":1667025884703,"./adjust":1667025884702}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884706, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _ = require("@antv/util");
var constant_1 = require("../constant");
var adjust_1 = require("./adjust");
function randomNumber(min, max) {
    return (max - min) * Math.random() + min;
}
var Jitter = /** @class */ (function (_super) {
    tslib_1.__extends(Jitter, _super);
    function Jitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Jitter.prototype.process = function (groupDataArray) {
        var groupedDataArray = _.clone(groupDataArray);
        // 之前分组之后的数据，然后有合并回去（和分组前可以理解成是一样的）
        var mergeData = _.flatten(groupedDataArray);
        // 返回值
        this.adjustData(groupedDataArray, mergeData);
        return groupedDataArray;
    };
    /**
     * 当前数据分组（index）中，按照维度 dim 进行 jitter 调整
     * @param dim
     * @param values
     * @param dataArray
     */
    Jitter.prototype.adjustDim = function (dim, values, dataArray) {
        var _this = this;
        // 在每一个分组中，将数据再按照 dim 分组，用于散列
        var groupDataArray = this.groupData(dataArray, dim);
        return _.each(groupDataArray, function (data, dimValue) {
            return _this.adjustGroup(data, dim, parseFloat(dimValue), values);
        });
    };
    // 随机出来的字段值
    Jitter.prototype.getAdjustOffset = function (range) {
        var pre = range.pre, next = range.next;
        // 随机的范围
        var margin = (next - pre) * constant_1.GAP;
        return randomNumber(pre + margin, next - margin);
    };
    // adjust group data
    Jitter.prototype.adjustGroup = function (group, dim, dimValue, values) {
        var _this = this;
        // 调整范围
        var range = this.getAdjustRange(dim, dimValue, values);
        _.each(group, function (data) {
            data[dim] = _this.getAdjustOffset(range); // 获取调整的位置
        });
        return group;
    };
    return Jitter;
}(adjust_1.default));
exports.default = Jitter;
//# sourceMappingURL=jitter.js.map
}, function(modId) { var map = {"../constant":1667025884703,"./adjust":1667025884702}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884707, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _ = require("@antv/util");
var adjust_1 = require("./adjust");
var Cache = _.Cache;
var Stack = /** @class */ (function (_super) {
    tslib_1.__extends(Stack, _super);
    function Stack(cfg) {
        var _this = _super.call(this, cfg) || this;
        var _a = cfg.adjustNames, adjustNames = _a === void 0 ? ['y'] : _a, _b = cfg.height, height = _b === void 0 ? NaN : _b, _c = cfg.size, size = _c === void 0 ? 10 : _c, _d = cfg.reverseOrder, reverseOrder = _d === void 0 ? false : _d;
        _this.adjustNames = adjustNames;
        _this.height = height;
        _this.size = size;
        _this.reverseOrder = reverseOrder;
        return _this;
    }
    /**
     * 方法入参是经过数据分组、数据数字化之后的二维数组
     * @param groupDataArray 分组之后的数据
     */
    Stack.prototype.process = function (groupDataArray) {
        var _a = this, yField = _a.yField, reverseOrder = _a.reverseOrder;
        // 如果有指定 y 字段，那么按照 y 字段来 stack
        // 否则，按照高度均分
        var d = yField ? this.processStack(groupDataArray) : this.processOneDimStack(groupDataArray);
        return reverseOrder ? this.reverse(d) : d;
    };
    Stack.prototype.reverse = function (groupedDataArray) {
        return groupedDataArray.slice(0).reverse();
    };
    Stack.prototype.processStack = function (groupDataArray) {
        var _a = this, xField = _a.xField, yField = _a.yField, reverseOrder = _a.reverseOrder;
        // 层叠顺序翻转
        var groupedDataArray = reverseOrder ? this.reverse(groupDataArray) : groupDataArray;
        // 用来缓存，正数和负数的堆叠问题
        var positive = new Cache();
        var negative = new Cache();
        return groupedDataArray.map(function (dataArray) {
            return dataArray.map(function (data) {
                var _a;
                var x = _.get(data, xField, 0);
                var y = _.get(data, [yField]);
                var xKey = x.toString();
                // todo 是否应该取 _origin？因为 y 可能取到的值不正确，比如先 symmetric，再 stack！
                y = _.isArray(y) ? y[1] : y;
                if (!_.isNil(y)) {
                    var cache = y >= 0 ? positive : negative;
                    if (!cache.has(xKey)) {
                        cache.set(xKey, 0);
                    }
                    var xValue = cache.get(xKey);
                    var newXValue = y + xValue;
                    // 存起来
                    cache.set(xKey, newXValue);
                    return tslib_1.__assign(tslib_1.__assign({}, data), (_a = {}, _a[yField] = [xValue, newXValue], _a));
                }
                // 没有修改，则直接返回
                return data;
            });
        });
    };
    Stack.prototype.processOneDimStack = function (groupDataArray) {
        var _this = this;
        var _a = this, xField = _a.xField, height = _a.height, reverseOrder = _a.reverseOrder;
        var yField = 'y';
        // 如果层叠的顺序翻转
        var groupedDataArray = reverseOrder ? this.reverse(groupDataArray) : groupDataArray;
        // 缓存累加数据
        var cache = new Cache();
        return groupedDataArray.map(function (dataArray) {
            return dataArray.map(function (data) {
                var _a;
                var size = _this.size;
                var xValue = data[xField];
                // todo 没有看到这个 stack 计算原理
                var stackHeight = (size * 2) / height;
                if (!cache.has(xValue)) {
                    cache.set(xValue, stackHeight / 2); // 初始值大小
                }
                var stackValue = cache.get(xValue);
                // 增加一层 stackHeight
                cache.set(xValue, stackValue + stackHeight);
                return tslib_1.__assign(tslib_1.__assign({}, data), (_a = {}, _a[yField] = stackValue, _a));
            });
        });
    };
    return Stack;
}(adjust_1.default));
exports.default = Stack;
//# sourceMappingURL=stack.js.map
}, function(modId) { var map = {"./adjust":1667025884702}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1667025884708, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _ = require("@antv/util");
var adjust_1 = require("./adjust");
var Symmetric = /** @class */ (function (_super) {
    tslib_1.__extends(Symmetric, _super);
    function Symmetric() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Symmetric.prototype.process = function (groupDataArray) {
        var mergeData = _.flatten(groupDataArray);
        var _a = this, xField = _a.xField, yField = _a.yField;
        // 每个 x 值对应的 最大值
        var cache = this.getXValuesMaxMap(mergeData);
        // 所有数据的最大的值
        var max = Math.max.apply(Math, Object.keys(cache).map(function (key) { return cache[key]; }));
        return _.map(groupDataArray, function (dataArray) {
            return _.map(dataArray, function (data) {
                var _a, _b;
                var yValue = data[yField];
                var xValue = data[xField];
                // 数组处理逻辑
                if (_.isArray(yValue)) {
                    var off_1 = (max - cache[xValue]) / 2;
                    return tslib_1.__assign(tslib_1.__assign({}, data), (_a = {}, _a[yField] = _.map(yValue, function (y) { return off_1 + y; }), _a));
                }
                // 非数组处理逻辑
                var offset = (max - yValue) / 2;
                return tslib_1.__assign(tslib_1.__assign({}, data), (_b = {}, _b[yField] = [offset, yValue + offset], _b));
            });
        });
    };
    // 获取每个 x 对应的最大的值
    Symmetric.prototype.getXValuesMaxMap = function (mergeData) {
        var _this = this;
        var _a = this, xField = _a.xField, yField = _a.yField;
        // 根据 xField 的值进行分组
        var groupDataArray = _.groupBy(mergeData, function (data) { return data[xField]; });
        // 获取每个 xField 值中的最大值
        return _.mapValues(groupDataArray, function (dataArray) { return _this.getDimMaxValue(dataArray, yField); });
    };
    Symmetric.prototype.getDimMaxValue = function (mergeData, dim) {
        // 所有的 value 值
        var dimValues = _.map(mergeData, function (data) { return _.get(data, dim, []); });
        // 将数组打平（dim value 有可能是数组，比如 stack 之后的）
        var flattenValues = _.flatten(dimValues);
        // 求出数组的最大值
        return Math.max.apply(Math, flattenValues);
    };
    return Symmetric;
}(adjust_1.default));
exports.default = Symmetric;
//# sourceMappingURL=symmetric.js.map
}, function(modId) { var map = {"./adjust":1667025884702}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1667025884700);
})()
//miniprogram-npm-outsideDeps=["tslib","@antv/util"]
//# sourceMappingURL=index.js.map