<auth>
  <div class="ui padded basic segment">
    <br><br>
    <div class="ui three column center aligned stackable grid">
      <div class="column">
        <h2 class="ui header">
            { opts.type=='signup' ? 'Sign Up' : 'Sign In'}
        </h2>
        <form class="ui large form">
          <div class="ui segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input ref="email" type="text" name="email" placeholder="E-mail address">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input ref="password" type="password" name="password" placeholder="Password">
              </div>
            </div>
            <div class="ui fluid large teal submit button" onclick={ opts.type=='signup' ? signup : signin }>
                { opts.type=='signup' ? 'Register' : 'Login'}
            </div>
          </div>
          <div if={ error_message } class="ui visible error message">{ error_message }</div>
        </form>

        <div class="ui message">
          <p if={ opts.type=='signup' }>Already user? <a href="/signin">Sign In</a></p>
          <p if={ opts.type=='signin' }>New to us? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
    <br><br>
  </div>


  <script>
    var that = this

    firebase.auth().onAuthStateChanged(function(user) {
        if(user) { route('/') }
    });

    signup() {
			obs.trigger("dimmerChanged", 'active')
      firebase.auth().createUserWithEmailAndPassword(this.refs.email.value, this.refs.password.value).then(
        function() {
					obs.trigger("flashChanged", {type:'success',text:'アカウントを登録しました'})
        },
        function(error) {
          that.error_message = error.message
          that.update()
        }
      ).then(function(){
			  obs.trigger("dimmerChanged", '')
      })
    }

    signin() {
			obs.trigger("dimmerChanged", 'active')
      firebase.auth().signInWithEmailAndPassword(this.refs.email.value, this.refs.password.value).then(
        function() {
					obs.trigger("flashChanged", {type:'success',text:'ログインしました'})
        },
        function(error) {
          that.error_message = error.message
          that.update()
        }
      ).then(function(){
			  obs.trigger("dimmerChanged", '')
      })
    }
  </script>
</auth>
