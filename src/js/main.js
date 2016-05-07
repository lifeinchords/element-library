"use strict"; 

$(document).ready(function () {
  // console.log('ready');

  // disable sound during debugging
  window.enviro.stop();


  // play a pd patch, via web-pd
  // var patch
  //       $.get('pd/farnell--lazer1.pd', function(patchStr) {
  //         patch = Pd.loadPatch(patchStr)
  //         Pd.start()
  //       });


  // setting up syntax highlighting for element documentation
  // hljs.initHighlightingOnLoad();

  window.scrollTo(0, 0);

  // TODO: make init function
  $('.button--panic').on("click", function(){
    window.enviro.stop();
  });

  // off-canvas menu adapted from: http://codepen.io/oknoblich/pen/klnjw
  $('.button--menu').on('click', function() {
    $('.content').toggleClass('is-enter');
  });

  //////////////////////////////// 
  // Set up reusable card callbacks

  window.cards = [];

  var timelineStart = function () {
    console.log('morphEnter: timelineStart ...');

    // open gate to let sound through
    // window.drySineToneSynth.set({
    //   "tone1.mul.gate": 1
    // });

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

  };

  var timelineUpdate = function ($element) {
    console.log('morphUpdate: timelineUpdate: ',  $(this).css.height );
    console.log('element: ',  $element );

    // TODO: map from 20hz to 20k hz, since progress outputs values between 0 and 1
    var newFreq = ($element.height() + 400);
    console.log(newFreq);

    window.drySineToneSynth.set("tone1.freq", newFreq);   // update the freq in this frame
   
    window.coldFuzzySynth.set({
      "pinkNoise.mul.gate": 1,
      "tone1.freq": newFreq,
      "tone2.freq": newFreq,
      "tone2-1.freq": newFreq,
      "tone3.freq": newFreq,
      "tone3-1.freq": newFreq,
      "tone4.freq": newFreq,
      "tone5.freq": newFreq,
      "tone6.freq": newFreq
    });
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
  };

  // ONE
  cards[0] = {};
  cards[0].$element = $('.element--one .card');
  cards[0].height = "60vh";
  cards[0].width = "100%";

  cards[0].timeline = new TimelineMax({
    onStart: timelineStart,
    onComplete: timelineDone,
    onUpdate: timelineUpdate,
    onUpdateParams: [ cards[0].$element ],
    paused: true,
    force3D: true
  });
      
  cards[0].timeline

    .fromTo   ( 
      cards[0].$element, 
      0.2, 
      { width: 2, height: 0, y: cards[0].height / 2 },  // from
      { width: cards[0].width, height: "0.25vh", ease: Power4.easeOut }, // to
      "left-to-right" // label
    ) 
    
    .fromTo   ( 
      cards[0].$element, 0.20, 
      { width: cards[0].width, height: 2, y: cards[0].height / 2, scale: 1 }, 
      { width: cards[0].width, height: cards[0].height, ease: Power4.easeOut, y: 0, immediateRender: false, scale: 1.02 }, 
      "+=0.4", // position 
      "top-to-bottom" // label
    ) 

    .to ( cards[0].$element, 0.20, { scale: 1, ease: Circ.easeInOut  }, "+=0.25", "settle-in" ) 
    .to ( cards[0].$element.find('.card__image'), 0.3, { opacity: 1, ease: Power2.easeInOut }, "-=0.15"  ) 
    .to ( cards[0].$element.find('.card__title'), 0.3, { opacity: 1, ease: Power0.easeNone }, "+=0.10"  ) 

  $('.element--one .button--enter').on('click', function(){
    cards[0].timeline.timeScale( 1.5 );
    cards[0].timeline.play();
  })

  $('.element--one .button--exit').on('click', function(){
    cards[0].timeline.timeScale( 2 );
    cards[0].timeline.reverse();
  })


  //////////////////////////////////////////////////
  // TWO
  cards[1] = {};
  cards[1].$element = $('.element--two .card');

  // TODO: better name. *Which timeline? ie, state 1
  cards[1].timeline = new TimelineMax({
    onStart: timelineStart,
    onComplete: timelineDone,
    onUpdate: timelineUpdate,
    onUpdateParams: [ cards[1].$element ],
    paused: true,
    force3D: true
  });
      

  cards[1].timeline

    .addLabel('stateOne')
    .fromTo ( 
      cards[1].$element, 
      0.25, 

      { 
        width: "85%", 
        height: "45vh",
        // height: "300px",
        x: 0
      },
      { 
        width: "95%", 
        height: "60vh", 
        // height: "400px",
        ease: Power2.easeOut
      }
    ) 


    // .to ( cards[1].$element.find('.card__image'), 0.15, { scale: 1.2, ease: Power4.easeNone }, "-=0.23"  ) 
    // .set ( cards[1], { backgroundColor: "lightGray" } ) 

    .addLabel('stateTwo')

    .to ( cards[1].$element.find('.card__title'), 0.20, { opacity: 1, ease: Power0.easeNone }, "+=0.10"  ) 
    
    .addLabel('stateThree')
    .to( 
        cards[1].$element, 
        0.2, 
        { 
          height: "+=10vh", 
          ease: Power4.easeOut
        }
    ) 

    .addLabel('stateFour')
    .to( 
        cards[1].$element, 
        0.1, 
        { 
          width: "+=10%", 
          height: "-=5vh", 
          ease: Power0.easeNone
        }
    ) 

    .addLabel('stateFive')
    .to( 
        cards[1].$element, 
        0.5, 
        { 
          height: "10%", 
          opacity: 0, 
          ease: Power2.easeInOut
        }
    )

    .addLabel('stateExit')

  //**********************************
  // debugging
  window.labels = cards[1].timeline.getLabelsArray();
  console.log('-----------');

  _.forEach(labels, function(value, key) {
    console.log(value);
  });
  
  console.log('total duration: ', cards[1].timeline.totalDuration());
  console.log('tweens: ', cards[1].timeline.getTweensOf());
  console.log('-----------');
  //**********************************

  $('.element--two .button--one').on('click', function(){
    console.log('playing 1');

    // cards[1].timeline.seek('one');
    // cards[1].timeline.tweenTo('two');
    // cards[1].timeline.play('one');
    cards[1].timeline.tweenFromTo('stateOne', 'stateThree');
  })

  $('.element--two .button--two').on('click', function(){
    console.log('playing 2');
    cards[1].timeline.tweenTo('stateFour');
  })

  $('.element--two .button--three').on('click', function(){
    console.log('playing 3');
    cards[1].timeline.tweenTo('stateFive');
  })
  
  $('.element--two .button--four').on('click', function(){
    console.log('playing 4');
    cards[1].timeline.tweenTo('stateExit');
  })

  $('.element--two .button--reset').on('click', function(){
    console.log('reset');
    cards[1].timeline.seek('stateOne');
  })

  //////////////////////////////////////////////////
  // TODO: move to init function
  var tlCards = new TimelineMax();

  tlCards

    // // position the cards in the center
    // .set(
    //   ".element--two .card",
    //   {
    //     // TODO: optimize and stores these vars to reduce calls
    //     x: $(".element--two .card").width() / 2,
    //     y: $(".element--two .card").height() / 2
    //   }
    // )
      
    // fade them in, along with thier content that's been marked for fade in
    .staggerTo(
      [ ".card", ".opacity--zero" ],
      0.2, 
      { 
        opacity: 1, 
        ease: Power2.easeInOut,
        cycle: {
          rotationX: "10%"
        }
      }
    ) 
  

});













