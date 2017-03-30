!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.ESjs=t():e.ESjs=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=5)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i=n(6),o=n(8),s=function(e,t){var n=String(e);return t.forEach(function(e){n=e.run(n)}),n},u={run:function(e){var t=[r.StandardTokenizer,o.Stopwords,i.PorterStemmer];return s(e,t)},tokenize:function(e){var t=[r.StandardTokenizer,o.Stopwords];return s(e,t)}};t.default=u},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(10);Object.defineProperty(t,"StandardTokenizer",{enumerable:!0,get:function(){return r(i).default}});t.tokenCount=function(e){var t={};return e.forEach(function(e){t[e]||(t[e]=0),t[e]+=1}),t}},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(s),a=function(){function e(t,n){r(this,e),this.query=e.normalizeQuery(n),this.idx=t,this.idfCache={}}return o(e,null,[{key:"normalizeQuery",value:function(e){return"string"==typeof e?{must:{match:{_all:e}}}:e}},{key:"mergeMatches",value:function(e,t){var n=JSON.parse(JSON.stringify(e));return Object.keys(t).forEach(function(e){n[e]||(n[e]=0),n[e]+=t[e]}),n}},{key:"valueForType",value:function(t,n){var r="raw"===n?"value":"query";return e.valueFromQuery(t,r)}},{key:"valueFromQuery",value:function(e,t){return"string"==typeof e?e:e[t]}},{key:"pipelineForType",value:function(e,t){var n="raw"===t?"tokenize":"run";return u.default[n](e)}}]),o(e,[{key:"search",value:function(){var e=this.filterResults(this.searchFields(this.query.must)),t=[];return Object.keys(e).forEach(function(n){return t.push({id:n,score:e[n]})}),t.sort(function(e,t){return t.score-e.score}),t}},{key:"searchFields",value:function(t){var n=this,r={};return Object.keys(t).forEach(function(i){var o=n[i](t[i]);r=e.mergeMatches(r,o)}),r}},{key:"filterResults",value:function(e){if(!this.query.filter)return e;var t=Object.keys(this.searchFields(this.query.filter)),n={};return Object.keys(e).forEach(function(r){t.indexOf(r)===-1&&(n[r]=e[r])}),n}},{key:"match",value:function(e){return this.matchOnIndex(e,"tokenized")}},{key:"term",value:function(e){return this.matchOnIndex(e,"raw")}},{key:"matchOnIndex",value:function(t,n){var r=this,i={},o=this.fieldsFromQuery(t,n);return Object.keys(o).forEach(function(t){var s=r.matchField(t,o[t],n);i=e.mergeMatches(i,s)}),i}},{key:"matchField",value:function(e,t,n){var r=this,i={};return t.tokens.forEach(function(o){var s=r.idx.getNode(e,o,n);s&&Object.keys(s.docs).forEach(function(n){i[n]=r.scoreDoc({id:n,token:o,field:e,query:t,df:s.df,tf:s.docs[n].tf})})}),i}},{key:"scoreDoc",value:function(e){return this.idf(e)*this.fieldNorm(e)*e.tf*e.query.boost}},{key:"idf",value:function(e){var t=e.field+"/"+e.token;if(!this.idfCache[t]){var n=this.idx.docCount(),r=e.df,i=1+Math.log(n/(r+1));this.idfCache[t]=i}return this.idfCache[t]}},{key:"fieldNorm",value:function(e){var t=this.idx.getDoc(e.id),n=t[e.field]?t[e.field].size:0;return 0===n?1:1/Math.sqrt(n)}},{key:"boostFromQuery",value:function(e,t){return"object"===(void 0===t?"undefined":i(t))&&t.boost?t.boost:this.idx.fieldBoost(e)}},{key:"fieldsFromQuery",value:function(t,n){var r=this;if(t._all)return this.allFieldsQuery(t._all,n);var i={};return Object.keys(t).forEach(function(o){var s=e.valueForType(t[o],n),u=r.boostFromQuery(o,t[o]),a=e.pipelineForType(s,n);i[o]={tokens:a,boost:u}}),i}},{key:"allFieldsQuery",value:function(t,n){var r=this,i={},o=e.valueForType(t,n),s=e.pipelineForType(o,n);return Object.keys(this.idx.fields).forEach(function(e){var n=r.boostFromQuery(e,t);i[e]={tokens:s,boost:n}}),i}}]),e}();t.default=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={serialize:function(e){return JSON.stringify({version:"1.0",fields:e.fields,docs:e.docs,index:e.index})},deserialize:function(e){var t=JSON.parse(e);if("1.0"!==t.version)throw new Error("Can't deserialize from version "+t.version);return t}};t.default=r},function(e,t,n){"use strict";!function(){function e(e){var t,s,f,d,h,v,y;if(e.length<3)return e;if(f=e.substr(0,1),"y"==f&&(e=f.toUpperCase()+e.substr(1)),d=/^(.+?)(ss|i)es$/,h=/^(.+?)([^s])s$/,d.test(e)?e=e.replace(d,"$1$2"):h.test(e)&&(e=e.replace(h,"$1$2")),d=/^(.+?)eed$/,h=/^(.+?)(ed|ing)$/,d.test(e)){var m=d.exec(e);d=new RegExp(u),d.test(m[1])&&(d=/.$/,e=e.replace(d,""))}else if(h.test(e)){var m=h.exec(e);t=m[1],h=new RegExp(c),h.test(t)&&(e=t,h=/(at|bl|iz)$/,v=new RegExp("([^aeiouylsz])\\1$"),y=new RegExp("^"+o+i+"[^aeiouwxy]$"),h.test(e)?e+="e":v.test(e)?(d=/.$/,e=e.replace(d,"")):y.test(e)&&(e+="e"))}if(d=/^(.+?)y$/,d.test(e)){var m=d.exec(e);t=m[1],d=new RegExp(c),d.test(t)&&(e=t+"i")}if(d=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,d.test(e)){var m=d.exec(e);t=m[1],s=m[2],d=new RegExp(u),d.test(t)&&(e=t+n[s])}if(d=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,d.test(e)){var m=d.exec(e);t=m[1],s=m[2],d=new RegExp(u),d.test(t)&&(e=t+r[s])}if(d=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,h=/^(.+?)(s|t)(ion)$/,d.test(e)){var m=d.exec(e);t=m[1],d=new RegExp(l),d.test(t)&&(e=t)}else if(h.test(e)){var m=h.exec(e);t=m[1]+m[2],h=new RegExp(l),h.test(t)&&(e=t)}if(d=/^(.+?)e$/,d.test(e)){var m=d.exec(e);t=m[1],d=new RegExp(l),h=new RegExp(a),v=new RegExp("^"+o+i+"[^aeiouwxy]$"),(d.test(t)||h.test(t)&&!v.test(t))&&(e=t)}return d=/ll$/,h=new RegExp(l),d.test(e)&&h.test(e)&&(d=/.$/,e=e.replace(d,"")),"y"==f&&(e=f.toLowerCase()+e.substr(1)),e}var n={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},r={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},i="[aeiouy]",o="[^aeiou][^aeiouy]*",s=i+"[aeiou]*",u="^("+o+")?"+s+o,a="^("+o+")?"+s+o+"("+s+")?$",l="^("+o+")?"+s+o+s+o,c="^("+o+")?"+i,f={},d=function(t){return f[t]||(f[t]=e(t)),f[t]};void 0!==t&&null!=t&&(t.stemmer=e,t.memoizingStemmer=d)}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),u=r(s),a=n(3),l=r(a),c=n(1),f=n(2),d=r(f),h=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";i(this,e),this.fields=t?t.fields:{},this.docs={},this.index={tokenized:{},raw:{}},this.storeDocs=!!t&&t.storeDocs,n&&this.deserialize(n)}return o(e,[{key:"serialize",value:function(){return l.default.serialize(this)}},{key:"deserialize",value:function(e){var t=l.default.deserialize(e);this.fields=t.fields,this.docs=t.docs,this.index=t.index}},{key:"addDocs",value:function(e){var t=this;e.forEach(function(e){return t.addDoc(e)})}},{key:"addDoc",value:function(e){if(!e.id)throw new Error("documents must have an id attribute");this.storeDoc(e),this.indexDoc(e)}},{key:"search",value:function(e){var t=new d.default(this,e).search();return this.storeDocs?this.hydrateResults(t):t}},{key:"hydrateResults",value:function(e){var t=this;return e.map(function(e){return{id:e.id,score:e.score,doc:t.docs[e.id].doc}})}},{key:"storeDoc",value:function(e){this.docs[e.id]={},this.storeDocs&&(this.docs[e.id].doc=JSON.parse(JSON.stringify(e)))}},{key:"updateDocFieldLength",value:function(e,t,n){this.docs[e.id][t]||(this.docs[e.id][t]={}),this.docs[e.id][t].size=n}},{key:"indexDoc",value:function(e){var t=this;Object.keys(this.fields).forEach(function(n){t.indexField(n,e)})}},{key:"ensureFieldIndex",value:function(e){var t=this;["tokenized","raw"].forEach(function(n){t.index[n][e]||(t.index[n][e]={})})}},{key:"indexField",value:function(e,t){t[e]&&(this.ensureFieldIndex(e),this.addTokens(t,e),this.addTerms(t,e))}},{key:"addTokens",value:function(e,t){var n=u.default.run(e[t]);this.updateDocFieldLength(e,t,n.length),this.addTokensWithCounts(e,t,n)}},{key:"addTerms",value:function(e,t){var n=u.default.tokenize(e[t]);this.addTokensWithCounts(e,t,n,"raw")}},{key:"addTokensWithCounts",value:function(e,t,n){var r=this,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"tokenized",o=(0,c.tokenCount)(n);Object.keys(o).forEach(function(n){var s=Math.sqrt(o[n]);r.addToken(t,n,{id:e.id,tf:s},i)})}},{key:"addToken",value:function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"tokenized",i=this.getNode(e,t,r,!0);i.docs[n.id]?i.docs[n.id].tf=n.tf:(i.docs[n.id]={tf:n.tf},i.df+=1)}},{key:"fieldBoost",value:function(e){return this.fields[e]&&this.fields[e].boost?this.fields[e].boost:1}},{key:"docCount",value:function(){return Object.keys(this.docs).length}},{key:"getDoc",value:function(e){return this.docs[e]}},{key:"getNode",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"tokenized",r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=0,o=this.index[n][e];if(!o)return null;for(;i<t.length;){var s=t[i];if(!(s in o)){if(!r)return null;o[s]={docs:{},df:0}}i+=1,o=o[s]}return o}}]),e}();t.default=h},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(7);Object.defineProperty(t,"PorterStemmer",{enumerable:!0,get:function(){return r(i).default}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(4),i={run:function(e){return e.map(function(e){return(0,r.stemmer)(e)})}};t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Stopwords=void 0;var r=n(9),i=function(e){return e&&e.__esModule?e:{default:e}}(r);t.Stopwords={run:function(e){return e.filter(function(e){return i.default.indexOf(e)===-1})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=["a","about","above","across","after","afterwards","again","against","all","almost","alone","along","already","also","although","always","am","among","amongst","amoungst","amount","an","and","another","any","anyhow","anyone","anything","anyway","anywhere","are","around","as","at","back","be","became","because","become","becomes","becoming","been","before","beforehand","behind","being","below","beside","besides","between","beyond","bill","both","bottom","but","by","call","can","cannot","cant","co","computer","con","could","couldnt","cry","de","describe","detail","do","done","down","due","during","each","eg","eight","either","eleven","else","elsewhere","empty","enough","etc","even","ever","every","everyone","everything","everywhere","except","few","fifteen","fify","fill","find","fire","first","five","for","former","formerly","forty","found","four","from","front","full","further","get","give","go","had","has","hasnt","have","he","hence","her","here","hereafter","hereby","herein","hereupon","hers","herself","him","himself","his","how","however","hundred","i","ie","if","in","inc","indeed","interest","into","is","it","its","itse","keep","last","latter","latterly","least","less","ltd","made","many","may","me","meanwhile","might","mill","mine","more","moreover","most","mostly","move","much","must","my","myself","name","namely","neither","never","nevertheless","next","nine","no","nobody","none","noone","nor","not","nothing","now","nowhere","of","off","often","on","once","one","only","onto","or","other","others","otherwise","our","ours","ourselves","out","over","own","part","per","perhaps","please","put","rather","re","same","see","seem","seemed","seeming","seems","serious","several","she","should","side","since","sincere","six","sixty","so","some","somehow","someone","something","sometime","sometimes","somewhere","still","such","system","take","ten","than","that","the","their","them","themselves","then","thence","there","thereafter","thereby","therefore","therein","thereupon","these","they","thick","thin","third","this","those","though","three","through","throughout","thru","thus","to","together","too","top","toward","towards","twelve","twenty","two","un","under","until","up","upon","us","very","via","was","we","well","were","what","whatever","when","whence","whenever","where","whereafter","whereas","whereby","wherein","whereupon","wherever","whether","which","while","whither","who","whoever","whole","whom","whose","why","will","with","within","without","would","yet","you","your","yours","yourself","yourselves"];t.default=r},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={run:function(e){var t=[];return e?e.replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,-.\/:;<=>?@[\]^_`{|}~]/g," ").toLowerCase().split(/\s+/).filter(function(e){return""!==e}):t}};t.default=r}])});