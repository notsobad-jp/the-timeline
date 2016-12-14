<header>
	<div class="ui fixed inverted borderless small menu">
	  <a href="/" class="header item">
	    <h4>
	      <i class="align left teal icon"></i>
	      THE TIMELINE
	    </h4>
	  </a>
	  <a href="/search" class="item">
			<i class="icon search"></i>
			Explore
		</a>


	  <div class="right icon menu" if={user}>
			<a class="item" href="/mypage">
				<i class="icon user"></i>
				マイページ
			</a>
			<a class="item" onclick={signOut}>
				<i class="icon sign out"></i>
				ログアウト
			</a>
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
