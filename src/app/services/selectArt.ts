let types = ['t500x500', 'crop', 't300x300', 'large', 't67x67', 'badge', 'small', 'tiny', 'mini'];

module.exports = (artwork_url: string, selection: string): string => {
  let replaceThis;
  types.forEach(type => {
    if (artwork_url.indexOf(type) > -1) {
      replaceThis = type
    }
  });
  return artwork_url.replace(replaceThis, selection);
}
