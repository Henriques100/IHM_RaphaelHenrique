import { AlertService } from './../../services/alert.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Component, OnInit } from '@angular/core';
import { IProduto } from 'src/app/models/produto.models';
import { Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

  formulario !: FormGroup
  //inputs
  inDescricao : string = '';
  inPreco : number = 0;

  constructor(
    private produtoService : ProdutoService,
    private alertService : AlertService,
    private router : Router,
    private formBuilder: FormBuilder
    ){}
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      descricao: ['' , Validators.compose([Validators.required, Validators.minLength(5) ])]
      ,
      preco: [0 , Validators.required]
    });
  }

  onCadastrar() {
    if(this.formulario.invalid){
      this.alertService.error('Erro', 'Existem campos pendentes');
      return;
    }

    let produto : IProduto = this.formulario.value;

    this.produtoService.create(produto).subscribe({
      next: (data) => {
        produto = data;
        const tit = 'Sucesso';
        const msg = 'Produto salvo com sucesso'
        this.alertService.sucess(tit,msg);
        this.router.navigate(['/produtotabela']);
      }
      ,
      error: (e) => {
        const tit = 'Erro';
        const msg = e.message;
        this.alertService.error(tit,msg);
      }
    });
  }

}
