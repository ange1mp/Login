// tslint:disable: quotemark
import { Component, OnInit } from "@angular/core";
import { UsuarioModel } from "../../models/usuario.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;
  onSubmit(form: NgForm) {
    Swal.fire({
      allowEnterKey: false,
      icon: "info",
      text: "Cargando Información",
    });
    Swal.showLoading();
    if (form.invalid) return;
    this.auth.nuevoUser(this.usuario).subscribe(
      (res) => {
        Swal.close();
        console.warn("ALTA EXITOSA");
        console.log(res);
        if (this.recordarme === true) {
          localStorage.setItem("email", this.usuario.email);
        }
        this.router.navigateByUrl("/home");
      },
      (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: "error",
          text: err.error.error.message,
        });
      }
    );
  }

  ngOnInit() {}
}
