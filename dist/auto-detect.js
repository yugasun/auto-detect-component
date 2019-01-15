"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AutoDetect =
/*#__PURE__*/
function () {
  function AutoDetect(_ref) {
    var appPath = _ref.appPath,
        compPrefix = _ref.compPrefix,
        _ref$fileExt = _ref.fileExt,
        fileExt = _ref$fileExt === void 0 ? '.vue' : _ref$fileExt;

    _classCallCheck(this, AutoDetect);

    this.appPath = appPath;
    this.compPrefix = compPrefix;
    this.compReg = new RegExp("<".concat(compPrefix, "([a-zA-Z-]+)"), 'ig');
    this.compFiles = [];
    this.fileExt = fileExt;
  }

  _createClass(AutoDetect, [{
    key: "initCompFiles",
    value: function initCompFiles(dirPath) {
      var _this = this;

      var files = _fs.default.readdirSync(dirPath);

      files.forEach(function (f) {
        var filename = _path.default.join(dirPath, f);

        var stat = _fs.default.statSync(filename);

        if (stat.isDirectory()) {
          var subDirPath = _path.default.join(dirPath, f); // not supposed cache sub vue files variables, it will case stack overflow.


          _this.initVueFiles(subDirPath);
        } else if (f.indexOf(_this.fileExt) !== -1) {
          _this.compFiles.push(filename);
        }
      });
    }
  }, {
    key: "getCompUse",
    value: function getCompUse() {
      var _this2 = this;

      this.initCompFiles(this.appPath);
      var useComps = [];
      this.compFiles.forEach(function (filename) {
        var _useComps;

        var content = _fs.default.readFileSync(filename);

        var res = (content.toString().match(_this2.compReg) || []).map(function (item) {
          return item.replace('<', '');
        });

        (_useComps = useComps).push.apply(_useComps, _toConsumableArray(res));
      }); // unique use component

      useComps = Array.from(new Set(useComps));
      return useComps;
    }
  }]);

  return AutoDetect;
}();

exports.default = AutoDetect;