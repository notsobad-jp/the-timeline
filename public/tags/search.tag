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
      </div>
    </div>
  </div>

  <style>
    .grid { margin: 30px 0; }
  </style>

  <script>
    var that = this
    obs.trigger("dimmerChanged", 'active')

    var docRef = db.collection("timelines").orderBy('createdAt', 'desc')
    docRef.get().then(function(querySnapshot){
      that.items = querySnapshot.docs
      that.update()
      obs.trigger("dimmerChanged", '')
    })
  </script>
</search>
