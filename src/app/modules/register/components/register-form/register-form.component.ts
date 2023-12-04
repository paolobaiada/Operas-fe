import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormControl
} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {NgIf} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';

import {
  BUTTON_CONSTANT,
  ERRORS_CONSTANT,
  INPUT_CONSTANT,
  LABEL_CONSTANT,
} from '../../../../constants';
import {
  LoaderSpinnerService,
  RegisterService,
  NotificationService,
} from 'src/app/services';
import { Subscription } from 'rxjs';
import { AngularMaterialModule } from 'src/app/utils';
import { WorkInProgressComponent } from 'src/app/shared';
import { AnagraficaService } from 'src/app/services/anagrafica.service';
import { SocietaService } from 'src/app/services/societa.service';
import { RegistrationDialogComponent } from '../../registration-dialog/registration-dialog.component';

@Component({
  standalone: true,
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularMaterialModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export default class RegisterFormComponent {
onSubmitAnagrafica() {
throw new Error('Method not implemented.');
}

  buttonConstant: any = BUTTON_CONSTANT;
  errorsConstant: any = ERRORS_CONSTANT;
  inputConstant: any = INPUT_CONSTANT;
  labelConstant: any = LABEL_CONSTANT;

  hide: boolean = true;
  registerForm: FormGroup;
  anagraficaForm: FormGroup;
  societaForm: FormGroup;
  dialogRef!: MatDialogRef<any>;
  regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  passwordValueSubscription!: Subscription;
  registrationCompleted: boolean = false;

  
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]);
  cPassword = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]);
  usertype = new FormControl('', [Validators.required]);
  informativa = new FormControl('', [Validators.requiredTrue]);

  cognome = new FormControl('', [Validators.required]);
  nome = new FormControl('', [Validators.required]);
  dataNascita = new FormControl('', [Validators.required]);
  genere = new FormControl('', [Validators.required]);
  nazione = new FormControl('', [Validators.required]);
  provincia = new FormControl('', [Validators.required]);
  citta = new FormControl('', [Validators.required]);
  indirizzo = new FormControl('', [Validators.required]);

  nomeSocieta = new FormControl('', [Validators.required]);
  descrizione = new FormControl('', [Validators.required]);
  nazioneSocieta = new FormControl('', [Validators.required]);
  provinciaSocieta = new FormControl('', [Validators.required]);
  cittaSocieta = new FormControl('', [Validators.required]);
  indirizzoSocieta = new FormControl('', [Validators.required]);
  

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPassword(){
    if (this.registerForm.get('cPassword')!.hasError('required')) {
      return 'Questo campo è obbligatorio';
    }
    if (this.registerForm.hasError('passwordMismatch', 'cPassword')) {
      return 'Le password non coincidono';
    }
    return '';
  }

  constructor(
    private loaderSpinnerService: LoaderSpinnerService,
    private register : RegisterService,
    private anagrafica : AnagraficaService,
    private societa : SocietaService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private _formBuilder: FormBuilder
  ){
    this.registerForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
          ),
          Validators.minLength(3),
          Validators.maxLength(128),
        ],
      ],
      usertype: [
        '',
        [
          Validators.required
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      cPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ]
      ],
      informativa: [false, Validators.requiredTrue]
    },
    ),
    this.anagraficaForm = this.fb.group({
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
    },
    ),this.societaForm = this.fb.group({
      nome: [
        '',
        [
          Validators.required
        ]
      ],
      descrizione: [
        '',
        [
          Validators.required
        ]
      ],
      nazioneSocieta: [
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
    });



    this.passwordValueSubscription = this.registerForm.controls[
      'password'
    ].valueChanges.subscribe((value: any) => {
      this.registerForm.controls['password'].setValue(
        value.replace(this.regex, ''),
        {
          emitEvent: false,
        }
      );
    });

    this.registerForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      cPassword:['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      usertype:['', [Validators.required]],
      informativa:['', [Validators.required]]
    })

    this.anagraficaForm = this.fb.group({
      cognome:['', [Validators.required]],
      nome:['', [Validators.required]],
      dataNascita:['', [Validators.required]],
      genere:['', [Validators.required]],
      nazione:['', [Validators.required]],
      provincia:['', [Validators.required]],
      citta:['', [Validators.required]],
      indirizzo:['', [Validators.required]]
    })

    this.societaForm = this.fb.group({
      nome:['', [Validators.required]],
      descrizione:['', [Validators.required]],
      nazione:['', [Validators.required]],
      provincia:['', [Validators.required]],
      citta:['', [Validators.required]],
      indirizzo:['', [Validators.required]]
    })
  }

  isFormValid(): boolean {
    return this.registerForm.valid && this.registerForm.get('informativa')?.value === true && this.registerForm.get('password')?.value === this.registerForm.get('cPassword')?.value;
  }  

  ngOnDestroy() {
    if (this.passwordValueSubscription) {
      this.passwordValueSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.loaderSpinnerService.show();
    this.registrationCompleted = true;
    this.dialog.open(RegistrationDialogComponent);

    if (this.registerForm.valid && this.anagraficaForm.valid) {
      const formData = this.registerForm.value;
      delete formData.cPassword;
      delete formData.informativa;
      const formAnagrafica = this.anagraficaForm.value;

      this.register.registerUser(formData).subscribe({
        next: (res) => {
          formAnagrafica.user = res;
          this.anagrafica.registerAnagrafica(formAnagrafica).subscribe({
            next: (res) => {
              this.loaderSpinnerService.hide()
              if (this.registerForm.get('usertype')?.value === 'ADMIN') {
                const formSocieta = this.societaForm.value;

                formSocieta.anagrafica = res;
                this.societa.registerSocieta(formSocieta).subscribe({
                  next: (res) => {
                    this.loaderSpinnerService.hide()
                  },
                  error: (error) => {
                    this.loaderSpinnerService.hide();
                  }
                });
              }
            },
            error: (error) => {
              this.loaderSpinnerService.hide();
            }
          });
        },
        error: (error) => {
          this.loaderSpinnerService.hide();
        },
      });
    } else {
      this.notificationService.show(ERRORS_CONSTANT.required, 2500, 'error');
      this.loaderSpinnerService.hide();
    }
  }

  navigateTo() {
    this.router.navigate(['/login']);
  }
}
