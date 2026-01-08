"use strict";(self.webpackChunk_amsterdam_bmi_dms_upload=self.webpackChunk_amsterdam_bmi_dms_upload||[]).push([[53],{"./node_modules/@amsterdam/asc-ui/es/components/Button/Button.js":function(e,n,r){r.d(n,{A:function(){return g}});var s=r("./node_modules/react/jsx-runtime.js"),t=r("./node_modules/react/index.js"),a=r("./node_modules/@amsterdam/asc-ui/es/components/Icon/IconStyle.js"),i=r("./node_modules/@amsterdam/asc-ui/es/components/Icon/Icon.js"),o=r("./node_modules/polished/dist/polished.esm.js"),l=r("./node_modules/styled-components/dist/styled-components.browser.esm.js"),c=r("./node_modules/@amsterdam/asc-ui/es/utils/themeUtils.js");let d=e=>(0,c.B7)(11)({theme:e}),u=l.default.div`
  position: relative;
  top: 0;
  right: -15px;
  width: 0;
  height: 0;
  border: 22px solid rgba(255, 255, 255, 0);
  border-left: 15px solid ${(0,c.hm)("secondary")};
  border-right: 0;
  ${(0,o.transitions)("border-color","0.1s ease-in-out")}
`,m=(0,l.default)(i.A)`
  margin-right: 10px;
`,v=(0,l.default)(i.A)`
  margin-left: 10px;
`,p=l.default.button`
  height: ${({theme:e})=>d(e)};
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  padding: ${({size:e,theme:n})=>e?"0":(0,c.B7)(3,4)({theme:n})};
  ${({size:e,square:n})=>(e||n)&&(0,l.css)`
      display: flex;
      align-items: center;
      justify-content: center;
      ${(0,o.size)(e||30)}// width and height
    `}
  ${(0,o.transitions)(["color","background-color"],"0.1s ease-in-out")}
  ${({theme:e,variant:n,color:r})=>{switch(n){case"primary":return(0,l.css)`
          min-width: 90px;
          background-color: ${(0,c.hm)("primary")};
          color: ${(0,o.readableColor)((0,c.hm)("primary")({theme:e}))};
          ${(0,c.G2)((0,c.hm)("tint","level1"))};

          &:focus,
          &:hover {
            background-color: ${(0,o.darken)(.1,(0,c.hm)("primary")({theme:e}))};
          }
        `;case"secondary":return(0,l.css)`
          min-width: 90px;
          background-color: ${(0,c.hm)("secondary")};
          color: ${(0,c.hm)("tint","level1")};
          ${(0,c.G2)((0,c.hm)("tint","level1"))};

          &:focus,
          &:hover {
            background-color: ${(0,o.darken)(.1,(0,c.hm)("secondary")({theme:e}))};
          }

          ${n=>n&&(0,l.css)`
              &:not(:disabled)&:focus
                ${u},
                &:not(:disabled)&:hover
                ${u} {
                border-left-color: ${(0,o.darken)(.1,(0,c.hm)("secondary")({theme:e}))};
              }
            `}
        `;case"tertiary":return(0,l.css)`
          min-width: 90px;
          background-color: ${(0,c.hm)("tint","level4")};
          ${(0,c.G2)((0,c.hm)("tint","level7"))};

          &:focus,
          &:hover {
            background-color: ${(0,o.darken)(.1,(0,c.hm)("tint","level4")({theme:e}))};
          }
        `;case"primaryInverted":return(0,l.css)`
          min-width: 90px;
          color: ${(0,c.hm)("primary")};
          border: 1px solid ${(0,c.hm)("primary")};
          background-color: ${(0,c.hm)("tint","level1")};
          ${(0,c.G2)((0,c.hm)("primary","main"))};

          &:hover {
            outline: 1px solid ${(0,c.hm)("primary")};
          }
        `;case"textButton":return(0,l.css)`
          height: auto;
          padding: 0;
          align-self: baseline;
          white-space: normal;
          text-align: left;
          color: ${(0,c.hm)("primary")};
          background-color: rgba(0, 0, 0, 0);
          ${(0,c.G2)((0,c.hm)("primary","main"))};

          /* remove transition because it's async with Icon */
          ${(0,o.transitions)("color","0s")}

          &:hover {
            color: ${(0,c.hm)("secondary")};
            ${(0,c.G2)((0,c.hm)("secondary","main"))};
          }

          ${m} {
            margin-right: ${(0,c.B7)(1)};
          }
          ${v} {
            margin-left: ${(0,c.B7)(1)};
          }
        `;case"blank":return(0,l.css)`
          background-color: ${(0,c.hm)("tint","level1")};
          ${(0,c.G2)((0,c.hm)("tint","level7"))};
          &:hover {
            background-color: ${(0,c.hm)("tint","level3")};
          }
        `;case"application":return(0,l.css)`
          border: 1px solid ${(0,c.hm)("tint","level7")};
          background-color: ${(0,c.hm)("tint","level1")};
          height: 32px;
          padding: ${(0,c.B7)(1,2)};
          ${(0,c.G2)((0,c.hm)("tint","level7"))};
          &:hover {
            background-color: ${(0,c.hm)("tint","level4")};
          }
        `;default:return(0,l.css)`
          color: ${r?(0,o.readableColor)((0,c.hm)(r)({theme:e})):(0,c.hm)("primary")({theme:e})};
          ${r&&(0,l.css)`
            background: ${(0,c.hm)(r)};
          `}

          ${!r&&(0,l.css)`
            border: 1px solid ${(0,c.hm)("primary")};
          `}

        &:hover {
            background: ${r?(0,c.hm)(r,"dark")({theme:e}):(0,c.hm)("tint","level3")({theme:e})};
            ${!r&&(0,l.css)`
              outline: 1px solid ${(0,c.hm)("primary")};
            `}
          }
        `}}}
  ${(0,l.css)`
  &::after {
    content: '';
    display: block;
    min-height: inherit;
    font-size: 0;
  }
`} // ie fix
  ${({taskflow:e})=>e&&(0,l.css)`
      position: relative;
      min-width: initial;
      padding-right: 0;
      padding-top: 0; // safari fix
      padding-bottom: 0; // safari fix
      line-height: ${({theme:e})=>d(e)}; // safari 10.1 fix
      z-index: 0;
      && {
        margin-right: 25px;
      }
      &:focus ${u}:after {
        opacity: 1;
      }
    `}
  ${i.A} {
    flex-shrink: 0;
  }
  &:disabled {
    cursor: default;
    outline: none;
    border: none;
    color: ${(0,c.hm)("tint","level4")};
    background-color: ${(0,c.hm)("tint","level3")};
    ${(0,c.G2)((0,c.hm)("tint","level4"))};
    text-decoration: none;
    ${({taskflow:e})=>e&&(0,l.css)`
        ${u} {
          border-left-color: ${(0,c.hm)("tint","level3")};
        }
      `}
    ${({variant:e})=>e&&"textButton"===e&&(0,l.css)`
        background-color: rgba(0, 0, 0, 0);
      `}
  }
`;var b=function(e,n){var r={};for(var s in e)Object.prototype.hasOwnProperty.call(e,s)&&0>n.indexOf(s)&&(r[s]=e[s]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var t=0,s=Object.getOwnPropertySymbols(e);t<s.length;t++)0>n.indexOf(s[t])&&Object.prototype.propertyIsEnumerable.call(e,s[t])&&(r[s[t]]=e[s[t]]);return r},g=(0,t.forwardRef)((e,n)=>{var{children:r,iconLeft:t,iconRight:o,icon:l,iconSize:c,taskflow:d}=e,g=b(e,["children","iconLeft","iconRight","icon","iconSize","taskflow"]);let h={size:c||a.G.size};return(0,s.jsxs)(p,Object.assign({ref:n},g,{taskflow:d},{children:[t&&(0,s.jsx)(m,Object.assign({},h,{children:t})),l?(0,s.jsx)(i.A,Object.assign({},h,{children:l})):r,o&&(0,s.jsx)(v,Object.assign({},h,{children:o})),d&&(0,s.jsx)(u,{})]}))})},"./node_modules/@amsterdam/asc-ui/es/components/Icon/Icon.js":function(e,n,r){n.A=r("./node_modules/@amsterdam/asc-ui/es/components/Icon/IconStyle.js").A},"./node_modules/@amsterdam/asc-ui/es/components/Icon/IconStyle.js":function(e,n,r){r.d(n,{G:function(){return a}});var s=r("./node_modules/styled-components/dist/styled-components.browser.esm.js"),t=r("./node_modules/@amsterdam/asc-ui/es/utils/themeUtils.js");let a={size:20,padding:0,rotate:0};n.A=s.default.span.withConfig({shouldForwardProp:(e,n)=>!["size","rotate","padding","inline","color"].includes(e)&&n(e)})`
  display: ${({inline:e})=>e?"inline-flex":"flex"};
  ${({iconUrl:e})=>e&&(0,s.css)`
      background-image: url(${e});
    `}
  ${({size:e=a.size,padding:n=a.padding})=>(0,s.css)`
    width: ${e-2*n}px;
    height: ${e-2*n}px;
  `}
  ${({padding:e})=>e&&(0,s.css)`
      padding: ${e}px;
    `};
  box-sizing: content-box;
  ${({rotate:e=a.rotate})=>`transform: rotate(${e}deg)`};

  & > svg {
    ${({size:e=a.size,padding:n=a.padding})=>(0,s.css)`
      width: ${e-2*n}px;
      height: ${e-2*n}px;
    `}
  }

  ${({color:e})=>e&&(0,t.G2)(e)};
`},"./src/components/WizardFooter/WizardFooter.stories.tsx":function(e,n,r){r.r(n),r.d(n,{CancelPreviousNext:function(){return $},CancelPreviousNextCustomLabels:function(){return j},CancelPreviousNextDisabled:function(){return y},CancelSave:function(){return C},CancelSaveCustomLabels:function(){return S},CancelSaveDisabled:function(){return k},NextSave:function(){return N},NextSaveCustomLabels:function(){return I},NextSaveDisabled:function(){return O},PreviousNext:function(){return _},PreviousNextCustomLabels:function(){return z},PreviousNextDisabled:function(){return w},__namedExportsOrder:function(){return B},default:function(){return x}});var s=r("./node_modules/react/jsx-runtime.js"),t=r("./node_modules/@amsterdam/asc-ui/es/components/Button/Button.js"),a=function(e){return(0,s.jsx)("svg",Object.assign({viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",focusable:!1},e,{children:(0,s.jsx)("path",{d:"m22.857 32-16-16 16-16 2.9 2.91L12.677 16l13.08 13.09z",fillRule:"evenodd"})}))};r("./node_modules/react/index.js");var i=r("./node_modules/styled-components/dist/styled-components.browser.esm.js"),o=r("./node_modules/@amsterdam/asc-ui/es/utils/themeUtils.js");function l(e,n){return n||(n=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function c(){var e=l(["\n	display: flex;\n	flex-flow: row nowrap;\n	justify-content: space-between;\n	padding: ",";\n	background-color: ",";\n"]);return c=function(){return e},e}function d(){var e=l(["\n	margin-left: ",";\n"]);return d=function(){return e},e}function u(){var e=l(["\n	margin-left: ",";\n	margin-right: 15px !important;\n"]);return u=function(){return e},e}function m(){var e=l(["\n	display: flex;\n"]);return m=function(){return e},e}var v=i.default.div(c(),(0,o.B7)(2,4),(0,o.hm)("tint","level3")),p=(0,i.default)(t.A)(d(),(0,o.B7)(2)),b=(0,i.default)(t.A)(u(),(0,o.B7)(2)),g=i.default.div(m());function h(e,n){var r,s,t;return{visible:null!=(r=null==e?void 0:e.visible)&&r,label:null!=(s=null==e?void 0:e.label)?s:n,disabled:null!=(t=null==e?void 0:e.disabled)&&t,onClick:null==e?void 0:e.onClick,dataTestId:null==e?void 0:e.dataTestId}}var f=function(e){var n=e.cancel,r=e.next,i=e.previous,o=e.save,l=h(n,"Annuleer"),c=l.visible,d=l.onClick,u=l.label,m=l.dataTestId,f=h(r,"Volgende"),x=f.visible,$=f.disabled,y=f.onClick,j=f.label,C=f.dataTestId,k=h(i,"Vorige"),S=k.visible,_=k.onClick,w=k.label,z=k.dataTestId,N=h(o,"Opslaan"),O=N.visible,I=N.disabled,B=N.onClick,P=N.label,A=N.dataTestId;return(0,s.jsxs)(v,{children:[(0,s.jsx)("div",{children:c&&(0,s.jsx)(t.A,{name:"cancel",variant:"primaryInverted",iconLeft:(0,s.jsx)(a,{}),onClick:d,"data-testid":m,children:u})}),(0,s.jsxs)(g,{children:[S&&(0,s.jsx)(t.A,{name:"previous",variant:"primaryInverted",iconLeft:(0,s.jsx)(a,{}),onClick:_,"data-testid":z,children:w}),x&&(0,s.jsx)(b,{name:"next",variant:"secondary",onClick:y,disabled:$,"data-testid":C,taskflow:!0,children:j}),O&&(0,s.jsx)(p,{name:"save",variant:"secondary",onClick:B,disabled:I,"data-testid":A,children:P})]})]})};try{f.displayName="WizardFooter",f.__docgenInfo={description:"",displayName:"WizardFooter",props:{cancel:{defaultValue:null,description:"",name:"cancel",required:!1,type:{name:"ButtonConfig"}},next:{defaultValue:null,description:"",name:"next",required:!1,type:{name:"ButtonConfig"}},previous:{defaultValue:null,description:"",name:"previous",required:!1,type:{name:"ButtonConfig"}},save:{defaultValue:null,description:"",name:"save",required:!1,type:{name:"ButtonConfig"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/WizardFooter/WizardFooter.tsx#WizardFooter"]={docgenInfo:f.__docgenInfo,name:"WizardFooter",path:"src/components/WizardFooter/WizardFooter.tsx#WizardFooter"})}catch(e){}var x={title:"WizardFooter",component:f},$={args:{cancel:{visible:!0},previous:{visible:!0},next:{visible:!0}}},y={args:{cancel:{visible:!0},previous:{visible:!0},next:{visible:!0,disabled:!0}}},j={args:{cancel:{visible:!0,label:"Cancel"},previous:{visible:!0,label:"Previous"},next:{visible:!0,disabled:!0,label:"Next"}}},C={args:{cancel:{visible:!0},save:{visible:!0}}},k={args:{cancel:{visible:!0},save:{visible:!0,disabled:!0}}},S={args:{cancel:{visible:!0,label:"Cancel"},save:{visible:!0,label:"Save"}}},_={args:{previous:{visible:!0},next:{visible:!0}}},w={args:{previous:{visible:!0},next:{visible:!0,disabled:!0}}},z={args:{previous:{visible:!0,label:"Previous"},next:{visible:!0,label:"Next"}}},N={args:{next:{visible:!0},save:{visible:!0}}},O={args:{next:{visible:!0,disabled:!0},save:{visible:!0,disabled:!0}}},I={args:{next:{visible:!0,label:"Next"},save:{visible:!0,label:"Save"}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:"{\n  args: {\n    cancel: {\n      visible: true\n    },\n    previous: {\n      visible: true\n    },\n    next: {\n      visible: true\n    }\n  }\n}",...$.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:"{\n  args: {\n    cancel: {\n      visible: true\n    },\n    previous: {\n      visible: true\n    },\n    next: {\n      visible: true,\n      disabled: true\n    }\n  }\n}",...y.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:"{\n  args: {\n    cancel: {\n      visible: true,\n      label: 'Cancel'\n    },\n    previous: {\n      visible: true,\n      label: 'Previous'\n    },\n    next: {\n      visible: true,\n      disabled: true,\n      label: 'Next'\n    }\n  }\n}",...j.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:"{\n  args: {\n    cancel: {\n      visible: true\n    },\n    save: {\n      visible: true\n    }\n  }\n}",...C.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:"{\n  args: {\n    cancel: {\n      visible: true\n    },\n    save: {\n      visible: true,\n      disabled: true\n    }\n  }\n}",...k.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:"{\n  args: {\n    cancel: {\n      visible: true,\n      label: 'Cancel'\n    },\n    save: {\n      visible: true,\n      label: 'Save'\n    }\n  }\n}",...S.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:"{\n  args: {\n    previous: {\n      visible: true\n    },\n    next: {\n      visible: true\n    }\n  }\n}",..._.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:"{\n  args: {\n    previous: {\n      visible: true\n    },\n    next: {\n      visible: true,\n      disabled: true\n    }\n  }\n}",...w.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:"{\n  args: {\n    previous: {\n      visible: true,\n      label: 'Previous'\n    },\n    next: {\n      visible: true,\n      label: 'Next'\n    }\n  }\n}",...z.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:"{\n  args: {\n    next: {\n      visible: true\n    },\n    save: {\n      visible: true\n    }\n  }\n}",...N.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:"{\n  args: {\n    next: {\n      visible: true,\n      disabled: true\n    },\n    save: {\n      visible: true,\n      disabled: true\n    }\n  }\n}",...O.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:"{\n  args: {\n    next: {\n      visible: true,\n      label: 'Next'\n    },\n    save: {\n      visible: true,\n      label: 'Save'\n    }\n  }\n}",...I.parameters?.docs?.source}}};let B=["CancelPreviousNext","CancelPreviousNextDisabled","CancelPreviousNextCustomLabels","CancelSave","CancelSaveDisabled","CancelSaveCustomLabels","PreviousNext","PreviousNextDisabled","PreviousNextCustomLabels","NextSave","NextSaveDisabled","NextSaveCustomLabels"]}}]);