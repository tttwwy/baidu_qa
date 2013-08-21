$(function(){
	genTimeLine('div.content');
});
function genTimeLine(selector){
	$().timelinr({
//		containerDiv: selector
		orientation:	'vertical'
	});
}
