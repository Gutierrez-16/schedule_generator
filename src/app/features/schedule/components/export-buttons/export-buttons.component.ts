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
  styleUrls: ['./export-buttons.component.css']
})
export class ExportButtonsComponent {
  @Input() targetId = 'schedule-table';

  async exportAsPDF() {
    const element = document.querySelector('.schedule-container') as HTMLElement;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true
    });

    const imgWidth = 208;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('horario.pdf');
  }

  async exportAsImage() {
    const element = document.querySelector('.schedule-container') as HTMLElement;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true
    });

    const link = document.createElement('a');
    link.download = 'horario.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}
