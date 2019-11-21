import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelo/usuario';
import { UsuarioDatos } from '../modelo/UsuarioDato';
import Swal from 'sweetalert2';
import { LoginService} from '../services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
   titulo:string = '  Sistema MUSA';
   usuario : Usuario;
   user : UsuarioDatos;
  constructor(private loginService:LoginService, private router:Router) {
    this.usuario = new Usuario();

   }

  ngOnInit() {
    if(this.loginService.isAuthenticated()){
      Swal.fire('Login','Hola <b>'+this.loginService.usuarioDato.username+'</b> ya estas Autentificado', 'info');
      this.router.navigate(['/'])
    }
  }
  login():void{
    if(this.usuario.username==null || this.usuario.password==null){
      Swal.fire('Error Login','Username o Password incorrectos', 'error');
      return;
    }
    this.loginService.login(this.usuario).subscribe(response=>{
      this.loginService.guardarUsuario(response.access_token);
      this.loginService.guardarToken(response.access_token);
      let usuario = this.loginService.usuarioDato;
      this.router.navigate(['/']);
      window.location.reload();
      Swal.fire('Login', 'Bienvenido: <b>'+this.loginService.usuarioDato.username+'</b> has iniciado Sesión con éxito..!','success');
      
    }, error =>{
      if(error.status==401){
        Swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
      }
    }
    );
  }
  cancelar():void{
    this.router.navigate(['/']);
  }

}
