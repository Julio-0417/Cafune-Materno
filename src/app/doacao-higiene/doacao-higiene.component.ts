import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { GruposService } from '../service/grupos.service';

@Component({
  selector: 'app-doacao-higiene',
  templateUrl: './doacao-higiene.component.html',
  styleUrls: ['./doacao-higiene.component.css']
})
export class DoacaoHigieneComponent implements OnInit {

  constructor(
    private router: Router,
    private gruposService: GruposService

  ) { }

  ngOnInit() {
    window.scroll(0,0)
    if(environment.token == '') {
      this.router.navigate(['/home'])
    }
    this.gruposService.refreshToken()
  }

}
