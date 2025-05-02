import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent implements OnInit {
  currentIndex = 0;

  readonly backgroundImages = [
    'https://res.cloudinary.com/dv0mgatgr/image/upload/v1746066157/algoritmo/swwe2asc7lydqtwdip1v.jpg',
    'https://res.cloudinary.com/dpfcpo5me/image/upload/v1746208077/practicas/ldfk4iuf31cbdwdrkwwo.jpg',
    'https://res.cloudinary.com/dv0mgatgr/image/upload/v1746066158/algoritmo/jwgtf0shglbbgfwmxymg.jpg',
    'https://res.cloudinary.com/dv0mgatgr/image/upload/v1746066157/algoritmo/kv4dkhvcbctpghoxgrne.jpg',
  ];

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.backgroundImages.length;
    }, 5000);
  }
}
