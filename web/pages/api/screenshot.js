let chrome = {};
let puppeteer = {};
if(process.env.AWS_LAMBDA_FUNCTION_VERSION){
  //Vercel
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
}else{
  //Local Test
  puppeteer = require('puppeteer');
}

export default async (req, res) => {
  const gid = req.query.gid;
  if(!gid) { return res.status(404).end(); }

  const URL = `${process.env.NEXT_PUBLIC_APP_ROOT}/${gid}`;

  const browser = await puppeteer.launch({
    slowMo: 150,
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: chrome.headless,
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 800,
  });
  await page.goto(URL);

  await page.evaluate(() => {
    let style = document.createElement('style');
    style.textContent = `
      @import url('//fonts.googleapis.com/css?family=Source+Code+Pro');
      @import url('//fonts.googleapis.com/earlyaccess/notosansjp.css');
    `;
    document.head.appendChild(style);
    document.body.style.fontFamily = "'Noto Sans JP', sans-serif";
  });

  const imgBinary = await page.screenshot({
    encoding: 'binary',
    // fullPage: true,
  });
  await browser.close();

  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Content-Length', imgBinary.length);
  res.setHeader('Cache-Control', `public, s-maxage=${60*60}, stale-while-revalidate`);  // とりあえず1時間キャッシュ
  res.end(imgBinary, "binary");
}
