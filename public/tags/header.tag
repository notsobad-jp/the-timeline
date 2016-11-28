<header>
	<div class="ui fixed inverted borderless small menu">
	  <a href="/" class="header item">
	    <h4>
	      <i class="align left teal icon"></i>
	      THE TIMELINE
	    </h4>
	  </a>

	  <div class="right icon menu" if={user}>
			<div class="item">
				<div class="ui pink left labeled icon button" onclick={ createTimeline }>
					<i class="icon plus"></i>
					年表を作る
				</div>
			</div>
			<div class="ui simple dropdown item">
				<i class="icon content"></i>
				<div class="menu">
		      <a class="header item" href="/users/{user.uid}">
						<i class="icon user"></i>
		        マイページ
		      </a>
		      <div class="item" onclick={signOut}>
						<i class="icon sign out"></i>
						ログアウト
					</div>
				</div>
			</div>
		</div>

	  <div class="right menu" if={!user}>
			<div class="item">
				<a class="ui pink button" href="/signup">ユーザー登録</a>
			</div>
      <div class="item">
          <a href='/signin'>ログイン</a>
      </div>
	  </div>
	</div>

	<script>
		var that = this
		that.mixin('Utility')

		firebase.auth().onAuthStateChanged(function(user) {
			that.user = user
			that.update()
		})

		signOut() {
			firebase.auth().signOut()
			obs.trigger("flashChanged", {type:'success',text:'ログアウトしました'})
			route('/')
		}
	</script>
</header>
