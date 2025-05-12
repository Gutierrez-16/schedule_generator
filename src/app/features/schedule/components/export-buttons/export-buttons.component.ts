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
  @Input() targetId = 'schedule-container';

  async exportAsPDF() {
    const scheduleTable = document.querySelector(
      '.schedule-table'
    ) as HTMLElement;
    if (!scheduleTable) return;
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });
    pdf.setFont('helvetica');
    pdf.setFontSize(10);
    const pageWidth = 297;
    const pageHeight = 210;
    const margin = 10;
    const days = [
      'Hora',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const timeSlots = Array.from(
      scheduleTable.querySelectorAll('.time-cell')
    ).map((cell) => cell.textContent?.trim() || '');
    const columnWidth = (pageWidth - 2 * margin) / days.length;
    const rowHeight = 12;
    days.forEach((day, i) => {
      pdf.setFillColor(240, 240, 240);
      pdf.rect(margin + i * columnWidth, margin, columnWidth, rowHeight, 'FD');
      pdf.setTextColor(0);
      pdf.text(day, margin + i * columnWidth + 2, margin + 7);
    });
    timeSlots.forEach((time, rowIndex) => {
      const y = margin + (rowIndex + 1) * rowHeight;
      pdf.setFillColor(245, 245, 245);
      pdf.rect(margin, y, columnWidth, rowHeight, 'FD');
      pdf.text(time, margin + 2, y + 7);
      days.slice(1).forEach((_, colIndex) => {
        const x = margin + (colIndex + 1) * columnWidth;
        pdf.setFillColor(255, 255, 255);
        pdf.rect(x, y, columnWidth, rowHeight, 'FD');
        const cell = scheduleTable.querySelector(
          `tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 2})`
        ) as HTMLElement;
        if (!cell) return;
        const info = cell.querySelector('.class-info') as HTMLElement;
        if (info) {
          const course =
            info.querySelector('.subject')?.textContent?.trim() || '';
          const teacher =
            info.querySelector('.teacher')?.textContent?.trim() || '';
          const room = info.querySelector('.room')?.textContent?.trim() || '';
          const type = info.getAttribute('data-type')?.toUpperCase() || '';
          pdf.setFontSize(8);
          pdf.text(course, x + 2, y + 4);
          pdf.text(teacher, x + 2, y + 8);
          pdf.text(room, x + 2, y + 12);
          pdf.text(`Tipo: ${type}`, x + 2, y + 16);
          pdf.setFontSize(10);
        }
      });
    });
    pdf.save('horario.pdf');
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
      width: element.offsetWidth,
      height: element.offsetHeight,
      windowWidth: element.offsetWidth * 2,
      windowHeight: element.offsetHeight * 2,
    });
    const link = document.createElement('a');
    link.download = 'horario.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}
