<search>
  <div class="ui basic segment">
    <div class="ui stackable centered grid">
      <div class="ui ten wide column">
        <div class="ui secondary pointing menu">
          <a class="active item" href="#">
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
                <a class="ui icon teal basic button" href={ '/timelines/'+value.data().gid } target="_blank" data-tooltip="年表を見る" data-inverted=""><i class="icon align left"></i></a>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="ui clearing basic segment">
          <div class="ui left floated mini button" onclick={ prevPage } if={ firstVisible }>
            <i class="icon chevron left"></i>
            Prev
          </div>
          <div class="ui right floated mini button" onclick={ nextPage } if={ lastVisible }>
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

    that.firstId = null
    that.lastVisible = null
    that.firstVisible = null

    getItems(args) {
      obs.trigger("dimmerChanged", 'active')

      var docRef = db.collection("timelines")
      // Next
      if(args.startAfter) {
        docRef = docRef.orderBy('createdAt', 'desc').startAfter(args.startAfter)
      // Prev
      }else if(args.endBefore) {
        docRef = docRef.orderBy('createdAt').startAfter(args.endBefore)
      // Initial
      }else {
        docRef = docRef.orderBy('createdAt', 'desc')
      }
      docRef = docRef.limit(that.perPage)

      docRef.get().then(function(querySnapshot){
        that.items = querySnapshot.docs
        if(args.endBefore) { that.items = that.items.reverse() }

        // 最終ページ判定
        if(that.items.length >= that.perPage) {
          that.lastVisible = that.items[that.items.length-1]
        }else {
          that.lastVisible = null
        }

        // 最初にページアクセスしたときに、最初のIDを記録しておく
        if(Object.keys(args).length === 0) {
          that.firstId = that.items[0].data().gid
        // ページ遷移時に、先頭まで戻ったかどうかの判定
        }else {
          if(that.firstId == that.items[0].data().gid) {
            that.firstVisible = null
          }else {
            that.firstVisible = that.items[0]
          }
        }

        that.update()
        obs.trigger("dimmerChanged", '')
      })
    }

    nextPage() {
      that.getItems({startAfter: that.lastVisible})
    }
    prevPage() {
      that.getItems({endBefore: that.firstVisible})
    }


    that.getItems({})
  </script>
</search>
