<timeline>
	<div class="ui padded basic segment">
		<div class="ui secondary mini menu">
			<div class="item">
				<div class="ui pink button {saveState}" onclick={ save }>
					Save
				</div>
			</div>
			<div class="item">
				<a class="ui button" href="/timelines/{opts.id}" target="_blank">
					<i class="icon external"></i>
					View Timeline
				</a>
			</div>
		</div>

		<form class="ui large form">
			<div class="required field {titleState}">
				<label>Title</label>
				<div class="ui fluid input">
					<input ref="title" type="text" placeholder="例）サッカー日本代表の歴史" value={ (timeline) ? timeline.title : null }>
				</div>
			</div>
		</form>

		<br>

		<div ref="table" id="table"></div>
	</div>
  <div class="ui page dimmer {dimmerState}"><div class="ui indeterminate huge text loader">Loading</div></div>


	<script>
		var that = this
		that.dimmerState = 'active'

		var jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/timeline-9747a.appspot.com/o/json%2F'+ opts.id +'.json?alt=media';
		var
			hot,
			timeline

		$(function(){
      $.getJSON(jsonUrl, function(json) {
				that.timeline = json
      }).fail(function(event, jqxhr, exception) {
				that.timeline = {
					title: '',
					data: {
					  group : "日本の年号",
					  startYear : "1989",
					  endYear : "now",
					  displayDate : "1989年～",
					  title : "平成"
					}
				}
			}).always(function(){
		    var container = document.getElementById('table')
			  hot = new Handsontable(container, {
			    data: that.timeline.data,
					startRows: 5,
					startCols: 17,
					stretchH: 'all',	//fluid width
					colHeaders: ['Group', 'Year', 'Month', 'Day', 'Time', 'End Year', 'End Month', 'End Day', 'End Time', 'Display Date', 'Title', 'Detail', 'URL', 'Image URL', 'Type', 'Color'],
					columns: [
						{data: 'group'},
						{data: 'startYear'},
						{data: 'startMonth'},
						{data: 'startDay'},
						{data: 'startTime'},
						{data: 'endYear'},
						{data: 'endMonth'},
						{data: 'endDay'},
						{data: 'endTime'},
						{data: 'displayDate'},
						{data: 'title'},
						{data: 'detail'},
						{data: 'url'},
						{data: 'imageUrl'},
						{data: 'type'},
						{data: 'color'}
					],
			    minSpareRows: 1
			  })
				that.dimmerState = ''
				that.update()
			})
		})

		save(e) {
			// validate title
			that.titleState = ''
			that.saveState = 'loading'

			var title = that.refs.title.value
			if(!title || title==='') {
				that.titleState = 'error'
				that.saveState = ''
				obs.trigger("flashChanged", {type:'error',text:'タイトルを入力してください'});
				return
			}

			var postData = {}
			postData.data = JSON.parse(JSON.stringify(hot.getSourceData()));	//to avoid calling by reference
			postData.data.pop()
			postData.title = that.refs.title.value
			var blob = new Blob([JSON.stringify(postData)], { type: 'application\/json' });

			var uploadTask = firebase.storage().ref('json/'+ opts.id +'.json').put(blob).then(
				function(){
					obs.trigger("flashChanged", {type:'success',text:'データが保存されました'});
				},
				function(error) {
					obs.trigger("flashChanged", {type:'error',text:'データの保存に失敗しました'});
				}
			).then(function(){
				that.saveState = ''
				that.update()
			})
		}
	</script>
</timeline>
