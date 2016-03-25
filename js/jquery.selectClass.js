function formatSelect(idEle,obj){
	var _this = this;

	this.ele = $('#'+idEle);

	this.defaults = {
		minWidth:150,		//在autoWidth:false条件下选择框的默认宽度150，受autoWidth制约
		autoWidth:true,		//自适应全部宽度
		showNum:5,			//在autoHeight:false条件下默认显示子项数，默认显示五项，受autoHeight制约
		autoHeight:true,	//自适应全部高度，及子项全部显示
		enable:true,		//禁用的选择框与否 （true可用，false不可用）
	};

	this.sets = $.extend(this.defaults,obj);

	this.init();
	this.DIYInit();
}

//不需重复的初始化类
formatSelect.prototype.init = function(){
	var _this = this;
	

	//下拉展示内容实现事件
	_this.ele.click(function(e){
		/*$(this).find('.select_inner').css('visibility',$(this).find('.select_inner').css('visibility') == 'visible' ? 'hidden':'visible');*/

		if($(this).find('.select_inner').css('visibility') != 'visible'){
			//初始化关闭下拉内容
			$('.select_inner').css('visibility','hidden');

			$(this).find('.select_inner').css('visibility','visible');


			$(document).one('click',function(){
				$('.select_inner').css('visibility','hidden');
			});


			e.stopPropagation();
			
		}else{
			$(this).find('.select_inner').css('visibility','hidden');
		}

		
	});

}

//需重复的初始化类
formatSelect.prototype.DIYInit = function(){
	var _this = this;
	var singleHeight;

	//样式初始化--宽度初始化
	_this.ele.find('.select_inner li').each(function(){
		if(_this.sets.autoWidth){
			if($(this).width() >= _this.sets.minWidth){
				_this.sets.minWidth = $(this).width()+2+24;//这24为icon的宽度，避免内容被此icon遮住
			}
			_this.ele.css('width',_this.sets.minWidth); 
			_this.ele.find('.select_inner').css('width',_this.sets.minWidth);
		}else{
			_this.ele.css('width',_this.sets.minWidth); 
		}
		singleHeight = $(this).height();
		

		//数据初始化
		if($(this).attr('data-selected') == 'selected'){
			$(this).parent().parent().children('.show_text').text($(this).text());
			$(this).parent().parent().children('.sub_data').val($(this).attr('data-value'));
		}
	});			


	//样式初始化--高度初始化
	if(_this.sets.autoHeight){
		_this.ele.find('.select_inner').css({
			'height':'auto',
			'overflow':'auto'
		});
	}else{
		_this.ele.find('.select_inner').css({
			'height':singleHeight*_this.sets.showNum,
			'overflow':'hidden',
			'overflow-y':'scroll'
		});
	}

	_this.ele.find('.select_inner li').click(function(){
		$(this).parent().parent().children('.show_text').text($(this).text());
		$(this).parent().parent().children('.sub_data').val($(this).attr('data-value'));
		$(this).attr('data-selected','selected').siblings().removeAttr('data-selected');
		
	});

	//禁用选择(控制禁用选择框)
	if(!_this.sets.enable){
		_this.ele.unbind('click');
		_this.ele.find('li span').css({
			'background':'#eee',
			'cursor':'no-drop'
		});
		_this.ele.find('li i').css({
			'background':'#eee',
			'cursor':'no-drop'
		});
	}

}


//获取所选值
formatSelect.prototype.getSelectedValue = function(nameValue){
	var _this = this;

	return _this.ele.find('.sub_data').val();
}

formatSelect.prototype.refreshSelect = function(actData){
	var _this = this;

	if(actData == '' || actData == null){
		alert('无需要填充此select的内容数据');
		return;
	}else{
		//初始化清空下拉列表内容
		_this.ele.find('.select_inner').html('');

		var result = '';
		var defaultOrder;

		
		for(var i=0;i<actData.alldata.length;i++){
			if("selectedData" in actData){
				if(actData.selectedData >= 0 && actData.selectedData < actData.alldata.length){
					defaultOrder = actData.selectedData;
				}else{
					defaultOrder = 0;//序号超出范围也是默认选中第一个
				}
				
			}else{
				defaultOrder = 0;//默认选中第一个
			}

			if(defaultOrder == i){
				result += '<li data-value="'+actData.alldata[i].dataValue+'" data-selected="selected">'+actData.alldata[i].dataText+'</li>';
			}else{
				result += '<li data-value="'+actData.alldata[i].dataValue+'">'+actData.alldata[i].dataText+'</li>';
			}
			
		}

		_this.ele.find('.select_inner').append(result);


		_this.DIYInit();
	}
}