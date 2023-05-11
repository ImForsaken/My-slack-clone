import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { ChannelNode } from './channelNote.interface';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
/**
 * Hier müssen später unsere Firebase daten rein
 */
const TREE_DATA: ChannelNode[] = [
  {
    name: 'Channels',
    children: [{ name: 'allgemain' }, { name: 'community' }, { name: 'news' }],
  },
];
@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit, AfterViewInit {
  private _transformer = (node: ChannelNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  ngOnInit() {}

  ngAfterViewInit() {}
}
