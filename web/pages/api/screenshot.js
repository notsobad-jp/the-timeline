import puppeteer from 'puppeteer'
import path from 'path';

export default async (req, res) => {
  const gid = req.query.gid;
  if(!gid) { return res.status(404).end(); }

  const URL = `${process.env.NEXT_PUBLIC_APP_ROOT}/${gid}`;

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 150,
  });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1200,
    height: 800,
  });

  await page.goto(URL);
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
