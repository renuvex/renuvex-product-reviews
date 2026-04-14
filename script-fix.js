const fs = require('fs');
let c = fs.readFileSync('src/widget/core/helpers.js', 'utf8');

c = c.replace(/var css =[\s\S]*?var style = document\.createElement\('style'\);/, 
  "var css = " +
  "'.ikr-rating-interactive .ikr-rating-filled{opacity:0; transition:opacity .15s;}' + " +
  "'.ikr-rating-interactive .ikr-rating-empty{opacity:1; transition:opacity .15s;}' + " +
  "'.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-filled{opacity:1 !important;}' + " +
  "'.ikr-rating-interactive .ikr-rating-input:checked ~ .ikr-rating-label .ikr-rating-empty{opacity:0 !important;}' + " +
  "'.ikr-rating-interactive .ikr-rating-input:focus-visible + .ikr-rating-label{outline:2px solid ' + STAR_COLOR + ';outline-offset:2px;border-radius:4px;}';" +
  "\n\n  var style = document.createElement('style');"
);

fs.writeFileSync('src/widget/core/helpers.js', c);
