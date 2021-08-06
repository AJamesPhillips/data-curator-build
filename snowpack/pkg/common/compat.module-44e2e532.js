import { l, p, y, h, s, _, d, A as A$1, F as F$1, T as T$1, q as q$2 } from './hooks.module-b65ed191.js';
import { v, B as B$1, y as y$1, p as p$1, d as d$1, n, b, O as O$1, S as S$1, q as q$1, L as L$1 } from './preact.module-5693ab29.js';

function S(n,t){for(var e in t)n[e]=t[e];return n}function g(n,t){for(var e in n)if("__source"!==e&&!(e in t))return !0;for(var r in t)if("__source"!==r&&n[r]!==t[r])return !0;return !1}function w(n){this.props=n;}function C(n,t){function e(n){var e=this.props.ref,r=e==n.ref;return !r&&e&&(e.call?e(null):e.current=null),t?!t(this.props,n)||!r:g(this.props,n)}function r(t){return this.shouldComponentUpdate=e,v(n,t)}return r.displayName="Memo("+(n.displayName||n.name)+")",r.prototype.isReactComponent=!0,r.__f=!0,r}(w.prototype=new d$1).isPureReactComponent=!0,w.prototype.shouldComponentUpdate=function(n,t){return g(this.props,n)||g(this.state,t)};var R=n.__b;n.__b=function(n){n.type&&n.type.__f&&n.ref&&(n.props.ref=n.ref,n.ref=null),R&&R(n);};var x="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.forward_ref")||3911;function k(n){function t(t,e){var r=S({},t);return delete r.ref,n(r,(e=t.ref||e)&&("object"!=typeof e||"current"in e)?e:null)}return t.$$typeof=x,t.render=t,t.prototype.isReactComponent=t.__f=!0,t.displayName="ForwardRef("+(n.displayName||n.name)+")",t}var A=function(n,t){return null==n?null:b(b(n).map(t))},N={map:A,forEach:A,count:function(n){return n?b(n).length:0},only:function(n){var t=b(n);if(1!==t.length)throw "Children.only";return t[0]},toArray:b},O=n.__e;function L(n){return n&&(n.__c&&n.__c.__H&&(n.__c.__H.__.forEach(function(n){"function"==typeof n.__c&&n.__c();}),n.__c.__H=null),(n=S({},n)).__c=null,n.__k=n.__k&&n.__k.map(L)),n}function U(n){return n&&(n.__v=null,n.__k=n.__k&&n.__k.map(U)),n}function F(){this.__u=0,this.t=null,this.__b=null;}function M(n){var t=n.__.__c;return t&&t.__e&&t.__e(n)}function D(n){var t,e,r;function u(u){if(t||(t=n()).then(function(n){e=n.default||n;},function(n){r=n;}),r)throw r;if(!e)throw t;return v(e,u)}return u.displayName="Lazy",u.__f=!0,u}function I(){this.u=null,this.o=null;}n.__e=function(n,t,e){if(n.then)for(var r,u=t;u=u.__;)if((r=u.__c)&&r.__c)return null==t.__e&&(t.__e=e.__e,t.__k=e.__k),r.__c(n,t);O(n,t,e);},(F.prototype=new d$1).__c=function(n,t){var e=t.__c,r=this;null==r.t&&(r.t=[]),r.t.push(e);var u=M(r.__v),o=!1,i=function(){o||(o=!0,e.componentWillUnmount=e.__c,u?u(c):c());};e.__c=e.componentWillUnmount,e.componentWillUnmount=function(){i(),e.__c&&e.__c();};var c=function(){var n;if(!--r.__u)for(r.__v.__k[0]=U(r.state.__e),r.setState({__e:r.__b=null});n=r.t.pop();)n.forceUpdate();};!0===t.__h||r.__u++||r.setState({__e:r.__b=r.__v.__k[0]}),n.then(i,i);},F.prototype.componentWillUnmount=function(){this.t=[];},F.prototype.render=function(n,t){this.__b&&(this.__v.__k&&(this.__v.__k[0]=L(this.__b)),this.__b=null);var e=t.__e&&v(p$1,null,n.fallback);return e&&(e.__h=null),[v(p$1,null,t.__e?null:n.children),e]};var T=function(n,t,e){if(++e[1]===e[0]&&n.o.delete(t),n.props.revealOrder&&("t"!==n.props.revealOrder[0]||!n.o.size))for(e=n.u;e;){for(;e.length>3;)e.pop()();if(e[1]<e[0])break;n.u=e=e[2];}};function W(n){return this.getChildContext=function(){return n.context},n.children}function j(n){var t=this,e=n.i,r=v(W,{context:t.context},n.__v);t.componentWillUnmount=function(){var n=t.l.parentNode;n&&n.removeChild(t.l),L$1(t.s);},t.i&&t.i!==e&&(t.componentWillUnmount(),t.h=!1),n.__v?t.h?(e.__k=t.__k,O$1(r,e),t.__k=e.__k):(t.l=document.createTextNode(""),t.__k=e.__k,S$1("",e),e.appendChild(t.l),t.h=!0,t.i=e,O$1(r,e,t.l),e.__k=t.__k,t.__k=t.l.__k):t.h&&t.componentWillUnmount(),t.s=r;}function P(n,t){return v(j,{__v:n,i:t})}(I.prototype=new d$1).__e=function(n){var t=this,e=M(t.__v),r=t.o.get(n);return r[0]++,function(u){var o=function(){t.props.revealOrder?(r.push(u),T(t,n,r)):u();};e?e(o):o();}},I.prototype.render=function(n){this.u=null,this.o=new Map;var t=b(n.children);n.revealOrder&&"b"===n.revealOrder[0]&&t.reverse();for(var e=t.length;e--;)this.o.set(t[e],this.u=[1,0,this.u]);return n.children},I.prototype.componentDidUpdate=I.prototype.componentDidMount=function(){var n=this;this.o.forEach(function(t,e){T(n,e,t);});};var z="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,V=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/,B="undefined"!=typeof Symbol?/fil|che|rad/i:/fil|che|ra/i;function H(n,t,e){return null==t.__k&&(t.textContent=""),O$1(n,t),"function"==typeof e&&e(),n?n.__c:null}function Z(n,t,e){return S$1(n,t),"function"==typeof e&&e(),n?n.__c:null}d$1.prototype.isReactComponent={},["componentWillMount","componentWillReceiveProps","componentWillUpdate"].forEach(function(n){Object.defineProperty(d$1.prototype,n,{configurable:!0,get:function(){return this["UNSAFE_"+n]},set:function(t){Object.defineProperty(this,n,{configurable:!0,writable:!0,value:t});}});});var Y=n.event;function $(){}function q(){return this.cancelBubble}function G(){return this.defaultPrevented}n.event=function(n){return Y&&(n=Y(n)),n.persist=$,n.isPropagationStopped=q,n.isDefaultPrevented=G,n.nativeEvent=n};var J,K={configurable:!0,get:function(){return this.class}},Q=n.vnode;n.vnode=function(n){var t=n.type,e=n.props,r=e;if("string"==typeof t){for(var u in r={},e){var o=e[u];"defaultValue"===u&&"value"in e&&null==e.value?u="value":"download"===u&&!0===o?o="":/ondoubleclick/i.test(u)?u="ondblclick":/^onchange(textarea|input)/i.test(u+t)&&!B.test(e.type)?u="oninput":/^on(Ani|Tra|Tou|BeforeInp)/.test(u)?u=u.toLowerCase():V.test(u)?u=u.replace(/[A-Z0-9]/,"-$&").toLowerCase():null===o&&(o=void 0),r[u]=o;}"select"==t&&r.multiple&&Array.isArray(r.value)&&(r.value=b(e.children).forEach(function(n){n.props.selected=-1!=r.value.indexOf(n.props.value);})),n.props=r;}t&&e.class!=e.className&&(K.enumerable="className"in e,null!=e.className&&(r.class=e.className),Object.defineProperty(r,"className",K)),n.$$typeof=z,Q&&Q(n);};var X=n.__r;n.__r=function(n){X&&X(n),J=n.__c;};var nn={ReactCurrentDispatcher:{current:{readContext:function(n){return J.__n[n.__c].props.value}}}},tn="16.8.0";function en(n){return v.bind(null,n)}function rn(n){return !!n&&n.$$typeof===z}function un(n){return rn(n)?q$1.apply(null,arguments):n}function on(n){return !!n.__k&&(O$1(null,n),!0)}function cn(n){return n&&(n.base||1===n.nodeType&&n)||null}var ln=function(n,t){return n(t)},fn=p$1;var React = {useState:l,useReducer:p,useEffect:y,useLayoutEffect:h,useRef:s,useImperativeHandle:_,useMemo:d,useCallback:A$1,useContext:F$1,useDebugValue:T$1,version:"16.8.0",Children:N,render:H,hydrate:Z,unmountComponentAtNode:on,createPortal:P,createElement:v,createContext:B$1,createFactory:en,cloneElement:un,createRef:y$1,Fragment:p$1,isValidElement:rn,findDOMNode:cn,Component:d$1,PureComponent:w,memo:C,forwardRef:k,unstable_batchedUpdates:ln,StrictMode:p$1,Suspense:F,SuspenseList:I,lazy:D,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:nn};

var compat_module = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': React,
	version: tn,
	Children: N,
	render: H,
	hydrate: Z,
	unmountComponentAtNode: on,
	createPortal: P,
	createFactory: en,
	cloneElement: un,
	isValidElement: rn,
	findDOMNode: cn,
	PureComponent: w,
	memo: C,
	forwardRef: k,
	unstable_batchedUpdates: ln,
	StrictMode: fn,
	Suspense: F,
	SuspenseList: I,
	lazy: D,
	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: nn,
	createElement: v,
	createContext: B$1,
	createRef: y$1,
	Fragment: p$1,
	Component: d$1,
	useState: l,
	useReducer: p,
	useEffect: y,
	useLayoutEffect: h,
	useRef: s,
	useImperativeHandle: _,
	useMemo: d,
	useCallback: A$1,
	useContext: F$1,
	useDebugValue: T$1,
	useErrorBoundary: q$2
});

export { C, N, P, React as R, compat_module as a, cn as c, k, ln as l, rn as r, un as u };
