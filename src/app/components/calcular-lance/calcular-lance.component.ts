import { Component } from '@angular/core';

@Component({
  selector: 'app-calcular-lance',
  templateUrl: './calcular-lance.component.html',
  styleUrls: ['./calcular-lance.component.css']
})
export class CalcularLanceComponent  {
  valorOriginal: number | null = null;
  valorFinal: number | null = null;
  valorFinalFormatado: string = '';

  calcularValorOriginal() {
    if (this.valorFinal && this.valorFinal > 0) {
      const fator = 1 - 0.30;
      this.valorOriginal = this.valorFinal / fator;
    } else {
      this.valorOriginal = null;
    }
  }

  onValorFinalChange(valor: string) {
    // Remove separadores e mantém apenas números
    let numeroLimpo = valor.replace(/\D/g, '');

    // Atualiza `valorFinal` com o número sem formatação
    this.valorFinal = numeroLimpo ? parseInt(numeroLimpo, 10) : null;

    // Atualiza a exibição do campo com separador de milhar
    this.valorFinalFormatado = this.valorFinal ? this.valorFinal.toLocaleString('pt-BR') : '';

    // Calcula o valor original sempre que houver alteração no input
    this.calcularValorOriginal();
  }
}
