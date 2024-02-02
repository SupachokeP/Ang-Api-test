import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpClientModule } from '@angular/common/http';
export class Order {
  ProductId: any;

  Name: any;

  ProductGroup: any;

  SupGroup: any;

  Status: any;

  Qty: any;
}

@Injectable()
export class Service {
  private apiUrl = 'http://localhost:5219/api/Data/GetProductData';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }
}
@Injectable()
export class DataService {
  private UpdateUrl = 'http://localhost:5219/api/Data/UpdateProduct';

  constructor(private http: HttpClient) {}

  updateStatus(productId: any, status: any): Observable<any> {
    console.log(status);
    const url = `${this.UpdateUrl}`;
    const body = { productId, status };
    return this.http.put(url, body);
  }
}
