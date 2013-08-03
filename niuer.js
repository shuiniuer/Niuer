var niuer = (function() {
	function Niuer(_this) {
		//创建一个数组，来保存获取的节点和节点数组
		this.elements = [];
		if (_this != undefined) { //如果传入了this则是基于当前传入的元素创建一个Niuer对象
			this.elements[0] = _this;
		}
	}

	//通过id获取元素
	Niuer.prototype.getById = function(id) {
		this.elements.push(document.getElementById(id));
		return this;
	}

	//通过元素名称获取元素
	Niuer.prototype.getByTagName = function(tag) {
		var tags = document.getElementsByTagName(tag);
		for (var i = 0; i < tags.length; i++) {
			this.elements.push(tags[i]);
		}
		return this;
	}

	//通过name属性获取元素
	Niuer.prototype.getByName = function(name) {
		var tags = document.getElementsByName(name);
		for (var i = 0; i < tags.length; i++) {
			this.elements.push(tags[i]);
		}
		return this;
	}

	//操作css的方法
	//只做了简单的css属性赋值和取值操作
	Niuer.prototype.css = function(attr, value) {
		for (var i = 0; i < this.elements.length; i ++) {
		if (arguments.length == 1) {
				return niuer.outerTools.getStyle(this.elements[i], attr);
			}
			this.elements[i].style[attr] = value;
		}
		return this;
	}

	//添加Class
	Niuer.prototype.addClass = function(className) {
		for (var i = 0; i < this.elements.length; i ++) {
		if (!niuer.outerTools.hasClass(this.elements[i], className)) {
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
	}

	//移除Class
	Niuer.prototype.removeClass = function(className) {
		for (var i = 0; i < this.elements.length; i++) {
			if (niuer.outerTools.hasClass(this.elements[i], className)) {
				this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'), ' ');
			}
		}
		return this;
	}

	//获取某一个元素
	Niuer.prototype.getElement = function(num) {
		var element = this.elements[num];
		this.elements = [];
		this.elements[0] = element;
		return this;
	}

	//通过CLASS获取元素数组
	Niuer.prototype.getByClass = function(className, idName) {
		var node = null;
		if (arguments.length == 2) {
			node = document.getElementById(idName);
		} else {
			node = document;
		}
		var all = node.getElementsByTagName('*');
		for (var i = 0; i < all.length; i++) {
			if (all[i].className == className) {
				this.elements.push(all[i]);
			}
		}
		return this;
	}

	//添加link或style的CSS规则
	//不常用不过还是写上去
	Niuer.prototype.addRule = function(num, selectorText, cssText, position) {
		var sheet = document.styleSheets[num];
		Niuer.innerTools.insertRule(sheet, selectorText, cssText, position);
		return this;
	}

	//移除link或style的CSS规则
	//不常用不过还是写上去
	Niuer.prototype.removeRule = function(num, index) {
		var sheet = document.styleSheets[num];
		Niuer.innerTools.deleteRule(sheet, index);
		return this;
	}

	//操作元素内部html的方法
	//append==true是在原来基础上面添加html
	//append==false是替换原来的html
	Niuer.prototype.html = function(str, append) {
		if (arguments.length == 0) { //如果只有一个参数则返回获取到的第一个元素的innerHTML;
			return this.elements[0].innerHTML;
		}
		for (var i = 0; i < this.elements.length; i++) {
			append ? (this.elements[i].innerHTML += str) : (this.elements[i].innerHTML = str);
		}
		return this;
	}

	//设置鼠标移入移出方法
	Niuer.prototype.hover = function(over, out) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].onmouseover = over;
			this.elements[i].onmouseout = out;
		}
		return this;
	};

	//设置显示
	Niuer.prototype.show = function() {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display = 'block';
		}
		return this;
	}

	//设置隐藏
	Niuer.prototype.hide = function() {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.display = 'none';
		}
		return this;
	}

	//为选中素绑定click事件的方法
	Niuer.prototype.click = function(fn) {
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].onclick = fn;
		}
		return this;
	}

	//设置元素在浏览器窗口垂直左右居中
	Niuer.prototype.center = function(width, height) {
		var top = (niuer.outerTools.getInner().width - width) / 2;
		var left = (niuer.outerTools.getInner().height - height) / 2;
		for (var i = 0; i < this.elements.length; i++) {
			this.elements[i].style.top = top + 'px';
			this.elements[i].style.left = left + 'px';
		}
		return this;
	}
	
	//锁屏
	Niuer.prototype.lock = function () {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].style.width = niuer.outerTools.getInner().width + 'px';
			this.elements[i].style.height = niuer.outerTools.getInner().height + 'px';
			this.elements[i].style.display = 'block';
			document.documentElement.style.overflow = 'hidden';
		}
		return this;
	};
	
	//解锁
	Niuer.prototype.unlock = function () {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].style.display = 'none';
			document.documentElement.style.overflow = 'auto';
		}
		return this;
	}
	
	//触发浏览器窗口resize事件
	Niuer.prototype.resize = function(fn) {
		for (var i = 0; i < this.elements.length; i ++) {
			var element = this.elements[i];
			window.onresize = function () {
				fn();
				if (element.offsetLeft > niuer.outerTools.getInner().width - element.offsetWidth) {
					element.style.left = niuer.outerTools.getInner().width - element.offsetWidth + 'px';
				}
				if (element.offsetTop > niuer.outerTools.getInner().height - element.offsetHeight) {
					element.style.top = niuer.outerTools.getInner().height - element.offsetHeight + 'px';
				}
			};
		}
		return this;
	}
	
	//实现拖动功能
	Niuer.prototype.drag = function () {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].onmousedown = function (e) {
				preDef(e);
				var e = niuer.outerTools.getEvent(e);
				var _this = this;
				var diffX = e.clientX - _this.offsetLeft;
				var diffY = e.clientY - _this.offsetTop;
				if (typeof _this.setCapture != 'undefined') {
					_this.setCapture();
				} 
				document.onmousemove = function (e) {
					var e = niuer.outerTools.getEvent(e);
					var left = e.clientX - diffX;
					var top = e.clientY - diffY;
					if (left < 0) {
						left = 0;
					} else if (left > getInner().width - _this.offsetWidth) {
						left = getInner().width - _this.offsetWidth;
					}
					
					if (top < 0) {
						top = 0;
					} else if (top > getInner().height - _this.offsetHeight) {
						top = getInner().height - _this.offsetHeight;
					}
					
					_this.style.left = left + 'px';
					_this.style.top = top + 'px';
				} 
				document.onmouseup = function () {
					this.onmousemove = null;
					this.onmouseup = null;
					if (typeof _this.releaseCapture != 'undefined') {
						_this.releaseCapture();
					}
				}
			};
		}
		return this;
	}

	
	//简单封装ajax
	Niuer.prototype.ajax = function(obj) {
		var xhr = Niuer.innerTools.createXHR();
		obj.url = obj.url + '?rand=' + Math.random();
		obj.data = params(obj.data);
		if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
		if (obj.async === true) {
			xhr.onreadystatechange = function() {
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
				obj.success(xhr.responseText); //回调传递参数
			} else {
				alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
			}
		}
		return this; //这一块儿有点儿乱，到底用不用返回this？是为每个对象创建一个ajax对象，还是只需要一个全局的就可以了呢？
	}
	
	//动画
	Niuer.prototype.animate=function(obj){
		for (var i = 0; i < this.elements.length; i ++) {
			var element = this.elements[i];
			var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : 
						   obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : 
						   obj['attr'] == 'o' ? 'opacity' : 'left';

			
			var start = obj['start'] != undefined ? obj['start'] : 
							attr == 'opacity' ? parseFloat(getStyle(element, attr)) * 100 : 
													   parseInt(getStyle(element, attr));
			
			var t = obj['t'] != undefined ? obj['t'] : 30;//可选，默认30毫秒执行一次
			var step = obj['step'] != undefined ? obj['step'] : 10;//可选，每次运行10像素
			
			var alter = obj['alter'];
			var target = obj['target'];
			var speed = obj['speed'] != undefined ? obj['speed'] : 6;//可选，默认缓冲速度为6
			var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';//可选，0表示匀速，1表示缓冲，默认缓冲
			
			
			if (alter != undefined && target == undefined) {
				target = alter + start;
			} else if (alter == undefined && target == undefined) {
				throw new Error('alter增量或target目标量必须传一个！');
			}
			
			if (start > target) step = -step;//如果start的值比target的值大则step的值设为负
			
			if (attr == 'opacity') {
				element.style.opacity = parseInt(start) / 100;
				element.style.filter = 'alpha(opacity=' + parseInt(start) +')';
			} else {
				element.style[attr] = start + 'px';
			}
			
			
			clearInterval(window.timer);
			timer = setInterval(function () {
			
				if (type == 'buffer') {
					step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed ://透明度
														 (target - parseInt(getStyle(element, attr))) / speed;//长度
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
				}
				
				if (attr == 'opacity') {
					if (step == 0) {
						setOpacity();
					} else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
						setOpacity();
					} else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
						setOpacity();
					} else {
						var temp = parseFloat(getStyle(element, attr)) * 100;
						element.style.opacity = parseInt(temp + step) / 100;
						element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')'
					}

				} else {
					if (step == 0) {
						setTarget();
					} else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
						setTarget();
					} else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
						setTarget();
					} else {
						element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
					}
				}
			}, t);
			
			function setTarget() {
				element.style[attr] = target + 'px';
				clearInterval(timer);
			}
			
			function setOpacity() {
				element.style.opacity = parseInt(target) / 100;
				element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
				clearInterval(timer);
			}
		}
		return this;
	}
	
	/*=====================不对外开放的工具函数=======================*/
	Niuer.innerTools={
		//创建XMLHttpRequest对象
		createXHR:function(){
			if (typeof XMLHttpRequest != 'undefined') {
				return new XMLHttpRequest();
			} else if (typeof ActiveXObject != 'undefined') {
				var version = [
					'MSXML2.XMLHttp.6.0',
					'MSXML2.XMLHttp.3.0',
					'MSXML2.XMLHttp'];
				for (var i = 0; version.length; i++) {
					try {
						return new ActiveXObject(version[i]);
					} catch (e) {
						//跳过
					}
				}
			} else {
				throw new Error('您的系统或浏览器不支持XHR对象！');
			}
		},
		//跨浏览器添加link规则
		insertRule:function(sheet, selectorText, cssText, position) {
			if (typeof sheet.insertRule != 'undefined') {//W3C
				sheet.insertRule(selectorText + '{' + cssText + '}', position);
			} else if (typeof sheet.addRule != 'undefined') {//IE
				sheet.addRule(selectorText, cssText, position);
			}
		},
		//跨浏览器移出link规则
		deleteRule:function(sheet, index) {
			if (typeof sheet.deleteRule != 'undefined') {//W3C
				sheet.deleteRule(index);
			} else if (typeof sheet.removeRule != 'undefined') {//IE
				sheet.removeRule(index);
			}
		}
	}
	
	return function(_this) {
		return new Niuer(_this);
	}
})();

