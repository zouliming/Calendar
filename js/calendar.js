(function($, window, document) {
	// Globals
	var pluginName = 'calendar',
		pl = null,
		d = new Date();

	// Defaults
	defaults = {
		d: d,
		year: d.getFullYear(),
		today: d.getDate(),
		month: d.getMonth(),
		current_year: d.getFullYear(),
		tipsy_gravity: 's',
		scroll_to_date: true,
                note:[]
	};
        month_array = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	month_desc_array = [
		'一月',
		'二月',
		'三月',
		'四月',
		'五月',
		'六月',
		'七月',
		'八月',
		'九月',
		'十月',
		'十一月',
		'十二月'
	];

	month_days = [
		'31', // jan
		'28', // feb
		'31', // mar
		'30', // apr
		'31', // may
		'30', // june
		'31', // july
		'31', // aug
		'30', // sept
		'31', // oct
		'30', // nov
		'31'  // dec
	];

	// 主要的插件对象
	function Calendar(element, options) {
		pl = this;
		this.element = element;
		this.options = $.extend({}, defaults, options);
        
		this._defaults = defaults;
		this._name = pluginName;


		// Begin
		this.init();
	}

	// 初始化
	Calendar.prototype.init = function() {
		// Call print - who knows, maybe more will be added to the init function...
		this.print();
	}

	Calendar.prototype.print = function(year) {
		// 传入你想传入的任何年份
		var the_year = (year) ? parseInt(year) : parseInt(pl.options.year);

		// 首先,清除元素
		$(this.element).empty();

		$('.label').css({
			display: 'none'
		});

		// 在元素里面添加一个父DIV
		$(this.element).append('<div id=\"calendar\"></div>');

		// 为日历的的DOM元素设置对象
		var $_calendar = $('#calendar');

		// 我们开始添加年份
		$.each(the_year.toString(), function(i,o) {
			$_calendar.append('<div class=\"year\">' + o + '</div>');
		});

		// 导航箭头
		$_calendar.append('<div id=\"arrows\"></div>');

		// 箭头的DOM参考对象
		$_arrows = $('#arrows');
		$_arrows.append('<div class=\"next\"></div>');
		$_arrows.append('<div class=\"prev\"></div>');
                
                //添加按钮
                $_calendar.append('<div id=\"add\">添加</div>');

		// 为浮动元素添加一个clear标签
		$_calendar.append('<div class=\"clear\"></div>');

		// 循环月份数组,循环月份的字母,并且添加到div里面
		$.each(month_array, function(i, o) {

			// 添加一个滚动标记
			$_calendar.append("<div id='" + o + "'></div>");

			$.each(month_desc_array[i], function(i, o) {

				// 循环字母,赋在div里面
				$_calendar.append('<div class=\"label bold\">' + o + '</div>');

			});

			// 为浮动元素添加一个clear标签
			$_calendar.append('<div class=\"clear\"></div>');

			// 检验是否是闰年
			if (o === 'February') {
				if (pl.isLeap(the_year)) {
					month_days[i] = 29;
				} else {
					month_days[i] = 28;
				}
			}

			for (j = 1; j <= parseInt(month_days[i]); j++) {

				// 检验是否是今天
				var today = note = notevalue= nk = '';
				if (i === pl.options.month && the_year === d.getFullYear()) {
					if (j === pl.options.today) {
						today = 'today';
					}
				}
                                var formatMonth = i<10?'0'+(i+1):(i+1);
                                var formatDay = j<10?'0'+j:j;
                                nk = the_year+'-'+formatMonth+'-'+formatDay;
                                if(pl.options.note.hasOwnProperty(nk)){
                                        note = "note";
                                        notevalue = pl.options.note[nk];
                                }

				// 循环数字,赋在div里面
				$_calendar.append("<div data-content='"+notevalue+"' data-date='" + (parseInt(i) + 1) + '/' + j + '/' + the_year + "' class='label day " + today +" "+ note + "'>" + j + '</div>');
			}

			// 为浮动元素添加一个clear标签
			$_calendar.append('<div class=\"clear\"></div>');
		});
                
		// 循环这些元素,然后一个一个显示
		for (k = 0; k < $('.label').length; k++) {
			(function(j) {
				setTimeout(function() {
					// Fade the labels in
					$($('.label')[j]).fadeIn('fast', function() {
						// 这是要弹出的标签的内容
						$(this).attr('data-original-title', pl.returnFormattedDate($(this).attr('data-date')));

//						$(this).on('click', function() {
//							if (typeof pl.options.click_callback == 'function') {
//								var d = $(this).attr('data-date').split("/");
//								var dObj = {}
//								dObj.day = d[1];
//								dObj.month = d[0];
//								dObj.year = d[2];
//								pl.options.click_callback.call(this, dObj);
//							}
//						});
					});
				}, (k * 3));
			})(k);
		}

		// 滚动屏幕到指定的月份
		if (the_year === pl.options.current_year && pl.options.scroll_to_date) {
			var print_finished = false;
			var print_check = setInterval(function() {
				print_finished = true;
				$.each($(".label"), function() {
					if ($(this).css("display") === "none") {
						print_finished = false;
					}
				});
				if (print_finished) {
					clearInterval(print_check);
					$(window).scrollTo( $('#' + month_array[pl.options.month]), 800 );
				}
			}, 200);
		}
                
                $('.note').popover({
                        'animation':'toggle',
                        'placement':'top'
                });
                setTimeout("$('#add').fadeIn('slow','linear')",2000);
                
                $("#add").on('click',function(){
                        $('#myModal').modal({
                                backdrop:true,
                                keyboard:true,
                                show:true
                            });
                });
		// Tipsy
//		$('.label').tipsy({gravity: pl.options.tipsy_gravity});
	}

	// 前一年 / 下一年 的点击事件处理
	$(document).on('click', '.next', function() {
		pl.options.year = parseInt(pl.options.year) + 1;
		pl.print(pl.options.year);
	});

	$(document).on('click', '.prev', function() {
		pl.options.year = parseInt(pl.options.year) - 1;
		pl.print(pl.options.year);
	});

	// 判断是否是闰年
	Calendar.prototype.isLeap = function(year) {
		var leap = 0;
		leap = new Date(year, 1, 29).getMonth() == 1;
		return leap;
	}

	// 返回星期的方法
	Calendar.prototype.returnFormattedDate = function(date) {
		var returned_date;
		var d = new Date(date);
		var da = d.getDay();

		if (da === 1) {
			returned_date = '星期一';
		} else if (da === 2) {
			returned_date = '星期二';
		} else if (da === 3) {
			returned_date = '星期三';
		} else if (da === 4) {
			returned_date = '星期四';
		} else if (da === 5) {
			returned_date = '星期五';
		} else if (da === 6) {
			returned_date = '星期六';
		} else if (da === 0) {
			returned_date = '星期天';
		}

		return returned_date;
	}

	// 插件实例化
	$.fn[pluginName] = function(options ) {
		return this.each(function() {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Calendar(this, options));
			}
		});
	}
        
})(jQuery, window, document);