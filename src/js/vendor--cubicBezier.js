// from : http://greensock.com/forums/topic/7952-javascript-custom-ease/page-2#entry51357
var CubicBezier = (function () {
    function CubicBezier(p1x, p1y, p2x, p2y) {
        if (p1x === void 0) { p1x = 0; }
        if (p1y === void 0) { p1y = 0; }
        if (p2x === void 0) { p2x = 1; }
        if (p2y === void 0) { p2y = 1; }
        this.p1x = p1x;
        this.p1y = p1y;
        this.p2x = p2x;
        this.p2y = p2y;
        this.cx = 3.0 * this.p1x;
        this.cy = 3.0 * this.p1y;
        this.bx = 3.0 * (this.p2x - this.p1x) - this.cx;
        this.by = 3.0 * (this.p2y - this.p1y) - this.cy;
        this.ax = 1.0 - this.cx - this.bx;
        this.ay = 1.0 - this.cy - this.by;
        this.ease = this.ease.bind(this);
    }
    CubicBezier.create = function (name, p1x, p1y, p2x, p2y) {
        if (p1x === void 0) { p1x = 0; }
        if (p1y === void 0) { p1y = 0; }
        if (p2x === void 0) { p2x = 1; }
        if (p2y === void 0) { p2y = 1; }
        var easing = new CubicBezier(p1x, p1y, p2x, p2y);
        if (typeof name === "string")
            CubicBezier.easings[name] = easing;
        return easing.ease;
    };
    CubicBezier.config = function (p1x, p1y, p2x, p2y) {
        if (p1x === void 0) { p1x = 0; }
        if (p1y === void 0) { p1y = 0; }
        if (p2x === void 0) { p2x = 1; }
        if (p2y === void 0) { p2y = 1; }
        return new CubicBezier(p1x, p1y, p2x, p2y).ease;
    };
    CubicBezier.get = function (name) {
        return CubicBezier.easings[name].ease;
    };
    CubicBezier.prototype.getEpsilon = function (duration) {
        if (duration === void 0) { duration = 400; }
        return 1 / (200 * duration);
    };
    CubicBezier.prototype.ease = function (time, start, change, duration) {
        return this.solve(time, this.getEpsilon(duration));
    };
    CubicBezier.prototype.solve = function (x, epsilon) {
        return this.sampleCurveY(this.solveCurveX(x, epsilon));
    };
    CubicBezier.prototype.sampleCurveX = function (t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    };
    CubicBezier.prototype.sampleCurveY = function (t) {
        return ((this.ay * t + this.by) * t + this.cy) * t;
    };
    CubicBezier.prototype.sampleDerivX = function (t) {
        return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
    };
    CubicBezier.prototype.solveCurveX = function (x, epsilon) {
        var t0;
        var t1;
        var t2;
        var x2;
        var d2;
        for (var i = 0, t2 = x; i < 8; i++) {
            x2 = this.sampleCurveX(t2) - x;
            if (Math.abs(x2) < epsilon)
                return t2;
            d2 = this.sampleDerivX(t2);
            if (Math.abs(d2) < epsilon)
                break;
            t2 = t2 - x2 / d2;
        }
        t0 = 0.0;
        t1 = 1.0;
        t2 = x;
        if (t2 < t0)
            return t0;
        if (t2 > t1)
            return t1;
        while (t0 < t1) {
            x2 = this.sampleCurveX(t2);
            if (Math.abs(x2 - x) < epsilon)
                return t2;
            if (x > x2)
                t0 = t2;
            else
                t1 = t2;
            t2 = (t1 - t0) * 0.5 + t0;
        }
        return t2;
    };
    CubicBezier.easings = {};
    return CubicBezier;
})();