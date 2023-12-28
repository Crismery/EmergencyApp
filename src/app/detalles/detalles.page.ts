import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmergencyLog } from '../emergencia';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  selectedLog: EmergencyLog = { fecha: '', titulo: '', descripcion: '', foto: '' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params && params['log']) { 
        this.selectedLog = JSON.parse(params['log']);
      }
    });
  }
}
