figma.showUI(__html__, {
  width: 420,
  height: 680,
  position: { x: -1, y: -1 },   // -1 tells Figma to use right sidebar in 2026
  themeColors: true
});

figma.ui.onmessage = function(msg) {
  if (msg.type === 'LAUNCH_TOOL') {
    var toolBase = msg.toolBase;
    var siteUrl = msg.siteUrl || '';
    var fullUrl = siteUrl
      ? toolBase + '?url=' + encodeURIComponent(siteUrl)
      : toolBase;
    figma.openExternal(fullUrl);
    figma.notify('🚀 Opening Traffic Torch tool…', { timeout: 2000 });
  }

  if (msg.type === 'GET_FIGMA_FILE_URL') {
    var fileKey = figma.fileKey;
    var fileUrl = fileKey
      ? 'https://www.figma.com/file/' + fileKey + '/' + encodeURIComponent(figma.root.name || 'Untitled')
      : '';
    figma.ui.postMessage({ type: 'FIGMA_URL', url: fileUrl });
  }
};
