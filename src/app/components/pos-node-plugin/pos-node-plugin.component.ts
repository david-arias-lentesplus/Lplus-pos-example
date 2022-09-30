import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos-node-plugin',
  templateUrl: './pos-node-plugin.component.html',
  styleUrls: []
})
export class PosNodePluginComponent implements OnInit {

  @Input() info:any;

  printerItem:any;

  constructor() {
  }

  async ngOnInit() {



  }


}
