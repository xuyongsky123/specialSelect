# specialSelect
specialSelect-plugin-基于jQuery插件开发的自定义插件-重写select选择框，调用实例化，针对单个仿select选择框


html:
    <ul id="test" class="select_box">
  		<li>
  			<input name="a" class="sub_data" type="text" readonly="readonly"/>
  			<span class="show_text">请选择</span><i>▼</i>
  			<ul class="select_inner">
  				<li data-value="1">测试内容一</li>
  				<li data-value="2" data-selected="selected">测试内容二</li>
  				<li data-value="3">测试内容三</li>
  				<li data-value="4">测试内容四</li>
  				<li data-value="5">测试内容五</li>
  			</ul>
  		</li>
  	</ul>
  	
  	 请直接修改“测试内容...”等内容，其他的保持结构及class不变
  	 
  	 
script:
    //模拟数据
	var _data = {
		alldata:[
			{
				dataValue:1,
				dataText:'测试内容1'
			},
			{
				dataValue:2,
				dataText:'测试内容2'
			},
			{
				dataValue:3,
				dataText:'测试内容3'
			},
			{
				dataValue:4,
				dataText:'测试内容4'
			},
			{
				dataValue:5,
				dataText:'测试内容5'
			},
		],
		selectedData:4   //默认选中项序号，序号从0开始
	};

	$(document).ready(function(){
		var _single = new formatSelect('test',{
			minWidth:150,		//在autoWidth:false条件下选择框的默认宽度150，受autoWidth制约
			autoWidth:true,		//自适应全部宽度
			showNum:5,			//在autoHeight:false条件下默认显示子项数，默认显示五项，受autoHeight制约
			autoHeight:false,	//自适应全部高度，及子项全部显示
			enable:true,		//禁用的选择框与否 （true可用，false不可用）
		});



		var _single1 = new formatSelect('test1',{
			minWidth:150,		//在autoWidth:false条件下选择框的默认宽度150，受autoWidth制约
			autoWidth:true,		//自适应全部宽度
			showNum:5,			//在autoHeight:false条件下默认显示子项数，默认显示五项，受autoHeight制约
			autoHeight:false,	//自适应全部高度，及子项全部显示
			enable:true,		//禁用的选择框与否 （true可用，false不可用）
		});
		_single1.refreshSelect(_data);


		$('#geta').click(function(){
			alert($('input[name="a"]').val())
		});
		$('#getb').click(function(){
			alert($('input[name="b"]').val())
		});

	});
	
	
	
	可调用方法：
	    getSelectedValue()：
	    实例化对象调用getSelectedValue(),直接获取该仿select的值（所选值）
	    
	    refreshSelect(data)：
	    实例化对象调用refreshSelect(data),直接初始化仿select下拉选项的值，同时可以指定当前被选中的值
	    
	    
	    
兼容性：
	IE8及以上兼容
	    
