import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { UtentiService } from 'src/app/services/utenti.service';
import { LoaderSpinnerService, LoginService } from 'src/app/services';
import { Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AnagraficaService } from 'src/app/services/anagrafica.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';


@Component({
  selector: 'app-profilo-update',
  templateUrl: './profilo-update.component.html',
  styleUrls: ['./profilo-update.component.scss'],
  standalone:true,
  imports: [
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ]
})
export default class ProfiloUpdateComponent implements OnInit{
  user: any;
  anagrafica: any;
  updateAnagrafica!: FormGroup;
  updateUser!: FormGroup;
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  cognome = new FormControl('', [Validators.required]);
  nome = new FormControl('', [Validators.required]);
  dataNascita = new FormControl('', [Validators.required]);
  genere = new FormControl('', [Validators.required]);
  nazione = new FormControl('', [Validators.required]);
  provincia = new FormControl('', [Validators.required]);
  citta = new FormControl('', [Validators.required]);
  indirizzo = new FormControl('', [Validators.required]);


  constructor(
    private utentiService: UtentiService,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog,
    private anagraficaService: AnagraficaService,
    private fb: FormBuilder,
    private loader: LoaderSpinnerService
  ){
    this.updateUser = this.fb.group({
      email: [
        '',
        [
          Validators.required,
        ],
      ],
      password: [
        '',
        [
          Validators.required,
        ],
      ],
    },
    ),
    this.updateAnagrafica = this.fb.group({
      cognome: [
        '',
        [
          Validators.required
        ]
      ],
      nome: [
        '',
        [
          Validators.required
        ]
      ],
      dataNascita: [
        '',
        [
          Validators.required
        ]
      ],
      genere: [
        '',
        [
          Validators.required
        ]
      ],
      nazione: [
        '',
        [
          Validators.required
        ]
      ],
      provincia: [
        '',
        [
          Validators.required
        ]
      ],
      citta: [
        '',
        [
          Validators.required
        ]
      ],
      indirizzo: [
        '',
        [
          Validators.required
        ]
      ],
    },)

    this.updateUser = this.fb.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]],
    })

    this.updateAnagrafica = this.fb.group({
      cognome:['', [Validators.required]],
      nome:['', [Validators.required]],
      dataNascita:['', [Validators.required]],
      genere:['', [Validators.required]],
      nazione:['', [Validators.required]],
      provincia:['', [Validators.required]],
      citta:['', [Validators.required]],
      indirizzo:['', [Validators.required]]
    })

  }

  ngOnInit(): void {
    this.user=this.loginService.getUtenteSessione();
    this.anagrafica=this.anagraficaService.getAnagraficaSessione();
  }

  eliminaProfilo(){    
    this.dialog.open(DeleteDialogComponent);
  }

  onSubmit(){
    this.loader.show();
    if (this.updateUser.valid && this.updateAnagrafica.valid){
      let id=this.user.id;
      let idAnagrafica=this.anagrafica.idAnagrafica;
      const formUser = this.updateUser.value;
      const formAnagrafica = this.updateAnagrafica.value;

      this.utentiService.updateUser(formUser, id).subscribe({
        next: (res) => {
          localStorage.setItem('userSession', JSON.stringify(res));
          this.anagraficaService.updateAnagrafica(formAnagrafica, idAnagrafica).subscribe({
            next: (resA) => {
              localStorage.setItem('anagrafica', JSON.stringify(resA));
              this.loader.hide();
              this.dialog.open(UpdateDialogComponent);
              window.location.reload;
            },
            error: (error) => {
              this.loader.hide();
              console.log(error);
            }
          })
        },
        error: (error) => {
          this.loader.hide();
          console.log(error);
        }
      })
    }
  }
}
