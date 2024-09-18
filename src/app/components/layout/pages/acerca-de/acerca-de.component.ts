import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-acerca-de',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export default class AcercaDeComponent {
  pdfSrc = "assets/documentos/guia-de-usuario.pdf";

  pdfUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Ruta del archivo PDF
    const url = '../../../../assets/documentos/guia-de-usuario.pdf'; 
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
