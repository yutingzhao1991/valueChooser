$(function(){
	var chooser = $('#demoInput').valueChooser({
		type: 'mutil',
		data: [{
			name: 'test',
			id: '1001',
			groupIndex: 'A',
			groupName: 'A'
		}, {
			name: 'test2',
			id: '1002',
			groupIndex: 'A',
			groupName: 'A'
		}, {
			name: 'test3',
			id: '1003'
		}],
		separator: ',',
		grouping: true
	});
	$('#demoBtn').click(function () {
		alert(chooser.val());
	});
});