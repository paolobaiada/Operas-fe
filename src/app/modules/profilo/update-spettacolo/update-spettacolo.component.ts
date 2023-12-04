import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpettacoloService } from 'src/app/services/spettacolo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ImageConvertComponent } from '../../home/components/image-convert/image-convert.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { AngularMaterialModule } from 'src/app/utils';
import { LoaderSpinnerService } from 'src/app/services';
import AppLayoutComponent from '../../app-layout/components/app-layout/app-layout.component';
import { HeaderComponent } from '../../app-layout/components/header/header.component';
import { SidenavComponent } from '../../app-layout/components/sidenav/sidenav.component';
import { SpettacoloModelResponse } from 'src/app/models';
import { NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-update-spettacolo',
  templateUrl: './update-spettacolo.component.html',
  styleUrls: ['./update-spettacolo.component.scss'],
  standalone: true,
  imports: [
    
    MatCardModule,
    ImageConvertComponent,
   MatFormFieldModule,
    MatDividerModule,
    MatListModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    AngularMaterialModule,
    HeaderComponent,
    SidenavComponent,
    NgIf,
  
    
    
  ],
})
export default class AggiungiSpettacoloComponent implements OnInit{
  base64Image: string | null = null;
  spettacoloForm!: FormGroup;
  immagine = new FormControl('', [Validators.required]);
  nomeProdotto = new FormControl('', [Validators.required]);
  costo = new FormControl('', [Validators.required]);
  codiceProdotto = new FormControl('', [Validators.required]);
  descrizione = new FormControl('', [Validators.required]);
  orario = new FormControl('', [Validators.required]);
  tipologia = new FormControl('', [Validators.required]);
  societa = new FormControl(JSON.parse(localStorage.getItem('societa') || '{}'));
  idSpettacolo!: any;
  dettaglioSpettacolo!: SpettacoloModelResponse;
  immagineValue = this.immagine.value
  constructor(
    private fb: FormBuilder,
    private spettacolo : SpettacoloService,
    private loaderSpinnerService: LoaderSpinnerService,
    private router: ActivatedRoute,
    ) {
      if (this.immagineValue !== null) {
        this.spettacoloForm = this.fb.group({
          nomeProdotto: ['', [Validators.required]],
          costo: ['', [Validators.required]],
          codiceProdotto: ['', [Validators.required]],
          descrizione: ['', [Validators.required]],
          orario: ['', [Validators.required]],
          tipologia: ['', [Validators.required]],
          societa: [this.societa.value],
          immagine: [''],
        });
      }
    
  }
  ngOnInit(): void {
    this.idSpettacolo = this.router.snapshot.paramMap.get("idSpettacolo");
    this.spettacolo.getDettaglio(this.idSpettacolo).subscribe((dettaglio)=> {
      this.dettaglioSpettacolo = dettaglio;
         console.log(this.dettaglioSpettacolo)
    })
  }
 
  
  
  onDragOver(event: any): void {
    this.preventDefaultAndStopPropagation(event);
    event.dataTransfer.dropEffect = 'copy';
  }

  onDragLeave(event: any): void {
    this.preventDefaultAndStopPropagation(event);
  }

  onDrop(event: any): void {
    this.preventDefaultAndStopPropagation(event);
    const file = event.dataTransfer.files[0];
    if (file) {
      this.handleImageFile(file);
    }
  }
  
  /* onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.handleImageFile(file);
    }
  } */
  onFileSelected(event: any):void {
    const file = event.target.files[0];
    if (file) {
      this.handleImageFile(file);
  
      // Puoi convertire il file in un'URL di dati (base64) per visualizzarlo nell'immagine
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.dettaglioSpettacolo.immagine = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  public handleImageFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = reader.result as string;
      const byteCharacters = atob(this.base64Image.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      this.spettacoloForm.get('immagine')?.setValue(Array.from(byteArray));
    };
    reader.readAsDataURL(file);
  }

  onClick(){
    this.loaderSpinnerService.show();
    console.log(this.spettacoloForm.value)
    if (this.spettacoloForm.valid){
    
      this.spettacolo.updateSpettacolo(this.dettaglioSpettacolo.idSpettacolo,this.spettacoloForm.value).subscribe({
        next: (res) => {
         this.loaderSpinnerService.hide();
         window.location.reload();
        },
        error: (error) => {
          console.error('Errore nella richiesta HTTP:', error);
        }
      });
    }

  }
  private preventDefaultAndStopPropagation(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
