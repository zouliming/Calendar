(function($, window, document) {

	//
	// Globals
	var pluginName = 'calendar',
		pl = null,
		d = new Date();

	//
	// Defaults
	defaults = {
		d: d,
		year: d.getFullYear(),
		today: d.getDate(),
		month: d.getMonth(),
		current_year: d.getFullYear(),
		tipsy_gravity: 's',
		scroll_to_date: true
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

	//
	// 主要的插件对象
	function Calendar(element, options) {
		pl = this;
		this.element = element;
		this.options = $.extend({}, defaults, options);
        
		this._defaults = defaults;
		this._name = pluginName;


		//
		// Begin
		this.init();
	}

	// 初始化
	Calendar.prototype.init = function() {

		//
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

		//
		// 在元素里面添加一个父DIV
		$(this.element).append('<div id=\"calendar\"></div>');

		//
		// 为日历的的DOM元素设置对象
		var $_calendar = $('#calendar');

		//
		// 我们开始添加年份
		$.each(the_year.toString(), function(i,o) {
			$_calendar.append('<div class=\"year\">' + o + '</div>');
		});

		//
		// 导航箭头
		$_calendar.append('<div id=\"arrows\"></div>');

		//
		// 箭头的DOM参考对象
		$_arrows = $('#arrows');
		$_arrows.append('<div class=\"next\"></div>');
		$_arrows.append('<div class=\"prev\"></div>');

		//
		// 为浮动元素添加一个clear标签
		$_calendar.append('<div class=\"clear\"></div>');

		//
		// 循环月份数组,循环月份的字母,并且添加到div里面
		$.each(month_array, function(i, o) {

			//
			// 添加一个滚动标记
			$_calendar.append("<div id='" + o + "'></div>");

			$.each(month_array[i], function(i, o) {

				//
				// 循环字母,赋在div里面
				$_calendar.append('<div class=\"label bold\">' + o + '</div>');

			});

			//
			// 为浮动元素添加一个clear标签
			$_calendar.append('<div class=\"clear\"></div>');

			//
			// 检验是否是闰年
			if (o === 'February') {
				if (pl.isLeap(the_year)) {
					month_days[i] = 29;
				} else {
					month_days[i] = 28;
				}
			}

			for (j = 1; j <= parseInt(month_days[i]); j++) {

				//
				// 检验是否是今天
				var today = '';
				if (i === pl.options.month && the_year === d.getFullYear()) {
					if (j === pl.options.today) {
						today = 'today';
					}
				}

				//
				// 循环数字,赋在div里面
				$_calendar.append("<div data-date='" + (parseInt(i) + 1) + '/' + j + '/' + the_year + "' class='label day " + today + "'>" + j + '</div>');
			}

			//
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
						$(this).attr('original-title', pl.returnFormattedDate($(this).attr('data-date')));

						$(this).on('click', function() {
							if (typeof pl.options.click_callback == 'function') {
								var d = $(this).attr('data-date').split("/");
								var dObj = {}
								dObj.day = d[1];
								dObj.month = d[0];
								dObj.year = d[2];
								pl.options.click_callback.call(this, dObj);
							}
						});
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

		// Tipsy
		$('.label').tipsy({gravity: pl.options.tipsy_gravity});
	}

	//
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


// DELETE THIS IF YOU ALREADY SOURCE TIPSY ------------------------------------
// tipsy, facebook style tooltips for jquery
// version 1.0.0a
// (c) 2008-2010 jason frame [jason@onehackoranother.com]
// released under the MIT license

(function($) {

    function maybeCall(thing, ctx) {
        return (typeof thing == 'function') ? (thing.call(ctx)) : thing;
    };

    function Tipsy(element, options) {
        this.$element = $(element);
        this.options = options;
        this.enabled = true;
        this.fixTitle();
    };

    Tipsy.prototype = {
        show: function() {
            var title = this.getTitle();
            if (title && this.enabled) {
                var $tip = this.tip();

                $tip.find('.tipsy-inner')[this.options.html ? 'html' : 'text'](title);
                $tip[0].className = 'tipsy'; // reset classname in case of dynamic gravity
                $tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).prependTo(document.body);

                var pos = $.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                });

                var actualWidth = $tip[0].offsetWidth,
                    actualHeight = $tip[0].offsetHeight,
                    gravity = maybeCall(this.options.gravity, this.$element[0]);

                var tp;
                switch (gravity.charAt(0)) {
                    case 'n':
                        tp = {top: pos.top + pos.height + this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 's':
                        tp = {top: pos.top - actualHeight - this.options.offset, left: pos.left + pos.width / 2 - actualWidth / 2};
                        break;
                    case 'e':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - this.options.offset};
                        break;
                    case 'w':
                        tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + this.options.offset};
                        break;
                }

                if (gravity.length == 2) {
                    if (gravity.charAt(1) == 'w') {
                        tp.left = pos.left + pos.width / 2 - 15;
                    } else {
                        tp.left = pos.left + pos.width / 2 - actualWidth + 15;
                    }
                }

                $tip.css(tp).addClass('tipsy-' + gravity);
                $tip.find('.tipsy-arrow')[0].className = 'tipsy-arrow tipsy-arrow-' + gravity.charAt(0);
                if (this.options.className) {
                    $tip.addClass(maybeCall(this.options.className, this.$element[0]));
                }

                if (this.options.fade) {
                    $tip.stop().css({opacity: 0, display: 'block', visibility: 'visible'}).animate({opacity: this.options.opacity});
                } else {
                    $tip.css({visibility: 'visible', opacity: this.options.opacity});
                }
            }
        },

        hide: function() {
            if (this.options.fade) {
                this.tip().stop().fadeOut(function() { $(this).remove(); });
            } else {
                this.tip().remove();
            }
        },

        fixTitle: function() {
            var $e = this.$element;
            if ($e.attr('title') || typeof($e.attr('original-title')) != 'string') {
                $e.attr('original-title', $e.attr('title') || '').removeAttr('title');
            }
        },

        getTitle: function() {
            var title, $e = this.$element, o = this.options;
            this.fixTitle();
            var title, o = this.options;
            if (typeof o.title == 'string') {
                title = $e.attr(o.title == 'title' ? 'original-title' : o.title);
            } else if (typeof o.title == 'function') {
                title = o.title.call($e[0]);
            }
            title = ('' + title).replace(/(^\s*|\s*$)/, '');
            return title || o.fallback;
        },

        tip: function() {
            if (!this.$tip) {
                this.$tip = $('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>');
            }
            return this.$tip;
        },

        validate: function() {
            if (!this.$element[0].parentNode) {
                this.hide();
                this.$element = null;
                this.options = null;
            }
        },

        enable: function() { this.enabled = true; },
        disable: function() { this.enabled = false; },
        toggleEnabled: function() { this.enabled = !this.enabled; }
    };

    $.fn.tipsy = function(options) {

        if (options === true) {
            return this.data('tipsy');
        } else if (typeof options == 'string') {
            var tipsy = this.data('tipsy');
            if (tipsy) tipsy[options]();
            return this;
        }

        options = $.extend({}, $.fn.tipsy.defaults, options);

        function get(ele) {
            var tipsy = $.data(ele, 'tipsy');
            if (!tipsy) {
                tipsy = new Tipsy(ele, $.fn.tipsy.elementOptions(ele, options));
                $.data(ele, 'tipsy', tipsy);
            }
            return tipsy;
        }

        function enter() {
            var tipsy = get(this);
            tipsy.hoverState = 'in';
            if (options.delayIn == 0) {
                tipsy.show();
            } else {
                tipsy.fixTitle();
                setTimeout(function() { if (tipsy.hoverState == 'in') tipsy.show(); }, options.delayIn);
            }
        };

        function leave() {
            var tipsy = get(this);
            tipsy.hoverState = 'out';
            if (options.delayOut == 0) {
                tipsy.hide();
            } else {
                setTimeout(function() { if (tipsy.hoverState == 'out') tipsy.hide(); }, options.delayOut);
            }
        };

        if (!options.live) this.each(function() { get(this); });

        if (options.trigger != 'manual') {
            var binder = options.live ? 'live' : 'bind',
                eventIn = options.trigger == 'hover' ? 'mouseenter' : 'focus',
                eventOut = options.trigger == 'hover' ? 'mouseleave' : 'blur';
            this[binder](eventIn, enter)[binder](eventOut, leave);
        }

        return this;

    };

    $.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        live: false,
        offset: 0,
        opacity: 0.8,
        title: 'title',
        trigger: 'hover'
    };

    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };

    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };

    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };

    /**
     * yields a closure of the supplied parameters, producing a function that takes
     * no arguments and is suitable for use as an autogravity function like so:
     *
     * @param margin (int) - distance from the viewable region edge that an
     *        element should be before setting its tooltip's gravity to be away
     *        from that edge.
     * @param prefer (string, e.g. 'n', 'sw', 'w') - the direction to prefer
     *        if there are no viewable region edges effecting the tooltip's
     *        gravity. It will try to vary from this minimally, for example,
     *        if 'sw' is preferred and an element is near the right viewable
     *        region edge, but not the top edge, it will set the gravity for
     *        that element's tooltip to be 'se', preserving the southern
     *        component.
     */
     $.fn.tipsy.autoBounds = function(margin, prefer) {
		return function() {
			var dir = {ns: prefer[0], ew: (prefer.length > 1 ? prefer[1] : false)},
			    boundTop = $(document).scrollTop() + margin,
			    boundLeft = $(document).scrollLeft() + margin,
			    $this = $(this);

			if ($this.offset().top < boundTop) dir.ns = 'n';
			if ($this.offset().left < boundLeft) dir.ew = 'w';
			if ($(window).width() + $(document).scrollLeft() - $this.offset().left < margin) dir.ew = 'e';
			if ($(window).height() + $(document).scrollTop() - $this.offset().top < margin) dir.ns = 's';

			return dir.ns + (dir.ew ? dir.ew : '');
		}
	};

})(jQuery);

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);