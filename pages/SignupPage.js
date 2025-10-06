exports.SignupPAge = class SignupPAge {
    constructor(page){
        this.page = page;
        this.emailElement = 'Enter your email';
        this.phoneNoElement = 'Enter phone number';
        this.passwordElement = 'Enter your password'
        this.checkboxElement = '#flexCheckDefault'
        this.Sign_Up_Now_ButtonElement = 'Sign Up Now'
    }

    async signUp(email, password, phoneNo){
        await this.page.getByPlaceholder(this.emailElement).fill(email)
        await this.page.getByPlaceholder(this.phoneNoElement).fill(phoneNo)
        await this.page.getByPlaceholder(this.passwordElement).fill(password)
        await this.page.locator(this.checkboxElement).check()
        await this.page.getByText(this.Sign_Up_Now_ButtonElement).click();
    }
}