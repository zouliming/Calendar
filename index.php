<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>
            日历笔记--精彩只为你而留
        </title>
        <!-- Simple CSS file for HTML page -->
        <link rel="stylesheet" href="css/main.css" type="text/css" media="screen" title="no title" charset="utf-8">
        <!-- jCalendar CSS - Contains Tipsy CSS - Delete as needed -->
        <link rel="stylesheet" href="css/rili.css" type="text/css" media="screen" title="no title" charset="utf-8">
        <!-- Source jQuery -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript">
        </script>
        <!-- Source CalendarJS - Contains Tipsy jQuery Plugin - Delete as needed -->
        <script src="js/rili.js" type="text/javascript" charset="utf-8">
        </script>
        <!-- Call the Calendar -->
        <script>
            $(document).ready(function() {
                $("#main-container").calendar({
                    tipsy_gravity: 's',
                    // 你想把tip停靠在哪个方向?(n / s / e / w)
                    click_callback: calendar_callback,
                    // 回调返回你点击的日期
                    year: "2012",
                    // 任选的,默认是当前的年份 - 传入一个年份 - 数字或者字符串
                    scroll_to_date: true // 是否滚动到当前日期?
                });
            });

            //
            // 回调函数的例子 - 对返回的值做些事情do something with the returned date
            var calendar_callback = function(date) {
                // 返回的日期是一个日期对象,包含了日,月和年.
                // date.day = day; date.month = month; date.year = year;
                alert("打开你的Javascript控制台去看看返回的结果对象.");
                console.log(date);
            }
        </script>
    </head>

    <body>
        <div id="header">
            日历笔记 - 此贡献来自于
            <a href="http://johnpatrickgiven.com">
                邹立明
            </a>
            .
        </div>
        <div id="main-container">
            <div id="calendar">
                <div class="year">
                    2
                </div>
                <div class="year">
                    0
                </div>
                <div class="year">
                    1
                </div>
                <div class="year">
                    2
                </div>
                <div id="arrows">
                    <div class="next">
                    </div>
                    <div class="prev">
                    </div>
                </div>
                <div class="clear">
                </div>
                <div id="January">
                </div>
                <div class="label bold" original-title="" style="display: block; ">十</div>
                <div class="label bold" original-title="" style="display: block; ">月</div>
                <div class="clear"></div>
                <?
                $monthDayCount = date('t');
                $today = date('j');
                for($i=1;$i<$monthDayCount+1;$i++){
                ?>
                <div data-date="1/1/2012" class="label day <?=$i==$today?'today':''?>" original-title="Sunday" style="display: block; ">
                    <?=$i?>
                </div>
                <?
                }
                ?>
                <div class="clear"></div>
            </div>
        </div>
    </body>
</html>