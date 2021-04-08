import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductsService} from '../../service/ProductsService';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../model/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  productFormGroup?: FormGroup;
  submitted: boolean = false;
  productId: number;

  constructor(private fb: FormBuilder,
              private productService: ProductsService,
              private activatedRoute: ActivatedRoute) {
    this.productId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId)
      .subscribe(product => {
        this.productFormGroup = this.fb.group({
          id: [product.id, Validators.required],
          name: [product.name, Validators.required],
          price: [product.price, Validators.required],
          quantity: [product.quantity, Validators.required],
          selected: [product.selected, Validators.required],
          available: [product.available, Validators.required]
        })
      })
  }

  onUpdateProduct(product: Product){
    this.submitted = true;
    if(this.productFormGroup?.invalid) return;
    this.productService.updateProduct(product).subscribe(data => {
      alert("Success");
    })
  }

}























