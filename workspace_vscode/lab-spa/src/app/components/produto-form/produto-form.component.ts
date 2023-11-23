import { Component } from '@angular/core';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent {
  //inputs
  descricao ?: string = 'Serrote';
  preco ?: number = 55.0;

  onCadastrar() {
    alert('Cadastrar foi clicado');
    alert( this.descricao );
    alert( this.preco );
  }

}
