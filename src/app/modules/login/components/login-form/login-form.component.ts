import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {
  BUTTON_CONSTANT,
  ERRORS_CONSTANT,
  INPUT_CONSTANT,
  LABEL_CONSTANT,
} from '../../../../constants';
import {
  LoaderSpinnerService,
  LoginService,
  NotificationService,
} from 'src/app/services';
import { Subscription } from 'rxjs';
import { AngularMaterialModule } from 'src/app/utils';
import { WorkInProgressComponent } from 'src/app/shared';
import { AnagraficaService } from 'src/app/services/anagrafica.service';
import { SocietaService } from 'src/app/services/societa.service';

/** Una classe per il componente del form di login */
@Component({
  standalone: true,
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AngularMaterialModule,
  ],
})
export default class LoginFormComponent {
  /** Costante delle label dei button */
  buttonConstant: any = BUTTON_CONSTANT;
  /** Costante delle label degli errori */
  errorsConstant: any = ERRORS_CONSTANT;
  /** Costante delle label degli input */
  inputConstant: any = INPUT_CONSTANT;
  /** Costante delle label generiche */
  labelConstant: any = LABEL_CONSTANT;

  /** Indica se la password deve essere mostrata in chiaro */
  hide: boolean = true;
  /** FormGroup per il login */
  loginForm: FormGroup;

  /** Il riferimento alla modale aperta */
  dialogRef!: MatDialogRef<any>;
  /** Regex no emoji */
  regex =
    /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  /** Subscription all'evento di cambio valore dell'input della password */
  passwordValueSubscription!: Subscription;

  carrello: any[]=[];

  /**
   * Il costruttore della classes.
   * Si inizializza il FormGroup.
   * @param {LoaderSpinnerService} loaderSpinnerService L'injectable del service LoaderSpinner
   * @param {LoginService} loginService L'injectable del service Login
   * @param {RegistrazioneService} registrazioneService L'injectable del service Registrazione
   * @param {Router} router L'injectable del service router per la navigazione tra viste e url
   * @param {FormBuilder} fb il FormBuilder del form di login
   * @param {NotificationService} notificationService L'injectable del service Notification

   */
  constructor(
    private loaderSpinnerService: LoaderSpinnerService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private anagraficaService: AnagraficaService,
    private societaService: SocietaService
  ) {
    this.loginForm = this.fb.group({
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
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ],
      ],
      rememberMe: [false],
    });

    this.passwordValueSubscription = this.loginForm.controls[
      'password'
    ].valueChanges.subscribe((value: any) => {
      this.loginForm.controls['password'].setValue(
        value.replace(this.regex, ''),
        {
          emitEvent: false,
        }
      );
    });
  }

  /**
   * Lifecycle hook per l'onDestroy
   * Si annullano le iscrizione effettuate agli observable
   */
  ngOnDestroy() {
    if (this.passwordValueSubscription) {
      this.passwordValueSubscription.unsubscribe();
    }
  }

  /**
   * Submit del form di login.
   * Nella callback salva il nominativo dell'utente nel localStorage e il token nel localStorage o sessionStorage (in base alla selezione remember me).
   * Viene poi effettuata la navigazione alla dashboard
   */
  onSubmit() {
    this.loaderSpinnerService.show();
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.loginService.setUtenteSession(res.id, res?.email, res?.password, res?.usertype);
          localStorage.setItem('carrello', JSON.stringify(this.carrello));
          this.anagraficaService.getAnagrafica(res.id).subscribe({
            next: (resA) => {
              localStorage.setItem('anagrafica', JSON.stringify(resA));
              console.log(resA);
              if(res.usertype=="ADMIN"){
                this.societaService.getSocieta(resA.idAnagrafica).subscribe({
                  next: (resS) => {
                    localStorage.setItem('societa', JSON.stringify(resS));
                    console.log(resS);
                  },
                  error: (error) => {
                    this.loaderSpinnerService.hide();
                  }
                })
              }
              },
            error: (error) => {
              this.loaderSpinnerService.hide();
            },
          });
          this.router.navigate(['/gestionale/profilo']);
          this.loaderSpinnerService.hide()
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

  /** Effettua la navigazione alla pagina di recupero password */
  openModalRecuperoPassword(): void {
    this.dialog.open(WorkInProgressComponent, {
      width: '660px',
      height: '300px',
      disableClose: true,
    });
  }

  /**
   * Redirect alla vista dedicata
   */
  navigateTo() {
    this.router.navigate(['/login']);
  }

  /** Effettua la navigazione alla pagina di registrazione */
  gotoRegistrazione(): void {
    this.router.navigate(['/register']);
  }
}
