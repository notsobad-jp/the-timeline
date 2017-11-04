<search>
  <div class="ui basic segment">
    <div class="ui stackable centered grid">
      <div class="ui ten wide column">
        <div class="ui secondary pointing menu">
          <a class="active item" href="create">
            <i class="icon search"></i>
            Explore
          </a>
        </div>

        <table class="ui basic table">
          <tbody>
            <tr each={ value, key in items }>
              <td>{ value.data().title }</td>
              <td class="right aligned">
                <a class="ui icon basic button" href={ 'https://docs.google.com/spreadsheets/d/'+value.data().gid+'/pubhtml' } target="_blank" data-tooltip="元データを見る" data-inverted=""><i class="icon table"></i></a>
                <a class="ui icon teal basic button" href={ 'https://app.the-timeline.jp/?key='+value.data().gid } target="_blank" data-tooltip="年表を見る" data-inverted=""><i class="icon align left"></i></a>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="ui clearing basic segment">
          <div class="ui left floated mini button" onclick={prevPage} if={firstVisible}>
            <i class="icon chevron left"></i>
            Prev
          </div>
          <div class="ui right floated mini button" onclick={nextPage} if={lastVisible}>
            Next
            <i class="icon chevron right"></i>
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
    that.perPage = 20
    obs.trigger("dimmerChanged", 'active')

    that.firstVisible = null
    that.lastVisible = null

    getItems(args) {
      obs.trigger("dimmerChanged", 'active')

      var docRef = db.collection("timelines").orderBy('createdAt', 'desc')
      if(args.lastVisible) {
        docRef = docRef.startAfter(args.lastVisible)
      }else if(args.firstVisible) {
        docRef = docRef.endBefore(args.firstVisible)
      }
      docRef = docRef.limit(that.perPage)

      docRef.get().then(function(querySnapshot){
        // パラメータなし=最初の表示はPrevなし
        if(args.lastVisible || args.firstVisible) {
          that.firstVisible = querySnapshot.docs[0]
        }else {
          that.firstVisible = null
        }
        // 最後のページでなければNext表示
        if(querySnapshot.docs.length >= that.perPage) {
          that.lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]
        }else {
          that.lastVisible = null
        }

        // 0件のときはitemsを変えずにNextのみなくす
        if(querySnapshot.docs.length==0) {
          if(args.lastVisible){ that.lastVisible = null }
          if(args.firstVisible) { that.firstVisible = null }
        }else {
          that.items = querySnapshot.docs
        }

        that.update()
        obs.trigger("dimmerChanged", '')
      })
    }

    nextPage() {
      that.getItems({lastVisible: that.lastVisible})
    }
    prevPage() {
      that.getItems({firstVisible: that.firstVisible})
    }


    that.getItems({})
  </script>
</search>
