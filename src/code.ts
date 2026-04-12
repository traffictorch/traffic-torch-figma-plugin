figma.showUI(__html__, {
  width: 420,
  height: 680,
  themeColors: true
});

figma.ui.onmessage = function(msg) {
  if (msg.type === 'LAUNCH_TOOL') {
    const toolBase = msg.toolBase;
    const siteUrl = msg.siteUrl || 'yoursite.com';
    const fullUrl = toolBase + '?url=' + encodeURIComponent(siteUrl);
    figma.openExternal(fullUrl);
    figma.notify('🚀 Opening Traffic Torch tool…', { timeout: 2000 });
  }
};
