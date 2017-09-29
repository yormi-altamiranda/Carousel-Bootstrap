$(document).ready(function() {
    // Script para efecto scroll up and down
    $(window).scroll(function() {
        if ($("#menu").offset().top > 56) {
            $("#menu").addClass("bg-navbar");
            document.getElementById('logo').src="img/logo-dark.svg";
        } else {
            $("#menu").removeClass("bg-navbar");
            document.getElementById('logo').src="img/logo-light.svg";
        }
    });
	$('.carousel').carousel({interval:5000})
});
