// datePickerHelper.js
import { CalendarUtils } from "./calendarUtils";

export class DatePickerHelper {
  constructor(page) {
    this.page = page;
  }

  async selectDate(date, month, year) {

    console.log("Opening date picker...");
    await this.page.getByRole("button", { name: "Choose date" }).click();

    // Switch to year view
    await this.page.locator('[aria-label="calendar view is open, switch to year view"]').click();
    console.log("Switched to year view");

    // Select year
    const yearButtons = this.page.locator('//div[@class="MuiPickersYear-root css-j9zntq"]//button');
    const count = await yearButtons.count();
    let yearFound = false;
    for (let i = 0; i < count; i++) {
      const yearText = (await yearButtons.nth(i).textContent()).trim();
      if (yearText === year) {
        await yearButtons.nth(i).click();
        yearFound = true;
        console.log(`Year ${year} selected`);
        break;
      }
    }
    if (!yearFound) {
      console.warn(`Year ${year} not found`);
      return;
    }

    // Compare current and target month/year
    const targetMonthNum = CalendarUtils.convertMonth(month);
    const targetYearNum = parseInt(year);

    while (true) {
      const displayed = await this.page.locator('//div[@class="MuiPickersCalendarHeader-label css-1v994a0"]').textContent();
      const [currentMonthStr, currentYearStr] = displayed.trim().split(" ");
      const currentMonthNum = CalendarUtils.convertMonth(currentMonthStr);
      const currentYearNum = parseInt(currentYearStr);

      if (currentMonthNum === targetMonthNum && currentYearNum === targetYearNum) {
        console.log(`Target month/year visible: ${currentMonthStr} ${currentYearNum}`);
        break;
      }

      if (currentYearNum > targetYearNum || (currentYearNum === targetYearNum && currentMonthNum > targetMonthNum)) {
        await this.page.locator('//button[@aria-label="Previous month"]').click();
        console.log("Clicked previous month");
      } else {
        await this.page.locator('//button[@aria-label="Next month"]').click();
        console.log("Clicked next month");
      }
    }

    // Select the date
    const dates = this.page.locator('//button[contains(@class,"MuiPickersDay-root")]');
    const totalDates = await dates.count();
    for (let i = 0; i < totalDates; i++) {
      const dayText = (await dates.nth(i).textContent()).trim();
      if (dayText === date) {
        await dates.nth(i).click();
        console.log(`Date ${date} selected`);
        break;
      }
    }

    // Submit
    await this.page.locator('//button[@class="chat_search_btn"]').click();
    console.log("Submit button clicked after date selection");
  }
}
