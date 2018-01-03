$(document).ready(function() {
    // Script para efecto scroll up and down
    $(window).scroll(function() {
        if ($("#menu").offset().top > 56) {
            $("#menu").addClass("bg-navbar");
            document.getElementById('logo').src="img/logo-2.png";
        } else {
            $("#menu").removeClass("bg-navbar");
            document.getElementById('logo').src="img/logo.png";
        }
    });
	$('.carousel').carousel({interval:5000})
});
