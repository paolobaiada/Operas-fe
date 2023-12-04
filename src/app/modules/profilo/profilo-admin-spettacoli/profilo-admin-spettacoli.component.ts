import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SpettacoloService } from 'src/app/services/spettacolo.service';
import {  SpettacoloModelResponse } from 'src/app/models';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';

import { DatePipe } from '@angular/common';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from 'src/app/shared';
import { LoaderSpinnerService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSpettacoloDialogComponent } from '../delete-spettacolo-dialog/delete-spettacolo-dialog.component';



@Component({
  selector: 'app-profilo-admin-spettacoli',
  templateUrl: './profilo-admin-spettacoli.component.html',
  styleUrls: ['./profilo-admin-spettacoli.component.scss'],
  standalone:true,
  providers:[DatePipe],
  imports:[
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
   MatTableModule,
   MatIconModule,
   RouterModule,

   CanvasJSAngularChartsModule,
   NgIf,
   
   CommonModule
  

  ]
})
export default class ProfiloAdminSpettacoliComponent {
  stat : any[]= []
 dataPoints: any[] = [];
 spettacolo: any;
 totalSpettacoli: number = 0;
 shouldRefresh: boolean = false;
 updateSocieta: any;
 listaSpettacolo: SpettacoloModelResponse[]=[];

  chart = {
    animationEnabled: true,
    title:{
    text: "Spettacoli inseriti per giorni"
    }, 
    axisY: {
    title: "Units Sold",
    valueFormatString: "#0",
    suffix: ""
    },
    data: [{
    type: "splineArea",
    color: "rgba(54,158,173,.7)",
    xValueFormatString: "DD/MM/YYYY",
    dataPoints:this.stat
    }]}
 
 chartOptions: any = {
    animationEnabled: true,
    title: {
      text: "Spettacoli Inseriti",
      indexLabel: 'Totale: {totalSpettacoli}',
    },
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      dataPoints: []
    }]
  };

 
  constructor(
    private spettacoloService: SpettacoloService,
    private router: Router,
    private dataPipe:DatePipe,
    private dialog :MatDialog
    
    
  ){}

  
 
  ngOnInit(): void {
    console.log(this.stat);
  
    let idSocieta = JSON.parse(localStorage.getItem("societa")!);
    idSocieta = idSocieta.idSocieta;
  
    this.spettacoloService.findBySocieta().subscribe(
      (data) => {
        this.listaSpettacolo = data;
        this.totalSpettacoli = this.listaSpettacolo.length;
  
        this.spettacoloService.getStats(idSocieta).subscribe((res: Map<any, any>) => {
          // Continua con il tuo codice qui, ad esempio, iterando sulla mappa
          Object.entries(res).forEach(([key, value]) => {
            let dataF = this.dataPipe.transform(key, 'dd/MM/YYYY');
            this.stat.push({ label: dataF!, y: value });
          });
  
          // Aspetta che la chiamata asincrona sia completata prima di aggiornare il grafico
          setTimeout(() => {
            this.chart = {
              animationEnabled: true,
              title: {
                text: "Spettacoli inseriti per giorni"
              },
              axisY: {
                title: "Units Sold",
                valueFormatString: "#0",
                suffix: ""
              },
              data: [{
                type: "splineArea",
                color: "rgba(54,158,173,.7)",
                xValueFormatString: "DD/MM/YYYY",
                dataPoints: this.stat
              }]
            };
  
            this.updateChartOptions();
          }, 200);
        });
  
        this.updateChartOptions();
      },
      (error) => {
        console.error('Errore qui', error);
      }
    );
  }
  
  
 
  
  deleteSpettacolo(id: number): void {
   
    this.spettacoloService.deleteSpettacolo(id).subscribe(
      () => {
        this.listaSpettacolo = this.listaSpettacolo.filter(
          (spettacolo) => spettacolo.idSpettacolo !== id
          
        );
          this.updateChartOptions();
        this.dialog.open(DeleteSpettacoloDialogComponent)

      },
      (error) => {
        console.error('Errore durante l\'eliminazione dello spettacolo', error);
      }
  )}



  updateSpettacolo(idSpettacolo: number){
    return this.router.navigate(['/gestionale/profilo/update-spettacolo',idSpettacolo])
  }
   
 private updateChartOptions(): any {
  const tipologie = Array.from(new Set(this.listaSpettacolo.map((s) => s.tipologia)));
  this.dataPoints = tipologie.map((tipologia) => {
    const count = this.listaSpettacolo.filter((s) => s.tipologia === tipologia).length;
    return { y: (count / this.listaSpettacolo.length) * 100, name: tipologia };
  });
  this.chartOptions.title.text = `Spettacoli Inseriti - Totale: ${this.totalSpettacoli}`;

  this.chartOptions.data[0].dataPoints = this.dataPoints;
 
  return this.chartOptions
}


    
}
  
  

