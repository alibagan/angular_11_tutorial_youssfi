import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';

@Injectable({providedIn: "root"})
export class ProductsService{

  constructor(private http: HttpClient){

  }

  getAllProducts():Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host);
  }

  getSelectedProducts():Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host+"?selected=true");
  }

  getAvailableProducts():Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host+ "?available=true")
  }

  searchProducts(keyword: string):Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host+ "?name_like=" + keyword)
  }

  changeSelect(p: Product):Observable<Product>{
    let host = environment.host;
    p.selected = !p.selected;
    return this.http.put<Product>(host+"/"+p.id, p);
  }

  deleteProduct(p: Product): Observable<void>{
    let host = environment.host;
    return this.http.delete<void>(host + "/" + p.id);
  }

  saveProduct(p: Product): Observable<Product>{
    let host = environment.host;
    return this.http.post<Product>(host, p);
  }

  getProduct(id: number): Observable<Product>{
    let host = environment.host;
    return this.http.get<Product>(host + "/" + id);
  }

  updateProduct(p: Product): Observable<Product>{
    let host = environment.host;
    return this.http.put<Product>(host + "/" + p.id, p);
  }



















}




















