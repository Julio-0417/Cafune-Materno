import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { HomeComponent } from './home/home.component';
import { EntrarComponent } from './entrar/entrar.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { FeedComponent } from './feed/feed.component';
import { GruposComponent } from './grupos/grupos.component';
import { PaginaGrupoComponent } from './grupos/pagina-grupo/pagina-grupo.component';
import { GrupoEditComponent } from './edit/grupo-edit/grupo-edit.component';
import { MenuFeedComponent } from './menu-feed/menu-feed.component';
import { PaginaUsuarioComponent } from './pagina-usuario/pagina-usuario.component';
import { MinhasPostagensComponent } from './minhas-postagens/minhas-postagens.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { AlertasComponent } from './alertas/alertas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DoacaoLeiteComponent } from './doacao-leite/doacao-leite.component';
import { DoacaoHigieneComponent } from './doacao-higiene/doacao-higiene.component';
import { DoacaoRoupaComponent } from './doacao-roupa/doacao-roupa.component';
import { AjudaSuporteComponent } from './ajuda-suporte/ajuda-suporte.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    HomeComponent,
    EntrarComponent,
    CadastrarComponent,
    FeedComponent,
    GruposComponent,
    PaginaGrupoComponent,
    GrupoEditComponent,
    MenuFeedComponent,
    GrupoEditComponent,
    PaginaUsuarioComponent,
    MinhasPostagensComponent,
    PostagemEditComponent,
    PostagemDeleteComponent,
    UsuarioEditComponent,
    AlertasComponent,
    DoacaoLeiteComponent,
    DoacaoHigieneComponent,
    DoacaoRoupaComponent,
    AjudaSuporteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
