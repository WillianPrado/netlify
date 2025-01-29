import { Component } from '@angular/core';

@Component({
  selector: 'app-calcular-lance',
  templateUrl: './calcular-lance.component.html',
  styleUrls: ['./calcular-lance.component.css']
})
export class CalcularLanceComponent  {
  valorFinal: number = 0;
  valorOriginal: number | null = null;

  calcularValorOriginal() {
    if (this.valorFinal > 0) {
      const fator = 1 - 0.30;
      this.valorOriginal = this.valorFinal / fator;
    } else {
      this.valorOriginal = null;
    }
  }
}
