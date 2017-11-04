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
            <i class="icon folder"></i>
            マイリスト
          </a>
        </div>

        <table class="ui basic table" if={ user && items.length>0 }>
          <tbody>
            <tr each={ value, key in items }>
              <td>
                { value.data().title }
              </td>
              <td class="right aligned">
                <a class="ui icon basic button" href={ 'https://docs.google.com/spreadsheets/d/'+value.data().gid+'/pubhtml' } target="_blank" data-tooltip="元データを見る" data-inverted=""><i class="icon table"></i></a>
                <a class="ui icon teal basic button" href={ 'https://app.the-timeline.jp/?key='+value.data().gid } target="_blank" data-tooltip="年表を見る" data-inverted=""><i class="icon align left"></i></a>
              </td>
            </tr>
          </tbody>
        </table>

        <p if={ !user }>作成済み年表を見るには<a href="signin">ログイン</a>してください</p>
        <p if={ user && items.length==0 }>まだ年表がありません。<a href="create">新規作成</a>ページから年表を作成してください。</p>
      </div>
    </div>
  </div>

  <style>
    .grid { margin: 30px 0; }
  </style>

  <script>
    var that = this

    firebase.auth().onAuthStateChanged(function(user) {
      that.user = user
      if(user) {
        obs.trigger("dimmerChanged", 'active')

        var docRef = db.collection("timelines").where("userId", "==", that.user.uid).orderBy('createdAt', 'desc')
        docRef.get().then(function(querySnapshot){
          that.items = querySnapshot.docs
          that.update()
          obs.trigger("dimmerChanged", '')
        })
      }
    })
  </script>
</mypage>
