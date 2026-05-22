import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.html',
  styleUrls: ['./reportes.css']
})
export class ReportesComponent implements OnInit {

  reporteForm!: FormGroup;
  mostrarModal = false;
  loading = false;

  // Cambia esta URL por la de tu backend
  private apiUrl = 'http://localhost:3000/api/reportes';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.reporteForm = this.fb.group({
      especie:      ['', [Validators.required, Validators.minLength(2)]],
      tipoAnimal:   ['', Validators.required],
      fechaReporte: ['', Validators.required],
      ubicacion:    ['', [Validators.required, Validators.minLength(5)]],
      telefono:     ['', [Validators.required, Validators.pattern(/^[0-9]{7,15}$/)]],
      descripcion:  ['']
    });
  }

  onSubmit(): void {
    if (this.reporteForm.invalid) return;

    this.loading = true;

    this.http.post(this.apiUrl, this.reporteForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.mostrarModal = true;
        this.resetForm();
      },
      error: (err) => {
        this.loading = false;
        console.error('Error al enviar el reporte:', err);
        alert('Ocurrió un error al enviar el reporte. Intenta de nuevo.');
      }
    });
  }

  resetForm(): void {
    this.reporteForm.reset();
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}