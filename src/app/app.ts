import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./features/home/home/home";
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/regsister/register';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Login, Register],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-firebase-dienstplan-wh');
}
