import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosCRUDComponent } from './produtos-crud.component';

describe('ProdutosCRUDComponent', () => {
  let component: ProdutosCRUDComponent;
  let fixture: ComponentFixture<ProdutosCRUDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutosCRUDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutosCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
