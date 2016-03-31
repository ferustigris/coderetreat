$(function(){
	var note = $('#note'),
	ts = (new Date()).getTime() + 45*60*1000;

	var cool = $('#countdown').countdown({
		timestamp	: ts,
		onComplete  : function(){
			$("#start").button( "enable" );
		},
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += "минут: " + minutes + " и ";
			message += "секунд: " + seconds + " <br />";
			
			message += "до окончания сессии!";
			
			note.html(message);
		}
	});

	$('#countdown2').countdown2({
		timestamp	: ts,
		callback	: function(){
			$("#gen").button( "enable" );
		}
	});
	
	$("#gen").button().click(function () {
		$.fn.gen();
		$("#gen").button( "disable" );
	});
	$("#start").button().click(function () {
		cool.tick();
		$("#start").button( "disable" );
	});
});
