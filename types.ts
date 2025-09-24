
export interface ActionItem {
  task: string;
  owner?: string;
  deadline?: string;
}

export interface Summary {
  keyPoints: string[];
  decisions: string[];
  actionItems: ActionItem[];
}

export enum InputMode {
  Record = 'record',
  Upload = 'upload',
  Paste = 'paste',
}
