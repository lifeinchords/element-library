
  // ****************** FLOCKING SETUP ********************

  // make a chord, using the root note
  var rootNote = teoria.note('a#5');
  var chord = rootNote.chord("M9");

  // making a chord directly with the chord name
  // var chord = teoria.chord("Ddim");
  // var majorScale = teoria;

  var numNotes = chord.notes().length;

  console.log("**********************");
  console.log("chord root: ", chord.root.name() + chord.root.octave() + chord.root.accidental());
  console.log("chord name/type/numNotes: ", chord.toString(), '/', chord.chordType(), '/', numNotes);

  var notes = "";
  for(var i = 0; i < numNotes; i++){
    notes = notes + " " + chord.notes()[i].name() + chord.notes()[i].octave()+ chord.notes()[i].accidental();
  }

  console.log("notes:", notes);


  // ******************* Construct sounds with Flocking **************************
  // These envelop settings are re-used in the different voices/tones

  // General video on envelopes and what they do: 
  // https://www.youtube.com/watch?v=A6pp6OMU5r8&list=PL0CF041F562C5BE5E&index=2

  // Docs of how to implement emvelopes in Flocking: 
  // https://github.com/colinbdclark/Flocking/issues/8#issuecomment-108712105

  // TODO: better names and abstraction, this is crap
  var env1Settings = { 
    type: "flock.envelope.adsr", 
    attack: 0.1, 
    peak: 0.4, 
    decay: 0.25, 
    sustain: 0, 
    release: 0.24 
  }

  var env2Settings = {
    type: "flock.envelope.adsr",
    attack: 0,

    // OQ: why does enabling this fail silenty, where pinkNoise voice doesnt play/get summed?
    // peak: 0.075, 
    decay: 0.5,
    sustain: 0,
    release: 0.5
  }

  var env3Settings = {
    type: "flock.envelope.adsr",
    attack: 0.2,
    peak: 0.075, 
    decay: 0.5,
    sustain: 0,
    release: 0.35
  }

  var env4Settings = {
    type: "flock.envelope.adsr",
    attack: 0,
    peak: 0.1, 
    decay: 0.05,
    sustain: 0,
    release: 0.15
  }


  // TODO: remove from global scope
  window.drySineToneSynthDef = {
    "synthDef": { // this cant be changed. Flocking looks for this property named exactly this way.
       
        "id": "tone1", 

        "ugen": "flock.ugen.sinOsc",
        "freq": 440,
        "mul": {
            "ugen": "flock.ugen.envGen",
            "envelope": {
                "type": "flock.envelope.adsr",
                "attack": 1.0,
                "decay": 0.5,
                "peak": 0.15,
                "sutain": 0.1,
                "release": 1.0
            },
            "gate": 0
        }
    }
  }



  // TODO: remove from global scope
  window.boringSineToneSynthDef = {
    "synthDef": { // this cant be changed. Flocking looks for this property named exactly this way.
     
      id: "boringSineTone", 

      // routing all the sound through a reverb for a bit of atmospherics
      ugen: "flock.ugen.freeverb",
      inputs: {
        source: {
          // summing up a bunch of sources, ie, additive synthesis
          id: "sum",
          ugen: "flock.ugen.sum",
          sources: [

            
            // fundamental frequency, ie, the lowest ( 1st partial)
            {
              id: "tone1", 
              ugen: "flock.ugen.sinOsc",
              freq: chord.notes()[0].fq(),
              mul: {
                ugen: "flock.ugen.envGen",
                envelope: env1Settings,
                gate: 0 
              }
            }
                    
          ],

          mul: {
            id: "instrument",  
            ugen: "flock.ugen.asr",
            envelope: { 
              type: "flock.envelope.adsr", 
              attack: 1, 
              peak: 1, 
              decay: 1, 
              sustain: 4, 
              release: 1 
            },
            gate: 0
          }

        },

        mix: 0.65,
        room: 0.65,
        damp: 0.55
      }
    }
  };


  // TODO: remove from global scope
  window.coldFuzzySynthDef = {
    "synthDef": { // this cant be changed. Flocking looks for this property named exactly this way.
     
      id: "coldFuzzy", 

      // routing all the sound through a reverb for a bit of atmospherics
      ugen: "flock.ugen.freeverb",
      inputs: {
        source: {
          // summing up a bunch of sources, ie, additive synthesis
          id: "sum",
          ugen: "flock.ugen.sum",
          sources: [

            // some noise gives it texture
            {
              id: "pinkNoise", 
              ugen: "flock.ugen.pinkNoise",
              mul: {
                ugen: "flock.ugen.envGen",
                envelope: env2Settings,
                gate: 0 
              }
            }
            , // fundamental frequency, ie, the lowest ( 1st partial)
            {
              id: "tone1", 
              ugen: "flock.ugen.sinOsc",
              freq: chord.notes()[0].fq(),
              mul: {
                ugen: "flock.ugen.envGen",
                envelope: env1Settings,
                gate: 0 
              }
            }
            , // fundamental frequency, 2nd partial, 
              // slightly detuned up, with a bit of punch via saw osc
            {
              id: "tone2", 
              ugen: "flock.ugen.saw",
              freq: ( chord.notes()[0].fq() * 2 ) + ( chord.notes()[0].fq() * .005),
              mul: {
                ugen: "flock.ugen.envGen",
                envelope: env3Settings,
                gate: 0 
              }
            }
            , // fundamental frequency, 3rd partial, 
              // slightly detuned down, really sharp, metallic
            {
              id: "tone2-1", 
              ugen: "flock.ugen.square",
              freq: ( chord.notes()[0].fq() * 3 ) - ( chord.notes()[0].fq() * .001),
              mul: {
                ugen: "flock.ugen.envGen",
                envelope: { type: "flock.envelope.adsr", attack: 0.1, peak: 0.1, decay: 0.01, sustain: 0, release: 0.05 },
                gate: 0 
              }
            }
             , // 2nd degree ( or note) in the chord (triad)
             {
               id: "tone3", 
               ugen: "flock.ugen.tri",
               freq: chord.notes()[1].fq(),
               mul: {
                 ugen: "flock.ugen.envGen",
                 envelope: env1Settings,
                 gate: 0 
               }
             }
            , // 2nd degree ( or note) in the chord (triad)
              // 2nd partial,, with a bit of punch via saw osc
            {
              id: "tone3-1", 
              ugen: "flock.ugen.saw",
              freq: ( chord.notes()[1].fq() * 2 ) ,

              mul: {
                ugen: "flock.ugen.envGen",
                envelope: { type: "flock.envelope.adsr", attack: 0, peak: 0.25, decay: 0.2, sustain: 0, release: 0.5 },

                gate: 0 
              }
            }
             , // 3rd degree ( or note) in the chord (triad)
             {
               id: "tone4", 
               ugen: "flock.ugen.tri",
               freq: chord.notes()[2].fq(),
               mul: {
                 ugen: "flock.ugen.envGen",
                 envelope: env1Settings,
                 gate: 0 
               }
             } 
              , // 4rd degree ( or note) in the chord (triad)
             {
               id: "tone5", 
               ugen: "flock.ugen.tri",
               freq: chord.notes()[3].fq(),
               mul: {
                 ugen: "flock.ugen.envGen",
                 envelope: env2Settings,
                 gate: 0 
               }
             } 
             , // 5rd degree ( or note) in the chord (triad)
             {
               id: "tone6", 
               ugen: "flock.ugen.sinOsc",
               // freq: chord.notes()[4].fq(),

               // TODO: not sure this is working or doing anything.
               freq: {
                  ugen: "flock.ugen.sequence",
                  freq: chord.notes()[4].fq(),
                  list: [1, 2, 3, 4, 2, 1, 3],
                  loop: 1.0
                },

               mul: {
                 ugen: "flock.ugen.envGen",
                 envelope: env1Settings,
                 gate: 0 
               }
             }           
          ],

          mul: {
            id: "instrument",  
            ugen: "flock.ugen.asr",
            envelope: { 
              type: "flock.envelope.adsr", 
              attack: 1, 
              peak: 1, 
              decay: 1, 
              sustain: 4, 
              release: 1 
            },
            gate: 0
          }

        },

        mix: 0.85,
        room: 0.85,
        damp: 0.55
      }
    }
  };



  // TODO: remove from global scope
  // how do we not make this a global? having trouble passing this as a param in Mo.js 
  // onUpdate function
  window.drySineToneSynth = null;  // 1st example
  window.boringSineToneSynth = null;  // 2
  window.coldFuzzySynth = null;       // 3


  // *************************************************************
  // init and start Flocking environment. Only need to do this once.
  // Think of it like turning on an old stereo, but havent yet put in a CD or pressed play
  window.enviro = flock.init({ bufferSize: 1024 });
  window.enviro.start();

  // this actually begins generating sound, with the synth def passed in
  window.drySineToneSynth = flock.synth(window.drySineToneSynthDef);  
  window.boringSineToneSynth = flock.synth(window.boringSineToneSynthDef);  
  window.coldFuzzySynth = flock.synth(window.coldFuzzySynthDef);  

  