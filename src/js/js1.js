'use strict';

var testeB = 1;

console.log(testeB);

window.onload = function () {
    if (window.jQuery) {
        // jQuery is loaded  
        alert("Yeah! it's going");
    } else {
        // jQuery is not loaded
        alert("Doesn't Works");
    }
}