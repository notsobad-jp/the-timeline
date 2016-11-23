<header>
	<div class="ui fixed inverted borderless small menu">
	  <a href="/" class="header item">
	    <h4>
	      <i class="align left teal icon"></i>
	      THE TIMELINE
	    </h4>
	  </a>
	  <div class="right menu">
      <div class="header item" if={user}>
          <i class="icon user"></i>
          { user.email }
      </div>
			<div class="item" if={!user}>
				<a class="ui pink button" href="/signup">ユーザー登録</a>
			</div>
      <div class="item">
          <a if={user} href="" onclick={signout}>ログアウト</a>
          <a if={!user} href='/signin'>ログイン</a>
      </div>
	  </div>
	</div>

	<script>
		var that = this

		firebase.auth().onAuthStateChanged(function(user) {
			that.user = user
			that.update()
		})

		signout() {
			firebase.auth().signOut()
			route('/')
		}
	</script>
</header>
