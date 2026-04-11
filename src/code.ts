figma.showUI(__html__, {
  width: 420,
  height: 680,
  themeColors: true
});

// Send Figma preview URL immediately and on request
function sendFigmaUrl() {
  const fileKey = figma.fileKey;
  const fileUrl = fileKey
    ? 'https://www.figma.com/file/' + fileKey + '/' + encodeURIComponent(figma.root.name || 'Untitled')
    : '';
  figma.ui.postMessage({ type: 'FIGMA_URL', url: fileUrl });
}

sendFigmaUrl();  // send on plugin open

figma.ui.onmessage = function(msg) {
  if (msg.type === 'GET_FIGMA_FILE_URL') {
    sendFigmaUrl();
  }

  if (msg.type === 'LAUNCH_TOOL') {
    var toolBase = msg.toolBase;
    var siteUrl = msg.siteUrl || '';
    var fullUrl = siteUrl
      ? toolBase + '?url=' + encodeURIComponent(siteUrl)
      : toolBase;
    figma.openExternal(fullUrl);
    figma.notify('🚀 Opening Traffic Torch tool…', { timeout: 2000 });
  }
};
