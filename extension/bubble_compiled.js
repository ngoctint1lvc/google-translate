/* Copyright 2014 Google */
(function () {/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    let gtxSourceAudio;
    let gtxSourceAudioElement;
    var k, aa = function (a) {
        var b = 0;
        return function () {
            return b < a.length ? {done: !1, value: a[b++]} : {done: !0}
        }
    }, ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    }, da = function (a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    }, ea = da(this), fa = function (a, b) {
        if (b) a:{
            var c = ea;
            a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var e = a[d];
                if (!(e in c)) break a;
                c = c[e]
            }
            a = a[a.length - 1];
            d = c[a];
            b = b(d);
            b != d && null != b && ba(c, a, {configurable: !0, writable: !0, value: b})
        }
    };
    fa("Symbol", function (a) {
        if (a) return a;
        var b = function (f, h) {
            this.g = f;
            ba(this, "description", {configurable: !0, writable: !0, value: h})
        };
        b.prototype.toString = function () {
            return this.g
        };
        var c = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", d = 0, e = function (f) {
            if (this instanceof e) throw new TypeError("Symbol is not a constructor");
            return new b(c + (f || "") + "_" + d++, f)
        };
        return e
    });
    fa("Symbol.iterator", function (a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = ea[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function () {
                    return ha(aa(this))
                }
            })
        }
        return a
    });
    var ha = function (a) {
        a = {next: a};
        a[Symbol.iterator] = function () {
            return this
        };
        return a
    }, ia = function (a) {
        return a.raw = a
    }, ja = function (a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b) return b.call(a);
        if ("number" == typeof a.length) return {next: aa(a)};
        throw Error(String(a) + " is not an iterable or ArrayLike");
    }, ka = function (a) {
        if (!(a instanceof Array)) {
            a = ja(a);
            for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
            a = c
        }
        return a
    }, la = "function" == typeof Object.create ? Object.create : function (a) {
        var b =
            function () {
            };
        b.prototype = a;
        return new b
    }, ma;
    if ("function" == typeof Object.setPrototypeOf) ma = Object.setPrototypeOf; else {
        var na;
        a:{
            var oa = {a: !0}, pa = {};
            try {
                pa.__proto__ = oa;
                na = pa.a;
                break a
            } catch (a) {
            }
            na = !1
        }
        ma = na ? function (a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var qa = ma, m = function (a, b) {
        a.prototype = la(b.prototype);
        a.prototype.constructor = a;
        if (qa) qa(a, b); else for (var c in b) if ("prototype" != c) if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d)
        } else a[c] = b[c];
        a.I = b.prototype
    }, sa = function (a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    fa("WeakMap", function (a) {
        function b() {
        }

        function c(l) {
            var n = typeof l;
            return "object" === n && null !== l || "function" === n
        }

        function d(l) {
            if (!sa(l, f)) {
                var n = new b;
                ba(l, f, {value: n})
            }
        }

        function e(l) {
            var n = Object[l];
            n && (Object[l] = function (p) {
                if (p instanceof b) return p;
                Object.isExtensible(p) && d(p);
                return n(p)
            })
        }

        if (function () {
            if (!a || !Object.seal) return !1;
            try {
                var l = Object.seal({}), n = Object.seal({}), p = new a([[l, 2], [n, 3]]);
                if (2 != p.get(l) || 3 != p.get(n)) return !1;
                p.delete(l);
                p.set(n, 4);
                return !p.has(l) && 4 == p.get(n)
            } catch (q) {
                return !1
            }
        }()) return a;
        var f = "$jscomp_hidden_" + Math.random();
        e("freeze");
        e("preventExtensions");
        e("seal");
        var h = 0, g = function (l) {
            this.W = (h += Math.random() + 1).toString();
            if (l) {
                l = ja(l);
                for (var n; !(n = l.next()).done;) n = n.value, this.set(n[0], n[1])
            }
        };
        g.prototype.set = function (l, n) {
            if (!c(l)) throw Error("Invalid WeakMap key");
            d(l);
            if (!sa(l, f)) throw Error("WeakMap key fail: " + l);
            l[f][this.W] = n;
            return this
        };
        g.prototype.get = function (l) {
            return c(l) && sa(l, f) ? l[f][this.W] : void 0
        };
        g.prototype.has = function (l) {
            return c(l) && sa(l, f) && sa(l[f],
                this.W)
        };
        g.prototype.delete = function (l) {
            return c(l) && sa(l, f) && sa(l[f], this.W) ? delete l[f][this.W] : !1
        };
        return g
    });
    fa("Map", function (a) {
        if (function () {
            if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
            try {
                var g = Object.seal({x: 4}), l = new a(ja([[g, "s"]]));
                if ("s" != l.get(g) || 1 != l.size || l.get({x: 4}) || l.set({x: 4}, "t") != l || 2 != l.size) return !1;
                var n = l.entries(), p = n.next();
                if (p.done || p.value[0] != g || "s" != p.value[1]) return !1;
                p = n.next();
                return p.done || 4 != p.value[0].x || "t" != p.value[1] || !n.next().done ? !1 : !0
            } catch (q) {
                return !1
            }
        }()) return a;
        var b = new WeakMap, c = function (g) {
            this.l = {};
            this.g =
                f();
            this.size = 0;
            if (g) {
                g = ja(g);
                for (var l; !(l = g.next()).done;) l = l.value, this.set(l[0], l[1])
            }
        };
        c.prototype.set = function (g, l) {
            g = 0 === g ? 0 : g;
            var n = d(this, g);
            n.list || (n.list = this.l[n.id] = []);
            n.entry ? n.entry.value = l : (n.entry = {
                next: this.g,
                previous: this.g.previous,
                head: this.g,
                key: g,
                value: l
            }, n.list.push(n.entry), this.g.previous.next = n.entry, this.g.previous = n.entry, this.size++);
            return this
        };
        c.prototype.delete = function (g) {
            g = d(this, g);
            return g.entry && g.list ? (g.list.splice(g.index, 1), g.list.length || delete this.l[g.id],
                g.entry.previous.next = g.entry.next, g.entry.next.previous = g.entry.previous, g.entry.head = null, this.size--, !0) : !1
        };
        c.prototype.clear = function () {
            this.l = {};
            this.g = this.g.previous = f();
            this.size = 0
        };
        c.prototype.has = function (g) {
            return !!d(this, g).entry
        };
        c.prototype.get = function (g) {
            return (g = d(this, g).entry) && g.value
        };
        c.prototype.entries = function () {
            return e(this, function (g) {
                return [g.key, g.value]
            })
        };
        c.prototype.keys = function () {
            return e(this, function (g) {
                return g.key
            })
        };
        c.prototype.values = function () {
            return e(this,
                function (g) {
                    return g.value
                })
        };
        c.prototype.forEach = function (g, l) {
            for (var n = this.entries(), p; !(p = n.next()).done;) p = p.value, g.call(l, p[1], p[0], this)
        };
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function (g, l) {
            var n = l && typeof l;
            "object" == n || "function" == n ? b.has(l) ? n = b.get(l) : (n = "" + ++h, b.set(l, n)) : n = "p_" + l;
            var p = g.l[n];
            if (p && sa(g.l, n)) for (g = 0; g < p.length; g++) {
                var q = p[g];
                if (l !== l && q.key !== q.key || l === q.key) return {id: n, list: p, index: g, entry: q}
            }
            return {id: n, list: p, index: -1, entry: void 0}
        }, e = function (g,
                         l) {
            var n = g.g;
            return ha(function () {
                if (n) {
                    for (; n.head != g.g;) n = n.previous;
                    for (; n.next != n.head;) return n = n.next, {done: !1, value: l(n)};
                    n = null
                }
                return {done: !0, value: void 0}
            })
        }, f = function () {
            var g = {};
            return g.previous = g.next = g.head = g
        }, h = 0;
        return c
    });
    fa("Array.prototype.find", function (a) {
        return a ? a : function (b, c) {
            a:{
                var d = this;
                d instanceof String && (d = String(d));
                for (var e = d.length, f = 0; f < e; f++) {
                    var h = d[f];
                    if (b.call(c, h, f, d)) {
                        b = h;
                        break a
                    }
                }
                b = void 0
            }
            return b
        }
    });
    var ta = function (a, b) {
        a instanceof String && (a += "");
        var c = 0, d = !1, e = {
            next: function () {
                if (!d && c < a.length) {
                    var f = c++;
                    return {value: b(f, a[f]), done: !1}
                }
                d = !0;
                return {done: !0, value: void 0}
            }
        };
        e[Symbol.iterator] = function () {
            return e
        };
        return e
    };
    fa("Array.prototype.values", function (a) {
        return a ? a : function () {
            return ta(this, function (b, c) {
                return c
            })
        }
    });
    fa("Array.prototype.keys", function (a) {
        return a ? a : function () {
            return ta(this, function (b) {
                return b
            })
        }
    });
    fa("String.prototype.startsWith", function (a) {
        return a ? a : function (b, c) {
            if (null == this) throw new TypeError("The 'this' value for String.prototype.startsWith must not be null or undefined");
            if (b instanceof RegExp) throw new TypeError("First argument to String.prototype.startsWith must not be a regular expression");
            var d = this + "";
            b += "";
            var e = d.length, f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var h = 0; h < f && c < e;) if (d[c++] != b[h++]) return !1;
            return h >= f
        }
    });
    fa("Array.from", function (a) {
        return a ? a : function (b, c, d) {
            c = null != c ? c : function (g) {
                return g
            };
            var e = [], f = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof f) {
                b = f.call(b);
                for (var h = 0; !(f = b.next()).done;) e.push(c.call(d, f.value, h++))
            } else for (f = b.length, h = 0; h < f; h++) e.push(c.call(d, b[h], h));
            return e
        }
    });
    fa("Array.prototype.entries", function (a) {
        return a ? a : function () {
            return ta(this, function (b, c) {
                return [b, c]
            })
        }
    });
    fa("Object.entries", function (a) {
        return a ? a : function (b) {
            var c = [], d;
            for (d in b) sa(b, d) && c.push([d, b[d]]);
            return c
        }
    });
    var ua = ua || {}, r = this || self, va = function (a) {
        a.Da = void 0;
        a.Z = function () {
            return a.Da ? a.Da : a.Da = new a
        }
    }, wa = function (a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }, xa = function (a) {
        var b = wa(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }, t = function (a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }, Aa = function (a) {
        return Object.prototype.hasOwnProperty.call(a, ya) && a[ya] || (a[ya] = ++za)
    }, ya = "closure_uid_" + (1E9 * Math.random() >>> 0), za = 0, Ba = function (a, b, c) {
        return a.call.apply(a.bind,
            arguments)
    }, Ca = function (a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }, v = function (a, b, c) {
        Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? v = Ba : v = Ca;
        return v.apply(null, arguments)
    }, w = function (a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var d =
                c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }, y = function (a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.I = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Ue = function (d, e, f) {
            for (var h = Array(arguments.length - 2), g = 2; g < arguments.length; g++) h[g - 2] = arguments[g];
            return b.prototype[e].apply(d, h)
        }
    }, Da = function (a) {
        return a
    };

    function Ea(a, b) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, Ea); else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }

    y(Ea, Error);
    Ea.prototype.name = "CustomError";
    var Fa;

    function Ga(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
        Ea.call(this, c + a[d])
    }

    y(Ga, Ea);
    Ga.prototype.name = "AssertionError";

    function Ha(a, b, c, d) {
        var e = "Assertion failed";
        if (c) {
            e += ": " + c;
            var f = d
        } else a && (e += ": " + a, f = b);
        throw new Ga("" + e, f || []);
    }

    var A = function (a, b, c) {
        a || Ha("", null, b, Array.prototype.slice.call(arguments, 2));
        return a
    }, B = function (a, b) {
        throw new Ga("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
    }, Ia = function (a, b, c) {
        "number" !== typeof a && Ha("Expected number but got %s: %s.", [wa(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }, Ja = function (a, b, c) {
        "string" !== typeof a && Ha("Expected string but got %s: %s.", [wa(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }, Ka = function (a, b, c) {
        t(a) || Ha("Expected object but got %s: %s.",
            [wa(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }, La = function (a, b, c) {
        Array.isArray(a) || Ha("Expected array but got %s: %s.", [wa(a), a], b, Array.prototype.slice.call(arguments, 2));
        return a
    }, Ma = function (a, b, c) {
        t(a) && 1 == a.nodeType || Ha("Expected Element but got %s: %s.", [wa(a), a], b, Array.prototype.slice.call(arguments, 2))
    }, Oa = function (a, b, c, d) {
        a instanceof b || Ha("Expected instanceof %s but got %s.", [Na(b), Na(a)], c, Array.prototype.slice.call(arguments, 3));
        return a
    };

    function Na(a) {
        return a instanceof Function ? a.displayName || a.name || "unknown type name" : a instanceof Object ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : null === a ? "null" : typeof a
    };var Pa = function (a) {
        return function () {
            return a
        }
    }, Qa = function (a, b) {
        for (var c = 0; c < b.length - 2; c += 3) {
            var d = b.charAt(c + 2);
            d = "a" <= d ? d.charCodeAt(0) - 87 : Number(d);
            d = "+" == b.charAt(c + 1) ? a >>> d : a << d;
            a = "+" == b.charAt(c) ? a + d & 4294967295 : a ^ d
        }
        return a
    }, Ra = null, Sa = function (a) {
        if (null !== Ra) var b = Ra; else {
            b = Pa(String.fromCharCode(84));
            var c = Pa(String.fromCharCode(75));
            b = [b(), b()];
            b[1] = c();
            b = (Ra = window[b.join(c())] || "") || ""
        }
        var d = Pa(String.fromCharCode(116));
        c = Pa(String.fromCharCode(107));
        d = [d(), d()];
        d[1] = c();
        c = "&" + d.join("") +
            "=";
        d = b.split(".");
        b = Number(d[0]) || 0;
        for (var e = [], f = 0, h = 0; h < a.length; h++) {
            var g = a.charCodeAt(h);
            128 > g ? e[f++] = g : (2048 > g ? e[f++] = g >> 6 | 192 : (55296 == (g & 64512) && h + 1 < a.length && 56320 == (a.charCodeAt(h + 1) & 64512) ? (g = 65536 + ((g & 1023) << 10) + (a.charCodeAt(++h) & 1023), e[f++] = g >> 18 | 240, e[f++] = g >> 12 & 63 | 128) : e[f++] = g >> 12 | 224, e[f++] = g >> 6 & 63 | 128), e[f++] = g & 63 | 128)
        }
        a = b;
        for (f = 0; f < e.length; f++) a += e[f], a = Qa(a, "+-a^+6");
        a = Qa(a, "+-3^+b+-f");
        a ^= Number(d[1]) || 0;
        0 > a && (a = (a & 2147483647) + 2147483648);
        a %= 1E6;
        return c + (a.toString() + "." +
            (a ^ b))
    };
    var Ta = function () {
    }, Ua = function (a) {
        var b = !1, c;
        return function () {
            b || (c = a(), b = !0);
            return c
        }
    };
    var Va = Array.prototype.indexOf ? function (a, b) {
        A(null != a.length);
        return Array.prototype.indexOf.call(a, b, void 0)
    } : function (a, b) {
        if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
        for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
        return -1
    }, Wa = Array.prototype.forEach ? function (a, b) {
        A(null != a.length);
        Array.prototype.forEach.call(a, b, void 0)
    } : function (a, b) {
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) e in d && b.call(void 0, d[e], e, a)
    }, Xa = Array.prototype.some ?
        function (a, b) {
            A(null != a.length);
            return Array.prototype.some.call(a, b, void 0)
        } : function (a, b) {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++) if (e in d && b.call(void 0, d[e], e, a)) return !0;
            return !1
        };

    function Ya(a, b) {
        return 0 <= Va(a, b)
    }

    function Za(a, b) {
        b = Va(a, b);
        var c;
        if (c = 0 <= b) A(null != a.length), Array.prototype.splice.call(a, b, 1);
        return c
    }

    function $a(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c
        }
        return []
    };

    function ab(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    }

    function bb(a, b) {
        for (var c in a) if (b.call(void 0, a[c], c, a)) return !0;
        return !1
    }

    function cb(a, b) {
        for (var c in a) if (a[c] == b) return !0;
        return !1
    }

    var db = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function eb(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < db.length; f++) c = db[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }

    function fb(a) {
        var b = arguments.length;
        if (1 == b && Array.isArray(arguments[0])) return fb.apply(null, arguments[0]);
        if (b % 2) throw Error("Uneven number of arguments");
        for (var c = {}, d = 0; d < b; d += 2) c[arguments[d]] = arguments[d + 1];
        return c
    };var gb = {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        command: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0
    };
    var hb;
    var kb = function (a, b) {
        this.g = a === ib && b || "";
        this.l = jb
    };
    kb.prototype.sa = !0;
    kb.prototype.ea = function () {
        return this.g
    };
    kb.prototype.toString = function () {
        return "Const{" + this.g + "}"
    };
    var lb = function (a) {
        if (a instanceof kb && a.constructor === kb && a.l === jb) return a.g;
        B("expected object of type Const, got '" + a + "'");
        return "type_error:Const"
    }, jb = {}, ib = {};
    var nb = function (a, b) {
        this.g = b === mb ? a : ""
    };
    nb.prototype.toString = function () {
        return this.g + ""
    };
    nb.prototype.sa = !0;
    nb.prototype.ea = function () {
        return this.g.toString()
    };
    var mb = {};
    var ob = function (a) {
            return /^[\s\xa0]*$/.test(a)
        }, pb = String.prototype.trim ? function (a) {
            return a.trim()
        } : function (a) {
            return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
        }, xb = function (a) {
            if (!qb.test(a)) return a;
            -1 != a.indexOf("&") && (a = a.replace(rb, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(sb, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(tb, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(ub, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(vb, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(wb, "&#0;"));
            return a
        }, rb = /&/g, sb =
            /</g, tb = />/g, ub = /"/g, vb = /'/g, wb = /\x00/g, qb = /[\x00&<>"']/, zb = function (a, b) {
            var c = 0;
            a = pb(String(a)).split(".");
            b = pb(String(b)).split(".");
            for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
                var f = a[e] || "", h = b[e] || "";
                do {
                    f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                    h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                    if (0 == f[0].length && 0 == h[0].length) break;
                    c = yb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || yb(0 == f[2].length, 0 == h[2].length) || yb(f[2], h[2]);
                    f = f[3];
                    h = h[3]
                } while (0 == c)
            }
            return c
        },
        yb = function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        };
    var Bb = function (a, b) {
        this.g = b === Ab ? a : ""
    };
    Bb.prototype.toString = function () {
        return this.g.toString()
    };
    Bb.prototype.sa = !0;
    Bb.prototype.ea = function () {
        return this.g.toString()
    };
    var Cb = function (a) {
            if (a instanceof Bb && a.constructor === Bb) return a.g;
            B("expected object of type SafeUrl, got '" + a + "' of type " + wa(a));
            return "type_error:SafeUrl"
        }, Db = /^data:(.*);base64,[a-z0-9+\/]+=*$/i, Eb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
        Fb = function (a) {
            if (a instanceof Bb) return a;
            a = "object" == typeof a && a.sa ? a.ea() : String(a);
            Eb.test(a) ? a = new Bb(a, Ab) : (a = String(a).replace(/(%0A|%0D)/g, ""), a = a.match(Db) ? new Bb(a, Ab) : null);
            return a
        }, Ab = {}, Gb = new Bb("about:invalid#zClosurez", Ab);
    var Hb = {}, Ib = function (a, b) {
        this.g = b === Hb ? a : "";
        this.sa = !0
    };
    Ib.prototype.ea = function () {
        return this.g
    };
    Ib.prototype.toString = function () {
        return this.g.toString()
    };
    var Jb = function (a) {
        if (a instanceof Ib && a.constructor === Ib) return a.g;
        B("expected object of type SafeStyle, got '" + a + "' of type " + wa(a));
        return "type_error:SafeStyle"
    }, Mb = function (a) {
        var b = "", c;
        for (c in a) if (Object.prototype.hasOwnProperty.call(a, c)) {
            if (!/^[-_a-zA-Z0-9]+$/.test(c)) throw Error("Name allows only [-_a-zA-Z0-9], got: " + c);
            var d = a[c];
            null != d && (d = Array.isArray(d) ? d.map(Kb).join(" ") : Kb(d), b += c + ":" + d + ";")
        }
        return b ? new Ib(b, Hb) : Lb
    }, Lb = new Ib("", Hb);

    function Kb(a) {
        if (a instanceof Bb) return 'url("' + Cb(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
        a = a instanceof kb ? lb(a) : Nb(String(a));
        if (/[{;}]/.test(a)) throw new Ga("Value does not allow [{;}], got: %s.", [a]);
        return a
    }

    function Nb(a) {
        var b = a.replace(Ob, "$1").replace(Ob, "$1").replace(Pb, "url");
        if (Qb.test(b)) {
            if (Rb.test(a)) return B("String value disallows comments, got: " + a), "zClosurez";
            for (var c = b = !0, d = 0; d < a.length; d++) {
                var e = a.charAt(d);
                "'" == e && c ? b = !b : '"' == e && b && (c = !c)
            }
            if (!b || !c) return B("String value requires balanced quotes, got: " + a), "zClosurez";
            if (!Sb(a)) return B("String value requires balanced square brackets and one identifier per pair of brackets, got: " + a), "zClosurez"
        } else return B("String value allows only [-+,.\"'%_!#/ a-zA-Z0-9\\[\\]] and simple functions, got: " +
            a), "zClosurez";
        return Tb(a)
    }

    function Sb(a) {
        for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if ("]" == e) {
                if (b) return !1;
                b = !0
            } else if ("[" == e) {
                if (!b) return !1;
                b = !1
            } else if (!b && !c.test(e)) return !1
        }
        return b
    }

    var Qb = RegExp("^[-+,.\"'%_!#/ a-zA-Z0-9\\[\\]]+$"),
        Pb = RegExp("\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))", "g"),
        Ob = RegExp("\\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|radial-gradient|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?|steps|var)\\([-+*/0-9a-zA-Z.%#\\[\\], ]+\\)", "g"),
        Rb = /\/\*/;

    function Tb(a) {
        return a.replace(Pb, function (b, c, d, e) {
            var f = "";
            d = d.replace(/^(['"])(.*)\1$/, function (h, g, l) {
                f = g;
                return l
            });
            b = (Fb(d) || Gb).ea();
            return c + f + b + f + e
        })
    };var Ub, Vb;
    a:{
        for (var Wb = ["CLOSURE_FLAGS"], Xb = r, Yb = 0; Yb < Wb.length; Yb++) if (Xb = Xb[Wb[Yb]], null == Xb) {
            Vb = null;
            break a
        }
        Vb = Xb
    }
    var Zb = Vb && Vb[610401301];
    Ub = null != Zb ? Zb : !1;

    function $b() {
        var a = r.navigator;
        return a && (a = a.userAgent) ? a : ""
    }

    var ac, bc = r.navigator;
    ac = bc ? bc.userAgentData || null : null;

    function cc(a) {
        return Ub ? ac ? ac.brands.some(function (b) {
            return (b = b.brand) && -1 != b.indexOf(a)
        }) : !1 : !1
    }

    function C(a) {
        return -1 != $b().indexOf(a)
    };

    function dc() {
        return Ub ? !!ac && 0 < ac.brands.length : !1
    }

    function ec() {
        return dc() ? !1 : C("Opera")
    }

    function fc() {
        return C("Firefox") || C("FxiOS")
    }

    function gc() {
        return dc() ? cc("Chromium") : (C("Chrome") || C("CriOS")) && !(dc() ? 0 : C("Edge")) || C("Silk")
    };var hc = {}, D = function (a, b) {
        this.g = b === hc ? a : "";
        this.sa = !0
    };
    D.prototype.ea = function () {
        return this.g.toString()
    };
    D.prototype.toString = function () {
        return this.g.toString()
    };
    var ic = function (a) {
            if (a instanceof D && a.constructor === D) return a.g;
            B("expected object of type SafeHtml, got '" + a + "' of type " + wa(a));
            return "type_error:SafeHtml"
        }, kc = function (a) {
            return a instanceof D ? a : jc(xb("object" == typeof a && a.sa ? a.ea() : String(a)))
        }, lc = function (a) {
            if (a instanceof D) return a;
            a = kc(a);
            return jc(ic(a).toString().replace(/(\r\n|\r|\n)/g, "<br>"))
        }, nc = function (a) {
            var b = kc(mc), c = [], d = function (e) {
                Array.isArray(e) ? e.forEach(d) : (e = kc(e), c.push(ic(e).toString()))
            };
            a.forEach(d);
            return jc(c.join(ic(b).toString()))
        },
        oc = function (a) {
            return nc(Array.prototype.slice.call(arguments))
        }, jc = function (a) {
            if (void 0 === hb) {
                var b = null;
                var c = r.trustedTypes;
                if (c && c.createPolicy) {
                    try {
                        b = c.createPolicy("goog#html", {createHTML: Da, createScript: Da, createScriptURL: Da})
                    } catch (d) {
                        r.console && r.console.error(d.message)
                    }
                    hb = b
                } else hb = b
            }
            a = (b = hb) ? b.createHTML(a) : a;
            return new D(a, hc)
        }, pc = /^[a-zA-Z0-9-]+$/,
        qc = {action: !0, cite: !0, data: !0, formaction: !0, href: !0, manifest: !0, poster: !0, src: !0}, rc = {
            APPLET: !0, BASE: !0, EMBED: !0, IFRAME: !0, LINK: !0, MATH: !0,
            META: !0, OBJECT: !0, SCRIPT: !0, STYLE: !0, SVG: !0, TEMPLATE: !0
        }, mc = new D(r.trustedTypes && r.trustedTypes.emptyHTML || "", hc);
    var sc = function (a, b) {
        Ja(lb(a), "must provide justification");
        A(!ob(lb(a)), "must provide non-empty justification");
        return jc(b)
    };
    var tc = {MATH: !0, SCRIPT: !0, STYLE: !0, SVG: !0, TEMPLATE: !0}, uc = Ua(function () {
        if ("undefined" === typeof document) return !1;
        var a = document.createElement("div"), b = document.createElement("div");
        b.appendChild(document.createElement("div"));
        a.appendChild(b);
        if (!a.firstChild) return !1;
        b = a.firstChild.firstChild;
        a.innerHTML = ic(mc);
        return !b.parentElement
    }), vc = function (a, b) {
        if (uc()) for (; a.lastChild;) a.removeChild(a.lastChild);
        a.innerHTML = ic(b)
    }, wc = function (a, b) {
        if (a.tagName && tc[a.tagName.toUpperCase()]) throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " +
            a.tagName + ".");
        vc(a, b)
    };
    var zc = function (a) {
        return -1 != a.indexOf("&") ? "document" in r ? xc(a) : yc(a) : a
    }, xc = function (a) {
        var b = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"'};
        var c = r.document.createElement("div");
        return a.replace(Ac, function (d, e) {
            var f = b[d];
            if (f) return f;
            "#" == e.charAt(0) && (e = Number("0" + e.slice(1)), isNaN(e) || (f = String.fromCharCode(e)));
            f || (wc(c, sc(new kb(ib, "Single HTML entity."), d + " ")), f = c.firstChild.nodeValue.slice(0, -1));
            return b[d] = f
        })
    }, yc = function (a) {
        return a.replace(/&([^;]+);/g, function (b, c) {
            switch (c) {
                case "amp":
                    return "&";
                case "lt":
                    return "<";
                case "gt":
                    return ">";
                case "quot":
                    return '"';
                default:
                    return "#" != c.charAt(0) || (c = Number("0" + c.slice(1)), isNaN(c)) ? b : String.fromCharCode(c)
            }
        })
    }, Ac = /&([^;\s<&]+);?/g, Bc = function (a) {
        return null == a ? "" : String(a)
    }, Cc = function (a) {
        return String(a).replace(/\-([a-z])/g, function (b, c) {
            return c.toUpperCase()
        })
    }, Dc = function (a) {
        return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function (b, c, d) {
            return c + d.toUpperCase()
        })
    };
    var Ec = function (a) {
        if (a.ra && "function" == typeof a.ra) return a.ra();
        if ("undefined" !== typeof Map && a instanceof Map || "undefined" !== typeof Set && a instanceof Set) return Array.from(a.values());
        if ("string" === typeof a) return a.split("");
        if (xa(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        b = [];
        c = 0;
        for (d in a) b[c++] = a[d];
        return b
    }, Fc = function (a) {
        if (a.Kb && "function" == typeof a.Kb) return a.Kb();
        if (!a.ra || "function" != typeof a.ra) {
            if ("undefined" !== typeof Map && a instanceof Map) return Array.from(a.keys());
            if (!("undefined" !== typeof Set && a instanceof Set)) {
                if (xa(a) || "string" === typeof a) {
                    var b = [];
                    a = a.length;
                    for (var c = 0; c < a; c++) b.push(c);
                    return b
                }
                b = [];
                c = 0;
                for (var d in a) b[c++] = d;
                return b
            }
        }
    }, Gc = function (a, b, c) {
        if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c); else if (xa(a) || "string" === typeof a) Array.prototype.forEach.call(a, b, c); else for (var d = Fc(a), e = Ec(a), f = e.length, h = 0; h < f; h++) b.call(c, e[h], d && d[h], a)
    };
    var Hc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$"),
        Ic = function (a, b) {
            if (a) {
                a = a.split("&");
                for (var c = 0; c < a.length; c++) {
                    var d = a[c].indexOf("="), e = null;
                    if (0 <= d) {
                        var f = a[c].substring(0, d);
                        e = a[c].substring(d + 1)
                    } else f = a[c];
                    b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
                }
            }
        };
    var Jc = function (a) {
        this.l = this.g = null;
        this.o = a || null
    }, Kc = function (a) {
        a.g || (a.g = new Map, a.l = 0, a.o && Ic(a.o, function (b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    };
    Jc.prototype.add = function (a, b) {
        Kc(this);
        this.o = null;
        a = String(a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.l = Ia(this.l) + 1;
        return this
    };
    Jc.prototype.remove = function (a) {
        Kc(this);
        a = String(a);
        return this.g.has(a) ? (this.o = null, this.l = Ia(this.l) - this.g.get(a).length, this.g.delete(a)) : !1
    };
    Jc.prototype.clear = function () {
        this.g = this.o = null;
        this.l = 0
    };
    var Lc = function (a, b) {
        Kc(a);
        b = String(b);
        return a.g.has(b)
    };
    k = Jc.prototype;
    k.forEach = function (a, b) {
        Kc(this);
        this.g.forEach(function (c, d) {
            c.forEach(function (e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    };
    k.Kb = function () {
        Kc(this);
        for (var a = Array.from(this.g.values()), b = Array.from(this.g.keys()), c = [], d = 0; d < b.length; d++) for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    k.ra = function (a) {
        Kc(this);
        var b = [];
        if ("string" === typeof a) Lc(this, a) && (b = b.concat(this.g.get(String(a)))); else {
            a = Array.from(this.g.values());
            for (var c = 0; c < a.length; c++) b = b.concat(a[c])
        }
        return b
    };
    k.set = function (a, b) {
        Kc(this);
        this.o = null;
        a = String(a);
        Lc(this, a) && (this.l = Ia(this.l) - this.g.get(a).length);
        this.g.set(a, [b]);
        this.l = Ia(this.l) + 1;
        return this
    };
    k.get = function (a, b) {
        if (!a) return b;
        a = this.ra(a);
        return 0 < a.length ? String(a[0]) : b
    };
    k.toString = function () {
        if (this.o) return this.o;
        if (!this.g) return "";
        for (var a = [], b = Array.from(this.g.keys()), c = 0; c < b.length; c++) {
            var d = b[c], e = encodeURIComponent(String(d));
            d = this.ra(d);
            for (var f = 0; f < d.length; f++) {
                var h = e;
                "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
                a.push(h)
            }
        }
        return this.o = a.join("&")
    };
    k.zc = function (a) {
        for (var b = 0; b < arguments.length; b++) Gc(arguments[b], function (c, d) {
            this.add(d, c)
        }, this)
    };/*

 SPDX-License-Identifier: Apache-2.0
*/
    var Mc = "src srcdoc codebase data href rel action formaction sandbox cite poster icon".split(" ");
    var Nc = {};
    var Oc = function () {
    }, Pc = function (a, b) {
        if (b !== Nc) throw Error("Bad secret");
        this.g = a
    };
    m(Pc, Oc);
    Pc.prototype.toString = function () {
        return this.g
    };

    function Qc(a, b, c) {
        if (!Array.isArray(a) || !Array.isArray(a.raw) || !b && 1 !== a.length) throw new TypeError(c);
    };

    function Rc(a, b) {
        if (void 0 !== a.tagName) {
            if ("script" === a.tagName.toLowerCase()) throw Error("Use safeScriptEl.setTextContent with a SafeScript.");
            if ("style" === a.tagName.toLowerCase()) throw Error("Use safeStyleEl.setTextContent with a SafeStyleSheet.");
        }
        a.innerHTML = ic(b)
    }

    function Sc(a, b) {
        var c = Tc;
        if (0 === c.length) throw Error("No prefixes are provided");
        if (c.map(function (d) {
            if (d instanceof Pc) d = d.g; else throw Error("Unexpected type when unwrapping SafeAttributePrefix");
            return d
        }).every(function (d) {
            return 0 !== "value".indexOf(d)
        })) throw Error('Attribute "value" does not match any of the allowed prefixes.');
        a.setAttribute("value", b)
    };var Uc = Object.freeze || function (a) {
        return a
    };
    var Vc = function (a, b) {
        this.name = a;
        this.value = b
    };
    Vc.prototype.toString = function () {
        return this.name
    };
    var Wc = new Vc("OFF", Infinity), Xc = new Vc("SEVERE", 1E3), Yc = new Vc("WARNING", 900),
        Zc = new Vc("CONFIG", 700), $c = new Vc("FINE", 500), ad = function () {
            this.clear()
        }, bd;
    ad.prototype.clear = function () {
    };
    var cd = function (a, b, c) {
        this.reset(a || Wc, b, c, void 0, void 0)
    };
    cd.prototype.reset = function (a, b) {
        this.g = b
    };
    cd.prototype.getMessage = function () {
        return this.g
    };
    var dd = function (a, b) {
        this.g = null;
        this.B = [];
        this.l = (void 0 === b ? null : b) || null;
        this.u = [];
        this.o = {
            g: function () {
                return a
            }
        }
    }, ed = function (a) {
        if (a.g) return a.g;
        if (a.l) return ed(a.l);
        B("Root logger has no level set.");
        return Wc
    };
    dd.prototype.publish = function (a) {
        for (var b = this; b;) b.B.forEach(function (c) {
            c(a)
        }), b = b.l
    };
    var fd = function () {
        this.entries = {};
        var a = new dd("");
        a.g = Zc;
        this.entries[""] = a
    }, gd, hd = function (a, b) {
        var c = a.entries[b];
        if (c) return c;
        c = hd(a, b.slice(0, Math.max(b.lastIndexOf("."), 0)));
        var d = new dd(b, c);
        a.entries[b] = d;
        c.u.push(d);
        return d
    }, id = function () {
        gd || (gd = new fd);
        return gd
    }, jd = function (a, b, c) {
        var d;
        if (d = a) if (d = a && b) {
            d = b.value;
            var e = a ? ed(hd(id(), a.g())) : Wc;
            d = d >= e.value
        }
        d && (b = b || Wc, d = hd(id(), a.g()), "function" === typeof c && (c = c()), bd || (bd = new ad), a = new cd(b, c, a.g()), d.publish(a))
    }, kd = function (a, b) {
        a &&
        jd(a, Xc, b)
    }, ld = function (a, b) {
        a && jd(a, $c, b)
    };
    var md;
    try {
        new URL("s://g"), md = !0
    } catch (a) {
        md = !1
    }
    var nd = md, od = [], pd = function () {
    };
    qd(function (a) {
        var b = hd(id(), "safevalues").o;
        b && jd(b, Yc, "A URL with content '" + a + "' was sanitized away.")
    });

    function qd(a) {
        -1 === od.indexOf(a) && od.push(a);
        pd = function (b) {
            od.forEach(function (c) {
                c(b)
            })
        }
    };

    function rd(a) {
        Qc(a, !1, "safeStyle is a template literal tag function that only accepts template literals without expressions. For example, safeStyle`foo`;");
        a = a[0];
        if (/[<>]/.test(a)) throw Error("Forbidden characters in style string: " + a);
        if (!/;$/.test(a)) throw Error('Style string does not end with ";": ' + a);
        if (!/:/.test(a)) throw Error('Style string should contain one or more ":": ' + a);
        return new Ib(a, Hb)
    };var sd = function (a) {
        this.Nc = a
    };

    function td(a) {
        return new sd(function (b) {
            return b.substr(0, a.length + 1).toLowerCase() === a + ":"
        })
    }

    var ud = [td("data"), td("http"), td("https"), td("mailto"), td("ftp"), new sd(function (a) {
        return /^[^:]*([/?#]|$)/.test(a)
    })];

    function vd(a) {
        var b = void 0 === b ? ud : b;
        a:{
            b = void 0 === b ? ud : b;
            for (var c = 0; c < b.length; ++c) {
                var d = b[c];
                if (d instanceof sd && d.Nc(a)) {
                    a = new Bb(a, Ab);
                    break a
                }
            }
            a = void 0
        }
        return a || Gb
    };var wd = {Ye: !0}, xd = {Xe: !0}, yd = function () {
        throw Error("Do not instantiate directly");
    };
    yd.prototype.Bb = null;
    yd.prototype.getContent = function () {
        return this.content
    };
    yd.prototype.toString = function () {
        return this.content
    };
    yd.prototype.ac = function () {
        if (this.za !== wd) throw Error("Sanitized content was not of kind HTML.");
        return sc(new kb(ib, "Soy SanitizedContent of kind HTML produces SafeHtml-contract-compliant value."), this.toString())
    };
    var zd = function () {
        yd.call(this)
    };
    y(zd, yd);
    zd.prototype.za = wd;
    var Ad = function () {
        yd.call(this)
    };
    y(Ad, yd);
    Ad.prototype.za = xd;
    Ad.prototype.Bb = 1;
    var Bd = function (a, b, c) {
        (b = null != a && a.za === b) && A(a.constructor === c);
        return b
    };

    function Cd() {
        return Ub ? !!ac && !!ac.platform : !1
    }

    function Dd() {
        return C("iPhone") && !C("iPod") && !C("iPad")
    }

    function Ed() {
        return Dd() || C("iPad") || C("iPod")
    }

    function Fd() {
        return Cd() ? "macOS" === ac.platform : C("Macintosh")
    };var Gd = function (a) {
        Gd[" "](a);
        return a
    };
    Gd[" "] = function () {
    };
    var Hd = function (a, b) {
        try {
            return Gd(a[b]), !0
        } catch (c) {
        }
        return !1
    };
    var Id = ec(), F = dc() ? !1 : C("Trident") || C("MSIE"), Jd = C("Edge"), Kd = Jd || F,
        G = C("Gecko") && !(-1 != $b().toLowerCase().indexOf("webkit") && !C("Edge")) && !(C("Trident") || C("MSIE")) && !C("Edge"),
        H = -1 != $b().toLowerCase().indexOf("webkit") && !C("Edge"), Ld = H && C("Mobile"), Md = Fd(),
        Nd = Cd() ? "Windows" === ac.platform : C("Windows"), Od = Cd() ? "Android" === ac.platform : C("Android"),
        Pd = Dd(), Qd = C("iPad"), Rd = C("iPod"), Sd = Ed(), Td = function () {
            var a = r.document;
            return a ? a.documentMode : void 0
        }, Ud;
    a:{
        var Vd = "", Wd = function () {
            var a = $b();
            if (G) return /rv:([^\);]+)(\)|;)/.exec(a);
            if (Jd) return /Edge\/([\d\.]+)/.exec(a);
            if (F) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (H) return /WebKit\/(\S+)/.exec(a);
            if (Id) return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        Wd && (Vd = Wd ? Wd[1] : "");
        if (F) {
            var Xd = Td();
            if (null != Xd && Xd > parseFloat(Vd)) {
                Ud = String(Xd);
                break a
            }
        }
        Ud = Vd
    }
    var Yd = Ud, Zd;
    if (r.document && F) {
        var $d = Td();
        Zd = $d ? $d : parseInt(Yd, 10) || void 0
    } else Zd = void 0;
    var ae = Zd;
    var be = function (a) {
            if (null != a) switch (a.Bb) {
                case 1:
                    return 1;
                case -1:
                    return -1;
                case 0:
                    return 0
            }
            return null
        }, fe = function (a) {
            return Bd(a, wd, zd) ? a : a instanceof D ? ce(ic(a).toString()) : a instanceof D ? ce(ic(a).toString()) : ce(String(String(a)).replace(de, ee), be(a))
        }, ce = function (a) {
            function b(c) {
                this.content = c
            }

            b.prototype = a.prototype;
            return function (c, d) {
                c = new b(String(c));
                void 0 !== d && (c.Bb = d);
                return c
            }
        }(zd), ge = {}, he = function (a, b) {
            return a && b && a.Mc && b.Mc ? a.za !== b.za ? !1 : a.toString() === b.toString() : a instanceof
            yd && b instanceof yd ? a.za != b.za ? !1 : a.toString() == b.toString() : a == b
        }, I = function (a) {
            Bd(a, wd, zd) ? (a = a.getContent(), a = String(a).replace(ie, "").replace(je, "&lt;"), a = String(a).replace(ke, ee)) : a = String(a).replace(de, ee);
            return a
        }, le = {}, me = function () {
            A(le === le, "found an incorrect call marker, was an internal function called from the top level?")
        }, ne = {
            "\x00": "&#0;",
            "\t": "&#9;",
            "\n": "&#10;",
            "\v": "&#11;",
            "\f": "&#12;",
            "\r": "&#13;",
            " ": "&#32;",
            '"': "&quot;",
            "&": "&amp;",
            "'": "&#39;",
            "-": "&#45;",
            "/": "&#47;",
            "<": "&lt;",
            "=": "&#61;",
            ">": "&gt;",
            "`": "&#96;",
            "\u0085": "&#133;",
            "\u00a0": "&#160;",
            "\u2028": "&#8232;",
            "\u2029": "&#8233;"
        }, ee = function (a) {
            return ne[a]
        }, de = /[\x00\x22\x26\x27\x3c\x3e]/g, ke = /[\x00\x22\x27\x3c\x3e]/g,
        oe = /^(?!on|src|(?:action|archive|background|cite|classid|codebase|content|data|dsync|href|http-equiv|longdesc|style|usemap)\s*$)(?:[a-z0-9_$:-]*)$/i,
        ie = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g, je = /</g;
    var J = function (a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    };
    J.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")"
    };
    var pe = function (a, b) {
        return new J(a.x - b.x, a.y - b.y)
    };
    J.prototype.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    J.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    J.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    J.prototype.translate = function (a, b) {
        a instanceof J ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), "number" === typeof b && (this.y += b));
        return this
    };
    var qe = function (a, b) {
        this.width = a;
        this.height = b
    };
    k = qe.prototype;
    k.toString = function () {
        return "(" + this.width + " x " + this.height + ")"
    };
    k.aspectRatio = function () {
        return this.width / this.height
    };
    k.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    k.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    k.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var te = function (a) {
            return a ? new re(se(a)) : Fa || (Fa = new re)
        }, ue = function (a, b) {
            return "string" === typeof b ? a.getElementById(b) : b
        }, we = function (a) {
            var b = a || document;
            return b.querySelectorAll && b.querySelector ? b.querySelectorAll(".jfk-tooltip-data") : ve(document, "jfk-tooltip-data", a)
        }, xe = function (a, b) {
            var c = b || document;
            if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0]; else {
                c = document;
                var d = b || c;
                a = d.querySelectorAll && d.querySelector && a ? d.querySelector(a ? "." + a : "") : ve(c, a, b)[0] || null
            }
            return a || null
        },
        ve = function (a, b, c) {
            var d;
            a = c || a;
            if (a.querySelectorAll && a.querySelector && b) return a.querySelectorAll(b ? "." + b : "");
            if (b && a.getElementsByClassName) {
                var e = a.getElementsByClassName(b);
                return e
            }
            e = a.getElementsByTagName("*");
            if (b) {
                var f = {};
                for (c = d = 0; a = e[c]; c++) {
                    var h = a.className;
                    "function" == typeof h.split && Ya(h.split(/\s+/), b) && (f[d++] = a)
                }
                f.length = d;
                return f
            }
            return e
        }, ze = function (a, b) {
            ab(b, function (c, d) {
                c && "object" == typeof c && c.sa && (c = c.ea());
                "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ?
                    a.htmlFor = c : ye.hasOwnProperty(d) ? a.setAttribute(ye[d], c) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, c) : a[d] = c
            })
        }, ye = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            nonce: "nonce",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
        }, Ce = function (a) {
            var b = Ae(a);
            a = Be(a);
            return F && a.pageYOffset != b.scrollTop ? new J(b.scrollLeft, b.scrollTop) : new J(a.pageXOffset ||
                b.scrollLeft, a.pageYOffset || b.scrollTop)
        }, Ae = function (a) {
            return a.scrollingElement ? a.scrollingElement : !H && De(a) ? a.documentElement : a.body || a.documentElement
        }, Be = function (a) {
            return a.parentWindow || a.defaultView
        }, Ee = function (a, b, c, d) {
            function e(g) {
                g && b.appendChild("string" === typeof g ? a.createTextNode(g) : g)
            }

            for (; d < c.length; d++) {
                var f = c[d];
                if (!xa(f) || t(f) && 0 < f.nodeType) e(f); else {
                    a:{
                        if (f && "number" == typeof f.length) {
                            if (t(f)) {
                                var h = "function" == typeof f.item || "string" == typeof f.item;
                                break a
                            }
                            if ("function" ===
                                typeof f) {
                                h = "function" == typeof f.item;
                                break a
                            }
                        }
                        h = !1
                    }
                    Wa(h ? $a(f) : f, e)
                }
            }
        }, Fe = function (a, b) {
            b = String(b);
            "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
            return a.createElement(b)
        }, De = function (a) {
            return "CSS1Compat" == a.compatMode
        }, Ge = function (a, b) {
            A(null != a && null != b, "goog.dom.appendChild expects non-null arguments");
            a.appendChild(b)
        }, He = function (a) {
            for (var b; b = a.firstChild;) a.removeChild(b)
        }, Ie = function (a) {
            a && a.parentNode && a.parentNode.removeChild(a)
        }, Je = function (a, b) {
            if (!a || !b) return !1;
            if (a.contains &&
                1 == b.nodeType) return a == b || a.contains(b);
            if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
            for (; b && a != b;) b = b.parentNode;
            return b == a
        }, se = function (a) {
            A(a, "Node cannot be null or undefined.");
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        }, Ke = function (a, b) {
            A(null != a, "goog.dom.setTextContent expects a non-null value for node");
            if ("textContent" in a) a.textContent = b; else if (3 == a.nodeType) a.data = String(b); else if (a.firstChild && 3 == a.firstChild.nodeType) {
                for (; a.lastChild !=
                       a.firstChild;) a.removeChild(A(a.lastChild));
                a.firstChild.data = String(b)
            } else {
                He(a);
                var c = se(a);
                a.appendChild(c.createTextNode(String(b)))
            }
        }, Le = {SCRIPT: 1, STYLE: 1, HEAD: 1, IFRAME: 1, OBJECT: 1}, Me = {IMG: " ", BR: "\n"}, Ne = function (a, b) {
            b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
        }, Oe = function (a) {
            a = a.tabIndex;
            return "number" === typeof a && 0 <= a && 32768 > a
        }, Qe = function (a) {
            var b = [];
            Pe(a, b, !1);
            return b.join("")
        }, Pe = function (a, b, c) {
            if (!(a.nodeName in Le)) if (3 == a.nodeType) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g,
                "")) : b.push(a.nodeValue); else if (a.nodeName in Me) b.push(Me[a.nodeName]); else for (a = a.firstChild; a;) Pe(a, b, c), a = a.nextSibling
        }, Re = function (a, b) {
            for (var c = 0; a;) {
                A("parentNode" != a.name);
                if (b(a)) return a;
                a = a.parentNode;
                c++
            }
            return null
        }, re = function (a) {
            this.g = a || r.document || document
        };
    k = re.prototype;
    k.A = function (a) {
        return ue(this.g, a)
    };
    k.setProperties = ze;
    k.wa = function (a, b, c) {
        var d = this.g, e = arguments, f = e[1], h = Fe(d, String(e[0]));
        f && ("string" === typeof f ? h.className = f : Array.isArray(f) ? h.className = f.join(" ") : ze(h, f));
        2 < e.length && Ee(d, h, e, 2);
        return h
    };
    k.Ac = function (a, b) {
        Ee(se(a), a, arguments, 1)
    };
    k.getChildren = function (a) {
        return void 0 != a.children ? a.children : Array.prototype.filter.call(a.childNodes, function (b) {
            return 1 == b.nodeType
        })
    };
    k.contains = Je;/*
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    function Te(a, b, c) {
        a = a(b || Ue, void 0);
        c = c || te();
        if (a && a.g) c = a.g(); else {
            c = Fe(c.g, "DIV");
            a = Ve(a);
            b = a.ea();
            var d = b.match(We);
            A(!d, "This template starts with a %s, which cannot be a child of a <div>, as required by soy internals. Consider using goog.soy.renderElement instead.\nTemplate output: %s", d && d[0], b);
            vc(c, a)
        }
        1 == c.childNodes.length && (a = c.firstChild, 1 == a.nodeType && (c = a));
        return c
    }

    function Ve(a) {
        if (!t(a)) return kc(String(a));
        if (a.ac) {
            var b = a.ac();
            if (b instanceof D) return b
        }
        B("Soy template output is unsafe for use as HTML: " + a);
        return kc("zSoyz")
    }

    var We = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i, Ue = {};
    var Xe = function (a, b) {
        if (ge["jfk.templates.button.strict"]) return ge["jfk.templates.button.strict"](a, b);
        a = a || {};
        var c = a.attributes, d = a.content, e = a.disabled, f = a.id, h = a.df, g = a.title, l = a.Rc, n = a.value,
            p = ce;
        f = '<div role="button"' + (f ? ' id="' + I(f) + '"' : "") + ' class="';
        var q = a || {};
        a = q.Dc;
        var u = q.disabled, x = q.checked, E = q.style;
        q = q.width;
        me();
        if (ge["jfk.templates.button.classes_"]) b = ge["jfk.templates.button.classes_"]({
            Dc: a,
            disabled: u,
            checked: x,
            style: E,
            width: q
        }, b); else {
            b = "goog-inline-block jfk-button ";
            switch (t(E) ?
                E.toString() : E) {
                case 0:
                    b += "jfk-button-standard";
                    break;
                case 2:
                    b += "jfk-button-action";
                    break;
                case 3:
                    b += "jfk-button-primary";
                    break;
                case 1:
                    b += "jfk-button-default";
                    break;
                case 4:
                    b += "jfk-button-flat";
                    break;
                case 5:
                    b += "jfk-button-mini";
                    break;
                case 6:
                    b += "jfk-button-contrast";
                    break;
                default:
                    b += "jfk-button-standard"
            }
            b += (he(q, 1) ? " jfk-button-narrow" : "") + (x ? " jfk-button-checked" : "") + (a ? " " + a : "") + (u ? " jfk-button-disabled" : "")
        }
        e = f + I(b) + '"' + (e ? ' aria-disabled="true"' : ' tabindex="' + (h ? I(h) : "0") + '"') + (g ? l ? ' data-tooltip="' +
            I(g) + '"' : ' title="' + I(g) + '"' : "") + (n ? ' value="' + I(n) + '"' : "");
        c ? (Bd(c, xd, Ad) ? c = c.getContent() : (c = String(c), oe.test(c) || (B("Bad value `%s` for |filterHtmlAttributes", [c]), c = "zSoyz")), Bd(c, xd, Ad) && (c = c.getContent()), c = (c && !c.startsWith(" ") ? " " : "") + c) : c = "";
        return p(e + c + ">" + fe(null != d ? d : "") + "</div>")
    };
    var Ye = fc(), Ze = Dd() || C("iPod"), $e = C("iPad"), af = C("Android") && !(gc() || fc() || ec() || C("Silk")),
        bf = gc(),
        cf = C("Safari") && !(gc() || (dc() ? 0 : C("Coast")) || ec() || (dc() ? 0 : C("Edge")) || (dc() ? cc("Microsoft Edge") : C("Edg/")) || (dc() ? cc("Opera") : C("OPR")) || fc() || C("Silk") || C("Android")) && !Ed();
    var df = "function" === typeof Symbol && "symbol" === typeof Symbol() ? Symbol("INTERNAL_ARRAY_STATE") : void 0,
        ef = Object.getOwnPropertyDescriptor(Array.prototype, "Oc");
    Object.defineProperties(Array.prototype, {
        Oc: {
            get: function () {
                function a(e, f) {
                    e & b && c.push(f)
                }

                var b = ff(this), c = [];
                a(1, "IS_REPEATED_FIELD");
                a(2, "IS_IMMUTABLE_ARRAY");
                a(4, "IS_API_FORMATTED");
                a(8, "ONLY_MUTABLE_VALUES");
                a(16, "MUTABLE_REFERENCES_ARE_OWNED");
                a(32, "CONSTRUCTED");
                a(64, "TRANSFERRED");
                a(128, "IS_FIXED_GROUP");
                var d = c.join(",");
                return ef ? ef.get.call(this) + "|" + d : d
            }, configurable: !0, enumerable: !1
        }
    });

    function ff(a) {
        La(a, "state is only maintained on arrays.");
        var b;
        df ? b = a[df] : b = a.We;
        return null == b ? 0 : b
    };var gf = function () {
        throw Error("please construct maps as mutable then call toImmutable");
    };
    if ("undefined" != typeof Symbol && "undefined" != typeof Symbol.hasInstance) {
        var hf = function () {
            throw Error("Cannot perform instanceof checks on ImmutableMap: please use isImmutableMap or isMutableMap to assert on the mutability of a map. See go/jspb-api-gotchas#immutable-classes for more information");
        }, jf = {};
        Object.defineProperties(gf, (jf[Symbol.hasInstance] = {
            value: hf,
            configurable: !1,
            writable: !1,
            enumerable: !1
        }, jf));
        A(gf[Symbol.hasInstance] === hf, "defineProperties did not work: was it monkey-patched?")
    }
    ;
    if ("undefined" !== typeof Proxy) {
        var lf = kf;
        new Proxy({}, {
            getPrototypeOf: lf,
            setPrototypeOf: lf,
            isExtensible: lf,
            preventExtensions: lf,
            getOwnPropertyDescriptor: lf,
            defineProperty: lf,
            has: lf,
            get: lf,
            set: lf,
            deleteProperty: lf,
            apply: lf,
            construct: lf
        })
    }

    function kf() {
        throw Error("this array or object is owned by JSPB and should not be reused, did you mean to copy it with copyJspbArray? See go/jspb-api-gotchas#construct_from_array");
        throw Error();
    };A(!0);

    function mf() {
    };(function () {
        var a = r.jspbGetTypeName;
        r.jspbGetTypeName = a ? function (b) {
            return a(b) || void 0
        } : mf
    })();
    var nf = function (a) {
        return "string" == typeof a.className ? a.className : a.getAttribute && a.getAttribute("class") || ""
    }, of = function (a) {
        return a.classList ? a.classList : nf(a).match(/\S+/g) || []
    }, pf = function (a, b) {
        "string" == typeof a.className ? a.className = b : a.setAttribute && a.setAttribute("class", b)
    }, qf = function (a, b) {
        return a.classList ? a.classList.contains(b) : Ya(of(a), b)
    }, rf = function (a, b) {
        if (a.classList) a.classList.add(b); else if (!qf(a, b)) {
            var c = nf(a);
            pf(a, c + (0 < c.length ? " " + b : b))
        }
    }, sf = function (a, b) {
        if (a.classList) Array.prototype.forEach.call(b,
            function (e) {
                rf(a, e)
            }); else {
            var c = {};
            Array.prototype.forEach.call(of(a), function (e) {
                c[e] = !0
            });
            Array.prototype.forEach.call(b, function (e) {
                c[e] = !0
            });
            b = "";
            for (var d in c) b += 0 < b.length ? " " + d : d;
            pf(a, b)
        }
    }, tf = function (a, b) {
        a.classList ? a.classList.remove(b) : qf(a, b) && pf(a, Array.prototype.filter.call(of(a), function (c) {
            return c != b
        }).join(" "))
    }, uf = function (a, b) {
        a.classList ? Array.prototype.forEach.call(b, function (c) {
            tf(a, c)
        }) : pf(a, Array.prototype.filter.call(of(a), function (c) {
            return !Ya(b, c)
        }).join(" "))
    };
    var vf = function () {
    };
    vf.prototype.u = function () {
    };
    var wf = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    k = wf.prototype;
    k.toString = function () {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
    };
    k.contains = function (a) {
        return this && a ? a instanceof wf ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    k.ceil = function () {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    k.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    k.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    k.translate = function (a, b) {
        a instanceof J ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (Ia(a), this.left += a, this.right += a, "number" === typeof b && (this.top += b, this.bottom += b));
        return this
    };
    var xf = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    k = xf.prototype;
    k.toString = function () {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
    };
    k.contains = function (a) {
        return a instanceof J ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    };
    k.ceil = function () {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    k.floor = function () {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    k.round = function () {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    k.translate = function (a, b) {
        a instanceof J ? (this.left += a.x, this.top += a.y) : (this.left += Ia(a), "number" === typeof b && (this.top += b));
        return this
    };
    var zf = function (a, b, c) {
        if ("string" === typeof b) (b = yf(a, b)) && (a.style[b] = c); else for (var d in b) {
            c = a;
            var e = b[d], f = yf(c, d);
            f && (c.style[f] = e)
        }
    }, Af = {}, yf = function (a, b) {
        var c = Af[b];
        if (!c) {
            var d = Cc(b);
            c = d;
            void 0 === a.style[d] && (d = (H ? "Webkit" : G ? "Moz" : F ? "ms" : null) + Dc(d), void 0 !== a.style[d] && (c = d));
            Af[b] = c
        }
        return c
    }, Bf = function (a, b) {
        a:{
            var c = se(a);
            if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
                c = c[b] || c.getPropertyValue(b) || "";
                break a
            }
            c = ""
        }
        return c || (a.currentStyle ?
            a.currentStyle[b] : null) || a.style && a.style[b]
    }, Df = function (a, b, c) {
        if (b instanceof J) {
            var d = b.x;
            b = b.y
        } else d = b, b = c;
        a.style.left = Cf(d);
        a.style.top = Cf(b)
    }, Ef = function (a) {
        try {
            return a.getBoundingClientRect()
        } catch (b) {
            return {left: 0, top: 0, right: 0, bottom: 0}
        }
    }, Ff = function (a) {
        if (F && !(8 <= Number(ae))) return A(a && "offsetParent" in a), a.offsetParent;
        var b = se(a), c = Bf(a, "position"), d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode) if (11 == a.nodeType && a.host && (a = a.host), c = Bf(a, "position"), d = d && "static" ==
            c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
        return null
    }, Hf = function (a) {
        for (var b = new wf(0, Infinity, Infinity, 0), c = te(a), d = c.g.body, e = c.g.documentElement, f = Ae(c.g); a = Ff(a);) if (!(F && 0 == a.clientWidth || H && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != Bf(a, "overflow")) {
            var h = Gf(a), g = new J(a.clientLeft, a.clientTop);
            h.x += g.x;
            h.y += g.y;
            b.top = Math.max(b.top, h.y);
            b.right = Math.min(b.right, h.x + a.clientWidth);
            b.bottom = Math.min(b.bottom, h.y + a.clientHeight);
            b.left = Math.max(b.left, h.x)
        }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = (Be(c.g) || window).document;
        c = De(c) ? c.documentElement : c.body;
        c = new qe(c.clientWidth, c.clientHeight);
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    }, Gf = function (a) {
        var b = se(a);
        Ka(a, "Parameter is required");
        var c = new J(0, 0);
        var d = b ? se(b) : document;
        d = !F || 9 <=
        Number(ae) || De(te(d).g) ? d.documentElement : d.body;
        if (a == d) return c;
        a = Ef(a);
        b = Ce(te(b).g);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }, Jf = function (a, b) {
        a = If(a);
        b = If(b);
        return new J(a.x - b.x, a.y - b.y)
    }, Kf = function (a) {
        a = Ef(a);
        return new J(a.left, a.top)
    }, If = function (a) {
        A(a);
        if (1 == a.nodeType) return Kf(a);
        a = a.changedTouches ? a.changedTouches[0] : a;
        return new J(a.clientX, a.clientY)
    }, Cf = function (a) {
        "number" == typeof a && (a += "px");
        return a
    }, Mf = function (a) {
        var b = Lf;
        if ("none" != Bf(a, "display")) return b(a);
        var c = a.style, d =
            c.display, e = c.visibility, f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    }, Lf = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight, d = H && !b && !c;
        return (void 0 === b || d) && a.getBoundingClientRect ? (a = Ef(a), new qe(a.right - a.left, a.bottom - a.top)) : new qe(b, c)
    }, Nf = function (a) {
        var b = Gf(a);
        a = Mf(a);
        return new xf(b.x, b.y, a.width, a.height)
    }, Of = function (a, b) {
        a.style.display = b ? "" : "none"
    }, Pf = function (a) {
        return "rtl" == Bf(a, "direction")
    }, Qf =
        G ? "MozUserSelect" : H || Jd ? "WebkitUserSelect" : null;
    var Rf = function () {
        if (Nd) {
            var a = /Windows NT ([0-9.]+)/;
            return (a = a.exec($b())) ? a[1] : "0"
        }
        return Md ? (a = /1[0|1][_.][0-9_.]+/, (a = a.exec($b())) ? a[0].replace(/_/g, ".") : "10") : Od ? (a = /Android\s+([^\);]+)(\)|;)/, (a = a.exec($b())) ? a[1] : "") : Pd || Qd || Rd ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/, (a = a.exec($b())) ? a[1].replace(/_/g, ".") : "") : ""
    }();
    var Sf = function (a) {
        return (a = a.exec($b())) ? a[1] : ""
    }, Tf = function () {
        if (Ye) return Sf(/Firefox\/([0-9.]+)/);
        if (F || Jd || Id) return Yd;
        if (bf) {
            if (Ed() || Fd()) {
                var a = Sf(/CriOS\/([0-9.]+)/);
                if (a) return a
            }
            return Sf(/Chrome\/([0-9.]+)/)
        }
        if (cf && !Ed()) return Sf(/Version\/([0-9.]+)/);
        if (Ze || $e) {
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec($b())) return a[1] + "." + a[2]
        } else if (af) return (a = Sf(/Android\s+([0-9.]+)/)) ? a : Sf(/Version\/([0-9.]+)/);
        return ""
    }();
    var Uf = function (a, b) {
        return (b & 8 && Pf(a) ? b ^ 4 : b) & -9
    };
    var Vf = function (a, b) {
        this.o = a;
        this.F = !!b;
        this.N = {0: this.o + "-arrowright", 1: this.o + "-arrowup", 2: this.o + "-arrowdown", 3: this.o + "-arrowleft"}
    };
    m(Vf, vf);
    var Wf = function (a, b, c, d, e) {
        null != b && (a.Ab = b);
        null != c && (a.zb = c);
        "number" === typeof d && (a.ic = Math.max(d, 15));
        "number" === typeof e && (a.Yb = e)
    };
    Vf.prototype.u = function (a) {
        A(this.B, "Must call setElements first.");
        var b = this.zb;
        2 == b && (b = 0);
        Xf(this, this.Ab, b, 2 == this.zb ? Yf(this.Ab) ? this.g.offsetHeight / 2 : this.g.offsetWidth / 2 : this.ic, 0, a)
    };
    var Xf = function (a, b, c, d, e, f) {
        if (a.l) {
            var h = Zf(b, c), g = a.l;
            var l = Mf(g);
            l = (Yf(b) ? l.height / 2 : l.width / 2) - d;
            var n = Uf(g, h), p;
            if (p = Hf(g)) g = Nf(g), g = new wf(g.top, g.left + g.width, g.top + g.height, g.left), Yf(b) ? g.top < p.top && !(n & 1) ? l -= p.top - g.top : g.bottom > p.bottom && n & 1 && (l -= g.bottom - p.bottom) : g.left < p.left && !(n & 4) ? l -= p.left - g.left : g.right > p.right && n & 4 && (l -= g.right - p.right);
            p = Yf(b) ? new J(a.Yb, l) : new J(l, a.Yb);
            n = Yf(b) ? 6 : 9;
            a.Za && 2 == e && (n = Yf(b) ? 4 : 1);
            l = b ^ 3;
            Yf(b) && "rtl" == a.l.dir && (l = b);
            g = a.l;
            var q = Zf(l, c);
            l = a.g;
            n = a.sc ?
                n : 0;
            A(l);
            var u = l.offsetParent;
            if (u) {
                var x = "HTML" == u.tagName || "BODY" == u.tagName;
                if (!x || "static" != Bf(u, "position")) {
                    var E = Gf(u);
                    if (!x) {
                        x = Pf(u);
                        var P;
                        if (P = x) {
                            P = cf && 0 <= zb(Tf, 10);
                            var ca;
                            if (ca = Sd) ca = 0 <= zb(Rf, 10);
                            var Q = bf && 0 <= zb(Tf, 85);
                            P = G || P || ca || Q
                        }
                        x = P ? -u.scrollLeft : x && !Kd && "visible" != Bf(u, "overflowX") ? u.scrollWidth - u.clientWidth - u.scrollLeft : u.scrollLeft;
                        E = pe(E, new J(x, u.scrollTop))
                    }
                }
            }
            E = E || new J;
            u = Nf(g);
            if (x = Hf(g)) Q = new xf(x.left, x.top, x.right - x.left, x.bottom - x.top), x = Math.max(u.left, Q.left), P = Math.min(u.left +
                u.width, Q.left + Q.width), x <= P && (ca = Math.max(u.top, Q.top), Q = Math.min(u.top + u.height, Q.top + Q.height), ca <= Q && (u.left = x, u.top = ca, u.width = P - x, u.height = Q - ca));
            x = te(g);
            ca = te(l);
            if (x.g != ca.g) {
                P = x.g.body;
                ca = Be(ca.g);
                Q = new J(0, 0);
                var ra = (ra = se(P)) ? Be(ra) : window;
                if (Hd(ra, "parent")) {
                    var Se = P;
                    do {
                        var Uh = ra == ca ? Gf(Se) : Kf(A(Se));
                        Q.x += Uh.x;
                        Q.y += Uh.y
                    } while (ra && ra != ca && ra != ra.parent && (Se = ra.frameElement) && (ra = ra.parent))
                }
                P = pe(Q, Gf(P));
                !F || 9 <= Number(ae) || De(x.g) || (P = pe(P, Ce(x.g)));
                u.left += P.x;
                u.top += P.y
            }
            g = Uf(g, q);
            q = u.left;
            g & 4 ? q += u.width : g & 2 && (q += u.width / 2);
            q = new J(q, u.top + (g & 1 ? u.height : 0));
            q = pe(q, E);
            p && (q.x += (g & 4 ? -1 : 1) * p.x, q.y += (g & 1 ? -1 : 1) * p.y);
            var z;
            n && (z = Hf(l)) && (z.top -= E.y, z.right -= E.x, z.bottom -= E.y, z.left -= E.x);
            p = q;
            p = new J(p.x, p.y);
            q = Uf(l, h);
            h = Mf(l);
            g = new qe(h.width, h.height);
            p = new J(p.x, p.y);
            g = new qe(g.width, g.height);
            E = 0;
            if (f || 0 != q) q & 4 ? p.x -= g.width + (f ? f.right : 0) : q & 2 ? p.x -= g.width / 2 : f && (p.x += f.left), q & 1 ? p.y -= g.height + (f ? f.bottom : 0) : f && (p.y += f.top);
            n && (z ? (q = p, E = g, u = 0, 65 == (n & 65) && (q.x < z.left || q.x >= z.right) && (n &= -2),
            132 == (n & 132) && (q.y < z.top || q.y >= z.bottom) && (n &= -5), q.x < z.left && n & 1 && (q.x = z.left, u |= 1), n & 16 && (x = q.x, q.x < z.left && (q.x = z.left, u |= 4), q.x + E.width > z.right && (E.width = Math.min(z.right - q.x, x + E.width - z.left), E.width = Math.max(E.width, 0), u |= 4)), q.x + E.width > z.right && n & 1 && (q.x = Math.max(z.right - E.width, z.left), u |= 1), n & 2 && (u |= (q.x < z.left ? 16 : 0) | (q.x + E.width > z.right ? 32 : 0)), q.y < z.top && n & 4 && (q.y = z.top, u |= 2), n & 32 && (x = q.y, q.y < z.top && (q.y = z.top, u |= 8), q.y + E.height > z.bottom && (E.height = Math.min(z.bottom - q.y, x + E.height - z.top),
                E.height = Math.max(E.height, 0), u |= 8)), q.y + E.height > z.bottom && n & 4 && (q.y = Math.max(z.bottom - E.height, z.top), u |= 2), n & 8 && (u |= (q.y < z.top ? 64 : 0) | (q.y + E.height > z.bottom ? 128 : 0)), z = u) : z = 256, E = z);
            n = new xf(0, 0, 0, 0);
            n.left = p.x;
            n.top = p.y;
            n.width = g.width;
            n.height = g.height;
            z = E;
            z & 496 || (Df(l, new J(n.left, n.top)), g = new qe(n.width, n.height), h == g || h && g && h.width == g.width && h.height == g.height || (h = g, l = l.style, G ? l.MozBoxSizing = "border-box" : H ? l.WebkitBoxSizing = "border-box" : l.boxSizing = "border-box", l.width = Math.max(h.width, 0) +
                "px", l.height = Math.max(h.height, 0) + "px"));
            if (2 != e && z & 496) {
                Xf(a, b ^ 3, c, d, a.Za && 0 == e ? 1 : 2, f);
                return
            }
            !a.F || z & 496 || (e = parseFloat(a.g.style.left), f = parseFloat(a.g.style.top), A(!isNaN(e) && !isNaN(f), "Could not parse position."), isFinite(e) && 0 == e % 1 && isFinite(f) && 0 == f % 1 || Df(a.g, Math.round(e), Math.round(f)))
        }
        $f(a, b, c, d)
    }, $f = function (a, b, c, d) {
        var e = a.B;
        ab(a.N, function (f) {
            tf(e, f)
        }, a);
        rf(e, a.N[b]);
        e.style.top = e.style.left = e.style.right = e.style.bottom = "";
        a.l ? (c = Jf(a.l, a.g), d = ag(a.l, b), Yf(b) ? e.style.top = bg(c.y + d.y,
            a.g.offsetHeight - 15) + "px" : e.style.left = bg(c.x + d.x, a.g.offsetWidth - 15) + "px") : e.style[0 == c ? Yf(b) ? "top" : "left" : Yf(b) ? "bottom" : "right"] = d + "px"
    }, bg = function (a, b) {
        return 15 > b ? 15 : Math.min(Math.max(a, 15), b)
    }, Zf = function (a, b) {
        switch (a) {
            case 2:
                return 0 == b ? 1 : 5;
            case 1:
                return 0 == b ? 0 : 4;
            case 0:
                return 0 == b ? 12 : 13;
            default:
                return 0 == b ? 8 : 9
        }
    }, ag = function (a, b) {
        var c = 0, d = 0;
        a = Mf(a);
        switch (b) {
            case 2:
                c = a.width / 2;
                break;
            case 1:
                c = a.width / 2;
                d = a.height;
                break;
            case 0:
                d = a.height / 2;
                break;
            case 3:
                c = a.width, d = a.height / 2
        }
        return new J(c,
            d)
    }, Yf = function (a) {
        return 0 == a || 3 == a
    };
    k = Vf.prototype;
    k.sc = !1;
    k.zb = 2;
    k.ic = 20;
    k.Ab = 3;
    k.Yb = -5;
    k.Za = !1;
    var cg = {
        Sc: "activedescendant",
        Xc: "atomic",
        Yc: "autocomplete",
        ad: "busy",
        dd: "checked",
        ed: "colindex",
        kd: "controls",
        ld: "current",
        nd: "describedby",
        DISABLED: "disabled",
        rd: "dropeffect",
        sd: "expanded",
        td: "flowto",
        vd: "grabbed",
        zd: "haspopup",
        Bd: "hidden",
        Dd: "invalid",
        Ed: "label",
        Fd: "labelledby",
        Gd: "level",
        Ld: "live",
        ae: "multiline",
        be: "multiselectable",
        ge: "orientation",
        he: "owns",
        ie: "posinset",
        ke: "pressed",
        pe: "readonly",
        re: "relevant",
        se: "required",
        xe: "rowindex",
        ze: "selected",
        Be: "setsize",
        De: "sort",
        Qe: "valuemax",
        Re: "valuemin",
        Se: "valuenow",
        Te: "valuetext"
    };
    var dg;
    var eg = {
        Tc: "alert",
        Uc: "alertdialog",
        Vc: "application",
        Wc: "article",
        Zc: "banner",
        bd: "button",
        cd: "checkbox",
        fd: "columnheader",
        gd: "combobox",
        hd: "complementary",
        jd: "contentinfo",
        md: "definition",
        od: "dialog",
        pd: "directory",
        qd: "document",
        ud: "form",
        wd: "grid",
        xd: "gridcell",
        yd: "group",
        Ad: "heading",
        Cd: "img",
        Hd: "link",
        Id: "list",
        Jd: "listbox",
        Kd: "listitem",
        Md: "log",
        Nd: "main",
        Od: "marquee",
        Pd: "math",
        Qd: "menu",
        Rd: "menubar",
        Sd: "menuitem",
        Td: "menuitemcheckbox",
        Ud: "menuitemradio",
        ce: "navigation",
        ee: "note",
        fe: "option",
        je: "presentation",
        le: "progressbar",
        me: "radio",
        oe: "radiogroup",
        qe: "region",
        ue: "row",
        ve: "rowgroup",
        we: "rowheader",
        ye: "scrollbar",
        SEARCH: "search",
        Ae: "separator",
        Ce: "slider",
        Ee: "spinbutton",
        Fe: "status",
        TAB: "tab",
        Ge: "tablist",
        He: "tabpanel",
        Ie: "textbox",
        Je: "textinfo",
        Ke: "timer",
        Le: "toolbar",
        Me: "tooltip",
        Ne: "tree",
        Oe: "treegrid",
        Pe: "treeitem"
    };
    var fg = "combobox grid group listbox menu menubar radiogroup row rowgroup tablist textbox toolbar tree treegrid".split(" "),
        gg = function (a, b) {
            b ? (A(cb(eg, b), "No such ARIA role " + b), a.setAttribute("role", b)) : a.removeAttribute("role")
        }, ig = function (a, b, c) {
            Array.isArray(c) && (c = c.join(" "));
            var d = hg(b);
            "" === c || void 0 == c ? (dg || (c = {}, dg = (c.atomic = !1, c.autocomplete = "none", c.dropeffect = "none", c.haspopup = !1, c.live = "off", c.multiline = !1, c.multiselectable = !1, c.orientation = "vertical", c.readonly = !1, c.relevant = "additions text",
                c.required = !1, c.sort = "none", c.busy = !1, c.disabled = !1, c.hidden = !1, c.invalid = "false", c)), c = dg, b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
        }, jg = function (a) {
            var b = a.getAttribute(hg("activedescendant"));
            b = null == b || void 0 == b ? "" : String(b);
            return se(a).getElementById(b)
        }, hg = function (a) {
            A(a, "ARIA attribute cannot be empty.");
            A(cb(cg, a), "No such ARIA attribute " + a);
            return "aria-" + a
        };

    function kg(a) {
        a && "function" == typeof a.na && a.na()
    };var lg = function () {
        this.N = this.N;
        this.aa = this.aa
    };
    lg.prototype.N = !1;
    lg.prototype.na = function () {
        this.N || (this.N = !0, this.H())
    };
    var mg = function (a, b) {
        a.N ? b() : (a.aa || (a.aa = []), a.aa.push(b))
    };
    lg.prototype.H = function () {
        if (this.aa) for (; this.aa.length;) this.aa.shift()()
    };
    var ng = function (a) {
        lg.call(this);
        this.dom = a || te()
    };
    m(ng, lg);
    ng.prototype.u = function () {
        gg(this.A(), "tooltip");
        ig(this.A(), "live", "polite")
    };
    var og = function (a) {
        ng.call(this, a);
        this.g = this.dom.wa("DIV", "jfk-tooltip-contentId");
        this.o = this.dom.wa("DIV", "jfk-tooltip-arrow", this.dom.wa("DIV", "jfk-tooltip-arrowimplbefore"), this.dom.wa("DIV", "jfk-tooltip-arrowimplafter"));
        this.l = this.dom.wa("DIV", {"class": "jfk-tooltip", role: "tooltip"}, this.g, this.o);
        this.u()
    };
    m(og, ng);
    og.prototype.A = function () {
        return this.l
    };
    og.prototype.H = function () {
        ng.prototype.H.call(this);
        this.l && Ie(this.l)
    };
    var pg = function (a) {
        og.call(this, a)
    };
    m(pg, og);
    pg.prototype.u = function () {
        gg(this.A(), "tooltip")
    };
    var qg = function (a, b) {
        this.type = a;
        this.g = this.target = b;
        this.defaultPrevented = this.l = !1
    };
    qg.prototype.o = function () {
        this.l = !0
    };
    qg.prototype.preventDefault = function () {
        this.defaultPrevented = !0
    };
    var rg = function () {
        if (!r.addEventListener || !Object.defineProperty) return !1;
        var a = !1, b = Object.defineProperty({}, "passive", {
            get: function () {
                a = !0
            }
        });
        try {
            r.addEventListener("test", function () {
            }, b), r.removeEventListener("test", function () {
            }, b)
        } catch (c) {
        }
        return a
    }();
    var tg = function (a, b) {
        qg.call(this, a ? a.type : "");
        this.relatedTarget = this.g = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.u = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.ka = null;
        if (a) {
            var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.g = b;
            (b = a.relatedTarget) ? G && (Hd(b, "nodeName") || (b =
                null)) : "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey =
                a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.u = Md ? a.metaKey : a.ctrlKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = "string" === typeof a.pointerType ? a.pointerType : sg[a.pointerType] || "";
            this.state = a.state;
            this.ka = a;
            a.defaultPrevented && tg.I.preventDefault.call(this)
        }
    };
    y(tg, qg);
    var sg = Uc({2: "touch", 3: "pen", 4: "mouse"});
    tg.prototype.o = function () {
        tg.I.o.call(this);
        this.ka.stopPropagation ? this.ka.stopPropagation() : this.ka.cancelBubble = !0
    };
    tg.prototype.preventDefault = function () {
        tg.I.preventDefault.call(this);
        var a = this.ka;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    };
    var ug = "closure_listenable_" + (1E6 * Math.random() | 0), vg = function (a) {
        return !(!a || !a[ug])
    };
    var wg = 0;
    var xg = function (a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.gb = e;
        this.key = ++wg;
        this.removed = this.ab = !1
    }, yg = function (a) {
        a.removed = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.gb = null
    };
    var zg = function (a) {
        this.src = a;
        this.g = {};
        this.l = 0
    };
    zg.prototype.add = function (a, b, c, d, e) {
        var f = a.toString();
        a = this.g[f];
        a || (a = this.g[f] = [], this.l++);
        var h = Ag(a, b, d, e);
        -1 < h ? (b = a[h], c || (b.ab = !1)) : (b = new xg(b, this.src, f, !!d, e), b.ab = c, a.push(b));
        return b
    };
    zg.prototype.remove = function (a, b, c, d) {
        a = a.toString();
        if (!(a in this.g)) return !1;
        var e = this.g[a];
        b = Ag(e, b, c, d);
        return -1 < b ? (yg(e[b]), A(null != e.length), Array.prototype.splice.call(e, b, 1), 0 == e.length && (delete this.g[a], this.l--), !0) : !1
    };
    var Bg = function (a, b) {
        var c = b.type;
        if (!(c in a.g)) return !1;
        var d = Za(a.g[c], b);
        d && (yg(b), 0 == a.g[c].length && (delete a.g[c], a.l--));
        return d
    };
    zg.prototype.removeAll = function (a) {
        a = a && a.toString();
        var b = 0, c;
        for (c in this.g) if (!a || c == a) {
            for (var d = this.g[c], e = 0; e < d.length; e++) ++b, yg(d[e]);
            delete this.g[c];
            this.l--
        }
        return b
    };
    zg.prototype.eb = function (a, b) {
        a = this.g[a.toString()];
        var c = [];
        if (a) for (var d = 0; d < a.length; ++d) {
            var e = a[d];
            e.capture == b && c.push(e)
        }
        return c
    };
    zg.prototype.Pa = function (a, b, c, d) {
        a = this.g[a.toString()];
        var e = -1;
        a && (e = Ag(a, b, c, d));
        return -1 < e ? a[e] : null
    };
    zg.prototype.hasListener = function (a, b) {
        var c = void 0 !== a, d = c ? a.toString() : "", e = void 0 !== b;
        return bb(this.g, function (f) {
            for (var h = 0; h < f.length; ++h) if (!(c && f[h].type != d || e && f[h].capture != b)) return !0;
            return !1
        })
    };
    var Ag = function (a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.removed && f.listener == b && f.capture == !!c && f.gb == d) return e
        }
        return -1
    };
    var Cg = "closure_lm_" + (1E6 * Math.random() | 0), Dg = {}, Eg = 0, Gg = function (a, b, c, d, e) {
        if (d && d.once) return Fg(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) Gg(a, b[f], c, d, e);
            return null
        }
        c = Hg(c);
        return vg(a) ? a.listen(b, c, t(d) ? !!d.capture : !!d, e) : Ig(a, b, c, !1, d, e)
    }, Ig = function (a, b, c, d, e, f) {
        if (!b) throw Error("Invalid event type");
        var h = t(e) ? !!e.capture : !!e, g = Jg(a);
        g || (a[Cg] = g = new zg(a));
        c = g.add(b, c, d, h, f);
        if (c.proxy) return c;
        d = Kg();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) rg || (e = h), void 0 ===
        e && (e = !1), a.addEventListener(b.toString(), d, e); else if (a.attachEvent) a.attachEvent(Lg(b.toString()), d); else if (a.addListener && a.removeListener) A("change" === b, "MediaQueryList only has a change event"), a.addListener(d); else throw Error("addEventListener and attachEvent are unavailable.");
        Eg++;
        return c
    }, Kg = function () {
        var a = Mg, b = function (c) {
            return a.call(b.src, b.listener, c)
        };
        return b
    }, Fg = function (a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) Fg(a, b[f], c, d, e);
            return null
        }
        c = Hg(c);
        return vg(a) ?
            a.Xb(b, c, t(d) ? !!d.capture : !!d, e) : Ig(a, b, c, !0, d, e)
    }, Ng = function (a, b, c, d, e) {
        if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Ng(a, b[f], c, d, e); else d = t(d) ? !!d.capture : !!d, c = Hg(c), vg(a) ? a.fa(b, c, d, e) : a && (a = Jg(a)) && (b = a.Pa(b, c, d, e)) && Og(b)
    }, Og = function (a) {
        if ("number" === typeof a || !a || a.removed) return !1;
        var b = a.src;
        if (vg(b)) return Bg(b.V, a);
        var c = a.type, d = a.proxy;
        b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Lg(c), d) : b.addListener && b.removeListener && b.removeListener(d);
        Eg--;
        (c = Jg(b)) ? (Bg(c, a), 0 == c.l && (c.src = null, b[Cg] = null)) : yg(a);
        return !0
    }, Pg = function (a) {
        if (a) if (vg(a)) a.V && a.V.removeAll(void 0); else if (a = Jg(a)) {
            var b = 0, c;
            for (c in a.g) for (var d = a.g[c].concat(), e = 0; e < d.length; ++e) Og(d[e]) && ++b
        }
    }, Lg = function (a) {
        return a in Dg ? Dg[a] : Dg[a] = "on" + a
    }, Mg = function (a, b) {
        if (a.removed) a = !0; else {
            b = new tg(b, this);
            var c = a.listener, d = a.gb || a.src;
            a.ab && Og(a);
            a = c.call(d, b)
        }
        return a
    }, Jg = function (a) {
        a = a[Cg];
        return a instanceof zg ? a : null
    }, Qg = "__closure_events_fn_" + (1E9 * Math.random() >>>
        0), Hg = function (a) {
        A(a, "Listener can not be null.");
        if ("function" === typeof a) return a;
        A(a.handleEvent, "An object listener must have handleEvent method.");
        a[Qg] || (a[Qg] = function (b) {
            return a.handleEvent(b)
        });
        return a[Qg]
    };
    var K = function () {
        lg.call(this);
        this.V = new zg(this);
        this.Cc = this;
        this.Zb = null
    };
    y(K, lg);
    K.prototype[ug] = !0;
    k = K.prototype;
    k.addEventListener = function (a, b, c, d) {
        Gg(this, a, b, c, d)
    };
    k.removeEventListener = function (a, b, c, d) {
        Ng(this, a, b, c, d)
    };
    k.dispatchEvent = function (a) {
        Rg(this);
        var b = this.Zb;
        if (b) {
            var c = [];
            for (var d = 1; b; b = b.Zb) c.push(b), A(1E3 > ++d, "infinite loop")
        }
        b = this.Cc;
        d = a.type || a;
        if ("string" === typeof a) a = new qg(a, b); else if (a instanceof qg) a.target = a.target || b; else {
            var e = a;
            a = new qg(d, b);
            eb(a, e)
        }
        e = !0;
        if (c) for (var f = c.length - 1; !a.l && 0 <= f; f--) {
            var h = a.g = c[f];
            e = Sg(h, d, !0, a) && e
        }
        a.l || (h = a.g = b, e = Sg(h, d, !0, a) && e, a.l || (e = Sg(h, d, !1, a) && e));
        if (c) for (f = 0; !a.l && f < c.length; f++) h = a.g = c[f], e = Sg(h, d, !1, a) && e;
        return e
    };
    k.H = function () {
        K.I.H.call(this);
        this.V && this.V.removeAll(void 0);
        this.Zb = null
    };
    k.listen = function (a, b, c, d) {
        Rg(this);
        return this.V.add(String(a), b, !1, c, d)
    };
    k.Xb = function (a, b, c, d) {
        return this.V.add(String(a), b, !0, c, d)
    };
    k.fa = function (a, b, c, d) {
        return this.V.remove(String(a), b, c, d)
    };
    var Sg = function (a, b, c, d) {
        b = a.V.g[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var h = b[f];
            if (h && !h.removed && h.capture == c) {
                var g = h.listener, l = h.gb || h.src;
                h.ab && Bg(a.V, h);
                e = !1 !== g.call(l, d) && e
            }
        }
        return e && !d.defaultPrevented
    };
    K.prototype.eb = function (a, b) {
        return this.V.eb(String(a), b)
    };
    K.prototype.Pa = function (a, b, c, d) {
        return this.V.Pa(String(a), b, c, d)
    };
    K.prototype.hasListener = function (a, b) {
        return this.V.hasListener(void 0 !== a ? String(a) : void 0, b)
    };
    var Rg = function (a) {
        A(a.V, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
    };
    r.console && r.console.createTask && r.console.createTask.bind(r.console);
    var Tg = function (a, b, c) {
        if ("function" === typeof a) c && (a = v(a, c)); else if (a && "function" == typeof a.handleEvent) a = v(a.handleEvent, a); else throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : r.setTimeout(a, b || 0)
    };
    var Ug = function (a, b, c) {
        lg.call(this);
        this.Wa = a;
        this.o = b || 0;
        this.g = c;
        this.l = v(this.Ec, this)
    };
    y(Ug, lg);
    k = Ug.prototype;
    k.W = 0;
    k.H = function () {
        Ug.I.H.call(this);
        this.stop();
        delete this.Wa;
        delete this.g
    };
    k.start = function (a) {
        this.stop();
        this.W = Tg(this.l, void 0 !== a ? a : this.o)
    };
    k.stop = function () {
        this.isActive() && r.clearTimeout(this.W);
        this.W = 0
    };
    k.isActive = function () {
        return 0 != this.W
    };
    k.Ec = function () {
        this.W = 0;
        this.Wa && this.Wa.call(this.g)
    };
    var L = function (a) {
        lg.call(this);
        this.J = a;
        this.u = {}
    };
    y(L, lg);
    var Vg = [];
    L.prototype.listen = function (a, b, c, d) {
        Array.isArray(b) || (b && (Vg[0] = b.toString()), b = Vg);
        for (var e = 0; e < b.length; e++) {
            var f = Gg(a, b[e], c || this.handleEvent, d || !1, this.J || this);
            if (!f) break;
            this.u[f.key] = f
        }
        return this
    };
    L.prototype.Xb = function (a, b, c, d) {
        return Wg(this, a, b, c, d)
    };
    var Wg = function (a, b, c, d, e, f) {
        if (Array.isArray(c)) for (var h = 0; h < c.length; h++) Wg(a, b, c[h], d, e, f); else {
            b = Fg(b, c, d || a.handleEvent, e, f || a.J || a);
            if (!b) return a;
            a.u[b.key] = b
        }
        return a
    };
    L.prototype.fa = function (a, b, c, d, e) {
        if (Array.isArray(b)) for (var f = 0; f < b.length; f++) this.fa(a, b[f], c, d, e); else c = c || this.handleEvent, d = t(d) ? !!d.capture : !!d, e = e || this.J || this, c = Hg(c), d = !!d, b = vg(a) ? a.Pa(b, c, d, e) : a ? (a = Jg(a)) ? a.Pa(b, c, d, e) : null : null, b && (Og(b), delete this.u[b.key]);
        return this
    };
    L.prototype.removeAll = function () {
        ab(this.u, function (a, b) {
            this.u.hasOwnProperty(b) && Og(a)
        }, this);
        this.u = {}
    };
    L.prototype.H = function () {
        L.I.H.call(this);
        this.removeAll()
    };
    L.prototype.handleEvent = function () {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var Zg = function (a) {
        return zc(pb(a.replace(Xg, function (b, c) {
            return Yg.test(c) ? "" : " "
        }).replace(/[\t\n ]+/g, " ")))
    }, Yg = /^(?:abbr|acronym|address|b|em|i|small|strong|su[bp]|u)$/i, Xg = /<[!\/]?([a-z0-9]+)([\/ ][^>]*)?>/gi;

    function $g(a, b) {
        if (b instanceof Bb) b = Cb(b); else {
            b:if (nd) {
                try {
                    var c = new URL(b)
                } catch (d) {
                    c = "https:";
                    break b
                }
                c = c.protocol
            } else c:{
                c = document.createElement("a");
                try {
                    c.href = b
                } catch (d) {
                    c = void 0;
                    break c
                }
                c = c.protocol;
                c = ":" === c || "" === c ? "https:" : c
            }
            "javascript:" === c && (pd(b), b = void 0)
        }
        void 0 !== b && (a.href = b)
    };var ah = {}, bh = function (a) {
        L.call(this);
        this.T = a;
        this.R = new Ug(this.ya, 0, this);
        mg(this, w(kg, this.R));
        var b = window;
        this.K = "function" === typeof b.MutationObserver ? new b.MutationObserver(v(this.ua, this)) : null;
        a = a.g;
        this.listen(a, "mouseout mousedown click blur focusout keydown".split(" "), this.ia, !0);
        this.listen(a, ["mouseover", "focus", "focusin"], this.xa, !0)
    };
    m(bh, L);
    bh.prototype.H = function () {
        ch(this);
        L.prototype.H.call(this)
    };
    var dh = function (a, b) {
        switch (b.type) {
            case "mousedown":
            case "mouseover":
            case "mouseout":
            case "click":
                a.ga = !1;
                break;
            case "keydown":
                a.ga = !0
        }
    };
    bh.prototype.xa = function (a) {
        this.K && this.K.disconnect();
        dh(this, a);
        var b = a.target;
        a = "focus" == a.type || "focusin" == a.type;
        var c = this.g && Je(this.g.g, b);
        if (this.ga || !a || c) {
            this.va = a;
            if (a = b && b.getAttribute && this.K) a = b.getAttribute("role") || null, a = Ya(fg, a);
            a && (this.K.observe(b, {attributes: !0}), (a = jg(b)) && (b = a));
            this.o = b
        } else this.o = null;
        eh(this)
    };
    bh.prototype.ia = function (a) {
        dh(this, a);
        var b = a.target;
        a = "mousedown" == a.type || "click" == a.type;
        b = this.g && Je(this.g.g, b);
        a && b || (this.o = null, eh(this))
    };
    bh.prototype.ua = function (a) {
        Wa(a, v(function (b) {
            var c = jg(b.target);
            c && "aria-activedescendant" == b.attributeName && (this.o = c, eh(this))
        }, this))
    };
    var eh = function (a) {
        if (!(a.R.isActive() && a.l && a.F)) {
            ch(a);
            var b = null != a.F ? a.F : 50;
            a.R.start(a.l ? b : 300)
        }
    }, ch = function (a) {
        a.O && (r.clearTimeout(a.O), a.O = 0, a.l = null)
    };
    bh.prototype.ya = function () {
        if (!this.o) fh(this), this.F = this.l = null; else if (!(this.l && this.g && Je(this.g.A(), this.o)) || this.l.getAttribute("data-tooltip-unhoverable")) {
            var a = Re(this.o, function (g) {
                return g.getAttribute && (g.getAttribute("data-tooltip-contained") || g.getAttribute("data-tooltip") || g.g) && !g.getAttribute("data-tooltip-suspended")
            }), b = !1;
            this.l && this.l != a && (fh(this), this.F = this.l = null, b = !0);
            if (!this.l && a && (this.l = a, !(a.getAttribute("data-tooltip-only-on-overflow") && a.offsetWidth >= a.scrollWidth &&
                a.offsetHeight >= a.scrollHeight || this.va && "mouse" == a.getAttribute("data-tooltip-trigger")))) {
                var c = mc;
                if (a.getAttribute("data-tooltip-contained")) for (var d = we(a), e = 0; e < d.length; e++) {
                    if (d[e].parentNode == a) {
                        c = d[e].cloneNode(!0);
                        break
                    }
                } else c = a.g ? a.g : lc(a.getAttribute("data-tooltip"));
                d = a.getAttribute("data-tooltip-align");
                e = a.getAttribute("data-tooltip-class");
                var f = a.getAttribute("data-tooltip-offset");
                f = ob(Bc(f)) ? -1 : Number(f);
                var h = a.getAttribute("data-tooltip-hide-delay");
                h = ob(Bc(h)) ? null : Number(h);
                if (!b && (a = a.getAttribute("data-tooltip-delay"), a = Math.max(0, a - 300))) {
                    this.O = Tg(w(this.ha, this.l, c, d, f, e, h), a, this);
                    return
                }
                this.ha(this.l, c, d, f, e, h)
            }
        }
    };
    var gh = function (a) {
        if (a) switch (a.toLowerCase().split(",")[0]) {
            case "l":
                return 0;
            case "t":
                return 2;
            case "r":
                return 3
        }
        return 1
    };
    bh.prototype.ha = function (a, b, c, d, e, f) {
        this.O = 0;
        this.F = f;
        if (!this.g) {
            this.g = new pg(this.T);
            fh(this);
            Ge(this.T.g.body, this.g.A());
            mg(this, w(kg, this.g));
            this.B = new Vf("jfk-tooltip", !0);
            this.B.sc = !0;
            this.B.Za = !0;
            f = this.B;
            var h = this.g.A(), g = this.g.o;
            f.g = h;
            f.B = g
        }
        a:{
            if (c) switch (c.toLowerCase().split(",")[1]) {
                case "l":
                    f = 0;
                    break a;
                case "r":
                    f = 1;
                    break a
            }
            f = 2
        }
        Wf(this.B, gh(c), f, void 0, d);
        tf(this.g.A(), "jfk-tooltip-hide");
        this.M != e && (this.M && !ob(Bc(this.M)) && tf(this.g.A(), this.M), ob(Bc(e)) || rf(this.g.A(), e), this.M =
            e);
        Df(this.g.A(), 0, 0);
        if (b instanceof D) Rc(this.g.g, b); else for (He(this.g.g); c = b.firstChild;) this.g.g.appendChild(c);
        this.B.l = a;
        this.B.u()
    };
    var fh = function (a) {
        a.g && rf(a.g.A(), "jfk-tooltip-hide")
    };
    var hh = [], ih = function (a) {
        A(!Object.isSealed(a), "Cannot use getInstance() with a sealed constructor.");
        var b = "Da";
        if (a.Da && a.hasOwnProperty(b)) return a.Da;
        hh.push(a);
        var c = new a;
        a.Da = c;
        A(a.hasOwnProperty(b), "Could not instantiate singleton.");
        return c
    };
    var lh = function (a, b, c, d, e, f) {
        if (Md && e) return jh(a);
        if (e && !d) return !1;
        if (!G) {
            "number" === typeof b && (b = kh(b));
            var h = 17 == b || 18 == b || Md && 91 == b;
            if ((!c || Md) && h || Md && 16 == b && (d || f)) return !1
        }
        if ((H || Jd) && d && c) switch (a) {
            case 220:
            case 219:
            case 221:
            case 192:
            case 186:
            case 189:
            case 187:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
                return !1
        }
        if (F && d && b == a) return !1;
        switch (a) {
            case 13:
                return G ? f || e ? !1 : !(c && d) : !0;
            case 27:
                return !(H || Jd || G)
        }
        return G && (d || e || f) ? !1 : jh(a)
    }, jh = function (a) {
        if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a &&
            90 >= a || (H || Jd) && 0 == a) return !0;
        switch (a) {
            case 32:
            case 43:
            case 63:
            case 64:
            case 107:
            case 109:
            case 110:
            case 111:
            case 186:
            case 59:
            case 189:
            case 187:
            case 61:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
            case 219:
            case 220:
            case 221:
            case 163:
            case 58:
                return !0;
            case 173:
                return G;
            default:
                return !1
        }
    }, kh = function (a) {
        if (G) a = mh(a); else if (Md && H) switch (a) {
            case 93:
                a = 91
        }
        return a
    }, mh = function (a) {
        switch (a) {
            case 61:
                return 187;
            case 59:
                return 186;
            case 173:
                return 189;
            case 224:
                return 91;
            case 0:
                return 224;
            default:
                return a
        }
    };
    var nh = function (a, b, c, d) {
        tg.call(this, d);
        this.type = "key";
        this.keyCode = a;
        this.repeat = c
    };
    y(nh, tg);
    var oh = function (a, b) {
        K.call(this);
        a && this.attach(a, b)
    };
    y(oh, K);
    k = oh.prototype;
    k.Ea = null;
    k.ib = null;
    k.Vb = null;
    k.jb = null;
    k.X = -1;
    k.pa = -1;
    k.yb = !1;
    var ph = {
        3: 13,
        12: 144,
        63232: 38,
        63233: 40,
        63234: 37,
        63235: 39,
        63236: 112,
        63237: 113,
        63238: 114,
        63239: 115,
        63240: 116,
        63241: 117,
        63242: 118,
        63243: 119,
        63244: 120,
        63245: 121,
        63246: 122,
        63247: 123,
        63248: 44,
        63272: 46,
        63273: 36,
        63275: 35,
        63276: 33,
        63277: 34,
        63289: 144,
        63302: 45
    }, qh = {
        Up: 38,
        Down: 40,
        Left: 37,
        Right: 39,
        Enter: 13,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        "U+007F": 46,
        Home: 36,
        End: 35,
        PageUp: 33,
        PageDown: 34,
        Insert: 45
    }, rh = Md && G;
    k = oh.prototype;
    k.Gc = function (a) {
        if (H || Jd) if (17 == this.X && !a.ctrlKey || 18 == this.X && !a.altKey || Md && 91 == this.X && !a.metaKey) this.pa = this.X = -1;
        -1 == this.X && (a.ctrlKey && 17 != a.keyCode ? this.X = 17 : a.altKey && 18 != a.keyCode ? this.X = 18 : a.metaKey && 91 != a.keyCode && (this.X = 91));
        lh(a.keyCode, this.X, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? (this.pa = kh(a.keyCode), rh && (this.yb = a.altKey)) : this.handleEvent(a)
    };
    k.Ic = function (a) {
        this.pa = this.X = -1;
        this.yb = a.altKey
    };
    k.handleEvent = function (a) {
        var b = a.ka, c = b.altKey;
        if (F && "keypress" == a.type) {
            var d = this.pa;
            var e = 13 != d && 27 != d ? b.keyCode : 0
        } else (H || Jd) && "keypress" == a.type ? (d = this.pa, e = 0 <= b.charCode && 63232 > b.charCode && jh(d) ? b.charCode : 0) : ("keypress" == a.type ? (rh && (c = this.yb), b.keyCode == b.charCode ? 32 > b.keyCode ? (d = b.keyCode, e = 0) : (d = this.pa, e = b.charCode) : (d = b.keyCode || this.pa, e = b.charCode || 0)) : (d = b.keyCode || this.pa, e = b.charCode || 0), Md && 63 == e && 224 == d && (d = 191));
        var f = d = kh(d);
        d ? 63232 <= d && d in ph ? f = ph[d] : 25 == d && a.shiftKey && (f =
            9) : b.keyIdentifier && b.keyIdentifier in qh && (f = qh[b.keyIdentifier]);
        if (!G || "keypress" != a.type || lh(f, this.X, a.shiftKey, a.ctrlKey, c, a.metaKey)) a = f == this.X, this.X = f, b = new nh(f, e, a, b), b.altKey = c, this.dispatchEvent(b)
    };
    k.A = function () {
        return this.Ea
    };
    k.attach = function (a, b) {
        this.jb && this.detach();
        this.Ea = a;
        this.ib = Gg(this.Ea, "keypress", this, b);
        this.Vb = Gg(this.Ea, "keydown", this.Gc, b, this);
        this.jb = Gg(this.Ea, "keyup", this.Ic, b, this)
    };
    k.detach = function () {
        this.ib && (Og(this.ib), Og(this.Vb), Og(this.jb), this.jb = this.Vb = this.ib = null);
        this.Ea = null;
        this.pa = this.X = -1
    };
    k.H = function () {
        oh.I.H.call(this);
        this.detach()
    };
    var sh = function () {
    };
    va(sh);
    var uh = function (a) {
        K.call(this);
        this.o = a || te();
        this.ha = th;
        this.W = null;
        this.Y = !1;
        this.g = null;
        this.B = void 0;
        this.O = this.ga = this.u = null;
        this.Ya = !1
    };
    y(uh, K);
    sh.Z();
    var th = null, vh = function (a, b) {
        switch (a) {
            case 1:
                return b ? "disable" : "enable";
            case 2:
                return b ? "highlight" : "unhighlight";
            case 4:
                return b ? "activate" : "deactivate";
            case 8:
                return b ? "select" : "unselect";
            case 16:
                return b ? "check" : "uncheck";
            case 32:
                return b ? "focus" : "blur";
            case 64:
                return b ? "open" : "close"
        }
        throw Error("Invalid component state");
    }, wh = function (a, b) {
        if (a.u && a.u.O) {
            var c = a.u.O, d = a.W;
            d in c && delete c[d];
            c = a.u.O;
            if (null !== c && b in c) throw Error('The object already contains the key "' + b + '"');
            c[b] = a
        }
        a.W = b
    };
    uh.prototype.A = function () {
        return this.g
    };
    var xh = function (a) {
        a = a.g;
        A(a, "Can not call getElementStrict before rendering/decorating.");
        return a
    }, yh = function (a) {
        a.B || (a.B = new L(a));
        return A(a.B)
    };
    uh.prototype.pb = function () {
        this.g = Fe(this.o.g, "DIV")
    };
    var zh = function (a, b) {
        if (a.Y) throw Error("Component already rendered");
        a.g || a.pb();
        b ? b.insertBefore(a.g, null) : a.o.g.body.appendChild(a.g);
        a.u && !a.u.Y || a.oa()
    }, Ah = function (a, b) {
        if (a.Y) throw Error("Component already rendered");
        if (b && a.bc(b)) {
            a.Ya = !0;
            var c = se(b);
            a.o && a.o.g == c || (a.o = te(b));
            a.lc(b);
            a.oa()
        } else throw Error("Invalid element to decorate");
    };
    k = uh.prototype;
    k.bc = function () {
        return !0
    };
    k.lc = function (a) {
        this.g = a
    };
    k.oa = function () {
        this.Y = !0;
        Bh(this, function (a) {
            !a.Y && a.A() && a.oa()
        })
    };
    k.bb = function () {
        Bh(this, function (a) {
            a.Y && a.bb()
        });
        this.B && this.B.removeAll();
        this.Y = !1
    };
    k.H = function () {
        this.Y && this.bb();
        this.B && (this.B.na(), delete this.B);
        Bh(this, function (a) {
            a.na()
        });
        !this.Ya && this.g && Ie(this.g);
        this.u = this.g = this.O = this.ga = null;
        uh.I.H.call(this)
    };
    k.qb = function () {
        return this.g
    };
    var Bh = function (a, b) {
        a.ga && a.ga.forEach(b, void 0)
    };
    var Ch = function () {
    }, Dh;
    va(Ch);
    var Eh = {
        button: "pressed",
        checkbox: "checked",
        menuitem: "selected",
        menuitemcheckbox: "checked",
        menuitemradio: "checked",
        radio: "checked",
        tab: "selected",
        treeitem: "selected"
    };
    Ch.prototype.rb = function () {
    };
    Ch.prototype.Ha = function (a) {
        return a.o.wa("DIV", Fh(this, a).join(" "), a.getContent())
    };
    var Gh = function (a, b, c) {
        (a = a.A ? a.A() : a) && (c ? sf : uf)(a, [b])
    };
    Ch.prototype.cc = function () {
        return !0
    };
    Ch.prototype.qa = function (a, b) {
        b.id && wh(a, b.id);
        b && b.firstChild ? Hh(a, b.firstChild.nextSibling ? $a(b.childNodes) : b.firstChild) : a.Ia = null;
        var c = 0, d = this.P(), e = this.P(), f = !1, h = !1, g = $a(of(b));
        g.forEach(function (l) {
            f || l != d ? h || l != e ? c |= Ih(this, l) : h = !0 : (f = !0, e == d && (h = !0));
            1 == Ih(this, l) && (Ma(b), b.hasAttribute("tabindex") && Oe(b) && Ne(b, !1))
        }, this);
        a.L = c;
        f || (g.push(d), e == d && (h = !0));
        h || g.push(e);
        (a = a.ba) && g.push.apply(g, a);
        f && h && !a || pf(b, g.join(" "));
        return b
    };
    Ch.prototype.qc = function (a) {
        null == a.ha && (a.ha = Pf(a.Y ? a.g : a.o.g.body));
        a.ha && this.ec(a.A(), !0);
        a.isEnabled() && this.lb(a, a.isVisible())
    };
    var Jh = function (a, b) {
        if (a = a.rb()) {
            A(b, "The element passed as a first parameter cannot be null.");
            var c = b.getAttribute("role") || null;
            a != c && gg(b, a)
        }
    };
    k = Ch.prototype;
    k.sb = function (a, b) {
        var c = !b;
        b = F ? a.getElementsByTagName("*") : null;
        if (Qf) {
            if (c = c ? "none" : "", a.style && (a.style[Qf] = c), b) {
                a = 0;
                for (var d; d = b[a]; a++) d.style && (d.style[Qf] = c)
            }
        } else if (F && (c = c ? "on" : "", a.setAttribute("unselectable", c), b)) for (a = 0; d = b[a]; a++) d.setAttribute("unselectable", c)
    };
    k.ec = function (a, b) {
        Gh(a, this.P() + "-rtl", b)
    };
    k.dc = function (a) {
        var b;
        return a.S & 32 && (b = a.A()) ? b.hasAttribute("tabindex") && Oe(b) : !1
    };
    k.lb = function (a, b) {
        var c;
        if (a.S & 32 && (c = a.A())) {
            if (!b && a.L & 32) {
                try {
                    c.blur()
                } catch (d) {
                }
                a.L & 32 && a.oc(null)
            }
            (c.hasAttribute("tabindex") && Oe(c)) != b && Ne(c, b)
        }
    };
    k.tb = function (a, b, c) {
        var d = a.A();
        if (d) {
            var e = Kh(this, b);
            e && Gh(a, e, c);
            this.ma(d, b, c)
        }
    };
    k.ma = function (a, b, c) {
        Dh || (Dh = {1: "disabled", 8: "selected", 16: "checked", 64: "expanded"});
        A(a, "The element passed as a first parameter cannot be null.");
        b = Dh[b];
        var d = a.getAttribute("role") || null;
        d && (d = Eh[d] || b, b = "checked" == b || "selected" == b ? d : b);
        b && ig(a, b, c)
    };
    k.P = function () {
        return "goog-control"
    };
    var Fh = function (a, b) {
        var c = a.P(), d = [c], e = a.P();
        e != c && d.push(e);
        c = b.getState();
        for (e = []; c;) {
            var f = c & -c;
            e.push(Kh(a, f));
            c &= ~f
        }
        d.push.apply(d, e);
        (a = b.ba) && d.push.apply(d, a);
        return d
    }, Kh = function (a, b) {
        a.l || Lh(a);
        return a.l[b]
    }, Ih = function (a, b) {
        if (!a.M) {
            a.l || Lh(a);
            var c = a.l, d = {}, e;
            for (e in c) d[c[e]] = e;
            a.M = d
        }
        a = parseInt(a.M[b], 10);
        return isNaN(a) ? 0 : a
    }, Lh = function (a) {
        var b = a.P();
        var c = -1 != b.replace(/\xa0|\s/g, " ").indexOf(" ");
        A(!c, "ControlRenderer has an invalid css class: '" + b + "'");
        a.l = {
            1: b + "-disabled",
            2: b + "-hover",
            4: b + "-active",
            8: b + "-selected",
            16: b + "-checked",
            32: b + "-focused",
            64: b + "-open"
        }
    };
    var Mh = function () {
    };
    y(Mh, Ch);
    va(Mh);
    k = Mh.prototype;
    k.rb = function () {
        return "button"
    };
    k.ma = function (a, b, c) {
        switch (b) {
            case 8:
            case 16:
                A(a, "The button DOM element cannot be null.");
                ig(a, "pressed", c);
                break;
            default:
            case 64:
            case 1:
                Mh.I.ma.call(this, a, b, c)
        }
    };
    k.Ha = function (a) {
        var b = Mh.I.Ha.call(this, a);
        this.nb(b, a.Ta());
        var c = a.Ca();
        c && this.ub(b, c);
        a.S & 16 && this.ma(b, 16, !!(a.L & 16));
        return b
    };
    k.qa = function (a, b) {
        b = Mh.I.qa.call(this, a, b);
        var c = this.Ca(b);
        a.ua = c;
        a.J = this.Ta(b);
        a.S & 16 && this.ma(b, 16, !!(a.L & 16));
        return b
    };
    k.Ca = function () {
    };
    k.ub = function () {
    };
    k.Ta = function (a) {
        return a.title
    };
    k.nb = function (a, b) {
        a && (b ? a.title = b : a.removeAttribute("title"))
    };
    k.P = function () {
        return "goog-button"
    };
    var Nh = {
        wb: "mousedown",
        xb: "mouseup",
        hc: "mousecancel",
        Xd: "mousemove",
        Zd: "mouseover",
        Yd: "mouseout",
        Vd: "mouseenter",
        Wd: "mouseleave"
    };
    var Oh = function (a, b) {
        if (!a) throw Error("Invalid class name " + a);
        if ("function" !== typeof b) throw Error("Invalid decorator function " + b);
    }, Ph = {};
    var M = function (a, b, c) {
        uh.call(this, c);
        if (!b) {
            for (b = this.constructor; b;) {
                var d = Aa(b);
                if (d = Ph[d]) break;
                b = (b = Object.getPrototypeOf(b.prototype)) && b.constructor
            }
            b = d ? "function" === typeof d.Z ? d.Z() : new d : null
        }
        this.l = b;
        this.Ia = void 0 !== a ? a : null
    };
    y(M, uh);
    k = M.prototype;
    k.Ia = null;
    k.L = 0;
    k.S = 39;
    k.Ja = 255;
    k.yc = !0;
    k.ba = null;
    k.Tb = !0;
    var Rh = function (a) {
        a.Y && 0 != a.Tb && Qh(a, !1);
        a.Tb = !1
    }, Sh = function (a, b) {
        b && (a.ba ? Ya(a.ba, b) || a.ba.push(b) : a.ba = [b], Gh(a, b, !0))
    };
    k = M.prototype;
    k.pb = function () {
        var a = this.l.Ha(this);
        this.g = a;
        Jh(this.l, a);
        this.l.sb(a, !1);
        this.isVisible() || (Of(a, !1), a && ig(a, "hidden", !0))
    };
    k.qb = function () {
        return this.A()
    };
    k.bc = function (a) {
        return this.l.cc(a)
    };
    k.lc = function (a) {
        this.g = a = this.l.qa(this, a);
        Jh(this.l, a);
        this.l.sb(a, !1);
        this.yc = "none" != a.style.display
    };
    k.oa = function () {
        M.I.oa.call(this);
        var a = this.l, b = xh(this);
        A(this);
        A(b);
        this.isVisible() || ig(b, "hidden", !this.isVisible());
        this.isEnabled() || a.ma(b, 1, !this.isEnabled());
        this.S & 8 && a.ma(b, 8, this.isSelected());
        this.S & 16 && a.ma(b, 16, !!(this.L & 16));
        this.S & 64 && a.ma(b, 64, !!(this.L & 64));
        this.l.qc(this);
        this.S & -2 && (this.Tb && Qh(this, !0), this.S & 32 && (a = this.A())) && (b = this.F || (this.F = new oh), b.attach(a), yh(this).listen(b, "key", this.Hc).listen(a, "focus", this.Fc).listen(a, "blur", this.oc))
    };
    var Qh = function (a, b) {
        var c = yh(a), d = a.A();
        b ? (c.listen(d, Nh.wb, a.Ua).listen(d, [Nh.xb, Nh.hc], a.Va).listen(d, "mouseover", a.xa).listen(d, "mouseout", a.va), a.M != Ta && c.listen(d, "contextmenu", a.M), F && !a.K && (a.K = new Th(a), mg(a, w(kg, a.K)))) : (c.fa(d, Nh.wb, a.Ua).fa(d, [Nh.xb, Nh.hc], a.Va).fa(d, "mouseover", a.xa).fa(d, "mouseout", a.va), a.M != Ta && c.fa(d, "contextmenu", a.M), F && (kg(a.K), a.K = null))
    };
    M.prototype.bb = function () {
        M.I.bb.call(this);
        this.F && this.F.detach();
        this.isVisible() && this.isEnabled() && this.l.lb(this, !1)
    };
    M.prototype.H = function () {
        M.I.H.call(this);
        this.F && (this.F.na(), delete this.F);
        delete this.l;
        this.K = this.ba = this.Ia = null
    };
    M.prototype.getContent = function () {
        return this.Ia
    };
    var Hh = function (a, b) {
        a.Ia = b
    };
    M.prototype.isVisible = function () {
        return this.yc
    };
    M.prototype.isEnabled = function () {
        return !(this.L & 1)
    };
    M.prototype.setEnabled = function (a) {
        var b = this.u;
        b && "function" == typeof b.isEnabled && !b.isEnabled() || !Vh(this, 1, !a) || (a || (Wh(this, !1), Xh(this, !1)), this.isVisible() && this.l.lb(this, a), Yh(this, 1, !a, !0))
    };
    var Xh = function (a, b) {
        Vh(a, 2, b) && Yh(a, 2, b)
    };
    M.prototype.isActive = function () {
        return !!(this.L & 4)
    };
    var Wh = function (a, b) {
        Vh(a, 4, b) && Yh(a, 4, b)
    };
    M.prototype.isSelected = function () {
        return !!(this.L & 8)
    };
    M.prototype.mb = function (a) {
        Vh(this, 32, a) && Yh(this, 32, a)
    };
    M.prototype.getState = function () {
        return this.L
    };
    var Yh = function (a, b, c, d) {
        d || 1 != b ? a.S & b && c != !!(a.L & b) && (a.l.tb(a, b, c), a.L = c ? a.L | b : a.L & ~b) : a.setEnabled(!c)
    }, Zh = function (a) {
        if (a.Y && a.L & 32) throw Error("Component already rendered");
        a.L & 32 && Yh(a, 32, !1);
        a.S &= -33
    }, $h = function (a, b) {
        return !!(a.Ja & b) && !!(a.S & b)
    }, Vh = function (a, b, c) {
        return !!(a.S & b) && !!(a.L & b) != c && (!(0 & b) || a.dispatchEvent(vh(b, c))) && !a.N
    };
    M.prototype.xa = function (a) {
        !ai(a, this.A()) && this.dispatchEvent("enter") && this.isEnabled() && $h(this, 2) && Xh(this, !0)
    };
    M.prototype.va = function (a) {
        !ai(a, this.A()) && this.dispatchEvent("leave") && ($h(this, 4) && Wh(this, !1), $h(this, 2) && Xh(this, !1))
    };
    M.prototype.M = Ta;
    var ai = function (a, b) {
        return !!a.relatedTarget && Je(b, a.relatedTarget)
    };
    k = M.prototype;
    k.Ua = function (a) {
        this.isEnabled() && ($h(this, 2) && Xh(this, !0), 0 != a.ka.button || Md && a.ctrlKey || ($h(this, 4) && Wh(this, !0), this.l && this.l.dc(this) && this.A().focus()));
        0 != a.ka.button || Md && a.ctrlKey || a.preventDefault()
    };
    k.Va = function (a) {
        this.isEnabled() && ($h(this, 2) && Xh(this, !0), this.isActive() && this.kb(a) && $h(this, 4) && Wh(this, !1))
    };
    k.kb = function (a) {
        if ($h(this, 16)) {
            var b = !(this.L & 16);
            Vh(this, 16, b) && Yh(this, 16, b)
        }
        $h(this, 8) && Vh(this, 8, !0) && Yh(this, 8, !0);
        $h(this, 64) && (b = !(this.L & 64), Vh(this, 64, b) && Yh(this, 64, b));
        b = new qg("action", this);
        a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.u = a.u);
        return this.dispatchEvent(b)
    };
    k.Fc = function () {
        $h(this, 32) && this.mb(!0)
    };
    k.oc = function () {
        $h(this, 4) && Wh(this, !1);
        $h(this, 32) && this.mb(!1)
    };
    k.Hc = function (a) {
        return this.isVisible() && this.isEnabled() && this.Sb(a) ? (a.preventDefault(), a.o(), !0) : !1
    };
    k.Sb = function (a) {
        return 13 == a.keyCode && this.kb(a)
    };
    if ("function" !== typeof M) throw Error("Invalid component class " + M);
    if ("function" !== typeof Ch) throw Error("Invalid renderer class " + Ch);
    var bi = Aa(M);
    Ph[bi] = Ch;
    Oh("goog-control", function () {
        return new M(null)
    });
    var Th = function (a) {
        lg.call(this);
        this.l = a;
        this.g = !1;
        this.o = new L(this);
        mg(this, w(kg, this.o));
        a = xh(this.l);
        this.o.listen(a, Nh.wb, this.B).listen(a, Nh.xb, this.F).listen(a, "click", this.u)
    };
    y(Th, lg);
    var ci = !F || 9 <= Number(ae);
    Th.prototype.B = function () {
        this.g = !1
    };
    Th.prototype.F = function () {
        this.g = !0
    };
    var di = function (a, b) {
        if (!ci) return a.button = 0, a.type = b, a;
        var c = document.createEvent("MouseEvents");
        c.initMouseEvent(b, a.bubbles, a.cancelable, a.view || null, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, a.relatedTarget || null);
        return c
    };
    Th.prototype.u = function (a) {
        if (this.g) this.g = !1; else {
            var b = a.ka, c = b.button, d = b.type, e = di(b, "mousedown");
            this.l.Ua(new tg(e, a.g));
            e = di(b, "mouseup");
            this.l.Va(new tg(e, a.g));
            ci || (b.button = c, b.type = d)
        }
    };
    Th.prototype.H = function () {
        this.l = null;
        Th.I.H.call(this)
    };
    var ei = function () {
    };
    y(ei, Mh);
    va(ei);
    k = ei.prototype;
    k.rb = function () {
    };
    k.Ha = function (a) {
        Rh(a);
        a.Ja &= -256;
        Zh(a);
        var b = a.o, c = b.wa,
            d = {"class": Fh(this, a).join(" "), disabled: !a.isEnabled(), title: a.Ta() || "", value: a.Ca() || ""};
        if (a = a.getContent()) {
            if ("string" !== typeof a) if (Array.isArray(a)) a = a.map(Qe).join(""); else {
                var e = [];
                Pe(a, e, !0);
                a = e.join("");
                a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
                a = a.replace(/\u200B/g, "");
                a = a.replace(/ +/g, " ");
                " " != a && (a = a.replace(/^\s*/, ""))
            }
            a = a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
        } else a = "";
        return c.call(b, "BUTTON",
            d, a || "")
    };
    k.cc = function (a) {
        return "BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
    };
    k.qa = function (a, b) {
        Rh(a);
        a.Ja &= -256;
        Zh(a);
        if (b.disabled) {
            var c = Ja(Kh(this, 1));
            rf(b, c)
        }
        return ei.I.qa.call(this, a, b)
    };
    k.qc = function (a) {
        yh(a).listen(a.A(), "click", a.kb)
    };
    k.sb = function () {
    };
    k.ec = function () {
    };
    k.dc = function (a) {
        return a.isEnabled()
    };
    k.lb = function () {
    };
    k.tb = function (a, b, c) {
        ei.I.tb.call(this, a, b, c);
        (a = a.A()) && 1 == b && (a.disabled = c)
    };
    k.Ca = function (a) {
        return a.value
    };
    k.ub = function (a, b) {
        a && (a.value = b)
    };
    k.ma = function () {
    };
    var fi = function (a, b, c) {
        M.call(this, a, b || ei.Z(), c)
    };
    y(fi, M);
    k = fi.prototype;
    k.Ca = function () {
        return this.ua
    };
    k.Ta = function () {
        return this.J
    };
    k.nb = function (a) {
        this.J = a;
        this.l.nb(this.A(), a)
    };
    k.H = function () {
        fi.I.H.call(this);
        delete this.ua;
        delete this.J
    };
    k.oa = function () {
        fi.I.oa.call(this);
        if (this.S & 32) {
            var a = this.A();
            a && yh(this).listen(a, "keyup", this.Sb)
        }
    };
    k.Sb = function (a) {
        return 13 == a.keyCode && "key" == a.type || 32 == a.keyCode && "keyup" == a.type ? this.kb(a) : 32 == a.keyCode
    };
    Oh("goog-button", function () {
        return new fi(null)
    });
    var gi = ia(["value"]), ii = function (a, b, c, d) {
        fi.call(this, a, hi.Z(), b);
        this.R = c || 0;
        this.T = d || 0;
        this.ia = !1
    };
    y(ii, fi);
    k = ii.prototype;
    k.nb = function (a) {
        this.J = a;
        var b = this.A();
        if (b) if (this.ia) {
            var c = a instanceof D ? Zg(ic(a).toString()) : a;
            b.removeAttribute("title");
            b.removeAttribute("data-tooltip-contained");
            b.removeAttribute("data-tooltip");
            a ? (a instanceof D ? b.g = a : (b.setAttribute("data-tooltip", a), b.g = null), b.setAttribute("aria-label", c)) : (b.g = null, b.removeAttribute("aria-label"));
            a = te(b) || te();
            b = Aa(a.g);
            ah[b] || (ah[b] = new bh(a))
        } else a ? b.title = a : b.removeAttribute("title")
    };
    k.setEnabled = function (a) {
        this.isEnabled() != a && (ii.I.setEnabled.call(this, a), ji(this))
    };
    k.mb = function (a) {
        ii.I.mb.call(this, a);
        ki(this, !1)
    };
    k.Ua = function (a) {
        ii.I.Ua.call(this, a);
        this.isEnabled() && ki(this, !0)
    };
    k.Va = function (a) {
        ii.I.Va.call(this, a);
        this.isEnabled() && ki(this, !0)
    };
    var ki = function (a, b) {
        a.A() && (a = a.A(), b ? rf(a, "jfk-button-clear-outline") : tf(a, "jfk-button-clear-outline"))
    }, ji = function (a) {
        a.A() && li(a.l, a)
    }, hi = function () {
        this.O = this.P() + "-standard";
        this.o = this.P() + "-action";
        this.K = this.P() + "-primary";
        this.N = this.P() + "-default";
        this.F = this.P() + "-flat";
        this.J = this.P() + "-narrow";
        this.aa = this.P() + "-mini";
        this.B = this.P() + "-contrast"
    };
    y(hi, Mh);
    hi.Z = function () {
        return ih(hi)
    };
    hi.prototype.g = function (a, b, c) {
        a && c.R != a && (c.R = a, ji(c));
        b && c.T != b && (c.T = b, ji(c))
    };
    hi.prototype.P = function () {
        return "jfk-button"
    };
    hi.prototype.Ha = function (a) {
        Oa(a, ii, "Button is expected to be instance of jfk.Button");
        var b = a.o, c = Te(Xe, {
            disabled: !a.isEnabled(),
            checked: !!(a.L & 16),
            style: a.R,
            title: a.Ta(),
            Rc: a.ia,
            value: a.Ca(),
            width: a.T
        }, b);
        b.Ac(c, a.getContent());
        this.qa(a, c);
        return c
    };
    hi.prototype.qa = function (a, b) {
        hi.I.qa.call(this, a, b);
        this.u || (this.u = fb(this.O, w(this.g, 0, null), this.o, w(this.g, 2, null), this.K, w(this.g, 3, null), this.N, w(this.g, 1, null), this.F, w(this.g, 4, null), this.aa, w(this.g, 5, null), this.B, w(this.g, 6, null), this.J, w(this.g, null, 1)));
        for (var c = of(b), d = 0; d < c.length; ++d) {
            var e = this.u[c[d]];
            e && e(a)
        }
        if (c = b.getAttribute("data-tooltip")) a.J = c, a.ia = !0;
        return b
    };
    var Tc = [function (a) {
        Qc(a, !0, "safeAttr is a template literal tag function and should be called using the tagged template syntax. For example, safeAttr`foo`;");
        var b = a[0].toLowerCase();
        if (0 === b.indexOf("on") || 0 === "on".indexOf(b)) throw Error("Prefix '" + a[0] + "' does not guarantee the attribute to be safe as it is also a prefix for event handler attributesPlease use 'addEventListener' to set event handlers.");
        Mc.forEach(function (c) {
            if (0 === c.indexOf(b)) throw Error("Prefix '" + a[0] + "' does not guarantee the attribute to be safe as it is also a prefix for the security sensitive attribute '" +
                (c + "'. Please use native or safe DOM APIs to set the attribute."));
        });
        return new Pc(b, Nc)
    }(gi)];
    hi.prototype.Ca = function (a) {
        return a.getAttribute("value") || ""
    };
    hi.prototype.ub = function (a, b) {
        a && Sc(a, b)
    };
    var li = function (a, b) {
        function c(h, g) {
            (h ? d : e).push(g)
        }

        A(b.A(), "Button element must already exist when updating style.");
        var d = [], e = [], f = b.R;
        c(0 == f, a.O);
        c(2 == f, a.o);
        c(3 == f, a.K);
        c(4 == f, a.F);
        c(5 == f, a.aa);
        c(1 == f, a.N);
        c(6 == f, a.B);
        c(1 == b.T, a.J);
        c(!b.isEnabled(), a.P() + "-disabled");
        uf(b.A(), e);
        sf(b.A(), d)
    };
    var mi = function () {
        ii.call(this, "", void 0, 4);
        Sh(this, "jfk-button-flat");
        Sh(this, "gtx-audio-button");
        Sh(this, "no-audio");
        this.ya = this.Xa = "";
        yh(this).listen(this, "action", this.Bc)
    };
    m(mi, ii);
    mi.prototype.Bc = function () {
        var a = chrome.runtime, b = a.sendMessage;
        var c = this.Xa;
        c = "https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=" + this.ya + Sa(c) + "&q=" + encodeURIComponent(String(c));
        b.call(a, {audioSrc: c})
    };
    var pi = function (a, b, c) {
        var d = c.toLowerCase();
        d in ni && oi[ni[d.toLowerCase()]] >= b.length ? (a.ba && Za(a.ba, "no-audio") && (0 == a.ba.length && (a.ba = null), Gh(a, "no-audio", !1)), a.Xa = b, a.ya = c) : Sh(a, "no-audio")
    };

    function qi(a) {
        a = String(a).toLowerCase().replace("_", "-");
        if ("zh-cn" == a) return "zh-CN";
        if ("zh-tw" == a) return "zh-TW";
        var b = a.indexOf("-");
        a = 0 <= b ? a.substring(0, b) : a;
        return "zh" == a ? "zh-CN" : a
    }

    function ri(a) {
        a = chrome.i18n.getMessage(a);
        return chrome.i18n.getMessage(a)
    };var ti = function () {
        this.o = [];
        chrome.i18n.getAcceptLanguages(v(this.aa, this));
        this.l = "";
        this.g = "1";
        this.u = !0;
        this.B = {};
        this.N = {};
        chrome.storage.local.get(null, v(this.J, this));
        si(this)
    }, ui = function (a) {
        if ("" != a.l) a = a.l; else a:{
            for (var b = 0; b < a.o.length; b++) {
                var c = qi(a.o[b]);
                if (a.B[c]) {
                    a = c;
                    break a
                }
            }
            a = "en"
        }
        return a
    };
    ti.prototype.J = function (a) {
        "gtxTargetLang" in a && (this.l = a.gtxTargetLang);
        "gtxShowBubble" in a && (this.g = a.gtxShowBubble);
        "gtxDetectLanguage" in a && (this.u = a.gtxDetectLanguage);
        "gtxSourceLangList" in a && (this.N = vi(this, a.gtxSourceLangList));
        "gtxTargetLangList" in a && (this.B = vi(this, a.gtxTargetLangList));
        this.loaded = !0
    };
    var vi = function (a, b) {
        var c = [], d;
        for (d in b) c.push({code: d, name: b[d]});
        c.sort(a.F);
        a = {};
        for (b = 0; b < c.length; b++) a[c[b].code] = c[b].name;
        return a
    };
    ti.prototype.F = function (a, b) {
        return a.name.localeCompare(b.name)
    };
    var si = function (a) {
        chrome.storage.onChanged.addListener(function (b) {
            b.gtxTargetLang && (a.l = b.gtxTargetLang.newValue);
            b.gtxShowBubble && (a.g = b.gtxShowBubble.newValue)
        })
    };
    ti.prototype.aa = function (a) {
        this.o = a
    };
    var xi = function (a) {
        var b = wi;
        a = qi(a);
        return a == ui(b) ? !0 : !1
    }, zi = function (a) {
        var b = yi;
        if ("sl" == a) return b.N;
        if ("tl" == a) return b.B;
        throw Error("Invalid input for getLangList()");
    }, Ai = !!chrome.i18n.detectLanguage;
    var oi = [0, 200], ni = {
        af: 1,
        ar: 1,
        bn: 1,
        bs: 1,
        ca: 1,
        cs: 1,
        cy: 1,
        da: 1,
        de: 1,
        el: 1,
        en: 1,
        eo: 1,
        es: 1,
        et: 1,
        fi: 1,
        fr: 1,
        gu: 1,
        hi: 1,
        hr: 1,
        hu: 1,
        hy: 1,
        id: 1,
        is: 1,
        it: 1,
        ja: 1,
        jw: 1,
        km: 1,
        kn: 1,
        ko: 1,
        la: 1,
        lv: 1,
        mk: 1,
        ml: 1,
        mr: 1,
        my: 1,
        ne: 1,
        nl: 1,
        no: 1,
        pl: 1,
        pt: 1,
        ro: 1,
        ru: 1,
        si: 1,
        sk: 1,
        sq: 1,
        sr: 1,
        su: 1,
        sv: 1,
        sw: 1,
        ta: 1,
        te: 1,
        th: 1,
        tl: 1,
        tr: 1,
        vi: 1,
        uk: 1,
        ur: 1,
        zh: 1,
        "zh-cn": 1,
        "zh-tw": 1
    };
    var Bi = function () {
        this.l = [];
        this.g = {};
        this.o = !1;
        this.F = 1;
        this.u = {};
        Gg(window, "beforeunload", this.N, !1, this)
    }, Ci = function (a, b, c) {
        if (null == b) return "1";
        switch (wa(b)) {
            case "string":
                return a = b, 64 < a.length && (null == c || !c) && (a = a.substr(0, 64)), encodeURIComponent(String(a));
            case "number":
                return "" + b;
            case "boolean":
                return b ? "1" : "0";
            case "array":
                var d = [];
                for (var e in b) d.push(Ci(a, b[e], c));
                return d.join(",");
            case "object":
                d = [];
                for (var f in b) d.push(Di(a, f, b[f], c));
                return d.join(",");
            default:
                return ""
        }
    }, Di = function (a,
                      b, c, d) {
        return [encodeURIComponent(String(b)), Ci(a, c, d || "smtalt" == b)].join("=")
    };
    Bi.prototype.log = function (a, b) {
        this.l.push([a, b]);
        this.o || (this.o = !0, Tg(this.B, 0, this))
    };
    Bi.prototype.B = function () {
        for (var a = 0; a < this.l.length; a++) {
            var b = this.l[a];
            Ei(this, "/gen204?" + Di(this, b[0], b[1]))
        }
        this.l = [];
        this.o = !1
    };
    var Ei = function (a, b) {
        var c = new Image, d = a.F++;
        a.u[d] = c;
        c.onload = c.onerror = function () {
            delete Bi.Z().u[d]
        };
        c.src = b;
        c = null
    };
    Bi.prototype.N = function () {
        this.B();
        for (var a in this.g) 0 != this.g[a] && (Ei(this, "/gen204?" + Di(this, a, this.g[a][1])), a in this.g && (r.clearTimeout(this.g[a][0]), delete this.g[a]))
    };
    Bi.Z = function () {
        return ih(Bi)
    };
    var Fi = function () {
    };
    Fi.prototype.g = null;
    var Hi = function (a) {
        var b;
        (b = a.g) || (b = {}, Gi(a) && (b[0] = !0, b[1] = !0), b = a.g = b);
        return b
    };
    var Ii, Ji = function () {
    };
    y(Ji, Fi);
    var Ki = function (a) {
        return (a = Gi(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }, Gi = function (a) {
        if (!a.l && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.l = d
                } catch (e) {
                }
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.l
    };
    Ii = new Ji;
    var Li = function (a) {
        K.call(this);
        this.headers = new Map;
        this.T = a || null;
        this.o = !1;
        this.R = this.g = null;
        this.F = this.ia = this.B = "";
        this.u = this.ha = this.K = this.ga = !1;
        this.J = 0;
        this.O = null;
        this.va = "";
        this.M = this.ya = !1
    };
    y(Li, K);
    Li.prototype.l = hd(id(), "goog.net.XhrIo").o;
    var Mi = /^https?$/i, Ni = ["POST", "PUT"], Oi = [], Pi = function (a, b, c, d) {
        var e = new Li;
        Oi.push(e);
        b && e.listen("complete", b);
        e.Xb("ready", e.Xa);
        e.send(a, c, d, void 0)
    };
    Li.prototype.Xa = function () {
        this.na();
        Za(Oi, this)
    };
    Li.prototype.send = function (a, b, c, d) {
        if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.B + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.B = a;
        this.F = "";
        this.ia = b;
        this.ga = !1;
        this.o = !0;
        this.g = this.T ? Ki(this.T) : Ki(Ii);
        this.R = this.T ? Hi(this.T) : Hi(Ii);
        this.g.onreadystatechange = v(this.ua, this);
        try {
            ld(this.l, Qi(this, "Opening Xhr")), this.ha = !0, this.g.open(b, String(a), !0), this.ha = !1
        } catch (h) {
            ld(this.l, Qi(this, "Error opening Xhr: " + h.message));
            Ri(this, h);
            return
        }
        a = c || "";
        c = new Map(this.headers);
        if (d) if (Object.getPrototypeOf(d) === Object.prototype) for (var e in d) c.set(e, d[e]); else if ("function" === typeof d.keys && "function" === typeof d.get) {
            e = ja(d.keys());
            for (var f = e.next(); !f.done; f = e.next()) f = f.value, c.set(f, d.get(f))
        } else throw Error("Unknown input type for opt_headers: " + String(d));
        d = Array.from(c.keys()).find(function (h) {
            return "content-type" == h.toLowerCase()
        });
        e = r.FormData && a instanceof r.FormData;
        !Ya(Ni, b) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        b =
            ja(c);
        for (d = b.next(); !d.done; d = b.next()) c = ja(d.value), d = c.next().value, c = c.next().value, this.g.setRequestHeader(d, c);
        this.va && (this.g.responseType = this.va);
        "withCredentials" in this.g && this.g.withCredentials !== this.ya && (this.g.withCredentials = this.ya);
        try {
            Si(this), 0 < this.J && (this.M = Ti(this.g), ld(this.l, Qi(this, "Will abort after " + this.J + "ms if incomplete, xhr2 " + this.M)), this.M ? (this.g.timeout = this.J, this.g.ontimeout = v(this.xa, this)) : this.O = Tg(this.xa, this.J, this)), ld(this.l, Qi(this, "Sending request")),
                this.K = !0, this.g.send(a), this.K = !1
        } catch (h) {
            ld(this.l, Qi(this, "Send error: " + h.message)), Ri(this, h)
        }
    };
    var Ti = function (a) {
        return F && "number" === typeof a.timeout && void 0 !== a.ontimeout
    };
    Li.prototype.xa = function () {
        "undefined" != typeof ua && this.g && (this.F = "Timed out after " + this.J + "ms, aborting", ld(this.l, Qi(this, this.F)), this.dispatchEvent("timeout"), this.abort(8))
    };
    var Ri = function (a, b) {
        a.o = !1;
        a.g && (a.u = !0, a.g.abort(), a.u = !1);
        a.F = b;
        Ui(a);
        Vi(a)
    }, Ui = function (a) {
        a.ga || (a.ga = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
    };
    Li.prototype.abort = function () {
        this.g && this.o && (ld(this.l, Qi(this, "Aborting")), this.o = !1, this.u = !0, this.g.abort(), this.u = !1, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Vi(this))
    };
    Li.prototype.H = function () {
        this.g && (this.o && (this.o = !1, this.u = !0, this.g.abort(), this.u = !1), Vi(this, !0));
        Li.I.H.call(this)
    };
    Li.prototype.ua = function () {
        this.N || (this.ha || this.K || this.u ? Wi(this) : this.Ya())
    };
    Li.prototype.Ya = function () {
        Wi(this)
    };
    var Wi = function (a) {
        if (a.o && "undefined" != typeof ua) if (a.R[1] && 4 == Xi(a) && 2 == a.Ba()) ld(a.l, Qi(a, "Local request error detected and ignored")); else if (a.K && 4 == Xi(a)) Tg(a.ua, 0, a); else if (a.dispatchEvent("readystatechange"), 4 == Xi(a)) {
            ld(a.l, Qi(a, "Request complete"));
            a.o = !1;
            try {
                if (Yi(a)) a.dispatchEvent("complete"), a.dispatchEvent("success"); else {
                    try {
                        var b = 2 < Xi(a) ? a.g.statusText : ""
                    } catch (c) {
                        ld(a.l, "Can not get status: " + c.message), b = ""
                    }
                    a.F = b + " [" + a.Ba() + "]";
                    Ui(a)
                }
            } finally {
                Vi(a)
            }
        }
    }, Vi = function (a, b) {
        if (a.g) {
            Si(a);
            var c = a.g, d = a.R[0] ? function () {
            } : null;
            a.g = null;
            a.R = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {
                kd(a.l, "Problem encountered resetting onreadystatechange: " + e.message)
            }
        }
    }, Si = function (a) {
        a.g && a.M && (a.g.ontimeout = null);
        a.O && (r.clearTimeout(a.O), a.O = null)
    };
    Li.prototype.isActive = function () {
        return !!this.g
    };
    var Yi = function (a) {
        var b = a.Ba();
        a:switch (b) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
                var c = !0;
                break a;
            default:
                c = !1
        }
        if (!c) {
            if (b = 0 === b) a = String(a.B).match(Hc)[1] || null, !a && r.self && r.self.location && (a = r.self.location.protocol.slice(0, -1)), b = !Mi.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    }, Xi = function (a) {
        return a.g ? a.g.readyState : 0
    };
    Li.prototype.Ba = function () {
        try {
            return 2 < Xi(this) ? this.g.status : -1
        } catch (a) {
            return -1
        }
    };
    var Zi = function (a) {
        try {
            return a.g ? a.g.responseText : ""
        } catch (b) {
            return ld(a.l, "Can not get responseText: " + b.message), ""
        }
    }, Qi = function (a, b) {
        return b + " [" + a.ia + " " + a.B + " " + a.Ba() + "]"
    };

    function $i(a, b) {
        void 0 === a.hb ? Object.defineProperties(a, {
            hb: {
                value: b,
                configurable: !0,
                writable: !0,
                enumerable: !1
            }
        }) : a.hb |= b
    }

    function aj(a) {
        return a.hb || 0
    }

    function bj(a, b, c) {
        Object.defineProperties(a, {
            Ub: {value: b, configurable: !0, writable: !0, enumerable: !1},
            rc: {value: c, configurable: !0, writable: !0, enumerable: !1},
            Lc: {value: void 0, configurable: !0, writable: !0, enumerable: !1}
        })
    }

    function cj(a) {
        return null != a.Ub
    }

    function dj(a) {
        return a.Ub
    }

    function ej(a, b) {
        a.Ub = b
    }

    function fj(a, b) {
        a.Lc = b
    }

    function gj(a) {
        return a.rc
    }

    function hj(a, b) {
        A(0 <= Object.getOwnPropertyNames(a).indexOf("internalJsprotoWrapper"));
        return a.rc = b
    };var ij, jj, kj, lj, mj, nj, oj, pj, qj;
    if ("function" === typeof Symbol && "symbol" === typeof Symbol()) {
        var rj = Symbol("bitset"), sj = Symbol("pivotFieldNumber"), tj = Symbol("descriptor"),
            uj = Symbol("unparsedFields"), vj = Symbol("wrapper");
        ij = function (a, b) {
            a[rj] = jj(a) | b
        };
        jj = function (a) {
            return a[rj] || 0
        };
        lj = function (a, b, c, d) {
            a[sj] = b;
            a[vj] = c;
            a[tj] = d;
            a[uj] = void 0
        };
        kj = function (a) {
            return null != a[sj]
        };
        mj = function (a) {
            return a[sj]
        };
        nj = function (a, b) {
            a[sj] = b
        };
        oj = function (a, b) {
            a[uj] = b
        };
        pj = function (a) {
            return a[vj]
        };
        qj = function (a, b) {
            A(kj(a));
            return a[vj] = b
        }
    } else ij =
        $i, jj = aj, lj = bj, kj = cj, mj = dj, nj = ej, oj = fj, pj = gj, qj = hj;
    var wj = function () {
    }, xj = function () {
    };
    m(xj, wj);
    var yj = function () {
    };
    m(yj, xj);

    function zj(a) {
        return null != a && "object" === typeof a && !Array.isArray(a) && a.constructor === Object
    }

    function Aj(a) {
        var b = Ia(mj(a));
        if (b > a.length) return null;
        A(b === a.length);
        a = a[b - 1];
        A(zj(a));
        return a
    }

    function Bj(a, b, c) {
        A(0 < b);
        var d = mj(a);
        if (b < d) a[b - 1] = c; else {
            var e = Aj(a);
            e ? e[b] = c : (e = {}, a[d - 1] = (e[b] = c, e))
        }
    }

    function Cj(a, b) {
        A(0 < b);
        var c = mj(a);
        if (b < c) return A(!zj(a[b - 1])), a[b - 1];
        var d;
        return null == (d = Aj(a)) ? void 0 : d[b]
    }

    function Dj(a, b, c) {
        a = Cj(a, b);
        return null == a ? c : a
    }

    var Ej = Object.freeze([]);
    var Fj = function () {
    };
    Fj.prototype[Symbol.iterator] = function () {
        return this.g()
    };
    var Gj = function (a, b) {
        this.o = a;
        this.l = b
    };
    m(Gj, Fj);
    Gj.prototype.g = function () {
        var a = this.o[Symbol.iterator](), b = this.l;
        return {
            next: function () {
                var c = a.next(), d = c.done;
                if (d) return c;
                c = b(c.value);
                return {done: d, value: c}
            }
        }
    };
    Gj.prototype.map = function (a) {
        return new Gj(this, a)
    };
    var Hj = function (a) {
        this.l = a
    };
    m(Hj, Fj);
    var Jj = function (a) {
        a && a.length ? a = new Hj(La(a).slice()) : (Ij || (Ij = new Hj(Ej)), a = Ij);
        return a
    };
    Hj.prototype.g = function () {
        return this.l[Symbol.iterator]()
    };
    Hj.prototype.map = function (a) {
        return new Gj(this, a)
    };
    var Ij;

    function Kj(a, b) {
        var c = Cj(a, b);
        return c instanceof wj ? (c = Oa(c, yj), La(c.g(a, b))) : Jj(c)
    }

    function Lj(a, b) {
        var c = Cj(a, b);
        c instanceof xj && (c = Cj(a, b), Array.isArray(c) ? c = La(c) : c instanceof xj ? c = La(c.g(a, b)) : (A(null == c), c = [], Bj(a, b, c)));
        a = La(c);
        A(!1, "Index undefined out of bounds for array[" + (null == a ? void 0 : a.length) + "] fieldNumber " + b + ".");
        return null == a ? void 0 : a[void 0]
    };

    function N(a, b, c) {
        for (var d = a.h, e = 0; e < b.length; e++) {
            var f = b[e];
            if (null != Cj(d, f.i)) if (f.m) {
                var h = f.m(a);
                c[f.name] = f.D ? h.s() : h
            } else h = [].concat(ka(f.v(a))), c[f.name] = f.D ? h.map(function (g) {
                return g.s()
            }) : h
        }
    }

    function O(a, b, c) {
        b = new Map(b.map(function (n) {
            return [n.name, n]
        }));
        c = new c;
        var d = c.h, e = {}, f;
        for (f in a) {
            if (A(a.hasOwnProperty(f))) {
                var h = A(b.get(f)), g = a[f];
                if (null != g) {
                    var l = void 0;
                    if (h.C) e.ob = h.C, l = function (n) {
                        return function (p) {
                            p = Ka(p);
                            return n.ob(p).h
                        }
                    }(e), h.m ? l = l(g) : (g = La(g).map(l), l = g.length ? g : null); else b:{
                        switch (typeof g) {
                            case "string":
                            case "number":
                            case "boolean":
                                l = g;
                                break b;
                            case "object":
                                if (Array.isArray(g)) {
                                    l = g.length ? g : null;
                                    break b
                                }
                        }
                        B("Unexpected value " + g);
                        l = void 0
                    }
                    null != l && Bj(d, h.i, l)
                }
            }
            e =
                {ob: e.ob}
        }
        return c
    }

    function R(a, b, c) {
        for (var d = a.h, e = 0; e < b.length; e++) {
            var f = b[e];
            if (null != Cj(d, f.i)) if (f.m) {
                var h = f.m(a);
                c.push(f.j(f, h))
            } else {
                h = 0;
                for (var g = f.v(a)[Symbol.iterator](), l = g.next(); !l.done; l = g.next(), h++) c.push(f.j(f, l.value, h))
            }
        }
    }

    function S(a, b, c) {
        b instanceof Uint8Array ? b = '"' + [].concat(ka(b)).map(function (d) {
            return "\\x" + (16 > Ia(d) ? "0" : "") + d.toString(16)
        }).join("") + '"' : "string" === typeof b && null == a.Ze && (b = '"' + b + '"');
        return a.name + ": " + b + (null == c ? "" : " #" + c)
    }

    function T(a, b, c) {
        b = b.G();
        var d = "", e = null == c ? "" : " #" + c;
        c = null == c ? "" : " " + c;
        b && (d = "\n  " + b.replace(/\n/g, "\n  "));
        return a.name + " {" + e + d + "\n} # " + a.name + c
    };

    function U(a, b, c) {
        return Dj(a, b, c || 0)
    }

    function Mj(a, b) {
        a = Kj(a, b);
        return a = a.map(Ia)
    };

    function V(a, b, c) {
        var d = Nj(a, b, c);
        if (!d) {
            var e = [];
            d = new c(e);
            Bj(a, b, e)
        }
        return d
    }

    function Oj(a, b, c) {
        return (a = La(Lj(a, b))) ? Pj(a, c) : new c
    }

    function W(a, b, c) {
        return Kj(a, b).map(function (d) {
            return Pj(d, c)
        })
    }

    function Nj(a, b, c) {
        if (a = Cj(a, b)) return Pj(La(a), c)
    }

    function Pj(a, b) {
        var c = pj(a);
        return null == c ? new b(a) : c
    };

    function X(a, b) {
        return Dj(a, b, "")
    }

    function Y(a, b) {
        a = Kj(a, b);
        return a = a.map(Ja)
    };Object.create(null);
    var Z = function (a, b) {
        a = a || [];
        if (kj(a)) b && b > a.length && !Aj(a) && nj(a, b), qj(a, this); else {
            b = Math.max(b || 2147483647, a.length + 1);
            var c = a.length;
            c = c && a[c - 1];
            if (zj(c)) {
                b = a.length;
                for (var d in c) {
                    var e = Number(d);
                    e < b && (a[e - 1] = c[d], delete c[e])
                }
            }
            lj(a, b, this, void 0)
        }
        this.h = a
    };
    Z.prototype.clear = function () {
        this.h.length = 0;
        oj(this.h, void 0)
    };
    var Qj = function (a) {
        Z.call(this, a)
    };
    m(Qj, Z);
    k = Qj.prototype;
    k.Cb = function () {
        return X(this.h, 1)
    };
    k.getTitle = function () {
        return X(this.h, 2)
    };
    k.setTitle = function (a) {
        Bj(this.h, 2, a)
    };
    k.Ma = function () {
        return X(this.h, 3)
    };
    k.cb = function () {
        return X(this.h, 4)
    };
    var Rj = function () {
        return [{
            name: "alert_mid", i: 1, m: function (a) {
                return a.Cb()
            }, j: S
        }, {
            name: "title", i: 2, m: function (a) {
                return a.getTitle()
            }, j: S
        }, {
            name: "description", i: 3, m: function (a) {
                return a.Ma()
            }, j: S
        }, {
            name: "link", i: 4, m: function (a) {
                return a.cb()
            }, j: S
        }]
    }, Sj = function (a) {
        return O(a, Rj(), Qj)
    };
    Qj.prototype.s = function () {
        var a = {};
        N(this, Rj(), a);
        return a
    };
    Qj.prototype.G = function () {
        var a = [];
        R(this, Rj(), a);
        return a.join("\n")
    };
    Qj.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Tj = function (a) {
        Z.call(this, a)
    };
    m(Tj, Z);
    var Uj = function (a) {
        return new Tj(a)
    };
    Tj.prototype.getType = function () {
        return U(this.h, 1)
    };
    var Vj = function () {
        return [{
            name: "type", i: 1, m: function (a) {
                return a.getType()
            }, j: S
        }, {
            name: "display_text", i: 2, m: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "contact_text", i: 3, m: function (a) {
                return X(a.h, 3)
            }, j: S
        }]
    }, Wj = function (a) {
        return O(a, Vj(), Tj)
    };
    Tj.prototype.s = function () {
        var a = {};
        N(this, Vj(), a);
        return a
    };
    Tj.prototype.G = function () {
        var a = [];
        R(this, Vj(), a);
        return a.join("\n")
    };
    Tj.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Xj = function (a) {
        Z.call(this, a)
    };
    m(Xj, Z);
    var Yj = function (a) {
        return new Xj(a)
    };
    Xj.prototype.getTitle = function () {
        return X(this.h, 3)
    };
    Xj.prototype.setTitle = function (a) {
        Bj(this.h, 3, a)
    };
    Xj.prototype.Ma = function () {
        return X(this.h, 4)
    };
    var Zj = function () {
        return [{
            name: "location", i: 1, m: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "language", i: 2, m: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "title", i: 3, m: function (a) {
                return a.getTitle()
            }, j: S
        }, {
            name: "description", i: 4, m: function (a) {
                return a.Ma()
            }, j: S
        }, {
            name: "contact_details", i: 5, D: Uj, C: Wj, v: function (a) {
                return W(a.h, 5, Tj)
            }, j: T
        }]
    }, ak = function (a) {
        return O(a, Zj(), Xj)
    };
    Xj.prototype.s = function () {
        var a = {};
        N(this, Zj(), a);
        return a
    };
    Xj.prototype.G = function () {
        var a = [];
        R(this, Zj(), a);
        return a.join("\n")
    };
    Xj.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var bk = function (a) {
        Z.call(this, a)
    };
    m(bk, Z);
    bk.prototype.getTitle = function () {
        return X(this.h, 1)
    };
    bk.prototype.setTitle = function (a) {
        Bj(this.h, 1, a)
    };
    bk.prototype.Cb = function () {
        return X(this.h, 2)
    };
    var ck = function () {
        return [{
            name: "title", i: 1, m: function (a) {
                return a.getTitle()
            }, j: S
        }, {
            name: "alert_mid", i: 2, m: function (a) {
                return a.Cb()
            }, j: S
        }, {
            name: "help_and_info", i: 3, D: Yj, C: ak, v: function (a) {
                return W(a.h, 3, Xj)
            }, j: T
        }]
    }, dk = function (a) {
        return O(a, ck(), bk)
    };
    bk.prototype.s = function () {
        var a = {};
        N(this, ck(), a);
        return a
    };
    bk.prototype.G = function () {
        var a = [];
        R(this, ck(), a);
        return a.join("\n")
    };
    bk.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var ek = function (a) {
        Z.call(this, a)
    };
    m(ek, Z);
    var fk = function (a) {
        return new ek(a)
    };
    ek.prototype.Eb = function () {
        return U(this.h, 1)
    };
    ek.prototype.Ib = function () {
        return Mj(this.h, 2)
    };
    var gk = function () {
        return [{
            name: "backend", i: 1, m: function (a) {
                return a.Eb()
            }, j: S
        }, {
            name: "features_applied", i: 2, v: function (a) {
                return a.Ib()
            }, j: S
        }]
    }, hk = function (a) {
        return O(a, gk(), ek)
    };
    ek.prototype.s = function () {
        var a = {};
        N(this, gk(), a);
        return a
    };
    ek.prototype.G = function () {
        var a = [];
        R(this, gk(), a);
        return a.join("\n")
    };
    ek.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var ik = function (a) {
        Z.call(this, a)
    };
    m(ik, Z);
    var jk = function (a) {
        return new ik(a)
    };
    ik.prototype.Lb = function () {
        return U(this.h, 1)
    };
    var kk = function () {
        return [{
            name: "label", i: 1, m: function (a) {
                return a.Lb()
            }, j: S
        }, {
            name: "oxford_label", i: 2, m: function (a) {
                return U(a.h, 2)
            }, j: S
        }]
    }, lk = function (a) {
        return O(a, kk(), ik)
    };
    ik.prototype.s = function () {
        var a = {};
        N(this, kk(), a);
        return a
    };
    ik.prototype.G = function () {
        var a = [];
        R(this, kk(), a);
        return a.join("\n")
    };
    ik.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var mk = function (a) {
        Z.call(this, a)
    };
    m(mk, Z);
    var nk = function (a) {
        return new mk(a)
    };
    mk.prototype.Qb = function () {
        return X(this.h, 1)
    };
    mk.prototype.Mb = function () {
        return Mj(this.h, 2)
    };
    mk.prototype.Sa = function () {
        return U(this.h, 3)
    };
    mk.prototype.Na = function () {
        return U(this.h, 4)
    };
    var ok = function () {
        return [{
            name: "text", i: 1, m: function (a) {
                return a.Qb()
            }, j: S
        }, {
            name: "labels", i: 2, v: function (a) {
                return a.Mb()
            }, j: S
        }, {
            name: "start_pos", i: 3, m: function (a) {
                return a.Sa()
            }, j: S
        }, {
            name: "end_pos", i: 4, m: function (a) {
                return a.Na()
            }, j: S
        }, {
            name: "label_infos", i: 5, D: jk, C: lk, v: function (a) {
                return W(a.h, 5, ik)
            }, j: T
        }]
    }, pk = function (a) {
        return O(a, ok(), mk)
    };
    mk.prototype.s = function () {
        var a = {};
        N(this, ok(), a);
        return a
    };
    mk.prototype.G = function () {
        var a = [];
        R(this, ok(), a);
        return a.join("\n")
    };
    mk.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var qk = function (a) {
        Z.call(this, a)
    };
    m(qk, Z);
    var rk = function (a) {
        return new qk(a)
    };
    qk.prototype.Ob = function () {
        return U(this.h, 2)
    };
    qk.prototype.Jb = function () {
        return !!Dj(this.h, 3, !1)
    };
    qk.prototype.Db = function () {
        return !!Dj(this.h, 4, !1)
    };
    qk.prototype.Aa = function () {
        return U(this.h, 8)
    };
    var sk = function () {
        return [{
            name: "word_postproc", i: 1, m: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "score", i: 2, m: function (a) {
                return a.Ob()
            }, j: S
        }, {
            name: "has_preceding_space", i: 3, m: function (a) {
                return a.Jb()
            }, j: S
        }, {
            name: "attach_to_next_token", i: 4, m: function (a) {
                return a.Db()
            }, j: S
        }, {
            name: "backends", i: 5, v: function (a) {
                return Mj(a.h, 5)
            }, j: S
        }, {
            name: "word_postproc_segments", i: 6, D: nk, C: pk, v: function (a) {
                return W(a.h, 6, mk)
            }, j: T
        }, {
            name: "backend_infos", i: 7, D: fk, C: hk, v: function (a) {
                return W(a.h, 7, ek)
            }, j: T
        }, {
            name: "gender",
            i: 8, m: function (a) {
                return a.Aa()
            }, j: S
        }]
    }, tk = function (a) {
        return O(a, sk(), qk)
    };
    qk.prototype.s = function () {
        var a = {};
        N(this, sk(), a);
        return a
    };
    qk.prototype.G = function () {
        var a = [];
        R(this, sk(), a);
        return a.join("\n")
    };
    qk.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var uk = function (a) {
        Z.call(this, a)
    };
    m(uk, Z);
    var vk = function (a) {
        return new uk(a)
    };
    uk.prototype.Fb = function () {
        return U(this.h, 1)
    };
    uk.prototype.Hb = function () {
        return U(this.h, 2)
    };
    var wk = function () {
        return [{
            name: "begin", i: 1, m: function (a) {
                return a.Fb()
            }, j: S
        }, {
            name: "end", i: 2, m: function (a) {
                return a.Hb()
            }, j: S
        }]
    }, xk = function (a) {
        return O(a, wk(), uk)
    };
    uk.prototype.s = function () {
        var a = {};
        N(this, wk(), a);
        return a
    };
    uk.prototype.G = function () {
        var a = [];
        R(this, wk(), a);
        return a.join("\n")
    };
    uk.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var yk = function (a) {
        Z.call(this, a)
    };
    m(yk, Z);
    var zk = function (a) {
        return new yk(a)
    };
    yk.prototype.Sa = function () {
        return U(this.h, 6)
    };
    yk.prototype.Na = function () {
        return U(this.h, 7)
    };
    var Ak = function () {
        return [{
            name: "src_phrase", i: 1, m: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "alternative", i: 3, D: rk, C: tk, v: function (a) {
                return W(a.h, 3, qk)
            }, j: T
        }, {
            name: "srcunicodeoffsets", i: 4, D: vk, C: xk, v: function (a) {
                return W(a.h, 4, uk)
            }, j: T
        }, {
            name: "raw_src_segment", i: 5, m: function (a) {
                return X(a.h, 5)
            }, j: S
        }, {
            name: "start_pos", i: 6, m: function (a) {
                return a.Sa()
            }, j: S
        }, {
            name: "end_pos", i: 7, m: function (a) {
                return a.Na()
            }, j: S
        }, {
            name: "src_phrase_segments", i: 8, D: nk, C: pk, v: function (a) {
                return W(a.h, 8, mk)
            }, j: T
        }]
    }, Bk = function (a) {
        return O(a,
            Ak(), yk)
    };
    yk.prototype.s = function () {
        var a = {};
        N(this, Ak(), a);
        return a
    };
    yk.prototype.G = function () {
        var a = [];
        R(this, Ak(), a);
        return a.join("\n")
    };
    yk.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Ck = function (a) {
        Z.call(this, a)
    };
    m(Ck, Z);
    var Dk = function (a) {
        return new Ck(a)
    };
    k = Ck.prototype;
    k.fb = function () {
        return X(this.h, 1)
    };
    k.Jb = function () {
        return !!Dj(this.h, 3, !1)
    };
    k.Db = function () {
        return !!Dj(this.h, 4, !1)
    };
    k.Gb = function () {
        return U(this.h, 5)
    };
    k.Sa = function () {
        return U(this.h, 6)
    };
    k.Na = function () {
        return U(this.h, 7)
    };
    var Ek = function () {
            return [{
                name: "word", i: 1, m: function (a) {
                    return a.fb()
                }, j: S
            }, {
                name: "styles", i: 2, v: function (a) {
                    return Mj(a.h, 2)
                }, j: S
            }, {
                name: "has_preceding_space", i: 3, m: function (a) {
                    return a.Jb()
                }, j: S
            }, {
                name: "attach_to_next_token", i: 4, m: function (a) {
                    return a.Db()
                }, j: S
            }, {
                name: "confidence", i: 5, m: function (a) {
                    return a.Gb()
                }, j: S
            }, {
                name: "start_pos", i: 6, m: function (a) {
                    return a.Sa()
                }, j: S
            }, {
                name: "end_pos", i: 7, m: function (a) {
                    return a.Na()
                }, j: S
            }, {
                name: "not_from_first_segment", i: 8, m: function (a) {
                    return U(a.h, 8)
                }, j: S
            }]
        },
        Fk = function (a) {
            return O(a, Ek(), Ck)
        };
    Ck.prototype.s = function () {
        var a = {};
        N(this, Ek(), a);
        return a
    };
    Ck.prototype.G = function () {
        var a = [];
        R(this, Ek(), a);
        return a.join("\n")
    };
    Ck.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Gk = function (a) {
        Z.call(this, a)
    };
    m(Gk, Z);
    Gk.prototype.Mb = function () {
        return Y(this.h, 5)
    };
    var Hk = function () {
        return [{
            name: "register", i: 1, v: function (a) {
                return Y(a.h, 1)
            }, j: S
        }, {
            name: "geographic", i: 2, v: function (a) {
                return Y(a.h, 2)
            }, j: S
        }, {
            name: "subject", i: 3, v: function (a) {
                return Y(a.h, 3)
            }, j: S
        }, {
            name: "usage_label", i: 4, v: function (a) {
                return Y(a.h, 4)
            }, j: S
        }, {
            name: "labels", i: 5, v: function (a) {
                return a.Mb()
            }, j: S
        }]
    }, Ik = function (a) {
        return O(a, Hk(), Gk)
    };
    Gk.prototype.s = function () {
        var a = {};
        N(this, Hk(), a);
        return a
    };
    Gk.prototype.G = function () {
        var a = [];
        R(this, Hk(), a);
        return a.join("\n")
    };
    Gk.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Jk = function (a) {
        Z.call(this, a)
    };
    m(Jk, Z);
    var Kk = function (a) {
        return new Jk(a)
    };
    Jk.prototype.La = function () {
        return X(this.h, 2)
    };
    Jk.prototype.mc = function () {
        return X(this.h, 3)
    };
    Jk.prototype.Qa = function () {
        return V(this.h, 4, Gk)
    };
    var Lk = function () {
        return [{
            name: "gloss", i: 1, m: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "definition_id", i: 2, m: function (a) {
                return a.La()
            }, j: S
        }, {
            name: "example", i: 3, m: function (a) {
                return a.mc()
            }, j: S
        }, {
            name: "label_info", i: 4, D: Gk, C: Ik, m: function (a) {
                return a.Qa()
            }, j: T
        }]
    }, Mk = function (a) {
        return O(a, Lk(), Jk)
    };
    Jk.prototype.s = function () {
        var a = {};
        N(this, Lk(), a);
        return a
    };
    Jk.prototype.G = function () {
        var a = [];
        R(this, Lk(), a);
        return a.join("\n")
    };
    Jk.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Nk = function (a) {
        Z.call(this, a)
    };
    m(Nk, Z);
    var Ok = function (a) {
        return new Nk(a)
    };
    Nk.prototype.Ra = function () {
        return X(this.h, 1)
    };
    Nk.prototype.Oa = function () {
        return W(this.h, 2, Jk)
    };
    Nk.prototype.Ka = function () {
        return X(this.h, 3)
    };
    Nk.prototype.Nb = function () {
        return U(this.h, 4)
    };
    var Pk = function () {
        return [{
            name: "pos", i: 1, m: function (a) {
                return a.Ra()
            }, j: S
        }, {
            name: "entry", i: 2, D: Kk, C: Mk, v: function (a) {
                return a.Oa()
            }, j: T
        }, {
            name: "base_form", i: 3, m: function (a) {
                return a.Ka()
            }, j: S
        }, {
            name: "pos_enum", i: 4, m: function (a) {
                return a.Nb()
            }, j: S
        }]
    }, Qk = function (a) {
        return O(a, Pk(), Nk)
    };
    Nk.prototype.s = function () {
        var a = {};
        N(this, Pk(), a);
        return a
    };
    Nk.prototype.G = function () {
        var a = [];
        R(this, Pk(), a);
        return a.join("\n")
    };
    Nk.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Rk = function (a, b, c) {
        Z.call(this, c, a);
        this.containerId = b
    };
    m(Rk, Z);
    var Sk = function (a) {
        Rk.call(this, 7, "76p9JA", a)
    };
    m(Sk, Rk);
    var Tk = function (a) {
        return new Sk(a)
    };
    Sk.prototype.fb = function () {
        return X(this.h, 1)
    };
    Sk.prototype.Ob = function () {
        return +Dj(this.h, 4, 0)
    };
    Sk.prototype.Aa = function () {
        return U(this.h, 6)
    };
    var Uk = function () {
        return [{
            name: "word", i: 1, m: function (a) {
                return a.fb()
            }, j: S
        }, {
            name: "reverse_translation", i: 2, v: function (a) {
                return Y(a.h, 2)
            }, j: S
        }, {
            name: "synset_id", i: 3, v: function (a) {
                return Mj(a.h, 3)
            }, j: S
        }, {
            name: "score", i: 4, m: function (a) {
                return a.Ob()
            }, j: S
        }, {
            name: "previous_word", i: 5, m: function (a) {
                return X(a.h, 5)
            }, j: S
        }, {
            name: "gender", i: 6, m: function (a) {
                return a.Aa()
            }, j: S
        }]
    }, Vk = function (a) {
        return O(a, Uk(), Sk)
    };
    Sk.prototype.s = function () {
        var a = {};
        N(this, Uk(), a);
        return a
    };
    Sk.prototype.G = function () {
        var a = [];
        R(this, Uk(), a);
        return a.join("\n")
    };
    Sk.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Wk = function (a) {
        Z.call(this, a)
    };
    m(Wk, Z);
    var Xk = function (a) {
        return new Wk(a)
    };
    Wk.prototype.Ra = function () {
        return X(this.h, 1)
    };
    Wk.prototype.Oa = function () {
        return W(this.h, 3, Sk)
    };
    Wk.prototype.Ka = function () {
        return X(this.h, 4)
    };
    Wk.prototype.Nb = function () {
        return U(this.h, 5)
    };
    var Yk = function () {
        return [{
            name: "pos", i: 1, m: function (a) {
                return a.Ra()
            }, j: S
        }, {
            name: "terms", i: 2, v: function (a) {
                return Y(a.h, 2)
            }, j: S
        }, {
            name: "entry", i: 3, D: Tk, C: Vk, v: function (a) {
                return a.Oa()
            }, j: T
        }, {
            name: "base_form", i: 4, m: function (a) {
                return a.Ka()
            }, j: S
        }, {
            name: "pos_enum", i: 5, m: function (a) {
                return a.Nb()
            }, j: S
        }]
    }, Zk = function (a) {
        return O(a, Yk(), Wk)
    };
    Wk.prototype.s = function () {
        var a = {};
        N(this, Yk(), a);
        return a
    };
    Wk.prototype.G = function () {
        var a = [];
        R(this, Yk(), a);
        return a.join("\n")
    };
    Wk.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var $k = function (a) {
        Z.call(this, a)
    };
    m($k, Z);
    $k.prototype.nc = function () {
        return X(this.h, 1)
    };
    var al = function () {
        return [{
            name: "romanization", i: 1, m: function (a) {
                return a.nc()
            }, j: S
        }]
    }, bl = function (a) {
        return O(a, al(), $k)
    };
    $k.prototype.s = function () {
        var a = {};
        N(this, al(), a);
        return a
    };
    $k.prototype.G = function () {
        var a = [];
        R(this, al(), a);
        return a.join("\n")
    };
    $k.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var cl = function (a) {
        Z.call(this, a)
    };
    m(cl, Z);
    var dl = function (a) {
        return new cl(a)
    }, el = function () {
        return [{
            name: "source_span_index", i: 1, m: function (a) {
                return U(a.h, 1)
            }, j: S
        }, {
            name: "target_span_index", i: 2, m: function (a) {
                return U(a.h, 2)
            }, j: S
        }, {
            name: "direction", i: 3, m: function (a) {
                return U(a.h, 3)
            }, j: S
        }]
    }, fl = function (a) {
        return O(a, el(), cl)
    };
    cl.prototype.s = function () {
        var a = {};
        N(this, el(), a);
        return a
    };
    cl.prototype.G = function () {
        var a = [];
        R(this, el(), a);
        return a.join("\n")
    };
    cl.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var gl = function (a) {
        Z.call(this, a)
    };
    m(gl, Z);
    var hl = function (a) {
        return new gl(a)
    };
    gl.prototype.Fb = function () {
        return U(this.h, 1)
    };
    gl.prototype.Hb = function () {
        return U(this.h, 2)
    };
    var il = function () {
        return [{
            name: "begin", i: 1, m: function (a) {
                return a.Fb()
            }, j: S
        }, {
            name: "end", i: 2, m: function (a) {
                return a.Hb()
            }, j: S
        }]
    }, jl = function (a) {
        return O(a, il(), gl)
    };
    gl.prototype.s = function () {
        var a = {};
        N(this, il(), a);
        return a
    };
    gl.prototype.G = function () {
        var a = [];
        R(this, il(), a);
        return a.join("\n")
    };
    gl.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var kl = function (a) {
        Z.call(this, a)
    };
    m(kl, Z);
    kl.prototype.cb = function () {
        return Oj(this.h, 3, cl)
    };
    var ll = function () {
        return [{
            name: "source_span", i: 1, D: hl, C: jl, v: function (a) {
                return W(a.h, 1, gl)
            }, j: T
        }, {
            name: "target_span", i: 2, D: hl, C: jl, v: function (a) {
                return W(a.h, 2, gl)
            }, j: T
        }, {
            name: "link", i: 3, D: dl, C: fl, v: function (a) {
                return W(a.h, 3, cl)
            }, j: T
        }]
    }, ml = function (a) {
        return O(a, ll(), kl)
    };
    kl.prototype.s = function () {
        var a = {};
        N(this, ll(), a);
        return a
    };
    kl.prototype.G = function () {
        var a = [];
        R(this, ll(), a);
        return a.join("\n")
    };
    kl.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var nl = function (a) {
        Z.call(this, a)
    };
    m(nl, Z);
    var ol = function (a) {
        return new nl(a)
    };
    nl.prototype.Lb = function () {
        return X(this.h, 2)
    };
    var pl = function () {
        return [{
            name: "model_path", i: 1, m: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "label", i: 2, m: function (a) {
                return a.Lb()
            }, j: S
        }, {
            name: "prefer_efficient_model", i: 8, m: function (a) {
                return !!Dj(a.h, 8, !1)
            }, j: S
        }, {
            name: "model_namespace", i: 9, m: function (a) {
                return X(a.h, 9)
            }, j: S
        }, {
            name: "vertex_ai_endpoint", i: 10, v: function (a) {
                return Y(a.h, 10)
            }, j: S
        }]
    }, ql = function (a) {
        return O(a, pl(), nl)
    };
    nl.prototype.s = function () {
        var a = {};
        N(this, pl(), a);
        return a
    };
    nl.prototype.G = function () {
        var a = [];
        R(this, pl(), a);
        return a.join("\n")
    };
    nl.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var rl = function (a) {
        Z.call(this, a)
    };
    m(rl, Z);
    var sl = function () {
        return [{
            name: "checkpoint_md5", i: 1, m: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "launch_doc", i: 2, m: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "launch_approvals", i: 3, v: function (a) {
                return Y(a.h, 3)
            }, j: S
        }]
    }, tl = function (a) {
        return O(a, sl(), rl)
    };
    rl.prototype.s = function () {
        var a = {};
        N(this, sl(), a);
        return a
    };
    rl.prototype.G = function () {
        var a = [];
        R(this, sl(), a);
        return a.join("\n")
    };
    rl.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var ul = function (a) {
        Z.call(this, a)
    };
    m(ul, Z);
    var vl = function (a) {
        return new ul(a)
    };
    ul.prototype.Ib = function () {
        return Mj(this.h, 3)
    };
    var wl = function () {
        return [{
            name: "model_tracking", i: 1, D: rl, C: tl, m: function (a) {
                return V(a.h, 1, rl)
            }, j: T
        }, {
            name: "has_untranslatable_chunk", i: 2, m: function (a) {
                return !!Dj(a.h, 2, !1)
            }, j: S
        }, {
            name: "features_applied", i: 3, v: function (a) {
                return a.Ib()
            }, j: S
        }]
    }, xl = function (a) {
        return O(a, wl(), ul)
    };
    ul.prototype.s = function () {
        var a = {};
        N(this, wl(), a);
        return a
    };
    ul.prototype.G = function () {
        var a = [];
        R(this, wl(), a);
        return a.join("\n")
    };
    ul.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var yl = function (a) {
        Z.call(this, a)
    };
    m(yl, Z);
    var zl = function (a) {
        return new yl(a)
    };
    yl.prototype.Eb = function () {
        return U(this.h, 5)
    };
    var Al = function () {
        return [{
            name: "trans", i: 1, m: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "orig", i: 2, m: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "translit", i: 3, m: function (a) {
                return X(a.h, 3)
            }, j: S
        }, {
            name: "src_translit", i: 4, m: function (a) {
                return X(a.h, 4)
            }, j: S
        }, {
            name: "backend", i: 5, m: function (a) {
                return a.Eb()
            }, j: S
        }, {
            name: "model", i: 6, v: function (a) {
                return Y(a.h, 6)
            }, j: S
        }, {
            name: "word_alignment", i: 7, D: kl, C: ml, m: function (a) {
                return V(a.h, 7, kl)
            }, j: T
        }, {
            name: "model_specification", i: 8, D: ol, C: ql, v: function (a) {
                return W(a.h,
                    8, nl)
            }, j: T
        }, {
            name: "translation_engine_debug_info", i: 9, D: vl, C: xl, v: function (a) {
                return W(a.h, 9, ul)
            }, j: T
        }]
    }, Bl = function (a) {
        return O(a, Al(), yl)
    };
    yl.prototype.s = function () {
        var a = {};
        N(this, Al(), a);
        return a
    };
    yl.prototype.G = function () {
        var a = [];
        R(this, Al(), a);
        return a.join("\n")
    };
    yl.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Cl = function (a) {
        Z.call(this, a)
    };
    m(Cl, Z);
    var Dl = function (a) {
        return new Cl(a)
    };
    Cl.prototype.Aa = function () {
        return U(this.h, 1)
    };
    Cl.prototype.Rb = function () {
        return X(this.h, 2)
    };
    Cl.prototype.Pb = function () {
        return W(this.h, 3, yl)
    };
    Cl.prototype.nc = function () {
        return Nj(this.h, 4, $k) || new $k
    };
    var El = function () {
        return [{
            name: "gender", i: 1, m: function (a) {
                return a.Aa()
            }, j: S
        }, {
            name: "translation", i: 2, m: function (a) {
                return a.Rb()
            }, j: S
        }, {
            name: "sentences", i: 3, D: zl, C: Bl, v: function (a) {
                return a.Pb()
            }, j: T
        }, {
            name: "romanization", i: 4, D: $k, C: bl, m: function (a) {
                return V(a.h, 4, $k)
            }, j: T
        }]
    }, Fl = function (a) {
        return O(a, El(), Cl)
    };
    Cl.prototype.s = function () {
        var a = {};
        N(this, El(), a);
        return a
    };
    Cl.prototype.G = function () {
        var a = [];
        R(this, El(), a);
        return a.join("\n")
    };
    Cl.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Gl = function (a) {
        Z.call(this, a)
    };
    m(Gl, Z);
    Gl.prototype.Ba = function () {
        return U(this.h, 2)
    };
    var Hl = function () {
        return [{
            name: "gendered_translations", i: 1, D: Dl, C: Fl, v: function (a) {
                return W(a.h, 1, Cl)
            }, j: T
        }, {
            name: "status", i: 2, m: function (a) {
                return a.Ba()
            }, j: S
        }]
    }, Il = function (a) {
        return O(a, Hl(), Gl)
    };
    Gl.prototype.s = function () {
        var a = {};
        N(this, Hl(), a);
        return a
    };
    Gl.prototype.G = function () {
        var a = [];
        R(this, Hl(), a);
        return a.join("\n")
    };
    Gl.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Jl = function (a) {
        Z.call(this, a)
    };
    m(Jl, Z);
    Jl.prototype.Aa = function () {
        return U(this.h, 5)
    };
    var Kl = function () {
        return [{
            name: "animacy", i: 1, m: function (a) {
                return U(a.h, 1, 1)
            }, j: S
        }, {
            name: "inflection_aspect", i: 2, m: function (a) {
                return U(a.h, 2, 1)
            }, j: S
        }, {
            name: "grammatical_case", i: 3, m: function (a) {
                return U(a.h, 3)
            }, j: S
        }, {
            name: "degree", i: 4, m: function (a) {
                return U(a.h, 4, 1)
            }, j: S
        }, {
            name: "gender", i: 5, m: function (a) {
                return a.Aa()
            }, j: S
        }, {
            name: "mood", i: 6, m: function (a) {
                return U(a.h, 6, 1)
            }, j: S
        }, {
            name: "nonfinite_form", i: 7, m: function (a) {
                return U(a.h, 7, 1)
            }, j: S
        }, {
            name: "number", i: 8, m: function (a) {
                return U(a.h, 8, 1)
            }, j: S
        },
            {
                name: "person", i: 9, m: function (a) {
                    return U(a.h, 9)
                }, j: S
            }, {
                name: "polarity", i: 10, m: function (a) {
                    return U(a.h, 10, 1)
                }, j: S
            }, {
                name: "referent", i: 11, m: function (a) {
                    return U(a.h, 11, 1)
                }, j: S
            }, {
                name: "strength", i: 12, m: function (a) {
                    return U(a.h, 12, 1)
                }, j: S
            }, {
                name: "tense", i: 13, m: function (a) {
                    return U(a.h, 13, 1)
                }, j: S
            }, {
                name: "imperfect_suffix", i: 14, m: function (a) {
                    return U(a.h, 14, 1)
                }, j: S
            }, {
                name: "voice", i: 15, m: function (a) {
                    return U(a.h, 15, 1)
                }, j: S
            }, {
                name: "infinitive_number", i: 16, m: function (a) {
                    return U(a.h, 16, 1)
                }, j: S
            }, {
                name: "precedes",
                i: 17, m: function (a) {
                    return U(a.h, 17, 1)
                }, j: S
            }]
    }, Ll = function (a) {
        return O(a, Kl(), Jl)
    };
    Jl.prototype.s = function () {
        var a = {};
        N(this, Kl(), a);
        return a
    };
    Jl.prototype.G = function () {
        var a = [];
        R(this, Kl(), a);
        return a.join("\n")
    };
    Jl.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Ml = function (a) {
        Z.call(this, a)
    };
    m(Ml, Z);
    var Nl = function (a) {
        return new Ml(a)
    }, Ol = function () {
        return [{
            name: "written_form", i: 1, m: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "features", i: 2, D: Jl, C: Ll, m: function (a) {
                return V(a.h, 2, Jl)
            }, j: T
        }]
    }, Pl = function (a) {
        return O(a, Ol(), Ml)
    };
    Ml.prototype.s = function () {
        var a = {};
        N(this, Ol(), a);
        return a
    };
    Ml.prototype.G = function () {
        var a = [];
        R(this, Ol(), a);
        return a.join("\n")
    };
    Ml.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Ql = function (a) {
        Z.call(this, a)
    };
    m(Ql, Z);
    var Rl = function (a) {
        return new Ql(a)
    };
    Ql.prototype.getTitle = function () {
        return X(this.h, 1)
    };
    Ql.prototype.setTitle = function (a) {
        Bj(this.h, 1, a)
    };
    Ql.prototype.Ma = function () {
        return X(this.h, 2)
    };
    var Sl = function () {
        return [{
            name: "title", i: 1, m: function (a) {
                return a.getTitle()
            }, j: S
        }, {
            name: "description", i: 2, m: function (a) {
                return a.Ma()
            }, j: S
        }, {
            name: "image_url", i: 3, m: function (a) {
                return X(a.h, 3)
            }, j: S
        }, {
            name: "image_ref_url", i: 4, m: function (a) {
                return X(a.h, 4)
            }, j: S
        }]
    }, Tl = function (a) {
        return O(a, Sl(), Ql)
    };
    Ql.prototype.s = function () {
        var a = {};
        N(this, Sl(), a);
        return a
    };
    Ql.prototype.G = function () {
        var a = [];
        R(this, Sl(), a);
        return a.join("\n")
    };
    Ql.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Ul = function (a) {
        Z.call(this, a)
    };
    m(Ul, Z);
    var Vl = function () {
            return [{
                name: "srclangs", i: 1, v: function (a) {
                    return Y(a.h, 1)
                }, j: S
            }, {
                name: "detected_target", i: 2, m: function (a) {
                    return X(a.h, 2)
                }, j: S
            }, {
                name: "srclangs_confidences", i: 3, v: function (a) {
                    a = Cj(a.h, 3);
                    a instanceof wj && B("Unexpected kind of lazy reader for a JS API storage field.");
                    if (a && !(jj(a) & 1)) {
                        for (var b = a.length, c = 0; c < b; c++) {
                            var d = c, e = a[c];
                            A("number" === typeof e || "string" === typeof e);
                            a[d] = +e
                        }
                        ij(a, 1)
                    }
                    return Jj(a || Ej)
                }, j: S
            }, {
                name: "extended_srclangs", i: 4, v: function (a) {
                    return Y(a.h, 4)
                }, j: S
            }]
        },
        Wl = function (a) {
            return O(a, Vl(), Ul)
        };
    Ul.prototype.s = function () {
        var a = {};
        N(this, Vl(), a);
        return a
    };
    Ul.prototype.G = function () {
        var a = [];
        R(this, Vl(), a);
        return a.join("\n")
    };
    Ul.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var Xl = function (a) {
        Z.call(this, a)
    };
    m(Xl, Z);
    Xl.prototype.fb = function () {
        var a = Lj(this.h, 1);
        return Ja(a)
    };
    var Yl = function () {
        return [{
            name: "word", i: 1, v: function (a) {
                return Y(a.h, 1)
            }, j: S
        }]
    }, Zl = function (a) {
        return O(a, Yl(), Xl)
    };
    Xl.prototype.s = function () {
        var a = {};
        N(this, Yl(), a);
        return a
    };
    Xl.prototype.G = function () {
        var a = [];
        R(this, Yl(), a);
        return a.join("\n")
    };
    Xl.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var $l = function (a) {
        Z.call(this, a)
    };
    m($l, Z);
    var am = function () {
        return [{
            name: "spell_html_res", i: 1, m: function (a) {
                return X(a.h, 1)
            }, j: S
        }, {
            name: "spell_res", i: 2, m: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "correction_type", i: 3, v: function (a) {
                return Mj(a.h, 3)
            }, j: S
        }, {
            name: "correction_translation", i: 4, m: function (a) {
                return X(a.h, 4)
            }, j: S
        }, {
            name: "related", i: 5, m: function (a) {
                return !!Dj(a.h, 5, !1)
            }, j: S
        }, {
            name: "confident", i: 6, m: function (a) {
                return !!Dj(a.h, 6, !1)
            }, j: S
        }]
    }, bm = function (a) {
        return O(a, am(), $l)
    };
    $l.prototype.s = function () {
        var a = {};
        N(this, am(), a);
        return a
    };
    $l.prototype.G = function () {
        var a = [];
        R(this, am(), a);
        return a.join("\n")
    };
    $l.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var cm = function (a) {
        Z.call(this, a)
    };
    m(cm, Z);
    var dm = function (a) {
        return new cm(a)
    };
    cm.prototype.La = function () {
        return X(this.h, 2)
    };
    cm.prototype.Qa = function () {
        return V(this.h, 3, Gk)
    };
    var em = function () {
        return [{
            name: "synonym", i: 1, v: function (a) {
                return Y(a.h, 1)
            }, j: S
        }, {
            name: "definition_id", i: 2, m: function (a) {
                return a.La()
            }, j: S
        }, {
            name: "label_info", i: 3, D: Gk, C: Ik, m: function (a) {
                return a.Qa()
            }, j: T
        }]
    }, fm = function (a) {
        return O(a, em(), cm)
    };
    cm.prototype.s = function () {
        var a = {};
        N(this, em(), a);
        return a
    };
    cm.prototype.G = function () {
        var a = [];
        R(this, em(), a);
        return a.join("\n")
    };
    cm.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var gm = function (a) {
        Z.call(this, a)
    };
    m(gm, Z);
    var hm = function (a) {
        return new gm(a)
    };
    gm.prototype.Ra = function () {
        return X(this.h, 1)
    };
    gm.prototype.Oa = function () {
        return W(this.h, 2, cm)
    };
    gm.prototype.Ka = function () {
        return X(this.h, 3)
    };
    var im = function () {
        return [{
            name: "pos", i: 1, m: function (a) {
                return a.Ra()
            }, j: S
        }, {
            name: "entry", i: 2, D: dm, C: fm, v: function (a) {
                return a.Oa()
            }, j: T
        }, {
            name: "base_form", i: 3, m: function (a) {
                return a.Ka()
            }, j: S
        }]
    }, jm = function (a) {
        return O(a, im(), gm)
    };
    gm.prototype.s = function () {
        var a = {};
        N(this, im(), a);
        return a
    };
    gm.prototype.G = function () {
        var a = [];
        R(this, im(), a);
        return a.join("\n")
    };
    gm.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var km = function (a) {
        Z.call(this, a)
    };
    m(km, Z);
    var lm = function (a) {
        return new km(a)
    };
    k = km.prototype;
    k.Qb = function () {
        return X(this.h, 1)
    };
    k.cb = function () {
        return X(this.h, 3)
    };
    k.Rb = function () {
        return X(this.h, 4)
    };
    k.La = function () {
        return X(this.h, 6)
    };
    k.Qa = function () {
        return V(this.h, 7, Gk)
    };
    var mm = function () {
        return [{
            name: "text", i: 1, m: function (a) {
                return a.Qb()
            }, j: S
        }, {
            name: "source", i: 2, m: function (a) {
                return X(a.h, 2)
            }, j: S
        }, {
            name: "link", i: 3, m: function (a) {
                return a.cb()
            }, j: S
        }, {
            name: "translation", i: 4, m: function (a) {
                return a.Rb()
            }, j: S
        }, {
            name: "source_type", i: 5, m: function (a) {
                return U(a.h, 5, 1)
            }, j: S
        }, {
            name: "definition_id", i: 6, m: function (a) {
                return a.La()
            }, j: S
        }, {
            name: "label_info", i: 7, D: Gk, C: Ik, m: function (a) {
                return a.Qa()
            }, j: T
        }]
    }, nm = function (a) {
        return O(a, mm(), km)
    };
    km.prototype.s = function () {
        var a = {};
        N(this, mm(), a);
        return a
    };
    km.prototype.G = function () {
        var a = [];
        R(this, mm(), a);
        return a.join("\n")
    };
    km.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var om = function (a) {
        Z.call(this, a)
    };
    m(om, Z);
    om.prototype.mc = function () {
        return Oj(this.h, 1, km)
    };
    var pm = function () {
        return [{
            name: "example", i: 1, D: lm, C: nm, v: function (a) {
                return W(a.h, 1, km)
            }, j: T
        }]
    }, qm = function (a) {
        return O(a, pm(), om)
    };
    om.prototype.s = function () {
        var a = {};
        N(this, pm(), a);
        return a
    };
    om.prototype.G = function () {
        var a = [];
        R(this, pm(), a);
        return a.join("\n")
    };
    om.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var rm = function (a) {
        Z.call(this, a)
    };
    m(rm, Z);
    rm.prototype.Pb = function () {
        return W(this.h, 1, yl)
    };
    rm.prototype.Gb = function () {
        return +Dj(this.h, 7, 0)
    };
    var sm = function () {
        return [{
            name: "sentences", i: 1, D: zl, C: Bl, v: function (a) {
                return a.Pb()
            }, j: T
        }, {
            name: "dict", i: 2, D: Xk, C: Zk, v: function (a) {
                return W(a.h, 2, Wk)
            }, j: T
        }, {
            name: "src", i: 3, m: function (a) {
                return X(a.h, 3)
            }, j: S
        }, {
            name: "err", i: 4, m: function (a) {
                return X(a.h, 4)
            }, j: S
        }, {
            name: "styled_words", i: 5, D: Dk, C: Fk, v: function (a) {
                return W(a.h, 5, Ck)
            }, j: T
        }, {
            name: "alternative_translations", i: 6, D: zk, C: Bk, v: function (a) {
                return W(a.h, 6, yk)
            }, j: T
        }, {
            name: "confidence", i: 7, m: function (a) {
                return a.Gb()
            }, j: S
        }, {
            name: "spell", i: 8, D: $l,
            C: bm, m: function (a) {
                return V(a.h, 8, $l)
            }, j: T
        }, {
            name: "ld_result", i: 9, D: Ul, C: Wl, m: function (a) {
                return V(a.h, 9, Ul)
            }, j: T
        }, {
            name: "server_time", i: 10, m: function (a) {
                return U(a.h, 10)
            }, j: S
        }, {
            name: "autocorrection", i: 11, m: function (a) {
                return !!Dj(a.h, 11, !1)
            }, j: S
        }, {
            name: "synsets", i: 12, D: hm, C: jm, v: function (a) {
                return W(a.h, 12, gm)
            }, j: T
        }, {
            name: "definitions", i: 13, D: Ok, C: Qk, v: function (a) {
                return W(a.h, 13, Nk)
            }, j: T
        }, {
            name: "examples", i: 14, D: om, C: qm, m: function (a) {
                return V(a.h, 14, om)
            }, j: T
        }, {
            name: "related_words", i: 15, D: Xl, C: Zl,
            m: function (a) {
                return V(a.h, 15, Xl)
            }, j: T
        }, {
            name: "knowledge_results", i: 16, D: Rl, C: Tl, v: function (a) {
                return W(a.h, 16, Ql)
            }, j: T
        }, {
            name: "query_inflections", i: 17, D: Nl, C: Pl, v: function (a) {
                return W(a.h, 17, Ml)
            }, j: T
        }, {
            name: "target_inflections", i: 18, D: Nl, C: Pl, v: function (a) {
                return W(a.h, 18, Ml)
            }, j: T
        }, {
            name: "gendered_translation_result", i: 19, D: Gl, C: Il, m: function (a) {
                return V(a.h, 19, Gl)
            }, j: T
        }, {
            name: "sos_alert", i: 20, D: bk, C: dk, m: function (a) {
                return V(a.h, 20, bk)
            }, j: T
        }, {
            name: "covid_19_alert", i: 21, D: Qj, C: Sj, m: function (a) {
                return V(a.h,
                    21, Qj)
            }, j: T
        }]
    };
    rm.prototype.s = function () {
        var a = {};
        N(this, sm(), a);
        return a
    };
    rm.prototype.G = function () {
        var a = [];
        R(this, sm(), a);
        return a.join("\n")
    };
    rm.prototype.toString = function () {
        return JSON.stringify(this.s())
    };
    var tm = function () {
        this.g = 0
    }, um = function (a) {
        a = a.ra("q").join("");
        return Sa(a)
    }, vm = function (a, b, c, d) {
        var e = "https://translate.googleapis.com/translate_a/single";
        b = b.toString();
        b += um(c);
        c = c.toString();
        var f = "POST";
        e += "?" + b;
        2E3 > e.length + c.length && (f = "GET", e += "&" + c, c = "");
        ++a.g;
        Pi(e, function (h) {
            --a.g;
            d(h)
        }, f, c)
    };
    tm.prototype.l = function (a, b, c) {
        c = c.target;
        if (!Yi(c) || "[" != Zi(c)[0] && "{" != Zi(c)[0]) {
            a = Bi.Z();
            var d = String(c.B), e = Zi(c);
            a.log("invalidResponse", {q: d.substring(0, 500), ql: d.length, r: e.substring(0, 500), rl: e.length});
            b && b(c.Ba())
        } else {
            b = Zi(c);
            c = {"class": "trans.common.TranslationAPI", func: "handleSingleResult_", url: String(c.B)};
            try {
                d = JSON.parse(b)
            } catch (f) {
                throw a = Bi.Z(), c.js = b, c.error = f.message, a.log("jsonParseErr", c), f;
            }
            Array.isArray(d) && (d = new rm(d));
            a(d)
        }
    };
    var wm = ia(["margin-left: 0px;"]), xm = ia(["color: #A2A2A2; float: right; padding-top: 16px;"]), yi = new ti,
        ym = function () {
        }, zm = function (a, b, c, d) {
            if ("" != a) {
                a = a.replace(/[\n\r]+/g, " ").replace(/\s+/g, " ").trim();
                window.selection = a;
                a = new tm;
                var e = chrome.i18n.getUILanguage ? chrome.i18n.getUILanguage() : "en";
                d = d ? d : "auto";
                var f = ui(yi);
                c = new Jc("source=" + c);
                var h = window.selection, g = new Jc, l = new Jc;
                g.set("client", "gtx");
                g.set("sl", d);
                g.set("tl", f);
                g.set("hl", e);
                e = ["t", "bd", "rm"]; // add dt=rm param to get pinyin result
                g.remove("dt");
                0 < e.length && (g.o = null, g.g.set("dt", $a(e)), g.l = Ia(g.l) + e.length);
                g.set("dj", "1");
                c && g.zc(c);
                l.set("q", h);
                vm(a, g, l, v(a.l, a, b, void 0))
            }
        };
    ym.prototype.g = function (a, b, c, d) {
        var pinyinText;
        if (null != d) {
            for (var e = d.src, f = ui(yi), h = [], g = [], l = d.sentences, n = 0; n < l.length; n++) h.push(l[n].orig), g.push(l[n].trans);
            h = h.join(""); // original text
            g = g.join(""); // translated text
            pinyinText = d.sentences[d.sentences.length - 1];
            pinyinText = pinyinText.src_translit? pinyinText.src_translit: undefined; // pinyin text
            if (pinyinText && h.length > 45) {
                pinyinText = undefined;
            }
            l = zi("tl")[f].toUpperCase();
            var p = zi("sl");
            n = [];
            for (var q in p) n.push([q, p[q]]);
            d = d.dict;
            me();
            if (ge["extension.translation"]) d = ge["extension.translation"]({
                query: b,
                ff: g,
                bf: e,
                ef: l,
                cf: n,
                Ve: d,
                popup: a
            }, void 0); else {
                q = "";
                if (b) if (g) {
                    q += '<div class="gtx-language"><select class="gtx-lang-selector">';
                    p = n.length;
                    for (var u = 0; u < p; u++) {
                        var x =
                            n[u];
                        q += he(x, "auto") ? "" : '<option value="' + I(x[0]) + '"' + (he(x[0], e) ? " selected" : "") + ">" + fe(x[1]) + "</option>"
                    }
                    q += '</select></div>';
                    q += '<div class="gtx-source-audio"><div class="jfk-button-img"></div></div>';
                    q += '<div class="gtx-body">' + fe(b) + '</div><br>'; // b is the original text
                    if (pinyinText) {
                        q += '<div class="gtx-pinyin">' + fe(pinyinText) + '</div><br>';
                    }
                    q += '<div class="gtx-language">' + fe(l) + '</div>'; // l = "VIETNAMESE"
                    q += '<div class="gtx-target-audio"><div class="jfk-button-img"></div></div>';
                    q += '<div class="gtx-body">' + fe(g) + "</div>";
                    if (d) {
                        q += '<table style="width: 95%">';
                        l = d.length;
                        for (n = 0; n < l; n++) {
                            p = d[n];
                            q += '<tr><td class="gtx-td"><div class="gtx-pos">' +
                                fe(p.pos) + '</div></td><td class="gtx-td">';
                            if (a) for (p = p.terms, u = p.length, x = 0; x < u; x++) q += (0 != x ? ", " : "") + fe(p[x]); else for (p = p.terms, u = p.length, x = 0; x < u; x++) {
                                var E = p[x];
                                q += 3 > x ? (0 != x ? ", " : "") + fe(E) : ""
                            }
                            q += "</td></tr>"
                        }
                        q += "</table>"
                    }
                    q += "<br>"
                } else q += "No translation results for <b>" + fe(b) + "</b>.";
                d = ce(q)
            }
            d && d.l && c ? d.l(c) : (d = Ve(d), vc(A(c), d));
            d = xe("gtx-lang-selector", c);
            Gg(d, "change", v(this.l, this, a, b, c), !1, this);
            b = new mi;
            gtxSourceAudio = b;
            d = xe("gtx-source-audio", c);
            gtxSourceAudioElement = d;
            Ah(b, d);
            pi(b, h, e);
            b = new mi;
            h = xe("gtx-target-audio", c);
            Ah(b,
                h);
            pi(b, g, f);
            e = "https://translate.google.com/?source=gtx_m#" + e + "/" + f + "/" + encodeURIComponent(window.selection);
            a ? (a = ue(document, "more"), $g(a, vd(e)), c = new ii("", void 0, 4), e = ue(document, "new-translation"), zh(c, e), Of(ue(document, "new-translation"), !0), c = ue(document, "translate-page"), Ke(a, ri("MSG_OPEN_IN_TRANSLATE")), c.className = "gtx-a", e = rd(wm), c.style.cssText = Jb(e), Of(a, !0)) : (a = Fe(document, "a"), a.id = "off", a.className = "gtx-a", a.setAttribute("target", "_blank"), Ke(a, ri("MSG_FOOTER_OPTIONS").toUpperCase()),
                $g(a, vd(chrome.runtime.getURL("options.html"))), Ge(c, a), a = Fe(document, "a"), a.id = "more", a.setAttribute("class", "gtx-a"), a.setAttribute("target", "_blank"), Ke(a, ri("MSG_MORE")), $g(a, vd(e)), e = rd(xm), a.style.cssText = Jb(e), Ge(c, a))
        } else Ke(ue(document, "translation"), ri("MSG_TRANSLATION_ERROR"))
    };
    ym.prototype.l = function (a, b, c, d) {
        zm(b, v(this.g, this, a, b, c), "ls", d.target.value)
    };
    ym.Z = function () {
        return ih(ym)
    };
    var Am = function (a, b) {
        var c = a.xc;
        a = a.uid;
        me();
        ge["jfk.templates.bubble.main"] ? c = ge["jfk.templates.bubble.main"]({
            xc: c,
            uid: a
        }, b) : (b = '<div class="' + I("jfk-bubble") + '" role="alertdialog"' + (a ? ' aria-describedby="' + I(a) + '"' : "") + '><div class="' + I("jfk-bubble-content-id") + '"' + (a ? ' id="' + I(a) + '"' : "") + "></div>", c && (b += '<div class="' + I("jfk-bubble-closebtn-id") + " " + I("jfk-bubble-closebtn") + '" aria-label="', b += "Close".replace(ke, ee), b += '" role="button" tabindex=0></div>'), b += '<div class="' + I("jfk-bubble-arrow-id") +
            " " + I("jfk-bubble-arrow") + '"><div class="' + I("jfk-bubble-arrowimplbefore") + '"></div><div class="' + I("jfk-bubble-arrowimplafter") + '"></div></div></div>', c = ce(b));
        return c
    };
    var Bm = function () {
    }, Cm = new Bm, Dm = ["click", "keydown", "keyup"];
    Bm.prototype.listen = function (a, b, c, d, e) {
        var f = function (h) {
            var g = Hg(b), l = h.target;
            l = t(l) && 1 == l.nodeType ? h.target.getAttribute("role") || null : null;
            "click" != h.type || 0 != h.ka.button || Md && h.ctrlKey ? 13 != h.keyCode && 3 != h.keyCode || "keyup" == h.type ? 32 != h.keyCode || "button" != l && "tab" != l && "radio" != l || ("keyup" == h.type && g.call(d, h), h.preventDefault()) : (h.type = "keypress", g.call(d, h)) : g.call(d, h)
        };
        f.Wa = b;
        f.Qc = d;
        e ? e.listen(a, Dm, f, c) : Gg(a, Dm, f, c)
    };
    Bm.prototype.fa = function (a, b, c, d, e) {
        for (var f, h = 0; f = Dm[h]; h++) {
            var g = a;
            var l = f;
            var n = !!c;
            l = vg(g) ? g.eb(l, n) : g ? (g = Jg(g)) ? g.eb(l, n) : [] : [];
            for (g = 0; n = l[g]; g++) {
                var p = n.listener;
                if (p.Wa == b && p.Qc == d) {
                    e ? e.fa(a, f, n.listener, c, d) : Ng(a, f, n.listener, c, d);
                    break
                }
            }
        }
    };
    var Em = function () {
        K.call(this);
        this.l = 0;
        this.endTime = this.startTime = null
    };
    y(Em, K);
    Em.prototype.onStop = function () {
        this.dispatchEvent("stop")
    };
    var Fm = function (a, b) {
        Array.isArray(b) || (b = [b]);
        A(0 < b.length, "At least one Css3Property should be specified.");
        b = b.map(function (c) {
            if ("string" === typeof c) return c;
            Ka(c, "Expected css3 property to be an object.");
            var d = c.wc + " " + c.duration + "s " + c.timing + " " + c.delay + "s";
            A(c.wc && "number" === typeof c.duration && c.timing && "number" === typeof c.delay, "Unexpected css3 property value: %s", d);
            return d
        });
        zf(a, "transition", b.join(","))
    }, Gm = Ua(function () {
        if (F) return !0;
        var a = Fe(document, "DIV"), b = H ? "-webkit" : G ? "-moz" :
            F ? "-ms" : null, c = {transition: "opacity 1s linear"};
        b && (c[b + "-transition"] = "opacity 1s linear");
        c = {style: c};
        if (!pc.test("div")) throw Error("Invalid tag name <div>.");
        if ("DIV" in rc) throw Error("Tag name <div> is not allowed for SafeHtml.");
        b = void 0;
        var d = "";
        if (c) for (h in c) if (Object.prototype.hasOwnProperty.call(c, h)) {
            if (!pc.test(h)) throw Error('Invalid attribute name "' + h + '".');
            var e = c[h];
            if (null != e) {
                var f = h;
                if (e instanceof kb) e = lb(e); else if ("style" == f.toLowerCase()) {
                    if (!t(e)) throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, ' +
                        typeof e + " given: " + e);
                    e instanceof Ib || (e = Mb(e));
                    e = Jb(e)
                } else {
                    if (/^on/i.test(f)) throw Error('Attribute "' + f + '" requires goog.string.Const value, "' + e + '" given.');
                    if (f.toLowerCase() in qc) if (e instanceof nb) e instanceof nb && e.constructor === nb ? e = e.g : (B("expected object of type TrustedResourceUrl, got '" + e + "' of type " + wa(e)), e = "type_error:TrustedResourceUrl"), e = e.toString(); else if (e instanceof Bb) e = Cb(e); else if ("string" === typeof e) e = (Fb(e) || Gb).ea(); else throw Error('Attribute "' + f + '" on tag "div" requires goog.html.SafeUrl, goog.string.Const, or string, value "' +
                        e + '" given.');
                }
                e.sa && (e = e.ea());
                A("string" === typeof e || "number" === typeof e, "String or number value expected, got " + typeof e + " with value: " + e);
                f = f + '="' + xb(String(e)) + '"';
                d += " " + f
            }
        }
        var h = "<div" + d;
        null == b ? b = [] : Array.isArray(b) || (b = [b]);
        !0 === gb.div ? (A(!b.length, "Void tag <div> does not allow content."), h += ">") : (b = oc(b), h += ">" + ic(b).toString() + "</div>");
        h = jc(h);
        wc(a, h);
        a = a.firstChild;
        A(a.nodeType == Node.ELEMENT_NODE);
        h = a.style[Cc("transition")];
        return "" != ("undefined" !== typeof h ? h : a.style[yf(a, "transition")] ||
            "")
    });
    var Hm = function (a, b, c, d, e) {
        Em.call(this);
        this.g = a;
        this.B = b;
        this.F = c;
        this.o = d;
        this.J = Array.isArray(e) ? e : [e]
    };
    y(Hm, Em);
    k = Hm.prototype;
    k.play = function () {
        if (1 == this.l) return !1;
        this.dispatchEvent("begin");
        this.dispatchEvent("play");
        this.startTime = Date.now();
        this.l = 1;
        if (Gm()) return zf(this.g, this.F), this.u = Tg(this.Pc, void 0, this), !0;
        this.vb(!1);
        return !1
    };
    k.Pc = function () {
        Mf(this.g);
        Fm(this.g, this.J);
        zf(this.g, this.o);
        this.u = Tg(v(this.vb, this, !1), 1E3 * this.B)
    };
    k.stop = function () {
        1 == this.l && this.vb(!0)
    };
    k.vb = function (a) {
        zf(this.g, "transition", "");
        r.clearTimeout(this.u);
        zf(this.g, this.o);
        this.endTime = Date.now();
        this.l = 0;
        if (a) this.onStop(); else this.dispatchEvent("finish");
        this.dispatchEvent("end")
    };
    k.H = function () {
        this.stop();
        Hm.I.H.call(this)
    };
    k.pause = function () {
        A(!1, "Css3 transitions does not support pause action.")
    };
    var Im = function (a, b, c, d) {
        return new Hm(a, .218, {opacity: c}, {opacity: d}, {wc: "opacity", duration: .218, timing: b, delay: 0})
    };
    var Km = function (a, b) {
        K.call(this);
        this.g = new L(this);
        a = a || null;
        Jm(this);
        this.U = a;
        b && (this.Ga = b)
    };
    y(Km, K);
    k = Km.prototype;
    k.U = null;
    k.jc = null;
    k.Fa = !1;
    k.Wb = -1;
    k.Ga = "toggle_display";
    k.getType = function () {
        return this.Ga
    };
    k.A = function () {
        return this.U
    };
    var Jm = function (a) {
        if (a.Fa) throw Error("Can not change this state of the popup while showing.");
    };
    Km.prototype.isVisible = function () {
        return this.Fa
    };
    Km.prototype.l = function () {
    };
    var Lm = function (a, b) {
        a.Fa && a.dispatchEvent({
            type: "beforehide",
            target: b
        }) && (a.g && a.g.removeAll(), a.Fa = !1, a.o ? (Fg(a.o, "end", w(a.kc, b), !1, a), a.o.play()) : a.kc(b))
    };
    k = Km.prototype;
    k.kc = function (a) {
        "toggle_display" == this.Ga ? this.Kc() : "move_offscreen" == this.Ga && (this.U.style.top = "-10000px");
        this.dispatchEvent({type: "hide", target: a})
    };
    k.Kc = function () {
        this.U.style.visibility = "hidden";
        Of(this.U, !1)
    };
    k.vc = function () {
        this.dispatchEvent("show")
    };
    k.uc = function (a) {
        a = a.target;
        Je(this.U, a) || Mm(this, a) || 150 > Date.now() - this.Wb || Lm(this, a)
    };
    k.tc = function (a) {
        var b = se(this.U);
        if ("undefined" != typeof document.activeElement) {
            if (a = b.activeElement, !a || Je(this.U, a) || "BODY" == a.tagName || Mm(this, a)) return
        } else if (a.target != b) return;
        150 > Date.now() - this.Wb || Lm(this)
    };
    var Mm = function (a, b) {
        return Xa(a.jc || [], function (c) {
            return b === c || Je(c, b)
        })
    };
    Km.prototype.H = function () {
        Km.I.H.call(this);
        this.g.na();
        kg(this.u);
        kg(this.o);
        delete this.U;
        delete this.g;
        delete this.jc
    };
    var Nm = function (a, b) {
        this.B = b || void 0;
        Km.call(this, a)
    };
    y(Nm, Km);
    Nm.prototype.l = function () {
        if (this.B) {
            var a = !this.isVisible() && "move_offscreen" != this.getType(), b = this.A();
            a && (b.style.visibility = "hidden", Of(b, !0));
            this.B.u(this.F);
            a && Of(b, !1)
        }
    };

    function Om(a) {
        uh.call(this, a);
        this.J = new Vf("jfk-bubble", !0);
        this.l = new Nm;
        mg(this, w(kg, this.l));
        this.R = []
    }

    y(Om, uh);
    Om.prototype.M = !1;
    var Pm = function (a, b) {
        a = a.qb();
        b && a && ("string" === typeof b ? Ke(a, b) : b instanceof zd ? Rc(a, b.ac()) : b instanceof D ? Rc(a, b) : (a.textContent = "", Ge(a, b)))
    };
    k = Om.prototype;
    k.qb = function () {
        return this.g ? xe("jfk-bubble-content-id", this.g || this.o.g) : null
    };
    k.pb = function () {
        this.g = Te(Am, {xc: !0, uid: "bubble-" + Aa(this)}, this.o);
        Pm(this, this.T);
        Of(this.A(), !1);
        var a = this.l, b = this.A();
        Jm(a);
        a.U = b;
        if (!Ld) {
            a = this.l;
            b = Im(this.A(), "ease-out", 0, 1);
            var c = Im(this.A(), "ease-in", 1, 0);
            a.u = b;
            a.o = c
        }
        sf(this.A(), this.R)
    };
    k.oa = function () {
        Om.I.oa.call(this);
        yh(this).listen(this.l, ["beforeshow", "show", "beforehide", "hide"], this.Jc);
        var a = yh(this), b = this.g ? xe("jfk-bubble-closebtn-id", this.g || this.o.g) : null;
        Cm.listen(b, w(this.fc, !1), void 0, a.J || a, a);
        a = this.A();
        A(a, "getElement() returns null.");
        b = this.g ? xe("jfk-bubble-arrow-id", this.g || this.o.g) : null;
        A(b, "No arrow element is found!");
        var c = this.J;
        c.g = a;
        c.B = b;
        a = this.l;
        a.B = this.J || void 0;
        a.isVisible() && a.l()
    };
    k.fc = function (a) {
        var b = this.l;
        b.u && b.u.stop();
        b.o && b.o.stop();
        if (a) {
            if (!b.Fa && b.dispatchEvent("beforeshow")) {
                if (!b.U) throw Error("Caller must call setElement before trying to show the popup");
                b.l();
                a = se(b.U);
                b.g.listen(a, "mousedown", b.uc, !0);
                if (F) {
                    try {
                        var c = a.activeElement
                    } catch (e) {
                    }
                    for (; c && "IFRAME" == c.nodeName;) {
                        try {
                            var d = c.contentDocument || c.contentWindow.document
                        } catch (e) {
                            break
                        }
                        a = d;
                        c = a.activeElement
                    }
                    b.g.listen(a, "mousedown", b.uc, !0);
                    b.g.listen(a, "deactivate", b.tc)
                } else b.g.listen(a, "blur", b.tc);
                "toggle_display" == b.Ga ? (b.U.style.visibility = "visible", Of(b.U, !0)) : "move_offscreen" == b.Ga && b.l();
                b.Fa = !0;
                b.Wb = Date.now();
                b.u ? (Fg(b.u, "end", b.vc, !1, b), b.u.play()) : b.vc()
            }
        } else Lm(b)
    };
    k.isVisible = function () {
        return this.l.isVisible()
    };
    k.pc = function () {
        If(this.A());
        return !1
    };
    k.Jc = function (a) {
        if ("show" == a.type || "hide" == a.type) {
            var b = yh(this), c = this.o;
            c = F ? Be(c.g) : c.g;
            "show" == a.type ? b.listen(c, "scroll", this.pc) : b.fa(c, "scroll", this.pc)
        }
        b = this.dispatchEvent(a.type);
        this.M && "hide" == a.type && this.na();
        return b
    };
    var Qm = ia(["margin: 0;"]), Rm = function (a) {
        Om.call(this);
        this.M = !0;
        A(!this.Y, "Must call addClassName() before rendering");
        this.R.push("gtx-bubble");
        this.J.l = a;
        this.isVisible() && this.l.l();
        var b = 2;
        parseInt(a.style.top, 10) - Ae(document).scrollTop + parseInt(a.style.height, 10) / 2 < window.innerHeight / 2 && (b = 1);
        var c = 2;
        a = parseInt(a.style.left, 10) + parseInt(a.style.width, 10) / 2;
        217 >= a ? c = 0 : a >= window.innerWidth - 217 && (c = 1);
        A(!this.Y, "Must call setPosition() before rendering");
        this.J.Za = !1;
        Wf(this.J, b, c, 0, -10)
    }, Sm, Tm;
    m(Rm, Om);
    Rm.prototype.H = function () {
        Om.prototype.H.call(this);
        chrome.runtime.sendMessage({bubbleClosed: !0});
        var a = ue(document, "gtx-anchor");
        Ie(a)
    };
    Rm.prototype.ia = function (a, b) {
        var c = document.createElement("style");
        c.textContent = b;
        this.K.appendChild(c);
        b = this.F;
        A("string" === typeof b || b.nodeType || b instanceof zd || b instanceof D, "Content must be a string or HTML.");
        this.T = b;
        Pm(this, b);
        c = this.F.cloneNode(!1);
        c.id = "bubble-content";
        c.className = "gtx-content";
        this.K.appendChild(c);
        b = document.createElement("div");
        b.className = "content";
        var d = rd(Qm);
        b.style.cssText = Jb(d);
        c.appendChild(b);
        c = this.F.cloneNode(!1);
        c.id = "translation";
        c.style.display = "inline";
        b.appendChild(c);
        Um.g(!1, window.selection, c, a);
        this.isVisible() && this.l.l()
    };
    Rm.prototype.F = null;
    Rm.prototype.K = null;
    var Wm = function (a, b, c) {
        var d = ue(document, "gtx-trans");
        Pg(d);
        Ie(d);
        zm(b, w(Vm, a), "icon", c)
    }, $m = function (a) {
        let nodeName = a.target.nodeName;
        if (nodeName === "TEXTAREA" || nodeName === "INPUT") {
            return;
        }
        if ("0" != wi.g) {
            var b = window.getSelection(), c = b.toString().trim();
            Xm(c) && (Ai ? Ym(b, function (d) {
                // skip check the destination language
                if ("zh" == d || "zh-Hant" == d) d = "zh-CN";
                Zm(a, b, c, d)
            }) : !Ai && "1" == wi.g && wi.u && xi(Sm) || Zm(a, b, c))
        }
    }, an = function (a, b, c) {
        if (a) {
            var d = a.innerText || a.textContent || "";
            d = decodeURIComponent(encodeURIComponent(d.trim()));
            chrome.i18n.detectLanguage(d, function (e) {
                let lang = e.isReliable || e.languages.length === 1 ? e.languages[0].language : "auto";
                if (["zh", "en"].includes(lang)) c(lang)
                else c("auto")
            })
        } else c("")
    }, Zm = function (a, b, c, d) {
        // console.log("b.getRangeAt(0).startContainer", b.getRangeAt(0).startContainer);
        b = b.getRangeAt(0).getBoundingClientRect();
        // Fix bug: cannot get client rect for shadow DOM
        if (0 == b.top && 0 == b.left) {
            b = new DOMRect(a.clientX, a.clientY, 0, 0);
        }
        if ("1" == wi.g) {
            var e = Fe(document, "div");
            e.className = "gtx-trans-icon";
            var f = Fe(document, "div");
            f.appendChild(e);
            f.id = "gtx-trans";
            f.style.position = "absolute";
            f.style.left = a.clientX + Ae(document).scrollLeft - 13 + "px";
            a = a.clientY;
            a - b.top > b.height / 2 ? a = b.bottom + 1 : a = b.top - 1 - 27;
            f.style.top = a + Ae(document).scrollTop + "px";
            document.body.appendChild(f);
            Gg(f, "click", w(Wm, b, c, d))
        } else zm(c, w(Vm, b), "bubble",
            d)
    }, Ym = function (a, b) {
        var c = a.toString().trim();
        c = decodeURIComponent(encodeURIComponent(c));
        chrome.i18n.detectLanguage(c, function (d) {
            var e = null;
            if (d.isReliable || d.languages.length === 1) {
                e = d.languages[0].language
                if (["zh", "en"].includes(e)) return b(e)
            }
            b("auto")
        })
    }, Xm = function (a) {
        var b = /^[0-9!@#$\u20ac\u00a3%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        return 0 < a.length && !xe("gtx-bubble") && 500 > a.length && !b.test(a) && 400 < window.innerWidth
    }, Vm = function (a, b) {
        var c = Fe(document, "div");
        c.id = "gtx-anchor";
        c.style.position =
            "absolute";
        c.style.visibility = "hidden";
        c.style.left = String(a.left + Ae(document).scrollLeft + "px");
        c.style.top = String(a.top + Ae(document).scrollTop + "px");
        c.style.width = String(a.right - a.left + 1 + "px");
        c.style.height = String(a.height + "px");
        document.body.appendChild(c);
        window.g = new Rm(c);
        zh(window.g, document.body);
        a = window.g;
        a.F = document.createElement("div");
        a.F.id = "gtx-host";
        c = Mb({"min-width": "200px", "max-width": "400px"});
        a.F.style.cssText = Jb(c);
        a.K = a.F.attachShadow({mode: "closed"});
        bn(chrome.runtime.getURL("popup_css_compiled.css"),
            v(a.ia, a, b));
        window.g.fc(!0)
    }, bn = function (a, b) {
        var c = new XMLHttpRequest;
        c.open("GET", a, !0);
        c.onload = function () {
            var d = null;
            200 === c.status && (d = c.response);
            return b(d)
        };
        c.send()
    };
    chrome.runtime.onMessage.addListener(function (a) {
        a["gtx.detected"] && (Sm = a["gtx.detected"], $m(Tm))
    });
    var wi = new ti, Um = ym.Z();
    Gg(window, "mouseup", function (a) {
        if (0 == a.button && !ue(document, "gtx-trans")) {
            try {
                chrome.runtime.sendMessage({test: 1})
            } catch (b) {
                return
            }
            Ai || "1" != wi.g || !wi.u || Sm ? window.setTimeout(w($m, a), 0) : (Tm = a, chrome.runtime.sendMessage({detectLanguage: 1}))
        }
    });
    Gg(window, "mousedown", function (a) {
        var b = ue(document, "gtx-trans");
        b && (Je(b, a.target) ? a.preventDefault() : (Pg(b), Ie(b)));
        a.target instanceof HTMLElement && -1 != a.target.className.indexOf("jfk-bubble-closebtn") && a.preventDefault()
    }, !0);
    var cn = function () {
        window.g && window.g.na()
    }, dn = ["disposeWindowBubble"], en = r;
    dn[0] in en || "undefined" == typeof en.execScript || en.execScript("var " + dn[0]);
    for (var fn; dn.length && (fn = dn.shift());) dn.length || void 0 === cn ? en[fn] && en[fn] !== Object.prototype[fn] ? en = en[fn] : en = en[fn] = {} : en[fn] = cn;
    document.addEventListener("keyup", e => {
        const focusedElementTag = document.activeElement?.tagName;
        if (focusedElementTag === 'INPUT' || focusedElementTag === 'FORM') return;
        if (e.code === "KeyS") {
            let popup = document.querySelector(".jfk-bubble.gtx-bubble");
            if (popup && gtxSourceAudio) {
                e.stopImmediatePropagation();
                gtxSourceAudio.Bc();
                let oldOpacity = gtxSourceAudioElement.style.opacity;
                gtxSourceAudioElement.style.opacity = '0.5';
                setTimeout(() => {
                    gtxSourceAudioElement.style.opacity = oldOpacity;
                }, 100);
            }
        } else if (e.code === "KeyQ" || e.code === "Escape") {
            window.g.H();
        }
    })
})();
