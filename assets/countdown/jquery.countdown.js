/**
 * @name		jQuery Countdown Plugin
 * @author		Martin Angelov
 * @version 	1.0
 * @url			http://tutorialzine.com/2011/12/countdown-jquery/
 * @license		MIT License
 */

(function($){
	
	// Количество секунд в каждом временном отрезке
	var days	= 24*60*60,
		hours	= 60*60,
		minutes	= 60;
	
	// Создаем плагин
	$.fn.countdown = function(prop){
		var self = this;
		var options = $.extend({
			callback	: function(){},
			onComplete	: function(){},
			timestamp	: 0
		},prop);
		
		var left, d, h, m, s, positions;

		// инициализируем плагин
		init(this, options);
		
		positions = this.find('.position');
		
		self.tick = function (){
			
			// Осталось времени
			left = Math.floor((options.timestamp - (new Date())) / 1000);
			console.log("left")
			if(left < 0){
				left = 0;
				options.onComplete();
			}
			
	
			// Осталось минут
			m = Math.floor(left / minutes);
			updateDuo(0, 1, m);
			left -= m*minutes;
			
			// Осталось секунд
			s = left;
			updateDuo(2, 3, s);
			
			// Вызываем возвратную функцию пользователя
			options.callback(0, 0, m, s);
			
			// Планируем следующий вызов данной функции через 1 секунду
			setTimeout(self.tick, 1000);
		};
		
		// Данная функция обновляет две цифоровые позиции за один раз
		function updateDuo(minor,major,value){
			switchDigit(positions.eq(minor),Math.floor(value/10)%10);
			switchDigit(positions.eq(major),value%10);
		}
		
		return this;
	};


	function init(elem, options){
		elem.addClass('countdownHolder');

		// Создаем разметку внутри контейнера
		$.each(['Minutes','Seconds'],function(i){
			$('<span class="count'+this+'">').html(
				'<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
			).appendTo(elem);
			
			if(this!="Seconds"){
				elem.append('<span class="countDiv countDiv'+i+'"></span>');
			}
		});

	}

	// Создаем анимированный переход между двумя цифрами
	function switchDigit(position,number){
		
		var digit = position.find('.digit')
		
		if(digit.is(':animated')){
			return false;
		}
		
		if(position.data('digit') == number){
			// Мы уже вывели данную цифру
			return false;
		}
		
		position.data('digit', number);
		
		var replacement = $('<span>',{
			'class':'digit',
			css:{
				top:'-2.1em',
				opacity:0
			},
			html:number
		});
		
		// Класс .static добавляется, когда завершается анимация.
		// Выполнение идет более плавно.
		
		digit
			.before(replacement)
			.removeClass('static')
			.animate({top:'2.5em',opacity:0},'fast',function(){
				digit.remove();
			})

		replacement
			.delay(100)
			.animate({top:0,opacity:1},'fast',function(){
				replacement.addClass('static');
			});
	}
	$.fn.countdown2 = function(prop){

		// инициализируем плагин
		init2(this);
		
		positions = this.find('.position');
		
		// Данная функция обновляет две цифоровые позиции за один раз
		function updateDuo(minor,major,value){
			switchDigit(positions.eq(minor),Math.floor(value/10)%10);
			switchDigit(positions.eq(major),value%10);
		}
		updateDuo(0, 1, 00);
			$.fn.gen = function() {
				setTimeout(function() {
					updateDuo(0, 1, Math.floor(Math.random()*100 % 32));
					prop.callback();
				}, 1000);	
			}
		return this;
	};


	function init2(elem, options){
		elem.addClass('countdownHolder');

		// Создаем разметку внутри контейнера
		$.each(['Seconds'],function(i){
			$('<span class="count'+this+'">').html(
				'<span class="position">\
					<span class="digit static">0</span>\
				</span>\
				<span class="position">\
					<span class="digit static">0</span>\
				</span>'
			).appendTo(elem);
		});

	}

})(jQuery);
