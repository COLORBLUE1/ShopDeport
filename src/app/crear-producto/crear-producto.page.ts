import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';  // Asegúrate de importar ReactiveFormsModule
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, IonicModule, FormsModule, CommonModule]  // Aquí importas ReactiveFormsModule y HttpClientModule
})

export class CrearProductoPage implements OnInit {
  createProductForm!: FormGroup;  // Usamos el operador de no-nulidad (!)

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Inicializamos el formulario en ngOnInit()
    this.createProductForm = this.formBuilder.group({
      NOMBRE: ['', [Validators.required]],
      DESCRIPCION: ['', [Validators.required]],
      PRECIO: [0, [Validators.required, Validators.min(0)]],
      UNIDADES: [0, [Validators.required, Validators.min(0)]],
      MARCA: ['', [Validators.required]],
      DISTRIBUIDOR: ['', [Validators.required]],
      URLIMAGEN: ['', [Validators.required]],
    });
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.createProductForm.valid) {
      const product = this.createProductForm.value;
      console.log('Datos del formulario:', product);  // Verifica los datos aquí
      
      this.http.post('http://localhost:3000/api/productos', product).subscribe(
        async (response) => {
          const alert = await this.alertController.create({
            header: 'Producto Creado',
            message: 'El producto se ha creado correctamente.',
            buttons: [
              {
                text: 'Aceptar',
                handler: () => {
                  this.router.navigate(['/productos']);
                }
              }
            ]
          });
          await alert.present();
        },
        async (error) => {
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Hubo un error al crear el producto. Intenta de nuevo.',
            buttons: ['Aceptar'],
          });
          await alert.present();
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
  

  // Método para cancelar la creación y regresar a la lista de productos
  cancel() {
    this.router.navigate(['/productos']);
  }
}
