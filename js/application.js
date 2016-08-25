$(function(){
  /*****************************************************************
  * Create Timeline
  *****************************************************************/
  // DOM element where the Timeline will be attached
  var container = document.getElementById('visualization');

  // Create a DataSet
  var items = [
    {id: 'A', content: '平成<small>(1989~)</small>', start: '1989', end: '2016', group: 1},
    {id: 'B', content: '昭和<small>(1926~1988)</small>', start: '1926', end: '1988', group: 1},
    {id: 'C', content: '大正<small>(1912~1926)</small>', start: '1912', end: '1926', group: 1},
    {id: 'D', content: '明治<small>(1868~1912)</small>', start: '1868', end: '1912', group: 1},
    {id: 'E', content: '江戸<small>(1588~1867)</small>', start: '1588', end: '1867', group: 1},

    {id: 10001, content: 'ボルタ', start: '1745-02-18', end: '1827-03-05', group: 2},
    {id: 10002, content: 'ガウス', start: '1777-04-30', end: '1855-02-23', group: 2},
    {id: 10003, content: 'オーム', start: '1789-03-16', end: '1854-07-06', group: 2},

    {id: 1, content: 'ゲーリッケの硫黄球<br><small>(1660年)</small>', html: '<h1 class="ui medium header">ゲーリッケの硫黄球&nbsp;<small>（1660年）</small></h1><img class="ui centered medium image" src="http://www.westatic.com/img/dict/dkijt/guericke_test2.jpg">', start: '1660', group: 3},
    {id: 2, content: 'ライデン瓶<br><small>（1746年）</small>', start: '1746', group: 3},
    {id: 3, content: 'ボルタの電気盆<br><small>（1775年）</small>', start: '1775', group: 3},
    {id: 4, content: 'フランクリンの凧<br><small>（1752年）</small>', start: '1752', group: 3},
    {id: 5, content: 'クーロンの法則<br><small>（1789年）</small>', start: '1789', group: 3},
    {id: 6, content: 'ガウスの法則<br><small>（19世紀中頃）</small>', start: '1850', group: 3},
    {id: 7, content: 'ウェーバの法則<br><small>（19世紀中頃）</small>', start: '1850', group: 3},
    {id: 8, content: 'カルバーニの生物電気仮説<br><small>（1791年）</small>', start: '1791', group: 3},
    {id: 9, content: 'ボルタの電池<br><small>（1799年）</small>', start: '1799', group: 3},
    {id: 10, content: 'ダニエル電池<br><small>（1836年）</small>', start: '1836', group: 3},
    {id: 11, content: 'カーライルの水の電気分解<br><small>（1800年）</small>', start: '1800', group: 3},
    {id: 12, content: 'ゼーベック効果<br><small>（1821年）</small>', start: '1821', group: 3},
    {id: 13, content: 'ペルチェ効果<br><small>（1834年）</small>', start: '1834', group: 3},
    {id: 14, content: 'オームの法則<br><small>（1826年）</small>', start: '1826', group: 3},
    {id: 15, content: 'キルヒホッフの法則<br><small>（1845年）</small>', start: '1845', group: 3},
    {id: 16, content: 'エルステッドの発見<br><small>（1820年）</small>', start: '1820', group: 3},
  ];

  var groups = [
    {id: 1, content: '日本', className: 'red'},
    {id: 2, content: '科学者', className: 'blue'},
    {id: 3, content: '出来事', className: 'green'},
  ];

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
  var timeline = new vis.Timeline(container, items, groups, options);


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
  $(document).on('click', '.vis-item', function(){
  	console.log($(this).attr('data-content'));
  });
});


/*****************************************************************
* Google Spread Sheet
*****************************************************************/
// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '99804693575-7boqb6fb5l98d1mfc9890feb4fi6i7kt.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');
  if (authResult && !authResult.error) {
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadSheetsApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
  }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize(
    {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
    handleAuthResult);
  return false;
}

/**
 * Load Sheets API client library.
 */
function loadSheetsApi() {
  var discoveryUrl =
      'https://sheets.googleapis.com/$discovery/rest?version=v4';
  gapi.client.load(discoveryUrl).then(listMajors);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      appendPre('Name, Major:');
      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        // Print columns A and E, which correspond to indices 0 and 4.
        appendPre(row[0] + ', ' + row[4]);
      }
    } else {
      appendPre('No data found.');
    }
  }, function(response) {
    appendPre('Error: ' + response.result.error.message);
  });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('output');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}
