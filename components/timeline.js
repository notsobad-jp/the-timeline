import { Timeline } from "vis-timeline/standalone";
import { useEffect } from 'react'


export default function Index({data}) {
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
      // width: "calc(100% + 30px)",
      // start: data.window.start,
      // end: data.window.end,
    };

    // Create a Timeline
    const timeline = new Timeline(document.getElementById('timeline'), data.items, data.groups, options);

    // Click Event
    const labels = document.querySelectorAll('.vis-label .vis-inner');
    labels.forEach(el => el.addEventListener('click', event => {
      const groupName = event.target.innerText;
      const targets = document.querySelectorAll(`.${groupName}`);
      targets.forEach(e => e.classList.toggle("closed"));
    }));
  }, [])

  return (
    <div id='timeline'></div>
  );
}
