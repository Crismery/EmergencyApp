import { Component, OnInit } from '@angular/core';
import { EmergencyLog } from '../emergencia';
import { EmergenciasService } from '../emergencias.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  log: EmergencyLog = { fecha: '', titulo: '', descripcion: '', foto: '' };

  constructor(private logService: EmergenciasService) {}

  saveLog() {
    this.logService.addLog(this.log);
    this.log = { fecha: '', titulo: '', descripcion: '', foto: '' };
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
  
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.log.foto = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No se seleccionó ningún archivo');
    }
  }  
  ngOnInit() {
  }
}
