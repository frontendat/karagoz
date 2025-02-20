import t from"./BMYPR7BL.js";import n from"./BPhBrDlE.js";import e from"./ySlJ1b_l.js";import a from"./Dj6nwHGl.js";import i from"./BQoSv7ci.js";import{h as s}from"./5Ct-VuMp.js";const u=Object.freeze(JSON.parse('{"fileTypes":[],"injectTo":["text.html.markdown"],"injectionSelector":"L:text.html.markdown","name":"markdown-vue","patterns":[{"include":"#vue-code-block"}],"repository":{"vue-code-block":{"begin":"(^|\\\\G)(\\\\s*)(`{3,}|~{3,})\\\\s*(?i:(vue)((\\\\s+|:|,|\\\\{|\\\\?)[^`~]*)?$)","beginCaptures":{"3":{"name":"punctuation.definition.markdown"},"4":{"name":"fenced_code.block.language.markdown"},"5":{"name":"fenced_code.block.language.attributes.markdown","patterns":[]}},"end":"(^|\\\\G)(\\\\2|\\\\s{0,3})(\\\\3)\\\\s*$","endCaptures":{"3":{"name":"punctuation.definition.markdown"}},"name":"markup.fenced_code.block.markdown","patterns":[{"include":"source.vue"}]}},"scopeName":"markdown.vue.codeblock"}')),m=[u],r=Object.freeze(JSON.parse('{"fileTypes":[],"injectTo":["source.vue","text.html.markdown","text.html.derivative","text.pug"],"injectionSelector":"L:meta.tag -meta.attribute -meta.ng-binding -entity.name.tag.pug -attribute_value -source.tsx -source.js.jsx, L:meta.element -meta.attribute","name":"vue-directives","patterns":[{"include":"source.vue#vue-directives"}],"scopeName":"vue.directives"}')),c=[r],o=Object.freeze(JSON.parse('{"fileTypes":[],"injectTo":["source.vue","text.html.markdown","text.html.derivative","text.pug"],"injectionSelector":"L:text.pug -comment -string.comment, L:text.html.derivative -comment.block, L:text.html.markdown -comment.block","name":"vue-interpolations","patterns":[{"include":"source.vue#vue-interpolations"}],"scopeName":"vue.interpolations"}')),l=[o],d=Object.freeze(JSON.parse(`{"fileTypes":[],"injectTo":["source.vue"],"injectionSelector":"L:source.css -comment, L:source.postcss -comment, L:source.sass -comment, L:source.stylus -comment","name":"vue-sfc-style-variable-injection","patterns":[{"include":"#vue-sfc-style-variable-injection"}],"repository":{"vue-sfc-style-variable-injection":{"begin":"\\\\b(v-bind)\\\\s*\\\\(","beginCaptures":{"1":{"name":"entity.name.function"}},"end":"\\\\)","name":"vue.sfc.style.variable.injection.v-bind","patterns":[{"begin":"('|\\")","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html"}},"end":"(\\\\1)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html"}},"name":"source.ts.embedded.html.vue","patterns":[{"include":"source.js"}]},{"include":"source.js"}]}},"scopeName":"vue.sfc.style.variable.injection","embeddedLangs":["javascript"]}`)),g=[...e,d],p=Object.freeze(JSON.parse(`{"displayName":"Vue","name":"vue","patterns":[{"include":"#vue-comments"},{"include":"text.html.basic#comment"},{"include":"#self-closing-tag"},{"begin":"(<)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"}},"end":"(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html.vue"}},"patterns":[{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)md\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"text.html.markdown","patterns":[{"include":"text.html.markdown"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)html\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"text.html.derivative","patterns":[{"include":"#html-stuff"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)pug\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"text.pug","patterns":[{"include":"text.pug"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)stylus\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.stylus","patterns":[{"include":"source.stylus"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)postcss\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.postcss","patterns":[{"include":"source.postcss"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)sass\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.sass","patterns":[{"include":"source.sass"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)css\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.css","patterns":[{"include":"source.css"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)scss\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.css.scss","patterns":[{"include":"source.css.scss"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)less\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.css.less","patterns":[{"include":"source.css.less"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)js\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.js","patterns":[{"include":"source.js"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)ts\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.ts","patterns":[{"include":"source.ts"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)jsx\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.js.jsx","patterns":[{"include":"source.js.jsx"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)tsx\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.tsx","patterns":[{"include":"source.tsx"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)coffee\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.coffee","patterns":[{"include":"source.coffee"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)json\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.json","patterns":[{"include":"source.json"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)jsonc\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.json.comments","patterns":[{"include":"source.json.comments"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)json5\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.json5","patterns":[{"include":"source.json5"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)yaml\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.yaml","patterns":[{"include":"source.yaml"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)toml\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.toml","patterns":[{"include":"source.toml"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)(gql|graphql)\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.graphql","patterns":[{"include":"source.graphql"}]}]},{"begin":"([a-zA-Z0-9:-]+)\\\\b(?=[^>]*\\\\blang\\\\s*=\\\\s*(['\\"]?)vue\\\\b\\\\2)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"source.vue","patterns":[{"include":"source.vue"}]}]},{"begin":"(template)\\\\b","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/template\\\\b)","name":"text.html.derivative","patterns":[{"include":"#html-stuff"}]}]},{"begin":"(script)\\\\b","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/script\\\\b)","name":"source.js","patterns":[{"include":"source.js"}]}]},{"begin":"(style)\\\\b","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/style\\\\b)","name":"source.css","patterns":[{"include":"source.css"}]}]},{"begin":"([a-zA-Z0-9:-]+)","beginCaptures":{"1":{"name":"entity.name.tag.$1.html.vue"}},"end":"(</)(\\\\1)\\\\s*(?=>)","endCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"patterns":[{"include":"#tag-stuff"},{"begin":"(?<=>)","end":"(?=<\\\\/)","name":"text"}]}]}],"repository":{"html-stuff":{"patterns":[{"include":"#template-tag"},{"include":"text.html.derivative"},{"include":"text.html.basic"}]},"self-closing-tag":{"begin":"(<)([a-zA-Z0-9:-]+)(?=([^>]+/>))","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"end":"(/>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html.vue"}},"name":"self-closing-tag","patterns":[{"include":"#tag-stuff"}]},"tag-stuff":{"begin":"\\\\G","end":"(?=/>)|(>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html.vue"}},"name":"meta.tag-stuff","patterns":[{"include":"#vue-directives"},{"include":"text.html.basic#attribute"}]},"template-tag":{"patterns":[{"include":"#template-tag-1"},{"include":"#template-tag-2"}]},"template-tag-1":{"begin":"(<)(template)\\\\b(>)","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"},"3":{"name":"punctuation.definition.tag.end.html.vue"}},"end":"(/?>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html.vue"}},"name":"meta.template-tag.start","patterns":[{"begin":"\\\\G","end":"(?=/>)|((</)(template)\\\\b)","endCaptures":{"2":{"name":"punctuation.definition.tag.begin.html.vue"},"3":{"name":"entity.name.tag.$3.html.vue"}},"name":"meta.template-tag.end","patterns":[{"include":"#html-stuff"}]}]},"template-tag-2":{"begin":"(<)(template)\\\\b","beginCaptures":{"1":{"name":"punctuation.definition.tag.begin.html.vue"},"2":{"name":"entity.name.tag.$2.html.vue"}},"end":"(/?>)","endCaptures":{"1":{"name":"punctuation.definition.tag.end.html.vue"}},"name":"meta.template-tag.start","patterns":[{"begin":"\\\\G","end":"(?=/>)|((</)(template)\\\\b)","endCaptures":{"2":{"name":"punctuation.definition.tag.begin.html.vue"},"3":{"name":"entity.name.tag.$3.html.vue"}},"name":"meta.template-tag.end","patterns":[{"include":"#tag-stuff"},{"include":"#html-stuff"}]}]},"vue-comments":{"patterns":[{"include":"#vue-comments-key-value"}]},"vue-comments-key-value":{"begin":"(<!--)\\\\s*(@)([\\\\w$]+)(?=\\\\s)","beginCaptures":{"1":{"name":"punctuation.definition.comment.vue"},"2":{"name":"punctuation.definition.block.tag.comment.vue"},"3":{"name":"storage.type.class.comment.vue"}},"end":"(-->)","endCaptures":{"1":{"name":"punctuation.definition.comment.vue"}},"name":"comment.block.vue","patterns":[{"include":"source.json#value"}]},"vue-directives":{"patterns":[{"include":"#vue-directives-control"},{"include":"#vue-directives-style-attr"},{"include":"#vue-directives-original"},{"include":"#vue-directives-generic-attr"}]},"vue-directives-control":{"begin":"(v-for)|(v-if|v-else-if|v-else)","captures":{"1":{"name":"keyword.control.loop.vue"},"2":{"name":"keyword.control.conditional.vue"}},"end":"(?=\\\\s*+[^=\\\\s])","name":"meta.attribute.directive.control.vue","patterns":[{"include":"#vue-directives-expression"}]},"vue-directives-expression":{"patterns":[{"begin":"(=)\\\\s*('|\\"|\`)","beginCaptures":{"1":{"name":"punctuation.separator.key-value.html.vue"},"2":{"name":"punctuation.definition.string.begin.html.vue"}},"end":"(\\\\2)","endCaptures":{"1":{"name":"punctuation.definition.string.end.html.vue"}},"patterns":[{"begin":"(?<=('|\\"|\`))","end":"(?=\\\\1)","name":"source.ts.embedded.html.vue","patterns":[{"include":"source.ts#expression"}]}]},{"begin":"(=)\\\\s*(?=[^'\\"\`])","beginCaptures":{"1":{"name":"punctuation.separator.key-value.html.vue"}},"end":"(?=(\\\\s|>|\\\\/>))","patterns":[{"begin":"(?=[^'\\"\`])","end":"(?=(\\\\s|>|\\\\/>))","name":"source.ts.embedded.html.vue","patterns":[{"include":"source.ts#expression"}]}]}]},"vue-directives-generic-attr":{"begin":"\\\\b(generic)\\\\s*(=)","captures":{"1":{"name":"entity.other.attribute-name.html.vue"},"2":{"name":"punctuation.separator.key-value.html.vue"}},"end":"(?<='|\\")","name":"meta.attribute.generic.vue","patterns":[{"begin":"('|\\")","beginCaptures":{"1":{"name":"punctuation.definition.string.begin.html.vue"}},"comment":"https://github.com/microsoft/vscode/blob/fd4346210f59135fad81a8b8c4cea7bf5a9ca6b4/extensions/typescript-basics/syntaxes/TypeScript.tmLanguage.json#L4002-L4020","end":"(\\\\1)","endCaptures":{"1":{"name":"punctuation.definition.string.end.html.vue"}},"name":"meta.type.parameters.vue","patterns":[{"include":"source.ts#comment"},{"match":"(?<![_$[:alnum:]])(?:(?<=\\\\.\\\\.\\\\.)|(?<!\\\\.))(extends|in|out)(?![_$[:alnum:]])(?:(?=\\\\.\\\\.\\\\.)|(?!\\\\.))","name":"storage.modifier.ts"},{"include":"source.ts#type"},{"include":"source.ts#punctuation-comma"},{"match":"(=)(?!>)","name":"keyword.operator.assignment.ts"}]}]},"vue-directives-original":{"begin":"(?:(?:(v-[\\\\w-]+)(:)?)|([:\\\\.])|(@)|(#))(?:(?:(\\\\[)([^\\\\]]*)(\\\\]))|([\\\\w-]+))?","beginCaptures":{"1":{"name":"entity.other.attribute-name.html.vue"},"2":{"name":"punctuation.separator.key-value.html.vue"},"3":{"name":"punctuation.attribute-shorthand.bind.html.vue"},"4":{"name":"punctuation.attribute-shorthand.event.html.vue"},"5":{"name":"punctuation.attribute-shorthand.slot.html.vue"},"6":{"name":"punctuation.separator.key-value.html.vue"},"7":{"name":"source.ts.embedded.html.vue","patterns":[{"include":"source.ts#expression"}]},"8":{"name":"punctuation.separator.key-value.html.vue"},"9":{"name":"entity.other.attribute-name.html.vue"}},"end":"(?=\\\\s*[^=\\\\s])","endCaptures":{"1":{"name":"punctuation.definition.string.end.html.vue"}},"name":"meta.attribute.directive.vue","patterns":[{"1":{"name":"punctuation.separator.key-value.html.vue"},"2":{"name":"entity.other.attribute-name.html.vue"},"match":"(\\\\.)([\\\\w-]*)"},{"include":"#vue-directives-expression"}]},"vue-directives-style-attr":{"begin":"\\\\b(style)\\\\s*(=)","captures":{"1":{"name":"entity.other.attribute-name.html.vue"},"2":{"name":"punctuation.separator.key-value.html.vue"}},"end":"(?<='|\\")","name":"meta.attribute.style.vue","patterns":[{"begin":"('|\\")","beginCaptures":{"1":{"name":"punctuation.definition.string.begin.html.vue"}},"comment":"Copy from source.css#rule-list-innards","end":"(\\\\1)","endCaptures":{"1":{"name":"punctuation.definition.string.end.html.vue"}},"name":"source.css.embedded.html.vue","patterns":[{"include":"source.css#comment-block"},{"include":"source.css#escapes"},{"include":"source.css#font-features"},{"match":"(?<![\\\\w-])--(?:[-a-zA-Z_]|[^\\\\x00-\\\\x7F])(?:[-a-zA-Z0-9_]|[^\\\\x00-\\\\x7F]|\\\\\\\\(?:[0-9a-fA-F]{1,6}|.))*","name":"variable.css"},{"begin":"(?<![-a-zA-Z])(?=[-a-zA-Z])","end":"$|(?![-a-zA-Z])","name":"meta.property-name.css","patterns":[{"include":"source.css#property-names"}]},{"begin":"(:)\\\\s*","beginCaptures":{"1":{"name":"punctuation.separator.key-value.css"}},"comment":"Modify end to fix #199. TODO: handle ' character.","contentName":"meta.property-value.css","end":"\\\\s*(;)|\\\\s*(?='|\\")","endCaptures":{"1":{"name":"punctuation.terminator.rule.css"}},"patterns":[{"include":"source.css#comment-block"},{"include":"source.css#property-values"}]},{"match":";","name":"punctuation.terminator.rule.css"}]}]},"vue-interpolations":{"patterns":[{"begin":"(\\\\{\\\\{)","beginCaptures":{"1":{"name":"punctuation.definition.interpolation.begin.html.vue"}},"end":"(\\\\}\\\\})","endCaptures":{"1":{"name":"punctuation.definition.interpolation.end.html.vue"}},"name":"expression.embedded.vue","patterns":[{"begin":"\\\\G","end":"(?=\\\\}\\\\})","name":"source.ts.embedded.html.vue","patterns":[{"include":"source.ts#expression"}]}]}]}},"scopeName":"source.vue","embeddedLangs":["html","css","javascript","typescript","json","html-derivative","markdown-vue","vue-directives","vue-interpolations","vue-sfc-style-variable-injection"],"embeddedLangsLazy":["markdown","pug","stylus","sass","scss","less","jsx","tsx","coffee","jsonc","json5","yaml","toml","graphql"]}`)),$=[...t,...n,...e,...a,...i,...s,...m,...c,...l,...g,p];export{$ as default};
