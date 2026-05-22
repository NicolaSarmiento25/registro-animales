import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
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
    const data = this.form();
    
    const formData = new URLSearchParams();
    formData.append('especie', data.especie);
    formData.append('animal', data.animal);
    formData.append('mes', data.mes);
    formData.append('ano', data.ano.toString());
    formData.append('estado', data.estado);

    fetch('guardar.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString()
    })
    .then(response => response.text())
    .then(result => {
      alert(result);
      this.form.set({
        especie: '',
        animal: '',
        mes: '',
        ano: new Date().getFullYear(),
        estado: ''
      });
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al guardar los datos');
    });
  }
}