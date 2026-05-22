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

  protected guardando = signal(false);

  protected readonly meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Apache en puerto 80, carpeta Proyectofinal
  protected readonly API_URL = 'http://localhost/Proyectofinal';

  protected async guardar(): Promise<void> {
    const datos = this.form();

    if (!datos.especie || !datos.animal || !datos.mes || !datos.estado) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.guardando.set(true);

    const formData = new URLSearchParams();
    formData.append('especie', datos.especie);
    formData.append('animal', datos.animal);
    formData.append('mes', datos.mes);
    formData.append('ano', String(datos.ano));
    formData.append('estado', datos.estado);

    try {
      const response = await fetch(`${this.API_URL}/guardar1.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });

      const text = await response.text();
      console.log('RESPUESTA RAW:', text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        alert('El servidor no devolvió JSON válido. Revisa la consola (F12).');
        console.error('Texto recibido:', text);
        return;
      }

      if (result.success) {
        alert('¡Registro guardado exitosamente!');
        this.form.set({
          especie: '',
          animal: '',
          mes: '',
          ano: new Date().getFullYear(),
          estado: ''
        });
      } else {
        alert('Error del servidor: ' + result.message);
      }
    } catch (error) {
      alert('Error de conexión. Verifica que Apache y MySQL estén encendidos en XAMPP.');
      console.error(error);
    } finally {
      this.guardando.set(false);
    }
  }
}
