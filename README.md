<h2>specialSelect简介&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://www.shdnfw.com/plugin/specialSelect/demo.html">下拉框实现(specialSelect.js)使用示例</a></h2>
<p>specialSelect是基于jquery实现仿select下拉选项功能的js组件</p>

<hr/>

<h3>1、开始工作：</h3>
<p>
	需要最先引入jquery (Bootstrap中文网开源项目免费 CDN 服务)：
</p>
```html
<script type="text/javascript" src="//cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>
```
<p>
	我们需要在页面中引入关键js：
</p>
```html
<script type="text/javascript" src="....../specialSelect.js"></script>
```

<h3>2、使用：</h3>
<h4>html：</h4>
<p>
	（固定格式html准备，id为test可自定义）
</p>
```html
<div id="test" class="select_box">
	<input class="sub_data" type="hidden" readonly="readonly"/>
	<span class="show_text">请选择</span><i>▼</i>
	<ul class="select_inner">
		<li data-value="1">测试内容一</li>
		<li data-value="2" data-selected="selected">测试内容二</li>
		<li data-value="3">测试内容三测试内容三</li>
		<li data-value="4">测试内容四</li>
		<li data-value="5">测试内容五</li>
		<li data-value="6">测试内容六</li>
		<li data-value="7">测试内容七</li>
		<li data-value="8">测试内容八</li>
	</ul>
</div>
```

<h4>css（添加当前样式）：</h4>
```html
<link rel="stylesheet" type="text/css" href="....../specialSelect.css" />
```

<h4>js（相应的方法调用）：</h4>
<p>
	（格式化下拉选择框）
</p>
```javascript
$('.select_box').specialSelect({
	width:150,		//在autoWidth:false条件下选择框的默认宽度150，受autoWidth制约
	autoWidth:true,		//自适应全部宽度
	showNum:5,			//在autoHeight:false条件下默认显示子项数，默认显示五项，受autoHeight制约
	autoHeight:false,	//自适应全部高度，及子项全部显示	
	nullItemWidth:100,	//当选择框为空（无可选项）时，选择框的宽度设定
});
```
<p>
	（禁用下拉选择框）
</p>
```javascript
$('#test').disableSpecialSelect();
```
<p>
	（设置下拉选择框可用／可选）
</p>
```javascript
$('#test').enableSpecialSelect();
```
<p>
	（获取选择的值）
</p>
```javascript
$('#test').getSpecialSelectValue()
$('#test').getSpecialSelectValue('text')
```
<p>
	（生成新的下拉选项）
</p>
```javascript
$('#test2').createSpecialSelect({
	url:'data/select.json',
	params:{
		test:12,
		test2:123
	},
	data:[
		{'id':0,'text':'测试生成1'},
		{'id':1,'text':'测试生成2'},
		{'id':2,'text':'测试生成3'},
		{'id':3,'text':'测试生成4'},
		{'id':4,'text':'测试生成5'}
	],
	valueField:'id',
	textField:'text'
});
```


<h3>3、方法说明：</h3>
<table>
	<tr>
		<th>方法名</th>
		<th>参数</th>
		<th>说明</th>
	</tr>
	<tr>
		<td>specialSelect</td>
		<td>
			width：在autoWidth:false条件下选择框的默认宽度200，受autoWidth制约(数字)<br/>
			autoWidth：自适应宽度(true/false)<br/>
			showNum：在autoHeight:false条件下默认显示子项数，默认显示五项，受autoHeight制约(整数)<br/>
			autoHeight：自适应高度，即子项全部显示(true/false)<br/>
			nullItemWidth：当选择框为空（无可选项）时，默认选择框的宽度设定(数字)<br/>
			注意：参数是以对象形式传入，如:<pre>$('.select_box').specialSelect({
	width:150,
	autoWidth:true,
	showNum:5,
	autoHeight:false,
	nullItemWidth:100
});</pre>
				</td>
				<td>格式化下拉选择框</td>
			</tr>
			<tr>
				<td>disableSpecialSelect</td>
				<td>
			无
		</td>
		<td>禁用选择(控制禁用选择框)</td>
	</tr>
	<tr>
		<td>enableSpecialSelect</td>
		<td>
			无
		</td>
		<td>恢复可用(控制恢复选择框可用)</td>
	</tr>
	<tr>
		<td>getSpecialSelectValue</td>
		<td>
			text：获取选中的文本值<br/>
			如：<pre>$('#test').getSpecialSelectValue('text')</pre>
			(不传参数):获取value值<br/>
			如：<pre>$('#test').getSpecialSelectValue()</pre>
			注意：参数直接传入
		</td>
		<td>获取选择框选中的值</td>
	</tr>
	<tr>
		<td>createSpecialSelect</td>
		<td>
			url：数据后台请求地址(请求地址)<br/>
			params：后台请求需要传给后台的参数(对象形式的参数)<br/>
			data：生成下拉框选项的数据(优先级大于url地址请求数据)<br/>
			valueField：基本数据值(字符串或数字)<br/>
			textFiels：基本数据字段名称(字符串)<br/>
			注意：参数是以对象形式传入，如:<pre>
			$('#test').createSpecialSelect({
	url:'data/select.json',
	params:{
		test:12,
		test2:123
	},
	data:[
		{'id':0,'text':'测试生成1'},
		{'id':1,'text':'测试生成2'},
		{'id':2,'text':'测试生成3'},
		{'id':3,'text':'测试生成4'},
		{'id':4,'text':'测试生成5'}
	],
	valueField:'id',
	textField:'text'
});</pre>
		</td>
		<td>动态加载数据生成选择框元素（选项）</td>
	</tr>
</table>

<h3>4、兼容性：</h3>
<p>
	兼容IE8及以上浏览器
</p>
