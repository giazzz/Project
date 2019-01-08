$( document ).ready(function() {
	$('.carousel-inner').on('click', function(e) {
		$(this).toggleClass("max-height"); //you can list several class names 
		e.preventDefault();
    });
});

