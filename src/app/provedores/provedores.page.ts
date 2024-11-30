import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular'; // Importamos AlertController
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

interface Provedor {
  ID: number,
  NOMBRE: string,
  TELEFONO: string,
  EMAIL: string,
  DIRECCION: string,
}

@Component({
  selector: 'app-provedores',
  templateUrl: './provedores.page.html',
  styleUrls: ['./provedores.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class ProvedoresPage implements OnInit {
  provedores: Provedor[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController // Inyectamos AlertController
  ) {}

  ngOnInit() {
    this.loadProvedor();
  }

  loadProvedor() {
    this.http.get<Provedor[]>('http://localhost:3000/api/provedores', {
      headers: { 'Cache-Control': 'no-cache' } // Para evitar la caché del navegador
    }).subscribe(
      (data) => {
        this.provedores = data.map((provedor) => ({
          ID: provedor.ID,
          NOMBRE: provedor.NOMBRE,
          TELEFONO: provedor.TELEFONO,
          EMAIL: provedor.EMAIL,
          DIRECCION: provedor.DIRECCION,
        }));
      },
      (error) => {
        console.error('Error al cargar provedor', error);
      }
    );
  }




  async deleteProvedor(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este provedor?',
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
            this.http.delete(`http://localhost:3000/api/provedores/${id}`).subscribe(
              () => {
                this.loadProvedor(); // Recargamos los provedor después de eliminar
              },
              (error) => {
                console.error('Error al eliminar provedor', error);
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }

  editProvedor(provedor: Provedor) {
    console.log("esta es la respuesta", provedor.ID)
    this.router.navigate([`/editar-provedor/${provedor.ID}`]).then(() => {
      // Al regresar de la página de edición, se vuelve a cargar la lista
      this.loadProvedor();
    });
  }

  openCreateModal() {
    this.router.navigate(['/crear-provedor']);
  }
}
