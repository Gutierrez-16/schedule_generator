import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-export-buttons',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './export-buttons.component.html',
  styleUrls: ['./export-buttons.component.css'],
})
export class ExportButtonsComponent {
  @Input() targetId = 'schedule-table';

  async exportAsPDF() {
    const element = document.querySelector('.schedule-table') as HTMLElement;
    if (!element) return;

    // Configuración del PDF en formato paisaje
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Capturar la tabla como imagen con mejor calidad
    const canvas = await html2canvas(element, {
      scale: 3, // Mayor calidad
      logging: false,
      useCORS: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    // Calcular dimensiones manteniendo proporciones
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;

    // Calcular el ancho y alto disponible
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2 - 20; // 20mm para el título

    // Calcular dimensiones de la imagen manteniendo proporción
    let imgWidth = availableWidth;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Si la altura es mayor que el espacio disponible, ajustar por altura
    if (imgHeight > availableHeight) {
      imgHeight = availableHeight;
      imgWidth = (canvas.width * imgHeight) / canvas.height;
    }

    // Calcular posición centrada
    const x = (pageWidth - imgWidth) / 2;
    const y = margin + 20; // 20mm después del título

    // Agregar título centrado
    doc.setFontSize(16);
    doc.text('Horario de Clases', pageWidth / 2, margin + 10, {
      align: 'center',
    });

    // Agregar la imagen centrada
    doc.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      x,
      y,
      imgWidth,
      imgHeight
    );

    doc.save('horario.pdf');
  }

  async exportAsImage() {
    const element = document.querySelector(
      '.schedule-container'
    ) as HTMLElement;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const link = document.createElement('a');
    link.download = 'horario.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}
