import { Timeline, DataSet } from "vis-timeline/standalone";
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
    };

    // Create a Timeline
    let items = data.items;
    let groups = data.groups;
    const timeline = new Timeline(document.getElementById('timeline'), items, groups, options);

    // Click Event
    const labels = document.querySelectorAll('.vis-label .vis-inner');
    labels.forEach(el => el.addEventListener('click', event => {
      const groupName = event.target.innerText;
      const targets = document.querySelectorAll(`.${groupName}`);
      timeline.setData({
        groups: groups,
        items: items.filter(item => item.group == `${groupName}0`)
      });
    }));
  }, [])

  return (
    <div id='timeline'></div>
  );
}
