import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:3000/api/productos';  // URL de tu API de Node.js

  constructor(private http: HttpClient) { }

  // Método para obtener los productos
  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
