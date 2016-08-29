$(function(){
  var getQueryString = function ( field, url ) {
    var href = url ? url : window.location.href;
    var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
    var string = reg.exec(href);
    return string ? string[1] : null;
  };
  window.key = getQueryString('key')

  Tabletop.init({
    key: key,
    callback: function(data, tabletop) { createTimeline(data, tabletop); },
    simpleSheet: true
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


    var colors = [];
    $.each(data, function(){
      // Display Date
      var display_date = '';
      if($(this)[0]['display_date']) {
        display_date = $(this)[0]['display_date'];
      }else if($(this)[0]['end_date']) {
        display_date = $(this)[0]['start_date'] + '〜' + $(this)[0]['end_date'];
      }else {
        display_date = $(this)[0]['start_date'];
      }
      var content = $(this)[0]['title'] + '&nbsp;<small>(' + display_date + ')</small>';

      // Image
      if($(this)[0]['image_url']) {
        content += '<br><img class="ui tiny centered image" src="' + $(this)[0]['image_url'] + '">';
      }
      $(this)[0]['content'] = content;

      // Set Start & End
      $(this)[0]['start'] = $(this)[0]['start_date'];
      $(this)[0]['end'] = $(this)[0]['end_date'] || null;

      // HTML
      var html = '<h1 class="ui medium header">' + $(this)[0]['title'] + '&nbsp;<small>(' + display_date + ')</small></h1>';
      if($(this)[0]['image_url']) {
        html += '<img class="ui medium image" src="' + $(this)[0]['image_url'] + '">';
      }
      html += $(this)[0]['detail'];
      $(this)[0]['html'] = html;

      // Group
      if(colors.indexOf($(this)[0]['group']) < 0) {
        colors.push($(this)[0]['group']);
      }
    });


    // DOM element where the Timeline will be attached
    var container = document.getElementById('visualization');

    var groups = [];
    $.each(colors, function(index, color){
      groups.push({id: color, content: '', className: color});
    });

    function customOrder (a, b) {
      // order by id
      return a.start - b.start;
    }

    // Configuration for the Timeline
    var options = {
      minHeight: '300px',
      order: customOrder,
      zoomable: false,
      dataAttributes: 'all',
      orientation: {axis: 'both'},
    };

    // Create a Timeline
    var timeline = new vis.Timeline(container, data, groups, options);
    $('.dimmer').removeClass('active');


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
    * Popup
    *****************************************************************/
    $(".vis-item").popup({
      on: 'click',
      exclusive: true,
      position: "top center",
      lastResort: true,
      variation: 'inverted',
    });

    /*****************************************************************
    * Share Modal
    *****************************************************************/
    $(document).on('click', '#menu-share', function(){
      $('.ui.modal').modal('show');
    });
  }
});
