function onEditSelectChange(obj){
    obj.parentElement.children[0].value = obj.value;
}
function getEditSelectorText(selector){
    selector += " span.edit_select .input";
	var text = $(selector).val();
    return text;
}
$.ajax({
    url:"/Getdata/getAllEnvInfo",
    type:"GET",
    dataType:"json",
    success: function(result){
        var option='<option></option>';
        for(var i in result){
            option += "<option>"+result[i]['url']+"</option>";
        }
//      alert(option);
        var obj=$("span.edit_select select");
		obj.html(option);
    }
});
