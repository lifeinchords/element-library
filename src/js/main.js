"use strict"; 

$(document).ready(function () {


  console.log('ready');

  // ****************** SETUP ********************
  Response.create({
    // "width" "device-width" "height" "device-height" or "device-pixel-ratio"
    prop: "width",

     // the prefix(es) for your data attributes (aliases are optional)
    // prefix: "min-width- r src",
    prefix: "min-width-",

    // min breakpoints. Needs to match what's in mq.css
    // $sm: (width >= 0rem);
    // $md: (width >= 20rem);
    // $lg: (width >= 60rem);
    // $xl: (width >= 90rem);

    // in pixels. Multiply rems x 16(base font size in px)
    breakpoints: [1, 576, 960, 1440],

    // optional param - data attr contents lazyload rather than whole page at once
    lazy: true 
  });

  Response.crossover('width', function() {
    console.log("switching bpoints")
  })


  // ****************** UTILS ********************
  // Adapted from Make Parallels:
  // https://github.com/parallelsio/core-modules/blob/3f42c79fced7a52258a982f1a9d78ccf4f422eea/meteor-app/lib/utilities.js

  // Usually, we'd just use jQuery's .position method.
  // In situations where the element is display:none, we can use the transform 
  // property, if it's set, to get the position 
  function getTransformedPosition(element){
    var cssTransform = element.style["transform"] || element.style["webkitTransform"];
    var pattern = /[,();]|(px)|(em)|(rem)|(translate)|(matrix)|(3d)/gi;

    // slice + dice the string with a regexp to remove everything except
    // for number values. Split the string into an array.
    var array = _.words(cssTransform.replace(pattern, ''));

    return { 
      top: array[0],
      left: array[1]
    };
  };

  // card functions
  // var timeline = new TimelineMax();
  var $card = $('.card--one');

  // var rectangle = verge.rectangle($card);

  // create and move placeholder white box into position, to where grid thumbnail currently sits
  // var $placeholder = $('<div>')
  //   .addClass('placeholder')
  //   .prependTo(".page__home");

  // var fromVars = {
  //   width: rectangle.width,
  //   height: rectangle.height,
  //   x: rectangle.left,
  //   y: rectangle.top + verge.scrollY(),
  // };

  // var toVars = {
  //   ease: Power4.easeOut,
  //   x: 0,
  //   y: 0,

  //   width: verge.viewportW(),

  //   // http://ryanve.com/lab/dimensions/
  //   height: Math.max(
  //                 document.documentElement.clientHeight, 
  //                 document.documentElement.offsetHeight, 
  //                 document.documentElement.scrollHeight 
  //               )
  // };

  var isAnimating;

  var timelineStart = function () {
    // console.log('morphOpen: timelineStart ...');
    // disableScrolling();
    isAnimating = true;
  };

  var timelineDone = function () {
    // console.log('morphOpen: timelineDone ...');
    // enableScrolling();
    isAnimating = false;
    // injectEmbeds();
    // $('.placeholder').remove();

  };

  var timeline = new TimelineMax({
    onStart: timelineStart,
    onComplete: timelineDone,
    paused: true,
    force3D: true
  });
  

  timeline

    // .set      ( $card, { autoAlpha: 1, opacity: 1 })
    .fromTo   ( $card, 0.2, { width: 2, height: 0 }, { width: 2, height: 400, ease: Power4.easeOut }  ) 
    .fromTo   ( $card, 0.3, { width: 2, height: 400 }, { width: 500, height: 400, ease: Power4.easeOut, immediateRender: false }, "+=0.15" ) 
    .to       ( $card, 1, { scale: 1.1, ease: Circ.easeInOut  }, "-=0.5" ) 
    .to       ( ".card--one .card__image", 0.3, { opacity: 1, ease: Power4.easeOut }, "-=0.5"  ) 
    .to       ( ".card--one .card__title", 0.3, { opacity: 1, ease: Power0.easeNone }, "-=0.3"  ) 

    // .call     ( scrollTop  )

    // .call     ( showAndWireCloseProject )

    // run together
    // .to       ( $card, 0.2, { height: 0 }) 
    // .to       ( $card, 0.18, { height: 0 }, "=-0.2") 
    // .fromTo   ( $projectContent.find('.content__title'), 0.18,{ opacity: 0, scaleY: 0.4 }, { opacity: 1, scaleY: 1, transformOrigin: "0 100%" } , "=+0.05" ) 
    // .fromTo   ( $projectContent.find('.meta__date'), 0.18,{ opacity: 0, scaleY: 0.4 }, { opacity: 1, scaleY: 1, transformOrigin: "0 100%" }, "=-0.18")

    // .play     ()

  $('.card__button--open').on('click', function(){
    timeline.play();
  })

  $('.card__button--close').on('click', function(){
    timeline.reverse();
  })


  // off-canvas menu adapted from: http://codepen.io/oknoblich/pen/klnjw
  $('.button').on('click', function() {
    $('.content').toggleClass('isOpen');
  });

  function showAndWireCloseProject (){

    // $( closeCtrl ).show();

    // closeCtrl.addEventListener('click', function() {
      
    //   // hideContent();
    //   var params = {
    //     pageType: "home",
    //     projectName: "/"
    //   }

    //   setHistoryState(params);
    // });

    // // keyboard esc - hide content
    // document.addEventListener('keydown', function(ev) {
    //   if(!isAnimating && current !== -1) {
    //     var keyCode = ev.keyCode || ev.which;
       
    //     if( keyCode === 27 ) {
    //       ev.preventDefault();
    //       if ("activeElement" in document)
    //         document.activeElement.blur();

    //         // hideContent();
    //         var params = {
    //           pageType: "home", 
    //           projectName: "/"
    //         }

    //         setHistoryState(params);
    //     }
    //   }
    // });

  };



});


