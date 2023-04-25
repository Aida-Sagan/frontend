$(document).scroll(function() {
	if($(document).width() < 1024)
		return false;

	if($(document).scrollTop() > $('.full-page').height() / 2)
		$("header").addClass("fixed");
	else
		$("header").removeClass("fixed");
});
/*скроллинг (плавное перемещение) страницы вверх до ее верхней части.*/
$(".up-btn").on("click", function() {
	$("html, body").animate({
		scrollTop: 0
	}, 'slow');
});

$("#show-menu").on("click", function() {
	$("#hidden-menu").animate({
		"right": 0
	}, 500);
});

$("#hidden-menu .close").on("click", function() {
	$("#hidden-menu").animate({
		"right": "-300px"
	}, 200);
});

/*для создания слайдера с помощью плагина Slick.*/
$(document).ready(function() {
	$("#slider").slick({
		/*отображение точек для навигации*/
		dots: false,
		/* определение пользовательских элементов управления*/
		prevArrow: '<div class="arrow-prev"><i class="fas fa-arrow-left"></i></div>',
		nextArrow: '<div class="arrow-next"><i class="fas fa-arrow-right"></i></div>',
		/*бесконечную прокрутку*/
		infinite: true,
		/* количество отображаемых слайдов*/
		slidesToShow: 3,
		/*количество слайдов, прокручиваемых за один раз*/
		slidesToScroll: 2
	});
});
