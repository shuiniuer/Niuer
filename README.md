Niuer
=====

自己动手写一个简单的库，主要目的是为了提升自己的JavaScript能力，以学习的姿态先学会造轮子，然后才能更好地运用市面上先进的轮子。当然一个人的精力毕竟有限，Niuer不会有jQuery那么强大，希望后期有同学能和我一起优化，说不一定哪一天Niuer就火了呢！！！<br/>
Niuer(牛耳)库zip下载地址：<a href="https://github.com/shuiniuer/Niuer/archive/master.zip" target="_blank">https://github.com/shuiniuer/Niuer/archive/master.zip</a>
<br/>
Niuer(牛耳)库代码查看地址：<a href="https://github.com/shuiniuer/Niuer/blob/master/niuer.js" target="_blank">https://github.com/shuiniuer/Niuer/blob/master/niuer.js</a>
<br/>
Niuer(牛耳)库在线调用地址：<a href="https://rawgithub.com/shuiniuer/Niuer/master/niuer.js" target="_blank">https://rawgithub.com/shuiniuer/Niuer/master/niuer.js</a>
<br/>
<br/>
===============================Niuer的调用方式=========================<br/>
注意:下文中niuer和Niuer的区别。<br/>
Niuer库的调用方式很简单，和jQuery的调用方式一样:<b>niuer().fn()</b>（fn代表你要调用的方法名），同时也支持链式调用，如:<b>niuer().fn1().fn2()</b>。<br/>
现在支持以niuer(this)的方式用当前正在操作的元素来创建新的Niuer对象。<br/>
现在支持的方法列表:<br/>
<div>
1、<b>getById(id)</b> 通过id获取节点元素<br/>
2、<b>getByTagName(tag)</b> 通过标签名获取节点元素。<br/>
3、<b>getByName(name)</b> 通过属性名获取节点元素。<br/>
4、<b>getByClass(className,idName)</b> 通过class获取元素，idName为可选参数。<br/> 
5、<b>css(attr,value)</b> 操作css的方法，value为可选参数，value存在表示为赋值操作，不存在表示取值操作。<br/>
6、<b>addClass(className)</b> 添加class的方法。<br/>
7、<b>removeClass(className)</b> 移除class的方法。<br/>
8、<b>getElement(num)</b> 获取Niuer对象里面某个元素的方法，返回的依旧是一个Niuer对象。<br/>
9、<b>addRule(num, selectorText, cssText, position)</b> 添加link或style的CSS规则，不建议使用。<br/>
10、<b>removeRule(num, index)</b> 移除link或style的CSS规则，不建议使用。<br/>
11、<b>html(str,append)</b> 操作元素内部html的方法，append==true是在原来基础上面添加html，append==false是替换原来的html。<br/>
12、<b>hover(over, out)</b> 设置鼠标移入移出方法,over和out均为Function,over表示移入时的操作,out表示移除时的操作。<br/>
13、<b>show()</b> 显示元素的方法。<br/>
14、<b>hide()</b> 隐藏元素的方法。<br/>
15、<b>click(fn)</b> 为选中素绑定click事件的方法，fn是一个Function。<br/>
16、<b>center(width,height)</b> 设置元素在浏览器窗口垂直左右居中的方法。width和height均为数字<br/>
17、<b>resize(fn)</b> 触发浏览器窗口resize事件的方法，fn是一个Function。<br/>
18、<b>ajax(obj)</b> 异步请求的ajax方法，obj是一个key-value的对象。<br/>
19、<b>animate(obj)</b> 动画方法，obj是一个key-value的对象。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;动画的使用方法:
<pre>
	animate({
		attr:'',//动画属性，大小(w||h)，位置(x||y)，透明度(0)
		start:'',//初始状态，整数
		time:'',//步时，每一次变化间隔的时间，整数（毫秒）
		step:'',//步值，每一次变化的数值，整数
		alter:'',//变化值，整数
		target:'',//目标状态，整数
		speed:'',//动画的速度，整数
		type:''//是否有缓动的效果:0不缓动，1缓动
		
	});
</pre>
</div>
<br/>
Niuer(牛耳)库zip下载地址：<a href="https://github.com/shuiniuer/Niuer/archive/master.zip" target="_blank">https://github.com/shuiniuer/Niuer/archive/master.zip</a><br/>
Niuer(牛耳)库代码查看地址：<a href="https://github.com/shuiniuer/Niuer/blob/master/niuer.js" target="_blank">https://github.com/shuiniuer/Niuer/blob/master/niuer.js</a>
<br/>
Niuer(牛耳)库在线调用地址：<a href="https://rawgithub.com/shuiniuer/Niuer/master/niuer.js" target="_blank">https://rawgithub.com/shuiniuer/Niuer/master/niuer.js</a>
