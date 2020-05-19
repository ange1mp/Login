// tslint:disable: quotemark
import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "../../models/usuario.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: "info",
      text: "Espere porfavor",
    });
    Swal.showLoading();

    this.auth.logIn(this.usuario).subscribe(
      (resp) => {
        Swal.close();
        console.warn("ACCESO CORRECTO");
        console.log(resp);
        if (this.recordarme === true) {
          localStorage.setItem("email", this.usuario.email);
        }
        this.router.navigateByUrl("/home");
      },
      (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: "error",
          title: "Error al autenticar",
          text: err.error.error.message,
        });
      }
    );
  }

  ngOnInit() {
    if (localStorage.getItem("email")) {
      this.usuario.email = localStorage.getItem("email");
      this.recordarme = true;
    }
  }
}
