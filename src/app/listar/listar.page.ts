import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EmergencyLog } from '../emergencia';
import { EmergenciasService } from '../emergencias.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  logs: EmergencyLog[] = [];

  constructor(private navCtrl: NavController, private logService: EmergenciasService) {}

  ionViewWillEnter() {
    this.logService.getLogs().then((logs) => {
      this.logs = logs;
    });
  }

  viewLogDetails(log: EmergencyLog) {
    this.navCtrl.navigateForward('/detalles', {
      queryParams: { log: JSON.stringify(log) }
    });
  }

  ngOnInit() {
  }

}
