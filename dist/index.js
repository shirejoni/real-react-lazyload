module.exports=function(r){var e={};function t(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return r[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=r,t.c=e,t.d=function(r,e,n){t.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,e){if(1&e&&(r=t(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var o in r)t.d(n,o,function(e){return r[e]}.bind(null,o));return n},t.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(e,"a",e),e},t.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},t.p="",t(t.s=1)}([function(r,e){r.exports=require("react")},function(r,e,t){"use strict";t.r(e),t.d(e,"RealLazyLoad",function(){return j}),t.d(e,"ImageRealLazyLoad",function(){return w}),t.d(e,"forceVisible",function(){return u}),t.d(e,"withLazyLoadRef",function(){return x});var n=t(0),o=t.n(n);function a(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(r)))return;var t=[],n=!0,o=!1,a=void 0;try{for(var i,u=r[Symbol.iterator]();!(n=(i=u.next()).done)&&(t.push(i.value),!e||t.length!==e);n=!0);}catch(r){o=!0,a=r}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return t}(r,e)||function(r,e){if(!r)return;if("string"==typeof r)return i(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);"Object"===t&&r.constructor&&(t=r.constructor.name);if("Map"===t||"Set"===t)return Array.from(r);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return i(r,e)}(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}var u=function(){for(var r,e=f.values();r=e.next().value;)for(var t=r.values(),n=void 0;n=t.next().value;)n.forceVisible()},c=/^-?\d*\.?\d+(px|%)$/,l=function r(e,t){return Array.isArray(e)&&Array.isArray(t)&&e.length===t.length?e.some(function(n,o){return r(e[o],t[o])}):e!==t},f=new Map,s=function(r,e){for(var t=0;t<r.length;t++){var n=d(e,r[t]);n&&n.callback(r[t])}},d=function(r,e){var t=f.get(r);if(t)for(var n,o=t.values();n=o.next().value;)if(n.target.current==e.target)return n},v=function(r,e){var t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(f.has(r.observer)){var n=f.get(r.observer);n.delete(r)&&(n.size>0?r.observer.unobserve(e):!0===t&&(r.observer.disconnect(),f.delete(r.observer)))}},y=function(){for(var r,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.root||null,n=function(r){var e=a((r?r.trim():"0px").split(/\s+/).map(function(r){if(!c.test(r))throw new Error("rootMargin must be a string literal containing pixels and/or percent values");return r}),4),t=e[0],n=void 0===t?"0px":t,o=e[1],i=void 0===o?n:o,u=e[2],l=void 0===u?n:u,f=e[3],s=void 0===f?i:f;return"".concat(n," ").concat(i," ").concat(l," ").concat(s)}(e.rootMargin),o=Array.isArray(e.threshold)?e.threshold:[null!=e.threshold?e.threshold:0],i=f.keys();r=i.next().value;){if(!(t!==r.root||n!==r.rootMargin||l(o,r.thresholds)))return r}return null};function b(r){r.targets.filter(function(e){return v(r,e.current),!1})}var p="IntersectionObserver"in window,g=!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);function h(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(r)))return;var t=[],n=!0,o=!1,a=void 0;try{for(var i,u=r[Symbol.iterator]();!(n=(i=u.next()).done)&&(t.push(i.value),!e||t.length!==e);n=!0);}catch(r){o=!0,a=r}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return t}(r,e)||function(r,e){if(!r)return;if("string"==typeof r)return m(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);"Object"===t&&r.constructor&&(t=r.constructor.name);if("Map"===t||"Set"===t)return Array.from(r);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return m(r,e)}(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}var j=function(r){var e=r.children,t=r.height,a=r.placeholder,i=r.visibleByDefault,u=void 0!==i&&i,c=r.root,l=r.rootMargin,d=r.forceVisible,m=void 0!==d&&d,j=r.componentEntryCallback,O=r.once,S=void 0===O||O,w=h(Object(n.useState)(!0===u||1==m),2),A=w[0],x=w[1],E=h(Object(n.useState)(m||!1),2),M=E[0],I=E[1],L=function(){!1===A&&x(!0),!0===A&&!1!==S&&b(C.current)},R=Object(n.useRef)(),C=Object(n.useRef)({observer:void 0,target:void 0,targets:[],callback:function(r){(r.isIntersecting||r.intersectionRatio>0)&&(void 0!=j?"function"==typeof j&&j()&&L():L())},forceVisible:function(){!1===A&&x(!0),I(!0),b(C.current)}});!0===m&&!1===M&&b(C.current),Object(n.useEffect)(function(){if(!0===m||!0===A&&!0===S)return function(){};if(0==p||g)return x(!0),I(!0),function(){};var r={};return c&&(r.root=c),l&&(r.rootMargin=l),C.current.observer=function(r){return y(r)||new IntersectionObserver(s,r)}(r),function(){C&&C.current&&b(C.current)}},[]),Object(n.useEffect)(function(){var r;return!1!==M||!0===m||0!=A&&!1!==S||(C.current.target=R,C.current.targets.push(R),p&&!g&&(r=C.current,f.has(r.observer)||f.set(r.observer,new Set),f.get(r.observer).add(r),r.observer.observe(r.target.current))),function(){C&&C.current&&C.current.target&&v(C.current,C.current.target.current,!1)}},[C.current.target]);var z={width:"100%"};return t&&(z.height=t+"px"),A||!0===m?o.a.cloneElement(o.a.Children.only(e),{ref:R}):a?o.a.cloneElement(o.a.Children.only(a),{ref:R}):o.a.createElement("div",{className:"RealLazyLoad-placeholder",style:z,ref:R})};function O(r,e){return function(r){if(Array.isArray(r))return r}(r)||function(r,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(r)))return;var t=[],n=!0,o=!1,a=void 0;try{for(var i,u=r[Symbol.iterator]();!(n=(i=u.next()).done)&&(t.push(i.value),!e||t.length!==e);n=!0);}catch(r){o=!0,a=r}finally{try{n||null==u.return||u.return()}finally{if(o)throw a}}return t}(r,e)||function(r,e){if(!r)return;if("string"==typeof r)return S(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);"Object"===t&&r.constructor&&(t=r.constructor.name);if("Map"===t||"Set"===t)return Array.from(r);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return S(r,e)}(r,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(r,e){(null==e||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}j.displayName="RealLazyLoad Component";var w=function(r){var e=r.src,t=r.alt,a=r.className,i=r.placeholder,u=r.height,c=r.visibleByDefault,l=r.root,f=r.rootMargin,s=r.forceVisible,d=r.componentEntryCallback,v=O(Object(n.useState)(c||s||!1),2),y=v[0],b=v[1],p=O(Object(n.useState)(y),2),g=p[0],h=p[1];return Object(n.useEffect)(function(){if(g){var r=document.createElement("img");r.src=e,r.addEventListener("load",function(){r.remove(),b(!0)})}},[g]),o.a.createElement(j,{placeholder:i,forceVisible:y,height:u,root:l,rootMargin:f,componentEntryCallback:function(){return!1===g&&(d&&d()||void 0==d)&&h(!0),!1}},o.a.createElement("img",{src:e,alt:t,className:a}))};function A(){return(A=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r}).apply(this,arguments)}function x(r){return o.a.forwardRef(function(e,t){return o.a.createElement(r,A({},e,{lazyLoadRef:t}))})}}]);