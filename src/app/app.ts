import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./features/home/home/home";
import { Navbar } from './features/home/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-firebase-dienstplan-wh');
}
