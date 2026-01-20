import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./features/home/home/home";
import { Login } from './features/auth/login/login';
import { Regsister } from './features/auth/regsister/regsister';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Login, Regsister],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-firebase-dienstplan-wh');
}
