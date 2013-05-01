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

	//设置元素在浏览器窗口垂直左右居中
	Niuer.prototype.center = function (width, height) {
		var top = (document.documentElement.clientHeight - width) / 2;
		var left = (document.documentElement.clientWidth - height) / 2;
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].style.top = top + 'px';
			this.elements[i].style.left = left + 'px';
		}
		return this;
	}

	//触发浏览器窗口resize事件
	Niuer.prototype.resize = function (fn) {
		window.onresize = fn;
		return this;
	}
	
	//简单封装ajax
	Niuer.prototype.ajax=function(obj){
		var xhr = createXHR();
		obj.url = obj.url + '?rand=' + Math.random();
		obj.data = params(obj.data);
		if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
		if (obj.async === true) {
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					callback();
				}
			};
		}
		xhr.open(obj.method, obj.url, obj.async);
		if (obj.method === 'post') {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(obj.data);	
		} else {
			xhr.send(null);
		}
		if (obj.async === false) {
			callback();
		}
		function callback() {
			if (xhr.status == 200) {
				obj.success(xhr.responseText);			//回调传递参数
			} else {
				alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
			}	
		}
		return this;
	}

	//工具函数不对外开放
	//创建XMLHttpRequest对象的方法
	function createXHR() {
		if (typeof XMLHttpRequest != 'undefined') {
			return new XMLHttpRequest();
		} else if (typeof ActiveXObject != 'undefined') {
			var version = [
					'MSXML2.XMLHttp.6.0',
					'MSXML2.XMLHttp.3.0',
					'MSXML2.XMLHttp'
			];
			for (var i = 0; version.length; i ++) {
				try {
					return new ActiveXObject(version[i]);
				} catch (e) {
					//跳过
				}	
			}
		} else {
			throw new Error('您的系统或浏览器不支持XHR对象！');
		}
	}

	//工具函数不对外开放
	//把键值对转换为‘name=niuer&pass=niuer’形式的字符串
	function params(data) {
		var arr = [];
		for (var i in data) {
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
		}
		return arr.join('&');
	}
	return function(_this){
		return new Niuer(_this);
	}
})();
