import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SocietaService } from 'src/app/services/societa.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { LoaderSpinnerService } from 'src/app/services';
import { UpdateSocietaDialogComponent } from '../update-societa-dialog/update-societa-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profilo-societa-update',
  templateUrl: './profilo-societa-update.component.html',
  styleUrls: ['./profilo-societa-update.component.scss'],
  standalone: true,
  imports:[
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export default class ProfiloSocietaUpdateComponent implements OnInit{
  societa: any;
  updateSocieta: FormGroup;
  idSocieta= new FormControl('',[Validators.required])
  nome = new FormControl('', [Validators.required]);
  descrizione = new FormControl('', [Validators.required]);
  nazione = new FormControl('', [Validators.required]);
  provincia = new FormControl('', [Validators.required]);
  citta = new FormControl('', [Validators.required]);
  indirizzo = new FormControl('', [Validators.required]);

  constructor(
    private societaService: SocietaService,
    private fb: FormBuilder,
    private loader:LoaderSpinnerService,
    private dialog:MatDialog,
  ){



     this.updateSocieta = this.fb.group({
      idSocieta:[this.idSocieta.value,[Validators.required]],
      nome:[this.nome.value, [Validators.required]],
      descrizione:[this.descrizione.value, [Validators.required]],
      nazione:[this.nazione.value, [Validators.required]],
      provincia:[this.provincia.value, [Validators.required]],
      citta:[this.citta.value, [Validators.required]],
      indirizzo:[this.indirizzo.value, [Validators.required]]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.societa = this.societaService.getSocietaSessione();
      
    }, 200); 
  }
  

  Onsubmit() {
    if (this.updateSocieta.valid) {
      this.loader.show();
      
      const formSocieta = this.updateSocieta.value;
      
      this.societaService.updateSocieta(formSocieta).subscribe({
        
        next: (res) => {
          localStorage.setItem('societa',JSON.stringify(formSocieta))
          this.loader.hide();
          this.dialog.open(UpdateSocietaDialogComponent);
        },
        error: (error) => {
          this.loader.hide();
          console.log(error);
        }
      });
    }
  }
  

}
