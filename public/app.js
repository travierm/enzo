// node_modules/preact/dist/preact.module.js
var v = function(n, l) {
  for (var u in l)
    n[u] = l[u];
  return n;
};
var p = function(n) {
  var l = n.parentNode;
  l && l.removeChild(n);
};
var y = function(l, u, t) {
  var i, o, r, f = {};
  for (r in u)
    r == "key" ? i = u[r] : r == "ref" ? o = u[r] : f[r] = u[r];
  if (arguments.length > 2 && (f.children = arguments.length > 3 ? n.call(arguments, 2) : t), typeof l == "function" && l.defaultProps != null)
    for (r in l.defaultProps)
      f[r] === undefined && (f[r] = l.defaultProps[r]);
  return d(l, f, i, o, null);
};
var d = function(n, t, i, o, r) {
  var f = { type: n, props: t, key: i, ref: o, __k: null, __: null, __b: 0, __e: null, __d: undefined, __c: null, constructor: undefined, __v: r == null ? ++u : r, __i: -1, __u: 0 };
  return r == null && l.vnode != null && l.vnode(f), f;
};
var g = function(n) {
  return n.children;
};
var b = function(n, l) {
  this.props = n, this.context = l;
};
var m = function(n, l) {
  if (l == null)
    return n.__ ? m(n.__, n.__i + 1) : null;
  for (var u;l < n.__k.length; l++)
    if ((u = n.__k[l]) != null && u.__e != null)
      return u.__e;
  return typeof n.type == "function" ? m(n) : null;
};
var w = function(n, u, t) {
  var i, o = n.__v, r = o.__e, f = n.__P;
  if (f)
    return (i = v({}, o)).__v = o.__v + 1, l.vnode && l.vnode(i), M(f, i, o, n.__n, f.ownerSVGElement !== undefined, 32 & o.__u ? [r] : null, u, r == null ? m(o) : r, !!(32 & o.__u), t), i.__.__k[i.__i] = i, i.__d = undefined, i.__e != r && k(i), i;
};
var k = function(n) {
  var l, u;
  if ((n = n.__) != null && n.__c != null) {
    for (n.__e = n.__c.base = null, l = 0;l < n.__k.length; l++)
      if ((u = n.__k[l]) != null && u.__e != null) {
        n.__e = n.__c.base = u.__e;
        break;
      }
    return k(n);
  }
};
var x = function(n) {
  (!n.__d && (n.__d = true) && i.push(n) && !C.__r++ || o !== l.debounceRendering) && ((o = l.debounceRendering) || r)(C);
};
var C = function() {
  var n, u, t, o = [], r = [];
  for (i.sort(f);n = i.shift(); )
    n.__d && (t = i.length, u = w(n, o, r) || u, t === 0 || i.length > t ? (j(o, u, r), r.length = o.length = 0, u = undefined, i.sort(f)) : u && l.__c && l.__c(u, s));
  u && j(o, u, r), C.__r = 0;
};
var P = function(n, l, u, t, i, o, r, f, e, a, h) {
  var v2, p2, y2, d2, _, g2 = t && t.__k || s, b2 = l.length;
  for (u.__d = e, S(u, l, g2), e = u.__d, v2 = 0;v2 < b2; v2++)
    (y2 = u.__k[v2]) != null && typeof y2 != "boolean" && typeof y2 != "function" && (p2 = y2.__i === -1 ? c : g2[y2.__i] || c, y2.__i = v2, M(n, y2, p2, i, o, r, f, e, a, h), d2 = y2.__e, y2.ref && p2.ref != y2.ref && (p2.ref && N(p2.ref, null, y2), h.push(y2.ref, y2.__c || d2, y2)), _ == null && d2 != null && (_ = d2), 65536 & y2.__u || p2.__k === y2.__k ? e = $(y2, e, n) : typeof y2.type == "function" && y2.__d !== undefined ? e = y2.__d : d2 && (e = d2.nextSibling), y2.__d = undefined, y2.__u &= -196609);
  u.__d = e, u.__e = _;
};
var S = function(n, l, u) {
  var t, i, o, r, f, e = l.length, c = u.length, s = c, a = 0;
  for (n.__k = [], t = 0;t < e; t++)
    (i = n.__k[t] = (i = l[t]) == null || typeof i == "boolean" || typeof i == "function" ? null : typeof i == "string" || typeof i == "number" || typeof i == "bigint" || i.constructor == String ? d(null, i, null, null, i) : h(i) ? d(g, { children: i }, null, null, null) : i.constructor === undefined && i.__b > 0 ? d(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i) != null ? (i.__ = n, i.__b = n.__b + 1, f = I(i, u, r = t + a, s), i.__i = f, o = null, f !== -1 && (s--, (o = u[f]) && (o.__u |= 131072)), o == null || o.__v === null ? (f == -1 && a--, typeof i.type != "function" && (i.__u |= 65536)) : f !== r && (f === r + 1 ? a++ : f > r ? s > e - r ? a += f - r : a-- : a = f < r && f == r - 1 ? f - r : 0, f !== t + a && (i.__u |= 65536))) : (o = u[t]) && o.key == null && o.__e && (o.__e == n.__d && (n.__d = m(o)), O(o, o, false), u[t] = null, s--);
  if (s)
    for (t = 0;t < c; t++)
      (o = u[t]) != null && (131072 & o.__u) == 0 && (o.__e == n.__d && (n.__d = m(o)), O(o, o));
};
var $ = function(n, l, u) {
  var t, i;
  if (typeof n.type == "function") {
    for (t = n.__k, i = 0;t && i < t.length; i++)
      t[i] && (t[i].__ = n, l = $(t[i], l, u));
    return l;
  }
  n.__e != l && (u.insertBefore(n.__e, l || null), l = n.__e);
  do {
    l = l && l.nextSibling;
  } while (l != null && l.nodeType === 8);
  return l;
};
var I = function(n, l, u, t) {
  var { key: i, type: o } = n, r = u - 1, f = u + 1, e = l[u];
  if (e === null || e && i == e.key && o === e.type)
    return u;
  if (t > (e != null && (131072 & e.__u) == 0 ? 1 : 0))
    for (;r >= 0 || f < l.length; ) {
      if (r >= 0) {
        if ((e = l[r]) && (131072 & e.__u) == 0 && i == e.key && o === e.type)
          return r;
        r--;
      }
      if (f < l.length) {
        if ((e = l[f]) && (131072 & e.__u) == 0 && i == e.key && o === e.type)
          return f;
        f++;
      }
    }
  return -1;
};
var T = function(n, l, u) {
  l[0] === "-" ? n.setProperty(l, u == null ? "" : u) : n[l] = u == null ? "" : typeof u != "number" || a.test(l) ? u : u + "px";
};
var A = function(n, l, u, t, i) {
  var o;
  n:
    if (l === "style")
      if (typeof u == "string")
        n.style.cssText = u;
      else {
        if (typeof t == "string" && (n.style.cssText = t = ""), t)
          for (l in t)
            u && l in u || T(n.style, l, "");
        if (u)
          for (l in u)
            t && u[l] === t[l] || T(n.style, l, u[l]);
      }
    else if (l[0] === "o" && l[1] === "n")
      o = l !== (l = l.replace(/(PointerCapture)$|Capture$/i, "$1")), l = l.toLowerCase() in n ? l.toLowerCase().slice(2) : l.slice(2), n.l || (n.l = {}), n.l[l + o] = u, u ? t ? u.u = t.u : (u.u = Date.now(), n.addEventListener(l, o ? L : D, o)) : n.removeEventListener(l, o ? L : D, o);
    else {
      if (i)
        l = l.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (l !== "width" && l !== "height" && l !== "href" && l !== "list" && l !== "form" && l !== "tabIndex" && l !== "download" && l !== "rowSpan" && l !== "colSpan" && l !== "role" && l in n)
        try {
          n[l] = u == null ? "" : u;
          break n;
        } catch (n2) {
        }
      typeof u == "function" || (u == null || u === false && l[4] !== "-" ? n.removeAttribute(l) : n.setAttribute(l, u));
    }
};
var D = function(n) {
  if (this.l) {
    var u = this.l[n.type + false];
    if (n.t) {
      if (n.t <= u.u)
        return;
    } else
      n.t = Date.now();
    return u(l.event ? l.event(n) : n);
  }
};
var L = function(n) {
  if (this.l)
    return this.l[n.type + true](l.event ? l.event(n) : n);
};
var M = function(n, u, t, i, o, r, f, e, c, s) {
  var a, p2, y2, d2, _, m2, w2, k2, x2, C2, S2, $2, H, I2, T2, A2 = u.type;
  if (u.constructor !== undefined)
    return null;
  128 & t.__u && (c = !!(32 & t.__u), r = [e = u.__e = t.__e]), (a = l.__b) && a(u);
  n:
    if (typeof A2 == "function")
      try {
        if (k2 = u.props, x2 = (a = A2.contextType) && i[a.__c], C2 = a ? x2 ? x2.props.value : a.__ : i, t.__c ? w2 = (p2 = u.__c = t.__c).__ = p2.__E : (("prototype" in A2) && A2.prototype.render ? u.__c = p2 = new A2(k2, C2) : (u.__c = p2 = new b(k2, C2), p2.constructor = A2, p2.render = q), x2 && x2.sub(p2), p2.props = k2, p2.state || (p2.state = {}), p2.context = C2, p2.__n = i, y2 = p2.__d = true, p2.__h = [], p2._sb = []), p2.__s == null && (p2.__s = p2.state), A2.getDerivedStateFromProps != null && (p2.__s == p2.state && (p2.__s = v({}, p2.__s)), v(p2.__s, A2.getDerivedStateFromProps(k2, p2.__s))), d2 = p2.props, _ = p2.state, p2.__v = u, y2)
          A2.getDerivedStateFromProps == null && p2.componentWillMount != null && p2.componentWillMount(), p2.componentDidMount != null && p2.__h.push(p2.componentDidMount);
        else {
          if (A2.getDerivedStateFromProps == null && k2 !== d2 && p2.componentWillReceiveProps != null && p2.componentWillReceiveProps(k2, C2), !p2.__e && (p2.shouldComponentUpdate != null && p2.shouldComponentUpdate(k2, p2.__s, C2) === false || u.__v === t.__v)) {
            for (u.__v !== t.__v && (p2.props = k2, p2.state = p2.__s, p2.__d = false), u.__e = t.__e, u.__k = t.__k, u.__k.forEach(function(n2) {
              n2 && (n2.__ = u);
            }), S2 = 0;S2 < p2._sb.length; S2++)
              p2.__h.push(p2._sb[S2]);
            p2._sb = [], p2.__h.length && f.push(p2);
            break n;
          }
          p2.componentWillUpdate != null && p2.componentWillUpdate(k2, p2.__s, C2), p2.componentDidUpdate != null && p2.__h.push(function() {
            p2.componentDidUpdate(d2, _, m2);
          });
        }
        if (p2.context = C2, p2.props = k2, p2.__P = n, p2.__e = false, $2 = l.__r, H = 0, "prototype" in A2 && A2.prototype.render) {
          for (p2.state = p2.__s, p2.__d = false, $2 && $2(u), a = p2.render(p2.props, p2.state, p2.context), I2 = 0;I2 < p2._sb.length; I2++)
            p2.__h.push(p2._sb[I2]);
          p2._sb = [];
        } else
          do {
            p2.__d = false, $2 && $2(u), a = p2.render(p2.props, p2.state, p2.context), p2.state = p2.__s;
          } while (p2.__d && ++H < 25);
        p2.state = p2.__s, p2.getChildContext != null && (i = v(v({}, i), p2.getChildContext())), y2 || p2.getSnapshotBeforeUpdate == null || (m2 = p2.getSnapshotBeforeUpdate(d2, _)), P(n, h(T2 = a != null && a.type === g && a.key == null ? a.props.children : a) ? T2 : [T2], u, t, i, o, r, f, e, c, s), p2.base = u.__e, u.__u &= -161, p2.__h.length && f.push(p2), w2 && (p2.__E = p2.__ = null);
      } catch (n2) {
        u.__v = null, c || r != null ? (u.__e = e, u.__u |= c ? 160 : 32, r[r.indexOf(e)] = null) : (u.__e = t.__e, u.__k = t.__k), l.__e(n2, u, t);
      }
    else
      r == null && u.__v === t.__v ? (u.__k = t.__k, u.__e = t.__e) : u.__e = z(t.__e, u, t, i, o, r, f, c, s);
  (a = l.diffed) && a(u);
};
var j = function(n, u, t) {
  for (var i = 0;i < t.length; i++)
    N(t[i], t[++i], t[++i]);
  l.__c && l.__c(u, n), n.some(function(u2) {
    try {
      n = u2.__h, u2.__h = [], n.some(function(n2) {
        n2.call(u2);
      });
    } catch (n2) {
      l.__e(n2, u2.__v);
    }
  });
};
var z = function(l, u, t, i, o, r, f, e, s) {
  var a, v2, y2, d2, _, g2, b2, w2 = t.props, k2 = u.props, x2 = u.type;
  if (x2 === "svg" && (o = true), r != null) {
    for (a = 0;a < r.length; a++)
      if ((_ = r[a]) && "setAttribute" in _ == !!x2 && (x2 ? _.localName === x2 : _.nodeType === 3)) {
        l = _, r[a] = null;
        break;
      }
  }
  if (l == null) {
    if (x2 === null)
      return document.createTextNode(k2);
    l = o ? document.createElementNS("http://www.w3.org/2000/svg", x2) : document.createElement(x2, k2.is && k2), r = null, e = false;
  }
  if (x2 === null)
    w2 === k2 || e && l.data === k2 || (l.data = k2);
  else {
    if (r = r && n.call(l.childNodes), w2 = t.props || c, !e && r != null)
      for (w2 = {}, a = 0;a < l.attributes.length; a++)
        w2[(_ = l.attributes[a]).name] = _.value;
    for (a in w2)
      _ = w2[a], a == "children" || (a == "dangerouslySetInnerHTML" ? y2 = _ : a === "key" || (a in k2) || A(l, a, null, _, o));
    for (a in k2)
      _ = k2[a], a == "children" ? d2 = _ : a == "dangerouslySetInnerHTML" ? v2 = _ : a == "value" ? g2 = _ : a == "checked" ? b2 = _ : a === "key" || e && typeof _ != "function" || w2[a] === _ || A(l, a, _, w2[a], o);
    if (v2)
      e || y2 && (v2.__html === y2.__html || v2.__html === l.innerHTML) || (l.innerHTML = v2.__html), u.__k = [];
    else if (y2 && (l.innerHTML = ""), P(l, h(d2) ? d2 : [d2], u, t, i, o && x2 !== "foreignObject", r, f, r ? r[0] : t.__k && m(t, 0), e, s), r != null)
      for (a = r.length;a--; )
        r[a] != null && p(r[a]);
    e || (a = "value", g2 !== undefined && (g2 !== l[a] || x2 === "progress" && !g2 || x2 === "option" && g2 !== w2[a]) && A(l, a, g2, w2[a], false), a = "checked", b2 !== undefined && b2 !== l[a] && A(l, a, b2, w2[a], false));
  }
  return l;
};
var N = function(n, u, t) {
  try {
    typeof n == "function" ? n(u) : n.current = u;
  } catch (n2) {
    l.__e(n2, t);
  }
};
var O = function(n, u, t) {
  var i, o;
  if (l.unmount && l.unmount(n), (i = n.ref) && (i.current && i.current !== n.__e || N(i, null, u)), (i = n.__c) != null) {
    if (i.componentWillUnmount)
      try {
        i.componentWillUnmount();
      } catch (n2) {
        l.__e(n2, u);
      }
    i.base = i.__P = null, n.__c = undefined;
  }
  if (i = n.__k)
    for (o = 0;o < i.length; o++)
      i[o] && O(i[o], u, t || typeof n.type != "function");
  t || n.__e == null || p(n.__e), n.__ = n.__e = n.__d = undefined;
};
var q = function(n, l, u) {
  return this.constructor(n, u);
};
var B = function(u, t, i) {
  var o, r, f, e;
  l.__ && l.__(u, t), r = (o = typeof i == "function") ? null : i && i.__k || t.__k, f = [], e = [], M(t, u = (!o && i || t).__k = y(g, null, [u]), r || c, c, t.ownerSVGElement !== undefined, !o && i ? [i] : r ? null : t.firstChild ? n.call(t.childNodes) : null, f, !o && i ? i : r ? r.__e : t.firstChild, o, e), u.__d = undefined, j(f, u, e);
};
var n;
var l;
var u;
var t;
var i;
var o;
var r;
var f;
var e;
var c = {};
var s = [];
var a = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var h = Array.isArray;
n = s.slice, l = { __e: function(n2, l2, u2, t2) {
  for (var i2, o2, r2;l2 = l2.__; )
    if ((i2 = l2.__c) && !i2.__)
      try {
        if ((o2 = i2.constructor) && o2.getDerivedStateFromError != null && (i2.setState(o2.getDerivedStateFromError(n2)), r2 = i2.__d), i2.componentDidCatch != null && (i2.componentDidCatch(n2, t2 || {}), r2 = i2.__d), r2)
          return i2.__E = i2;
      } catch (l3) {
        n2 = l3;
      }
  throw n2;
} }, u = 0, t = function(n2) {
  return n2 != null && n2.constructor == null;
}, b.prototype.setState = function(n2, l2) {
  var u2;
  u2 = this.__s != null && this.__s !== this.state ? this.__s : this.__s = v({}, this.state), typeof n2 == "function" && (n2 = n2(v({}, u2), this.props)), n2 && v(u2, n2), n2 != null && this.__v && (l2 && this._sb.push(l2), x(this));
}, b.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), x(this));
}, b.prototype.render = g, i = [], r = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, f = function(n2, l2) {
  return n2.__v.__b - l2.__v.__b;
}, C.__r = 0, e = 0;

