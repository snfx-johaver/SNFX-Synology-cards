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
var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:ee,getOwnPropertySymbols:f,getPrototypeOf:p}=Object,m=globalThis,te=m.trustedTypes,ne=te?te.emptyScript:``,re=m.reactiveElementPolyfillSupport,h=(e,t)=>e,ie={toAttribute(e,t){switch(t){case Boolean:e=e?ne:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ae=(e,t)=>!l(e,t),oe={attribute:!0,type:String,converter:ie,reflect:!1,useDefault:!1,hasChanged:ae};Symbol.metadata??=Symbol(`metadata`),m.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=oe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??oe}static _$Ei(){if(this.hasOwnProperty(h(`elementProperties`)))return;let e=p(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(h(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(h(`properties`))){let e=this.properties,t=[...ee(e),...f(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?ie:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?ie:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??ae)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};g.elementStyles=[],g.shadowRootOptions={mode:`open`},g[h(`elementProperties`)]=new Map,g[h(`finalized`)]=new Map,re?.({ReactiveElement:g}),(m.reactiveElementVersions??=[]).push(`2.1.2`);var _=globalThis,se=e=>e,v=_.trustedTypes,ce=v?v.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,le=`$lit$`,y=`lit$${Math.random().toFixed(9).slice(2)}$`,ue=`?`+y,de=`<${ue}>`,b=document,x=()=>b.createComment(``),S=e=>e===null||typeof e!=`object`&&typeof e!=`function`,C=Array.isArray,fe=e=>C(e)||typeof e?.[Symbol.iterator]==`function`,w="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,me=/>/g,E=RegExp(`>|${w}(?:([^\\s"'>=/]+)(${w}*=${w}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),he=/'/g,ge=/"/g,_e=/^(?:script|style|textarea|title)$/i,D=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),O=Symbol.for(`lit-noChange`),k=Symbol.for(`lit-nothing`),ve=new WeakMap,A=b.createTreeWalker(b,129);function ye(e,t){if(!C(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ce===void 0?t:ce.createHTML(t)}var be=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=T;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===T?c[1]===`!--`?o=pe:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=E):(_e.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=E):o=me:o===E?c[0]===`>`?(o=i??T,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?E:c[3]===`"`?ge:he):o===ge||o===he?o=E:o===pe||o===me?o=T:(o=E,i=void 0);let d=o===E&&e[t+1].startsWith(`/>`)?` `:``;a+=o===T?n+de:l>=0?(r.push(s),n.slice(0,l)+le+n.slice(l)+y+d):n+y+(l===-2?t:d)}return[ye(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},j=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=be(t,n);if(this.el=e.createElement(l,r),A.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=A.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(le)){let t=u[o++],n=i.getAttribute(e).split(y),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Se:r[1]===`?`?Ce:r[1]===`@`?we:P}),i.removeAttribute(e)}else e.startsWith(y)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(_e.test(i.tagName)){let e=i.textContent.split(y),t=e.length-1;if(t>0){i.textContent=v?v.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],x()),A.nextNode(),c.push({type:2,index:++a});i.append(e[t],x())}}}else if(i.nodeType===8){if(i.data===ue)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(y,e+1))!==-1;)c.push({type:7,index:a}),e+=y.length-1}}a++}}static createElement(e,t){let n=b.createElement(`template`);return n.innerHTML=e,n}};function M(e,t,n=e,r){if(t===O)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=S(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=M(e,i._$AS(e,t.values),i,r)),t}var xe=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??b).importNode(t,!0);A.currentNode=r;let i=A.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new N(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Te(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=A.nextNode(),a++)}return A.currentNode=b,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},N=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=M(this,e,t),S(e)?e===k||e==null||e===``?(this._$AH!==k&&this._$AR(),this._$AH=k):e!==this._$AH&&e!==O&&this._(e):e._$litType$===void 0?e.nodeType===void 0?fe(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==k&&S(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=j.createElement(ye(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new xe(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=ve.get(e.strings);return t===void 0&&ve.set(e.strings,t=new j(e)),t}k(t){C(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(x()),this.O(x()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=se(e).nextSibling;se(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},P=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=k,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=k}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=M(this,e,t,0),a=!S(e)||e!==this._$AH&&e!==O,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=M(this,r[n+o],t,o),s===O&&(s=this._$AH[o]),a||=!S(s)||s!==this._$AH[o],s===k?e=k:e!==k&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Se=class extends P{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===k?void 0:e}},Ce=class extends P{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==k)}},we=class extends P{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=M(this,e,t,0)??k)===O)return;let n=this._$AH,r=e===k&&n!==k||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==k&&(n===k||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Te=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){M(this,e)}},Ee=_.litHtmlPolyfillSupport;Ee?.(j,N),(_.litHtmlVersions??=[]).push(`3.3.3`);var De=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new N(t.insertBefore(x(),e),e,void 0,n??{})}return i._$AI(e),i},F=globalThis,I=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=De(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};I._$litElement$=!0,I.finalized=!0,F.litElementHydrateSupport?.({LitElement:I});var Oe=F.litElementPolyfillSupport;Oe?.({LitElement:I}),(F.litElementVersions??=[]).push(`4.2.2`);var ke=`synology-server-card`,Ae=`synology-server-card-editor`,je=`synology-storage-card`,Me=`synology-storage-card-editor`,Ne=`synology-docker-card`,Pe=`synology-docker-card-editor`,Fe=`synology-dashboard-card`,Ie=`synology-dashboard-card-editor`,Le=[o`
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

    .empty-state, .capability-note {
      font-size: 0.76rem;
      line-height: 1.5;
      color: var(--synology-subtext);
      overflow-wrap: anywhere;
    }

    .capability-note summary {
      cursor: pointer;
    }

    .capability-note div {
      margin-top: 8px;
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
  `];function Re(e,t,n,r){let i=new CustomEvent(t,{bubbles:r?.bubbles??!0,cancelable:!!r?.cancelable,composed:r?.composed??!0,detail:n});return e.dispatchEvent(i),i}var L=new WeakMap;async function ze(e,t=!1){if(!e.callWS)return{devices:e.devices??{},entities:e.entities??{}};let n=e.connection??e.callWS;t&&L.delete(n);let r=L.get(n);return r||(r=Promise.all([e.callWS({type:`config/device_registry/list`}),e.callWS({type:`config/entity_registry/list`})]).then(([e,t])=>({devices:Object.fromEntries(e.map(e=>[e.id,e])),entities:Object.fromEntries(t.map(e=>[e.entity_id,e]))})),L.set(n,r),r.catch(()=>L.delete(n))),r}function Be(e,t,n){let r=new Set;for(;e&&!r.has(e.id);){if(e.id===t)return!0;r.add(e.id),e=e.via_device_id?n[e.via_device_id]:void 0}return!1}function R(e,t){return e.identifiers?.some(([e])=>e===t)??!1}function Ve(e){return Object.values(e.devices).filter(e=>R(e,`synology_dsm`)&&!e.via_device_id)}function He(e){return Object.values(e.devices).filter(e=>R(e,`portainer`)&&e.model===`Endpoint`)}function z(e,t){if(e.translation_key===t)return!0;let n=e.unique_id??``;return n.endsWith(`_${t}`)||n.includes(`:${t}_`)||n.endsWith(`:${t}`)}function B(e,t,n,r,i,a=`synology_dsm`){if(!e||!n)return;let o=Object.values(t.entities).filter(e=>e.device_id===n&&e.platform===a&&(!i||e.entity_id.startsWith(`${i}.`))),s=o.find(e=>z(e,r));if(s)return e.states[s.entity_id];let c=o.find(e=>e.entity_id.endsWith(`_${r}`));return c?e.states[c.entity_id]:void 0}function Ue(e,t){let n=Ve(t);return e.server?n.find(t=>t.id===e.server):n.length===1?n[0]:void 0}function V(e){return!!e&&![`unknown`,`unavailable`,`none`,``].includes(e.state.toLowerCase())}function H(e){if(!V(e))return;let t=Number(e.state);return Number.isFinite(t)?t:void 0}function U(e){let t=H(e);return t===void 0?void 0:Math.round(Math.max(0,Math.min(100,t)))}function W(e){return V(e)?`${e.state}${e.attributes.unit_of_measurement?` ${e.attributes.unit_of_measurement}`:``}`:`Unavailable`}var G={B:1,kB:1e3,KB:1e3,MB:1e6,GB:1e9,TB:0xe8d4a51000,KiB:1024,MiB:1024**2,GiB:1024**3,TiB:1024**4};function K(e){let t=H(e),n=e?.attributes.unit_of_measurement,r=typeof n==`string`?G[n]:void 0;return t!==void 0&&r!==void 0?t*r:void 0}function q(e){if(e===void 0||!Number.isFinite(e))return`Unavailable`;let t=e>=0xe8d4a51000?`TB`:e>=1e9?`GB`:e>=1e6?`MB`:e>=1e3?`kB`:`B`;return`${(e/G[t]).toLocaleString(void 0,{maximumFractionDigits:2})} ${t}`}function We(e){let t=H(e),n=e?.attributes.unit_of_measurement;if(t===void 0||typeof n!=`string`)return`Unavailable`;let r=G[n.replace(/\/s$/,``)];return r===void 0?W(e):`${q(t*r)}/s`}function Ge(e){if(e)try{let t=new URL(e);return[`http:`,`https:`].includes(t.protocol)?t.href:void 0}catch{return}}function Ke(e,t){let n=Ue(e,t);return n?Object.values(t.devices).filter(e=>e.id!==n.id&&R(e,`synology_dsm`)&&Be(e,n.id,t.devices)):[]}function qe(e,t,n){return Ke(t,n).filter(e=>Object.values(n.entities).some(t=>t.device_id===e.id&&t.platform===`synology_dsm`&&(z(t,`volume_percentage_used`)||t.entity_id.endsWith(`_volume_percentage_used`)))).map(t=>{let r=r=>B(e,n,t.id,r,`sensor`);return{device:t,usage:r(`volume_percentage_used`),status:r(`volume_status`),total:r(`volume_size_total`),used:r(`volume_size_used`),temperature:r(`volume_disk_temp_avg`)}})}function Je(e,t,n){let r=qe(e,t,n),i=r.map(e=>K(e.total)),a=r.map(e=>K(e.used));if(!r.length||i.some(e=>e===void 0)||a.some(e=>e===void 0))return{total:void 0,used:void 0,percent:void 0};let o=i.reduce((e,t)=>e+t,0),s=a.reduce((e,t)=>e+t,0);return{total:o,used:s,percent:o>0?Math.round(s/o*100):void 0}}var Ye=`M21.81 10.25C21.75 10.21 21.25 9.82 20.17 9.82C19.89 9.82 19.61 9.85 19.33 9.9C19.12 8.5 17.95 7.79 17.9 7.76L17.61 7.59L17.43 7.86C17.19 8.22 17 8.63 16.92 9.05C16.72 9.85 16.84 10.61 17.25 11.26C16.76 11.54 15.96 11.61 15.79 11.61H2.62C2.28 11.61 2 11.89 2 12.24C2 13.39 2.18 14.54 2.58 15.62C3.03 16.81 3.71 17.69 4.58 18.23C5.56 18.83 7.17 19.17 9 19.17C9.79 19.17 10.61 19.1 11.42 18.95C12.54 18.75 13.62 18.36 14.61 17.79C15.43 17.32 16.16 16.72 16.78 16C17.83 14.83 18.45 13.5 18.9 12.35H19.09C20.23 12.35 20.94 11.89 21.33 11.5C21.59 11.26 21.78 10.97 21.92 10.63L22 10.39L21.81 10.25M3.85 11.24H5.61C5.69 11.24 5.77 11.17 5.77 11.08V9.5C5.77 9.42 5.7 9.34 5.61 9.34H3.85C3.76 9.34 3.69 9.41 3.69 9.5V11.08C3.7 11.17 3.76 11.24 3.85 11.24M6.28 11.24H8.04C8.12 11.24 8.2 11.17 8.2 11.08V9.5C8.2 9.42 8.13 9.34 8.04 9.34H6.28C6.19 9.34 6.12 9.41 6.12 9.5V11.08C6.13 11.17 6.19 11.24 6.28 11.24M8.75 11.24H10.5C10.6 11.24 10.67 11.17 10.67 11.08V9.5C10.67 9.42 10.61 9.34 10.5 9.34H8.75C8.67 9.34 8.6 9.41 8.6 9.5V11.08C8.6 11.17 8.66 11.24 8.75 11.24M11.19 11.24H12.96C13.04 11.24 13.11 11.17 13.11 11.08V9.5C13.11 9.42 13.05 9.34 12.96 9.34H11.19C11.11 9.34 11.04 9.41 11.04 9.5V11.08C11.04 11.17 11.11 11.24 11.19 11.24M6.28 9H8.04C8.12 9 8.2 8.91 8.2 8.82V7.25C8.2 7.16 8.13 7.09 8.04 7.09H6.28C6.19 7.09 6.12 7.15 6.12 7.25V8.82C6.13 8.91 6.19 9 6.28 9M8.75 9H10.5C10.6 9 10.67 8.91 10.67 8.82V7.25C10.67 7.16 10.61 7.09 10.5 7.09H8.75C8.67 7.09 8.6 7.15 8.6 7.25V8.82C8.6 8.91 8.66 9 8.75 9M11.19 9H12.96C13.04 9 13.11 8.91 13.11 8.82V7.25C13.11 7.16 13.04 7.09 12.96 7.09H11.19C11.11 7.09 11.04 7.15 11.04 7.25V8.82C11.04 8.91 11.11 9 11.19 9M11.19 6.72H12.96C13.04 6.72 13.11 6.65 13.11 6.56V5C13.11 4.9 13.04 4.83 12.96 4.83H11.19C11.11 4.83 11.04 4.89 11.04 5V6.56C11.04 6.64 11.11 6.72 11.19 6.72M13.65 11.24H15.41C15.5 11.24 15.57 11.17 15.57 11.08V9.5C15.57 9.42 15.5 9.34 15.41 9.34H13.65C13.57 9.34 13.5 9.41 13.5 9.5V11.08C13.5 11.17 13.57 11.24 13.65 11.24`,J=`M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M12,4A6,6 0 0,0 6,10C6,13.31 8.69,16 12.1,16L11.22,13.77C10.95,13.29 11.11,12.68 11.59,12.4L12.45,11.9C12.93,11.63 13.54,11.79 13.82,12.27L15.74,14.69C17.12,13.59 18,11.9 18,10A6,6 0 0,0 12,4M12,9A1,1 0 0,1 13,10A1,1 0 0,1 12,11A1,1 0 0,1 11,10A1,1 0 0,1 12,9M7,18A1,1 0 0,0 6,19A1,1 0 0,0 7,20A1,1 0 0,0 8,19A1,1 0 0,0 7,18M12.09,13.27L14.58,19.58L17.17,18.08L12.95,12.77L12.09,13.27Z`,Xe=`M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13`,Ze=`M12,4C14.1,4 16.1,4.8 17.6,6.3C20.7,9.4 20.7,14.5 17.6,17.6C15.8,19.5 13.3,20.2 10.9,19.9L11.4,17.9C13.1,18.1 14.9,17.5 16.2,16.2C18.5,13.9 18.5,10.1 16.2,7.7C15.1,6.6 13.5,6 12,6V10.6L7,5.6L12,0.6V4M6.3,17.6C3.7,15 3.3,11 5.1,7.9L6.6,9.4C5.5,11.6 5.9,14.4 7.8,16.2C8.3,16.7 8.9,17.1 9.6,17.4L9,19.4C8,19 7.1,18.4 6.3,17.6Z`,Qe=`M4,1H20A1,1 0 0,1 21,2V6A1,1 0 0,1 20,7H4A1,1 0 0,1 3,6V2A1,1 0 0,1 4,1M4,9H20A1,1 0 0,1 21,10V14A1,1 0 0,1 20,15H4A1,1 0 0,1 3,14V10A1,1 0 0,1 4,9M4,17H20A1,1 0 0,1 21,18V22A1,1 0 0,1 20,23H4A1,1 0 0,1 3,22V18A1,1 0 0,1 4,17M9,5H10V3H9V5M9,13H10V11H9V13M9,21H10V19H9V21M5,3V5H7V3H5M5,11V13H7V11H5M5,19V21H7V19H5Z`,$e=`M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3`,et=`M9,5V9H21V5M9,19H21V15H9M9,14H21V10H9M4,9H8V5H4M4,19H8V15H4M4,14H8V10H4V14Z`;function Y(e,t=20,n=`icon`){return D`
    <svg
      class="${n}"
      style="width: ${t}px; height: ${t}px;"
      viewBox="0 0 24 24"
    >
      <path d="${e}" fill="currentColor"></path>
    </svg>
  `}var tt={cpu_usage:`cpu_total_load`,ram_usage:`memory_real_usage`,system_temperature:`temperature`,uptime:`uptime`,security_status:`status`,network_rx:`network_down`,network_tx:`network_up`},X=class extends I{static styles=Le;static editorTag=``;static async getConfigElement(){return document.createElement(this.editorTag)}static getStubConfig(){return{type:`custom:${this.editorTag.replace(/-editor$/,``)}`}}static properties={hass:{attribute:!1},config:{attribute:!1},registries:{state:!0},registryError:{state:!0},actionError:{state:!0}};registryKey;requestVersion=0;constructor(){super(),this.config={type:``},this.registries={devices:{},entities:{}},this.registryError=``,this.actionError=``}willUpdate(e){if(super.willUpdate(e),this.toggleAttribute(`embedded`,!!this.config.embedded),e.has(`hass`)&&this.hass){let e=this.hass.connection??this.hass.callWS??this.hass;this.hass.callWS?(e!==this.registryKey||!this.registryError)&&(this.registryKey=e,this.refreshRegistries()):this.registries={devices:this.hass.devices??{},entities:this.hass.entities??{}}}}async refreshRegistries(e=!1){if(!this.hass)return;let t=++this.requestVersion;this.registryError=``;try{let n=await ze(this.hass,e);t===this.requestVersion&&(this.registries=n)}catch(e){t===this.requestVersion&&(this.registryError=`Cannot load Home Assistant registries: ${e instanceof Error?e.message:String(e)}`)}}setConfig(e){if(!e||typeof e.type!=`string`)throw Error(`Invalid card configuration`);if(e.server!==void 0&&typeof e.server!=`string`)throw Error(`Select a Synology device registry ID`);if(e.portainer_endpoint!==void 0&&typeof e.portainer_endpoint!=`string`)throw Error(`Select a Portainer endpoint device registry ID`);if(e.view_mode!==void 0&&![`grid`,`list`].includes(e.view_mode))throw Error(`Container layout must be grid or list`);if(e.entities&&Object.values(e.entities).some(e=>typeof e!=`string`))throw Error(`Entity mappings must contain entity ID strings`);if(e.tabs&&(!Array.isArray(e.tabs)||e.tabs.some(e=>![`overview`,`storage`,`docker`].includes(e))))throw Error(`Invalid dashboard tabs`);this.config={...e},this.toggleAttribute(`embedded`,!!e.embedded)}getCardSize(){return 4}getGridOptions(){return{columns:6,rows:4,min_columns:3,min_rows:3}}getActiveDevice(){return Ue(this.config,this.registries)}getEntity(e,t){let n=this.config.entities?.[e];return n?this.hass?.states[n]:B(this.hass,this.registries,this.getActiveDevice()?.id,tt[e]??e,t)}openMoreInfo(e){Re(this,`hass-more-info`,{entityId:e})}async runAction(e,t,n){if(this.actionError=``,!this.hass){this.actionError=`Home Assistant is not connected.`;return}let r=this.hass.states[n];if(!r||r.state===`unavailable`||e!==`button`&&r.state===`unknown`){this.actionError=`Cannot ${t}: ${n} is unavailable.`;return}try{await this.hass.callService(e,t,{entity_id:n})}catch(e){this.actionError=`${t} failed: ${e instanceof Error?e.message:String(e)}`}}pressButton(e){return this.runAction(`button`,`press`,e)}renderNotice(e){return D`<div class="empty-state">${e}</div>`}renderCapability(e){return D`<details class="capability-note"><summary>Unavailable fields / setup notes</summary><div>${e}</div></details>`}renderErrors(){return D`${this.registryError?D`<div role="alert" class="empty-state">${this.registryError} <button class="btn" @click=${()=>this.refreshRegistries(!0)}>Retry</button></div>`:k}
      ${this.actionError?D`<div role="alert" class="empty-state">${this.actionError}</div>`:k}`}renderHeader(e,t,n,r){return this.config.embedded||this.config.hide_header?k:D`<div class="header"><div class="header-main">
      <div class="header-icon">${Y(n,22)}</div>
      <div class="header-titles"><span class="header-title">${e}</span><span class="header-subtitle">${t}</span></div>
    </div>${r?D`<div class="header-actions">${r}</div>`:k}</div>`}},nt={cpu_usage:`CPU utilization (%)`,ram_usage:`Memory utilization (%)`,system_temperature:`System temperature`,uptime:`Uptime / up since`,memory_total_real:`Total RAM`,memory_available_real:`Available RAM`,storage_usage:`Storage utilization (%) override`,security_status:`Security Advisor (on = attention)`,network_rx:`Download rate`,network_tx:`Upload rate`},Z={overview:`Overview`,storage:`Storage & Disks`,docker:`Docker`},Q=class extends I{static properties={hass:{attribute:!1},_config:{state:!0},registries:{state:!0},error:{state:!0}};registryKey;requestVersion=0;static styles=o`
    .card-config { display:flex;flex-direction:column;gap:14px;padding:8px 0;color:var(--primary-text-color); }
    label { display:flex;flex-direction:column;gap:6px;font-size:.85rem; }
    select, input[type=text] { padding:8px 12px;border-radius:6px;border:1px solid var(--divider-color);
      background:var(--card-background-color);color:var(--primary-text-color);font:inherit;max-width:100%; }
    .checkbox-row { flex-direction:row;align-items:center;gap:10px; }
    input[type=checkbox] { accent-color:#0086d6; }
    p { font-size:.8rem;color:var(--secondary-text-color);margin:0; }
    details { display:flex;flex-direction:column; } details label { margin-top:10px; }
  `;constructor(){super(),this.registries={devices:{},entities:{}},this.error=``}willUpdate(e){if(e.has(`hass`)&&this.hass){let e=this.hass.connection??this.hass.callWS??this.hass;this.hass.callWS?(e!==this.registryKey||!this.error)&&(this.registryKey=e,this.load()):this.registries={devices:this.hass.devices??{},entities:this.hass.entities??{}}}}async load(e=!1){if(!this.hass)return;let t=++this.requestVersion;this.error=``;try{let n=await ze(this.hass,e);t===this.requestVersion&&(this.registries=n)}catch(e){t===this.requestVersion&&(this.error=`Registry discovery failed: ${e instanceof Error?e.message:String(e)}`)}}setConfig(e){this._config={...e}}changed(e,t){this._config&&(this._config={...this._config,[e]:t},Re(this,`config-changed`,{config:this._config}))}mappingChanged(e,t){let n={...this._config?.entities};t?n[e]=t:delete n[e],this.changed(`entities`,n)}render(){if(!this._config)return D``;let e=this._config,t=Ve(this.registries),n=He(this.registries),r=e.type.includes(`dashboard`),i=r||e.type.includes(`docker`),a=r||e.type.includes(`server`)?Object.entries(nt):[];return D`<div class="card-config">
      ${this.error?D`<div role="alert">${this.error}</div>`:k}
      <label>Synology NAS<select aria-label="Synology NAS" .value=${e.server||``}
        @change=${e=>this.changed(`server`,e.target.value)}>
        <option value="">${t.length===1?`Auto: ${t[0].name}`:`Select a Synology DSM NAS`}</option>
        ${t.map(t=>D`<option value=${t.id} ?selected=${e.server===t.id}>${t.name_by_user||t.name}</option>`)}
        ${e.server&&!t.some(t=>t.id===e.server)?D`<option value=${e.server} selected>Unavailable: ${e.server}</option>`:k}
      </select></label>
      ${i?D`<label>Synology Portainer endpoint<select aria-label="Synology Portainer endpoint" .value=${e.portainer_endpoint||``}
        @change=${e=>this.changed(`portainer_endpoint`,e.target.value)}>
        <option value="">Select explicitly (required for Docker)</option>
        ${n.map(t=>D`<option value=${t.id} ?selected=${e.portainer_endpoint===t.id}>${t.name_by_user||t.name}</option>`)}
        ${e.portainer_endpoint&&!n.some(t=>t.id===e.portainer_endpoint)?D`<option value=${e.portainer_endpoint} selected>Unavailable: ${e.portainer_endpoint}</option>`:k}
      </select></label><p>Select the Synology endpoint, not Unraid. Only its descendant container devices are included, including containers nested in stacks.</p>`:k}
      <label>Custom title<input type="text" .value=${e.title||``} @input=${e=>this.changed(`title`,e.target.value)}></label>
      ${i?D`<label>Container layout<select aria-label="Container layout" .value=${e.view_mode||`grid`} @change=${e=>this.changed(`view_mode`,e.target.value)}>
        <option value="grid" ?selected=${e.view_mode!==`list`}>Grid</option><option value="list" ?selected=${e.view_mode===`list`}>List (CPU / memory details)</option></select></label>`:k}
      ${r||e.type.includes(`server`)?D`<label class="checkbox-row"><input type="checkbox" .checked=${e.show_system_info!==!1}
        @change=${e=>this.changed(`show_system_info`,e.target.checked)}>Show system details</label>`:k}
      ${r?D`<details><summary>Visible dashboard tabs</summary>
        ${Object.entries(Z).map(([t,n])=>D`<label class="checkbox-row"><input type="checkbox" .checked=${(e.tabs??Object.keys(Z)).includes(t)}
          @change=${n=>{let r=new Set(e.tabs??Object.keys(Z));n.target.checked?r.add(t):r.delete(t),this.changed(`tabs`,Object.keys(Z).filter(e=>r.has(e)))}}>${n}</label>`)}
      </details>`:k}
      ${a.length?D`<details><summary>Entity mappings (optional)</summary>
        <p>Blank uses device-scoped DSM discovery. Overrides are explicit and may reference any entity you choose.</p>
        ${a.map(([t,n])=>D`<label>${n}<ha-entity-picker .hass=${this.hass}
          .value=${e.entities?.[t]||``} .includeDomains=${[t===`security_status`?`binary_sensor`:`sensor`]} .allowCustomEntity=${!0}
          @value-changed=${e=>this.mappingChanged(t,e.detail.value||``)}></ha-entity-picker></label>`)}
      </details>`:k}
      <button @click=${()=>this.load(!0)}>Refresh entity discovery</button>
    </div>`}},rt=class extends Q{},it=class extends Q{},at=class extends Q{},ot=class extends Q{};function st(e,t){if(!customElements.get(e))try{customElements.define(e,t)}catch(n){if(n instanceof Error&&(n.name===`NotSupportedError`||n.message.includes(`already been registered`))){class n extends t{}customElements.define(e,n)}else throw n}}function $(e){st(e.tag,e.card),st(e.editorTag,e.editor),window.customCards??=[],window.customCards.some(t=>t.type===e.tag)||window.customCards.push({type:e.tag,name:e.name,description:e.description,preview:!0,documentationURL:`https://github.com/snfx-johaver/SNFX-Synology-cards`})}function ct(e){if(!V(e))return`Unavailable`;let t=e.state.trim(),n=/^\d+(\.\d+)?$/.test(t)?Number(t):(Date.now()-Date.parse(t))/1e3;if(!Number.isFinite(n)||n<0)return`Unavailable`;let r=Math.floor(n/86400),i=Math.floor(n%86400/3600),a=Math.floor(n%3600/60);return r?`${r}d ${i}h`:i?`${i}h ${a}m`:`${a}m`}$({tag:ke,editorTag:Ae,card:class extends X{static editorTag=Ae;ring(e,t,n,r){return D`<div class="ring-card" role=${r?`button`:`none`} tabindex=${r?`0`:`-1`}
      @click=${()=>r&&this.openMoreInfo(r.entity_id)}
      @keydown=${e=>{r&&[`Enter`,` `].includes(e.key)&&(e.preventDefault(),this.openMoreInfo(r.entity_id))}}>
      <div class="ring-gauge" style="--pct: ${t??0}; --ring-color: ${t===void 0?`var(--synology-border)`:t>85?`var(--synology-warning)`:`var(--synology-accent)`}">
        <span class="ring-content">${t===void 0?`--`:`${t}%`}</span>
      </div><span class="ring-label">${e}</span><span class="ring-subtext">${n}</span>
    </div>`}detail(e,t,n){return D`<div class="detail-item" role=${n?`button`:`none`} tabindex=${n?`0`:`-1`}
      @click=${()=>n&&this.openMoreInfo(n.entity_id)}
      @keydown=${e=>{n&&[`Enter`,` `].includes(e.key)&&(e.preventDefault(),this.openMoreInfo(n.entity_id))}}><span class="detail-label">${e}</span><span class="detail-val">${t}</span></div>`}render(){let e=this.getActiveDevice(),t=this.getEntity(`cpu_usage`,`sensor`),n=this.getEntity(`ram_usage`,`sensor`),r=this.getEntity(`system_temperature`,`sensor`),i=this.getEntity(`uptime`,`sensor`),a=this.getEntity(`security_status`,`binary_sensor`),o=this.getEntity(`memory_total_real`,`sensor`),s=this.getEntity(`memory_available_real`,`sensor`),c=K(o),l=K(s),u=Je(this.hass,this.config,this.registries),d=this.getEntity(`storage_usage`,`sensor`),ee=d?U(d):u.percent,f=V(a)?a.state===`off`?`Safe`:`Attention needed`:`Unavailable`,p=Ge(e?.configuration_url);return D`<ha-card>
      ${this.renderHeader(this.config.title||e?.name_by_user||e?.name||`Synology NAS`,`${e?.model||`DSM`} • Up ${ct(i)}`,Qe,D`<span class="badge ${V(a)?a.state===`off`?`badge-online`:`badge-warning`:`badge-standby`}">Security: ${f}</span>`)}
      ${this.renderErrors()}
      ${e?k:this.renderNotice(`Select your Synology DSM NAS in the card editor. No cross-server entity matching is performed.`)}
      <div class="rings-grid">
        ${this.ring(`CPU Load`,U(t),`System: ${W(r)}`,t)}
        ${this.ring(`Memory`,U(n),c!==void 0&&l!==void 0?`${q(Math.max(0,c-l))} / ${q(c)}`:`Enable total/free memory sensors for capacity`,n)}
        ${this.ring(`Volume Storage`,ee,u.total===void 0?`Enable every volume's total-size sensor`:`${q(u.used)} / ${q(u.total)}`,d)}
      </div>
      ${this.config.show_system_info===!1?k:D`<div class="divider"></div><div class="detail-grid">
        ${this.detail(`NAS Model`,e?.model||`Unavailable`)}
        ${this.detail(`DSM Version`,e?.sw_version||`Unavailable`)}
        ${this.detail(`System Uptime`,ct(i),i)}
        ${this.detail(`System Temperature`,W(r),r)}
        ${this.detail(`Download`,We(this.getEntity(`network_rx`)),this.getEntity(`network_rx`))}
        ${this.detail(`Upload`,We(this.getEntity(`network_tx`)),this.getEntity(`network_tx`))}
        ${this.detail(`Security Advisor`,f,a)}
        ${p?D`<div class="detail-item"><span class="detail-label">DSM Management</span><a class="detail-val" href=${p} target="_blank" rel="noreferrer" style="color:var(--synology-accent)">Open DSM</a></div>`:k}
      </div>`}
    </ha-card>`}},editor:rt,name:`Synology Server Overview Card`,description:`DSM CPU, memory, volume capacity, security and uptime.`}),$({tag:je,editorTag:Me,card:class extends X{static editorTag=Me;render(){let e=qe(this.hass,this.config,this.registries),t=Je(this.hass,this.config,this.registries),n=Ke(this.config,this.registries).filter(e=>Object.values(this.registries.entities).some(t=>t.device_id===e.id&&(z(t,`disk_status`)||t.entity_id.endsWith(`_disk_status`))));return D`<ha-card>
      ${this.renderHeader(this.config.title||`Storage Volumes & Disks`,`${q(t.used)} used of ${q(t.total)}`,J,D`<span class="badge badge-standby">${e.length} Volumes • ${n.length} Drives</span>`)}
      ${this.renderErrors()}
      <div style="display:flex;flex-direction:column;gap:4px">
        <div style="display:flex;justify-content:space-between;font-size:.76rem;font-weight:600"><span>Total Volume Capacity</span><span>${t.percent===void 0?`Unavailable`:`${t.percent}%`}</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100,t.percent??0)}%"></div></div>
      </div>
      <div class="item-list">${e.map(e=>{let t=U(e.usage),n=K(e.total),r=K(e.used),i=V(e.status)?e.status.state:`Unavailable`,a=[`normal`,`healthy`].includes(i.toLowerCase());return D`<div class="list-row" style="flex-direction:column;align-items:stretch;gap:8px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
            <button class="btn" ?disabled=${!e.usage} @click=${()=>e.usage&&this.openMoreInfo(e.usage.entity_id)}>${Y(J,16)} ${e.device.name_by_user||e.device.name}</button>
            <span class="badge ${V(e.status)?a?`badge-online`:`badge-warning`:`badge-standby`}">${i}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:.75rem"><span>${W(e.used)} / ${W(e.total)}</span><span>${t===void 0?`--`:`${t}%`}</span></div>
          <div class="progress-bar"><div class="progress-fill" style="width:${t??0}%"></div></div>
          <div style="font-size:.72rem;color:var(--synology-subtext)">${n!==void 0&&r!==void 0?`${q(Math.max(0,n-r))} free • `:``}Average drive temperature: ${W(e.temperature)}</div>
        </div>`})}</div>
      <div class="divider"></div>
      <div class="section-title">Physical Drives</div>
      <div class="item-list">${n.map(e=>{let t=(t,n=`sensor`)=>B(this.hass,this.registries,e.id,t,n),n=t(`disk_status`),r=t(`disk_smart_status`),i=t(`disk_temp`),a=t(`disk_exceed_bad_sector_thr`,`binary_sensor`),o=t(`disk_below_remain_life_thr`,`binary_sensor`),s=[a,o].some(e=>V(e)&&e.state===`on`)||[n,r].some(e=>V(e)&&![`normal`,`healthy`,`good`].includes(e.state.toLowerCase())),c=V(n);return D`<div class="list-row" style="flex-direction:column;align-items:stretch;gap:10px">
          <div class="row-left" style="min-width:0">
            <div style="color:var(--synology-accent)">${Y(J,20)}</div>
            <div style="display:flex;flex-direction:column;min-width:0">
              <button class="btn" style="justify-content:flex-start;white-space:normal;text-align:left" ?disabled=${!n} @click=${()=>n&&this.openMoreInfo(n.entity_id)}>${e.name_by_user||e.name}</button>
              <span style="font-size:.7rem;color:var(--synology-subtext)">${e.model||``}</span>
            </div>
          </div>
          <div class="row-right" style="flex-wrap:wrap;justify-content:flex-start">
            <button class="btn" ?disabled=${!i} @click=${()=>i&&this.openMoreInfo(i.entity_id)}>${W(i)}</button>
            <span class="badge ${c?s?`badge-warning`:`badge-online`:`badge-standby`}">${s?`Attention needed`:W(n)}</span>
            <button class="btn" ?disabled=${!r} @click=${()=>r&&this.openMoreInfo(r.entity_id)}>SMART: ${W(r)}</button>
          </div>
          <div style="width:100%;font-size:.72rem;color:var(--synology-subtext)">
            Bad-sector threshold: ${V(a)?a.state===`on`?`Exceeded`:`Not exceeded`:`Unavailable`} •
            Remaining-life threshold: ${V(o)?o.state===`on`?`Below threshold`:`Not below threshold`:`Unavailable`}
          </div>
        </div>`})}</div>
      ${!e.length&&!n.length?this.renderNotice(`No DSM volumes or drives found for the selected NAS. Enable its storage entities, then refresh discovery.`):k}
      ${this.renderCapability(`DSM does not expose scrub/rebuild progress, drive capacity usage, read/write I/O or spin controls as Home Assistant entities. Enable disabled SMART and volume total-size sensors to fill those supported fields.`)}
    </ha-card>`}},editor:it,name:`Synology Storage & Disks Card`,description:`Volumes, physical drive temperatures, SMART and threshold alerts.`}),$({tag:Ne,editorTag:Pe,card:class extends X{static editorTag=Pe;static properties={...X.properties,_filter:{state:!0},_viewMode:{state:!0}};constructor(){super(),this._filter=`all`,this._viewMode=`grid`}willUpdate(e){super.willUpdate(e),e.has(`config`)&&e.get(`config`)?.view_mode!==this.config.view_mode&&(this._viewMode=this.config.view_mode||`grid`)}getContainers(){let e=this.config.portainer_endpoint?this.registries.devices[this.config.portainer_endpoint]:void 0;if(!e||!R(e,`portainer`)||e.model!==`Endpoint`)return[];let t=[];for(let n of Object.values(this.registries.devices)){if(!R(n,`portainer`)||n.model!==`Container`||!Be(n,e.id,this.registries.devices))continue;let r=(e,t)=>B(this.hass,this.registries,n.id,e,t,`portainer`),i=r(`container`,`switch`);if(!i)continue;let a=r(`restart_container`,`button`)??r(`restart`,`button`),o=r(`cpu_usage_total`,`sensor`),s=r(`memory_usage`,`sensor`),c=r(`container_state`,`sensor`),l=r(`image`,`sensor`);t.push({id:n.id,name:n.name_by_user||n.name,isRunning:i.state===`on`,available:V(i),status:V(c)?c.state:V(i)?i.state===`on`?`Running`:`Stopped`:`Unavailable`,image:V(l)?l.state:void 0,switchEntityId:i.entity_id,restartEntityId:a&&a.state!==`unavailable`?a.entity_id:void 0,cpuPct:o?.attributes.unit_of_measurement===`%`?H(o):void 0,memoryUsage:V(s)?W(s):void 0})}return t.sort((e,t)=>Number(t.isRunning)-Number(e.isRunning)||e.name.localeCompare(t.name))}handlePower(e){(!e.isRunning||confirm(`Are you sure you want to stop container "${e.name}"?`))&&this.runAction(`switch`,e.isRunning?`turn_off`:`turn_on`,e.switchEntityId)}status(e){return D`<span class="badge ${e.available&&e.isRunning?`badge-online`:`badge-standby`}">${e.status}</span>`}controls(e,t){return D`<div class="row-right" style="gap:4px">
      ${e.restartEntityId?D`<button class=${t?`btn-icon`:`btn`} ?disabled=${!e.available}
        title="Restart ${e.name}" @click=${()=>this.pressButton(e.restartEntityId)}>
        ${Y(Ze,t?14:13)}${t?k:`Restart`}
      </button>`:k}
      <button class=${t?`btn-icon`:e.isRunning?`btn`:`btn btn-primary`}
        ?disabled=${!e.available} title="${e.isRunning?`Stop`:`Start`} ${e.name}"
        @click=${()=>this.handlePower(e)}>
        ${Y(Xe,t?14:13)}${t?k:e.isRunning?`Stop`:`Start`}
      </button>
    </div>`}render(){let e=this.getContainers(),t=e.filter(e=>e.isRunning).length,n=e.filter(e=>e.available&&!e.isRunning).length,r=e.filter(e=>!e.available).length,i=e.filter(e=>this._filter===`all`||(this._filter===`running`?e.isRunning:e.available&&!e.isRunning));return D`<ha-card>
      ${this.renderHeader(this.config.title||`Docker Containers`,`${t} running • ${n} stopped • ${r} unavailable`,Ye,D`<span class="badge ${t?`badge-online`:`badge-standby`}">${t} Running</span>`)}
      ${this.renderErrors()}
      ${this.config.portainer_endpoint?e.length?k:this.renderNotice(`No container switches found under the selected Portainer endpoint. Check the endpoint selection and enable its container switch entities.`):this.renderNotice(`Select the Portainer endpoint belonging to your Synology NAS in the card editor. No endpoint is selected automatically.`)}
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
        <div style="display:flex;gap:4px">
          <button class="tab-btn ${this._filter===`all`?`active`:``}" @click=${()=>this._filter=`all`}>All (${e.length})</button>
          <button class="tab-btn ${this._filter===`running`?`active`:``}" @click=${()=>this._filter=`running`}>Running (${t})</button>
          <button class="tab-btn ${this._filter===`stopped`?`active`:``}" @click=${()=>this._filter=`stopped`}>Stopped (${n})</button>
        </div>
        <button class="btn-icon" title="Toggle View Mode" @click=${()=>this._viewMode=this._viewMode===`grid`?`list`:`grid`}>
          ${Y(this._viewMode===`grid`?et:$e,18)}
        </button>
      </div>
      ${this._viewMode===`grid`?D`<div class="container-grid">${i.map(e=>D`
        <div class="container-tile">
          <div style="display:flex;align-items:center;gap:8px;min-width:0">
            <span class="status-dot ${e.available?e.isRunning?`online`:`offline`:`unknown`}"></span>
            <button class="tile-name btn" style="padding:0;background:transparent;border:0" title=${e.image?`${e.name} • ${e.image}`:e.name}
              @click=${()=>this.openMoreInfo(e.switchEntityId)}>${e.name}</button>
          </div>
          ${this.status(e)}${this.controls(e,!0)}
        </div>`)}
      </div>`:D`<div class="item-list">${i.map(e=>D`
        <div class="list-row container-list-row">
          <div class="row-left" style="flex-wrap:wrap;gap:8px">
            <span class="status-dot ${e.available?e.isRunning?`online`:`offline`:`unknown`}"></span>
            <button class="btn" title=${e.image||e.name} @click=${()=>this.openMoreInfo(e.switchEntityId)}>${e.name}</button>
            ${e.cpuPct===void 0?k:D`<span style="font-size:.72rem;color:var(--synology-subtext)">${e.cpuPct}% CPU</span>`}
            ${e.memoryUsage?D`<span style="font-size:.72rem;color:var(--synology-subtext)">${e.memoryUsage}</span>`:k}
            ${this.status(e)}
          </div>${this.controls(e,!1)}
        </div>`)}
      </div>`}
      ${this.renderCapability(`Default Portainer exposes no autostart toggle or image-update-available/check-updates entity. Restart is supported. CPU is shown only when the integration reports a percentage, never when it reports cumulative CPU time.`)}
    </ha-card>`}},editor:at,name:`Synology Docker Containers Card`,description:`Synology endpoint-scoped Portainer containers with start, stop and restart controls.`});var lt=[{key:`overview`,label:`Overview`,icon:Qe},{key:`storage`,label:`Storage & Disks`,icon:J},{key:`docker`,label:`Docker`,icon:Ye}];$({tag:Fe,editorTag:Ie,card:class extends X{static editorTag=Ie;static properties={...X.properties,_activeTab:{state:!0}};constructor(){super(),this._activeTab=`overview`}render(){let e=this.getActiveDevice(),t=lt.filter(e=>!this.config.tabs||this.config.tabs.includes(e.key)),n=t.some(e=>e.key===this._activeTab)?this._activeTab:t[0]?.key,r=e=>({...this.config,title:void 0,type:`custom:synology-${e}-card`,embedded:!0});return D`<ha-card style="gap:12px">
      ${this.renderHeader(`${this.config.title||e?.name_by_user||e?.name||`Synology NAS`} Dashboard`,`Unified Synology Control Center`,Qe)}
      ${this.renderErrors()}
      <div class="tab-strip" role="tablist" aria-label="Synology dashboard">
        ${t.map(e=>D`<button role="tab" aria-selected=${n===e.key} class="tab-btn ${n===e.key?`active`:``}"
          @click=${()=>this._activeTab=e.key}>${Y(e.icon,14)} ${e.label}</button>`)}
      </div><div role="tabpanel">
        ${n===`overview`?D`<synology-server-card .hass=${this.hass} .config=${r(`server`)}></synology-server-card>`:k}
        ${n===`storage`?D`<synology-storage-card .hass=${this.hass} .config=${r(`storage`)}></synology-storage-card>`:k}
        ${n===`docker`?D`<synology-docker-card .hass=${this.hass} .config=${r(`docker`)}></synology-docker-card>`:k}
        ${n?k:this.renderNotice(`All tabs are hidden. Enable tabs in the card editor.`)}
      </div>
    </ha-card>`}},editor:ot,name:`Synology Unified Dashboard Card`,description:`Tabbed Synology DSM and endpoint-scoped Portainer dashboard.`});