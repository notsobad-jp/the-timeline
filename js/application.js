$(function(){
  /*****************************************************************
  * Main Controller
  *****************************************************************/
  window.timeline = '';
  window.group_names = [];

  //Set Canonical URL
  var canonical_url = setParameterToURL({ 'key': getQueryString('key') });
  //$('link[rel="canonical"]').attr('href', canonical_url);
  $('.menu-maximize').attr('href', canonical_url);

  var gids = getQueryString('key').split("+");
  var requests = [];
  for(i=0;i<gids.length;i++){
    requests.push(tabletopInit(gids[i]));
  }

  $.when.apply($, requests).done(function(){
    var data = [];
    for(i=0;i<arguments.length;i++){
      data = data.concat(arguments[i].data);
    }
    createTimeline(data).done(function(){
      setPopup();
      setRangechangedEvent();
    });

    var title = arguments[0].tabletop['googleSheetName'];
    setMetatags(title, gids[0]);
  });



  /*****************************************************************
  * Core Functions
  *****************************************************************/
  function tabletopInit(gid) {
    var d = $.Deferred();
    Tabletop.init({
      key: gid,
      prettyColumnNames: false,
      simpleSheet: true,
      postProcess: function(element) { formatElement(element); },
      callback: function(data, tabletop) {
        d.resolve({data: data, tabletop: tabletop});
      },
    });
    return d.promise();
  }


  function formatElement(element) {
    // Start
    var month = (element['month']) ? ("0"+element['month']).slice(-2) : "01";
    var day = (element['day']) ? ("0"+element['day']).slice(-2) : "01";
    element['start'] = moment( element['year'] +'-'+ month +'-'+ day + ' ' + element['time'] );

    // End
    element['end'] = null;
    if(element['endyear']){
      if(element['endyear']=='now') {
        element['end'] = moment();
      }else {
        var endmonth = (element['endmonth']) ? ("0"+element['endmonth']).slice(-2) : "01";
        var endday = (element['endday']) ? ("0"+element['endday']).slice(-2) : "01";
        element['end'] = moment( element['endyear'] +'-'+ endmonth +'-'+ endday + ' ' + element['endtime'] );
      }
    }

    // Display date
    if(!element['displaydate']) {
      //Start
      element['displaydate'] += element['year'] + '年';
      if(element['month']) { element['displaydate'] += element['month'] + '月'; }
      if(element['day']) { element['displaydate'] += element['day'] + '日'; }

      if(element['end']){
        element['displaydate'] += "～";
        if(element['endyear']!='now') {
          element['displaydate'] += element['endyear'] + '年';
          if(element['endmonth']) { element['displaydate'] += element['endmonth'] + '月'; }
          if(element['endday']) { element['displaydate'] += element['endday'] + '日'; }
        }
      }
    }

    // Content
    var content = element['title'] + '&nbsp;<small>(' + element['displaydate'] + ')</small>';

    // Image
    if(element['imageurl']) {
      content += '<br><div style="margin:auto;width:80px;height:80px;background-size:cover;background-position:center;background-image:url(\''+element['imageurl']+'\');"></div>';
    }
    element['content'] = content;

    // HTML
    var html = '<h3 class="ui medium header">' + element['title'] + '<div class="ui small grey sub header">' + element['displaydate'] + '</div></h3>';
    if(element['imageurl']) { html += '<div><img class="ui medium image" src="' + element['imageurl'] + '"></div>'; }
    if(element['detail']) { html += '<div class="ui divider"></div>' + element['detail']; }
    if(element['url']) { html += '<div class="ui divider"></div><div style="text-align:center;"><a class="ui right labeled icon inverted basic small button" href="'+ element['url'] +'" target="_blank">詳細を見る<i class="chevron right icon"></i></a></div>' }
    element['html'] = html;

    // Group
    if(group_names.indexOf(element['group']) < 0) {
      group_names.push(element['group']);
    }
  }


  function createTimeline(data) {
    var d = $.Deferred();

    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    var colors = ['red', 'blue', 'green', 'orange', 'yellow', 'olive', 'teal', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
    var groups = [];
    $.each(window.group_names, function(index, group){
      groups.push({id: group, content: group, className: colors[index]});
    });

    // Configuration for the Timeline
    var options = {
      minHeight: 300,
      order: function(a,b){ return a.start - b.start; },
      zoomable: false,
      dataAttributes: 'all',
      orientation: {axis: 'both'},
    };
    if(getQueryString('start')) { options['start'] = getQueryString('start'); }
    if(getQueryString('end')) { options['end'] = getQueryString('end'); }
    var height = getQueryString('height');
    if(height && height > 300) { options['height'] = getQueryString('height'); }

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


  function setMetatags(title, gid) {
    var url = window.location.href;
    //Meta Tags
    var link = '<title>'+ title +' | THE TIMELINE</title>';
    $('meta:last').after(link);
    var link = '<meta name="description" content="'+title+'の年表(タイムライン)です。"/>';
    $('meta:last').after(link);
    var link = '<meta name="keywords" content="'+title+'年表,作成,無料,タイムライン,THE TIMELINE,アプリ,ツール,フリー,ソフト"/>';


    //$('title').text(title + ' | THE TIMELINE');
    $('.menu-title').text(title);
    $('.menu-source').attr("href", 'https://docs.google.com/spreadsheets/d/'+gid);
    /*
    $('meta[property="og:title"]').attr("content", title+' | THE TIMELINE');
    $('meta[property="keywords"]').attr("content", title + ',年表,作成,無料,タイムライン,THE TIMELINE,アプリ,ツール,フリー,ソフト');
    $('meta[property="og:url"]').attr("content", url);
    */

    //Share Modal
    $(".ui.basic.modal .ui.form input").val(url);
    var textarea = '<iframe width="100%" height="500px" seamless frameborder="0" src="'+ url +'"></iframe>';
    $(".ui.basic.modal .ui.form textarea").text(textarea);

    var encoded_url = encodeURIComponent(url);
    $('.fb-share').attr('href', 'https://www.facebook.com/sharer/sharer.php?u='+encoded_url);
    $('.tw-share').attr('href', 'https://twitter.com/share?url='+ encoded_url);
    $('.line-share').attr('href', 'http://line.me/R/msg/text/?'+ encoded_url);
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
        'key': getQueryString('key'),
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
  //指定したキーのURLパラメータを取得する
  function getQueryString(field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
  }

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
