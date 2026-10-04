figma.showUI(__html__, {
  width: 420,
  height: 680,
  themeColors: true
});

figma.ui.onmessage = function(msg) {
  if (msg.type === 'LAUNCH_TOOL') {
    var toolBase = msg.toolBase;
    var siteUrl = msg.siteUrl || 'yoursite.com';
    var fullUrl = toolBase + (toolBase.endsWith('/') ? '' : '/') + '?url=' + encodeURIComponent(siteUrl);
    figma.openExternal(fullUrl);
    figma.notify('🚀 Opening Traffic Torch tool… Educational & instant!', { timeout: 2000 });
  }
};
