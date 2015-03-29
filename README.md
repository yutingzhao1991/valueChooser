ValueChooser
===

![demo](https://cloud.githubusercontent.com/assets/1061968/6884175/d3813c98-d614-11e4-89b9-3933a345550a.png)

Usage
---

Import resource first

```html
<link rel="stylesheet" type="text/css" href="../src/jquery-plugin-valuechooser.css" />
<script type="text/javascript" src="../src/jquery-plugin-valuechooser.js"></script>
```

```js

/**
 * https://github.com/yutingzhao1991/valueChooser
 * a jquery plugin valuechooser
 * add to a input and then when input element focused, there will pop a dialog for chose value
 * the chooser can be single or mutil
 * you can use it like this: $('#input-id').valuechooser(options)
 * options list:
 * 1:type {'single'|'mutil'}
 * 2:data {Array} item of Array include a name will be view and a value will be add to input and a group flag when grounping is true
 * 3:width {int} the popup width
 * 4:height {int} thr popup height
 * 5:closeText {String} close btn text
 * 6:submitText {String} submit btn text
 * 7:clearText {String} clear chosed values btn text
 * 8:selectAllText {String} select all value btn text
 * 9:grouping {Boolean} is grouping by group
 * 10:separator {String} is separator bewteen mutiple value
 *
 * Thanks for your use, if you have some suggestion you can contact me
 * website: http://yutingzhao.com
 * email: yutingzhao1991@sina.com
 * weibo: @余廷钊
 *
 * thanks for resever this declaration
 * date 2012-01-04
 * version 1.0.1
 */

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

 ```
