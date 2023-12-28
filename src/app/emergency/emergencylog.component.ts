import { Component, OnInit } from '@angular/core';
import { EmergencyLog } from '../emergencia';
import { EmergenciasService } from '../emergencias.service';

@Component({
  selector: 'app-emergencylog',
  templateUrl: './emergencylog.component.html',
  styleUrls: ['./emergencylog.component.scss'],
})
export class EmergencylogComponent  implements OnInit {

  constructor(private emergenciasService: EmergenciasService) {}

  async ngOnInit() {
    
    await this.emergenciasService.createDatabase();

  
    const log: EmergencyLog = {
      fecha: '2023-11-07',
      titulo: 'Título de emergencia',
      descripcion: 'Descripción de la emergencia',
      foto: 'ruta/de/la/foto.jpg',
    };
    
    await this.emergenciasService.addLog(log);

    const logs = await this.emergenciasService.getLogs();
    console.log('Registros recuperados:', logs);
  }

}
