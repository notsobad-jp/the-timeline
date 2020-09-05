export const getTitleFromSheet = async (gid) => {
  const url = `https://docs.google.com/spreadsheets/d/e/${gid}/pubhtml`;
  const body = await fetch(url).then(res => res.text());
  return body.match(/<title>(.*)<\/title>/)[1].replace(/ - Google (ドライブ|Drive)/, "");
}
