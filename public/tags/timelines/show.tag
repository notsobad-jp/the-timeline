<timeline-show>
  <div class="ui fluid container" style="margin-left:0!important;margin-right:0!important;">
    <div class="ui active dimmer">
      <div class="ui indeterminate huge text loader">Loading..</div>
    </div>

    <!-- Timeline Contents -->
    <div id="timeline-container"></div>

    <!-- Controller -->
    <div id="controller" class="ui vertical inverted borderless icon menu">
      <a id="zoomIn" class="item" href="#"><i class="icon zoom"></i></a>
      <a id="zoomOut" class="item" href="#"><i class="icon zoom out"></i></a>
      <a id="moveLeft" class="item" href="#"><i class="icon chevron left"></i></a>
      <a id="moveRight" class="item" href="#"><i class="icon chevron right"></i></a>
      <a id="maximize" class="item" href="#"><i class="icon repeat"></i></a>
    </div>

    <!-- Share Modal -->
    <div class="ui basic modal">
      <i class="close icon"></i>
      <div class="header"></div>
      <div class="image content">
        <div class="description">
          <div class="ui inverted header">共有URL</div>
          <div class="ui form">
            <input type="text" readonly="" value="https://the-timeline.jp/timelines/?key=xxx">
          </div>

          <div class="ui inverted header">SNSシェア</div>
          <div class="ui one column grid">
            <div class="computer only column">
              <a class="fb-share" href="https://www.facebook.com/sharer/sharer.php?u=" target="_blank">
	              <button class="ui facebook medium button">
	                <i class="facebook icon"></i>
	                Facebook
	              </button>
	          </a>
	          <a class="tw-share" href="https://twitter.com/share?url=&text=" target="_blank">
	              <button class="ui twitter medium button">
	                <i class="twitter icon"></i>
	                Twitter&nbsp;
	              </button>
	          </a>
            </div>
            <div class="mobile tablet only column">
              <a class="fb-share" href="https://www.facebook.com/sharer/sharer.php?u=" target="_blank">
	              <button class="ui icon facebook button circular">
	                <i class="facebook f icon"></i>
	              </button>
	          </a>
	          <a class="tw-share" href="https://twitter.com/share?url=&text=" target="_blank">
	              <button class="ui twitter icon button circular">
	                <i class="twitter icon"></i>
	              </button>
	          </a>
	          <a class="line-share" href="https://line.me/R/msg/text/?" target="_blank">
	              <button class="ui green icon button circular">
	                <i class="comment icon"></i>
	              </button>
	          </a>
            </div>
          </div>

          <div class="ui inverted header">埋め込み用タグ</div>
          <div class="ui form">
            <textarea readonly="" style="resize:none;"><iframe width="100%" height="500px" seamless frameborder='0' src=""></iframe></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>

	<script>
