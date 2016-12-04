<top>
  <div id="top" class="ui inverted attached center aligned basic segment">
    <div>
      <h1 class="ui huge inverted header">
        年表でないと、伝えられないことがある。
      </h1>
      <br>
      <div class="ui subheader">
        簡単・便利な無料の年表作成サービス
      </div>
      <br><br>
      <div>
        <a class="ui right labeled icon pink large button" href="#howto">
          <i class="chevron down icon"></i>
          さっそく使ってみる
        </a>
      </div>

      <div class="ui hidden divider"></div>

      <div class="ui stackable centered grid basic padded segment">
        <div class="ten wide column">
          <iframe seamless frameBorder="0" src="https://app.the-timeline.jp/?key=1F8ypsB2FVq_uFeTe5OutFWHRe4Fsw8DtqwQ5Jq0aClg"></iframe>
        </div>
      </div>
    </div>
  </div>


  <div id="feature" class="ui basic padded segment">
    <div class="ui basic very padded center aligned segment">
      <p>THE TIMELINEは、Googleスプレッドシートに入力したデータをもとに年表を作成するサービスです。</p>
      <p>テンプレートに沿ってデータを登録するだけで、THE TIMELINEが自動でデータを読み取り、きれいな年表を作成してくれます。</p>
    </div>
    <div class="ui stackable two steps">
      <div class="step">
        <div class="content">
          <div class="title ui header">
            <i class="table icon"></i>
            Googleスプレッドシートにデータを登録
          </div>
          <div class="description">
            <img class="ui image" src="img/howto.png" />
          </div>
        </div>
      </div>
      <div class="step">
        <div class="content">
          <div class="title ui header">
            <i class="left align icon"></i>
            データを読み取って年表表示
          </div>
          <div class="description">
            <img class="ui image" src="img/sample.png" />
          </div>
        </div>
      </div>
    </div>
  </div>


  <div id="howto" class="ui basic very padded segment">
    <h3 class="ui horizontal divider header">
      <i class="setting icon"></i>
      使い方
    </h3>

    <div class="ui ordered stackable three steps">
      <div class="step">
        <div class="content">
          <div class="title ui header">
            テンプレートからシートを新規作成
          </div>
          <div class="description">
            <p>
              以下のテンプレートをコピーして、自分用のシートを作成します。
              下記のリンク先で、メニューの「ファイル」→「コピーを作成」を選択してください。
              （Googleアカウントにログインしている必要があります）
            </p>
            <a class="ui basic button" href="https://docs.google.com/spreadsheets/d/1ZzL0aWBK7F9TtKOuapX5PceJ2CUT_x2MCh7xmJ_C_nI" target="_blank">
              <i class="icon external"></i>
              テンプレートを取得する
            </a>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="content">
          <div class="title ui header">
            シートにデータを登録
          </div>
          <div class="description">
            <p>
              作成したシートで、テンプレートの形式に沿ってデータを登録します。
              データ登録方法のオプションについては、サンプルの元データを参考にしてください。
            </p>
            <a class="ui basic button" href="#examples">
              サンプルを見る&nbsp;
              <i class="icon chevron down"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="step">
        <div class="content">
          <div class="title ui header">
            シートを公開する
          </div>
          <div class="description">
            <p>
              登録が完了したら、シートを公開します。
              メニューの「ファイル」→「ウェブに公開」を選択してください。
              操作がわからない場合は、以下のGoogle公式ドキュメントも参考にしてください。
            </p>
            <a class="ui basic button" href="https://support.google.com/docs/answer/37579?hl=ja" target="_blank">
              <i class="icon external"></i>
              シートの公開手順
            </a>
          </div>
        </div>
      </div>
    </div>


    <div id="form" class="ui one column grid">
      <div class="column">
        <div class="ui basic center aligned segment">
          <div class="ui header"><i class="icon down chevron"></i></div>
        </div>
    </div>

      <!-- <div class="computer only column"> -->
      <div class="column">
        <div class="ui very padded secondary center aligned segment">
          <p>公開設定が完了したら、シートのURLをコピーして以下のフォームに貼り付け、表示ボタンを押してください。</p>
          <div class="ui fluid action input { (urlInvalid) ? 'error' : '' }">
            <input type="text" placeholder="スプレッドシートのURL" ref="url" oninput={ updateGid }>
            <div class="ui red { (urlInvalid) ? 'disabled' : '' } right labeled icon button" onclick={ createAndShowTimeline }>
              年表を表示する
              <i class="icon right chevron"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->

      <!-- <div class="mobile tablet only column">
        <div class="ui basic secondary center aligned segment">
          <div class="ui small header">作成した年表を表示する</div>
          <div class="ui fluid action input">
            <input type="text" placeholder="スプレッドシートのURL" ref="url">
            <div class="ui red icon button" onclick={ showTimeline }>
              <i class="icon right chevron"></i>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>


  <div id="examples" class="ui basic very padded segment">
    <h3 class="ui horizontal divider header">
      <i class="lab icon"></i>
      サンプル
    </h3>
    <div class="ui hidden divider"></div>

    <div class="ui three column stackable grid">
      <div class="column">
        <div class="ui fluid card">
          <a class="image" href="https://the-timeline.jp/timelines/?key=1F8ypsB2FVq_uFeTe5OutFWHRe4Fsw8DtqwQ5Jq0aClg" target="_blank">
            <img src="img/examples/1.jpg" />
          </a>
          <div class="content">
            <a href="https://the-timeline.jp/timelines/?key=1F8ypsB2FVq_uFeTe5OutFWHRe4Fsw8DtqwQ5Jq0aClg" target="_blank" class="header">
              電気の歴史
            </a>
            <div class="meta">
              <span class="ui small label category">科学</span>
              <span class="ui small label category">歴史</span>
            </div>
            <div class="description">
              <p>
                17世紀後半から、科学者たちが少しずつ電磁気の秘密を解き明かしていった歴史。
                主にヨーロッパの出来事が中心ですが、日本の年号を並べて表示すると時代背景の比較ができておもしろいですね。
              </p>
              <a href="https://the-timeline.jp/timelines/?key=1F8ypsB2FVq_uFeTe5OutFWHRe4Fsw8DtqwQ5Jq0aClg" class="ui basic button" target="_blank">
                <i class="align left icon"></i>
                年表を見る
              </a>
              <a href="https://docs.google.com/spreadsheets/d/1F8ypsB2FVq_uFeTe5OutFWHRe4Fsw8DtqwQ5Jq0aClg/edit?usp=sharing" class="ui basic button" target="_blank">
                <i class="table icon"></i>
                元データ
              </a>
            </div>
          </div>
          <div class="extra content">
            <div class="right floated author">
              inspired by <a href="https://www.amazon.co.jp/dp/4816344128" target="_blank">図解雑学よくわかる電気のしくみ</a>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="ui fluid card">
          <a class="image" href="https://the-timeline.jp/timelines/?key=1uZmRGsLz2A2N6OuTYi78woovscQXUcz7Gf4EyLAdXYY" target="_blank">
            <img src="img/examples/2.png" />
          </a>
          <div class="content">
            <a href="https://the-timeline.jp/timelines/?key=1uZmRGsLz2A2N6OuTYi78woovscQXUcz7Gf4EyLAdXYY" target="_blank" class="header">
              火星年代記
            </a>
            <div class="meta">
              <span class="ui small label category">小説</span>
              <span class="ui small label category">歴史</span>
            </div>
            <div class="description">
              <p>レイ・ブラッドベリの名作SF「火星年代記」の出来事を年表で整理。実在の歴史だけでなく、小説や映画のストーリーを年表にして楽しむこともできます。</p>
              <a href="https://the-timeline.jp/timelines/?key=1uZmRGsLz2A2N6OuTYi78woovscQXUcz7Gf4EyLAdXYY" class="ui basic button" target="_blank">
                <i class="align left icon"></i>
                年表を見る
              </a>
              <a href="https://docs.google.com/spreadsheets/d/1uZmRGsLz2A2N6OuTYi78woovscQXUcz7Gf4EyLAdXYY" class="ui basic button" target="_blank">
                <i class="table icon"></i>
                元データ
              </a>
            </div>
          </div>
          <div class="extra content">
            <div class="right floated author">
              inspired by <a href="https://www.amazon.co.jp/SF/dp/4150117640/" target="_blank">火星年代記</a>
            </div>
          </div>
        </div>
      </div>

      <div class="column">
        <div class="ui fluid card">
          <a class="image" href="https://the-timeline.jp/timelines/?key=1hoMJYRvyXF8b3OyCiIsEDeGMk1DuAtuLbcY0oNAKWEc" target="_blank">
            <img src="img/examples/3.png" />
          </a>
          <div class="content">
            <a href="https://the-timeline.jp/timelines/?key=1hoMJYRvyXF8b3OyCiIsEDeGMk1DuAtuLbcY0oNAKWEc" target="_blank" class="header">
              クエンティン・タランティーノ
            </a>
            <div class="meta">
              <span class="ui small label category">映画</span>
              <span class="ui small label category">人物史</span>
            </div>
            <div class="description">
              <p>映画監督タランティーノの半生を、作品リスト・受賞歴とともに紹介。年表には画像を表示することもできます。自分史作成にも活用してください。</p>
              <a href="https://the-timeline.jp/timelines/?key=1hoMJYRvyXF8b3OyCiIsEDeGMk1DuAtuLbcY0oNAKWEc" class="ui basic button" target="_blank">
                <i class="align left icon"></i>
                年表を見る
              </a>
              <a href="https://docs.google.com/spreadsheets/d/1hoMJYRvyXF8b3OyCiIsEDeGMk1DuAtuLbcY0oNAKWEc/edit?usp=sharing" class="ui basic button" target="_blank">
                <i class="table icon"></i>
                元データ
              </a>
            </div>
          </div>
          <div class="extra content">
            <div class="right floated author">
              inspired by <a target="_blank" href="https://ja.wikipedia.org/wiki/%E3%82%AF%E3%82%A8%E3%83%B3%E3%83%86%E3%82%A3%E3%83%B3%E3%83%BB%E3%82%BF%E3%83%A9%E3%83%B3%E3%83%86%E3%82%A3%E3%83%BC%E3%83%8E">wikipedia</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div id="faq" class="ui basic very padded segment">
    <h3 class="ui horizontal divider header">
      <i class="comments icon"></i>
      FAQ
    </h3>

    <div class="ui relaxed items">
      <div class="item">
        <div class="content">
          <div class="header">サービスの利用に料金は必要ですか？</div>
          <div class="description">
            <p>いいえ、THE TIMELINEはすべての機能を無料で利用いただけます。今後有料プランの提供も検討していますが、基本機能はすべて無料でお使いいただけるようにする予定です。</p>
          </div>
        </div>
      </div>
      <div class="ui hidden divider"></div>
      <div class="item">
        <div class="content">
          <div class="header">一度作成した年表を更新するにはどうすればよいですか？</div>
          <div class="description">
            <p>Googleスプレッドシートで元データを編集すれば、THE TIMELINEの年表も自動で最新の内容に更新されます。</p>
          </div>
        </div>
      </div>
      <div class="ui hidden divider"></div>
      <div class="item">
        <div class="content">
          <div class="header">スプレッドシートを公開して、セキュリティ上の問題などないのでしょうか？</div>
          <div class="description">
            <p>
              スプレッドシートを公開しても、誰でも閲覧が可能になるだけで、知らない人が勝手にファイルを編集できるようになるわけではありません（編集権限を一般公開することも可能ですが、おすすめしません）。
              また公開したシート以外の情報が閲覧されることもありませんので、安心してご利用ください。
            </p>
          </div>
        </div>
      </div>
      <div class="ui hidden divider"></div>
      <div class="item">
        <div class="content">
          <div class="header">非公開の年表を作成したいのですが</div>
          <div class="description">
            <p>非公開での年表作成オプションは、有料プランでの提供を検討しています。テスターとしてフィードバックにご協力いただける方には無料で先行提供することも可能ですので、ご興味あればお問い合わせください。</p>
          </div>
        </div>
      </div>
      <div class="ui hidden divider"></div>
      <div class="item">
        <div class="content">
          <div class="header">作成途中の年表を、公開せずに下書きで保存したいのですが</div>
          <div class="description">
            <p>Googleスプレッドシートを公開しなければ、年表が公開されることもありません。作成途中で年表を確認したい場合は、一時的にシートを公開し、年表をご確認ください。シートを非公開に戻せば年表も自動で非公開に戻ります。</p>
          </div>
        </div>
      </div>
      <div class="ui hidden divider"></div>
      <div class="item">
        <div class="content">
          <div class="header">作成した年表を削除したいのですが</div>
          <div class="description">
            <p>Googleスプレッドシートを削除もしくは非公開にすると、年表も自動で閲覧できなくなります。</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div id="contact" class="ui basic very padded center aligned segment">
    <h3 class="ui horizontal divider header">
      <i class="mail outline icon"></i>
      お問い合わせ
    </h3>
    <br />
    <div>
      ご意見・ご要望などあれば、info[at]notsobad.jp までお気軽にご連絡ください。
    </div>
    <br />
  </div>


  <style>
    #top {
      position:relative;
      width:100%;
      background:#16a085;
      padding:0;
      border: none;
    }
    #top > div {
      width:100%;
      padding-top: 80px;
      top:0;
    }
    #top .huge.header { font-size:3.5rem; }
    #top .subheader { font-size:1.5rem; }
    #top .ten.wide.column{
      height:500px;
      overflow:auto;
      -webkit-overflow-scrolling:touch;
      background:#111;
      padding:0 !important;
    }
    #top .ten.wide.column iframe {
      width: 100%;
      height: 100%;
    }
  </style>


  <script>
    var that = this

    firebase.auth().onAuthStateChanged(function(user) {
      that.user = user
    })

    //Show particleGround for PC
    $(function(){
      if(window.innerWidth > 991) {
        $("#top").css('height', '870px')
        $("#top > div").css('position', 'absolute')
        particleground(document.getElementById('top'), {
          dotColor: '#5cbdaa',
          lineColor: '#5cbdaa'
        });
      }
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
      var newPostKey = firebase.database().ref().child('posts').push().key;
      var postData = { title: title, gid: that.gid }

      var updates = {};
      updates['/posts/' + newPostKey] = postData;
      if(that.user) {
        updates['/user-posts/' + that.user.uid + '/' + newPostKey] = postData;
      }
      return firebase.database().ref().update(updates)
    }

    updateGid() {
      var gurl = that.refs.url.value
      var matched = gurl.match(/https:\/\/docs.google.com\/spreadsheets\/d\/(.*)\/?.*/)
      if(matched && matched[1]) {
        that.gid = matched[1]
        that.urlInvalid = false
      }else {
        that.urlInvalid = true
      }
    }
  </script>
</top>
