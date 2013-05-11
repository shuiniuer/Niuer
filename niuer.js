var niuer=(function(){
    /**
     * 构造函数
     * @param _this 构造对象
     * @constructor
     */
	function Niuer(_this) {
        /**
         * 创建一个数组，来保存获取的节点和节点数组
         * @type {Array}
         */
		this.elements = [];
		if (_this != undefined) {//如果传入了this则是基于当前传入的元素创建一个Niuer对象
			this.elements[0] = _this;
		}
	}

    /**
     * 通过id获取元素
     * @param id ID
     * @returns {*} Niuer对象
     */
	Niuer.prototype.getById = function (id) {
		this.elements.push(document.getElementById(id));
		return this;
	}

    /**
     * 通过元素名称获取元素
     * @param tag html标签名
     * @returns {*} Niuer对象
     */
	Niuer.prototype.getByTagName = function (tag) {
		var tags = document.getElementsByTagName(tag);
		for (var i = 0; i < tags.length; i ++) {
			this.elements.push(tags[i]);
		}
		return this;
	}

    /**
     * 通过name属性获取元素
     * @param name dom的name属性
     * @returns {*} Niuer对象
     */
	Niuer.prototype.getByName=function(name){
		var tags=document.getElementsByName(name);
		for(var i=0; i < tags.length; i ++){
			this.elements.push(tags[i]);
		}
		return this;
	}

    /**
     * 操作css的方法
     * 只做了简单的css属性赋值和取值操作
     * @param attr css属性
     * @param value css值[可选，当为空时获取css值]
     * @returns {*} Niuer对象
     */
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

    /**
     * 添加Class
     * @param className 类名
     * @returns {*} Niuer对象
     */
	Niuer.prototype.addClass = function (className) {
		for (var i = 0; i < this.elements.length; i ++) {
			if (!this.elements[i].className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'))) {
				this.elements[i].className += ' ' + className;
			}
		}
		return this;
	}

    /**
     * 移除Class
     * @param className 类名
     * @returns {*} Niuer对象
     */
	Niuer.prototype.removeClass = function (className) {
		for (var i = 0; i < this.elements.length; i ++) {
			if (this.elements[i].className.match(new RegExp('(\\s|^)' +className +'(\\s|$)'))) {
				this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' +className +'(\\s|$)'), ' ');
			}
		}
		return this;
	}

    /**
     * 获取某一个元素
     * @param num Niuer对象中的dom索引
     * @returns {*} Niuer对象
     */
	Niuer.prototype.getElement = function (num) {	
		var element = this.elements[num];
		this.elements = [];
		this.elements[0] = element;
		return this;
	}

    /**
     * 通过CLASS获取元素数组
     * @param className class
     * @param idName ID
     * @returns {*} Niuer对象
     */
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

    /**
     * 添加link或style的CSS规则
     * 不常用不过还是写上去
     * @param num style标签索引
     * @param selectorText css选择器
     * @param cssText css代码
     * @param position 插入位置
     * @returns {*} Niuer对象
     */
	Niuer.prototype.addRule = function (num, selectorText, cssText, position) {
		var sheet = document.styleSheets[num];
		if (typeof sheet.insertRule != 'undefined') {//W3C
			sheet.insertRule(selectorText + '{' + cssText + '}', position);
		} else if (typeof sheet.addRule != 'undefined') {//IE
			sheet.addRule(selectorText, cssText, position);
		}
		return this;
	}

    /**
     * 移除link或style的CSS规则
     * 不常用不过还是写上去
     * @param num style标签索引
     * @param index css规则索引
     * @returns {*} Niuer对象
     */
	Niuer.prototype.removeRule = function (num, index) {
		var sheet = document.styleSheets[num];
		if (typeof sheet.deleteRule != 'undefined') {//W3C
			sheet.deleteRule(index);
		} else if (typeof sheet.removeRule != 'undefined') {//IE
			sheet.removeRule(index);
		}
		return this;
	}

    /**
     * 操作元素内部html的方法
     * append==true是在原来基础上面添加html
     * append==false是替换原来的html
     * @param str html字符串
     * @param {bool} append append开关
     * @returns {*} Niuer对象
     */
	Niuer.prototype.html = function (str,append) {
		if (arguments.length == 0) {//如果只有一个参数则返回获取到的第一个元素的innerHTML;
			return this.elements[0].innerHTML;
		}
		for (var i = 0; i < this.elements.length; i ++) {
			append ? (this.elements[i].innerHTML += str):(this.elements[i].innerHTML = str);
		}
		return this;
	}

    /**
     * 设置鼠标移入移出方法
     * @param over 移入事件函数
     * @param out 移出时间函数
     * @returns {*} Niuer对象
     */
	Niuer.prototype.hover = function (over, out) {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].onmouseover = over;
			this.elements[i].onmouseout = out;
		}
		return this;
	};

    /**
     * 设置显示
     * @returns {*} Niuer对象
     */
	Niuer.prototype.show = function () {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].style.display = 'block';
		}
		return this;
	}

    /**
     * 设置隐藏
     * @returns {*} Niuer对象
     */
	Niuer.prototype.hide = function () {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].style.display = 'none';
		}
		return this;
	}

    /**
     * 为选中素绑定click事件的方法
     * @param fn 事件函数
     * @returns {*} Niuer对象
     */
	Niuer.prototype.click = function (fn) {
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].onclick = fn;
		}
		return this;
	}

    /**
     * 设置元素在浏览器窗口垂直左右居中
     * @param width 宽
     * @param height 高
     * @returns {*} Niuer对象
     */
	Niuer.prototype.center = function (width, height) {
		var top = (document.documentElement.clientHeight - width) / 2;
		var left = (document.documentElement.clientWidth - height) / 2;
		for (var i = 0; i < this.elements.length; i ++) {
			this.elements[i].style.top = top + 'px';
			this.elements[i].style.left = left + 'px';
		}
		return this;
	}

    /**
     * 触发浏览器窗口resize事件
     * @param fn 事件函数
     * @returns {*} Niuer对象
     */
	Niuer.prototype.resize = function (fn) {
		window.onresize = fn;
		return this;
	}
    /**
     * LocalStorage存取
     * 指令模式，参数{"clear"}，清空所有数据
     * @param key 键
     * @param value 值
     * @return {*}
     * @constructor
     */
    Niuer.prototype.LS=function(key,value) {
        if (!window.localStorage) {
            throw Error("浏览器不支持LocalStorage");
        }
        if (arguments.length == 1) {
            var a = arguments[0];
            if("object"==typeof(a)&&a[0]=="clear"){
                window.localStorage.clear();
                return "cleared";
            }else{
                return window.localStorage.getItem(a);
            }
        } else {
            if (arguments.length == 2) {
                var a = arguments[0];
                var b = arguments[1];
                window.localStorage.removeItem(a);
                if (b) {
                    window.localStorage.setItem(a, b)
                }
            } else {
                alert("参数错误\n1个参数：get(key)\n2个参数：set(key,value)")
            }
        }
    };




    ////////////////////////////////////////////////////////////////////////////////
    /**
     * 返回Niuer对象
     */
	return function(_this){
		return new Niuer(_this);
	}
})();

(function (a) {
    a.fn.extend({
        "star" : function (h, g) {}
    })
})(niuer);
