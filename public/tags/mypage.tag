<mypage>
	<div class="ui stackable centered grid">
		<div class="ui ten wide column">
			<div class="ui secondary pointing menu">
			  <a class="item" href="create">
					<i class="icon write"></i>
			    新規作成
			  </a>
			  <a class="active item" href="mypage">
					<i class="icon history"></i>
			    作成済み年表
			  </a>
			</div>

			<table class="ui basic table">
			  <tbody>
			  	<tr each={ value, key in items }>
			      <td>{ value.title }</td>
			      <td class="right aligned">
							<a class="ui icon basic button" href={ 'https://docs.google.com/spreadsheets/d/'+value.gid } target="_blank" data-tooltip="元データを見る" data-inverted=""><i class="icon table"></i></a>
							<a class="ui icon basic button" href={ 'http://app.the-timeline.jp/?key='+value.gid } target="_blank" data-tooltip="年表を見る" data-inverted=""><i class="icon align left"></i></a>
						</td>
			    </tr>
			  </tbody>
			</table>
		</div>
	</div>

	<style>
		.grid { margin: 70px 0; }
	</style>

	<script>
		var that = this
		obs.trigger("dimmerChanged", 'active')

		firebase.auth().onAuthStateChanged(function(user) {
			if(user) {
				firebase.database().ref('/user-posts/'+user.uid).once('value').then(function(snapshot) {
					obs.trigger("dimmerChanged", '')
					that.items = snapshot.val()
					that.update()
				})
			}else {
				obs.trigger("flashChanged", {type: 'error', text: 'ログインしてください'})
				route('/')
			}
		})
	</script>
</mypage>
