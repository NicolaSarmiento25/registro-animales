import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  imports: [FormsModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes {
  protected animales = signal<any[]>([]);
  protected cargando = signal(false);
  protected error = signal('');

  protected readonly API_URL = 'http://localhost/Proyectofinal/consultar.php';

  // Totales computados
  protected totalAnimales = computed(() => this.animales().length);
  protected totalSaludables = computed(() => this.animales().filter(a => a.estado === 'Saludable').length);
  protected totalHeridos = computed(() => this.animales().filter(a => a.estado === 'Herido').length);
  protected totalEnfermos = computed(() => this.animales().filter(a => a.estado === 'Enfermo').length);

  // Totales por mes
  protected totalesPorMes = computed(() => {
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const resultado: {mes: string, total: number}[] = [];
    for (const mes of meses) {
      const total = this.animales().filter(a => a.mes === mes).length;
      if (total > 0) {
        resultado.push({ mes, total });
      }
    }
    return resultado;
  });

  constructor() {
    this.cargarDatos();
  }

  protected async cargarDatos(): Promise<void> {
    this.cargando.set(true);
    this.error.set('');

    try {
      const response = await fetch(this.API_URL);
      const text = await response.text();
      console.log('RESPUESTA RAW:', text);

      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        this.error.set('El servidor no devolvió JSON válido.');
        console.error('Texto recibido:', text);
        return;
      }

      if (result.success) {
        this.animales.set(result.data);
      } else {
        this.error.set('Error del servidor: ' + result.message);
      }
    } catch (err) {
      this.error.set('Error de conexión. Verifica que XAMPP esté encendido.');
      console.error(err);
    } finally {
      this.cargando.set(false);
    }
  }
}
