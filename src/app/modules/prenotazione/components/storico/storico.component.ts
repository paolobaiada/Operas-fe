import { Component, OnInit, ViewChild } from '@angular/core';
import { PrenotaModelResponse } from 'src/app/models';
import { HeaderComponent } from 'src/app/modules/app-layout/components/header/header.component';
import { CardProfiloComponent } from 'src/app/modules/card-profilo/components/card-profilo.component';
import { PrenotazioneService } from 'src/app/services/prenotazione.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AnagraficaService } from 'src/app/services/anagrafica.service';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
    selector: 'app-storico',
    templateUrl: './storico.component.html',
    styleUrls: ['./storico.component.scss'],
    standalone: true,
    imports: [
      HeaderComponent,
      CardProfiloComponent,
      MatTableModule,
      MatSortModule,
      MatIconModule,
      MatSidenavModule
    ]
})
export default class StoricoComponent implements OnInit{
  listaPrenotazioni: PrenotaModelResponse[]=[]
  anagrafica!: any;
  displayedColumns: string[] = ['ID ORDINE', 'DATA ORDINE', 'COSTO', 'OCCHIO'];
  dataSource : any;

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  constructor(
    private prenotazioneService: PrenotazioneService,
    private _liveAnnouncer: LiveAnnouncer,
    private anagraficaService: AnagraficaService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.anagrafica=this.anagraficaService.getAnagraficaSessione();
    this.prenotazioneService.getStorico(this.anagrafica.idAnagrafica).subscribe((data) => {
      this.listaPrenotazioni=data;
      this.dataSource=new MatTableDataSource(this.listaPrenotazioni);
    },
    (error) => {
      console.error('Errore nella richiesta', error)
    }

    )
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  dettaglio(idPrenotazione: number){
    this.router.navigate(['/prenotazione/dettaglio', idPrenotazione])
  }
}
