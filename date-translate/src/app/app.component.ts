import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import moment from 'moment-hijri';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  private hijriDayName: string = '';

  get HijriDayName(): string {
    return this.hijriDayName;
  }

  private dateDay: string = '';
  private dateMonth: string = '';
  private dateYear: string = '';

  public convertedDay: string = '';
  public convertedMonth: string = '';
  public convertedYear: string = '';

  translate: boolean = false;

  get DateDay(): string {
    return this.dateDay;
  }
  set DateDay(day: string) {
    this.dateDay = day;
  }

  get DateMonth(): string {
    return this.dateMonth;
  }
  set DateMonth(month: string) {
    this.dateMonth = month;
  }

  get DateYear(): string {
    return this.dateYear;
  }
  set DateYear(year: string) {
    this.dateYear = year;
  }

  toggleAndTranslateDate(): void {
    this.translate = !this.translate;

    if (this.translate) {

      const hijriDate = moment(`${this.dateYear}-${this.dateMonth}-${this.dateDay}`, 'YYYY-MM-DD').format('iYYYY-iM-iD');
      const [year, month, day] = hijriDate.split('-').map(Number);

      this.convertedYear = year.toString();
      this.convertedMonth = month.toString();
      this.convertedDay = day.toString();


      moment.locale('ar');
      const hijriDayOfWeek = moment(`${year}-${month}-${day}`, 'iYYYY-iM-iD').format('dddd');
      const daysOfWeek: { [key: string]: string } = {
        'Sunday': 'الأحد',
        'Monday': 'الاثنين',
        'Tuesday': 'الثلاثاء',
        'Wednesday': 'الأربعاء',
        'Thursday': 'الخميس',
        'Friday': 'الجمعة',
        'Saturday': 'السبت'
      };

      this.hijriDayName = daysOfWeek[hijriDayOfWeek] || 'غير معروف';


    }
    this.translate = !this.translate;
  }

  title = 'date-translate';
}
