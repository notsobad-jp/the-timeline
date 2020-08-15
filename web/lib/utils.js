export async function getTitleFromSheet(gid) {
  const url = `https://docs.google.com/spreadsheets/d/e/${gid}/pubhtml`;
  const res = await fetch(url);
  const body = await res.text();
  return body.match(/<title>(.*)<\/title>/)[1].replace(/ - Google (ドライブ|Drive)/, "");
}
