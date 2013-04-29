var niuer=(function(){
	function Niuer() {
		//创建一个数组，来保存获取的节点和节点数组
		this.elements = [];
		if (_this != undefined) {//如果传入了this则是基于当前传入的元素创建一个Niuer对象
			this.elements[0] = _this;
		}
	}

	//通过id获取元素
	Niuer.prototype.getById = function (id) {
		this.elements.push(document.getElementById(id));
		return this;
	}

	//通过元素名称获取元素
	Niuer.prototype.getByTagName = function (tag) {
		var tags = document.getElementsByTagName(tag);
		for (var i = 0; i < tags.length; i ++) {
			this.elements.push(tags[i]);
		}
		return this;
	}

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
			if (arguments.length == 1) {//如果只有一个参数返回获取到的第一个元素的attr的值
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

	//添加Class
	Niuer.prototype.addClass = function (className) {
		for (var i = 0; i < this.elements.length; i ++) {
			if (!this.elements[i].className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'))) {
				this.elements[i].className += ' ' + className;
			}
		}
		return this;
	}

	//移除Class
	Niuer.prototype.removeClass = function (className) {
		for (var i = 0; i < this.elements.length; i ++) {
			if (this.elements[i].className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'))) {
				this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' +className +'(\\s|$)'), ' ');
			}
		}
		return this;
	}

	//获取某一个元素
	Niuer.prototype.getElement = function (num) {	
		var element = this.elements[num];
		this.elements = [];
		this.elements[0] = element;
		return this;
	}

	//通过CLASS获取元素数组
	Niuer.prototype.getByClass = function (className, idName) {
		var node = null;
		if (arguments.length == 2) {
			node = document.getElementById(idName);
		} else {
			node = document;
		}
		var all = node.getElementsByTagName('*');
		for (var i = 0; i < all.length; i ++) {
			if (all[i].className == className) {
				this.elements.push(all[i]);
			}
		}
		return this;
	}

	//添加link或style的CSS规则
	//不常用不过还是写上去
	Niuer.prototype.addRule = function (num, selectorText, cssText, position) {
		var sheet = document.styleSheets[num];
		if (typeof sheet.insertRule != 'undefined') {//W3C
			sheet.insertRule(selectorText + '{' + cssText + '}', position);
		} else if (typeof sheet.addRule != 'undefined') {//IE
			sheet.addRule(selectorText, cssText, position);
		}
		return this;
	}

	//移除link或style的CSS规则
	//不常用不过还是写上去
	Niuer.prototype.removeRule = function (num, index) {
		var sheet = document.styleSheets[num];
		if (typeof sheet.deleteRule != 'undefined') {//W3C
			sheet.deleteRule(index);
		} else if (typeof sheet.removeRule != 'undefined') {//IE
			sheet.removeRule(index);
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

	//设置鼠标移入移出方法
	Niuer.prototype.hover = function (over, out) {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].onmouseover = over;
			this.elements[i].onmouseout = out;
		}
		return this;
	};

	//设置显示
	Niuer.prototype.show = function () {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].style.display = 'block';
		}
		return this;
	}

	//设置隐藏
	Niuer.prototype.hide = function () {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].style.display = 'none';
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

	return function(_this){
		return new Niuer(_this);
	}
})();
