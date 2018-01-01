export function redirectFromSelect(history, e) {
  history.push(`/${ e.target.value }`);
}