$(function(){
	var that = this
  /*****************************************************************
  * Main Controller
  *****************************************************************/
  window.timeline = '';
  window.group_names = [];


	firebase.database().ref('/timelines/' + opts.id).once('value').then(function(snapshot) {
		timeline = snapshot.val()
    $.each(timeline.data, function(index, row){
			row = formatElement(row)
    })

    createTimeline(timeline.data).done(function(){
      setPopup();
      setRangechangedEvent();
    })
	})


  /*****************************************************************
  * Core Functions
  *****************************************************************/
  function formatElement(element) {
    // Start
    var month = (element.startMonth) ? ("0"+element.startMonth).slice(-2) : "01";
    var day = (element.startDay) ? ("0"+element.startDay).slice(-2) : "01";
    var year = element.startYear;
    if(element.startYear < 0){
      var year_num = element.startYear.replace('-', '');
      year = '-'+('000000' + year_num).slice(-6);
    }
    element.start = moment( year +'-'+ month +'-'+ day + ' ' + element.startTime );

    // End
    element.end = null;
    if(element.endYear){
      if(element.endYear=='now') {
        element.end = moment();
      }else {
        var endMonth = (element.endMonth) ? ("0"+element.endMonth).slice(-2) : "01";
        var endDay = (element.endDay) ? ("0"+element.endDay).slice(-2) : "01";

        var endYear = element.endYear;
        if(element.endYear < 0){
          var endYear_num = element.endYear.replace('-', '');
          endYear = '-'+('000000' + endYear_num).slice(-6);
        }
        element.end = moment( endYear +'-'+ endMonth +'-'+ endDay + ' ' + element.endTime );
      }
    }

    // Display date
    if(!element.displayDate) {
      //Start
      element.displayDate += element.startYear + '年';
      if(element.startMonth) { element.displayDate += element.startMonth + '月'; }
      if(element.startDay) { element.displayDate += element.startDay + '日'; }

      if(element.end){
        element.displayDate += "～";
        if(element.endYear!='now') {
          element.displayDate += element.endYear + '年';
          if(element.endMonth) { element.displayDate += element.endMonth + '月'; }
          if(element.endDay) { element.displayDate += element.endDay + '日'; }
        }
      }
    }

    // Type
    if(!element.type && !element.end) { element.type = 'point'; }

    // Content
    var content = element.title + '&nbsp;<small>(' + element.displayDate + ')</small>';

    // Image
    if(element.imageUrl && element.type=='box') {
      content += '<br><div style="margin:auto;width:80px;height:80px;background-size:cover;background-position:center;background-image:url(\''+element.imageUrl+'\');"></div>';
    }
    element.content = content;

    // HTML
    var html = '<h3 class="ui medium header">' + element.title + '<div class="ui small grey sub header">' + element.displayDate + '</div></h3>';
    if(element.imageUrl) { html += '<div><img class="ui medium image" src="' + element.imageUrl + '"></div>'; }
    if(element.detail) { html += '<div class="ui divider"></div>' + element.detail; }
    if(element.url) { html += '<div class="ui divider"></div><div style="text-align:center;"><a class="ui right labeled icon inverted basic small button" href="'+ element.url +'" target="_blank">詳細を見る<i class="chevron right icon"></i></a></div>' }
    element.html = html;

    // Colors
    if(element.color) { element.className = element.color; }

    // Group
    if(group_names.indexOf(element.group) < 0) {
      group_names.push(element.group);
    }
  }


  function createTimeline(data) {
    var d = $.Deferred();

    // DOM element where the Timeline will be attached
    var container = document.getElementById('timeline-container');

    var colors = ['red', 'blue', 'green', 'orange', 'yellow', 'olive', 'teal', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
    var groups = [];
    $.each(window.group_names, function(index, group){
      groups.push({id: group, content: group, order: index, className: colors[index]});
    });

    // Configuration for the Timeline
    var options = {
      minHeight: 300,
      order: function(a,b){ return b.start - a.start; },
      groupOrder: function (a, b) {
        return a.order - b.order;
      },
      zoomable: false,
      dataAttributes: 'all',
      orientation: {axis: 'both'},
    };

    // Create a Timeline
    try {
      timeline = new vis.Timeline(container, data, groups, options);
      d.resolve();
    }catch(e) {
      console.error(e);
      alert("エラーが発生しました。データが正しく登録されていることを確認してください。");
      d.reject();
    }finally {
      $('.dimmer').removeClass('active');
    }
    return d.promise();
  }


  /*****************************************************************
  * Timeline Controller
  *****************************************************************/
  //ポップアップ設定
  function setPopup() {
    $(".vis-item").popup({
      on: 'click',
      exclusive: true,
      position: "top center",
      lastResort: true,
      variation: 'inverted',
    });
  }

  //表示範囲変更時にURLパラメータ追加
  function setRangechangedEvent() {
    timeline.on('rangechanged', function (properties) {
      var visible_url = setParameterToURL({
        'key': opts.id,
        'start': moment(properties.start).format("YYYYMMDDHHmmSS"),
        'end': moment(properties.end).format("YYYYMMDDHHmmSS"),
      });

      if(window.location.protocol.match(/https?:/)) {
        history.replaceState(null, null, visible_url);
      }
    });
  }

  //表示範囲の移動
  function move (percentage) {
    var range = timeline.getWindow();
    var interval = range.end - range.start;

    timeline.setWindow({
      start: range.start.valueOf() - interval * percentage,
      end:   range.end.valueOf()   - interval * percentage
    });
  }

  //表示範囲のズーム
  function zoom (percentage) {
    var range = timeline.getWindow();
    var interval = range.end - range.start;

    timeline.setWindow({
      start: range.start.valueOf() - interval * percentage,
      end:   range.end.valueOf()   + interval * percentage
    });
  }

  $(document).on('click', '#maximize', function(){ timeline.fit(); });
  $(document).on('click', '#zoomIn', function(){ zoom(-0.2); });
  $(document).on('click', '#zoomOut', function(){ zoom(0.2); });
  $(document).on('click', '#moveLeft', function(){ move(0.2); });
  $(document).on('click', '#moveRight', function(){ move(-0.2); });

  $(document).on('click', '.menu-share', function(){ $('.ui.modal').modal('show'); });
  // Keypress Control
  $( document ).on( "keydown", function( event ) {
    if(event.key == 'ArrowLeft') {
      move(0.3);
    }else if(event.key == 'ArrowRight') {
      move(-0.3);
    }
  });



  /*****************************************************************
  * Utility
  *****************************************************************/
  //パラメータを設定したURLを返す
  function setParameterToURL( paramsArray ) {
    var resurl = location.href.replace(/\?.*$/,"");
    for ( field in paramsArray ) {
      resurl += (resurl.indexOf('?') == -1) ? '?':'&';
      resurl += field + '=' + paramsArray[field];
    }
    return resurl;
  }
});
	</script>
</timeline-show>
