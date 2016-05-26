document.getElementById('arrowsup').onclick = function () {
    scrollToTop(1000)
    // window.scrollTo(0, 0, 100);
    // scrollTo(document.body, 0, 100);
}

function scrollToTop(scrollDuration) {
  var scrollStep = -window.scrollY / (scrollDuration / 15);
    scrollInterval = setInterval(function(){
    	if ( window.scrollY != 0 ) {
      	window.scrollBy( 0, scrollStep );
    	}
    	else clearInterval(scrollInterval); 
		},15);
}

// function scrollTo(element, to, duration) {
//   if (duration < 0) return;
//   var difference = to - element.scrollTop;
//   var perTick = difference / duration * 2;

//   setTimeout(function() {
//       element.scrollTop = element.scrollTop + perTick;
//       scrollTo(element, to, duration - 2);
//   }, 10);
// }

