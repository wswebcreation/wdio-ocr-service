(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{78:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(7),o=(n(0),n(87)),l={title:"ocrGetElementPositionByText"},i={unversionedId:"ocr-get-element-position-by-text",id:"ocr-get-element-position-by-text",isDocsHomePage:!1,title:"ocrGetElementPositionByText",description:"Get the position of a text on the screen.",source:"@site/docs/ocr-get-element-position-by-text.md",slug:"/ocr-get-element-position-by-text",permalink:"/wdio-ocr-service/ocr-get-element-position-by-text",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/ocr-get-element-position-by-text.md",version:"current",sidebar:"docs",previous:{title:"ocrClickOnText",permalink:"/wdio-ocr-service/ocr-click-on-text"},next:{title:"ocrGetText",permalink:"/wdio-ocr-service/ocr-get-text"}},c=[{value:"Usage",id:"usage",children:[]},{value:"Logs",id:"logs",children:[]},{value:"Options",id:"options",children:[]},{value:"Returns",id:"returns",children:[]},{value:"Example",id:"example",children:[]}],b={toc:c};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Get the position of a text on the screen.\nThe command will search for the provided text and tries to find a match\nbased on Fuzzy Logic from ",Object(o.b)("a",{parentName:"p",href:"https://fusejs.io/"},"Fuse.js"),". This means that if you might provide a selector with a typo, or\nthe found text might not be a 100% match it will still try to give you back an element. See the ",Object(o.b)("a",{parentName:"p",href:"#logs"},"logs")," below."),Object(o.b)("h3",{id:"usage"},"Usage"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"driver.ocrGetElementPositionByText('Username')\n")),Object(o.b)("h3",{id:"logs"},"Logs"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-log"},'# Still finding a match even though we searched for "Usernames" and the found text was "Username"\n[0-0] 2021-04-07T09:51:07.806Z INFO webdriver: COMMAND ocrGetElementPositionByText("Usernames")\n[0-0] 2021-04-07T09:51:07.807Z INFO webdriver: RESULT true\n[0-0] 2021-04-07T09:51:07.811Z INFO wdio-ocr-service: We searched for the word "Usernames" and found one match "Username" with score "88.89%"\n')),Object(o.b)("h3",{id:"options"},"Options"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",{parentName:"tr",align:null},"Name"),Object(o.b)("th",{parentName:"tr",align:null},"Type"),Object(o.b)("th",{parentName:"tr",align:null},"Default"),Object(o.b)("th",{parentName:"tr",align:null},"Details"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"selector"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"string")),Object(o.b)("td",{parentName:"tr",align:null}),Object(o.b)("td",{parentName:"tr",align:null},"The visual name of the field")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options (optional)"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"GetTextOptions")),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"{}")),Object(o.b)("td",{parentName:"tr",align:null},"command options")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options.reuseOcr (optional)"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"boolean")),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"false")),Object(o.b)("td",{parentName:"tr",align:null},"Re-use a previous OCR scan if it is available")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options.androidRectangles (optional)"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"Rectangles")),Object(o.b)("td",{parentName:"tr",align:null}),Object(o.b)("td",{parentName:"tr",align:null},"Rectangles for Android to crop the search area for OCR")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options.androidRectangles.top"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"number")),Object(o.b)("td",{parentName:"tr",align:null}),Object(o.b)("td",{parentName:"tr",align:null},"Start position from the top of the screen to start cropping the search area for OCR")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options.androidRectangles.left"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"number")),Object(o.b)("td",{parentName:"tr",align:null}),Object(o.b)("td",{parentName:"tr",align:null},"Start position from the left of the screen to start cropping the search area for OCR")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options.androidRectangles.right"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"number")),Object(o.b)("td",{parentName:"tr",align:null}),Object(o.b)("td",{parentName:"tr",align:null},"Start position from the right of the screen to start cropping the search area for OCR")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options.androidRectangles.bottom"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"number")),Object(o.b)("td",{parentName:"tr",align:null}),Object(o.b)("td",{parentName:"tr",align:null},"Start position from the bottom of the screen to start cropping the search area for OCR")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options.iOSRectangles (optional)"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"Rectangles")),Object(o.b)("td",{parentName:"tr",align:null}),Object(o.b)("td",{parentName:"tr",align:null},"Rectangles for Android to crop the search area for OCR")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options.iOSRectangles.top"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"number")),Object(o.b)("td",{parentName:"tr",align:null}),Object(o.b)("td",{parentName:"tr",align:null},"Start position from the top of the screen to start cropping the search area for OCR")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options.iOSRectangles.left"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"number")),Object(o.b)("td",{parentName:"tr",align:null}),Object(o.b)("td",{parentName:"tr",align:null},"Start position from the left of the screen to start cropping the search area for OCR")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options.iOSRectangles.right"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"number")),Object(o.b)("td",{parentName:"tr",align:null}),Object(o.b)("td",{parentName:"tr",align:null},"Start position from the right of the screen to start cropping the search area for OCR")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",{parentName:"tr",align:null},"options.iOSRectangles.bottom"),Object(o.b)("td",{parentName:"tr",align:null},Object(o.b)("inlineCode",{parentName:"td"},"number")),Object(o.b)("td",{parentName:"tr",align:null}),Object(o.b)("td",{parentName:"tr",align:null},"Start position from the bottom of the screen to start cropping the search area for OCR")))),Object(o.b)("h3",{id:"returns"},"Returns"),Object(o.b)("p",null,"Returns the search value, the matched text, and the position of the element on the screen"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"const result = {\n  searchValue: 'Username',\n  matchedString: 'Username',\n  originalPosition: { left: 83, top: 326, right: 248, bottom: 352 },\n  dprPosition: { left: 41.5, top: 163, right: 124, bottom: 176 },\n  score: 100\n}\n")),Object(o.b)("h3",{id:"example"},"Example"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"it('should be able to the position of the visble text on the screen', () => {\n  driver.ocrGetElementPositionByText('Username')\n\n  // OR with options\n  driver.ocrGetElementPositionByText(\n    'Username',\n    {\n      // Same as for iOSRectangles\n      androidRectangles: {\n        top: 200,\n        left: 0,\n        right: 800,\n        bottom: 400,\n      },\n      reuseOcr:true,\n    },\n  )\n})\n")))}p.isMDXComponent=!0},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return u}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var b=a.a.createContext({}),p=function(e){var t=a.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return a.a.createElement(b.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,b=c(e,["components","mdxType","originalType","parentName"]),s=p(n),m=r,u=s["".concat(l,".").concat(m)]||s[m]||d[m]||o;return n?a.a.createElement(u,i(i({ref:t},b),{},{components:n})):a.a.createElement(u,i({ref:t},b))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,l[1]=i;for(var b=2;b<o;b++)l[b]=n[b];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);