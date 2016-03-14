$(document).ready(function () {

  console.log('ready');

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

});
