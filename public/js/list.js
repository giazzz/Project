
$("#clickgrid").click(function(){
	$(".griditem").addClass("col-sm-4 col-xs-6");
	$(".griditem").removeClass("col-xs-12");
	$(".griditem").css("height","450px");
	$(".image").removeClass("col-xs-2");
	$(".item-content1").removeClass("col-xs-7 text-left");
	$(".fig").css("height","100px");
	$(".des").hide();
	$(".item-content2").removeClass("col-xs-3");
	$(".item-content2").css("padding","0");
})
$("#clicklist").click(function(){
	$(".griditem").addClass("col-xs-12");
	$(".griditem").removeClass("col-sm-4 col-xs-6");
	$(".griditem").css("height","220px");
	$(".image").addClass("col-xs-2");
	$(".item-content1").addClass("col-xs-7 text-left");
	$(".fig").css("height","70px");
	$(".des").show();
	$(".item-content2").addClass("col-xs-3");
	$(".item-content2").css("padding","30px 0 0 0");
})


$("#clickgrid").click(function(){
	$("#clickgrid").css("opacity","1");
	$("#clicklist").css("opacity","0.5");
});
$("#clicklist").click(function (){
	$("#clicklist").css("opacity","1");
	$("#clickgrid").css("opacity","0.5");
})


$(".addtocart").click(function(){
	$(this).remove();
	$("#v" + $(this).attr("id")).show();
});
$(".addtocart1").click(function(){
	$(this).remove();
	$("#v" + $(this).attr("id")).show();
})


function opensort() {
	$(".sortslide").slideToggle(500);
	$(".sectionfader").show();
};
function closesort(){
	$(".sortslide").slideUp(500);
	$(".sectionfader").hide();
	$(".rightc").slideUp(500);
}


$("#menu").click(function(){
	$(".rightc").slideToggle(500);
	$(".sectionfader").show();
});
