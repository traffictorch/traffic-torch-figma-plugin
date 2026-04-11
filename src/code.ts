figma.showUI(__html__, {
  width: 420,
  height: 680,
  themeColors: true
});

figma.ui.onmessage = function(msg) {
  if (msg.type === 'GET_FIGMA_FILE_URL') {
    const fileKey = figma.fileKey;
    const fileUrl = fileKey
      ? 'https://www.figma.com/file/' + fileKey + '/' + encodeURIComponent(figma.root.name || 'Untitled')
      : '';
    figma.ui.postMessage({ type: 'FIGMA_URL', url: fileUrl });
  }

  if (msg.type === 'LAUNCH_TOOL') {
    const toolBase = msg.toolBase;
    const siteUrl = msg.siteUrl || '';
    const fullUrl = siteUrl
      ? toolBase + '?url=' + encodeURIComponent(siteUrl)
      : toolBase;
    figma.openExternal(fullUrl);
    figma.notify('🚀 Opening Traffic Torch tool…', { timeout: 2000 });
  }
};
