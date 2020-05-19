import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsuarioModel } from "../models/usuario.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private URL = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private API_KEY = "AIzaSyAP0jNGTkqcuLoc94Iiuo8qxmMWObpvvHI";
  usertoken: string;
  /*CREAR NUEVOS USUARIOS
  signUp?key=[API_KEY]

  /*LOGIN
  signInWithPassword?key=[API_KEY]
 */
  constructor(private http: HttpClient) {}

  logOut() {
    localStorage.removeItem("token");
  }

  logIn(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true,
    };
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
        authData
      )
      .pipe(
        map((resp) => {
          console.log("entro en el mapa");
          this.guardarToken(resp["idToken"]);
          return resp;
        })
      );
  }

  nuevoUser(usuario: UsuarioModel) {
    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true,
    };
    return this.http
      .post(`${this.URL}signUp?key=${this.API_KEY}`, authData)
      .pipe(
        map((resp) => {
          console.log("entro en el mapa");
          this.guardarToken(resp["idToken"]);
          return resp;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.usertoken = idToken;
    localStorage.setItem("token", idToken);
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.getItem("token");
  }

  leerToken() {
    if (localStorage.getItem("token")) {
      this.usertoken = localStorage.getItem("token");
    } else {
      this.usertoken = "";
    }
    return this.usertoken;
  }

  estaAutenticado(): boolean {
    return this.usertoken.length > 2;
  }
}
