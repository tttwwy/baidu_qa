var testResult;
function manualRun(frm){
	var env = getEditSelectorText("#manual_runner .env");
	var dataId = $("#manual_runner form input[name='data_id']").val();

	$("#manual_runner div.result .env_content").text(env);
	$("#manual_runner div.result .data_content").text(dataId);
	$("#manual_runner div.result .result_content").html("运行中，请稍候...");
	$("#manual_runner div.result .save_result").hide();
	$("#manual_runner div.result").slideDown("quick");

	$.ajax({
		url:"/Testrun/runSingle",
		type:"POST",
		data:{"env":env, "dataId":dataId},
		dataType:"json",
		success:function(result){
			testResult = null;
			if (!result || result['errNo'] || result['errNo'] != 0){
				var msg = "运行失败！";
				if (result && result['errMsg'])	msg = msg + "失败信息：" + result['errMsg'];
				$("#manual_runner div.result .result_content").html(msg);
				$("#manual_runner div.result p.save_result").hide();
				
				return MESSAGE.send(msg, MESSAGE.__WARNING__);
			}
			if('data' in result && 'result' in result['data'] && 'error' in result['data']['result'] 
				&& result['data']['result']['error'] != 161)
				return MESSAGE.send("返回码错误！错误码：" + result['data']['result']['error']);
			
			var html = '';
			var cont = result['data']['content']
			for(var k in cont){
				if(k == 'point')
					html = html + "<p>position:(" + cont[k]['x'] + ',' + cont[k]['y'] + ")</p>";
				else if (cont[k] != ''){
					html = html + "<p>" + k + ":" + cont[k] + "</p>";
				}
			}
			
			$("#manual_runner div.result .result_content").html(html);
			$("#manual_runner div.result p.save_result").slideDown('quick');
			MESSAGE.send("执行成功!", MESSAGE.__NOTICE__);
			testResult = result['data'];
		},
		error:function(){
			testResult = null;
			var msg = "网络异常!";
			$("#manual_runner div.result .save_result").hide();
			$("#manual_runner div.result .result_content").html(msg);
			MESSAGE.send(msg, MESSAGE.__FATAL__);
		}	
	});
	return false;
}

var MESSAGE = new function __MESSAGE(){
	this.__NOTICE__ = "NOTICE";
	this.__WARNING__ = "WARNING";
	this.__FATAL__ = "FATAL";

	__MESSAGE.prototype.send = function(message,type){
		setTimeout(function(){alert(type + ":" + message)},1000);
	}
}

function saveManualResult(){
	var dataId = $("#manual_runner div.result .data_content").text();
	var result = $("#manual_runner div.result .result_content").text();

	$.ajax({
		url:"/senddata/saveOneResult",
		type:"POST",
		data:{"dataId":dataId,"result":JSON.stringify(testResult)},
		dataType:"json",
		success:function(result){
			if (!result || result['errNo'] || result['errNo'] != 0){
				var message = "保存失败!";
				if (result && result['errMsg'])
					message = message + " 错误信息：" + result['errMsg'];
				return MESSAGE.send(message, MESSAGE.__WARNING__);
			}

			MESSAGE.send("保存成功!", MESSAGE.__NOTICE__);
		},
		error:function(){
			MESSAGE.send("网络异常!", MESSAGE.__FATAL__);
		}
	});
}