/*====================对外开放的工具函数========================*/
niuer.outerTools={
	//把键值对转换为‘name=niuer&pass=niuer’形式的字符串
	params:function(data) {
		var arr = [];
		for (var i in data) {
			arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
		}
		return arr.join('&');
	},
	//快浏览器获取视口大小
	getInner:function() {
		if (typeof window.innerWidth != 'undefined') {
			return {
				width : window.innerWidth,
				height : window.innerHeight
			}
		} else {
			return {
				width : document.documentElement.clientWidth,
				height : document.documentElement.clientHeight
			}
		}
	},
	//跨浏览器获取Style
	getStyle:function(element, attr) {
		if (typeof window.getComputedStyle != 'undefined') {//W3C
			return window.getComputedStyle(element, null)[attr];
		} else if (typeof element.currentStyle != 'undeinfed') {//IE
			return element.currentStyle[attr];
		}
	},
	//判断class是否存在
	hasClass:function(element, className) {
		return element.className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'));
	},
	//获取event对象
	getEvent:function(event) {
		return event || window.event;
	},
	//阻止默认行为
	preDef:function(event) {
		var e = getEvent(event);
		if (typeof e.preventDefault != 'undefined') {//W3C
			e.preventDefault();
		} else {//IE
			e.returnValue = false;
		}
	}
}


