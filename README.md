




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

- add bpoint css helper
- set up .node-version

- card - opening, closing with Greensock
- sound synthesis with flocking
- touch enabled
- responsive type: http://simplaio.github.io/rucksack/docs/#responsive-type
- favicon
- add growl to gulp on fail

- Q: why does PostCSS crash on // comments?


LATER
-------

- only show bpoint helper in dev
- apply styling to 2 bpoints, excluding edges for example
- CSSVars inside custom-media:






MQ'S + VARS RESEARCH:
---------
css vars
http://philipwalton.com/articles/why-im-excited-about-native-css-variables/    

mq, css vars
http://w3-org.9356.n7.nabble.com/css-variables-mediaqueries-Allow-var-in-media-queries-td303964.html

https://github.com/MadLittleMods/postcss-css-variables
https://github.com/postcss/postcss-custom-media/
https://github.com/postcss/postcss-custom-properties/issues/24

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

