"use strict";
figma.showUI(__html__, {
    width: 420,
    height: 680,
    themeColors: true // auto syncs with Figma dark/light mode
});
figma.ui.onmessage = (msg) => {
    if (msg.type === 'LAUNCH_TOOL') {
        const { toolBase, siteUrl } = msg;
        const fullUrl = siteUrl
            ? `${toolBase}?url=${encodeURIComponent(siteUrl)}`
            : toolBase;
        figma.openExternal(fullUrl);
        figma.notify('🚀 Opening Traffic Torch tool… Educational & instant!', { timeout: 2500 });
    }
    if (msg.type === 'GET_FIGMA_FILE_URL') {
        const fileKey = figma.fileKey;
        const fileUrl = fileKey
            ? `https://www.figma.com/file/${fileKey}/${encodeURIComponent(figma.root.name || 'Untitled')}`
            : '';
        figma.ui.postMessage({ type: 'FIGMA_URL', url: fileUrl });
    }
};
