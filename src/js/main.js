"use strict"; 

$(document).ready(function () {
  // console.log('ready');

  // setting up syntax highlighting for element documentation
  hljs.initHighlightingOnLoad();


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

  var cards = [];

  var timelineStart = function () {
    console.log('morphEnter: timelineStart ...');

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

  };

  var timelineUpdate = function () {
    // console.log('morphUpdate: timelineUpdate: ',  $(this).css.height );

    // TODO: map from 20hz to 20k hz, since progress outputs values between 0 and 1
    var newFreq = (card.$element.height() + 400);
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
  var card = {};
  card.$element = $('.element--one .card');
  card.height = 400;
  card.width = "100%";

  card.timeline = new TimelineMax({
    onStart: timelineStart,
    onComplete: timelineDone,
    onUpdate: timelineUpdate,
    // onUpdateParams: [ card.$element ],
    paused: true,
    force3D: true
  });
      
  card.timeline

    .fromTo   ( 
      card.$element, 
      0.2, 
      { width: 2, height: 0, y: card.height / 2 },  // from
      { width: card.width, height: 2, ease: Power4.easeOut }, // to
      "left-to-right" // label
    ) 
    
    .fromTo   ( 
      card.$element, 0.20, 
      { width: card.width, height: 2, y: card.height / 2, scale: 1 }, 
      { width: card.width, height: card.height, ease: Power4.easeOut, y: 0, immediateRender: false, scale: 1.02 }, 
      "+=0.4", // position 
      "top-to-bottom" // label
    ) 

    .to ( card.$element, 0.20, { scale: 1, ease: Circ.easeInOut  }, "+=0.25", "settle-in" ) 
    .to ( card.$element.find('.card__image'), 0.3, { opacity: 1, ease: Power2.easeInOut }, "-=0.15"  ) 
    .to ( card.$element.find('.card__title'), 0.3, { opacity: 1, ease: Power0.easeNone }, "+=0.10"  ) 

  $('.element--one .button--enter').on('click', function(){

    card.timeline.timeScale( 1.5 );
    card.timeline.play();
  })

  $('.element--one .button--exit').on('click', function(){

    card.timeline.timeScale( 2 );
    card.timeline.reverse();
  })

  cards.push = card;

  //////////////////////////////////////////////////

  card = null;

  //////////////////////////////////////////////////
  // TWO
  card = {};
  card.$element = $('.element--two .card');
  card.height = 400;
  card.width = "100%";

  card.timeline = new TimelineMax({
    onStart: timelineStart,
    onComplete: timelineDone,
    onUpdate: timelineUpdate,
    // onUpdateParams: [ card.$element ],
    paused: true,
    force3D: true
  });
      
  card.timeline

    .fromTo   ( 
      card.$element, 
      0.2, 
      { width: 2, height: 0, y: card.height / 2 },  // from
      { width: card.width, height: 2, ease: Power4.easeOut }, // to
      "left-to-right" // label
    ) 
    
    .fromTo   ( 
      card.$element, 0.20, 
      { width: card.width, height: 2, y: card.height / 2, scale: 1 }, 
      { width: card.width, height: card.height, ease: Power4.easeOut, y: 0, immediateRender: false, scale: 1.02 }, 
      "+=0.4", // position 
      "top-to-bottom" // label
    ) 

    .to       ( card.$element, 0.20, { scale: 1, ease: Circ.easeInOut  }, "+=0.25", "settle-in" ) 
    .to       ( card.$element.find('.card__image'), 0.3, { opacity: 1, ease: Power2.easeInOut }, "-=0.15"  ) 
    .to       ( card.$element.find('.card__title'), 0.3, { opacity: 1, ease: Power0.easeNone }, "+=0.10"  ) 

  $('.element--two .button--enter').on('click', function(){

    card.timeline.timeScale( 1.5 );
    card.timeline.play();
  })

  $('.element--two .button--exit').on('click', function(){

    card.timeline.timeScale( 2 );
    card.timeline.reverse();
  })

  cards.push = card;




});













