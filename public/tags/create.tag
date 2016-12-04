<create>
	<div class="ui stackable centered grid">
		<div class="ui ten wide column">
			<div class="ui secondary pointing menu">
			  <a class="active item" href="/create">
					<i class="icon write"></i>
			    作成
			  </a>
			  <a class="item" href="/mypage">
					<i class="icon history"></i>
			    履歴
			  </a>
			</div>

      <div class="ui padded segment">
        <p>GoogleスプレッドシートのURLを以下のフォームに貼り付け、表示ボタンを押してください。</p>
        <div class="ui fluid action input">
          <input type="text" placeholder="スプレッドシートのURL" ref="url">
          <div class="ui red right labeled icon button" onclick={ createTimeline }>
            年表を表示する
            <i class="icon right chevron"></i>
          </div>
        </div>
      </div>
		</div>
	</div>

	<style>
		.grid { margin: 70px 0; }
	</style>

	<script>
		var that = this

    firebase.auth().onAuthStateChanged(function(user) {
      that.user = user
    })
	</script>
</create>
