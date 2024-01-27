//This class provides a comprehensive set of tools for working with dates and ranges of dates, including extracting the year, month, and day from a date string, determining the number of days in a month, generating date strings for each month in a year, and generating a list of dates for the week containing a selected date 

class DateRangeInfo {
    constructor({selectedDate, range}) {
       // Constructor initializes the class with the selected date and range
       this.selectedDate = selectedDate;
       this.range = range;
       this.startDate = null
       this.daysInMonth = null
       this.day = null
       this.month = null
       this.year = null
    }
   
    getStartDate() {
       // Method to convert the selected date string into a Date object
       this.startDate = new Date(this.selectedDate);
    } 
   
    splitDate() {
       // Method to extract the year, month, and day from the selected date string
       let match = this.selectedDate.match(/(\d{4})-(\d{2})-(\d{2})/);
       this.year = match[1]; 
       this.month = match[2]; 
       this.day = match[3];
       console.log(`year: ${this.year}, month: ${this.month}, day: ${this.day}`)
    }
   
    establishDateInfo() {
       // Method to initialize the start date, split the date, and get the number of days in the selected month
       this.getStartDate();
       this.splitDate();
       this.daysInMonth = this.getDaysInMonth(this.year, this.month);
       console.log(`there are ${this.daysInMonth} days in the month of ${this.month}`);
    }
   
    getMonthsInYear() {
       // Method to generate an array of objects representing each month in the selected year
       let months = [];
       for (let i = 1; i <= 12; i++) {
           let monthStr = i < 10 ? `0${i}` : `${i}`;
           let dateString = `${this.year}-${monthStr}-01`;
           let day = this.getDayOfWeek(new Date(dateString));
           let daysInMonth = this.getDaysInMonth(this.year, i);
           months.push({dateString, day, daysInMonth, dateArray: []});
       }
       return months; 
    }
   
    getDatesInMonth() {
       // Method to populate the dateArray property of each month object with an array of date strings
       let months = this.getMonthsInYear();
       for (let i = 0; i < months.length; i++) {
           let dates = [];
           for (let day =1; day <= months[i].daysInMonth; day++) { 
           let monthStr = i < 10 ? `0${i}` : `${i}`;
           let dayStr = day < 10 ? `0${day}` : `${day}`;
           let dateString = `${this.year}-${monthStr}-${dayStr}`;
           dates.push(dateString);
           }
           months[i].dateArray = dates;
       }
       console.log(months);
    }
   
    getDaysInMonth(year, month) {
       // Method to calculate the number of days in a given month of a given year
       return new Date(year, month, 0).getDate();
    }
   
    getDayOfWeek(date) {
       // Method to get the day of the week for a given date
       return date.getDay(); 
    }
   
    getWeekInfo() {
       // Method to get the start and end dates of the week containing the selected date
       let dayOfWeek = this.getDayOfWeek(this.startDate);
       let weekStart = this.calculateWeekStart(dayOfWeek);
       let weekEnd = weekStart + 6;
   
       let list = this.generateDatesList(weekStart, weekEnd);
   
       console.log(list);
    }
   
    calculateWeekStart(dayOfWeek) {
       // Helper method to calculate the start of the week containing the selected date
       return this.day - dayOfWeek - 1;
    }
   
    generateDatesList(weekStart, weekEnd) {
       // Helper method to generate an array of date strings for the week containing the selected date
       let list = [];
       for (let i = weekStart; i <= weekEnd; i++) {
           let month = +this.month;
           let days = i;
           if (i > this.daysInMonth) {
               days -= this.daysInMonth;
               month++;
           }
           if (i < 1) {
               days += this.getDaysInMonth(this.year, this.month - 1);
               month--;
           }
           let day = days < 10 ? `0${days}` : `${days}`;
           let monthStr = month < 10 ? `0${month}` : `${month}`;
           let dateString = `${this.year}-${monthStr}-${day}`;
           list.push(dateString);
       }
       return list;
    }

    getNameOfDay() {
        // Method to get the name of the day of the week for a given date
        let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
        // Method to get the name of the day of the week for a given date
        let nameOfDay = daysOfWeek[+this.day];
        return nameOfDay;
   }

   getNameOfMonth() {
         // Method to get the name of the month for a given date
       let monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November","December"];
       // Method to get the name of the month for a given date
       let nameOfMonth = monthsOfYear[+this.month + -1];
       return nameOfMonth;
   }
   
}

export default DateRangeInfo;