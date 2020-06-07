import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Item } from '../interfaces/item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  showIndex: number = null;
  cartItems: Item[] = [];
  constructor(private service: CartService) {}

  ngOnInit(): void {
    this.getAllItems();
  }
  getAllItems() {
    this.service.getAllItems().subscribe((response) => {
      this.cartItems = response;
      console.log(response);
    });
  }

  addItem(form: NgForm): void {
    console.log(form.value);
    //asynchronous; only capture array after the item has been added
    this.service.addItem(form.value).subscribe(() => {
      this.getAllItems();
      form.reset();
    });
  }
  deleteItem(id: number): void {
    this.service.deleteItem(id).subscribe(() => {
      this.getAllItems();
    });
  }
  updateItem(form: NgForm, item: Item): void {
    let updatedItem = item;
    updatedItem.quantity = form.value.quantity;

    this.service.updateItem(item.id, updatedItem).subscribe(() => {
      this.getAllItems();
      this.showIndex = null;
    });
  }
  showForm(index: number): void {
    this.showIndex = index;
  }
}
