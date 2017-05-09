/*
 * Slider
 */

// Initial value
var partIndex = 0;

// Function for sliding parts
function showParts() {
	var i;
	var x = document.getElementsByClassName("part");

	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}

	partIndex++;
	if (partIndex > x.length) {
		partIndex = 1;
	}

	x[partIndex - 1].style.display = "block";

	setTimeout(showParts, 9000);
}

// Initiate the slider
showParts();

/*
 * Lazy Loading - this script is influenced by Echo.js
 * https://toddmotto.com/echo-js-simple-javascript-image-lazy-loading/
 */

// Constructor
var LazyLoad = function(elem) {
	this.elem = elem;
	this.render();
	this.listen();
}

// Prototype
LazyLoad.prototype = {
	init: function() {
		lazyStore.push(this.elem);
	},
	render: function() {
		window.onload = lazyImages;
	},
	listen: function() {
		window.onscroll = lazyImages;
	}
}

// Variables
var lazyStore = [];
var selector = document.querySelector(".content");

// Show for element in viewport
var inView = function(elem) {
	var rect = elem.getBoundingClientRect();
	var compareCoords = false;

	if (rect.top != 0) {
		var compareCoords = rect.top <= window.innerHeight;
	}
	return compareCoords;
}

// Set data-url attribute to the img src attribute
var lazySrc = function(img, callback) {
	img.src = img.getAttribute('data-url');
	if (callback) {
		callback();
	}
}

// Remove loaded images from the array
var removeImage = function(element, index) {
	if (lazyStore.indexOf(element) !== -1) {
		lazyStore.splice(index, 1);
	}
}

// Load images
var lazyImages = function() {
	for (var i = 0; i < lazyStore.length; i++) {
		var self = lazyStore[i];
		if (inView(selector)) {
			lazySrc(self, removeImage(self, i));
		}
	}
}

// Initiate the lazyLoader
var lazy = document.querySelectorAll('img[data-url]');

for (var i = 0; i < lazy.length; i++) {
	new LazyLoad(lazy[i]).init();
}
