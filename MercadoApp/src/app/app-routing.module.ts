import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutosCRUDComponent } from './produtos-crud/produtos-crud.component';
import { ProdutosComponent } from './produtos/produtos.component';


const routes: Routes = [
  { path: '', component: ProdutosComponent, pathMatch: 'full' },
  { path: 'produto/:id', component: ProdutoComponent },
  { path: 'add', component: ProdutosCRUDComponent },
  { path: 'produto/edit/:id', component: ProdutosCRUDComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
