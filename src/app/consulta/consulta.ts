import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulta',
  imports: [FormsModule],
  templateUrl: './consulta.html',
  styleUrl: './consulta.css',
})
export class Consulta {
  protected mesSeleccionado = signal('');
  protected animales = signal<any[]>([]);
  protected total = signal(0);
  protected cargando = signal(false);

  protected readonly meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // URL completa al backend PHP (Apache puerto 80)
  protected readonly API_URL = 'http://localhost/Proyectofinal/consultar.php';

  protected async buscar(): Promise<void> {
    if (!this.mesSeleccionado()) {
      alert('Por favor seleccione un mes');
      return;
    }

    this.cargando.set(true);
    this.animales.set([]);
    this.total.set(0);

    try {
      const url = `${this.API_URL}?mes=${encodeURIComponent(this.mesSeleccionado())}`;
      const response = await fetch(url);
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
        this.animales.set(result.data);
        this.total.set(result.count);
      } else {
        alert('Error del servidor: ' + result.message);
      }
    } catch (error) {
      alert('Error de conexión. Verifica que Apache y MySQL estén encendidos en XAMPP.');
      console.error(error);
    } finally {
      this.cargando.set(false);
    }
  }
}
