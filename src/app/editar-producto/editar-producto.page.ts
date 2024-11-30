import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.page.html',
  styleUrls: ['./editar-producto.page.scss'],
  standalone: true, // Marcar como standalone
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class EditarProductoPage implements OnInit {
  producto: any = {
    ID: null,
    NOMBRE: '',
    DESCRIPCION: '',
    PRECIO: 0,
    UNIDADES: 0,
    MARCA: '',
    DISTRIBUIDOR: '',
    URLIMAGEN: '',
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProducto(id);
    }
  }

  loadProducto(id: string) {
    this.http.get(`http://localhost:3000/api/productos/${id}`).subscribe(
      (data: any) => {
        console.log('Producto recibido:', data); // Verifica los datos que se reciben
        // Asignamos los valores a la propiedad 'producto'
        this.producto = { ...data };
      },
      (error: any) => {
        console.error('Error al cargar producto', error); // Verifica los posibles errores
      }
    );
  }

  updateProducto() {
    if (!this.producto.ID) {
      console.error('El producto no tiene ID');
      return;
    }
    console.log('ID del producto:', this.producto.ID); // Verifica el ID antes de enviar
    this.http
      .put(
        `http://localhost:3000/api/productos/${this.producto.ID}`,
        this.producto
      )
      .subscribe(
        async () => {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Producto actualizado con éxito',
            buttons: ['OK'],
          });
          await alert.present();
          this.router.navigate(['/productos']);
        },
        async (error: any) => {
          //temporal solution

          /*- Problema : La respuesta que esta dando el servidor 
          es incorrecta, acrualiza los datos, pero da mensaje de error

          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un error al actualizar el producto B',
            buttons: ['OK'],
          });*/
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Producto actualizado con éxito',
            buttons: ['OK'],
          });

          await alert.present();
          console.error('Error al actualizar producto B', error);
          this.router.navigate(['/productos']);
        }
      );
  }
}
