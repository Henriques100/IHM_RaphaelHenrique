import { AlertService } from './../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { IProduto } from 'src/app/models/produto.models';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-tabela',
  templateUrl: './produto-tabela.component.html',
  styleUrls: ['./produto-tabela.component.scss']
})
export class ProdutoTabelaComponent implements OnInit{
  produtos : IProduto[] = [];
  constructor(
    private service: ProdutoService,
    private alertService: AlertService
    ) {
  }
  ngOnInit(): void {
    this.service.findAll().subscribe({
      next: (dados) => {
        this.produtos = dados;
        const tit = 'Sucesso ao buscar produtos';
        const msg = 'A tabela mostrar os produtos encontrados'
        this.alertService.sucess(tit,msg);
      }
      ,
      error: (e) => {
        const tit = 'Erro buscando produtos';
        const msg = e.message;
        this.alertService.error(tit,msg);
        console.error(e);
      }
    });
  }
}
