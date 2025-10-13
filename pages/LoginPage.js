exports.LoginPage =
class LoginPage {
    constructor(page) {
      this.page = page;
      this.loginLinkElement = 'div[data-testid*="btn-sign"]';
      this.usernameElement = 'email'
      this.passwordElement = 'Password'
      this.loginButtonElement = 'submitBtn'  
    }

    async clickOnSign_In_Emailand_Phone(){
        await this.page.locator(this.loginLinkElement).click()
    }

    async gotoURL(){

      // test.use({
      //   viewport: null,
      //   launchOptions: { args: ['--start-maximized'] },
      // })
        // await this.page.setViewportSize({ width: 1920, height: 1080 });
        await this.page.goto(process.env.URL)
    }

    async login(username, password){
      //  await this.page.getByTestId(this.loginButtonElement).click()
        // await this.page.locator(this.loginLinkElement).click()
        await this.page.getByTestId(this.usernameElement).fill(username)
        await this.page.getByTestId(this.passwordElement).fill(password)
        await this.page.getByTestId(this.loginButtonElement).click()
    }
}