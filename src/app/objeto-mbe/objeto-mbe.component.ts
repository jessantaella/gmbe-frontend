import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-objeto-mbe',
  templateUrl: './objeto-mbe.component.html',
  styleUrls: ['./objeto-mbe.component.scss']
})
export class ObjetoMbeComponent {
  @Input() data: any;

}