// src/core/applyHydration.tsx
var isClientSide = function() {
  return typeof window !== "undefined";
};
function hydrateComponent(uniqueName, component) {
  const formatName = uniqueName.replace(/([a-z])([A-Z])/g, "$1-$2");
  const elementName = `component-${formatName.toLowerCase()}`;
  const root = document?.querySelectorAll(elementName);
  root.forEach((el) => {
    let propData = {};
    const jsonScriptElement = el.querySelector('script[type="application/json"]');
    if (jsonScriptElement) {
      propData = JSON.parse(jsonScriptElement.innerHTML);
      jsonScriptElement.remove();
    }
    el.innerHTML = "";
    const newElement = y(component, propData);
    B(newElement, el);
  });
}
function applyHydration(uniqueName, component) {
  const formatName = uniqueName.replace(/([a-z])([A-Z])/g, "$1-$2");
  const elementName = `component-${formatName.toLowerCase()}`;
  if (isClientSide()) {
    return component;
  }
  return (props) => y(elementName, {}, [
    y("script", {
      type: "application/json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(props) }
    }),
    y(component, {})
  ]);
}

// node_modules/preact/hooks/dist/hooks.module.js
var h2 = function(n2, t2) {
  e2.__h && e2.__h(r2, n2, o2 || t2), o2 = 0;
  var u2 = r2.__H || (r2.__H = { __: [], __h: [] });
  return n2 >= u2.__.length && u2.__.push({ __V: c2 }), u2.__[n2];
};
var p2 = function(n2) {
  return o2 = 1, y2(D2, n2);
};
var y2 = function(n2, u2, i2) {
  var o2 = h2(t2++, 2);
  if (o2.t = n2, !o2.__c && (o2.__ = [i2 ? i2(u2) : D2(undefined, u2), function(n3) {
    var t2 = o2.__N ? o2.__N[0] : o2.__[0], r2 = o2.t(t2, n3);
    t2 !== r2 && (o2.__N = [r2, o2.__[1]], o2.__c.setState({}));
  }], o2.__c = r2, !r2.u)) {
    var f2 = function(n3, t2, r2) {
      if (!o2.__c.__H)
        return true;
      var u3 = o2.__c.__H.__.filter(function(n4) {
        return !!n4.__c;
      });
      if (u3.every(function(n4) {
        return !n4.__N;
      }))
        return !c2 || c2.call(this, n3, t2, r2);
      var i3 = false;
      return u3.forEach(function(n4) {
        if (n4.__N) {
          var t3 = n4.__[0];
          n4.__ = n4.__N, n4.__N = undefined, t3 !== n4.__[0] && (i3 = true);
        }
      }), !(!i3 && o2.__c.props === n3) && (!c2 || c2.call(this, n3, t2, r2));
    };
    r2.u = true;
    var { shouldComponentUpdate: c2, componentWillUpdate: e2 } = r2;
    r2.componentWillUpdate = function(n3, t2, r2) {
      if (this.__e) {
        var u3 = c2;
        c2 = undefined, f2(n3, t2, r2), c2 = u3;
      }
      e2 && e2.call(this, n3, t2, r2);
    }, r2.shouldComponentUpdate = f2;
  }
  return o2.__N || o2.__;
};
var j2 = function() {
  for (var n2;n2 = f2.shift(); )
    if (n2.__P && n2.__H)
      try {
        n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
      } catch (t2) {
        n2.__H.__h = [], e2.__e(t2, n2.__v);
      }
};
var w2 = function(n2) {
  var t2, r2 = function() {
    clearTimeout(u2), k2 && cancelAnimationFrame(t2), setTimeout(n2);
  }, u2 = setTimeout(r2, 100);
  k2 && (t2 = requestAnimationFrame(r2));
};
var z2 = function(n2) {
  var t2 = r2, u2 = n2.__c;
  typeof u2 == "function" && (n2.__c = undefined, u2()), r2 = t2;
};
var B2 = function(n2) {
  var t2 = r2;
  n2.__c = n2.__(), r2 = t2;
};
var D2 = function(n2, t2) {
  return typeof t2 == "function" ? t2(n2) : t2;
};
var t2;
var r2;
var u2;
var i2;
var o2 = 0;
var f2 = [];
var c2 = [];
var e2 = l;
var a2 = e2.__b;
var v2 = e2.__r;
var l2 = e2.diffed;
var m2 = e2.__c;
var s2 = e2.unmount;
var d2 = e2.__;
e2.__b = function(n2) {
  r2 = null, a2 && a2(n2);
}, e2.__ = function(n2, t3) {
  t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), d2 && d2(n2, t3);
}, e2.__r = function(n2) {
  v2 && v2(n2), t2 = 0;
  var i3 = (r2 = n2.__c).__H;
  i3 && (u2 === r2 ? (i3.__h = [], r2.__h = [], i3.__.forEach(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.__V = c2, n3.__N = n3.i = undefined;
  })) : (i3.__h.forEach(z2), i3.__h.forEach(B2), i3.__h = [], t2 = 0)), u2 = r2;
}, e2.diffed = function(n2) {
  l2 && l2(n2);
  var t3 = n2.__c;
  t3 && t3.__H && (t3.__H.__h.length && (f2.push(t3) !== 1 && i2 === e2.requestAnimationFrame || ((i2 = e2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
    n3.i && (n3.__H = n3.i), n3.__V !== c2 && (n3.__ = n3.__V), n3.i = undefined, n3.__V = c2;
  })), u2 = r2 = null;
}, e2.__c = function(n2, t3) {
  t3.some(function(n3) {
    try {
      n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B2(n4);
      });
    } catch (r3) {
      t3.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t3 = [], e2.__e(r3, n3.__v);
    }
  }), m2 && m2(n2, t3);
}, e2.unmount = function(n2) {
  s2 && s2(n2);
  var t3, r3 = n2.__c;
  r3 && r3.__H && (r3.__H.__.forEach(function(n3) {
    try {
      z2(n3);
    } catch (n4) {
      t3 = n4;
    }
  }), r3.__H = undefined, t3 && e2.__e(t3, r3.__v));
};
var k2 = typeof requestAnimationFrame == "function";
// node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var u3 = function(e3, t3, n2, o3, i3, u4) {
  var a3, c3, p3 = {};
  for (c3 in t3)
    c3 == "ref" ? a3 = t3[c3] : p3[c3] = t3[c3];
  var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __d: undefined, __c: null, constructor: undefined, __v: --f3, __i: -1, __u: 0, __source: i3, __self: u4 };
  if (typeof e3 == "function" && (a3 = e3.defaultProps))
    for (c3 in a3)
      p3[c3] === undefined && (p3[c3] = a3[c3]);
  return l.vnode && l.vnode(l3), l3;
};
var f3 = 0;
var i3 = Array.isArray;

// src/client/Counter.tsx
var CounterComponent = (props) => {
  const [count, setCount] = p2(0);
  console.log("my props", props);
  return u3("div", {
    children: [
      u3("h1", {
        children: props.name
      }, undefined, false, undefined, this),
      u3("p", {
        children: [
          "Count: ",
          count
        ]
      }, undefined, true, undefined, this),
      u3("button", {
        onClick: () => setCount(count + 1),
        children: "Increment"
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
};
var Counter = applyHydration("Counter", CounterComponent);

// src/client/app.tsx
hydrateComponent("Counter", Counter);
document.addEventListener("htmx:afterSwap", () => {
  initFlowbite();
});
