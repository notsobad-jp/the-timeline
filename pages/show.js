import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import { auth, firestore, firebase } from '../lib/firebase.js'
import csv from 'csvtojson'
import request from 'request'
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
    const timeline = new Timeline(document.getElementById('target'), items, groups, options);
  }, [])

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
      <div id='target'></div>
    </Container>
  );
}


export async function getServerSideProps(context) {
  let groupNames = [];
  const result = await new Promise((resolve, reject) => {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSKBGiTAL7Vh4PfnPWdqBOyWWqIZjRnyJ0Q_rTVckz9h8EjO432sTWhT7nUltBvWZawQ2MZsd9ZCfpO/pub?output=csv';
    csv()
      .fromStream(request.get(url))
      .subscribe((json)=>{
        json.content = json["Title"];
        json.start = calcDateTime(json["Year"], json["Month"], json["Day"], json["Time"]);
        if(json["End Year"]){
          json.end = calcDateTime(json["End Year"], json["End Month"], json["End Day"], json["End Time"]);
        }
        json.group = json["Group"];
        if(groupNames.indexOf(json['Group']) < 0) {
          groupNames.push(json['Group']);
        }
      })
      .then((json) => resolve(json))
  })

  const colors = ['red', 'blue', 'green', 'orange', 'yellow', 'olive', 'teal', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
  const groups = [];
  groupNames.forEach((groupName, index) => {
    groups.push({id: groupName, content: groupName, order: index, className: colors[index]});
  });

  return {
    props: {
      items: result,
      groups: groups
    }
  }
}

function calcDateTime(year, month, date, time) {
  let yyyy;
  if(year >= 0) {
    // 年は最低４桁。入力が５桁以上ならそっちに合わせる
    yyyy = year.length > 4 ? year : ("0000" + year).slice(-4);
  }else {
    // 紀元前はマイナス+７桁表示（TODO: 入力が7桁以上のときどうする？？）
    yyyy = ("-0000000" + Math.abs(year)).slice(8);
  }
  const mm = month ? ("00" + month).slice(-2) : "01";
  const dd = date ? ("00" + date).slice(-2) : "01";

  return `${yyyy}-${mm}-${dd} ${time}`
}
