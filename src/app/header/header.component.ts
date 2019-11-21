import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}
  logout(): void {
    this.loginService.logout();
    Swal.fire(
      "Logout",
      "Hola <b>" +
        this.loginService.usuarioDato.username +
        "</b> has cerrado sesión con Exito!",
      "success"
    );
    this.router.navigate(["/"]);
    this.opciones = [];
    //swal({title: 'hello', text: 'hello ${<strong>{name}</strong>}', icon: 'success' })
  }
  ngOnInit() {
    if (this.loginService.isAuthenticated()) {
      this.obtenerOpciones();
    }
  }

  opciones: Array<Object>;

  obtenerOpciones() {
    this.loginService
      .obtenerOpciones(JSON.parse(sessionStorage.getItem("usuario")).idrol)
      .subscribe(data => {
        console.log(data);
        this.opciones = data["opc"];
      });
  }
}