// from : http://greensock.com/forums/topic/7952-javascript-custom-ease/page-2#entry51357
var CubicBezier = (function () {
    function CubicBezier(p1x, p1y, p2x, p2y) {
        if (p1x === void 0) { p1x = 0; }
        if (p1y === void 0) { p1y = 0; }
        if (p2x === void 0) { p2x = 1; }
        if (p2y === void 0) { p2y = 1; }
        this.p1x = p1x;
        this.p1y = p1y;
        this.p2x = p2x;
        this.p2y = p2y;
        this.cx = 3.0 * this.p1x;
        this.cy = 3.0 * this.p1y;
        this.bx = 3.0 * (this.p2x - this.p1x) - this.cx;
        this.by = 3.0 * (this.p2y - this.p1y) - this.cy;
        this.ax = 1.0 - this.cx - this.bx;
        this.ay = 1.0 - this.cy - this.by;
        this.ease = this.ease.bind(this);
    }
    CubicBezier.create = function (name, p1x, p1y, p2x, p2y) {
        if (p1x === void 0) { p1x = 0; }
        if (p1y === void 0) { p1y = 0; }
        if (p2x === void 0) { p2x = 1; }
        if (p2y === void 0) { p2y = 1; }
        var easing = new CubicBezier(p1x, p1y, p2x, p2y);
        if (typeof name === "string")
            CubicBezier.easings[name] = easing;
        return easing.ease;
    };
    CubicBezier.config = function (p1x, p1y, p2x, p2y) {
        if (p1x === void 0) { p1x = 0; }
        if (p1y === void 0) { p1y = 0; }
        if (p2x === void 0) { p2x = 1; }
        if (p2y === void 0) { p2y = 1; }
        return new CubicBezier(p1x, p1y, p2x, p2y).ease;
    };
    CubicBezier.get = function (name) {
        return CubicBezier.easings[name].ease;
    };
    CubicBezier.prototype.getEpsilon = function (duration) {
        if (duration === void 0) { duration = 400; }
        return 1 / (200 * duration);
    };
    CubicBezier.prototype.ease = function (time, start, change, duration) {
        return this.solve(time, this.getEpsilon(duration));
    };
    CubicBezier.prototype.solve = function (x, epsilon) {
        return this.sampleCurveY(this.solveCurveX(x, epsilon));
    };
    CubicBezier.prototype.sampleCurveX = function (t) {
        return ((this.ax * t + this.bx) * t + this.cx) * t;
    };
    CubicBezier.prototype.sampleCurveY = function (t) {
        return ((this.ay * t + this.by) * t + this.cy) * t;
    };
    CubicBezier.prototype.sampleDerivX = function (t) {
        return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
    };
    CubicBezier.prototype.solveCurveX = function (x, epsilon) {
        var t0;
        var t1;
        var t2;
        var x2;
        var d2;
        for (var i = 0, t2 = x; i < 8; i++) {
            x2 = this.sampleCurveX(t2) - x;
            if (Math.abs(x2) < epsilon)
                return t2;
            d2 = this.sampleDerivX(t2);
            if (Math.abs(d2) < epsilon)
                break;
            t2 = t2 - x2 / d2;
        }
        t0 = 0.0;
        t1 = 1.0;
        t2 = x;
        if (t2 < t0)
            return t0;
        if (t2 > t1)
            return t1;
        while (t0 < t1) {
            x2 = this.sampleCurveX(t2);
            if (Math.abs(x2 - x) < epsilon)
                return t2;
            if (x > x2)
                t0 = t2;
            else
                t1 = t2;
            t2 = (t1 - t0) * 0.5 + t0;
        }
        return t2;
    };
    CubicBezier.easings = {};
    return CubicBezier;
})();
