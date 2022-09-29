import { Component, VERSION } from '@angular/core';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'prueba-pos';
  name = 'Angular ' + VERSION.major;

  constructor( public _gen:GeneralService ) {}
}
