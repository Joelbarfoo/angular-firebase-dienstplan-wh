import { Component, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Service {
  name: string;
  days: string[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './home.html',
})
export class Home {
  daysGerman = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

  services = signal<Service[]>([
    { name: 'Frühstücksdienst', days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'] },
    { name: 'Aufräumdienst unten', days: ['Samstag', 'Sonntag'] },
    { name: 'Aufräumdienst oben', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'] },
    { name: 'Spüldienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'] },
    { name: 'Abendbrotdienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'] },
    { name: 'Abendbrot-Aufräumdienst', days: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'] },
    { name: 'Kaffeerunde', days: ['Freitag'] },
    { name: 'Dienstplandienst', days: ['Freitag'] },
    { name: 'Waschküche', days: ['Montag', 'Donnerstag'] },
    { name: 'Einkaufen', days: ['Montag', 'Freitag'] },
    { name: 'Kochdienst', days: ['Samstag', 'Sonntag'] },
    { name: 'Raucherdienst', days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'] }
  ]);

  nextSaturday = signal(this.getNextSaturday());

  dates = computed(() => Array.from({length: 7}, (_, i) => {
    const date = new Date(this.nextSaturday());
    date.setDate(this.nextSaturday().getDate() + i);
    return date;
  }));

  assignments = signal<number[][]>(Array.from({length: this.services().length}, () => Array(7).fill(0)));

  peopleCounts = computed(() => {
    return this.services().map((service, i) => {
      if (service.name === 'Raucherdienst') {
        return this.assignments()[i][0] > 0 ? 1 : 0;
      } else {
        return this.assignments()[i].filter(a => a > 0).length;
      }
    });
  });

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
}
