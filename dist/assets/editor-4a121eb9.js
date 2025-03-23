import{r as e,W as t}from"./vendor-94361d79.js";function r(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?n(Object(o),!0).forEach((function(t){r(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function c(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){c(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e){return function t(){for(var r=this,n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return o.length>=e.length?e.apply(this,o):function(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i];return t.apply(r,[].concat(o,n))}}}function f(e){return{}.toString.call(e).includes("Object")}function d(e){return"function"==typeof e}var g=s((function(e,t){throw new Error(e[t]||e.default)}))({initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"}),p={changes:function(e,t){return f(t)||g("changeType"),Object.keys(t).some((function(t){return r=e,n=t,!Object.prototype.hasOwnProperty.call(r,n);var r,n}))&&g("changeField"),t},selector:function(e){d(e)||g("selectorType")},handler:function(e){d(e)||f(e)||g("handlerType"),f(e)&&Object.values(e).some((function(e){return!d(e)}))&&g("handlersType")},initial:function(e){var t;e||g("initialIsRequired"),f(e)||g("initialType"),t=e,Object.keys(t).length||g("initialContent")}};function h(e,t){return d(t)?t(e.current):t}function v(e,t){return e.current=l(l({},e.current),t),t}function y(e,t,r){return d(t)?t(e.current):Object.keys(r).forEach((function(r){var n;return null===(n=t[r])||void 0===n?void 0:n.call(t,e.current[r])})),r}var m={create:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};p.initial(e),p.handler(t);var r={current:e},n=s(y)(r,t),o=s(v)(r),i=s(p.changes)(e),u=s(h)(r);return[function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e){return e};return p.selector(e),e(r.current)},function(e){!function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return t.reduceRight((function(e,t){return t(e)}),e)}}(n,o,i,u)(e)}]}};var b,w={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:"Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "},O=(b=function(e,t){throw new Error(e[t]||e.default)},function e(){for(var t=this,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return n.length>=b.length?b.apply(this,n):function(){for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return e.apply(t,[].concat(n,o))}})(w),j={config:function(e){var t;return e||O("configIsRequired"),t=e,{}.toString.call(t).includes("Object")||O("configType"),e.urls?(console.warn(w.deprecation),{paths:{vs:e.urls.monacoBase}}):e}};function M(e,t){return Object.keys(t).forEach((function(r){t[r]instanceof Object&&e[r]&&Object.assign(t[r],M(e[r],t[r]))})),o(o({},e),t)}var E={type:"cancelation",msg:"operation is manually canceled"};function P(e){var t=!1,r=new Promise((function(r,n){e.then((function(e){return t?n(E):r(e)})),e.catch(n)}));return r.cancel=function(){return t=!0},r}var R,S,k=m.create({config:{paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs"}},isInitialized:!1,resolve:null,reject:null,monaco:null}),x=(S=2,function(e){if(Array.isArray(e))return e}(R=k)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var r=[],n=!0,o=!1,i=void 0;try{for(var u,c=e[Symbol.iterator]();!(n=(u=c.next()).done)&&(r.push(u.value),!t||r.length!==t);n=!0);}catch(a){o=!0,i=a}finally{try{n||null==c.return||c.return()}finally{if(o)throw i}}return r}}(R,S)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,t):void 0}}(R,S)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),T=x[0],I=x[1];function C(e){return document.body.appendChild(e)}function A(e){var t,r,n=T((function(e){return{config:e.config,reject:e.reject}})),o=(t="".concat(n.config.paths.vs,"/loader.js"),r=document.createElement("script"),t&&(r.src=t),r);return o.onload=function(){return e()},o.onerror=n.reject,o}function V(){var e=T((function(e){return{config:e.config,resolve:e.resolve,reject:e.reject}})),t=window.require;t.config(e.config),t(["vs/editor/editor.main"],(function(t){D(t),e.resolve(t)}),(function(t){e.reject(t)}))}function D(e){T().monaco||I({monaco:e})}var L=new Promise((function(e,t){return I({resolve:e,reject:t})})),q={config:function(e){var t=j.config(e),r=t.monaco,n=i(t,["monaco"]);I((function(e){return{config:M(e.config,n),monaco:r}}))},init:function(){var e=T((function(e){return{monaco:e.monaco,isInitialized:e.isInitialized,resolve:e.resolve}}));if(!e.isInitialized){if(I({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),P(L);if(window.monaco&&window.monaco.editor)return D(window.monaco),e.resolve(window.monaco),P(L);!function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return t.reduceRight((function(e,t){return t(e)}),e)}}(C,A)(V)}return P(L)},__getMonacoInstance:function(){return T((function(e){return e.monaco}))}},z={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}},F={container:{display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}};var N=function({children:e}){return t.createElement("div",{style:F.container},e)};var _=function({width:e,height:r,isEditorReady:n,loading:o,_ref:i,className:u,wrapperProps:c}){return t.createElement("section",{style:{...z.wrapper,width:e,height:r},...c},!n&&t.createElement(N,null,o),t.createElement("div",{ref:i,style:{...z.fullWidth,...!n&&z.hide},className:u}))},U=e.memo(_);var W=function(t){e.useEffect(t,[])};var B=function(t,r,n=!0){let o=e.useRef(!0);e.useEffect(o.current||!n?()=>{o.current=!1}:t,r)};function Y(){}function $(e,t,r,n){return function(e,t){return e.editor.getModel(G(e,t))}(e,n)||function(e,t,r,n){return e.editor.createModel(t,r,n?G(e,n):void 0)}(e,t,r,n)}function G(e,t){return e.Uri.parse(t)}var H=function({original:r,modified:n,language:o,originalLanguage:i,modifiedLanguage:u,originalModelPath:c,modifiedModelPath:a,keepCurrentOriginalModel:l=!1,keepCurrentModifiedModel:s=!1,theme:f="light",loading:d="Loading...",options:g={},height:p="100%",width:h="100%",className:v,wrapperProps:y={},beforeMount:m=Y,onMount:b=Y}){let[w,O]=e.useState(!1),[j,M]=e.useState(!0),E=e.useRef(null),P=e.useRef(null),R=e.useRef(null),S=e.useRef(b),k=e.useRef(m),x=e.useRef(!1);W((()=>{let e=q.init();return e.then((e=>(P.current=e)&&M(!1))).catch((e=>"cancelation"!==(null==e?void 0:e.type)&&console.error("Monaco initialization: error:",e))),()=>E.current?function(){var e,t,r,n;let o=null==(e=E.current)?void 0:e.getModel();l||null==(t=null==o?void 0:o.original)||t.dispose(),s||null==(r=null==o?void 0:o.modified)||r.dispose(),null==(n=E.current)||n.dispose()}():e.cancel()})),B((()=>{if(E.current&&P.current){let e=E.current.getOriginalEditor(),t=$(P.current,r||"",i||o||"text",c||"");t!==e.getModel()&&e.setModel(t)}}),[c],w),B((()=>{if(E.current&&P.current){let e=E.current.getModifiedEditor(),t=$(P.current,n||"",u||o||"text",a||"");t!==e.getModel()&&e.setModel(t)}}),[a],w),B((()=>{let e=E.current.getModifiedEditor();e.getOption(P.current.editor.EditorOption.readOnly)?e.setValue(n||""):n!==e.getValue()&&(e.executeEdits("",[{range:e.getModel().getFullModelRange(),text:n||"",forceMoveMarkers:!0}]),e.pushUndoStop())}),[n],w),B((()=>{var e,t;null==(t=null==(e=E.current)?void 0:e.getModel())||t.original.setValue(r||"")}),[r],w),B((()=>{let{original:e,modified:t}=E.current.getModel();P.current.editor.setModelLanguage(e,i||o||"text"),P.current.editor.setModelLanguage(t,u||o||"text")}),[o,i,u],w),B((()=>{var e;null==(e=P.current)||e.editor.setTheme(f)}),[f],w),B((()=>{var e;null==(e=E.current)||e.updateOptions(g)}),[g],w);let T=e.useCallback((()=>{var e;if(!P.current)return;k.current(P.current);let t=$(P.current,r||"",i||o||"text",c||""),l=$(P.current,n||"",u||o||"text",a||"");null==(e=E.current)||e.setModel({original:t,modified:l})}),[o,n,u,r,i,c,a]),I=e.useCallback((()=>{var e;!x.current&&R.current&&(E.current=P.current.editor.createDiffEditor(R.current,{automaticLayout:!0,...g}),T(),null==(e=P.current)||e.editor.setTheme(f),O(!0),x.current=!0)}),[g,f,T]);return e.useEffect((()=>{w&&S.current(E.current,P.current)}),[w]),e.useEffect((()=>{!j&&!w&&I()}),[j,w,I]),t.createElement(U,{width:h,height:p,isEditorReady:w,loading:d,_ref:R,className:v,wrapperProps:y})};e.memo(H);var J=function(t){let r=e.useRef();return e.useEffect((()=>{r.current=t}),[t]),r.current},K=new Map;var Q=function({defaultValue:r,defaultLanguage:n,defaultPath:o,value:i,language:u,path:c,theme:a="light",line:l,loading:s="Loading...",options:f={},overrideServices:d={},saveViewState:g=!0,keepCurrentModel:p=!1,width:h="100%",height:v="100%",className:y,wrapperProps:m={},beforeMount:b=Y,onMount:w=Y,onChange:O,onValidate:j=Y}){let[M,E]=e.useState(!1),[P,R]=e.useState(!0),S=e.useRef(null),k=e.useRef(null),x=e.useRef(null),T=e.useRef(w),I=e.useRef(b),C=e.useRef(),A=e.useRef(i),V=J(c),D=e.useRef(!1),L=e.useRef(!1);W((()=>{let e=q.init();return e.then((e=>(S.current=e)&&R(!1))).catch((e=>"cancelation"!==(null==e?void 0:e.type)&&console.error("Monaco initialization: error:",e))),()=>{return k.current?(null==(t=C.current)||t.dispose(),p?g&&K.set(c,k.current.saveViewState()):null==(r=k.current.getModel())||r.dispose(),void k.current.dispose()):e.cancel();var t,r}})),B((()=>{var e,t,a,l;let s=$(S.current,r||i||"",n||u||"",c||o||"");s!==(null==(e=k.current)?void 0:e.getModel())&&(g&&K.set(V,null==(t=k.current)?void 0:t.saveViewState()),null==(a=k.current)||a.setModel(s),g&&(null==(l=k.current)||l.restoreViewState(K.get(c))))}),[c],M),B((()=>{var e;null==(e=k.current)||e.updateOptions(f)}),[f],M),B((()=>{!k.current||void 0===i||(k.current.getOption(S.current.editor.EditorOption.readOnly)?k.current.setValue(i):i!==k.current.getValue()&&(L.current=!0,k.current.executeEdits("",[{range:k.current.getModel().getFullModelRange(),text:i,forceMoveMarkers:!0}]),k.current.pushUndoStop(),L.current=!1))}),[i],M),B((()=>{var e,t;let r=null==(e=k.current)?void 0:e.getModel();r&&u&&(null==(t=S.current)||t.editor.setModelLanguage(r,u))}),[u],M),B((()=>{var e;void 0!==l&&(null==(e=k.current)||e.revealLine(l))}),[l],M),B((()=>{var e;null==(e=S.current)||e.editor.setTheme(a)}),[a],M);let z=e.useCallback((()=>{var e;if(x.current&&S.current&&!D.current){I.current(S.current);let t=c||o,s=$(S.current,i||r||"",n||u||"",t||"");k.current=null==(e=S.current)?void 0:e.editor.create(x.current,{model:s,automaticLayout:!0,...f},d),g&&k.current.restoreViewState(K.get(t)),S.current.editor.setTheme(a),void 0!==l&&k.current.revealLine(l),E(!0),D.current=!0}}),[r,n,o,i,u,c,f,d,g,a,l]);return e.useEffect((()=>{M&&T.current(k.current,S.current)}),[M]),e.useEffect((()=>{!P&&!M&&z()}),[P,M,z]),A.current=i,e.useEffect((()=>{var e,t;M&&O&&(null==(e=C.current)||e.dispose(),C.current=null==(t=k.current)?void 0:t.onDidChangeModelContent((e=>{L.current||O(k.current.getValue(),e)})))}),[M,O]),e.useEffect((()=>{if(M){let e=S.current.editor.onDidChangeMarkers((e=>{var t;let r=null==(t=k.current.getModel())?void 0:t.uri;if(r&&e.find((e=>e.path===r.path))){let e=S.current.editor.getModelMarkers({resource:r});null==j||j(e)}}));return()=>{null==e||e.dispose()}}return()=>{}}),[M,j]),t.createElement(U,{width:h,height:v,isEditorReady:M,loading:s,_ref:x,className:y,wrapperProps:m})},X=e.memo(Q);export{X as F};
