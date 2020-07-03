import { Timeline, DataSet } from "vis-timeline/standalone";
import { useEffect, useState, useRef } from 'react'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import ZoominIcon from '@material-ui/icons/Zoomin';
import ZoomoutIcon from '@material-ui/icons/Zoomout';
import ChevronleftIcon from '@material-ui/icons/Chevronleft';
import ChevronrightIcon from '@material-ui/icons/Chevronright';
import RefreshIcon from '@material-ui/icons/Refresh';


const useStyles = makeStyles((theme) => ({
  controller: {
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
  const [hiddenGroups, setHiddenGroups] = useState([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Configuration for the Timeline
    const options = {
      minHeight: 300,
      order: function(a,b){ return b.start - a.start; },
      groupOrder: function (a, b) {
        return a.order - b.order;
      },
      zoomable: false,
      orientation: {axis: 'both'},
      showTooltips: false,
    };

    // Create a Timeline
    let items = data.items;
    let groups = data.groups;
    setTimeline(new Timeline(document.getElementById('timeline'), items, groups, options));

    console.log(timeline);

    // Toggle Group
    // let hiddenGroups = [];
    // const labels = document.querySelectorAll('.vis-label');
    // labels.forEach(el => el.addEventListener('click', event => {
    //   const groupName = event.currentTarget.classList.value.split(" ").slice(-1)[0];
    //   if(hiddenGroups.includes(groupName)) {
    //     setHiddenGroups(hiddenGroups.filter(g => g != groupName));
    //   }else {
    //     setHiddenGroups(hiddenGroups.push(groupName));
    //   }
    //   timeline.setItems( items.filter(item => !hiddenGroups.includes(item.group)) );
    // }));

    return console.log("aaa")
  }, [])



  function zoom(percentage) {
    if(percentage > 0) {
      timeline.zoomIn(percentage);
    } else {
      timeline.zoomOut(Math.abs(percentage));
    }
  }

  function fit() {
    timeline.fit();
  }


  return (
    <>
      <div id="timeline" ref={timelineRef}></div>

      <div className={classes.controller}>
        <ButtonGroup
          disableElevation
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
          size="small"
        >
          <Button onClick={() => zoom(0.2) } className={ classes.button }><ZoominIcon fontSize="small" /></Button>
          <Button onClick={() => zoom(-0.2)} className={ classes.button }><ZoomoutIcon fontSize="small" /></Button>
          <Button className={ classes.button }><ChevronleftIcon fontSize="small" /></Button>
          <Button className={ classes.button }><ChevronrightIcon fontSize="small" /></Button>
          <Button onClick={ fit } className={ classes.button }><RefreshIcon fontSize="small" /></Button>
        </ButtonGroup>
      </div>
    </>
  );
}
