import { Timeline, DataSet } from "vis-timeline/standalone";
import { useEffect, useState, useReducer } from 'react'
import tippy from 'tippy.js';


export default function Index({data}) {
  const [timeline, setTimeline] = useState();
  let hiddenGroups = [];
  let firstRangeChanged = true;

  useEffect(() => {
    if(timeline) { return; }  // 複数回レンダリングを防ぐ

    // Configuration for the Timeline
    const options = {
      minHeight: 300,
      order: function(a,b){ return b.index - a.index; },
      zoomable: false,
      orientation: {axis: 'both'},
      showTooltips: false,
      dataAttributes: ['tippy-content', 'type'],
      onInitialDrawComplete: () => {
        tippy('[data-tippy-content]', {
          allowHTML: true,
          interactive: true,
        });
      },
    };

    // Set start & end if query exists
    const url = new URL(location);
    const start = parseDate(url.searchParams.get('start'));
    if(start) { options["start"] = start; }
    const end = parseDate(url.searchParams.get('end'));
    if(end) { options["end"] = end; }

    // Create a Timeline
    const items = new DataSet(data.items);  // subGroupで折りたたみできるようにDataSetを使う
    const groups = new DataSet(data.groups);
    const tl = new Timeline(document.getElementById('timeline'), items, groups, options);
    setTimeline(tl);
    tl.on('rangechanged', rangeChanged);

    // TODO: unmount時にtimelineを削除する
    return;
  }, [])

  function zoom(percentage) {
    if(percentage > 0) {
      timeline.zoomIn(percentage);
    } else {
      timeline.zoomOut(Math.abs(percentage));
    }
  }

  function move (percentage) {
    const range = timeline.getWindow();
    const interval = range.end - range.start;
    timeline.setWindow({
      start: range.start.valueOf() - interval * percentage,
      end:   range.end.valueOf()   - interval * percentage
    });
  }

  function fit() {
    timeline.fit();
  }

  function rangeChanged(e) {
    // 初回描画時はスキップ
    if(firstRangeChanged) {
      firstRangeChanged = false;
      return;
    }

    const url = new URL(location);
    const start = new Date(e.start).toISOString().replace(/[^0-9]/g, "").slice(0,14)
    const end =   new Date(e.end  ).toISOString().replace(/[^0-9]/g, "").slice(0,14)

    url.searchParams.set("start", start);
    url.searchParams.set("end", end);
    history.replaceState(null, null, url.href);
  }

  // 日付文字列をパースして、有効な日付ならDateを返す
  function parseDate(string) {
    if(!string || string == '') { return }
    const date = new Date(string.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6'));
    if(!isNaN(date)) { return date; }
  }


  return (
    <>
      <div id="timeline" style={{top: "41px", backgroundColor: '#fff'}}></div>

      <div className="fixed top-0 right-0">
        <div className="flex flex-col bg-black text-white w-10 mt-32 mr-6 rounded divide-y divide-gray-800 z-50">
          <div onClick={() => zoom(0.7) } className="w-full cursor-pointer">
            <div className="p-2 fill-current">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"></path></svg>
            </div>
          </div>
          <div onClick={() => zoom(-0.7) } className="w-full cursor-pointer">
            <div className="p-2 fill-current">
              <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"></path></svg>
            </div>
          </div>
          <div onClick={() => move(0.3) } className="w-full cursor-pointer">
            <div className="p-2 fill-current">
              <svg focusable="false" viewBox="3 3 19 19" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
            </div>
          </div>
          <div onClick={() => move(-0.3) } className="w-full cursor-pointer">
            <div className="p-2 fill-current">
              <svg focusable="false" viewBox="3 3 19 19" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
            </div>
          </div>
          <div onClick={fit} className="w-full cursor-pointer">
            <div className="p-2 fill-current">
              <svg focusable="false" viewBox="0 0 25 25" aria-hidden="true"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
