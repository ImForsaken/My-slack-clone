export interface ChannelNode {
  name: string; // ChannelName
  channelID?: string; // DocumentID in FirebaseCollection
  usedFrom?: string[]; // wer ist alles im Channel
  createdFrom?: string; // nur der Ersteller darf Löschen
  children?: ChannelNode[];
}

export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
