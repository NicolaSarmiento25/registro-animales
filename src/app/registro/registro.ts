import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  protected form = signal({
    especie: '',
    animal: '',
    mes: '',
    ano: new Date().getFullYear(),
    estado: ''
  });

  protected readonly meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  protected guardar(): void {
    console.log('Animal registrado:', this.form());
    alert('¡Registro guardado exitosamente!');
  }
}
