<timeline-edit>
	<div class="ui padded basic segment">
		<div class="ui secondary mini menu">
			<div class="item">
				<div class="ui pink button" onclick={ save }>
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

		<h1 class="ui medium header">
			<div class="ui fluid input">
			  <input ref="title" type="text" placeholder="Title.." value={ (timeline) ? timeline.title : null }>
			</div>
		</h1>

		<div ref="table" id="table"></div>
	</div>

	<script>
		var that = this
		var
	    initData = [
				{
				  group : "日本の年号",
				  startYear : "1989",
				  startMonth : "",
				  startDay : "",
				  startTime : "",
				  endYear : "now",
				  endMonth : "",
				  endDay : "",
				  endTime : "",
				  displayDate : "1989年～",
				  title : "平成",
				  detail : "",
				  url : "",
					imageUrl : '',
				  type : "",
				  color : ""
				}
	    ],
	    hot,
			timeline

		$(function(){
	    $('.dimmer').addClass('active')
			firebase.database().ref('/timelines/' + opts.id).once('value').then(function(snapshot) {
				that.timeline = snapshot.val()
				that.update()

				var data = (that.timeline) ? that.timeline.data : initData

		    var container = document.getElementById('table')
			  hot = new Handsontable(container, {
			    data: data,
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
	    	$('.dimmer').removeClass('active')
			})

		})

		save(e) {
			e.target.classList.add("loading")

			var postData = {}
			postData.data = hot.getSourceData()
			postData.data.pop()
			postData.title = that.refs.title.value

			var updates = {};
			updates['/timelines/' + opts.id] = postData;

			firebase.database().ref().update(updates).then(
        function() {
          console.log("saving successed!")
        },
        function(error) {
          that.error_message = error.message
          that.update()
        }
			).then(function(){
				e.target.classList.remove("loading")
			})
		}
	</script>
</timeline-edit>
