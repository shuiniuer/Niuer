//jQuery闭包写法
(function($){
	function init(){
		alert();
	}
	$(document).ready(function(){
 		init();
	});
})(jQuery);

//单例模式
var SingletonBuild=(function(){
	function Singleton(args){
		var args=args||{};
		this.name=args.name;
	}

	var instance;

	var _static={
		getInstance:function(args){
			if(instance===undefined){
				instance=new Singleton(args);
			}
			return instance;
		}	
	}
	return _static;
})();
