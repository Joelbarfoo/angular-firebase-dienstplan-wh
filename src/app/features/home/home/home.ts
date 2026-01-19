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
    { name: 'Aufräumdienst unten', days: ['Samstag', 'Sonntag'], peopleNeeded: 1, time: 'Ab 8:00' },
    { name: 'Aufräumdienst oben', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 1, time: '8:00 - 8:30' },
    { name: 'Spüldienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 2, time: '13:00 - 13:30' },
    { name: 'Abendbrotdienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 2, time: 'Ab 17:00' },
    { name: 'Abendbrot-Aufräumdienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 2, time: 'Ab 18:15' },
    { name: 'Kaffeerunde', days: ['Freitag'], peopleNeeded: 2, time: '14:15 - 14:30' },
    { name: 'Dienstplandienst', days: ['Freitag'], peopleNeeded: 2, time: '14:30 - 15:00' },
    { name: 'Waschküche und TT-Raum', days: ['Montag', 'Donnerstag'], peopleNeeded: 2, time: 'Bis 19:30' },
    { name: 'Einkaufen', days: ['Montag', 'Freitag'], peopleNeeded: 3, time: 'Ab 9:30' },
    { name: 'Kochdienst', days: ['Samstag', 'Sonntag'], peopleNeeded: 2, time: 'Ab ca. 12:00' },
    { name: 'Raucherdienst', days: ['Samstag'], peopleNeeded: 1, time: 'ganze Woche' }
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
