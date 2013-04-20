/*
*以学习的心态从基本的操作开始先封装三个获取元素节点的方法
*至于选择器之类的东西后期慢慢优化上去
*/
var Base = {
  getId : function (id) {
		return document.getElementById(id)
	},
	getName : function (name) {
		return document.getElementsByName(name)
	},
	getTagName : function (tag) {
		return document.getElementsByTagName(tag);
	}
};
