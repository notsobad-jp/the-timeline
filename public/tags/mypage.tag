<mypage>
	<div class="ui stackable centered grid">
		<div class="ui ten wide column">
			<h1 class="ui medium header">
				<i class="icon folder open outline"></i>
				<div class="content">作成済みの年表</div>
			</h1>
			<table class="ui basic table">
			  <thead>
			    <tr>
			      <th class="one wide">
							<div class="ui checkbox">
								<input type="checkbox" tabindex="0" class="hidden">
							</div>
						</th>
			      <th>Title</th>
			      <th class="right aligned">
							<div class="ui pink left labeled disabled icon button" data-tooltip="選択したアイテムを削除する" data-inverted="">
								<i class="icon trash"></i>
								Delete
							</div>
						</th>
			    </tr>
			  </thead>
			  <tbody>
			  	<tr each={ value, key in items }>
			      <td>
							<div class="ui checkbox">
								<input type="checkbox" tabindex="0" class="hidden">
							</div>
						</td>
			      <td>{ value.title }</td>
			      <td class="right aligned">
							<button class="ui teal icon button" data-tooltip="編集する" data-inverted=""><i class="icon setting"></i></button>
							<button class="ui icon basic button" data-tooltip="年表を見る" data-inverted=""><i class="icon external"></i></button>
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

		firebase.database().ref('/timelines').once('value').then(function(snapshot) {
			obs.trigger("dimmerChanged", '')
		  that.items = snapshot.val()
			that.update()
			$(".ui.checkbox").checkbox()
		})
	</script>
</mypage>
