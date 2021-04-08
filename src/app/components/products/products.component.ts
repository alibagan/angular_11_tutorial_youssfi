import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../service/ProductsService';
import {Product} from '../../model/product.model';
import {Observable, of, pipe} from 'rxjs';
import {AppDataState, DataStateEnum} from '../../state/product.state';
import {catchError, map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products$: Observable<AppDataState<Product[]>> | null = null;
  readonly dataStateEnum: DataStateEnum;
  LOADING = DataStateEnum.LOADING;
  LOADED = DataStateEnum.LOADED;
  ERROR = DataStateEnum.ERROR;

  constructor(private productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
  }

  onSelectAllProducts() {
    this.products$ = this.productsService.getAllProducts().
      pipe(
        map(data => {
          console.log(data);
          return  ({
            dataState: DataStateEnum.LOADED,
            data: data
          })
        }
         ),
        startWith({
          dataState: DataStateEnum.LOADING
        }),
        catchError(err => of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message
        })));
  }

  onSelctedProducts() {
    this.products$ = this.productsService.getSelectedProducts().
    pipe(
      map(data => {
          console.log(data);
          return  ({
            dataState: DataStateEnum.LOADED,
            data: data
          })
        }
      ),
      startWith({
        dataState: DataStateEnum.LOADING
      }),
      catchError(err => of({
        dataState: DataStateEnum.ERROR,
        errorMessage: err.message
      })));
  }

  onAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts()
      .pipe(
        map(data => {
          console.log(data);
          return ({
            dataState: DataStateEnum.LOADED,
            data: data
          })
        }),
        startWith({
          dataState: DataStateEnum.LOADING
        }),
        catchError(err => of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message
        }))
      );
  }

  onSearchProducts(dataForm: any){
    this.products$ = this.productsService.searchProducts(dataForm.keyword)
      .pipe(
        map(data => {
          console.log(data);
          return ({
            dataState: DataStateEnum.LOADED,
            data: data
          })
        }),
        startWith({
          dataState: DataStateEnum.LOADING
        }),
        catchError(err => of({
          dataState: DataStateEnum.ERROR,
          errorMessage: err.message
        }))
      );
  }

  onChangeSelected(p: Product){
    this.productsService.changeSelect(p).subscribe(data => {
      p.selected = data.selected;
    });
  }

  onDeleteProduct(p: Product){
    let v = confirm("Etes vous sur de bien vouloir supprimer ce produit")
    if(v == true){
      this.productsService.deleteProduct(p).subscribe(data => {
        this.onSelectAllProducts();
      })
    }
  }

  onNewProduct() {
    this.router.navigateByUrl("/new-product");
  }

  onEdit(p: Product){
    this.router.navigateByUrl("/edit-product/"+ p.id);
  }
}









































