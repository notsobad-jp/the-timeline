import { Timeline, DataSet } from "vis-timeline/standalone";
import { useEffect, useState, useReducer } from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import ZoominIcon from '@material-ui/icons/Zoomin';
import ZoomoutIcon from '@material-ui/icons/Zoomout';
import ChevronleftIcon from '@material-ui/icons/Chevronleft';
import ChevronrightIcon from '@material-ui/icons/Chevronright';
import RefreshIcon from '@material-ui/icons/Refresh';
import Tooltip from '@material-ui/core/Tooltip';
import tippy from 'tippy.js';


const useStyles = makeStyles((theme) => ({
  controller: {
    zIndex: 100,
    position: "fixed",
    top: 150,
    right: 30,
    display: 'flex',
  },
  button: {
    background: "#000",
    color: "#fff",
    padding: "12px",
    '&:not(last-child)': {
      borderBottom: "1px solid #333 !important",
    },
    '&:hover': {
      background: "#333",
    },
  }
}));


export default function Index({data}) {
  const classes = useStyles();
  const [timeline, setTimeline] = useState();
  let hiddenGroups = [];

  useEffect(() => {
    if(timeline) { return; }  // 複数回レンダリングを防ぐ

    // Configuration for the Timeline
    const options = {
      minHeight: 300,
      order: function(a,b){ return b.start - a.start; },
      zoomable: false,
      orientation: {axis: 'both'},
      showTooltips: false,
      dataAttributes: ['tippy-content'],
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
      <div id="timeline"></div>

      <div className={classes.controller}>
        <ButtonGroup
          disableElevation
          orientation="vertical"
          aria-label="vertical conta  ined button group"
          variant="contained"
          size="small"
        >
          <Tooltip title="Zoom In" placement="left">
            <Button onClick={() => zoom(0.5) } className={ classes.button }><ZoominIcon fontSize="small" /></Button>
          </Tooltip>
          <Tooltip title="Zoom Out" placement="left">
            <Button onClick={() => zoom(-0.5)} className={ classes.button }><ZoomoutIcon fontSize="small" /></Button>
          </Tooltip>
          <Tooltip title="Move Left" placement="left">
            <Button onClick={() => move(0.2)} className={ classes.button }><ChevronleftIcon fontSize="small" /></Button>
          </Tooltip>
          <Tooltip title="Move Right" placement="left">
            <Button onClick={() => move(-0.2)} className={ classes.button }><ChevronrightIcon fontSize="small" /></Button>
          </Tooltip>
          <Tooltip title="Reset" placement="left">
            <Button onClick={ fit } className={ classes.button }><RefreshIcon fontSize="small" /></Button>
          </Tooltip>
        </ButtonGroup>
      </div>
    </>
  );
}