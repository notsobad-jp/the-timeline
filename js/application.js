$(function(){
  var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
  };
  window.key = getQueryString('key')

  window.group_names = [];

  Tabletop.init({
    key: key,
    prettyColumnNames: false,
    simpleSheet: true,
    callback: function(data, tabletop) { createTimeline(data, tabletop); },
    postProcess: function(element) {
      // Start
      var month = element['month'] || "01";
      var day = element['day'] || "01";
      element['start'] = moment( element['year'] +'-'+ month +'-'+ day + ' ' + element['time'] );

      // End
      element['end'] = null;
      if(element['endyear']){
        if(element['endyear']=='now') {
	        element['end'] = moment();
        }else {
	        var end_month = element['endmonth'] || "01";
	        var end_day = element['endday'] || "01";
	        element['end'] = moment( element['endyear'] +'-'+ end_month +'-'+ end_day + ' ' + element['endtime'] );
	    }
      }

      // Display date
      if(!element['displaydate']) {
        if(!element['end']){
          element['displaydate'] = element['start'].format("YYYY年M月D日");
        }else if(element['endyear']=='now') {
          element['displaydate'] = element['start'].format("YYYY年M月D日")+"～";
        }else {
          element['displaydate'] = element['start'].format("YYYY年M月D日")+"～"+element['end'].format("YYYY年M月D日");
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
  });


  /*****************************************************************
  * Create Timeline
  *****************************************************************/
  function createTimeline(data, tabletop) {
    // Set Metatags
    var title = tabletop['googleSheetName'];
    $('title').text(title + ' | THE TIMELINE');
    $('#menu-title').text(title);
    $('#menu-source').attr("href", 'https://docs.google.com/spreadsheets/d/'+key);
    $('meta[property="og:title"]').attr("content", title+' | THE TIMELINE');
    $('meta[property="keywords"]').attr("content", title + ',年表,作成,無料,タイムライン,THE TIMELINE,アプリ,ツール,フリー,ソフト');
    $('meta[property="og:url"]').attr("content", window.location.href);

    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    var colors = ['red', 'blue', 'green', 'orange', 'yellow', 'olive', 'teal', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
    var groups = [];
    $.each(window.group_names, function(index, group){
      groups.push({id: group, content: group, className: colors[index]});
    });

    // Configuration for the Timeline
    var options = {
      minHeight: '300px',
      order: function(a,b){ return a.start - b.start; },
      zoomable: false,
      dataAttributes: 'all',
      orientation: {axis: 'both'},
    };

    // Create a Timeline
    try {
      window.timeline = new vis.Timeline(container, data, groups, options);
    }catch(e) {
      console.error(e);
      alert("エラーが発生しました。データが正しく登録されていることを確認してください。");
    }
    $('.dimmer').removeClass('active');


    /*****************************************************************
    * Popup
    *****************************************************************/
    $(".vis-item").popup({
      on: 'click',
      exclusive: true,
      position: "top center",
      lastResort: true,
      variation: 'inverted',
    });
  }

  /*****************************************************************
  * controller
  *****************************************************************/
  /**
   * Move the timeline a given percentage to left or right
   * @param {Number} percentage   For example 0.1 (left) or -0.1 (right)
   */
  function move (percentage) {
      var range = timeline.getWindow();
      var interval = range.end - range.start;

      timeline.setWindow({
          start: range.start.valueOf() - interval * percentage,
          end:   range.end.valueOf()   - interval * percentage
      });
  }

  /**
   * Zoom the timeline a given percentage in or out
   * @param {Number} percentage   For example 0.1 (zoom out) or -0.1 (zoom in)
   */
  function zoom (percentage) {
      var range = timeline.getWindow();
      var interval = range.end - range.start;

      timeline.setWindow({
          start: range.start.valueOf() - interval * percentage,
          end:   range.end.valueOf()   + interval * percentage
      });
  }

  // attach events to the navigation buttons
  $(document).on('click', '#maximize', function(){ timeline.fit(); });
  $(document).on('click', '#zoomIn', function(){ zoom(-0.2); });
  $(document).on('click', '#zoomOut', function(){ zoom(0.2); });
  $(document).on('click', '#moveLeft', function(){ move(0.2); });
  $(document).on('click', '#moveRight', function(){ move(-0.2); });


  /*****************************************************************
  * Keypress Control
  *****************************************************************/
  $( document ).on( "keydown", function( event ) {
    if(event.key == 'ArrowLeft') {
      move(0.3);
      return false;
    }else if(event.key == 'ArrowRight') {
      move(-0.3);
      return false;
    }
  });


  /*****************************************************************
  * Share Modal
  *****************************************************************/
  var url = window.location.href;
  $(".ui.basic.modal .ui.form input").val(url);
  var textarea = '<iframe width="100%" height="500px" seamless frameborder="0" src="'+ url +'"></iframe>';
  $(".ui.basic.modal .ui.form textarea").text(textarea);

  var encoded_url = encodeURIComponent(url);
  $('.fb-share').attr('href', 'https://www.facebook.com/sharer/sharer.php?u='+encoded_url);
  $('.tw-share').attr('href', 'https://twitter.com/share?url='+ encoded_url);
  $('.line-share').attr('href', 'http://line.me/R/msg/text/?'+ encoded_url);

  $(document).on('click', '#menu-share', function(){
    $('.ui.modal').modal('show');
  });
});
