import { Component } from '@angular/core';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent {
  name: string = 'Willian'
  animal: string = 'Cavalo'
  num_serie: number = 148

  carro: any = {
    cor: 'Azul',
    ano: 1987
  }
}
