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

  protected buscar(): void {
    if (!this.mesSeleccionado()) {
      alert('Por favor seleccione un mes');
      return;
    }

    this.cargando.set(true);

    fetch(`consultar.php?mes=${encodeURIComponent(this.mesSeleccionado())}`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.animales.set(data.animales);
          this.total.set(data.total);
        } else {
          alert(data.message);
          this.animales.set([]);
          this.total.set(0);
        }
        this.cargando.set(false);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al consultar los datos');
        this.cargando.set(false);
      });
  }
}