<header>
  <div class="ui grid">
    <div class="computer only row">
      <div class="ui fixed inverted borderless menu">
        <a href="/" class="header item">
          <h4>
            <i class="align left teal icon"></i>
            THE TIMELINE
          </h4>
        </a>

        <div class="right menu">
          <div class="item">
            <a class="ui pink button" href="/create">
              年表をつくる
            </a>
          </div>
          <a class="item" href="/mypage">
            <i class="user icon"></i>
            { (user && !user.isAnonymous) ? user.email : 'ゲストユーザー' }
          </a>
          <div class="ui simple dropdown item">
            <i class="content icon"></i>
            <div class="menu">
              <a class="item" href="/mypage">
                <i class="icon folder"></i>
                マイリスト
              </a>
              <a href="/search" class="item">
                <i class="icon search"></i>
                年表を探す
              </a>
              <a class="item" onclick={signOut} if={ user && !user.isAnonymous }>
                <i class="icon sign out"></i>
                ログアウト
              </a>
              <a class="item" href='/signin' if={ !user || user.isAnonymous }>
                <i class="icon sign in"></i>
                簡単ログイン
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mobile tablet only row">
      <div class="ui fixed inverted borderless menu">
        <a href="/" class="header item">
          <h4>
            <i class="align left teal icon"></i>
            THE TIMELINE
          </h4>
        </a>
        <div class="item menu-title"></div>
        <div class="right menu">
          <div class="ui simple dropdown item">
            <i class="content icon"></i>
            <div class="menu">
              <div class="header">
                { (user && !user.isAnonymous) ? user.email : 'ゲストユーザー' }
              </div>
              <div class="divider"></div>
              <a class="item" href="/create">
                <i class="icon write"></i>
                年表をつくる
              </a>
              <a class="item" href="/mypage">
                <i class="icon folder"></i>
                マイリスト
              </a>
              <a href="/search" class="item">
                <i class="icon search"></i>
                年表を探す
              </a>
              <a class="item" onclick={signOut} if={ user && !user.isAnonymous }>
                <i class="icon sign out"></i>
                ログアウト
              </a>
              <a class="item" href='/signin' if={ !user || user.isAnonymous }>
                <i class="icon sign in"></i>
                簡単ログイン
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


	<style>
		header { overflow: hidden; }
	</style>


	<script>
		var that = this

		firebase.auth().onAuthStateChanged(function(user) {
			if(user) {
				that.user = user
				that.update()
			}else {
				firebase.auth().signInAnonymously()
			}
		})

		signOut() {
			firebase.auth().signOut()
			obs.trigger("flashChanged", {type:'success',text:'ログアウトしました'})
			route('/')
		}
	</script>
</header>
