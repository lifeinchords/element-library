SETUP
-------
#### get latest node
`nvm install stable`

#### update this stable node version into `.node-version`


```
mkdir lsg
npm install -g yo
npm install -g gulp
npm install -g browser-sync
```

Install generator via Yoeman: https://github.com/azat-io/generator-alchemist#readme
`npm install -g generator-alchemist`

Run generator 
`yo alchemist (with Jade option)`

Install all dependencies/packages/libs
```
npm install
bower install
add gitignore
git init
npm install --save-dev gulp gulp-postcss gulp-sourcemaps autoprefixer lost
```

Disable Uglify/CSSNano in `gulpfile.js` and other unused PostCSS plugs
Add Lost Grid + other PostCSS plugs we need

`npm install` again



RUN
------

If issues with missing modules, or changes not sticking, run:
```
rm -rf node_modules
npm install

```

run local gulp and dev. make changes in `index.jade`, css, js files to trigger a build.
To be sure, delete /dist
`gulp`



TODO
------

- add basic flocking, triggers single sample on squash

- collection of cards, 4 up in L, 3 up in M, centered with flanking cards on XL. get vars from Lost calc

- onclick, jump up, squash + stretch
- loading ping
- loading ping bounces to the left, turns into cutting intro line
- motion trail line
- try FM in flocking. Look at sound example from mags.
- polygon shape avatars, layout like documentary mag

- secondary animation for card?

- what does weight mean for card content and how does it affect card behavior?

- combine mo.js with gsap cycle: https://www.youtube.com/watch?v=0HhjSPVuRHA
- add bpoint css helper
- touch enabled
- sample color, loading, then animate
- try Scorekeeper layout
- adapt carousel: http://codepen.io/electerious/pen/JXNEPr


LATER
-------

- improve card close
- remove time scaling from card timeline 1, embed into timings.
- wave pulse across card container
- email oleg: motion trail line?
- favicon
- add growl to gulp on fail
- Q: why does PostCSS crash on // comments?
- gulp-tinypng-compress, svgomg

- transparency blendmode
- set up .node-version

- grid bars, sync up bpoints in 

- only show bpoint helper in dev
- apply styling to 2 bpoints, excluding edges for example

- CSSVars inside custom-media:
/* @custom-media --sm (min-width: var(--smMinWidth));  // circular dependency. TODO */

- experiment with 
  https://github.com/arccoza/postcss-if-media
  https://github.com/WolfgangKluge/postcss-media-variables

- element queries: https://github.com/tysonmatanich/elementQuery

- responsive type: 
  http://madebymike.com.au/writing/precise-control-responsive-typography/
  http://simplaio.github.io/rucksack/docs/#responsive-type


- set up responsejs.com to browserify, remove from js/vendor/

- color during loading: https://github.com/fraser-hemp/gradify


- break surfaces with WebGL: https://css-tricks.com/rendering-svg-paths-in-webgl/


- custom GSAP eases: http://greensock.com/forums/topic/7952-javascript-custom-ease/page-2#entry51357





MQ'S + VARS RESEARCH:
---------
css vars
http://philipwalton.com/articles/why-im-excited-about-native-css-variables/    

mq, css vars
http://w3-org.9356.n7.nabble.com/css-variables-mediaqueries-Allow-var-in-media-queries-td303964.html

https://github.com/MadLittleMods/postcss-css-variables
https://github.com/postcss/postcss-custom-media/
https://github.com/postcss/postcss-custom-properties/issues/24
https://github.com/arccoza/postcss-if-media

http://stackoverflow.com/questions/31614049/shared-variables-in-postcss?rq=1
https://github.com/postcss/postcss-simple-vars
https://github.com/jonathantneal/postcss-advanced-variables
https://github.com/simonsmith/postcss-property-lookup


SG
-----
https://github.com/morishitter/postcss-style-guide




BREAKPOINTS
--------
http://firedev.com/posts/2016/sane-breakpoints   good viz

