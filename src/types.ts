export interface Tool {
  name: string;
  emoji: string;
  path: string;
}

export interface FigmaPluginMessage {
  type: 'LAUNCH_TOOL' | 'GET_FIGMA_FILE_URL';
  toolBase?: string;
  siteUrl?: string;
}
