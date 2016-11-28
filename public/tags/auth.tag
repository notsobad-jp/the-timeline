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
  <div class="ui page dimmer {dimmerState}"><div class="ui indeterminate huge text loader">Loading</div></div>


  <script>
    var that = this

    firebase.auth().onAuthStateChanged(function(user) {
        if(user) { route('/') }
    });

    signup() {
      firebase.auth().createUserWithEmailAndPassword(this.refs.email.value, this.refs.password.value).then(
        function() {
          // console.log("signup success!")
        },
        function(error) {
          that.error_message = error.message
        }
      ).then(function(){
		    that.dimmerState = ''
        that.update()
      })
    }

    signin() {
		  that.dimmerState = 'active'
      firebase.auth().signInWithEmailAndPassword(this.refs.email.value, this.refs.password.value).then(
        function() {
          // console.log("signin success!")
        },
        function(error) {
          that.error_message = error.message
        }
      ).then(function(){
		    that.dimmerState = ''
        that.update()
      })
    }
  </script>
</auth>