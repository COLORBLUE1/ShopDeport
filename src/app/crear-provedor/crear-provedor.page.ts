import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-crear-provedor',
  templateUrl: './crear-provedor.page.html',
  styleUrls: ['./crear-provedor.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    FormsModule,
    CommonModule,
  ], // Aquí importas ReactiveFormsModule y HttpClientModule
})
export class CrearProvedorPage implements OnInit {
  createProvedorForm!: FormGroup; // Usamos el operador de no-nulidad (!)

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Inicializamos el formulario en ngOnInit()
    this.createProvedorForm = this.formBuilder.group({
      NOMBRE: ['', [Validators.required]],
      TELEFONO: [0, [Validators.required]],
      EMAIL: ['', [Validators.required]],
      DIRECCION: ['', [Validators.required]],
    });
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.createProvedorForm.valid) {
      const proverd = this.createProvedorForm.value;
      console.log('Datos del formulario:', proverd); // Verifica los datos aquí

      this.http.post('http://localhost:3000/api/provedores', proverd).subscribe(
        async (response) => {
          const alert = await this.alertController.create({
            header: 'provedor Creado',
            message: 'El provedor se ha creado correctamente.',
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  this.router.navigate(['/provedores']);
                },
              },
            ],
          });
          await alert.present();
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un error al crear el provedor. Intenta de nuevo.',
            buttons: ['Aceptar'],
          });
          await alert.present();
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  // Método para cancelar la creación y regresar a la lista de provedores
  cancel() {
    this.router.navigate(['/provedores']);
  }
}
