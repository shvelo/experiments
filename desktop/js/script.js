win.settings.container = '.desktop';
var apps = [];

function updateClock() {
	var time = $('.time');
	var currentTime = new Date();

	var hours = currentTime.getHours() + "";
	var minutes = currentTime.getMinutes() + "";

	if (hours.length < 2)
		hours = "0" + hours;
	if (minutes.length < 2)
		minutes = "0" + minutes;

	time.find('span').text(hours + ":" + minutes);
	time.find('.date').text(currentTime.toDateString());
	time.attr('title', currentTime.toDateString());

	setTimeout(updateClock, 1000);
}
var onrun = [];
onrun[2] = function() {
	$('.browser form').submit(
			function() {
				go($(this).parent().find('.address').val(), $(this).parent()
						.parent().parent().parent().attr('data-id'));
				return false;
			});
	$('.browser-content').resizable({
		helpers : 'se',
		minWidth : 700,
		animate : true,
		helper : 'ui-resizable-helper'
	}).disableSelection();
};
onrun[1] = function() {
	$('.run button').click(function() {
		var expr = $(this).parent().find('input').val();
		setTimeout(expr, 0);
	});
};
function go(uri, id) {
	$('.window[data-id=' + id + ']').find('.browser-frame').attr('src', uri);
}
function new_app() {

}

function run(id) {
	var app = $('.apps').find('[data-id=' + id + ']');
	var content = app.find('.content').html();
	var title = app.find('.title').text();
	var icon = app.find('.icon').attr('src');
	win.open(title, content, icon);
	onrun[id]();
}
$(function() {
	$.vegas('slideshow', {
		delay : 30000,
		backgrounds : [ {
			src : 'images/illusion.jpg',
			fade : 1000
		}, {
			src : 'images/azul.jpg',
			fade : 1000
		}, {
			src : 'images/alpine.jpg',
			fade : 1000
		}, {
			src : 'images/ubuntu.jpg',
			fade : 1000
		}, {
			src : 'images/minimal.jpg',
			fade : 1000
		}, {
			src : 'images/elune.jpg',
			fade : 1000
		}, {
			src : 'images/zix.jpg',
			fade : 1000
		} ]
	});
	$('.start').click(function() {
		$('.startmenu').slideToggle("fast");
	}).disableSelection();
	$('.time').disableSelection();
	$('.tasks,.desktop').click(function() {
		$('.startmenu').slideUp("fast");
		$('.date').slideUp("fast");
	});
	$('.startmenu .items .item').click(function() {
		run($(this).data('id'));
	});
	$('.desktop .launcher').click(function() {
		run($(this).data('id'));
	});
	$('.tasks').sortable({
		axis : 'x',
		containment : '.tasks',
		start : function(event, ui) {
			$(ui.item).addClass('active');
		},
		stop : function(event, ui) {
			$(ui.item).removeClass('active');
		}
	}).disableSelection();
	$('.time').click(function() {
		$('.date').slideToggle();
	});
	$('.user-box').click(function() {
		window.open("http://shvelo.github.com");
	});
	$('.tasks').css(
			'width',
			$('.taskbar').outerWidth(true) - $('.start').outerWidth(true)
					- $('.tray').outerWidth(true) - 6 + "px");
	updateClock();
	$('.desktop').sortable({
		grid : [ 70, 90 ],
		containment : '.desktop'
	}).disableSelection();
});
