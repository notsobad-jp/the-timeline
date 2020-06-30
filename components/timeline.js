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

    // Toggle Group
    let hiddenGroups = [];
    const labels = document.querySelectorAll('.vis-label');
    labels.forEach(el => el.addEventListener('click', event => {
      const groupName = event.currentTarget.classList.value.split(" ").slice(-1)[0];
      if(hiddenGroups.includes(groupName)) {
        hiddenGroups = hiddenGroups.filter(g => g != groupName);
      }else {
        hiddenGroups.push(groupName);
      }
      timeline.setItems( items.filter(item => !hiddenGroups.includes(item.group)) );
    }));
  }, [])

  return (
    <div id='timeline'></div>
  );
}
