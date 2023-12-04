import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { LocalStorageService } from 'src/app/services/LocalStorageService'; 


@Component({
  standalone: true,
  selector: 'image-convert',
  templateUrl: './image-convert.component.html',
  styleUrls: ['./image-convert.component.scss'],
  imports : [CommonModule]
})
export class ImageConvertComponent {
  base64Image: string | null = null;
  imageChanged = new EventEmitter<string | null>(); 

constructor(private localstorageservice:LocalStorageService){

}

  onDragOver(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    event.dataTransfer.dropEffect = 'copy';
  }

  onDragLeave(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];

    if (file) {
      this.handleImageFile(file);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.handleImageFile(file);
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  handleImageFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.base64Image = reader.result as string;

      // Converti il formato base64 in un array di byte
      const byteCharacters = atob(this.base64Image.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Salva l'array di byte nel localStorage sovrascrivendo il valore esistente
      localStorage.setItem('savedImage', JSON.stringify(Array.from(byteArray)));

      // Emetti l'evento con il nuovo valore dell'immagine
      this.imageChanged.emit(this.base64Image);
    };
    reader.readAsDataURL(file);
  }
  
}