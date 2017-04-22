/*专门用于localStorage的存储组件*/
export function saveToLocal(id, key, value) {
	let seller = window.localStorage.__seller__;  /*设置一个键为seller用来保存商家*/
	if (!seller) {   /*如果这个seller键不存在则创建这个对象，并且设置seller的id属性为一个｛｝*/
		seller = {};
		seller[id] = {};
	} else {   /*如果有seller，先解析，再判断有没有id，没有就创建*/
		seller = JSON.parse(seller);
		if (!seller[id]) {
			seller[id] = {};
		}
	}
	seller[id][key] = value;  /*最后都将value保存在id的key中*/
	window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal(id, key, def) {  /*def为默认值*/
	let seller = window.localStorage.__seller__;  /*设置一个seller对象用来获取商家信息*/
	if (!seller) {   /*如果seller不存在则返回默认值*/
		return def;
	}
	seller = JSON.parse(seller)[id]; /*如果存在seller则解析seller[id]保存为seller*/
	if (!seller) {  /*如果不存在seller（即存在seller但无id）则返回默认值*/
		return def;
	}
	let ret = seller[key]; /*如果存在则获取到key的值返回*/
	return ret || def;
};
