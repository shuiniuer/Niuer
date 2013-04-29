Niuer
=====

自己动手写一个简单的库，主要目的是为了提升自己的JavaScript能力，以学习的姿态先学会造轮子，然后才能更好地运用市面上先进的轮子。当然一个人的精力毕竟有限，Niuer不会有jQuery那么强大，希望后期有同学能和我一起优化，说不一定哪一天Niuer就火了呢！！！<br/>
Niuer(牛耳)库zip下载地址：<a href="https://github.com/shuiniuer/Niuer/archive/master.zip" target="_blank">https://github.com/shuiniuer/Niuer/archive/master.zip</a>
<br/>
<br/>
===============================Niuer的调用方式===2013-4-29======================<br/>
注意:下文中niuer和Niuer的区别。<br/>
Niuer库的调用方式很简单，和jQuery的调用方式一样:niuer().fn()（代表你要调用的方法名），同时也支持链式调用，如:niuer().fn1().fn2()。<br/>
现在支持niuer(this)的方式来创建以当前正在操作的元素来创建新的Niuer对象。<br/>
现在支持的方法列表:<br/>
<div style="padding-left:20px;line-height:20px;">
getById(id) 通过id获取节。串<br/>
getByTagName(tag) 通过标签名获取节点。<br/>
getByName(name) 通过属性名获取节点。<br/>
getByClass(className,idName) 通过class获取元素，idName为可选参数。<br/> 
css(attr,value)操作css的方法，value为可选参数，value存在表示为赋值操作，不存在表示取值操作。<br/>
addClass(className)添加class的方法。<br/>
removeClass(className)移除class的方法。<br/>
getElement(num)获取Niuer对象里面某个元素的方法，返回的依旧是一个Niuer对象。<br/>
addRule(num, selectorText, cssText, position) 添加link或style的CSS规则，不建议使用。<br/>
removeRule(num, index) 移除link或style的CSS规则，不建议使用。<br/>
html(str,append) 操作元素内部html的方法，append==true是在原来基础上面添加html，append==false是替换原来的html。<br/>
hover(over, out) 设置鼠标移入移出方法,over和out均为Function,over表示移入时的操作,out表示移除时的操作。<br/>
show() 显示元素的方法。<br/>
hide() 隐藏元素的方法。<br/>
click(fn) 为选中素绑定click事件的方法，fn是一个Function。<br/>
Niuer库才刚刚开始，功能和性能还很弱，但是我相信总有天她会强大起来。<br/>
</div>
<br/>
<br/>
Niuer(牛耳)库zip下载地址：<a href="https://github.com/shuiniuer/Niuer/archive/master.zip" target="_blank">https://github.com/shuiniuer/Niuer/archive/master.zip</a>
