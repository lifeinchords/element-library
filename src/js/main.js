"use strict"; 

$(document).ready(function () {
  console.log('ready');

  // setting up syntax highlighting for element documentation
  hljs.initHighlightingOnLoad();

  /* 
  // ****************** SETUP ********************
  // TODO: extract this out to sep init function
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

  */

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
  var $card = $('.element--one .card');

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
    console.log('morphEnter: timelineStart ...');

    // disableScrolling();

    // open gate to let sound through
    window.drySineToneSynth.set({
      "tone1.mul.gate": 1
    });

    // window.coldFuzzySynth.set({
    //   "pinkNoise.mul.gate": 1,
    //   "tone1.mul.gate": 1,
    //   "tone2.mul.gate": 1,
    //   "tone2-1.mul.gate": 1,
    //   "tone3.mul.gate": 1,
    //   "tone3-1.mul.gate": 1,
    //   "tone4.mul.gate": 1,
    //   "tone5.mul.gate": 1,
    //   "tone6.mul.gate": 1
    // });

    // OQ: if I enable all the gates in each voice in the synthdef, and use this
    // to open the gate on the *instrument (the sum)
    // why doesnt it work?
    // window.coldFuzzySynth.set({
    //   "instrument.gate": 1
    // });

    isAnimating = true;
  };

  var timelineUpdate = function () {
    // console.log('morphUpdate: timelineUpdate: ',  $(this).css.height );

    // TODO: map from 20hz to 20k hz, since progress outputs values between 0 and 1
    var newFreq = ($(".card").height() + 400);
    console.log(newFreq);

    window.drySineToneSynth.set("tone1.freq", newFreq);   // update the freq in this frame
   
    // window.coldFuzzySynth.set({
    //   "pinkNoise.mul.gate": 1,
    //   "tone1.freq": newFreq,
    //   "tone2.freq": newFreq,
    //   "tone2-1.freq": newFreq,
    //   "tone3.freq": newFreq,
    //   "tone3-1.freq": newFreq,
    //   "tone4.freq": newFreq,
    //   "tone5.freq": newFreq,
    //   "tone6.freq": newFreq
    // });

    isAnimating = true;
  };


  var timelineDone = function () {
    console.log('morphExit: timelineDone ...');

    // closing the gate, shuts off sound
    window.drySineToneSynth.set({
      "tone1.mul.gate": 0
    });

    // closing the gate, shuts off sound
    // per voice
    window.coldFuzzySynth.set({
      "pinkNoise.mul.gate": 0,
      "tone1.mul.gate": 0,
      "tone2.mul.gate": 0,
      "tone2-1.mul.gate": 0,
      "tone3.mul.gate": 0,
      "tone3-1.mul.gate": 0,
      "tone4.mul.gate": 0,
      "tone5.mul.gate": 0,
      "tone6.mul.gate": 0
    });

    // enableScrolling();
    isAnimating = false;
    // injectEmbeds();
    // $('.placeholder').remove();
  };

  var timeline = new TimelineMax({
    onStart: timelineStart,
    onComplete: timelineDone,
    onUpdate: timelineUpdate,
    // onUpdateParams: [ $card ],
    paused: true,
    force3D: true
  });
      
  var cardHeightPx = 400;
  var cardWidthPx = "100%";

  timeline

    // .set      ( $card, { autoAlpha: 1, opacity: 1 })

    // enter from top left -> bottom left -> wipe right 
    // .fromTo   ( $card, 0.2, { width: 2, height: 0 }, { width: 2, height: cardHeightPx, ease: Power4.easeOut }  ) 
    // .fromTo   ( $card, 0.3, { width: 2, height: cardHeightPx }, { width: cardWidthPx, height: cardHeightPx, ease: Power4.easeOut, immediateRender: false }, "+=0.15" ) 

    .fromTo   ( 
      $card, 
      0.2, 
      { width: 2, height: 0, y: cardHeightPx/2 }, 
      { width: cardWidthPx, height: 2, ease: Power4.easeOut },
      "left-to-right"
    ) 
    
    .fromTo   ( 
      $card, 0.20, 
      { width: cardWidthPx, height: 2, y: cardHeightPx/2, scale: 1 }, 
      { width: cardWidthPx, height: cardHeightPx, ease: Power4.easeOut, y: 0, immediateRender: false, scale: 1.02 }, 
      "+=0.4", // position 
      "top-to-bottom"
    ) 

    .to       ( $card, 0.20, { scale: 1, ease: Circ.easeInOut  }, "+=0.25", "settle-in" ) 

    // enter to top + bottom edges. Alternate 1: with extra beat
    // .fromTo   ( $card, 0.2, { width: cardWidthPx, height: 2, y: cardHeightPx/2 }, { width: cardWidthPx, height: cardHeightPx, ease: Power4.easeOut, y: 0, immediateRender: false }, "+=0.4" ) 
    // .to       ( $card, 0.2, { scale: 0.99, ease: Power4.easeIn  }, "+=0.05" ) 
    // .to       ( $card, 0.1, { scale: 1.02, ease: Power4.easeIn  }, "+=0.25" ) 
    // .to       ( $card, 0.2, { scale: 1, ease: Circ.easeOut  }, "+=0.15" ) 

    // enter to top + bottom edges. Alternate 2: using Back. More fluid, but less control.
    // .fromTo   ( $card, 0.2, { width: cardWidthPx, height: 2, y: cardHeightPx/2 }, { width: cardWidthPx, height: cardHeightPx, ease: Power4.easeOut, y: 0, immediateRender: false }, "+=0.4" ) 
    // .to        ( $card, 0.6, { scale: 1.1, ease: Back.easeOut.config(1.3)  }, "-=0.3" ) // delay it backwards by half the duration 

    .to       ( ".element--one .card__image", 0.3, { opacity: 1, ease: Power2.easeInOut }, "-=0.15"  ) 
    .to       ( ".element--one .card__title", 0.3, { opacity: 1, ease: Power0.easeNone }, "+=0.10"  ) 

    // .call     ( scrollTop  )

    // .call     ( showAndWireCloseProject )

    // run together
    // .to       ( $card, 0.2, { height: 0 }) 
    // .to       ( $card, 0.18, { height: 0 }, "=-0.2") 
    // .fromTo   ( $projectContent.find('.content__title'), 0.18,{ opacity: 0, scaleY: 0.4 }, { opacity: 1, scaleY: 1, transformOrigin: "0 100%" } , "=+0.05" ) 
    // .fromTo   ( $projectContent.find('.meta__date'), 0.18,{ opacity: 0, scaleY: 0.4 }, { opacity: 1, scaleY: 1, transformOrigin: "0 100%" }, "=-0.18")

    // .play     ()

  $('.element--one .button--enter').on('click', function(){

    timeline.timeScale( 1.5 );
    timeline.play();
  })

  $('.element--one .button--exit').on('click', function(){

    timeline.timeScale( 2 );
    timeline.reverse();
  })

  $('.button--panic').on("click", function(){
    window.enviro.stop();
  });

  // off-canvas menu adapted from: http://codepen.io/oknoblich/pen/klnjw
  $('.button--menu').on('click', function() {
    $('.content').toggleClass('is-enter');
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













