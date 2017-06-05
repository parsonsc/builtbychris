// Waypoints js
/*!
Waypoints - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var n in t){var r=t[n];for(var s in this.waypoints[n]){var a,l,h,p,u,c=this.waypoints[n][s],d=c.options.offset,f=c.triggerPoint,w=0,y=null==f;c.element!==c.element.window&&(w=c.adapter.offset()[r.offsetProp]),"function"==typeof d?d=d.apply(c):"string"==typeof d&&(d=parseFloat(d),c.options.offset.indexOf("%")>-1&&(d=Math.ceil(r.contextDimension*d/100))),a=r.contextScroll-r.contextOffset,c.triggerPoint=w+a-d,l=f<r.oldScroll,h=c.triggerPoint>=r.oldScroll,p=l&&h,u=!l&&!h,!y&&p?(c.queueTrigger(r.backward),o[c.group.id]=c.group):!y&&u?(c.queueTrigger(r.forward),o[c.group.id]=c.group):y&&r.oldScroll>=c.triggerPoint&&(c.queueTrigger(r.forward),o[c.group.id]=c.group)}}for(var g in o)o[g].flushTriggers();return this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();

// End waypoints js


// Sticky
/*!
Waypoints Sticky Element Shortcut - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
!function(){"use strict";function t(s){this.options=e.extend({},i.defaults,t.defaults,s),this.element=this.options.element,this.$element=e(this.element),this.createWrapper(),this.createWaypoint()}var e=window.jQuery,i=window.Waypoint;t.prototype.createWaypoint=function(){var t=this.options.handler;this.waypoint=new i(e.extend({},this.options,{element:this.wrapper,handler:e.proxy(function(e){var i=this.options.direction.indexOf(e)>-1,s=i?this.$element.outerHeight(!0):"";this.$wrapper.height(s),this.$element.toggleClass(this.options.stuckClass,i),t&&t.call(this,e)},this)}))},t.prototype.createWrapper=function(){this.options.wrapper&&this.$element.wrap(this.options.wrapper),this.$wrapper=this.$element.parent(),this.wrapper=this.$wrapper[0]},t.prototype.destroy=function(){this.$element.parent()[0]===this.wrapper&&(this.waypoint.destroy(),this.$element.removeClass(this.options.stuckClass),this.options.wrapper&&this.$element.unwrap())},t.defaults={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck",direction:"down right"},i.Sticky=t}();

/**
 * BxSlider v4.1.2 - Fully loaded, responsive content slider
 * http://bxslider.com
 *
 * Copyright 2014, Steven Wanderski - http://stevenwanderski.com - http://bxcreative.com
 * Written while drinking Belgian ales and listening to jazz
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing"),f(),o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:p()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:o.settings.slideZIndex,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return i(),void 0;var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(v()),r.redrawSlider(),o.settings.onSliderLoad(o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",Z),o.settings.auto&&o.settings.autoStart&&H(),o.settings.ticker&&L(),o.settings.pager&&q(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&O()},v=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=n+i>=o.children.length?s.add(o.children.eq(i-1)):s.add(o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),e},p=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width();t=Math.floor(o.viewport.width()/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=o.children.length/m();else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),N()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),N()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.on("click","a",I)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",y),o.controls.prev.bind("click",z),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.on("click",".bx-start",k),o.controls.autoEl.on("click",".bx-stop",M),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},y=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},k=function(t){r.startAuto(),t.preventDefault()},M=function(t){r.stopAuto(),t.preventDefault()},I=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget),s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()},q=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i),void 0):(o.pagerEl.find("a").removeClass("active"),o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}),void 0)},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),t&&("horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0))}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){o.settings.autoDelay>0?setTimeout(r.startAuto,o.settings.autoDelay):r.startAuto(),o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));N(n)}),N()},N=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",X)},X=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",Y),o.viewport.bind("touchend",V)}},Y=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},V=function(t){o.viewport.unbind("touchmove",Y);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",V)},Z=function(){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider(),o.settings.onSliderResize.call(r,o.active.index))};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&q(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",o.settings.slideZIndex+1).fadeIn(o.settings.speed,function(){t(this).css("zIndex",o.settings.slideZIndex),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getCurrentSlideElement=function(){return o.children.eq(o.active.index)},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",v()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),q(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.settings.controls&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",Z))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);




    
    
/*!
 * jQuery JavaScript Library v1.4.1
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Jan 25 19:43:33 2010 -0500
 */
(function(z, v) {
    

    function Ma(a, b) {
        b.src ? c.ajax({
            url: b.src,
            async: false,
            dataType: "script"
        }) : c.globalEval(b.text || b.textContent || b.innerHTML || "");
        b.parentNode && b.parentNode.removeChild(b)
    }

    function X(a, b, d, f, e, i) {
        var j = a.length;
        if (typeof b === "object") {
            for (var n in b) X(a, n, b[n], f, e, d);
            return a
        }
        if (d !== v) {
            f = !i && f && c.isFunction(d);
            for (n = 0; n < j; n++) e(a[n], b, f ? d.call(a[n], n, e(a[n], b)) : d, i);
            return a
        }
        return j ? e(a[0], b) : null
    }

    function J() {
        return (new Date).getTime()
    }

    function Y() {
        return false
    }

    function Z() {
        return true
    }

    function ma(a, b, d) {
        d[0].type = a;
        return c.event.handle.apply(b, d)
    }

     

    function oa(a, b) {
        return "live." + (a ? a + "." : "") + b.replace(/\./g, "`").replace(/ /g, "&")
    }

    function pa(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function qa(a, b) {
        var d = 0;
        b.each(function() {
            if (this.nodeName === (a[d] && a[d].nodeName)) {
                var f = c.data(a[d++]),
                    e = c.data(this, f);
                if (f = f && f.events) {
                    delete e.handle;
                    e.events = {};
                    for (var i in f)
                        for (var j in f[i]) c.event.add(this, i, f[i][j], f[i][j].data)
                }
            }
        })
    }

    function ra(a, b, d) {
        var f, e, i;
        if (a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && a[0].indexOf("<option") < 0 && (c.support.checkClone || !sa.test(a[0]))) {
            e = true;
            if (i = c.fragments[a[0]])
                if (i !== 1) f = i
        }
        if (!f) {
            b = b && b[0] ? b[0].ownerDocument || b[0] : r;
            f = b.createDocumentFragment();
            c.clean(a, b, f, d)
        }
        if (e) c.fragments[a[0]] = i ? f : 1;
        return {
            fragment: f,
            cacheable: e
        }
    }

    function K(a, b) {
        var d = {};
        c.each(ta.concat.apply([], ta.slice(0, b)), function() {
            d[this] = a
        });
        return d
    }

    function ua(a) {
        return "scrollTo" in a && a.document ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false
    }
    var c = function(a, b) {
            return new c.fn.init(a, b)
        },
        Na = z.jQuery,
        Oa = z.$,
        r = z.document,
        S, Pa = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,
        Qa = /^.[^:#\[\.,]*$/,
        Ra = /\S/,
        Sa = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
        Ta = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
        O = navigator.userAgent,
        va = false,
        P = [],
        L, $ = Object.prototype.toString,
        aa = Object.prototype.hasOwnProperty,
        ba = Array.prototype.push,
        Q = Array.prototype.slice,
        wa = Array.prototype.indexOf;
    c.fn = c.prototype = {
        init: function(a, b) {
            var d, f;
            if (!a) return this;
            if (a.nodeType) {
                this.context = this[0] = a;
                this.length = 1;
                return this
            }
            if (typeof a === "string")
                if ((d = Pa.exec(a)) && (d[1] || !b))
                    if (d[1]) {
                        f = b ? b.ownerDocument || b : r;
                        if (a = Ta.exec(a))
                            if (c.isPlainObject(b)) {
                                a = [r.createElement(a[1])];
                                c.fn.attr.call(a, b, true)
                            } else a = [f.createElement(a[1])];
                        else {
                            a = ra([d[1]], [f]);
                            a = (a.cacheable ? a.fragment.cloneNode(true) : a.fragment).childNodes
                        }
                    } else {
                        if (b = r.getElementById(d[2])) {
                            if (b.id !== d[2]) return S.find(a);
                            this.length = 1;
                            this[0] = b
                        }
                        this.context = r;
                        this.selector = a;
                        return this
                    }
            else if (!b && /^\w+$/.test(a)) {
                this.selector = a;
                this.context = r;
                a = r.getElementsByTagName(a)
            } else return !b || b.jquery ? (b || S).find(a) : c(b).find(a);
            else if (c.isFunction(a)) return S.ready(a);
            if (a.selector !== v) {
                this.selector = a.selector;
                this.context = a.context
            }
            return c.isArray(a) ? this.setArray(a) : c.makeArray(a, this)
        },
        selector: "",
        jquery: "1.4.1",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return Q.call(this, 0)
        },
        get: function(a) {
            return a == null ? this.toArray() : a < 0 ? this.slice(a)[0] : this[a]
        },
        pushStack: function(a, b, d) {
            a = c(a || null);
            a.prevObject = this;
            a.context = this.context;
            if (b === "find") a.selector = this.selector + (this.selector ? " " : "") + d;
            else if (b) a.selector = this.selector + "." + b + "(" + d + ")";
            return a
        },
        setArray: function(a) {
            this.length = 0;
            ba.apply(this, a);
            return this
        },
        each: function(a, b) {
            return c.each(this, a, b)
        },
        ready: function(a) {
            c.bindReady();
            if (c.isReady) a.call(r, c);
            else P && P.push(a);
            return this
        },
        eq: function(a) {
            return a === -1 ? this.slice(a) : this.slice(a, +a + 1)
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        slice: function() {
            return this.pushStack(Q.apply(this, arguments), "slice", Q.call(arguments).join(","))
        },
        map: function(a) {
            return this.pushStack(c.map(this, function(b, d) {
                return a.call(b, d, b)
            }))
        },
        end: function() {
            return this.prevObject || c(null)
        },
        push: ba,
        sort: [].sort,
        splice: [].splice
    };
    c.fn.init.prototype = c.fn;
    c.extend = c.fn.extend = function() {
        var a = arguments[0] || {},
            b = 1,
            d = arguments.length,
            f = false,
            e, i, j, n;
        if (typeof a === "boolean") {
            f = a;
            a = arguments[1] || {};
            b = 2
        }
        if (typeof a !== "object" && !c.isFunction(a)) a = {};
        if (d === b) {
            a = this;
            --b
        }
        for (; b < d; b++)
            if ((e = arguments[b]) != null)
                for (i in e) {
                    j = a[i];
                    n = e[i];
                    if (a !== n)
                        if (f && n && (c.isPlainObject(n) || c.isArray(n))) {
                            j = j && (c.isPlainObject(j) || c.isArray(j)) ? j : c.isArray(n) ? [] : {};
                            a[i] = c.extend(f, j, n)
                        } else if (n !== v) a[i] = n
                }
        return a
    };
    c.extend({
        noConflict: function(a) {
            z.$ = Oa;
            if (a) z.jQuery = Na;
            return c
        },
        isReady: false,
        ready: function() {
            if (!c.isReady) {
                if (!r.body) return setTimeout(c.ready, 13);
                c.isReady = true;
                if (P) {
                    for (var a, b = 0; a = P[b++];) a.call(r, c);
                    P = null
                }
                c.fn.triggerHandler && c(r).triggerHandler("ready")
            }
        },
        bindReady: function() {
            if (!va) {
                va = true;
                if (r.readyState === "complete") return c.ready();
                if (r.addEventListener) {
                    r.addEventListener("DOMContentLoaded", L, false);
                    z.addEventListener("load", c.ready, false)
                } else if (r.attachEvent) {
                    r.attachEvent("onreadystatechange", L);
                    z.attachEvent("onload", c.ready);
                    var a = false;
                    try {
                        a = z.frameElement == null
                    } catch (b) {}
                    r.documentElement.doScroll && a && la()
                }
            }
        },
        isFunction: function(a) {
            return $.call(a) === "[object Function]"
        },
        isArray: function(a) {
            return $.call(a) === "[object Array]"
        },
        isPlainObject: function(a) {
            if (!a || $.call(a) !== "[object Object]" || a.nodeType || a.setInterval) return false;
            if (a.constructor && !aa.call(a, "constructor") && !aa.call(a.constructor.prototype, "isPrototypeOf")) return false;
            var b;
            for (b in a);
            return b === v || aa.call(a, b)
        },
        isEmptyObject: function(a) {
            for (var b in a) return false;
            return true
        },
        error: function(a) {
            throw a;
        },
        parseJSON: function(a) {
            if (typeof a !== "string" || !a) return null;
            if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return z.JSON && z.JSON.parse ? z.JSON.parse(a) : (new Function("return " + a))();
            else c.error("Invalid JSON: " + a)
        },
        noop: function() {},
        globalEval: function(a) {
            if (a && Ra.test(a)) {
                var b = r.getElementsByTagName("head")[0] || r.documentElement,
                    d = r.createElement("script");
                d.type = "text/javascript";
                if (c.support.scriptEval) d.appendChild(r.createTextNode(a));
                else d.text = a;
                b.insertBefore(d, b.firstChild);
                b.removeChild(d)
            }
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
        },
        each: function(a, b, d) {
            var f, e = 0,
                i = a.length,
                j = i === v || c.isFunction(a);
            if (d)
                if (j)
                    for (f in a) {
                        if (b.apply(a[f], d) === false) break
                    } else
                        for (; e < i;) {
                            if (b.apply(a[e++], d) === false) break
                        } else if (j)
                            for (f in a) {
                                if (b.call(a[f], f, a[f]) === false) break
                            } else
                                for (d = a[0]; e < i && b.call(d, e, d) !== false; d = a[++e]);
            return a
        },
        trim: function(a) {
            return (a || "").replace(Sa, "")
        },
        makeArray: function(a, b) {
            b = b || [];
            if (a != null) a.length == null || typeof a === "string" || c.isFunction(a) || typeof a !== "function" && a.setInterval ? ba.call(b, a) : c.merge(b, a);
            return b
        },
        inArray: function(a, b) {
            if (b.indexOf) return b.indexOf(a);
            for (var d = 0, f = b.length; d < f; d++)
                if (b[d] === a) return d;
            return -1
        },
        merge: function(a, b) {
            var d = a.length,
                f = 0;
            if (typeof b.length === "number")
                for (var e = b.length; f < e; f++) a[d++] = b[f];
            else
                for (; b[f] !== v;) a[d++] = b[f++];
            a.length = d;
            return a
        },
        grep: function(a, b, d) {
            for (var f = [], e = 0, i = a.length; e < i; e++) !d !== !b(a[e], e) && f.push(a[e]);
            return f
        },
        map: function(a, b, d) {
            for (var f = [], e, i = 0, j = a.length; i < j; i++) {
                e = b(a[i], i, d);
                if (e != null) f[f.length] = e
            }
            return f.concat.apply([], f)
        },
        guid: 1,
        proxy: function(a, b, d) {
            if (arguments.length === 2)
                if (typeof b === "string") {
                    d = a;
                    a = d[b];
                    b = v
                } else if (b && !c.isFunction(b)) {
                d = b;
                b = v
            }
            if (!b && a) b = function() {
                return a.apply(d || this, arguments)
            };
            if (a) b.guid = a.guid = a.guid || b.guid || c.guid++;
            return b
        },
        uaMatch: function(a) {
            a = a.toLowerCase();
            a = /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || !/compatible/.test(a) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a) || [];
            return {
                browser: a[1] || "",
                version: a[2] || "0"
            }
        },
        browser: {}
    });
    O = c.uaMatch(O);
    if (O.browser) {
        c.browser[O.browser] = true;
        c.browser.version = O.version
    }
    if (c.browser.webkit) c.browser.safari = true;
    if (wa) c.inArray = function(a, b) {
        return wa.call(b, a)
    };
    S = c(r);
    if (r.addEventListener) L = function() {
        r.removeEventListener("DOMContentLoaded", L, false);
        c.ready()
    };
    else if (r.attachEvent) L = function() {
        if (r.readyState === "complete") {
            r.detachEvent("onreadystatechange", L);
            c.ready()
        }
    };
    (function() {
        c.support = {};
        var a = r.documentElement,
            b = r.createElement("script"),
            d = r.createElement("div"),
            f = "script" + J();
        d.style.display = "none";
        d.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        var e = d.getElementsByTagName("*"),
            i = d.getElementsByTagName("a")[0];
        if (!(!e || !e.length || !i)) {
            c.support = {
                leadingWhitespace: d.firstChild.nodeType === 3,
                tbody: !d.getElementsByTagName("tbody").length,
                htmlSerialize: !!d.getElementsByTagName("link").length,
                style: /red/.test(i.getAttribute("style")),
                hrefNormalized: i.getAttribute("href") === "/a",
                opacity: /^0.55$/.test(i.style.opacity),
                cssFloat: !!i.style.cssFloat,
                checkOn: d.getElementsByTagName("input")[0].value === "on",
                optSelected: r.createElement("select").appendChild(r.createElement("option")).selected,
                checkClone: false,
                scriptEval: false,
                noCloneEvent: true,
                boxModel: null
            };
            b.type = "text/javascript";
            try {
                b.appendChild(r.createTextNode("window." + f + "=1;"))
            } catch (j) {}
            a.insertBefore(b, a.firstChild);
            if (z[f]) {
                c.support.scriptEval = true;
                delete z[f]
            }
            a.removeChild(b);
            if (d.attachEvent && d.fireEvent) {
                d.attachEvent("onclick", function n() {
                    c.support.noCloneEvent = false;
                    d.detachEvent("onclick", n)
                });
                d.cloneNode(true).fireEvent("onclick")
            }
            d = r.createElement("div");
            d.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
            a = r.createDocumentFragment();
            a.appendChild(d.firstChild);
            c.support.checkClone = a.cloneNode(true).cloneNode(true).lastChild.checked;
            c(function() {
                var n = r.createElement("div");
                n.style.width = n.style.paddingLeft = "1px";
                r.body.appendChild(n);
                c.boxModel = c.support.boxModel = n.offsetWidth === 2;
                r.body.removeChild(n).style.display = "none"
            });
            a = function(n) {
                var o = r.createElement("div");
                n = "on" + n;
                var m = n in o;
                if (!m) {
                    o.setAttribute(n, "return;");
                    m = typeof o[n] === "function"
                }
                return m
            };
            c.support.submitBubbles = a("submit");
            c.support.changeBubbles = a("change");
            a = b = d = e = i = null
        }
    })();
    c.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    var G = "jQuery" + J(),
        Ua = 0,
        xa = {},
        Va = {};
    c.extend({
        cache: {},
        expando: G,
        noData: {
            embed: true,
            object: true,
            applet: true
        },
        data: function(a, b, d) {
            if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
                a = a == z ? xa : a;
                var f = a[G],
                    e = c.cache;
                if (!b && !f) return null;
                f || (f = ++Ua);
                if (typeof b === "object") {
                    a[G] = f;
                    e = e[f] = c.extend(true, {}, b)
                } else e = e[f] ? e[f] : typeof d === "undefined" ? Va : (e[f] = {});
                if (d !== v) {
                    a[G] = f;
                    e[b] = d
                }
                return typeof b === "string" ? e[b] : e
            }
        },
        removeData: function(a, b) {
            if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
                a = a == z ? xa : a;
                var d = a[G],
                    f = c.cache,
                    e = f[d];
                if (b) {
                    if (e) {
                        delete e[b];
                        c.isEmptyObject(e) && c.removeData(a)
                    }
                } else {
                    try {
                        delete a[G]
                    } catch (i) {
                        a.removeAttribute && a.removeAttribute(G)
                    }
                    delete f[d]
                }
            }
        }
    });
    c.fn.extend({
        data: function(a, b) {
            if (typeof a === "undefined" && this.length) return c.data(this[0]);
            else if (typeof a === "object") return this.each(function() {
                c.data(this, a)
            });
            var d = a.split(".");
            d[1] = d[1] ? "." + d[1] : "";
            if (b === v) {
                var f = this.triggerHandler("getData" + d[1] + "!", [d[0]]);
                if (f === v && this.length) f = c.data(this[0], a);
                return f === v && d[1] ? this.data(d[0]) : f
            } else return this.trigger("setData" + d[1] + "!", [d[0], b]).each(function() {
                c.data(this, a, b)
            })
        },
        removeData: function(a) {
            return this.each(function() {
                c.removeData(this, a)
            })
        }
    });
    c.extend({
        queue: function(a, b, d) {
            if (a) {
                b = (b || "fx") + "queue";
                var f = c.data(a, b);
                if (!d) return f || [];
                if (!f || c.isArray(d)) f = c.data(a, b, c.makeArray(d));
                else f.push(d);
                return f
            }
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var d = c.queue(a, b),
                f = d.shift();
            if (f === "inprogress") f = d.shift();
            if (f) {
                b === "fx" && d.unshift("inprogress");
                f.call(a, function() {
                    c.dequeue(a, b)
                })
            }
        }
    });
    c.fn.extend({
        queue: function(a, b) {
            if (typeof a !== "string") {
                b = a;
                a = "fx"
            }
            if (b === v) return c.queue(this[0], a);
            return this.each(function() {
                var d = c.queue(this, a, b);
                a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                c.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            a = c.fx ? c.fx.speeds[a] || a : a;
            b = b || "fx";
            return this.queue(b, function() {
                var d = this;
                setTimeout(function() {
                    c.dequeue(d, b)
                }, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        }
    });
    var ya = /[\n\t]/g,
        ca = /\s+/,
        Wa = /\r/g,
        Xa = /href|src|style/,
        Ya = /(button|input)/i,
        Za = /(button|input|object|select|textarea)/i,
        $a = /^(a|area)$/i,
        za = /radio|checkbox/;
    c.fn.extend({
        attr: function(a, b) {
            return X(this, a, b, true, c.attr)
        },
        removeAttr: function(a) {
            return this.each(function() {
                c.attr(this, a, "");
                this.nodeType === 1 && this.removeAttribute(a)
            })
        },
        addClass: function(a) {
            if (c.isFunction(a)) return this.each(function(o) {
                var m = c(this);
                m.addClass(a.call(this, o, m.attr("class")))
            });
            if (a && typeof a === "string")
                for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
                    var e = this[d];
                    if (e.nodeType === 1)
                        if (e.className)
                            for (var i = " " + e.className + " ", j = 0, n = b.length; j < n; j++) {
                                if (i.indexOf(" " + b[j] + " ") < 0) e.className += " " + b[j]
                            } else e.className = a
                }
            return this
        },
        removeClass: function(a) {
            if (c.isFunction(a)) return this.each(function(o) {
                var m = c(this);
                m.removeClass(a.call(this, o, m.attr("class")))
            });
            if (a && typeof a === "string" || a === v)
                for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
                    var e = this[d];
                    if (e.nodeType === 1 && e.className)
                        if (a) {
                            for (var i = (" " + e.className + " ").replace(ya, " "), j = 0, n = b.length; j < n; j++) i = i.replace(" " + b[j] + " ", " ");
                            e.className = i.substring(1, i.length - 1)
                        } else e.className = ""
                }
            return this
        },
        toggleClass: function(a, b) {
            var d = typeof a,
                f = typeof b === "boolean";
            if (c.isFunction(a)) return this.each(function(e) {
                var i = c(this);
                i.toggleClass(a.call(this, e, i.attr("class"), b), b)
            });
            return this.each(function() {
                if (d === "string")
                    for (var e, i = 0, j = c(this), n = b, o = a.split(ca); e = o[i++];) {
                        n = f ? n : !j.hasClass(e);
                        j[n ? "addClass" : "removeClass"](e)
                    } else if (d === "undefined" || d === "boolean") {
                        this.className && c.data(this, "__className__", this.className);
                        this.className = this.className || a === false ? "" : c.data(this, "__className__") || ""
                    }
            })
        },
        hasClass: function(a) {
            a = " " + a + " ";
            for (var b = 0, d = this.length; b < d; b++)
                if ((" " + this[b].className + " ").replace(ya, " ").indexOf(a) > -1) return true;
            return false
        },
        val: function(a) {
            if (a === v) {
                var b = this[0];
                if (b) {
                    if (c.nodeName(b, "option")) return (b.attributes.value || {}).specified ? b.value : b.text;
                    if (c.nodeName(b, "select")) {
                        var d = b.selectedIndex,
                            f = [],
                            e = b.options;
                        b = b.type === "select-one";
                        if (d < 0) return null;
                        var i = b ? d : 0;
                        for (d = b ? d + 1 : e.length; i < d; i++) {
                            var j = e[i];
                            if (j.selected) {
                                a = c(j).val();
                                if (b) return a;
                                f.push(a)
                            }
                        }
                        return f
                    }
                    if (za.test(b.type) && !c.support.checkOn) return b.getAttribute("value") === null ? "on" : b.value;
                    return (b.value || "").replace(Wa, "")
                }
                return v
            }
            var n = c.isFunction(a);
            return this.each(function(o) {
                var m = c(this),
                    s = a;
                if (this.nodeType === 1) {
                    if (n) s = a.call(this, o, m.val());
                    if (typeof s === "number") s += "";
                    if (c.isArray(s) && za.test(this.type)) this.checked = c.inArray(m.val(), s) >= 0;
                    else if (c.nodeName(this, "select")) {
                        var x = c.makeArray(s);
                        c("option", this).each(function() {
                            this.selected = c.inArray(c(this).val(), x) >= 0
                        });
                        if (!x.length) this.selectedIndex = -1
                    } else this.value = s
                }
            })
        }
    });
    c.extend({
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        attr: function(a, b, d, f) {
            if (!a || a.nodeType === 3 || a.nodeType === 8) return v;
            if (f && b in c.attrFn) return c(a)[b](d);
            f = a.nodeType !== 1 || !c.isXMLDoc(a);
            var e = d !== v;
            b = f && c.props[b] || b;
            if (a.nodeType === 1) {
                var i = Xa.test(b);
                if (b in a && f && !i) {
                    if (e) {
                        b === "type" && Ya.test(a.nodeName) && a.parentNode && c.error("type property can't be changed");
                        a[b] = d
                    }
                    if (c.nodeName(a, "form") && a.getAttributeNode(b)) return a.getAttributeNode(b).nodeValue;
                    if (b === "tabIndex") return (b = a.getAttributeNode("tabIndex")) && b.specified ? b.value : Za.test(a.nodeName) || $a.test(a.nodeName) && a.href ? 0 : v;
                    return a[b]
                }
                if (!c.support.style && f && b === "style") {
                    if (e) a.style.cssText = "" + d;
                    return a.style.cssText
                }
                e && a.setAttribute(b, "" + d);
                a = !c.support.hrefNormalized && f && i ? a.getAttribute(b, 2) : a.getAttribute(b);
                return a === null ? v : a
            }
            return c.style(a, b, d)
        }
    });
    var ab = function(a) {
        return a.replace(/[^\w\s\.\|`]/g, function(b) {
            return "\\" + b
        })
    };
    c.event = {
        add: function(a, b, d, f) {
            if (!(a.nodeType === 3 || a.nodeType === 8)) {
                if (a.setInterval && a !== z && !a.frameElement) a = z;
                if (!d.guid) d.guid = c.guid++;
                if (f !== v) {
                    d = c.proxy(d);
                    d.data = f
                }
                var e = c.data(a, "events") || c.data(a, "events", {}),
                    i = c.data(a, "handle"),
                    j;
                if (!i) {
                    j = function() {
                        return typeof c !== "undefined" && !c.event.triggered ? c.event.handle.apply(j.elem, arguments) : v
                    };
                    i = c.data(a, "handle", j)
                }
                if (i) {
                    i.elem = a;
                    b = b.split(/\s+/);
                    for (var n, o = 0; n = b[o++];) {
                        var m = n.split(".");
                        n = m.shift();
                        if (o > 1) {
                            d = c.proxy(d);
                            if (f !== v) d.data = f
                        }
                        d.type = m.slice(0).sort().join(".");
                        var s = e[n],
                            x = this.special[n] || {};
                        if (!s) {
                            s = e[n] = {};
                            if (!x.setup || x.setup.call(a, f, m, d) === false)
                                if (a.addEventListener) a.addEventListener(n, i, false);
                                else a.attachEvent && a.attachEvent("on" + n, i)
                        }
                        if (x.add)
                            if ((m = x.add.call(a, d, f, m, s)) && c.isFunction(m)) {
                                m.guid = m.guid || d.guid;
                                m.data = m.data || d.data;
                                m.type = m.type || d.type;
                                d = m
                            }
                        s[d.guid] = d;
                        this.global[n] = true
                    }
                    a = null
                }
            }
        },
        global: {},
        remove: function(a, b, d) {
            if (!(a.nodeType === 3 || a.nodeType === 8)) {
                var f = c.data(a, "events"),
                    e, i, j;
                if (f) {
                    if (b === v || typeof b === "string" && b.charAt(0) === ".")
                        for (i in f) this.remove(a, i + (b || ""));
                    else {
                        if (b.type) {
                            d = b.handler;
                            b = b.type
                        }
                        b = b.split(/\s+/);
                        for (var n = 0; i = b[n++];) {
                            var o = i.split(".");
                            i = o.shift();
                            var m = !o.length,
                                s = c.map(o.slice(0).sort(), ab);
                            s = new RegExp("(^|\\.)" +
                                s.join("\\.(?:.*\\.)?") + "(\\.|$)");
                            var x = this.special[i] || {};
                            if (f[i]) {
                                if (d) {
                                    j = f[i][d.guid];
                                    delete f[i][d.guid]
                                } else
                                    for (var A in f[i])
                                        if (m || s.test(f[i][A].type)) delete f[i][A];
                                x.remove && x.remove.call(a, o, j);
                                for (e in f[i]) break;
                                if (!e) {
                                    if (!x.teardown || x.teardown.call(a, o) === false)
                                        if (a.removeEventListener) a.removeEventListener(i, c.data(a, "handle"), false);
                                        else a.detachEvent && a.detachEvent("on" + i, c.data(a, "handle"));
                                    e = null;
                                    delete f[i]
                                }
                            }
                        }
                    }
                    for (e in f) break;
                    if (!e) {
                        if (A = c.data(a, "handle")) A.elem = null;
                        c.removeData(a, "events");
                        c.removeData(a, "handle")
                    }
                }
            }
        },
        trigger: function(a, b, d, f) {
            var e = a.type || a;
            if (!f) {
                a = typeof a === "object" ? a[G] ? a : c.extend(c.Event(e), a) : c.Event(e);
                if (e.indexOf("!") >= 0) {
                    a.type = e = e.slice(0, -1);
                    a.exclusive = true
                }
                if (!d) {
                    a.stopPropagation();
                    this.global[e] && c.each(c.cache, function() {
                        this.events && this.events[e] && c.event.trigger(a, b, this.handle.elem)
                    })
                }
                if (!d || d.nodeType === 3 || d.nodeType === 8) return v;
                a.result = v;
                a.target = d;
                b = c.makeArray(b);
                b.unshift(a)
            }
            a.currentTarget = d;
            (f = c.data(d, "handle")) && f.apply(d, b);
            f = d.parentNode || d.ownerDocument;
            try {
                if (!(d && d.nodeName && c.noData[d.nodeName.toLowerCase()]))
                    if (d["on" + e] && d["on" + e].apply(d, b) === false) a.result = false
            } catch (i) {}
            if (!a.isPropagationStopped() && f) c.event.trigger(a, b, f, true);
            else if (!a.isDefaultPrevented()) {
                d = a.target;
                var j;
                if (!(c.nodeName(d, "a") && e === "click") && !(d && d.nodeName && c.noData[d.nodeName.toLowerCase()])) {
                    try {
                        if (d[e]) {
                            if (j = d["on" + e]) d["on" + e] = null;
                            this.triggered = true;
                            d[e]()
                        }
                    } catch (n) {}
                    if (j) d["on" + e] = j;
                    this.triggered = false
                }
            }
        },
        handle: function(a) {
            var b, d;
            a = arguments[0] = c.event.fix(a || z.event);
            a.currentTarget = this;
            d = a.type.split(".");
            a.type = d.shift();
            b = !d.length && !a.exclusive;
            var f = new RegExp("(^|\\.)" + d.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)");
            d = (c.data(this, "events") || {})[a.type];
            for (var e in d) {
                var i = d[e];
                if (b || f.test(i.type)) {
                    a.handler = i;
                    a.data = i.data;
                    i = i.apply(this, arguments);
                    if (i !== v) {
                        a.result = i;
                        if (i === false) {
                            a.preventDefault();
                            a.stopPropagation()
                        }
                    }
                    if (a.isImmediatePropagationStopped()) break
                }
            }
            return a.result
        },
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        fix: function(a) {
            if (a[G]) return a;
            var b = a;
            a = c.Event(b);
            for (var d = this.props.length, f; d;) {
                f = this.props[--d];
                a[f] = b[f]
            }
            if (!a.target) a.target = a.srcElement || r;
            if (a.target.nodeType === 3) a.target = a.target.parentNode;
            if (!a.relatedTarget && a.fromElement) a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement;
            if (a.pageX == null && a.clientX != null) {
                b = r.documentElement;
                d = r.body;
                a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0);
                a.pageY = a.clientY + (b && b.scrollTop || d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0)
            }
            if (!a.which && (a.charCode || a.charCode === 0 ? a.charCode : a.keyCode)) a.which = a.charCode || a.keyCode;
            if (!a.metaKey && a.ctrlKey) a.metaKey = a.ctrlKey;
            if (!a.which && a.button !== v) a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0;
            return a
        },
        guid: 1E8,
        proxy: c.proxy,
        special: {
            ready: {
                setup: c.bindReady,
                teardown: c.noop
            },
            live: {
                add: function(a, b) {
                    c.extend(a, b || {});
                    a.guid += b.selector + b.live;
                    b.liveProxy = a;
                    c.event.add(this, b.live, na, b)
                },
                remove: function(a) {
                    if (a.length) {
                        var b = 0,
                            d = new RegExp("(^|\\.)" + a[0] + "(\\.|$)");
                        c.each(c.data(this, "events").live || {}, function() {
                            d.test(this.type) && b++
                        });
                        b < 1 && c.event.remove(this, a[0], na)
                    }
                },
                special: {}
            },
            beforeunload: {
                setup: function(a, b, d) {
                    if (this.setInterval) this.onbeforeunload = d;
                    return false
                },
                teardown: function(a, b) {
                    if (this.onbeforeunload === b) this.onbeforeunload = null
                }
            }
        }
    };
    c.Event = function(a) {
        if (!this.preventDefault) return new c.Event(a);
        if (a && a.type) {
            this.originalEvent = a;
            this.type = a.type
        } else this.type = a;
        this.timeStamp = J();
        this[G] = true
    };
    c.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = Z;
            var a = this.originalEvent;
            if (a) {
                a.preventDefault && a.preventDefault();
                a.returnValue = false
            }
        },
        stopPropagation: function() {
            this.isPropagationStopped = Z;
            var a = this.originalEvent;
            if (a) {
                a.stopPropagation && a.stopPropagation();
                a.cancelBubble = true
            }
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = Z;
            this.stopPropagation()
        },
        isDefaultPrevented: Y,
        isPropagationStopped: Y,
        isImmediatePropagationStopped: Y
    };
    var Aa = function(a) {
            for (var b = a.relatedTarget; b && b !== this;) try {
                b = b.parentNode
            } catch (d) {
                break
            }
            if (b !== this) {
                a.type = a.data;
                c.event.handle.apply(this, arguments)
            }
        },
        Ba = function(a) {
            a.type = a.data;
            c.event.handle.apply(this, arguments)
        };
    c.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        c.event.special[a] = {
            setup: function(d) {
                c.event.add(this, b, d && d.selector ? Ba : Aa, a)
            },
            teardown: function(d) {
                c.event.remove(this, b, d && d.selector ? Ba : Aa)
            }
        }
    });
    if (!c.support.submitBubbles) c.event.special.submit = {
        setup: function(a, b, d) {
            if (this.nodeName.toLowerCase() !== "form") {
                c.event.add(this, "click.specialSubmit." + d.guid, function(f) {
                    var e = f.target,
                        i = e.type;
                    if ((i === "submit" || i === "image") && c(e).closest("form").length) return ma("submit", this, arguments)
                });
                c.event.add(this, "keypress.specialSubmit." + d.guid, function(f) {
                    var e = f.target,
                        i = e.type;
                    if ((i === "text" || i === "password") && c(e).closest("form").length && f.keyCode === 13) return ma("submit", this, arguments)
                })
            } else return false
        },
        remove: function(a, b) {
            c.event.remove(this, "click.specialSubmit" + (b ? "." + b.guid : ""));
            c.event.remove(this, "keypress.specialSubmit" + (b ? "." + b.guid : ""))
        }
    };
    if (!c.support.changeBubbles) {
        var da = /textarea|input|select/i;

        function Ca(a) {
            var b = a.type,
                d = a.value;
            if (b === "radio" || b === "checkbox") d = a.checked;
            else if (b === "select-multiple") d = a.selectedIndex > -1 ? c.map(a.options, function(f) {
                return f.selected
            }).join("-") : "";
            else if (a.nodeName.toLowerCase() === "select") d = a.selectedIndex;
            return d
        }

        function ea(a, b) {
            var d = a.target,
                f, e;
            if (!(!da.test(d.nodeName) || d.readOnly)) {
                f = c.data(d, "_change_data");
                e = Ca(d);
                if (a.type !== "focusout" || d.type !== "radio") c.data(d, "_change_data", e);
                if (!(f === v || e === f))
                    if (f != null || e) {
                        a.type = "change";
                        return c.event.trigger(a, b, d)
                    }
            }
        }
        c.event.special.change = {
            filters: {
                focusout: ea,
                click: function(a) {
                    var b = a.target,
                        d = b.type;
                    if (d === "radio" || d === "checkbox" || b.nodeName.toLowerCase() === "select") return ea.call(this, a)
                },
                keydown: function(a) {
                    var b = a.target,
                        d = b.type;
                    if (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (d === "checkbox" || d === "radio") || d === "select-multiple") return ea.call(this, a)
                },
                beforeactivate: function(a) {
                    a = a.target;
                    a.nodeName.toLowerCase() === "input" && a.type === "radio" && c.data(a, "_change_data", Ca(a))
                }
            },
            setup: function(a, b, d) {
                for (var f in T) c.event.add(this, f + ".specialChange." + d.guid, T[f]);
                return da.test(this.nodeName)
            },
            remove: function(a, b) {
                for (var d in T) c.event.remove(this, d + ".specialChange" + (b ? "." + b.guid : ""), T[d]);
                return da.test(this.nodeName)
            }
        };
        var T = c.event.special.change.filters
    }
    r.addEventListener && c.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        function d(f) {
            f = c.event.fix(f);
            f.type = b;
            return c.event.handle.call(this, f)
        }
        c.event.special[b] = {
            setup: function() {
                this.addEventListener(a, d, true)
            },
            teardown: function() {
                this.removeEventListener(a, d, true)
            }
        }
    });
    c.each(["bind", "one"], function(a, b) {
        c.fn[b] = function(d, f, e) {
            if (typeof d === "object") {
                for (var i in d) this[b](i, f, d[i], e);
                return this
            }
            if (c.isFunction(f)) {
                e = f;
                f = v
            }
            var j = b === "one" ? c.proxy(e, function(n) {
                c(this).unbind(n, j);
                return e.apply(this, arguments)
            }) : e;
            return d === "unload" && b !== "one" ? this.one(d, f, e) : this.each(function() {
                c.event.add(this, d, j, f)
            })
        }
    });
    c.fn.extend({
        unbind: function(a, b) {
            if (typeof a === "object" && !a.preventDefault) {
                for (var d in a) this.unbind(d, a[d]);
                return this
            }
            return this.each(function() {
                c.event.remove(this, a, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                c.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) {
                a = c.Event(a);
                a.preventDefault();
                a.stopPropagation();
                c.event.trigger(a, b, this[0]);
                return a.result
            }
        },
        toggle: function(a) {
            for (var b = arguments, d = 1; d < b.length;) c.proxy(a, b[d++]);
            return this.click(c.proxy(a, function(f) {
                var e = (c.data(this, "lastToggle" +
                    a.guid) || 0) % d;
                c.data(this, "lastToggle" + a.guid, e + 1);
                f.preventDefault();
                return b[e].apply(this, arguments) || false
            }))
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    c.each(["live", "die"], function(a, b) {
        c.fn[b] = function(d, f, e) {
            var i, j = 0;
            if (c.isFunction(f)) {
                e = f;
                f = v
            }
            for (d = (d || "").split(/\s+/);
                (i = d[j++]) != null;) {
                i = i === "focus" ? "focusin" : i === "blur" ? "focusout" : i === "hover" ? d.push("mouseleave") && "mouseenter" : i;
                b === "live" ? c(this.context).bind(oa(i, this.selector), {
                    data: f,
                    selector: this.selector,
                    live: i
                }, e) : c(this.context).unbind(oa(i, this.selector), e ? {
                    guid: e.guid + this.selector + i
                } : null)
            }
            return this
        }
    });
    c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function(a, b) {
        c.fn[b] = function(d) {
            return d ? this.bind(b, d) : this.trigger(b)
        };
        if (c.attrFn) c.attrFn[b] = true
    });
    z.attachEvent && !z.addEventListener && z.attachEvent("onunload", function() {
        for (var a in c.cache)
            if (c.cache[a].handle) try {
                c.event.remove(c.cache[a].handle.elem)
            } catch (b) {}
    });
    (function() {
        function a(g) {
            for (var h = "", k, l = 0; g[l]; l++) {
                k = g[l];
                if (k.nodeType === 3 || k.nodeType === 4) h += k.nodeValue;
                else if (k.nodeType !== 8) h += a(k.childNodes)
            }
            return h
        }

        function b(g, h, k, l, q, p) {
            q = 0;
            for (var u = l.length; q < u; q++) {
                var t = l[q];
                if (t) {
                    t = t[g];
                    for (var y = false; t;) {
                        if (t.sizcache === k) {
                            y = l[t.sizset];
                            break
                        }
                        if (t.nodeType === 1 && !p) {
                            t.sizcache = k;
                            t.sizset = q
                        }
                        if (t.nodeName.toLowerCase() === h) {
                            y = t;
                            break
                        }
                        t = t[g]
                    }
                    l[q] = y
                }
            }
        }

        function d(g, h, k, l, q, p) {
            q = 0;
            for (var u = l.length; q < u; q++) {
                var t = l[q];
                if (t) {
                    t = t[g];
                    for (var y = false; t;) {
                        if (t.sizcache === k) {
                            y = l[t.sizset];
                            break
                        }
                        if (t.nodeType === 1) {
                            if (!p) {
                                t.sizcache = k;
                                t.sizset = q
                            }
                            if (typeof h !== "string") {
                                if (t === h) {
                                    y = true;
                                    break
                                }
                            } else if (o.filter(h, [t]).length > 0) {
                                y = t;
                                break
                            }
                        }
                        t = t[g]
                    }
                    l[q] = y
                }
            }
        }
        var f = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            e = 0,
            i = Object.prototype.toString,
            j = false,
            n = true;
        [0, 0].sort(function() {
            n = false;
            return 0
        });
        var o = function(g, h, k, l) {
            k = k || [];
            var q = h = h || r;
            if (h.nodeType !== 1 && h.nodeType !== 9) return [];
            if (!g || typeof g !== "string") return k;
            for (var p = [], u, t, y, R, H = true, M = w(h), I = g;
                (f.exec(""), u = f.exec(I)) !== null;) {
                I = u[3];
                p.push(u[1]);
                if (u[2]) {
                    R = u[3];
                    break
                }
            }
            if (p.length > 1 && s.exec(g))
                if (p.length === 2 && m.relative[p[0]]) t = fa(p[0] + p[1], h);
                else
                    for (t = m.relative[p[0]] ? [h] : o(p.shift(), h); p.length;) {
                        g = p.shift();
                        if (m.relative[g]) g += p.shift();
                        t = fa(g, t)
                    } else {
                        if (!l && p.length > 1 && h.nodeType === 9 && !M && m.match.ID.test(p[0]) && !m.match.ID.test(p[p.length - 1])) {
                            u = o.find(p.shift(), h, M);
                            h = u.expr ? o.filter(u.expr, u.set)[0] : u.set[0]
                        }
                        if (h) {
                            u = l ? {
                                expr: p.pop(),
                                set: A(l)
                            } : o.find(p.pop(), p.length === 1 && (p[0] === "~" || p[0] === "+") && h.parentNode ? h.parentNode : h, M);
                            t = u.expr ? o.filter(u.expr, u.set) : u.set;
                            if (p.length > 0) y = A(t);
                            else H = false;
                            for (; p.length;) {
                                var D = p.pop();
                                u = D;
                                if (m.relative[D]) u = p.pop();
                                else D = "";
                                if (u == null) u = h;
                                m.relative[D](y, u, M)
                            }
                        } else y = []
                    }
            y || (y = t);
            y || o.error(D || g);
            if (i.call(y) === "[object Array]")
                if (H)
                    if (h && h.nodeType === 1)
                        for (g = 0; y[g] != null; g++) {
                            if (y[g] && (y[g] === true || y[g].nodeType === 1 && E(h, y[g]))) k.push(t[g])
                        } else
                            for (g = 0; y[g] != null; g++) y[g] && y[g].nodeType === 1 && k.push(t[g]);
                    else k.push.apply(k, y);
            else A(y, k);
            if (R) {
                o(R, q, k, l);
                o.uniqueSort(k)
            }
            return k
        };
        o.uniqueSort = function(g) {
            if (C) {
                j = n;
                g.sort(C);
                if (j)
                    for (var h = 1; h < g.length; h++) g[h] === g[h - 1] && g.splice(h--, 1)
            }
            return g
        };
        o.matches = function(g, h) {
            return o(g, null, null, h)
        };
        o.find = function(g, h, k) {
            var l, q;
            if (!g) return [];
            for (var p = 0, u = m.order.length; p < u; p++) {
                var t = m.order[p];
                if (q = m.leftMatch[t].exec(g)) {
                    var y = q[1];
                    q.splice(1, 1);
                    if (y.substr(y.length - 1) !== "\\") {
                        q[1] = (q[1] || "").replace(/\\/g, "");
                        l = m.find[t](q, h, k);
                        if (l != null) {
                            g = g.replace(m.match[t], "");
                            break
                        }
                    }
                }
            }
            l || (l = h.getElementsByTagName("*"));
            return {
                set: l,
                expr: g
            }
        };
        o.filter = function(g, h, k, l) {
            for (var q = g, p = [], u = h, t, y, R = h && h[0] && w(h[0]); g && h.length;) {
                for (var H in m.filter)
                    if ((t = m.leftMatch[H].exec(g)) != null && t[2]) {
                        var M = m.filter[H],
                            I, D;
                        D = t[1];
                        y = false;
                        t.splice(1, 1);
                        if (D.substr(D.length - 1) !== "\\") {
                            if (u === p) p = [];
                            if (m.preFilter[H])
                                if (t = m.preFilter[H](t, u, k, p, l, R)) {
                                    if (t === true) continue
                                } else y = I = true;
                            if (t)
                                for (var U = 0;
                                    (D = u[U]) != null; U++)
                                    if (D) {
                                        I = M(D, t, U, u);
                                        var Da = l ^ !!I;
                                        if (k && I != null)
                                            if (Da) y = true;
                                            else u[U] = false;
                                        else if (Da) {
                                            p.push(D);
                                            y = true
                                        }
                                    }
                            if (I !== v) {
                                k || (u = p);
                                g = g.replace(m.match[H], "");
                                if (!y) return [];
                                break
                            }
                        }
                    }
                if (g === q)
                    if (y == null) o.error(g);
                    else break;
                q = g
            }
            return u
        };
        o.error = function(g) {
            throw "Syntax error, unrecognized expression: " + g;
        };
        var m = o.selectors = {
                order: ["ID", "NAME", "TAG"],
                match: {
                    ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                    CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
                    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
                    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                    TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
                    CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
                    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
                    PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                },
                leftMatch: {},
                attrMap: {
                    "class": "className",
                    "for": "htmlFor"
                },
                attrHandle: {
                    href: function(g) {
                        return g.getAttribute("href")
                    }
                },
                relative: {
                    "+": function(g, h) {
                        var k = typeof h === "string",
                            l = k && !/\W/.test(h);
                        k = k && !l;
                        if (l) h = h.toLowerCase();
                        l = 0;
                        for (var q = g.length, p; l < q; l++)
                            if (p = g[l]) {
                                for (;
                                    (p = p.previousSibling) && p.nodeType !== 1;);
                                g[l] = k || p && p.nodeName.toLowerCase() === h ? p || false : p === h
                            }
                        k && o.filter(h, g, true)
                    },
                    ">": function(g, h) {
                        var k = typeof h === "string";
                        if (k && !/\W/.test(h)) {
                            h = h.toLowerCase();
                            for (var l = 0, q = g.length; l < q; l++) {
                                var p = g[l];
                                if (p) {
                                    k = p.parentNode;
                                    g[l] = k.nodeName.toLowerCase() === h ? k : false
                                }
                            }
                        } else {
                            l = 0;
                            for (q = g.length; l < q; l++)
                                if (p = g[l]) g[l] = k ? p.parentNode : p.parentNode === h;
                            k && o.filter(h, g, true)
                        }
                    },
                    "": function(g, h, k) {
                        var l = e++,
                            q = d;
                        if (typeof h === "string" && !/\W/.test(h)) {
                            var p = h = h.toLowerCase();
                            q = b
                        }
                        q("parentNode", h, l, g, p, k)
                    },
                    "~": function(g, h, k) {
                        var l = e++,
                            q = d;
                        if (typeof h === "string" && !/\W/.test(h)) {
                            var p = h = h.toLowerCase();
                            q = b
                        }
                        q("previousSibling", h, l, g, p, k)
                    }
                },
                find: {
                    ID: function(g, h, k) {
                        if (typeof h.getElementById !== "undefined" && !k) return (g = h.getElementById(g[1])) ? [g] : []
                    },
                    NAME: function(g, h) {
                        if (typeof h.getElementsByName !== "undefined") {
                            var k = [];
                            h = h.getElementsByName(g[1]);
                            for (var l = 0, q = h.length; l < q; l++) h[l].getAttribute("name") === g[1] && k.push(h[l]);
                            return k.length === 0 ? null : k
                        }
                    },
                    TAG: function(g, h) {
                        return h.getElementsByTagName(g[1])
                    }
                },
                preFilter: {
                    CLASS: function(g, h, k, l, q, p) {
                        g = " " + g[1].replace(/\\/g, "") + " ";
                        if (p) return g;
                        p = 0;
                        for (var u;
                            (u = h[p]) != null; p++)
                            if (u)
                                if (q ^ (u.className && (" " + u.className + " ").replace(/[\t\n]/g, " ").indexOf(g) >= 0)) k || l.push(u);
                                else if (k) h[p] = false;
                        return false
                    },
                    ID: function(g) {
                        return g[1].replace(/\\/g, "")
                    },
                    TAG: function(g) {
                        return g[1].toLowerCase()
                    },
                    CHILD: function(g) {
                        if (g[1] === "nth") {
                            var h = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2] === "even" && "2n" || g[2] === "odd" && "2n+1" || !/\D/.test(g[2]) && "0n+" + g[2] || g[2]);
                            g[2] = h[1] + (h[2] || 1) - 0;
                            g[3] = h[3] - 0
                        }
                        g[0] = e++;
                        return g
                    },
                    ATTR: function(g, h, k, l, q, p) {
                        h = g[1].replace(/\\/g, "");
                        if (!p && m.attrMap[h]) g[1] = m.attrMap[h];
                        if (g[2] === "~=") g[4] = " " + g[4] + " ";
                        return g
                    },
                    PSEUDO: function(g, h, k, l, q) {
                        if (g[1] === "not")
                            if ((f.exec(g[3]) || "").length > 1 || /^\w/.test(g[3])) g[3] = o(g[3], null, null, h);
                            else {
                                g = o.filter(g[3], h, k, true ^ q);
                                k || l.push.apply(l, g);
                                return false
                            }
                        else if (m.match.POS.test(g[0]) || m.match.CHILD.test(g[0])) return true;
                        return g
                    },
                    POS: function(g) {
                        g.unshift(true);
                        return g
                    }
                },
                filters: {
                    enabled: function(g) {
                        return g.disabled === false && g.type !== "hidden"
                    },
                    disabled: function(g) {
                        return g.disabled === true
                    },
                    checked: function(g) {
                        return g.checked === true
                    },
                    selected: function(g) {
                        return g.selected === true
                    },
                    parent: function(g) {
                        return !!g.firstChild
                    },
                    empty: function(g) {
                        return !g.firstChild
                    },
                    has: function(g, h, k) {
                        return !!o(k[3], g).length
                    },
                    header: function(g) {
                        return /h\d/i.test(g.nodeName)
                    },
                    text: function(g) {
                        return "text" === g.type
                    },
                    radio: function(g) {
                        return "radio" === g.type
                    },
                    checkbox: function(g) {
                        return "checkbox" === g.type
                    },
                    file: function(g) {
                        return "file" === g.type
                    },
                    password: function(g) {
                        return "password" === g.type
                    },
                    submit: function(g) {
                        return "submit" === g.type
                    },
                    image: function(g) {
                        return "image" === g.type
                    },
                    reset: function(g) {
                        return "reset" === g.type
                    },
                    button: function(g) {
                        return "button" === g.type || g.nodeName.toLowerCase() === "button"
                    },
                    input: function(g) {
                        return /input|select|textarea|button/i.test(g.nodeName)
                    }
                },
                setFilters: {
                    first: function(g, h) {
                        return h === 0
                    },
                    last: function(g, h, k, l) {
                        return h === l.length - 1
                    },
                    even: function(g, h) {
                        return h % 2 === 0
                    },
                    odd: function(g, h) {
                        return h % 2 === 1
                    },
                    lt: function(g, h, k) {
                        return h < k[3] - 0
                    },
                    gt: function(g, h, k) {
                        return h > k[3] - 0
                    },
                    nth: function(g, h, k) {
                        return k[3] - 0 === h
                    },
                    eq: function(g, h, k) {
                        return k[3] - 0 === h
                    }
                },
                filter: {
                    PSEUDO: function(g, h, k, l) {
                        var q = h[1],
                            p = m.filters[q];
                        if (p) return p(g, k, h, l);
                        else if (q === "contains") return (g.textContent || g.innerText || a([g]) || "").indexOf(h[3]) >= 0;
                        else if (q === "not") {
                            h = h[3];
                            k = 0;
                            for (l = h.length; k < l; k++)
                                if (h[k] === g) return false;
                            return true
                        } else o.error("Syntax error, unrecognized expression: " +
                            q)
                    },
                    CHILD: function(g, h) {
                        var k = h[1],
                            l = g;
                        switch (k) {
                            case "only":
                            case "first":
                                for (; l = l.previousSibling;)
                                    if (l.nodeType === 1) return false;
                                if (k === "first") return true;
                                l = g;
                            case "last":
                                for (; l = l.nextSibling;)
                                    if (l.nodeType === 1) return false;
                                return true;
                            case "nth":
                                k = h[2];
                                var q = h[3];
                                if (k === 1 && q === 0) return true;
                                h = h[0];
                                var p = g.parentNode;
                                if (p && (p.sizcache !== h || !g.nodeIndex)) {
                                    var u = 0;
                                    for (l = p.firstChild; l; l = l.nextSibling)
                                        if (l.nodeType === 1) l.nodeIndex = ++u;
                                    p.sizcache = h
                                }
                                g = g.nodeIndex - q;
                                return k === 0 ? g === 0 : g % k === 0 && g / k >= 0
                        }
                    },
                    ID: function(g, h) {
                        return g.nodeType === 1 && g.getAttribute("id") === h
                    },
                    TAG: function(g, h) {
                        return h === "*" && g.nodeType === 1 || g.nodeName.toLowerCase() === h
                    },
                    CLASS: function(g, h) {
                        return (" " + (g.className || g.getAttribute("class")) + " ").indexOf(h) > -1
                    },
                    ATTR: function(g, h) {
                        var k = h[1];
                        g = m.attrHandle[k] ? m.attrHandle[k](g) : g[k] != null ? g[k] : g.getAttribute(k);
                        k = g + "";
                        var l = h[2];
                        h = h[4];
                        return g == null ? l === "!=" : l === "=" ? k === h : l === "*=" ? k.indexOf(h) >= 0 : l === "~=" ? (" " + k + " ").indexOf(h) >= 0 : !h ? k && g !== false : l === "!=" ? k !== h : l === "^=" ? k.indexOf(h) === 0 : l === "$=" ? k.substr(k.length - h.length) === h : l === "|=" ? k === h || k.substr(0, h.length + 1) === h + "-" : false
                    },
                    POS: function(g, h, k, l) {
                        var q = m.setFilters[h[2]];
                        if (q) return q(g, k, h, l)
                    }
                }
            },
            s = m.match.POS;
        for (var x in m.match) {
            m.match[x] = new RegExp(m.match[x].source + /(?![^\[]*\])(?![^\(]*\))/.source);
            m.leftMatch[x] = new RegExp(/(^(?:.|\r|\n)*?)/.source + m.match[x].source.replace(/\\(\d+)/g, function(g, h) {
                return "\\" + (h - 0 + 1)
            }))
        }
        var A = function(g, h) {
            g = Array.prototype.slice.call(g, 0);
            if (h) {
                h.push.apply(h, g);
                return h
            }
            return g
        };
        try {
            Array.prototype.slice.call(r.documentElement.childNodes, 0)
        } catch (B) {
            A = function(g, h) {
                h = h || [];
                if (i.call(g) === "[object Array]") Array.prototype.push.apply(h, g);
                else if (typeof g.length === "number")
                    for (var k = 0, l = g.length; k < l; k++) h.push(g[k]);
                else
                    for (k = 0; g[k]; k++) h.push(g[k]);
                return h
            }
        }
        var C;
        if (r.documentElement.compareDocumentPosition) C = function(g, h) {
            if (!g.compareDocumentPosition || !h.compareDocumentPosition) {
                if (g == h) j = true;
                return g.compareDocumentPosition ? -1 : 1
            }
            g = g.compareDocumentPosition(h) & 4 ? -1 : g === h ? 0 : 1;
            if (g === 0) j = true;
            return g
        };
        else if ("sourceIndex" in r.documentElement) C = function(g, h) {
            if (!g.sourceIndex || !h.sourceIndex) {
                if (g == h) j = true;
                return g.sourceIndex ? -1 : 1
            }
            g = g.sourceIndex - h.sourceIndex;
            if (g === 0) j = true;
            return g
        };
        else if (r.createRange) C = function(g, h) {
            if (!g.ownerDocument || !h.ownerDocument) {
                if (g == h) j = true;
                return g.ownerDocument ? -1 : 1
            }
            var k = g.ownerDocument.createRange(),
                l = h.ownerDocument.createRange();
            k.setStart(g, 0);
            k.setEnd(g, 0);
            l.setStart(h, 0);
            l.setEnd(h, 0);
            g = k.compareBoundaryPoints(Range.START_TO_END, l);
            if (g === 0) j = true;
            return g
        };
        (function() {
            var g = r.createElement("div"),
                h = "script" + (new Date).getTime();
            g.innerHTML = "<a name='" + h + "'/>";
            var k = r.documentElement;
            k.insertBefore(g, k.firstChild);
            if (r.getElementById(h)) {
                m.find.ID = function(l, q, p) {
                    if (typeof q.getElementById !== "undefined" && !p) return (q = q.getElementById(l[1])) ? q.id === l[1] || typeof q.getAttributeNode !== "undefined" && q.getAttributeNode("id").nodeValue === l[1] ? [q] : v : []
                };
                m.filter.ID = function(l, q) {
                    var p = typeof l.getAttributeNode !== "undefined" && l.getAttributeNode("id");
                    return l.nodeType === 1 && p && p.nodeValue === q
                }
            }
            k.removeChild(g);
            k = g = null
        })();
        (function() {
            var g = r.createElement("div");
            g.appendChild(r.createComment(""));
            if (g.getElementsByTagName("*").length > 0) m.find.TAG = function(h, k) {
                k = k.getElementsByTagName(h[1]);
                if (h[1] === "*") {
                    h = [];
                    for (var l = 0; k[l]; l++) k[l].nodeType === 1 && h.push(k[l]);
                    k = h
                }
                return k
            };
            g.innerHTML = "<a href='#'></a>";
            if (g.firstChild && typeof g.firstChild.getAttribute !== "undefined" && g.firstChild.getAttribute("href") !== "#") m.attrHandle.href = function(h) {
                return h.getAttribute("href", 2)
            };
            g = null
        })();
        r.querySelectorAll && function() {
            var g = o,
                h = r.createElement("div");
            h.innerHTML = "<p class='TEST'></p>";
            if (!(h.querySelectorAll && h.querySelectorAll(".TEST").length === 0)) {
                o = function(l, q, p, u) {
                    q = q || r;
                    if (!u && q.nodeType === 9 && !w(q)) try {
                        return A(q.querySelectorAll(l), p)
                    } catch (t) {}
                    return g(l, q, p, u)
                };
                for (var k in g) o[k] = g[k];
                h = null
            }
        }();
        (function() {
            var g = r.createElement("div");
            g.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!(!g.getElementsByClassName || g.getElementsByClassName("e").length === 0)) {
                g.lastChild.className = "e";
                if (g.getElementsByClassName("e").length !== 1) {
                    m.order.splice(1, 0, "CLASS");
                    m.find.CLASS = function(h, k, l) {
                        if (typeof k.getElementsByClassName !== "undefined" && !l) return k.getElementsByClassName(h[1])
                    };
                    g = null
                }
            }
        })();
        var E = r.compareDocumentPosition ? function(g, h) {
                return g.compareDocumentPosition(h) & 16
            } : function(g, h) {
                return g !== h && (g.contains ? g.contains(h) : true)
            },
            w = function(g) {
                return (g = (g ? g.ownerDocument || g : 0).documentElement) ? g.nodeName !== "HTML" : false
            },
            fa = function(g, h) {
                var k = [],
                    l = "",
                    q;
                for (h = h.nodeType ? [h] : h; q = m.match.PSEUDO.exec(g);) {
                    l += q[0];
                    g = g.replace(m.match.PSEUDO, "")
                }
                g = m.relative[g] ? g + "*" : g;
                q = 0;
                for (var p = h.length; q < p; q++) o(g, h[q], k);
                return o.filter(l, k)
            };
        c.find = o;
        c.expr = o.selectors;
        c.expr[":"] = c.expr.filters;
        c.unique = o.uniqueSort;
        c.getText = a;
        c.isXMLDoc = w;
        c.contains = E
    })();
    var bb = /Until$/,
        cb = /^(?:parents|prevUntil|prevAll)/,
        db = /,/;
    Q = Array.prototype.slice;
    var Ea = function(a, b, d) {
        if (c.isFunction(b)) return c.grep(a, function(e, i) {
            return !!b.call(e, i, e) === d
        });
        else if (b.nodeType) return c.grep(a, function(e) {
            return e === b === d
        });
        else if (typeof b === "string") {
            var f = c.grep(a, function(e) {
                return e.nodeType === 1
            });
            if (Qa.test(b)) return c.filter(b, f, !d);
            else b = c.filter(b, f)
        }
        return c.grep(a, function(e) {
            return c.inArray(e, b) >= 0 === d
        })
    };
    c.fn.extend({
        find: function(a) {
            for (var b = this.pushStack("", "find", a), d = 0, f = 0, e = this.length; f < e; f++) {
                d = b.length;
                c.find(a, this[f], b);
                if (f > 0)
                    for (var i = d; i < b.length; i++)
                        for (var j = 0; j < d; j++)
                            if (b[j] === b[i]) {
                                b.splice(i--, 1);
                                break
                            }
            }
            return b
        },
        has: function(a) {
            var b = c(a);
            return this.filter(function() {
                for (var d = 0, f = b.length; d < f; d++)
                    if (c.contains(this, b[d])) return true
            })
        },
        not: function(a) {
            return this.pushStack(Ea(this, a, false), "not", a)
        },
        filter: function(a) {
            return this.pushStack(Ea(this, a, true), "filter", a)
        },
        is: function(a) {
            return !!a && c.filter(a, this).length > 0
        },
        closest: function(a, b) {
            if (c.isArray(a)) {
                var d = [],
                    f = this[0],
                    e, i = {},
                    j;
                if (f && a.length) {
                    e = 0;
                    for (var n = a.length; e < n; e++) {
                        j = a[e];
                        i[j] || (i[j] = c.expr.match.POS.test(j) ? c(j, b || this.context) : j)
                    }
                    for (; f && f.ownerDocument && f !== b;) {
                        for (j in i) {
                            e = i[j];
                            if (e.jquery ? e.index(f) > -1 : c(f).is(e)) {
                                d.push({
                                    selector: j,
                                    elem: f
                                });
                                delete i[j]
                            }
                        }
                        f = f.parentNode
                    }
                }
                return d
            }
            var o = c.expr.match.POS.test(a) ? c(a, b || this.context) : null;
            return this.map(function(m, s) {
                for (; s && s.ownerDocument && s !== b;) {
                    if (o ? o.index(s) > -1 : c(s).is(a)) return s;
                    s = s.parentNode
                }
                return null
            })
        },
        index: function(a) {
            if (!a || typeof a === "string") return c.inArray(this[0], a ? c(a) : this.parent().children());
            return c.inArray(a.jquery ? a[0] : a, this)
        },
        add: function(a, b) {
            a = typeof a === "string" ? c(a, b || this.context) : c.makeArray(a);
            b = c.merge(this.get(), a);
            return this.pushStack(pa(a[0]) || pa(b[0]) ? b : c.unique(b))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    });
    c.each({
        parent: function(a) {
            return (a = a.parentNode) && a.nodeType !== 11 ? a : null
        },
        parents: function(a) {
            return c.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, d) {
            return c.dir(a, "parentNode", d)
        },
        next: function(a) {
            return c.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return c.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return c.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return c.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, d) {
            return c.dir(a, "nextSibling", d)
        },
        prevUntil: function(a, b, d) {
            return c.dir(a, "previousSibling", d)
        },
        siblings: function(a) {
            return c.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return c.sibling(a.firstChild)
        },
        contents: function(a) {
            return c.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
        }
    }, function(a, b) {
        c.fn[a] = function(d, f) {
            var e = c.map(this, b, d);
            bb.test(a) || (f = d);
            if (f && typeof f === "string") e = c.filter(f, e);
            e = this.length > 1 ? c.unique(e) : e;
            if ((this.length > 1 || db.test(f)) && cb.test(a)) e = e.reverse();
            return this.pushStack(e, a, Q.call(arguments).join(","))
        }
    });
    c.extend({
        filter: function(a, b, d) {
            if (d) a = ":not(" + a + ")";
            return c.find.matches(a, b)
        },
        dir: function(a, b, d) {
            var f = [];
            for (a = a[b]; a && a.nodeType !== 9 && (d === v || a.nodeType !== 1 || !c(a).is(d));) {
                a.nodeType === 1 && f.push(a);
                a = a[b]
            }
            return f
        },
        nth: function(a, b, d) {
            b = b || 1;
            for (var f = 0; a; a = a[d])
                if (a.nodeType === 1 && ++f === b) break;
            return a
        },
        sibling: function(a, b) {
            for (var d = []; a; a = a.nextSibling) a.nodeType === 1 && a !== b && d.push(a);
            return d
        }
    });
    var Fa = / jQuery\d+="(?:\d+|null)"/g,
        V = /^\s+/,
        Ga = /(<([\w:]+)[^>]*?)\/>/g,
        eb = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
        Ha = /<([\w:]+)/,
        fb = /<tbody/i,
        gb = /<|&\w+;/,
        sa = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ia = function(a, b, d) {
            return eb.test(d) ? a : b + "></" + d + ">"
        },
        F = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        };
    F.optgroup = F.option;
    F.tbody = F.tfoot = F.colgroup = F.caption = F.thead;
    F.th = F.td;
    if (!c.support.htmlSerialize) F._default = [1, "div<div>", "</div>"];
    c.fn.extend({
        text: function(a) {
            if (c.isFunction(a)) return this.each(function(b) {
                var d = c(this);
                d.text(a.call(this, b, d.text()))
            });
            if (typeof a !== "object" && a !== v) return this.empty().append((this[0] && this[0].ownerDocument || r).createTextNode(a));
            return c.getText(this)
        },
        wrapAll: function(a) {
            if (c.isFunction(a)) return this.each(function(d) {
                c(this).wrapAll(a.call(this, d))
            });
            if (this[0]) {
                var b = c(a, this[0].ownerDocument).eq(0).clone(true);
                this[0].parentNode && b.insertBefore(this[0]);
                b.map(function() {
                    for (var d = this; d.firstChild && d.firstChild.nodeType === 1;) d = d.firstChild;
                    return d
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            if (c.isFunction(a)) return this.each(function(b) {
                c(this).wrapInner(a.call(this, b))
            });
            return this.each(function() {
                var b = c(this),
                    d = b.contents();
                d.length ? d.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            return this.each(function() {
                c(this).wrapAll(a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                c.nodeName(this, "body") || c(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, true, function(a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, true, function(a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function(b) {
                this.parentNode.insertBefore(b, this)
            });
            else if (arguments.length) {
                var a = c(arguments[0]);
                a.push.apply(a, this.toArray());
                return this.pushStack(a, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function(b) {
                this.parentNode.insertBefore(b, this.nextSibling)
            });
            else if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                a.push.apply(a, c(arguments[0]).toArray());
                return a
            }
        },
        clone: function(a) {
            var b = this.map(function() {
                if (!c.support.noCloneEvent && !c.isXMLDoc(this)) {
                    var d = this.outerHTML,
                        f = this.ownerDocument;
                    if (!d) {
                        d = f.createElement("div");
                        d.appendChild(this.cloneNode(true));
                        d = d.innerHTML
                    }
                    return c.clean([d.replace(Fa, "").replace(V, "")], f)[0]
                } else return this.cloneNode(true)
            });
            if (a === true) {
                qa(this, b);
                qa(this.find("*"), b.find("*"))
            }
            return b
        },
        html: function(a) {
            if (a === v) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Fa, "") : null;
            else if (typeof a === "string" && !/<script/i.test(a) && (c.support.leadingWhitespace || !V.test(a)) && !F[(Ha.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Ga, Ia);
                try {
                    for (var b = 0, d = this.length; b < d; b++)
                        if (this[b].nodeType === 1) {
                            c.cleanData(this[b].getElementsByTagName("*"));
                            this[b].innerHTML = a
                        }
                } catch (f) {
                    this.empty().append(a)
                }
            } else c.isFunction(a) ? this.each(function(e) {
                var i = c(this),
                    j = i.html();
                i.empty().append(function() {
                    return a.call(this, e, j)
                })
            }) : this.empty().append(a);
            return this
        },
        replaceWith: function(a) {
            if (this[0] && this[0].parentNode) {
                if (c.isFunction(a)) return this.each(function(b) {
                    var d = c(this),
                        f = d.html();
                    d.replaceWith(a.call(this, b, f))
                });
                else a = c(a).detach();
                return this.each(function() {
                    var b = this.nextSibling,
                        d = this.parentNode;
                    c(this).remove();
                    b ? c(b).before(a) : c(d).append(a)
                })
            } else return this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a)
        },
        detach: function(a) {
            return this.remove(a, true)
        },
        domManip: function(a, b, d) {
            function f(s) {
                return c.nodeName(s, "table") ? s.getElementsByTagName("tbody")[0] || s.appendChild(s.ownerDocument.createElement("tbody")) : s
            }
            var e, i, j = a[0],
                n = [];
            if (!c.support.checkClone && arguments.length === 3 && typeof j === "string" && sa.test(j)) return this.each(function() {
                c(this).domManip(a, b, d, true)
            });
            if (c.isFunction(j)) return this.each(function(s) {
                var x = c(this);
                a[0] = j.call(this, s, b ? x.html() : v);
                x.domManip(a, b, d)
            });
            if (this[0]) {
                e = a[0] && a[0].parentNode && a[0].parentNode.nodeType === 11 ? {
                    fragment: a[0].parentNode
                } : ra(a, this, n);
                if (i = e.fragment.firstChild) {
                    b = b && c.nodeName(i, "tr");
                    for (var o = 0, m = this.length; o < m; o++) d.call(b ? f(this[o], i) : this[o], e.cacheable || this.length > 1 || o > 0 ? e.fragment.cloneNode(true) : e.fragment)
                }
                n && c.each(n, Ma)
            }
            return this
        }
    });
    c.fragments = {};
    c.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        c.fn[a] = function(d) {
            var f = [];
            d = c(d);
            for (var e = 0, i = d.length; e < i; e++) {
                var j = (e > 0 ? this.clone(true) : this).get();
                c.fn[b].apply(c(d[e]), j);
                f = f.concat(j)
            }
            return this.pushStack(f, a, d.selector)
        }
    });
    c.each({
        remove: function(a, b) {
            if (!a || c.filter(a, [this]).length) {
                if (!b && this.nodeType === 1) {
                    c.cleanData(this.getElementsByTagName("*"));
                    c.cleanData([this])
                }
                this.parentNode && this.parentNode.removeChild(this)
            }
        },
        empty: function() {
            for (this.nodeType === 1 && c.cleanData(this.getElementsByTagName("*")); this.firstChild;) this.removeChild(this.firstChild)
        }
    }, function(a, b) {
        c.fn[a] = function() {
            return this.each(b, arguments)
        }
    });
    c.extend({
        clean: function(a, b, d, f) {
            b = b || r;
            if (typeof b.createElement === "undefined") b = b.ownerDocument || b[0] && b[0].ownerDocument || r;
            var e = [];
            c.each(a, function(i, j) {
                if (typeof j === "number") j += "";
                if (j) {
                    if (typeof j === "string" && !gb.test(j)) j = b.createTextNode(j);
                    else if (typeof j === "string") {
                        j = j.replace(Ga, Ia);
                        var n = (Ha.exec(j) || ["", ""])[1].toLowerCase(),
                            o = F[n] || F._default,
                            m = o[0];
                        i = b.createElement("div");
                        for (i.innerHTML = o[1] + j + o[2]; m--;) i = i.lastChild;
                        if (!c.support.tbody) {
                            m = fb.test(j);
                            n = n === "table" && !m ? i.firstChild && i.firstChild.childNodes : o[1] === "<table>" && !m ? i.childNodes : [];
                            for (o = n.length - 1; o >= 0; --o) c.nodeName(n[o], "tbody") && !n[o].childNodes.length && n[o].parentNode.removeChild(n[o])
                        }!c.support.leadingWhitespace && V.test(j) && i.insertBefore(b.createTextNode(V.exec(j)[0]), i.firstChild);
                        j = c.makeArray(i.childNodes)
                    }
                    if (j.nodeType) e.push(j);
                    else e = c.merge(e, j)
                }
            });
            if (d)
                for (a = 0; e[a]; a++)
                    if (f && c.nodeName(e[a], "script") && (!e[a].type || e[a].type.toLowerCase() === "text/javascript")) f.push(e[a].parentNode ? e[a].parentNode.removeChild(e[a]) : e[a]);
                    else {
                        e[a].nodeType === 1 && e.splice.apply(e, [a + 1, 0].concat(c.makeArray(e[a].getElementsByTagName("script"))));
                        d.appendChild(e[a])
                    }
            return e
        },
        cleanData: function(a) {
            for (var b = 0, d;
                (d = a[b]) != null; b++) {
                c.event.remove(d);
                c.removeData(d)
            }
        }
    });
    var hb = /z-?index|font-?weight|opacity|zoom|line-?height/i,
        Ja = /alpha\([^)]*\)/,
        Ka = /opacity=([^)]*)/,
        ga = /float/i,
        ha = /-([a-z])/ig,
        ib = /([A-Z])/g,
        jb = /^-?\d+(?:px)?$/i,
        kb = /^-?\d/,
        lb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        mb = ["Left", "Right"],
        nb = ["Top", "Bottom"],
        ob = r.defaultView && r.defaultView.getComputedStyle,
        La = c.support.cssFloat ? "cssFloat" : "styleFloat",
        ia = function(a, b) {
            return b.toUpperCase()
        };
    c.fn.css = function(a, b) {
        return X(this, a, b, true, function(d, f, e) {
            if (e === v) return c.curCSS(d, f);
            if (typeof e === "number" && !hb.test(f)) e += "px";
            c.style(d, f, e)
        })
    };
    c.extend({
        style: function(a, b, d) {
            if (!a || a.nodeType === 3 || a.nodeType === 8) return v;
            if ((b === "width" || b === "height") && parseFloat(d) < 0) d = v;
            var f = a.style || a,
                e = d !== v;
            if (!c.support.opacity && b === "opacity") {
                if (e) {
                    f.zoom = 1;
                    b = parseInt(d, 10) + "" === "NaN" ? "" : "alpha(opacity=" + d * 100 + ")";
                    a = f.filter || c.curCSS(a, "filter") || "";
                    f.filter = Ja.test(a) ? a.replace(Ja, b) : b
                }
                return f.filter && f.filter.indexOf("opacity=") >= 0 ? parseFloat(Ka.exec(f.filter)[1]) / 100 + "" : ""
            }
            if (ga.test(b)) b = La;
            b = b.replace(ha, ia);
            if (e) f[b] = d;
            return f[b]
        },
        css: function(a, b, d, f) {
            if (b === "width" || b === "height") {
                var e, i = b === "width" ? mb : nb;

                function j() {
                    e = b === "width" ? a.offsetWidth : a.offsetHeight;
                    f !== "border" && c.each(i, function() {
                        f || (e -= parseFloat(c.curCSS(a, "padding" + this, true)) || 0);
                        if (f === "margin") e += parseFloat(c.curCSS(a, "margin" + this, true)) || 0;
                        else e -= parseFloat(c.curCSS(a, "border" + this + "Width", true)) || 0
                    })
                }
                a.offsetWidth !== 0 ? j() : c.swap(a, lb, j);
                return Math.max(0, Math.round(e))
            }
            return c.curCSS(a, b, d)
        },
        curCSS: function(a, b, d) {
            var f, e = a.style;
            if (!c.support.opacity && b === "opacity" && a.currentStyle) {
                f = Ka.test(a.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "";
                return f === "" ? "1" : f
            }
            if (ga.test(b)) b = La;
            if (!d && e && e[b]) f = e[b];
            else if (ob) {
                if (ga.test(b)) b = "float";
                b = b.replace(ib, "-$1").toLowerCase();
                e = a.ownerDocument.defaultView;
                if (!e) return null;
                if (a = e.getComputedStyle(a, null)) f = a.getPropertyValue(b);
                if (b === "opacity" && f === "") f = "1"
            } else if (a.currentStyle) {
                d = b.replace(ha, ia);
                f = a.currentStyle[b] || a.currentStyle[d];
                if (!jb.test(f) && kb.test(f)) {
                    b = e.left;
                    var i = a.runtimeStyle.left;
                    a.runtimeStyle.left = a.currentStyle.left;
                    e.left = d === "fontSize" ? "1em" : f || 0;
                    f = e.pixelLeft + "px";
                    e.left = b;
                    a.runtimeStyle.left = i
                }
            }
            return f
        },
        swap: function(a, b, d) {
            var f = {};
            for (var e in b) {
                f[e] = a.style[e];
                a.style[e] = b[e]
            }
            d.call(a);
            for (e in b) a.style[e] = f[e]
        }
    });
    if (c.expr && c.expr.filters) {
        c.expr.filters.hidden = function(a) {
            var b = a.offsetWidth,
                d = a.offsetHeight,
                f = a.nodeName.toLowerCase() === "tr";
            return b === 0 && d === 0 && !f ? true : b > 0 && d > 0 && !f ? false : c.curCSS(a, "display") === "none"
        };
        c.expr.filters.visible = function(a) {
            return !c.expr.filters.hidden(a)
        }
    }
    var pb = J(),
        qb = /<script(.|\s)*?\/script>/gi,
        rb = /select|textarea/i,
        sb = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
        N = /=\?(&|$)/,
        ja = /\?/,
        tb = /(\?|&)_=.*?(&|$)/,
        ub = /^(\w+:)?\/\/([^\/?#]+)/,
        vb = /%20/g;
    c.fn.extend({
        _load: c.fn.load,
        load: function(a, b, d) {
            if (typeof a !== "string") return this._load(a);
            else if (!this.length) return this;
            var f = a.indexOf(" ");
            if (f >= 0) {
                var e = a.slice(f, a.length);
                a = a.slice(0, f)
            }
            f = "GET";
            if (b)
                if (c.isFunction(b)) {
                    d = b;
                    b = null
                } else if (typeof b === "object") {
                b = c.param(b, c.ajaxSettings.traditional);
                f = "POST"
            }
            var i = this;
            c.ajax({
                url: a,
                type: f,
                dataType: "html",
                data: b,
                complete: function(j, n) {
                    if (n === "success" || n === "notmodified") i.html(e ? c("<div />").append(j.responseText.replace(qb, "")).find(e) : j.responseText);
                    d && i.each(d, [j.responseText, n, j])
                }
            });
            return this
        },
        serialize: function() {
            return c.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? c.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || rb.test(this.nodeName) || sb.test(this.type))
            }).map(function(a, b) {
                a = c(this).val();
                return a == null ? null : c.isArray(a) ? c.map(a, function(d) {
                    return {
                        name: b.name,
                        value: d
                    }
                }) : {
                    name: b.name,
                    value: a
                }
            }).get()
        }
    });
    c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        c.fn[b] = function(d) {
            return this.bind(b, d)
        }
    });
    c.extend({
        get: function(a, b, d, f) {
            if (c.isFunction(b)) {
                f = f || d;
                d = b;
                b = null
            }
            return c.ajax({
                type: "GET",
                url: a,
                data: b,
                success: d,
                dataType: f
            })
        },
        getScript: function(a, b) {
            return c.get(a, null, b, "script")
        },
        getJSON: function(a, b, d) {
            return c.get(a, b, d, "json")
        },
        post: function(a, b, d, f) {
            if (c.isFunction(b)) {
                f = f || d;
                d = b;
                b = {}
            }
            return c.ajax({
                type: "POST",
                url: a,
                data: b,
                success: d,
                dataType: f
            })
        },
        ajaxSetup: function(a) {
            c.extend(c.ajaxSettings, a)
        },
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            xhr: z.XMLHttpRequest && (z.location.protocol !== "file:" || !z.ActiveXObject) ? function() {
                return new z.XMLHttpRequest
            } : function() {
                try {
                    return new z.ActiveXObject("Microsoft.XMLHTTP")
                } catch (a) {}
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        lastModified: {},
        etag: {},
        ajax: function(a) {
            function b() {
                e.success && e.success.call(o, n, j, w);
                e.global && f("ajaxSuccess", [w, e])
            }

            function d() {
                e.complete && e.complete.call(o, w, j);
                e.global && f("ajaxComplete", [w, e]);
                e.global && !--c.active && c.event.trigger("ajaxStop")
            }

            function f(q, p) {
                (e.context ? c(e.context) : c.event).trigger(q, p)
            }
            var e = c.extend(true, {}, c.ajaxSettings, a),
                i, j, n, o = a && a.context || e,
                m = e.type.toUpperCase();
            if (e.data && e.processData && typeof e.data !== "string") e.data = c.param(e.data, e.traditional);
            if (e.dataType === "jsonp") {
                if (m === "GET") N.test(e.url) || (e.url += (ja.test(e.url) ? "&" : "?") + (e.jsonp || "callback") + "=?");
                else if (!e.data || !N.test(e.data)) e.data = (e.data ? e.data + "&" : "") + (e.jsonp || "callback") + "=?";
                e.dataType = "json"
            }
            if (e.dataType === "json" && (e.data && N.test(e.data) || N.test(e.url))) {
                i = e.jsonpCallback || "jsonp" + pb++;
                if (e.data) e.data = (e.data + "").replace(N, "=" + i + "$1");
                e.url = e.url.replace(N, "=" + i + "$1");
                e.dataType = "script";
                z[i] = z[i] || function(q) {
                    n = q;
                    b();
                    d();
                    z[i] = v;
                    try {
                        delete z[i]
                    } catch (p) {}
                    A && A.removeChild(B)
                }
            }
            if (e.dataType === "script" && e.cache === null) e.cache = false;
            if (e.cache === false && m === "GET") {
                var s = J(),
                    x = e.url.replace(tb, "$1_=" + s + "$2");
                e.url = x + (x === e.url ? (ja.test(e.url) ? "&" : "?") + "_=" + s : "")
            }
            if (e.data && m === "GET") e.url += (ja.test(e.url) ? "&" : "?") + e.data;
            e.global && !c.active++ && c.event.trigger("ajaxStart");
            s = (s = ub.exec(e.url)) && (s[1] && s[1] !== location.protocol || s[2] !== location.host);
            if (e.dataType === "script" && m === "GET" && s) {
                var A = r.getElementsByTagName("head")[0] || r.documentElement,
                    B = r.createElement("script");
                B.src = e.url;
                if (e.scriptCharset) B.charset = e.scriptCharset;
                if (!i) {
                    var C = false;
                    B.onload = B.onreadystatechange = function() {
                        if (!C && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                            C = true;
                            b();
                            d();
                            B.onload = B.onreadystatechange = null;
                            A && B.parentNode && A.removeChild(B)
                        }
                    }
                }
                A.insertBefore(B, A.firstChild);
                return v
            }
            var E = false,
                w = e.xhr();
            if (w) {
                e.username ? w.open(m, e.url, e.async, e.username, e.password) : w.open(m, e.url, e.async);
                try {
                    if (e.data || a && a.contentType) w.setRequestHeader("Content-Type", e.contentType);
                    if (e.ifModified) {
                        c.lastModified[e.url] && w.setRequestHeader("If-Modified-Since", c.lastModified[e.url]);
                        c.etag[e.url] && w.setRequestHeader("If-None-Match", c.etag[e.url])
                    }
                    s || w.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    w.setRequestHeader("Accept", e.dataType && e.accepts[e.dataType] ? e.accepts[e.dataType] + ", */*" : e.accepts._default)
                } catch (fa) {}
                if (e.beforeSend && e.beforeSend.call(o, w, e) === false) {
                    e.global && !--c.active && c.event.trigger("ajaxStop");
                    w.abort();
                    return false
                }
                e.global && f("ajaxSend", [w, e]);
                var g = w.onreadystatechange = function(q) {
                    if (!w || w.readyState === 0 || q === "abort") {
                        E || d();
                        E = true;
                        if (w) w.onreadystatechange = c.noop
                    } else if (!E && w && (w.readyState === 4 || q === "timeout")) {
                        E = true;
                        w.onreadystatechange = c.noop;
                        j = q === "timeout" ? "timeout" : !c.httpSuccess(w) ? "error" : e.ifModified && c.httpNotModified(w, e.url) ? "notmodified" : "success";
                        var p;
                        if (j === "success") try {
                            n = c.httpData(w, e.dataType, e)
                        } catch (u) {
                            j = "parsererror";
                            p = u
                        }
                        if (j === "success" || j === "notmodified") i || b();
                        else c.handleError(e, w, j, p);
                        d();
                        q === "timeout" && w.abort();
                        if (e.async) w = null
                    }
                };
                try {
                    var h = w.abort;
                    w.abort = function() {
                        w && h.call(w);
                        g("abort")
                    }
                } catch (k) {}
                e.async && e.timeout > 0 && setTimeout(function() {
                    w && !E && g("timeout")
                }, e.timeout);
                try {
                    w.send(m === "POST" || m === "PUT" || m === "DELETE" ? e.data : null)
                } catch (l) {
                    c.handleError(e, w, null, l);
                    d()
                }
                e.async || g();
                return w
            }
        },
        handleError: function(a, b, d, f) {
            if (a.error) a.error.call(a.context || a, b, d, f);
            if (a.global)(a.context ? c(a.context) : c.event).trigger("ajaxError", [b, a, f])
        },
        active: 0,
        httpSuccess: function(a) {
            try {
                return !a.status && location.protocol === "file:" || a.status >= 200 && a.status < 300 || a.status === 304 || a.status === 1223 || a.status === 0
            } catch (b) {}
            return false
        },
        httpNotModified: function(a, b) {
            var d = a.getResponseHeader("Last-Modified"),
                f = a.getResponseHeader("Etag");
            if (d) c.lastModified[b] = d;
            if (f) c.etag[b] = f;
            return a.status === 304 || a.status === 0
        },
        httpData: function(a, b, d) {
            var f = a.getResponseHeader("content-type") || "",
                e = b === "xml" || !b && f.indexOf("xml") >= 0;
            a = e ? a.responseXML : a.responseText;
            e && a.documentElement.nodeName === "parsererror" && c.error("parsererror");
            if (d && d.dataFilter) a = d.dataFilter(a, b);
            if (typeof a === "string")
                if (b === "json" || !b && f.indexOf("json") >= 0) a = c.parseJSON(a);
                else if (b === "script" || !b && f.indexOf("javascript") >= 0) c.globalEval(a);
            return a
        },
        param: function(a, b) {
            function d(j, n) {
                if (c.isArray(n)) c.each(n, function(o, m) {
                    b ? f(j, m) : d(j + "[" + (typeof m === "object" || c.isArray(m) ? o : "") + "]", m)
                });
                else !b && n != null && typeof n === "object" ? c.each(n, function(o, m) {
                    d(j + "[" + o + "]", m)
                }) : f(j, n)
            }

            function f(j, n) {
                n = c.isFunction(n) ? n() : n;
                e[e.length] = encodeURIComponent(j) + "=" + encodeURIComponent(n)
            }
            var e = [];
            if (b === v) b = c.ajaxSettings.traditional;
            if (c.isArray(a) || a.jquery) c.each(a, function() {
                f(this.name, this.value)
            });
            else
                for (var i in a) d(i, a[i]);
            return e.join("&").replace(vb, "+")
        }
    });
    var ka = {},
        wb = /toggle|show|hide/,
        xb = /^([+-]=)?([\d+-.]+)(.*)$/,
        W, ta = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    c.fn.extend({
        show: function(a, b) {
            if (a || a === 0) return this.animate(K("show", 3), a, b);
            else {
                a = 0;
                for (b = this.length; a < b; a++) {
                    var d = c.data(this[a], "olddisplay");
                    this[a].style.display = d || "";
                    if (c.css(this[a], "display") === "none") {
                        d = this[a].nodeName;
                        var f;
                        if (ka[d]) f = ka[d];
                        else {
                            var e = c("<" + d + " />").appendTo("body");
                            f = e.css("display");
                            if (f === "none") f = "block";
                            e.remove();
                            ka[d] = f
                        }
                        c.data(this[a], "olddisplay", f)
                    }
                }
                a = 0;
                for (b = this.length; a < b; a++) this[a].style.display = c.data(this[a], "olddisplay") || "";
                return this
            }
        },
        hide: function(a, b) {
            if (a || a === 0) return this.animate(K("hide", 3), a, b);
            else {
                a = 0;
                for (b = this.length; a < b; a++) {
                    var d = c.data(this[a], "olddisplay");
                    !d && d !== "none" && c.data(this[a], "olddisplay", c.css(this[a], "display"))
                }
                a = 0;
                for (b = this.length; a < b; a++) this[a].style.display = "none";
                return this
            }
        },
        _toggle: c.fn.toggle,
        toggle: function(a, b) {
            var d = typeof a === "boolean";
            if (c.isFunction(a) && c.isFunction(b)) this._toggle.apply(this, arguments);
            else a == null || d ? this.each(function() {
                var f = d ? a : c(this).is(":hidden");
                c(this)[f ? "show" : "hide"]()
            }) : this.animate(K("toggle", 3), a, b);
            return this
        },
        fadeTo: function(a, b, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, d)
        },
        animate: function(a, b, d, f) {
            var e = c.speed(b, d, f);
            if (c.isEmptyObject(a)) return this.each(e.complete);
            return this[e.queue === false ? "each" : "queue"](function() {
                var i = c.extend({}, e),
                    j, n = this.nodeType === 1 && c(this).is(":hidden"),
                    o = this;
                for (j in a) {
                    var m = j.replace(ha, ia);
                    if (j !== m) {
                        a[m] = a[j];
                        delete a[j];
                        j = m
                    }
                    if (a[j] === "hide" && n || a[j] === "show" && !n) return i.complete.call(this);
                    if ((j === "height" || j === "width") && this.style) {
                        i.display = c.css(this, "display");
                        i.overflow = this.style.overflow
                    }
                    if (c.isArray(a[j])) {
                        (i.specialEasing = i.specialEasing || {})[j] = a[j][1];
                        a[j] = a[j][0]
                    }
                }
                if (i.overflow != null) this.style.overflow = "hidden";
                i.curAnim = c.extend({}, a);
                c.each(a, function(s, x) {
                    var A = new c.fx(o, i, s);
                    if (wb.test(x)) A[x === "toggle" ? n ? "show" : "hide" : x](a);
                    else {
                        var B = xb.exec(x),
                            C = A.cur(true) || 0;
                        if (B) {
                            x = parseFloat(B[2]);
                            var E = B[3] || "px";
                            if (E !== "px") {
                                o.style[s] = (x || 1) + E;
                                C = (x || 1) / A.cur(true) * C;
                                o.style[s] = C + E
                            }
                            if (B[1]) x = (B[1] === "-=" ? -1 : 1) * x + C;
                            A.custom(C, x, E)
                        } else A.custom(C, x, "")
                    }
                });
                return true
            })
        },
        stop: function(a, b) {
            var d = c.timers;
            a && this.queue([]);
            this.each(function() {
                for (var f = d.length - 1; f >= 0; f--)
                    if (d[f].elem === this) {
                        b && d[f](true);
                        d.splice(f, 1)
                    }
            });
            b || this.dequeue();
            return this
        }
    });
    c.each({
        slideDown: K("show", 1),
        slideUp: K("hide", 1),
        slideToggle: K("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        }
    }, function(a, b) {
        c.fn[a] = function(d, f) {
            return this.animate(b, d, f)
        }
    });
    c.extend({
        speed: function(a, b, d) {
            var f = a && typeof a === "object" ? a : {
                complete: d || !d && b || c.isFunction(a) && a,
                duration: a,
                easing: d && b || b && !c.isFunction(b) && b
            };
            f.duration = c.fx.off ? 0 : typeof f.duration === "number" ? f.duration : c.fx.speeds[f.duration] || c.fx.speeds._default;
            f.old = f.complete;
            f.complete = function() {
                f.queue !== false && c(this).dequeue();
                c.isFunction(f.old) && f.old.call(this)
            };
            return f
        },
        easing: {
            linear: function(a, b, d, f) {
                return d + f * a
            },
            swing: function(a, b, d, f) {
                return (-Math.cos(a * Math.PI) / 2 + 0.5) * f + d
            }
        },
        timers: [],
        fx: function(a, b, d) {
            this.options = b;
            this.elem = a;
            this.prop = d;
            if (!b.orig) b.orig = {}
        }
    });
    c.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this);
            (c.fx.step[this.prop] || c.fx.step._default)(this);
            if ((this.prop === "height" || this.prop === "width") && this.elem.style) this.elem.style.display = "block"
        },
        cur: function(a) {
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop];
            return (a = parseFloat(c.css(this.elem, this.prop, a))) && a > -10000 ? a : parseFloat(c.curCSS(this.elem, this.prop)) || 0
        },
        custom: function(a, b, d) {
            function f(i) {
                return e.step(i)
            }
            this.startTime = J();
            this.start = a;
            this.end = b;
            this.unit = d || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            var e = this;
            f.elem = this.elem;
            if (f() && c.timers.push(f) && !W) W = setInterval(c.fx.tick, 13)
        },
        show: function() {
            this.options.orig[this.prop] = c.style(this.elem, this.prop);
            this.options.show = true;
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            c(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = c.style(this.elem, this.prop);
            this.options.hide = true;
            this.custom(this.cur(), 0)
        },
        step: function(a) {
            var b = J(),
                d = true;
            if (a || b >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                this.options.curAnim[this.prop] = true;
                for (var f in this.options.curAnim)
                    if (this.options.curAnim[f] !== true) d = false;
                if (d) {
                    if (this.options.display != null) {
                        this.elem.style.overflow = this.options.overflow;
                        a = c.data(this.elem, "olddisplay");
                        this.elem.style.display = a ? a : this.options.display;
                        if (c.css(this.elem, "display") === "none") this.elem.style.display = "block"
                    }
                    this.options.hide && c(this.elem).hide();
                    if (this.options.hide || this.options.show)
                        for (var e in this.options.curAnim) c.style(this.elem, e, this.options.orig[e]);
                    this.options.complete.call(this.elem)
                }
                return false
            } else {
                e = b - this.startTime;
                this.state = e / this.options.duration;
                a = this.options.easing || (c.easing.swing ? "swing" : "linear");
                this.pos = c.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || a](this.state, e, 0, 1, this.options.duration);
                this.now = this.start + (this.end - this.start) * this.pos;
                this.update()
            }
            return true
        }
    };
    c.extend(c.fx, {
        tick: function() {
            for (var a = c.timers, b = 0; b < a.length; b++) a[b]() || a.splice(b--, 1);
            a.length || c.fx.stop()
        },
        stop: function() {
            clearInterval(W);
            W = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                c.style(a.elem, "opacity", a.now)
            },
            _default: function(a) {
                if (a.elem.style && a.elem.style[a.prop] != null) a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit;
                else a.elem[a.prop] = a.now
            }
        }
    });
    if (c.expr && c.expr.filters) c.expr.filters.animated = function(a) {
        return c.grep(c.timers, function(b) {
            return a === b.elem
        }).length
    };
    c.fn.offset = "getBoundingClientRect" in r.documentElement ? function(a) {
        var b = this[0];
        if (a) return this.each(function(e) {
            c.offset.setOffset(this, a, e)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
        var d = b.getBoundingClientRect(),
            f = b.ownerDocument;
        b = f.body;
        f = f.documentElement;
        return {
            top: d.top + (self.pageYOffset || c.support.boxModel && f.scrollTop || b.scrollTop) - (f.clientTop || b.clientTop || 0),
            left: d.left + (self.pageXOffset || c.support.boxModel && f.scrollLeft || b.scrollLeft) - (f.clientLeft || b.clientLeft || 0)
        }
    } : function(a) {
        var b = this[0];
        if (a) return this.each(function(s) {
            c.offset.setOffset(this, a, s)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return c.offset.bodyOffset(b);
        c.offset.initialize();
        var d = b.offsetParent,
            f = b,
            e = b.ownerDocument,
            i, j = e.documentElement,
            n = e.body;
        f = (e = e.defaultView) ? e.getComputedStyle(b, null) : b.currentStyle;
        for (var o = b.offsetTop, m = b.offsetLeft;
            (b = b.parentNode) && b !== n && b !== j;) {
            if (c.offset.supportsFixedPosition && f.position === "fixed") break;
            i = e ? e.getComputedStyle(b, null) : b.currentStyle;
            o -= b.scrollTop;
            m -= b.scrollLeft;
            if (b === d) {
                o += b.offsetTop;
                m += b.offsetLeft;
                if (c.offset.doesNotAddBorder && !(c.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(b.nodeName))) {
                    o += parseFloat(i.borderTopWidth) || 0;
                    m += parseFloat(i.borderLeftWidth) || 0
                }
                f = d;
                d = b.offsetParent
            }
            if (c.offset.subtractsBorderForOverflowNotVisible && i.overflow !== "visible") {
                o += parseFloat(i.borderTopWidth) || 0;
                m += parseFloat(i.borderLeftWidth) || 0
            }
            f = i
        }
        if (f.position === "relative" || f.position === "static") {
            o += n.offsetTop;
            m += n.offsetLeft
        }
        if (c.offset.supportsFixedPosition && f.position === "fixed") {
            o += Math.max(j.scrollTop, n.scrollTop);
            m += Math.max(j.scrollLeft, n.scrollLeft)
        }
        return {
            top: o,
            left: m
        }
    };
    c.offset = {
        initialize: function() {
            var a = r.body,
                b = r.createElement("div"),
                d, f, e, i = parseFloat(c.curCSS(a, "marginTop", true)) || 0;
            c.extend(b.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            a.insertBefore(b, a.firstChild);
            d = b.firstChild;
            f = d.firstChild;
            e = d.nextSibling.firstChild.firstChild;
            this.doesNotAddBorder = f.offsetTop !== 5;
            this.doesAddBorderForTableAndCells = e.offsetTop === 5;
            f.style.position = "fixed";
            f.style.top = "20px";
            this.supportsFixedPosition = f.offsetTop === 20 || f.offsetTop === 15;
            f.style.position = f.style.top = "";
            d.style.overflow = "hidden";
            d.style.position = "relative";
            this.subtractsBorderForOverflowNotVisible = f.offsetTop === -5;
            this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== i;
            a.removeChild(b);
            c.offset.initialize = c.noop
        },
        bodyOffset: function(a) {
            var b = a.offsetTop,
                d = a.offsetLeft;
            c.offset.initialize();
            if (c.offset.doesNotIncludeMarginInBodyOffset) {
                b += parseFloat(c.curCSS(a, "marginTop", true)) || 0;
                d += parseFloat(c.curCSS(a, "marginLeft", true)) || 0
            }
            return {
                top: b,
                left: d
            }
        },
        setOffset: function(a, b, d) {
            if (/static/.test(c.curCSS(a, "position"))) a.style.position = "relative";
            var f = c(a),
                e = f.offset(),
                i = parseInt(c.curCSS(a, "top", true), 10) || 0,
                j = parseInt(c.curCSS(a, "left", true), 10) || 0;
            if (c.isFunction(b)) b = b.call(a, d, e);
            d = {
                top: b.top - e.top + i,
                left: b.left -
                    e.left + j
            };
            "using" in b ? b.using.call(a, d) : f.css(d)
        }
    };
    c.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                d = this.offset(),
                f = /^body|html$/i.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            d.top -= parseFloat(c.curCSS(a, "marginTop", true)) || 0;
            d.left -= parseFloat(c.curCSS(a, "marginLeft", true)) || 0;
            f.top += parseFloat(c.curCSS(b[0], "borderTopWidth", true)) || 0;
            f.left += parseFloat(c.curCSS(b[0], "borderLeftWidth", true)) || 0;
            return {
                top: d.top - f.top,
                left: d.left - f.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || r.body; a && !/^body|html$/i.test(a.nodeName) && c.css(a, "position") === "static";) a = a.offsetParent;
                return a
            })
        }
    });
    c.each(["Left", "Top"], function(a, b) {
        var d = "scroll" + b;
        c.fn[d] = function(f) {
            var e = this[0],
                i;
            if (!e) return null;
            if (f !== v) return this.each(function() {
                if (i = ua(this)) i.scrollTo(!a ? f : c(i).scrollLeft(), a ? f : c(i).scrollTop());
                else this[d] = f
            });
            else return (i = ua(e)) ? "pageXOffset" in i ? i[a ? "pageYOffset" : "pageXOffset"] : c.support.boxModel && i.document.documentElement[d] || i.document.body[d] : e[d]
        }
    });
    c.each(["Height", "Width"], function(a, b) {
        var d = b.toLowerCase();
        c.fn["inner" + b] = function() {
            return this[0] ? c.css(this[0], d, false, "padding") : null
        };
        c.fn["outer" + b] = function(f) {
            return this[0] ? c.css(this[0], d, false, f ? "margin" : "border") : null
        };
        c.fn[d] = function(f) {
            var e = this[0];
            if (!e) return f == null ? null : this;
            if (c.isFunction(f)) return this.each(function(i) {
                var j = c(this);
                j[d](f.call(this, i, j[d]()))
            });
            return "scrollTo" in e && e.document ? e.document.compatMode === "CSS1Compat" && e.document.documentElement["client" + b] || e.document.body["client" + b] : e.nodeType === 9 ? Math.max(e.documentElement["client" + b], e.body["scroll" + b], e.documentElement["scroll" + b], e.body["offset" + b], e.documentElement["offset" + b]) : f === v ? c.css(e, d) : this.css(d, typeof f === "string" ? f : f + "px")
        }
    });
    z.jQuery = z.$ = c
})(window);
KEY_CODES = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    70: 'f',
    71: 'g',
    72: 'h',
    77: 'm',
    80: 'p'
}
KEY_STATUS = {
    keyDown: false
};
GRID_SIZE = 60;
Matrix = function(rows, columns) {
    var i, j;
    this.data = new Array(rows);
    for (i = 0; i < rows; i++) {
        this.data[i] = new Array(columns);
    }
    this.configure = function(rot, scale, transx, transy) {
        var rad = (rot * Math.PI) / 180;
        var sin = Math.sin(rad) * scale;
        var cos = Math.cos(rad) * scale;
        this.set(cos, -sin, transx, sin, cos, transy);
    };
    this.set = function() {
        var k = 0;
        for (i = 0; i < rows; i++) {
            for (j = 0; j < columns; j++) {
                this.data[i][j] = arguments[k];
                k++;
            }
        }
    }
    this.multiply = function() {
        var vector = new Array(rows);
        for (i = 0; i < rows; i++) {
            vector[i] = 0;
            for (j = 0; j < columns; j++) {
                vector[i] += this.data[i][j] * arguments[j];
            }
        }
        return vector;
    };
};
Sprite = function() {
    this.init = function(name, points) {
        this.name = name;
        this.points = points;
        this.vel = {
            x: 0,
            y: 0,
            rot: 0
        };
        this.acc = {
            x: 0,
            y: 0,
            rot: 0
        };
    };
    this.children = {};
    this.visible = false;
    this.reap = false;
    this.bridgesH = true;
    this.bridgesV = true;
    this.collidesWith = [];
    this.x = 0;
    this.y = 0;
    this.rot = 0;
    this.scale = 1;
    this.currentNode = null;
    this.nextSprite = null;
    this.preMove = null;
    this.postMove = null;
    this.run = function(delta) {
        this.move(delta);
        this.updateGrid();
        this.context.save();
        this.configureTransform();
        this.draw();
        var canidates = this.findCollisionCanidates();
        this.matrix.configure(this.rot, this.scale, this.x, this.y);
        this.checkCollisionsAgainst(canidates);
        this.context.restore();
    };
    this.move = function(delta) {
        if (!this.visible) return;
        this.transPoints = null;
        if ($.isFunction(this.preMove)) {
            this.preMove(delta);
        }
        this.vel.x += this.acc.x * delta;
        this.vel.y += this.acc.y * delta;
        this.x += this.vel.x * delta;
        this.y += this.vel.y * delta;
        this.rot += this.vel.rot * delta;
        if (this.rot > 360) {
            this.rot -= 360;
        } else if (this.rot < 0) {
            this.rot += 360;
        }
        if ($.isFunction(this.postMove)) {
            this.postMove(delta);
        }
    };
    this.updateGrid = function() {
        if (!this.visible) return;
        var gridx = Math.floor(this.x / GRID_SIZE);
        var gridy = Math.floor(this.y / GRID_SIZE);
        gridx = (gridx >= this.grid.length) ? 0 : gridx;
        gridy = (gridy >= this.grid[0].length) ? 0 : gridy;
        gridx = (gridx < 0) ? this.grid.length - 1 : gridx;
        gridy = (gridy < 0) ? this.grid[0].length - 1 : gridy;
        var newNode = this.grid[gridx][gridy];
        if (newNode != this.currentNode) {
            if (this.currentNode) {
                this.currentNode.leave(this);
            }
            newNode.enter(this);
            this.currentNode = newNode;
        }
        if (KEY_STATUS.g && this.currentNode) {
            this.context.lineWidth = 3.0;
            this.context.strokeStyle = 'green';
            this.context.strokeRect(gridx * GRID_SIZE + 2, gridy * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4);
            this.context.strokeStyle = 'black';
            this.context.lineWidth = 1.0;
        }
    };
    this.configureTransform = function() {
        if (!this.visible) return;
        var rad = (this.rot * Math.PI) / 180;
        this.context.translate(this.x, this.y);
        this.context.rotate(rad);
        this.context.scale(this.scale, this.scale);
    };
    this.draw = function() {
        if (!this.visible) return;
        if (this.name == 'asteroid' || this.name == 'ship') {
            this.context.lineWidth = 0.01;
        } else {
            this.context.lineWidth = 1.0 / this.scale;
        }
        for (child in this.children) {
            this.children[child].draw();
        }
        this.context.beginPath();
        this.context.moveTo(this.points[0], this.points[1]);
        for (var i = 1; i < this.points.length / 2; i++) {
            var xi = i * 2;
            var yi = xi + 1;
            this.context.lineTo(this.points[xi], this.points[yi]);
        }
        this.context.closePath();
        this.context.stroke();
        if (this.name == 'asteroid') {
            var grd = this.context.createLinearGradient(0, 0, 0.4, 0);
            if (Game.FSM.state == 'spawn_ship' || Game.FSM.state == 'player_died' || Game.FSM.state == 'run') {
                grd.addColorStop(0, '#41EBDF');
                grd.addColorStop(0.5, '#41EBDF');
                grd.addColorStop(0.51, '#ADFAF5');
                grd.addColorStop(1, '#ADFAF5');
            } else {
                grd.addColorStop(0, '#F1F2F7');
                grd.addColorStop(0.5, '#F1F2F7');
                grd.addColorStop(0.51, '#D5D5DD');
                grd.addColorStop(1, '#D5D5DD');
            }
            this.context.fillStyle = grd;
            this.context.fill();
        } else if (this.name == 'ship') {
            this.context.fillStyle = 'rgba(255, 44, 85, 1)';
            this.context.fill();
        }
    };
    this.findCollisionCanidates = function() {
        if (!this.visible || !this.currentNode) return [];
        var cn = this.currentNode;
        var canidates = [];
        if (cn.nextSprite) canidates.push(cn.nextSprite);
        if (cn.north.nextSprite) canidates.push(cn.north.nextSprite);
        if (cn.south.nextSprite) canidates.push(cn.south.nextSprite);
        if (cn.east.nextSprite) canidates.push(cn.east.nextSprite);
        if (cn.west.nextSprite) canidates.push(cn.west.nextSprite);
        if (cn.north.east.nextSprite) canidates.push(cn.north.east.nextSprite);
        if (cn.north.west.nextSprite) canidates.push(cn.north.west.nextSprite);
        if (cn.south.east.nextSprite) canidates.push(cn.south.east.nextSprite);
        if (cn.south.west.nextSprite) canidates.push(cn.south.west.nextSprite);
        return canidates
    };
    this.checkCollisionsAgainst = function(canidates) {
        for (var i = 0; i < canidates.length; i++) {
            var ref = canidates[i];
            do {
                this.checkCollision(ref);
                ref = ref.nextSprite;
            } while (ref)
        }
    };
    this.checkCollision = function(other) {
        if (!other.visible || this == other || this.collidesWith.indexOf(other.name) == -1) return;
        var trans = other.transformedPoints();
        var px, py;
        var count = trans.length / 2;
        for (var i = 0; i < count; i++) {
            px = trans[i * 2];
            py = trans[i * 2 + 1];
            if ((/firefox/.test(navigator.userAgent.toLowerCase())) ? this.pointInPolygon(px, py) : this.context.isPointInPath(px, py)) {
                other.collision(this);
                this.collision(other);
                return;
            }
        }
    };
    this.pointInPolygon = function(x, y) {
        var points = this.transformedPoints();
        var j = 2;
        var y0, y1;
        var oddNodes = false;
        for (var i = 0; i < points.length; i += 2) {
            y0 = points[i + 1];
            y1 = points[j + 1];
            if ((y0 < y && y1 >= y) || (y1 < y && y0 >= y)) {
                if (points[i] + (y - y0) / (y1 - y0) * (points[j] - points[i]) < x) {
                    oddNodes = !oddNodes;
                }
            }
            j += 2
            if (j == points.length) j = 0;
        }
        return oddNodes;
    };
    this.collision = function() {};
    this.die = function() {
        this.visible = false;
        this.reap = true;
        if (this.currentNode) {
            this.currentNode.leave(this);
            this.currentNode = null;
        }
    };
    this.transformedPoints = function() {
        if (this.transPoints) return this.transPoints;
        var trans = new Array(this.points.length);
        this.matrix.configure(this.rot, this.scale, this.x, this.y);
        for (var i = 0; i < this.points.length / 2; i++) {
            var xi = i * 2;
            var yi = xi + 1;
            var pts = this.matrix.multiply(this.points[xi], this.points[yi], 1);
            trans[xi] = pts[0];
            trans[yi] = pts[1];
        }
        this.transPoints = trans;
        return trans;
    };
    this.isClear = function() {
        if (this.collidesWith.length == 0) return true;
        var cn = this.currentNode;
        if (cn == null) {
            var gridx = Math.floor(this.x / GRID_SIZE);
            var gridy = Math.floor(this.y / GRID_SIZE);
            gridx = (gridx >= this.grid.length) ? 0 : gridx;
            gridy = (gridy >= this.grid[0].length) ? 0 : gridy;
            cn = this.grid[gridx][gridy];
        }
        return (cn.isEmpty(this.collidesWith) && cn.north.isEmpty(this.collidesWith) && cn.south.isEmpty(this.collidesWith) && cn.east.isEmpty(this.collidesWith) && cn.west.isEmpty(this.collidesWith) && cn.north.east.isEmpty(this.collidesWith) && cn.north.west.isEmpty(this.collidesWith) && cn.south.east.isEmpty(this.collidesWith) && cn.south.west.isEmpty(this.collidesWith));
    };
    this.wrapPostMove = function() {
        if (this.x > Game.canvasWidth) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = Game.canvasWidth;
        }
        if (this.y > Game.canvasHeight) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = Game.canvasHeight;
        }
    };
};
Ship = function() {
    this.init("ship", [-12, 7, 0, -19, 12, 7]);
    this.children.exhaust = new Sprite();
    this.children.exhaust.init("exhaust", [-5, 8, 0, 14, 5, 8]);
    this.bulletCounter = 0;
    this.postMove = this.wrapPostMove;
    this.collidesWith = ["asteroid", "bigalien", "alienbullet"];
    this.preMove = function(delta) {
        if (KEY_STATUS.left) {
            this.vel.rot = -6;
        } else if (KEY_STATUS.right) {
            this.vel.rot = 6;
        } else {
            this.vel.rot = 0;
        }
        if (KEY_STATUS.up) {
            var rad = ((this.rot - 90) * Math.PI) / 180;
            this.acc.x = 0.5 * Math.cos(rad);
            this.acc.y = 0.5 * Math.sin(rad);
            this.children.exhaust.visible = Math.random() > 0.1;
        } else {
            this.acc.x = 0;
            this.acc.y = 0;
            this.children.exhaust.visible = false;
        }
        if (this.bulletCounter > 0) {
            this.bulletCounter -= delta;
        }
        if (KEY_STATUS.space) {
            if (this.bulletCounter <= 0) {
                this.bulletCounter = 10;
                for (var i = 0; i < this.bullets.length; i++) {
                    if (!this.bullets[i].visible) {
                        var bullet = this.bullets[i];
                        var rad = ((this.rot - 90) * Math.PI) / 180;
                        var vectorx = Math.cos(rad);
                        var vectory = Math.sin(rad);
                        bullet.x = this.x + vectorx * 4;
                        bullet.y = this.y + vectory * 4;
                        bullet.vel.x = 6 * vectorx + this.vel.x;
                        bullet.vel.y = 6 * vectory + this.vel.y;
                        bullet.visible = true;
                        break;
                    }
                }
            }
        }
        if (Math.sqrt(this.vel.x * this.vel.x + this.vel.y * this.vel.y) > 8) {
            this.vel.x *= 0.95;
            this.vel.y *= 0.95;
        }
    };
    this.collision = function(other) {
        Game.explosionAt(other.x, other.y);
        Game.FSM.state = 'player_died';
        this.visible = false;
        this.currentNode.leave(this);
        this.currentNode = null;
        Game.lives--;
        $('#lives').html(Game.lives);
    };
};
Ship.prototype = new Sprite();
BigAlien = function() {
    this.init("bigalien", [-20, 0, -12, -4, 12, -4, 20, 0, 12, 4, -12, 4, -20, 0, 20, 0]);
    this.children.top = new Sprite();
    this.children.top.init("bigalien_top", [-8, -4, -6, -6, 6, -6, 8, -4]);
    this.children.top.visible = true;
    this.children.bottom = new Sprite();
    this.children.bottom.init("bigalien_top", [8, 4, 6, 6, -6, 6, -8, 4]);
    this.children.bottom.visible = true;
    this.collidesWith = ["asteroid", "ship", "bullet"];
    this.bridgesH = false;
    this.bullets = [];
    this.bulletCounter = 0;
    this.newPosition = function() {
        if (Math.random() < 0.5) {
            this.x = -20;
            this.vel.x = 1.5;
        } else {
            this.x = Game.canvasWidth + 20;
            this.vel.x = -1.5;
        }
        this.y = Math.random() * Game.canvasHeight;
    };
    this.setup = function() {
        this.newPosition();
        for (var i = 0; i < 3; i++) {
            var bull = new AlienBullet();
            this.bullets.push(bull);
            Game.sprites.push(bull);
        }
    };
    this.preMove = function(delta) {
        var cn = this.currentNode;
        if (cn == null) return;
        var topCount = 0;
        if (cn.north.nextSprite) topCount++;
        if (cn.north.east.nextSprite) topCount++;
        if (cn.north.west.nextSprite) topCount++;
        var bottomCount = 0;
        if (cn.south.nextSprite) bottomCount++;
        if (cn.south.east.nextSprite) bottomCount++;
        if (cn.south.west.nextSprite) bottomCount++;
        if (topCount > bottomCount) {
            this.vel.y = 1;
        } else if (topCount < bottomCount) {
            this.vel.y = -1;
        } else if (Math.random() < 0.01) {
            this.vel.y = -this.vel.y;
        }
        this.bulletCounter -= delta;
        if (this.bulletCounter <= 0) {
            this.bulletCounter = 22;
            for (var i = 0; i < this.bullets.length; i++) {
                if (!this.bullets[i].visible) {
                    bullet = this.bullets[i];
                    var rad = 2 * Math.PI * Math.random();
                    var vectorx = Math.cos(rad);
                    var vectory = Math.sin(rad);
                    bullet.x = this.x;
                    bullet.y = this.y;
                    bullet.vel.x = 6 * vectorx;
                    bullet.vel.y = 6 * vectory;
                    bullet.visible = true;
                    break;
                }
            }
        }
    };
    BigAlien.prototype.collision = function(other) {
        if (other.name == "bullet") Game.score += 200;
        if (Game.FSM.state == 'spawn_ship' || Game.FSM.state == 'player_died' || Game.FSM.state == 'run') {
            $('.score').html(numberWithCommas(Game.score));
        }
        Game.explosionAt(other.x, other.y);
        this.visible = false;
        this.newPosition();
    };
    this.postMove = function() {
        if (this.y > Game.canvasHeight) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = Game.canvasHeight;
        }
        if ((this.vel.x > 0 && this.x > Game.canvasWidth + 20) || (this.vel.x < 0 && this.x < -20)) {
            this.visible = false;
            this.newPosition();
        }
    }
};
BigAlien.prototype = new Sprite();
Bullet = function() {
    this.init("bullet", [0, 0]);
    this.time = 0;
    this.bridgesH = false;
    this.bridgesV = false;
    this.postMove = this.wrapPostMove;
    this.configureTransform = function() {};
    this.draw = function() {
        if (this.visible) {
            this.context.save();
            this.context.lineWidth = 2;
            this.context.strokeStyle = '#0A3038';
            this.context.beginPath();
            this.context.moveTo(this.x - 1, this.y - 1);
            this.context.lineTo(this.x + 1, this.y + 1);
            this.context.moveTo(this.x + 1, this.y - 1);
            this.context.lineTo(this.x - 1, this.y + 1);
            this.context.stroke();
            this.context.restore();
        }
    };
    this.preMove = function(delta) {
        if (this.visible) {
            this.time += delta;
        }
        if (this.time > 50) {
            this.visible = false;
            this.time = 0;
        }
    };
    this.collision = function(other) {
        this.time = 0;
        this.visible = false;
        this.currentNode.leave(this);
        this.currentNode = null;
    };
    this.transformedPoints = function(other) {
        return [this.x, this.y];
    };
};
Bullet.prototype = new Sprite();
AlienBullet = function() {
    this.init("alienbullet");
    this.draw = function() {
        if (this.visible) {
            this.context.save();
            this.context.lineWidth = 2;
            this.context.strokeStyle = '#0A3038';
            this.context.beginPath();
            this.context.moveTo(this.x, this.y);
            this.context.lineTo(this.x - this.vel.x, this.y - this.vel.y);
            this.context.stroke();
            this.context.restore();
        }
    };
};
AlienBullet.prototype = new Bullet();
Asteroid = function() {
    this.init("asteroid", [0, -11, -5, 0, -1.5, 9, 6.5, 0]);
    this.visible = true;
    this.scale = 6;
    this.postMove = this.wrapPostMove;
    this.collidesWith = ["ship", "bullet", "bigalien", "alienbullet"];
    this.collision = function(other) {
        if (other.name == "bullet") Game.score += 120 / this.scale;
        if (Game.FSM.state == 'spawn_ship' || Game.FSM.state == 'player_died' || Game.FSM.state == 'run') {
            $('.score').html(numberWithCommas(Game.score));
        }
        this.scale /= 3;
        if (this.scale > 0.5) {
            for (var i = 0; i < 3; i++) {
                var roid = $.extend(true, {}, this);
                roid.vel.x = Math.random() * 6 - 3;
                roid.vel.y = Math.random() * 6 - 3;
                roid.vel.rot = Math.random() * 2 - 1;
                roid.move(roid.scale * 3);
                Game.sprites.push(roid);
            }
        }
        Game.explosionAt(other.x, other.y);
        this.die();
    };
};
Asteroid.prototype = new Sprite();
Explosion = function() {
    this.init("explosion");
    this.bridgesH = false;
    this.bridgesV = false;
    this.lines = [];
    for (var i = 0; i < 5; i++) {
        var rad = 2 * Math.PI * Math.random();
        var x = Math.cos(rad);
        var y = Math.sin(rad);
        this.lines.push([x, y, x * 2, y * 2]);
    }
    this.draw = function() {
        if (this.visible) {
            this.context.save();
            this.context.lineWidth = 1.0 / this.scale;
            this.context.beginPath();
            for (var i = 0; i < 5; i++) {
                var line = this.lines[i];
                this.context.moveTo(line[0], line[1]);
                this.context.lineTo(line[2], line[3]);
            }
            this.context.stroke();
            this.context.restore();
        }
    };
    this.preMove = function(delta) {
        if (this.visible) {
            this.scale += delta;
        }
        if (this.scale > 8) {
            this.die();
        }
    };
};
Explosion.prototype = new Sprite();
GridNode = function() {
    this.north = null;
    this.south = null;
    this.east = null;
    this.west = null;
    this.nextSprite = null;
    this.dupe = {
        horizontal: null,
        vertical: null
    };
    this.enter = function(sprite) {
        sprite.nextSprite = this.nextSprite;
        this.nextSprite = sprite;
    };
    this.leave = function(sprite) {
        var ref = this;
        while (ref && (ref.nextSprite != sprite)) {
            ref = ref.nextSprite;
        }
        if (ref) {
            ref.nextSprite = sprite.nextSprite;
            sprite.nextSprite = null;
        }
    };
    this.eachSprite = function(sprite, callback) {
        var ref = this;
        while (ref.nextSprite) {
            ref = ref.nextSprite;
            callback.call(sprite, ref);
        }
    };
    this.isEmpty = function(collidables) {
        var empty = true;
        var ref = this;
        while (ref.nextSprite) {
            ref = ref.nextSprite;
            empty = !ref.visible || collidables.indexOf(ref.name) == -1
            if (!empty) break;
        }
        return empty;
    };
};
Text = {
    renderGlyph: function(ctx, face, char) {
        var glyph = face.glyphs[char];
        if (glyph.o) {
            var outline;
            if (glyph.cached_outline) {
                outline = glyph.cached_outline;
            } else {
                outline = glyph.o.split(' ');
                glyph.cached_outline = outline;
            }
            var outlineLength = outline.length;
            for (var i = 0; i < outlineLength;) {
                var action = outline[i++];
                switch (action) {
                    case 'm':
                        ctx.moveTo(outline[i++], outline[i++]);
                        break;
                    case 'l':
                        ctx.lineTo(outline[i++], outline[i++]);
                        break;
                    case 'q':
                        var cpx = outline[i++];
                        var cpy = outline[i++];
                        ctx.quadraticCurveTo(outline[i++], outline[i++], cpx, cpy);
                        break;
                    case 'b':
                        var x = outline[i++];
                        var y = outline[i++];
                        ctx.bezierCurveTo(outline[i++], outline[i++], outline[i++], outline[i++], x, y);
                        break;
                }
            }
        }
        if (glyph.ha) {
            ctx.translate(glyph.ha, 0);
        }
    },
    context: null,
    face: null
};
Game = {
    score: 0,
    totalAsteroids: 5,
    lives: 0,
    canvasWidth: 100,
    canvasHeight: 600,
    sprites: [],
    ship: null,
    bigAlien: null,
    nextBigAlienTime: null,
    playerName: '',
    spawnAsteroids: function(count) {
        if (!count) count = this.totalAsteroids;
        for (var i = 0; i < count; i++) {
            var roid = new Asteroid();
            roid.x = Math.random() * this.canvasWidth;
            roid.y = Math.random() * this.canvasHeight;
            while (!roid.isClear()) {
                roid.x = Math.random() * this.canvasWidth;
                roid.y = Math.random() * this.canvasHeight;
            }
            roid.vel.x = Math.random() * 4 - 2;
            roid.vel.y = Math.random() * 4 - 2;
            roid.points.reverse();
            roid.vel.rot = Math.random() * 2 - 1;
            Game.sprites.push(roid);
        }
    },
    explosionAt: function(x, y) {
        var splosion = new Explosion();
        splosion.x = x;
        splosion.y = y;
        splosion.visible = true;
        Game.sprites.push(splosion);
    },
    FSM: {
        boot: function() {
            Game.spawnAsteroids(5);
            this.state = 'waiting';
        },
        waiting: function() {},
        start: function() {
            $('.canvas-game .btn-facebook').attr('href', sharing_backup_fb_href);
            $('.canvas-game .btn-twitter').attr('href', sharing_backup_twitter_href);
            $('.canvas-game .content-wrapper').hide();
            $('.canvas-game .end-game').hide();
            $('.canvas-game .get-player-name').hide();
            $('.canvas-game .points').show();
            $('.canvas-game').css('height', 'auto');
            for (var i = 0; i < Game.sprites.length; i++) {
                if (Game.sprites[i].name == 'asteroid') {
                    Game.sprites[i].die();
                } else if (Game.sprites[i].name == 'bullet' || Game.sprites[i].name == 'bigalien') {
                    Game.sprites[i].visible = false;
                }
            }
            Game.score = 0;
            Game.lives = 2;
            Game.totalAsteroids = 2;
            Game.spawnAsteroids();
            $('.score').html(numberWithCommas(Game.score));
            $('#lives').html(Game.lives);
            Game.nextBigAlienTime = Date.now() + 30000 + (30000 * Math.random());
            this.state = 'spawn_ship';
        },
        spawn_ship: function() {
            Game.ship.x = Game.canvasWidth / 2;
            Game.ship.y = Game.canvasHeight / 2;
            if (Game.ship.isClear()) {
                Game.ship.rot = 0;
                Game.ship.vel.x = 0;
                Game.ship.vel.y = 0;
                Game.ship.visible = true;
                this.state = 'run';
            }
        },
        run: function() {
            for (var i = 0; i < Game.sprites.length; i++) {
                if (Game.sprites[i].name == 'asteroid') {
                    break;
                }
            }
            if (i == Game.sprites.length) {
                this.state = 'new_level';
            }
            if (!Game.bigAlien.visible && Date.now() > Game.nextBigAlienTime) {
                Game.bigAlien.visible = true;
                Game.nextBigAlienTime = Date.now() + (30000 * Math.random());
            }
        },
        new_level: function() {
            if (this.timer == null) {
                this.timer = Date.now();
            }
            if (Date.now() - this.timer > 1000) {
                this.timer = null;
                Game.totalAsteroids++;
                if (Game.totalAsteroids > 12) Game.totalAsteroids = 12;
                Game.spawnAsteroids();
                this.state = 'run';
            }
        },
        player_died: function() {
            if (Game.lives < 0) {
                this.setPoints = false;
                this.state = 'end_game';
            } else {
                if (this.timer == null) {
                    this.timer = Date.now();
                }
                if (Date.now() - this.timer > 1000) {
                    this.timer = null;
                    this.state = 'spawn_ship';
                }
            }
        },
        end_game: function() {
            $('.canvas-game .points').hide();
            $('.canvas-game .end-game').show();
            var sharingFBHref = $('.canvas-game .btn-facebook').attr('href');
            sharingFBHref = sharingFBHref.replace("{SCORE}", Game.score);
            $('.canvas-game .btn-facebook').attr('href', sharingFBHref);
            var sharingTwitterHref = $('.canvas-game .btn-twitter').attr('href');
            sharingTwitterHref = sharingTwitterHref.replace("{SCORE}", Game.score);
            $('.canvas-game .btn-twitter').attr('href', sharingTwitterHref);
            if (!this.setPoints) {
                $.ajax({
                    url: ajax_request.ajaxurl,
                    type: 'post',
                    data: {
                        action: 'ajax_yah_game_score',
                        name: Game.playerName,
                        score: Game.score
                    },
                    success: function() {
                        get_highscores(function() {
                            var contentWrapperHeight = $('.canvas-game .end-game').outerHeight(true);
                            var canvasHeight = $('#canvas').height();
                            var setHeight = canvasHeight > contentWrapperHeight ? canvasHeight : contentWrapperHeight;
                            $('.canvas-game').css('height', setHeight + 'px');
                        });
                    }
                });
                this.setPoints = true;
            }
            if (this.timer == null) {
                this.timer = Date.now();
            }
            if (Date.now() - this.timer > 5000) {
                this.timer = null;
                this.state = 'waiting';
            }
            $(window).unbind('keydown');
            $(window).unbind('keyup');
            window.gameStart = false;
        },
        execute: function() {
            this[this.state]();
        },
        state: 'boot'
    }
};
var sharing_backup_fb_href = '';
var sharing_backup_twitter_href = '';
$(function() {
    sharing_backup_fb_href = $('.canvas-game .btn-facebook').attr('href');
    sharing_backup_twitter_href = $('.canvas-game .btn-twitter').attr('href');
    if ($('section.canvas-game').length && $(window).width() > 768) {
        $('.canvas-game .points').hide();
        $('.canvas-game .end-game').hide();
        $('.canvas-game .get-player-name').hide();
        $('.playgame button').on('click', function() {
            var getPlayerNameInput = $('.get-player-name input').val();
            if (getPlayerNameInput !== '' && getPlayerNameInput !== ' ') {
                Game.playerName = getPlayerNameInput;
            }
            if (Game.playerName !== '' && Game.playerName !== ' ') {
                Game.FSM.state = 'start';
                for (code in KEY_CODES) {
                    KEY_STATUS[KEY_CODES[code]] = false;
                }
                $(window).keydown(function(e) {
                    KEY_STATUS.keyDown = true;
                    if (KEY_CODES[e.keyCode]) {
                        e.preventDefault();
                        KEY_STATUS[KEY_CODES[e.keyCode]] = true;
                    }
                }).keyup(function(e) {
                    KEY_STATUS.keyDown = false;
                    if (KEY_CODES[e.keyCode]) {
                        e.preventDefault();
                        KEY_STATUS[KEY_CODES[e.keyCode]] = false;
                    }
                });
            } else {
                $('.canvas-game .content-wrapper').hide();
                $('.canvas-game .get-player-name').show();
            }
        });
        $('.nothanks').on('click', function() {
            Game.FSM.state = 'waiting';
            Game.playerName = '';
            $('.get-player-name input')[0].value = '';
            $('.canvas-game .end-game').hide();
            $('.canvas-game .points').hide();
            $('.canvas-game .content-wrapper').show();
            var contentWrapperHeight = $('.canvas-game .content-wrapper').outerHeight(true);
            var canvasHeight = $('#canvas').height();
            var setHeight = canvasHeight > contentWrapperHeight ? canvasHeight : contentWrapperHeight;
            $('.canvas-game').css('height', setHeight + 'px');
        });
        var canvas = $("#canvas");
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        var canvasHeight;
        canvas.attr('width', windowWidth + 'px');
        if ($('body').hasClass('error404')) {
            var footerHeight = $('footer.main-footer').outerHeight();
            canvasHeight = windowHeight - footerHeight;
        } else {
            var navHeight = $('nav.main-menu').outerHeight();
            canvasHeight = windowHeight - navHeight - 100;
        }
        canvas.attr('height', canvasHeight + 'px');
        Game.canvasWidth = canvas.width();
        Game.canvasHeight = canvas.height();
        var context = canvas[0].getContext("2d");
        var gridWidth = Math.round(Game.canvasWidth / GRID_SIZE);
        var gridHeight = Math.round(Game.canvasHeight / GRID_SIZE);
        var grid = new Array(gridWidth);
        for (var i = 0; i < gridWidth; i++) {
            grid[i] = new Array(gridHeight);
            for (var j = 0; j < gridHeight; j++) {
                grid[i][j] = new GridNode();
            }
        }
        for (var i = 0; i < gridWidth; i++) {
            for (var j = 0; j < gridHeight; j++) {
                var node = grid[i][j];
                node.north = grid[i][(j == 0) ? gridHeight - 1 : j - 1];
                node.south = grid[i][(j == gridHeight - 1) ? 0 : j + 1];
                node.west = grid[(i == 0) ? gridWidth - 1 : i - 1][j];
                node.east = grid[(i == gridWidth - 1) ? 0 : i + 1][j];
            }
        }
        for (var i = 0; i < gridWidth; i++) {
            grid[i][0].dupe.vertical = Game.canvasHeight;
            grid[i][gridHeight - 1].dupe.vertical = -Game.canvasHeight;
        }
        for (var j = 0; j < gridHeight; j++) {
            grid[0][j].dupe.horizontal = Game.canvasWidth;
            grid[gridWidth - 1][j].dupe.horizontal = -Game.canvasWidth;
        }
        var sprites = [];
        Game.sprites = sprites;
        Sprite.prototype.context = context;
        Sprite.prototype.grid = grid;
        Sprite.prototype.matrix = new Matrix(2, 3);
        var ship = new Ship();
        ship.x = Game.canvasWidth / 2;
        ship.y = Game.canvasHeight / 2;
        sprites.push(ship);
        ship.bullets = [];
        for (var i = 0; i < 10; i++) {
            var bull = new Bullet();
            ship.bullets.push(bull);
            sprites.push(bull);
        }
        Game.ship = ship;
        var bigAlien = new BigAlien();
        Game.bigAlien = bigAlien;
        var extraDude = new Ship();
        extraDude.scale = 0.6;
        extraDude.visible = true;
        extraDude.preMove = null;
        extraDude.children = [];
        var i, j = 0;
        var paused = false;
        var showFramerate = false;
        var avgFramerate = 0;
        var frameCount = 0;
        var elapsedCounter = 0;
        var lastFrame = Date.now();
        var thisFrame;
        var elapsed;
        var delta;
        var canvasNode = canvas[0];
        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
        })();
        var mainLoop = function() {
            context.clearRect(0, 0, Game.canvasWidth, Game.canvasHeight);
            Game.FSM.execute();
            if (KEY_STATUS.g) {
                context.beginPath();
                for (var i = 0; i < gridWidth; i++) {
                    context.moveTo(i * GRID_SIZE, 0);
                    context.lineTo(i * GRID_SIZE, Game.canvasHeight);
                }
                for (var j = 0; j < gridHeight; j++) {
                    context.moveTo(0, j * GRID_SIZE);
                    context.lineTo(Game.canvasWidth, j * GRID_SIZE);
                }
                context.closePath();
                context.stroke();
            }
            thisFrame = Date.now();
            elapsed = thisFrame - lastFrame;
            lastFrame = thisFrame;
            delta = elapsed / 30;
            for (i = 0; i < sprites.length; i++) {
                sprites[i].run(delta);
                if (sprites[i].reap) {
                    sprites[i].reap = false;
                    sprites.splice(i, 1);
                    i--;
                }
            }
            if (showFramerate) {}
            frameCount++;
            elapsedCounter += elapsed;
            if (elapsedCounter > 1000) {
                elapsedCounter -= 1000;
                avgFramerate = frameCount;
                frameCount = 0;
            }
            if (paused) {} else {
                requestAnimFrame(mainLoop, canvasNode);
            }
        };
        mainLoop();
        $(window).keydown(function(e) {
            switch (KEY_CODES[e.keyCode]) {
                case 'f':
                    showFramerate = !showFramerate;
                    break;
                case 'p':
                    paused = !paused;
                    if (!paused) {
                        lastFrame = Date.now();
                        mainLoop();
                    }
                    break;
            }
        });
    }
    get_highscores(function() {
        var contentWrapperHeight = $('.canvas-game .content-wrapper .content-inner').outerHeight(true);
        var canvasHeight = $('#canvas').outerHeight(true);
        var setHeight = canvasHeight > contentWrapperHeight ? canvasHeight : contentWrapperHeight;
        $('.canvas-game').css('height', setHeight + 'px');
    });
});

function get_highscores(callback_func) {
    $('.canvas-game .highscores .names, .canvas-game .highscores .scores').empty();
    $.ajax({
        url: ajax_request.ajaxurl,
        type: 'post',
        data: {
            action: 'ajax_yah_game_get_highscores'
        },
        success: function(data) {
            var dataJson = $.parseJSON(data);
            $.each(dataJson, function(index, value) {
                $('.canvas-game .highscores .names').append('<p>' + value["name"] + '</p>');
                $('.canvas-game .highscores .scores').append('<p>' + numberWithCommas(value["score"]) + '</p>');
                if ((dataJson.length - 1) === index) {
                    callback_func();
                }
            });
        }
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
! function(a, b) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    "use strict";

    function c(a, b) {
        b = b || _;
        var c = b.createElement("script");
        c.text = a, b.head.appendChild(c).parentNode.removeChild(c)
    }

    function d(a) {
        var b = !!a && "length" in a && a.length,
            c = ma.type(a);
        return "function" !== c && !ma.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a)
    }

    function e(a, b, c) {
        if (ma.isFunction(b)) return ma.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return ma.grep(a, function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (wa.test(b)) return ma.filter(b, a, c);
            b = ma.filter(b, a)
        }
        return ma.grep(a, function(a) {
            return ea.call(b, a) > -1 !== c && 1 === a.nodeType
        })
    }

    function f(a, b) {
        for (;
            (a = a[b]) && 1 !== a.nodeType;);
        return a
    }

    function g(a) {
        var b = {};
        return ma.each(a.match(Ca) || [], function(a, c) {
            b[c] = !0
        }), b
    }

    function h(a) {
        return a
    }

    function i(a) {
        throw a
    }

    function j(a, b, c) {
        var d;
        try {
            a && ma.isFunction(d = a.promise) ? d.call(a).done(b).fail(c) : a && ma.isFunction(d = a.then) ? d.call(a, b, c) : b.call(void 0, a)
        } catch (a) {
            c.call(void 0, a)
        }
    }

    function k() {
        _.removeEventListener("DOMContentLoaded", k), a.removeEventListener("load", k), ma.ready()
    }

    function l() {
        this.expando = ma.expando + l.uid++
    }

    function m(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType)
            if (d = "data-" + b.replace(Ka, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : Ja.test(c) ? JSON.parse(c) : c)
                } catch (e) {}
                Ia.set(a, b, c)
            } else c = void 0;
        return c
    }

    function n(a, b, c, d) {
        var e, f = 1,
            g = 20,
            h = d ? function() {
                return d.cur()
            } : function() {
                return ma.css(a, b, "")
            },
            i = h(),
            j = c && c[3] || (ma.cssNumber[b] ? "" : "px"),
            k = (ma.cssNumber[b] || "px" !== j && +i) && Ma.exec(ma.css(a, b));
        if (k && k[3] !== j) {
            j = j || k[3], c = c || [], k = +i || 1;
            do f = f || ".5", k /= f, ma.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
        }
        return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
    }

    function o(a) {
        var b, c = a.ownerDocument,
            d = a.nodeName,
            e = Qa[d];
        return e ? e : (b = c.body.appendChild(c.createElement(d)), e = ma.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), Qa[d] = e, e)
    }

    function p(a, b) {
        for (var c, d, e = [], f = 0, g = a.length; f < g; f++) d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = Ha.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && Oa(d) && (e[f] = o(d))) : "none" !== c && (e[f] = "none", Ha.set(d, "display", c)));
        for (f = 0; f < g; f++) null != e[f] && (a[f].style.display = e[f]);
        return a
    }

    function q(a, b) {
        var c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && ma.nodeName(a, b) ? ma.merge([a], c) : c
    }

    function r(a, b) {
        for (var c = 0, d = a.length; c < d; c++) Ha.set(a[c], "globalEval", !b || Ha.get(b[c], "globalEval"))
    }

    function s(a, b, c, d, e) {
        for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++)
            if (f = a[n], f || 0 === f)
                if ("object" === ma.type(f)) ma.merge(m, f.nodeType ? [f] : f);
                else if (Va.test(f)) {
            for (g = g || l.appendChild(b.createElement("div")), h = (Sa.exec(f) || ["", ""])[1].toLowerCase(), i = Ua[h] || Ua._default, g.innerHTML = i[1] + ma.htmlPrefilter(f) + i[2], k = i[0]; k--;) g = g.lastChild;
            ma.merge(m, g.childNodes), g = l.firstChild, g.textContent = ""
        } else m.push(b.createTextNode(f));
        for (l.textContent = "", n = 0; f = m[n++];)
            if (d && ma.inArray(f, d) > -1) e && e.push(f);
            else if (j = ma.contains(f.ownerDocument, f), g = q(l.appendChild(f), "script"), j && r(g), c)
            for (k = 0; f = g[k++];) Ta.test(f.type || "") && c.push(f);
        return l
    }

    function t() {
        return !0
    }

    function u() {
        return !1
    }

    function v() {
        try {
            return _.activeElement
        } catch (a) {}
    }

    function w(a, b, c, d, e, f) {
        var g, h;
        if ("object" == typeof b) {
            "string" != typeof c && (d = d || c, c = void 0);
            for (h in b) w(a, h, c, d, b[h], f);
            return a
        }
        if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = u;
        else if (!e) return a;
        return 1 === f && (g = e, e = function(a) {
            return ma().off(a), g.apply(this, arguments)
        }, e.guid = g.guid || (g.guid = ma.guid++)), a.each(function() {
            ma.event.add(this, b, e, d, c)
        })
    }

    function x(a, b) {
        return ma.nodeName(a, "table") && ma.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a : a
    }

    function y(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function z(a) {
        var b = bb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function A(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (Ha.hasData(a) && (f = Ha.access(a), g = Ha.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j)
                    for (c = 0, d = j[e].length; c < d; c++) ma.event.add(b, e, j[e][c])
            }
            Ia.hasData(a) && (h = Ia.access(a), i = ma.extend({}, h), Ia.set(b, i))
        }
    }

    function B(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && Ra.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
    }

    function C(a, b, d, e) {
        b = ca.apply([], b);
        var f, g, h, i, j, k, l = 0,
            m = a.length,
            n = m - 1,
            o = b[0],
            p = ma.isFunction(o);
        if (p || m > 1 && "string" == typeof o && !ka.checkClone && ab.test(o)) return a.each(function(c) {
            var f = a.eq(c);
            p && (b[0] = o.call(this, c, f.html())), C(f, b, d, e)
        });
        if (m && (f = s(b, a[0].ownerDocument, !1, a, e), g = f.firstChild, 1 === f.childNodes.length && (f = g), g || e)) {
            for (h = ma.map(q(f, "script"), y), i = h.length; l < m; l++) j = f, l !== n && (j = ma.clone(j, !0, !0), i && ma.merge(h, q(j, "script"))), d.call(a[l], j, l);
            if (i)
                for (k = h[h.length - 1].ownerDocument, ma.map(h, z), l = 0; l < i; l++) j = h[l], Ta.test(j.type || "") && !Ha.access(j, "globalEval") && ma.contains(k, j) && (j.src ? ma._evalUrl && ma._evalUrl(j.src) : c(j.textContent.replace(cb, ""), k))
        }
        return a
    }

    function D(a, b, c) {
        for (var d, e = b ? ma.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || ma.cleanData(q(d)), d.parentNode && (c && ma.contains(d.ownerDocument, d) && r(q(d, "script")), d.parentNode.removeChild(d));
        return a
    }

    function E(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || fb(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || ma.contains(a.ownerDocument, a) || (g = ma.style(a, b)), !ka.pixelMarginRight() && eb.test(g) && db.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
    }

    function F(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }

    function G(a) {
        if (a in kb) return a;
        for (var b = a[0].toUpperCase() + a.slice(1), c = jb.length; c--;)
            if (a = jb[c] + b, a in kb) return a
    }

    function H(a, b, c) {
        var d = Ma.exec(b);
        return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b
    }

    function I(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; f < 4; f += 2) "margin" === c && (g += ma.css(a, c + Na[f], !0, e)), d ? ("content" === c && (g -= ma.css(a, "padding" + Na[f], !0, e)), "margin" !== c && (g -= ma.css(a, "border" + Na[f] + "Width", !0, e))) : (g += ma.css(a, "padding" + Na[f], !0, e), "padding" !== c && (g += ma.css(a, "border" + Na[f] + "Width", !0, e)));
        return g
    }

    function J(a, b, c) {
        var d, e = !0,
            f = fb(a),
            g = "border-box" === ma.css(a, "boxSizing", !1, f);
        if (a.getClientRects().length && (d = a.getBoundingClientRect()[b]), d <= 0 || null == d) {
            if (d = E(a, b, f), (d < 0 || null == d) && (d = a.style[b]), eb.test(d)) return d;
            e = g && (ka.boxSizingReliable() || d === a.style[b]), d = parseFloat(d) || 0
        }
        return d + I(a, b, c || (g ? "border" : "content"), e, f) + "px"
    }

    function K(a, b, c, d, e) {
        return new K.prototype.init(a, b, c, d, e)
    }

    function L() {
        mb && (a.requestAnimationFrame(L), ma.fx.tick())
    }

    function M() {
        return a.setTimeout(function() {
            lb = void 0
        }), lb = ma.now()
    }

    function N(a, b) {
        var c, d = 0,
            e = {
                height: a
            };
        for (b = b ? 1 : 0; d < 4; d += 2 - b) c = Na[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e
    }

    function O(a, b, c) {
        for (var d, e = (R.tweeners[b] || []).concat(R.tweeners["*"]), f = 0, g = e.length; f < g; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function P(a, b, c) {
        var d, e, f, g, h, i, j, k, l = "width" in b || "height" in b,
            m = this,
            n = {},
            o = a.style,
            q = a.nodeType && Oa(a),
            r = Ha.get(a, "fxshow");
        c.queue || (g = ma._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function() {
            g.unqueued || h()
        }), g.unqueued++, m.always(function() {
            m.always(function() {
                g.unqueued--, ma.queue(a, "fx").length || g.empty.fire()
            })
        }));
        for (d in b)
            if (e = b[d], nb.test(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
                    if ("show" !== e || !r || void 0 === r[d]) continue;
                    q = !0
                }
                n[d] = r && r[d] || ma.style(a, d)
            }
        if (i = !ma.isEmptyObject(b), i || !ma.isEmptyObject(n)) {
            l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = r && r.display, null == j && (j = Ha.get(a, "display")), k = ma.css(a, "display"), "none" === k && (j ? k = j : (p([a], !0), j = a.style.display || j, k = ma.css(a, "display"), p([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === ma.css(a, "float") && (i || (m.done(function() {
                o.display = j
            }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function() {
                o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
            })), i = !1;
            for (d in n) i || (r ? "hidden" in r && (q = r.hidden) : r = Ha.access(a, "fxshow", {
                display: j
            }), f && (r.hidden = !q), q && p([a], !0), m.done(function() {
                q || p([a]), Ha.remove(a, "fxshow");
                for (d in n) ma.style(a, d, n[d])
            })), i = O(q ? r[d] : 0, d, m), d in r || (r[d] = i.start, q && (i.end = i.start, i.start = 0))
        }
    }

    function Q(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = ma.camelCase(c), e = b[d], f = a[c], ma.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = ma.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function R(a, b, c) {
        var d, e, f = 0,
            g = R.prefilters.length,
            h = ma.Deferred().always(function() {
                delete i.elem
            }),
            i = function() {
                if (e) return !1;
                for (var b = lb || M(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: ma.extend({}, b),
                opts: ma.extend(!0, {
                    specialEasing: {},
                    easing: ma.easing._default
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: lb || M(),
                duration: c.duration,
                tweens: [],
                createTween: function(b, c) {
                    var d = ma.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; c < d; c++) j.tweens[c].run(1);
                    return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (Q(k, j.opts.specialEasing); f < g; f++)
            if (d = R.prefilters[f].call(j, a, k, j.opts)) return ma.isFunction(d.stop) && (ma._queueHooks(j.elem, j.opts.queue).stop = ma.proxy(d.stop, d)), d;
        return ma.map(k, O, j), ma.isFunction(j.opts.start) && j.opts.start.call(a, j), ma.fx.timer(ma.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    function S(a) {
        return a.getAttribute && a.getAttribute("class") || ""
    }

    function T(a, b, c, d) {
        var e;
        if (ma.isArray(b)) ma.each(b, function(b, e) {
            c || Ab.test(a) ? d(a, e) : T(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== ma.type(b)) d(a, b);
        else
            for (e in b) T(a + "[" + e + "]", b[e], c, d)
    }

    function U(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(Ca) || [];
            if (ma.isFunction(c))
                for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function V(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, ma.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
            }), i
        }
        var f = {},
            g = a === Mb;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
    }

    function W(a, b) {
        var c, d, e = ma.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && ma.extend(!0, a, d), a
    }

    function X(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes;
            "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d)
            for (e in h)
                if (h[e] && h[e].test(d)) {
                    i.unshift(e);
                    break
                }
        if (i[0] in c) f = i[0];
        else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        if (f) return f !== i[0] && i.unshift(f), c[f]
    }

    function Y(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f;)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    }
            if (g !== !0)
                if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }

    function Z(a) {
        return ma.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
    }
    var $ = [],
        _ = a.document,
        aa = Object.getPrototypeOf,
        ba = $.slice,
        ca = $.concat,
        da = $.push,
        ea = $.indexOf,
        fa = {},
        ga = fa.toString,
        ha = fa.hasOwnProperty,
        ia = ha.toString,
        ja = ia.call(Object),
        ka = {},
        la = "3.1.0",
        ma = function(a, b) {
            return new ma.fn.init(a, b)
        },
        na = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        oa = /^-ms-/,
        pa = /-([a-z])/g,
        qa = function(a, b) {
            return b.toUpperCase()
        };
    ma.fn = ma.prototype = {
        jquery: la,
        constructor: ma,
        length: 0,
        toArray: function() {
            return ba.call(this)
        },
        get: function(a) {
            return null != a ? a < 0 ? this[a + this.length] : this[a] : ba.call(this)
        },
        pushStack: function(a) {
            var b = ma.merge(this.constructor(), a);
            return b.prevObject = this, b
        },
        each: function(a) {
            return ma.each(this, a)
        },
        map: function(a) {
            return this.pushStack(ma.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(ba.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length,
                c = +a + (a < 0 ? b : 0);
            return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: da,
        sort: $.sort,
        splice: $.splice
    }, ma.extend = ma.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || ma.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++)
            if (null != (a = arguments[h]))
                for (b in a) c = g[b], d = a[b], g !== d && (j && d && (ma.isPlainObject(d) || (e = ma.isArray(d))) ? (e ? (e = !1, f = c && ma.isArray(c) ? c : []) : f = c && ma.isPlainObject(c) ? c : {}, g[b] = ma.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }, ma.extend({
        expando: "jQuery" + (la + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === ma.type(a)
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return null != a && a === a.window
        },
        isNumeric: function(a) {
            var b = ma.type(a);
            return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a))
        },
        isPlainObject: function(a) {
            var b, c;
            return !(!a || "[object Object]" !== ga.call(a) || (b = aa(a)) && (c = ha.call(b, "constructor") && b.constructor, "function" != typeof c || ia.call(c) !== ja))
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? fa[ga.call(a)] || "object" : typeof a
        },
        globalEval: function(a) {
            c(a)
        },
        camelCase: function(a) {
            return a.replace(oa, "ms-").replace(pa, qa)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b) {
            var c, e = 0;
            if (d(a))
                for (c = a.length; e < c && b.call(a[e], e, a[e]) !== !1; e++);
            else
                for (e in a)
                    if (b.call(a[e], e, a[e]) === !1) break;
            return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(na, "")
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (d(Object(a)) ? ma.merge(c, "string" == typeof a ? [a] : a) : da.call(c, a)), c
        },
        inArray: function(a, b, c) {
            return null == b ? -1 : ea.call(b, a, c)
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; d < c; d++) a[e++] = b[d];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, c) {
            var e, f, g = 0,
                h = [];
            if (d(a))
                for (e = a.length; g < e; g++) f = b(a[g], g, c), null != f && h.push(f);
            else
                for (g in a) f = b(a[g], g, c), null != f && h.push(f);
            return ca.apply([], h)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            if ("string" == typeof b && (c = a[b], b = a, a = c), ma.isFunction(a)) return d = ba.call(arguments, 2), e = function() {
                return a.apply(b || this, d.concat(ba.call(arguments)))
            }, e.guid = a.guid = a.guid || ma.guid++, e
        },
        now: Date.now,
        support: ka
    }), "function" == typeof Symbol && (ma.fn[Symbol.iterator] = $[Symbol.iterator]), ma.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
        fa["[object " + b + "]"] = b.toLowerCase()
    });
    var ra = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, k, m = b && b.ownerDocument,
                o = b ? b.nodeType : 9;
            if (c = c || [], "string" != typeof a || !a || 1 !== o && 9 !== o && 11 !== o) return c;
            if (!d && ((b ? b.ownerDocument || b : P) !== H && G(b), b = b || H, J)) {
                if (11 !== o && (i = ra.exec(a)))
                    if (e = i[1]) {
                        if (9 === o) {
                            if (!(g = b.getElementById(e))) return c;
                            if (g.id === e) return c.push(g), c
                        } else if (m && (g = m.getElementById(e)) && N(b, g) && g.id === e) return c.push(g), c
                    } else {
                        if (i[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                        if ((e = i[3]) && w.getElementsByClassName && b.getElementsByClassName) return $.apply(c, b.getElementsByClassName(e)), c
                    }
                if (w.qsa && !U[a + " "] && (!K || !K.test(a))) {
                    if (1 !== o) m = b, k = a;
                    else if ("object" !== b.nodeName.toLowerCase()) {
                        for ((h = b.getAttribute("id")) ? h = h.replace(va, wa) : b.setAttribute("id", h = O), j = A(a), f = j.length; f--;) j[f] = "#" + h + " " + n(j[f]);
                        k = j.join(","), m = sa.test(a) && l(b.parentNode) || b
                    }
                    if (k) try {
                        return $.apply(c, m.querySelectorAll(k)), c
                    } catch (p) {} finally {
                        h === O && b.removeAttribute("id")
                    }
                }
            }
            return C(a.replace(ha, "$1"), b, c, d)
        }

        function c() {
            function a(c, d) {
                return b.push(c + " ") > x.cacheLength && delete a[b.shift()], a[c + " "] = d
            }
            var b = [];
            return a
        }

        function d(a) {
            return a[O] = !0, a
        }

        function e(a) {
            var b = H.createElement("fieldset");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function f(a, b) {
            for (var c = a.split("|"), d = c.length; d--;) x.attrHandle[c[d]] = b
        }

        function g(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;
            if (d) return d;
            if (c)
                for (; c = c.nextSibling;)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function h(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function j(a) {
            return function(b) {
                return "label" in b && b.disabled === a || "form" in b && b.disabled === a || "form" in b && b.disabled === !1 && (b.isDisabled === a || b.isDisabled !== !a && ("label" in b || !ya(b)) !== a)
            }
        }

        function k(a) {
            return d(function(b) {
                return b = +b, d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function l(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }

        function m() {}

        function n(a) {
            for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
            return d
        }

        function o(a, b, c) {
            var d = b.dir,
                e = b.next,
                f = e || d,
                g = c && "parentNode" === f,
                h = R++;
            return b.first ? function(b, c, e) {
                for (; b = b[d];)
                    if (1 === b.nodeType || g) return a(b, c, e)
            } : function(b, c, i) {
                var j, k, l, m = [Q, h];
                if (i) {
                    for (; b = b[d];)
                        if ((1 === b.nodeType || g) && a(b, c, i)) return !0
                } else
                    for (; b = b[d];)
                        if (1 === b.nodeType || g)
                            if (l = b[O] || (b[O] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b;
                            else {
                                if ((j = k[f]) && j[0] === Q && j[1] === h) return m[2] = j[2];
                                if (k[f] = m, m[2] = a(b, c, i)) return !0
                            }
            }
        }

        function p(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--;)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function q(a, c, d) {
            for (var e = 0, f = c.length; e < f; e++) b(a, c[e], d);
            return d
        }

        function r(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
            return g
        }

        function s(a, b, c, e, f, g) {
            return e && !e[O] && (e = s(e)), f && !f[O] && (f = s(f, g)), d(function(d, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    p = d || q(b || "*", h.nodeType ? [h] : h, []),
                    s = !a || !d && b ? p : r(p, m, a, h, i),
                    t = c ? f || (d ? a : o || e) ? [] : g : s;
                if (c && c(s, t, h, i), e)
                    for (j = r(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i)
                        }
                        for (k = t.length; k--;)(l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                    }
                } else t = r(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
            })
        }

        function t(a) {
            for (var b, c, d, e = a.length, f = x.relative[a[0].type], g = f || x.relative[" "], h = f ? 1 : 0, i = o(function(a) {
                    return a === b
                }, g, !0), j = o(function(a) {
                    return aa(b, a) > -1
                }, g, !0), k = [function(a, c, d) {
                    var e = !f && (d || c !== D) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                    return b = null, e
                }]; h < e; h++)
                if (c = x.relative[a[h].type]) k = [o(p(k), c)];
                else {
                    if (c = x.filter[a[h].type].apply(null, a[h].matches), c[O]) {
                        for (d = ++h; d < e && !x.relative[a[d].type]; d++);
                        return s(h > 1 && p(k), h > 1 && n(a.slice(0, h - 1).concat({
                            value: " " === a[h - 2].type ? "*" : ""
                        })).replace(ha, "$1"), c, h < d && t(a.slice(h, d)), d < e && t(a = a.slice(d)), d < e && n(a))
                    }
                    k.push(c)
                }
            return p(k)
        }

        function u(a, c) {
            var e = c.length > 0,
                f = a.length > 0,
                g = function(d, g, h, i, j) {
                    var k, l, m, n = 0,
                        o = "0",
                        p = d && [],
                        q = [],
                        s = D,
                        t = d || f && x.find.TAG("*", j),
                        u = Q += null == s ? 1 : Math.random() || .1,
                        v = t.length;
                    for (j && (D = g === H || g || j); o !== v && null != (k = t[o]); o++) {
                        if (f && k) {
                            for (l = 0, g || k.ownerDocument === H || (G(k), h = !J); m = a[l++];)
                                if (m(k, g || H, h)) {
                                    i.push(k);
                                    break
                                }
                            j && (Q = u)
                        }
                        e && ((k = !m && k) && n--, d && p.push(k))
                    }
                    if (n += o, e && o !== n) {
                        for (l = 0; m = c[l++];) m(p, q, g, h);
                        if (d) {
                            if (n > 0)
                                for (; o--;) p[o] || q[o] || (q[o] = Y.call(i));
                            q = r(q)
                        }
                        $.apply(i, q), j && !d && q.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                    }
                    return j && (Q = u, D = s), p
                };
            return e ? d(g) : g
        }
        var v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = "sizzle" + 1 * new Date,
            P = a.document,
            Q = 0,
            R = 0,
            S = c(),
            T = c(),
            U = c(),
            V = function(a, b) {
                return a === b && (F = !0), 0
            },
            W = {}.hasOwnProperty,
            X = [],
            Y = X.pop,
            Z = X.push,
            $ = X.push,
            _ = X.slice,
            aa = function(a, b) {
                for (var c = 0, d = a.length; c < d; c++)
                    if (a[c] === b) return c;
                return -1
            },
            ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ca = "[\\x20\\t\\r\\n\\f]",
            da = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            ea = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + da + "))|)" + ca + "*\\]",
            fa = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ea + ")*)|.*)\\)|)",
            ga = new RegExp(ca + "+", "g"),
            ha = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
            ia = new RegExp("^" + ca + "*," + ca + "*"),
            ja = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
            ka = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
            la = new RegExp(fa),
            ma = new RegExp("^" + da + "$"),
            na = {
                ID: new RegExp("^#(" + da + ")"),
                CLASS: new RegExp("^\\.(" + da + ")"),
                TAG: new RegExp("^(" + da + "|[*])"),
                ATTR: new RegExp("^" + ea),
                PSEUDO: new RegExp("^" + fa),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + ba + ")$", "i"),
                needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
            },
            oa = /^(?:input|select|textarea|button)$/i,
            pa = /^h\d$/i,
            qa = /^[^{]+\{\s*\[native \w/,
            ra = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            sa = /[+~]/,
            ta = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
            ua = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            },
            va = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
            wa = function(a, b) {
                return b ? "\0" === a ? "" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a
            },
            xa = function() {
                G()
            },
            ya = o(function(a) {
                return a.disabled === !0
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            $.apply(X = _.call(P.childNodes), P.childNodes), X[P.childNodes.length].nodeType
        } catch (za) {
            $ = {
                apply: X.length ? function(a, b) {
                    Z.apply(a, _.call(b))
                } : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++];);
                    a.length = c - 1
                }
            }
        }
        w = b.support = {}, z = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return !!b && "HTML" !== b.nodeName
        }, G = b.setDocument = function(a) {
            var b, c, d = a ? a.ownerDocument || a : P;
            return d !== H && 9 === d.nodeType && d.documentElement ? (H = d, I = H.documentElement, J = !z(H), P !== H && (c = H.defaultView) && c.top !== c && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), w.attributes = e(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), w.getElementsByTagName = e(function(a) {
                return a.appendChild(H.createComment("")), !a.getElementsByTagName("*").length
            }), w.getElementsByClassName = qa.test(H.getElementsByClassName), w.getById = e(function(a) {
                return I.appendChild(a).id = O, !H.getElementsByName || !H.getElementsByName(O).length
            }), w.getById ? (x.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && J) {
                    var c = b.getElementById(a);
                    return c ? [c] : []
                }
            }, x.filter.ID = function(a) {
                var b = a.replace(ta, ua);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete x.find.ID, x.filter.ID = function(a) {
                var b = a.replace(ta, ua);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), x.find.TAG = w.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : w.qsa ? b.querySelectorAll(a) : void 0
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, x.find.CLASS = w.getElementsByClassName && function(a, b) {
                if ("undefined" != typeof b.getElementsByClassName && J) return b.getElementsByClassName(a)
            }, L = [], K = [], (w.qsa = qa.test(H.querySelectorAll)) && (e(function(a) {
                I.appendChild(a).innerHTML = "<a id='" + O + "'></a><select id='" + O + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && K.push("[*^$]=" + ca + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || K.push("\\[" + ca + "*(?:value|" + ba + ")"), a.querySelectorAll("[id~=" + O + "-]").length || K.push("~="), a.querySelectorAll(":checked").length || K.push(":checked"), a.querySelectorAll("a#" + O + "+*").length || K.push(".#.+[+~]")
            }), e(function(a) {
                a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var b = H.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && K.push("name" + ca + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && K.push(":enabled", ":disabled"), I.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && K.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), K.push(",.*:")
            })), (w.matchesSelector = qa.test(M = I.matches || I.webkitMatchesSelector || I.mozMatchesSelector || I.oMatchesSelector || I.msMatchesSelector)) && e(function(a) {
                w.disconnectedMatch = M.call(a, "*"), M.call(a, "[s!='']:x"), L.push("!=", fa)
            }), K = K.length && new RegExp(K.join("|")), L = L.length && new RegExp(L.join("|")), b = qa.test(I.compareDocumentPosition), N = b || qa.test(I.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    for (; b = b.parentNode;)
                        if (b === a) return !0;
                return !1
            }, V = b ? function(a, b) {
                if (a === b) return F = !0, 0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !w.sortDetached && b.compareDocumentPosition(a) === c ? a === H || a.ownerDocument === P && N(P, a) ? -1 : b === H || b.ownerDocument === P && N(P, b) ? 1 : E ? aa(E, a) - aa(E, b) : 0 : 4 & c ? -1 : 1)
            } : function(a, b) {
                if (a === b) return F = !0, 0;
                var c, d = 0,
                    e = a.parentNode,
                    f = b.parentNode,
                    h = [a],
                    i = [b];
                if (!e || !f) return a === H ? -1 : b === H ? 1 : e ? -1 : f ? 1 : E ? aa(E, a) - aa(E, b) : 0;
                if (e === f) return g(a, b);
                for (c = a; c = c.parentNode;) h.unshift(c);
                for (c = b; c = c.parentNode;) i.unshift(c);
                for (; h[d] === i[d];) d++;
                return d ? g(h[d], i[d]) : h[d] === P ? -1 : i[d] === P ? 1 : 0
            }, H) : H
        }, b.matches = function(a, c) {
            return b(a, null, null, c)
        }, b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== H && G(a), c = c.replace(ka, "='$1']"), w.matchesSelector && J && !U[c + " "] && (!L || !L.test(c)) && (!K || !K.test(c))) try {
                var d = M.call(a, c);
                if (d || w.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {}
            return b(c, H, null, [a]).length > 0
        }, b.contains = function(a, b) {
            return (a.ownerDocument || a) !== H && G(a), N(a, b)
        }, b.attr = function(a, b) {
            (a.ownerDocument || a) !== H && G(a);
            var c = x.attrHandle[b.toLowerCase()],
                d = c && W.call(x.attrHandle, b.toLowerCase()) ? c(a, b, !J) : void 0;
            return void 0 !== d ? d : w.attributes || !J ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }, b.escape = function(a) {
            return (a + "").replace(va, wa)
        }, b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, b.uniqueSort = function(a) {
            var b, c = [],
                d = 0,
                e = 0;
            if (F = !w.detectDuplicates, E = !w.sortStable && a.slice(0), a.sort(V), F) {
                for (; b = a[e++];) b === a[e] && (d = c.push(e));
                for (; d--;) a.splice(c[d], 1)
            }
            return E = null, a
        }, y = b.getText = function(a) {
            var b, c = "",
                d = 0,
                e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += y(a)
                } else if (3 === e || 4 === e) return a.nodeValue
            } else
                for (; b = a[d++];) c += y(b);
            return c
        }, x = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: na,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ta, ua), a[3] = (a[3] || a[4] || a[5] || "").replace(ta, ua), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return na.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && la.test(c) && (b = A(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(ta, ua).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = S[a + " "];
                    return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && S(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ga, " ") + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h,
                            t = !1;
                        if (q) {
                            if (f) {
                                for (; p;) {
                                    for (m = b; m = m[p];)
                                        if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                for (m = q, l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === Q && j[1], t = n && j[2], m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop();)
                                    if (1 === m.nodeType && ++t && m === b) {
                                        k[a] = [Q, n, t];
                                        break
                                    }
                            } else if (s && (m = b, l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === Q && j[1], t = n), t === !1)
                                for (;
                                    (m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && (l = m[O] || (m[O] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [Q, t]), m !== b)););
                            return t -= e, t === d || t % d === 0 && t / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, c) {
                    var e, f = x.pseudos[a] || x.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[O] ? f(c) : f.length > 1 ? (e = [a, a, "", c], x.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--;) d = aa(a, e[g]), a[d] = !(b[d] = e[g])
                    }) : function(a) {
                        return f(a, 0, e)
                    }) : f
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = [],
                        c = [],
                        e = B(a.replace(ha, "$1"));
                    return e[O] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, d, f) {
                        return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
                    }
                }),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0
                    }
                }),
                contains: d(function(a) {
                    return a = a.replace(ta, ua),
                        function(b) {
                            return (b.textContent || b.innerText || y(b)).indexOf(a) > -1
                        }
                }),
                lang: d(function(a) {
                    return ma.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(ta, ua).toLowerCase(),
                        function(b) {
                            var c;
                            do
                                if (c = J ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === I
                },
                focus: function(a) {
                    return a === H.activeElement && (!H.hasFocus || H.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: j(!1),
                disabled: j(!0),
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !x.pseudos.empty(a)
                },
                header: function(a) {
                    return pa.test(a.nodeName)
                },
                input: function(a) {
                    return oa.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: k(function() {
                    return [0]
                }),
                last: k(function(a, b) {
                    return [b - 1]
                }),
                eq: k(function(a, b, c) {
                    return [c < 0 ? c + b : c]
                }),
                even: k(function(a, b) {
                    for (var c = 0; c < b; c += 2) a.push(c);
                    return a
                }),
                odd: k(function(a, b) {
                    for (var c = 1; c < b; c += 2) a.push(c);
                    return a
                }),
                lt: k(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: k(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, x.pseudos.nth = x.pseudos.eq;
        for (v in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) x.pseudos[v] = h(v);
        for (v in {
                submit: !0,
                reset: !0
            }) x.pseudos[v] = i(v);
        return m.prototype = x.filters = x.pseudos, x.setFilters = new m, A = b.tokenize = function(a, c) {
            var d, e, f, g, h, i, j, k = T[a + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = a, i = [], j = x.preFilter; h;) {
                d && !(e = ia.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ja.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ha, " ")
                }), h = h.slice(d.length));
                for (g in x.filter) !(e = na[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break
            }
            return c ? h.length : h ? b.error(a) : T(a, i).slice(0)
        }, B = b.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = U[a + " "];
            if (!f) {
                for (b || (b = A(a)), c = b.length; c--;) f = t(b[c]), f[O] ? d.push(f) : e.push(f);
                f = U(a, u(e, d)), f.selector = a
            }
            return f
        }, C = b.select = function(a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a,
                k = !d && A(a = j.selector || a);
            if (c = c || [], 1 === k.length) {
                if (f = k[0] = k[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && w.getById && 9 === b.nodeType && J && x.relative[f[1].type]) {
                    if (b = (x.find.ID(g.matches[0].replace(ta, ua), b) || [])[0], !b) return c;
                    j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                }
                for (e = na.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !x.relative[h = g.type]);)
                    if ((i = x.find[h]) && (d = i(g.matches[0].replace(ta, ua), sa.test(f[0].type) && l(b.parentNode) || b))) {
                        if (f.splice(e, 1), a = d.length && n(f), !a) return $.apply(c, d), c;
                        break
                    }
            }
            return (j || B(a, k))(d, b, !J, c, !b || sa.test(a) && l(b.parentNode) || b), c
        }, w.sortStable = O.split("").sort(V).join("") === O, w.detectDuplicates = !!F, G(), w.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(H.createElement("fieldset"))
        }), e(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || f("type|href|height|width", function(a, b, c) {
            if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), w.attributes && e(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || f("value", function(a, b, c) {
            if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
        }), e(function(a) {
            return null == a.getAttribute("disabled")
        }) || f(ba, function(a, b, c) {
            var d;
            if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), b
    }(a);
    ma.find = ra, ma.expr = ra.selectors, ma.expr[":"] = ma.expr.pseudos, ma.uniqueSort = ma.unique = ra.uniqueSort, ma.text = ra.getText, ma.isXMLDoc = ra.isXML, ma.contains = ra.contains, ma.escapeSelector = ra.escape;
    var sa = function(a, b, c) {
            for (var d = [], e = void 0 !== c;
                (a = a[b]) && 9 !== a.nodeType;)
                if (1 === a.nodeType) {
                    if (e && ma(a).is(c)) break;
                    d.push(a)
                }
            return d
        },
        ta = function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        },
        ua = ma.expr.match.needsContext,
        va = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
        wa = /^.[^:#\[\.,]*$/;
    ma.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? ma.find.matchesSelector(d, a) ? [d] : [] : ma.find.matches(a, ma.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }, ma.fn.extend({
        find: function(a) {
            var b, c, d = this.length,
                e = this;
            if ("string" != typeof a) return this.pushStack(ma(a).filter(function() {
                for (b = 0; b < d; b++)
                    if (ma.contains(e[b], this)) return !0
            }));
            for (c = this.pushStack([]), b = 0; b < d; b++) ma.find(a, e[b], c);
            return d > 1 ? ma.uniqueSort(c) : c
        },
        filter: function(a) {
            return this.pushStack(e(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(e(this, a || [], !0))
        },
        is: function(a) {
            return !!e(this, "string" == typeof a && ua.test(a) ? ma(a) : a || [], !1).length
        }
    });
    var xa, ya = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
        za = ma.fn.init = function(a, b, c) {
            var d, e;
            if (!a) return this;
            if (c = c || xa, "string" == typeof a) {
                if (d = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ya.exec(a), !d || !d[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                if (d[1]) {
                    if (b = b instanceof ma ? b[0] : b, ma.merge(this, ma.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : _, !0)), va.test(d[1]) && ma.isPlainObject(b))
                        for (d in b) ma.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
                    return this
                }
                return e = _.getElementById(d[2]), e && (this[0] = e, this.length = 1), this
            }
            return a.nodeType ? (this[0] = a, this.length = 1, this) : ma.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(ma) : ma.makeArray(a, this)
        };
    za.prototype = ma.fn, xa = ma(_);
    var Aa = /^(?:parents|prev(?:Until|All))/,
        Ba = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    ma.fn.extend({
        has: function(a) {
            var b = ma(a, this),
                c = b.length;
            return this.filter(function() {
                for (var a = 0; a < c; a++)
                    if (ma.contains(this, b[a])) return !0
            })
        },
        closest: function(a, b) {
            var c, d = 0,
                e = this.length,
                f = [],
                g = "string" != typeof a && ma(a);
            if (!ua.test(a))
                for (; d < e; d++)
                    for (c = this[d]; c && c !== b; c = c.parentNode)
                        if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && ma.find.matchesSelector(c, a))) {
                            f.push(c);
                            break
                        }
            return this.pushStack(f.length > 1 ? ma.uniqueSort(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? ea.call(ma(a), this[0]) : ea.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(ma.uniqueSort(ma.merge(this.get(), ma(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }), ma.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return sa(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return sa(a, "parentNode", c)
        },
        next: function(a) {
            return f(a, "nextSibling")
        },
        prev: function(a) {
            return f(a, "previousSibling")
        },
        nextAll: function(a) {
            return sa(a, "nextSibling")
        },
        prevAll: function(a) {
            return sa(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return sa(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return sa(a, "previousSibling", c)
        },
        siblings: function(a) {
            return ta((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return ta(a.firstChild)
        },
        contents: function(a) {
            return a.contentDocument || ma.merge([], a.childNodes)
        }
    }, function(a, b) {
        ma.fn[a] = function(c, d) {
            var e = ma.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = ma.filter(d, e)), this.length > 1 && (Ba[a] || ma.uniqueSort(e), Aa.test(a) && e.reverse()), this.pushStack(e)
        }
    });
    var Ca = /\S+/g;
    ma.Callbacks = function(a) {
        a = "string" == typeof a ? g(a) : ma.extend({}, a);
        var b, c, d, e, f = [],
            h = [],
            i = -1,
            j = function() {
                for (e = a.once, d = b = !0; h.length; i = -1)
                    for (c = h.shift(); ++i < f.length;) f[i].apply(c[0], c[1]) === !1 && a.stopOnFalse && (i = f.length, c = !1);
                a.memory || (c = !1), b = !1, e && (f = c ? [] : "")
            },
            k = {
                add: function() {
                    return f && (c && !b && (i = f.length - 1, h.push(c)), function d(b) {
                        ma.each(b, function(b, c) {
                            ma.isFunction(c) ? a.unique && k.has(c) || f.push(c) : c && c.length && "string" !== ma.type(c) && d(c)
                        })
                    }(arguments), c && !b && j()), this
                },
                remove: function() {
                    return ma.each(arguments, function(a, b) {
                        for (var c;
                            (c = ma.inArray(b, f, c)) > -1;) f.splice(c, 1), c <= i && i--
                    }), this
                },
                has: function(a) {
                    return a ? ma.inArray(a, f) > -1 : f.length > 0
                },
                empty: function() {
                    return f && (f = []), this
                },
                disable: function() {
                    return e = h = [], f = c = "", this
                },
                disabled: function() {
                    return !f
                },
                lock: function() {
                    return e = h = [], c || b || (f = c = ""), this
                },
                locked: function() {
                    return !!e
                },
                fireWith: function(a, c) {
                    return e || (c = c || [], c = [a, c.slice ? c.slice() : c], h.push(c), b || j()), this
                },
                fire: function() {
                    return k.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!d
                }
            };
        return k
    }, ma.extend({
        Deferred: function(b) {
            var c = [
                    ["notify", "progress", ma.Callbacks("memory"), ma.Callbacks("memory"), 2],
                    ["resolve", "done", ma.Callbacks("once memory"), ma.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", ma.Callbacks("once memory"), ma.Callbacks("once memory"), 1, "rejected"]
                ],
                d = "pending",
                e = {
                    state: function() {
                        return d
                    },
                    always: function() {
                        return f.done(arguments).fail(arguments), this
                    },
                    "catch": function(a) {
                        return e.then(null, a)
                    },
                    pipe: function() {
                        var a = arguments;
                        return ma.Deferred(function(b) {
                            ma.each(c, function(c, d) {
                                var e = ma.isFunction(a[d[4]]) && a[d[4]];
                                f[d[1]](function() {
                                    var a = e && e.apply(this, arguments);
                                    a && ma.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    then: function(b, d, e) {
                        function f(b, c, d, e) {
                            return function() {
                                var j = this,
                                    k = arguments,
                                    l = function() {
                                        var a, l;
                                        if (!(b < g)) {
                                            if (a = d.apply(j, k), a === c.promise()) throw new TypeError("Thenable self-resolution");
                                            l = a && ("object" == typeof a || "function" == typeof a) && a.then, ma.isFunction(l) ? e ? l.call(a, f(g, c, h, e), f(g, c, i, e)) : (g++, l.call(a, f(g, c, h, e), f(g, c, i, e), f(g, c, h, c.notifyWith))) : (d !== h && (j = void 0, k = [a]), (e || c.resolveWith)(j, k))
                                        }
                                    },
                                    m = e ? l : function() {
                                        try {
                                            l()
                                        } catch (a) {
                                            ma.Deferred.exceptionHook && ma.Deferred.exceptionHook(a, m.stackTrace), b + 1 >= g && (d !== i && (j = void 0, k = [a]), c.rejectWith(j, k))
                                        }
                                    };
                                b ? m() : (ma.Deferred.getStackHook && (m.stackTrace = ma.Deferred.getStackHook()), a.setTimeout(m))
                            }
                        }
                        var g = 0;
                        return ma.Deferred(function(a) {
                            c[0][3].add(f(0, a, ma.isFunction(e) ? e : h, a.notifyWith)), c[1][3].add(f(0, a, ma.isFunction(b) ? b : h)), c[2][3].add(f(0, a, ma.isFunction(d) ? d : i))
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? ma.extend(a, e) : e
                    }
                },
                f = {};
            return ma.each(c, function(a, b) {
                var g = b[2],
                    h = b[5];
                e[b[1]] = g.add, h && g.add(function() {
                    d = h
                }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function() {
                    return f[b[0] + "With"](this === f ? void 0 : this, arguments), this
                }, f[b[0] + "With"] = g.fireWith
            }), e.promise(f), b && b.call(f, f), f
        },
        when: function(a) {
            var b = arguments.length,
                c = b,
                d = Array(c),
                e = ba.call(arguments),
                f = ma.Deferred(),
                g = function(a) {
                    return function(c) {
                        d[a] = this, e[a] = arguments.length > 1 ? ba.call(arguments) : c, --b || f.resolveWith(d, e)
                    }
                };
            if (b <= 1 && (j(a, f.done(g(c)).resolve, f.reject), "pending" === f.state() || ma.isFunction(e[c] && e[c].then))) return f.then();
            for (; c--;) j(e[c], g(c), f.reject);
            return f.promise()
        }
    });
    var Da = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    ma.Deferred.exceptionHook = function(b, c) {
        a.console && a.console.warn && b && Da.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c)
    }, ma.readyException = function(b) {
        a.setTimeout(function() {
            throw b
        })
    };
    var Ea = ma.Deferred();
    ma.fn.ready = function(a) {
        return Ea.then(a)["catch"](function(a) {
            ma.readyException(a)
        }), this
    }, ma.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? ma.readyWait++ : ma.ready(!0)
        },
        ready: function(a) {
            (a === !0 ? --ma.readyWait : ma.isReady) || (ma.isReady = !0, a !== !0 && --ma.readyWait > 0 || Ea.resolveWith(_, [ma]))
        }
    }), ma.ready.then = Ea.then, "complete" === _.readyState || "loading" !== _.readyState && !_.documentElement.doScroll ? a.setTimeout(ma.ready) : (_.addEventListener("DOMContentLoaded", k), a.addEventListener("load", k));
    var Fa = function(a, b, c, d, e, f, g) {
            var h = 0,
                i = a.length,
                j = null == c;
            if ("object" === ma.type(c)) {
                e = !0;
                for (h in c) Fa(a, b, h, c[h], !0, f, g)
            } else if (void 0 !== d && (e = !0, ma.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                    return j.call(ma(a), c)
                })), b))
                for (; h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
        },
        Ga = function(a) {
            return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
        };
    l.uid = 1, l.prototype = {
        cache: function(a) {
            var b = a[this.expando];
            return b || (b = {}, Ga(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, {
                value: b,
                configurable: !0
            }))), b
        },
        set: function(a, b, c) {
            var d, e = this.cache(a);
            if ("string" == typeof b) e[ma.camelCase(b)] = c;
            else
                for (d in b) e[ma.camelCase(d)] = b[d];
            return e
        },
        get: function(a, b) {
            return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][ma.camelCase(b)]
        },
        access: function(a, b, c) {
            return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b)
        },
        remove: function(a, b) {
            var c, d = a[this.expando];
            if (void 0 !== d) {
                if (void 0 !== b) {
                    ma.isArray(b) ? b = b.map(ma.camelCase) : (b = ma.camelCase(b), b = b in d ? [b] : b.match(Ca) || []), c = b.length;
                    for (; c--;) delete d[b[c]]
                }(void 0 === b || ma.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando])
            }
        },
        hasData: function(a) {
            var b = a[this.expando];
            return void 0 !== b && !ma.isEmptyObject(b)
        }
    };
    var Ha = new l,
        Ia = new l,
        Ja = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Ka = /[A-Z]/g;
    ma.extend({
        hasData: function(a) {
            return Ia.hasData(a) || Ha.hasData(a)
        },
        data: function(a, b, c) {
            return Ia.access(a, b, c)
        },
        removeData: function(a, b) {
            Ia.remove(a, b)
        },
        _data: function(a, b, c) {
            return Ha.access(a, b, c)
        },
        _removeData: function(a, b) {
            Ha.remove(a, b)
        }
    }), ma.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0],
                g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = Ia.get(f), 1 === f.nodeType && !Ha.get(f, "hasDataAttrs"))) {
                    for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = ma.camelCase(d.slice(5)), m(f, d, e[d])));
                    Ha.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                Ia.set(this, a)
            }) : Fa(this, function(b) {
                var c;
                if (f && void 0 === b) {
                    if (c = Ia.get(f, a), void 0 !== c) return c;
                    if (c = m(f, a), void 0 !== c) return c
                } else this.each(function() {
                    Ia.set(this, a, b)
                })
            }, null, b, arguments.length > 1, null, !0)
        },
        removeData: function(a) {
            return this.each(function() {
                Ia.remove(this, a)
            })
        }
    }), ma.extend({
        queue: function(a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = Ha.get(a, b), c && (!d || ma.isArray(c) ? d = Ha.access(a, b, ma.makeArray(c)) : d.push(c)), d || []
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = ma.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = ma._queueHooks(a, b),
                g = function() {
                    ma.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return Ha.get(a, c) || Ha.access(a, c, {
                empty: ma.Callbacks("once memory").add(function() {
                    Ha.remove(a, [b + "queue", c])
                })
            })
        }
    }), ma.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? ma.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = ma.queue(this, a, b);
                ma._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && ma.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                ma.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1,
                e = ma.Deferred(),
                f = this,
                g = this.length,
                h = function() {
                    --d || e.resolveWith(f, [f])
                };
            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = Ha.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var La = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Ma = new RegExp("^(?:([+-])=|)(" + La + ")([a-z%]*)$", "i"),
        Na = ["Top", "Right", "Bottom", "Left"],
        Oa = function(a, b) {
            return a = b || a, "none" === a.style.display || "" === a.style.display && ma.contains(a.ownerDocument, a) && "none" === ma.css(a, "display")
        },
        Pa = function(a, b, c, d) {
            var e, f, g = {};
            for (f in b) g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e
        },
        Qa = {};
    ma.fn.extend({
        show: function() {
            return p(this, !0)
        },
        hide: function() {
            return p(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                Oa(this) ? ma(this).show() : ma(this).hide()
            })
        }
    });
    var Ra = /^(?:checkbox|radio)$/i,
        Sa = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        Ta = /^$|\/(?:java|ecma)script/i,
        Ua = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Ua.optgroup = Ua.option, Ua.tbody = Ua.tfoot = Ua.colgroup = Ua.caption = Ua.thead, Ua.th = Ua.td;
    var Va = /<|&#?\w+;/;
    ! function() {
        var a = _.createDocumentFragment(),
            b = a.appendChild(_.createElement("div")),
            c = _.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), ka.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", ka.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    }();
    var Wa = _.documentElement,
        Xa = /^key/,
        Ya = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Za = /^([^.]*)(?:\.(.+)|)/;
    ma.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = Ha.get(a);
            if (q)
                for (c.handler && (f = c, c = f.handler, e = f.selector), e && ma.find.matchesSelector(Wa, e), c.guid || (c.guid = ma.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                        return "undefined" != typeof ma && ma.event.triggered !== b.type ? ma.event.dispatch.apply(a, arguments) : void 0
                    }), b = (b || "").match(Ca) || [""], j = b.length; j--;) h = Za.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = ma.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = ma.event.special[n] || {}, k = ma.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && ma.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), ma.event.global[n] = !0)
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = Ha.hasData(a) && Ha.get(a);
            if (q && (i = q.events)) {
                for (b = (b || "").match(Ca) || [""], j = b.length; j--;)
                    if (h = Za.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                        for (l = ma.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                        g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || ma.removeEvent(a, n, q.handle), delete i[n])
                    } else
                        for (n in i) ma.event.remove(a, n + b[j], c, d, !0);
                ma.isEmptyObject(i) && Ha.remove(a, "handle events")
            }
        },
        dispatch: function(a) {
            var b, c, d, e, f, g, h = ma.event.fix(a),
                i = new Array(arguments.length),
                j = (Ha.get(this, "events") || {})[h.type] || [],
                k = ma.event.special[h.type] || {};
            for (i[0] = h, b = 1; b < arguments.length; b++) i[b] = arguments[b];
            if (h.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, h) !== !1) {
                for (g = ma.event.handlers.call(this, h, j), b = 0;
                    (e = g[b++]) && !h.isPropagationStopped();)
                    for (h.currentTarget = e.elem, c = 0;
                        (f = e.handlers[c++]) && !h.isImmediatePropagationStopped();) h.rnamespace && !h.rnamespace.test(f.namespace) || (h.handleObj = f, h.data = f.data, d = ((ma.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, i), void 0 !== d && (h.result = d) === !1 && (h.preventDefault(), h.stopPropagation()));
                return k.postDispatch && k.postDispatch.call(this, h), h.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1))
                for (; i !== this; i = i.parentNode || this)
                    if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                        for (d = [], c = 0; c < h; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? ma(e, this).index(i) > -1 : ma.find(e, this, null, [i]).length), d[e] && d.push(f);
                        d.length && g.push({
                            elem: i,
                            handlers: d
                        })
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g
        },
        addProp: function(a, b) {
            Object.defineProperty(ma.Event.prototype, a, {
                enumerable: !0,
                configurable: !0,
                get: ma.isFunction(b) ? function() {
                    if (this.originalEvent) return b(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[a]
                },
                set: function(b) {
                    Object.defineProperty(this, a, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: b
                    })
                }
            })
        },
        fix: function(a) {
            return a[ma.expando] ? a : new ma.Event(a)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== v() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === v() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && ma.nodeName(this, "input")) return this.click(), !1
                },
                _default: function(a) {
                    return ma.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        }
    }, ma.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c)
    }, ma.Event = function(a, b) {
        return this instanceof ma.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? t : u, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && ma.extend(this, b), this.timeStamp = a && a.timeStamp || ma.now(), void(this[ma.expando] = !0)) : new ma.Event(a, b)
    }, ma.Event.prototype = {
        constructor: ma.Event,
        isDefaultPrevented: u,
        isPropagationStopped: u,
        isImmediatePropagationStopped: u,
        isSimulated: !1,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = t, a && !this.isSimulated && a.preventDefault()
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = t, a && !this.isSimulated && a.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = t, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, ma.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(a) {
            var b = a.button;
            return null == a.which && Xa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && Ya.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which
        }
    }, ma.event.addProp), ma.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        ma.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return e && (e === d || ma.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), ma.fn.extend({
        on: function(a, b, c, d) {
            return w(this, a, b, c, d)
        },
        one: function(a, b, c, d) {
            return w(this, a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, ma(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = u), this.each(function() {
                ma.event.remove(this, a, c, b)
            })
        }
    });
    var $a = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        _a = /<script|<style|<link/i,
        ab = /checked\s*(?:[^=]|=\s*.checked.)/i,
        bb = /^true\/(.*)/,
        cb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    ma.extend({
        htmlPrefilter: function(a) {
            return a.replace($a, "<$1></$2>")
        },
        clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0),
                i = ma.contains(a.ownerDocument, a);
            if (!(ka.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || ma.isXMLDoc(a)))
                for (g = q(h), f = q(a), d = 0, e = f.length; d < e; d++) B(f[d], g[d]);
            if (b)
                if (c)
                    for (f = f || q(a), g = g || q(h), d = 0, e = f.length; d < e; d++) A(f[d], g[d]);
                else A(a, h);
            return g = q(h, "script"), g.length > 0 && r(g, !i && q(a, "script")), h
        },
        cleanData: function(a) {
            for (var b, c, d, e = ma.event.special, f = 0; void 0 !== (c = a[f]); f++)
                if (Ga(c)) {
                    if (b = c[Ha.expando]) {
                        if (b.events)
                            for (d in b.events) e[d] ? ma.event.remove(c, d) : ma.removeEvent(c, d, b.handle);
                        c[Ha.expando] = void 0
                    }
                    c[Ia.expando] && (c[Ia.expando] = void 0)
                }
        }
    }), ma.fn.extend({
        detach: function(a) {
            return D(this, a, !0)
        },
        remove: function(a) {
            return D(this, a)
        },
        text: function(a) {
            return Fa(this, function(a) {
                return void 0 === a ? ma.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                })
            }, null, a, arguments.length)
        },
        append: function() {
            return C(this, arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = x(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return C(this, arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = x(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return C(this, arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return C(this, arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (ma.cleanData(q(a, !1)), a.textContent = "");
            return this
        },
        clone: function(a, b) {
            return a = null != a && a, b = null == b ? a : b, this.map(function() {
                return ma.clone(this, a, b)
            })
        },
        html: function(a) {
            return Fa(this, function(a) {
                var b = this[0] || {},
                    c = 0,
                    d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !_a.test(a) && !Ua[(Sa.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = ma.htmlPrefilter(a);
                    try {
                        for (; c < d; c++) b = this[c] || {}, 1 === b.nodeType && (ma.cleanData(q(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = [];
            return C(this, arguments, function(b) {
                var c = this.parentNode;
                ma.inArray(this, a) < 0 && (ma.cleanData(q(this)), c && c.replaceChild(b, this))
            }, a)
        }
    }), ma.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        ma.fn[a] = function(a) {
            for (var c, d = [], e = ma(a), f = e.length - 1, g = 0; g <= f; g++) c = g === f ? this : this.clone(!0), ma(e[g])[b](c), da.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var db = /^margin/,
        eb = new RegExp("^(" + La + ")(?!px)[a-z%]+$", "i"),
        fb = function(b) {
            var c = b.ownerDocument.defaultView;
            return c && c.opener || (c = a), c.getComputedStyle(b)
        };
    ! function() {
        function b() {
            if (h) {
                h.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", h.innerHTML = "", Wa.appendChild(g);
                var b = a.getComputedStyle(h);
                c = "1%" !== b.top, f = "2px" === b.marginLeft, d = "4px" === b.width, h.style.marginRight = "50%", e = "4px" === b.marginRight, Wa.removeChild(g), h = null
            }
        }
        var c, d, e, f, g = _.createElement("div"),
            h = _.createElement("div");
        h.style && (h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", ka.clearCloneStyle = "content-box" === h.style.backgroundClip, g.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", g.appendChild(h), ma.extend(ka, {
            pixelPosition: function() {
                return b(), c
            },
            boxSizingReliable: function() {
                return b(), d
            },
            pixelMarginRight: function() {
                return b(), e
            },
            reliableMarginLeft: function() {
                return b(), f
            }
        }))
    }();
    var gb = /^(none|table(?!-c[ea]).+)/,
        hb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        ib = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        jb = ["Webkit", "Moz", "ms"],
        kb = _.createElement("div").style;
    ma.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = E(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = ma.camelCase(b),
                    i = a.style;
                return b = ma.cssProps[h] || (ma.cssProps[h] = G(h) || h), g = ma.cssHooks[b] || ma.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ma.exec(c)) && e[1] && (c = n(a, b, e), f = "number"), void(null != c && c === c && ("number" === f && (c += e && e[3] || (ma.cssNumber[h] ? "" : "px")), ka.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c))))
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = ma.camelCase(b);
            return b = ma.cssProps[h] || (ma.cssProps[h] = G(h) || h), g = ma.cssHooks[b] || ma.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = E(a, b, d)), "normal" === e && b in ib && (e = ib[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e
        }
    }), ma.each(["height", "width"], function(a, b) {
        ma.cssHooks[b] = {
            get: function(a, c, d) {
                if (c) return !gb.test(ma.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? J(a, b, d) : Pa(a, hb, function() {
                    return J(a, b, d)
                })
            },
            set: function(a, c, d) {
                var e, f = d && fb(a),
                    g = d && I(a, b, d, "border-box" === ma.css(a, "boxSizing", !1, f), f);
                return g && (e = Ma.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = ma.css(a, b)), H(a, c, g)
            }
        }
    }), ma.cssHooks.marginLeft = F(ka.reliableMarginLeft, function(a, b) {
        if (b) return (parseFloat(E(a, "marginLeft")) || a.getBoundingClientRect().left - Pa(a, {
            marginLeft: 0
        }, function() {
            return a.getBoundingClientRect().left
        })) + "px"
    }), ma.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        ma.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) e[a + Na[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, db.test(a) || (ma.cssHooks[a + b].set = H)
    }), ma.fn.extend({
        css: function(a, b) {
            return Fa(this, function(a, b, c) {
                var d, e, f = {},
                    g = 0;
                if (ma.isArray(b)) {
                    for (d = fb(a), e = b.length; g < e; g++) f[b[g]] = ma.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? ma.style(a, b, c) : ma.css(a, b)
            }, a, b, arguments.length > 1)
        }
    }), ma.Tween = K, K.prototype = {
        constructor: K,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || ma.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (ma.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = K.propHooks[this.prop];
            return a && a.get ? a.get(this) : K.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = K.propHooks[this.prop];
            return this.options.duration ? this.pos = b = ma.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : K.propHooks._default.set(this), this
        }
    }, K.prototype.init.prototype = K.prototype, K.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = ma.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
            },
            set: function(a) {
                ma.fx.step[a.prop] ? ma.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[ma.cssProps[a.prop]] && !ma.cssHooks[a.prop] ? a.elem[a.prop] = a.now : ma.style(a.elem, a.prop, a.now + a.unit)
            }
        }
    }, K.propHooks.scrollTop = K.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, ma.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        },
        _default: "swing"
    }, ma.fx = K.prototype.init, ma.fx.step = {};
    var lb, mb, nb = /^(?:toggle|show|hide)$/,
        ob = /queueHooks$/;
    ma.Animation = ma.extend(R, {
            tweeners: {
                "*": [function(a, b) {
                    var c = this.createTween(a, b);
                    return n(c.elem, a, Ma.exec(b), c), c
                }]
            },
            tweener: function(a, b) {
                ma.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(Ca);
                for (var c, d = 0, e = a.length; d < e; d++) c = a[d], R.tweeners[c] = R.tweeners[c] || [], R.tweeners[c].unshift(b)
            },
            prefilters: [P],
            prefilter: function(a, b) {
                b ? R.prefilters.unshift(a) : R.prefilters.push(a)
            }
        }), ma.speed = function(a, b, c) {
            var d = a && "object" == typeof a ? ma.extend({}, a) : {
                complete: c || !c && b || ma.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !ma.isFunction(b) && b
            };
            return ma.fx.off || _.hidden ? d.duration = 0 : d.duration = "number" == typeof d.duration ? d.duration : d.duration in ma.fx.speeds ? ma.fx.speeds[d.duration] : ma.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                ma.isFunction(d.old) && d.old.call(this), d.queue && ma.dequeue(this, d.queue)
            }, d
        }, ma.fn.extend({
            fadeTo: function(a, b, c, d) {
                return this.filter(Oa).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function(a, b, c, d) {
                var e = ma.isEmptyObject(a),
                    f = ma.speed(b, c, d),
                    g = function() {
                        var b = R(this, ma.extend({}, a), f);
                        (e || Ha.get(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function(a, b, c) {
                var d = function(a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                    var b = !0,
                        e = null != a && a + "queueHooks",
                        f = ma.timers,
                        g = Ha.get(this);
                    if (e) g[e] && g[e].stop && d(g[e]);
                    else
                        for (e in g) g[e] && g[e].stop && ob.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    !b && c || ma.dequeue(this, a)
                })
            },
            finish: function(a) {
                return a !== !1 && (a = a || "fx"), this.each(function() {
                    var b, c = Ha.get(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = ma.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, ma.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), ma.each(["toggle", "show", "hide"], function(a, b) {
            var c = ma.fn[b];
            ma.fn[b] = function(a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(N(b, !0), a, d, e)
            }
        }), ma.each({
            slideDown: N("show"),
            slideUp: N("hide"),
            slideToggle: N("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(a, b) {
            ma.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), ma.timers = [], ma.fx.tick = function() {
            var a, b = 0,
                c = ma.timers;
            for (lb = ma.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
            c.length || ma.fx.stop(), lb = void 0
        }, ma.fx.timer = function(a) {
            ma.timers.push(a), a() ? ma.fx.start() : ma.timers.pop()
        }, ma.fx.interval = 13, ma.fx.start = function() {
            mb || (mb = a.requestAnimationFrame ? a.requestAnimationFrame(L) : a.setInterval(ma.fx.tick, ma.fx.interval))
        }, ma.fx.stop = function() {
            a.cancelAnimationFrame ? a.cancelAnimationFrame(mb) : a.clearInterval(mb), mb = null
        }, ma.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ma.fn.delay = function(b, c) {
            return b = ma.fx ? ma.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function(c, d) {
                var e = a.setTimeout(c, b);
                d.stop = function() {
                    a.clearTimeout(e)
                }
            })
        },
        function() {
            var a = _.createElement("input"),
                b = _.createElement("select"),
                c = b.appendChild(_.createElement("option"));
            a.type = "checkbox", ka.checkOn = "" !== a.value, ka.optSelected = c.selected, a = _.createElement("input"), a.value = "t", a.type = "radio", ka.radioValue = "t" === a.value
        }();
    var pb, qb = ma.expr.attrHandle;
    ma.fn.extend({
        attr: function(a, b) {
            return Fa(this, ma.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                ma.removeAttr(this, a)
            })
        }
    }), ma.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? ma.prop(a, b, c) : (1 === f && ma.isXMLDoc(a) || (e = ma.attrHooks[b.toLowerCase()] || (ma.expr.match.bool.test(b) ? pb : void 0)), void 0 !== c ? null === c ? void ma.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = ma.find.attr(a, b), null == d ? void 0 : d))
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!ka.radioValue && "radio" === b && ma.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        },
        removeAttr: function(a, b) {
            var c, d = 0,
                e = b && b.match(Ca);
            if (e && 1 === a.nodeType)
                for (; c = e[d++];) a.removeAttribute(c)
        }
    }), pb = {
        set: function(a, b, c) {
            return b === !1 ? ma.removeAttr(a, c) : a.setAttribute(c, c), c
        }
    }, ma.each(ma.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = qb[b] || ma.find.attr;
        qb[b] = function(a, b, d) {
            var e, f, g = b.toLowerCase();
            return d || (f = qb[g], qb[g] = e, e = null != c(a, b, d) ? g : null, qb[g] = f), e
        }
    });
    var rb = /^(?:input|select|textarea|button)$/i,
        sb = /^(?:a|area)$/i;
    ma.fn.extend({
        prop: function(a, b) {
            return Fa(this, ma.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[ma.propFix[a] || a]
            })
        }
    }), ma.extend({
        prop: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return 1 === f && ma.isXMLDoc(a) || (b = ma.propFix[b] || b, e = ma.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = ma.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : rb.test(a.nodeName) || sb.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), ka.optSelected || (ma.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        },
        set: function(a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
        }
    }), ma.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ma.propFix[this.toLowerCase()] = this
    });
    var tb = /[\t\r\n\f]/g;
    ma.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h, i = 0;
            if (ma.isFunction(a)) return this.each(function(b) {
                ma(this).addClass(a.call(this, b, S(this)))
            });
            if ("string" == typeof a && a)
                for (b = a.match(Ca) || []; c = this[i++];)
                    if (e = S(c), d = 1 === c.nodeType && (" " + e + " ").replace(tb, " ")) {
                        for (g = 0; f = b[g++];) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                        h = ma.trim(d), e !== h && c.setAttribute("class", h)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h, i = 0;
            if (ma.isFunction(a)) return this.each(function(b) {
                ma(this).removeClass(a.call(this, b, S(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof a && a)
                for (b = a.match(Ca) || []; c = this[i++];)
                    if (e = S(c), d = 1 === c.nodeType && (" " + e + " ").replace(tb, " ")) {
                        for (g = 0; f = b[g++];)
                            for (; d.indexOf(" " + f + " ") > -1;) d = d.replace(" " + f + " ", " ");
                        h = ma.trim(d), e !== h && c.setAttribute("class", h)
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : ma.isFunction(a) ? this.each(function(c) {
                ma(this).toggleClass(a.call(this, c, S(this), b), b)
            }) : this.each(function() {
                var b, d, e, f;
                if ("string" === c)
                    for (d = 0, e = ma(this), f = a.match(Ca) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                else void 0 !== a && "boolean" !== c || (b = S(this), b && Ha.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : Ha.get(this, "__className__") || ""))
            })
        },
        hasClass: function(a) {
            var b, c, d = 0;
            for (b = " " + a + " "; c = this[d++];)
                if (1 === c.nodeType && (" " + S(c) + " ").replace(tb, " ").indexOf(b) > -1) return !0;
            return !1
        }
    });
    var ub = /\r/g,
        vb = /[\x20\t\r\n\f]+/g;
    ma.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            return arguments.length ? (d = ma.isFunction(a), this.each(function(c) {
                var e;
                1 === this.nodeType && (e = d ? a.call(this, c, ma(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : ma.isArray(e) && (e = ma.map(e, function(a) {
                    return null == a ? "" : a + ""
                })), b = ma.valHooks[this.type] || ma.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
            })) : e ? (b = ma.valHooks[e.type] || ma.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ub, "") : null == c ? "" : c)) : void 0
        }
    }), ma.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = ma.find.attr(a, "value");
                    return null != b ? b : ma.trim(ma.text(a)).replace(vb, " ")
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type, g = f ? null : [], h = f ? e + 1 : d.length, i = e < 0 ? h : f ? e : 0; i < h; i++)
                        if (c = d[i], (c.selected || i === e) && !c.disabled && (!c.parentNode.disabled || !ma.nodeName(c.parentNode, "optgroup"))) {
                            if (b = ma(c).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = ma.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = ma.inArray(ma.valHooks.option.get(d), f) > -1) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        }
    }), ma.each(["radio", "checkbox"], function() {
        ma.valHooks[this] = {
            set: function(a, b) {
                if (ma.isArray(b)) return a.checked = ma.inArray(ma(a).val(), b) > -1
            }
        }, ka.checkOn || (ma.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var wb = /^(?:focusinfocus|focusoutblur)$/;
    ma.extend(ma.event, {
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [d || _],
                n = ha.call(b, "type") ? b.type : b,
                o = ha.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || _, 3 !== d.nodeType && 8 !== d.nodeType && !wb.test(n + ma.event.triggered) && (n.indexOf(".") > -1 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[ma.expando] ? b : new ma.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : ma.makeArray(c, [b]), l = ma.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                if (!e && !l.noBubble && !ma.isWindow(d)) {
                    for (i = l.delegateType || n, wb.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
                    h === (d.ownerDocument || _) && m.push(h.defaultView || h.parentWindow || a)
                }
                for (f = 0;
                    (g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i : l.bindType || n, k = (Ha.get(g, "events") || {})[b.type] && Ha.get(g, "handle"), k && k.apply(g, c), k = j && g[j], k && k.apply && Ga(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
                return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !Ga(d) || j && ma.isFunction(d[n]) && !ma.isWindow(d) && (h = d[j], h && (d[j] = null), ma.event.triggered = n, d[n](), ma.event.triggered = void 0, h && (d[j] = h)), b.result
            }
        },
        simulate: function(a, b, c) {
            var d = ma.extend(new ma.Event, c, {
                type: a,
                isSimulated: !0
            });
            ma.event.trigger(d, null, b)
        }
    }), ma.fn.extend({
        trigger: function(a, b) {
            return this.each(function() {
                ma.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            if (c) return ma.event.trigger(a, b, c, !0)
        }
    }), ma.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(a, b) {
        ma.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), ma.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), ka.focusin = "onfocusin" in a, ka.focusin || ma.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            ma.event.simulate(b, a.target, ma.event.fix(a))
        };
        ma.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this,
                    e = Ha.access(d, b);
                e || d.addEventListener(a, c, !0), Ha.access(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this,
                    e = Ha.access(d, b) - 1;
                e ? Ha.access(d, b, e) : (d.removeEventListener(a, c, !0), Ha.remove(d, b))
            }
        }
    });
    var xb = a.location,
        yb = ma.now(),
        zb = /\?/;
    ma.parseXML = function(b) {
        var c;
        if (!b || "string" != typeof b) return null;
        try {
            c = (new a.DOMParser).parseFromString(b, "text/xml")
        } catch (d) {
            c = void 0
        }
        return c && !c.getElementsByTagName("parsererror").length || ma.error("Invalid XML: " + b), c
    };
    var Ab = /\[\]$/,
        Bb = /\r?\n/g,
        Cb = /^(?:submit|button|image|reset|file)$/i,
        Db = /^(?:input|select|textarea|keygen)/i;
    ma.param = function(a, b) {
        var c, d = [],
            e = function(a, b) {
                var c = ma.isFunction(b) ? b() : b;
                d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c)
            };
        if (ma.isArray(a) || a.jquery && !ma.isPlainObject(a)) ma.each(a, function() {
            e(this.name, this.value)
        });
        else
            for (c in a) T(c, a[c], b, e);
        return d.join("&")
    }, ma.fn.extend({
        serialize: function() {
            return ma.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = ma.prop(this, "elements");
                return a ? ma.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !ma(this).is(":disabled") && Db.test(this.nodeName) && !Cb.test(a) && (this.checked || !Ra.test(a))
            }).map(function(a, b) {
                var c = ma(this).val();
                return null == c ? null : ma.isArray(c) ? ma.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Bb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(Bb, "\r\n")
                }
            }).get()
        }
    });
    var Eb = /%20/g,
        Fb = /#.*$/,
        Gb = /([?&])_=[^&]*/,
        Hb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Ib = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Jb = /^(?:GET|HEAD)$/,
        Kb = /^\/\//,
        Lb = {},
        Mb = {},
        Nb = "*/".concat("*"),
        Ob = _.createElement("a");
    Ob.href = xb.href, ma.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: xb.href,
            type: "GET",
            isLocal: Ib.test(xb.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Nb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": ma.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? W(W(a, ma.ajaxSettings), b) : W(ma.ajaxSettings, a)
        },
        ajaxPrefilter: U(Lb),
        ajaxTransport: U(Mb),
        ajax: function(b, c) {
            function d(b, c, d, h) {
                var j, m, n, u, v, w = c;
                k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", x.readyState = b > 0 ? 4 : 0, j = b >= 200 && b < 300 || 304 === b, d && (u = X(o, x, d)), u = Y(o, u, x, j), j ? (o.ifModified && (v = x.getResponseHeader("Last-Modified"), v && (ma.lastModified[f] = v), v = x.getResponseHeader("etag"), v && (ma.etag[f] = v)), 204 === b || "HEAD" === o.type ? w = "nocontent" : 304 === b ? w = "notmodified" : (w = u.state, m = u.data, n = u.error, j = !n)) : (n = w, !b && w || (w = "error", b < 0 && (b = 0))), x.status = b, x.statusText = (c || w) + "", j ? r.resolveWith(p, [m, w, x]) : r.rejectWith(p, [x, w, n]), x.statusCode(t), t = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [x, o, j ? m : n]), s.fireWith(p, [x, w]), l && (q.trigger("ajaxComplete", [x, o]), --ma.active || ma.event.trigger("ajaxStop")))
            }
            "object" == typeof b && (c = b, b = void 0), c = c || {};
            var e, f, g, h, i, j, k, l, m, n, o = ma.ajaxSetup({}, c),
                p = o.context || o,
                q = o.context && (p.nodeType || p.jquery) ? ma(p) : ma.event,
                r = ma.Deferred(),
                s = ma.Callbacks("once memory"),
                t = o.statusCode || {},
                u = {},
                v = {},
                w = "canceled",
                x = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (k) {
                            if (!h)
                                for (h = {}; b = Hb.exec(g);) h[b[1].toLowerCase()] = b[2];
                            b = h[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return k ? g : null
                    },
                    setRequestHeader: function(a, b) {
                        return null == k && (a = v[a.toLowerCase()] = v[a.toLowerCase()] || a, u[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return null == k && (o.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a)
                            if (k) x.always(a[x.status]);
                            else
                                for (b in a) t[b] = [t[b], a[b]];
                        return this
                    },
                    abort: function(a) {
                        var b = a || w;
                        return e && e.abort(b), d(0, b), this
                    }
                };
            if (r.promise(x), o.url = ((b || o.url || xb.href) + "").replace(Kb, xb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(Ca) || [""], null == o.crossDomain) {
                j = _.createElement("a");
                try {
                    j.href = o.url, j.href = j.href, o.crossDomain = Ob.protocol + "//" + Ob.host != j.protocol + "//" + j.host
                } catch (y) {
                    o.crossDomain = !0
                }
            }
            if (o.data && o.processData && "string" != typeof o.data && (o.data = ma.param(o.data, o.traditional)), V(Lb, o, c, x), k) return x;
            l = ma.event && o.global, l && 0 === ma.active++ && ma.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Jb.test(o.type), f = o.url.replace(Fb, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Eb, "+")) : (n = o.url.slice(f.length), o.data && (f += (zb.test(f) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (f = f.replace(Gb, ""), n = (zb.test(f) ? "&" : "?") + "_=" + yb++ + n), o.url = f + n), o.ifModified && (ma.lastModified[f] && x.setRequestHeader("If-Modified-Since", ma.lastModified[f]), ma.etag[f] && x.setRequestHeader("If-None-Match", ma.etag[f])), (o.data && o.hasContent && o.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", o.contentType), x.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Nb + "; q=0.01" : "") : o.accepts["*"]);
            for (m in o.headers) x.setRequestHeader(m, o.headers[m]);
            if (o.beforeSend && (o.beforeSend.call(p, x, o) === !1 || k)) return x.abort();
            if (w = "abort", s.add(o.complete), x.done(o.success), x.fail(o.error), e = V(Mb, o, c, x)) {
                if (x.readyState = 1, l && q.trigger("ajaxSend", [x, o]), k) return x;
                o.async && o.timeout > 0 && (i = a.setTimeout(function() {
                    x.abort("timeout")
                }, o.timeout));
                try {
                    k = !1, e.send(u, d)
                } catch (y) {
                    if (k) throw y;
                    d(-1, y)
                }
            } else d(-1, "No Transport");
            return x
        },
        getJSON: function(a, b, c) {
            return ma.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return ma.get(a, void 0, b, "script")
        }
    }), ma.each(["get", "post"], function(a, b) {
        ma[b] = function(a, c, d, e) {
            return ma.isFunction(c) && (e = e || d, d = c, c = void 0), ma.ajax(ma.extend({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            }, ma.isPlainObject(a) && a))
        }
    }), ma._evalUrl = function(a) {
        return ma.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }, ma.fn.extend({
        wrapAll: function(a) {
            var b;
            return this[0] && (ma.isFunction(a) && (a = a.call(this[0])), b = ma(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                return a
            }).append(this)), this
        },
        wrapInner: function(a) {
            return ma.isFunction(a) ? this.each(function(b) {
                ma(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = ma(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = ma.isFunction(a);
            return this.each(function(c) {
                ma(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function(a) {
            return this.parent(a).not("body").each(function() {
                ma(this).replaceWith(this.childNodes)
            }), this
        }
    }), ma.expr.pseudos.hidden = function(a) {
        return !ma.expr.pseudos.visible(a)
    }, ma.expr.pseudos.visible = function(a) {
        return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length)
    }, ma.ajaxSettings.xhr = function() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    };
    var Pb = {
            0: 200,
            1223: 204
        },
        Qb = ma.ajaxSettings.xhr();
    ka.cors = !!Qb && "withCredentials" in Qb, ka.ajax = Qb = !!Qb, ma.ajaxTransport(function(b) {
        var c, d;
        if (ka.cors || Qb && !b.crossDomain) return {
            send: function(e, f) {
                var g, h = b.xhr();
                if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields)
                    for (g in b.xhrFields) h[g] = b.xhrFields[g];
                b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                for (g in e) h.setRequestHeader(g, e[g]);
                c = function(a) {
                    return function() {
                        c && (c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Pb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? {
                            binary: h.response
                        } : {
                            text: h.responseText
                        }, h.getAllResponseHeaders()))
                    }
                }, h.onload = c(), d = h.onerror = c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function() {
                    4 === h.readyState && a.setTimeout(function() {
                        c && d()
                    })
                }, c = c("abort");
                try {
                    h.send(b.hasContent && b.data || null)
                } catch (i) {
                    if (c) throw i
                }
            },
            abort: function() {
                c && c()
            }
        }
    }), ma.ajaxPrefilter(function(a) {
        a.crossDomain && (a.contents.script = !1)
    }), ma.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(a) {
                return ma.globalEval(a), a
            }
        }
    }), ma.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
    }), ma.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function(d, e) {
                    b = ma("<script>").prop({
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                    }), _.head.appendChild(b[0])
                },
                abort: function() {
                    c && c()
                }
            }
        }
    });
    var Rb = [],
        Sb = /(=)\?(?=&|$)|\?\?/;
    ma.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Rb.pop() || ma.expando + "_" + yb++;
            return this[a] = !0, a
        }
    }), ma.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (Sb.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Sb.test(b.data) && "data");
        if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = ma.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Sb, "$1" + e) : b.jsonp !== !1 && (b.url += (zb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || ma.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        }, d.always(function() {
            void 0 === f ? ma(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Rb.push(e)), g && ma.isFunction(f) && f(g[0]), g = f = void 0
        }), "script"
    }), ka.createHTMLDocument = function() {
        var a = _.implementation.createHTMLDocument("").body;
        return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length
    }(), ma.parseHTML = function(a, b, c) {
        if ("string" != typeof a) return [];
        "boolean" == typeof b && (c = b, b = !1);
        var d, e, f;
        return b || (ka.createHTMLDocument ? (b = _.implementation.createHTMLDocument(""), d = b.createElement("base"), d.href = _.location.href, b.head.appendChild(d)) : b = _), e = va.exec(a), f = !c && [], e ? [b.createElement(e[1])] : (e = s([a], b, f), f && f.length && ma(f).remove(), ma.merge([], e.childNodes))
    }, ma.fn.load = function(a, b, c) {
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h > -1 && (d = ma.trim(a.slice(h)), a = a.slice(0, h)), ma.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && ma.ajax({
            url: a,
            type: e || "GET",
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments, g.html(d ? ma("<div>").append(ma.parseHTML(a)).find(d) : a)
        }).always(c && function(a, b) {
            g.each(function() {
                c.apply(this, f || [a.responseText, b, a])
            })
        }), this
    }, ma.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        ma.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), ma.expr.pseudos.animated = function(a) {
        return ma.grep(ma.timers, function(b) {
            return a === b.elem
        }).length
    }, ma.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = ma.css(a, "position"),
                l = ma(a),
                m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = ma.css(a, "top"), i = ma.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), ma.isFunction(b) && (b = b.call(a, c, ma.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, ma.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                ma.offset.setOffset(this, a, b)
            });
            var b, c, d, e, f = this[0];
            return f ? f.getClientRects().length ? (d = f.getBoundingClientRect(), d.width || d.height ? (e = f.ownerDocument, c = Z(e), b = e.documentElement, {
                top: d.top + c.pageYOffset - b.clientTop,
                left: d.left + c.pageXOffset - b.clientLeft
            }) : d) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var a, b, c = this[0],
                    d = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === ma.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), ma.nodeName(a[0], "html") || (d = a.offset()), d = {
                    top: d.top + ma.css(a[0], "borderTopWidth", !0),
                    left: d.left + ma.css(a[0], "borderLeftWidth", !0)
                }), {
                    top: b.top - d.top - ma.css(c, "marginTop", !0),
                    left: b.left - d.left - ma.css(c, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent; a && "static" === ma.css(a, "position");) a = a.offsetParent;
                return a || Wa
            })
        }
    }), ma.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = "pageYOffset" === b;
        ma.fn[a] = function(d) {
            return Fa(this, function(a, d, e) {
                var f = Z(a);
                return void 0 === e ? f ? f[b] : a[d] : void(f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e)
            }, a, d, arguments.length)
        }
    }), ma.each(["top", "left"], function(a, b) {
        ma.cssHooks[b] = F(ka.pixelPosition, function(a, c) {
            if (c) return c = E(a, b), eb.test(c) ? ma(a).position()[b] + "px" : c
        })
    }), ma.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        ma.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            ma.fn[d] = function(e, f) {
                var g = arguments.length && (c || "boolean" != typeof e),
                    h = c || (e === !0 || f === !0 ? "margin" : "border");
                return Fa(this, function(b, c, e) {
                    var f;
                    return ma.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? ma.css(b, c, h) : ma.style(b, c, e, h)
                }, b, g ? e : void 0, g)
            }
        })
    }), ma.fn.extend({
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    }), ma.parseJSON = JSON.parse, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ma
    });
    var Tb = a.jQuery,
        Ub = a.$;
    return ma.noConflict = function(b) {
        return a.$ === ma && (a.$ = Ub), b && a.jQuery === ma && (a.jQuery = Tb), ma
    }, b || (a.jQuery = a.$ = ma), ma
}),  window.Modernizr = function(a, b, c) {
        function d(a) {
            o.cssText = a
        }

        function e(a, b) {
            return typeof a === b
        }
        var f, g, h, i = "2.6.2",
            j = {},
            k = !0,
            l = b.documentElement,
            m = "modernizr",
            n = b.createElement(m),
            o = n.style,
            p = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
            q = {},
            r = [],
            s = r.slice,
            t = function(a, c, d, e) {
                var f, g, h, i, j = b.createElement("div"),
                    k = b.body,
                    n = k || b.createElement("body");
                if (parseInt(d, 10))
                    for (; d--;) h = b.createElement("div"), h.id = e ? e[d] : m + (d + 1), j.appendChild(h);
                return f = ["&#173;", '<style id="s', m, '">', a, "</style>"].join(""), j.id = m, (k ? j : n).innerHTML += f, n.appendChild(j), k || (n.style.background = "", n.style.overflow = "hidden", i = l.style.overflow, l.style.overflow = "hidden", l.appendChild(n)), g = c(j, a), k ? j.parentNode.removeChild(j) : (n.parentNode.removeChild(n), l.style.overflow = i), !!g
            },
            u = {}.hasOwnProperty;
        h = e(u, "undefined") || e(u.call, "undefined") ? function(a, b) {
            return b in a && e(a.constructor.prototype[b], "undefined")
        } : function(a, b) {
            return u.call(a, b)
        }, Function.prototype.bind || (Function.prototype.bind = function(a) {
            var b = this;
            if ("function" != typeof b) throw new TypeError;
            var c = s.call(arguments, 1),
                d = function() {
                    if (this instanceof d) {
                        var e = function() {};
                        e.prototype = b.prototype;
                        var f = new e,
                            g = b.apply(f, c.concat(s.call(arguments)));
                        return Object(g) === g ? g : f
                    }
                    return b.apply(a, c.concat(s.call(arguments)))
                };
            return d
        }), q.touch = function() {
            var c;
            return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : t(["@media (", p.join("touch-enabled),("), m, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
                c = 9 === a.offsetTop
            }), c
        };
        for (var v in q) h(q, v) && (g = v.toLowerCase(), j[g] = q[v](), r.push((j[g] ? "" : "no-") + g));
        return j.addTest = function(a, b) {
                if ("object" == typeof a)
                    for (var d in a) h(a, d) && j.addTest(d, a[d]);
                else {
                    if (a = a.toLowerCase(), j[a] !== c) return j;
                    b = "function" == typeof b ? b() : b, "undefined" != typeof k && k && (l.className += " " + (b ? "" : "no-") + a), j[a] = b
                }
                return j
            }, d(""), n = f = null,
            function(a, b) {
                function c(a, b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
                }

                function d() {
                    var a = r.elements;
                    return "string" == typeof a ? a.split(" ") : a
                }

                function e(a) {
                    var b = q[a[o]];
                    return b || (b = {}, p++, a[o] = p, q[p] = b), b
                }

                function f(a, c, d) {
                    if (c || (c = b), k) return c.createElement(a);
                    d || (d = e(c));
                    var f;
                    return f = d.cache[a] ? d.cache[a].cloneNode() : n.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), f.canHaveChildren && !m.test(a) ? d.frag.appendChild(f) : f
                }

                function g(a, c) {
                    if (a || (a = b), k) return a.createDocumentFragment();
                    c = c || e(a);
                    for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; g < i; g++) f.createElement(h[g]);
                    return f
                }

                function h(a, b) {
                    b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                        return r.shivMethods ? f(c, a, b) : b.createElem(c)
                    }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/\w+/g, function(a) {
                        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                    }) + ");return n}")(r, b.frag)
                }

                function i(a) {
                    a || (a = b);
                    var d = e(a);
                    return r.shivCSS && !j && !d.hasCSS && (d.hasCSS = !!c(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), k || h(a, d), a
                }
                var j, k, l = a.html5 || {},
                    m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    n = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    o = "_html5shiv",
                    p = 0,
                    q = {};
                ! function() {
                    try {
                        var a = b.createElement("a");
                        a.innerHTML = "<xyz></xyz>", j = "hidden" in a, k = 1 == a.childNodes.length || function() {
                            b.createElement("a");
                            var a = b.createDocumentFragment();
                            return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                        }()
                    } catch (c) {
                        j = !0, k = !0
                    }
                }();
                var r = {
                    elements: l.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                    shivCSS: l.shivCSS !== !1,
                    supportsUnknownElements: k,
                    shivMethods: l.shivMethods !== !1,
                    type: "default",
                    shivDocument: i,
                    createElement: f,
                    createDocumentFragment: g
                };
                a.html5 = r, i(b)
            }(this, b), j._version = i, j._prefixes = p, j.testStyles = t, l.className = l.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (k ? " js " + r.join(" ") : ""), j
    }(this, this.document),
    function(a, b, c) {
        function d(a) {
            return "[object Function]" == q.call(a)
        }

        function e(a) {
            return "string" == typeof a
        }

        function f() {}

        function g(a) {
            return !a || "loaded" == a || "complete" == a || "uninitialized" == a
        }

        function h() {
            var a = r.shift();
            s = 1, a ? a.t ? o(function() {
                ("c" == a.t ? m.injectCss : m.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
            }, 0) : (a(), h()) : s = 0
        }

        function i(a, c, d, e, f, i, j) {
            function k(b) {
                if (!n && g(l.readyState) && (t.r = n = 1, !s && h(), l.onload = l.onreadystatechange = null, b)) {
                    "img" != a && o(function() {
                        v.removeChild(l)
                    }, 50);
                    for (var d in A[c]) A[c].hasOwnProperty(d) && A[c][d].onload()
                }
            }
            var j = j || m.errorTimeout,
                l = b.createElement(a),
                n = 0,
                q = 0,
                t = {
                    t: d,
                    s: c,
                    e: f,
                    a: i,
                    x: j
                };
            1 === A[c] && (q = 1, A[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() {
                k.call(this, q)
            }, r.splice(e, 0, t), "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null : p), o(k, j)) : A[c].push(l))
        }

        function j(a, b, c, d, f) {
            return s = 0, b = b || "j", e(a) ? i("c" == b ? x : w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a), 1 == r.length && h()), this
        }

        function k() {
            var a = m;
            return a.loader = {
                load: j,
                i: 0
            }, a
        }
        var l, m, n = b.documentElement,
            o = a.setTimeout,
            p = b.getElementsByTagName("script")[0],
            q = {}.toString,
            r = [],
            s = 0,
            t = "MozAppearance" in n.style,
            u = t && !!b.createRange().compareNode,
            v = u ? n : p.parentNode,
            n = a.opera && "[object Opera]" == q.call(a.opera),
            n = !!b.attachEvent && !n,
            w = t ? "object" : n ? "script" : "img",
            x = n ? "script" : w,
            y = Array.isArray || function(a) {
                return "[object Array]" == q.call(a)
            },
            z = [],
            A = {},
            B = {
                timeout: function(a, b) {
                    return b.length && (a.timeout = b[0]), a
                }
            };
        m = function(a) {
            function b(a) {
                var b, c, d, a = a.split("!"),
                    e = z.length,
                    f = a.pop(),
                    g = a.length,
                    f = {
                        url: f,
                        origUrl: f,
                        prefixes: a
                    };
                for (c = 0; c < g; c++) d = a[c].split("="), (b = B[d.shift()]) && (f = b(f, d));
                for (c = 0; c < e; c++) f = z[c](f);
                return f
            }

            function g(a, e, f, g, h) {
                var i = b(a),
                    j = i.autoCallback;
                i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (A[i.url] ? i.noexec = !0 : A[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() {
                    k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), A[i.url] = 2
                })))
            }

            function h(a, b) {
                function c(a, c) {
                    if (a) {
                        if (e(a)) c || (l = function() {
                            var a = [].slice.call(arguments);
                            m.apply(this, a), n()
                        }), g(a, l, b, 0, j);
                        else if (Object(a) === a)
                            for (i in h = function() {
                                    var b, c = 0;
                                    for (b in a) a.hasOwnProperty(b) && c++;
                                    return c
                                }(), a) a.hasOwnProperty(i) && (!c && !--h && (d(l) ? l = function() {
                                var a = [].slice.call(arguments);
                                m.apply(this, a), n()
                            } : l[i] = function(a) {
                                return function() {
                                    var b = [].slice.call(arguments);
                                    a && a.apply(this, b), n()
                                }
                            }(m[i])), g(a[i], l, b, i, j))
                    } else !c && n()
                }
                var h, i, j = !!a.test,
                    k = a.load || a.both,
                    l = a.callback || f,
                    m = l,
                    n = a.complete || f;
                c(j ? a.yep : a.nope, !!k), k && c(k)
            }
            var i, j, l = this.yepnope.loader;
            if (e(a)) g(a, 0, l, 0);
            else if (y(a))
                for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : y(j) ? m(j) : Object(j) === j && h(j, l);
            else Object(a) === a && h(a, l)
        }, m.addPrefix = function(a, b) {
            B[a] = b
        }, m.addFilter = function(a) {
            z.push(a)
        }, m.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", l = function() {
            b.removeEventListener("DOMContentLoaded", l, 0), b.readyState = "complete"
        }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
            var k, l, n = b.createElement("script"),
                e = e || m.errorTimeout;
            n.src = a;
            for (l in d) n.setAttribute(l, d[l]);
            c = j ? h : c || f, n.onreadystatechange = n.onload = function() {
                !k && g(n.readyState) && (k = 1, c(), n.onload = n.onreadystatechange = null)
            }, o(function() {
                k || (k = 1, c(1))
            }, e), i ? n.onload() : p.parentNode.insertBefore(n, p)
        }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
            var j, e = b.createElement("link"),
                c = i ? h : c || f;
            e.href = a, e.rel = "stylesheet", e.type = "text/css";
            for (j in d) e.setAttribute(j, d[j]);
            g || (p.parentNode.insertBefore(e, p), o(c, 0))
        }
    }(this, document), Modernizr.load = function() {
        yepnope.apply(window, [].slice.call(arguments, 0))
    },
    function(a) {
        "use strict";

        function b(a) {
            this.el = a, this.overlay = this.el.querySelector(".nl-overlay"), this.fields = [], this.fldOpen = -1, this._init()
        }

        function c(a, b, c, d) {
            this.form = a, this.elOriginal = b, this.pos = d, this.type = c, this._create(), this._initEvents()
        }
        var d = a.document;
        String.prototype.trim || (String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, "")
        }), b.prototype = {
            _init: function() {
                var a = this;
                Array.prototype.slice.call(this.el.querySelectorAll("select")).forEach(function(b, d) {
                    a.fldOpen++, a.fields.push(new c(a, b, "dropdown", a.fldOpen))
                }), Array.prototype.slice.call(this.el.querySelectorAll('input:not([type="hidden"])')).forEach(function(b, d) {
                    a.fldOpen++, a.fields.push(new c(a, b, "input", a.fldOpen))
                }), this.overlay.addEventListener("click", function(b) {
                    a._closeFlds()
                }), $("#menu-mobile-toggle").on("click", function(b) {
                    a._closeFlds()
                })
            },
            _closeFlds: function() {
                this.fldOpen !== -1 && this.fields[this.fldOpen].close()
            }
        }, c.prototype = {
            _create: function() {
                "dropdown" === this.type ? this._createDropDown() : "input" === this.type && this._createInput()
            },
            _createDropDown: function() {
                var a = this;
                this.fld = d.createElement("div"), this.fld.className = "nl-field nl-dd", this.toggle = d.createElement("a"), this.toggle.innerHTML = this.elOriginal.options[this.elOriginal.selectedIndex].innerHTML, this.toggle.className = "nl-field-toggle", this.optionsList = d.createElement("ul");
                var b = "";
                Array.prototype.slice.call(this.elOriginal.querySelectorAll("option")).forEach(function(c, d) {
                    b += a.elOriginal.selectedIndex === d ? '<li class="nl-dd-checked">' + c.innerHTML + "</li>" : "<li>" + c.innerHTML + "</li>", a.elOriginal.selectedIndex === d && (a.selectedIdx = d)
                }), this.optionsList.innerHTML = b, this.fld.appendChild(this.toggle), this.fld.appendChild(this.optionsList), this.elOriginal.parentNode.insertBefore(this.fld, this.elOriginal), this.elOriginal.style.display = "none"
            },
            _createInput: function() {
                this.fld = d.createElement("div"), this.fld.className = "nl-field nl-ti-text", this.toggle = d.createElement("a"), this.toggle.innerHTML = this.elOriginal.getAttribute("placeholder"), this.toggle.className = "nl-field-toggle", this.optionsList = d.createElement("ul"), this.getinput = d.createElement("input"), this.getinput.setAttribute("type", "text"), this.getinput.setAttribute("placeholder", this.elOriginal.getAttribute("placeholder")), this.getinputWrapper = d.createElement("li"), this.getinputWrapper.className = "nl-ti-input", this.inputsubmit = d.createElement("button"), this.inputsubmit.className = "nl-field-go", this.inputsubmit.innerHTML = "Go", this.getinputWrapper.appendChild(this.getinput), this.getinputWrapper.appendChild(this.inputsubmit), this.example = d.createElement("li"), this.example.className = "nl-ti-example", this.example.innerHTML = this.elOriginal.getAttribute("data-subline"), this.optionsList.appendChild(this.getinputWrapper), this.optionsList.appendChild(this.example), this.fld.appendChild(this.toggle), this.fld.appendChild(this.optionsList), this.elOriginal.parentNode.insertBefore(this.fld, this.elOriginal), this.elOriginal.style.display = "none"
            },
            _initEvents: function() {
                var a = this;
                if (this.toggle.addEventListener("click", function(b) {
                        b.preventDefault(), b.stopPropagation(), a._open()
                    }), this.toggle.addEventListener("touchstart", function(b) {
                        b.preventDefault(), b.stopPropagation(), a._open()
                    }), "dropdown" === this.type) {
                    var b = Array.prototype.slice.call(this.optionsList.querySelectorAll("li"));
                    b.forEach(function(c, d) {
                        c.addEventListener("click", function(d) {
                            d.preventDefault(), a.close(c, b.indexOf(c))
                        })
                    })
                } else "input" === this.type && (this.getinput.addEventListener("keydown", function(b) {
                    13 == b.keyCode && a.close()
                }), this.inputsubmit.addEventListener("click", function(b) {
                    b.preventDefault(), a.close()
                }), this.inputsubmit.addEventListener("touchstart", function(b) {
                    b.preventDefault(), a.close()
                }))
            },
            _open: function() {
                if (this.open) return !1;
                this.open = !0, this.form.fldOpen = this.pos;
                if (this.fld.className += " nl-field-open", $(this.getinput).focus(), $(".nl-cm-wrapper").addClass("nl-cm-open"), "dropdown" === this.type) {
                    var b = $(this.optionsList),
                        c = $("li:first", b).offset().top;
                    $(a).width() < 760 && $("html, body").animate({
                        scrollTop: c - 200
                    }, 400)
                }
            },
            close: function(a, b) {
                if (!this.open) return !1;
                if (this.open = !1, this.form.fldOpen = -1, this.fld.className = this.fld.className.replace(/\b nl-field-open\b/, ""), $(".nl-cm-wrapper").removeClass("nl-cm-open"), "dropdown" === this.type) {
                    if (a) {
                        var c = this.optionsList.children[this.selectedIdx];
                        c.className = "", a.className = "nl-dd-checked", this.toggle.innerHTML = a.innerHTML, this.selectedIdx = b, this.elOriginal.value = this.elOriginal.children[this.selectedIdx].value, $(this.elOriginal).trigger("nlFormDropDown")
                    }
                } else "input" === this.type && (this.getinput.blur(), this.toggle.innerHTML = "" !== this.getinput.value.trim() ? this.getinput.value : this.getinput.getAttribute("placeholder"), "" !== this.getinput.value.trim() ? $(this.toggle).addClass("nl-form-setted") : $(this.toggle).removeClass("nl-form-setted"), this.elOriginal.value = this.getinput.value, $(this.fld).trigger("nsFormClosed"))
            }
        }, a.NLForm = b
    }(window),
    function(a, b) {
        "function" == typeof define && define.amd ? define(b) : "object" == typeof module && module.exports ? module.exports = b() : a.bodymovin = b()
    }(window, function() {
        function ProjectInterface() {
            return {}
        }

        function roundValues(a) {
            bm_rnd = a ? Math.round : function(a) {
                return a
            }
        }

        function roundTo2Decimals(a) {
            return Math.round(1e4 * a) / 1e4
        }

        function roundTo3Decimals(a) {
            return Math.round(100 * a) / 100
        }

        function styleDiv(a) {
            a.style.position = "absolute", a.style.top = 0, a.style.left = 0, a.style.display = "block", a.style.transformOrigin = a.style.webkitTransformOrigin = "0 0", a.style.backfaceVisibility = a.style.webkitBackfaceVisibility = "visible", a.style.transformStyle = a.style.webkitTransformStyle = a.style.mozTransformStyle = "preserve-3d"
        }

        function styleUnselectableDiv(a) {
            a.style.userSelect = "none", a.style.MozUserSelect = "none", a.style.webkitUserSelect = "none", a.style.oUserSelect = "none"
        }

        function BMEnterFrameEvent(a, b, c, d) {
            this.type = a, this.currentTime = b, this.totalTime = c, this.direction = d < 0 ? -1 : 1
        }

        function BMCompleteEvent(a, b) {
            this.type = a, this.direction = b < 0 ? -1 : 1
        }

        function BMCompleteLoopEvent(a, b, c, d) {
            this.type = a, this.currentLoop = b, this.totalLoops = c, this.direction = d < 0 ? -1 : 1
        }

        function BMSegmentStartEvent(a, b, c) {
            this.type = a, this.firstFrame = b, this.totalFrames = c
        }

        function BMDestroyEvent(a, b) {
            this.type = a, this.target = b
        }

        function _addEventListener(a, b) {
            this._cbs[a] || (this._cbs[a] = []), this._cbs[a].push(b)
        }

        function _removeEventListener(a, b) {
            if (b) {
                if (this._cbs[a]) {
                    for (var c = 0, d = this._cbs[a].length; c < d;) this._cbs[a][c] === b && (this._cbs[a].splice(c, 1), c -= 1, d -= 1), c += 1;
                    this._cbs[a].length || (this._cbs[a] = null)
                }
            } else this._cbs[a] = null
        }

        function _triggerEvent(a, b) {
            if (this._cbs[a])
                for (var c = this._cbs[a].length, d = 0; d < c; d++) this._cbs[a][d](b)
        }

        function randomString(a, b) {
            void 0 === b && (b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
            var c, d = "";
            for (c = a; c > 0; --c) d += b[Math.round(Math.random() * (b.length - 1))];
            return d
        }

        function HSVtoRGB(a, b, c) {
            var d, e, f, g, h, i, j, k;
            switch (1 === arguments.length && (b = a.s, c = a.v, a = a.h), g = Math.floor(6 * a), h = 6 * a - g, i = c * (1 - b), j = c * (1 - h * b), k = c * (1 - (1 - h) * b), g % 6) {
                case 0:
                    d = c, e = k, f = i;
                    break;
                case 1:
                    d = j, e = c, f = i;
                    break;
                case 2:
                    d = i, e = c, f = k;
                    break;
                case 3:
                    d = i, e = j, f = c;
                    break;
                case 4:
                    d = k, e = i, f = c;
                    break;
                case 5:
                    d = c, e = i, f = j
            }
            return [d, e, f]
        }

        function RGBtoHSV(a, b, c) {
            1 === arguments.length && (b = a.g, c = a.b, a = a.r);
            var d, e = Math.max(a, b, c),
                f = Math.min(a, b, c),
                g = e - f,
                h = 0 === e ? 0 : g / e,
                i = e / 255;
            switch (e) {
                case f:
                    d = 0;
                    break;
                case a:
                    d = b - c + g * (b < c ? 6 : 0), d /= 6 * g;
                    break;
                case b:
                    d = c - a + 2 * g, d /= 6 * g;
                    break;
                case c:
                    d = a - b + 4 * g, d /= 6 * g
            }
            return [d, h, i]
        }

        function addSaturationToRGB(a, b) {
            var c = RGBtoHSV(255 * a[0], 255 * a[1], 255 * a[2]);
            return c[1] += b, c[1] > 1 ? c[1] = 1 : c[1] <= 0 && (c[1] = 0), HSVtoRGB(c[0], c[1], c[2])
        }

        function addBrightnessToRGB(a, b) {
            var c = RGBtoHSV(255 * a[0], 255 * a[1], 255 * a[2]);
            return c[2] += b, c[2] > 1 ? c[2] = 1 : c[2] < 0 && (c[2] = 0), HSVtoRGB(c[0], c[1], c[2])
        }

        function addHueToRGB(a, b) {
            var c = RGBtoHSV(255 * a[0], 255 * a[1], 255 * a[2]);
            return c[0] += b / 360, c[0] > 1 ? c[0] -= 1 : c[0] < 0 && (c[0] += 1), HSVtoRGB(c[0], c[1], c[2])
        }

        function componentToHex(a) {
            var b = a.toString(16);
            return 1 == b.length ? "0" + b : b
        }

        function fillToRgba(a, b) {
            if (!cachedColors[a]) {
                var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
                cachedColors[a] = parseInt(c[1], 16) + "," + parseInt(c[2], 16) + "," + parseInt(c[3], 16)
            }
            return "rgba(" + cachedColors[a] + "," + b + ")"
        }

        function RenderedFrame(a, b) {
            this.tr = a, this.o = b
        }

        function LetterProps(a, b, c, d, e, f) {
            this.o = a, this.sw = b, this.sc = c, this.fc = d, this.m = e, this.props = f
        }

        function iterateDynamicProperties(a) {
            var b, c = this.dynamicProperties;
            for (b = 0; b < c; b += 1) this.dynamicProperties[b].getValue(a)
        }

        function reversePath(a) {
            var b, c, d = [],
                e = [],
                f = [],
                g = {},
                h = 0;
            a.c && (d[0] = a.o[0], e[0] = a.i[0], f[0] = a.v[0], h = 1), c = a.i.length;
            var i = c - 1;
            for (b = h; b < c; b += 1) d.push(a.o[i]), e.push(a.i[i]), f.push(a.v[i]), i -= 1;
            return g.i = d, g.o = e, g.v = f, g
        }

        function Matrix() {}

        function matrixManagerFunction() {
            var a = new Matrix,
                b = function(b, c, d, e, f) {
                    return a.reset().translate(e, f).rotate(b).scale(c, d).toCSS()
                },
                c = function(a) {
                    return b(a.tr.r[2], a.tr.s[0], a.tr.s[1], a.tr.p[0], a.tr.p[1])
                };
            return {
                getMatrix: c
            }
        }

        function createElement(a, b, c) {
            if (!b) {
                var d = Object.create(a.prototype, c),
                    e = {};
                return d && "[object Function]" === e.toString.call(d.init) && d.init(), d
            }
            b.prototype = Object.create(a.prototype), b.prototype.constructor = b, b.prototype._parent = a.prototype
        }

        function extendPrototype(a, b) {
            for (var c in a.prototype) a.prototype.hasOwnProperty(c) && (b.prototype[c] = a.prototype[c])
        }

        function bezFunction() {
            function a(a, b, c, d, e, f) {
                var g = a * d + b * e + c * f - e * d - f * a - c * b;
                return g > -1e-4 && g < 1e-4
            }

            function b(b, c, d, e, f, g, h, i, j) {
                return a(b, c, e, f, h, i) && a(b, d, e, g, h, j)
            }

            function c(a) {
                this.segmentLength = 0, this.points = new Array(a)
            }

            function d(a, b) {
                this.partialLength = a, this.point = b
            }

            function e(a, b) {
                var c = b.segments,
                    d = c.length,
                    e = bm_floor((d - 1) * a),
                    f = a * b.addedLength,
                    g = 0;
                if (f == c[e].l) return c[e].p;
                for (var h = c[e].l > f ? -1 : 1, i = !0; i;) c[e].l <= f && c[e + 1].l > f ? (g = (f - c[e].l) / (c[e + 1].l - c[e].l), i = !1) : e += h, (e < 0 || e >= d - 1) && (i = !1);
                return c[e].p + (c[e + 1].p - c[e].p) * g
            }

            function f() {
                this.pt1 = new Array(2), this.pt2 = new Array(2), this.pt3 = new Array(2), this.pt4 = new Array(2)
            }

            function g(a, b, c, d, g, h, i) {
                var j = new f;
                g = g < 0 ? 0 : g > 1 ? 1 : g;
                var k = e(g, i);
                h = h > 1 ? 1 : h;
                var l, m = e(h, i),
                    n = a.length,
                    o = 1 - k,
                    p = 1 - m;
                for (l = 0; l < n; l += 1) j.pt1[l] = Math.round(1e3 * (o * o * o * a[l] + (k * o * o + o * k * o + o * o * k) * c[l] + (k * k * o + o * k * k + k * o * k) * d[l] + k * k * k * b[l])) / 1e3, j.pt3[l] = Math.round(1e3 * (o * o * p * a[l] + (k * o * p + o * k * p + o * o * m) * c[l] + (k * k * p + o * k * m + k * o * m) * d[l] + k * k * m * b[l])) / 1e3, j.pt4[l] = Math.round(1e3 * (o * p * p * a[l] + (k * p * p + o * m * p + o * p * m) * c[l] + (k * m * p + o * m * m + k * p * m) * d[l] + k * m * m * b[l])) / 1e3, j.pt2[l] = Math.round(1e3 * (p * p * p * a[l] + (m * p * p + p * m * p + p * p * m) * c[l] + (m * m * p + p * m * m + m * p * m) * d[l] + m * m * m * b[l])) / 1e3;
                return j
            }
            var h = (Math, function() {
                    function a(a, b) {
                        this.l = a, this.p = b
                    }
                    return function(b, c, d, e) {
                        var f, g, h, i, j, k, l = defaultCurveSegments,
                            m = 0,
                            n = [],
                            o = [],
                            p = {
                                addedLength: 0,
                                segments: []
                            };
                        for (h = d.length, f = 0; f < l; f += 1) {
                            for (j = f / (l - 1), k = 0, g = 0; g < h; g += 1) i = bm_pow(1 - j, 3) * b[g] + 3 * bm_pow(1 - j, 2) * j * d[g] + 3 * (1 - j) * bm_pow(j, 2) * e[g] + bm_pow(j, 3) * c[g], n[g] = i, null !== o[g] && (k += bm_pow(n[g] - o[g], 2)), o[g] = n[g];
                            k && (k = bm_sqrt(k), m += k), p.segments.push(new a(m, j))
                        }
                        return p.addedLength = m, p
                    }
                }()),
                i = function() {
                    var b = {};
                    return function(e) {
                        var f = e.s,
                            g = e.e,
                            h = e.to,
                            i = e.ti,
                            j = (f.join("_") + "_" + g.join("_") + "_" + h.join("_") + "_" + i.join("_")).replace(/\./g, "p");
                        if (b[j]) return void(e.bezierData = b[j]);
                        var k, l, m, n, o, p, q, r = defaultCurveSegments,
                            s = 0,
                            t = null;
                        2 === f.length && (f[0] != g[0] || f[1] != g[1]) && a(f[0], f[1], g[0], g[1], f[0] + h[0], f[1] + h[1]) && a(f[0], f[1], g[0], g[1], g[0] + i[0], g[1] + i[1]) && (r = 2);
                        var u = new c(r);
                        for (m = h.length, k = 0; k < r; k += 1) {
                            for (q = new Array(m), o = k / (r - 1), p = 0, l = 0; l < m; l += 1) n = bm_pow(1 - o, 3) * f[l] + 3 * bm_pow(1 - o, 2) * o * (f[l] + h[l]) + 3 * (1 - o) * bm_pow(o, 2) * (g[l] + i[l]) + bm_pow(o, 3) * g[l], q[l] = n, null !== t && (p += bm_pow(q[l] - t[l], 2));
                            p = bm_sqrt(p), s += p, u.points[k] = new d(p, q), t = q
                        }
                        u.segmentLength = s, e.bezierData = u, b[j] = u
                    }
                }();
            return {
                getBezierLength: h,
                getNewSegment: g,
                buildBezierData: i,
                pointOnLine2D: a,
                pointOnLine3D: b
            }
        }

        function dataFunctionManager() {
            function a(e, f, h) {
                var i, j, k, l, m, n, o, p, q = e.length;
                for (l = 0; l < q; l += 1)
                    if (i = e[l], "ks" in i && !i.completed) {
                        if (i.completed = !0, i.tt && (e[l - 1].td = i.tt), j = [], k = -1, i.hasMask) {
                            var r = i.masksProperties;
                            for (n = r.length, m = 0; m < n; m += 1)
                                if (r[m].pt.k.i) d(r[m].pt.k);
                                else
                                    for (p = r[m].pt.k.length, o = 0; o < p; o += 1) r[m].pt.k[o].s && d(r[m].pt.k[o].s[0]), r[m].pt.k[o].e && d(r[m].pt.k[o].e[0])
                        }
                        0 === i.ty ? (i.layers = b(i.refId, f), a(i.layers, f, h)) : 4 === i.ty ? c(i.shapes) : 5 == i.ty && g(i, h)
                    }
            }

            function b(a, b) {
                for (var c = 0, d = b.length; c < d;) {
                    if (b[c].id === a) return b[c].layers;
                    c += 1
                }
            }

            function c(a) {
                var b, e, f, g = a.length,
                    h = !1;
                for (b = g - 1; b >= 0; b -= 1)
                    if ("sh" == a[b].ty) {
                        if (a[b].ks.k.i) d(a[b].ks.k);
                        else
                            for (f = a[b].ks.k.length, e = 0; e < f; e += 1) a[b].ks.k[e].s && d(a[b].ks.k[e].s[0]), a[b].ks.k[e].e && d(a[b].ks.k[e].e[0]);
                        h = !0
                    } else "gr" == a[b].ty && c(a[b].it)
            }

            function d(a) {
                var b, c = a.i.length;
                for (b = 0; b < c; b += 1) a.i[b][0] += a.v[b][0], a.i[b][1] += a.v[b][1], a.o[b][0] += a.v[b][0], a.o[b][1] += a.v[b][1]
            }

            function e(a, b) {
                var c = b ? b.split(".") : [100, 100, 100];
                return a[0] > c[0] || !(c[0] > a[0]) && (a[1] > c[1] || !(c[1] > a[1]) && (a[2] > c[2] || !(c[2] > a[2]) && void 0))
            }

            function f(b, c) {
                b.__complete || (i(b), h(b), j(b), a(b.layers, b.assets, c), b.__complete = !0)
            }

            function g(a, b) {
                var c, d, e = a.t.d.k,
                    f = e.length;
                for (d = 0; d < f; d += 1) {
                    var g = a.t.d.k[d].s;
                    c = [];
                    var h, i, j, k, l, m, n, o = 0,
                        p = a.t.m.g,
                        q = 0,
                        r = 0,
                        s = 0,
                        t = [],
                        u = 0,
                        v = 0,
                        w = b.getFontByName(g.f),
                        x = 0,
                        y = w.fStyle.split(" "),
                        z = "normal",
                        A = "normal";
                    for (i = y.length, h = 0; h < i; h += 1) "italic" === y[h].toLowerCase() ? A = "italic" : "bold" === y[h].toLowerCase() ? z = "700" : "black" === y[h].toLowerCase() ? z = "900" : "medium" === y[h].toLowerCase() ? z = "500" : "regular" === y[h].toLowerCase() || "normal" === y[h].toLowerCase() ? z = "400" : "light" !== y[h].toLowerCase() && "thin" !== y[h].toLowerCase() || (z = "200");
                    if (g.fWeight = z, g.fStyle = A, i = g.t.length, g.sz) {
                        var B = g.sz[0],
                            C = -1;
                        for (h = 0; h < i; h += 1) j = !1, " " === g.t.charAt(h) ? C = h : 13 === g.t.charCodeAt(h) && (u = 0, j = !0), b.chars ? (n = b.getCharData(g.t.charAt(h), w.fStyle, w.fFamily), x = j ? 0 : n.w * g.s / 100) : x = b.measureText(g.t.charAt(h), g.f, g.s), u + x > B ? (C === -1 ? (g.t = g.t.substr(0, h) + "\r" + g.t.substr(h), i += 1) : (h = C, g.t = g.t.substr(0, h) + "\r" + g.t.substr(h + 1)), C = -1, u = 0) : u += x;
                        i = g.t.length
                    }
                    for (u = 0, x = 0, h = 0; h < i; h += 1)
                        if (j = !1, " " === g.t.charAt(h) ? k = " " : 13 === g.t.charCodeAt(h) ? (t.push(u), v = u > v ? u : v, u = 0, k = "", j = !0, s += 1) : k = g.t.charAt(h), b.chars ? (n = b.getCharData(g.t.charAt(h), w.fStyle, b.getFontByName(g.f).fFamily), x = j ? 0 : n.w * g.s / 100) : x = b.measureText(k, g.f, g.s), u += x, c.push({
                                l: x,
                                an: x,
                                add: q,
                                n: j,
                                anIndexes: [],
                                val: k,
                                line: s
                            }), 2 == p) {
                            if (q += x, "" == k || " " == k || h == i - 1) {
                                for ("" != k && " " != k || (q -= x); r <= h;) c[r].an = q, c[r].ind = o, c[r].extra = x, r += 1;
                                o += 1, q = 0
                            }
                        } else if (3 == p) {
                        if (q += x, "" == k || h == i - 1) {
                            for ("" == k && (q -= x); r <= h;) c[r].an = q, c[r].ind = o, c[r].extra = x, r += 1;
                            q = 0, o += 1
                        }
                    } else c[o].ind = o, c[o].extra = 0, o += 1;
                    if (g.l = c, v = u > v ? u : v, t.push(u), g.sz) g.boxWidth = g.sz[0], g.justifyOffset = 0;
                    else switch (g.boxWidth = v, g.j) {
                        case 1:
                            g.justifyOffset = -g.boxWidth;
                            break;
                        case 2:
                            g.justifyOffset = -g.boxWidth / 2;
                            break;
                        default:
                            g.justifyOffset = 0
                    }
                    g.lineWidths = t;
                    var D = a.t.a;
                    m = D.length;
                    var E, F, G = [];
                    for (l = 0; l < m; l += 1) {
                        for (D[l].a.sc && (g.strokeColorAnim = !0), D[l].a.sw && (g.strokeWidthAnim = !0), (D[l].a.fc || D[l].a.fh || D[l].a.fs || D[l].a.fb) && (g.fillColorAnim = !0), F = 0, E = D[l].s.b, h = 0; h < i; h += 1) c[h].anIndexes[l] = F, (1 == E && "" != c[h].val || 2 == E && "" != c[h].val && " " != c[h].val || 3 == E && (c[h].n || " " == c[h].val || h == i - 1) || 4 == E && (c[h].n || h == i - 1)) && (1 === D[l].s.rn && G.push(F), F += 1);
                        a.t.a[l].s.totalChars = F;
                        var H, I = -1;
                        if (1 === D[l].s.rn)
                            for (h = 0; h < i; h += 1) I != c[h].anIndexes[l] && (I = c[h].anIndexes[l], H = G.splice(Math.floor(Math.random() * G.length), 1)[0]), c[h].anIndexes[l] = H
                    }
                    0 !== m || "m" in a.t.p || (a.singleShape = !0), g.yOffset = g.lh || 1.2 * g.s, g.ascent = w.ascent * g.s / 100
                }
            }
            var h = function() {
                    function a(a) {
                        var b = a.t.d;
                        a.t.d = {
                            k: [{
                                s: b,
                                t: 0
                            }]
                        }
                    }

                    function b(b) {
                        var c, d = b.length;
                        for (c = 0; c < d; c += 1) 5 === b[c].ty && a(b[c])
                    }
                    var c = [4, 4, 14];
                    return function(a) {
                        if (e(c, a.v) && (b(a.layers), a.assets)) {
                            var d, f = a.assets.length;
                            for (d = 0; d < f; d += 1) a.assets[d].layers && b(a.assets[d].layers)
                        }
                    }
                }(),
                i = function() {
                    function a(b) {
                        var c, d, e, f = b.length;
                        for (c = 0; c < f; c += 1)
                            if ("gr" === b[c].ty) a(b[c].it);
                            else if ("fl" === b[c].ty || "st" === b[c].ty)
                            if (b[c].c.k && b[c].c.k[0].i)
                                for (e = b[c].c.k.length, d = 0; d < e; d += 1) b[c].c.k[d].s && (b[c].c.k[d].s[0] /= 255, b[c].c.k[d].s[1] /= 255, b[c].c.k[d].s[2] /= 255, b[c].c.k[d].s[3] /= 255), b[c].c.k[d].e && (b[c].c.k[d].e[0] /= 255, b[c].c.k[d].e[1] /= 255, b[c].c.k[d].e[2] /= 255, b[c].c.k[d].e[3] /= 255);
                            else b[c].c.k[0] /= 255, b[c].c.k[1] /= 255, b[c].c.k[2] /= 255, b[c].c.k[3] /= 255
                    }

                    function b(b) {
                        var c, d = b.length;
                        for (c = 0; c < d; c += 1) 4 === b[c].ty && a(b[c].shapes)
                    }
                    var c = [4, 1, 9];
                    return function(a) {
                        if (e(c, a.v) && (b(a.layers), a.assets)) {
                            var d, f = a.assets.length;
                            for (d = 0; d < f; d += 1) a.assets[d].layers && b(a.assets[d].layers)
                        }
                    }
                }(),
                j = function() {
                    function a(b) {
                        var c, d, e, f = b.length,
                            g = !1;
                        for (c = f - 1; c >= 0; c -= 1)
                            if ("sh" == b[c].ty) {
                                if (b[c].ks.k.i) b[c].ks.k.c = b[c].closed;
                                else
                                    for (e = b[c].ks.k.length, d = 0; d < e; d += 1) b[c].ks.k[d].s && (b[c].ks.k[d].s[0].c = b[c].closed), b[c].ks.k[d].e && (b[c].ks.k[d].e[0].c = b[c].closed);
                                g = !0
                            } else "gr" == b[c].ty && a(b[c].it)
                    }

                    function b(b) {
                        var c, d, e, f, g, h, i = b.length;
                        for (d = 0; d < i; d += 1) {
                            if (c = b[d], c.hasMask) {
                                var j = c.masksProperties;
                                for (f = j.length, e = 0; e < f; e += 1)
                                    if (j[e].pt.k.i) j[e].pt.k.c = j[e].cl;
                                    else
                                        for (h = j[e].pt.k.length, g = 0; g < h; g += 1) j[e].pt.k[g].s && (j[e].pt.k[g].s[0].c = j[e].cl), j[e].pt.k[g].e && (j[e].pt.k[g].e[0].c = j[e].cl)
                            }
                            4 === c.ty && a(c.shapes)
                        }
                    }
                    var c = [4, 4, 18];
                    return function(a) {
                        if (e(c, a.v) && (b(a.layers), a.assets)) {
                            var d, f = a.assets.length;
                            for (d = 0; d < f; d += 1) a.assets[d].layers && b(a.assets[d].layers)
                        }
                    }
                }(),
                k = {};
            return k.completeData = f, k
        }

        function ShapeModifier() {}

        function TrimModifier() {}

        function RoundCornersModifier() {}

        function BaseRenderer() {}

        function SVGRenderer(a, b) {
            this.animationItem = a, this.layers = null, this.renderedFrame = -1, this.globalData = {
                frameNum: -1
            }, this.renderConfig = {
                preserveAspectRatio: b && b.preserveAspectRatio || "xMidYMid meet",
                progressiveLoad: b && b.progressiveLoad || !1
            }, this.elements = [], this.pendingElements = [], this.destroyed = !1
        }

        function MaskElement(a, b, c) {
            this.dynamicProperties = [], this.data = a, this.element = b, this.globalData = c, this.paths = [], this.storedData = [], this.masksProperties = this.data.masksProperties, this.viewData = new Array(this.masksProperties.length), this.maskElement = null, this.firstFrame = !0;
            var d, e, f, g, h, i, j, k, l = this.globalData.defs,
                m = this.masksProperties.length,
                n = this.masksProperties,
                o = 0,
                p = [],
                q = randomString(10),
                r = "clipPath",
                s = "clip-path";
            for (d = 0; d < m; d++)
                if (("a" !== n[d].mode && "n" !== n[d].mode || n[d].inv || 100 !== n[d].o.k) && (r = "mask", s = "mask"), "s" != n[d].mode && "i" != n[d].mode || 0 != o ? h = null : (h = document.createElementNS(svgNS, "rect"), h.setAttribute("fill", "#ffffff"), h.setAttribute("width", this.element.comp.data ? this.element.comp.data.w : this.element.globalData.compSize.w), h.setAttribute("height", this.element.comp.data ? this.element.comp.data.h : this.element.globalData.compSize.h), p.push(h)), e = document.createElementNS(svgNS, "path"), "n" != n[d].mode) {
                    if (o += 1, "s" == n[d].mode ? e.setAttribute("fill", "#000000") : e.setAttribute("fill", "#ffffff"), e.setAttribute("clip-rule", "nonzero"), 0 !== n[d].x.k) {
                        r = "mask", s = "mask", k = PropertyFactory.getProp(this.element, n[d].x, 0, null, this.dynamicProperties);
                        var t = "fi_" + randomString(10);
                        i = document.createElementNS(svgNS, "filter"), i.setAttribute("id", t), j = document.createElementNS(svgNS, "feMorphology"), j.setAttribute("operator", "dilate"), j.setAttribute("in", "SourceGraphic"), j.setAttribute("radius", "0"), i.appendChild(j), l.appendChild(i), "s" == n[d].mode ? e.setAttribute("stroke", "#000000") : e.setAttribute("stroke", "#ffffff")
                    } else j = null, k = null;
                    if (this.storedData[d] = {
                            elem: e,
                            x: k,
                            expan: j,
                            lastPath: "",
                            lastOperator: "",
                            filterId: t,
                            lastRadius: 0
                        }, "i" == n[d].mode) {
                        g = p.length;
                        var u = document.createElementNS(svgNS, "g");
                        for (f = 0; f < g; f += 1) u.appendChild(p[f]);
                        var v = document.createElementNS(svgNS, "mask");
                        v.setAttribute("mask-type", "alpha"), v.setAttribute("id", q + "_" + o), v.appendChild(e), l.appendChild(v), u.setAttribute("mask", "url(#" + q + "_" + o + ")"), p.length = 0, p.push(u)
                    } else p.push(e);
                    n[d].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()), this.viewData[d] = {
                        elem: e,
                        lastPath: "",
                        op: PropertyFactory.getProp(this.element, n[d].o, 0, .01, this.dynamicProperties),
                        prop: ShapePropertyFactory.getShapeProp(this.element, n[d], 3, this.dynamicProperties, null)
                    }, h && (this.viewData[d].invRect = h), this.viewData[d].prop.k || this.drawPath(n[d], this.viewData[d].prop.v, this.viewData[d])
                } else this.viewData[d] = {
                    op: PropertyFactory.getProp(this.element, n[d].o, 0, .01, this.dynamicProperties),
                    prop: ShapePropertyFactory.getShapeProp(this.element, n[d], 3, this.dynamicProperties, null),
                    elem: e
                }, l.appendChild(e);
            for (this.maskElement = document.createElementNS(svgNS, r), m = p.length, d = 0; d < m; d += 1) this.maskElement.appendChild(p[d]);
            this.maskElement.setAttribute("id", q), o > 0 && this.element.maskedElement.setAttribute(s, "url(#" + q + ")"), l.appendChild(this.maskElement)
        }

        function BaseElement() {}

        function SVGBaseElement(a, b, c, d, e) {
            this.globalData = c, this.comp = d, this.data = a, this.matteElement = null, this.transformedElement = null, this.parentContainer = b, this.layerId = e ? e.layerId : "ly_" + randomString(10), this.placeholder = e, this.init()
        }

        function ITextElement(a, b, c, d) {}

        function SVGTextElement(a, b, c, d, e) {
            this.textSpans = [], this.renderType = "svg", this._parent.constructor.call(this, a, b, c, d, e)
        }

        function SVGTintFilter(a, b) {
            this.filterManager = b;
            var c = document.createElementNS(svgNS, "feColorMatrix");
            if (c.setAttribute("type", "matrix"), c.setAttribute("color-interpolation-filters", "linearRGB"), c.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), c.setAttribute("result", "f1"), a.appendChild(c), c = document.createElementNS(svgNS, "feColorMatrix"), c.setAttribute("type", "matrix"), c.setAttribute("color-interpolation-filters", "sRGB"), c.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), c.setAttribute("result", "f2"), a.appendChild(c), this.matrixFilter = c, 100 !== b.effectElements[2].p.v || b.effectElements[2].p.k) {
                var d = document.createElementNS(svgNS, "feMerge");
                a.appendChild(d);
                var e;
                e = document.createElementNS(svgNS, "feMergeNode"), e.setAttribute("in", "SourceGraphic"), d.appendChild(e), e = document.createElementNS(svgNS, "feMergeNode"), e.setAttribute("in", "f2"), d.appendChild(e)
            }
        }

        function SVGFillFilter(a, b) {
            this.filterManager = b;
            var c = document.createElementNS(svgNS, "feColorMatrix");
            c.setAttribute("type", "matrix"), c.setAttribute("color-interpolation-filters", "sRGB"), c.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"), a.appendChild(c), this.matrixFilter = c
        }

        function SVGStrokeEffect(a, b) {
            this.initialized = !1, this.filterManager = b, this.elem = a, this.paths = []
        }

        function SVGTritoneFilter(a, b) {
            this.filterManager = b;
            var c = document.createElementNS(svgNS, "feColorMatrix");
            c.setAttribute("type", "matrix"), c.setAttribute("color-interpolation-filters", "linearRGB"), c.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"), c.setAttribute("result", "f1"), a.appendChild(c);
            var d = document.createElementNS(svgNS, "feComponentTransfer");
            d.setAttribute("color-interpolation-filters", "sRGB"), a.appendChild(d), this.matrixFilter = d;
            var e = document.createElementNS(svgNS, "feFuncR");
            e.setAttribute("type", "table"), d.appendChild(e), this.feFuncR = e;
            var f = document.createElementNS(svgNS, "feFuncG");
            f.setAttribute("type", "table"), d.appendChild(f), this.feFuncG = f;
            var g = document.createElementNS(svgNS, "feFuncB");
            g.setAttribute("type", "table"), d.appendChild(g), this.feFuncB = g
        }

        function SVGProLevelsFilter(a, b) {
            this.filterManager = b;
            var c, d, e, f = this.filterManager.effectElements,
                g = document.createElementNS(svgNS, "feComponentTransfer");
            if ((f[9].p.k || 0 !== f[9].p.v || f[10].p.k || 1 !== f[10].p.v || f[11].p.k || 1 !== f[11].p.v || f[12].p.k || 0 !== f[12].p.v || f[13].p.k || 1 !== f[13].p.v) && (c = document.createElementNS(svgNS, "feFuncR"), c.setAttribute("type", "table"), g.appendChild(c), this.feFuncR = c), (f[16].p.k || 0 !== f[16].p.v || f[17].p.k || 1 !== f[17].p.v || f[18].p.k || 1 !== f[18].p.v || f[19].p.k || 0 !== f[19].p.v || f[20].p.k || 1 !== f[20].p.v) && (d = document.createElementNS(svgNS, "feFuncG"), d.setAttribute("type", "table"), g.appendChild(d), this.feFuncG = d), f[23].p.k || 0 !== f[23].p.v || f[24].p.k || 1 !== f[24].p.v || f[25].p.k || 1 !== f[25].p.v || f[26].p.k || 0 !== f[26].p.v || f[27].p.k || 1 !== f[27].p.v) {
                var e = document.createElementNS(svgNS, "feFuncB");
                e.setAttribute("type", "table"), g.appendChild(e), this.feFuncB = e
            }
            if (f[30].p.k || 0 !== f[30].p.v || f[31].p.k || 1 !== f[31].p.v || f[32].p.k || 1 !== f[32].p.v || f[33].p.k || 0 !== f[33].p.v || f[34].p.k || 1 !== f[34].p.v) {
                var h = document.createElementNS(svgNS, "feFuncA");
                h.setAttribute("type", "table"), g.appendChild(h), this.feFuncA = h
            }(this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) && (g.setAttribute("color-interpolation-filters", "sRGB"), a.appendChild(g), g = document.createElementNS(svgNS, "feComponentTransfer")), (f[2].p.k || 0 !== f[2].p.v || f[3].p.k || 1 !== f[3].p.v || f[4].p.k || 1 !== f[4].p.v || f[5].p.k || 0 !== f[5].p.v || f[6].p.k || 1 !== f[6].p.v) && (g.setAttribute("color-interpolation-filters", "sRGB"), a.appendChild(g), c = document.createElementNS(svgNS, "feFuncR"), c.setAttribute("type", "table"), g.appendChild(c), this.feFuncRComposed = c, d = document.createElementNS(svgNS, "feFuncG"), d.setAttribute("type", "table"), g.appendChild(d), this.feFuncGComposed = d, e = document.createElementNS(svgNS, "feFuncB"), e.setAttribute("type", "table"), g.appendChild(e), this.feFuncBComposed = e)
        }

        function SVGEffects(a) {
            var b, c = a.data.ef.length,
                d = randomString(10),
                e = filtersFactory.createFilter(d),
                f = 0;
            this.filters = [];
            var g;
            for (b = 0; b < c; b += 1) 20 === a.data.ef[b].ty ? (f += 1, g = new SVGTintFilter(e, a.effects.effectElements[b]), this.filters.push(g)) : 21 === a.data.ef[b].ty ? (f += 1, g = new SVGFillFilter(e, a.effects.effectElements[b]), this.filters.push(g)) : 22 === a.data.ef[b].ty ? (g = new SVGStrokeEffect(a, a.effects.effectElements[b]), this.filters.push(g)) : 23 === a.data.ef[b].ty ? (f += 1, g = new SVGTritoneFilter(e, a.effects.effectElements[b]), this.filters.push(g)) : 24 === a.data.ef[b].ty && (f += 1, g = new SVGProLevelsFilter(e, a.effects.effectElements[b]), this.filters.push(g));
            f && (a.globalData.defs.appendChild(e), a.layerElement.setAttribute("filter", "url(#" + d + ")"))
        }

        function ICompElement(a, b, c, d, e) {
            this._parent.constructor.call(this, a, b, c, d, e), this.layers = a.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = this.layers ? Array.apply(null, {
                length: this.layers.length
            }) : [], this.data.tm && (this.tm = PropertyFactory.getProp(this, this.data.tm, 0, c.frameRate, this.dynamicProperties)), this.data.xt ? (this.layerElement = document.createElementNS(svgNS, "g"), this.buildAllItems()) : c.progressiveLoad || this.buildAllItems()
        }

        function IImageElement(a, b, c, d, e) {
            this.assetData = c.getAssetData(a.refId), this._parent.constructor.call(this, a, b, c, d, e)
        }

        function IShapeElement(a, b, c, d, e) {
            this.shapes = [], this.shapesData = a.shapes, this.stylesList = [], this.viewData = [], this.shapeModifiers = [], this._parent.constructor.call(this, a, b, c, d, e)
        }

        function ISolidElement(a, b, c, d, e) {
            this._parent.constructor.call(this, a, b, c, d, e)
        }

        function CanvasRenderer(a, b) {
            this.animationItem = a, this.renderConfig = {
                clearCanvas: !b || void 0 === b.clearCanvas || b.clearCanvas,
                context: b && b.context || null,
                progressiveLoad: b && b.progressiveLoad || !1,
                preserveAspectRatio: b && b.preserveAspectRatio || "xMidYMid meet"
            }, this.renderConfig.dpr = b && b.dpr || 1, this.animationItem.wrapper && (this.renderConfig.dpr = b && b.dpr || window.devicePixelRatio || 1), this.renderedFrame = -1, this.globalData = {
                frameNum: -1
            }, this.contextData = {
                saved: Array.apply(null, {
                    length: 15
                }),
                savedOp: Array.apply(null, {
                    length: 15
                }),
                cArrPos: 0,
                cTr: new Matrix,
                cO: 1
            };
            var c, d = 15;
            for (c = 0; c < d; c += 1) this.contextData.saved[c] = Array.apply(null, {
                length: 16
            });
            this.elements = [], this.pendingElements = [], this.transformMat = new Matrix, this.completeLayers = !1
        }

        function HybridRenderer(a) {
            this.animationItem = a, this.layers = null, this.renderedFrame = -1, this.globalData = {
                frameNum: -1
            }, this.pendingElements = [], this.elements = [], this.threeDElements = [], this.destroyed = !1, this.camera = null, this.supports3d = !0
        }

        function CVBaseElement(a, b, c) {
            this.globalData = c, this.data = a, this.comp = b, this.canvasContext = c.canvasContext, this.init()
        }

        function CVCompElement(a, b, c) {
            this._parent.constructor.call(this, a, b, c);
            var d = {};
            for (var e in c) c.hasOwnProperty(e) && (d[e] = c[e]);
            d.renderer = this, d.compHeight = this.data.h, d.compWidth = this.data.w, this.renderConfig = {
                clearCanvas: !0
            }, this.contextData = {
                saved: Array.apply(null, {
                    length: 15
                }),
                savedOp: Array.apply(null, {
                    length: 15
                }),
                cArrPos: 0,
                cTr: new Matrix,
                cO: 1
            }, this.completeLayers = !1;
            var f, g = 15;
            for (f = 0; f < g; f += 1) this.contextData.saved[f] = Array.apply(null, {
                length: 16
            });
            this.transformMat = new Matrix, this.parentGlobalData = this.globalData;
            var h = document.createElement("canvas");
            d.canvasContext = h.getContext("2d"), this.canvasContext = d.canvasContext, h.width = this.data.w, h.height = this.data.h, this.canvas = h, this.globalData = d, this.layers = a.layers, this.pendingElements = [], this.elements = Array.apply(null, {
                length: this.layers.length
            }), this.data.tm && (this.tm = PropertyFactory.getProp(this, this.data.tm, 0, c.frameRate, this.dynamicProperties)), !this.data.xt && c.progressiveLoad || this.buildAllItems()
        }

        function CVImageElement(a, b, c) {
            this.assetData = c.getAssetData(a.refId), this._parent.constructor.call(this, a, b, c), this.globalData.addPendingElement()
        }

        function CVMaskElement(a, b) {
            this.data = a, this.element = b, this.dynamicProperties = [], this.masksProperties = this.data.masksProperties, this.viewData = new Array(this.masksProperties.length);
            var c, d = this.masksProperties.length;
            for (c = 0; c < d; c++) this.viewData[c] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[c], 3, this.dynamicProperties, null)
        }

        function CVShapeElement(a, b, c) {
            this.shapes = [], this.stylesList = [], this.viewData = [], this.shapeModifiers = [], this.shapesData = a.shapes, this.firstFrame = !0, this._parent.constructor.call(this, a, b, c)
        }

        function CVSolidElement(a, b, c) {
            this._parent.constructor.call(this, a, b, c)
        }

        function CVTextElement(a, b, c) {
            this.textSpans = [], this.yOffset = 0, this.fillColorAnim = !1, this.strokeColorAnim = !1, this.strokeWidthAnim = !1, this.stroke = !1, this.fill = !1, this.justifyOffset = 0, this.currentRender = null, this.renderType = "canvas", this.values = {
                fill: "rgba(0,0,0,0)",
                stroke: "rgba(0,0,0,0)",
                sWidth: 0,
                fValue: ""
            }, this._parent.constructor.call(this, a, b, c)
        }

        function HBaseElement(a, b, c, d, e) {
            this.globalData = c, this.comp = d, this.data = a, this.matteElement = null, this.parentContainer = b, this.layerId = e ? e.layerId : "ly_" + randomString(10), this.placeholder = e, this.init()
        }

        function HSolidElement(a, b, c, d, e) {
            this._parent.constructor.call(this, a, b, c, d, e)
        }

        function HCompElement(a, b, c, d, e) {
            this._parent.constructor.call(this, a, b, c, d, e), this.layers = a.layers, this.supports3d = !0, this.completeLayers = !1, this.pendingElements = [], this.elements = Array.apply(null, {
                length: this.layers.length
            }), this.data.tm && (this.tm = PropertyFactory.getProp(this, this.data.tm, 0, c.frameRate, this.dynamicProperties)), this.data.hasMask && (this.supports3d = !1), this.data.xt && (this.layerElement = document.createElement("div")), this.buildAllItems()
        }

        function HShapeElement(a, b, c, d, e) {
            this.shapes = [], this.shapeModifiers = [], this.shapesData = a.shapes, this.stylesList = [], this.viewData = [], this._parent.constructor.call(this, a, b, c, d, e), this.addedTransforms = {
                mdf: !1,
                mats: [this.finalTransform.mat]
            }, this.currentBBox = {
                x: 999999,
                y: -999999,
                h: 0,
                w: 0
            }
        }

        function HTextElement(a, b, c, d, e) {
            this.textSpans = [], this.textPaths = [], this.currentBBox = {
                x: 999999,
                y: -999999,
                h: 0,
                w: 0
            }, this.renderType = "svg", this.isMasked = !1, this._parent.constructor.call(this, a, b, c, d, e)
        }

        function HImageElement(a, b, c, d, e) {
            this.assetData = c.getAssetData(a.refId), this._parent.constructor.call(this, a, b, c, d, e)
        }

        function HCameraElement(a, b, c, d, e) {
            if (this._parent.constructor.call(this, a, b, c, d, e), this.pe = PropertyFactory.getProp(this, a.pe, 0, 0, this.dynamicProperties), a.ks.p.s ? (this.px = PropertyFactory.getProp(this, a.ks.p.x, 1, 0, this.dynamicProperties), this.py = PropertyFactory.getProp(this, a.ks.p.y, 1, 0, this.dynamicProperties), this.pz = PropertyFactory.getProp(this, a.ks.p.z, 1, 0, this.dynamicProperties)) : this.p = PropertyFactory.getProp(this, a.ks.p, 1, 0, this.dynamicProperties), a.ks.a && (this.a = PropertyFactory.getProp(this, a.ks.a, 1, 0, this.dynamicProperties)), a.ks.or.k.length) {
                var f, g = a.ks.or.k.length;
                for (f = 0; f < g; f += 1) a.ks.or.k[f].to = null, a.ks.or.k[f].ti = null
            }
            this.or = PropertyFactory.getProp(this, a.ks.or, 1, degToRads, this.dynamicProperties), this.or.sh = !0, this.rx = PropertyFactory.getProp(this, a.ks.rx, 0, degToRads, this.dynamicProperties), this.ry = PropertyFactory.getProp(this, a.ks.ry, 0, degToRads, this.dynamicProperties), this.rz = PropertyFactory.getProp(this, a.ks.rz, 0, degToRads, this.dynamicProperties), this.mat = new Matrix
        }

        function SliderEffect(a, b, c) {
            this.p = PropertyFactory.getProp(b, a.v, 0, 0, c)
        }

        function AngleEffect(a, b, c) {
            this.p = PropertyFactory.getProp(b, a.v, 0, 0, c)
        }

        function ColorEffect(a, b, c) {
            this.p = PropertyFactory.getProp(b, a.v, 1, 0, c)
        }

        function PointEffect(a, b, c) {
            this.p = PropertyFactory.getProp(b, a.v, 1, 0, c)
        }

        function LayerIndexEffect(a, b, c) {
            this.p = PropertyFactory.getProp(b, a.v, 0, 0, c)
        }

        function CheckboxEffect(a, b, c) {
            this.p = PropertyFactory.getProp(b, a.v, 1, 0, c)
        }

        function NoValueEffect() {
            this.p = {}
        }

        function EffectsManager(a, b, c) {
            var d = a.ef;
            this.effectElements = [];
            var e, f, g = d.length;
            for (e = 0; e < g; e++) f = new GroupEffect(d[e], b, c), this.effectElements.push(f)
        }

        function GroupEffect(a, b, c) {
            this.dynamicProperties = [], this.init(a, b, this.dynamicProperties), this.dynamicProperties.length && c.push(this)
        }

        function play(a) {
            animationManager.play(a)
        }

        function pause(a) {
            animationManager.pause(a)
        }

        function togglePause(a) {
            animationManager.togglePause(a)
        }

        function setSpeed(a, b) {
            animationManager.setSpeed(a, b)
        }

        function setDirection(a, b) {
            animationManager.setDirection(a, b)
        }

        function stop(a) {
            animationManager.stop(a)
        }

        function moveFrame(a) {
            animationManager.moveFrame(a)
        }

        function searchAnimations() {
            standalone === !0 ? animationManager.searchAnimations(animationData, standalone, renderer) : animationManager.searchAnimations()
        }

        function registerAnimation(a) {
            return animationManager.registerAnimation(a)
        }

        function resize() {
            animationManager.resize()
        }

        function start() {
            animationManager.start()
        }

        function goToAndStop(a, b, c) {
            animationManager.goToAndStop(a, b, c)
        }

        function setSubframeRendering(a) {
            subframeEnabled = a
        }

        function loadAnimation(a) {
            return standalone === !0 && (a.animationData = JSON.parse(animationData)), animationManager.loadAnimation(a)
        }

        function destroy(a) {
            return animationManager.destroy(a)
        }

        function setQuality(a) {
            if ("string" == typeof a) switch (a) {
                case "high":
                    defaultCurveSegments = 200;
                    break;
                case "medium":
                    defaultCurveSegments = 50;
                    break;
                case "low":
                    defaultCurveSegments = 10
            } else !isNaN(a) && a > 1 && (defaultCurveSegments = a);
            roundValues(!(defaultCurveSegments >= 50))
        }

        function installPlugin(a, b) {
            "expressions" === a && (expressionsPlugin = b)
        }

        function getFactory(a) {
            switch (a) {
                case "propertyFactory":
                    return PropertyFactory;
                case "shapePropertyFactory":
                    return ShapePropertyFactory;
                case "matrix":
                    return Matrix
            }
        }

        function checkReady() {
            "complete" === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations())
        }

        function getQueryVariable(a) {
            for (var b = queryString.split("&"), c = 0; c < b.length; c++) {
                var d = b[c].split("=");
                if (decodeURIComponent(d[0]) == a) return decodeURIComponent(d[1])
            }
        }
        var svgNS = "http://www.w3.org/2000/svg",
            subframeEnabled = !0,
            expressionsPlugin, isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
            cachedColors = {},
            bm_rounder = Math.round,
            bm_rnd, bm_pow = Math.pow,
            bm_sqrt = Math.sqrt,
            bm_abs = Math.abs,
            bm_floor = Math.floor,
            bm_max = Math.max,
            bm_min = Math.min,
            blitter = 10,
            BMMath = {};
        ! function() {
            var a, b = Object.getOwnPropertyNames(Math),
                c = b.length;
            for (a = 0; a < c; a += 1) BMMath[b[a]] = Math[b[a]]
        }(), BMMath.random = Math.random, BMMath.abs = function(a) {
            var b = typeof a;
            if ("object" === b && a.length) {
                var c, d = Array.apply(null, {
                        length: a.length
                    }),
                    e = a.length;
                for (c = 0; c < e; c += 1) d[c] = Math.abs(a[c]);
                return d
            }
            return Math.abs(a)
        };
        var defaultCurveSegments = 75,
            degToRads = Math.PI / 180,
            roundCorner = .5519;
        roundValues(!1);
        var rgbToHex = function() {
                var a, b, c = [];
                for (a = 0; a < 256; a += 1) b = a.toString(16), c[a] = 1 == b.length ? "0" + b : b;
                return function(a, b, d) {
                    return a < 0 && (a = 0), b < 0 && (b = 0), d < 0 && (d = 0), "#" + c[a] + c[b] + c[d]
                }
            }(),
            fillColorToString = function() {
                var a = [];
                return function(b, c) {
                    return void 0 !== c && (b[3] = c), a[b[0]] || (a[b[0]] = {}), a[b[0]][b[1]] || (a[b[0]][b[1]] = {}), a[b[0]][b[1]][b[2]] || (a[b[0]][b[1]][b[2]] = {}), a[b[0]][b[1]][b[2]][b[3]] || (a[b[0]][b[1]][b[2]][b[3]] = "rgba(" + b.join(",") + ")"), a[b[0]][b[1]][b[2]][b[3]]
                }
            }(),
            Matrix = function() {
                function a() {
                    return this.props[0] = 1, this.props[1] = 0, this.props[2] = 0, this.props[3] = 0, this.props[4] = 0, this.props[5] = 1, this.props[6] = 0, this.props[7] = 0, this.props[8] = 0, this.props[9] = 0, this.props[10] = 1, this.props[11] = 0, this.props[12] = 0, this.props[13] = 0, this.props[14] = 0, this.props[15] = 1, this
                }

                function b(a) {
                    if (0 === a) return this;
                    var b = Math.cos(a),
                        c = Math.sin(a);
                    return this._t(b, -c, 0, 0, c, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                }

                function c(a) {
                    if (0 === a) return this;
                    var b = Math.cos(a),
                        c = Math.sin(a);
                    return this._t(1, 0, 0, 0, 0, b, -c, 0, 0, c, b, 0, 0, 0, 0, 1)
                }

                function d(a) {
                    if (0 === a) return this;
                    var b = Math.cos(a),
                        c = Math.sin(a);
                    return this._t(b, 0, c, 0, 0, 1, 0, 0, -c, 0, b, 0, 0, 0, 0, 1)
                }

                function e(a) {
                    if (0 === a) return this;
                    var b = Math.cos(a),
                        c = Math.sin(a);
                    return this._t(b, -c, 0, 0, c, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                }

                function f(a, b) {
                    return this._t(1, b, a, 1, 0, 0)
                }

                function g(a, b) {
                    return this.shear(Math.tan(a), Math.tan(b))
                }

                function h(a, b) {
                    var c = Math.cos(b),
                        d = Math.sin(b);
                    return this._t(c, d, 0, 0, -d, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, Math.tan(a), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(c, -d, 0, 0, d, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                }

                function i(a, b, c) {
                    return c = isNaN(c) ? 1 : c, 1 == a && 1 == b && 1 == c ? this : this._t(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1)
                }

                function j(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
                    return this.props[0] = a, this.props[1] = b, this.props[2] = c, this.props[3] = d, this.props[4] = e, this.props[5] = f, this.props[6] = g, this.props[7] = h, this.props[8] = i, this.props[9] = j, this.props[10] = k, this.props[11] = l, this.props[12] = m, this.props[13] = n, this.props[14] = o, this.props[15] = p, this
                }

                function k(a, b, c) {
                    return c = c || 0, 0 !== a || 0 !== b || 0 !== c ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, a, b, c, 1) : this
                }

                function l(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
                    if (1 === a && 0 === b && 0 === c && 0 === d && 0 === e && 1 === f && 0 === g && 0 === h && 0 === i && 0 === j && 1 === k && 0 === l) return 0 === m && 0 === n && 0 === o || (this.props[12] = this.props[12] * a + this.props[13] * e + this.props[14] * i + this.props[15] * m, this.props[13] = this.props[12] * b + this.props[13] * f + this.props[14] * j + this.props[15] * n, this.props[14] = this.props[12] * c + this.props[13] * g + this.props[14] * k + this.props[15] * o, this.props[15] = this.props[12] * d + this.props[13] * h + this.props[14] * l + this.props[15] * p), this;
                    var q = this.props[0],
                        r = this.props[1],
                        s = this.props[2],
                        t = this.props[3],
                        u = this.props[4],
                        v = this.props[5],
                        w = this.props[6],
                        x = this.props[7],
                        y = this.props[8],
                        z = this.props[9],
                        A = this.props[10],
                        B = this.props[11],
                        C = this.props[12],
                        D = this.props[13],
                        E = this.props[14],
                        F = this.props[15];
                    return this.props[0] = q * a + r * e + s * i + t * m, this.props[1] = q * b + r * f + s * j + t * n, this.props[2] = q * c + r * g + s * k + t * o, this.props[3] = q * d + r * h + s * l + t * p, this.props[4] = u * a + v * e + w * i + x * m, this.props[5] = u * b + v * f + w * j + x * n, this.props[6] = u * c + v * g + w * k + x * o, this.props[7] = u * d + v * h + w * l + x * p, this.props[8] = y * a + z * e + A * i + B * m, this.props[9] = y * b + z * f + A * j + B * n, this.props[10] = y * c + z * g + A * k + B * o, this.props[11] = y * d + z * h + A * l + B * p, this.props[12] = C * a + D * e + E * i + F * m, this.props[13] = C * b + D * f + E * j + F * n, this.props[14] = C * c + D * g + E * k + F * o, this.props[15] = C * d + D * h + E * l + F * p, this
                }

                function m(a) {
                    var b;
                    for (b = 0; b < 16; b += 1) a.props[b] = this.props[b]
                }

                function n(a) {
                    var b;
                    for (b = 0; b < 16; b += 1) this.props[b] = a[b]
                }

                function o(a, b, c) {
                    return {
                        x: a * this.props[0] + b * this.props[4] + c * this.props[8] + this.props[12],
                        y: a * this.props[1] + b * this.props[5] + c * this.props[9] + this.props[13],
                        z: a * this.props[2] + b * this.props[6] + c * this.props[10] + this.props[14]
                    }
                }

                function p(a, b, c) {
                    return a * this.props[0] + b * this.props[4] + c * this.props[8] + this.props[12]
                }

                function q(a, b, c) {
                    return a * this.props[1] + b * this.props[5] + c * this.props[9] + this.props[13]
                }

                function r(a, b, c) {
                    return a * this.props[2] + b * this.props[6] + c * this.props[10] + this.props[14]
                }

                function s(a) {
                    var b, c = this.props[0] * this.props[5] - this.props[1] * this.props[4],
                        d = this.props[5] / c,
                        e = -this.props[1] / c,
                        f = -this.props[4] / c,
                        g = this.props[0] / c,
                        h = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / c,
                        i = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / c,
                        j = a.length,
                        k = [];
                    for (b = 0; b < j; b += 1) k[b] = [a[b][0] * d + a[b][1] * f + h, a[b][0] * e + a[b][1] * g + i, 0];
                    return k
                }

                function t(a, b, c) {
                    return [a * this.props[0] + b * this.props[4] + c * this.props[8] + this.props[12], a * this.props[1] + b * this.props[5] + c * this.props[9] + this.props[13], a * this.props[2] + b * this.props[6] + c * this.props[10] + this.props[14]]
                }

                function u(a, b) {
                    return bm_rnd(a * this.props[0] + b * this.props[4] + this.props[12]) + "," + bm_rnd(a * this.props[1] + b * this.props[5] + this.props[13])
                }

                function v() {
                    return [this.props[0], this.props[1], this.props[2], this.props[3], this.props[4], this.props[5], this.props[6], this.props[7], this.props[8], this.props[9], this.props[10], this.props[11], this.props[12], this.props[13], this.props[14], this.props[15]]
                }

                function w() {
                    return isSafari ? "matrix3d(" + roundTo2Decimals(this.props[0]) + "," + roundTo2Decimals(this.props[1]) + "," + roundTo2Decimals(this.props[2]) + "," + roundTo2Decimals(this.props[3]) + "," + roundTo2Decimals(this.props[4]) + "," + roundTo2Decimals(this.props[5]) + "," + roundTo2Decimals(this.props[6]) + "," + roundTo2Decimals(this.props[7]) + "," + roundTo2Decimals(this.props[8]) + "," + roundTo2Decimals(this.props[9]) + "," + roundTo2Decimals(this.props[10]) + "," + roundTo2Decimals(this.props[11]) + "," + roundTo2Decimals(this.props[12]) + "," + roundTo2Decimals(this.props[13]) + "," + roundTo2Decimals(this.props[14]) + "," + roundTo2Decimals(this.props[15]) + ")" : (this.cssParts[1] = this.props.join(","), this.cssParts.join(""))
                }

                function x() {
                    return "matrix(" + this.props[0] + "," + this.props[1] + "," + this.props[4] + "," + this.props[5] + "," + this.props[12] + "," + this.props[13] + ")"
                }

                function y() {
                    return "" + this.toArray()
                }
                return function() {
                    this.reset = a, this.rotate = b, this.rotateX = c, this.rotateY = d, this.rotateZ = e, this.skew = g, this.skewFromAxis = h, this.shear = f, this.scale = i, this.setTransform = j, this.translate = k, this.transform = l, this.applyToPoint = o, this.applyToX = p, this.applyToY = q, this.applyToZ = r, this.applyToPointArray = t, this.applyToPointStringified = u, this.toArray = v, this.toCSS = w, this.to2dCSS = x, this.toString = y, this.clone = m, this.cloneFromProps = n, this.inversePoints = s, this._t = this.transform, this.props = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], this.cssParts = ["matrix3d(", "", ")"]
                }
            }();
        ! function(a, b) {
            function c(c, j, k) {
                var n = [];
                j = 1 == j ? {
                    entropy: !0
                } : j || {};
                var s = g(f(j.entropy ? [c, i(a)] : null == c ? h() : c, 3), n),
                    t = new d(n),
                    u = function() {
                        for (var a = t.g(m), b = p, c = 0; a < q;) a = (a + c) * l, b *= l, c = t.g(1);
                        for (; a >= r;) a /= 2, b /= 2, c >>>= 1;
                        return (a + c) / b
                    };
                return u.int32 = function() {
                    return 0 | t.g(4)
                }, u.quick = function() {
                    return t.g(4) / 4294967296
                }, u["double"] = u, g(i(t.S), a), (j.pass || k || function(a, c, d, f) {
                    return f && (f.S && e(f, t), a.state = function() {
                        return e(t, {})
                    }), d ? (b[o] = a, c) : a
                })(u, s, "global" in j ? j.global : this == b, j.state)
            }

            function d(a) {
                var b, c = a.length,
                    d = this,
                    e = 0,
                    f = d.i = d.j = 0,
                    g = d.S = [];
                for (c || (a = [c++]); e < l;) g[e] = e++;
                for (e = 0; e < l; e++) g[e] = g[f = s & f + a[e % c] + (b = g[e])], g[f] = b;
                (d.g = function(a) {
                    for (var b, c = 0, e = d.i, f = d.j, g = d.S; a--;) b = g[e = s & e + 1], c = c * l + g[s & (g[e] = g[f = s & f + b]) + (g[f] = b)];
                    return d.i = e, d.j = f, c
                })(l)
            }

            function e(a, b) {
                return b.i = a.i, b.j = a.j, b.S = a.S.slice(), b
            }

            function f(a, b) {
                var c, d = [],
                    e = typeof a;
                if (b && "object" == e)
                    for (c in a) try {
                        d.push(f(a[c], b - 1))
                    } catch (g) {}
                return d.length ? d : "string" == e ? a : a + "\0"
            }

            function g(a, b) {
                for (var c, d = a + "", e = 0; e < d.length;) b[s & e] = s & (c ^= 19 * b[s & e]) + d.charCodeAt(e++);
                return i(b)
            }

            function h() {
                try {
                    if (j) return i(j.randomBytes(l));
                    var b = new Uint8Array(l);
                    return (k.crypto || k.msCrypto).getRandomValues(b), i(b)
                } catch (c) {
                    var d = k.navigator,
                        e = d && d.plugins;
                    return [+new Date, k, e, k.screen, i(a)]
                }
            }

            function i(a) {
                return String.fromCharCode.apply(0, a)
            }
            var j, k = this,
                l = 256,
                m = 6,
                n = 52,
                o = "random",
                p = b.pow(l, m),
                q = b.pow(2, n),
                r = 2 * q,
                s = l - 1;
            b["seed" + o] = c, g(b.random(), a)
        }([], BMMath);
        var BezierFactory = function() {
                function a(a, b, c, d, e) {
                    var f = e || ("bez_" + a + "_" + b + "_" + c + "_" + d).replace(/\./g, "p");
                    if (k[f]) return k[f];
                    var g = new i([a, b, c, d]);
                    return k[f] = g, g
                }

                function b(a, b) {
                    return 1 - 3 * b + 3 * a
                }

                function c(a, b) {
                    return 3 * b - 6 * a
                }

                function d(a) {
                    return 3 * a
                }

                function e(a, e, f) {
                    return ((b(e, f) * a + c(e, f)) * a + d(e)) * a
                }

                function f(a, e, f) {
                    return 3 * b(e, f) * a * a + 2 * c(e, f) * a + d(e)
                }

                function g(a, b, c, d, f) {
                    var g, h, i = 0;
                    do h = b + (c - b) / 2, g = e(h, d, f) - a, g > 0 ? c = h : b = h; while (Math.abs(g) > n && ++i < o);
                    return h
                }

                function h(a, b, c, d) {
                    for (var g = 0; g < l; ++g) {
                        var h = f(b, c, d);
                        if (0 === h) return b;
                        var i = e(b, c, d) - a;
                        b -= i / h
                    }
                    return b
                }

                function i(a) {
                    this._p = a, this._mSampleValues = r ? new Float32Array(p) : new Array(p), this._precomputed = !1, this.get = this.get.bind(this)
                }
                var j = {};
                j.getBezierEasing = a;
                var k = {},
                    l = 4,
                    m = .001,
                    n = 1e-7,
                    o = 10,
                    p = 11,
                    q = 1 / (p - 1),
                    r = "function" == typeof Float32Array;
                return i.prototype = {
                    get: function(a) {
                        var b = this._p[0],
                            c = this._p[1],
                            d = this._p[2],
                            f = this._p[3];
                        return this._precomputed || this._precompute(), b === c && d === f ? a : 0 === a ? 0 : 1 === a ? 1 : e(this._getTForX(a), c, f)
                    },
                    _precompute: function() {
                        var a = this._p[0],
                            b = this._p[1],
                            c = this._p[2],
                            d = this._p[3];
                        this._precomputed = !0, a === b && c === d || this._calcSampleValues()
                    },
                    _calcSampleValues: function() {
                        for (var a = this._p[0], b = this._p[2], c = 0; c < p; ++c) this._mSampleValues[c] = e(c * q, a, b)
                    },
                    _getTForX: function(a) {
                        for (var b = this._p[0], c = this._p[2], d = this._mSampleValues, e = 0, i = 1, j = p - 1; i !== j && d[i] <= a; ++i) e += q;
                        --i;
                        var k = (a - d[i]) / (d[i + 1] - d[i]),
                            l = e + k * q,
                            n = f(l, b, c);
                        return n >= m ? h(a, l, b, c) : 0 === n ? l : g(a, e, e + q, b, c)
                    }
                }, j
            }(),
            MatrixManager = matrixManagerFunction;
        ! function() {
            for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
            window.requestAnimationFrame || (window.requestAnimationFrame = function(b, c) {
                var d = (new Date).getTime(),
                    e = Math.max(0, 16 - (d - a)),
                    f = window.setTimeout(function() {
                        b(d + e)
                    }, e);
                return a = d + e, f
            }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
                clearTimeout(a)
            })
        }();
        var bez = bezFunction(),
            dataManager = dataFunctionManager(),
            FontManager = function() {
                function a(a, b) {
                    var c = document.createElement("span");
                    c.style.fontFamily = b;
                    var d = document.createElement("span");
                    d.innerHTML = "giItT1WQy@!-/#", c.style.position = "absolute", c.style.left = "-10000px", c.style.top = "-10000px", c.style.fontSize = "300px", c.style.fontVariant = "normal", c.style.fontStyle = "normal", c.style.fontWeight = "normal", c.style.letterSpacing = "0", c.appendChild(d), document.body.appendChild(c);
                    var e = d.offsetWidth;
                    return d.style.fontFamily = a + ", " + b, {
                        node: d,
                        w: e,
                        parent: c
                    }
                }

                function b() {
                    var a, c, d, e = this.fonts.length,
                        f = e;
                    for (a = 0; a < e; a += 1)
                        if (this.fonts[a].loaded) f -= 1;
                        else if ("t" === this.fonts[a].fOrigin) {
                        if (window.Typekit && window.Typekit.load && 0 === this.typekitLoaded) {
                            this.typekitLoaded = 1;
                            try {
                                window.Typekit.load({
                                    async: !0,
                                    active: function() {
                                        this.typekitLoaded = 2
                                    }.bind(this)
                                })
                            } catch (g) {}
                        }
                        2 === this.typekitLoaded && (this.fonts[a].loaded = !0)
                    } else "n" === this.fonts[a].fOrigin ? this.fonts[a].loaded = !0 : (c = this.fonts[a].monoCase.node, d = this.fonts[a].monoCase.w, c.offsetWidth !== d ? (f -= 1, this.fonts[a].loaded = !0) : (c = this.fonts[a].sansCase.node, d = this.fonts[a].sansCase.w, c.offsetWidth !== d && (f -= 1, this.fonts[a].loaded = !0)), this.fonts[a].loaded && (this.fonts[a].sansCase.parent.parentNode.removeChild(this.fonts[a].sansCase.parent), this.fonts[a].monoCase.parent.parentNode.removeChild(this.fonts[a].monoCase.parent)));
                    0 !== f && Date.now() - this.initTime < i ? setTimeout(b.bind(this), 20) : setTimeout(function() {
                        this.loaded = !0
                    }.bind(this), 0)
                }

                function c(a, b) {
                    var c = document.createElementNS(svgNS, "text");
                    c.style.fontSize = "100px", c.style.fontFamily = b.fFamily, c.textContent = "1", b.fClass ? (c.style.fontFamily = "inherit", c.className = b.fClass) : c.style.fontFamily = b.fFamily, a.appendChild(c);
                    var d = document.createElement("canvas").getContext("2d");
                    return d.font = "100px " + b.fFamily, d
                }

                function d(d, e) {
                    if (!d) return void(this.loaded = !0);
                    if (this.chars) return this.loaded = !0, void(this.fonts = d.list);
                    var f, g = d.list,
                        h = g.length;
                    for (f = 0; f < h; f += 1) {
                        if (g[f].loaded = !1, g[f].monoCase = a(g[f].fFamily, "monospace"), g[f].sansCase = a(g[f].fFamily, "sans-serif"), g[f].fPath) {
                            if ("p" === g[f].fOrigin) {
                                var i = document.createElement("style");
                                i.type = "text/css", i.innerHTML = "@font-face {font-family: " + g[f].fFamily + "; font-style: normal; src: url('" + g[f].fPath + "');}", e.appendChild(i)
                            } else if ("g" === g[f].fOrigin) {
                                var j = document.createElement("link");
                                j.type = "text/css", j.rel = "stylesheet", j.href = g[f].fPath, e.appendChild(j)
                            } else if ("t" === g[f].fOrigin) {
                                var k = document.createElement("script");
                                k.setAttribute("src", g[f].fPath), e.appendChild(k)
                            }
                        } else g[f].loaded = !0;
                        g[f].helper = c(e, g[f]), this.fonts.push(g[f])
                    }
                    b.bind(this)()
                }

                function e(a) {
                    if (a) {
                        this.chars || (this.chars = []);
                        var b, c, d, e = a.length,
                            f = this.chars.length;
                        for (b = 0; b < e; b += 1) {
                            for (c = 0, d = !1; c < f;) this.chars[c].style === a[b].style && this.chars[c].fFamily === a[b].fFamily && this.chars[c].ch === a[b].ch && (d = !0), c += 1;
                            d || (this.chars.push(a[b]), f += 1)
                        }
                    }
                }

                function f(a, b, c) {
                    for (var d = 0, e = this.chars.length; d < e;) {
                        if (this.chars[d].ch === a && this.chars[d].style === b && this.chars[d].fFamily === c) return this.chars[d];
                        d += 1
                    }
                }

                function g(a, b, c) {
                    var d = this.getFontByName(b),
                        e = d.helper;
                    return e.measureText(a).width * c / 100
                }

                function h(a) {
                    for (var b = 0, c = this.fonts.length; b < c;) {
                        if (this.fonts[b].fName === a) return this.fonts[b];
                        b += 1
                    }
                    return "sans-serif"
                }
                var i = 5e3,
                    j = function() {
                        this.fonts = [], this.chars = null, this.typekitLoaded = 0, this.loaded = !1, this.initTime = Date.now()
                    };
                return j.prototype.addChars = e, j.prototype.addFonts = d, j.prototype.getCharData = f, j.prototype.getFontByName = h, j.prototype.measureText = g, j
            }(),
            PropertyFactory = function() {
                function a() {
                    if (this.elem.globalData.frameId !== this.frameId) {
                        this.mdf = !1;
                        var a = this.comp.renderedFrame - this.offsetTime;
                        if (a === this.lastFrame || this.lastFrame !== j && (this.lastFrame >= this.keyframes[this.keyframes.length - 1].t - this.offsetTime && a >= this.keyframes[this.keyframes.length - 1].t - this.offsetTime || this.lastFrame < this.keyframes[0].t - this.offsetTime && a < this.keyframes[0].t - this.offsetTime));
                        else {
                            for (var b, c, d = 0, e = this.keyframes.length - 1, f = 1, g = !0; g;) {
                                if (b = this.keyframes[d], c = this.keyframes[d + 1], d == e - 1 && a >= c.t - this.offsetTime) {
                                    b.h && (b = c);
                                    break
                                }
                                if (c.t - this.offsetTime > a) break;
                                d < e - 1 ? d += f : g = !1
                            }
                            var h, i, k, l, m, n = 0;
                            if (b.to) {
                                b.bezierData || bez.buildBezierData(b);
                                var o = b.bezierData;
                                if (a >= c.t - this.offsetTime || a < b.t - this.offsetTime) {
                                    var p = a >= c.t - this.offsetTime ? o.points.length - 1 : 0;
                                    for (i = o.points[p].point.length, h = 0; h < i; h += 1) this.v[h] = this.mult ? o.points[p].point[h] * this.mult : o.points[p].point[h], this.pv[h] = o.points[p].point[h], this.lastPValue[h] !== this.pv[h] && (this.mdf = !0, this.lastPValue[h] = this.pv[h])
                                } else {
                                    b.__fnct ? m = b.__fnct : (m = BezierFactory.getBezierEasing(b.o.x, b.o.y, b.i.x, b.i.y, b.n).get, b.__fnct = m), k = m((a - (b.t - this.offsetTime)) / (c.t - this.offsetTime - (b.t - this.offsetTime)));
                                    var q, r = o.segmentLength * k,
                                        s = 0;
                                    for (f = 1, g = !0, l = o.points.length; g;) {
                                        if (s += o.points[n].partialLength * f, 0 === r || 0 === k || n == o.points.length - 1) {
                                            for (i = o.points[n].point.length, h = 0; h < i; h += 1) this.v[h] = this.mult ? o.points[n].point[h] * this.mult : o.points[n].point[h], this.pv[h] = o.points[n].point[h], this.lastPValue[h] !== this.pv[h] && (this.mdf = !0, this.lastPValue[h] = this.pv[h]);
                                            break
                                        }
                                        if (r >= s && r < s + o.points[n + 1].partialLength) {
                                            for (q = (r - s) / o.points[n + 1].partialLength, i = o.points[n].point.length, h = 0; h < i; h += 1) this.v[h] = this.mult ? (o.points[n].point[h] + (o.points[n + 1].point[h] - o.points[n].point[h]) * q) * this.mult : o.points[n].point[h] + (o.points[n + 1].point[h] - o.points[n].point[h]) * q, this.pv[h] = o.points[n].point[h] + (o.points[n + 1].point[h] - o.points[n].point[h]) * q, this.lastPValue[h] !== this.pv[h] && (this.mdf = !0, this.lastPValue[h] = this.pv[h]);
                                            break
                                        }
                                        n < l - 1 && 1 == f || n > 0 && f == -1 ? n += f : g = !1
                                    }
                                }
                            } else {
                                var t, u, v, w, x, y = !1;
                                for (e = b.s.length, d = 0; d < e; d += 1) {
                                    if (1 !== b.h && (b.o.x instanceof Array ? (y = !0, b.__fnct || (b.__fnct = []), b.__fnct[d] || (t = b.o.x[d] || b.o.x[0], u = b.o.y[d] || b.o.y[0], v = b.i.x[d] || b.i.x[0], w = b.i.y[d] || b.i.y[0])) : (y = !1, b.__fnct || (t = b.o.x, u = b.o.y, v = b.i.x, w = b.i.y)), y ? b.__fnct[d] ? m = b.__fnct[d] : (m = BezierFactory.getBezierEasing(t, u, v, w).get, b.__fnct[d] = m) : b.__fnct ? m = b.__fnct : (m = BezierFactory.getBezierEasing(t, u, v, w).get, b.__fnct = m), k = a >= c.t - this.offsetTime ? 1 : a < b.t - this.offsetTime ? 0 : m((a - (b.t - this.offsetTime)) / (c.t - this.offsetTime - (b.t - this.offsetTime)))), this.sh && 1 !== b.h) {
                                        var z = b.s[d],
                                            A = b.e[d];
                                        z - A < -180 ? z += 360 : z - A > 180 && (z -= 360), x = z + (A - z) * k
                                    } else x = 1 === b.h ? b.s[d] : b.s[d] + (b.e[d] - b.s[d]) * k;
                                    1 === e ? (this.v = this.mult ? x * this.mult : x, this.pv = x, this.lastPValue != this.pv && (this.mdf = !0, this.lastPValue = this.pv)) : (this.v[d] = this.mult ? x * this.mult : x, this.pv[d] = x, this.lastPValue[d] !== this.pv[d] && (this.mdf = !0, this.lastPValue[d] = this.pv[d]))
                                }
                            }
                        }
                        this.lastFrame = a, this.frameId = this.elem.globalData.frameId
                    }
                }

                function b() {}

                function c(a, c, d) {
                    this.mult = d, this.v = d ? c.k * d : c.k, this.pv = c.k, this.mdf = !1, this.comp = a.comp, this.k = !1, this.kf = !1, this.vel = 0, this.getValue = b
                }

                function d(a, c, d) {
                    this.mult = d, this.data = c, this.mdf = !1, this.comp = a.comp, this.k = !1, this.kf = !1, this.frameId = -1, this.v = new Array(c.k.length), this.pv = new Array(c.k.length), this.lastValue = new Array(c.k.length);
                    var e = Array.apply(null, {
                        length: c.k.length
                    });
                    this.vel = e.map(function() {
                        return 0
                    });
                    var f, g = c.k.length;
                    for (f = 0; f < g; f += 1) this.v[f] = d ? c.k[f] * d : c.k[f], this.pv[f] = c.k[f];
                    this.getValue = b
                }

                function e(b, c, d) {
                    this.keyframes = c.k, this.offsetTime = b.data.st, this.lastValue = -99999, this.lastPValue = -99999, this.frameId = -1, this.k = !0, this.kf = !0, this.data = c, this.mult = d, this.elem = b, this.comp = b.comp, this.lastFrame = j, this.v = d ? c.k[0].s[0] * d : c.k[0].s[0], this.pv = c.k[0].s[0], this.getValue = a
                }

                function f(b, c, d) {
                    var e, f, g, h, i, k = c.k.length;
                    for (e = 0; e < k - 1; e += 1) c.k[e].to && c.k[e].s && c.k[e].e && (f = c.k[e].s, g = c.k[e].e, h = c.k[e].to, i = c.k[e].ti, (2 === f.length && (f[0] !== g[0] || f[1] !== g[1]) && bez.pointOnLine2D(f[0], f[1], g[0], g[1], f[0] + h[0], f[1] + h[1]) && bez.pointOnLine2D(f[0], f[1], g[0], g[1], g[0] + i[0], g[1] + i[1]) || 3 === f.length && (f[0] !== g[0] || f[1] !== g[1] || f[2] !== g[2]) && bez.pointOnLine3D(f[0], f[1], f[2], g[0], g[1], g[2], f[0] + h[0], f[1] + h[1], f[2] + h[2]) && bez.pointOnLine3D(f[0], f[1], f[2], g[0], g[1], g[2], g[0] + i[0], g[1] + i[1], g[2] + i[2])) && (c.k[e].to = null, c.k[e].ti = null));
                    this.keyframes = c.k, this.offsetTime = b.data.st, this.k = !0, this.kf = !0, this.mult = d, this.elem = b, this.comp = b.comp, this.getValue = a, this.frameId = -1, this.v = new Array(c.k[0].s.length), this.pv = new Array(c.k[0].s.length), this.lastValue = new Array(c.k[0].s.length), this.lastPValue = new Array(c.k[0].s.length), this.lastFrame = j
                }

                function g(a, b, g, h, i) {
                    var j;
                    if (2 === g) j = new k(a, b, i);
                    else if (b.k.length)
                        if ("number" == typeof b.k[0]) j = new d(a, b, h);
                        else switch (g) {
                            case 0:
                                j = new e(a, b, h);
                                break;
                            case 1:
                                j = new f(a, b, h)
                        } else j = new c(a, b, h);
                    return j.k && i.push(j), j
                }

                function h(a, b, c, d) {
                    return new m(a, b, c, d)
                }

                function i(a, b, c) {
                    return new n(a, b, c)
                }
                var j = -999999,
                    k = function() {
                        function a() {
                            return this.p.k && this.p.getValue(), this.p.v.key || (this.p.v.key = function(a) {
                                return this.p.v.numKeys ? this.p.keyframes[a - 1].t : 0
                            }.bind(this)), this.p.v.numKeys || (this.p.v.numKeys = this.p.keyframes ? this.p.keyframes.length : 0), this.p.v.valueAtTime || (this.p.v.valueAtTime = this.p.getValueAtTime.bind(this.p)), this.p.v
                        }

                        function b() {
                            return this.px.k && this.px.getValue(), this.px.v
                        }

                        function c() {
                            return this.py.k && this.py.getValue(), this.py.v
                        }

                        function d() {
                            return this.a.k && this.a.getValue(), this.a.v
                        }

                        function e() {
                            return this.or.k && this.or.getValue(), this.or.v
                        }

                        function f() {
                            return this.r.k && this.r.getValue(), this.r.v / degToRads
                        }

                        function g() {
                            return this.s.k && this.s.getValue(), this.s.v
                        }

                        function h() {
                            return this.o.k && this.o.getValue(), this.o.v
                        }

                        function i() {
                            return this.sk.k && this.sk.getValue(), this.sk.v
                        }

                        function j() {
                            return this.sa.k && this.sa.getValue(), this.sa.v
                        }

                        function k(a) {
                            var b, c = this.dynamicProperties.length;
                            for (b = 0; b < c; b += 1) this.dynamicProperties[b].getValue(), this.dynamicProperties[b].mdf && (this.mdf = !0);
                            this.a && a.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && a.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.r ? a.rotate(-this.r.v) : a.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? this.data.p.z ? a.translate(this.px.v, this.py.v, -this.pz.v) : a.translate(this.px.v, this.py.v, 0) : a.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                        }

                        function l() {
                            if (this.elem.globalData.frameId !== this.frameId) {
                                this.mdf = !1;
                                var a, b = this.dynamicProperties.length;
                                for (a = 0; a < b; a += 1) this.dynamicProperties[a].getValue(), this.dynamicProperties[a].mdf && (this.mdf = !0);
                                if (this.mdf) {
                                    if (this.v.reset(), this.a && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r ? this.v.rotate(-this.r.v) : this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.autoOriented && this.p.keyframes && this.p.getValueAtTime) {
                                        var c, d;
                                        this.p.lastFrame + this.p.offsetTime < this.p.keyframes[0].t ? (c = this.p.getValueAtTime(this.p.keyframes[0].t + .01, 0), d = this.p.getValueAtTime(this.p.keyframes[0].t, 0)) : this.p.lastFrame + this.p.offsetTime > this.p.keyframes[this.p.keyframes.length - 1].t ? (c = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t, 0), d = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t - .01, 0)) : (c = this.p.pv, d = this.p.getValueAtTime(this.p.lastFrame + this.p.offsetTime - .01, this.p.offsetTime)), this.v.rotate(-Math.atan2(c[1] - d[1], c[0] - d[0]))
                                    }
                                    this.data.p.s ? this.data.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])
                                }
                                this.frameId = this.elem.globalData.frameId
                            }
                        }

                        function m() {
                            this.inverted = !0, this.iv = new Matrix, this.k || (this.data.p.s ? this.iv.translate(this.px.v, this.py.v, -this.pz.v) : this.iv.translate(this.p.v[0], this.p.v[1], -this.p.v[2]), this.r ? this.iv.rotate(-this.r.v) : this.iv.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.s && this.iv.scale(this.s.v[0], this.s.v[1], 1), this.a && this.iv.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]))
                        }

                        function n() {}
                        return function(o, p, q) {
                            this.elem = o, this.frameId = -1, this.dynamicProperties = [], this.mdf = !1, this.data = p, this.getValue = l, this.applyToMatrix = k, this.setInverted = m, this.autoOrient = n, this.v = new Matrix, p.p.s ? (this.px = PropertyFactory.getProp(o, p.p.x, 0, 0, this.dynamicProperties), this.py = PropertyFactory.getProp(o, p.p.y, 0, 0, this.dynamicProperties), p.p.z && (this.pz = PropertyFactory.getProp(o, p.p.z, 0, 0, this.dynamicProperties))) : this.p = PropertyFactory.getProp(o, p.p, 1, 0, this.dynamicProperties), p.r ? this.r = PropertyFactory.getProp(o, p.r, 0, degToRads, this.dynamicProperties) : p.rx && (this.rx = PropertyFactory.getProp(o, p.rx, 0, degToRads, this.dynamicProperties), this.ry = PropertyFactory.getProp(o, p.ry, 0, degToRads, this.dynamicProperties), this.rz = PropertyFactory.getProp(o, p.rz, 0, degToRads, this.dynamicProperties), this.or = PropertyFactory.getProp(o, p.or, 0, degToRads, this.dynamicProperties)), p.sk && (this.sk = PropertyFactory.getProp(o, p.sk, 0, degToRads, this.dynamicProperties), this.sa = PropertyFactory.getProp(o, p.sa, 0, degToRads, this.dynamicProperties)), p.a && (this.a = PropertyFactory.getProp(o, p.a, 1, 0, this.dynamicProperties)), p.s && (this.s = PropertyFactory.getProp(o, p.s, 1, .01, this.dynamicProperties)), p.o ? this.o = PropertyFactory.getProp(o, p.o, 0, .01, q) : this.o = {
                                mdf: !1,
                                v: 1
                            }, this.dynamicProperties.length ? q.push(this) : (this.a && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]), this.s && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]), this.sk && this.v.skewFromAxis(-this.sk.v, this.sa.v), this.r ? this.v.rotate(-this.r.v) : this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]), this.data.p.s ? p.p.z ? this.v.translate(this.px.v, this.py.v, -this.pz.v) : this.v.translate(this.px.v, this.py.v, 0) : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2])), Object.defineProperty(this, "position", {
                                get: a
                            }), Object.defineProperty(this, "xPosition", {
                                get: b
                            }), Object.defineProperty(this, "yPosition", {
                                get: c
                            }), Object.defineProperty(this, "orientation", {
                                get: e
                            }), Object.defineProperty(this, "anchorPoint", {
                                get: d
                            }), Object.defineProperty(this, "rotation", {
                                get: f
                            }), Object.defineProperty(this, "scale", {
                                get: g
                            }), Object.defineProperty(this, "opacity", {
                                get: h
                            }), Object.defineProperty(this, "skew", {
                                get: i
                            }), Object.defineProperty(this, "skewAxis", {
                                get: j
                            })
                        }
                    }(),
                    l = function() {
                        function a(a) {
                            if (this.prop.getValue(), this.cmdf = !1, this.omdf = !1, this.prop.mdf || a) {
                                var b, c, d, e = 4 * this.data.p;
                                for (b = 0; b < e; b += 1) c = b % 4 === 0 ? 100 : 255, d = Math.round(this.prop.v[b] * c), this.c[b] !== d && (this.c[b] = d, this.cmdf = !0);
                                if (this.o.length)
                                    for (e = this.prop.v.length, b = 4 * this.data.p; b < e; b += 1) c = b % 2 === 0 ? 100 : 1, d = b % 2 === 0 ? Math.round(100 * this.prop.v[b]) : this.prop.v[b], this.o[b - 4 * this.data.p] !== d && (this.o[b - 4 * this.data.p] = d, this.omdf = !0)
                            }
                        }

                        function b(b, c, d) {
                            this.prop = g(b, c.k, 1, null, []), this.data = c, this.k = this.prop.k, this.c = Array.apply(null, {
                                length: 4 * c.p
                            });
                            var e = c.k.k[0].s ? c.k.k[0].s.length - 4 * c.p : c.k.k.length - 4 * c.p;
                            this.o = Array.apply(null, {
                                length: e
                            }), this.cmdf = !1, this.omdf = !1, this.getValue = a, this.prop.k && d.push(this), this.getValue(!0)
                        }
                        return function(a, c, d) {
                            return new b(a, c, d)
                        }
                    }(),
                    m = function() {
                        function a(a) {
                            var b = 0,
                                c = this.dataProps.length;
                            if (this.elem.globalData.frameId !== this.frameId || a) {
                                for (this.mdf = !1, this.frameId = this.elem.globalData.frameId; b < c;) {
                                    if (this.dataProps[b].p.mdf) {
                                        this.mdf = !0;
                                        break
                                    }
                                    b += 1
                                }
                                if (this.mdf || a)
                                    for ("svg" === this.renderer && (this.dasharray = ""), b = 0; b < c; b += 1) "o" != this.dataProps[b].n ? "svg" === this.renderer ? this.dasharray += " " + this.dataProps[b].p.v : this.dasharray[b] = this.dataProps[b].p.v : this.dashoffset = this.dataProps[b].p.v
                            }
                        }
                        return function(b, c, d, e) {
                            this.elem = b, this.frameId = -1, this.dataProps = new Array(c.length), this.renderer = d, this.mdf = !1, this.k = !1, "svg" === this.renderer ? this.dasharray = "" : this.dasharray = new Array(c.length - 1), this.dashoffset = 0;
                            var f, g, h = c.length;
                            for (f = 0; f < h; f += 1) g = PropertyFactory.getProp(b, c[f].v, 0, 0, e), this.k = !!g.k || this.k, this.dataProps[f] = {
                                n: c[f].n,
                                p: g
                            };
                            this.getValue = a, this.k ? e.push(this) : this.getValue(!0)
                        }
                    }(),
                    n = function() {
                        function a() {
                            if (this.dynamicProperties.length) {
                                var a, b = this.dynamicProperties.length;
                                for (a = 0; a < b; a += 1) this.dynamicProperties[a].getValue(), this.dynamicProperties[a].mdf && (this.mdf = !0)
                            }
                            var c = this.data.totalChars,
                                d = 2 === this.data.r ? 1 : 100 / c,
                                e = this.o.v / d,
                                f = this.s.v / d + e,
                                g = this.e.v / d + e;
                            if (f > g) {
                                var h = f;
                                f = g, g = h
                            }
                            this.finalS = f, this.finalE = g
                        }

                        function b(a) {
                            var b = BezierFactory.getBezierEasing(this.ne.v / 100, 0, 1 - this.xe.v / 100, 1).get,
                                f = 0,
                                g = this.finalS,
                                h = this.finalE,
                                i = this.data.sh;
                            if (2 == i) f = h === g ? a >= h ? 1 : 0 : c(0, d(.5 / (h - g) + (a - g) / (h - g), 1)), f = b(f);
                            else if (3 == i) f = h === g ? a >= h ? 0 : 1 : 1 - c(0, d(.5 / (h - g) + (a - g) / (h - g), 1)), f = b(f);
                            else if (4 == i) h === g ? f = a >= h ? 0 : 1 : (f = c(0, d(.5 / (h - g) + (a - g) / (h - g), 1)), f < .5 ? f *= 2 : f = 1 - 2 * (f - .5)), f = b(f);
                            else if (5 == i) {
                                if (h === g) f = a >= h ? 0 : 1;
                                else {
                                    var j = h - g;
                                    a = d(c(0, a + .5 - g), h - g);
                                    var k = -j / 2 + a,
                                        l = j / 2;
                                    f = Math.sqrt(1 - k * k / (l * l))
                                }
                                f = b(f)
                            } else 6 == i ? (h === g ? f = a >= h ? 0 : 1 : (a = d(c(0, a + .5 - g), h - g), f = (1 + Math.cos(Math.PI + 2 * Math.PI * a / (h - g))) / 2), f = b(f)) : (a >= e(g) && (f = a - g < 0 ? 1 - (g - a) : c(0, d(h - a, 1))), f = b(f));
                            return f * this.a.v
                        }
                        var c = Math.max,
                            d = Math.min,
                            e = Math.floor;
                        return this.mdf = !1,
                            function(c, d, e) {
                                this.mdf = !1, this.k = !1, this.data = d, this.dynamicProperties = [], this.getValue = a, this.getMult = b, this.comp = c.comp, this.finalS = 0, this.finalE = 0, this.s = PropertyFactory.getProp(c, d.s || {
                                    k: 0
                                }, 0, 0, this.dynamicProperties), "e" in d ? this.e = PropertyFactory.getProp(c, d.e, 0, 0, this.dynamicProperties) : this.e = {
                                    v: 2 === d.r ? d.totalChars : 100
                                }, this.o = PropertyFactory.getProp(c, d.o || {
                                    k: 0
                                }, 0, 0, this.dynamicProperties), this.xe = PropertyFactory.getProp(c, d.xe || {
                                    k: 0
                                }, 0, 0, this.dynamicProperties), this.ne = PropertyFactory.getProp(c, d.ne || {
                                    k: 0
                                }, 0, 0, this.dynamicProperties), this.a = PropertyFactory.getProp(c, d.a, 0, .01, this.dynamicProperties), this.dynamicProperties.length ? e.push(this) : this.getValue()
                            }
                    }(),
                    o = {};
                return o.getProp = g, o.getDashProp = h, o.getTextSelectorProp = i, o.getGradientProp = l, o
            }(),
            ShapePropertyFactory = function() {
                function a() {
                    if (this.elem.globalData.frameId !== this.frameId) {
                        this.mdf = !1;
                        var a = this.comp.renderedFrame - this.offsetTime;
                        if (this.lastFrame !== g && (this.lastFrame < this.keyframes[0].t - this.offsetTime && a < this.keyframes[0].t - this.offsetTime || this.lastFrame > this.keyframes[this.keyframes.length - 1].t - this.offsetTime && a > this.keyframes[this.keyframes.length - 1].t - this.offsetTime));
                        else {
                            var b, c, d;
                            if (a < this.keyframes[0].t - this.offsetTime) b = this.keyframes[0].s[0], d = !0;
                            else if (a >= this.keyframes[this.keyframes.length - 1].t - this.offsetTime) b = 1 === this.keyframes[this.keyframes.length - 2].h ? this.keyframes[this.keyframes.length - 1].s[0] : this.keyframes[this.keyframes.length - 2].e[0], d = !0;
                            else {
                                for (var e, f, h, i, j, k, l = 0, m = this.keyframes.length - 1, n = !0; n && (e = this.keyframes[l], f = this.keyframes[l + 1], !(f.t - this.offsetTime > a));) l < m - 1 ? l += 1 : n = !1;
                                d = 1 === e.h, d && l === m && (e = f);
                                var o;
                                if (!d) {
                                    var p;
                                    e.__fnct ? p = e.__fnct : (p = BezierFactory.getBezierEasing(e.o.x, e.o.y, e.i.x, e.i.y).get, e.__fnct = p), o = a >= f.t - this.offsetTime ? 1 : a < e.t - this.offsetTime ? 0 : p((a - (e.t - this.offsetTime)) / (f.t - this.offsetTime - (e.t - this.offsetTime))), c = e.e[0]
                                }
                                b = e.s[0]
                            }
                            i = this.v.i.length, k = b.i[0].length;
                            var q, r = !1;
                            for (h = 0; h < i; h += 1)
                                for (j = 0; j < k; j += 1) d ? (q = b.i[h][j], this.v.i[h][j] !== q && (this.v.i[h][j] = q, this.pv.i[h][j] = q, r = !0), q = b.o[h][j], this.v.o[h][j] !== q && (this.v.o[h][j] = q, this.pv.o[h][j] = q, r = !0), q = b.v[h][j], this.v.v[h][j] !== q && (this.v.v[h][j] = q, this.pv.v[h][j] = q, r = !0)) : (q = b.i[h][j] + (c.i[h][j] - b.i[h][j]) * o, this.v.i[h][j] !== q && (this.v.i[h][j] = q, this.pv.i[h][j] = q, r = !0), q = b.o[h][j] + (c.o[h][j] - b.o[h][j]) * o, this.v.o[h][j] !== q && (this.v.o[h][j] = q, this.pv.o[h][j] = q, r = !0), q = b.v[h][j] + (c.v[h][j] - b.v[h][j]) * o, this.v.v[h][j] !== q && (this.v.v[h][j] = q, this.pv.v[h][j] = q, r = !0));
                            this.mdf = r, this.paths.length = 0, this.v.c = b.c, this.paths[0] = this.v
                        }
                        this.lastFrame = a, this.frameId = this.elem.globalData.frameId
                    }
                }

                function b() {
                    return this.v
                }

                function c() {
                    this.resetPaths.length = 1, this.resetPaths[0] = this.v, this.paths = this.resetPaths, this.k || (this.mdf = !1)
                }

                function d(a, d, e) {
                    this.resetPaths = [], this.comp = a.comp, this.k = !1, this.mdf = !1, this.numNodes = 3 === e ? d.pt.k.v.length : d.ks.k.v.length, this.v = 3 === e ? d.pt.k : d.ks.k, this.getValue = b, this.pv = this.v, this.paths = [this.v], this.reset = c
                }

                function e(b, d, e) {
                    this.resetPaths = [], this.comp = b.comp, this.elem = b, this.offsetTime = b.data.st, this.getValue = a, this.keyframes = 3 === e ? d.pt.k : d.ks.k, this.k = !0;
                    var f, h = this.keyframes[0].s[0].i.length,
                        i = this.keyframes[0].s[0].i[0].length;
                    for (this.numNodes = h, this.v = {
                            i: Array.apply(null, {
                                length: h
                            }),
                            o: Array.apply(null, {
                                length: h
                            }),
                            v: Array.apply(null, {
                                length: h
                            }),
                            c: this.keyframes[0].s[0].c
                        }, this.pv = {
                            i: Array.apply(null, {
                                length: h
                            }),
                            o: Array.apply(null, {
                                length: h
                            }),
                            v: Array.apply(null, {
                                length: h
                            }),
                            c: this.keyframes[0].s[0].c
                        }, f = 0; f < h; f += 1) this.v.i[f] = Array.apply(null, {
                        length: i
                    }), this.v.o[f] = Array.apply(null, {
                        length: i
                    }), this.v.v[f] = Array.apply(null, {
                        length: i
                    }), this.pv.i[f] = Array.apply(null, {
                        length: i
                    }), this.pv.o[f] = Array.apply(null, {
                        length: i
                    }), this.pv.v[f] = Array.apply(null, {
                        length: i
                    });
                    this.paths = [], this.lastFrame = g, this.reset = c
                }

                function f(a, b, c, f) {
                    var g;
                    if (3 === c || 4 === c) {
                        var k = 3 === c ? b.pt.k : b.ks.k;
                        g = k.length ? new e(a, b, c) : new d(a, b, c)
                    } else 5 === c ? g = new j(a, b) : 6 === c ? g = new h(a, b) : 7 === c && (g = new i(a, b));
                    return g.k && f.push(g), g
                }
                var g = -999999,
                    h = function() {
                        function a() {
                            var a = this.p.v[0],
                                b = this.p.v[1],
                                c = this.s.v[0] / 2,
                                e = this.s.v[1] / 2;
                            2 !== this.d && 3 !== this.d ? (this.v.v[0] = [a, b - e], this.v.i[0] = [a - c * d, b - e], this.v.o[0] = [a + c * d, b - e], this.v.v[1] = [a + c, b], this.v.i[1] = [a + c, b - e * d], this.v.o[1] = [a + c, b + e * d], this.v.v[2] = [a, b + e], this.v.i[2] = [a + c * d, b + e], this.v.o[2] = [a - c * d, b + e], this.v.v[3] = [a - c, b], this.v.i[3] = [a - c, b + e * d], this.v.o[3] = [a - c, b - e * d]) : (this.v.v[0] = [a, b - e], this.v.o[0] = [a - c * d, b - e], this.v.i[0] = [a + c * d, b - e], this.v.v[1] = [a - c, b], this.v.o[1] = [a - c, b + e * d], this.v.i[1] = [a - c, b - e * d], this.v.v[2] = [a, b + e], this.v.o[2] = [a + c * d, b + e], this.v.i[2] = [a - c * d, b + e], this.v.v[3] = [a + c, b], this.v.o[3] = [a + c, b - e * d], this.v.i[3] = [a + c, b + e * d]), this.paths.length = 0, this.paths[0] = this.v
                        }

                        function b(a) {
                            var b, c = this.dynamicProperties.length;
                            if (this.elem.globalData.frameId !== this.frameId) {
                                for (this.mdf = !1, this.frameId = this.elem.globalData.frameId, b = 0; b < c; b += 1) this.dynamicProperties[b].getValue(a), this.dynamicProperties[b].mdf && (this.mdf = !0);
                                this.mdf && (this.convertEllToPath(), this.paths.length = 0, this.paths[0] = this.v)
                            }
                        }
                        var d = roundCorner;
                        return function(d, e) {
                            this.v = {
                                v: Array.apply(null, {
                                    length: 4
                                }),
                                i: Array.apply(null, {
                                    length: 4
                                }),
                                o: Array.apply(null, {
                                    length: 4
                                }),
                                c: !0
                            }, this.numNodes = 4, this.d = e.d, this.dynamicProperties = [], this.resetPaths = [], this.paths = [], this.elem = d, this.comp = d.comp, this.frameId = -1, this.mdf = !1, this.getValue = b, this.convertEllToPath = a, this.reset = c, this.p = PropertyFactory.getProp(d, e.p, 1, 0, this.dynamicProperties), this.s = PropertyFactory.getProp(d, e.s, 1, 0, this.dynamicProperties), this.dynamicProperties.length ? this.k = !0 : this.convertEllToPath()
                        }
                    }(),
                    i = function() {
                        function a() {
                            var a = Math.floor(this.pt.v),
                                b = 2 * Math.PI / a;
                            this.v.v.length = a, this.v.i.length = a, this.v.o.length = a;
                            var c, d = this.or.v,
                                e = this.os.v,
                                f = 2 * Math.PI * d / (4 * a),
                                g = -Math.PI / 2,
                                h = 3 === this.data.d ? -1 : 1;
                            for (g += this.r.v, c = 0; c < a; c += 1) {
                                var i = d * Math.cos(g),
                                    j = d * Math.sin(g),
                                    k = 0 === i && 0 === j ? 0 : j / Math.sqrt(i * i + j * j),
                                    l = 0 === i && 0 === j ? 0 : -i / Math.sqrt(i * i + j * j);
                                i += +this.p.v[0], j += +this.p.v[1], this.v.v[c] = [i, j], this.v.i[c] = [i + k * f * e * h, j + l * f * e * h], this.v.o[c] = [i - k * f * e * h, j - l * f * e * h], g += b * h
                            }
                            this.numNodes = a, this.paths.length = 0, this.paths[0] = this.v
                        }

                        function b() {
                            var a = 2 * Math.floor(this.pt.v),
                                b = 2 * Math.PI / a;
                            this.v.v.length = a, this.v.i.length = a, this.v.o.length = a;
                            var c, d, e, f, g = !0,
                                h = this.or.v,
                                i = this.ir.v,
                                j = this.os.v,
                                k = this.is.v,
                                l = 2 * Math.PI * h / (2 * a),
                                m = 2 * Math.PI * i / (2 * a),
                                n = -Math.PI / 2;
                            n += this.r.v;
                            var o = 3 === this.data.d ? -1 : 1;
                            for (c = 0; c < a; c += 1) {
                                d = g ? h : i, e = g ? j : k, f = g ? l : m;
                                var p = d * Math.cos(n),
                                    q = d * Math.sin(n),
                                    r = 0 === p && 0 === q ? 0 : q / Math.sqrt(p * p + q * q),
                                    s = 0 === p && 0 === q ? 0 : -p / Math.sqrt(p * p + q * q);
                                p += +this.p.v[0], q += +this.p.v[1], this.v.v[c] = [p, q], this.v.i[c] = [p + r * f * e * o, q + s * f * e * o], this.v.o[c] = [p - r * f * e * o, q - s * f * e * o], g = !g, n += b * o
                            }
                            this.numNodes = a, this.paths.length = 0, this.paths[0] = this.v
                        }

                        function d() {
                            if (this.elem.globalData.frameId !== this.frameId) {
                                this.mdf = !1, this.frameId = this.elem.globalData.frameId;
                                var a, b = this.dynamicProperties.length;
                                for (a = 0; a < b; a += 1) this.dynamicProperties[a].getValue(), this.dynamicProperties[a].mdf && (this.mdf = !0);
                                this.mdf && this.convertToPath()
                            }
                        }
                        return function(e, f) {
                            this.v = {
                                v: [],
                                i: [],
                                o: [],
                                c: !0
                            }, this.resetPaths = [], this.elem = e, this.comp = e.comp, this.data = f, this.frameId = -1, this.d = f.d, this.dynamicProperties = [], this.mdf = !1, this.getValue = d, this.reset = c, 1 === f.sy ? (this.ir = PropertyFactory.getProp(e, f.ir, 0, 0, this.dynamicProperties), this.is = PropertyFactory.getProp(e, f.is, 0, .01, this.dynamicProperties), this.convertToPath = b) : this.convertToPath = a, this.pt = PropertyFactory.getProp(e, f.pt, 0, 0, this.dynamicProperties), this.p = PropertyFactory.getProp(e, f.p, 1, 0, this.dynamicProperties), this.r = PropertyFactory.getProp(e, f.r, 0, degToRads, this.dynamicProperties), this.or = PropertyFactory.getProp(e, f.or, 0, 0, this.dynamicProperties), this.os = PropertyFactory.getProp(e, f.os, 0, .01, this.dynamicProperties), this.paths = [], this.dynamicProperties.length ? this.k = !0 : this.convertToPath()
                        }
                    }(),
                    j = function() {
                        function a(a) {
                            if (this.elem.globalData.frameId !== this.frameId) {
                                this.mdf = !1, this.frameId = this.elem.globalData.frameId;
                                var b, c = this.dynamicProperties.length;
                                for (b = 0; b < c; b += 1) this.dynamicProperties[b].getValue(a), this.dynamicProperties[b].mdf && (this.mdf = !0);
                                this.mdf && this.convertRectToPath()
                            }
                        }

                        function b() {
                            var a = this.p.v[0],
                                b = this.p.v[1],
                                c = this.s.v[0] / 2,
                                d = this.s.v[1] / 2,
                                e = bm_min(c, d, this.r.v),
                                f = e * (1 - roundCorner);
                            0 === e ? (this.v.v.length = 4, this.v.i.length = 4, this.v.o.length = 4) : (this.v.v.length = 8, this.v.i.length = 8, this.v.o.length = 8), 2 === this.d || 1 === this.d ? (this.v.v[0] = [a + c, b - d + e], this.v.o[0] = this.v.v[0], this.v.i[0] = [a + c, b - d + f], this.v.v[1] = [a + c, b + d - e], this.v.o[1] = [a + c, b + d - f], this.v.i[1] = this.v.v[1], 0 !== e ? (this.v.v[2] = [a + c - e, b + d], this.v.o[2] = this.v.v[2], this.v.i[2] = [a + c - f, b + d], this.v.v[3] = [a - c + e, b + d], this.v.o[3] = [a - c + f, b + d], this.v.i[3] = this.v.v[3], this.v.v[4] = [a - c, b + d - e], this.v.o[4] = this.v.v[4], this.v.i[4] = [a - c, b + d - f], this.v.v[5] = [a - c, b - d + e], this.v.o[5] = [a - c, b - d + f], this.v.i[5] = this.v.v[5], this.v.v[6] = [a - c + e, b - d], this.v.o[6] = this.v.v[6], this.v.i[6] = [a - c + f, b - d], this.v.v[7] = [a + c - e, b - d], this.v.o[7] = [a + c - f, b - d], this.v.i[7] = this.v.v[7]) : (this.v.v[2] = [a - c + e, b + d], this.v.o[2] = [a - c + f, b + d], this.v.i[2] = this.v.v[2], this.v.v[3] = [a - c, b - d + e], this.v.o[3] = [a - c, b - d + f], this.v.i[3] = this.v.v[3])) : (this.v.v[0] = [a + c, b - d + e], this.v.o[0] = [a + c, b - d + f], this.v.i[0] = this.v.v[0], 0 !== e ? (this.v.v[1] = [a + c - e, b - d], this.v.o[1] = this.v.v[1], this.v.i[1] = [a + c - f, b - d], this.v.v[2] = [a - c + e, b - d], this.v.o[2] = [a - c + f, b - d], this.v.i[2] = this.v.v[2], this.v.v[3] = [a - c, b - d + e], this.v.o[3] = this.v.v[3], this.v.i[3] = [a - c, b - d + f], this.v.v[4] = [a - c, b + d - e], this.v.o[4] = [a - c, b + d - f], this.v.i[4] = this.v.v[4], this.v.v[5] = [a - c + e, b + d], this.v.o[5] = this.v.v[5], this.v.i[5] = [a - c + f, b + d], this.v.v[6] = [a + c - e, b + d], this.v.o[6] = [a + c - f, b + d], this.v.i[6] = this.v.v[6], this.v.v[7] = [a + c, b + d - e], this.v.o[7] = this.v.v[7], this.v.i[7] = [a + c, b + d - f]) : (this.v.v[1] = [a - c + e, b - d], this.v.o[1] = [a - c + f, b - d], this.v.i[1] = this.v.v[1], this.v.v[2] = [a - c, b + d - e], this.v.o[2] = [a - c, b + d - f], this.v.i[2] = this.v.v[2], this.v.v[3] = [a + c - e, b + d], this.v.o[3] = [a + c - f, b + d], this.v.i[3] = this.v.v[3])), this.paths.length = 0, this.paths[0] = this.v
                        }
                        return function(d, e) {
                            this.v = {
                                v: Array.apply(null, {
                                    length: 8
                                }),
                                i: Array.apply(null, {
                                    length: 8
                                }),
                                o: Array.apply(null, {
                                    length: 8
                                }),
                                c: !0
                            }, this.resetPaths = [], this.paths = [], this.numNodes = 8, this.elem = d, this.comp = d.comp, this.frameId = -1, this.d = e.d, this.dynamicProperties = [], this.mdf = !1, this.getValue = a, this.convertRectToPath = b, this.reset = c, this.p = PropertyFactory.getProp(d, e.p, 1, 0, this.dynamicProperties), this.s = PropertyFactory.getProp(d, e.s, 1, 0, this.dynamicProperties), this.r = PropertyFactory.getProp(d, e.r, 0, 0, this.dynamicProperties), this.dynamicProperties.length ? this.k = !0 : this.convertRectToPath()
                        }
                    }(),
                    k = {};
                return k.getShapeProp = f, k
            }(),
            ShapeModifiers = function() {
                function a(a, b) {
                    d[a] || (d[a] = b)
                }

                function b(a, b, c, e) {
                    return new d[a](b, c, e)
                }
                var c = {},
                    d = {};
                return c.registerModifier = a, c.getModifier = b, c
            }();
        ShapeModifier.prototype.initModifierProperties = function() {}, ShapeModifier.prototype.addShapeToModifier = function() {}, ShapeModifier.prototype.addShape = function(a) {
            this.closed || (this.shapes.push({
                shape: a,
                last: []
            }), this.addShapeToModifier(a))
        }, ShapeModifier.prototype.init = function(a, b, c) {
            this.elem = a, this.frameId = -1, this.shapes = [], this.dynamicProperties = [], this.mdf = !1, this.closed = !1, this.k = !1, this.isTrimming = !1, this.comp = a.comp, this.initModifierProperties(a, b), this.dynamicProperties.length ? (this.k = !0, c.push(this)) : this.getValue(!0)
        }, extendPrototype(ShapeModifier, TrimModifier), TrimModifier.prototype.processKeys = function(a) {
            if (this.elem.globalData.frameId !== this.frameId || a) {
                this.mdf = !!a, this.frameId = this.elem.globalData.frameId;
                var b, c = this.dynamicProperties.length;
                for (b = 0; b < c; b += 1) this.dynamicProperties[b].getValue(), this.dynamicProperties[b].mdf && (this.mdf = !0);
                if (this.mdf || a) {
                    var d = this.o.v % 360 / 360;
                    d < 0 && (d += 1);
                    var e = this.s.v + d,
                        f = this.e.v + d;
                    if (e > f) {
                        var g = e;
                        e = f, f = g
                    }
                    this.sValue = e, this.eValue = f, this.oValue = d
                }
            }
        }, TrimModifier.prototype.initModifierProperties = function(a, b) {
            this.sValue = 0, this.eValue = 0, this.oValue = 0, this.getValue = this.processKeys, this.s = PropertyFactory.getProp(a, b.s, 0, .01, this.dynamicProperties), this.e = PropertyFactory.getProp(a, b.e, 0, .01, this.dynamicProperties), this.o = PropertyFactory.getProp(a, b.o, 0, 0, this.dynamicProperties), this.dynamicProperties.length || this.getValue(!0)
        }, TrimModifier.prototype.getSegmentsLength = function(a) {
            var b, c = a.c,
                d = a.v,
                e = a.o,
                f = a.i,
                g = d.length,
                h = [],
                i = 0;
            for (b = 0; b < g - 1; b += 1) h[b] = bez.getBezierLength(d[b], d[b + 1], e[b], f[b + 1]), i += h[b].addedLength;
            return c && (h[b] = bez.getBezierLength(d[b], d[0], e[b], f[0]), i += h[b].addedLength), {
                lengths: h,
                totalLength: i
            }
        }, TrimModifier.prototype.processShapes = function(a) {
            var b, c, d, e, f, g, h, i = this.shapes.length,
                j = this.sValue,
                k = this.eValue,
                l = 0;
            if (k === j)
                for (c = 0; c < i; c += 1) this.shapes[c].shape.paths = [], this.shapes[c].shape.mdf = !0;
            else if (1 === k && 0 === j || 0 === k && 1 === j)
                for (c = 0; c < i; c += 1) m = this.shapes[c], m.shape.paths !== m.last && (m.shape.mdf = !0, m.last = m.shape.paths);
            else {
                var m, n, o = [];
                for (c = 0; c < i; c += 1)
                    if (m = this.shapes[c], m.shape.mdf || this.mdf || a) {
                        if (b = m.shape.paths, e = b.length, h = 0, !m.shape.mdf && m.pathsData) h = m.totalShapeLength;
                        else {
                            for (f = [], d = 0; d < e; d += 1) g = this.getSegmentsLength(b[d]), f.push(g), h += g.totalLength;
                            m.totalShapeLength = h, m.pathsData = f
                        }
                        l += h, m.shape.mdf = !0
                    } else m.shape.paths = m.last;
                for (c = 0; c < i; c += 1)
                    if (n = [], m = this.shapes[c], m.shape.mdf) {
                        o.length = 0, k <= 1 ? o.push({
                            s: m.totalShapeLength * j,
                            e: m.totalShapeLength * k
                        }) : j >= 1 ? o.push({
                            s: m.totalShapeLength * (j - 1),
                            e: m.totalShapeLength * (k - 1)
                        }) : (o.push({
                            s: m.totalShapeLength * j,
                            e: m.totalShapeLength
                        }), o.push({
                            s: 0,
                            e: m.totalShapeLength * (k - 1)
                        }));
                        var p, q = this.addShapes(m, o[0]);
                        n.push(q), o.length > 1 && (m.shape.v.c ? this.addShapes(m, o[1], q) : (q.i[0] = [q.v[0][0], q.v[0][1]], p = q.v.length - 1, q.o[p] = [q.v[p][0], q.v[p][1]], q = this.addShapes(m, o[1]), n.push(q))), q.i[0] = [q.v[0][0], q.v[0][1]], p = q.v.length - 1, q.o[p] = [q.v[p][0], q.v[p][1]], m.last = n, m.shape.paths = n
                    }
            }
            this.dynamicProperties.length || (this.mdf = !1)
        }, TrimModifier.prototype.addSegment = function(a, b, c, d, e, f) {
            e.o[f] = b, e.i[f + 1] = c, e.v[f + 1] = d, e.v[f] = a
        }, TrimModifier.prototype.addShapes = function(a, b, c) {
            var d, e, f, g, h, i, j, k = a.pathsData,
                l = a.shape.paths,
                m = l.length,
                n = 0;
            for (c ? h = c.v.length - 1 : (c = {
                    c: !1,
                    v: [],
                    i: [],
                    o: []
                }, h = 0), d = 0; d < m; d += 1) {
                for (i = k[d].lengths, f = l[d].c ? i.length : i.length + 1, e = 1; e < f; e += 1)
                    if (g = i[e - 1], n + g.addedLength < b.s) n += g.addedLength;
                    else {
                        if (n > b.e) break;
                        b.s <= n && b.e >= n + g.addedLength ? this.addSegment(l[d].v[e - 1], l[d].o[e - 1], l[d].i[e], l[d].v[e], c, h) : (j = bez.getNewSegment(l[d].v[e - 1], l[d].v[e], l[d].o[e - 1], l[d].i[e], (b.s - n) / g.addedLength, (b.e - n) / g.addedLength, i[e - 1]), this.addSegment(j.pt1, j.pt3, j.pt4, j.pt2, c, h)), n += g.addedLength, h += 1
                    }
                if (l[d].c && n <= b.e) {
                    var o = i[e - 1].addedLength;
                    b.s <= n && b.e >= n + o ? this.addSegment(l[d].v[e - 1], l[d].o[e - 1], l[d].i[0], l[d].v[0], c, h) : (j = bez.getNewSegment(l[d].v[e - 1], l[d].v[0], l[d].o[e - 1], l[d].i[0], (b.s - n) / o, (b.e - n) / o, i[e - 1]), this.addSegment(j.pt1, j.pt3, j.pt4, j.pt2, c, h))
                }
            }
            return c
        }, ShapeModifiers.registerModifier("tm", TrimModifier), extendPrototype(ShapeModifier, RoundCornersModifier), RoundCornersModifier.prototype.processKeys = function(a) {
            if (this.elem.globalData.frameId !== this.frameId || a) {
                this.mdf = !!a, this.frameId = this.elem.globalData.frameId;
                var b, c = this.dynamicProperties.length;
                for (b = 0; b < c; b += 1) this.dynamicProperties[b].getValue(), this.dynamicProperties[b].mdf && (this.mdf = !0)
            }
        }, RoundCornersModifier.prototype.initModifierProperties = function(a, b) {
            this.getValue = this.processKeys, this.rd = PropertyFactory.getProp(a, b.r, 0, null, this.dynamicProperties), this.dynamicProperties.length || this.getValue(!0)
        }, RoundCornersModifier.prototype.processPath = function(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m = a.v.length,
                n = [],
                o = [],
                p = [];
            for (c = 0; c < m; c += 1) d = a.v[c], f = a.o[c], e = a.i[c], d[0] === f[0] && d[1] === f[1] && d[0] === e[0] && d[1] === e[1] ? 0 !== c && c !== m - 1 || a.c ? (g = 0 === c ? a.v[m - 1] : a.v[c - 1], k = Math.sqrt(Math.pow(d[0] - g[0], 2) + Math.pow(d[1] - g[1], 2)), l = k ? Math.min(k / 2, b) / k : 0, h = [d[0] + (g[0] - d[0]) * l, d[1] - (d[1] - g[1]) * l], j = h, i = [h[0] - (h[0] - d[0]) * roundCorner, h[1] - (h[1] - d[1]) * roundCorner], n.push(h), o.push(i), p.push(j), g = c === m - 1 ? a.v[0] : a.v[c + 1], k = Math.sqrt(Math.pow(d[0] - g[0], 2) + Math.pow(d[1] - g[1], 2)), l = k ? Math.min(k / 2, b) / k : 0, h = [d[0] + (g[0] - d[0]) * l, d[1] + (g[1] - d[1]) * l], j = [h[0] - (h[0] - d[0]) * roundCorner, h[1] - (h[1] - d[1]) * roundCorner], i = h, n.push(h), o.push(i), p.push(j)) : (n.push(d), o.push(f), p.push(e)) : (n.push(a.v[c]), o.push(a.o[c]), p.push(a.i[c]));
            return {
                v: n,
                o: o,
                i: p,
                c: a.c
            }
        }, RoundCornersModifier.prototype.processShapes = function() {
            var a, b, c, d, e = this.shapes.length,
                f = this.rd.v;
            if (0 !== f) {
                var g, h;
                for (b = 0; b < e; b += 1)
                    if (h = [], g = this.shapes[b], g.shape.mdf || this.mdf) {
                        for (g.shape.mdf = !0, a = g.shape.paths, d = a.length, c = 0; c < d; c += 1) h.push(this.processPath(a[c], f));
                        g.shape.paths = h, g.last = h
                    } else g.shape.paths = g.last
            }
            this.dynamicProperties.length || (this.mdf = !1)
        }, ShapeModifiers.registerModifier("rd", RoundCornersModifier);
        var ImagePreloader = function() {
                function a() {
                    this.loadedAssets += 1, this.loadedAssets === this.totalImages
                }

                function b(a) {
                    var b = "";
                    if (this.assetsPath) {
                        var c = a.p;
                        c.indexOf("images/") !== -1 && (c = c.split("/")[1]), b = this.assetsPath + c
                    } else b = this.path, b += a.u ? a.u : "", b += a.p;
                    return b
                }

                function c(b) {
                    var c = document.createElement("img");
                    c.addEventListener("load", a.bind(this), !1), c.addEventListener("error", a.bind(this), !1), c.src = b
                }

                function d(a) {
                    this.totalAssets = a.length;
                    var d;
                    for (d = 0; d < this.totalAssets; d += 1) a[d].layers || (c.bind(this)(b.bind(this)(a[d])), this.totalImages += 1)
                }

                function e(a) {
                    this.path = a || ""
                }

                function f(a) {
                    this.assetsPath = a || ""
                }
                return function() {
                    this.loadAssets = d, this.setAssetsPath = f, this.setPath = e, this.assetsPath = "", this.path = "", this.totalAssets = 0, this.totalImages = 0, this.loadedAssets = 0
                }
            }(),
            featureSupport = function() {
                var a = {
                    maskType: !0
                };
                return (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) && (a.maskType = !1), a
            }(),
            filtersFactory = function() {
                function a(a) {
                    var b = document.createElementNS(svgNS, "filter");
                    return b.setAttribute("id", a), b.setAttribute("filterUnits", "objectBoundingBox"), b.setAttribute("x", "0%"), b.setAttribute("y", "0%"), b.setAttribute("width", "100%"), b.setAttribute("height", "100%"), b
                }

                function b() {
                    var a = document.createElementNS(svgNS, "feColorMatrix");
                    return a.setAttribute("type", "matrix"), a.setAttribute("color-interpolation-filters", "sRGB"), a.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 0 1"), a
                }
                var c = {};
                return c.createFilter = a, c.createAlphaToLuminanceFilter = b, c
            }();
        BaseRenderer.prototype.checkLayers = function(a) {
            var b, c, d = this.layers.length;
            for (this.completeLayers = !0, b = d - 1; b >= 0; b--) this.elements[b] || (c = this.layers[b], c.ip - c.st <= a - this.layers[b].st && c.op - c.st > a - this.layers[b].st && this.buildItem(b)), this.completeLayers = !!this.elements[b] && this.completeLayers;
            this.checkPendingElements()
        }, BaseRenderer.prototype.createItem = function(a) {
            switch (a.ty) {
                case 2:
                    return this.createImage(a);
                case 0:
                    return this.createComp(a);
                case 1:
                    return this.createSolid(a);
                case 4:
                    return this.createShape(a);
                case 5:
                    return this.createText(a);
                case 99:
                    return null
            }
            return this.createBase(a)
        }, BaseRenderer.prototype.buildAllItems = function() {
            var a, b = this.layers.length;
            for (a = 0; a < b; a += 1) this.buildItem(a);
            this.checkPendingElements()
        }, BaseRenderer.prototype.includeLayers = function(a) {
            this.completeLayers = !1;
            var b, c, d = a.length,
                e = this.layers.length;
            for (b = 0; b < d; b += 1)
                for (c = 0; c < e;) {
                    if (this.layers[c].id == a[b].id) {
                        this.layers[c] = a[b];
                        break
                    }
                    c += 1
                }
        }, BaseRenderer.prototype.setProjectInterface = function(a) {
            this.globalData.projectInterface = a
        }, BaseRenderer.prototype.initItems = function() {
            this.globalData.progressiveLoad || this.buildAllItems()
        }, BaseRenderer.prototype.buildElementParenting = function(a, b, c) {
            c = c || [];
            for (var d = this.elements, e = this.layers, f = 0, g = e.length; f < g;) e[f].ind == b && (d[f] && d[f] !== !0 ? void 0 !== e[f].parent ? (c.push(d[f]), this.buildElementParenting(a, e[f].parent, c)) : (c.push(d[f]), a.setHierarchy(c)) : (this.buildItem(f), this.addPendingElement(a))), f += 1
        }, BaseRenderer.prototype.addPendingElement = function(a) {
            this.pendingElements.push(a)
        }, extendPrototype(BaseRenderer, SVGRenderer), SVGRenderer.prototype.createBase = function(a) {
            return new SVGBaseElement(a, this.layerElement, this.globalData, this)
        }, SVGRenderer.prototype.createShape = function(a) {
            return new IShapeElement(a, this.layerElement, this.globalData, this)
        }, SVGRenderer.prototype.createText = function(a) {
            return new SVGTextElement(a, this.layerElement, this.globalData, this)
        }, SVGRenderer.prototype.createImage = function(a) {
            return new IImageElement(a, this.layerElement, this.globalData, this)
        }, SVGRenderer.prototype.createComp = function(a) {
            return new ICompElement(a, this.layerElement, this.globalData, this)
        }, SVGRenderer.prototype.createSolid = function(a) {
            return new ISolidElement(a, this.layerElement, this.globalData, this)
        }, SVGRenderer.prototype.configAnimation = function(a) {
            this.layerElement = document.createElementNS(svgNS, "svg"), this.layerElement.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.layerElement.setAttribute("width", a.w), this.layerElement.setAttribute("height", a.h), this.layerElement.setAttribute("viewBox", "0 0 " + a.w + " " + a.h), this.layerElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio), this.layerElement.style.width = "100%", this.layerElement.style.height = "100%", this.animationItem.wrapper.appendChild(this.layerElement);
            var b = document.createElementNS(svgNS, "defs");
            this.globalData.defs = b, this.layerElement.appendChild(b), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.globalData.frameId = 0, this.globalData.compSize = {
                w: a.w,
                h: a.h
            }, this.globalData.frameRate = a.fr;
            var c = document.createElementNS(svgNS, "clipPath"),
                d = document.createElementNS(svgNS, "rect");
            d.setAttribute("width", a.w), d.setAttribute("height", a.h), d.setAttribute("x", 0), d.setAttribute("y", 0);
            var e = "animationMask_" + randomString(10);
            c.setAttribute("id", e), c.appendChild(d);
            var f = document.createElementNS(svgNS, "g");
            f.setAttribute("clip-path", "url(#" + e + ")"), this.layerElement.appendChild(f), b.appendChild(c), this.layerElement = f, this.layers = a.layers, this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(a.chars), this.globalData.fontManager.addFonts(a.fonts, b), this.elements = Array.apply(null, {
                length: a.layers.length
            })
        }, SVGRenderer.prototype.destroy = function() {
            this.animationItem.wrapper.innerHTML = "", this.layerElement = null, this.globalData.defs = null;
            var a, b = this.layers ? this.layers.length : 0;
            for (a = 0; a < b; a++) this.elements[a] && this.elements[a].destroy();
            this.elements.length = 0, this.destroyed = !0, this.animationItem = null
        }, SVGRenderer.prototype.updateContainerSize = function() {}, SVGRenderer.prototype.buildItem = function(a) {
            var b = this.elements;
            if (!b[a] && 99 != this.layers[a].ty) {
                b[a] = !0;
                var c = this.createItem(this.layers[a]);
                b[a] = c, expressionsPlugin && (0 === this.layers[a].ty && this.globalData.projectInterface.registerComposition(c), c.initExpressions()), this.appendElementInPos(c, a), this.layers[a].tt && (this.elements[a - 1] && this.elements[a - 1] !== !0 ? c.setMatte(b[a - 1].layerId) : (this.buildItem(a - 1), this.addPendingElement(c)))
            }
        }, SVGRenderer.prototype.checkPendingElements = function() {
            for (; this.pendingElements.length;) {
                var a = this.pendingElements.pop();
                if (a.checkParenting(), a.data.tt)
                    for (var b = 0, c = this.elements.length; b < c;) {
                        if (this.elements[b] === a) {
                            a.setMatte(this.elements[b - 1].layerId);
                            break
                        }
                        b += 1
                    }
            }
        }, SVGRenderer.prototype.renderFrame = function(a) {
            if (this.renderedFrame != a && !this.destroyed) {
                null === a ? a = this.renderedFrame : this.renderedFrame = a, this.globalData.frameNum = a, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = a;
                var b, c = this.layers.length;
                for (this.completeLayers || this.checkLayers(a), b = c - 1; b >= 0; b--)(this.completeLayers || this.elements[b]) && this.elements[b].prepareFrame(a - this.layers[b].st);
                for (b = c - 1; b >= 0; b--)(this.completeLayers || this.elements[b]) && this.elements[b].renderFrame()
            }
        }, SVGRenderer.prototype.appendElementInPos = function(a, b) {
            var c = a.getBaseElement();
            if (c) {
                for (var d, e = 0; e < b;) this.elements[e] && this.elements[e] !== !0 && this.elements[e].getBaseElement() && (d = this.elements[e].getBaseElement()), e += 1;
                d ? this.layerElement.insertBefore(c, d) : this.layerElement.appendChild(c)
            }
        }, SVGRenderer.prototype.hide = function() {
            this.layerElement.style.display = "none"
        }, SVGRenderer.prototype.show = function() {
            this.layerElement.style.display = "block"
        }, SVGRenderer.prototype.searchExtraCompositions = function(a) {
            var b, c = a.length,
                d = document.createElementNS(svgNS, "g");
            for (b = 0; b < c; b += 1)
                if (a[b].xt) {
                    var e = this.createComp(a[b], d, this.globalData.comp, null);
                    e.initExpressions(), this.globalData.projectInterface.registerComposition(e)
                }
        }, MaskElement.prototype.getMaskProperty = function(a) {
            return this.viewData[a].prop
        }, MaskElement.prototype.prepareFrame = function() {
            var a, b = this.dynamicProperties.length;
            for (a = 0; a < b; a += 1) this.dynamicProperties[a].getValue()
        }, MaskElement.prototype.renderFrame = function(a) {
            var b, c = this.masksProperties.length;
            for (b = 0; b < c; b++)
                if ((this.viewData[b].prop.mdf || this.firstFrame) && this.drawPath(this.masksProperties[b], this.viewData[b].prop.v, this.viewData[b]), (this.viewData[b].op.mdf || this.firstFrame) && this.viewData[b].elem.setAttribute("fill-opacity", this.viewData[b].op.v), "n" !== this.masksProperties[b].mode && (this.viewData[b].invRect && (this.element.finalTransform.mProp.mdf || this.firstFrame) && (this.viewData[b].invRect.setAttribute("x", -a.props[12]), this.viewData[b].invRect.setAttribute("y", -a.props[13])), this.storedData[b].x && (this.storedData[b].x.mdf || this.firstFrame))) {
                    var d = this.storedData[b].expan;
                    this.storedData[b].x.v < 0 ? ("erode" !== this.storedData[b].lastOperator && (this.storedData[b].lastOperator = "erode", this.storedData[b].elem.setAttribute("filter", "url(#" + this.storedData[b].filterId + ")")), d.setAttribute("radius", -this.storedData[b].x.v)) : ("dilate" !== this.storedData[b].lastOperator && (this.storedData[b].lastOperator = "dilate", this.storedData[b].elem.setAttribute("filter", null)), this.storedData[b].elem.setAttribute("stroke-width", 2 * this.storedData[b].x.v))
                }
            this.firstFrame = !1
        }, MaskElement.prototype.getMaskelement = function() {
            return this.maskElement
        }, MaskElement.prototype.createLayerSolidPath = function() {
            var a = "M0,0 ";
            return a += " h" + this.globalData.compSize.w, a += " v" + this.globalData.compSize.h, a += " h-" + this.globalData.compSize.w, a += " v-" + this.globalData.compSize.h + " "
        }, MaskElement.prototype.drawPath = function(a, b, c) {
            var d, e, f = "";
            for (e = b.v.length, d = 1; d < e; d += 1) 1 == d && (f += " M" + bm_rnd(b.v[0][0]) + "," + bm_rnd(b.v[0][1])), f += " C" + bm_rnd(b.o[d - 1][0]) + "," + bm_rnd(b.o[d - 1][1]) + " " + bm_rnd(b.i[d][0]) + "," + bm_rnd(b.i[d][1]) + " " + bm_rnd(b.v[d][0]) + "," + bm_rnd(b.v[d][1]);
            b.c && e > 1 && (f += " C" + bm_rnd(b.o[d - 1][0]) + "," + bm_rnd(b.o[d - 1][1]) + " " + bm_rnd(b.i[0][0]) + "," + bm_rnd(b.i[0][1]) + " " + bm_rnd(b.v[0][0]) + "," + bm_rnd(b.v[0][1])), c.lastPath !== f && (c.elem && (b.c ? a.inv ? c.elem.setAttribute("d", this.solidPath + f) : c.elem.setAttribute("d", f) : c.elem.setAttribute("d", "")), c.lastPath = f)
        }, MaskElement.prototype.getMask = function(a) {
            for (var b = 0, c = this.masksProperties.length; b < c;) {
                if (this.masksProperties[b].nm === a) return {
                    maskPath: this.viewData[b].prop.pv
                };
                b += 1
            }
        }, MaskElement.prototype.destroy = function() {
            this.element = null, this.globalData = null, this.maskElement = null, this.data = null, this.paths = null, this.masksProperties = null
        }, BaseElement.prototype.checkMasks = function() {
            if (!this.data.hasMask) return !1;
            for (var a = 0, b = this.data.masksProperties.length; a < b;) {
                if ("n" !== this.data.masksProperties[a].mode && this.data.masksProperties[a].cl !== !1) return !0;
                a += 1
            }
            return !1
        }, BaseElement.prototype.checkParenting = function() {
            void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent)
        }, BaseElement.prototype.prepareFrame = function(a) {
            this.data.ip - this.data.st <= a && this.data.op - this.data.st > a ? this.isVisible !== !0 && (this.elemMdf = !0, this.globalData.mdf = !0, this.isVisible = !0, this.firstFrame = !0, this.data.hasMask && (this.maskManager.firstFrame = !0)) : this.isVisible !== !1 && (this.elemMdf = !0, this.globalData.mdf = !0, this.isVisible = !1);
            var b, c = this.dynamicProperties.length;
            for (b = 0; b < c; b += 1) this.dynamicProperties[b].getValue(), this.dynamicProperties[b].mdf && (this.elemMdf = !0, this.globalData.mdf = !0);
            return this.data.hasMask && this.maskManager.prepareFrame(a * this.data.sr), this.currentFrameNum = a * this.data.sr, this.isVisible
        }, BaseElement.prototype.globalToLocal = function(a) {
            var b = [];
            b.push(this.finalTransform);
            for (var c = !0, d = this.comp; c;) d.finalTransform ? (d.data.hasMask && b.splice(0, 0, d.finalTransform), d = d.comp) : c = !1;
            var e, f, g = b.length;
            for (e = 0; e < g; e += 1) f = b[e].mat.applyToPointArray(0, 0, 0), a = [a[0] - f[0], a[1] - f[1], 0];
            return a
        }, BaseElement.prototype.initExpressions = function() {
            this.layerInterface = LayerExpressionInterface(this), this.data.hasMask && this.layerInterface.registerMaskInterface(this.maskManager);
            var a = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
            this.layerInterface.registerEffectsInterface(a), 0 === this.data.ty || this.data.xt ? this.compInterface = CompExpressionInterface(this) : 4 === this.data.ty && (this.layerInterface.shapeInterface = ShapeExpressionInterface.createShapeInterface(this.shapesData, this.viewData, this.layerInterface))
        }, BaseElement.prototype.setBlendMode = function() {
            var a = "";
            switch (this.data.bm) {
                case 1:
                    a = "multiply";
                    break;
                case 2:
                    a = "screen";
                    break;
                case 3:
                    a = "overlay";
                    break;
                case 4:
                    a = "darken";
                    break;
                case 5:
                    a = "lighten";
                    break;
                case 6:
                    a = "color-dodge";
                    break;
                case 7:
                    a = "color-burn";
                    break;
                case 8:
                    a = "hard-light";
                    break;
                case 9:
                    a = "soft-light";
                    break;
                case 10:
                    a = "difference";
                    break;
                case 11:
                    a = "exclusion";
                    break;
                case 12:
                    a = "hue";
                    break;
                case 13:
                    a = "saturation";
                    break;
                case 14:
                    a = "color";
                    break;
                case 15:
                    a = "luminosity"
            }
            var b = this.baseElement || this.layerElement;
            b.style["mix-blend-mode"] = a
        }, BaseElement.prototype.init = function() {
            this.data.sr || (this.data.sr = 1), this.dynamicProperties = [], this.data.ef && (this.effects = new EffectsManager(this.data, this, this.dynamicProperties)), this.hidden = !1, this.firstFrame = !0, this.isVisible = !1, this.currentFrameNum = -99999, this.lastNum = -99999, this.data.ks && (this.finalTransform = {
                mProp: PropertyFactory.getProp(this, this.data.ks, 2, null, this.dynamicProperties),
                matMdf: !1,
                opMdf: !1,
                mat: new Matrix,
                opacity: 1
            }, this.data.ao && (this.finalTransform.mProp.autoOriented = !0), this.finalTransform.op = this.finalTransform.mProp.o, this.transform = this.finalTransform.mProp, 11 !== this.data.ty && this.createElements(), this.data.hasMask && this.addMasks(this.data)), this.elemMdf = !1
        }, BaseElement.prototype.getType = function() {
            return this.type
        }, BaseElement.prototype.resetHierarchy = function() {
            this.hierarchy ? this.hierarchy.length = 0 : this.hierarchy = []
        }, BaseElement.prototype.getHierarchy = function() {
            return this.hierarchy || (this.hierarchy = []), this.hierarchy
        }, BaseElement.prototype.setHierarchy = function(a) {
            this.hierarchy = a
        }, BaseElement.prototype.getLayerSize = function() {
            return 5 === this.data.ty ? {
                w: this.data.textData.width,
                h: this.data.textData.height
            } : {
                w: this.data.width,
                h: this.data.height
            }
        }, BaseElement.prototype.hide = function() {}, BaseElement.prototype.mHelper = new Matrix, createElement(BaseElement, SVGBaseElement), SVGBaseElement.prototype.createElements = function() {
            this.layerElement = document.createElementNS(svgNS, "g"), this.transformedElement = this.layerElement, this.data.hasMask && (this.maskedElement = this.layerElement);
            var a = null;
            if (this.data.td) {
                if (3 == this.data.td || 1 == this.data.td) {
                    var b = document.createElementNS(svgNS, "mask");
                    if (b.setAttribute("id", this.layerId), b.setAttribute("mask-type", 3 == this.data.td ? "luminance" : "alpha"), b.appendChild(this.layerElement), a = b, this.globalData.defs.appendChild(b), !featureSupport.maskType && 1 == this.data.td) {
                        b.setAttribute("mask-type", "luminance");
                        var c = randomString(10),
                            d = filtersFactory.createFilter(c);
                        this.globalData.defs.appendChild(d), d.appendChild(filtersFactory.createAlphaToLuminanceFilter());
                        var e = document.createElementNS(svgNS, "g");
                        e.appendChild(this.layerElement), a = e, b.appendChild(e), e.setAttribute("filter", "url(#" + c + ")")
                    }
                } else if (2 == this.data.td) {
                    var f = document.createElementNS(svgNS, "mask");
                    f.setAttribute("id", this.layerId), f.setAttribute("mask-type", "alpha");
                    var g = document.createElementNS(svgNS, "g");
                    f.appendChild(g);
                    var c = randomString(10),
                        d = filtersFactory.createFilter(c),
                        h = document.createElementNS(svgNS, "feColorMatrix");
                    h.setAttribute("type", "matrix"), h.setAttribute("color-interpolation-filters", "sRGB"), h.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 -1 1"), d.appendChild(h), this.globalData.defs.appendChild(d);
                    var i = document.createElementNS(svgNS, "rect");
                    if (i.setAttribute("width", this.comp.data ? this.comp.data.w : this.globalData.compSize.w), i.setAttribute("height", this.comp.data ? this.comp.data.h : this.globalData.compSize.h), i.setAttribute("x", "0"), i.setAttribute("y", "0"), i.setAttribute("fill", "#ffffff"), i.setAttribute("opacity", "0"), g.setAttribute("filter", "url(#" + c + ")"), g.appendChild(i), g.appendChild(this.layerElement), a = g, !featureSupport.maskType) {
                        f.setAttribute("mask-type", "luminance"), d.appendChild(filtersFactory.createAlphaToLuminanceFilter());
                        var e = document.createElementNS(svgNS, "g");
                        g.appendChild(i), e.appendChild(this.layerElement), a = e, g.appendChild(e)
                    }
                    this.globalData.defs.appendChild(f)
                }
            } else(this.data.hasMask || this.data.tt) && this.data.tt ? (this.matteElement = document.createElementNS(svgNS, "g"), this.matteElement.appendChild(this.layerElement), a = this.matteElement, this.baseElement = this.matteElement) : this.baseElement = this.layerElement;
            if (!this.data.ln && !this.data.cl || 4 !== this.data.ty && 0 !== this.data.ty || (this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl)), 0 === this.data.ty) {
                var j = document.createElementNS(svgNS, "clipPath"),
                    k = document.createElementNS(svgNS, "path");
                k.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
                var l = "cp_" + randomString(8);
                if (j.setAttribute("id", l), j.appendChild(k), this.globalData.defs.appendChild(j), this.checkMasks()) {
                    var m = document.createElementNS(svgNS, "g");
                    m.setAttribute("clip-path", "url(#" + l + ")"), m.appendChild(this.layerElement), this.transformedElement = m, a ? a.appendChild(this.transformedElement) : this.baseElement = this.transformedElement
                } else this.layerElement.setAttribute("clip-path", "url(#" + l + ")")
            }
            0 !== this.data.bm && this.setBlendMode(), this.layerElement !== this.parentContainer && (this.placeholder = null), this.data.ef && (this.effectsManager = new SVGEffects(this)), this.checkParenting()
        }, SVGBaseElement.prototype.setBlendMode = BaseElement.prototype.setBlendMode, SVGBaseElement.prototype.renderFrame = function(a) {
            if (3 === this.data.ty || this.data.hd) return !1;
            if (!this.isVisible) return this.isVisible;
            this.lastNum = this.currentFrameNum, this.finalTransform.opMdf = this.finalTransform.op.mdf, this.finalTransform.matMdf = this.finalTransform.mProp.mdf, this.finalTransform.opacity = this.finalTransform.op.v, this.firstFrame && (this.finalTransform.opMdf = !0, this.finalTransform.matMdf = !0);
            var b, c = this.finalTransform.mat;
            if (this.hierarchy) {
                var d, e = this.hierarchy.length;
                for (b = this.finalTransform.mProp.v.props, c.cloneFromProps(b), d = 0; d < e; d += 1) this.finalTransform.matMdf = !!this.hierarchy[d].finalTransform.mProp.mdf || this.finalTransform.matMdf, b = this.hierarchy[d].finalTransform.mProp.v.props, c.transform(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15])
            } else this.isVisible && c.cloneFromProps(this.finalTransform.mProp.v.props);
            return a && (b = a.mat.props, c.transform(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15]), this.finalTransform.opacity *= a.opacity, this.finalTransform.opMdf = !!a.opMdf || this.finalTransform.opMdf, this.finalTransform.matMdf = !!a.matMdf || this.finalTransform.matMdf), this.finalTransform.matMdf && this.layerElement && this.transformedElement.setAttribute("transform", c.to2dCSS()), this.finalTransform.opMdf && this.layerElement && this.transformedElement.setAttribute("opacity", this.finalTransform.opacity), this.data.hasMask && this.maskManager.renderFrame(c), this.effectsManager && this.effectsManager.renderFrame(this.firstFrame), this.isVisible
        }, SVGBaseElement.prototype.destroy = function() {
            this.layerElement = null, this.parentContainer = null, this.matteElement && (this.matteElement = null), this.maskManager && this.maskManager.destroy()
        }, SVGBaseElement.prototype.getBaseElement = function() {
            return this.baseElement
        }, SVGBaseElement.prototype.addMasks = function(a) {
            this.maskManager = new MaskElement(a, this, this.globalData)
        }, SVGBaseElement.prototype.setMatte = function(a) {
            this.matteElement && this.matteElement.setAttribute("mask", "url(#" + a + ")")
        }, SVGBaseElement.prototype.setMatte = function(a) {
            this.matteElement && this.matteElement.setAttribute("mask", "url(#" + a + ")")
        }, SVGBaseElement.prototype.hide = function() {}, ITextElement.prototype.init = function() {
            this._parent.init.call(this), this.lettersChangedFlag = !1, this.currentTextDocumentData = {};
            var a = this.data;
            this.viewData = {
                m: {
                    a: PropertyFactory.getProp(this, a.t.m.a, 1, 0, this.dynamicProperties)
                }
            };
            var b = this.data.t;
            if (b.a.length) {
                this.viewData.a = Array.apply(null, {
                    length: b.a.length
                });
                var c, d, e, f = b.a.length;
                for (c = 0; c < f; c += 1) e = b.a[c], d = {
                    a: {},
                    s: {}
                }, "r" in e.a && (d.a.r = PropertyFactory.getProp(this, e.a.r, 0, degToRads, this.dynamicProperties)), "rx" in e.a && (d.a.rx = PropertyFactory.getProp(this, e.a.rx, 0, degToRads, this.dynamicProperties)), "ry" in e.a && (d.a.ry = PropertyFactory.getProp(this, e.a.ry, 0, degToRads, this.dynamicProperties)), "sk" in e.a && (d.a.sk = PropertyFactory.getProp(this, e.a.sk, 0, degToRads, this.dynamicProperties)), "sa" in e.a && (d.a.sa = PropertyFactory.getProp(this, e.a.sa, 0, degToRads, this.dynamicProperties)), "s" in e.a && (d.a.s = PropertyFactory.getProp(this, e.a.s, 1, .01, this.dynamicProperties)), "a" in e.a && (d.a.a = PropertyFactory.getProp(this, e.a.a, 1, 0, this.dynamicProperties)), "o" in e.a && (d.a.o = PropertyFactory.getProp(this, e.a.o, 0, .01, this.dynamicProperties)), "p" in e.a && (d.a.p = PropertyFactory.getProp(this, e.a.p, 1, 0, this.dynamicProperties)), "sw" in e.a && (d.a.sw = PropertyFactory.getProp(this, e.a.sw, 0, 0, this.dynamicProperties)), "sc" in e.a && (d.a.sc = PropertyFactory.getProp(this, e.a.sc, 1, 0, this.dynamicProperties)), "fc" in e.a && (d.a.fc = PropertyFactory.getProp(this, e.a.fc, 1, 0, this.dynamicProperties)), "fh" in e.a && (d.a.fh = PropertyFactory.getProp(this, e.a.fh, 0, 0, this.dynamicProperties)), "fs" in e.a && (d.a.fs = PropertyFactory.getProp(this, e.a.fs, 0, .01, this.dynamicProperties)), "fb" in e.a && (d.a.fb = PropertyFactory.getProp(this, e.a.fb, 0, .01, this.dynamicProperties)), "t" in e.a && (d.a.t = PropertyFactory.getProp(this, e.a.t, 0, 0, this.dynamicProperties)), d.s = PropertyFactory.getTextSelectorProp(this, e.s, this.dynamicProperties), d.s.t = e.s.t, this.viewData.a[c] = d
            } else this.viewData.a = [];
            b.p && "m" in b.p ? (this.viewData.p = {
                f: PropertyFactory.getProp(this, b.p.f, 0, 0, this.dynamicProperties),
                l: PropertyFactory.getProp(this, b.p.l, 0, 0, this.dynamicProperties),
                r: b.p.r,
                m: this.maskManager.getMaskProperty(b.p.m)
            }, this.maskPath = !0) : this.maskPath = !1
        }, ITextElement.prototype.prepareFrame = function(a) {
            var b = 0,
                c = this.data.t.d.k.length,
                d = this.data.t.d.k[b].s;
            for (b += 1; b < c && !(this.data.t.d.k[b].t > a);) d = this.data.t.d.k[b].s, b += 1;
            this.lettersChangedFlag = !1, d !== this.currentTextDocumentData && (this.currentTextDocumentData = d, this.lettersChangedFlag = !0, this.buildNewText()), this._parent.prepareFrame.call(this, a)
        }, ITextElement.prototype.createPathShape = function(a, b) {
            var c, d, e, f, g = b.length,
                h = "";
            for (c = 0; c < g; c += 1) {
                for (e = b[c].ks.k.i.length, f = b[c].ks.k, d = 1; d < e; d += 1) 1 == d && (h += " M" + a.applyToPointStringified(f.v[0][0], f.v[0][1])), h += " C" + a.applyToPointStringified(f.o[d - 1][0], f.o[d - 1][1]) + " " + a.applyToPointStringified(f.i[d][0], f.i[d][1]) + " " + a.applyToPointStringified(f.v[d][0], f.v[d][1]);
                h += " C" + a.applyToPointStringified(f.o[d - 1][0], f.o[d - 1][1]) + " " + a.applyToPointStringified(f.i[0][0], f.i[0][1]) + " " + a.applyToPointStringified(f.v[0][0], f.v[0][1]), h += "z"
            }
            return h
        }, ITextElement.prototype.getMeasures = function() {
            var a, b, c, d, e = this.mHelper,
                f = this.renderType,
                g = this.data,
                h = this.currentTextDocumentData,
                i = h.l;
            if (this.maskPath) {
                var j = this.viewData.p.m;
                if (!this.viewData.p.n || this.viewData.p.mdf) {
                    var k = j.v;
                    this.viewData.p.r && (k = reversePath(k));
                    var l = {
                        tLength: 0,
                        segments: []
                    };
                    d = k.v.length - 1;
                    var m, n = 0;
                    for (c = 0; c < d; c += 1) m = {
                        s: k.v[c],
                        e: k.v[c + 1],
                        to: [k.o[c][0] - k.v[c][0], k.o[c][1] - k.v[c][1]],
                        ti: [k.i[c + 1][0] - k.v[c + 1][0], k.i[c + 1][1] - k.v[c + 1][1]]
                    }, bez.buildBezierData(m), l.tLength += m.bezierData.segmentLength, l.segments.push(m), n += m.bezierData.segmentLength;
                    c = d, j.v.c && (m = {
                        s: k.v[c],
                        e: k.v[0],
                        to: [k.o[c][0] - k.v[c][0], k.o[c][1] - k.v[c][1]],
                        ti: [k.i[0][0] - k.v[0][0], k.i[0][1] - k.v[0][1]]
                    }, bez.buildBezierData(m), l.tLength += m.bezierData.segmentLength, l.segments.push(m), n += m.bezierData.segmentLength), this.viewData.p.pi = l
                }
                var o, p, q, l = this.viewData.p.pi,
                    r = this.viewData.p.f.v,
                    s = 0,
                    t = 1,
                    u = 0,
                    v = !0,
                    w = l.segments;
                if (r < 0 && j.v.c)
                    for (l.tLength < Math.abs(r) && (r = -Math.abs(r) % l.tLength), s = w.length - 1, q = w[s].bezierData.points, t = q.length - 1; r < 0;) r += q[t].partialLength, t -= 1, t < 0 && (s -= 1, q = w[s].bezierData.points, t = q.length - 1);
                q = w[s].bezierData.points, p = q[t - 1], o = q[t];
                var x, y, z = o.partialLength
            }
            d = i.length, a = 0, b = 0;
            var A, B, C, D, E, F = 1.2 * h.s * .714,
                G = !0,
                H = this.viewData,
                I = Array.apply(null, {
                    length: d
                });
            D = H.a.length;
            var J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z = -1,
                $ = r,
                _ = s,
                aa = t,
                ba = -1,
                ca = 0;
            for (c = 0; c < d; c += 1)
                if (e.reset(), O = 1, i[c].n) a = 0, b += h.yOffset, b += G ? 1 : 0, r = $, G = !1, ca = 0, this.maskPath && (s = _, t = aa, q = w[s].bezierData.points, p = q[t - 1], o = q[t], z = o.partialLength, u = 0), I[c] = this.emptyProp;
                else {
                    if (this.maskPath) {
                        if (ba !== i[c].line) {
                            switch (h.j) {
                                case 1:
                                    r += n - h.lineWidths[i[c].line];
                                    break;
                                case 2:
                                    r += (n - h.lineWidths[i[c].line]) / 2
                            }
                            ba = i[c].line
                        }
                        Z !== i[c].ind && (i[Z] && (r += i[Z].extra), r += i[c].an / 2, Z = i[c].ind), r += H.m.a.v[0] * i[c].an / 200;
                        var da = 0;
                        for (C = 0; C < D; C += 1) A = H.a[C].a, "p" in A && (B = H.a[C].s, K = B.getMult(i[c].anIndexes[C], g.t.a[C].s.totalChars), da += K.length ? A.p.v[0] * K[0] : A.p.v[0] * K);
                        for (v = !0; v;) u + z >= r + da || !q ? (x = (r + da - u) / o.partialLength, M = p.point[0] + (o.point[0] - p.point[0]) * x, N = p.point[1] + (o.point[1] - p.point[1]) * x, e.translate(0, -(H.m.a.v[1] * F / 100) + b), v = !1) : q && (u += o.partialLength, t += 1, t >= q.length && (t = 0, s += 1, w[s] ? q = w[s].bezierData.points : j.v.c ? (t = 0, s = 0, q = w[s].bezierData.points) : (u -= o.partialLength, q = null)), q && (p = o, o = q[t], z = o.partialLength));
                        L = i[c].an / 2 - i[c].add, e.translate(-L, 0, 0)
                    } else L = i[c].an / 2 - i[c].add, e.translate(-L, 0, 0), e.translate(-H.m.a.v[0] * i[c].an / 200, -H.m.a.v[1] * F / 100, 0);
                    for (ca += i[c].l / 2, C = 0; C < D; C += 1) A = H.a[C].a, "t" in A && (B = H.a[C].s, K = B.getMult(i[c].anIndexes[C], g.t.a[C].s.totalChars), this.maskPath ? r += K.length ? A.t * K[0] : A.t * K : a += K.length ? A.t.v * K[0] : A.t.v * K);
                    for (ca += i[c].l / 2, h.strokeWidthAnim && (Q = h.sw || 0), h.strokeColorAnim && (P = h.sc ? [h.sc[0], h.sc[1], h.sc[2]] : [0, 0, 0]), h.fillColorAnim && (R = [h.fc[0], h.fc[1], h.fc[2]]), C = 0; C < D; C += 1) A = H.a[C].a, "a" in A && (B = H.a[C].s, K = B.getMult(i[c].anIndexes[C], g.t.a[C].s.totalChars), K.length ? e.translate(-A.a.v[0] * K[0], -A.a.v[1] * K[1], A.a.v[2] * K[2]) : e.translate(-A.a.v[0] * K, -A.a.v[1] * K, A.a.v[2] * K));
                    for (C = 0; C < D; C += 1) A = H.a[C].a, "s" in A && (B = H.a[C].s, K = B.getMult(i[c].anIndexes[C], g.t.a[C].s.totalChars), K.length ? e.scale(1 + (A.s.v[0] - 1) * K[0], 1 + (A.s.v[1] - 1) * K[1], 1) : e.scale(1 + (A.s.v[0] - 1) * K, 1 + (A.s.v[1] - 1) * K, 1));
                    for (C = 0; C < D; C += 1) {
                        if (A = H.a[C].a, B = H.a[C].s, K = B.getMult(i[c].anIndexes[C], g.t.a[C].s.totalChars), "sk" in A && (K.length ? e.skewFromAxis(-A.sk.v * K[0], A.sa.v * K[1]) : e.skewFromAxis(-A.sk.v * K, A.sa.v * K)), "r" in A && (K.length ? e.rotateZ(-A.r.v * K[2]) : e.rotateZ(-A.r.v * K)), "ry" in A && (K.length ? e.rotateY(A.ry.v * K[1]) : e.rotateY(A.ry.v * K)), "rx" in A && (K.length ? e.rotateX(A.rx.v * K[0]) : e.rotateX(A.rx.v * K)), "o" in A && (O += K.length ? (A.o.v * K[0] - O) * K[0] : (A.o.v * K - O) * K), h.strokeWidthAnim && "sw" in A && (Q += K.length ? A.sw.v * K[0] : A.sw.v * K), h.strokeColorAnim && "sc" in A)
                            for (S = 0; S < 3; S += 1) K.length ? P[S] = Math.round(255 * (P[S] + (A.sc.v[S] - P[S]) * K[0])) : P[S] = Math.round(255 * (P[S] + (A.sc.v[S] - P[S]) * K));
                        if (h.fillColorAnim) {
                            if ("fc" in A)
                                for (S = 0; S < 3; S += 1) K.length ? R[S] = R[S] + (A.fc.v[S] - R[S]) * K[0] : R[S] = R[S] + (A.fc.v[S] - R[S]) * K;
                            "fh" in A && (R = K.length ? addHueToRGB(R, A.fh.v * K[0]) : addHueToRGB(R, A.fh.v * K)), "fs" in A && (R = K.length ? addSaturationToRGB(R, A.fs.v * K[0]) : addSaturationToRGB(R, A.fs.v * K)), "fb" in A && (R = K.length ? addBrightnessToRGB(R, A.fb.v * K[0]) : addBrightnessToRGB(R, A.fb.v * K))
                        }
                    }
                    for (C = 0; C < D; C += 1) A = H.a[C].a, "p" in A && (B = H.a[C].s, K = B.getMult(i[c].anIndexes[C], g.t.a[C].s.totalChars), this.maskPath ? K.length ? e.translate(0, A.p.v[1] * K[0], -A.p.v[2] * K[1]) : e.translate(0, A.p.v[1] * K, -A.p.v[2] * K) : K.length ? e.translate(A.p.v[0] * K[0], A.p.v[1] * K[1], -A.p.v[2] * K[2]) : e.translate(A.p.v[0] * K, A.p.v[1] * K, -A.p.v[2] * K));
                    if (h.strokeWidthAnim && (T = Q < 0 ? 0 : Q), h.strokeColorAnim && (U = "rgb(" + Math.round(255 * P[0]) + "," + Math.round(255 * P[1]) + "," + Math.round(255 * P[2]) + ")"), h.fillColorAnim && (V = "rgb(" + Math.round(255 * R[0]) + "," + Math.round(255 * R[1]) + "," + Math.round(255 * R[2]) + ")"), this.maskPath) {
                        if (g.t.p.p) {
                            y = (o.point[1] - p.point[1]) / (o.point[0] - p.point[0]);
                            var ea = 180 * Math.atan(y) / Math.PI;
                            o.point[0] < p.point[0] && (ea += 180), e.rotate(-ea * Math.PI / 180)
                        }
                        e.translate(M, N, 0), e.translate(H.m.a.v[0] * i[c].an / 200, H.m.a.v[1] * F / 100, 0), r -= H.m.a.v[0] * i[c].an / 200, i[c + 1] && Z !== i[c + 1].ind && (r += i[c].an / 2, r += h.tr / 1e3 * h.s)
                    } else {
                        switch (e.translate(a, b, 0), h.ps && e.translate(h.ps[0], h.ps[1] + h.ascent, 0), h.j) {
                            case 1:
                                e.translate(h.justifyOffset + (h.boxWidth - h.lineWidths[i[c].line]), 0, 0);
                                break;
                            case 2:
                                e.translate(h.justifyOffset + (h.boxWidth - h.lineWidths[i[c].line]) / 2, 0, 0)
                        }
                        e.translate(L, 0, 0), e.translate(H.m.a.v[0] * i[c].an / 200, H.m.a.v[1] * F / 100, 0), a += i[c].l + h.tr / 1e3 * h.s
                    }
                    "html" === f ? W = e.toCSS() : "svg" === f ? W = e.to2dCSS() : X = [e.props[0], e.props[1], e.props[2], e.props[3], e.props[4], e.props[5], e.props[6], e.props[7], e.props[8], e.props[9], e.props[10], e.props[11], e.props[12], e.props[13], e.props[14], e.props[15]], Y = O, J = this.renderedLetters[c], !J || J.o === Y && J.sw === T && J.sc === U && J.fc === V ? "svg" !== f && "html" !== f || J && J.m === W ? "canvas" !== f || J && J.props[0] === X[0] && J.props[1] === X[1] && J.props[4] === X[4] && J.props[5] === X[5] && J.props[12] === X[12] && J.props[13] === X[13] ? E = J : (this.lettersChangedFlag = !0, E = new LetterProps(Y, T, U, V, null, X)) : (this.lettersChangedFlag = !0, E = new LetterProps(Y, T, U, V, W)) : (this.lettersChangedFlag = !0, E = new LetterProps(Y, T, U, V, W, X)), this.renderedLetters[c] = E
                }
        }, ITextElement.prototype.emptyProp = new LetterProps, createElement(SVGBaseElement, SVGTextElement), SVGTextElement.prototype.init = ITextElement.prototype.init, SVGTextElement.prototype.createPathShape = ITextElement.prototype.createPathShape, SVGTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures, SVGTextElement.prototype.prepareFrame = ITextElement.prototype.prepareFrame, SVGTextElement.prototype.createElements = function() {
            this._parent.createElements.call(this), this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl)
        }, SVGTextElement.prototype.buildNewText = function() {
            var a, b, c = this.currentTextDocumentData;
            this.renderedLetters = Array.apply(null, {
                length: this.currentTextDocumentData.l ? this.currentTextDocumentData.l.length : 0
            }), c.fc ? this.layerElement.setAttribute("fill", "rgb(" + Math.round(255 * c.fc[0]) + "," + Math.round(255 * c.fc[1]) + "," + Math.round(255 * c.fc[2]) + ")") : this.layerElement.setAttribute("fill", "rgba(0,0,0,0)"), c.sc && (this.layerElement.setAttribute("stroke", "rgb(" + Math.round(255 * c.sc[0]) + "," + Math.round(255 * c.sc[1]) + "," + Math.round(255 * c.sc[2]) + ")"), this.layerElement.setAttribute("stroke-width", c.sw)), this.layerElement.setAttribute("font-size", c.s);
            var d = this.globalData.fontManager.getFontByName(c.f);
            if (d.fClass) this.layerElement.setAttribute("class", d.fClass);
            else {
                this.layerElement.setAttribute("font-family", d.fFamily);
                var e = c.fWeight,
                    f = c.fStyle;
                this.layerElement.setAttribute("font-style", f), this.layerElement.setAttribute("font-weight", e)
            }
            var g = c.l || [];
            if (b = g.length) {
                var h, i, j = this.mHelper,
                    k = "",
                    l = this.data.singleShape;
                if (l) var m = 0,
                    n = 0,
                    o = c.lineWidths,
                    p = c.boxWidth,
                    q = !0;
                var r = 0;
                for (a = 0; a < b; a += 1) {
                    if (this.globalData.fontManager.chars ? l && 0 !== a || (h = this.textSpans[r] ? this.textSpans[r] : document.createElementNS(svgNS, "path")) : h = this.textSpans[r] ? this.textSpans[r] : document.createElementNS(svgNS, "text"), h.style.display = "inherit", h.setAttribute("stroke-linecap", "butt"), h.setAttribute("stroke-linejoin", "round"), h.setAttribute("stroke-miterlimit", "4"), l && g[a].n && (m = 0, n += c.yOffset, n += q ? 1 : 0, q = !1), j.reset(), this.globalData.fontManager.chars && j.scale(c.s / 100, c.s / 100), l) {
                        switch (c.ps && j.translate(c.ps[0], c.ps[1] + c.ascent, 0), c.j) {
                            case 1:
                                j.translate(c.justifyOffset + (p - o[g[a].line]), 0, 0);
                                break;
                            case 2:
                                j.translate(c.justifyOffset + (p - o[g[a].line]) / 2, 0, 0)
                        }
                        j.translate(m, n, 0)
                    }
                    if (this.globalData.fontManager.chars) {
                        var s, t = this.globalData.fontManager.getCharData(c.t.charAt(a), d.fStyle, this.globalData.fontManager.getFontByName(c.f).fFamily);
                        s = t ? t.data : null, s && s.shapes && (i = s.shapes[0].it, l || (k = ""), k += this.createPathShape(j, i), l || h.setAttribute("d", k)), l || this.layerElement.appendChild(h)
                    } else h.textContent = g[a].val, h.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.layerElement.appendChild(h), l && h.setAttribute("transform", j.to2dCSS());
                    l && (m += g[a].l, m += c.tr / 1e3 * c.s), this.textSpans[r] = h, r += 1
                }
                if (!l)
                    for (; r < this.textSpans.length;) this.textSpans[r].style.display = "none", r += 1;
                l && this.globalData.fontManager.chars && (h.setAttribute("d", k), this.layerElement.appendChild(h))
            }
        }, SVGTextElement.prototype.hide = function() {
            this.hidden || (this.layerElement.style.display = "none", this.hidden = !0)
        }, SVGTextElement.prototype.renderFrame = function(a) {
            var b = this._parent.renderFrame.call(this, a);
            if (b === !1) return void this.hide();
            if (this.hidden && (this.hidden = !1, this.layerElement.style.display = "block"), !this.data.singleShape && (this.getMeasures(), this.lettersChangedFlag)) {
                var c, d, e = this.renderedLetters,
                    f = this.currentTextDocumentData.l;
                d = f.length;
                var g;
                for (c = 0; c < d; c += 1) f[c].n || (g = e[c], this.textSpans[c].setAttribute("transform", g.m), this.textSpans[c].setAttribute("opacity", g.o), g.sw && this.textSpans[c].setAttribute("stroke-width", g.sw), g.sc && this.textSpans[c].setAttribute("stroke", g.sc), g.fc && this.textSpans[c].setAttribute("fill", g.fc));
                this.firstFrame && (this.firstFrame = !1)
            }
        }, SVGTextElement.prototype.destroy = function() {
            this._parent.destroy.call()
        }, SVGTintFilter.prototype.renderFrame = function(a) {
            if (a || this.filterManager.mdf) {
                var b = this.filterManager.effectElements[0].p.v,
                    c = this.filterManager.effectElements[1].p.v,
                    d = this.filterManager.effectElements[2].p.v / 100;
                this.matrixFilter.setAttribute("values", c[0] - b[0] + " 0 0 0 " + b[0] + " " + (c[1] - b[1]) + " 0 0 0 " + b[1] + " " + (c[2] - b[2]) + " 0 0 0 " + b[2] + " 0 0 0 " + d + " 0")
            }
        }, SVGFillFilter.prototype.renderFrame = function(a) {
            if (a || this.filterManager.mdf) {
                var b = this.filterManager.effectElements[2].p.v,
                    c = this.filterManager.effectElements[6].p.v;
                this.matrixFilter.setAttribute("values", "0 0 0 0 " + b[0] + " 0 0 0 0 " + b[1] + " 0 0 0 0 " + b[2] + " 0 0 0 " + c + " 0")
            }
        }, SVGStrokeEffect.prototype.initialize = function() {
            var a, b, c, d, e = this.elem.layerElement.children || this.elem.layerElement.childNodes;
            for (1 === this.filterManager.effectElements[1].p.v ? (d = this.elem.maskManager.masksProperties.length, c = 0) : (c = this.filterManager.effectElements[0].p.v - 1, d = c + 1), b = document.createElementNS(svgNS, "g"), b.setAttribute("fill", "none"), b.setAttribute("stroke-linecap", "round"), b.setAttribute("stroke-dashoffset", 1), c; c < d; c += 1) a = document.createElementNS(svgNS, "path"), b.appendChild(a), this.paths.push({
                p: a,
                m: c
            });
            if (3 === this.filterManager.effectElements[10].p.v) {
                var f = document.createElementNS(svgNS, "mask"),
                    g = "stms_" + randomString(10);
                f.setAttribute("id", g), f.setAttribute("mask-type", "alpha"), f.appendChild(b), this.elem.globalData.defs.appendChild(f);
                var h = document.createElementNS(svgNS, "g");
                h.setAttribute("mask", "url(#" + g + ")"), e[0] && h.appendChild(e[0]), this.elem.layerElement.appendChild(h), this.masker = f, b.setAttribute("stroke", "#fff")
            } else if (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) {
                if (2 === this.filterManager.effectElements[10].p.v)
                    for (var e = this.elem.layerElement.children || this.elem.layerElement.childNodes; e.length;) this.elem.layerElement.removeChild(e[0]);
                this.elem.layerElement.appendChild(b), this.elem.layerElement.removeAttribute("mask"), b.setAttribute("stroke", "#fff")
            }
            this.initialized = !0, this.pathMasker = b
        }, SVGStrokeEffect.prototype.renderFrame = function(a) {
            this.initialized || this.initialize();
            var b, c, d, e = this.paths.length;
            for (b = 0; b < e; b += 1)
                if (c = this.elem.maskManager.viewData[this.paths[b].m], d = this.paths[b].p, (a || this.filterManager.mdf || c.prop.mdf) && d.setAttribute("d", c.lastPath), a || this.filterManager.effectElements[9].p.mdf || this.filterManager.effectElements[4].p.mdf || this.filterManager.effectElements[7].p.mdf || this.filterManager.effectElements[8].p.mdf || c.prop.mdf) {
                    var f;
                    if (0 !== this.filterManager.effectElements[7].p.v || 100 !== this.filterManager.effectElements[8].p.v) {
                        var g = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                            h = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) / 100,
                            i = d.getTotalLength();
                        f = "0 0 0 " + i * g + " ";
                        var j, k = i * (h - g),
                            l = 1 + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100,
                            m = Math.floor(k / l);
                        for (j = 0; j < m; j += 1) f += "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100 + " ";
                        f += "0 " + 10 * i + " 0 0"
                    } else f = "1 " + 2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v / 100;
                    d.setAttribute("stroke-dasharray", f)
                }
            if ((a || this.filterManager.effectElements[4].p.mdf) && this.pathMasker.setAttribute("stroke-width", 2 * this.filterManager.effectElements[4].p.v), (a || this.filterManager.effectElements[6].p.mdf) && this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v), (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) && (a || this.filterManager.effectElements[3].p.mdf)) {
                var n = this.filterManager.effectElements[3].p.v;
                this.pathMasker.setAttribute("stroke", "rgb(" + bm_floor(255 * n[0]) + "," + bm_floor(255 * n[1]) + "," + bm_floor(255 * n[2]) + ")")
            }
        }, SVGTritoneFilter.prototype.renderFrame = function(a) {
            if (a || this.filterManager.mdf) {
                var b = this.filterManager.effectElements[0].p.v,
                    c = this.filterManager.effectElements[1].p.v,
                    d = this.filterManager.effectElements[2].p.v,
                    e = d[0] + " " + c[0] + " " + b[0],
                    f = d[1] + " " + c[1] + " " + b[1],
                    g = d[2] + " " + c[2] + " " + b[2];
                this.feFuncR.setAttribute("tableValues", e), this.feFuncG.setAttribute("tableValues", f), this.feFuncB.setAttribute("tableValues", g)
            }
        }, SVGProLevelsFilter.prototype.createFeFunc = function(a, b) {
            var c = document.createElementNS(svgNS, a);
            return c.setAttribute("type", "table"), feComponentTransfer.appendChild(c), c
        }, SVGProLevelsFilter.prototype.getTableValue = function(a, b, c, d, e) {
            var f = Math.min(a, 0),
                g = d;
            for (1 === c ? bezier = {
                    get: function(a) {
                        return a
                    }
                } : c > 1 ? (perc = (c - 1) / 4, bezier = BezierFactory.getBezierEasing(0, perc, 1 - perc, 1)) : (perc = c / 1, bezier = BezierFactory.getBezierEasing(1 - perc, 0, 1, perc)); f < 1;) perc = bezier.get(f), f < 0 || (g += perc <= a ? " " + d : perc > a && perc < b ? " " + (d + (e - d) * ((perc - a) / (b - a))) : " " + e), f += 1 / 255;
            return g
        }, SVGProLevelsFilter.prototype.renderFrame = function(a) {
            if (a || this.filterManager.mdf) {
                var b, c = this.filterManager.effectElements;
                this.feFuncRComposed && (a || c[2].p.mdf || c[3].p.mdf || c[4].p.mdf || c[5].p.mdf || c[6].p.mdf) && (b = this.getTableValue(c[2].p.v, c[3].p.v, c[4].p.v, c[5].p.v, c[6].p.v), this.feFuncRComposed.setAttribute("tableValues", b), this.feFuncGComposed.setAttribute("tableValues", b), this.feFuncBComposed.setAttribute("tableValues", b)), this.feFuncR && (a || c[9].p.mdf || c[10].p.mdf || c[11].p.mdf || c[12].p.mdf || c[13].p.mdf) && (b = this.getTableValue(c[9].p.v, c[10].p.v, c[11].p.v, c[12].p.v, c[13].p.v), this.feFuncR.setAttribute("tableValues", b)), this.feFuncG && (a || c[16].p.mdf || c[17].p.mdf || c[18].p.mdf || c[19].p.mdf || c[20].p.mdf) && (b = this.getTableValue(c[16].p.v, c[17].p.v, c[18].p.v, c[19].p.v, c[20].p.v), this.feFuncG.setAttribute("tableValues", b)), this.feFuncB && (a || c[23].p.mdf || c[24].p.mdf || c[25].p.mdf || c[26].p.mdf || c[27].p.mdf) && (b = this.getTableValue(c[23].p.v, c[24].p.v, c[25].p.v, c[26].p.v, c[27].p.v), this.feFuncB.setAttribute("tableValues", b)), this.feFuncA && (a || c[30].p.mdf || c[31].p.mdf || c[32].p.mdf || c[33].p.mdf || c[34].p.mdf) && (b = this.getTableValue(c[30].p.v, c[31].p.v, c[32].p.v, c[33].p.v, c[34].p.v), this.feFuncA.setAttribute("tableValues", b))
            }
        }, SVGEffects.prototype.renderFrame = function(a) {
            var b, c = this.filters.length;
            for (b = 0; b < c; b += 1) this.filters[b].renderFrame(a)
        }, createElement(SVGBaseElement, ICompElement), ICompElement.prototype.hide = function() {
            if (!this.hidden) {
                var a, b = this.elements.length;
                for (a = 0; a < b; a += 1) this.elements[a] && this.elements[a].hide();
                this.hidden = !0
            }
        }, ICompElement.prototype.prepareFrame = function(a) {
            if (this._parent.prepareFrame.call(this, a), this.isVisible !== !1 || this.data.xt) {
                if (this.tm) {
                    var b = this.tm.v;
                    b === this.data.op && (b = this.data.op - 1), this.renderedFrame = b
                } else this.renderedFrame = a / this.data.sr;
                var c, d = this.elements.length;
                for (this.completeLayers || this.checkLayers(this.renderedFrame), c = 0; c < d; c += 1)(this.completeLayers || this.elements[c]) && this.elements[c].prepareFrame(this.renderedFrame - this.layers[c].st)
            }
        }, ICompElement.prototype.renderFrame = function(a) {
            var b, c = this._parent.renderFrame.call(this, a),
                d = this.layers.length;
            if (c === !1) return void this.hide();
            for (this.hidden = !1, b = 0; b < d; b += 1)(this.completeLayers || this.elements[b]) && this.elements[b].renderFrame();
            this.firstFrame && (this.firstFrame = !1)
        }, ICompElement.prototype.setElements = function(a) {
            this.elements = a
        }, ICompElement.prototype.getElements = function() {
            return this.elements
        }, ICompElement.prototype.destroy = function() {
            this._parent.destroy.call();
            var a, b = this.layers.length;
            for (a = 0; a < b; a += 1) this.elements[a] && this.elements[a].destroy()
        }, ICompElement.prototype.checkLayers = SVGRenderer.prototype.checkLayers, ICompElement.prototype.buildItem = SVGRenderer.prototype.buildItem, ICompElement.prototype.buildAllItems = SVGRenderer.prototype.buildAllItems, ICompElement.prototype.buildElementParenting = SVGRenderer.prototype.buildElementParenting, ICompElement.prototype.createItem = SVGRenderer.prototype.createItem, ICompElement.prototype.createImage = SVGRenderer.prototype.createImage, ICompElement.prototype.createComp = SVGRenderer.prototype.createComp, ICompElement.prototype.createSolid = SVGRenderer.prototype.createSolid, ICompElement.prototype.createShape = SVGRenderer.prototype.createShape, ICompElement.prototype.createText = SVGRenderer.prototype.createText, ICompElement.prototype.createBase = SVGRenderer.prototype.createBase, ICompElement.prototype.appendElementInPos = SVGRenderer.prototype.appendElementInPos, ICompElement.prototype.checkPendingElements = SVGRenderer.prototype.checkPendingElements, ICompElement.prototype.addPendingElement = SVGRenderer.prototype.addPendingElement, createElement(SVGBaseElement, IImageElement), IImageElement.prototype.createElements = function() {
            var a = this.globalData.getAssetsPath(this.assetData);
            this._parent.createElements.call(this), this.innerElem = document.createElementNS(svgNS, "image"), this.innerElem.setAttribute("width", this.assetData.w + "px"), this.innerElem.setAttribute("height", this.assetData.h + "px"), this.innerElem.setAttribute("preserveAspectRatio", "xMidYMid slice"), this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", a), this.maskedElement = this.innerElem, this.layerElement.appendChild(this.innerElem), this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl)
        }, IImageElement.prototype.hide = function() {
            this.hidden || (this.layerElement.style.display = "none", this.hidden = !0)
        }, IImageElement.prototype.renderFrame = function(a) {
            var b = this._parent.renderFrame.call(this, a);
            return b === !1 ? void this.hide() : (this.hidden && (this.hidden = !1, this.layerElement.style.display = "block"), void(this.firstFrame && (this.firstFrame = !1)))
        }, IImageElement.prototype.destroy = function() {
            this._parent.destroy.call(), this.innerElem = null
        }, createElement(SVGBaseElement, IShapeElement), IShapeElement.prototype.lcEnum = {
            1: "butt",
            2: "round",
            3: "butt"
        }, IShapeElement.prototype.ljEnum = {
            1: "miter",
            2: "round",
            3: "butt"
        }, IShapeElement.prototype.buildExpressionInterface = function() {}, IShapeElement.prototype.createElements = function() {
            this._parent.createElements.call(this), this.searchShapes(this.shapesData, this.viewData, this.layerElement, this.dynamicProperties, 0), this.data.hd && !this.data.td || styleUnselectableDiv(this.layerElement)
        }, IShapeElement.prototype.setGradientData = function(a, b, c) {
            var d, e = "gr_" + randomString(10);
            d = 1 === b.t ? document.createElementNS(svgNS, "linearGradient") : document.createElementNS(svgNS, "radialGradient"), d.setAttribute("id", e), d.setAttribute("spreadMethod", "pad"), d.setAttribute("gradientUnits", "userSpaceOnUse");
            var f, g, h, i = [];
            for (h = 4 * b.g.p, g = 0; g < h; g += 4) f = document.createElementNS(svgNS, "stop"), d.appendChild(f), i.push(f);
            a.setAttribute("gf" === b.ty ? "fill" : "stroke", "url(#" + e + ")"), this.globalData.defs.appendChild(d), c.gf = d, c.cst = i
        }, IShapeElement.prototype.setGradientOpacity = function(a, b, c) {
            if (a.g.k.k[0].s && a.g.k.k[0].s.length > 4 * a.g.p || a.g.k.k.length > 4 * a.g.p) {
                var d, e, f, g, h = document.createElementNS(svgNS, "mask"),
                    i = document.createElementNS(svgNS, "path");
                h.appendChild(i);
                var j = "op_" + randomString(10),
                    k = "mk_" + randomString(10);
                h.setAttribute("id", k), d = 1 === a.t ? document.createElementNS(svgNS, "linearGradient") : document.createElementNS(svgNS, "radialGradient"), d.setAttribute("id", j), d.setAttribute("spreadMethod", "pad"), d.setAttribute("gradientUnits", "userSpaceOnUse"), g = a.g.k.k[0].s ? a.g.k.k[0].s.length : a.g.k.k.length;
                var l = [];
                for (f = 4 * a.g.p; f < g; f += 2) e = document.createElementNS(svgNS, "stop"), e.setAttribute("stop-color", "rgb(255,255,255)"), d.appendChild(e), l.push(e);
                return i.setAttribute("gf" === a.ty ? "fill" : "stroke", "url(#" + j + ")"), this.globalData.defs.appendChild(d), this.globalData.defs.appendChild(h), b.of = d, b.ost = l, c.msElem = i, k
            }
        }, IShapeElement.prototype.searchShapes = function(a, b, c, d, e, f) {
            f = f || [];
            var g, h, i, j, k, l = [].concat(f),
                m = a.length - 1,
                n = [],
                o = [];
            for (g = m; g >= 0; g -= 1)
                if ("fl" == a[g].ty || "st" == a[g].ty || "gf" == a[g].ty || "gs" == a[g].ty) {
                    b[g] = {}, j = {
                        type: a[g].ty,
                        d: "",
                        ld: "",
                        lvl: e,
                        mdf: !1
                    };
                    var p = document.createElementNS(svgNS, "path");
                    if (b[g].o = PropertyFactory.getProp(this, a[g].o, 0, .01, d), ("st" == a[g].ty || "gs" == a[g].ty) && (p.setAttribute("stroke-linecap", this.lcEnum[a[g].lc] || "round"), p.setAttribute("stroke-linejoin", this.ljEnum[a[g].lj] || "round"), p.setAttribute("fill-opacity", "0"), 1 == a[g].lj && p.setAttribute("stroke-miterlimit", a[g].ml), b[g].w = PropertyFactory.getProp(this, a[g].w, 0, null, d), a[g].d)) {
                        var q = PropertyFactory.getDashProp(this, a[g].d, "svg", d);
                        q.k || (p.setAttribute("stroke-dasharray", q.dasharray), p.setAttribute("stroke-dashoffset", q.dashoffset)), b[g].d = q
                    }
                    if ("fl" == a[g].ty || "st" == a[g].ty) b[g].c = PropertyFactory.getProp(this, a[g].c, 1, 255, d), c.appendChild(p);
                    else {
                        b[g].g = PropertyFactory.getGradientProp(this, a[g].g, d), 2 == a[g].t && (b[g].h = PropertyFactory.getProp(this, a[g].h, 1, .01, d), b[g].a = PropertyFactory.getProp(this, a[g].a, 1, degToRads, d)), b[g].s = PropertyFactory.getProp(this, a[g].s, 1, null, d), b[g].e = PropertyFactory.getProp(this, a[g].e, 1, null, d), this.setGradientData(p, a[g], b[g], j);
                        var r = this.setGradientOpacity(a[g], b[g], j);
                        r && p.setAttribute("mask", "url(#" + r + ")"), b[g].elem = p, c.appendChild(p)
                    }
                    a[g].ln && p.setAttribute("id", a[g].ln), a[g].cl && p.setAttribute("class", a[g].cl), j.pElem = p, this.stylesList.push(j), b[g].style = j, n.push(j)
                } else if ("gr" == a[g].ty) {
                b[g] = {
                    it: []
                };
                var s = document.createElementNS(svgNS, "g");
                c.appendChild(s), b[g].gr = s, this.searchShapes(a[g].it, b[g].it, s, d, e + 1, f)
            } else if ("tr" == a[g].ty) b[g] = {
                transform: {
                    op: PropertyFactory.getProp(this, a[g].o, 0, .01, d),
                    mProps: PropertyFactory.getProp(this, a[g], 2, null, d)
                },
                elements: []
            }, k = b[g].transform, l.push(k);
            else if ("sh" == a[g].ty || "rc" == a[g].ty || "el" == a[g].ty || "sr" == a[g].ty) {
                b[g] = {
                    elements: [],
                    caches: [],
                    styles: [],
                    transformers: l,
                    lStr: ""
                };
                var t = 4;
                for ("rc" == a[g].ty ? t = 5 : "el" == a[g].ty ? t = 6 : "sr" == a[g].ty && (t = 7), b[g].sh = ShapePropertyFactory.getShapeProp(this, a[g], t, d), b[g].lvl = e, this.shapes.push(b[g].sh), this.addShapeToModifiers(b[g].sh), i = this.stylesList.length, h = 0; h < i; h += 1) this.stylesList[h].closed || b[g].elements.push({
                    ty: this.stylesList[h].type,
                    st: this.stylesList[h]
                })
            } else if ("tm" == a[g].ty || "rd" == a[g].ty || "ms" == a[g].ty) {
                var u = ShapeModifiers.getModifier(a[g].ty);
                u.init(this, a[g], d), this.shapeModifiers.push(u), o.push(u), b[g] = u
            }
            for (m = n.length, g = 0; g < m; g += 1) n[g].closed = !0;
            for (m = o.length, g = 0; g < m; g += 1) o[g].closed = !0
        }, IShapeElement.prototype.addShapeToModifiers = function(a) {
            var b, c = this.shapeModifiers.length;
            for (b = 0; b < c; b += 1) this.shapeModifiers[b].addShape(a)
        }, IShapeElement.prototype.renderModifiers = function() {
            if (this.shapeModifiers.length) {
                var a, b = this.shapes.length;
                for (a = 0; a < b; a += 1) this.shapes[a].reset();
                for (b = this.shapeModifiers.length, a = b - 1; a >= 0; a -= 1) this.shapeModifiers[a].processShapes(this.firstFrame)
            }
        }, IShapeElement.prototype.renderFrame = function(a) {
            var b = this._parent.renderFrame.call(this, a);
            return b === !1 ? void this.hide() : (this.globalToLocal([0, 0, 0]), this.hidden && (this.layerElement.style.display = "block", this.hidden = !1), this.renderModifiers(), void this.renderShape(null, null, !0, null))
        }, IShapeElement.prototype.hide = function() {
            if (!this.hidden) {
                this.layerElement.style.display = "none";
                var a, b = this.stylesList.length;
                for (a = b - 1; a >= 0; a -= 1) "0" !== this.stylesList[a].ld && (this.stylesList[a].ld = "0", this.stylesList[a].pElem.style.display = "none", this.stylesList[a].pElem.parentNode && (this.stylesList[a].parent = this.stylesList[a].pElem.parentNode));
                this.hidden = !0
            }
        }, IShapeElement.prototype.renderShape = function(a, b, c, d) {
            var e, f;
            if (!a)
                for (a = this.shapesData, f = this.stylesList.length, e = 0; e < f; e += 1) this.stylesList[e].d = "", this.stylesList[e].mdf = !1;
            b || (b = this.viewData), f = a.length - 1;
            var g;
            for (e = f; e >= 0; e -= 1) g = a[e].ty, "tr" == g ? ((this.firstFrame || b[e].transform.op.mdf && d) && d.setAttribute("opacity", b[e].transform.op.v), (this.firstFrame || b[e].transform.mProps.mdf && d) && d.setAttribute("transform", b[e].transform.mProps.v.to2dCSS())) : "sh" == g || "el" == g || "rc" == g || "sr" == g ? this.renderPath(a[e], b[e]) : "fl" == g ? this.renderFill(a[e], b[e]) : "gf" == g ? this.renderGradient(a[e], b[e]) : "gs" == g ? (this.renderGradient(a[e], b[e]), this.renderStroke(a[e], b[e])) : "st" == g ? this.renderStroke(a[e], b[e]) : "gr" == g && this.renderShape(a[e].it, b[e].it, !1, b[e].gr);
            if (c) {
                for (f = this.stylesList.length, e = 0; e < f; e += 1) "0" === this.stylesList[e].ld && (this.stylesList[e].ld = "1", this.stylesList[e].pElem.style.display = "block"), (this.stylesList[e].mdf || this.firstFrame) && (this.stylesList[e].pElem.setAttribute("d", this.stylesList[e].d), this.stylesList[e].msElem && this.stylesList[e].msElem.setAttribute("d", this.stylesList[e].d));
                this.firstFrame && (this.firstFrame = !1)
            }
        }, IShapeElement.prototype.renderPath = function(a, b) {
            var c, d, e, f, g, h, i, j, k = b.elements.length,
                l = b.lvl;
            for (j = 0; j < k; j += 1) {
                h = b.sh.mdf || this.firstFrame, g = "";
                var m = b.sh.paths;
                if (f = m.length, b.elements[j].st.lvl < l) {
                    var n, o, p = this.mHelper.reset();
                    for (o = b.transformers.length - 1; o >= 0; o -= 1) h = b.transformers[o].mProps.mdf || h, n = b.transformers[o].mProps.v.props, p.transform(n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], n[8], n[9], n[10], n[11], n[12], n[13], n[14], n[15]);
                    if (h) {
                        for (e = 0; e < f; e += 1)
                            if (i = m[e], i && i.v) {
                                for (c = i.v.length, d = 1; d < c; d += 1) 1 == d && (g += " M" + p.applyToPointStringified(i.v[0][0], i.v[0][1])), g += " C" + p.applyToPointStringified(i.o[d - 1][0], i.o[d - 1][1]) + " " + p.applyToPointStringified(i.i[d][0], i.i[d][1]) + " " + p.applyToPointStringified(i.v[d][0], i.v[d][1]);
                                1 == c && (g += " M" + p.applyToPointStringified(i.v[0][0], i.v[0][1])), i.c && (g += " C" + p.applyToPointStringified(i.o[d - 1][0], i.o[d - 1][1]) + " " + p.applyToPointStringified(i.i[0][0], i.i[0][1]) + " " + p.applyToPointStringified(i.v[0][0], i.v[0][1]), g += "z")
                            }
                        b.caches[j] = g
                    } else g = b.caches[j]
                } else if (h) {
                    for (e = 0; e < f; e += 1)
                        if (i = m[e], i && i.v) {
                            for (c = i.v.length, d = 1; d < c; d += 1) 1 == d && (g += " M" + i.v[0].join(",")), g += " C" + i.o[d - 1].join(",") + " " + i.i[d].join(",") + " " + i.v[d].join(",");
                            1 == c && (g += " M" + i.v[0].join(",")), i.c && c && (g += " C" + i.o[d - 1].join(",") + " " + i.i[0].join(",") + " " + i.v[0].join(","), g += "z")
                        }
                    b.caches[j] = g
                } else g = b.caches[j];
                b.elements[j].st.d += g, b.elements[j].st.mdf = h || b.elements[j].st.mdf
            }
        }, IShapeElement.prototype.renderFill = function(a, b) {
            var c = b.style;
            (b.c.mdf || this.firstFrame) && c.pElem.setAttribute("fill", "rgb(" + bm_floor(b.c.v[0]) + "," + bm_floor(b.c.v[1]) + "," + bm_floor(b.c.v[2]) + ")"), (b.o.mdf || this.firstFrame) && c.pElem.setAttribute("fill-opacity", b.o.v)
        }, IShapeElement.prototype.renderGradient = function(a, b) {
            var c = b.gf,
                d = b.of,
                e = b.s.v,
                f = b.e.v;
            if (b.o.mdf || this.firstFrame) {
                var g = "gf" === a.ty ? "fill-opacity" : "stroke-opacity";
                b.elem.setAttribute(g, b.o.v)
            }
            if (b.s.mdf || this.firstFrame) {
                var h = 1 === a.t ? "x1" : "cx",
                    i = "x1" === h ? "y1" : "cy";
                c.setAttribute(h, e[0]), c.setAttribute(i, e[1]), d && (d.setAttribute(h, e[0]), d.setAttribute(i, e[1]))
            }
            var j, k, l, m;
            if (b.g.cmdf || this.firstFrame) {
                j = b.cst;
                var n = b.g.c;
                for (l = j.length, k = 0; k < l; k += 1) m = j[k], m.setAttribute("offset", n[4 * k] + "%"), m.setAttribute("stop-color", "rgb(" + n[4 * k + 1] + "," + n[4 * k + 2] + "," + n[4 * k + 3] + ")")
            }
            if (d && (b.g.omdf || this.firstFrame)) {
                j = b.ost;
                var o = b.g.o;
                for (l = j.length, k = 0; k < l; k += 1) m = j[k], m.setAttribute("offset", o[2 * k] + "%"), m.setAttribute("stop-opacity", o[2 * k + 1])
            }
            if (1 === a.t)(b.e.mdf || this.firstFrame) && (c.setAttribute("x2", f[0]), c.setAttribute("y2", f[1]), d && (d.setAttribute("x2", f[0]), d.setAttribute("y2", f[1])));
            else {
                var p;
                if ((b.s.mdf || b.e.mdf || this.firstFrame) && (p = Math.sqrt(Math.pow(e[0] - f[0], 2) + Math.pow(e[1] - f[1], 2)), c.setAttribute("r", p), d && d.setAttribute("r", p)), b.e.mdf || b.h.mdf || b.a.mdf || this.firstFrame) {
                    p || (p = Math.sqrt(Math.pow(e[0] - f[0], 2) + Math.pow(e[1] - f[1], 2)));
                    var q = Math.atan2(f[1] - e[1], f[0] - e[0]),
                        r = b.h.v >= 1 ? .99 : b.h.v <= -1 ? -.99 : b.h.v,
                        s = p * r,
                        t = Math.cos(q + b.a.v) * s + e[0],
                        u = Math.sin(q + b.a.v) * s + e[1];
                    c.setAttribute("fx", t), c.setAttribute("fy", u), d && (d.setAttribute("fx", t), d.setAttribute("fy", u))
                }
            }
        }, IShapeElement.prototype.renderStroke = function(a, b) {
            var c = b.style,
                d = b.d;
            d && d.k && (d.mdf || this.firstFrame) && (c.pElem.setAttribute("stroke-dasharray", d.dasharray), c.pElem.setAttribute("stroke-dashoffset", d.dashoffset)), b.c && (b.c.mdf || this.firstFrame) && c.pElem.setAttribute("stroke", "rgb(" + bm_floor(b.c.v[0]) + "," + bm_floor(b.c.v[1]) + "," + bm_floor(b.c.v[2]) + ")"), (b.o.mdf || this.firstFrame) && c.pElem.setAttribute("stroke-opacity", b.o.v), (b.w.mdf || this.firstFrame) && (c.pElem.setAttribute("stroke-width", b.w.v), c.msElem && c.msElem.setAttribute("stroke-width", b.w.v))
        }, IShapeElement.prototype.destroy = function() {
            this._parent.destroy.call(), this.shapeData = null, this.viewData = null, this.parentContainer = null, this.placeholder = null
        }, createElement(SVGBaseElement, ISolidElement), ISolidElement.prototype.createElements = function() {
            this._parent.createElements.call(this);
            var a = document.createElementNS(svgNS, "rect");
            a.setAttribute("width", this.data.sw), a.setAttribute("height", this.data.sh), a.setAttribute("fill", this.data.sc), this.layerElement.appendChild(a), this.innerElem = a, this.data.ln && this.layerElement.setAttribute("id", this.data.ln), this.data.cl && this.layerElement.setAttribute("class", this.data.cl)
        }, ISolidElement.prototype.hide = IImageElement.prototype.hide, ISolidElement.prototype.renderFrame = IImageElement.prototype.renderFrame, ISolidElement.prototype.destroy = IImageElement.prototype.destroy;
        var animationManager = function() {
                function a(a) {
                    for (var b = 0, c = a.target; b < y;) w[b].animation === c && (w.splice(b, 1), b -= 1, y -= 1, c.isPaused || d()), b += 1
                }

                function b(a, b) {
                    if (!a) return null;
                    for (var c = 0; c < y;) {
                        if (w[c].elem == a && null !== w[c].elem) return w[c].animation;
                        c += 1
                    }
                    var d = new AnimationItem;
                    return d.setData(a, b), e(d, a), d
                }

                function c() {
                    A += 1, u()
                }

                function d() {
                    A -= 1, 0 === A && (z = !0)
                }

                function e(b, e) {
                    b.addEventListener("destroy", a), b.addEventListener("_active", c), b.addEventListener("_idle", d), w.push({
                        elem: e,
                        animation: b
                    }), y += 1
                }

                function f(a) {
                    var b = new AnimationItem;
                    return e(b, null), b.setParams(a), b
                }

                function g(a, b) {
                    var c;
                    for (c = 0; c < y; c += 1) w[c].animation.setSpeed(a, b)
                }

                function h(a, b) {
                    var c;
                    for (c = 0; c < y; c += 1) w[c].animation.setDirection(a, b)
                }

                function i(a) {
                    var b;
                    for (b = 0; b < y; b += 1) w[b].animation.play(a)
                }

                function j(a, b) {
                    x = Date.now();
                    var c;
                    for (c = 0; c < y; c += 1) w[c].animation.moveFrame(a, b)
                }

                function k(a) {
                    var b, c = a - x;
                    for (b = 0; b < y; b += 1) w[b].animation.advanceTime(c);
                    x = a, z || requestAnimationFrame(k)
                }

                function l(a) {
                    x = a, requestAnimationFrame(k)
                }

                function m(a) {
                    var b;
                    for (b = 0; b < y; b += 1) w[b].animation.pause(a)
                }

                function n(a, b, c) {
                    var d;
                    for (d = 0; d < y; d += 1) w[d].animation.goToAndStop(a, b, c)
                }

                function o(a) {
                    var b;
                    for (b = 0; b < y; b += 1) w[b].animation.stop(a)
                }

                function p(a) {
                    var b;
                    for (b = 0; b < y; b += 1) w[b].animation.togglePause(a)
                }

                function q(a) {
                    var b;
                    for (b = y - 1; b >= 0; b -= 1) w[b].animation.destroy(a)
                }

                function r(a, c, d) {
                    var e, f = document.getElementsByClassName("bodymovin"),
                        g = f.length;
                    for (e = 0; e < g; e += 1) d && f[e].setAttribute("data-bm-type", d), b(f[e], a);
                    if (c && 0 === g) {
                        d || (d = "svg");
                        var h = document.getElementsByTagName("body")[0];
                        h.innerHTML = "";
                        var i = document.createElement("div");
                        i.style.width = "100%", i.style.height = "100%", i.setAttribute("data-bm-type", d), h.appendChild(i), b(i, a)
                    }
                }

                function s() {
                    var a;
                    for (a = 0; a < y; a += 1) w[a].animation.resize()
                }

                function t() {
                    requestAnimationFrame(l)
                }

                function u() {
                    z && (z = !1, requestAnimationFrame(l))
                }
                var v = {},
                    w = [],
                    x = 0,
                    y = 0,
                    z = !0,
                    A = 0;
                return setTimeout(t, 0), v.registerAnimation = b, v.loadAnimation = f, v.setSpeed = g, v.setDirection = h, v.play = i, v.moveFrame = j, v.pause = m, v.stop = o, v.togglePause = p, v.searchAnimations = r, v.resize = s, v.start = t, v.goToAndStop = n, v.destroy = q, v
            }(),
            AnimationItem = function() {
                this._cbs = [], this.name = "", this.path = "", this.isLoaded = !1, this.currentFrame = 0, this.currentRawFrame = 0, this.totalFrames = 0, this.frameRate = 0, this.frameMult = 0, this.playSpeed = 1, this.playDirection = 1, this.pendingElements = 0, this.playCount = 0, this.prerenderFramesFlag = !0, this.animationData = {}, this.layers = [], this.assets = [], this.isPaused = !0, this.autoplay = !1, this.loop = !0, this.renderer = null, this.animationID = randomString(10), this.scaleMode = "fit", this.assetsPath = "", this.timeCompleted = 0, this.segmentPos = 0, this.subframeEnabled = subframeEnabled, this.segments = [], this.pendingSegment = !1, this._idle = !0, this.projectInterface = ProjectInterface()
            };
        AnimationItem.prototype.setParams = function(a) {
            var b = this;
            a.context && (this.context = a.context), (a.wrapper || a.container) && (this.wrapper = a.wrapper || a.container);
            var c = a.animType ? a.animType : a.renderer ? a.renderer : "svg";
            switch (c) {
                case "canvas":
                    this.renderer = new CanvasRenderer(this, a.rendererSettings);
                    break;
                case "svg":
                    this.renderer = new SVGRenderer(this, a.rendererSettings);
                    break;
                case "hybrid":
                case "html":
                default:
                    this.renderer = new HybridRenderer(this, a.rendererSettings)
            }
            if (this.renderer.setProjectInterface(this.projectInterface), this.animType = c, "" === a.loop || null === a.loop || (a.loop === !1 ? this.loop = !1 : a.loop === !0 ? this.loop = !0 : this.loop = parseInt(a.loop)), this.autoplay = !("autoplay" in a) || a.autoplay, this.name = a.name ? a.name : "", this.prerenderFramesFlag = !("prerender" in a) || a.prerender, this.autoloadSegments = !a.hasOwnProperty("autoloadSegments") || a.autoloadSegments, a.animationData) b.configAnimation(a.animationData);
            else if (a.path) {
                "json" != a.path.substr(-4) && ("/" != a.path.substr(-1, 1) && (a.path += "/"), a.path += "data.json");
                var d = new XMLHttpRequest;
                a.path.lastIndexOf("\\") != -1 ? this.path = a.path.substr(0, a.path.lastIndexOf("\\") + 1) : this.path = a.path.substr(0, a.path.lastIndexOf("/") + 1), this.assetsPath = a.assetsPath, this.fileName = a.path.substr(a.path.lastIndexOf("/") + 1), this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json")), d.open("GET", a.path, !0), d.send(), d.onreadystatechange = function() {
                    if (4 == d.readyState)
                        if (200 == d.status) b.configAnimation(JSON.parse(d.responseText));
                        else try {
                            var a = JSON.parse(d.responseText);
                            b.configAnimation(a)
                        } catch (c) {}
                }
            }
        }, AnimationItem.prototype.setData = function(a, b) {
            var c = {
                    wrapper: a,
                    animationData: b ? "object" == typeof b ? b : JSON.parse(b) : null
                },
                d = a.attributes;
            c.path = d.getNamedItem("data-animation-path") ? d.getNamedItem("data-animation-path").value : d.getNamedItem("data-bm-path") ? d.getNamedItem("data-bm-path").value : d.getNamedItem("bm-path") ? d.getNamedItem("bm-path").value : "", c.animType = d.getNamedItem("data-anim-type") ? d.getNamedItem("data-anim-type").value : d.getNamedItem("data-bm-type") ? d.getNamedItem("data-bm-type").value : d.getNamedItem("bm-type") ? d.getNamedItem("bm-type").value : d.getNamedItem("data-bm-renderer") ? d.getNamedItem("data-bm-renderer").value : d.getNamedItem("bm-renderer") ? d.getNamedItem("bm-renderer").value : "canvas";
            var e = d.getNamedItem("data-anim-loop") ? d.getNamedItem("data-anim-loop").value : d.getNamedItem("data-bm-loop") ? d.getNamedItem("data-bm-loop").value : d.getNamedItem("bm-loop") ? d.getNamedItem("bm-loop").value : "";
            "" === e || ("false" === e ? c.loop = !1 : "true" === e ? c.loop = !0 : c.loop = parseInt(e));
            var f = d.getNamedItem("data-anim-autoplay") ? d.getNamedItem("data-anim-autoplay").value : d.getNamedItem("data-bm-autoplay") ? d.getNamedItem("data-bm-autoplay").value : !d.getNamedItem("bm-autoplay") || d.getNamedItem("bm-autoplay").value;
            c.autoplay = "false" !== f, c.name = d.getNamedItem("data-name") ? d.getNamedItem("data-name").value : d.getNamedItem("data-bm-name") ? d.getNamedItem("data-bm-name").value : d.getNamedItem("bm-name") ? d.getNamedItem("bm-name").value : "";
            var g = d.getNamedItem("data-anim-prerender") ? d.getNamedItem("data-anim-prerender").value : d.getNamedItem("data-bm-prerender") ? d.getNamedItem("data-bm-prerender").value : d.getNamedItem("bm-prerender") ? d.getNamedItem("bm-prerender").value : "";
            "false" === g && (c.prerender = !1), this.setParams(c)
        }, AnimationItem.prototype.includeLayers = function(a) {
            a.op > this.animationData.op && (this.animationData.op = a.op, this.totalFrames = Math.floor(a.op - this.animationData.ip), this.animationData.tf = this.totalFrames);
            var b, c, d = this.animationData.layers,
                e = d.length,
                f = a.layers,
                g = f.length;
            for (c = 0; c < g; c += 1)
                for (b = 0; b < e;) {
                    if (d[b].id == f[c].id) {
                        d[b] = f[c];
                        break
                    }
                    b += 1
                }
            if ((a.chars || a.fonts) && (this.renderer.globalData.fontManager.addChars(a.chars), this.renderer.globalData.fontManager.addFonts(a.fonts, this.renderer.globalData.defs)), a.assets)
                for (e = a.assets.length, b = 0; b < e; b += 1) this.animationData.assets.push(a.assets[b]);
            this.animationData.__complete = !1, dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.renderer.includeLayers(a.layers), expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.renderFrame(null), this.loadNextSegment()
        }, AnimationItem.prototype.loadNextSegment = function() {
            var a = this.animationData.segments;
            if (!a || 0 === a.length || !this.autoloadSegments) return this.trigger("data_ready"), void(this.timeCompleted = this.animationData.tf);
            var b = a.shift();
            this.timeCompleted = b.time * this.frameRate;
            var c = new XMLHttpRequest,
                d = this,
                e = this.path + this.fileName + "_" + this.segmentPos + ".json";
            this.segmentPos += 1, c.open("GET", e, !0), c.send(), c.onreadystatechange = function() {
                if (4 == c.readyState)
                    if (200 == c.status) d.includeLayers(JSON.parse(c.responseText));
                    else try {
                        var a = JSON.parse(c.responseText);
                        d.includeLayers(a)
                    } catch (b) {}
            }
        }, AnimationItem.prototype.loadSegments = function() {
            var a = this.animationData.segments;
            a || (this.timeCompleted = this.animationData.tf), this.loadNextSegment()
        }, AnimationItem.prototype.configAnimation = function(a) {
            this.renderer && this.renderer.destroyed || (this.animationData = a, this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip), this.animationData.tf = this.totalFrames, this.renderer.configAnimation(a), a.assets || (a.assets = []), a.comps && (a.assets = a.assets.concat(a.comps), a.comps = null), this.renderer.searchExtraCompositions(a.assets), this.layers = this.animationData.layers, this.assets = this.animationData.assets, this.frameRate = this.animationData.fr, this.firstFrame = Math.round(this.animationData.ip), this.frameMult = this.animationData.fr / 1e3, this.trigger("config_ready"), this.imagePreloader = new ImagePreloader, this.imagePreloader.setAssetsPath(this.assetsPath), this.imagePreloader.setPath(this.path), this.imagePreloader.loadAssets(a.assets), this.loadSegments(), this.updaFrameModifier(), this.renderer.globalData.fontManager ? this.waitForFontsLoaded() : (dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.checkLoaded()))
        }, AnimationItem.prototype.waitForFontsLoaded = function() {
            function a() {
                this.renderer.globalData.fontManager.loaded ? (dataManager.completeData(this.animationData, this.renderer.globalData.fontManager), this.checkLoaded()) : setTimeout(a.bind(this), 20)
            }
            return function() {
                a.bind(this)()
            }
        }(), AnimationItem.prototype.addPendingElement = function() {
            this.pendingElements += 1
        }, AnimationItem.prototype.elementLoaded = function() {
            this.pendingElements--, this.checkLoaded()
        }, AnimationItem.prototype.checkLoaded = function() {
            0 === this.pendingElements && (expressionsPlugin && expressionsPlugin.initExpressions(this), this.renderer.initItems(), setTimeout(function() {
                this.trigger("DOMLoaded")
            }.bind(this), 0), this.isLoaded = !0, this.gotoFrame(), this.autoplay && this.play())
        }, AnimationItem.prototype.resize = function() {
            this.renderer.updateContainerSize()
        }, AnimationItem.prototype.setSubframe = function(a) {
            this.subframeEnabled = !!a
        }, AnimationItem.prototype.gotoFrame = function() {
            this.subframeEnabled ? this.currentFrame = this.currentRawFrame : this.currentFrame = Math.floor(this.currentRawFrame), this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted && (this.currentFrame = this.timeCompleted), this.trigger("enterFrame"), this.renderFrame()
        }, AnimationItem.prototype.renderFrame = function() {
            this.isLoaded !== !1 && this.renderer.renderFrame(this.currentFrame + this.firstFrame)
        }, AnimationItem.prototype.play = function(a) {
            a && this.name != a || this.isPaused === !0 && (this.isPaused = !1, this._idle && (this._idle = !1, this.trigger("_active")))
        }, AnimationItem.prototype.pause = function(a) {
            a && this.name != a || this.isPaused === !1 && (this.isPaused = !0, this.pendingSegment || (this._idle = !0, this.trigger("_idle")))
        }, AnimationItem.prototype.togglePause = function(a) {
            a && this.name != a || (this.isPaused === !0 ? this.play() : this.pause())
        }, AnimationItem.prototype.stop = function(a) {
            a && this.name != a || (this.pause(), this.currentFrame = this.currentRawFrame = 0, this.playCount = 0, this.gotoFrame())
        }, AnimationItem.prototype.goToAndStop = function(a, b, c) {
            c && this.name != c || (b ? this.setCurrentRawFrameValue(a) : this.setCurrentRawFrameValue(a * this.frameModifier), this.pause())
        }, AnimationItem.prototype.goToAndPlay = function(a, b, c) {
            this.goToAndStop(a, b, c), this.play()
        }, AnimationItem.prototype.advanceTime = function(a) {
            return this.pendingSegment ? (this.pendingSegment = !1, this.adjustSegment(this.segments.shift()), void(this.isPaused && this.play())) : void(this.isPaused !== !0 && this.isLoaded !== !1 && this.setCurrentRawFrameValue(this.currentRawFrame + a * this.frameModifier))
        }, AnimationItem.prototype.updateAnimation = function(a) {
            this.setCurrentRawFrameValue(this.totalFrames * a)
        }, AnimationItem.prototype.moveFrame = function(a, b) {
            b && this.name != b || this.setCurrentRawFrameValue(this.currentRawFrame + a)
        }, AnimationItem.prototype.adjustSegment = function(a) {
            this.playCount = 0, a[1] < a[0] ? (this.frameModifier > 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)), this.totalFrames = a[0] - a[1], this.firstFrame = a[1], this.setCurrentRawFrameValue(this.totalFrames - .01)) : a[1] > a[0] && (this.frameModifier < 0 && (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)), this.totalFrames = a[1] - a[0], this.firstFrame = a[0], this.setCurrentRawFrameValue(0)), this.trigger("segmentStart")
        }, AnimationItem.prototype.setSegment = function(a, b) {
            var c = -1;
            this.isPaused && (this.currentRawFrame + this.firstFrame < a ? c = a : this.currentRawFrame + this.firstFrame > b && (c = b - a - .01)), this.firstFrame = a, this.totalFrames = b - a, c !== -1 && this.goToAndStop(c, !0)
        }, AnimationItem.prototype.playSegments = function(a, b) {
            if ("object" == typeof a[0]) {
                var c, d = a.length;
                for (c = 0; c < d; c += 1) this.segments.push(a[c])
            } else this.segments.push(a);
            b && this.adjustSegment(this.segments.shift()), this.isPaused && this.play()
        }, AnimationItem.prototype.resetSegments = function(a) {
            this.segments.length = 0, this.segments.push([this.animationData.ip * this.frameRate, Math.floor(this.animationData.op - this.animationData.ip + this.animationData.ip * this.frameRate)]), a && this.adjustSegment(this.segments.shift())
        }, AnimationItem.prototype.checkSegments = function() {
            this.segments.length && (this.pendingSegment = !0)
        }, AnimationItem.prototype.remove = function(a) {
            a && this.name != a || this.renderer.destroy()
        }, AnimationItem.prototype.destroy = function(a) {
            a && this.name != a || this.renderer && this.renderer.destroyed || (this.renderer.destroy(), this.trigger("destroy"), this._cbs = null, this.onEnterFrame = this.onLoopComplete = this.onComplete = this.onSegmentStart = this.onDestroy = null)
        }, AnimationItem.prototype.setCurrentRawFrameValue = function(a) {
            if (this.currentRawFrame = a, this.currentRawFrame >= this.totalFrames) {
                if (this.checkSegments(), this.loop === !1) return this.currentRawFrame = this.totalFrames - .01, this.gotoFrame(), this.pause(), void this.trigger("complete");
                if (this.trigger("loopComplete"), this.playCount += 1, this.loop !== !0 && this.playCount == this.loop || this.pendingSegment) return this.currentRawFrame = this.totalFrames - .01, this.gotoFrame(), this.pause(), void this.trigger("complete");
                this.currentRawFrame = this.currentRawFrame % this.totalFrames
            } else if (this.currentRawFrame < 0) return this.checkSegments(), this.playCount -= 1, this.playCount < 0 && (this.playCount = 0), this.loop === !1 || this.pendingSegment ? (this.currentRawFrame = 0, this.gotoFrame(), this.pause(), void this.trigger("complete")) : (this.trigger("loopComplete"), this.currentRawFrame = (this.totalFrames + this.currentRawFrame) % this.totalFrames, void this.gotoFrame());
            this.gotoFrame()
        }, AnimationItem.prototype.setSpeed = function(a) {
            this.playSpeed = a, this.updaFrameModifier()
        }, AnimationItem.prototype.setDirection = function(a) {
            this.playDirection = a < 0 ? -1 : 1, this.updaFrameModifier()
        }, AnimationItem.prototype.updaFrameModifier = function() {
            this.frameModifier = this.frameMult * this.playSpeed * this.playDirection
        }, AnimationItem.prototype.getPath = function() {
            return this.path
        }, AnimationItem.prototype.getAssetsPath = function(a) {
            var b = "";
            if (this.assetsPath) {
                var c = a.p;
                c.indexOf("images/") !== -1 && (c = c.split("/")[1]), b = this.assetsPath + c
            } else b = this.path, b += a.u ? a.u : "", b += a.p;
            return b
        }, AnimationItem.prototype.getAssetData = function(a) {
            for (var b = 0, c = this.assets.length; b < c;) {
                if (a == this.assets[b].id) return this.assets[b];
                b += 1
            }
        }, AnimationItem.prototype.hide = function() {
            this.renderer.hide()
        }, AnimationItem.prototype.show = function() {
            this.renderer.show()
        }, AnimationItem.prototype.getAssets = function() {
            return this.assets
        }, AnimationItem.prototype.trigger = function(a) {
            if (this._cbs && this._cbs[a]) switch (a) {
                case "enterFrame":
                    this.triggerEvent(a, new BMEnterFrameEvent(a, this.currentFrame, this.totalFrames, this.frameMult));
                    break;
                case "loopComplete":
                    this.triggerEvent(a, new BMCompleteLoopEvent(a, this.loop, this.playCount, this.frameMult));
                    break;
                case "complete":
                    this.triggerEvent(a, new BMCompleteEvent(a, this.frameMult));
                    break;
                case "segmentStart":
                    this.triggerEvent(a, new BMSegmentStartEvent(a, this.firstFrame, this.totalFrames));
                    break;
                case "destroy":
                    this.triggerEvent(a, new BMDestroyEvent(a, this));
                    break;
                default:
                    this.triggerEvent(a)
            }
            "enterFrame" === a && this.onEnterFrame && this.onEnterFrame.call(this, new BMEnterFrameEvent(a, this.currentFrame, this.totalFrames, this.frameMult)), "loopComplete" === a && this.onLoopComplete && this.onLoopComplete.call(this, new BMCompleteLoopEvent(a, this.loop, this.playCount, this.frameMult)), "complete" === a && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(a, this.frameMult)), "segmentStart" === a && this.onSegmentStart && this.onSegmentStart.call(this, new BMSegmentStartEvent(a, this.firstFrame, this.totalFrames)), "destroy" === a && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(a, this))
        }, AnimationItem.prototype.addEventListener = _addEventListener, AnimationItem.prototype.removeEventListener = _removeEventListener, AnimationItem.prototype.triggerEvent = _triggerEvent, extendPrototype(BaseRenderer, CanvasRenderer), CanvasRenderer.prototype.createBase = function(a) {
            return new CVBaseElement(a, this, this.globalData)
        }, CanvasRenderer.prototype.createShape = function(a) {
            return new CVShapeElement(a, this, this.globalData)
        }, CanvasRenderer.prototype.createText = function(a) {
            return new CVTextElement(a, this, this.globalData)
        }, CanvasRenderer.prototype.createImage = function(a) {
            return new CVImageElement(a, this, this.globalData)
        }, CanvasRenderer.prototype.createComp = function(a) {
            return new CVCompElement(a, this, this.globalData)
        }, CanvasRenderer.prototype.createSolid = function(a) {
            return new CVSolidElement(a, this, this.globalData)
        }, CanvasRenderer.prototype.ctxTransform = function(a) {
            if (1 !== a[0] || 0 !== a[1] || 0 !== a[4] || 1 !== a[5] || 0 !== a[12] || 0 !== a[13]) {
                if (!this.renderConfig.clearCanvas) return void this.canvasContext.transform(a[0], a[1], a[4], a[5], a[12], a[13]);
                this.transformMat.cloneFromProps(a), this.transformMat.transform(this.contextData.cTr.props[0], this.contextData.cTr.props[1], this.contextData.cTr.props[2], this.contextData.cTr.props[3], this.contextData.cTr.props[4], this.contextData.cTr.props[5], this.contextData.cTr.props[6], this.contextData.cTr.props[7], this.contextData.cTr.props[8], this.contextData.cTr.props[9], this.contextData.cTr.props[10], this.contextData.cTr.props[11], this.contextData.cTr.props[12], this.contextData.cTr.props[13], this.contextData.cTr.props[14], this.contextData.cTr.props[15]), this.contextData.cTr.cloneFromProps(this.transformMat.props);
                var b = this.contextData.cTr.props;
                this.canvasContext.setTransform(b[0], b[1], b[4], b[5], b[12], b[13])
            }
        }, CanvasRenderer.prototype.ctxOpacity = function(a) {
            if (1 !== a) {
                if (!this.renderConfig.clearCanvas) return void(this.canvasContext.globalAlpha *= a < 0 ? 0 : a);
                this.contextData.cO *= a < 0 ? 0 : a, this.canvasContext.globalAlpha = this.contextData.cO
            }
        }, CanvasRenderer.prototype.reset = function() {
            return this.renderConfig.clearCanvas ? (this.contextData.cArrPos = 0, this.contextData.cTr.reset(), void(this.contextData.cO = 1)) : void this.canvasContext.restore()
        }, CanvasRenderer.prototype.save = function(a) {
            if (!this.renderConfig.clearCanvas) return void this.canvasContext.save();
            a && this.canvasContext.save();
            var b = this.contextData.cTr.props;
            null !== this.contextData.saved[this.contextData.cArrPos] && void 0 !== this.contextData.saved[this.contextData.cArrPos] || (this.contextData.saved[this.contextData.cArrPos] = new Array(16));
            var c, d = this.contextData.saved[this.contextData.cArrPos];
            for (c = 0; c < 16; c += 1) d[c] = b[c];
            this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO, this.contextData.cArrPos += 1
        }, CanvasRenderer.prototype.restore = function(a) {
            if (!this.renderConfig.clearCanvas) return void this.canvasContext.restore();
            a && this.canvasContext.restore(), this.contextData.cArrPos -= 1;
            var b, c = this.contextData.saved[this.contextData.cArrPos],
                d = this.contextData.cTr.props;
            for (b = 0; b < 16; b += 1) d[b] = c[b];
            this.canvasContext.setTransform(c[0], c[1], c[4], c[5], c[12], c[13]), c = this.contextData.savedOp[this.contextData.cArrPos], this.contextData.cO = c, this.canvasContext.globalAlpha = c
        }, CanvasRenderer.prototype.configAnimation = function(a) {
            this.animationItem.wrapper ? (this.animationItem.container = document.createElement("canvas"), this.animationItem.container.style.width = "100%", this.animationItem.container.style.height = "100%", this.animationItem.container.style.transformOrigin = this.animationItem.container.style.mozTransformOrigin = this.animationItem.container.style.webkitTransformOrigin = this.animationItem.container.style["-webkit-transform"] = "0px 0px 0px", this.animationItem.wrapper.appendChild(this.animationItem.container), this.canvasContext = this.animationItem.container.getContext("2d")) : this.canvasContext = this.renderConfig.context, this.globalData.canvasContext = this.canvasContext, this.globalData.renderer = this, this.globalData.isDashed = !1, this.globalData.totalFrames = Math.floor(a.tf), this.globalData.compWidth = a.w, this.globalData.compHeight = a.h, this.globalData.frameRate = a.fr, this.globalData.frameId = 0, this.globalData.compSize = {
                w: a.w,
                h: a.h
            }, this.globalData.progressiveLoad = this.renderConfig.progressiveLoad, this.layers = a.layers, this.transformCanvas = {}, this.transformCanvas.w = a.w, this.transformCanvas.h = a.h, this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(a.chars), this.globalData.fontManager.addFonts(a.fonts, document.body), this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.elementLoaded = this.animationItem.elementLoaded.bind(this.animationItem), this.globalData.addPendingElement = this.animationItem.addPendingElement.bind(this.animationItem), this.globalData.transformCanvas = this.transformCanvas, this.elements = Array.apply(null, {
                length: a.layers.length
            }), this.updateContainerSize()
        }, CanvasRenderer.prototype.updateContainerSize = function() {
            var a, b;
            this.animationItem.wrapper && this.animationItem.container ? (a = this.animationItem.wrapper.offsetWidth, b = this.animationItem.wrapper.offsetHeight, this.animationItem.container.setAttribute("width", a * this.renderConfig.dpr), this.animationItem.container.setAttribute("height", b * this.renderConfig.dpr)) : (a = this.canvasContext.canvas.width * this.renderConfig.dpr, b = this.canvasContext.canvas.height * this.renderConfig.dpr);
            var c, d;
            if (this.renderConfig.preserveAspectRatio.indexOf("meet") !== -1 || this.renderConfig.preserveAspectRatio.indexOf("slice") !== -1) {
                var e = this.renderConfig.preserveAspectRatio.split(" "),
                    f = e[1] || "meet",
                    g = e[0] || "xMidYMid",
                    h = g.substr(0, 4),
                    i = g.substr(4);
                c = a / b, d = this.transformCanvas.w / this.transformCanvas.h, d > c && "meet" === f || d < c && "slice" === f ? (this.transformCanvas.sx = a / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = a / (this.transformCanvas.w / this.renderConfig.dpr)) : (this.transformCanvas.sx = b / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.sy = b / (this.transformCanvas.h / this.renderConfig.dpr)), "xMid" === h && (d < c && "meet" === f || d > c && "slice" === f) ? this.transformCanvas.tx = (a - this.transformCanvas.w * (b / this.transformCanvas.h)) / 2 * this.renderConfig.dpr : "xMax" === h && (d < c && "meet" === f || d > c && "slice" === f) ? this.transformCanvas.tx = (a - this.transformCanvas.w * (b / this.transformCanvas.h)) * this.renderConfig.dpr : this.transformCanvas.tx = 0, "YMid" === i && (d > c && "meet" === f || d < c && "slice" === f) ? this.transformCanvas.ty = (b - this.transformCanvas.h * (a / this.transformCanvas.w)) / 2 * this.renderConfig.dpr : "YMax" === i && (d > c && "meet" === f || d < c && "slice" === f) ? this.transformCanvas.ty = (b - this.transformCanvas.h * (a / this.transformCanvas.w)) * this.renderConfig.dpr : this.transformCanvas.ty = 0
            } else "none" == this.renderConfig.preserveAspectRatio ? (this.transformCanvas.sx = a / (this.transformCanvas.w / this.renderConfig.dpr), this.transformCanvas.sy = b / (this.transformCanvas.h / this.renderConfig.dpr), this.transformCanvas.tx = 0, this.transformCanvas.ty = 0) : (this.transformCanvas.sx = this.renderConfig.dpr, this.transformCanvas.sy = this.renderConfig.dpr, this.transformCanvas.tx = 0, this.transformCanvas.ty = 0);
            this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1];
            var j, k = this.elements.length;
            for (j = 0; j < k; j += 1) this.elements[j] && 0 === this.elements[j].data.ty && this.elements[j].resize(this.globalData.transformCanvas)
        }, CanvasRenderer.prototype.destroy = function() {
            this.renderConfig.clearCanvas && (this.animationItem.wrapper.innerHTML = "");
            var a, b = this.layers ? this.layers.length : 0;
            for (a = b - 1; a >= 0; a -= 1) this.elements[a].destroy();
            this.elements.length = 0, this.globalData.canvasContext = null, this.animationItem.container = null, this.destroyed = !0
        }, CanvasRenderer.prototype.renderFrame = function(a) {
            if (!(this.renderedFrame == a && this.renderConfig.clearCanvas === !0 || this.destroyed || null === a)) {
                this.renderedFrame = a, this.globalData.frameNum = a - this.animationItem.firstFrame, this.globalData.frameId += 1, this.globalData.projectInterface.currentFrame = a, this.renderConfig.clearCanvas === !0 ? (this.reset(), this.canvasContext.save(), this.canvasContext.clearRect(this.transformCanvas.tx, this.transformCanvas.ty, this.transformCanvas.w * this.transformCanvas.sx, this.transformCanvas.h * this.transformCanvas.sy)) : this.save(), this.ctxTransform(this.transformCanvas.props), this.canvasContext.beginPath(), this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h), this.canvasContext.closePath(), this.canvasContext.clip();
                var b, c = this.layers.length;
                for (this.completeLayers || this.checkLayers(a), b = 0; b < c; b++)(this.completeLayers || this.elements[b]) && this.elements[b].prepareFrame(a - this.layers[b].st);
                for (b = c - 1; b >= 0; b -= 1)(this.completeLayers || this.elements[b]) && this.elements[b].renderFrame();
                this.renderConfig.clearCanvas !== !0 ? this.restore() : this.canvasContext.restore()
            }
        }, CanvasRenderer.prototype.buildItem = function(a) {
            var b = this.elements;
            if (!b[a] && 99 != this.layers[a].ty) {
                var c = this.createItem(this.layers[a], this, this.globalData);
                b[a] = c, c.initExpressions(), 0 === this.layers[a].ty && c.resize(this.globalData.transformCanvas)
            }
        }, CanvasRenderer.prototype.checkPendingElements = function() {
            for (; this.pendingElements.length;) {
                var a = this.pendingElements.pop();
                a.checkParenting()
            }
        }, CanvasRenderer.prototype.hide = function() {
            this.animationItem.container.style.display = "none"
        }, CanvasRenderer.prototype.show = function() {
            this.animationItem.container.style.display = "block"
        }, CanvasRenderer.prototype.searchExtraCompositions = function(a) {
            var b, c = a.length;
            document.createElementNS(svgNS, "g");
            for (b = 0; b < c; b += 1)
                if (a[b].xt) {
                    var d = this.createComp(a[b], this.globalData.comp, this.globalData);
                    d.initExpressions(), this.globalData.projectInterface.registerComposition(d)
                }
        }, extendPrototype(BaseRenderer, HybridRenderer), HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem, HybridRenderer.prototype.checkPendingElements = function() {
            for (; this.pendingElements.length;) {
                var a = this.pendingElements.pop();
                a.checkParenting()
            }
        }, HybridRenderer.prototype.appendElementInPos = function(a, b) {
            var c = a.getBaseElement();
            if (c) {
                var d = this.layers[b];
                if (d.ddd && this.supports3d) this.addTo3dContainer(c, b);
                else {
                    for (var e, f = 0; f < b;) this.elements[f] && this.elements[f] !== !0 && this.elements[f].getBaseElement && (e = this.elements[f].getBaseElement()), f += 1;
                    e ? d.ddd && this.supports3d || this.layerElement.insertBefore(c, e) : d.ddd && this.supports3d || this.layerElement.appendChild(c)
                }
            }
        }, HybridRenderer.prototype.createBase = function(a) {
            return new SVGBaseElement(a, this.layerElement, this.globalData, this)
        }, HybridRenderer.prototype.createShape = function(a) {
            return this.supports3d ? new HShapeElement(a, this.layerElement, this.globalData, this) : new IShapeElement(a, this.layerElement, this.globalData, this)
        }, HybridRenderer.prototype.createText = function(a) {
            return this.supports3d ? new HTextElement(a, this.layerElement, this.globalData, this) : new SVGTextElement(a, this.layerElement, this.globalData, this)
        }, HybridRenderer.prototype.createCamera = function(a) {
            return this.camera = new HCameraElement(a, this.layerElement, this.globalData, this), this.camera
        }, HybridRenderer.prototype.createImage = function(a) {
            return this.supports3d ? new HImageElement(a, this.layerElement, this.globalData, this) : new IImageElement(a, this.layerElement, this.globalData, this)
        }, HybridRenderer.prototype.createComp = function(a) {
            return this.supports3d ? new HCompElement(a, this.layerElement, this.globalData, this) : new ICompElement(a, this.layerElement, this.globalData, this)
        }, HybridRenderer.prototype.createSolid = function(a) {
            return this.supports3d ? new HSolidElement(a, this.layerElement, this.globalData, this) : new ISolidElement(a, this.layerElement, this.globalData, this)
        }, HybridRenderer.prototype.getThreeDContainer = function(a) {
            var b = document.createElement("div");
            styleDiv(b), b.style.width = this.globalData.compSize.w + "px", b.style.height = this.globalData.compSize.h + "px", b.style.transformOrigin = b.style.mozTransformOrigin = b.style.webkitTransformOrigin = "50% 50%";
            var c = document.createElement("div");
            styleDiv(c), c.style.transform = c.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)", b.appendChild(c), this.resizerElem.appendChild(b);
            var d = {
                container: c,
                perspectiveElem: b,
                startPos: a,
                endPos: a
            };
            return this.threeDElements.push(d), d
        }, HybridRenderer.prototype.build3dContainers = function() {
            var a, b, c = this.layers.length;
            for (a = 0; a < c; a += 1) this.layers[a].ddd ? (b || (b = this.getThreeDContainer(a)), b.endPos = Math.max(b.endPos, a)) : b = null
        }, HybridRenderer.prototype.addTo3dContainer = function(a, b) {
            for (var c = 0, d = this.threeDElements.length; c < d;) {
                if (b <= this.threeDElements[c].endPos) {
                    for (var e, f = this.threeDElements[c].startPos; f < b;) this.elements[f] && this.elements[f].getBaseElement && (e = this.elements[f].getBaseElement()), f += 1;
                    e ? this.threeDElements[c].container.insertBefore(a, e) : this.threeDElements[c].container.appendChild(a);
                    break
                }
                c += 1
            }
        }, HybridRenderer.prototype.configAnimation = function(a) {
            var b = document.createElement("div"),
                c = this.animationItem.wrapper;
            b.style.width = a.w + "px", b.style.height = a.h + "px", this.resizerElem = b, styleDiv(b), b.style.transformStyle = b.style.webkitTransformStyle = b.style.mozTransformStyle = "flat", c.appendChild(b), b.style.overflow = "hidden";
            var d = document.createElementNS(svgNS, "svg");
            d.setAttribute("width", "1"), d.setAttribute("height", "1"), styleDiv(d), this.resizerElem.appendChild(d);
            var e = document.createElementNS(svgNS, "defs");
            d.appendChild(e), this.globalData.defs = e, this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem), this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem), this.globalData.elementLoaded = this.animationItem.elementLoaded.bind(this.animationItem), this.globalData.frameId = 0, this.globalData.compSize = {
                w: a.w,
                h: a.h
            }, this.globalData.frameRate = a.fr, this.layers = a.layers, this.globalData.fontManager = new FontManager, this.globalData.fontManager.addChars(a.chars), this.globalData.fontManager.addFonts(a.fonts, d), this.layerElement = this.resizerElem, this.build3dContainers(), this.updateContainerSize()
        }, HybridRenderer.prototype.destroy = function() {
            this.animationItem.wrapper.innerHTML = "", this.animationItem.container = null, this.globalData.defs = null;
            var a, b = this.layers ? this.layers.length : 0;
            for (a = 0; a < b; a++) this.elements[a].destroy();
            this.elements.length = 0, this.destroyed = !0, this.animationItem = null
        }, HybridRenderer.prototype.updateContainerSize = function() {
            var a, b, c, d, e = this.animationItem.wrapper.offsetWidth,
                f = this.animationItem.wrapper.offsetHeight,
                g = e / f,
                h = this.globalData.compSize.w / this.globalData.compSize.h;
            h > g ? (a = e / this.globalData.compSize.w, b = e / this.globalData.compSize.w, c = 0, d = (f - this.globalData.compSize.h * (e / this.globalData.compSize.w)) / 2) : (a = f / this.globalData.compSize.h, b = f / this.globalData.compSize.h, c = (e - this.globalData.compSize.w * (f / this.globalData.compSize.h)) / 2, d = 0), this.resizerElem.style.transform = this.resizerElem.style.webkitTransform = "matrix3d(" + a + ",0,0,0,0," + b + ",0,0,0,0,1,0," + c + "," + d + ",0,1)"
        }, HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame, HybridRenderer.prototype.hide = function() {
            this.resizerElem.style.display = "none"
        }, HybridRenderer.prototype.show = function() {
            this.resizerElem.style.display = "block"
        }, HybridRenderer.prototype.initItems = function() {
            if (this.buildAllItems(), this.camera) this.camera.setup();
            else {
                var a, b = this.globalData.compSize.w,
                    c = this.globalData.compSize.h,
                    d = this.threeDElements.length;
                for (a = 0; a < d; a += 1) this.threeDElements[a].perspectiveElem.style.perspective = this.threeDElements[a].perspectiveElem.style.webkitPerspective = Math.sqrt(Math.pow(b, 2) + Math.pow(c, 2)) + "px"
            }
        }, HybridRenderer.prototype.searchExtraCompositions = function(a) {
            var b, c = a.length,
                d = document.createElement("div");
            for (b = 0; b < c; b += 1)
                if (a[b].xt) {
                    var e = this.createComp(a[b], d, this.globalData.comp, null);
                    e.initExpressions(), this.globalData.projectInterface.registerComposition(e)
                }
        }, createElement(BaseElement, CVBaseElement), CVBaseElement.prototype.createElements = function() {
            this.checkParenting()
        }, CVBaseElement.prototype.checkBlendMode = function(a) {
            if (a.blendMode !== this.data.bm) {
                a.blendMode = this.data.bm;
                var b = "";
                switch (this.data.bm) {
                    case 0:
                        b = "normal";
                        break;
                    case 1:
                        b = "multiply";
                        break;
                    case 2:
                        b = "screen";
                        break;
                    case 3:
                        b = "overlay";
                        break;
                    case 4:
                        b = "darken";
                        break;
                    case 5:
                        b = "lighten";
                        break;
                    case 6:
                        b = "color-dodge";
                        break;
                    case 7:
                        b = "color-burn";
                        break;
                    case 8:
                        b = "hard-light";
                        break;
                    case 9:
                        b = "soft-light";
                        break;
                    case 10:
                        b = "difference";
                        break;
                    case 11:
                        b = "exclusion";
                        break;
                    case 12:
                        b = "hue";
                        break;
                    case 13:
                        b = "saturation";
                        break;
                    case 14:
                        b = "color";
                        break;
                    case 15:
                        b = "luminosity"
                }
                a.canvasContext.globalCompositeOperation = b
            }
        }, CVBaseElement.prototype.renderFrame = function(a) {
            if (3 === this.data.ty) return !1;
            if (this.checkBlendMode(0 === this.data.ty ? this.parentGlobalData : this.globalData), !this.isVisible) return this.isVisible;
            this.finalTransform.opMdf = this.finalTransform.op.mdf, this.finalTransform.matMdf = this.finalTransform.mProp.mdf, this.finalTransform.opacity = this.finalTransform.op.v;
            var b, c = this.finalTransform.mat;
            if (this.hierarchy) {
                var d, e = this.hierarchy.length;
                for (b = this.finalTransform.mProp.v.props, c.cloneFromProps(b), d = 0; d < e; d += 1) this.finalTransform.matMdf = !!this.hierarchy[d].finalTransform.mProp.mdf || this.finalTransform.matMdf, b = this.hierarchy[d].finalTransform.mProp.v.props, c.transform(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15])
            } else a ? (b = this.finalTransform.mProp.v.props, c.cloneFromProps(b)) : c.cloneFromProps(this.finalTransform.mProp.v.props);
            return a && (b = a.mat.props, c.transform(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15]), this.finalTransform.opacity *= a.opacity, this.finalTransform.opMdf = !!a.opMdf || this.finalTransform.opMdf, this.finalTransform.matMdf = !!a.matMdf || this.finalTransform.matMdf), this.data.hasMask && (this.globalData.renderer.save(!0), this.maskManager.renderFrame(0 === this.data.ty ? null : c)), this.data.hd && (this.isVisible = !1), this.isVisible
        }, CVBaseElement.prototype.addMasks = function(a) {
            this.maskManager = new CVMaskElement(a, this, this.globalData)
        }, CVBaseElement.prototype.destroy = function() {
            this.canvasContext = null, this.data = null, this.globalData = null, this.maskManager && this.maskManager.destroy()
        }, CVBaseElement.prototype.mHelper = new Matrix, createElement(CVBaseElement, CVCompElement), CVCompElement.prototype.ctxTransform = CanvasRenderer.prototype.ctxTransform, CVCompElement.prototype.ctxOpacity = CanvasRenderer.prototype.ctxOpacity, CVCompElement.prototype.save = CanvasRenderer.prototype.save, CVCompElement.prototype.restore = CanvasRenderer.prototype.restore, CVCompElement.prototype.reset = function() {
            this.contextData.cArrPos = 0, this.contextData.cTr.reset(), this.contextData.cO = 1
        }, CVCompElement.prototype.resize = function(a) {
            var b = Math.max(a.sx, a.sy);
            this.canvas.width = this.data.w * b, this.canvas.height = this.data.h * b, this.transformCanvas = {
                sc: b,
                w: this.data.w * b,
                h: this.data.h * b,
                props: [b, 0, 0, 0, 0, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
            };
            var c, d = this.elements.length;
            for (c = 0; c < d; c += 1) this.elements[c] && 0 === this.elements[c].data.ty && this.elements[c].resize(a)
        }, CVCompElement.prototype.prepareFrame = function(a) {
            if (this.globalData.frameId = this.parentGlobalData.frameId, this.globalData.mdf = !1, this._parent.prepareFrame.call(this, a), this.isVisible !== !1 || this.data.xt) {
                var b = a;
                this.tm && (b = this.tm.v, b === this.data.op && (b = this.data.op - 1)), this.renderedFrame = b / this.data.sr;
                var c, d = this.elements.length;
                for (this.completeLayers || this.checkLayers(a), c = 0; c < d; c += 1)(this.completeLayers || this.elements[c]) && (this.elements[c].prepareFrame(b / this.data.sr - this.layers[c].st), 0 === this.elements[c].data.ty && this.elements[c].globalData.mdf && (this.globalData.mdf = !0));
                this.globalData.mdf && !this.data.xt && (this.canvasContext.clearRect(0, 0, this.data.w, this.data.h), this.ctxTransform(this.transformCanvas.props))
            }
        }, CVCompElement.prototype.renderFrame = function(a) {
            if (this._parent.renderFrame.call(this, a) !== !1) {
                if (this.globalData.mdf) {
                    var b, c = this.layers.length;
                    for (b = c - 1; b >= 0; b -= 1)(this.completeLayers || this.elements[b]) && this.elements[b].renderFrame()
                }
                this.data.hasMask && this.globalData.renderer.restore(!0), this.firstFrame && (this.firstFrame = !1), this.parentGlobalData.renderer.save(), this.parentGlobalData.renderer.ctxTransform(this.finalTransform.mat.props), this.parentGlobalData.renderer.ctxOpacity(this.finalTransform.opacity), this.parentGlobalData.renderer.canvasContext.drawImage(this.canvas, 0, 0, this.data.w, this.data.h), this.parentGlobalData.renderer.restore(), this.globalData.mdf && this.reset()
            }
        }, CVCompElement.prototype.setElements = function(a) {
            this.elements = a
        }, CVCompElement.prototype.getElements = function() {
            return this.elements
        }, CVCompElement.prototype.destroy = function() {
            var a, b = this.layers.length;
            for (a = b - 1; a >= 0; a -= 1) this.elements[a].destroy();
            this.layers = null, this.elements = null, this._parent.destroy.call()
        }, CVCompElement.prototype.checkLayers = CanvasRenderer.prototype.checkLayers, CVCompElement.prototype.buildItem = CanvasRenderer.prototype.buildItem, CVCompElement.prototype.checkPendingElements = CanvasRenderer.prototype.checkPendingElements, CVCompElement.prototype.addPendingElement = CanvasRenderer.prototype.addPendingElement, CVCompElement.prototype.buildAllItems = CanvasRenderer.prototype.buildAllItems, CVCompElement.prototype.createItem = CanvasRenderer.prototype.createItem, CVCompElement.prototype.createImage = CanvasRenderer.prototype.createImage, CVCompElement.prototype.createComp = CanvasRenderer.prototype.createComp, CVCompElement.prototype.createSolid = CanvasRenderer.prototype.createSolid, CVCompElement.prototype.createShape = CanvasRenderer.prototype.createShape, CVCompElement.prototype.createText = CanvasRenderer.prototype.createText, CVCompElement.prototype.createBase = CanvasRenderer.prototype.createBase, CVCompElement.prototype.buildElementParenting = CanvasRenderer.prototype.buildElementParenting, createElement(CVBaseElement, CVImageElement), CVImageElement.prototype.createElements = function() {
            var a = function() {
                    if (this.globalData.elementLoaded(), this.assetData.w !== this.img.width || this.assetData.h !== this.img.height) {
                        var a = document.createElement("canvas");
                        a.width = this.assetData.w, a.height = this.assetData.h;
                        var b, c, d = a.getContext("2d"),
                            e = this.img.width,
                            f = this.img.height,
                            g = e / f,
                            h = this.assetData.w / this.assetData.h;
                        g > h ? (c = f, b = c * h) : (b = e, c = b / h), d.drawImage(this.img, (e - b) / 2, (f - c) / 2, b, c, 0, 0, this.assetData.w, this.assetData.h), this.img = a
                    }
                }.bind(this),
                b = function() {
                    this.failed = !0, this.globalData.elementLoaded()
                }.bind(this);
            this.img = new Image, this.img.addEventListener("load", a, !1), this.img.addEventListener("error", b, !1);
            var c = this.globalData.getAssetsPath(this.assetData);
            this.img.src = c, this._parent.createElements.call(this)
        }, CVImageElement.prototype.renderFrame = function(a) {
            if (!this.failed && this._parent.renderFrame.call(this, a) !== !1) {
                var b = this.canvasContext;
                this.globalData.renderer.save();
                var c = this.finalTransform.mat.props;
                this.globalData.renderer.ctxTransform(c), this.globalData.renderer.ctxOpacity(this.finalTransform.opacity), b.drawImage(this.img, 0, 0), this.globalData.renderer.restore(this.data.hasMask), this.firstFrame && (this.firstFrame = !1)
            }
        }, CVImageElement.prototype.destroy = function() {
            this.img = null, this._parent.destroy.call()
        }, CVMaskElement.prototype.getMaskProperty = function(a) {
            return this.viewData[a]
        }, CVMaskElement.prototype.prepareFrame = function(a) {
            var b, c = this.dynamicProperties.length;
            for (b = 0; b < c; b += 1) this.dynamicProperties[b].getValue(a), this.dynamicProperties[b].mdf && (this.element.globalData.mdf = !0)
        }, CVMaskElement.prototype.renderFrame = function(a) {
            var b, c, d, e, f, g = this.element.canvasContext,
                h = this.data.masksProperties.length,
                i = !1;
            for (b = 0; b < h; b++)
                if ("n" !== this.masksProperties[b].mode) {
                    i === !1 && (g.beginPath(), i = !0), this.masksProperties[b].inv && (g.moveTo(0, 0), g.lineTo(this.element.globalData.compWidth, 0), g.lineTo(this.element.globalData.compWidth, this.element.globalData.compHeight), g.lineTo(0, this.element.globalData.compHeight), g.lineTo(0, 0)), f = this.viewData[b].v, c = a ? a.applyToPointArray(f.v[0][0], f.v[0][1], 0) : f.v[0], g.moveTo(c[0], c[1]);
                    var j, k = f.v.length;
                    for (j = 1; j < k; j++) c = a ? a.applyToPointArray(f.o[j - 1][0], f.o[j - 1][1], 0) : f.o[j - 1], d = a ? a.applyToPointArray(f.i[j][0], f.i[j][1], 0) : f.i[j], e = a ? a.applyToPointArray(f.v[j][0], f.v[j][1], 0) : f.v[j], g.bezierCurveTo(c[0], c[1], d[0], d[1], e[0], e[1]);
                    c = a ? a.applyToPointArray(f.o[j - 1][0], f.o[j - 1][1], 0) : f.o[j - 1], d = a ? a.applyToPointArray(f.i[0][0], f.i[0][1], 0) : f.i[0], e = a ? a.applyToPointArray(f.v[0][0], f.v[0][1], 0) : f.v[0], g.bezierCurveTo(c[0], c[1], d[0], d[1], e[0], e[1])
                }
            i && g.clip()
        }, CVMaskElement.prototype.getMask = function(a) {
            for (var b = 0, c = this.masksProperties.length; b < c;) {
                if (this.masksProperties[b].nm === a) return {
                    maskPath: this.viewData[b].pv
                };
                b += 1
            }
        }, CVMaskElement.prototype.destroy = function() {
            this.element = null
        }, createElement(CVBaseElement, CVShapeElement), CVShapeElement.prototype.lcEnum = {
            1: "butt",
            2: "round",
            3: "butt"
        }, CVShapeElement.prototype.ljEnum = {
            1: "miter",
            2: "round",
            3: "butt"
        }, CVShapeElement.prototype.transformHelper = {
            opacity: 1,
            mat: new Matrix,
            matMdf: !1,
            opMdf: !1
        }, CVShapeElement.prototype.dashResetter = [], CVShapeElement.prototype.createElements = function() {
            this._parent.createElements.call(this), this.searchShapes(this.shapesData, this.viewData, this.dynamicProperties)
        }, CVShapeElement.prototype.searchShapes = function(a, b, c) {
            var d, e, f, g, h = a.length - 1,
                i = [],
                j = [];
            for (d = h; d >= 0; d -= 1)
                if ("fl" == a[d].ty || "st" == a[d].ty) {
                    if (g = {
                            type: a[d].ty,
                            elements: []
                        }, b[d] = {}, "fl" != a[d].ty && "st" != a[d].ty || (b[d].c = PropertyFactory.getProp(this, a[d].c, 1, 255, c), b[d].c.k || (g.co = "rgb(" + bm_floor(b[d].c.v[0]) + "," + bm_floor(b[d].c.v[1]) + "," + bm_floor(b[d].c.v[2]) + ")")), b[d].o = PropertyFactory.getProp(this, a[d].o, 0, .01, c), "st" == a[d].ty && (g.lc = this.lcEnum[a[d].lc] || "round", g.lj = this.ljEnum[a[d].lj] || "round", 1 == a[d].lj && (g.ml = a[d].ml), b[d].w = PropertyFactory.getProp(this, a[d].w, 0, null, c), b[d].w.k || (g.wi = b[d].w.v), a[d].d)) {
                        var k = PropertyFactory.getDashProp(this, a[d].d, "canvas", c);
                        b[d].d = k, b[d].d.k || (g.da = b[d].d.dasharray, g["do"] = b[d].d.dashoffset)
                    }
                    this.stylesList.push(g), b[d].style = g, i.push(b[d].style)
                } else if ("gr" == a[d].ty) b[d] = {
                it: []
            }, this.searchShapes(a[d].it, b[d].it, c);
            else if ("tr" == a[d].ty) b[d] = {
                transform: {
                    mat: new Matrix,
                    opacity: 1,
                    matMdf: !1,
                    opMdf: !1,
                    op: PropertyFactory.getProp(this, a[d].o, 0, .01, c),
                    mProps: PropertyFactory.getProp(this, a[d], 2, null, c)
                },
                elements: []
            };
            else if ("sh" == a[d].ty || "rc" == a[d].ty || "el" == a[d].ty || "sr" == a[d].ty) {
                b[d] = {
                    nodes: [],
                    trNodes: [],
                    tr: [0, 0, 0, 0, 0, 0]
                };
                var l = 4;
                "rc" == a[d].ty ? l = 5 : "el" == a[d].ty ? l = 6 : "sr" == a[d].ty && (l = 7), b[d].sh = ShapePropertyFactory.getShapeProp(this, a[d], l, c), this.shapes.push(b[d].sh), this.addShapeToModifiers(b[d].sh), f = this.stylesList.length;
                var m = !1,
                    n = !1;
                for (e = 0; e < f; e += 1) this.stylesList[e].closed || (this.stylesList[e].elements.push(b[d]), "st" === this.stylesList[e].type ? m = !0 : n = !0);
                b[d].st = m, b[d].fl = n
            } else if ("tm" == a[d].ty || "rd" == a[d].ty) {
                var o = ShapeModifiers.getModifier(a[d].ty);
                o.init(this, a[d], c), this.shapeModifiers.push(o), j.push(o), b[d] = o
            }
            for (h = i.length, d = 0; d < h; d += 1) i[d].closed = !0;
            for (h = j.length, d = 0; d < h; d += 1) j[d].closed = !0
        }, CVShapeElement.prototype.addShapeToModifiers = IShapeElement.prototype.addShapeToModifiers, CVShapeElement.prototype.renderModifiers = IShapeElement.prototype.renderModifiers, CVShapeElement.prototype.renderFrame = function(a) {
            this._parent.renderFrame.call(this, a) !== !1 && (this.transformHelper.mat.reset(), this.transformHelper.opacity = this.finalTransform.opacity, this.transformHelper.matMdf = !1, this.transformHelper.opMdf = this.finalTransform.opMdf, this.renderModifiers(), this.renderShape(this.transformHelper, null, null, !0), this.data.hasMask && this.globalData.renderer.restore(!0))
        }, CVShapeElement.prototype.renderShape = function(a, b, c, d) {
            var e, f;
            if (!b)
                for (b = this.shapesData, f = this.stylesList.length, e = 0; e < f; e += 1) this.stylesList[e].d = "", this.stylesList[e].mdf = !1;
            c || (c = this.viewData), f = b.length - 1;
            var g, h;
            for (g = a, e = f; e >= 0; e -= 1)
                if ("tr" == b[e].ty) {
                    g = c[e].transform;
                    var i = c[e].transform.mProps.v.props;
                    if (g.matMdf = g.mProps.mdf, g.opMdf = g.op.mdf, h = g.mat, h.cloneFromProps(i), a) {
                        var j = a.mat.props;
                        g.opacity = a.opacity, g.opacity *= c[e].transform.op.v, g.matMdf = !!a.matMdf || g.matMdf, g.opMdf = !!a.opMdf || g.opMdf, h.transform(j[0], j[1], j[2], j[3], j[4], j[5], j[6], j[7], j[8], j[9], j[10], j[11], j[12], j[13], j[14], j[15])
                    } else g.opacity = g.op.o
                } else "sh" == b[e].ty || "el" == b[e].ty || "rc" == b[e].ty || "sr" == b[e].ty ? this.renderPath(b[e], c[e], g) : "fl" == b[e].ty ? this.renderFill(b[e], c[e], g) : "st" == b[e].ty ? this.renderStroke(b[e], c[e], g) : "gr" == b[e].ty ? this.renderShape(g, b[e].it, c[e].it) : "tm" == b[e].ty;
            if (d) {
                f = this.stylesList.length;
                var k, l, m, n, o, p, q, r = this.globalData.renderer,
                    s = this.globalData.canvasContext;
                for (r.save(), r.ctxTransform(this.finalTransform.mat.props), e = 0; e < f; e += 1)
                    if (q = this.stylesList[e].type, "st" !== q || 0 !== this.stylesList[e].wi) {
                        for (r.save(), o = this.stylesList[e].elements, "st" === q ? (s.strokeStyle = this.stylesList[e].co, s.lineWidth = this.stylesList[e].wi, s.lineCap = this.stylesList[e].lc, s.lineJoin = this.stylesList[e].lj, s.miterLimit = this.stylesList[e].ml || 0) : s.fillStyle = this.stylesList[e].co, r.ctxOpacity(this.stylesList[e].coOp), "st" !== q && s.beginPath(), l = o.length, k = 0; k < l; k += 1) {
                            for ("st" === q && (s.beginPath(), this.stylesList[e].da ? (s.setLineDash(this.stylesList[e].da), s.lineDashOffset = this.stylesList[e]["do"], this.globalData.isDashed = !0) : this.globalData.isDashed && (s.setLineDash(this.dashResetter), this.globalData.isDashed = !1)), p = o[k].trNodes, n = p.length, m = 0; m < n; m += 1) "m" == p[m].t ? s.moveTo(p[m].p[0], p[m].p[1]) : "c" == p[m].t ? s.bezierCurveTo(p[m].p1[0], p[m].p1[1], p[m].p2[0], p[m].p2[1], p[m].p3[0], p[m].p3[1]) : s.closePath();
                            "st" === q && s.stroke()
                        }
                        "st" !== q && s.fill(), r.restore()
                    }
                r.restore(), this.firstFrame && (this.firstFrame = !1)
            }
        }, CVShapeElement.prototype.renderPath = function(a, b, c) {
            var d, e, f, g, h = c.matMdf || b.sh.mdf || this.firstFrame;
            if (h) {
                var i = b.sh.paths;
                g = i.length;
                var j = b.trNodes;
                for (j.length = 0, f = 0; f < g; f += 1) {
                    var k = i[f];
                    if (k && k.v) {
                        for (d = k.v.length, e = 1; e < d; e += 1) 1 == e && j.push({
                            t: "m",
                            p: c.mat.applyToPointArray(k.v[0][0], k.v[0][1], 0)
                        }), j.push({
                            t: "c",
                            p1: c.mat.applyToPointArray(k.o[e - 1][0], k.o[e - 1][1], 0),
                            p2: c.mat.applyToPointArray(k.i[e][0], k.i[e][1], 0),
                            p3: c.mat.applyToPointArray(k.v[e][0], k.v[e][1], 0)
                        });
                        1 == d && j.push({
                            t: "m",
                            p: c.mat.applyToPointArray(k.v[0][0], k.v[0][1], 0)
                        }), k.c && d && (j.push({
                            t: "c",
                            p1: c.mat.applyToPointArray(k.o[e - 1][0], k.o[e - 1][1], 0),
                            p2: c.mat.applyToPointArray(k.i[0][0], k.i[0][1], 0),
                            p3: c.mat.applyToPointArray(k.v[0][0], k.v[0][1], 0)
                        }), j.push({
                            t: "z"
                        })), b.lStr = j
                    }
                }
                if (b.st)
                    for (e = 0; e < 16; e += 1) b.tr[e] = c.mat.props[e];
                b.trNodes = j
            }
        }, CVShapeElement.prototype.renderFill = function(a, b, c) {
            var d = b.style;
            (b.c.mdf || this.firstFrame) && (d.co = "rgb(" + bm_floor(b.c.v[0]) + "," + bm_floor(b.c.v[1]) + "," + bm_floor(b.c.v[2]) + ")"), (b.o.mdf || c.opMdf || this.firstFrame) && (d.coOp = b.o.v * c.opacity)
        }, CVShapeElement.prototype.renderStroke = function(a, b, c) {
            var d = b.style,
                e = b.d;
            e && (e.mdf || this.firstFrame) && (d.da = e.dasharray, d["do"] = e.dashoffset), (b.c.mdf || this.firstFrame) && (d.co = "rgb(" + bm_floor(b.c.v[0]) + "," + bm_floor(b.c.v[1]) + "," + bm_floor(b.c.v[2]) + ")"), (b.o.mdf || c.opMdf || this.firstFrame) && (d.coOp = b.o.v * c.opacity), (b.w.mdf || this.firstFrame) && (d.wi = b.w.v)
        }, CVShapeElement.prototype.destroy = function() {
            this.shapesData = null, this.globalData = null, this.canvasContext = null, this.stylesList.length = 0, this.viewData.length = 0, this._parent.destroy.call()
        }, createElement(CVBaseElement, CVSolidElement), CVSolidElement.prototype.renderFrame = function(a) {
            if (this._parent.renderFrame.call(this, a) !== !1) {
                var b = this.canvasContext;
                this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(this.finalTransform.mat.props), this.globalData.renderer.ctxOpacity(this.finalTransform.opacity), b.fillStyle = this.data.sc, b.fillRect(0, 0, this.data.sw, this.data.sh), this.globalData.renderer.restore(this.data.hasMask), this.firstFrame && (this.firstFrame = !1)
            }
        }, createElement(CVBaseElement, CVTextElement), CVTextElement.prototype.init = ITextElement.prototype.init, CVTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures, CVTextElement.prototype.getMult = ITextElement.prototype.getMult, CVTextElement.prototype.prepareFrame = ITextElement.prototype.prepareFrame, CVTextElement.prototype.tHelper = document.createElement("canvas").getContext("2d"), CVTextElement.prototype.createElements = function() {
            this._parent.createElements.call(this)
        }, CVTextElement.prototype.buildNewText = function() {
            var a = this.currentTextDocumentData;
            this.renderedLetters = Array.apply(null, {
                length: this.currentTextDocumentData.l ? this.currentTextDocumentData.l.length : 0
            });
            var b = !1;
            a.fc ? (b = !0, this.values.fill = "rgb(" + Math.round(255 * a.fc[0]) + "," + Math.round(255 * a.fc[1]) + "," + Math.round(255 * a.fc[2]) + ")") : this.values.fill = "rgba(0,0,0,0)", this.fill = b;
            var c = !1;
            a.sc && (c = !0, this.values.stroke = "rgb(" + Math.round(255 * a.sc[0]) + "," + Math.round(255 * a.sc[1]) + "," + Math.round(255 * a.sc[2]) + ")", this.values.sWidth = a.sw);
            var d, e, f = this.globalData.fontManager.getFontByName(a.f),
                g = a.l,
                h = this.mHelper;
            this.stroke = c, this.values.fValue = a.s + "px " + this.globalData.fontManager.getFontByName(a.f).fFamily, e = a.t.length, this.tHelper.font = this.values.fValue;
            var i, j, k, l, m, n, o, p, q, r, s = this.data.singleShape;
            if (s) var t = 0,
                u = 0,
                v = a.lineWidths,
                w = a.boxWidth,
                x = !0;
            var y = 0;
            for (d = 0; d < e; d += 1) {
                i = this.globalData.fontManager.getCharData(a.t.charAt(d), f.fStyle, this.globalData.fontManager.getFontByName(a.f).fFamily);
                var j;
                if (j = i ? i.data : null, h.reset(), s && g[d].n && (t = 0, u += a.yOffset, u += x ? 1 : 0, x = !1), j && j.shapes) {
                    if (m = j.shapes[0].it, o = m.length, h.scale(a.s / 100, a.s / 100), s) {
                        switch (a.ps && h.translate(a.ps[0], a.ps[1] + a.ascent, 0), a.j) {
                            case 1:
                                h.translate(a.justifyOffset + (w - v[g[d].line]), 0, 0);
                                break;
                            case 2:
                                h.translate(a.justifyOffset + (w - v[g[d].line]) / 2, 0, 0)
                        }
                        h.translate(t, u, 0)
                    }
                    for (q = new Array(o), n = 0; n < o; n += 1) {
                        for (l = m[n].ks.k.i.length, p = m[n].ks.k, r = [], k = 1; k < l; k += 1) 1 == k && r.push(h.applyToX(p.v[0][0], p.v[0][1], 0), h.applyToY(p.v[0][0], p.v[0][1], 0)), r.push(h.applyToX(p.o[k - 1][0], p.o[k - 1][1], 0), h.applyToY(p.o[k - 1][0], p.o[k - 1][1], 0), h.applyToX(p.i[k][0], p.i[k][1], 0), h.applyToY(p.i[k][0], p.i[k][1], 0), h.applyToX(p.v[k][0], p.v[k][1], 0), h.applyToY(p.v[k][0], p.v[k][1], 0));
                        r.push(h.applyToX(p.o[k - 1][0], p.o[k - 1][1], 0), h.applyToY(p.o[k - 1][0], p.o[k - 1][1], 0), h.applyToX(p.i[0][0], p.i[0][1], 0), h.applyToY(p.i[0][0], p.i[0][1], 0), h.applyToX(p.v[0][0], p.v[0][1], 0), h.applyToY(p.v[0][0], p.v[0][1], 0)), q[n] = r
                    }
                } else q = [];
                s && (t += g[d].l), this.textSpans[y] ? this.textSpans[y].elem = q : this.textSpans[y] = {
                    elem: q
                }, y += 1
            }
        }, CVTextElement.prototype.renderFrame = function(a) {
            if (this._parent.renderFrame.call(this, a) !== !1) {
                var b = this.canvasContext,
                    c = this.finalTransform.mat.props;
                this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(c), this.globalData.renderer.ctxOpacity(this.finalTransform.opacity), b.font = this.values.fValue, b.lineCap = "butt", b.lineJoin = "miter", b.miterLimit = 4, this.data.singleShape || this.getMeasures();
                var d, e, f, g, h, i, j = this.renderedLetters,
                    k = this.currentTextDocumentData.l;
                e = k.length;
                var l, m, n, o = null,
                    p = null,
                    q = null;
                for (d = 0; d < e; d += 1)
                    if (!k[d].n) {
                        if (l = j[d], l && (this.globalData.renderer.save(), this.globalData.renderer.ctxTransform(l.props), this.globalData.renderer.ctxOpacity(l.o)), this.fill) {
                            for (l && l.fc ? o !== l.fc && (o = l.fc, b.fillStyle = l.fc) : o !== this.values.fill && (o = this.values.fill, b.fillStyle = this.values.fill), m = this.textSpans[d].elem, g = m.length, this.globalData.canvasContext.beginPath(), f = 0; f < g; f += 1)
                                for (n = m[f], i = n.length, this.globalData.canvasContext.moveTo(n[0], n[1]), h = 2; h < i; h += 6) this.globalData.canvasContext.bezierCurveTo(n[h], n[h + 1], n[h + 2], n[h + 3], n[h + 4], n[h + 5]);
                            this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill()
                        }
                        if (this.stroke) {
                            for (l && l.sw ? q !== l.sw && (q = l.sw, b.lineWidth = l.sw) : q !== this.values.sWidth && (q = this.values.sWidth, b.lineWidth = this.values.sWidth), l && l.sc ? p !== l.sc && (p = l.sc, b.strokeStyle = l.sc) : p !== this.values.stroke && (p = this.values.stroke, b.strokeStyle = this.values.stroke), m = this.textSpans[d].elem, g = m.length, this.globalData.canvasContext.beginPath(), f = 0; f < g; f += 1)
                                for (n = m[f], i = n.length, this.globalData.canvasContext.moveTo(n[0], n[1]), h = 2; h < i; h += 6) this.globalData.canvasContext.bezierCurveTo(n[h], n[h + 1], n[h + 2], n[h + 3], n[h + 4], n[h + 5]);
                            this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke()
                        }
                        l && this.globalData.renderer.restore()
                    }
                this.globalData.renderer.restore(this.data.hasMask), this.firstFrame && (this.firstFrame = !1)
            }
        }, createElement(BaseElement, HBaseElement), HBaseElement.prototype.checkBlendMode = function() {}, HBaseElement.prototype.setBlendMode = BaseElement.prototype.setBlendMode, HBaseElement.prototype.getBaseElement = function() {
            return this.baseElement
        }, HBaseElement.prototype.createElements = function() {
            this.data.hasMask ? (this.layerElement = document.createElementNS(svgNS, "svg"), styleDiv(this.layerElement), this.baseElement = this.layerElement, this.maskedElement = this.layerElement) : this.layerElement = this.parentContainer, this.transformedElement = this.layerElement, !this.data.ln || 4 !== this.data.ty && 0 !== this.data.ty || (this.layerElement === this.parentContainer && (this.layerElement = document.createElementNS(svgNS, "g"), this.baseElement = this.layerElement), this.layerElement.setAttribute("id", this.data.ln)), this.setBlendMode(), this.layerElement !== this.parentContainer && (this.placeholder = null), this.checkParenting()
        }, HBaseElement.prototype.renderFrame = function(a) {
            if (3 === this.data.ty) return !1;
            if (this.currentFrameNum === this.lastNum || !this.isVisible) return this.isVisible;
            this.lastNum = this.currentFrameNum, this.finalTransform.opMdf = this.finalTransform.op.mdf, this.finalTransform.matMdf = this.finalTransform.mProp.mdf, this.finalTransform.opacity = this.finalTransform.op.v, this.firstFrame && (this.finalTransform.opMdf = !0, this.finalTransform.matMdf = !0);
            var b, c = this.finalTransform.mat;
            if (this.hierarchy) {
                var d, e = this.hierarchy.length;
                for (b = this.finalTransform.mProp.v.props, c.cloneFromProps(b), d = 0; d < e; d += 1) this.finalTransform.matMdf = !!this.hierarchy[d].finalTransform.mProp.mdf || this.finalTransform.matMdf, b = this.hierarchy[d].finalTransform.mProp.v.props, c.transform(b[0], b[1], b[2], b[3], b[4], b[5], b[6], b[7], b[8], b[9], b[10], b[11], b[12], b[13], b[14], b[15])
            } else this.isVisible && this.finalTransform.matMdf && (a ? (b = this.finalTransform.mProp.v.props, c.cloneFromProps(b)) : c.cloneFromProps(this.finalTransform.mProp.v.props));
            return this.data.hasMask && this.maskManager.renderFrame(c), a && (b = a.mat.props, c.cloneFromProps(b), this.finalTransform.opacity *= a.opacity, this.finalTransform.opMdf = !!a.opMdf || this.finalTransform.opMdf, this.finalTransform.matMdf = !!a.matMdf || this.finalTransform.matMdf), this.finalTransform.matMdf && (this.transformedElement.style.transform = this.transformedElement.style.webkitTransform = c.toCSS(), this.finalMat = c), this.finalTransform.opMdf && (this.transformedElement.style.opacity = this.finalTransform.opacity), this.isVisible
        }, HBaseElement.prototype.destroy = function() {
            this.layerElement = null, this.transformedElement = null, this.parentContainer = null, this.matteElement && (this.matteElement = null), this.maskManager && (this.maskManager.destroy(), this.maskManager = null)
        }, HBaseElement.prototype.getDomElement = function() {
            return this.layerElement
        }, HBaseElement.prototype.addMasks = function(a) {
            this.maskManager = new MaskElement(a, this, this.globalData)
        }, HBaseElement.prototype.hide = function() {}, HBaseElement.prototype.setMatte = function() {}, HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, createElement(HBaseElement, HSolidElement), HSolidElement.prototype.createElements = function() {
            var a = document.createElement("div");
            styleDiv(a);
            var b = document.createElementNS(svgNS, "svg");
            styleDiv(b), b.setAttribute("width", this.data.sw), b.setAttribute("height", this.data.sh), a.appendChild(b), this.layerElement = a, this.transformedElement = a, this.baseElement = a, this.innerElem = a, this.data.ln && this.innerElem.setAttribute("id", this.data.ln), 0 !== this.data.bm && this.setBlendMode();
            var c = document.createElementNS(svgNS, "rect");
            c.setAttribute("width", this.data.sw), c.setAttribute("height", this.data.sh), c.setAttribute("fill", this.data.sc), b.appendChild(c), this.data.hasMask && (this.maskedElement = c), this.checkParenting()
        }, HSolidElement.prototype.hide = IImageElement.prototype.hide, HSolidElement.prototype.renderFrame = IImageElement.prototype.renderFrame, HSolidElement.prototype.destroy = IImageElement.prototype.destroy, createElement(HBaseElement, HCompElement), HCompElement.prototype.createElements = function() {
            var a = document.createElement("div");
            if (styleDiv(a), this.data.ln && a.setAttribute("id", this.data.ln), a.style.clip = "rect(0px, " + this.data.w + "px, " + this.data.h + "px, 0px)", this.data.hasMask) {
                var b = document.createElementNS(svgNS, "svg");
                styleDiv(b), b.setAttribute("width", this.data.w), b.setAttribute("height", this.data.h);
                var c = document.createElementNS(svgNS, "g");
                b.appendChild(c), a.appendChild(b), this.maskedElement = c, this.baseElement = a, this.layerElement = c, this.transformedElement = a
            } else this.layerElement = a, this.baseElement = this.layerElement, this.transformedElement = a;
            this.checkParenting()
        }, HCompElement.prototype.hide = ICompElement.prototype.hide, HCompElement.prototype.prepareFrame = ICompElement.prototype.prepareFrame, HCompElement.prototype.setElements = ICompElement.prototype.setElements, HCompElement.prototype.getElements = ICompElement.prototype.getElements, HCompElement.prototype.destroy = ICompElement.prototype.destroy, HCompElement.prototype.renderFrame = function(a) {
            var b, c = this._parent.renderFrame.call(this, a),
                d = this.layers.length;
            if (c === !1) return void this.hide();
            for (this.hidden = !1, b = 0; b < d; b += 1)(this.completeLayers || this.elements[b]) && this.elements[b].renderFrame();
            this.firstFrame && (this.firstFrame = !1)
        }, HCompElement.prototype.checkLayers = BaseRenderer.prototype.checkLayers, HCompElement.prototype.buildItem = HybridRenderer.prototype.buildItem, HCompElement.prototype.checkPendingElements = HybridRenderer.prototype.checkPendingElements, HCompElement.prototype.addPendingElement = HybridRenderer.prototype.addPendingElement, HCompElement.prototype.buildAllItems = BaseRenderer.prototype.buildAllItems, HCompElement.prototype.createItem = HybridRenderer.prototype.createItem, HCompElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting, HCompElement.prototype.createImage = HybridRenderer.prototype.createImage, HCompElement.prototype.createComp = HybridRenderer.prototype.createComp, HCompElement.prototype.createSolid = HybridRenderer.prototype.createSolid, HCompElement.prototype.createShape = HybridRenderer.prototype.createShape, HCompElement.prototype.createText = HybridRenderer.prototype.createText, HCompElement.prototype.createBase = HybridRenderer.prototype.createBase, HCompElement.prototype.appendElementInPos = HybridRenderer.prototype.appendElementInPos, createElement(HBaseElement, HShapeElement);
        var parent = HShapeElement.prototype._parent;
        extendPrototype(IShapeElement, HShapeElement), HShapeElement.prototype._parent = parent, HShapeElement.prototype.createElements = function() {
            var a = document.createElement("div");
            styleDiv(a);
            var b = document.createElementNS(svgNS, "svg");
            styleDiv(b);
            var c = this.comp.data ? this.comp.data : this.globalData.compSize;
            if (b.setAttribute("width", c.w), b.setAttribute("height", c.h), this.data.hasMask) {
                var d = document.createElementNS(svgNS, "g");
                a.appendChild(b), b.appendChild(d), this.maskedElement = d, this.layerElement = d, this.shapesContainer = d
            } else a.appendChild(b), this.layerElement = b, this.shapesContainer = document.createElementNS(svgNS, "g"), this.layerElement.appendChild(this.shapesContainer);
            this.data.hd || (this.baseElement = a), this.innerElem = a, this.data.ln && this.innerElem.setAttribute("id", this.data.ln), this.searchShapes(this.shapesData, this.viewData, this.layerElement, this.dynamicProperties, 0), this.buildExpressionInterface(), this.layerElement = a, this.transformedElement = a, this.shapeCont = b, 0 !== this.data.bm && this.setBlendMode(), this.checkParenting()
        }, HShapeElement.prototype.renderFrame = function(a) {
            var b = this._parent.renderFrame.call(this, a);
            if (b === !1) return void this.hide();
            if (this.hidden && (this.layerElement.style.display = "block", this.hidden = !1), this.renderModifiers(), this.addedTransforms.mdf = this.finalTransform.matMdf, this.addedTransforms.mats.length = 1, this.addedTransforms.mats[0] = this.finalTransform.mat, this.renderShape(null, null, !0, null), this.isVisible && (this.elemMdf || this.firstFrame)) {
                var c = this.shapeCont.getBBox(),
                    d = !1;
                this.currentBBox.w !== c.width && (this.currentBBox.w = c.width, this.shapeCont.setAttribute("width", c.width), d = !0), this.currentBBox.h !== c.height && (this.currentBBox.h = c.height, this.shapeCont.setAttribute("height", c.height), d = !0), (d || this.currentBBox.x !== c.x || this.currentBBox.y !== c.y) && (this.currentBBox.w = c.width, this.currentBBox.h = c.height, this.currentBBox.x = c.x, this.currentBBox.y = c.y, this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.shapeCont.style.transform = this.shapeCont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
            }
        }, createElement(HBaseElement, HTextElement), HTextElement.prototype.init = ITextElement.prototype.init, HTextElement.prototype.getMeasures = ITextElement.prototype.getMeasures, HTextElement.prototype.createPathShape = ITextElement.prototype.createPathShape, HTextElement.prototype.prepareFrame = ITextElement.prototype.prepareFrame, HTextElement.prototype.createElements = function() {
            this.isMasked = this.checkMasks();
            var a = document.createElement("div");
            if (styleDiv(a), this.layerElement = a, this.transformedElement = a, this.isMasked) {
                this.renderType = "svg";
                var b = document.createElementNS(svgNS, "svg");
                styleDiv(b), this.cont = b, this.compW = this.comp.data ? this.comp.data.w : this.globalData.compSize.w, this.compH = this.comp.data ? this.comp.data.h : this.globalData.compSize.h, b.setAttribute("width", this.compW), b.setAttribute("height", this.compH);
                var c = document.createElementNS(svgNS, "g");
                b.appendChild(c), a.appendChild(b), this.maskedElement = c, this.innerElem = c
            } else this.renderType = "html", this.innerElem = a;
            this.baseElement = a, this.checkParenting()
        }, HTextElement.prototype.buildNewText = function() {
            var a = this.currentTextDocumentData;
            this.renderedLetters = Array.apply(null, {
                length: this.currentTextDocumentData.l ? this.currentTextDocumentData.l.length : 0
            }), a.fc ? this.innerElem.style.color = this.innerElem.style.fill = "rgb(" + Math.round(255 * a.fc[0]) + "," + Math.round(255 * a.fc[1]) + "," + Math.round(255 * a.fc[2]) + ")" : this.innerElem.style.color = this.innerElem.style.fill = "rgba(0,0,0,0)", a.sc && (this.innerElem.style.stroke = "rgb(" + Math.round(255 * a.sc[0]) + "," + Math.round(255 * a.sc[1]) + "," + Math.round(255 * a.sc[2]) + ")", this.innerElem.style.strokeWidth = a.sw + "px");
            var b = this.globalData.fontManager.getFontByName(a.f);
            if (!this.globalData.fontManager.chars)
                if (this.innerElem.style.fontSize = a.s + "px", this.innerElem.style.lineHeight = a.s + "px", b.fClass) this.innerElem.className = b.fClass;
                else {
                    this.innerElem.style.fontFamily = b.fFamily;
                    var c = a.fWeight,
                        d = a.fStyle;
                    this.innerElem.style.fontStyle = d, this.innerElem.style.fontWeight = c
                }
            var e, f, g = a.l;
            f = g.length;
            var h, i, j, k, l = this.mHelper,
                m = "",
                n = 0;
            for (e = 0; e < f; e += 1) {
                if (this.globalData.fontManager.chars ? (this.textPaths[n] ? h = this.textPaths[n] : (h = document.createElementNS(svgNS, "path"), h.setAttribute("stroke-linecap", "butt"), h.setAttribute("stroke-linejoin", "round"), h.setAttribute("stroke-miterlimit", "4")), this.isMasked || (this.textSpans[n] ? (i = this.textSpans[n], j = i.children[0]) : (i = document.createElement("div"), j = document.createElementNS(svgNS, "svg"), j.appendChild(h), styleDiv(i)))) : this.isMasked ? h = this.textPaths[n] ? this.textPaths[n] : document.createElementNS(svgNS, "text") : this.textSpans[n] ? (i = this.textSpans[n], h = this.textPaths[n]) : (i = document.createElement("span"), styleDiv(i), h = document.createElement("span"), styleDiv(h), i.appendChild(h)), this.globalData.fontManager.chars) {
                    var o, p = this.globalData.fontManager.getCharData(a.t.charAt(e), b.fStyle, this.globalData.fontManager.getFontByName(a.f).fFamily);
                    if (o = p ? p.data : null, l.reset(), o && o.shapes && (k = o.shapes[0].it, l.scale(a.s / 100, a.s / 100), m = this.createPathShape(l, k), h.setAttribute("d", m)), this.isMasked) this.innerElem.appendChild(h);
                    else if (this.innerElem.appendChild(i), o && o.shapes) {
                        document.body.appendChild(j);
                        var q = j.getBBox();
                        j.setAttribute("width", q.width), j.setAttribute("height", q.height), j.setAttribute("viewBox", q.x + " " + q.y + " " + q.width + " " + q.height), j.style.transform = j.style.webkitTransform = "translate(" + q.x + "px," + q.y + "px)", g[e].yOffset = q.y, i.appendChild(j)
                    } else j.setAttribute("width", 1), j.setAttribute("height", 1)
                } else h.textContent = g[e].val, h.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), this.isMasked ? this.innerElem.appendChild(h) : (this.innerElem.appendChild(i), h.style.transform = h.style.webkitTransform = "translate3d(0," + -a.s / 1.2 + "px,0)");
                this.isMasked ? this.textSpans[n] = h : this.textSpans[n] = i, this.textSpans[n].style.display = "block", this.textPaths[n] = h, n += 1
            }
            for (; n < this.textSpans.length;) this.textSpans[n].style.display = "none", n += 1
        }, HTextElement.prototype.hide = SVGTextElement.prototype.hide, HTextElement.prototype.renderFrame = function(a) {
            var b = this._parent.renderFrame.call(this, a);
            if (b === !1) return void this.hide();
            if (this.hidden && (this.hidden = !1, this.innerElem.style.display = "block", this.layerElement.style.display = "block"), this.data.singleShape) {
                if (!this.firstFrame && !this.lettersChangedFlag) return;
                this.isMasked && this.finalTransform.matMdf && (this.cont.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH), this.cont.style.transform = this.cont.style.webkitTransform = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)")
            }
            if (this.getMeasures(), this.lettersChangedFlag) {
                var c, d, e = this.renderedLetters,
                    f = this.currentTextDocumentData.l;
                d = f.length;
                var g;
                for (c = 0; c < d; c += 1) f[c].n || (g = e[c], this.isMasked ? this.textSpans[c].setAttribute("transform", g.m) : this.textSpans[c].style.transform = this.textSpans[c].style.webkitTransform = g.m, this.textSpans[c].style.opacity = g.o, g.sw && this.textPaths[c].setAttribute("stroke-width", g.sw), g.sc && this.textPaths[c].setAttribute("stroke", g.sc), g.fc && (this.textPaths[c].setAttribute("fill", g.fc), this.textPaths[c].style.color = g.fc));
                if (this.isVisible && (this.elemMdf || this.firstFrame) && this.innerElem.getBBox) {
                    var h = this.innerElem.getBBox();
                    this.currentBBox.w !== h.width && (this.currentBBox.w = h.width, this.cont.setAttribute("width", h.width)), this.currentBBox.h !== h.height && (this.currentBBox.h = h.height, this.cont.setAttribute("height", h.height)), this.currentBBox.w === h.width && this.currentBBox.h === h.height && this.currentBBox.x === h.x && this.currentBBox.y === h.y || (this.currentBBox.w = h.width, this.currentBBox.h = h.height, this.currentBBox.x = h.x, this.currentBBox.y = h.y, this.cont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h), this.cont.style.transform = this.cont.style.webkitTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)")
                }
                this.firstFrame && (this.firstFrame = !1)
            }
        }, HTextElement.prototype.destroy = SVGTextElement.prototype.destroy, createElement(HBaseElement, HImageElement), HImageElement.prototype.createElements = function() {
            var a = this.globalData.getAssetsPath(this.assetData),
                b = new Image;
            if (this.data.hasMask) {
                var c = document.createElement("div");
                styleDiv(c);
                var d = document.createElementNS(svgNS, "svg");
                styleDiv(d), d.setAttribute("width", this.assetData.w), d.setAttribute("height", this.assetData.h), c.appendChild(d), this.imageElem = document.createElementNS(svgNS, "image"), this.imageElem.setAttribute("width", this.assetData.w + "px"), this.imageElem.setAttribute("height", this.assetData.h + "px"), this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", a), d.appendChild(this.imageElem), this.layerElement = c, this.transformedElement = c, this.baseElement = c, this.innerElem = c, this.maskedElement = this.imageElem
            } else styleDiv(b), this.layerElement = b, this.baseElement = b, this.innerElem = b, this.transformedElement = b;
            b.src = a, this.data.ln && this.innerElem.setAttribute("id", this.data.ln), this.checkParenting()
        }, HImageElement.prototype.hide = HSolidElement.prototype.hide, HImageElement.prototype.renderFrame = HSolidElement.prototype.renderFrame, HImageElement.prototype.destroy = HSolidElement.prototype.destroy, createElement(HBaseElement, HCameraElement), HCameraElement.prototype.setup = function() {
            var a, b, c = this.comp.threeDElements.length;
            for (a = 0; a < c; a += 1) b = this.comp.threeDElements[a], b.perspectiveElem.style.perspective = b.perspectiveElem.style.webkitPerspective = this.pe.v + "px", b.container.style.transformOrigin = b.container.style.mozTransformOrigin = b.container.style.webkitTransformOrigin = "0px 0px 0px", b.perspectiveElem.style.transform = b.perspectiveElem.style.webkitTransform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"
        }, HCameraElement.prototype.createElements = function() {}, HCameraElement.prototype.hide = function() {}, HCameraElement.prototype.renderFrame = function() {
            var a, b, c = this.firstFrame;
            if (this.hierarchy)
                for (b = this.hierarchy.length, a = 0; a < b; a += 1) c = !!this.hierarchy[a].finalTransform.mProp.mdf || c;
            if (c || this.p && this.p.mdf || this.px && (this.px.mdf || this.py.mdf || this.pz.mdf) || this.rx.mdf || this.ry.mdf || this.rz.mdf || this.or.mdf || this.a && this.a.mdf) {
                if (this.mat.reset(), this.p ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]) : this.mat.translate(-this.px.v, -this.py.v, this.pz.v), this.a) {
                    var d = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]],
                        e = Math.sqrt(Math.pow(d[0], 2) + Math.pow(d[1], 2) + Math.pow(d[2], 2)),
                        f = [d[0] / e, d[1] / e, d[2] / e],
                        g = Math.sqrt(f[2] * f[2] + f[0] * f[0]),
                        h = Math.atan2(f[1], g),
                        i = Math.atan2(f[0], -f[2]);
                    this.mat.rotateY(i).rotateX(-h)
                }
                if (this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v), this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]), this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0), this.mat.translate(0, 0, this.pe.v), this.hierarchy) {
                    var j;
                    for (b = this.hierarchy.length, a = 0; a < b; a += 1) j = this.hierarchy[a].finalTransform.mProp.iv.props, this.mat.transform(j[0], j[1], j[2], j[3], j[4], j[5], j[6], j[7], j[8], j[9], j[10], j[11], -j[12], -j[13], j[14], j[15])
                }
                b = this.comp.threeDElements.length;
                var k;
                for (a = 0; a < b; a += 1) k = this.comp.threeDElements[a], k.container.style.transform = k.container.style.webkitTransform = this.mat.toCSS()
            }
            this.firstFrame = !1
        }, HCameraElement.prototype.destroy = function() {};
        var Expressions = function() {
            function a(a) {
                a.renderer.compInterface = CompExpressionInterface(a.renderer), a.renderer.globalData.projectInterface.registerComposition(a.renderer)
            }
            var b = {};
            return b.initExpressions = a, b
        }();
        expressionsPlugin = Expressions,
            function() {
                function a() {
                    return this.pv
                }

                function b(a, b) {
                    var c, d, e = 0,
                        f = this.keyframes.length - 1,
                        g = 1,
                        h = !0;
                    b = void 0 === b ? this.offsetTime : 0;
                    for (var i = "object" == typeof this.pv ? [this.pv.length] : 0; h;) {
                        if (c = this.keyframes[e], d = this.keyframes[e + 1], e == f - 1 && a >= d.t - b) {
                            c.h && (c = d);
                            break
                        }
                        if (d.t - b > a) break;
                        e < f - 1 ? e += g : h = !1
                    }
                    var j, k, l, m, n, o = 0;
                    if (c.to) {
                        c.bezierData || bez.buildBezierData(c);
                        var p = c.bezierData;
                        if (a >= d.t - b || a < c.t - b) {
                            var q = a >= d.t - b ? p.points.length - 1 : 0;
                            for (k = p.points[q].point.length, j = 0; j < k; j += 1) i[j] = p.points[q].point[j]
                        } else {
                            c.__fnct ? n = c.__fnct : (n = BezierFactory.getBezierEasing(c.o.x, c.o.y, c.i.x, c.i.y, c.n).get, c.__fnct = n), l = n((a - (c.t - b)) / (d.t - b - (c.t - b)));
                            var r, s = p.segmentLength * l,
                                t = 0;
                            for (g = 1, h = !0, m = p.points.length; h;) {
                                if (t += p.points[o].partialLength * g, 0 === s || 0 === l || o == p.points.length - 1) {
                                    for (k = p.points[o].point.length, j = 0; j < k; j += 1) i[j] = p.points[o].point[j];
                                    break
                                }
                                if (s >= t && s < t + p.points[o + 1].partialLength) {
                                    for (r = (s - t) / p.points[o + 1].partialLength, k = p.points[o].point.length, j = 0; j < k; j += 1) i[j] = p.points[o].point[j] + (p.points[o + 1].point[j] - p.points[o].point[j]) * r;
                                    break
                                }
                                o < m - 1 && 1 == g || o > 0 && g == -1 ? o += g : h = !1
                            }
                        }
                    } else {
                        var u, v, w, x, y, z = !1;
                        for (f = c.s.length, e = 0; e < f; e += 1) {
                            if (1 !== c.h && (c.o.x instanceof Array ? (z = !0, c.__fnct || (c.__fnct = []), c.__fnct[e] || (u = c.o.x[e] || c.o.x[0], v = c.o.y[e] || c.o.y[0], w = c.i.x[e] || c.i.x[0], x = c.i.y[e] || c.i.y[0])) : (z = !1, c.__fnct || (u = c.o.x, v = c.o.y, w = c.i.x, x = c.i.y)), z ? c.__fnct[e] ? n = c.__fnct[e] : (n = BezierFactory.getBezierEasing(u, v, w, x).get, c.__fnct[e] = n) : c.__fnct ? n = c.__fnct : (n = BezierFactory.getBezierEasing(u, v, w, x).get, c.__fnct = n), l = a >= d.t - b ? 1 : a < c.t - b ? 0 : n((a - (c.t - b)) / (d.t - b - (c.t - b)))), this.sh && 1 !== c.h) {
                                var A = c.s[e],
                                    B = c.e[e];
                                A - B < -180 ? A += 360 : A - B > 180 && (A -= 360), y = A + (B - A) * l
                            } else y = 1 === c.h ? c.s[e] : c.s[e] + (c.e[e] - c.s[e]) * l;
                            1 === f ? i = y : i[e] = y
                        }
                    }
                    return i
                }

                function c(a) {
                    if (void 0 !== this.vel) return this.vel;
                    var b = -.01;
                    a *= this.elem.globalData.frameRate;
                    var c, d = this.getValueAtTime(a, 0),
                        e = this.getValueAtTime(a + b, 0);
                    if (d.length) {
                        c = Array.apply(null, {
                            length: d.length
                        });
                        var f;
                        for (f = 0; f < d.length; f += 1) c[f] = this.elem.globalData.frameRate * ((e[f] - d[f]) / b)
                    } else c = (e - d) / b;
                    return c
                }

                function d(a) {
                    this.propertyGroup = a
                }

                function e(a, b, c) {
                    b.x && (c.k = !0, c.x = !0, c.getValue && (c.getPreValue = c.getValue), c.getValue = ExpressionManager.initiateExpression.bind(c)(a, b, c))
                }
                var f = function() {
                        function f(a, b) {
                            return this.textIndex = a + 1, this.textTotal = b, this.getValue(), this.v
                        }
                        return function(g, h) {
                            this.pv = 1, this.comp = g.comp, this.elem = g, this.mult = .01, this.type = "textSelector", this.textTotal = h.totalChars, this.selectorValue = 100, this.lastValue = [1, 1, 1], e.bind(this)(g, h, this), this.getMult = f, this.getVelocityAtTime = c, this.kf ? this.getValueAtTime = b : this.getValueAtTime = a, this.setGroupProperty = d
                        }
                    }(),
                    g = PropertyFactory.getProp;
                PropertyFactory.getProp = function(f, h, i, j, k) {
                    var l = g(f, h, i, j, k);
                    l.getVelocityAtTime = c, l.kf ? l.getValueAtTime = b : l.getValueAtTime = a, l.setGroupProperty = d;
                    var m = l.k;
                    return void 0 !== h.ix && Object.defineProperty(l, "propertyIndex", {
                        get: function() {
                            return h.ix
                        }
                    }), e(f, h, l), !m && l.x && k.push(l), l
                };
                var h = ShapePropertyFactory.getShapeProp;
                ShapePropertyFactory.getShapeProp = function(a, b, c, f, g) {
                    var i = h(a, b, c, f, g);
                    i.setGroupProperty = d;
                    var j = i.k;
                    return void 0 !== b.ix && Object.defineProperty(i, "propertyIndex", {
                        get: function() {
                            return b.ix
                        }
                    }), 3 === c ? e(a, b.pt, i) : 4 === c && e(a, b.ks, i), !j && i.x && f.push(i), i
                };
                var i = PropertyFactory.getTextSelectorProp;
                PropertyFactory.getTextSelectorProp = function(a, b, c) {
                    return 1 === b.t ? new f(a, b, c) : i(a, b, c)
                }
            }();
        var ExpressionManager = function() {
                function duplicatePropertyValue(a, b) {
                    if (b = b || 1, "number" == typeof a) return a * b;
                    if (a.i) return JSON.parse(JSON.stringify(a));
                    var c, d = Array.apply(null, {
                            length: a.length
                        }),
                        e = a.length;
                    for (c = 0; c < e; c += 1) d[c] = a[c] * b;
                    return d
                }

                function $bm_neg(a) {
                    var b = typeof a;
                    if ("number" === b || "boolean" === b) return -a;
                    if ("object" === b) {
                        var c, d = a.length,
                            e = [];
                        for (c = 0; c < d; c += 1) e[c] = -a[c];
                        return e
                    }
                }

                function sum(a, b) {
                    var c = typeof a,
                        d = typeof b;
                    if ("string" === c || "string" === d) return a + b;
                    if (!("number" !== c && "boolean" !== c && "string" !== c || "number" !== d && "boolean" !== d && "string" !== d)) return a + b;
                    if ("object" === c && ("number" === d || "boolean" === d || "string" === d)) return a[0] = a[0] + b, a;
                    if (("number" === c || "boolean" === c || "string" === c) && "object" === d) return b[0] = a + b[0], b;
                    if ("object" === c && "object" === d) {
                        for (var e = 0, f = a.length, g = b.length, h = []; e < f || e < g;) "number" == typeof a[e] && "number" == typeof b[e] ? h[e] = a[e] + b[e] : h[e] = void 0 == b[e] ? a[e] : a[e] || b[e], e += 1;
                        return h
                    }
                    return 0
                }

                function sub(a, b) {
                    var c = typeof a,
                        d = typeof b;
                    if (!("number" !== c && "boolean" !== c && "string" !== c || "number" !== d && "boolean" !== d && "string" !== d)) return a - b;
                    if ("object" === c && ("number" === d || "boolean" === d || "string" === d)) return a[0] = a[0] - b, a;
                    if (("number" === c || "boolean" === c || "string" === c) && "object" === d) return b[0] = a - b[0], b;
                    if ("object" === c && "object" === d) {
                        for (var e = 0, f = a.length, g = b.length, h = []; e < f || e < g;) "number" == typeof a[e] && "number" == typeof b[e] ? h[e] = a[e] - b[e] : h[e] = void 0 == b[e] ? a[e] : a[e] || b[e], e += 1;
                        return h
                    }
                    return 0
                }

                function mul(a, b) {
                    var c, d = typeof a,
                        e = typeof b;
                    if (!("number" !== d && "boolean" !== d && "string" !== d || "number" !== e && "boolean" !== e && "string" !== e)) return a * b;
                    var f, g;
                    if ("object" === d && ("number" === e || "boolean" === e || "string" === e)) {
                        for (g = a.length, c = Array.apply(null, {
                                length: g
                            }), f = 0; f < g; f += 1) c[f] = a[f] * b;
                        return c
                    }
                    if (("number" === d || "boolean" === d || "string" === d) && "object" === e) {
                        for (g = b.length, c = Array.apply(null, {
                                length: g
                            }), f = 0; f < g; f += 1) c[f] = a * b[f];
                        return c
                    }
                    return 0
                }

                function div(a, b) {
                    var c, d = typeof a,
                        e = typeof b;
                    if (!("number" !== d && "boolean" !== d && "string" !== d || "number" !== e && "boolean" !== e && "string" !== e)) return a / b;
                    var f, g;
                    if ("object" === d && ("number" === e || "boolean" === e || "string" === e)) {
                        for (g = a.length, c = Array.apply(null, {
                                length: g
                            }), f = 0; f < g; f += 1) c[f] = a[f] / b;
                        return c
                    }
                    if (("number" === d || "boolean" === d || "string" === d) && "object" === e) {
                        for (g = b.length, c = Array.apply(null, {
                                length: g
                            }), f = 0; f < g; f += 1) c[f] = a / b[f];
                        return c
                    }
                    return 0
                }

                function clamp(a, b, c) {
                    if (b > c) {
                        var d = c;
                        c = b, b = d
                    }
                    return Math.min(Math.max(a, b), c)
                }

                function radiansToDegrees(a) {
                    return a / degToRads
                }

                function degreesToRadians(a) {
                    return a * degToRads
                }

                function length(a, b) {
                    if ("number" == typeof a) return b = b || 0, Math.abs(a - b);
                    b || (b = helperLengthArray);
                    var c, d = Math.min(a.length, b.length),
                        e = 0;
                    for (c = 0; c < d; c += 1) e += Math.pow(b[c] - a[c], 2);
                    return Math.sqrt(e)
                }

                function normalize(a) {
                    return div(a, length(a))
                }

                function rgbToHsl(a) {
                    var b, c, d = a[0],
                        e = a[1],
                        f = a[2],
                        g = Math.max(d, e, f),
                        h = Math.min(d, e, f),
                        i = (g + h) / 2;
                    if (g == h) b = c = 0;
                    else {
                        var j = g - h;
                        switch (c = i > .5 ? j / (2 - g - h) : j / (g + h), g) {
                            case d:
                                b = (e - f) / j + (e < f ? 6 : 0);
                                break;
                            case e:
                                b = (f - d) / j + 2;
                                break;
                            case f:
                                b = (d - e) / j + 4
                        }
                        b /= 6
                    }
                    return [b, c, i, a[3]]
                }

                function hslToRgb(a) {
                    function b(a, b, c) {
                        return c < 0 && (c += 1), c > 1 && (c -= 1), c < 1 / 6 ? a + 6 * (b - a) * c : c < .5 ? b : c < 2 / 3 ? a + (b - a) * (2 / 3 - c) * 6 : a
                    }
                    var c, d, e, f = a[0],
                        g = a[1],
                        h = a[2];
                    if (0 == g) c = d = e = h;
                    else {
                        var i = h < .5 ? h * (1 + g) : h + g - h * g,
                            j = 2 * h - i;
                        c = b(j, i, f + 1 / 3), d = b(j, i, f), e = b(j, i, f - 1 / 3)
                    }
                    return [c, d, e, a[3]]
                }

                function linear(a, b, c, d, e) {
                    if (void 0 === d || void 0 === e) return linear(a, 0, 1, b, c);
                    if (a <= b) return d;
                    if (a >= c) return e;
                    var f = c === b ? 0 : (a - b) / (c - b);
                    if (!d.length) return d + (e - d) * f;
                    var g, h = d.length,
                        i = Array.apply(null, {
                            length: h
                        });
                    for (g = 0; g < h; g += 1) i[g] = d[g] + (e[g] - d[g]) * f;
                    return i
                }

                function random(a, b) {
                    if (void 0 === b && (void 0 === a ? (a = 0, b = 1) : (b = a, a = void 0)), b.length) {
                        var c, d = b.length;
                        a || (a = Array.apply(null, {
                            length: d
                        }));
                        var e = Array.apply(null, {
                                length: d
                            }),
                            f = BMMath.random();
                        for (c = 0; c < d; c += 1) e[c] = a[c] + f * (b[c] - a[c]);
                        return e
                    }
                    void 0 === a && (a = 0);
                    var g = BMMath.random();
                    return a + g * (b - a)
                }

                function initiateExpression(elem, data, property) {
                    function lookAt(a, b) {
                        var c = [b[0] - a[0], b[1] - a[1], b[2] - a[2]],
                            d = Math.atan2(c[0], Math.sqrt(c[1] * c[1] + c[2] * c[2])) / degToRads,
                            e = -Math.atan2(c[1], c[2]) / degToRads;
                        return [e, d, 0]
                    }

                    function easeOut(a, b, c) {
                        return -(c - b) * a * (a - 2) + b
                    }

                    function nearestKey(a) {
                        var b, c, d, e = data.k.length;
                        if (data.k.length && "number" != typeof data.k[0]) {
                            for (c = -1, a *= elem.comp.globalData.frameRate, b = 0; b < e - 1; b += 1) {
                                if (a === data.k[b].t) {
                                    c = b + 1, d = data.k[b].t;
                                    break
                                }
                                if (a > data.k[b].t && a < data.k[b + 1].t) {
                                    a - data.k[b].t > data.k[b + 1].t - a ? (c = b + 2, d = data.k[b + 1].t) : (c = b + 1, d = data.k[b].t);
                                    break
                                }
                            }
                            c === -1 && (c = b + 1, d = data.k[b].t)
                        } else c = 0, d = 0;
                        var f = {};
                        return f.index = c, f.time = d / elem.comp.globalData.frameRate, f
                    }

                    function key(a) {
                        if (!data.k.length || "number" == typeof data.k[0]) return {
                            time: 0
                        };
                        a -= 1;
                        var b, c = {
                            time: data.k[a].t / elem.comp.globalData.frameRate
                        };
                        b = a === data.k.length - 1 ? data.k[a - 1].e : data.k[a].s;
                        var d, e = b.length;
                        for (d = 0; d < e; d += 1) c[d] = b[d];
                        return c
                    }

                    function framesToTime(a, b) {
                        return b || (b = elem.comp.globalData.frameRate), a / b
                    }

                    function timeToFrames(a, b) {
                        return a || (a = time), b || (b = elem.comp.globalData.frameRate), a * b
                    }

                    function toWorld(a) {
                        if (toworldMatrix.reset(), elem.finalTransform.mProp.applyToMatrix(toworldMatrix), elem.hierarchy && elem.hierarchy.length) {
                            var b, c = elem.hierarchy.length;
                            for (b = 0; b < c; b += 1) elem.hierarchy[b].finalTransform.mProp.applyToMatrix(toworldMatrix);
                            return toworldMatrix.applyToPointArray(a[0], a[1], a[2] || 0)
                        }
                        return toworldMatrix.applyToPointArray(a[0], a[1], a[2] || 0)
                    }

                    function fromWorld(a) {
                        fromworldMatrix.reset();
                        var b = [];
                        if (b.push(a), elem.finalTransform.mProp.applyToMatrix(fromworldMatrix), elem.hierarchy && elem.hierarchy.length) {
                            var c, d = elem.hierarchy.length;
                            for (c = 0; c < d; c += 1) elem.hierarchy[c].finalTransform.mProp.applyToMatrix(fromworldMatrix);
                            return fromworldMatrix.inversePoints(b)[0]
                        }
                        return fromworldMatrix.inversePoints(b)[0]
                    }

                    function seedRandom(a) {
                        BMMath.seedrandom(randSeed + a)
                    }

                    function execute() {
                        if (seedRandom(randSeed), this.frameExpressionId !== elem.globalData.frameId || "textSelector" === this.type) {
                            if (this.lock) return this.v = duplicatePropertyValue(this.pv, this.mult), !0;
                            "textSelector" === this.type && (textIndex = this.textIndex, textTotal = this.textTotal, selectorValue = this.selectorValue), transform || (transform = elem.transform), thisLayer || (thisLayer = elem.layerInterface, thisComp = elem.comp.compInterface), 4 !== elemType || content || (content = thisLayer("ADBE Root Vectors Group")), effect || (effect = thisLayer(4)), hasParent = !(!elem.hierarchy || !elem.hierarchy.length), hasParent && !parent && (parent = elem.hierarchy[elem.hierarchy.length - 1].layerInterface), this.lock = !0, this.getPreValue && this.getPreValue(), value = this.pv, time = this.comp.renderedFrame / this.comp.globalData.frameRate, needsVelocity && (velocity = velocityAtTime(time)), bindedFn(), this.frameExpressionId = elem.globalData.frameId;
                            var a, b;
                            if (this.mult)
                                if ("number" == typeof this.v) this.v *= this.mult;
                                else
                                    for (b = this.v.length, value === this.v && (this.v = 2 === b ? [value[0], value[1]] : [value[0], value[1], value[2]]), a = 0; a < b; a += 1) this.v[a] *= this.mult;
                            if ("number" == typeof this.v) this.lastValue !== this.v && (this.lastValue = this.v, this.mdf = !0);
                            else if (this.v.i) this.mdf = !0, this.paths.length = 0, this.paths[0] = this.v;
                            else
                                for (b = this.v.length, a = 0; a < b; a += 1) this.v[a] !== this.lastValue[a] && (this.lastValue[a] = this.v[a], this.mdf = !0);
                            this.lock = !1
                        }
                    }
                    var val = data.x,
                        needsVelocity = val.indexOf("velocity") !== -1,
                        elemType = elem.data.ty,
                        transform, content, effect, thisComp = elem.comp,
                        thisProperty = property;
                    elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate;
                    var inPoint = elem.data.ip / elem.comp.globalData.frameRate,
                        outPoint = elem.data.op / elem.comp.globalData.frameRate,
                        thisLayer, thisComp, fn = new Function,
                        fnStr = "var fn = function(){" + val + ";this.v = $bm_rt;}";
                    eval(fnStr);
                    var bindedFn = fn.bind(this),
                        numKeys = data.k ? data.k.length : 0,
                        wiggle = function(a, b) {
                            var c, d, e = this.pv.length ? this.pv.length : 1,
                                f = Array.apply(null, {
                                    len: e
                                });
                            for (d = 0; d < e; d += 1) f[d] = 0;
                            a = 5;
                            var g = Math.floor(time * a);
                            for (c = 0, d = 0; c < g;) {
                                for (d = 0; d < e; d += 1) f[d] += -b + 2 * b * BMMath.random();
                                c += 1
                            }
                            var h = time * a,
                                i = h - Math.floor(h),
                                j = Array.apply({
                                    length: e
                                });
                            for (d = 0; d < e; d += 1) j[d] = this.pv[d] + f[d] + (-b + 2 * b * BMMath.random()) * i;
                            return j
                        }.bind(this),
                        loopIn = function(a, b, c) {
                            if (!this.k) return this.pv;
                            var d = time * elem.comp.globalData.frameRate,
                                e = this.keyframes,
                                f = e[0].t;
                            if (d >= f) return this.pv;
                            var g, h;
                            c ? (g = b ? Math.abs(elem.comp.globalData.frameRate * b) : Math.max(0, this.elem.data.op - f), h = f + g) : ((!b || b > e.length - 1) && (b = e.length - 1), h = e[b].t, g = h - f);
                            var i, j, k;
                            if ("pingpong" === a) {
                                var l = Math.floor((f - d) / g);
                                if (l % 2 === 0) return this.getValueAtTime((f - d) % g + f, 0)
                            } else {
                                if ("offset" === a) {
                                    var m = this.getValueAtTime(f, 0),
                                        n = this.getValueAtTime(h, 0),
                                        o = this.getValueAtTime(g - (f - d) % g + f, 0),
                                        p = Math.floor((f - d) / g) + 1;
                                    if (this.pv.length) {
                                        for (k = new Array(m.length), j = k.length, i = 0; i < j; i += 1) k[i] = o[i] - (n[i] - m[i]) * p;
                                        return k
                                    }
                                    return o - (n - m) * p
                                }
                                if ("continue" === a) {
                                    var q = this.getValueAtTime(f, 0),
                                        r = this.getValueAtTime(f + .001, 0);
                                    if (this.pv.length) {
                                        for (k = new Array(q.length), j = k.length, i = 0; i < j; i += 1) k[i] = q[i] + (q[i] - r[i]) * (f - d) / 5e-4;
                                        return k
                                    }
                                    return q + (q - r) * (f - d) / 5e-4
                                }
                            }
                            return this.getValueAtTime(g - (f - d) % g + f, 0)
                        }.bind(this),
                        loopInDuration = function(a, b) {
                            return loopIn(a, b, !0)
                        }.bind(this),
                        loopOut = function(a, b, c) {
                            if (!this.k || !this.keyframes) return this.pv;
                            var d = time * elem.comp.globalData.frameRate,
                                e = this.keyframes,
                                f = e[e.length - 1].t;
                            if (d <= f) return this.pv;
                            var g, h;
                            c ? (g = b ? Math.abs(f - elem.comp.globalData.frameRate * b) : Math.max(0, f - this.elem.data.ip), h = f - g) : ((!b || b > e.length - 1) && (b = e.length - 1), h = e[e.length - 1 - b].t, g = f - h);
                            var i, j, k;
                            if ("pingpong" === a) {
                                var l = Math.floor((d - h) / g);
                                if (l % 2 !== 0) return this.getValueAtTime(g - (d - h) % g + h, 0)
                            } else {
                                if ("offset" === a) {
                                    var m = this.getValueAtTime(h, 0),
                                        n = this.getValueAtTime(f, 0),
                                        o = this.getValueAtTime((d - h) % g + h, 0),
                                        p = Math.floor((d - h) / g);
                                    if (this.pv.length) {
                                        for (k = new Array(m.length), j = k.length, i = 0; i < j; i += 1) k[i] = (n[i] - m[i]) * p + o[i];
                                        return k
                                    }
                                    return (n - m) * p + o
                                }
                                if ("continue" === a) {
                                    var q = this.getValueAtTime(f, 0),
                                        r = this.getValueAtTime(f - .001, 0);
                                    if (this.pv.length) {
                                        for (k = new Array(q.length), j = k.length, i = 0; i < j; i += 1) k[i] = q[i] + (q[i] - r[i]) * (d - f) / 5e-4;
                                        return k
                                    }
                                    return q + (q - r) * (d - f) / 5e-4
                                }
                            }
                            return this.getValueAtTime((d - h) % g + h, 0)
                        }.bind(this),
                        loop_out = loopOut,
                        loopOutDuration = function(a, b) {
                            return loopOut(a, b, !0)
                        }.bind(this),
                        valueAtTime = function(a) {
                            return this.getValueAtTime(a * elem.comp.globalData.frameRate, 0)
                        }.bind(this),
                        velocityAtTime = function(a) {
                            return this.getVelocityAtTime(a)
                        }.bind(this),
                        comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface),
                        toworldMatrix = new Matrix,
                        fromworldMatrix = new Matrix,
                        time, velocity, value, textIndex, textTotal, selectorValue, index = elem.data.ind + 1,
                        hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
                        parent, randSeed = Math.floor(1e6 * Math.random());
                    return execute
                }
                var ob = {},
                    Math = BMMath,
                    radians_to_degrees = radiansToDegrees,
                    degrees_to_radians = radiansToDegrees,
                    helperLengthArray = [0, 0, 0, 0, 0, 0];
                return ob.initiateExpression = initiateExpression, ob
            }(),
            ShapeExpressionInterface = function() {
                function a(a, b, c) {
                    return n(a, b, c)
                }

                function b(a, b, c) {
                    return p(a, b, c)
                }

                function c(a, b, c) {
                    return q(a, b, c)
                }

                function d(a, b, c) {
                    return r(a, b, c)
                }

                function e(a, b, c) {
                    return s(a, b, c)
                }

                function f(a, b, c) {
                    return t(a, b, c)
                }

                function g(a, b, c) {
                    return u(a, b, c)
                }

                function h(a, b, c) {
                    return v(a, b, c)
                }

                function i(a, b, c) {
                    return w(a, b, c)
                }

                function j(a, b, c) {
                    return x(a, b, c)
                }

                function k(a, b, c) {
                    return y(a, b, c)
                }

                function l(a, b, c) {
                    var d, e = [],
                        f = a ? a.length : 0;
                    for (d = 0; d < f; d += 1) "gr" == a[d].ty ? e.push(ShapeExpressionInterface.createGroupInterface(a[d], b[d], c)) : "fl" == a[d].ty ? e.push(ShapeExpressionInterface.createFillInterface(a[d], b[d], c)) : "st" == a[d].ty ? e.push(ShapeExpressionInterface.createStrokeInterface(a[d], b[d], c)) : "tm" == a[d].ty ? e.push(ShapeExpressionInterface.createTrimInterface(a[d], b[d], c)) : "tr" == a[d].ty || ("el" == a[d].ty ? e.push(ShapeExpressionInterface.createEllipseInterface(a[d], b[d], c)) : "sr" == a[d].ty ? e.push(ShapeExpressionInterface.createStarInterface(a[d], b[d], c)) : "sh" == a[d].ty ? e.push(ShapeExpressionInterface.createPathInterface(a[d], b[d], c)) : "rc" == a[d].ty ? e.push(ShapeExpressionInterface.createRectInterface(a[d], b[d], c)) : "rd" == a[d].ty && e.push(ShapeExpressionInterface.createRoundedInterface(a[d], b[d], c)));
                    return e
                }
                var m = {
                        createShapeInterface: a,
                        createGroupInterface: b,
                        createTrimInterface: e,
                        createStrokeInterface: d,
                        createTransformInterface: f,
                        createEllipseInterface: g,
                        createStarInterface: h,
                        createRectInterface: i,
                        createRoundedInterface: j,
                        createPathInterface: k,
                        createFillInterface: c
                    },
                    n = function() {
                        return function(a, b, c) {
                            function d(a) {
                                if ("number" == typeof a) return e[a - 1];
                                for (var b = 0, c = e.length; b < c;) {
                                    if (e[b]._name === a) return e[b];
                                    b += 1
                                }
                            }
                            var e;
                            return d.propertyGroup = c, e = l(a, b, d), d
                        }
                    }(),
                    o = function() {
                        return function(a, b, c) {
                            var d, e = function(a) {
                                if ("number" == typeof a) return d[a - 1];
                                for (var b = 0, c = d.length; b < c;) {
                                    if (d[b]._name === a || d[b].mn === a) return d[b];
                                    b += 1
                                }
                            };
                            return e.propertyGroup = function(a) {
                                return 1 === a ? e : c(a - 1)
                            }, d = l(a.it, b.it, e.propertyGroup), e.numProperties = d.length, e
                        }
                    }(),
                    p = function() {
                        return function(a, b, c) {
                            var d = function(a) {
                                switch (a) {
                                    case "ADBE Vectors Group":
                                    case 2:
                                        return d.content;
                                    case "ADBE Vector Transform Group":
                                    case 3:
                                    default:
                                        return d.transform
                                }
                            };
                            d.propertyGroup = function(a) {
                                return 1 === a ? d : c(a - 1)
                            };
                            var e = o(a, b, d.propertyGroup),
                                f = ShapeExpressionInterface.createTransformInterface(a.it[a.it.length - 1], b.it[b.it.length - 1], d.propertyGroup);
                            return d.content = e, d.transform = f, Object.defineProperty(d, "_name", {
                                get: function() {
                                    return a.nm
                                }
                            }), d.numProperties = 1, d.nm = a.nm, d.mn = a.mn, d
                        }
                    }(),
                    q = function() {
                        return function(a, b, c) {
                            b.c.setGroupProperty(c), b.o.setGroupProperty(c);
                            var d = {
                                get color() {
                                    return b.c.k && b.c.getValue(), [b.c.v[0] / b.c.mult, b.c.v[1] / b.c.mult, b.c.v[2] / b.c.mult, 1]
                                },
                                get opacity() {
                                    return b.o.k && b.o.getValue(), b.o.v
                                },
                                _name: a.nm,
                                mn: a.mn
                            };
                            return d
                        }
                    }(),
                    r = function() {
                        return function(a, b, c) {
                            function d(a) {
                                return 1 === a ? e : c(a - 1)
                            }
                            b.c.setGroupProperty(d), b.o.setGroupProperty(d), b.w.setGroupProperty(d);
                            var e = {
                                get color() {
                                    return b.c.k && b.c.getValue(), [b.c.v[0] / b.c.mult, b.c.v[1] / b.c.mult, b.c.v[2] / b.c.mult, 1]
                                },
                                get opacity() {
                                    return b.o.k && b.o.getValue(), b.o.v
                                },
                                get strokeWidth() {
                                    return b.w.k && b.w.getValue(), b.w.v
                                },
                                dashOb: {},
                                get dash() {
                                    var d, e = b.d,
                                        f = a.d,
                                        g = f.length;
                                    for (d = 0; d < g; d += 1) e.dataProps[d].p.k && e.dataProps[d].p.getValue(), e.dataProps[d].p.setGroupProperty(c), this.dashOb[f[d].nm] = e.dataProps[d].p.v;
                                    return this.dashOb
                                },
                                _name: a.nm,
                                mn: a.mn
                            };
                            return e
                        }
                    }(),
                    s = function() {
                        return function(a, b, c) {
                            function d(a) {
                                return 1 == a ? e : c(--a)
                            }

                            function e(b) {
                                return b === a.e.ix ? e.end : b === a.s.ix ? e.start : b === a.o.ix ? e.offset : void 0
                            }
                            return e.propertyIndex = a.ix, b.s.setGroupProperty(d), b.e.setGroupProperty(d), b.o.setGroupProperty(d), e.propertyIndex = a.ix, Object.defineProperty(e, "start", {
                                get: function() {
                                    return b.s.k && b.s.getValue(), b.s.v / b.s.mult
                                }
                            }), Object.defineProperty(e, "end", {
                                get: function() {
                                    return b.e.k && b.e.getValue(), b.e.v / b.e.mult
                                }
                            }), Object.defineProperty(e, "offset", {
                                get: function() {
                                    return b.o.k && b.o.getValue(), b.o.v
                                }
                            }), Object.defineProperty(e, "_name", {
                                get: function() {
                                    return a.nm
                                }
                            }), e.mn = a.mn, e
                        }
                    }(),
                    t = function() {
                        return function(a, b, c) {
                            function d(a) {
                                return 1 == a ? e : c(--a)
                            }

                            function e(b) {
                                return a.a.ix === b ? e.anchorPoint : a.o.ix === b ? e.opacity : a.p.ix === b ? e.position : a.r.ix === b ? e.rotation : a.s.ix === b ? e.scale : a.sk && a.sk.ix === b ? e.skew : a.sa && a.sa.ix === b ? e.skewAxis : void 0
                            }
                            b.transform.mProps.o.setGroupProperty(d), b.transform.mProps.p.setGroupProperty(d), b.transform.mProps.a.setGroupProperty(d), b.transform.mProps.s.setGroupProperty(d), b.transform.mProps.r.setGroupProperty(d), b.transform.mProps.sk && (b.transform.mProps.sk.setGroupProperty(d), b.transform.mProps.sa.setGroupProperty(d)), b.transform.op.setGroupProperty(d), Object.defineProperty(e, "opacity", {
                                get: function() {
                                    return b.transform.mProps.o.k && b.transform.mProps.o.getValue(), b.transform.mProps.o.v / b.transform.mProps.o.mult
                                }
                            }), Object.defineProperty(e, "position", {
                                get: function() {
                                    return b.transform.mProps.p.k && b.transform.mProps.p.getValue(), [b.transform.mProps.p.v[0], b.transform.mProps.p.v[1]]
                                }
                            }), Object.defineProperty(e, "anchorPoint", {
                                get: function() {
                                    return b.transform.mProps.a.k && b.transform.mProps.a.getValue(), [b.transform.mProps.a.v[0], b.transform.mProps.a.v[1]]
                                }
                            });
                            var f = [];
                            return Object.defineProperty(e, "scale", {
                                get: function() {
                                    return b.transform.mProps.s.k && b.transform.mProps.s.getValue(), f[0] = b.transform.mProps.s.v[0] / b.transform.mProps.s.mult, f[1] = b.transform.mProps.s.v[1] / b.transform.mProps.s.mult, f
                                }
                            }), Object.defineProperty(e, "rotation", {
                                get: function() {
                                    return b.transform.mProps.r.k && b.transform.mProps.r.getValue(), b.transform.mProps.r.v / b.transform.mProps.r.mult
                                }
                            }), Object.defineProperty(e, "skew", {
                                get: function() {
                                    return b.transform.mProps.sk.k && b.transform.mProps.sk.getValue(), b.transform.mProps.sk.v
                                }
                            }), Object.defineProperty(e, "skewAxis", {
                                get: function() {
                                    return b.transform.mProps.sa.k && b.transform.mProps.sa.getValue(), b.transform.mProps.sa.v
                                }
                            }), Object.defineProperty(e, "_name", {
                                get: function() {
                                    return a.nm
                                }
                            }), e.ty = "tr", e.mn = a.mn, e
                        }
                    }(),
                    u = function() {
                        return function(a, b, c) {
                            function d(a) {
                                return 1 == a ? e : c(--a)
                            }

                            function e(b) {
                                return a.p.ix === b ? e.position : a.s.ix === b ? e.size : void 0
                            }
                            e.propertyIndex = a.ix;
                            var f = "tm" === b.sh.ty ? b.sh.prop : b.sh;
                            return f.s.setGroupProperty(d), f.p.setGroupProperty(d), Object.defineProperty(e, "size", {
                                get: function() {
                                    return f.s.k && f.s.getValue(), [f.s.v[0], f.s.v[1]];
                                }
                            }), Object.defineProperty(e, "position", {
                                get: function() {
                                    return f.p.k && f.p.getValue(), [f.p.v[0], f.p.v[1]]
                                }
                            }), Object.defineProperty(e, "_name", {
                                get: function() {
                                    return a.nm
                                }
                            }), e.mn = a.mn, e
                        }
                    }(),
                    v = function() {
                        return function(a, b, c) {
                            function d(a) {
                                return 1 == a ? e : c(--a)
                            }

                            function e(b) {
                                return a.p.ix === b ? e.position : a.r.ix === b ? e.rotation : a.pt.ix === b ? e.points : a.or.ix === b || "ADBE Vector Star Outer Radius" === b ? e.outerRadius : a.os.ix === b ? e.outerRoundness : !a.ir || a.ir.ix !== b && "ADBE Vector Star Inner Radius" !== b ? a.is && a.is.ix === b ? e.innerRoundness : void 0 : e.innerRadius
                            }
                            var f = "tm" === b.sh.ty ? b.sh.prop : b.sh;
                            return e.propertyIndex = a.ix, f.or.setGroupProperty(d), f.os.setGroupProperty(d), f.pt.setGroupProperty(d), f.p.setGroupProperty(d), f.r.setGroupProperty(d), a.ir && (f.ir.setGroupProperty(d), f.is.setGroupProperty(d)), Object.defineProperty(e, "position", {
                                get: function() {
                                    return f.p.k && f.p.getValue(), f.p.v
                                }
                            }), Object.defineProperty(e, "rotation", {
                                get: function() {
                                    return f.r.k && f.r.getValue(), f.r.v / f.r.mult
                                }
                            }), Object.defineProperty(e, "points", {
                                get: function() {
                                    return f.pt.k && f.pt.getValue(), f.pt.v
                                }
                            }), Object.defineProperty(e, "outerRadius", {
                                get: function() {
                                    return f.or.k && f.or.getValue(), f.or.v
                                }
                            }), Object.defineProperty(e, "outerRoundness", {
                                get: function() {
                                    return f.os.k && f.os.getValue(), f.os.v / f.os.mult
                                }
                            }), Object.defineProperty(e, "innerRadius", {
                                get: function() {
                                    return f.ir ? (f.ir.k && f.ir.getValue(), f.ir.v) : 0
                                }
                            }), Object.defineProperty(e, "innerRoundness", {
                                get: function() {
                                    return f.is ? (f.is.k && f.is.getValue(), f.is.v / f.is.mult) : 0
                                }
                            }), Object.defineProperty(e, "_name", {
                                get: function() {
                                    return a.nm
                                }
                            }), e.mn = a.mn, e
                        }
                    }(),
                    w = function() {
                        return function(a, b, c) {
                            function d(a) {
                                return 1 == a ? e : c(--a)
                            }

                            function e(b) {
                                return a.p.ix === b ? e.position : a.r.ix === b ? e.rotation : a.pt.ix === b ? e.points : a.or.ix === b || "ADBE Vector Star Outer Radius" === b ? e.outerRadius : a.os.ix === b ? e.outerRoundness : !a.ir || a.ir.ix !== b && "ADBE Vector Star Inner Radius" !== b ? a.is && a.is.ix === b ? e.innerRoundness : void 0 : e.innerRadius
                            }
                            var f = "tm" === b.sh.ty ? b.sh.prop : b.sh;
                            return e.propertyIndex = a.ix, f.p.setGroupProperty(d), f.s.setGroupProperty(d), f.r.setGroupProperty(d), Object.defineProperty(e, "position", {
                                get: function() {
                                    return f.p.k && f.p.getValue(), f.p.v
                                }
                            }), Object.defineProperty(e, "roundness", {
                                get: function() {
                                    return f.r.k && f.r.getValue(), f.r.v
                                }
                            }), Object.defineProperty(e, "size", {
                                get: function() {
                                    return f.s.k && f.s.getValue(), f.s.v
                                }
                            }), Object.defineProperty(e, "_name", {
                                get: function() {
                                    return a.nm
                                }
                            }), e.mn = a.mn, e
                        }
                    }(),
                    x = function() {
                        return function(a, b, c) {
                            function d(a) {
                                return 1 == a ? e : c(--a)
                            }

                            function e(b) {
                                if (a.r.ix === b || "Round Corners 1" === b) return e.radius
                            }
                            var f = b;
                            return e.propertyIndex = a.ix, f.rd.setGroupProperty(d), Object.defineProperty(e, "radius", {
                                get: function() {
                                    return f.rd.k && f.rd.getValue(), f.rd.v
                                }
                            }), Object.defineProperty(e, "_name", {
                                get: function() {
                                    return a.nm
                                }
                            }), e.mn = a.mn, e
                        }
                    }(),
                    y = function() {
                        return function(a, b, c) {
                            var d = "tm" === b.sh.ty ? b.sh.prop : b.sh;
                            d.setGroupProperty(c);
                            var e = {
                                get shape() {
                                    return d.k && d.getValue(), d.v
                                },
                                get path() {
                                    return d.k && d.getValue(), d.v
                                },
                                _name: a.nm,
                                mn: a.mn
                            };
                            return e
                        }
                    }();
                return m
            }(),

     

            EffectsExpressionInterface = function() {
                function a(a, c) {
                    if (a.effects) {
                        var d, e = [],
                            f = a.data.ef,
                            g = a.effects.effectElements.length;
                        for (d = 0; d < g; d += 1) e.push(b(f[d], a.effects.effectElements[d], c, a));
                        return function(b) {
                            for (var c = a.data.ef, d = 0, f = c.length; d < f;) {
                                if (b === c[d].nm || b === c[d].mn || b === c[d].ix) return e[d];
                                d += 1
                            }
                        }
                    }
                }

                function b(a, d, e, f) {
                    var g, h = [],
                        i = a.ef.length;
                    for (g = 0; g < i; g += 1) 5 === a.ef[g].ty ? h.push(b(a.ef[g], d.effectElements[g], e, f)) : h.push(c(d.effectElements[g], a.ef[g].ty, f));
                    return function(b) {
                        for (var c = a.ef, d = 0, e = c.length; d < e;) {
                            if (b === c[d].nm || b === c[d].mn || b === c[d].ix) return 5 === c[d].ty ? h[d] : h[d]();
                            d += 1
                        }
                        return h[0]()
                    }
                }

                function c(a, b, c) {
                    return function() {
                        if (10 === b) return c.comp.compInterface(a.p.v);
                        if (a.p.k && a.p.getValue(), "number" == typeof a.p.v) return a.p.v;
                        var d, e = a.p.v.length,
                            f = Array.apply(null, {
                                length: e
                            });
                        for (d = 0; d < e; d += 1) f[d] = a.p.v[d];
                        return f
                    }
                }
                var d = {
                    createEffectsInterface: a
                };
                return d
            }();
        GroupEffect.prototype.getValue = function() {
            this.mdf = !1;
            var a, b = this.dynamicProperties.length;
            for (a = 0; a < b; a += 1) this.dynamicProperties[a].getValue(), this.mdf = !!this.dynamicProperties[a].mdf || this.mdf
        }, GroupEffect.prototype.init = function(a, b, c) {
            this.data = a, this.mdf = !1, this.effectElements = [];
            var d, e, f = this.data.ef.length,
                g = this.data.ef;
            for (d = 0; d < f; d += 1) switch (g[d].ty) {
                case 0:
                    e = new SliderEffect(g[d], b, c), this.effectElements.push(e);
                    break;
                case 1:
                    e = new AngleEffect(g[d], b, c), this.effectElements.push(e);
                    break;
                case 2:
                    e = new ColorEffect(g[d], b, c), this.effectElements.push(e);
                    break;
                case 3:
                    e = new PointEffect(g[d], b, c), this.effectElements.push(e);
                    break;
                case 4:
                case 7:
                    e = new CheckboxEffect(g[d], b, c), this.effectElements.push(e);
                    break;
                case 10:
                    e = new LayerIndexEffect(g[d], b, c), this.effectElements.push(e);
                    break;
                case 5:
                    e = new EffectsManager(g[d], b, c), this.effectElements.push(e);
                    break;
                case 6:
                    e = new NoValueEffect(g[d], b, c), this.effectElements.push(e)
            }
        };
        var bodymovinjs = {};
        bodymovinjs.play = play, bodymovinjs.pause = pause, bodymovinjs.togglePause = togglePause, bodymovinjs.setSpeed = setSpeed, bodymovinjs.setDirection = setDirection, bodymovinjs.stop = stop, bodymovinjs.moveFrame = moveFrame, bodymovinjs.searchAnimations = searchAnimations, bodymovinjs.registerAnimation = registerAnimation, bodymovinjs.loadAnimation = loadAnimation, bodymovinjs.setSubframeRendering = setSubframeRendering, bodymovinjs.resize = resize, bodymovinjs.start = start, bodymovinjs.goToAndStop = goToAndStop, bodymovinjs.destroy = destroy, bodymovinjs.setQuality = setQuality, bodymovinjs.installPlugin = installPlugin, bodymovinjs.__getFactory = getFactory, bodymovinjs.version = "4.5.2";
        var standalone = "__[STANDALONE]__",
            animationData = "__[ANIMATIONDATA]__",
            renderer = "";
        if (standalone) {
            var scripts = document.getElementsByTagName("script"),
                index = scripts.length - 1,
                myScript = scripts[index],
                queryString = myScript.src.replace(/^[^\?]+\??/, "");
            renderer = getQueryVariable("renderer")
        }
        var readyStateCheckInterval = setInterval(checkReady, 100);
        return bodymovinjs
    }),
    function() {
        "use strict";

        function a(d) {
            if (!d) throw new Error("No options passed to Waypoint constructor");
            if (!d.element) throw new Error("No element option passed to Waypoint constructor");
            if (!d.handler) throw new Error("No handler option passed to Waypoint constructor");
            this.key = "waypoint-" + b, this.options = a.Adapter.extend({}, a.defaults, d), this.element = this.options.element, this.adapter = new a.Adapter(this.element), this.callback = d.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = a.Group.findOrCreate({
                name: this.options.group,
                axis: this.axis
            }), this.context = a.Context.findOrCreateByElement(this.options.context), a.offsetAliases[this.options.offset] && (this.options.offset = a.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), c[this.key] = this, b += 1
        }
        var b = 0,
            c = {};
        a.prototype.queueTrigger = function(a) {
            this.group.queueTrigger(this, a)
        }, a.prototype.trigger = function(a) {
            this.enabled && this.callback && this.callback.apply(this, a)
        }, a.prototype.destroy = function() {
            this.context.remove(this), this.group.remove(this), delete c[this.key]
        }, a.prototype.disable = function() {
            return this.enabled = !1, this
        }, a.prototype.enable = function() {
            return this.context.refresh(), this.enabled = !0, this
        }, a.prototype.next = function() {
            return this.group.next(this)
        }, a.prototype.previous = function() {
            return this.group.previous(this)
        }, a.invokeAll = function(a) {
            var b = [];
            for (var d in c) b.push(c[d]);
            for (var e = 0, f = b.length; e < f; e++) b[e][a]()
        }, a.destroyAll = function() {
            a.invokeAll("destroy")
        }, a.disableAll = function() {
            a.invokeAll("disable")
        }, a.enableAll = function() {
            a.Context.refreshAll();
            for (var b in c) c[b].enabled = !0;
            return this
        }, a.refreshAll = function() {
            a.Context.refreshAll()
        }, a.viewportHeight = function() {
            return window.innerHeight || document.documentElement.clientHeight
        }, a.viewportWidth = function() {
            return document.documentElement.clientWidth
        }, a.adapters = [], a.defaults = {
            context: window,
            continuous: !0,
            enabled: !0,
            group: "default",
            horizontal: !1,
            offset: 0
        }, a.offsetAliases = {
            "bottom-in-view": function() {
                return this.context.innerHeight() - this.adapter.outerHeight()
            },
            "right-in-view": function() {
                return this.context.innerWidth() - this.adapter.outerWidth()
            }
        }, window.Waypoint = a
    }(),
    function() {
        "use strict";

        function a(a) {
            window.setTimeout(a, 1e3 / 60)
        }

        function b(a) {
            this.element = a, this.Adapter = e.Adapter, this.adapter = new this.Adapter(a), this.key = "waypoint-context-" + c, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
                x: this.adapter.scrollLeft(),
                y: this.adapter.scrollTop()
            }, this.waypoints = {
                vertical: {},
                horizontal: {}
            }, a.waypointContextKey = this.key, d[a.waypointContextKey] = this, c += 1, e.windowContext || (e.windowContext = !0, e.windowContext = new b(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
        }
        var c = 0,
            d = {},
            e = window.Waypoint,
            f = window.onload;
        b.prototype.add = function(a) {
            var b = a.options.horizontal ? "horizontal" : "vertical";
            this.waypoints[b][a.key] = a, this.refresh()
        }, b.prototype.checkEmpty = function() {
            var a = this.Adapter.isEmptyObject(this.waypoints.horizontal),
                b = this.Adapter.isEmptyObject(this.waypoints.vertical),
                c = this.element == this.element.window;
            a && b && !c && (this.adapter.off(".waypoints"), delete d[this.key])
        }, b.prototype.createThrottledResizeHandler = function() {
            function a() {
                b.handleResize(), b.didResize = !1
            }
            var b = this;
            this.adapter.on("resize.waypoints", function() {
                b.didResize || (b.didResize = !0, e.requestAnimationFrame(a))
            })
        }, b.prototype.createThrottledScrollHandler = function() {
            function a() {
                b.handleScroll(), b.didScroll = !1
            }
            var b = this;
            this.adapter.on("scroll.waypoints", function() {
                b.didScroll && !e.isTouch || (b.didScroll = !0, e.requestAnimationFrame(a))
            })
        }, b.prototype.handleResize = function() {
            e.Context.refreshAll()
        }, b.prototype.handleScroll = function() {
            var a = {},
                b = {
                    horizontal: {
                        newScroll: this.adapter.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.adapter.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
            for (var c in b) {
                var d = b[c],
                    e = d.newScroll > d.oldScroll,
                    f = e ? d.forward : d.backward;
                for (var g in this.waypoints[c]) {
                    var h = this.waypoints[c][g];
                    if (null !== h.triggerPoint) {
                        var i = d.oldScroll < h.triggerPoint,
                            j = d.newScroll >= h.triggerPoint,
                            k = i && j,
                            l = !i && !j;
                        (k || l) && (h.queueTrigger(f), a[h.group.id] = h.group)
                    }
                }
            }
            for (var m in a) a[m].flushTriggers();
            this.oldScroll = {
                x: b.horizontal.newScroll,
                y: b.vertical.newScroll
            }
        }, b.prototype.innerHeight = function() {
            return this.element == this.element.window ? e.viewportHeight() : this.adapter.innerHeight()
        }, b.prototype.remove = function(a) {
            delete this.waypoints[a.axis][a.key], this.checkEmpty()
        }, b.prototype.innerWidth = function() {
            return this.element == this.element.window ? e.viewportWidth() : this.adapter.innerWidth()
        }, b.prototype.destroy = function() {
            var a = [];
            for (var b in this.waypoints)
                for (var c in this.waypoints[b]) a.push(this.waypoints[b][c]);
            for (var d = 0, e = a.length; d < e; d++) a[d].destroy()
        }, b.prototype.refresh = function() {
            var a, b = this.element == this.element.window,
                c = b ? void 0 : this.adapter.offset(),
                d = {};
            this.handleScroll(), a = {
                horizontal: {
                    contextOffset: b ? 0 : c.left,
                    contextScroll: b ? 0 : this.oldScroll.x,
                    contextDimension: this.innerWidth(),
                    oldScroll: this.oldScroll.x,
                    forward: "right",
                    backward: "left",
                    offsetProp: "left"
                },
                vertical: {
                    contextOffset: b ? 0 : c.top,
                    contextScroll: b ? 0 : this.oldScroll.y,
                    contextDimension: this.innerHeight(),
                    oldScroll: this.oldScroll.y,
                    forward: "down",
                    backward: "up",
                    offsetProp: "top"
                }
            };
            for (var f in a) {
                var g = a[f];
                for (var h in this.waypoints[f]) {
                    var i, j, k, l, m, n = this.waypoints[f][h],
                        o = n.options.offset,
                        p = n.triggerPoint,
                        q = 0,
                        r = null == p;
                    n.element !== n.element.window && (q = n.adapter.offset()[g.offsetProp]), "function" == typeof o ? o = o.apply(n) : "string" == typeof o && (o = parseFloat(o), n.options.offset.indexOf("%") > -1 && (o = Math.ceil(g.contextDimension * o / 100))), i = g.contextScroll - g.contextOffset, n.triggerPoint = Math.floor(q + i - o), j = p < g.oldScroll, k = n.triggerPoint >= g.oldScroll, l = j && k, m = !j && !k, !r && l ? (n.queueTrigger(g.backward), d[n.group.id] = n.group) : !r && m ? (n.queueTrigger(g.forward), d[n.group.id] = n.group) : r && g.oldScroll >= n.triggerPoint && (n.queueTrigger(g.forward), d[n.group.id] = n.group)
                }
            }
            return e.requestAnimationFrame(function() {
                for (var a in d) d[a].flushTriggers()
            }), this
        }, b.findOrCreateByElement = function(a) {
            return b.findByElement(a) || new b(a)
        }, b.refreshAll = function() {
            for (var a in d) d[a].refresh()
        }, b.findByElement = function(a) {
            return d[a.waypointContextKey]
        }, window.onload = function() {
            f && f(), b.refreshAll()
        }, e.requestAnimationFrame = function(b) {
            var c = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || a;
            c.call(window, b)
        }, e.Context = b
    }(),
    function() {
        "use strict";

        function a(a, b) {
            return a.triggerPoint - b.triggerPoint
        }

        function b(a, b) {
            return b.triggerPoint - a.triggerPoint
        }

        function c(a) {
            this.name = a.name, this.axis = a.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), d[this.axis][this.name] = this
        }
        var d = {
                vertical: {},
                horizontal: {}
            },
            e = window.Waypoint;
        c.prototype.add = function(a) {
            this.waypoints.push(a)
        }, c.prototype.clearTriggerQueues = function() {
            this.triggerQueues = {
                up: [],
                down: [],
                left: [],
                right: []
            }
        }, c.prototype.flushTriggers = function() {
            for (var c in this.triggerQueues) {
                var d = this.triggerQueues[c],
                    e = "up" === c || "left" === c;
                d.sort(e ? b : a);
                for (var f = 0, g = d.length; f < g; f += 1) {
                    var h = d[f];
                    (h.options.continuous || f === d.length - 1) && h.trigger([c])
                }
            }
            this.clearTriggerQueues()
        }, c.prototype.next = function(b) {
            this.waypoints.sort(a);
            var c = e.Adapter.inArray(b, this.waypoints),
                d = c === this.waypoints.length - 1;
            return d ? null : this.waypoints[c + 1]
        }, c.prototype.previous = function(b) {
            this.waypoints.sort(a);
            var c = e.Adapter.inArray(b, this.waypoints);
            return c ? this.waypoints[c - 1] : null
        }, c.prototype.queueTrigger = function(a, b) {
            this.triggerQueues[b].push(a)
        }, c.prototype.remove = function(a) {
            var b = e.Adapter.inArray(a, this.waypoints);
            b > -1 && this.waypoints.splice(b, 1)
        }, c.prototype.first = function() {
            return this.waypoints[0]
        }, c.prototype.last = function() {
            return this.waypoints[this.waypoints.length - 1]
        }, c.findOrCreate = function(a) {
            return d[a.axis][a.name] || new c(a)
        }, e.Group = c
    }(),
    function() {
        "use strict";

        function a(a) {
            this.$element = b(a)
        }
        var b = window.jQuery,
            c = window.Waypoint;
        b.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(b, c) {
            a.prototype[c] = function() {
                var a = Array.prototype.slice.call(arguments);
                return this.$element[c].apply(this.$element, a)
            }
        }), b.each(["extend", "inArray", "isEmptyObject"], function(c, d) {
            a[d] = b[d]
        }), c.adapters.push({
            name: "jquery",
            Adapter: a
        }), c.Adapter = a
    }(),
    function() {
        "use strict";

        function a(a) {
            return function() {
                var c = [],
                    d = arguments[0];
                return a.isFunction(arguments[0]) && (d = a.extend({}, arguments[1]), d.handler = arguments[0]), this.each(function() {
                    var e = a.extend({}, d, {
                        element: this
                    });
                    "string" == typeof e.context && (e.context = a(this).closest(e.context)[0]), c.push(new b(e))
                }), c
            }
        }
        var b = window.Waypoint;
        window.jQuery && (window.jQuery.fn.waypoint = a(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = a(window.Zepto))
    }(),
    function(a, b) {
        "function" == typeof define && define.amd ? define([], b) : "object" == typeof module && module.exports ? module.exports = b() : a.Rellax = b()
    }(this, function() {
        var a = function(b, c) {
            "use strict";
            var d = Object.create(a.prototype),
                e = 0,
                f = 0,
                g = [],
                h = !1,
                i = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(a) {
                    setTimeout(a, 1e3 / 60)
                },
                j = function(a, b, c) {
                    return a <= b ? b : a >= c ? c : a
                };
            if (d.options = {
                    speed: -2,
                    center: !1
                }, c && Object.keys(c).forEach(function(a) {
                    d.options[a] = c[a]
                }), d.options.speed = j(d.options.speed, -10, 10), b || (b = ".rellax"), document.getElementsByClassName(b.replace(".", ""))) d.elems = document.getElementsByClassName(b.replace(".", ""));
            else {
                if (document.querySelector(b) === !1) throw new Error("The elements you're trying to select don't exist.");
                d.elems = document.querySelector(b)
            }
            var k = function() {
                    f = window.innerHeight, m();
                    for (var a = 0; a < d.elems.length; a++) {
                        var b = l(d.elems[a]);
                        g.push(b)
                    }
                    window.addEventListener("resize", function() {
                        p()
                    }), o(), p()
                },
                l = function(a) {
                    var b = a.getAttribute("data-rellax-percentage"),
                        c = a.getAttribute("data-rellax-speed"),
                        e = b || d.options.center ? document.body.scrollTop : 0,
                        g = e + a.getBoundingClientRect().top,
                        h = a.clientHeight || a.offsetHeight || a.scrollHeight,
                        i = b ? b : (e - g + f) / (h + f);
                    d.options.center && (i = .5);
                    var k = c ? j(c, -10, 10) : d.options.speed;
                    (b || d.options.center) && (k = j(c || d.options.speed, -5, 5));
                    var l = n(i, k),
                        m = a.style.cssText,
                        o = "";
                    if (m.indexOf("transform") >= 0) {
                        var p = m.indexOf("transform"),
                            q = m.slice(p),
                            r = q.indexOf(";");
                        o = r ? " " + q.slice(11, r).replace(/\s/g, "") : " " + q.slice(11).replace(/\s/g, "")
                    }
                    return {
                        base: l,
                        top: g,
                        height: h,
                        speed: k,
                        style: m,
                        transform: o
                    }
                },
                m = function() {
                    var a = e;
                    return e = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop, a != e
                },
                n = function(a, b) {
                    var c = b * (100 * (1 - a));
                    return Math.round(c)
                },
                o = function() {
                    m() && h === !1 && p(), i(o)
                },
                p = function() {
                    for (var a = 0; a < d.elems.length; a++) {
                        var b = (e - g[a].top + f) / (g[a].height + f),
                            c = n(b, g[a].speed) - g[a].base,
                            h = " translate3d(0," + c + "px,0)" + g[a].transform;
                        d.elems[a].style.cssText = g[a].style + "-webkit-transform:" + h + ";-moz-transform:" + h + ";transform:" + h + ";"
                    }
                };
            return d.destroy = function() {
                for (var a = 0; a < d.elems.length; a++) d.elems[a].style.cssText = g[a].style;
                h = !0
            }, k(), d
        };
        return a
    }),
    function() {
        "use strict";
        var a = self.HTMLInputElement && "valueLow" in HTMLInputElement.prototype,
            b = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
        self.multirange = function(c) {
            function d() {
                $(h).trigger("rangeInputChange", {
                    low: c.valueLow,
                    high: c.valueHigh
                }), h.style.setProperty("--low", 100 * ((c.valueLow - f) / (g - f)) + 1 + "%"), h.style.setProperty("--high", 100 * ((c.valueHigh - f) / (g - f)) + "%")
            }
            if (!a && !c.classList.contains("multirange")) {
                var e = c.getAttribute("value").split(","),
                    f = +c.min || 0,
                    g = +c.max || 100,
                    h = c.cloneNode();
                c.classList.add("multirange", "original"), h.classList.add("multirange", "ghost"), c.value = e[0] || f + (g - f) / 2, h.value = e[1] || f + (g - f) / 2, c.parentNode.insertBefore(h, c.nextSibling), Object.defineProperty(c, "originalValue", b.get ? b : {
                    get: function() {
                        return this.value
                    },
                    set: function(a) {
                        this.value = a
                    }
                }), Object.defineProperties(c, {
                    valueLow: {
                        get: function() {
                            return Math.min(this.originalValue, h.value)
                        },
                        set: function(a) {
                            this.originalValue = a
                        },
                        enumerable: !0
                    },
                    valueHigh: {
                        get: function() {
                            return Math.max(this.originalValue, h.value)
                        },
                        set: function(a) {
                            h.value = a
                        },
                        enumerable: !0
                    }
                }), b.get && Object.defineProperty(c, "value", {
                    get: function() {
                        return this.valueLow + "," + this.valueHigh
                    },
                    set: function(a) {
                        var b = a.split(",");
                        this.valueLow = b[0], this.valueHigh = b[1]
                    },
                    enumerable: !0
                }), c.addEventListener("input", d), h.addEventListener("input", d), d()
            }
        }, multirange.init = function() {
            Array.from(document.querySelectorAll("input[type=range][multiple]:not(.multirange)")).forEach(multirange)
        }, "loading" == document.readyState ? document.addEventListener("DOMContentLoaded", multirange.init) : multirange.init()
    }();
var menu = {
    menuBut: document.getElementById("menu-mobile-toggle"),
    menuUl: document.getElementsByClassName("main-menu-ul"),
    nav: document.querySelectorAll("nav.main-menu"),
    heroTall: $("header.hero-tall"),
    heroSmall: $("header.hero-small"),
    sections: document.getElementsByTagName("section"),
    menu_line: document.querySelector(".main-menu-ul .main-menu-wrapper li.menu__line"),
    init: function() {
        this.menuBut = document.getElementById("menu-mobile-toggle"), this.menuUl = document.getElementsByClassName("main-menu-ul"), this.nav = document.querySelectorAll("nav.main-menu"), this.heroTall = $("header.hero-tall"), this.heroSmall = $("header.hero-small"), this.sections = document.getElementsByTagName("section"), this.menu_line = document.querySelector(".main-menu-ul .main-menu-wrapper li.menu__line"), this.mobileMenu(), this.heroMenu(), this.backgroundChange(), this.menuLine(), this.languageSelect()
    },
    mobileMenu: function() {
        var a = this;
        this.menuBut.addEventListener("click", function() {
            helper.toggleClass(this, "open"), helper.toggleClass(a.menuUl, "open")
        })
    },
    heroMenu: function() {
        if (this.heroTall.length) {
            var a = this;
            new Waypoint({
                element: $("main"),
                offset: "70%",
                handler: function(b) {
                    "down" == b ? helper.removeClass(a.nav, "menu-hidden") : helper.addClass(a.nav, "menu-hidden")
                }
            }), new Waypoint({
                element: $("main"),
                offset: "0%",
                handler: function(b) {
                    helper.removeClass(a.nav, "bg-dark"), helper.removeClass(a.nav, "bg-palegrey"), helper.removeClass(a.nav, "bg-white")
                }
            })
        }
        if (this.heroSmall.length) {
            var a = this;
            new Waypoint({
                element: $("main"),
                offset: "30%",
                handler: function(b) {
                    helper.removeClass(a.nav, "bg-dark"), helper.removeClass(a.nav, "bg-palegrey"), helper.removeClass(a.nav, "bg-white")
                }
            })
        }
    },

    menuLine: function() {
        var a = this,
            b = document.querySelectorAll(".main-menu-ul .main-menu-wrapper li.current-menu-item:not(.btn-item)"),
            c = document.querySelectorAll(".single-casestudies .main-menu-ul .main-menu-wrapper li.casestudies-item:not(.btn-item)"),
            d = document.querySelectorAll(".main-menu-ul .main-menu-wrapper li:not(.btn-item):not(.menu__line)"),
            e = document.querySelectorAll(".main-menu-ul .main-menu-wrapper li:not(.menu__line):not(.btn-item)");
        this.menuLineLoad();
        for (var f = e.length - 1; f >= 0; f--) {
            var g = e[f];
            g.addEventListener("mouseover", function(b, c) {
                for (var d = [].slice.call(this.parentNode.children).indexOf(this), f = this.clientWidth - parseFloat(helper.getStyle(this, "paddingLeft")) - parseFloat(helper.getStyle(this, "paddingRight")), g = 0, h = 0; h < d; h++) {
                    var i = e[h];
                    g += parseInt(i.offsetWidth) + parseInt(helper.getStyle(i, "marginLeft")) + parseInt(helper.getStyle(i, "marginRight"))
                }
                a.menu_line.style.width = f + "px", a.menu_line.style.transform = "translateX(" + g + "px)", setTimeout(function() {
                    helper.addClass(a.menu_line, "line-animation")
                }, 200)
            }), g.addEventListener("mouseout", function(f, g) {
                for (var h = [].slice.call(this.parentNode.children).indexOf(this), i = this.clientWidth - parseFloat(helper.getStyle(this, "paddingLeft")) - parseFloat(helper.getStyle(this, "paddingRight")), j = 0, k = 0; k < h; k++) {
                    var l = e[k];
                    j += parseInt(l.offsetWidth) + parseInt(helper.getStyle(l, "marginLeft")) + parseInt(helper.getStyle(l, "marginRight"))
                }
                if (a.menu_line.style.width = i + "px", a.menu_line.style.transform = "translateX(" + j + "px)", setTimeout(function() {
                        helper.addClass(a.menu_line, "line-animation")
                    }, 200), 0 !== b.length || 0 !== c.length)
                    for (var h, j = 0, i = 0, m = 0; m < d.length; m++) {
                        var n = d[m],
                            o = n.getElementsByTagName("a")[0],
                            p = helper.getStyle(o, "color"),
                            p = parseInt(p.replace(/[^\d.]/g, ""));
                        if (helper.hasClass(n, "current-menu-item") || 0 === b.length && helper.hasClass(n, "casestudies-item")) return h = m, i = n.clientWidth - parseFloat(helper.getStyle(n, "paddingLeft")) - parseFloat(helper.getStyle(n, "paddingRight")), a.menu_line.style.width = i + "px", a.menu_line.style.transform = "translateX(" + j + "px)", !1;
                        j += parseInt(n.offsetWidth) + parseInt(helper.getStyle(n, "marginLeft")) + parseInt(helper.getStyle(n, "marginRight"))
                    } else {
                        var q = a.menu_line.clientWidth - parseFloat(helper.getStyle(a.menu_line, "paddingLeft")) - parseFloat(helper.getStyle(a.menu_line, "paddingRight")),
                            r = q / 2,
                            s = parseInt(helper.getStyle(a.menu_line, "transform").split(",")[4]),
                            t = s + r;
                        a.menu_line.style.width = "0px", a.menu_line.style.transform = "translateX(" + t + "px)", setTimeout(function() {
                            helper.removeClass(a.menu_line, "line-animation")
                        }, 200)
                    }
            })
        }
    },
    menuLineLoad: function() {
        var a = this,
            b = document.querySelectorAll(".main-menu-ul .main-menu-wrapper li.current-menu-item:not(.btn-item)"),
            c = (document.querySelectorAll(".single-casestudies .main-menu-ul .main-menu-wrapper li.casestudies-item:not(.btn-item)"), document.querySelectorAll(".main-menu-ul .main-menu-wrapper li:not(.btn-item):not(.menu__line)"));
        if (b)
            for (var d, e = 0, f = 0, g = 0; g < c.length; g++) {
                var h = c[g],
                    i = h.querySelector("a"),
                    j = helper.getStyle(i, "color"),
                    j = parseInt(j.replace(/[^\d.]/g, ""));
                if (2554485 == j) return d = g, f = h.clientWidth - parseFloat(helper.getStyle(h, "paddingLeft")) - parseFloat(helper.getStyle(h, "paddingRight")), this.menu_line.style.width = f + "px", this.menu_line.style.transform = "translateX(" + e + "px)", setTimeout(function() {
                    helper.addClass(a.menu_line, "line-animation")
                }, 200), !0;
                e += parseInt(h.offsetWidth) + parseInt(helper.getStyle(h, "marginLeft")) + parseInt(helper.getStyle(h, "marginRight"))
            } else this.menu_line.style.width = "0px"
    }
};
$(function() {
    formHelper.setRadioButtons("nl-form-contact"), formHelper.setText(), casestudiesHelper.setHeight(), casestudiesHelper.fadeIn(), module.team.init(), module.video.init(), formHelper.setClassOnValue(), module.dribbble.init(), module.instagram.init(), helper.contentSwitch(), contentFade.init(), helper.anchorScroll(), helper.contentBoxHeight(), document.addEventListener("touchstart", function() {}, !0), startaproject.init(), $("#send-mail").on("click", function() {
        event.preventDefault(), formHelper.validate() && mail.sendMail()
    }), $(window).on("resize", function() {
        vp.setWidth(), helper.contentSwitch(), casestudiesHelper.setHeight(), helper.contentBoxHeight(), Waypoint.refreshAll()
    }), menu.init()
}), $(window).on("load", function() {
    helper.contentBoxHeight(), helper.bodymovin(), menu.menuLineLoad(), module.accordion.init();
    new Rellax(".rellax", {
        center: !0
    });
    $("img").on("lazybeforeunveil", function() {
        $(this).on("load", function() {
            Waypoint.refreshAll()
        })
    });
    var a = {
        exist: $("header.hero").length,
        height: $("header.hero").height(),
        hero: $("header.hero"),
        heroBackground: $("header.hero .hero-background"),
        heroWrapper: $("header.hero .hero-wrapper"),
        doOnScroll: function() {
            var a = $(window).scrollTop();
            this.exist && this.height > a && (this.heroBackground.css("transform", "translateY(" + a / 3 * -1 + "px) scale(" + (a / 2e3 + 1) + ")"), this.heroWrapper.css("transform", "translateY(" + a / 3 * -1 + "px)"), this.heroWrapper.css("opacity", 1 - a / 400))
        }
    };
    $(window).on("scroll", function() {
        a.doOnScroll()
    })
});
var vp = {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
        setWidth: function() {
            vp.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), vp.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        }
    },
    effects = {},
    helper = {};
helper.bodymovin = function() {
    $(".bodymovin").each(function() {
        var a, b = $(this).attr("data-json"),
            c = templateUrl + "/assets/js/bodymovin/" + b + ".json";
        a = bodymovin.loadAnimation({
            container: $(this)[0],
            renderer: "svg",
            loop: !1,
            autoplay: !1,
            path: c
        }), new Waypoint({
            element: $(this),
            offset: "90%",
            handler: function() {
                a.play(), this.destroy()
            }
        })
    })
}, helper.hasClass = function(a, b) {
    return new RegExp(" " + b + " ").test(" " + a.className + " ")
}, helper.addClass = function(a, b) {
    if (a) {
        "string" == typeof a ? a = document.querySelectorAll(a) : a.tagName && (a = [a]);
        for (var c = 0; c < a.length; c++) this.hasClass(a[c], b) || (a[c].className += " " + b)
    }
}, helper.removeClass = function(a, b) {
    if (a) {
        "string" == typeof a ? a = document.querySelectorAll(a) : a.tagName && (a = [a]);
        for (var c = new RegExp("(^| )" + b + "($| )", "g"), d = 0; d < a.length; d++) a[d].className = a[d].className.replace(c, " ")
    }
}, helper.toggleClass = function(a, b) {
    if (a) {
        "string" == typeof a ? a = document.querySelectorAll(a) : a.tagName && (a = [a]);
        for (var c = 0; c < a.length; c++) {
            var d = " " + a[c].className.replace(/[\t\r\n]/g, " ") + " ";
            if (this.hasClass(a[c], b)) {
                for (; d.indexOf(" " + b + " ") >= 0;) d = d.replace(" " + b + " ", " ");
                a[c].className = d.replace(/^\s+|\s+$/g, "")
            } else a[c].className += " " + b
        }
    }
}, helper.getStyle = function(a, b) {
    return a.currentStyle ? a.currentStyle[b] : document.defaultView.getComputedStyle(a, null)[b]
}, effects.passpature = function() {
    var a = document.querySelectorAll("header.hero");
    a.length && (helper.addClass(a, "do-passpature"), helper.addClass("body", "do-passpature"))
}, helper.contentBoxHeight = function() {
    var a = document.querySelectorAll(".module-content-box > .container > .row > .col-md-6");
    if (a.length)
        if (helper.tabletViewportCheck() || helper.mobileViewportCheck())
            for (var b = 0; b < a.length; b++) a[b].style.height = "auto";
        else {
            for (var c = 0, b = 0; b < a.length; b++) {
                var d = a[b].offsetHeight;
                c < d && (c = d)
            }
            for (var b = 0; b < a.length; b++) a[b].style.height = c + "px"
        }
}, helper.numberWithCommas = function(a) {
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}, helper.urlParam = function(a) {
    for (var b = window.location.search.substring(1), c = b.split("&"), d = 0; d < c.length; d++) {
        var e = c[d].split("=");
        if (e[0] == a) return e[1]
    }
}, helper.arrayObjectIndexOf = function(a, b, c) {
    for (var d = 0, e = a.length; d < e; d++)
        if (a[d][c] === b) return d;
    return -1
}, helper.mobileViewportCheck = function() {
    return vp.width < 760
}, helper.tabletViewportCheck = function() {
    return vp.width > 760 && vp.width < 1200
}, helper.pageLoad = function() {
    window.addEventListener("load", function() {
        $("#pre-icon").fadeOut(600), setTimeout(function() {
            effects.passpature()
        }, 600)
    })
}, helper.pageLoad(), helper.contentSwitch = function() {
    helper.mobileViewportCheck() || helper.tabletViewportCheck() ? $(".js-switch-item").length && $(".js-switch-item:not('.js-switch-item-switched')").each(function() {
        $(".js-switch-item-source", this).insertAfter($(".js-switch-item-after", this)), $(this).addClass("js-switch-item-switched")
    }) : $(".js-switch-item-switched").length && $(".js-switch-item-switched").each(function() {
        $(".js-switch-item-after", this).insertAfter($(".js-switch-item-source", this)), $(this).removeClass("js-switch-item-switched")
    })
}, helper.anchorScroll = function() {
    $(".intro-text-nav-item li a").on("click", function(a) {
        a.preventDefault();
        var b = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(b).offset().top - 200
        }, 800)
    })
}, helper.isInViewport = function(a, b) {
    return window.scrollY + window.innerHeight - a > 0 && window.scrollY < a + b
}, helper.offsetTop = function(a) {
    var b = a.getBoundingClientRect().top;
    return b + $(window).scrollTop()
};
var contentFade = {};
contentFade.init = function() {
    $(".js-content-fade").waypoint(function() {
        helper.addClass(this.element, "animated"), this.destroy()
    }, {
        offset: "100%"
    })
};
var formHelper = {};
formHelper.setRadioButtons = function(a) {
    var b = $("#" + a).prev();
    $(b).on("nsFormClosed", function() {
        var c = $("input[type=radio][name=contact]:checked", b).val(),
            d = $(".nl-field-toggle", b).html();
        if (c != d) {
            $(".nl-field-toggle", b).html(c + " " + d);
            var e = $("input[type=radio][name=contact]:checked", b).attr("set-type");
            $(".nl-field-toggle", b).attr("type", e), $("input#" + a).attr("type", e)
        }
    }), $(b).on("change", function() {
        var c = $("input[type=radio][name=contact]:checked", b).val();
        $("li.nl-ti-input input", b).attr("placeholder", c);
        var d = $("input[type=radio][name=contact]:checked", b).attr("set-type");
        $("li.nl-ti-input input", b).attr("type", d), $("input#" + a).attr("type", d)
    })
}, formHelper.setText = function() {
    var a = $("#form-text-select"),
        b = $("#nl-form");
    $(a).on("nlFormDropDown", function() {
        var c = $("option:selected", a).val(),
            d = helper.arrayObjectIndexOf(formText, c, "id");
        $.each(formText[d], function(a, c) {
            $("#" + a, b).html(formText[d][a])
        })
    })
}, formHelper.setClassOnValue = function() {
    $("input").on("change", function() {
        "" == $(this).val() || $(this).hasClass("input-error") ? $(this).hasClass("input-set") && $(this).removeClass("input-set") : $(this).addClass("input-set")
    })
}, formHelper.validateEmail = function(a) {
    var b = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return b.test(a)
}, formHelper.validateTelephone = function(a) {
    var b = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
    return b.test(a)
}, formHelper.validate = function() {
    var a = !1;
    return $(".contact-teaser form input[type=text]").each(function(b) {
        var c = $(this).val();
        c || " " == c || (a = !0)
    }), $(".contact-teaser form input[type=email]").each(function(b) {
        var c = $(this).val();
        c && formHelper.validateEmail(c) || (a = !0)
    }), $(".contact-teaser form input[type=tel]").each(function(b) {
        var c = $(this).val();
        c && formHelper.validateTelephone(c) || (a = !0)
    }), !a || ($("#mail-return").empty(), $("#mail-return").append('<p class="failed">' + DOMFormError + "</p>"), !1)
};
var casestudiesHelper = {};
casestudiesHelper.setHeight = function() {
    $(".module-case-studies .case-studies-item.case-studies-js").each(function() {
        var a = $(this).width(),
            b = a;
        $(this).attr("data-factor") && "" !== $(this).attr("data-factor") && (b = a * $(this).attr("data-factor") + 30 * ($(this).attr("data-factor") - 1)), $(this).height(b + "px")
    })
}, casestudiesHelper.fadeIn = function() {
    $(".module-case-studies .case-studies-item:not(.case-studies-fullheight)").each(function() {
        new Waypoint({
            element: this,
            offset: "90%",
            handler: function(a) {
                $(this.element).addClass("case-studies-animate"), this.destroy()
            }
        })
    })
};
var module = {};
module.team = {}, module.team.init = function() {
    $(".module-team").length && $(".module-team .module-team-item:not(.default-item)").each(function(a, b) {
        var c = $(this),
            d = c.attr("data-item");
        c.on("click", function(a) {
            a.preventDefault();
            var b = c.outerWidth(!0),
                e = c.offset(),
                f = $(".module-team .module-team-details[data-item=" + d + "]");
            if ($(".module-team .module-team-item").removeClass("active"), $(".module-team .module-team-item").removeClass("module-team-item-inactive"), $(".module-team .module-team-item").each(function(a, b) {
                    $(this).attr("data-item") == d || $(this).hasClass("default-item") || $(this).addClass("module-team-item-inactive")
                }), $(".module-team .module-team-details-show").length) {
                if ($(".module-team .module-team-details-show").attr("data-item") == d) return $(".module-team .module-team-details-show").removeClass("module-team-details-show"), void $(".team-overlay").removeClass("visible");
                $(".module-team .module-team-details-show").removeClass("module-team-details-show")
            }
            $(".module-team .module-team-item").each(function(a, b) {
                $(this).attr("data-item") == d || $(this).hasClass("default-item") || $(this).addClass("module-team-item-inactive")
            }), c.addClass("active"), f.addClass("module-team-details-show"), $(".team-overlay").addClass("visible"), $(".team-overlay").on("click", function() {
                $(".module-team .module-team-details-show").removeClass("module-team-details-show"), $(".module-team .module-team-item").removeClass("module-team-item-inactive"), $(".module-team .module-team-item").removeClass("active"), $(".team-overlay").removeClass("visible")
            }), e.left > $(window).width() / 2 ? (d % 2 !== 0 ? itemDetailsLeft = 0 : itemDetailsLeft = b, f.css("left", itemDetailsLeft + "px")) : (d % 2 !== 0 ? itemDetailsLeft = b : itemDetailsLeft = 2 * b, f.css("left", itemDetailsLeft + "px"))
        }), c.hasClass("default-item") || c.hover(function() {
            $(this).removeClass("module-team-item-inactive"), $(".module-team .module-team-item").each(function(a, b) {
                $(this).attr("data-item") == d || $(this).hasClass("default-item") || $(this).hasClass("active") || $(this).addClass("module-team-item-inactive")
            })
        }, function() {
            $(".module-team .module-team-item.active").length < 1 ? $(".module-team .module-team-item").each(function(a, b) {
                $(this).attr("data-item") == d || $(this).hasClass("default-item") || $(this).hasClass("active") || $(this).removeClass("module-team-item-inactive")
            }) : $(".module-team .module-team-item:not(.active):not(.default-item)").each(function(a, b) {
                $(this).addClass("module-team-item-inactive")
            })
        })
    })
}, module.team.showItem = function() {}, module.accordion = {}, module.accordion.init = function() {
    if ($(".module-career-accordion").length)
        if ($(".module-career-accordion .accordion-item").each(function(a, b) {
                var c = $(this),
                    d = $(".accordion-item-content", c).height();
                $(".accordion-item-content", c).height(d + "px"), $(".accordion-item-headline", c).on("click", function() {
                    c.hasClass("accordion-item-closed") ? ($(".module-career-accordion .accordion-item").addClass("accordion-item-closed"), c.removeClass("accordion-item-closed"), setTimeout(function() {
                        $("html, body").animate({
                            scrollTop: c.offset().top - 150
                        }, 800)
                    }, 600)) : c.toggleClass("accordion-item-closed")
                })
            }), void 0 != helper.urlParam("offer") && "" != helper.urlParam("offer")) {
            var a = helper.urlParam("offer");
            $(".module-career-accordion .accordion-item:not(#" + a + ")").addClass("accordion-item-closed"), setTimeout(function() {
                $("html, body").animate({
                    scrollTop: $("#" + a).offset().top - 150
                }, 800)
            }, 600)
        } else $(".module-career-accordion .accordion-item:not(:first-child)").addClass("accordion-item-closed")
}, module.video = {}, module.video.init = function() {
    
}



(window, document);