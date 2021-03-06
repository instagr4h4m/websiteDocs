/* Graham Harris */
/* typewriter.js - Script for website */

/* Code for this section is from https://stackoverflow.com/questions/42144095/pausing-js-typewriter */

/* --------------------------------------------------- */

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

// Method that ticks (adds and deletes)
TxtType.prototype.tick = function() {
    
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    // Deletes
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } 
    // Adds
    else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    // Randomizes typing speed?
    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } 
    else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() { that.tick(); }, delta); 

};

window.onload = function() {

    // Find typewrite element
    var elements = document.getElementsByClassName('typewrite');
    
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    // Inject CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
