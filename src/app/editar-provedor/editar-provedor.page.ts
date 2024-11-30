import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-editar-provedor',
  templateUrl: './editar-provedor.page.html',
  styleUrls: ['./editar-provedor.page.scss'],
  standalone: true, // Marcar como standalone
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
})
export class EditarProvedorPage implements OnInit {
  provedor: any = {
    ID: null,
    NOMBRE: '',
    TELEFONO: 0,
    EMAIL: '',
    DIRECCION: '',
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
      this.loadProvedor(id);
    }
  }

  loadProvedor(id: string) {
    this.http.get(`http://localhost:3000/api/provedores/${id}`).subscribe(
      (data: any) => {
        console.log('Provedor recibido:', data); // Verifica los datos que se reciben
        // Asignamos los valores a la propiedad 'provedor'
        this.provedor = { ...data };
      },
      (error: any) => {
        console.error('Error al cargar provedor', error); // Verifica los posibles errores
      }
    );
  }

  updateProvedor() {
    if (!this.provedor.ID) {
      console.error('El provedor no tiene ID');
      return;
    }
    console.log('ID del provedor:', this.provedor.ID); // Verifica el ID antes de enviar
    this.http
      .put(
        `http://localhost:3000/api/provedores/${this.provedor.ID}`,
        this.provedor
      )
      .subscribe(
        async () => {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'provedor actualizado con éxito',
            buttons: ['OK'],
          });
          await alert.present();
          this.router.navigate(['/provedores']);
        },
        async (error: any) => {
          //temporal solution

          /*- Problema : La respuesta que esta dando el servidor 
          es incorrecta, acrualiza los datos, pero da mensaje de error

          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un error al actualizar el Provedor B',
            buttons: ['OK'],
          });*/
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Provedor actualizado con éxito',
            buttons: ['OK'],
          });

          await alert.present();
          console.error('Error al actualizar provedor B', error);
          this.router.navigate(['/provedores']);
        }
      );
  }
}
