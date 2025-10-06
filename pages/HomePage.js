exports.HomePage = class HomePage {
    constructor(page){
        this.page = page;
        this.loginLinkElement = 'div[data-testid*="btn-sign"]';
        // this.SignupelemtButton = "'link', { name: 'Sign up here' }";
         this.SignupelemtButton = 'Sign up here';

    }

    async clickOnSign_In_Emailand_Phone(){
        await this.page.locator(this.loginLinkElement).click()
    }

    async click_signUp_button(){
        await this.page.getByText(this.SignupelemtButton).click()
    }
}