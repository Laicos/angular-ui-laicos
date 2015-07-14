!function(i,o){"use strict";o.module("laicos.ui.templates",[]),o.module("laicos.ui",["laicos.ui.backgroundimage","laicos.ui.video.youtube","laicos.ui.video.vimeo","laicos.ui.video.videogular","laicos.ui.textarea","laicos.ui.contenteditable","laicos.ui.webinfo","laicos.ui.compile","laicos.ui.templates"])}(window,window.angular);
!function(n,i){"use strict";i.module("laicos.ui.backgroundimage",[]).directive("laicosUiBackgroundImage",[function(){return{restrict:"E",link:function(n,i,o){o.$observe("src",function(){i.css({"background-image":"url("+o.src+")","background-size":o.size||"contain","background-repeat":o.repeat||"no-repeat","background-position":o.position||"center"})})}}}])}(window,window.angular);
!function(i,n){"use strict";n.module("laicos.ui.busy",[]).directive("laicosUiBusy",[function(){return{restrict:"E",link:function(i,n,u){}}}])}(window,window.angular);
!function(i,n){"use strict";n.module("laicos.ui.compile",[]).directive("laicosUiCompile",["$parse","$compile",function(i,n){return{restrict:"A",scope:!1,link:function(t,s,e){var o=i(e.laicosUiCompile)(t);'"'==o.substring(0,1)&&(o=o.substring(1)),'"'==o.substring(o.length-1,1)&&(o=o.substring(o.length-1,1)),s.html(o),n(s.contents())(t)}}}])}(window,window.angular);
!function(e,n){"use strict";n.module("laicos.ui.contenteditable",[]).directive("contenteditable",["$timeout","$document","$window",function(e,i,o){return{restrict:"A",require:"?ngModel",scope:{uiChange:"&"},link:function(e,i,o,t){function u(n){e.$evalAsync(function(){var n=i.html();t.$setViewValue(n),e.uiChange({$value:t.$modelValue}),""===n&&e.$evalAsync(function(){i[0].blur(),i[0].focus()})})}return t?(i.on("keyup",u),n.isDefined(o.allowHtml)||t.$parsers.push(function(e){return e.replace(/<div>/gi,"\n").replace(/(<([^>]+)>)/gi,"")}),t.$render=function(){i.html(t.$viewValue||"")},void e.$on("$destroy",function(){i.off()})):void console.log("laicos.ui.contenteditable missing ngModel")}}}])}(window,window.angular);
!function(e,i){"use strict";i.module("laicos.ui.textarea",[]).directive("laicosUiTextareaResize",[function(){return{restrict:"A",link:function(e,i){var t=i[0],n=_.debounce(function(e){t.style.height="",t.style.height=Math.ceil(t.scrollHeight)+"px"},250);i.on("keyup",n),e.$on("$destroy",function(){i.off("change",n)})}}}])}(window,window.angular);
!function(i,n){"use strict";n.module("laicos.ui.typeahead",[]).directive("laicosUiTypeahead",[function(){return{restrict:"A",link:function(){}}}])}(window,window.angular);
!function(e,r){"use strict";r.module("laicos.ui.webinfo",[]).service("laicos.ui.WebInfo",["$http","$q","$document",function(e,r,t){function o(r){var t="http://query.yahooapis.com/v1/public/yql";return e.get(t,{headers:{},params:{q:'select * from html where url="'+r+"\" and (xpath=\"//title|//head/meta[@name='description']/@content|//head/meta[@property='og:image']/@content|//img|//head/link[@rel='icon']|//head/link[@rel='shortcut icon']\")",format:"json"}}).then(function(e){if(e&&e.data&&e.data.query&&e.data.query.results){var t,o=URI.parse(r);switch(o.query=o.query?URI.parseQuery(o.query):void 0,o.hostname){case"www.youtube.com":case"youtube.com":case"m.youtube.com":t={source:"youtube",url:r,id:o.query.v};break;case"www.youtu.be":case"youtu.be":var n=o.path.substring(1);t={source:"youtube",url:r,id:n};break;case"www.vimeo.com":case"vimeo.com":var n=o.path.substring(1);t={source:"vimeo",url:r,playUrl:"https://player.vimeo.com/video/"+n+"?title=0&badge=0&byline=0&portrait=0&api=1&player_id=vimeo-"+n,id:n}}return{url:r,video:t,info:o,title:e.data.query.results.title,description:u(e.data.query.results.meta),icon:a(e.data.query.results.link),images:i(e.data.query.results.meta,e.data.query.results.img)}}throw new Error("WebInfo: malformed response")})}function a(e){return{src:e&&e.length?e[0].href:void 0}}function u(e){var r=_.find(e,function(e){return"description"==e.name});return r?r.content:void 0}function i(e,r){return _.each(e,function(e){"og:image"==e.property&&r.unshift({src:e.content})}),r=_.map(r,function(e){var r=e["data-icon"]||e["data-thumb"]||e.src;return{src:r}})}var n={parseUrl:function(e){var t,a=new URI(e);switch(a.domain()){case"youtube.com":var u=a.query();t=r.resolve({source:"youtube",url:e,video:u.v});break;case"youtu.be":var i=a.path().substring(1);t=r.resolve({source:"youtube",url:e,video:i});break;case"vimeo.com":var i=a.path().substring(1);t=r.resolve({source:"vimeo",url:e,playUrl:"https://player.vimeo.com/video/"+i+"?title=0&badge=0&byline=0&portrait=0&api=1&player_id=vimeo-"+i,video:i});break;default:t=o(e)}return t}};return n}])}(window,window.angular);
!function(n,i){"use strict";i.module("laicos.ui.video.manager",[]).service("laicos.ui.video.Manager",["$timeout",function(n){var o,t=[],e={PLAY:"play",STOP:"stop",onPlay:function(n){o&&o!=n&&o.abort(),o=n,i.forEach(t,function(n){i.isFunction(n)&&n(e.PLAY)})},onStop:function(n){i.forEach(t,function(n){i.isFunction(n)&&n(e.STOP)})},addEventListener:function(n){t.push(n)},removeEventListener:function(n){t.splice(t.indexOf(n),1)}};return e}])}(window,window.angular);
!function(e,o){"use strict";o.module("laicos.ui.video.videogular",["laicos.ui.video.manager"]).service("laicos.ui.video.Videogular",["$q","laicos.ui.video.Manager",function(e,o){var t=e.defer(),a=function(){return t.promise},i=void 0;return a.abort=function(){i&&i.stop()},a.onPlay=function(e){i&&i!=e&&a.abort(),i=e,o.onPlay(a)},a.onStop=function(e){i&&o.onStop(a)},t.resolve(a),a}]).directive("laicosUiVideogular",["$timeout","laicos.ui.video.Manager","laicos.ui.video.Videogular",function(e,o,t){return{restrict:"E",template:'<videogular vg-player-ready="_onVgPlayerReady($API)" vg-update-state="_onVgUpdateState($state)"> <vg-media vg-src="activity.player.sources"> </vg-media> <vg-controls><vg-fullscreen-button></vg-fullscreen-button> </vg-controls> <vg-overlay-play></vg-overlay-play> <vg-poster vg-url="activity.player.plugins.poster"></vg-poster> </videogular>',compile:function(){return{pre:function(a,i,n){function r(o){e(function(){a.$eval(n.onEvent,{$event:o})})}if(i.length){var l;a._onVgPlayerReady=function(e){l=e},a._onVgUpdateState=function(e){switch(console.log("state:",e),e){case"play":t.onPlay(l),r(o.PLAY);break;case"pause":case"stop":t.onStop(l),r(o.STOP)}}}}}}}}])}(window,window.angular);
!function(e,n){"use strict";n.module("laicos.ui.video.vimeo",["laicos.ui.video.manager"]).service("laicos.ui.Vimeo",["$q","laicos.ui.video.Manager",function(e,i){function t(e){u=e,i.onPlay(a)}function o(e){u&&i.onStop(a)}var r=e.defer(),a=function(){return r.promise},u=void 0;return a.abort=function(){u&&u.api("pause")},a.getActive=function(){return u},a.getPlayer=function(r){var c=e.defer(),l=Froogaloop(r.element);return l.addEvent("ready",function(){l.addEvent("play",function(){u&&u!=l&&a.abort(),t(l),n.isFunction(r.onEvent)&&r.onEvent(i.PLAY)}),l.addEvent("pause",function(){o(l),n.isFunction(r.onEvent)&&r.onEvent(i.STOP)}),l.addEvent("finish",function(){o(l),n.isFunction(r.onEvent)&&r.onEvent(i.STOP)}),c.resolve(l)}),c.promise},r.resolve(a),a}]).directive("laicosUiVimeo",["$timeout","laicos.ui.Vimeo",function(e,n){return{restrict:"E",scope:{onEvent:"&",playerId:"=",playerSrc:"="},template:'<iframe class="vimeo-player" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',link:function(i,t,o){function r(n){e(function(){i.onEvent({$event:n})})}if(t.length){var a,u="vimeo-"+i.playerId,c=t[0].querySelector(".vimeo-player");c.setAttribute("id",u),c.setAttribute("src",i.playerSrc),n.getPlayer({id:u,element:c,onEvent:r}).then(function(e){a=e})}}}}])}(window,window.angular);
!function(e,t){"use strict";t.module("laicos.ui.video.youtube",["laicos.ui.video.manager"]).factory("laicos.ui.YouTube",["$document","$window","$q","laicos.ui.video.Manager",function(o,n,i,a){function r(){e.onYouTubePlayerAPIReady=function(){l._api=e.YT,u.resolve(l)}}var u=i.defer(),c=e.location.protocol+"//"+e.location.hostname+(e.location.port?":"+e.location.port:""),l=function(){return u.promise},d=void 0;l.abort=function(){d&&d.stopVideo()},l.getActive=function(){return d},l.getPlayer=function(e){var o=i.defer();return l().then(function(){if(!e.id)return o.reject("id is required",e.id);var n=new l._api.Player(e.id,{width:"100%",height:"100%",playerVars:{enablejsapi:1,rel:0,autoplay:0,controls:0,showinfo:0},origin:c,videoId:e.videoId,events:{onReady:function(o){t.isFunction(e.onReady)&&e.onReady(o)},onStateChange:function(t){switch(t.data){case l._api.PlayerState.ENDED:case l._api.PlayerState.PAUSED:a.onStop(l),e.onEvent(a.STOP);break;case l._api.PlayerState.PLAYING:d&&d!=n&&l.abort(),d=n,a.onPlay(l),e.onEvent(a.PLAY)}}}});o.resolve(n)}),o.promise};var s=o[0].createElement("script");s.type="text/javascript",s.async=!0,s.src="https://www.youtube.com/player_api",s.onreadystatechange=function(){"complete"==this.readyState&&r()},s.onload=r();var y=o[0].getElementsByTagName("body")[0];return y.appendChild(s),l}]).directive("laicosUiYoutube",["$timeout","laicos.ui.YouTube",function(e,t){return{restrict:"E",scope:{onEvent:"&",playerId:"=",playerSrc:"="},template:'<div class="youtube-player"></div>',link:function(o,n,i){function a(t){e(function(){o.onEvent({$event:t})})}if(n.length){var r,u="youtube-"+o.playerId,c=n[0].querySelector(".youtube-player");c.setAttribute("id",u),t().then(function(e){e.getPlayer({id:u,videoId:o.playerSrc,onEvent:a}).then(function(e){r=e})})}}}}])}(window,window.angular);
angular.module("laicos.ui.templates").run(["$templateCache", function($templateCache) {$templateCache.put("directives/Busy.html","");}]);