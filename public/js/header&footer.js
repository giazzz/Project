	$(document).ready(function(){
		$(".init").click(function(){
			$(".inside-list").slideToggle(700);
			$(".menulaptop-cover").toggle();
		});
		$(".menulaptop-cover").click(function(){
			$(".inside-list").slideToggle(700);
			$(".menulaptop-cover").toggle();
		});
		var allOptions = $(".inside-list").children('.option:not(.init)');
		$(".list-unstyled").on("click", ".option:not(.init)", function() {
			allOptions.removeClass('selected');
			$(this).addClass('selected');
			$(".list-unstyled").children('.init').html($(this).html());
			$(".inside-list").slideToggle(700);
		});
	});
	
	
	$(function(){
		$('a[href="#"]').on('click', function(e){
			e.preventDefault();
		});
  
		$('#menu > li').on('mouseover', function(e){
			$(this).find("ul:first").show();
			$(this).find('> a').addClass('active');
		}).on('mouseout', function(e){
			$(this).find("ul:first").hide();
			$(this).find('> a').removeClass('active');
		});
	  
		$('#menu li li').on('mouseover',function(e){
			if($(this).has('ul').length) {
			  $(this).parent().addClass('expanded');
			}
			$('ul:first',this).parent().find('> a').addClass('active');
			$('ul:first',this).show();
		}).on('mouseout',function(e){
			$(this).parent().removeClass('expanded');
			$('ul:first',this).parent().find('> a').removeClass('active');
			$('ul:first', this).hide();
		});
	});

	$(document).ready(function(){
		$(".cart-button").click(function(){
			$(".cartlist").slideToggle(700);
			$(".cartlaptop-cover").toggle();
		});
		$(".cartlaptop-cover").click(function(){
			$(".cartlist").slideToggle(700);
			$(".cartlaptop-cover").toggle();
		});
		$(".togglecartmobile").click(function(){
			$(".cartlistmobile").slideToggle(700);
			$(".cartmobile-cover").toggle();
			$(".togglecartmobile").toggleClass("green");
			if($(".togglemobile").is(":visible")){
				$(".dropmenu-mobile").slideUp(700);
				$(".menumobile-cover").toggle();
			}
		});
		$(".cartmobile-cover").click(function(){
			$(".cartlistmobile").slideToggle(700);
			$(".cartmobile-cover").toggle();
			$(".togglecartmobile").toggleClass("green");
			if($(".togglemobile").is(":visible")){
				$(".dropmenu-mobile").slideUp(700);
				$(".menumobile-cover").toggle();
			}
		});
		$(".togglemobile").click(function(){
			$(".dropmenu-mobile").slideToggle(700);
			$(".menumobile-cover").toggle();
			$(".togglemobile").toggleClass("green");
			if($("#dropmenu-mobile-small-1").is(":visible")){
				$("#dropmenu-mobile-small-1").slideUp(700);
			}
			if($("#dropmenu-mobile-small-2").is(":visible")){
				$("#dropmenu-mobile-small-2").slideUp(700);
			}
			if($("#dropmenu-mobile-small-3").is(":visible")){
				$("#dropmenu-mobile-small-3").slideUp(700);
			}
			if($("#dropmenu-mobile-small-4").is(":visible")){
				$("#dropmenu-mobile-small-4").slideUp(700);
			}
		});
		$(".menumobile-cover").click(function(){
			$(".dropmenu-mobile").slideToggle(700);
			$(".menumobile-cover").toggle();
			$(".togglemobile").toggleClass("green");
			if($("#dropmenu-mobile-small-1").is(":visible")){
				$("#dropmenu-mobile-small-1").slideUp(700);
			}
			if($("#dropmenu-mobile-small-2").is(":visible")){
				$("#dropmenu-mobile-small-2").slideUp(700);
			}
			if($("#dropmenu-mobile-small-3").is(":visible")){
				$("#dropmenu-mobile-small-3").slideUp(700);
			}
			if($("#dropmenu-mobile-small-4").is(":visible")){
				$("#dropmenu-mobile-small-4").slideUp(700);
			}
		});
	});
	$(document).ready(function(){
		$("#dropmenu-mobile-title-1").click(function(){
			$("#dropmenu-mobile-small-1").slideToggle(700);
			if($("#dropmenu-mobile-small-2").is(":visible")){
				$("#dropmenu-mobile-small-2").slideUp(700);
			}
			if($("#dropmenu-mobile-small-3").is(":visible")){
				$("#dropmenu-mobile-small-3").slideUp(700);
			}
			if($("#dropmenu-mobile-small-4").is(":visible")){
				$("#dropmenu-mobile-small-4").slideUp(700);
			}
		});
	});
	$(document).ready(function(){
		$("#dropmenu-mobile-title-2").click(function(){
			$("#dropmenu-mobile-small-2").slideToggle(700);
			if($("#dropmenu-mobile-small-1").is(":visible")){
				$("#dropmenu-mobile-small-1").slideUp(700);
			}
			if($("#dropmenu-mobile-small-3").is(":visible")){
				$("#dropmenu-mobile-small-3").slideUp(700);
			}
			if($("#dropmenu-mobile-small-4").is(":visible")){
				$("#dropmenu-mobile-small-4").slideUp(700);
			}
		});
	});
	$(document).ready(function(){
		$("#dropmenu-mobile-title-3").click(function(){
			$("#dropmenu-mobile-small-3").slideToggle(700);
			if($("#dropmenu-mobile-small-2").is(":visible")){
				$("#dropmenu-mobile-small-2").slideUp(700);
			}
			if($("#dropmenu-mobile-small-1").is(":visible")){
				$("#dropmenu-mobile-small-1").slideUp(700);
			}
			if($("#dropmenu-mobile-small-4").is(":visible")){
				$("#dropmenu-mobile-small-4").slideUp(700);
			}
		});
	});
	$(document).ready(function(){
		$("#dropmenu-mobile-title-4").click(function(){
			$("#dropmenu-mobile-small-4").slideToggle(700);
			if($("#dropmenu-mobile-small-2").is(":visible")){
				$("#dropmenu-mobile-small-2").slideUp(700);
			}
			if($("#dropmenu-mobile-small-3").is(":visible")){
				$("#dropmenu-mobile-small-3").slideUp(700);
			}
			if($("#dropmenu-mobile-small-1").is(":visible")){
				$("#dropmenu-mobile-small-1").slideUp(700);
			}
		});
	});
	
	$(document).ready(function(){
		$(window).scroll(function() {
			var scrollTop = $(this).scrollTop();
			var pageheight = $(document).height();
			var devicehieght = $(window).height();
			if(pageheight >= 2*devicehieght){
				$('.gototop-float').show();
				if (devicehieght/2 < scrollTop && scrollTop <= devicehieght*1.1) {
					$('.gototop-float').css({
						opacity: function() {
						return 0;
						}
					});
				} else if (scrollTop <= devicehieght/2) {
					$('.gototop-float').hide();
				} else if (scrollTop > devicehieght*1.5) {
					$('.gototop-float').css({
						opacity: function() {
						return 1;
						}
					});
				} else {
					$('.gototop-float').css({
						opacity: function() {
						return 1 - (1.5*devicehieght - scrollTop) / (1.5*devicehieght);
						}
					});
				}
			} else {
				$('.gototop-float').hide();
			}
		});

		//Click event to scroll to top
		$('.gototop-float').click(function(){
			$('html, body').animate({scrollTop : 0},1000);
			return false;
		});
	
		$(document).ready(function(){
			$(".dropdown").hover(            
				function() {
					$('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).show("slow");
					$(this).toggleClass('open');        
				},
				function() {
					$('.dropdown-menu', this).not('.in .dropdown-menu').stop( true, true ).hide("fast");
					$(this).toggleClass('open');       
				}
			);
		});
	});