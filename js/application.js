$("#main-container").calendar({
    tipsy_gravity: 's',
    // 你想把tip停靠在哪个方向?(n / s / e / w)
    click_callback: calendar_callback,
    // 回调返回你点击的日期
    year: "2012",
    // 任选的,默认是当前的年份 - 传入一个年份 - 数字或者字符串
    scroll_to_date: true // 是否滚动到当前日期?
});

// 回调函数的例子 - 对返回的值做些事情do something with the returned date
var calendar_callback = function(date) {
    // 返回的日期是一个日期对象,包含了日,月和年.
    // date.day = day; date.month = month; date.year = year;
    alert("打开你的Javascript控制台去看看返回的结果对象.");
    console.log(date);
}


