import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Output, Input  } from '@angular/core';

@Component({
  selector: 'hb-button',
  template: `
  <div id="hb-boton" (click)="onClick()">
      <ion-card>
        <ion-card-content class="imagen">
            <ion-icon src="{{imagen}}" part="icon"></ion-icon>
        </ion-card-content>
      </ion-card>
      <div class="titulo">
        <ion-title>{{titulo}}</ion-title>
      </div>
  </div>
  `,
  styles: `
    .imagen {
      ion-icon{
        font-size: 48px;
        fill: #000000;
      }
    }
    ion-card{
      background-color: #FFFFFF;
      
      ion-card-content {
          text-align: center;
          padding: 8px 25%;
          display: flex;
          align-items: center;
          justify-content: center;
      }
    }  
    #hb-boton ion-title{
      font-size: 0.75rem;
      text-align: center;
      text-transform: capitalize;
      font-weight: 800;
      color: #000000;
      padding-left: 2px;
      padding-right: 2px;
    }

  `,
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ButtonBoxComponent  implements OnInit {
  @Input() titulo: string = '';
  @Input() imagen: string = '';
  @Output() actionClicked = new EventEmitter<number>();

  constructor() { }

  onClick() {
    this.actionClicked.emit();
  }
  ngOnInit() {}

}