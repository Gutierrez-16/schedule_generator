import { Component, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { Course, Cycle } from './interfaces/cycle.interface';

@Component({
  selector: 'app-cycles',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDividerModule,
    MatCheckboxModule,
    FormsModule,
    MatTabsModule
  ],
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.css']
})
export class CyclesComponent {
  @ViewChild('courseDetailsDialog') courseDetailsDialog!: TemplateRef<any>;

cycles: Cycle[] = [
  {
    id: 1,
    name: "CICLO I",
    courses: [
      {
        id: 101,
        name: "Biología Celular y Molecular",
        credits: 5,
        groups: [
          {
            id: 1001,
            group: "01",
            fullName: "DR. RICARDO MEDINA TORRES",
            day: "Lunes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Biología 101"
          },
          {
            id: 1002,
            group: "02",
            fullName: "DRA. CARMEN SUAREZ LAGOS",
            day: "Martes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Biología 101"
          }
        ]
      },
      {
        id: 102,
        name: "Química General",
        credits: 4,
        groups: [
          {
            id: 1003,
            group: "01",
            fullName: "DR. MIGUEL ÁNGEL RUIZ CARRILLO",
            day: "Lunes",
            start: "10:15",
            end: "12:45",
            classRoom: "Lab. Química 203"
          },
          {
            id: 1004,
            group: "02",
            fullName: "DRA. LOURDES PIMENTEL GÓMEZ",
            day: "Miércoles",
            start: "07:00",
            end: "09:30",
            classRoom: "Lab. Química 203"
          }
        ]
      },
      {
        id: 103,
        name: "Matemática para Ciencias de la Salud",
        credits: 3,
        groups: [
          {
            id: 1005,
            group: "01",
            fullName: "DR. JOSÉ ANTONIO PINEDA SILVA",
            day: "Martes",
            start: "10:15",
            end: "12:45",
            classRoom: "Aula 105"
          }
        ]
      },
      {
        id: 104,
        name: "Comunicación y Redacción Académica",
        credits: 3,
        groups: [
          {
            id: 1006,
            group: "01",
            fullName: "DR. ROBERTO VALENCIA CASTILLO",
            day: "Jueves",
            start: "07:00",
            end: "09:30",
            classRoom: "Aula 106"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "CICLO II",
    courses: [
      {
        id: 201,
        name: "Histología Humana",
        credits: 5,
        groups: [
          {
            id: 2001,
            group: "01",
            fullName: "DRA. PATRICIA SOTO VÁSQUEZ",
            day: "Lunes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Histología 102"
          },
          {
            id: 2002,
            group: "02",
            fullName: "DR. RODRIGO MÉNDEZ BARRIOS",
            day: "Miércoles",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Histología 102"
          }
        ]
      },
      {
        id: 202,
        name: "Bioquímica Médica",
        credits: 5,
        groups: [
          {
            id: 2003,
            group: "01",
            fullName: "DR. CRISTÓBAL AGUIRRE SÁNCHEZ",
            day: "Martes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Bioquímica 204"
          },
          {
            id: 2004,
            group: "02",
            fullName: "DRA. ELIZABETH RAMÍREZ ORTIZ",
            day: "Jueves",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Bioquímica 204"
          }
        ]
      },
      {
        id: 203,
        name: "Anatomía Humana I",
        credits: 6,
        groups: [
          {
            id: 2005,
            group: "01",
            fullName: "DR. ALBERTO GUZMÁN PERALTA",
            day: "Lunes",
            start: "10:15",
            end: "13:15",
            classRoom: "Lab. Anatomía 303"
          },
          {
            id: 2006,
            group: "02",
            fullName: "DR. FERNANDO LÓPEZ MENDOZA",
            day: "Miércoles",
            start: "10:15",
            end: "13:15",
            classRoom: "Lab. Anatomía 303"
          }
        ]
      },
      {
        id: 204,
        name: "Bioestadística",
        credits: 3,
        groups: [
          {
            id: 2007,
            group: "01",
            fullName: "DR. LUIS ENRIQUE MORALES VARGAS",
            day: "Viernes",
            start: "07:00",
            end: "09:30",
            classRoom: "Aula 107"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "CICLO III",
    courses: [
      {
        id: 301,
        name: "Anatomía Humana II",
        credits: 6,
        groups: [
          {
            id: 3001,
            group: "01",
            fullName: "DR. HUMBERTO SÁENZ RODRÍGUEZ",
            day: "Lunes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Anatomía 303"
          },
          {
            id: 3002,
            group: "02",
            fullName: "DRA. CECILIA MARTÍNEZ VALDEZ",
            day: "Miércoles",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Anatomía 303"
          }
        ]
      },
      {
        id: 302,
        name: "Fisiología Humana I",
        credits: 5,
        groups: [
          {
            id: 3003,
            group: "01",
            fullName: "DR. VÍCTOR GUEVARA CASAS",
            day: "Martes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Fisiología 205"
          },
          {
            id: 3004,
            group: "02",
            fullName: "DRA. MERCEDES GARCÍA ROJAS",
            day: "Jueves",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Fisiología 205"
          }
        ]
      },
      {
        id: 303,
        name: "Embriología Humana",
        credits: 4,
        groups: [
          {
            id: 3005,
            group: "01",
            fullName: "DR. JAIME SOLÍS TORRES",
            day: "Viernes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Embriología 206"
          },
          {
            id: 3006,
            group: "02",
            fullName: "DR. HÉCTOR NÚÑEZ QUIROZ",
            day: "Viernes",
            start: "10:15",
            end: "13:15",
            classRoom: "Lab. Embriología 206"
          }
        ]
      },
      {
        id: 304,
        name: "Metodología de la Investigación",
        credits: 3,
        groups: [
          {
            id: 3007,
            group: "01",
            fullName: "DRA. LAURA MIRANDA QUINTANA",
            day: "Miércoles",
            start: "14:00",
            end: "16:30",
            classRoom: "Aula 207"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    name: "CICLO IV",
    courses: [
      {
        id: 401,
        name: "Fisiología Humana II",
        credits: 5,
        groups: [
          {
            id: 4001,
            group: "01",
            fullName: "DR. ARMANDO FLORES CASTILLO",
            day: "Lunes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Fisiología 205"
          },
          {
            id: 4002,
            group: "02",
            fullName: "DRA. ÁNGELA ROMERO DÍAZ",
            day: "Miércoles",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Fisiología 205"
          }
        ]
      },
      {
        id: 402,
        name: "Microbiología Médica",
        credits: 5,
        groups: [
          {
            id: 4003,
            group: "01",
            fullName: "DR. GABRIEL HERRERA ORTEGA",
            day: "Martes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Microbiología 304"
          },
          {
            id: 4004,
            group: "02",
            fullName: "DRA. ISABEL PAREDES VEGA",
            day: "Jueves",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Microbiología 304"
          }
        ]
      },
      {
        id: 403,
        name: "Inmunología Básica",
        credits: 4,
        groups: [
          {
            id: 4005,
            group: "01",
            fullName: "DRA. MARIANA CASTRO URBINA",
            day: "Viernes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Inmunología 305"
          }
        ]
      },
      {
        id: 404,
        name: "Parasitología Médica",
        credits: 4,
        groups: [
          {
            id: 4006,
            group: "01",
            fullName: "DR. SERGIO VELÁSQUEZ RUIZ",
            day: "Lunes",
            start: "14:00",
            end: "17:00",
            classRoom: "Lab. Parasitología 306"
          },
          {
            id: 4007,
            group: "02",
            fullName: "DRA. JULIA RAMOS BECERRA",
            day: "Miércoles",
            start: "14:00",
            end: "17:00",
            classRoom: "Lab. Parasitología 306"
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: "CICLO V",
    courses: [
      {
        id: 501,
        name: "Farmacología Médica I",
        credits: 5,
        groups: [
          {
            id: 5001,
            group: "01",
            fullName: "DR. CARLOS EDUARDO ZAMBRANO SOTO",
            day: "Lunes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Farmacología 307"
          },
          {
            id: 5002,
            group: "02",
            fullName: "DRA. VERÓNICA CHÁVEZ MONTES",
            day: "Miércoles",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Farmacología 307"
          }
        ]
      },
      {
        id: 502,
        name: "Patología General",
        credits: 5,
        groups: [
          {
            id: 5003,
            group: "01",
            fullName: "DR. RICARDO OLIVARES BENAVIDES",
            day: "Martes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Patología 308"
          },
          {
            id: 5004,
            group: "02",
            fullName: "DR. ERNESTO VALDIVIA REYES",
            day: "Jueves",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Patología 308"
          }
        ]
      },
      {
        id: 503,
        name: "Nutrición Humana",
        credits: 3,
        groups: [
          {
            id: 5005,
            group: "01",
            fullName: "DRA. SOFÍA ALVARADO NÚÑEZ",
            day: "Viernes",
            start: "07:00",
            end: "09:30",
            classRoom: "Aula 208"
          }
        ]
      },
      {
        id: 504,
        name: "Genética Médica",
        credits: 4,
        groups: [
          {
            id: 5006,
            group: "01",
            fullName: "DR. LEONARDO QUIROZ MENDOZA",
            day: "Lunes",
            start: "14:00",
            end: "17:00",
            classRoom: "Lab. Genética 309"
          },
          {
            id: 5007,
            group: "02",
            fullName: "DRA. RAQUEL JIMÉNEZ ACOSTA",
            day: "Miércoles",
            start: "14:00",
            end: "17:00",
            classRoom: "Lab. Genética 309"
          }
        ]
      }
    ]
  },
  {
    id: 6,
    name: "CICLO VI",
    courses: [
      {
        id: 601,
        name: "Farmacología Médica II",
        credits: 5,
        groups: [
          {
            id: 6001,
            group: "01",
            fullName: "DR. FRANCISCO MORALES VARELA",
            day: "Lunes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Farmacología 307"
          },
          {
            id: 6002,
            group: "02",
            fullName: "DRA. DIANA FUENTES CASTILLO",
            day: "Miércoles",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Farmacología 307"
          }
        ]
      },
      {
        id: 602,
        name: "Semiología Médica",
        credits: 6,
        groups: [
          {
            id: 6003,
            group: "01",
            fullName: "DR. MANUEL RIVAS ZUMARÁN",
            day: "Martes",
            start: "07:00",
            end: "10:30",
            classRoom: "Lab. Semiología 401"
          },
          {
            id: 6004,
            group: "02",
            fullName: "DRA. CAROLINA VEGA HIDALGO",
            day: "Jueves",
            start: "07:00",
            end: "10:30",
            classRoom: "Lab. Semiología 401"
          }
        ]
      },
      {
        id: 603,
        name: "Patología Especial",
        credits: 5,
        groups: [
          {
            id: 6005,
            group: "01",
            fullName: "DR. ANTONIO DELGADO PAREDES",
            day: "Viernes",
            start: "07:00",
            end: "10:00",
            classRoom: "Lab. Patología 308"
          },
          {
            id: 6006,
            group: "02",
            fullName: "DRA. ELENA PRADO SÁNCHEZ",
            day: "Viernes",
            start: "10:15",
            end: "13:15",
            classRoom: "Lab. Patología 308"
          }
        ]
      },
      {
        id: 604,
        name: "Bioética y Deontología",
        credits: 3,
        groups: [
          {
            id: 6007,
            group: "01",
            fullName: "DR. JORGE LUIS CÁRDENAS ROSALES",
            day: "Lunes",
            start: "14:00",
            end: "16:30",
            classRoom: "Aula 209"
          }
        ]
      }
    ]
  },
  {
    id: 7,
    name: "CICLO VII",
    courses: [
      {
        id: 701,
        name: "Medicina Interna I",
        credits: 6,
        groups: [
          {
            id: 7001,
            group: "01",
            fullName: "DR. MARTÍN GUERRA SALAZAR",
            day: "Lunes",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Clínico UPSJB"
          },
          {
            id: 7002,
            group: "02",
            fullName: "DRA. CLAUDIA ALARCÓN VILLANUEVA",
            day: "Miércoles",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Clínico UPSJB"
          }
        ]
      },
      {
        id: 702,
        name: "Cirugía General I",
        credits: 6,
        groups: [
          {
            id: 7003,
            group: "01",
            fullName: "DR. FELIPE ANDRADE GUZMÁN",
            day: "Martes",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Clínico UPSJB"
          },
          {
            id: 7004,
            group: "02",
            fullName: "DR. JAVIER CÁCERES MONTENEGRO",
            day: "Jueves",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Clínico UPSJB"
          }
        ]
      },
      {
        id: 703,
        name: "Imagenología",
        credits: 4,
        groups: [
          {
            id: 7005,
            group: "01",
            fullName: "DR. ROBERTO ALCÁNTARA SILVA",
            day: "Viernes",
            start: "07:00",
            end: "10:00",
            classRoom: "Centro de Imágenes UPSJB"
          },
          {
            id: 7006,
            group: "02",
            fullName: "DRA. MARINA OCAMPO TORRES",
            day: "Viernes",
            start: "10:15",
            end: "13:15",
            classRoom: "Centro de Imágenes UPSJB"
          }
        ]
      },
      {
        id: 704,
        name: "Salud Pública I",
        credits: 3,
        groups: [
          {
            id: 7007,
            group: "01",
            fullName: "DR. ARTURO PACHECO VALENZUELA",
            day: "Lunes",
            start: "14:00",
            end: "16:30",
            classRoom: "Aula 210"
          }
        ]
      }
    ]
  },
  {
    id: 8,
    name: "CICLO VIII",
    courses: [
      {
        id: 801,
        name: "Medicina Interna II",
        credits: 6,
        groups: [
          {
            id: 8001,
            group: "01",
            fullName: "DRA. NATALIA CAMPOS RODRÍGUEZ",
            day: "Lunes",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Clínico UPSJB"
          },
          {
            id: 8002,
            group: "02",
            fullName: "DR. GUSTAVO MOLINA PÉREZ",
            day: "Miércoles",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Clínico UPSJB"
          }
        ]
      },
      {
        id: 802,
        name: "Cirugía General II",
        credits: 6,
        groups: [
          {
            id: 8003,
            group: "01",
            fullName: "DR. FERNANDO ARCE MÉNDEZ",
            day: "Martes",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Clínico UPSJB"
          },
          {
            id: 8004,
            group: "02",
            fullName: "DRA. SILVIA NAVARRO CORONADO",
            day: "Jueves",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Clínico UPSJB"
          }
        ]
      },
      {
        id: 803,
        name: "Psiquiatría",
        credits: 4,
        groups: [
          {
            id: 8005,
            group: "01",
            fullName: "DR. MARIO SANTOS JIMÉNEZ",
            day: "Viernes",
            start: "07:00",
            end: "10:00",
            classRoom: "Centro de Salud Mental UPSJB"
          },
          {
            id: 8006,
            group: "02",
            fullName: "DRA. ALEXANDRA RIVERA MENDOZA",
            day: "Viernes",
            start: "10:15",
            end: "13:15",
            classRoom: "Centro de Salud Mental UPSJB"
          }
        ]
      },
      {
        id: 804,
        name: "Salud Pública II",
        credits: 3,
        groups: [
          {
            id: 8007,
            group: "01",
            fullName: "DRA. LUCÍA VÁSQUEZ GÓMEZ",
            day: "Lunes",
            start: "14:00",
            end: "16:30",
            classRoom: "Aula 210"
          }
        ]
      }
    ]
  },
  {
    id: 9,
    name: "CICLO IX",
    courses: [
      {
        id: 901,
        name: "Ginecología y Obstetricia I",
        credits: 6,
        groups: [
          {
            id: 9001,
            group: "01",
            fullName: "DR. ENRIQUE MONTOYA FERNÁNDEZ",
            day: "Lunes",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Materno UPSJB"
          },
          {
            id: 9002,
            group: "02",
            fullName: "DRA. BEATRIZ SALAS ORTEGA",
            day: "Miércoles",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Materno UPSJB"
          }
        ]
      },
      {
        id: 902,
        name: "Pediatría I",
        credits: 6,
        groups: [
          {
            id: 9003,
            group: "01",
            fullName: "DRA. MERCEDES QUINTANA LÓPEZ",
            day: "Martes",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Pediátrico UPSJB"
          },
          {
            id: 9004,
            group: "02",
            fullName: "DR. RAÚL ORELLANA DÍAZ",
            day: "Jueves",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Pediátrico UPSJB"
          }
        ]
      },
      {
        id: 903,
        name: "Traumatología y Ortopedia",
        credits: 4,
        groups: [
          {
            id: 9005,
            group: "01",
            fullName: "DR. JORGE RAMÍREZ TAPIA",
            day: "Viernes",
            start: "07:00",
            end: "10:00",
            classRoom: "Centro Trauma UPSJB"
          },
          {
            id: 9006,
            group: "02",
            fullName: "DR. ALBERTO SOTO CARRANZA",
            day: "Viernes",
            start: "10:15",
            end: "13:15",
            classRoom: "Centro Trauma UPSJB"
          }
        ]
      },
      {
        id: 904,
        name: "Medicina Legal",
        credits: 3,
        groups: [
          {
            id: 9007,
            group: "01",
            fullName: "DR. CÉSAR MENDOZA CHÁVEZ",
            day: "Lunes",
            start: "14:00",
            end: "16:30",
            classRoom: "Aula 211"
          }
        ]
      }
    ]
  },
  {
    id: 10,
    name: "CICLO X",
    courses: [
      {
        id: 1001,
        name: "Ginecología y Obstetricia II",
        credits: 6,
        groups: [
          {
            id: 10001,
            group: "01",
            fullName: "DRA. SONIA VARGAS OLIVERA",
            day: "Lunes",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Materno UPSJB"
          },
          {
            id: 10002,
            group: "02",
            fullName: "DR. RICARDO PERALTA MORALES",
            day: "Miércoles",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Materno UPSJB"
          }
        ]
      },
      {
        id: 1002,
        name: "Pediatría II",
        credits: 6,
        groups: [
          {
            id: 10003,
            group: "01",
            fullName: "DR. FAUSTO GUERRERO LÓPEZ",
            day: "Martes",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Pediátrico UPSJB"
          },
          {
            id: 10004,
            group: "02",
            fullName: "DRA. VICTORIA MEDINA SALAS",
            day: "Jueves",
            start: "07:00",
            end: "10:30",
            classRoom: "Hospital Pediátrico UPSJB"
          }
        ]
      },
      {
        id: 1003,
        name: "Neurología",
        credits: 4,
        groups: [
          {
            id: 10005,
            group: "01",
            fullName: "DR. HÉCTOR RAMOS DUARTE",
            day: "Viernes",
            start: "07:00",
            end: "10:00",
            classRoom: "Centro Neurológico UPSJB"
          },
          {
            id: 10006,
            group: "02",
            fullName: "DRA. LAURA VIDAL MONTES",
            day: "Viernes",
            start: "10:15",
            end: "13:15",
            classRoom: "Centro Neurológico UPSJB"
          }
        ]
      },
      {
        id: 1004,
        name: "Gestión en Salud",
        credits: 3,
        groups: [
          {
            id: 10007,
            group: "01",
            fullName: "DRA. CAMILA TORRES ESPINOZA",
            day: "Lunes",
            start: "14:00",
            end: "16:30",
            classRoom: "Aula 212"
          }
        ]
      }
    ]
  },]

  selectedCourses: Set<number> = new Set();

  @Output() selectedCoursesChange = new EventEmitter<Course[]>();

  toggleCourseSelection(course: Course): void {
    if (this.selectedCourses.has(course.id)) {
      this.selectedCourses.delete(course.id);
    } else {
      this.selectedCourses.add(course.id);
    }
    
    const selectedCoursesList = this.cycles
      .flatMap(cycle => cycle.courses)
      .filter(course => this.selectedCourses.has(course.id));
      
    this.selectedCoursesChange.emit(selectedCoursesList);
  }

  handleCourseRemoval(courseId: number) {
    this.selectedCourses.delete(courseId);
    const selectedCoursesList = this.cycles
      .flatMap(cycle => cycle.courses)
      .filter(course => this.selectedCourses.has(course.id));
    
    this.selectedCoursesChange.emit(selectedCoursesList);
  }

  searchText: string = '';
  selectedIndex = 0;

  nextCycle() {
    if (this.selectedIndex < this.cycles.length - 1) {
      this.selectedIndex++;
    }
  }

  previousCycle() {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }

  filterCourses(cycle: Cycle) {
    if (!this.searchText) return cycle.courses;
    const search = this.searchText.toLowerCase();
    return cycle.courses.filter(course => 
      course.name.toLowerCase().includes(search) ||
      course.groups.some(group => 
        group.fullName.toLowerCase().includes(search) ||
        group.classRoom.toLowerCase().includes(search)
      )
    );
  }
}
