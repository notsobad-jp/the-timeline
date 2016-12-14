<search>
	<div class="ui basic segment">
		<div class="ui stackable centered grid">
			<div class="ui ten wide column">
				<div class="ui secondary pointing menu">
				  <a class="active item" href="create">
						<i class="icon search"></i>
				    Explore
				  </a>
				</div>

				<table class="ui basic table">
				  <tbody>
				  	<tr each={ value, key in items }>
				      <td>{ value.title }</td>
				      <td class="right aligned">
								<a class="ui icon basic button" href={ 'https://docs.google.com/spreadsheets/d/'+value.gid+'/pubhtml' } target="_blank" data-tooltip="元データを見る" data-inverted=""><i class="icon table"></i></a>
								<a class="ui icon teal basic button" href={ 'https://app.the-timeline.jp/?key='+value.gid } target="_blank" data-tooltip="年表を見る" data-inverted=""><i class="icon align left"></i></a>
							</td>
				    </tr>
				  </tbody>
				</table>
			</div>
		</div>
	</div>

	<style>
		.grid { margin: 30px 0; }
	</style>

	<script>
		var that = this
		obs.trigger("dimmerChanged", 'active')

		firebase.database().ref('/posts').once('value').then(function(snapshot) {
			that.items = snapshot.val()
			that.update()
			obs.trigger("dimmerChanged", '')
		})
	</script>
</search>
