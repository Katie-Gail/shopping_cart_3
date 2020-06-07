import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  apiURL: string = 'http://localhost:3000';
  getAllItems(): any {
    return this.http.get(`${this.apiURL}/cart-items`);
  }
  addItem(item: Item): any {
    return this.http.post(`${this.apiURL}/cart-items`, item);
  }
  deleteItem(id: number): any {
    return this.http.delete(`${this.apiURL}/cart-items/${id}`);
  }
  updateItem(id: number, item: Item): any {
    return this.http.put(`${this.apiURL}/cart-items/${id}`, item);
  }
}
