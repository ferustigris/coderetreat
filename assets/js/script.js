$(function(){
	var note = $('#note'),
	ts = (new Date()).getTime() + 45*60*1000;

	$('#countdown').countdown({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += "минут: " + minutes + " и ";
			message += "секунд: " + seconds + " <br />";
			
			message += "осталось до окончания сессии!";
			
			note.html(message);
		}
	});

	$('#countdown2').countdown2({
		timestamp	: ts,
		callback	: function(days, hours, minutes, seconds){
			
			var message = "";
			
			message += "Дней: " + days +", ";
			message += "часов: " + hours + ", ";
			message += "минут: " + minutes + " и ";
			message += "секунд: " + seconds + " <br />";
			
			message += "осталось до момента через 10 дней!";
			
			note.html(message);
		}
	});
	
	$("#gen").button().click(function () {
		$.fn.gen();
	});
});
