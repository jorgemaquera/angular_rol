import { Injectable } from "@angular/core";
import { Usuario } from "../modelo/usuario";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpEvent
} from "@angular/common/http";
import { map, catchError, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { SeviceloginService } from "../services/sevicelogin.service";
import Swal from "sweetalert2";

import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  private urlUser = "";
  private opciones = Object;
  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  constructor(
    private http: HttpClient,
    private router: Router,
    private loginService: LoginService
  ) {}
  //método para realizar el accesos al backend
  private agregarAutorizacion() {
    let token = this.loginService.token;
    if (token != null) {
      return this.httpHeaders.append("Authorization", "Bearer" + token);
    }
    return this.httpHeaders;
  } /*
  getOpciones():Observable<Object[]>{
    return this.http.get<Object[]>(this.urlOp + '/opciones', {headers: this.agregarAutorizacion()}).pipe(
      catchError(e =>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }*/
}