/*====================标准化事件管理========================*/
niuer.addEvent=function(obj, type, fn) {
	if (typeof obj.addEventListener != 'undefined') {
		obj.addEventListener(type, fn, false);
	} else {
		//创建一个存放事件的哈希表(散列表)
		if (!obj.events) obj.events = {};
		//第一次执行时执行
		if (!obj.events[type]) {	
			//创建一个存放事件处理函数的数组
			obj.events[type] = [];
			//把第一次的事件处理函数先储存到第一个位置上
			if (obj['on' + type]) obj.events[type][0] = fn;
		} else {
			//同一个注册函数进行屏蔽，不添加到计数器中
			if (addEvent.equal(obj.events[type], fn)) return false;
		}
		//从第二次开始我们用事件计数器来存储
		obj.events[type][addEvent.ID++] = fn;
		//执行事件处理函数
		obj['on' + type] = addEvent.exec;
	}
}
//为每个事件分配一个计数器
niuer.addEvent.ID = 1;
//执行事件处理函数
niuer.addEvent.exec = function (event) {
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for (var i in es) {
		es[i].call(this, e);
	}
};
//同一个注册函数进行屏蔽
niuer.addEvent.equal = function (es, fn) {
	for (var i in es) {
		if (es[i] == fn) return true;
	}
	return false;
}
//把IE常用的Event对象配对到W3C中去
niuer.addEvent.fixEvent = function (event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	return event;
};
//IE阻止默认行为
niuer.addEvent.fixEvent.preventDefault = function () {
	this.returnValue = false;
};
//IE取消冒泡
niuer.addEvent.fixEvent.stopPropagation = function () {
	this.cancelBubble = true;
};
//跨浏览器删除事件
niuer.removeEvent=function(obj, type, fn) {
	if (typeof obj.removeEventListener != 'undefined') {
		obj.removeEventListener(type, fn, false);
	} else {
		for (var i in obj.events[type]) {
			if (obj.events[type][i] == fn) {
				delete obj.events[type][i];
			}
		}
	}
}
