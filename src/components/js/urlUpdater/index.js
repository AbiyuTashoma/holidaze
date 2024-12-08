function urlUpdater(currentUrl, newPage) {
  return currentUrl.slice(0, currentUrl.length - 1) + newPage;
}

export default urlUpdater;
