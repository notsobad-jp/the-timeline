<create>
	<div class="ui basic segment">
		<div class="ui stackable centered grid">
			<div class="ten wide column">
				<div class="ui secondary pointing menu">
				  <a class="active item" href="create">
						<i class="icon write"></i>
				    新規作成
				  </a>
				  <a class="item" href="mypage">
						<i class="icon folder"></i>
				    マイリスト
				  </a>
				</div>
			</div>

      <div class="computer only ten wide column">
        <div class="ui very padded secondary center aligned segment">
        	<p>GoogleスプレッドシートのURLを以下のフォームに貼り付け、表示ボタンを押してください。</p>
          <div class="ui fluid action input { (urlInvalid) ? 'error' : '' }">
            <input type="text" placeholder="スプレッドシートのURL" oninput={ updateGid }>
            <div class="ui pink { (urlInvalid) ? 'disabled' : '' } right labeled icon button" onclick={ createAndShowTimeline }>
              年表を表示する
              <i class="icon right chevron"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="mobile tablet only ten wide column">
        <div class="ui basic secondary center aligned padded segment">
          <div class="ui small header">作成した年表を表示する</div>
          <div class="ui fluid action input { (urlInvalid) ? 'error' : '' }">
            <input type="text" placeholder="スプレッドシートのURL" oninput={ updateGid }>
            <div class="ui pink { (urlInvalid) ? 'disabled' : '' } icon button" onclick={ createAndShowTimeline }>
              <i class="icon right chevron"></i>
            </div>
          </div>
        </div>
      </div>


			<div class="ui ten wide column">
				<div class="ui horizontal divider">
					▼ 作成手順 ▼
				</div>
				<div class="ui basic segment">
					<h3 class="ui header">
		        ① テンプレートからシートを新規作成
					</h3>
					<div>
						<p>
							以下のテンプレートをコピーして、自分用のシートを作成します。
							<br>
							下記のリンク先で、メニューの<strong>「ファイル」→「コピーを作成」</strong>を選択してください。
						</p>
						<a class="ui basic button" href="https://docs.google.com/spreadsheets/d/1ZzL0aWBK7F9TtKOuapX5PceJ2CUT_x2MCh7xmJ_C_nI" target="_blank">
							<i class="icon external"></i>
							テンプレートを取得する
						</a>
						<p>
							<small>
								（ファイル名が年表の名前として使用されます。ファイル名を後から変更することも可能です）
							</small>
						</p>
					</div>
				</div>

				<div class="ui basic segment">
					<h3 class="ui header">
		        ② シートにデータを登録
					</h3>
					<div>
						<p>
							作成したシートで、テンプレートの形式に沿ってデータを登録します。
							<br>
							データ登録方法のオプションについては、サンプルの元データを参考にしてください。
						</p>
					</div>
				</div>

				<div class="ui basic segment">
					<h3 class="ui header">
		        ③ シートを公開する
					</h3>
					<div>
						<p>
							登録が完了したら、シートを公開します。
							メニューの<strong>「ファイル」→「ウェブに公開」</strong>を選択してください。
							<br>
							<small>
								（<a href="https://support.google.com/docs/answer/37579?hl=ja" target="_blank">Google公式ドキュメント<i class="icon small external"></i></a>）
							</small>
						</p>
					</div>
				</div>
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
    })

    createAndShowTimeline() {
      if(!that.gid) {
        that.urlInvalid = true
        return false
      }

      window.open('https://app.the-timeline.jp/?key='+ that.gid, '_blank');

      Tabletop.init({
        key: that.gid,
        prettyColumnNames: false,
        simpleSheet: true,
        callback: that.saveTimelineData
      })
    }

    saveTimelineData(data, tabletop) {
      var title = tabletop['googleSheetName']
      var postData = { title: title, gid: that.gid }
      var userId = (that.user) ? that.user.uid : null

      var docRef = db.collection("timelines").doc(that.gid)
      docRef.set({
        title: title,
        gid: that.gid,
        userId: userId,
        createdAt: new Date()
      })
    }

    updateGid(e) {
      var gurl = e.target.value
      var matched = gurl.match(/https:\/\/docs\.google\.com\/spreadsheets\/d\/([^\/]*)/)
      if(matched && matched[1]) {
        that.gid = matched[1]
        that.urlInvalid = false
      }else {
        that.urlInvalid = true
      }
    }
	</script>
</create>
