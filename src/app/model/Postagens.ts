import { Grupos } from "./Grupos"
import { Usuarios } from "./Usuarios"

export class Postagens{
    public date: Date
    public descricaoPostagem: string
    public idPostagem: number
    public localizacaoPostagem: string
    public tituloPostagem: string
    public urlAnexo: string
    public usuario: Usuarios
    public grupoPertencente: Grupos
}
