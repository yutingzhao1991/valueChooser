/**
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
 * 8:grouping {Boolean} is grouping by group
 *
 * Thanks for your use, if you have some suggestion you can contact me
 * website: http://yutingzhao.com
 * email: yutingzhao1991@sina.com
 * weibo: @余廷钊
 *
 * thanks for resever this declaration
 * date 2012-01-04
 * version 1.0.0
 */

;(function($) {

	$.extend($.fn, {
		valueChooser: function(setting) {
			var $this = $(this);
			$.fn.valueChooser.defaults = {
				type: 'single',
				data: [],
				width: 600,
				height: 400,
				closeText: '关闭',
				submitText: '确认',
				clearText: '重置',
				grouping: false,
				onSubmit: function(result){
				}
			};
			$this.attr('readonly', true).css('cursor', 'pointer');
			$this.val = function(value){
				if(value){
					//设置
					$this.attr('data-value', value);
					$this.attr('value', value.replace(/(\S+)/g, function($1){
						return dataMap[$1];
					}));
					return $this;
				}else{
					//获取
					return $this.attr('data-value');
				}
			}
			var options = $.extend({},$.fn.valueChooser.defaults,setting);
			//弹窗主体
			var popup = null;
			//关闭按钮
			var closeBtn = null;
			//确认按钮
			var submitBtn = null;
			//重置按钮
			var clearBtn = null;
			//数据容器
			var container = null;
			//搜索过滤框
			var searchInput = null;
			//提示文字
			var hint = null;

			//可选值
			var dataList = [];
			//记录被选中的索引
			var selected = [];
			//通过id获取名称的索引
			var dataMap = {};

			renderPopup();
			renderData();
			initSearch();

			$this.focus(function(){
				showPopup();
			});

			function submitValue(result) {
				var text = '';
				var ids = '';
				$.each(result, function(index, item) {
					text += item.name + ' ';
					ids += item.id + ' ';
				});
				$this.attr('value', text);
				$this.attr('data-value', ids);
				options.onSubmit(result);
			}

			function renderPopup(){
				closeBtn = $('<div>').addClass('jquery-valuechooser-close').text(options.closeText).click(function(){
					hidePopup();
				});
				submitBtn = $('<button>').addClass('jquery-valuechooser-submit').text(options.submitText).click(function(){
					var result = [];
					$.each(selected, function(index, item){
						result.push(options.data[item]);
					});
					submitValue(result);
					hidePopup();
				});
				clearBtn = $('<button>').addClass('jquery-valuechooser-clear').text(options.clearText).click(function(){
					resetSelectd();
				});
				hint = $('<div>').addClass('jquery-valuechooser-hint').text('当前没有选中任何值');
				container = $('<div>').addClass('jquery-valuechooser-content').css({
					'width': options.width -20 + 'px',
					'height': options.height -112 + 'px'
				});
				searchInput = $('<input>').addClass('jquery-valuechooser-search').attr('placeholder', '搜索过滤');
				popup = $('<div>').addClass('jquery-valuechooser-popup')
					.append($('<div>').addClass('jquery-valuechooser-header')
						.append(searchInput)
						.append(closeBtn)
					)
					.append(container)
					.append($('<div>').addClass('jquery-valuechooser-footer')
						.append(hint)
						.append(submitBtn)
						.append(clearBtn)
				).css({
					'display': 'none',
					'width': options.width + 'px',
					'height': options.height + 'px',
					'margin-left': '-' + Math.floor(options.width / 2) + 'px',
					'margin-top': '-' + Math.floor(options.height / 2) + 'px'
				}).appendTo(document.body);
			}

			function renderData(){
				//按照分组排序
				if(options.grouping){
					options.data.sort(function(a, b){
						if(a.groupIndex == b.groupIndex){
							return a.name > b.name ? 1 : -1;
						}
						return a.groupIndex > b.groupIndex ? 1 : -1;
					});
				}
				var currentGroup = -1;
				$.each(options.data, function(index, item){
					if(options.grouping){
						if(item.groupIndex != currentGroup){
							currentGroup = item.groupIndex;
							$('<h6>' + item.groupName + '：</h6>').appendTo(container)
						}
					}
					dataList.push($('<div>')
						.addClass('jquery-valuechooser-unit')
						.text(item.name || item.id)
						.appendTo(container)
					);
					dataMap[item.id] = item.name || item.id;
				});

				//添加选择事件
				$.each(dataList, function(index, item){
					(function(index){
						item.click(function(){
							if(dataList[index].hasClass('selected')){
								//取消选中
								$.each(selected, function(i, t){
									if(t == index){
										selected.splice(i, 1);
										return false;
									}
								});
								dataList[index].removeClass('selected');
							}else{
								if(options.type == 'single'){
									//单选
									$.each(selected, function(i, t){
										dataList[t].removeClass('selected');
									});
									selected = [index];
									dataList[index].addClass('selected');
								}else{
									selected.push(index);
									dataList[index].addClass('selected');
								}
							}
							var hintText = ' ';
							$.each(selected, function(i, t){
								hintText += options.data[t].name || options.data[t].id;
								hintText += ' ';
							});
							hint.text('当前选中' + selected.length + '项：' + hintText);
						});
					})(index);
				});
			}

			function initSearch(){
				searchInput.change(function(){
					var keyword = searchInput.val();
					$.each(dataList, function(index, item){
						var searchValue = options.data[index].name || options.data[index].id || "";
						if(searchValue.search(keyword) == -1){
							//搜索不匹配
							item.css('display', 'none');
						}else{
							//搜索匹配
							item.css('display', '');
						}
					});
				});
			}

			function resetSelectd(){
				$.each(selected, function(index, item){
					dataList[item].removeClass('selected');
				});
				hint.text('当前没有选中任何值');
				selected = [];
			}

			function showPopup(){
				popup.css('display', '');
			}

			function hidePopup(){
				popup.css('display', 'none');
			}

			return $this;

		}
	});
})(jQuery);