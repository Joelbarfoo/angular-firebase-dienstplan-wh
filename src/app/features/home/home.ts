import { Component, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Service {
  name: string;
  days: string[];
  peopleNeeded: number;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './home.html',
})
export class Home {
  daysGerman = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  commonClass = 'border border-gray-300 px-4 py-2 text-center';

  services = signal<Service[]>([
    { name: 'Frühstücksdienst', days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 2 },
    { name: 'Aufräumdienst unten', days: ['Samstag', 'Sonntag'], peopleNeeded: 1 },
    { name: 'Aufräumdienst oben', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 1 },
    { name: 'Spüldienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 2 },
    { name: 'Abendbrotdienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 2 },
    { name: 'Abendbrot-Aufräumdienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'], peopleNeeded: 2 },
    { name: 'Kaffeerunde', days: ['Freitag'], peopleNeeded: 2 },
    { name: 'Dienstplandienst', days: ['Freitag'], peopleNeeded: 2 },
    { name: 'Waschküche und TT-Raum', days: ['Montag', 'Donnerstag'], peopleNeeded: 2 },
    { name: 'Einkaufen', days: ['Montag', 'Freitag'], peopleNeeded: 3 },
    { name: 'Kochdienst', days: ['Samstag', 'Sonntag'], peopleNeeded: 2 },
    { name: 'Raucherdienst', days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'], peopleNeeded: 1 }
  ]);

  nextSaturday = signal(this.getNextSaturday());

  dates = computed(() => Array.from({length: 7}, (_, i) => {
    const date = new Date(this.nextSaturday());
    date.setDate(this.nextSaturday().getDate() + i);
    return date;
  }));

  assignments = signal<number[][]>(Array.from({length: this.services().length}, () => Array(7).fill(0)));

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
}
