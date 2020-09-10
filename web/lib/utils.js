import unescape from 'lodash/unescape';

export const parseTitleFromSheet = (body) => {
  let title = "";
  const bodyMatch = body.match(/<title>(.*)<\/title>/)[1];
  if(bodyMatch) {
    title = unescape(bodyMatch).replace(/ - Google (ドライブ|Drive)/, "");
  }
  return title;
}
