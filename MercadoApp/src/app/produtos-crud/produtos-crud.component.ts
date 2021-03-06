import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../services/produtos.service';
import { Produto } from '../models/produto';

@Component({
  selector: 'app-produtos-crud',
  templateUrl: './produtos-crud.component.html',
  styleUrls: ['./produtos-crud.component.css']
})
export class ProdutosCRUDComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  produtoId: number;
  errorMessage: any;
  existingProduto: Produto;

  constructor(private produtosService: ProdutosService, private formBuilder: FormBuilder,
              private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formBody = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.produtoId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: this.produtoId,
        nome: '',
        valor: '',
        imagem: ''
      }
    )
  }

  ngOnInit() {

    if (this.produtoId > 0) {
      this.actionType = 'Edit';
      this.produtosService.getProduto(this.produtoId)
        .subscribe(data => (
          this.existingProduto = data,
          this.form.controls['nome'].setValue(data.nome),
          this.form.controls['valor'].setValue(data.valor),
          this.form.controls['imagem'].setValue(data.imagem)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let produto: Produto = {
        id: 0,
        nome: this.form.get('nome').value,
        valor: this.form.get('valor').value,
        imagem: this.form.get('imagem').value

      };

      this.produtosService.saveProduto(produto)
        .subscribe((data) => {
          this.router.navigate(['/produto', data.id]);
        });
    }

    if (this.actionType === 'Edit') {
      let produto: Produto = {
        id: this.existingProduto.id,
        nome: this.form.get('nome').value,
        valor: this.form.get('valor').value,
        imagem: this.form.get('imagem').value
      };
      this.produtosService.updateProduto(produto.id, produto)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formBody); }
}