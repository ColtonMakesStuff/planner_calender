//the purpose for this class it to be able to take in a string representation of a date and output the info needed to create the calender in a string format
// the reason for this is to normalize the data so that it can be used in the calender component and can be used with the database to get the events for the calender
// it is important to note that for our purposes sunday is the first day of the week and the week starts on sunday and ends on saturday

class DateRangeInfo {
  constructor({selectedDate, range}) {
    this.selectedDate = selectedDate;
    this.range = range;
    this.startDate = null
    this.daysInMonth = null
    this.day = null
    this.month = null
    this.year = null
  }
    getStartDate() {
         this.startDate = new Date(this.selectedDate);
    } 
    splitDate() {
        let match = this.selectedDate.match(/(\d{4})-(\d{2})-(\d{2})/);
        this.year = match[1]; 
        this.month = match[2]; 
        this.day = match[3];
        console.log(`year: ${this.year}, month: ${this.month}, day: ${this.day}`)
    }
    establishDateInfo() {
        this.getStartDate();
        this.splitDate();
        this.daysInMonth = this.getDaysInMonth(this.year, this.month);
        console.log(`there are ${this.daysInMonth} days in the month of ${this.month}`);
    }
    // this is the info i need for making the calender output properly
    getMonthsInYear() {
        // i need to return the start dates of each month as a string 
        // i need to return the number of days in each month
        // i need to return the day of the week the first day of the month lands on
        let months = [];
        for (let i = 1; i <= 12; i++) {
            let monthStr = i < 10 ? `0${i}` : `${i}`;
            let dateString = `${this.year}-${monthStr}-01`;
            let day = this.getDayOfWeek(new Date(dateString));
            let daysInMonth = this.getDaysInMonth(this.year, i);
            months.push({dateString, day, daysInMonth, dateArray: []});
        }
        
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
        return new Date(year, month, 0).getDate();
    }
    getDayOfWeek(date) {
        return date.getDay(); 
    }
    // this is basically for when someone is on the month level of the calender and they select a certain day 
    // i need the info for the week that day is in
    // this will be used to create the week level of the calender
    getWeekInfo() {
        let dayOfWeek = this.getDayOfWeek(this.startDate);
        console.log(dayOfWeek);
        let weekStart = this.day - dayOfWeek - 1;
        let weekEnd = weekStart + 6;
        console.log(` *** weekStart: ${weekStart}, weekEnd: ${weekEnd}`);
        let list = [];
        for (let i = weekStart; i <= weekEnd; i++) {
            let month = +this.month ;
            let days = i;
            //handles days that fall after end of selected month
            if (i > this.daysInMonth) {
                days -= this.daysInMonth;
                month++;
            }
            // handles days that fall before start of selected month
            if (i < 1) {
                days += this.getDaysInMonth(this.year, this.month - 1);
                month--;
            }
            let day = days < 10 ? `0${days}` : `${days}`;
            let monthStr = month < 10  ? `0${month}` : `${month}`;
            let dateString = `${this.year}-${monthStr}-${day}`;
            list.push(dateString);
        }
        console.log(list);
}
}

let daysOfWeekForTesting = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];

let testDate = new DateRangeInfo({selectedDate: "2024-10-30", range: 7});
testDate.establishDateInfo();
testDate.getWeekInfo();


let testDate2 = new DateRangeInfo({selectedDate: "2024-02-02", range: 7});
testDate2.establishDateInfo();
testDate2.getWeekInfo();



// console.log(`the day of the week is ${daysOfWeekForTesting[testDate.getDayOfWeek(testDate.startDate)]}`);
// // testDate.getMonthsInYear();

