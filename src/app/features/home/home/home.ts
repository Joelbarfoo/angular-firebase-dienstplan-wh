import { Component, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';

interface Service {
  name: string;
  days: string[];
  peopleNeeded: number;
  time: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, DatePipe, FormsModule, Navbar],
  templateUrl: './home.html',
})
export class Home {
  daysGerman = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  services = signal<Service[]>([
    { name: 'Frühstücksdienst', days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 2, time: '07:15 - 07:30' },
    { name: 'Aufräumdienst unten', days: ['Samstag', 'Sonntag'], peopleNeeded: 1, time: '18:00 - 19:00' },
    { name: 'Aufräumdienst oben', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 1, time: '18:00 - 19:00' },
    { name: 'Spüldienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 2, time: '19:00 - 20:00' },
    { name: 'Abendbrotdienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 2, time: '17:00 - 18:00' },
    { name: 'Abendbrot-Aufräumdienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 2, time: '18:00 - 19:00' },
    { name: 'Kaffeerunde', days: ['Freitag'], peopleNeeded: 2, time: '15:00 - 16:00' },
    { name: 'Dienstplandienst', days: ['Freitag'], peopleNeeded: 2, time: '10:00 - 11:00' },
    { name: 'Waschküche und TT-Raum', days: ['Montag', 'Donnerstag'], peopleNeeded: 2, time: '09:00 - 10:00' },
    { name: 'Einkaufen', days: ['Montag', 'Freitag'], peopleNeeded: 3, time: '14:00 - 15:00' },
    { name: 'Kochdienst', days: ['Samstag', 'Sonntag'], peopleNeeded: 2, time: '12:00 - 13:00' },
    { name: 'Raucherdienst (ganze Woche)', days: ['Samstag'], peopleNeeded: 1, time: '20:00 - 21:00' }
  ]);

  nextSaturday = signal(this.getNextSaturday());

  dates = computed(() => Array.from({length: 7}, (_, i) => {
    const date = new Date(this.nextSaturday());
    date.setDate(this.nextSaturday().getDate() + i);
    return date;
  }));

  assignments = signal<number[][]>(Array.from({length: this.services().length}, () => Array(7).fill(0)));

  confirmed = signal<number[][]>(Array.from({length: this.services().length}, () => Array(7).fill(0)));

  getNextSaturday(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay();
    let daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
    if (daysUntilSaturday === 0) daysUntilSaturday = 7;
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + daysUntilSaturday);
    return nextSaturday;
  }

  isApplicable(service: Service, date: Date): boolean {
    const dayIndex = date.getDay();
    const dayName = this.daysGerman[dayIndex];
    return service.days.includes(dayName);
  }

  getWeekdayShort(date: Date): string {
    const dayIndex = date.getDay();
    const shortDays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    return shortDays[dayIndex];
  }

  getPeopleIcons(peopleNeeded: number): string {
    return '👤'.repeat(peopleNeeded);
  }

  toggleConfirmed(i: number, j: number) {
    this.confirmed.update(c => {
      c[i][j] = c[i][j] ? 0 : 1;
      return [...c];
    });
  }
}
