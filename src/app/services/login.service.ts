import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent} from '@angular/common/http';
import { Usuario } from '../modelo/usuario';
import { UsuarioDatos } from '../modelo/UsuarioDato';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _usuario: Usuario;
  private _token : string;
  private _userD:UsuarioDatos;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }
  private agregarAutorizationHeader(){
    
  }
  public get usuarioDato():UsuarioDatos{
    if(this._userD!=null){
      return this._userD;
    }else if(this._userD==null && sessionStorage.getItem("usuario")!=null){
      this._userD = JSON.parse(sessionStorage.getItem('usuario')) as UsuarioDatos;
      return this._userD;
    }
    return new UsuarioDatos();
  }
  public get token():string{
    if(this._token!=null){
      return this._token;
    }else if(this._token==null && sessionStorage.getItem("token")!=null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }
  login(usuario:Usuario):Observable<any>{
    const urlEndpoint = 'http://localhost:8081/oauth/token';
    const credenciales = btoa('musa'+':'+'1234567');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization':'Basic '+credenciales});
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);
    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});
  }
  guardarUsuario(accesToken:string):void{
    let datos = this.obtenerDatosToken(accesToken);
    this._userD = new UsuarioDatos();
    this._userD.username=datos.USERNAME;
    this._userD.nombres = datos.NOMBRES;
    this._userD.apellidos = datos.APELLIDOS;
    this._userD.detalle = datos.DETALLE;
    this._userD.idusuario = datos.IDUSUARIO;
    this._userD.idrol = datos.IDROL;
    sessionStorage.setItem('usuario',JSON.stringify(this._userD));
  }
  guardarToken(accesToken:string):void{
    this._token = accesToken;
    sessionStorage.setItem('token',accesToken);
  }
  obtenerDatosToken(accesToken:string):any{
    if(accesToken!=null){
      return JSON.parse(atob(accesToken.split(".")[1]));
    }
    return null;
  }
  isAuthenticated():boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload !=null && payload.user_name && payload.user_name.length>0){
      return true;
    }
    return false;
  }
  logout():void{
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
   // sessionStorage.removeItem('token');
  }

  obtenerOpciones(id: number): Observable<Object>{
    return this.http.get<Object>('http://localhost:8081/opciones/datos/'+id, {headers: this.agregarAutorizacion()});
  }

  private agregarAutorizacion(){
    let token = this.token;
    if(token!=null){
      return this.httpHeaders.append('Authorization','Bearer' + token);
    }
    return this.httpHeaders;
  }
}
