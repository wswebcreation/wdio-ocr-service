(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{77:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return b})),n.d(t,"default",(function(){return p}));var a=n(3),r=n(7),l=(n(0),n(87)),o={title:"ocrSetValue"},i={unversionedId:"ocr-set-value",id:"ocr-set-value",isDocsHomePage:!1,title:"ocrSetValue",description:"Send a sequence of key strokes to an element. It will:",source:"@site/docs/ocr-set-value.md",slug:"/ocr-set-value",permalink:"/wdio-ocr-service/ocr-set-value",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/ocr-set-value.md",version:"current",sidebar:"docs",previous:{title:"ocrGetText",permalink:"/wdio-ocr-service/ocr-get-text"},next:{title:"ocrWaitForTextDisplayed",permalink:"/wdio-ocr-service/ocr-wait-for-text-displayed"}},b=[{value:"Usage",id:"usage",children:[]},{value:"Logs",id:"logs",children:[]},{value:"Options",id:"options",children:[]},{value:"Example",id:"example",children:[]}],c={toc:b};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(l.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("p",null,"Send a sequence of key strokes to an element. It will:"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},"automatically detect the element"),Object(l.b)("li",{parentName:"ul"},"put focus on the field by clicking on it"),Object(l.b)("li",{parentName:"ul"},"set the value in the field")),Object(l.b)("p",null,"The command will search for the provided text and tries to find a match\nbased on Fuzzy Logic from ",Object(l.b)("a",{parentName:"p",href:"https://fusejs.io/"},"Fuse.js"),". This means that if you might provide a selector with a typo, or\nthe found text might not be a 100% match it will still try to give you back an element. See the ",Object(l.b)("a",{parentName:"p",href:"#logs"},"logs")," below."),Object(l.b)("h3",{id:"usage"},"Usage"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-js"},"driver.ocrSetValue('Username', 'standard_user')\n")),Object(l.b)("h3",{id:"logs"},"Logs"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-log"},'# Still finding a match even though we searched for "Usernames" and the found text was "Username"\n[0-0] 2021-04-07T09:51:07.806Z INFO webdriver: COMMAND ocrSetValue("Usernames", "standard_user")\n[0-0] 2021-04-07T09:51:07.807Z INFO webdriver: RESULT true\n[0-0] 2021-04-07T09:51:07.811Z INFO wdio-ocr-service: We searched for the word "Usernames" and found one match "Username" with score "88.89%"\n')),Object(l.b)("h3",{id:"options"},"Options"),Object(l.b)("table",null,Object(l.b)("thead",{parentName:"table"},Object(l.b)("tr",{parentName:"thead"},Object(l.b)("th",{parentName:"tr",align:null},"Name"),Object(l.b)("th",{parentName:"tr",align:null},"Type"),Object(l.b)("th",{parentName:"tr",align:null},"Default"),Object(l.b)("th",{parentName:"tr",align:null},"Details"))),Object(l.b)("tbody",{parentName:"table"},Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"selector"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"string")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"The visual name of the field")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"value"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"string")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"Value to be added")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options (optional)"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"SetValueOptions")),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"{}")),Object(l.b)("td",{parentName:"tr",align:null},"command options")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.clickDuration (optional)"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"number")),Object(l.b)("td",{parentName:"tr",align:null},"500"),Object(l.b)("td",{parentName:"tr",align:null},"Duration of the click in milliseconds")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.androidRectangles (optional)"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"Rectangles")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"Rectangles for Android to crop the search area for OCR")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.androidRectangles.top"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"number")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"Start position from the top of the screen to start cropping the search area for OCR")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.androidRectangles.left"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"number")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"Start position from the left of the screen to start cropping the search area for OCR")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.androidRectangles.right"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"number")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"Start position from the right of the screen to start cropping the search area for OCR")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.androidRectangles.bottom"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"number")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"Start position from the bottom of the screen to start cropping the search area for OCR")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.iOSRectangles (optional)"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"Rectangles")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"Rectangles for Android to crop the search area for OCR")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.iOSRectangles.top"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"number")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"Start position from the top of the screen to start cropping the search area for OCR")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.iOSRectangles.left"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"number")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"Start position from the left of the screen to start cropping the search area for OCR")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.iOSRectangles.right"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"number")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"Start position from the right of the screen to start cropping the search area for OCR")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.iOSRectangles.bottom"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"number")),Object(l.b)("td",{parentName:"tr",align:null}),Object(l.b)("td",{parentName:"tr",align:null},"Start position from the bottom of the screen to start cropping the search area for OCR")),Object(l.b)("tr",{parentName:"tbody"},Object(l.b)("td",{parentName:"tr",align:null},"options.reuseOcr (optional)"),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"boolean")),Object(l.b)("td",{parentName:"tr",align:null},Object(l.b)("inlineCode",{parentName:"td"},"false")),Object(l.b)("td",{parentName:"tr",align:null},"Re-use a previous OCR scan if it is available")))),Object(l.b)("h3",{id:"example"},"Example"),Object(l.b)("pre",null,Object(l.b)("code",{parentName:"pre",className:"language-js"},"it('should set the value of a visible element by using the visible text', () => {\n  // Set the value\n  driver.ocrSetValue('Username', 'standard_user')\n\n  // OR with options\n  driver.ocrSetValue(\n    'Username',\n    'standard_user',\n    {\n      // Same as for iOSRectangles\n      androidRectangles: {\n        top: 200,\n        left: 0,\n        right: 800,\n        bottom: 400,\n      },\n      reuseOcr: true,\n    },\n  )\n})\n")))}p.isMDXComponent=!0},87:function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),p=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=p(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,o=e.parentName,c=b(e,["components","mdxType","originalType","parentName"]),d=p(n),u=a,m=d["".concat(o,".").concat(u)]||d[u]||s[u]||l;return n?r.a.createElement(m,i(i({ref:t},c),{},{components:n})):r.a.createElement(m,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=u;var i={};for(var b in t)hasOwnProperty.call(t,b)&&(i[b]=t[b]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var c=2;c<l;c++)o[c]=n[c];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);