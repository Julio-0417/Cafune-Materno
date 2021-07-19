import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagens } from '../model/Postagens';
import { Usuarios } from '../model/Usuarios';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }
  usuario: Usuarios = new Usuarios()

  refreshToken(){
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }

  getAllPostagens(): Observable<Postagens[]> {
    return this.http.get<Postagens[]>('https://appcafunematerno.herokuapp.com/postagens', this.token)
  }

  getById(idPostagem: number): Observable<Postagens>{
    return this.http.get<Postagens>(`https://appcafunematerno.herokuapp.com/postagens/id/${idPostagem}`, this.token)
  }

  postPostagem(postagens: Postagens, idUsuario: number): Observable<Postagens> {
    return this.http.post<Postagens>(`https://appcafunematerno.herokuapp.com/postagens/salvar/usuario/${idUsuario}`, postagens, this.token)
  }

  putPostagem(postagens: Postagens, idPostagem: number): Observable<Postagens> {
    return this.http.put<Postagens>(`https://appcafunematerno.herokuapp.com/postagens/atualizar/${idPostagem}`, postagens, this.token)
  }

  deletePostagem(idPostagem: number) {
    let params = new HttpParams().set('idPostagem', idPostagem)
    return this.http.delete(`https://appcafunematerno.herokuapp.com/postagens/deletar?${params}`, this.token)
  }

}
