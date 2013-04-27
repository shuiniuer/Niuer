function Niuer() {
	//创建一个数组，来保存获取的节点和节点数组
	this.elements = [];
}

//通过id获取元素
Niuer.prototype.getById = function (id) {
	this.elements.push(document.getElementById(id));
	return this;
};

//通过元素名称获取元素
Niuer.prototype.getByTagName = function (tag) {
	var tags = document.getElementsByTagName(tag);
	for (var i = 0; i < tags.length; i ++) {
		this.elements.push(tags[i]);
	}
	return this;
};

//通过name属性获取元素
Niuer.prototype.getByName=function(name){
	var tags=document.getElementsByName(name);
	for(var i=0; i < tags.length; i ++){
		this.elements.push(tags[i]);
	}
	return this;
}

//操作css的方法
//只做了简单的css属性赋值和取值操作
Niuer.prototype.css = function (attr, value) {
	for (var i = 0; i < this.elements.length; i ++) {//返回计算后的css属性值
		if (arguments.length == 1) {
			if (typeof window.getComputedStyle != 'undefined') {//W3C
				return window.getComputedStyle(this.elements[i], null)[attr];
			} else if (typeof this.elements[i].currentStyle != 'undeinfed') {//IE
				return this.elements[i].currentStyle[attr];
			}
		}
		this.elements[i].style[attr] = value;
	}
	return this;
}

//操作元素内部html的方法
//append==true是在原来基础上面添加html
//append==false是替换原来的html
Niuer.prototype.html = function (str,append) {
	if (arguments.length == 0) {//如果只有一个参数则返回获取到的第一个元素的innerHTML;
		return this.elements[0].innerHTML;
	}
	for (var i = 0; i < this.elements.length; i ++) {
		append ? (this.elements[i].innerHTML += str):(this.elements[i].innerHTML = str);
	}
	return this;
}

//为选中素绑定click事件的方法
Niuer.prototype.click = function (fn) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].onclick = fn;
	}
	return this;
}
