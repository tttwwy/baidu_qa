function genExpTable(info,graphSelector){
	var groupTitle = document.createElement('tr');
	var title = document.createElement('tr');
	for(ind in info['field_names']){
		var field = info['field_names'][ind];
		var groupTh = document.createElement('th');
		$(groupTh).attr('colSpan',field.field.length);
		groupTh.colSpan = field.field.length;
		$(groupTh).text(field.name);
		$(groupTitle).append(groupTh);
		for(indItem in field['field']){
			var titleTh = document.createElement('th');
			$(titleTh).text(field['field'][indItem]);
			$(title).append(titleTh);
		}
	}
	$(graphSelector).append(groupTitle);
	$(graphSelector).append(title);
	
	$.getJSON(info['url'],function(data){
		for(ind in data){
			var piece = data[ind];
			if(piece == null)
				continue;
			var tr = document.createElement('tr');
			for(tdInd in info['field_list']){
				var seg = info['field_list'][tdInd];
				var td = document.createElement('td');
				$(td).text(piece[seg]);
				$(tr).append(td);
			}
			$(graphSelector).append(tr);
		}
		$(graphSelector).css({'width':'100%'});
		$(graphSelector + ' *').css({'border':'1px solid #000','height':'22px'});
		$(graphSelector).attr({cellpadding:"0",cellspacing:"0"});
		$(graphSelector + ' th').css('background-color','#B9DAF3');
	});
}
function genTableFrame(info,graphSelector){
	var colModel = new Array;
	var fieldList = info['field_list'];
	var fieldNames = info['field_names'];
	if(fieldNames == undefined)
		fieldNames = fieldList;
	for(var ind in fieldList){
		var fieldIndex = fieldList[ind];
		colModel[ind] = {
			name: 	fieldIndex,
			index:	fieldIndex,
			sortable:	false,
			formatter:function(cont){
				var html;
				if(typeof(cont) == "object" && cont != null){
					html = cont['text'];
					if(typeof(cont["color"]) == "string" && cont["color"] != "")
						html = "<span color=\"" + cont["color"] + "\">" + html + "</span>";
					if(typeof(cont["link"]) == "string" && cont["link"] != "")
						html = "<a href=\"" + cont["link"] + "\">" + html + "</a>";
				}else{
					html = cont;
				}
				return html;
			}
		}
		if(info['formatter']!=undefined && info['formatter'][ind]!=undefined)
			colModel[ind]['formatter'] = info['formatter'][ind];
	}
	
	var setting = {
		//TODO:添加url
		url		:	info['url'],//获取数据的地址
//		subGrid: true,
		datatype:	"json",
		colNames:	fieldNames,
		colModel:	colModel,
		autowidth:	true,
//		altRows:	true,
		loadonce:	true,
		scroll:		false,
		pgbuttom:	true,	//是否显示翻页按钮
		pginput:	true,	//是否显示跳转页面的输入框
		pager: '#pager',
		rowNum:		5,		//设置表格中显示的记录数，参数会被自动传到后台。如果此参数设为10，但是从服务器端返回 15条记录，那么在表格中只会显示10条记录。 如果设为-1则禁用此检查
		//rowNum:	100,
		rowList:[10,20,30],
		shrinkToFit:true,	//此属性用来说明当初始化列宽度时候的计算类 型，如果为ture，则按比例初始化列宽度。如果为false，则列宽度使用colModel指定的宽度
//		subGridType:null,
		viewrecords:true,
		captain:"haha",
//		height:"100",
		height:"auto",
//		emptyrecords:"暂无数据！"
	};
	
	
//	if((typeof(info['url']) != "string" || info['url'] == '') && typeof(info['data']) == "object")
//		setting['rows'] = info['data'];

	$(graphSelector).jqGrid(setting);
	$(graphSelector).jqGrid('navGrid','#pager',{edit:false,add:false,del:false});
	if(typeof(info['url']) == "string" && info['url'] != ''){
	   	$.getJSON(info['url'],function(data){
			$(graphSelector).hide();
			for(var ind in data){
				var row = data[ind];
				$(graphSelector).jqGrid('addRowData',parseInt(ind)+1,row);
			}
			$(graphSelector).show();
	});
	}
	else if(typeof(info['data']) == "object"){
		$(graphSelector).jqGrid('addRowData',info['data']);
		for(var ind in info['data']){
			$(graphSelector).jqGrid('addRowData',parseInt(ind)+1,info['data'][ind]);
		}
//		alert('Finish!'+ind);
	}
}


function genPolygramFrame(info,graphSelector){
	$.getJSON(info['url'],function(data){
		window.chart = new Highcharts.StockChart({
			chart:{
				type: "line",
//				type: line	// Can be one of line, spline, area, areaspline, column, scatter, ohlc and candlestick. Since 1.1.7, types can also be arearange, areasplinerange and columnrange. Defaults to line.
				renderTo: $(graphSelector)[0],
				width:1070
			},
			xAxis:{
				//TODO:横坐标名称
				title: "这里是横坐标",
			},
			yAxis:{
				title: "这里是纵坐标",
			},
			series: data,
			plotOptions:{
				series:{
					events:{
						click:function(e){
//							alert(e);
						}
					}
				}
			}
		});
	});
}

function genGraphFrame(info,destSelector){
	if(typeof(info['table_desc']) == "string" && info['table_desc'] != ""){
		var title = document.createElement('h2');
		$(title).text(info['table_desc']);
		$(title).attr('type','table_desc');
		$(destSelector).append(title);
		$(title).css('margin-top','15px');
	}
	var graph = document.createElement('table');
	$(graph).attr('type','graph');
	$(destSelector).append(graph);
	var graphSelector = destSelector + ' [type=graph]';
	
	switch(info['table_type']){
		case 'table':
			genTableFrame(info,graphSelector);
			break;
		case 'polygram':
			genPolygramFrame(info,graphSelector);
			break;
		case 'exp_table':
			genExpTable(info,graphSelector);
			break;
	}
}

function genFrames(dataUrl,destSelector){
	destObj = $(destSelector);
	$.ajax({
		url:	dataUrl,
		type:	"GET",
		dataType:"json",
		success:function(result){
			if(result == null || result['data'] == null){
				alert("后端返回格式错误！接口："+dataUrl);
			}
			$(destSelector + " *").remove();
			
			if(typeof(result['title']) == "string" && result['title'] != ""){
				var title = document.createElement('div');
				$(title).text(result['title']);
				$(title).attr('type','frame_title');
				$(destSelector).append(title);
				$(title).css({
					"font-size": "22px",
					"font-weight": "normal",
					"font-family": "Microsoft Yahei",
					"background":"#F1F1F1",
					"width":"100%"
				});
			}
			
			if(typeof(result['sub-title']) == "string" && result['sub-title'] != ""){
				var title = document.createElement('div');
				$(title).text(result['sub-title']);
				$(title).attr('type','sub-title');
				$(destSelector).append(title);
				$(title).attr('type','sub-title');
				$(title).css({
					"font-size": "16px",
					"font-weight": "normal",
					"font-family": "Microsoft Yahei",
					"background":"#F1F1F1",
					"width":"100%"
				});
			}
			
			for(var ind in result['data']){
				var div = document.createElement('div');
				$(div).attr({
					'index'	: ind,
					'type'	: 'table_container'
				});
				$(destSelector).append(div);
				genGraphFrame(result['data'][ind], destSelector + ' > div[index=' + ind +'][type=table_container]');
			}
		},
		error:	function(){
			
		}
	});
}

