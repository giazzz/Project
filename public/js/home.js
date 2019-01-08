$( document ).ready(function() {
	$( ".product-action" ).click(function() {
		$(this).find('.addtocart').hide();
		$(this).css( "background-color", "white" );
		$(this).find('.viewcart').slideDown(300);
	});
});	
	