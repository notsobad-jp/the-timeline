<mypage>
	<div class="ui basic segment">
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

				<table class="ui basic table" if={ user && items }>
				  <tbody>
				  	<tr each={ value, key in items }>
				      <td>
								{ value.title }
								<!--<a href={ 'https://docs.google.com/spreadsheets/d/'+value.gid } target="_blank" data-tooltip="シートを編集する" data-inverted=""><i class="icon teal setting"></i></a>-->
							</td>
				      <td class="right aligned">
								<a class="ui icon basic button" href={ 'https://docs.google.com/spreadsheets/d/'+value.gid } target="_blank" data-tooltip="元データを見る" data-inverted=""><i class="icon table"></i></a>
								<a class="ui icon teal basic button" href={ 'https://app.the-timeline.jp/?key='+value.gid } target="_blank" data-tooltip="年表を見る" data-inverted=""><i class="icon align left"></i></a>
							</td>
				    </tr>
				  </tbody>
				</table>

				<p if={ !user }>作成済み年表を見るには<a href="signin">ログイン</a>してください</p>
				<p if={ user && !items }>まだ年表がありません。<a href="create">新規作成</a>ページから年表を作成してください。</p>
			</div>
		</div>
	</div>

	<style>
		.grid { margin: 30px 0; }
	</style>

	<script>
		var that = this
		obs.trigger("dimmerChanged", 'active')

		firebase.auth().onAuthStateChanged(function(user) {
			that.user = user
			if(user) {
				firebase.database().ref('/user-posts/'+user.uid).once('value').then(function(snapshot) {
					that.items = snapshot.val()
					that.update()
				})
			}
			obs.trigger("dimmerChanged", '')
		})
	</script>
</mypage>
