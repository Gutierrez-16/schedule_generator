import { Career } from "features/cycles/interfaces/cycle.interface";

export const MEDICINA_CAREER_DATA: Career = {
  career: "Medicina",
  cycles: [
    {
      cycle: "Primer Semestre",
      courses: [
        {
          assignmentId: 1001,
          courseId: 101,
          course: "Anatomía Humana I",
          credits: 6,
          details: [
            {
              classroom: "Lab A-101",
              day: "Lunes",
              startTime: "08:00",
              endTime: "10:00",
              teacher: "Dr. García Martínez"
            },
            {
              classroom: "Aula Magna",
              day: "Miércoles",
              startTime: "07:00",
              endTime: "09:00",
              teacher: "Dr. García Martínez"
            }
          ]
        },
        {
          assignmentId: 1002,
          courseId: 102,
          course: "Biología Celular y Molecular",
          credits: 5,
          details: [
            {
              classroom: "Lab B-203",
              day: "Martes",
              startTime: "10:00",
              endTime: "12:00",
              teacher: "Dra. Fernández López"
            },
            {
              classroom: "Aula 202",
              day: "Jueves",
              startTime: "10:00",
              endTime: "12:00",
              teacher: "Dra. Fernández López"
            }
          ]
        },
        {
          assignmentId: 1003,
          courseId: 103,
          course: "Bioquímica Médica",
          credits: 5,
          details: [
            {
              classroom: "Lab C-105",
              day: "Lunes",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Rodríguez Sánchez"
            },
            {
              classroom: "Aula 108",
              day: "Viernes",
              startTime: "08:00",
              endTime: "10:00",
              teacher: "Dr. Rodríguez Sánchez"
            }
          ]
        },
        {
          assignmentId: 1004,
          courseId: 104,
          course: "Introducción a la Medicina",
          credits: 3,
          details: [
            {
              classroom: "Auditorio Principal",
              day: "Miércoles",
              startTime: "12:00",
              endTime: "14:00",
              teacher: "Dra. Gómez Ramírez"
            }
          ]
        },
        {
          assignmentId: 1005,
          courseId: 105,
          course: "Bioestadística",
          credits: 4,
          details: [
            {
              classroom: "Aula 301",
              day: "Martes",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Martínez Ruiz"
            },
            {
              classroom: "Sala de Computación 2",
              day: "Jueves",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Martínez Ruiz"
            }
          ]
        }
      ]
    },
    {
      cycle: "Segundo Semestre",
      courses: [
        {
          assignmentId: 1006,
          courseId: 201,
          course: "Anatomía Humana II",
          credits: 6,
          details: [
            {
              classroom: "Lab A-102",
              day: "Lunes",
              startTime: "08:00",
              endTime: "10:00",
              teacher: "Dr. García Martínez"
            },
            {
              classroom: "Aula Magna",
              day: "Miércoles",
              startTime: "07:00",
              endTime: "09:00",
              teacher: "Dr. García Martínez"
            }
          ]
        },
        {
          assignmentId: 1007,
          courseId: 202,
          course: "Histología",
          credits: 5,
          details: [
            {
              classroom: "Lab Microscopía",
              day: "Martes",
              startTime: "10:00",
              endTime: "12:00",
              teacher: "Dra. Soto Mendez"
            },
            {
              classroom: "Aula 204",
              day: "Jueves",
              startTime: "10:00",
              endTime: "12:00",
              teacher: "Dra. Soto Mendez"
            }
          ]
        },
        {
          assignmentId: 1008,
          courseId: 203,
          course: "Embriología Humana",
          credits: 4,
          details: [
            {
              classroom: "Aula 205",
              day: "Lunes",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Vargas Díaz"
            },
            {
              classroom: "Lab D-101",
              day: "Viernes",
              startTime: "10:00",
              endTime: "12:00",
              teacher: "Dr. Vargas Díaz"
            }
          ]
        },
        {
          assignmentId: 1009,
          courseId: 204,
          course: "Fisiología General",
          credits: 5,
          details: [
            {
              classroom: "Aula 302",
              day: "Martes",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dra. López Reyes"
            },
            {
              classroom: "Lab E-201",
              day: "Jueves",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dra. López Reyes"
            }
          ]
        },
        {
          assignmentId: 1010,
          courseId: 205,
          course: "Genética Médica",
          credits: 4,
          details: [
            {
              classroom: "Aula 206",
              day: "Miércoles",
              startTime: "10:00",
              endTime: "12:00",
              teacher: "Dr. Torres Herrera"
            },
            {
              classroom: "Lab Genética",
              day: "Viernes",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Torres Herrera"
            }
          ]
        }
      ]
    },
    {
      cycle: "Tercer Semestre",
      courses: [
        {
          assignmentId: 1011,
          courseId: 301,
          course: "Fisiología de Sistemas",
          credits: 6,
          details: [
            {
              classroom: "Aula 303",
              day: "Lunes",
              startTime: "07:00",
              endTime: "09:00",
              teacher: "Dr. Ramírez Fuentes"
            },
            {
              classroom: "Lab F-101",
              day: "Miércoles",
              startTime: "07:00",
              endTime: "09:00",
              teacher: "Dr. Ramírez Fuentes"
            }
          ]
        },
        {
          assignmentId: 1012,
          courseId: 302,
          course: "Patología General",
          credits: 5,
          details: [
            {
              classroom: "Aula 304",
              day: "Martes",
              startTime: "09:00",
              endTime: "11:00",
              teacher: "Dra. Herrera Castillo"
            },
            {
              classroom: "Lab Patología",
              day: "Jueves",
              startTime: "09:00",
              endTime: "11:00",
              teacher: "Dra. Herrera Castillo"
            }
          ]
        },
        {
          assignmentId: 1013,
          courseId: 303,
          course: "Farmacología Básica",
          credits: 5,
          details: [
            {
              classroom: "Aula 305",
              day: "Lunes",
              startTime: "11:00",
              endTime: "13:00",
              teacher: "Dr. Díaz Morales"
            },
            {
              classroom: "Lab Farmacología",
              day: "Viernes",
              startTime: "09:00",
              endTime: "11:00",
              teacher: "Dr. Díaz Morales"
            }
          ]
        },
        {
          assignmentId: 1014,
          courseId: 304,
          course: "Inmunología",
          credits: 4,
          details: [
            {
              classroom: "Aula 306",
              day: "Martes",
              startTime: "13:00",
              endTime: "15:00",
              teacher: "Dra. Ortiz Mendoza"
            },
            {
              classroom: "Lab Inmunología",
              day: "Jueves",
              startTime: "13:00",
              endTime: "15:00",
              teacher: "Dra. Ortiz Mendoza"
            }
          ]
        },
        {
          assignmentId: 1015,
          courseId: 305,
          course: "Microbiología Médica",
          credits: 5,
          details: [
            {
              classroom: "Aula 307",
              day: "Miércoles",
              startTime: "11:00",
              endTime: "13:00",
              teacher: "Dr. Moreno Vega"
            },
            {
              classroom: "Lab Microbiología",
              day: "Viernes",
              startTime: "13:00",
              endTime: "15:00",
              teacher: "Dr. Moreno Vega"
            }
          ]
        }
      ]
    },
    {
      cycle: "Cuarto Semestre",
      courses: [
        {
          assignmentId: 1016,
          courseId: 401,
          course: "Patología de Sistemas",
          credits: 6,
          details: [
            {
              classroom: "Aula 308",
              day: "Lunes",
              startTime: "07:00",
              endTime: "09:00",
              teacher: "Dra. Mendoza López"
            },
            {
              classroom: "Lab Patología Avanzada",
              day: "Miércoles",
              startTime: "07:00",
              endTime: "09:00",
              teacher: "Dra. Mendoza López"
            }
          ]
        },
        {
          assignmentId: 1017,
          courseId: 402,
          course: "Farmacología Clínica",
          credits: 5,
          details: [
            {
              classroom: "Aula 309",
              day: "Martes",
              startTime: "09:00",
              endTime: "11:00",
              teacher: "Dr. Jiménez Castro"
            },
            {
              classroom: "Sala de Simulación",
              day: "Jueves",
              startTime: "09:00",
              endTime: "11:00",
              teacher: "Dr. Jiménez Castro"
            }
          ]
        },
        {
          assignmentId: 1018,
          courseId: 403,
          course: "Propedéutica Médica",
          credits: 6,
          details: [
            {
              classroom: "Hospital Universitario",
              day: "Lunes",
              startTime: "14:00",
              endTime: "17:00",
              teacher: "Dr. Rivera Campos"
            },
            {
              classroom: "Hospital Universitario",
              day: "Jueves",
              startTime: "14:00",
              endTime: "17:00",
              teacher: "Dr. Rivera Campos"
            }
          ]
        },
        {
          assignmentId: 1019,
          courseId: 404,
          course: "Imagenología",
          credits: 4,
          details: [
            {
              classroom: "Centro de Imagen",
              day: "Martes",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dra. Navarro Romero"
            },
            {
              classroom: "Aula 310",
              day: "Viernes",
              startTime: "10:00",
              endTime: "12:00",
              teacher: "Dra. Navarro Romero"
            }
          ]
        },
        {
          assignmentId: 1020,
          courseId: 405,
          course: "Bioética",
          credits: 3,
          details: [
            {
              classroom: "Aula 311",
              day: "Miércoles",
              startTime: "11:00",
              endTime: "13:00",
              teacher: "Dr. Campos Varela"
            }
          ]
        }
      ]
    },
    {
      cycle: "Quinto Semestre",
      courses: [
        {
          assignmentId: 1021,
          courseId: 501,
          course: "Medicina Interna I",
          credits: 8,
          details: [
            {
              classroom: "Hospital Universitario",
              day: "Lunes",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dra. Sánchez Medina"
            },
            {
              classroom: "Hospital Universitario",
              day: "Miércoles",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dra. Sánchez Medina"
            }
          ]
        },
        {
          assignmentId: 1022,
          courseId: 502,
          course: "Cirugía General",
          credits: 7,
          details: [
            {
              classroom: "Hospital Universitario",
              day: "Martes",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dr. Gutiérrez Ramos"
            },
            {
              classroom: "Hospital Universitario",
              day: "Jueves",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dr. Gutiérrez Ramos"
            }
          ]
        },
        {
          assignmentId: 1023,
          courseId: 503,
          course: "Psiquiatría",
          credits: 5,
          details: [
            {
              classroom: "Hospital Psiquiátrico",
              day: "Lunes",
              startTime: "14:00",
              endTime: "17:00",
              teacher: "Dra. Medina Torres"
            },
            {
              classroom: "Aula 312",
              day: "Miércoles",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dra. Medina Torres"
            }
          ]
        },
        {
          assignmentId: 1024,
          courseId: 504,
          course: "Neurología",
          credits: 5,
          details: [
            {
              classroom: "Hospital Universitario",
              day: "Martes",
              startTime: "14:00",
              endTime: "17:00",
              teacher: "Dr. Pérez Gonzalez"
            },
            {
              classroom: "Aula 313",
              day: "Jueves",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Pérez Gonzalez"
            }
          ]
        },
        {
          assignmentId: 1025,
          courseId: 505,
          course: "Farmacología Clínica Avanzada",
          credits: 4,
          details: [
            {
              classroom: "Aula 314",
              day: "Viernes",
              startTime: "08:00",
              endTime: "12:00",
              teacher: "Dr. Jiménez Castro"
            }
          ]
        }
      ]
    },
    {
      cycle: "Sexto Semestre",
      courses: [
        {
          assignmentId: 1026,
          courseId: 601,
          course: "Medicina Interna II",
          credits: 8,
          details: [
            {
              classroom: "Hospital Universitario",
              day: "Lunes",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dr. Castillo Flores"
            },
            {
              classroom: "Hospital Universitario",
              day: "Miércoles",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dr. Castillo Flores"
            }
          ]
        },
        {
          assignmentId: 1027,
          courseId: 602,
          course: "Pediatría",
          credits: 7,
          details: [
            {
              classroom: "Hospital Pediátrico",
              day: "Martes",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dra. Flores Miranda"
            },
            {
              classroom: "Hospital Pediátrico",
              day: "Jueves",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dra. Flores Miranda"
            }
          ]
        },
        {
          assignmentId: 1028,
          courseId: 603,
          course: "Ginecología y Obstetricia",
          credits: 7,
          details: [
            {
              classroom: "Hospital Materno",
              day: "Lunes",
              startTime: "14:00",
              endTime: "18:00",
              teacher: "Dr. Romero Vázquez"
            },
            {
              classroom: "Hospital Materno",
              day: "Miércoles",
              startTime: "14:00",
              endTime: "18:00",
              teacher: "Dr. Romero Vázquez"
            }
          ]
        },
        {
          assignmentId: 1029,
          courseId: 604,
          course: "Medicina Preventiva",
          credits: 4,
          details: [
            {
              classroom: "Centro de Salud",
              day: "Viernes",
              startTime: "08:00",
              endTime: "12:00",
              teacher: "Dra. Cruz Reyes"
            }
          ]
        },
        {
          assignmentId: 1030,
          courseId: 605,
          course: "Geriatría",
          credits: 4,
          details: [
            {
              classroom: "Hospital Geriátrico",
              day: "Martes",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Hernández Mora"
            },
            {
              classroom: "Aula 315",
              day: "Jueves",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Hernández Mora"
            }
          ]
        }
      ]
    },
    {
      cycle: "Séptimo Semestre",
      courses: [
        {
          assignmentId: 1031,
          courseId: 701,
          course: "Medicina de Urgencias",
          credits: 7,
          details: [
            {
              classroom: "Hospital Universitario - Urgencias",
              day: "Lunes",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dr. Vega Miranda"
            },
            {
              classroom: "Hospital Universitario - Urgencias",
              day: "Miércoles",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dr. Vega Miranda"
            }
          ]
        },
        {
          assignmentId: 1032,
          courseId: 702,
          course: "Traumatología y Ortopedia",
          credits: 6,
          details: [
            {
              classroom: "Hospital Universitario",
              day: "Martes",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dr. Silva Rojas"
            },
            {
              classroom: "Hospital Universitario",
              day: "Jueves",
              startTime: "07:00",
              endTime: "11:00",
              teacher: "Dr. Silva Rojas"
            }
          ]
        },
        {
          assignmentId: 1033,
          courseId: 703,
          course: "Dermatología",
          credits: 4,
          details: [
            {
              classroom: "Clínica Dermatológica",
              day: "Lunes",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dra. Rojas Fuentes"
            },
            {
              classroom: "Aula 316",
              day: "Miércoles",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dra. Rojas Fuentes"
            }
          ]
        },
        {
          assignmentId: 1034,
          courseId: 704,
          course: "Oftalmología",
          credits: 4,
          details: [
            {
              classroom: "Clínica Oftalmológica",
              day: "Martes",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Miranda Castillo"
            },
            {
              classroom: "Aula 317",
              day: "Jueves",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Miranda Castillo"
            }
          ]
        },
        {
          assignmentId: 1035,
          courseId: 705,
          course: "Otorrinolaringología",
          credits: 4,
          details: [
            {
              classroom: "Clínica ORL",
              day: "Viernes",
              startTime: "08:00",
              endTime: "12:00",
              teacher: "Dra. Fuentes Castillo"
            }
          ]
        }
      ]
    },
    {
      cycle: "Octavo Semestre",
      courses: [
        {
          assignmentId: 1036,
          courseId: 801,
          course: "Medicina Familiar",
          credits: 6,
          details: [
            {
              classroom: "Centro de Salud",
              day: "Lunes",
              startTime: "08:00",
              endTime: "12:00",
              teacher: "Dra. Castillo Vega"
            },
            {
              classroom: "Centro de Salud",
              day: "Miércoles",
              startTime: "08:00",
              endTime: "12:00",
              teacher: "Dra. Castillo Vega"
            }
          ]
        },
        {
          assignmentId: 1037,
          courseId: 802,
          course: "Epidemiología Clínica",
          credits: 5,
          details: [
            {
              classroom: "Aula 318",
              day: "Martes",
              startTime: "08:00",
              endTime: "11:00",
              teacher: "Dr. López Mendoza"
            },
            {
              classroom: "Centro de Investigación",
              day: "Jueves",
              startTime: "08:00",
              endTime: "11:00",
              teacher: "Dr. López Mendoza"
            }
          ]
        },
        {
          assignmentId: 1038,
          courseId: 803,
          course: "Medicina Legal",
          credits: 4,
          details: [
            {
              classroom: "Instituto Forense",
              day: "Lunes",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Ramírez Torres"
            },
            {
              classroom: "Aula 319",
              day: "Miércoles",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dr. Ramírez Torres"
            }
          ]
        },
        {
          assignmentId: 1039,
          courseId: 804,
          course: "Gestión Sanitaria",
          credits: 4,
          details: [
            {
              classroom: "Aula 320",
              day: "Martes",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dra. García Pérez"
            },
            {
              classroom: "Aula 320",
              day: "Jueves",
              startTime: "14:00",
              endTime: "16:00",
              teacher: "Dra. García Pérez"
            }
          ]
        },
        {
          assignmentId: 1040,
          courseId: 805,
          course: "Metodología de la Investigación",
          credits: 5,
          details: [
            {
              classroom: "Centro de Investigación",
              day: "Viernes",
              startTime: "08:00",
              endTime: "13:00",
              teacher: "Dr. Soto Rivera"
            }
          ]
        }
      ]
    },
    {
      cycle: "Noveno Semestre",
      courses: [
        {
          assignmentId: 1041,
          courseId: 901,
          course: "Internado Rotatorio - Medicina Interna",
          credits: 12,
          details: [
            {
              classroom: "Hospital Universitario",
              day: "Lunes a Domingo",
              startTime: "07:00",
              endTime: "19:00",
              teacher: "Coordinador de Internado"
            }
          ]
        },
        {
          assignmentId: 1042,
          courseId: 902,
          course: "Internado Rotatorio - Cirugía",
          credits: 12,
          details: [
            {
              classroom: "Hospital Universitario",
              day: "Lunes a Domingo",
              startTime: "07:00",
              endTime: "19:00",
              teacher: "Coordinador de Internado"
            }
          ]
        }
      ]
    },
    {
      cycle: "Décimo Semestre",
      courses: [
        {
          assignmentId: 1043,
          courseId: 1001,
          course: "Internado Rotatorio - Pediatría",
          credits: 12,
          details: [
            {
              classroom: "Hospital Pediátrico",
              day: "Lunes a Domingo",
              startTime: "07:00",
              endTime: "19:00",
              teacher: "Coordinador de Internado"
            }
          ]
        },
        {
          assignmentId: 1044,
          courseId: 1002,
          course: "Internado Rotatorio - Ginecología y Obstetricia",
          credits: 12,
          details: [
            {
              classroom: "Hospital Materno",
              day: "Lunes a Domingo",
              startTime: "07:00",
              endTime: "19:00",
              teacher: "Coordinador de Internado"
            }
          ]
        }
      ]
    },
    {
      cycle: "Decimoprimer Semestre",
      courses: [
        {
          assignmentId: 1045,
          courseId: 1101,
          course: "Servicio Social - Atención Primaria",
          credits: 20,
          details: [
            {
              classroom: "Centro de Salud Asignado",
              day: "Lunes a Viernes",
              startTime: "08:00",
              endTime: "16:00",
              teacher: "Supervisor de Servicio Social"
            }
          ]
        }
      ]
    },
    {
      cycle: "Decimosegundo Semestre",
      courses: [
        {
          assignmentId: 1046,
          courseId: 1201,
          course: "Servicio Social - Proyecto Comunitario",
          credits: 20,
          details: [
            {
              classroom: "Centro de Salud Asignado",
              day: "Lunes a Viernes",
              startTime: "08:00",
              endTime: "16:00",
              teacher: "Supervisor de Servicio Social"
            }
          ]
        }
      ]
    }
  ]
};