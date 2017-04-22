export function formatDate(date, str) {
	if (/(y+)/.test(str)) {  /*利用正则test匹配到yyyy部分替换成计算后的年份*/
    /*利用正则的 RegExp.$1方法捕获到 分组的内容*/  /*4-length是为了放置年份为2位则截取后两位*/
		str = str.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {  /*设置一个对象要保存 各时间*/
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(str)) {  /*利用${k}表示数组里每项时间，即分别进行匹配捕获*/
			let string = o[k] + '';  /*将时间转化为字符串*/
      /*判断数字位数，如果1位调用padLeftZero方法加0，再 替换str为捕获的内容*/
      str = str.replace(RegExp.$1, (RegExp.$1.length === 1) ? string : padLeftZero(string));
		}
	}
	return str;
};

function padLeftZero(str) {
	return ('00' + str).substr(str.length); /*利用substr从数组长度的位数开始截取字符串（1位前面加0，2位不变）*/
}
