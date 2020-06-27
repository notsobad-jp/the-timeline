import { Timeline } from "vis-timeline/standalone";
import { useEffect } from 'react'


export default function Index({items, groups}) {
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
    };

    // Create a Timeline
    const timeline = new Timeline(document.getElementById('timeline'), items, groups, options);
  }, [])

  return (
    <div id='timeline'></div>
  );
}