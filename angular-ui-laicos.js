!function(i,o){"use strict";o.module("laicos.ui",["laicos.ui.backgroundimage"])}(window,window.angular);
!function(n,o){"use strict";o.module("laicos.ui.backgroundimage",[]).directive("laicosUiBackgroundImage",[function(){return{restrict:"E",link:function(n,o,i){i.$observe("src",function(){console.log(i.src,i),o.css({"background-image":"url("+i.src+")","background-size":i.size||"contain","background-repeat":i.repeat||"no-repeat","background-position":i.position||"center"})})}}}])}(window,window.angular);