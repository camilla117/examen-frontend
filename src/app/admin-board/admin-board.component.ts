import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.css']
})
export class AdminBoardComponent {
  /**
   *
   */
  constructor(private router: Router) {
    
  }
  changeRoute(ruta: string) {
    this.router.navigate([ruta]);
  }
}
