import{c as p}from"./CytzSlOG.js";import{c as T}from"./BdDUjuwf.js";import{e as c,o,c as l,y as i,x as u,g as s,k as b,b as m,w as d,h as f,H as h,d as x,t as A,_ as I}from"./DU3geLts.js";import{u as M}from"./D6zVTiYe.js";import{c as _}from"./tHcswnMc.js";/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=_("BookOpenTextIcon",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M16 12h2",key:"7q9ll5"}],["path",{d:"M16 8h2",key:"msurwy"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}],["path",{d:"M6 12h2",key:"32wvfc"}],["path",{d:"M6 8h2",key:"30oboj"}]]);/**
 * @license lucide-vue-next v0.469.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=_("TriangleAlertIcon",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),w=c({__name:"Alert",props:{class:{},variant:{}},setup(e){const a=e;return(t,n)=>(o(),l("div",{class:u(s(p)(s(z)({variant:t.variant}),a.class)),role:"alert"},[i(t.$slots,"default")],2))}}),V=c({__name:"AlertDescription",props:{class:{}},setup(e){const a=e;return(t,n)=>(o(),l("div",{class:u(s(p)("text-sm [&_p]:leading-relaxed",a.class))},[i(t.$slots,"default")],2))}}),C=c({__name:"AlertTitle",props:{class:{}},setup(e){const a=e;return(t,n)=>(o(),l("h5",{class:u(s(p)("mb-1 font-medium leading-none tracking-tight",a.class))},[i(t.$slots,"default")],2))}}),z=T("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",{variants:{variant:{default:"bg-background text-foreground",destructive:"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"}},defaultVariants:{variant:"default"}}),j={class:"hint"},D=c({__name:"Hint",props:{hideIcon:{type:Boolean},hideTitle:{type:Boolean},title:{default:void 0},variant:{default:"default"}},setup(e){const a={default:B,destructive:$},t=e,{t:n}=M(),v=b(()=>(t.variant&&a[t.variant])??void 0);return(r,H)=>{const k=C,g=V,y=w;return o(),l("div",j,[m(y,{class:"not-prose",variant:r.variant},{default:d(()=>[s(v)&&!r.hideIcon?(o(),f(s(v),{key:0,class:"size-4"})):h("",!0),r.hideTitle?h("",!0):(o(),f(k,{key:1},{default:d(()=>[x(A(r.title??s(n)("component.hint.defaultTitle")),1)]),_:1})),m(g,null,{default:d(()=>[i(r.$slots,"default",{},void 0,!0)]),_:3})]),_:3},8,["variant"])])}}}),L=I(D,[["__scopeId","data-v-6603523f"]]);export{L as default};
