import { Component, Input, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-pos-html',
  templateUrl: './pos-html.component.html',
  styleUrls: []
})
export class PosHtmlComponent implements OnInit {

  @Input() info:any;

  public config = {
    printMode: 'template-popup',
    popupProperties: 'toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,fullscreen=yes',
    pageTitle: '',
    templateString: '',
    stylesheets: [{ rel: 'stylesheet', href: '/assets/printCss/printStyle.css' }],
    styles: []
  }

  constructor( public _gen:GeneralService ) { }

  ngOnInit(): void {    
  }

}
