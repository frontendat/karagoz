import{aj as V,j as ee,a as _,J as L,ba as H,b8 as te,u as ae,d as ne,bb as oe,bc as le,i as se,b as ie,a9 as O,bd as K,h as ue,aB as re,b0 as ce,be as Ee,bf as de,q,b5 as fe,L as z,bg as pe,aY as ve}from"./B53LhvXH.js";function me(t=V()){var l;return(l=t.ssrContext)==null?void 0:l.event}const he={trailing:!0};function ye(t,l=25,s={}){if(s={...he,...s},!Number.isFinite(l))throw new TypeError("Expected `wait` to be a finite number");let w,c,i=[],u,b;const d=(f,n)=>(u=ge(t,f,n),u.finally(()=>{if(u=null,s.trailing&&b&&!c){const x=d(f,b);return b=null,x}}),u);return function(...f){return u?(s.trailing&&(b=f),u):new Promise(n=>{const x=!c&&s.leading;clearTimeout(c),c=setTimeout(()=>{c=null;const A=s.leading?w:d(this,f);for(const p of i)p(A);i=[]},l),x?(w=d(this,f),n(w)):i.push(n)})}}async function ge(t,l,s){return await t.apply(l,s)}const S="_islandPromises",J=/data-island-uid="([^"]*)"/,be=/data-island-uid(="")?(?!="[^"])/g,_e=/data-island-slot="([^"]*)"/g,Se=/ data-island-slot="([^"]*)"[^>]*>/g,we=/^<[^> ]*/;let xe=1;const Ae=()=>(xe++).toString();const Le=ee({name:"NuxtIsland",inheritAttrs:!1,props:{name:{type:String,required:!0},lazy:Boolean,props:{type:Object,default:()=>{}},context:{type:Object,default:()=>({})},scopeId:{type:String,default:()=>{}},source:{type:String,default:()=>{}},dangerouslyLoadClientComponents:{type:Boolean,default:!1}},emits:["error"],async setup(t,{slots:l,expose:s,emit:w}){var I,T,N,k,D,P;let c=!1;const i=_(0),u=_(0),b=L(()=>H),d=_(null),f=ve(),n=V(),x=L(()=>t.props?Object.fromEntries(Object.entries(t.props).filter(([a])=>!a.startsWith("data-v-"))):{}),A=L(()=>te([t.name,x.value,t.context,t.source])),p=ue();me();let C;const Q=globalThis.fetch,$=_(!1);ae(()=>{$.value=!0,i.value++}),ne(()=>{C&&C.dispose()});function W(a,e){const o={};e.props&&(o.props=e.props),e.slots&&(o.slots=e.slots),e.components&&(o.components=e.components),e.head&&(o.head=e.head),n.payload.data[a]={__nuxt_island:{key:a,params:{...t.context,props:t.props?JSON.stringify(t.props):void 0},result:o},...e}}const v={};if(p.vnode.el){const a=(I=oe(n.payload.data[`${t.name}_${A.value}`]))==null?void 0:I.slots;a&&(v.slots=a)}const g=_("");if((T=p.vnode)!=null&&T.el){g.value=((N=le(p.vnode.el,!0))==null?void 0:N.join(""))||"";const a=`${t.name}_${A.value}`;(k=n.payload.data)[a]||(k[a]={}),n.payload.data[a].html=g.value.replaceAll(new RegExp(`data-island-uid="${((D=g.value.match(J))==null?void 0:D[1])||""}"`,"g"),'data-island-uid=""')}const m=_(((P=g.value.match(J))==null?void 0:P[1])||Ae()),Y=L(()=>[...g.value.matchAll(_e)].map(a=>a[1])),j=L(()=>{const a=Object.keys(l);let e=g.value;if(t.scopeId&&(e=e.replace(we,o=>o+" "+t.scopeId)),!b.value)for(const[o,h]of Object.entries(v.components||{}))e=e.replace(new RegExp(` data-island-uid="${m.value}" data-island-component="${o}"[^>]*>`),r=>r+h.html);return v.slots?e.replaceAll(Se,(o,h)=>{var r,y;return a.includes(h)?o:o+(((y=(r=v.slots)==null?void 0:r[h])==null?void 0:y.fallback)||"")}):e}),G=se();async function X(a=!1){var y;const e=`${t.name}_${A.value}`;if(!a&&((y=n.payload.data[e])!=null&&y.html))return n.payload.data[e];const o=`/__nuxt_island/${e}.json`,r=await(await Q(de(t.source?o:ce(f.app.baseURL??"",o),{...t.context,props:t.props?JSON.stringify(t.props):void 0}))).json();return W(e,r),r}async function R(a=!1){n[S]=n[S]||{},n[S][m.value]||(n[S][m.value]=X(a).finally(()=>{delete n[S][m.value]}));try{const e=await n[S][m.value];g.value=e.html.replaceAll(be,`data-island-uid="${m.value}"`),u.value++,d.value=null,v.slots=e.slots||{},v.components=e.components||{},e!=null&&e.head&&(C?C.patch(e.head):C=G.push(e.head)),re(()=>{c=!0,i.value++})}catch(e){d.value=e,w("error",e)}}return s({refresh:()=>R(!0)}),ie(t,ye(()=>R(),100),{deep:!0}),!p.vnode.el&&t.lazy?R():(!p.vnode.el||!n.payload.serverRendered)&&await R(),(a,e)=>{var o;return!j.value||d.value?[((o=l.fallback)==null?void 0:o.call(l,{error:d.value}))??O("div")]:[K([u.value],()=>O(z,{key:u.value},[q(fe(j.value||"<div></div>",1))]),e,0),K([i.value],()=>{var y;const h=[],r=i.value===0||!!(i.value&&!(i.value%2));if(m.value&&j.value&&(t.lazy?c:$.value||(y=p.vnode)!=null&&y.el))for(const E in l)Y.value.includes(E)&&h.push(O(pe,{to:`${r?"div":""}[data-island-uid="${m.value}"][data-island-slot="${E}"]`},{default:()=>{var U,B,F;return((F=(B=(U=v.slots)==null?void 0:U[E])==null?void 0:B.props)!=null&&F.length?v.slots[E].props:[{}]).map(Z=>{var M;return(M=l[E])==null?void 0:M.call(l,Z)})}}));return q(z,h)},e,1)]}}});export{Le as default};
