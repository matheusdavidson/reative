export function isServer() {
  return typeof module !== 'undefined' && module.exports;
}
