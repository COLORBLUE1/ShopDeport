import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

interface Producto {
  ID: number;
  NOMBRE: string;
  DESCRIPCION: string;
  PRECIO: number;
  UNIDADES: number;
  MARCA: string;
  DISTRIBUIDOR: string;
  URLIMAGEN: string;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class ProductosPage implements OnInit {
  productos: Producto[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.http.get<Producto[]>('http://localhost:3000/api/productos', {
      headers: { 'Cache-Control': 'no-cache' } // Para evitar la caché del navegador
    }).subscribe(
      (data) => {
        this.productos = data.map((producto) => ({
          ID: producto.ID,
          NOMBRE: producto.NOMBRE,
          DESCRIPCION: producto.DESCRIPCION,
          PRECIO: producto.PRECIO,
          UNIDADES: producto.UNIDADES,
          MARCA: producto.MARCA,
          DISTRIBUIDOR: producto.DISTRIBUIDOR,
          URLIMAGEN: producto.URLIMAGEN,
        }));
      },
      (error) => {
        console.error('Error al cargar productos', error);
      }
    );
  }




  async deleteProducto(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.http.delete(`http://localhost:3000/api/productos/${id}`).subscribe(
              () => {
                this.loadProductos(); // Recargamos los productos después de eliminar
              },
              (error) => {
                console.error('Error al eliminar producto', error);
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }

  editProducto(producto: Producto) {
    console.log("esta es la respuesta", producto.ID)
    this.router.navigate([`/editar-producto/${producto.ID}`]).then(() => {
      // Al regresar de la página de edición, se vuelve a cargar la lista
      this.loadProductos();
    });
  }

  openCreateModal() {
    this.router.navigate(['/crear-producto']);
  }
}
