import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { ProdutosService } from '../services/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {
  produtos$: Observable<Produto[]>;

  constructor(private produtosService: ProdutosService) { }

  ngOnInit() {
    this.loadProdutos();
  }

  loadProdutos()
  {
    this.produtos$ = this.produtosService.getProdutos();
  }

  delete(produtoId)
  {
    const ans = confirm('Quer mesmo deletar este produto? ' + produtoId);
    if (ans) {
      this.produtosService.deleteProduto(produtoId).subscribe((data) => {
        this.loadProdutos();
      });
  }
}
}
