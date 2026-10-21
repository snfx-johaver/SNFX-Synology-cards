/*!
SNFX Synology Cards, Apache-2.0.
Adapted from ruaan-deysel/ha-unraid, revision c816d9fd113df51c66ffde050a8dba52c799b2e1.
Modified for Synology DSM, Portainer and standalone HACS distribution.

Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   Copyright 2025 Domalab

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

Bundled third-party licenses (Lit and Material Design Icons):

BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

Pictogrammers Free License
--------------------------

This icon collection is released as free, open source, and GPL friendly by
the [Pictogrammers](http://pictogrammers.com/) icon group. You may use it
for commercial projects, open source projects, or anything really.

# Icons: Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0)
Some of the icons are redistributed under the Apache 2.0 license. All other
icons are either redistributed under their respective licenses or are
distributed under the Apache 2.0 license.

# Fonts: Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0)
All web and desktop fonts are distributed under the Apache 2.0 license. Web
and desktop fonts contain some icons that are redistributed under the Apache
2.0 license. All other icons are either redistributed under their respective
licenses or are distributed under the Apache 2.0 license.

# Code: MIT (https://opensource.org/licenses/MIT)
The MIT license applies to all non-font and non-icon files.
*/
var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:ee}=Object,m=globalThis,h=m.trustedTypes,te=h?h.emptyScript:``,ne=m.reactiveElementPolyfillSupport,g=(e,t)=>e,_={toAttribute(e,t){switch(t){case Boolean:e=e?te:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},v=(e,t)=>!l(e,t),re={attribute:!0,type:String,converter:_,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol(`metadata`),m.litPropertyMetadata??=new WeakMap;var y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=re){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??re}static _$Ei(){if(this.hasOwnProperty(g(`elementProperties`)))return;let e=ee(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(g(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(g(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?_:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?_:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??v)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:`open`},y[g(`elementProperties`)]=new Map,y[g(`finalized`)]=new Map,ne?.({ReactiveElement:y}),(m.reactiveElementVersions??=[]).push(`2.1.2`);var ie=globalThis,b=e=>e,x=ie.trustedTypes,ae=x?x.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,S=`$lit$`,C=`lit$${Math.random().toFixed(9).slice(2)}$`,w=`?`+C,oe=`<${w}>`,T=document,E=()=>T.createComment(``),D=e=>e===null||typeof e!=`object`&&typeof e!=`function`,se=Array.isArray,ce=e=>se(e)||typeof e?.[Symbol.iterator]==`function`,le="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ue=/-->/g,de=/>/g,k=RegExp(`>|${le}(?:([^\\s"'>=/]+)(${le}*=${le}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),fe=/'/g,pe=/"/g,me=/^(?:script|style|textarea|title)$/i,A=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),j=Symbol.for(`lit-noChange`),M=Symbol.for(`lit-nothing`),he=new WeakMap,N=T.createTreeWalker(T,129);function ge(e,t){if(!se(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ae===void 0?t:ae.createHTML(t)}var _e=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=O;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===O?c[1]===`!--`?o=ue:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=k):(me.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=k):o=de:o===k?c[0]===`>`?(o=i??O,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?k:c[3]===`"`?pe:fe):o===pe||o===fe?o=k:o===ue||o===de?o=O:(o=k,i=void 0);let d=o===k&&e[t+1].startsWith(`/>`)?` `:``;a+=o===O?n+oe:l>=0?(r.push(s),n.slice(0,l)+S+n.slice(l)+C+d):n+C+(l===-2?t:d)}return[ge(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},ve=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=_e(t,n);if(this.el=e.createElement(l,r),N.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=N.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(S)){let t=u[o++],n=i.getAttribute(e).split(C),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?xe:r[1]===`?`?Se:r[1]===`@`?Ce:F}),i.removeAttribute(e)}else e.startsWith(C)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(me.test(i.tagName)){let e=i.textContent.split(C),t=e.length-1;if(t>0){i.textContent=x?x.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],E()),N.nextNode(),c.push({type:2,index:++a});i.append(e[t],E())}}}else if(i.nodeType===8){if(i.data===w)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(C,e+1))!==-1;)c.push({type:7,index:a}),e+=C.length-1}}a++}}static createElement(e,t){let n=T.createElement(`template`);return n.innerHTML=e,n}};function P(e,t,n=e,r){if(t===j)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=D(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=P(e,i._$AS(e,t.values),i,r)),t}var ye=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??T).importNode(t,!0);N.currentNode=r;let i=N.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new be(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new we(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=N.nextNode(),a++)}return N.currentNode=T,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},be=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=P(this,e,t),D(e)?e===M||e==null||e===``?(this._$AH!==M&&this._$AR(),this._$AH=M):e!==this._$AH&&e!==j&&this._(e):e._$litType$===void 0?e.nodeType===void 0?ce(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==M&&D(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=ve.createElement(ge(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new ye(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=he.get(e.strings);return t===void 0&&he.set(e.strings,t=new ve(e)),t}k(t){se(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(E()),this.O(E()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=b(e).nextSibling;b(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},F=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=M,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=M}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=P(this,e,t,0),a=!D(e)||e!==this._$AH&&e!==j,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=P(this,r[n+o],t,o),s===j&&(s=this._$AH[o]),a||=!D(s)||s!==this._$AH[o],s===M?e=M:e!==M&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},xe=class extends F{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===M?void 0:e}},Se=class extends F{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==M)}},Ce=class extends F{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=P(this,e,t,0)??M)===j)return;let n=this._$AH,r=e===M&&n!==M||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==M&&(n===M||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},we=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){P(this,e)}},Te={M:S,P:C,A:w,C:1,L:_e,R:ye,D:ce,V:P,I:be,H:F,N:Se,U:Ce,B:xe,F:we},Ee=ie.litHtmlPolyfillSupport;Ee?.(ve,be),(ie.litHtmlVersions??=[]).push(`3.3.3`);var De=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new be(t.insertBefore(E(),e),e,void 0,n??{})}return i._$AI(e),i},Oe=globalThis,I=class extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=De(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}};I._$litElement$=!0,I.finalized=!0,Oe.litElementHydrateSupport?.({LitElement:I});var ke=Oe.litElementPolyfillSupport;ke?.({LitElement:I}),(Oe.litElementVersions??=[]).push(`4.2.2`);var Ae=`synology-server-card`,je=`synology-server-card-editor`,Me=`synology-storage-card`,Ne=`synology-storage-card-editor`,Pe=`synology-docker-card`,Fe=`synology-docker-card-editor`,Ie=`synology-dashboard-card`,Le=`synology-dashboard-card-editor`,L={synology_dsm:`Synology DSM`,qnap:`QNAP`,manual:`Manual entities`};function Re(e){let t=[`switch`,`binary_sensor`,`input_boolean`].includes(e.status_entity.split(`.`)[0]);return{running:e.running_state||(t?`on`:`running`),stopped:e.stopped_state||(t?`off`:`exited`)}}function R(e){return e.nas_source??`synology_dsm`}function z(e){return e.container_source??(e.portainer_endpoint?`portainer`:e.containers?.length?`manual`:e.type.includes(`docker`)?`portainer`:`disabled`)}function B(e){return!e.type.includes(`docker`)&&R(e)!==`manual`||(e.type.includes(`docker`)||e.type.includes(`dashboard`))&&z(e)===`portainer`}var ze=[o`
  :host {
    --synology-primary: #0086d6;
    --synology-accent: #0086d6;
    --synology-online: var(--success-color, #2ecc71);
    --synology-warning: var(--warning-color, #f39c12);
    --synology-error: var(--error-color, #e74c3c);
    --synology-standby: var(--disabled-text-color, #7f8c8d);
    --synology-info: var(--info-color, #3498db);
    --synology-card-bg: var(--ha-card-background, var(--card-background-color, #1c1c20));
    --synology-border: var(--ha-card-border-color, var(--divider-color, rgba(255, 255, 255, 0.08)));
    --synology-radius: var(--ha-card-border-radius, 12px);
    --synology-text: var(--primary-text-color, #e1e1e6);
    --synology-subtext: var(--secondary-text-color, #8a8a93);
  }
`,o`
    :host {
      display: block;
      height: 100%;
      box-sizing: border-box;
    }

    ha-card {
      height: 100%;
      box-sizing: border-box;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      overflow: hidden;
      background: var(--synology-card-bg);
      border: 1px solid var(--synology-border);
      border-radius: var(--synology-radius);
      color: var(--synology-text);
      font-family: var(--ha-card-font-family, inherit);
    }

    :host([embedded]) ha-card {
      border: none;
      box-shadow: none;
      background: transparent;
      padding: 0;
    }

    .icon {
      display: inline-block;
      vertical-align: middle;
      fill: currentColor;
      flex-shrink: 0;
    }

    .empty-state {
      font-size: 0.76rem;
      line-height: 1.5;
      color: var(--synology-subtext);
      overflow-wrap: anywhere;
    }

    .section-title {
      font-size: 0.85rem;
      font-weight: 600;
    }

    .status-dot.unknown {
      background: var(--synology-standby);
    }

    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    button:focus-visible, [role="button"]:focus-visible, a:focus-visible {
      outline: 2px solid var(--synology-accent);
      outline-offset: 3px;
    }

    /* Header */
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .header-main {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .header-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: color-mix(in srgb, var(--synology-accent) 15%, transparent);
      color: var(--synology-accent);
      display: grid;
      place-items: center;
      flex-shrink: 0;
    }

    .header-titles {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }

    .header-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--synology-text);
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-wrap: anywhere;
      line-height: 1.25;
    }

    .header-subtitle {
      font-size: 0.78rem;
      color: var(--synology-subtext);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    /* Badges / Chips */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 0.72rem;
      font-weight: 600;
      line-height: 1;
      white-space: nowrap;
    }

    .badge-online {
      background: color-mix(in srgb, var(--synology-online) 15%, transparent);
      color: var(--synology-online);
      border: 1px solid color-mix(in srgb, var(--synology-online) 25%, transparent);
    }

    .badge-warning {
      background: color-mix(in srgb, var(--synology-warning) 15%, transparent);
      color: var(--synology-warning);
      border: 1px solid color-mix(in srgb, var(--synology-warning) 25%, transparent);
    }

    .badge-error {
      background: color-mix(in srgb, var(--synology-error) 15%, transparent);
      color: var(--synology-error);
      border: 1px solid color-mix(in srgb, var(--synology-error) 25%, transparent);
    }

    .badge-standby {
      background: color-mix(in srgb, var(--synology-standby) 15%, transparent);
      color: var(--synology-standby);
      border: 1px solid color-mix(in srgb, var(--synology-standby) 25%, transparent);
    }

    .pulse-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: currentColor;
    }

    /* Conic Ring Gauges */
    .rings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(85px, 1fr));
      gap: 8px;
    }

    .ring-card {
      background: color-mix(in srgb, var(--synology-text) 3%, transparent);
      border: 1px solid var(--synology-border);
      border-radius: 10px;
      padding: 10px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 6px;
    }

    .ring-card[role="button"]:focus-visible {
      outline: 2px solid var(--synology-primary);
      outline-offset: 2px;
    }

    .ring-gauge {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      position: relative;
      display: grid;
      place-items: center;
      background: conic-gradient(
        var(--ring-color, var(--synology-primary)) calc(var(--pct, 0) * 1%),
        color-mix(in srgb, var(--synology-text) 8%, transparent) 0
      );
      flex-shrink: 0;
    }

    .ring-gauge::after {
      content: "";
      position: absolute;
      inset: 6px;
      border-radius: 50%;
      background: var(--synology-card-bg);
    }

    .ring-content {
      position: relative;
      z-index: 2;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--synology-text);
    }

    .ring-label {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--synology-text);
      line-height: 1.1;
    }

    .ring-subtext {
      font-size: 0.68rem;
      color: var(--synology-subtext);
      line-height: 1.1;
      white-space: nowrap;
    }

    /* Progress Bars */
    .progress-bar {
      width: 100%;
      height: 6px;
      background: color-mix(in srgb, var(--synology-text) 10%, transparent);
      border-radius: 4px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--fill-color, var(--synology-accent));
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    /* Lists / Tables */
    .item-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .list-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--synology-text) 3%, transparent);
      border: 1px solid var(--synology-border);
      gap: 10px;
      font-size: 0.8rem;
      transition: border-color 0.2s ease;
    }

    .list-row:hover {
      border-color: color-mix(in srgb, var(--synology-accent) 40%, transparent);
    }

    .row-left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      flex: 1;
    }

    .row-right {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    @media (max-width: 480px) {
      .container-list-row {
        flex-wrap: wrap;
      }
      .container-list-row .row-left {
        flex-basis: 100%;
      }
      .header {
        flex-wrap: wrap;
      }
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: 8px;
      font-size: 0.78rem;
      font-weight: 600;
      border: 1px solid var(--synology-border);
      background: color-mix(in srgb, var(--synology-text) 6%, transparent);
      color: var(--synology-text);
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .btn:hover {
      background: color-mix(in srgb, var(--synology-text) 12%, transparent);
    }

    .btn-primary {
      background: var(--synology-accent);
      color: white;
      border-color: transparent;
    }

    .btn-primary:hover {
      filter: brightness(1.1);
    }

    .btn-icon {
      padding: 6px;
      border-radius: 6px;
      border: 1px solid transparent;
      background: transparent;
      color: var(--synology-subtext);
      cursor: pointer;
    }

    .btn-icon:hover {
      background: color-mix(in srgb, var(--synology-text) 8%, transparent);
      color: var(--synology-text);
    }

    /* Docker Containers Grid View (like Synology GUI) */
    .container-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
      gap: 8px;
    }

    .container-tile {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 8px;
      background: color-mix(in srgb, var(--synology-text) 4%, transparent);
      border: 1px solid var(--synology-border);
      cursor: pointer;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .container-tile:hover {
      border-color: var(--synology-accent);
    }

    .tile-name {
      font-size: 0.76rem;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .status-dot.online {
      background: var(--synology-online);
    }

    .status-dot.offline {
      background: var(--synology-error);
      border-radius: 2px;
    }

    /* Section divider */
    .divider {
      height: 1px;
      background: var(--synology-border);
      width: 100%;
      margin: 4px 0;
    }

    /* Details Rows */
    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 8px;
      font-size: 0.75rem;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .detail-item[role="button"]:focus-visible {
      outline: 2px solid var(--synology-primary);
      outline-offset: 2px;
      border-radius: 4px;
    }

    .detail-label {
      color: var(--synology-subtext);
      font-size: 0.68rem;
    }

    .detail-val {
      font-weight: 600;
      color: var(--synology-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Tab strip for unified dashboard card */
    .tab-strip {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      border-bottom: 1px solid var(--synology-border);
      padding-bottom: 6px;
    }

    .tab-btn {
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 0.76rem;
      font-weight: 600;
      background: transparent;
      border: none;
      color: var(--synology-subtext);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .tab-btn:hover {
      color: var(--synology-text);
      background: color-mix(in srgb, var(--synology-text) 5%, transparent);
    }

    .tab-btn.active {
      background: color-mix(in srgb, var(--synology-accent) 15%, transparent);
      color: var(--synology-accent);
    }
  `];function Be(e,t,n,r){let i=new CustomEvent(t,{bubbles:r?.bubbles??!0,cancelable:!!r?.cancelable,composed:r?.composed??!0,detail:n});return e.dispatchEvent(i),i}var V=new WeakMap,Ve=new WeakMap;function He(e){let t=e.connection??e.callWS;return t?Ve.get(t):void 0}var Ue=new WeakMap;function We(e){let t=Ue.get(e.devices);t||(t=new WeakMap,Ue.set(e.devices,t));let n=t.get(e.entities);if(n)return n;let r=new Map;for(let t of Object.values(e.entities)){if(!t.device_id)continue;let e=r.get(t.device_id)??[];e.push(t),r.set(t.device_id,e)}let i={entitiesByDevice:r,synology:Object.values(e.devices).filter(e=>(r.get(e.id)?.filter(e=>e.platform===`synology_dsm`)??[]).some(e=>[`cpu_total_load`,`cpu_user_load`,`cpu_system_load`,`memory_real_usage`,`memory_total_real`,`memory_available_real`,`temperature`,`uptime`].some(t=>U(e,t)))),qnap:Object.values(e.devices).filter(e=>r.get(e.id)?.some(e=>e.platform===`qnap`&&[`cpu_usage`,`memory_percent_used`,`system_temp`,`uptime`].some(t=>U(e,t)))??!1),endpoints:Object.values(e.devices).filter(e=>qe(e,`portainer`)&&e.model===`Endpoint`)};return t.set(e.entities,i),i}function H(e,t){return We(e).entitiesByDevice.get(t)??[]}async function Ge(e,t=!1){if(!e.callWS)return{devices:e.devices??{},entities:e.entities??{}};let n=e.connection??e.callWS;t&&V.delete(n);let r=V.get(n);return r||(r=Promise.all([e.callWS({type:`config/device_registry/list`}),e.callWS({type:`config/entity_registry/list`})]).then(([e,t])=>{let i={devices:Object.fromEntries(e.map(e=>[e.id,e])),entities:Object.fromEntries(t.map(e=>[e.entity_id,e]))};return V.get(n)===r&&Ve.set(n,i),i}),V.set(n,r),r.catch(()=>{V.get(n)===r&&V.delete(n)})),r}function Ke(e,t,n){let r=new Set;for(;e&&!r.has(e.id);){if(e.id===t)return!0;r.add(e.id);let i=e.parent_device_id??e.via_device_id;e=i?n[i]:void 0}return!1}function qe(e,t){return e.identifiers?.some(([e])=>e===t)??!1}function Je(e){return We(e).synology}function Ye(e,t){return t===`synology_dsm`?Je(e):t===`qnap`?We(e).qnap:[]}function Xe(e){return We(e).endpoints}function U(e,t){if(e.translation_key===t)return!0;let n=e.unique_id??``;return n.endsWith(`_${t}`)||n.includes(`:${t}_`)||n.endsWith(`:${t}`)||!e.translation_key&&!n&&e.entity_id.endsWith(`_${t}`)}function Ze(e,t,n,r,i,a=`synology_dsm`){if(!e||!n)return;let o=H(t,n).filter(e=>e.platform===a&&(!i||e.entity_id.startsWith(`${i}.`))),s=o.find(e=>U(e,r));if(s)return e.states[s.entity_id];let c=o.find(e=>e.entity_id.endsWith(`_${r}`));return c?e.states[c.entity_id]:void 0}function W(e,t){let n=Ye(t,R(e));return e.server?n.find(t=>t.id===e.server):n.length===1?n[0]:void 0}var Qe={synology_dsm:{cpu_usage:`cpu_total_load`,ram_usage:`memory_real_usage`,system_temperature:`temperature`,security_status:`status`,network_rx:`network_down`,network_tx:`network_up`},qnap:{cpu_usage:`cpu_usage`,ram_usage:`memory_percent_used`,system_temperature:`system_temp`,memory_total_real:`memory_size`,memory_available_real:`memory_free`,memory_used:`memory_used`,system_status:`status`}},$e={volumes:[`volume_percentage_used`,`volume_size_total`,`volume_size_used`,`volume_size_free`],drives:[`drive_smart_status`,`drive_temp`],network:[`network_rx`,`network_tx`,`network_link_status`]},et=new WeakMap;function tt(e,t,n){if(!t)return[];let r=H(e,t),i=et.get(r);if(!i){let e=e=>{let t=new Map;for(let n of r)if(n.platform===`qnap`&&n.entity_id.startsWith(`sensor.`)&&n.unique_id)for(let r of e){if(n.translation_key&&n.translation_key!==r)continue;let e=`_${r}_`,i=n.unique_id.indexOf(e),a=i>=0?n.unique_id.slice(i+e.length):``;if(!a)continue;let o=t.get(a)??{id:a,entities:{}};o.entities[r]=n.entity_id,t.set(a,o);break}return[...t.values()].sort((e,t)=>e.id.localeCompare(t.id,void 0,{numeric:!0}))};i={volumes:e($e.volumes),drives:e($e.drives),network:e($e.network)},et.set(r,i)}return i[n]}function nt(e,t,n,r,i){let a=t.entities?.[r];if(a)return e?.states[a];let o=R(t);if(o===`manual`||[`model`,`software_version`].includes(r)||o===`qnap`&&r===`security_status`||o===`synology_dsm`&&r===`system_status`)return;let s=W(t,n)?.id;if(o===`qnap`&&[`network_rx`,`network_tx`].includes(r)){let i=tt(n,s,`network`),a=(t.network_interface?i.find(e=>e.id===t.network_interface):i.length===1?i[0]:void 0)?.entities[r];return a?e?.states[a]:void 0}return Ze(e,n,s,Qe[o][r]??r,i,o)}function G(e){return!!e&&![`unknown`,`unavailable`,`none`,``].includes(e.state.toLowerCase())}function K(e){if(!G(e))return;let t=Number(e.state);return Number.isFinite(t)?t:void 0}function rt(e,t=0){let n=K(e);return n===void 0?void 0:Number(Math.max(0,Math.min(100,n)).toFixed(t))}function q(e){return G(e)?`${e.state}${e.attributes.unit_of_measurement?` ${e.attributes.unit_of_measurement}`:``}`:`Unavailable`}var it={B:1,kB:1e3,KB:1e3,MB:1e6,GB:1e9,TB:0xe8d4a51000,KiB:1024,MiB:1024**2,GiB:1024**3,TiB:1024**4};function J(e){let t=K(e),n=e?.attributes.unit_of_measurement,r=typeof n==`string`?it[n]:void 0;return t!==void 0&&r!==void 0?t*r:void 0}function Y(e,t=`GB`){if(e===void 0||!Number.isFinite(e))return`Unavailable`;let n=e>=0xe8d4a51000?`TB`:e>=1e9||t===`GB`?`GB`:e>=1e6?`MB`:e>=1e3?`kB`:`B`;return`${(e/it[n]).toLocaleString(void 0,{maximumFractionDigits:2})} ${n}`}function at(e){let t=K(e),n=e?.attributes.unit_of_measurement;if(t===void 0||typeof n!=`string`)return`Unavailable`;let r=it[n.replace(/\/s$/,``)];return r===void 0?q(e):`${Y(t*r,`B`)}/s`}function ot(e){if(e)try{let t=new URL(e);return[`http:`,`https:`].includes(t.protocol)?t.href:void 0}catch{return}}function st(e,t){if(R(e)!==`synology_dsm`)return[];let n=W(e,t);return n?Object.values(t.devices).filter(e=>e.id!==n.id&&(qe(e,`synology_dsm`)||H(t,e.id).some(e=>e.platform===`synology_dsm`))&&Ke(e,n.id,t.devices)):[]}function ct(e,t,n){let r=R(t);return r===`manual`?(t.volumes??[]).map((t,n)=>({device:{id:`manual-volume-${n}`,name:t.name||`Volume ${n+1}`},usage:e?.states[t.usage_entity??``],status:e?.states[t.status_entity??``],total:e?.states[t.total_entity??``],used:e?.states[t.used_entity??``],temperature:e?.states[t.temperature_entity??``]})):r===`qnap`?tt(n,W(t,n)?.id,`volumes`).map(t=>({device:{id:t.id,name:t.id},usage:e?.states[t.entities.volume_percentage_used??``],total:e?.states[t.entities.volume_size_total??``],used:e?.states[t.entities.volume_size_used??``]})):st(t,n).filter(e=>H(n,e.id).some(e=>e.platform===`synology_dsm`&&(U(e,`volume_percentage_used`)||e.entity_id.endsWith(`_volume_percentage_used`)))).map(t=>{let r=r=>Ze(e,n,t.id,r,`sensor`);return{device:t,usage:r(`volume_percentage_used`),status:r(`volume_status`),total:r(`volume_size_total`),used:r(`volume_size_used`),temperature:r(`volume_disk_temp_avg`)}})}function lt(e,t,n){let r=R(t);return r===`manual`?(t.drives??[]).map((t,n)=>{let r=e?.states[t.model_entity??``];return{id:`manual-drive-${n}`,name:t.name||`Drive ${n+1}`,model:G(r)?r.state:void 0,status:e?.states[t.status_entity??``],smart:e?.states[t.smart_entity??``],temperature:e?.states[t.temperature_entity??``],badSectors:e?.states[t.bad_sectors_entity??``],remainingLife:e?.states[t.remaining_life_entity??``]}}):r===`qnap`?tt(n,W(t,n)?.id,`drives`).map(t=>{let n=e?.states[t.entities.drive_smart_status??``],r=e?.states[t.entities.drive_temp??``],i=n?.attributes.Model??r?.attributes.Model;return{id:t.id,name:t.id,model:typeof i==`string`?i:void 0,smart:n,temperature:r}}):st(t,n).filter(e=>H(n,e.id).some(e=>e.platform===`synology_dsm`&&(U(e,`disk_status`)||e.entity_id.endsWith(`_disk_status`)))).map(t=>{let r=(r,i=`sensor`)=>Ze(e,n,t.id,r,i);return{id:t.id,name:t.name_by_user||t.name,model:t.model??void 0,status:r(`disk_status`),smart:r(`disk_smart_status`),temperature:r(`disk_temp`),badSectors:r(`disk_exceed_bad_sector_thr`,`binary_sensor`),remainingLife:r(`disk_below_remain_life_thr`,`binary_sensor`)}})}function ut(e,t,n){let r=ct(e,t,n),i=r.map(e=>J(e.total)),a=r.map(e=>J(e.used));if(!r.length||i.some(e=>e===void 0)||a.some(e=>e===void 0))return{total:void 0,used:void 0,percent:void 0};let o=i.reduce((e,t)=>e+t,0),s=a.reduce((e,t)=>e+t,0);return{total:o,used:s,percent:o>0?Math.round(s/o*100):void 0}}var dt=`M21.81 10.25C21.75 10.21 21.25 9.82 20.17 9.82C19.89 9.82 19.61 9.85 19.33 9.9C19.12 8.5 17.95 7.79 17.9 7.76L17.61 7.59L17.43 7.86C17.19 8.22 17 8.63 16.92 9.05C16.72 9.85 16.84 10.61 17.25 11.26C16.76 11.54 15.96 11.61 15.79 11.61H2.62C2.28 11.61 2 11.89 2 12.24C2 13.39 2.18 14.54 2.58 15.62C3.03 16.81 3.71 17.69 4.58 18.23C5.56 18.83 7.17 19.17 9 19.17C9.79 19.17 10.61 19.1 11.42 18.95C12.54 18.75 13.62 18.36 14.61 17.79C15.43 17.32 16.16 16.72 16.78 16C17.83 14.83 18.45 13.5 18.9 12.35H19.09C20.23 12.35 20.94 11.89 21.33 11.5C21.59 11.26 21.78 10.97 21.92 10.63L22 10.39L21.81 10.25M3.85 11.24H5.61C5.69 11.24 5.77 11.17 5.77 11.08V9.5C5.77 9.42 5.7 9.34 5.61 9.34H3.85C3.76 9.34 3.69 9.41 3.69 9.5V11.08C3.7 11.17 3.76 11.24 3.85 11.24M6.28 11.24H8.04C8.12 11.24 8.2 11.17 8.2 11.08V9.5C8.2 9.42 8.13 9.34 8.04 9.34H6.28C6.19 9.34 6.12 9.41 6.12 9.5V11.08C6.13 11.17 6.19 11.24 6.28 11.24M8.75 11.24H10.5C10.6 11.24 10.67 11.17 10.67 11.08V9.5C10.67 9.42 10.61 9.34 10.5 9.34H8.75C8.67 9.34 8.6 9.41 8.6 9.5V11.08C8.6 11.17 8.66 11.24 8.75 11.24M11.19 11.24H12.96C13.04 11.24 13.11 11.17 13.11 11.08V9.5C13.11 9.42 13.05 9.34 12.96 9.34H11.19C11.11 9.34 11.04 9.41 11.04 9.5V11.08C11.04 11.17 11.11 11.24 11.19 11.24M6.28 9H8.04C8.12 9 8.2 8.91 8.2 8.82V7.25C8.2 7.16 8.13 7.09 8.04 7.09H6.28C6.19 7.09 6.12 7.15 6.12 7.25V8.82C6.13 8.91 6.19 9 6.28 9M8.75 9H10.5C10.6 9 10.67 8.91 10.67 8.82V7.25C10.67 7.16 10.61 7.09 10.5 7.09H8.75C8.67 7.09 8.6 7.15 8.6 7.25V8.82C8.6 8.91 8.66 9 8.75 9M11.19 9H12.96C13.04 9 13.11 8.91 13.11 8.82V7.25C13.11 7.16 13.04 7.09 12.96 7.09H11.19C11.11 7.09 11.04 7.15 11.04 7.25V8.82C11.04 8.91 11.11 9 11.19 9M11.19 6.72H12.96C13.04 6.72 13.11 6.65 13.11 6.56V5C13.11 4.9 13.04 4.83 12.96 4.83H11.19C11.11 4.83 11.04 4.89 11.04 5V6.56C11.04 6.64 11.11 6.72 11.19 6.72M13.65 11.24H15.41C15.5 11.24 15.57 11.17 15.57 11.08V9.5C15.57 9.42 15.5 9.34 15.41 9.34H13.65C13.57 9.34 13.5 9.41 13.5 9.5V11.08C13.5 11.17 13.57 11.24 13.65 11.24`,ft=`M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M12,4A6,6 0 0,0 6,10C6,13.31 8.69,16 12.1,16L11.22,13.77C10.95,13.29 11.11,12.68 11.59,12.4L12.45,11.9C12.93,11.63 13.54,11.79 13.82,12.27L15.74,14.69C17.12,13.59 18,11.9 18,10A6,6 0 0,0 12,4M12,9A1,1 0 0,1 13,10A1,1 0 0,1 12,11A1,1 0 0,1 11,10A1,1 0 0,1 12,9M7,18A1,1 0 0,0 6,19A1,1 0 0,0 7,20A1,1 0 0,0 8,19A1,1 0 0,0 7,18M12.09,13.27L14.58,19.58L17.17,18.08L12.95,12.77L12.09,13.27Z`,pt=`M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13`,mt=`M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z`,ht=`M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z`,gt=`M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3`,_t=`M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z`;function X(e,t=20,n=`icon`){return A`
    <svg
      class="${n}"
      style="width: ${t}px; height: ${t}px;"
      viewBox="0 0 24 24"
    >
      <path d="${e}" fill="currentColor"></path>
    </svg>
  `}var Z=class extends I{static styles=ze;static editorTag=``;static async getConfigElement(){return document.createElement(this.editorTag)}static async getStubConfig(e){let t={type:`custom:${this.editorTag.replace(/-editor$/,``)}`};if(e){let n=await Ge(e),r=Ye(n,`synology_dsm`),i=Ye(n,`qnap`);r.length+i.length===1&&(t.server=(r[0]??i[0]).id,i.length&&(t.nas_source=`qnap`))}return t}static properties={hass:{attribute:!1},config:{attribute:!1},registries:{state:!0},registryError:{state:!0},actionError:{state:!0}};registryKey;requestVersion=0;watchedConfig;watchedRegistries;watchedEntities=[];renderedStates=new Map;constructor(){super(),this.config={type:``},this.registries={devices:{},entities:{}},this.registryError=``,this.actionError=``}shouldUpdate(e){if(e.size!==1||!e.has(`hass`))return!0;let t=e.get(`hass`);if(!t||!this.hass||(t.connection??t.callWS)!==(this.hass.connection??this.hass.callWS)||B(this.config)&&!this.hass.callWS&&(t.devices!==this.hass.devices||t.entities!==this.hass.entities))return!0;let n=B(this.config)?He(this.hass):void 0;return n&&n!==this.registries?!0:(this.updateWatchedEntities(),this.watchedEntities.some(e=>this.renderedStates.get(e)!==this.hass.states[e]))}updateWatchedEntities(){if(this.watchedConfig!==this.config||this.watchedRegistries!==this.registries){let e=this.getActiveDevice()?.id,t=this.config.type.includes(`docker`)||this.config.type.includes(`dashboard`)?z(this.config):`disabled`,n=t===`portainer`?this.config.portainer_endpoint:void 0,r=new Set(Object.values(this.config.entities??{}));if(R(this.config)===`manual`)for(let e of[...this.config.volumes??[],...this.config.drives??[]])for(let[t,n]of Object.entries(e))t.endsWith(`_entity`)&&n&&r.add(n);if(t===`manual`)for(let e of this.config.containers??[])for(let[t,n]of Object.entries(e))t.endsWith(`_entity`)&&n&&r.add(n);for(let t of Object.values(this.registries.entities)){let i=t.device_id?this.registries.devices[t.device_id]:void 0;(e&&t.platform===R(this.config)&&Ke(i,e,this.registries.devices)||n&&t.platform===`portainer`&&Ke(i,n,this.registries.devices))&&r.add(t.entity_id)}this.watchedEntities=[...r],this.watchedConfig=this.config,this.watchedRegistries=this.registries}}updated(e){super.updated(e),this.updateWatchedEntities(),this.renderedStates=new Map(this.watchedEntities.map(e=>[e,this.hass?.states[e]]))}willUpdate(e){if(super.willUpdate(e),this.toggleAttribute(`embedded`,!!this.config.embedded),(e.has(`hass`)||e.has(`config`))&&this.hass){if(!B(this.config)){this.requestVersion++,this.registryKey=void 0,this.registryError=``;return}let e=this.hass.connection??this.hass.callWS??this.hass;if(!this.hass.callWS)this.registries={devices:this.hass.devices??{},entities:this.hass.entities??{}};else if(e!==this.registryKey)this.registryKey=e,this.refreshRegistries();else{let e=He(this.hass);e&&(this.registries=e)}}}async refreshRegistries(e=!1){if(!this.hass)return;let t=++this.requestVersion;this.registryError=``;try{let n=await Ge(this.hass,e);t===this.requestVersion&&(this.registries=n)}catch(e){t===this.requestVersion&&(this.registryError=`Cannot load Home Assistant registries: ${e instanceof Error?e.message:String(e)}`)}}setConfig(e){if(!e||typeof e.type!=`string`)throw Error(`Invalid card configuration`);if(e.nas_source!==void 0&&!Object.hasOwn(L,e.nas_source))throw Error(`NAS source must be synology_dsm, qnap or manual`);if(e.server!==void 0&&typeof e.server!=`string`)throw Error(`Select a NAS device registry ID`);for(let t of[`name`,`network_interface`,`management_url`])if(e[t]!==void 0&&typeof e[t]!=`string`)throw Error(`${t} must be a string`);if(e.management_url&&!ot(e.management_url))throw Error(`NAS management URL must use HTTP or HTTPS`);for(let t of[`volumes`,`drives`]){let n=e[t];if(n!==void 0){if(!Array.isArray(n))throw Error(`Manual ${t} must be a list`);for(let e of n){if(!e||typeof e!=`object`||Array.isArray(e))throw Error(`Each manual ${t} entry must be an entity mapping`);for(let[n,r]of Object.entries(e)){if(typeof r!=`string`)throw Error(`Manual ${t} ${n} must be a string`);let e=[`bad_sectors_entity`,`remaining_life_entity`].includes(n)?`binary_sensor`:`sensor`;if(n.endsWith(`_entity`)&&r&&!RegExp(`^${e}\\.[a-z0-9_]+$`).test(r))throw Error(`Unsupported entity for ${t} ${n}: ${r}`)}}}}if(e.portainer_endpoint!==void 0&&typeof e.portainer_endpoint!=`string`)throw Error(`Select a Portainer endpoint device registry ID`);if(e.view_mode!==void 0&&![`grid`,`list`].includes(e.view_mode))throw Error(`Container layout must be grid or list`);if(e.container_source!==void 0&&![`disabled`,`portainer`,`manual`].includes(e.container_source))throw Error(`Container source must be disabled, portainer or manual`);if(e.containers!==void 0){if(!Array.isArray(e.containers))throw Error(`Manual containers must be a list`);let t={status_entity:[`sensor`,`binary_sensor`,`switch`,`input_boolean`],cpu_entity:[`sensor`],memory_entity:[`sensor`],power_entity:[`switch`],start_entity:[`button`,`input_button`,`script`],stop_entity:[`button`,`input_button`,`script`],restart_entity:[`button`,`input_button`,`script`]};for(let n of e.containers){if(!n||typeof n!=`object`||typeof n.status_entity!=`string`)throw Error(`Each manual container needs a status entity`);for(let[e,r]of Object.entries(n)){if(typeof r!=`string`)throw Error(`Container ${e} must be a string`);if(r&&t[e]&&(!/^[a-z_]+\.[a-z0-9_]+$/.test(r)||!t[e].includes(r.split(`.`)[0])))throw Error(`Unsupported entity for container ${e}: ${r}`)}let e=Re(n);if(e.running===e.stopped)throw Error(`Running and stopped states must be different`)}}if(e.entities&&Object.values(e.entities).some(e=>typeof e!=`string`))throw Error(`Entity mappings must contain entity ID strings`);if(e.tabs&&(!Array.isArray(e.tabs)||e.tabs.some(e=>![`overview`,`storage`,`docker`].includes(e))))throw Error(`Invalid dashboard tabs`);this.config={...e},this.toggleAttribute(`embedded`,!!e.embedded)}getCardSize(){return 4}getGridOptions(){return{columns:`full`,rows:`auto`,min_columns:3}}getActiveDevice(){return W(this.config,this.registries)}getEntity(e,t){return nt(this.hass,this.config,this.registries,e,t)}openMoreInfo(e){Be(this,`hass-more-info`,{entityId:e})}async runAction(e,t,n){if(this.actionError=``,!this.hass){this.actionError=`Home Assistant is not connected.`;return}let r=this.hass.states[n];if(!r||r.state===`unavailable`||![`button`,`input_button`,`script`].includes(e)&&r.state===`unknown`){this.actionError=`Cannot ${t}: ${n} is unavailable.`;return}try{await this.hass.callService(e,t,{entity_id:n})}catch(e){this.actionError=`${t} failed: ${e instanceof Error?e.message:String(e)}`}}pressButton(e){return this.runAction(`button`,`press`,e)}renderNotice(e){return A`<div class="empty-state">${e}</div>`}renderErrors(){return A`${this.registryError?A`<div role="alert" class="empty-state">${this.registryError} <button class="btn" @click=${()=>this.refreshRegistries(!0)}>Retry</button></div>`:M}
      ${this.actionError?A`<div role="alert" class="empty-state">${this.actionError}</div>`:M}`}renderHeader(e,t,n,r){return this.config.embedded||this.config.hide_header?M:A`<div class="header"><div class="header-main">
      <div class="header-icon">${X(n,22)}</div>
      <div class="header-titles"><span class="header-title">${e}</span><span class="header-subtitle">${t}</span></div>
    </div>${r?A`<div class="header-actions">${r}</div>`:M}</div>`}},Q={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},vt=e=>(...t)=>({_$litDirective$:e,values:t}),yt=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:bt}=Te,xt=e=>e.strings===void 0,St={},Ct=(e,t=St)=>e._$AH=t,$=vt(class extends yt{constructor(e){if(super(e),e.type!==Q.PROPERTY&&e.type!==Q.ATTRIBUTE&&e.type!==Q.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!xt(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===j||t===M)return t;let n=e.element,r=e.name;if(e.type===Q.PROPERTY){if(t===n[r])return j}else if(e.type===Q.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return j}else if(e.type===Q.ATTRIBUTE&&n.getAttribute(r)===t+``)return j;return Ct(e),t}}),wt={cpu_usage:`CPU utilization (%)`,ram_usage:`Memory utilization (%)`,system_temperature:`System temperature`,uptime:`Uptime / up since`,memory_total_real:`Total RAM`,memory_available_real:`Available RAM`,memory_used:`Used RAM`,storage_usage:`Storage utilization (%) override`,security_status:`Security Advisor (on = attention)`,network_rx:`Download rate`,network_tx:`Upload rate`,system_status:`System status (shown as reported)`,model:`NAS model`,software_version:`Firmware version`},Tt={overview:`Overview`,storage:`Storage & Disks`,docker:`Docker`},Et=class extends I{static properties={hass:{attribute:!1},_config:{state:!0},registries:{state:!0},error:{state:!0},loading:{state:!0}};registryKey;requestVersion=0;static styles=o`
    .card-config { display:flex;flex-direction:column;gap:14px;padding:8px 0;color:var(--primary-text-color); }
    label { display:flex;flex-direction:column;gap:6px;font-size:.85rem; }
    select, input[type=text] { padding:8px 12px;border-radius:6px;border:1px solid var(--divider-color);
      background:var(--card-background-color);color:var(--primary-text-color);font:inherit;max-width:100%; }
    .checkbox-row { flex-direction:row;align-items:center;gap:10px; }
    input[type=checkbox] { accent-color:#0086d6; }
    p { font-size:.8rem;color:var(--secondary-text-color);margin:0; }
    details { display:flex;flex-direction:column; } details label { margin-top:10px; }
    fieldset { min-width:0;border:1px solid var(--divider-color);border-radius:6px;padding:12px;display:flex;flex-direction:column;gap:10px; }
    a { color:var(--primary-color,#0086d6); }
  `;constructor(){super(),this.registries={devices:{},entities:{}},this.error=``,this.loading=!1}willUpdate(e){if((e.has(`hass`)||e.has(`_config`))&&this.hass&&this._config){if(!B(this._config)){this.requestVersion++,this.registryKey=void 0,this.loading=!1,this.error=``;return}let e=this.hass.connection??this.hass.callWS??this.hass;if(!this.hass.callWS)this.registries={devices:this.hass.devices??{},entities:this.hass.entities??{}};else if(e!==this.registryKey)this.registryKey=e,this.load();else{let e=He(this.hass);e&&(this.registries=e)}}}async load(e=!1){if(!this.hass)return;let t=++this.requestVersion;this.error=``,this.loading=!0;try{let n=await Ge(this.hass,e);t===this.requestVersion&&(this.registries=n)}catch(e){t===this.requestVersion&&(this.error=`Registry discovery failed: ${e instanceof Error?e.message:String(e)}`)}finally{t===this.requestVersion&&(this.loading=!1)}}setConfig(e){this._config={...e}}shouldUpdate(e){if(e.size!==1||!e.has(`hass`))return!0;let t=e.get(`hass`);if(!t||!this.hass||(t.connection??t.callWS)!==(this.hass.connection??this.hass.callWS))return!0;if(!this._config||!B(this._config))return!1;if(!this.hass.callWS)return t.devices!==this.hass.devices||t.entities!==this.hass.entities;let n=He(this.hass);return!!n&&n!==this.registries}changed(e,t){this._config&&(this._config={...this._config,[e]:t},Be(this,`config-changed`,{config:this._config}))}mappingChanged(e,t){let n={...this._config?.entities};t?n[e]=t:delete n[e],this.changed(`entities`,n)}nasSourceChanged(e){if(!this._config||e===R(this._config))return;let t={...this._config,nas_source:e};for(let e of[`server`,`network_interface`,`entities`,`volumes`,`drives`,`management_url`,`name`])delete t[e];this._config=t,Be(this,`config-changed`,{config:t})}storageMappingChanged(e,t,n,r){let i=[...this._config?.[e]??[]];i[t]={...i[t],[n]:r},this.changed(e,i)}renderManualStorage(e){let t=e===`volumes`?`Volume`:`Drive`,n=e===`volumes`?[[`usage_entity`,`Usage (%)`],[`total_entity`,`Total capacity`],[`used_entity`,`Used capacity`],[`status_entity`,`Volume status`],[`temperature_entity`,`Average drive temperature`]]:[[`status_entity`,`Drive status`],[`smart_entity`,`SMART status`],[`temperature_entity`,`Drive temperature`],[`model_entity`,`Drive model`],[`bad_sectors_entity`,`Bad-sector threshold (on = exceeded)`],[`remaining_life_entity`,`Remaining-life threshold (on = below threshold)`]];return A`<details><summary>Manual ${e}</summary>
      <p>Add ${e} and select their entities. All fields are optional; unmapped readings stay hidden.
        Capacity entities must report bytes or a byte-size unit. Storage totals require used and total capacity for every volume.</p>
      ${(this._config?.[e]??[]).map((r,i)=>A`<fieldset><legend>${t} ${i+1}</legend>
        <label>${t} name (optional)<input type="text" .value=${$(r.name||``)}
          @input=${t=>this.storageMappingChanged(e,i,`name`,t.target.value)}></label>
        ${n.map(([t,n])=>A`<label>${n}<ha-entity-picker .hass=${this.hass}
          .label=${n} .value=${r[t]||``}
          .includeDomains=${[[`bad_sectors_entity`,`remaining_life_entity`].includes(t)?`binary_sensor`:`sensor`]}
          .allowCustomEntity=${!0}
          @value-changed=${n=>this.storageMappingChanged(e,i,t,n.detail.value||``)}></ha-entity-picker></label>`)}
        <button @click=${()=>this.changed(e,this._config[e].filter((e,t)=>t!==i))}>Remove ${t.toLowerCase()} ${i+1}</button>
      </fieldset>`)}
      <button @click=${()=>this.changed(e,[...this._config?.[e]??[],{}])}>Add ${t.toLowerCase()}</button>
    </details>`}containerChanged(e,t,n){let r=[...this._config?.containers??[]];r[e]={...r[e],[t]:n},this.changed(`containers`,r)}renderManualContainers(){let e=[[`status_entity`,`Status entity (required)`,[`sensor`,`binary_sensor`,`switch`,`input_boolean`]],[`cpu_entity`,`CPU utilization entity (%)`,[`sensor`]],[`memory_entity`,`Memory usage entity (bytes, kB, MB, GB, etc.)`,[`sensor`]],[`power_entity`,`Start/stop switch (optional)`,[`switch`]],[`start_entity`,`Start action entity (optional)`,[`button`,`input_button`,`script`]],[`stop_entity`,`Stop action entity (optional)`,[`button`,`input_button`,`script`]],[`restart_entity`,`Restart action entity (optional)`,[`button`,`input_button`,`script`]]];return A`<p>Choose entities exposed by your container integration. Only status is required.
      Optional controls must target this container; separate start/stop actions take precedence over its switch.
      Unknown or transitional states never enable start/stop.</p>
      ${(this._config?.containers??[]).map((t,n)=>A`<fieldset>
        <legend>Container ${n+1}</legend>
        <label>Name (optional)<input type="text" .value=${$(t.name||``)}
          @input=${e=>this.containerChanged(n,`name`,e.target.value)}></label>
        ${e.map(([e,r,i])=>A`<label>${r}<ha-entity-picker .hass=${this.hass}
          .label=${r} .value=${t[e]||``} .includeDomains=${i} .allowCustomEntity=${!0}
          @value-changed=${t=>this.containerChanged(n,e,t.detail.value||``)}></ha-entity-picker></label>`)}
        <label>Running state<input type="text" placeholder="on for binary/switch; running for sensors"
          .value=${$(t.running_state||``)}
          @input=${e=>this.containerChanged(n,`running_state`,e.target.value)}></label>
        <label>Stopped state<input type="text" placeholder="off for binary/switch; exited for sensors"
          .value=${$(t.stopped_state||``)}
          @input=${e=>this.containerChanged(n,`stopped_state`,e.target.value)}></label>
        <button @click=${()=>this.changed(`containers`,this._config.containers.filter((e,t)=>t!==n))}>Remove container ${n+1}</button>
      </fieldset>`)}
      <button @click=${()=>this.changed(`containers`,[...this._config?.containers??[],{status_entity:``}])}>Add container</button>`}render(){if(!this._config)return A``;let e=this._config,t=R(e),n=Ye(this.registries,t),r=t===`synology_dsm`?`Synology NAS`:`QNAP NAS`,i=Xe(this.registries),a=e.type.includes(`dashboard`),o=e.type.includes(`docker`),s=z(e),c=(a||o)&&s!==`disabled`,l=Object.entries(Tt).filter(([e])=>s!==`disabled`||e!==`docker`),u=a||e.type.includes(`server`)?Object.entries(wt).filter(([e])=>t===`synology_dsm`?![`system_status`,`memory_used`].includes(e):e!==`security_status`):[],d=t===`qnap`?tt(this.registries,W(e,this.registries)?.id,`network`):[];return A`<div class="card-config">
      ${this.error?A`<div role="alert">${this.error}</div>`:M}
      ${o?M:A`<label>NAS system<select aria-label="NAS system" .value=${$(t)}
        @change=${e=>this.nasSourceChanged(e.target.value)}>
        ${Object.entries(L).map(([e,n])=>A`<option value=${e} ?selected=${t===e}>${n}</option>`)}
      </select></label>
      <p>Changing NAS system clears NAS/device, overview and storage mappings to prevent mixing servers. Container settings and layout are kept.</p>
      ${t===`manual`?A`
        <label>NAS name (optional)<input type="text" .value=${$(e.name||``)}
          @input=${e=>this.changed(`name`,e.target.value)}></label>
        <label>NAS management URL (optional)<input type="text" placeholder="https://nas.example"
          .value=${$(e.management_url||``)}
          @change=${e=>this.changed(`management_url`,e.target.value)}></label>
        <p>Pick entities exposed by any Home Assistant integration. No device selection or name matching is required.</p>`:A`<label>${r}<select aria-label=${r} ?disabled=${this.loading} .value=${$(e.server||``)}
        @change=${t=>{let n={...e,server:t.target.value};delete n.network_interface,this._config=n,Be(this,`config-changed`,{config:n})}}>
        <option value="">${this.loading?`Loading NAS devices...`:n.length===1?`Auto: ${n[0].name}`:`Select a ${L[t]} NAS`}</option>
        ${n.map(t=>A`<option value=${t.id} ?selected=${e.server===t.id}>${t.name_by_user||t.name}</option>`)}
        ${e.server&&!n.some(t=>t.id===e.server)?A`<option value=${e.server} selected>Unavailable: ${e.server}</option>`:M}
      </select></label>
      ${!this.loading&&!this.error&&!n.length?A`<p>No ${L[t]} NAS found. Configure the
        <a href=${`https://www.home-assistant.io/integrations/${t}/`} target="_blank" rel="noopener noreferrer">${L[t]} integration</a>
        and refresh entity discovery.</p>`:M}`}
      ${t===`qnap`&&u.length?A`<label>Network interface<select aria-label="Network interface" .value=${$(e.network_interface||``)}
        @change=${e=>this.changed(`network_interface`,e.target.value)}>
        <option value="">${d.length===1?`Auto: ${d[0].id}`:`Select explicitly when more than one interface exists`}</option>
        ${d.map(t=>A`<option value=${t.id} ?selected=${e.network_interface===t.id}>${t.id}</option>`)}
        ${e.network_interface&&!d.some(t=>t.id===e.network_interface)?A`<option value=${e.network_interface} selected>Unavailable: ${e.network_interface}</option>`:M}
      </select></label><p>QNAP exposes per-interface traffic; interfaces are not summed to avoid double-counting bonds.
        Enable optional QNAP capacity, uptime, drive and network entities if needed.</p>`:M}
      ${t===`manual`?A`${this.renderManualStorage(`volumes`)}
        ${a||e.type.includes(`storage`)?this.renderManualStorage(`drives`):M}`:M}
      `}
      ${a||o?A`<label>Container source<select aria-label="Container source" .value=${$(s)}
        @change=${e=>this.changed(`container_source`,e.target.value)}>
        <option value="disabled" ?selected=${s===`disabled`}>Disabled</option>
        <option value="portainer" ?selected=${s===`portainer`}>Portainer (automatic discovery)</option>
        <option value="manual" ?selected=${s===`manual`}>Manual entities (any container integration)</option>
      </select></label>`:M}
      ${c&&s===`portainer`?A`<label>Portainer endpoint<select aria-label="Portainer endpoint" ?disabled=${this.loading} .value=${$(e.portainer_endpoint||``)}
        @change=${e=>this.changed(`portainer_endpoint`,e.target.value)}>
        <option value="">Select explicitly (required for Docker)</option>
        ${i.map(t=>A`<option value=${t.id} ?selected=${e.portainer_endpoint===t.id}>${t.name_by_user||t.name}</option>`)}
        ${e.portainer_endpoint&&!i.some(t=>t.id===e.portainer_endpoint)?A`<option value=${e.portainer_endpoint} selected>Unavailable: ${e.portainer_endpoint}</option>`:M}
      </select></label><p>Select the endpoint for the intended NAS. Only its descendant container devices are included, including containers nested in stacks.</p>
      ${!this.loading&&!i.length?A`<p>No Portainer endpoints found. Configure the
        <a href="https://www.home-assistant.io/integrations/portainer/" target="_blank" rel="noopener noreferrer">Home Assistant Portainer integration</a>,
        enable its entities and refresh discovery, or choose Manual entities.</p>`:M}`:M}
      ${c&&s===`manual`?this.renderManualContainers():M}
      <label>Custom title<input type="text" .value=${e.title||``} @input=${e=>this.changed(`title`,e.target.value)}></label>
      ${c?A`<label>Container layout<select aria-label="Container layout" .value=${e.view_mode||`grid`} @change=${e=>this.changed(`view_mode`,e.target.value)}>
        <option value="grid" ?selected=${e.view_mode!==`list`}>Grid</option><option value="list" ?selected=${e.view_mode===`list`}>List (CPU / memory details)</option></select></label>`:M}
      ${a||e.type.includes(`server`)?A`<label class="checkbox-row"><input type="checkbox" .checked=${e.show_system_info!==!1}
        @change=${e=>this.changed(`show_system_info`,e.target.checked)}>Show system details</label>`:M}
      ${a?A`<details><summary>Visible dashboard tabs</summary>
        ${l.map(([t,n])=>A`<label class="checkbox-row"><input type="checkbox" .checked=${(e.tabs??l.map(([e])=>e)).includes(t)}
          @change=${n=>{let r=new Set(e.tabs??l.map(([e])=>e));n.target.checked?r.add(t):r.delete(t),this.changed(`tabs`,l.map(([e])=>e).filter(e=>r.has(e)))}}>${n}</label>`)}
      </details>`:M}
      ${u.length?A`<details ?open=${t===`manual`}><summary>${t===`manual`?`Overview entity mappings`:`Entity mappings (optional)`}</summary>
        <p>${t===`manual`?`Select only the readings you want to display. Unmapped readings stay hidden. CPU and usage must be percentages; capacity must use byte-size units. Uptime accepts a timestamp or a duration in s/min/h/d.`:`Blank uses device-scoped NAS discovery. Overrides are explicit and may reference any entity you choose.`}</p>
        ${u.map(([t,n])=>A`<label>${n}<ha-entity-picker .hass=${this.hass}
          .label=${n} .value=${e.entities?.[t]||``} .includeDomains=${[t===`security_status`?`binary_sensor`:`sensor`]} .allowCustomEntity=${!0}
          @value-changed=${e=>this.mappingChanged(t,e.detail.value||``)}></ha-entity-picker></label>`)}
      </details>`:M}
      ${B(e)?A`<button ?disabled=${this.loading} @click=${()=>this.load(!0)}>${this.loading?`Loading device discovery...`:`Refresh entity discovery`}</button>`:M}
    </div>`}},Dt=class extends Et{},Ot=class extends Et{},kt=class extends Et{},At=class extends Et{};function jt(e,t){if(!customElements.get(e))try{customElements.define(e,t)}catch(n){if(n instanceof Error&&(n.name===`NotSupportedError`||n.message.includes(`already been registered`))){class n extends t{}customElements.define(e,n)}else throw n}}function Mt(e){jt(e.tag,e.card),jt(e.editorTag,e.editor),window.customCards??=[],window.customCards.some(t=>t.type===e.tag)||window.customCards.push({type:e.tag,name:e.name,description:e.description,preview:!0,documentationURL:`https://github.com/snfx-johaver/SNFX-Synology-cards`})}function Nt(e){if(!G(e))return`Unavailable`;let t=e.state.trim(),n={ms:.001,s:1,min:60,h:3600,d:86400},r=e.attributes.unit_of_measurement,i=r===void 0?1:typeof r==`string`?n[r]:void 0,a=/^\d+(\.\d+)?$/.test(t)?i===void 0?NaN:Number(t)*i:(Date.now()-Date.parse(t))/1e3;if(!Number.isFinite(a)||a<0)return`Unavailable`;let o=Math.floor(a/86400),s=Math.floor(a%86400/3600),c=Math.floor(a%3600/60);return o?`${o}d ${s}h`:s?`${s}h ${c}m`:`${c}m`}Mt({tag:Ae,editorTag:je,card:class extends Z{static editorTag=je;ring(e,t,n,r,i=0){return A`<div class="ring-card" role=${r?`button`:`none`} tabindex=${r?`0`:`-1`}
      @click=${()=>r&&this.openMoreInfo(r.entity_id)}
      @keydown=${e=>{r&&[`Enter`,` `].includes(e.key)&&(e.preventDefault(),this.openMoreInfo(r.entity_id))}}>
      <div class="ring-gauge" style="--pct: ${t??0}; --ring-color: ${t===void 0?`var(--synology-border)`:t>85?`var(--synology-warning)`:`var(--synology-accent)`}">
        <span class="ring-content">${t===void 0?`--`:`${t.toFixed(i)}%`}</span>
      </div><span class="ring-label">${e}</span><span class="ring-subtext">${n}</span>
    </div>`}detail(e,t,n){return A`<div class="detail-item" role=${n?`button`:`none`} tabindex=${n?`0`:`-1`}
      @click=${()=>n&&this.openMoreInfo(n.entity_id)}
      @keydown=${e=>{n&&[`Enter`,` `].includes(e.key)&&(e.preventDefault(),this.openMoreInfo(n.entity_id))}}><span class="detail-label">${e}</span><span class="detail-val">${t}</span></div>`}render(){let e=R(this.config),t=e===`synology_dsm`,n=e===`manual`,r=this.getActiveDevice(),i=(e,n)=>t||!!n||!!this.config.entities?.[e],a=(e,t=0)=>n&&e?.attributes.unit_of_measurement!==`%`?void 0:rt(e,t),o=this.getEntity(`cpu_usage`,`sensor`),s=this.getEntity(`ram_usage`,`sensor`),c=this.getEntity(`system_temperature`,`sensor`),l=this.getEntity(`uptime`,`sensor`),u=this.getEntity(`security_status`,`binary_sensor`),d=this.getEntity(`system_status`,`sensor`),f=this.getEntity(`model`,`sensor`),p=this.getEntity(`software_version`,`sensor`),ee=this.getEntity(`memory_total_real`,`sensor`),m=this.getEntity(`memory_available_real`,`sensor`),h=this.getEntity(`memory_used`,`sensor`),te=this.getEntity(`network_rx`),ne=this.getEntity(`network_tx`),g=J(ee),_=J(m),v=h||this.config.entities?.memory_used?J(h):g!==void 0&&_!==void 0?Math.max(0,g-_):void 0,re=i(`ram_usage`,s)||[`memory_total_real`,`memory_available_real`,`memory_used`].some(e=>this.config.entities?.[e]),y=n&&!this.config.entities?.ram_usage&&g!==void 0&&g>0&&v!==void 0?Math.round(Math.max(0,Math.min(100,v/g*100))):a(s),ie=g!==void 0&&v!==void 0?`${Y(v)} / ${Y(g)}`:t?`Enable total/free memory sensors for capacity`:[g===void 0?``:`Total: ${Y(g)}`,_===void 0?``:`Free: ${Y(_)}`,v===void 0?``:`Used: ${Y(v)}`].filter(Boolean).join(` • `),b=ut(this.hass,this.config,this.registries),x=this.getEntity(`storage_usage`,`sensor`),ae=x||this.config.entities?.storage_usage?a(x):b.percent,S=G(u)?u.state===`off`?`Safe`:`Attention needed`:`Unavailable`,C=ot(this.config.management_url||r?.configuration_url),w=this.config.entities?.model?G(f)?f.state:`Unavailable`:r?.model,oe=this.config.entities?.software_version?G(p)?p.state:`Unavailable`:r?.sw_version,T=t||!!x||!!this.config.entities?.storage_usage||ct(this.hass,this.config,this.registries).some(e=>e.total||e.used)||n&&this.config.volumes?.some(e=>e.total_entity||e.used_entity);return A`<ha-card>
      ${this.renderHeader(this.config.title||this.config.name||r?.name_by_user||r?.name||(t?`Synology NAS`:e===`qnap`?`QNAP NAS`:`NAS`),[w||(t?`DSM`:e===`qnap`?`QNAP`:`Manual entities`),i(`uptime`,l)?`Up ${Nt(l)}`:``].filter(Boolean).join(` • `),ht,t?A`<span class="badge ${G(u)?u.state===`off`?`badge-online`:`badge-warning`:`badge-standby`}">Security: ${S}</span>`:i(`system_status`,d)?A`<span class="badge badge-standby">Status: ${q(d)}</span>`:void 0)}
      ${this.renderErrors()}
      ${!n&&!r?this.renderNotice(`Select your ${t?`Synology DSM`:`QNAP`} NAS in the card editor. No cross-server entity matching is performed.`):M}
      ${n&&!Object.values(this.config.entities??{}).some(Boolean)?this.renderNotice(`Choose overview entities in the card editor. No NAS device or automatic entity matching is required in manual mode.`):M}
      <div class="rings-grid">
        ${i(`cpu_usage`,o)?this.ring(`CPU Load`,a(o,2),i(`system_temperature`,c)?`System: ${q(c)}`:``,o,2):M}
        ${re?this.ring(`Memory`,y,ie,s??h??ee??m):M}
        ${T?this.ring(`Volume Storage`,ae,b.total===void 0?t?`Enable every volume's total-size sensor`:``:`${Y(b.used)} / ${Y(b.total)}`,x):M}
      </div>
      ${this.config.show_system_info===!1?M:A`<div class="divider"></div><div class="detail-grid">
        ${t||w||this.config.entities?.model?this.detail(`NAS Model`,w||`Unavailable`,f):M}
        ${t||oe||this.config.entities?.software_version?this.detail(t?`DSM Version`:`Firmware Version`,oe||`Unavailable`,p):M}
        ${i(`uptime`,l)?this.detail(`System Uptime`,Nt(l),l):M}
        ${i(`system_temperature`,c)?this.detail(`System Temperature`,q(c),c):M}
        ${i(`network_rx`,te)?this.detail(`Download`,at(te),te):M}
        ${i(`network_tx`,ne)?this.detail(`Upload`,at(ne),ne):M}
        ${t?this.detail(`Security Advisor`,S,u):i(`system_status`,d)?this.detail(`System Status`,q(d),d):M}
        ${C?A`<div class="detail-item"><span class="detail-label">${t?`DSM Management`:`NAS Management`}</span><a class="detail-val" href=${C} target="_blank" rel="noreferrer" style="color:var(--synology-accent)">${t?`Open DSM`:`Open NAS`}</a></div>`:M}
      </div>`}
    </ha-card>`}},editor:Dt,name:`NAS Server Overview Card`,description:`Synology DSM, QNAP or manually mapped CPU, memory, storage and system readings.`}),Mt({tag:Me,editorTag:Ne,card:class extends Z{static editorTag=Ne;render(){let e=ct(this.hass,this.config,this.registries),t=ut(this.hass,this.config,this.registries),n=lt(this.hass,this.config,this.registries),r=R(this.config)===`synology_dsm`,i=r||e.some(e=>e.total||e.used)||R(this.config)===`manual`&&!!this.config.volumes?.some(e=>e.total_entity||e.used_entity);return A`<ha-card>
      ${this.renderHeader(this.config.title||`Storage Volumes & Disks`,i?`${Y(t.used)} used of ${Y(t.total)}`:``,ft,A`<span class="badge badge-standby">${e.length} Volumes • ${n.length} Drives</span>`)}
      ${this.renderErrors()}
      ${i?A`<div style="display:flex;flex-direction:column;gap:4px">
        <div style="display:flex;justify-content:space-between;font-size:.76rem;font-weight:600"><span>Total Volume Capacity</span><span>${t.percent===void 0?`Unavailable`:`${t.percent}%`}</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,t.percent??0)}%"></div></div>
      </div>`:M}
      <div class="item-list">${e.map((e,t)=>{let n=J(e.total),i=J(e.used),a=R(this.config)===`manual`?this.config.volumes?.[t]:void 0,o=a&&e.usage?.attributes.unit_of_measurement!==`%`?void 0:rt(e.usage),s=e.usage||a?.usage_entity?o:n!==void 0&&i!==void 0&&n>0?Math.round(Math.min(100,i/n*100)):void 0,c=r||e.total||e.used||a?.total_entity||a?.used_entity,l=r||e.usage||a?.usage_entity||n!==void 0&&i!==void 0,u=e.usage??e.total??e.used??e.status,d=G(e.status)?e.status.state:`Unavailable`,f=[`normal`,`healthy`].includes(d.toLowerCase()),p=a?[`warning`,`bad`,`failed`,`critical`,`faulty`,`degraded`].includes(d.toLowerCase()):!f;return A`<div class="list-row" style="flex-direction:column;align-items:stretch;gap:8px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <button class="btn" ?disabled=${!u} @click=${()=>u&&this.openMoreInfo(u.entity_id)}>${X(ft,16)} ${e.device.name_by_user||e.device.name}</button>
            ${r||e.status||a?.status_entity?A`<span class="badge ${G(e.status)?f?`badge-online`:p?`badge-warning`:`badge-standby`:`badge-standby`}">${d}</span>`:M}
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.75rem">${c?A`<span>${Y(i)} / ${Y(n)}</span>`:M}${l?A`<span>${s===void 0?`--`:`${s}%`}</span>`:M}</div>
          ${l?A`<div class="progress-bar"><div class="progress-fill" style="width:${s??0}%"></div></div>`:M}
          <div style="font-size:.72rem;color:var(--synology-subtext)">${n!==void 0&&i!==void 0?`${Y(Math.max(0,n-i))} free`:``}
            ${r||e.temperature||a?.temperature_entity?A` • Average drive temperature: ${q(e.temperature)}`:M}</div>
          ${a&&!Object.entries(a).some(([e,t])=>e.endsWith(`_entity`)&&t)?A`<span>Choose this volume's entities in the card editor.</span>`:M}
        </div>`})}</div>
      ${n.length?A`<div class="divider"></div><div class="section-title">Physical Drives</div>`:M}
      <div class="item-list">${n.map((e,t)=>{let{status:n,smart:i,temperature:a,badSectors:o,remainingLife:s}=e,c=R(this.config)===`manual`?this.config.drives?.[t]:void 0,l=[n,i].filter(e=>G(e)),u=l.length>0&&l.every(e=>[`normal`,`healthy`,`good`].includes(e.state.toLowerCase())),d=[o,s].some(e=>G(e)&&e.state===`on`)||l.some(e=>R(this.config)===`manual`?[`warning`,`bad`,`failed`,`critical`,`faulty`,`degraded`].includes(e.state.toLowerCase()):![`normal`,`healthy`,`good`].includes(e.state.toLowerCase())),f=G(n||i),p=n??i??a;return A`<div class="list-row" style="flex-direction:column;align-items:stretch;gap:10px">
          <div class="row-left" style="min-width:0">
            <div style="color:var(--synology-accent)">${X(ft,20)}</div>
            <div style="display:flex;flex-direction:column;min-width:0">
              <button class="btn" style="justify-content:flex-start;white-space:normal;text-align:left" ?disabled=${!p} @click=${()=>p&&this.openMoreInfo(p.entity_id)}>${e.name}</button>
              <span style="font-size:.7rem;color:var(--synology-subtext)">${e.model||``}</span>
            </div>
          </div>
          <div class="row-right" style="flex-wrap:wrap;justify-content:flex-start">
            ${r||a||c?.temperature_entity?A`<button class="btn" ?disabled=${!a} @click=${()=>a&&this.openMoreInfo(a.entity_id)}>${q(a)}</button>`:M}
            ${r||n||i||c?.status_entity||c?.smart_entity?A`<span class="badge ${f?d?`badge-warning`:u?`badge-online`:`badge-standby`:`badge-standby`}">${d?`Attention needed`:q(n??i)}</span>`:M}
            ${r||i||c?.smart_entity?A`<button class="btn" ?disabled=${!i} @click=${()=>i&&this.openMoreInfo(i.entity_id)}>SMART: ${q(i)}</button>`:M}
          </div>
          ${r||o||s||c?.bad_sectors_entity||c?.remaining_life_entity?A`<div style="width:100%;font-size:.72rem;color:var(--synology-subtext)">
            ${r||o||c?.bad_sectors_entity?A`Bad-sector threshold: ${G(o)?o.state===`on`?`Exceeded`:`Not exceeded`:`Unavailable`}`:M}
            ${r||s||c?.remaining_life_entity?A` • Remaining-life threshold: ${G(s)?s.state===`on`?`Below threshold`:`Not below threshold`:`Unavailable`}`:M}
          </div>`:M}
          ${c&&!Object.entries(c).some(([e,t])=>e.endsWith(`_entity`)&&t)?A`<span>Choose this drive's entities in the card editor.</span>`:M}
        </div>`})}</div>
      ${!e.length&&!n.length?this.renderNotice(R(this.config)===`manual`?`Add volumes or drives using entity pickers in the card editor.`:`No ${r?`DSM`:`QNAP`} volumes or drives found for the selected NAS. Enable its storage entities, then refresh discovery.`):M}
    </ha-card>`}},editor:Ot,name:`NAS Storage & Disks Card`,description:`Synology DSM, QNAP or manually mapped volumes, drive temperatures and SMART readings.`});var Pt=class extends Z{static editorTag=Fe;static properties={...Z.properties,_filter:{state:!0},_viewMode:{state:!0}};constructor(){super(),this._filter=`all`,this._viewMode=`grid`}willUpdate(e){super.willUpdate(e),e.has(`config`)&&e.get(`config`)?.view_mode!==this.config.view_mode&&(this._viewMode=this.config.view_mode||`grid`)}getManualContainers(){return(this.config.containers??[]).filter(e=>e.status_entity).map((e,t)=>{let n=this.hass?.states[e.status_entity],r=Re(e),i=this.hass?.states[e.cpu_entity??``],a=this.hass?.states[e.memory_entity??``],o=J(a);return{id:`manual-${t}`,name:e.name||String(n?.attributes.friendly_name||e.status_entity),statusEntityId:e.status_entity,status:G(n)?n.state:`Unavailable`,isRunning:G(n)&&n.state===r.running,isStopped:G(n)&&n.state===r.stopped,available:G(n),switchEntityId:e.power_entity,startEntityId:e.start_entity,stopEntityId:e.stop_entity,restartEntityId:e.restart_entity,cpuPct:i?.attributes.unit_of_measurement===`%`?K(i):void 0,memoryUsage:o===void 0?void 0:Y(o)}})}getContainers(){let e=z(this.config);if(e===`disabled`)return[];if(e===`manual`)return this.sortContainers(this.getManualContainers());let t=this.config.portainer_endpoint?this.registries.devices[this.config.portainer_endpoint]:void 0;if(!t||!qe(t,`portainer`)||t.model!==`Endpoint`)return[];let n=[];for(let e of Object.values(this.registries.devices)){if(!qe(e,`portainer`)||e.model!==`Container`||!Ke(e,t.id,this.registries.devices))continue;let r=(t,n)=>Ze(this.hass,this.registries,e.id,t,n,`portainer`),i=r(`container`,`switch`);if(!i)continue;let a=r(`restart_container`,`button`)??r(`restart`,`button`),o=r(`cpu_usage_total`,`sensor`),s=r(`memory_usage`,`sensor`),c=J(s),l=r(`container_state`,`sensor`),u=r(`image`,`sensor`);n.push({id:e.id,name:e.name_by_user||e.name,isRunning:i.state===`on`,isStopped:i.state===`off`,available:G(i),status:G(l)?l.state:G(i)?i.state===`on`?`Running`:`Stopped`:`Unavailable`,image:G(u)?u.state:void 0,switchEntityId:i.entity_id,statusEntityId:i.entity_id,restartEntityId:a&&a.state!==`unavailable`?a.entity_id:void 0,cpuPct:o?.attributes.unit_of_measurement===`%`?K(o):void 0,memoryUsage:G(s)?c===void 0?q(s):Y(c):void 0})}return this.sortContainers(n)}sortContainers(e){return e.sort((e,t)=>Number(t.isRunning)-Number(e.isRunning)||e.name.localeCompare(t.name))}actionAvailable(e){if(!e)return!1;let t=this.hass?.states[e];return!!t&&t.state!==`unavailable`&&([`button`,`input_button`,`script`].includes(e.split(`.`)[0])||t.state!==`unknown`)}triggerEntity(e){let t=e.split(`.`)[0];this.runAction(t,t===`script`?`turn_on`:`press`,e)}handlePower(e){if(!e.available||!e.isRunning&&!e.isStopped||e.isRunning&&!confirm(`Are you sure you want to stop container "${e.name}"?`))return;let t=e.isRunning?e.stopEntityId:e.startEntityId;t?this.triggerEntity(t):e.switchEntityId&&this.runAction(`switch`,e.isRunning?`turn_off`:`turn_on`,e.switchEntityId)}handleRestart(e){e.available&&e.restartEntityId&&this.triggerEntity(e.restartEntityId)}status(e){return A`<span class="badge ${e.available&&e.isRunning?`badge-online`:`badge-standby`}">${e.status}</span>`}controls(e,t){let n=e.isRunning?e.stopEntityId||e.switchEntityId:e.isStopped?e.startEntityId||e.switchEntityId:e.switchEntityId||e.startEntityId||e.stopEntityId;return A`<div class="row-right" style="gap:4px">
      ${e.restartEntityId?A`<button class=${t?`btn-icon`:`btn`} ?disabled=${!e.available||!this.actionAvailable(e.restartEntityId)}
        title="Restart ${e.name}" @click=${()=>this.handleRestart(e)}>
        ${X(mt,t?14:13)}${t?M:`Restart`}
      </button>`:M}
      ${n?A`<button class=${t?`btn-icon`:e.isRunning?`btn`:`btn btn-primary`}
        ?disabled=${!e.available||!e.isRunning&&!e.isStopped||!this.actionAvailable(n)} title="${e.isRunning?`Stop`:`Start`} ${e.name}"
        @click=${()=>this.handlePower(e)}>
        ${X(pt,t?14:13)}${t?M:e.isRunning?`Stop`:`Start`}
      </button>`:M}
    </div>`}render(){let e=this.getContainers(),t=z(this.config),n=e.filter(e=>e.isRunning).length,r=e.filter(e=>e.isStopped).length,i=e.filter(e=>!e.available).length,a=e.filter(e=>this._filter===`all`||(this._filter===`running`?e.isRunning:e.isStopped));return A`<ha-card>
      ${this.renderHeader(this.config.title||`Docker Containers`,`${n} running • ${r} stopped • ${i} unavailable`,dt,A`<span class="badge ${n?`badge-online`:`badge-standby`}">${n} Running</span>`)}
      ${this.renderErrors()}
      ${t===`disabled`?this.renderNotice(`Container support is disabled. Choose a container source in the card editor.`):t===`manual`?e.length?M:this.renderNotice(`Add containers and select their status entities in the card editor.`):this.config.portainer_endpoint?e.length?M:this.renderNotice(`No container switches found under the selected Portainer endpoint. Check the endpoint selection and enable its container switch entities.`):this.renderNotice(`Select the Portainer endpoint belonging to your NAS in the card editor. No endpoint is selected automatically.`)}
      ${t===`manual`&&this.config.containers?.some(e=>!e.status_entity)?this.renderNotice(`A manual container is missing its required status entity. Complete its mapping in the card editor.`):M}
      ${t===`disabled`?M:A`
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <div style="display:flex;gap:4px">
          <button class="tab-btn ${this._filter===`all`?`active`:``}" @click=${()=>this._filter=`all`}>All (${e.length})</button>
          <button class="tab-btn ${this._filter===`running`?`active`:``}" @click=${()=>this._filter=`running`}>Running (${n})</button>
          <button class="tab-btn ${this._filter===`stopped`?`active`:``}" @click=${()=>this._filter=`stopped`}>Stopped (${r})</button>
        </div>
        <button class="btn-icon" title="Toggle View Mode" @click=${()=>this._viewMode=this._viewMode===`grid`?`list`:`grid`}>
          ${X(this._viewMode===`grid`?_t:gt,18)}
        </button>
      </div>
      ${this._viewMode===`grid`?A`<div class="container-grid">${a.map(e=>A`
        <div class="container-tile">
          <div style="display:flex;align-items:center;gap:8px;min-width:0">
            <span class="status-dot ${e.available?e.isRunning?`online`:`offline`:`unknown`}"></span>
            <button class="tile-name btn" style="padding:0;background:transparent;border:0" title=${e.image?`${e.name} • ${e.image}`:e.name}
              @click=${()=>this.openMoreInfo(e.statusEntityId)}>${e.name}</button>
          </div>
          ${this.status(e)}${this.controls(e,!0)}
        </div>`)}
      </div>`:A`<div class="item-list">${a.map(e=>A`
        <div class="list-row container-list-row">
          <div class="row-left" style="flex-wrap:wrap;gap:8px">
            <span class="status-dot ${e.available?e.isRunning?`online`:`offline`:`unknown`}"></span>
            <button class="btn" title=${e.image||e.name} @click=${()=>this.openMoreInfo(e.statusEntityId)}>${e.name}</button>
            ${e.cpuPct===void 0?M:A`<span style="font-size:.72rem;color:var(--synology-subtext)">${e.cpuPct.toFixed(2)}% CPU</span>`}
            ${e.memoryUsage?A`<span style="font-size:.72rem;color:var(--synology-subtext)">${e.memoryUsage}</span>`:M}
            ${this.status(e)}
          </div>${this.controls(e,!1)}
        </div>`)}
      </div>`}`}
    </ha-card>`}};function Ft(){Mt({tag:Pe,editorTag:Fe,card:Pt,editor:kt,name:`NAS Docker Containers Card`,description:`Portainer discovery or manually mapped container entities with optional controls.`})}var It=[{key:`overview`,label:`Overview`,icon:ht},{key:`storage`,label:`Storage & Disks`,icon:ft},{key:`docker`,label:`Docker`,icon:dt}];Mt({tag:Ie,editorTag:Le,card:class extends Z{static editorTag=Le;static properties={...Z.properties,_activeTab:{state:!0}};constructor(){super(),this._activeTab=`overview`}render(){let e=this.getActiveDevice(),t=It.filter(e=>(z(this.config)!==`disabled`||e.key!==`docker`)&&(!this.config.tabs||this.config.tabs.includes(e.key))),n=t.some(e=>e.key===this._activeTab)?this._activeTab:t[0]?.key,r=e=>({...this.config,title:void 0,type:`custom:synology-${e}-card`,embedded:!0});return A`<ha-card style="gap:12px">
      ${this.renderHeader(`${this.config.title||this.config.name||e?.name_by_user||e?.name||(R(this.config)===`synology_dsm`?`Synology NAS`:R(this.config)===`qnap`?`QNAP NAS`:`NAS`)} Dashboard`,`Unified NAS Control Center`,ht)}
      ${this.renderErrors()}
      <div class="tab-strip" role="tablist" aria-label="NAS dashboard">
        ${t.map(e=>A`<button role="tab" aria-selected=${n===e.key} class="tab-btn ${n===e.key?`active`:``}"
          @click=${()=>this._activeTab=e.key}>${X(e.icon,14)} ${e.label}</button>`)}
      </div><div role="tabpanel">
        ${n===`overview`?A`<synology-server-card .hass=${this.hass} .config=${r(`server`)}></synology-server-card>`:M}
        ${n===`storage`?A`<synology-storage-card .hass=${this.hass} .config=${r(`storage`)}></synology-storage-card>`:M}
        ${n===`docker`?A`<synology-docker-card .hass=${this.hass} .config=${r(`docker`)}></synology-docker-card>`:M}
        ${n?M:this.renderNotice(`All tabs are hidden. Enable tabs in the card editor.`)}
      </div>
    </ha-card>`}},editor:At,name:`NAS Unified Dashboard Card`,description:`Synology DSM, QNAP or manual NAS dashboard with optional containers.`}),Ft();