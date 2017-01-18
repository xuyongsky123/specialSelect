;(function($){
	//默认参数及其介绍
	var defaults = {
		width:200,		//在autoWidth:false条件下选择框的默认宽度200，受autoWidth制约
		autoWidth:true,		//自适应全部宽度
		showNum:5,			//在autoHeight:false条件下默认显示子项数，默认显示五项，受autoHeight制约
		autoHeight:false,	//自适应全部高度，及子项全部显示
		nullItemWidth:200	//当选择框为空（无可选项）时，默认选择框的宽度设定
	};

	//初始化提示
	var _defaultTip = '请选择';

	//判断是否为数组
	function _isArray(o){
	    return Object.prototype.toString.call(o)=='[object Array]';
	}

	//格式化所有选择框
	$.fn.specialSelect = function(options){
		//原始选择对象
		var _this = this;

		//参数扩展
		var sets = $.extend(true,{},defaults,options);

		_this.each(function(){
			var singleHeight = 0;
			var singleWidth = 0;
			var setHeight = 0;
			var __this = $(this);
			var _child = __this.children('.select_inner');
			var itemNum = __this.find('.select_inner li').length;
			//初始化宽度
			__this.css('width','auto');
			_child.css('width','auto');

			if(itemNum != 0){
				__this.find('.select_inner li').each(function(){
					//样式初始化--宽度初始化
					if(($(this).width()+24+2) > singleWidth){
						singleWidth = $(this).width()+24+2;
					}

					singleHeight = $(this).height();
					

					//数据初始化
					if($(this).attr('data-selected') == 'selected'){
						__this.children('.show_text').text($(this).text());
						__this.children('.sub_data').val($(this).attr('data-value'));
					}
				});
			}else{
				singleWidth = sets.nullItemWidth;
				singleHeight = 0;
			}
			//样式初始化--宽度初始化
			if(sets.autoWidth){
				__this.css('width',singleWidth); 
				_child.css('width',singleWidth);
			}else{
				__this.css('width',sets.width); 

				if(singleWidth > sets.width){
					_child.css('width','auto');
				}else{
					_child.css('width','100%');
				}
			}
			//样式初始化--高度初始化
			if(sets.autoHeight){
				_child.css({
					'height':'auto',
					'overflow':'auto'
				});
			}else{
				setHeight = singleHeight*sets.showNum;
				if(itemNum < sets.showNum){
					setHeight = singleHeight*itemNum;
				}
				
				_child.css({
					'height':setHeight,
					'overflow':'hidden',
					'overflow-y':'scroll'
				});
				if(singleHeight == 0){
					_child.hide();
				}
			}

		});
		_this.unbind('click').click(function(e){
			if($(this).find('.select_inner').css('visibility') != 'visible'){
				//初始化关闭下拉内容
				$('.select_inner').css('visibility','hidden');

				$(this).find('.select_inner').css('visibility','visible');


				$(document).one('click',function(){
					$(this).find('.select_inner').css('visibility','hidden');
				});


				e.stopPropagation();
				
			}else{
				$(this).find('.select_inner').css('visibility','hidden');
			}

			
		}).removeClass('dis_select_box').find('.select_inner li').click(function(){
			var _parent = $(this).parent().parent();
			_parent.children('.show_text').text($(this).text());
			_parent.children('.sub_data').val($(this).attr('data-value'));
			$(this).attr('data-selected','selected').siblings().removeAttr('data-selected');
			
		});


		return this;

	};

	//禁用选择(控制禁用选择框)
	$.fn.disableSpecialSelect = function(){
		this.unbind('click').addClass('dis_select_box');

		return this
	};

	//恢复可用(控制恢复选择框可用)
	$.fn.enableSpecialSelect = function(){
		this.unbind('click').click(function(e){
			if($(this).find('.select_inner').css('visibility') != 'visible'){
				//初始化关闭下拉内容
				$('.select_inner').css('visibility','hidden');

				$(this).find('.select_inner').css('visibility','visible');


				$(document).one('click',function(){
					$(this).find('.select_inner').css('visibility','hidden');
				});

				e.stopPropagation();
				
			}else{
				$(this).find('.select_inner').css('visibility','hidden');
			}
		}).removeClass('dis_select_box').find('.select_inner li').click(function(){
			var _parent = $(this).parent().parent();
			_parent.children('.show_text').text($(this).text());
			_parent.children('.sub_data').val($(this).attr('data-value'));
			$(this).attr('data-selected','selected').siblings().removeAttr('data-selected');
			
		});

		return this;
	};

	//获取选择框选中的值
	$.fn.getSpecialSelectValue = function(opts){
		if(opts == 'text'){
			if(this.find('.sub_data').val() != "" && this.find('.sub_data').val() != null){
				return this.find('.show_text').text();
			}else{
				return '';
			}
		}else{
			return this.find('.sub_data').val();
		}

		return this;
	};

	//生成新的下拉选项
	var _createNewItems = function(dom,dataArray,valueField,textField){
		if(!_isArray(dataArray)){
			return null;
		}

		var htmlTmp = '';
		for(var i= 0;i<dataArray.length;i++){
			htmlTmp += '<li data-value="'+dataArray[i][valueField]+'">'+dataArray[i][textField]+'</li>';
		}
		dom.find('.select_inner').empty().append(htmlTmp).show();
		dom.specialSelect(defaults);
		//初始化值
		dom.children('.show_text').text(_defaultTip);
		dom.children('.sub_data').val('');
	};

	//动态加载数据生成选择框元素（选项）
	$.fn.createSpecialSelect = function(opts){
		var _this = this;

		if(opts.data){

			if(_isArray(opts.data)){
				_createNewItems(_this,opts.data,opts.valueField,opts.textField);
			}
			
		}else{
			if(opts.url){
				$.post(opts.url,opts.params,function(data, textStatus, jqXHR){
					if(data){
						data =  eval('(' + data + ')');

						_createNewItems(_this,data,opts.valueField,opts.textField);
					}
				});
			}
		}

		return this;
		
	};

})(jQuery);