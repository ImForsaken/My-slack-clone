export interface ChannelNode {
  name: string;
  children?: ChannelNode[];
}

export interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
