import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ajuda-suporte',
  templateUrl: './ajuda-suporte.component.html',
  styleUrls: ['./ajuda-suporte.component.css']
})
export class AjudaSuporteComponent implements OnInit {

  constructor() { }

  ngOnInit(){
    window.scroll(0, 0)
  }

}
