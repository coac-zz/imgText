//lazyload
!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.LazyLoad=b()}(window,function(){const a=!("onscroll"in window)||/glebot/.test(navigator.userAgent),b=function(a){return a.getBoundingClientRect().top+window.pageYOffset-a.ownerDocument.documentElement.clientTop},c=function(a,c,d){return(c===window?window.innerHeight+window.pageYOffset:b(c)+c.offsetHeight)<=b(a)-d},d=function(a){return a.getBoundingClientRect().left+window.pageXOffset-a.ownerDocument.documentElement.clientLeft},e=function(a,b,c){const e=window.innerWidth;return(b===window?e+window.pageXOffset:d(b)+e)<=d(a)-c},f=function(a,c,d){return(c===window?window.pageYOffset:b(c))>=b(a)+d+a.offsetHeight},g=function(a,b,c){return(b===window?window.pageXOffset:d(b))>=d(a)+c+a.offsetWidth},h=function(a,b,d){return!(c(a,b,d)||f(a,b,d)||e(a,b,d)||g(a,b,d))},i=function(a,b){a&&a(b)},j={elements_selector:"img",container:window,threshold:300,throttle:150,data_src:"original",data_srcset:"original-set",class_loading:"loading",class_loaded:"loaded",class_error:"error",skip_invisible:!0,callback_load:null,callback_error:null,callback_set:null,callback_processed:null};class k{constructor(a){this._settings=Object.assign({},j,a),this._queryOriginNode=this._settings.container===window?document:this._settings.container,this._previousLoopTime=0,this._loopTimeout=null,this._boundHandleScroll=this.handleScroll.bind(this),window.addEventListener("resize",this._boundHandleScroll),this.update()}_setSourcesForPicture(a,b){const c=a.parentElement;if("PICTURE"===c.tagName)for(let a=0;a<c.children.length;a++){let d=c.children[a];if("SOURCE"===d.tagName){let a=d.getAttribute("data-"+b);a&&d.setAttribute("srcset",a)}}}_setSources(a,b,c){const d=a.tagName,e=a.getAttribute("data-"+c);if("IMG"===d){this._setSourcesForPicture(a,b);const c=a.getAttribute("data-"+b);return c&&a.setAttribute("srcset",c),void(e&&a.setAttribute("src",e))}if("IFRAME"===d)return void(e&&a.setAttribute("src",e));e&&(a.style.backgroundImage="url("+e+")")}_showOnAppear(a){const b=this._settings,c=function(){b&&(a.removeEventListener("load",d),a.removeEventListener("error",c),a.classList.remove(b.class_loading),a.classList.add(b.class_error),i(b.callback_error,a))},d=function(){b&&(a.classList.remove(b.class_loading),a.classList.add(b.class_loaded),a.removeEventListener("load",d),a.removeEventListener("error",c),i(b.callback_load,a))};"IMG"!==a.tagName&&"IFRAME"!==a.tagName||(a.addEventListener("load",d),a.addEventListener("error",c),a.classList.add(b.class_loading)),this._setSources(a,b.data_srcset,b.data_src),i(b.callback_set,a)}_loopThroughElements(){const b=this._settings,c=this._elements,d=c?c.length:0;let e,f=[];for(e=0;e<d;e++){let d=c[e];b.skip_invisible&&null===d.offsetParent||(a||h(d,b.container,b.threshold))&&(this._showOnAppear(d),f.push(e),d.wasProcessed=!0)}for(;f.length>0;)c.splice(f.pop(),1),i(b.callback_processed,c.length);0===d&&this._stopScrollHandler()}_purgeElements(){const a=this._elements,b=a.length;let c,d=[];for(c=0;c<b;c++){let b=a[c];b.wasProcessed&&d.push(c)}for(;d.length>0;)a.splice(d.pop(),1)}_startScrollHandler(){this._isHandlingScroll||(this._isHandlingScroll=!0,this._settings.container.addEventListener("scroll",this._boundHandleScroll))}_stopScrollHandler(){this._isHandlingScroll&&(this._isHandlingScroll=!1,this._settings.container.removeEventListener("scroll",this._boundHandleScroll))}handleScroll(){const a=this._settings.throttle;if(0!==a){const b=()=>{(new Date).getTime()};let c=b(),d=a-(c-this._previousLoopTime);d<=0||d>a?(this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._previousLoopTime=c,this._loopThroughElements()):this._loopTimeout||(this._loopTimeout=setTimeout(function(){this._previousLoopTime=b(),this._loopTimeout=null,this._loopThroughElements()}.bind(this),d))}else this._loopThroughElements()}update(){this._elements=Array.prototype.slice.call(this._queryOriginNode.querySelectorAll(this._settings.elements_selector)),this._purgeElements(),this._loopThroughElements(),this._startScrollHandler()}destroy(){window.removeEventListener("resize",this._boundHandleScroll),this._loopTimeout&&(clearTimeout(this._loopTimeout),this._loopTimeout=null),this._stopScrollHandler(),this._elements=null,this._queryOriginNode=null,this._settings=null}}return k});

//dragmove
// Plugin: jQuery.dragmove
// Source: github.com/nathco/jQuery.dragmove
// Author: Nathan Rutzky
// Update: 1.0
(function ($) {

    $.fn.dragmove = function (options) {
        //defaults setting
        var defaults = {
            onStart: null,
            onMove: null,
            onEnd: null
        };
        var opts = $.extend(defaults, options);

        return this.each(function () {
            var $this = $(this);
            var isActive = false;
            var startX = 0;
            var startY = 0;
            var left = 0;
            var top = 0;
            this.resetPos = function() {
                startX = 0;
                startY = 0;
                left = 0;
                top = 0;
            }
            $this.on('mousedown touchstart', function (e) {
                var event = e.type == 'touchstart' ? e.originalEvent.targetTouches[0] : e.originalEvent;
                isActive = true;
                //console.log(getMatrix($this, 4), getMatrix($this, 5));
                startX = left - event.pageX;
                startY = top - event.pageY;
                // var offset = $this.offset();
                // startX = event.pageX - offset.left;
                // startY = event.pageY - offset.top;
                if (typeof opts.onStart === 'function') {
                    opts.onStart(e);
                }
            })
            .on('mousemove touchmove', function (e) {
                var event = e.type == 'touchmove' ? e.originalEvent.targetTouches[0] : e.originalEvent;
                if (isActive) {
                    var _top = event.pageY + startY;
                    var _left = event.pageX + startX;
                    top = _top;
                    left = _left;
                    $this[0].style.webkitTransform = $this[0].style.transform = 'translate3d(' + _left + 'px,' + _top + 'px,0)';
                    // $this.offset({
                    //     left: event.pageX - startX,
                    //     top: event.pageY - startY
                    // });
                    if (typeof opts.onMove === 'function') {
                        opts.onMove(e);
                    }
                }
            }).on('mouseup touchend', function (e) {
                isActive = false;
                if (typeof opts.onEnd === 'function') {
                    opts.onEnd(e);
                }
            });
        });
    };
})(jQuery);

