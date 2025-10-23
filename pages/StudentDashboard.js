exports.StudentDashboard = class StudentDashboard {
    constructor(page) {
        this.page = page;
        this.signupchatBox = '.profilechatinner'
        this.signupChatCloseButton = 'button[aria-label="close"]'
        this.chatCloseConformButton = 'Ok'
        this.userProfileIcon = 'img.rounded-circle[width="45"][height="45"]'
        this.logoutButton = "button[data-testid='logout-btn']"
    }

    async close_signupChat_ifPresent() {
        const path = require("path");   
        this.page.waitForTimeout(2000); // wait for potential popup to appear
        try {
            console.log("Checking for signup chat popup...");
            const isChatVisible = await this.page.locator(this.signupchatBox);
            // isVisible({ timeout: 2000 });
            if (isChatVisible) {
                console.log("Signup chat popup is visible. Closing it...");
                await this.page.locator(this.signupChatCloseButton).click();
                await this.page.getByText(this.chatCloseConformButton).click();
                console.log("Signup chat popup closed.");
            } else {
                console.log("Signup chat popup is not visible. Continuing...");
            } 
        } catch (error) {
            console.error("Error while handling signup chat popup:", error);
            // Take screenshot if possible
            try {
                if (!this.page.isClosed()) {    
                const screenshotPath = path.resolve(
                    __dirname,
                    "../screenshot",
                    `error_signup_chat_${Date.now()}.png`
                );
                await this.page.screenshot({ path: screenshotPath });
                console.log(`📸 Screenshot saved at: ${screenshotPath}`);
            } else {
                console.warn("⚠️ Page already closed, skipping screenshot");
            }   
            } catch (screenshotError) {
                console.error("❌ Failed to capture screenshot:", screenshotError);
            }
        }
    }

    async clickon_Profile(){
        console.log("Clicking on user profile icon...");
        await this.page.locator(this.userProfileIcon).click()
        console.log("Clicking on Profile link...");
        await this.page.getByText(' Profile').first().click()
    }

    async close_Signup_chat(){
        console.log('closing signup chat window')
        await this.page.getByText(this.signupChatCloseButton).click()
        await this.page.getByText(this.chatCloseConformButton).click()
    }

    async clickon_Logout(){
        console.log("Clicking on user profile icon for logout...");
        // await this.page.locator(this.userProfileIcon).click()
            await this.page.click(this.userProfileIcon);
        // await this.page.locator('img[src^="https://qauploads-new.s3.amazonaws.com/uploads/cf6477a7-c654-4491-8b9a-f4905f173282_uytr.jpg').click();
        // await this.page.getByRole('listitem').filter({ hasText: 'Hello, Sameer Profile' }).getByRole('link').click();
        console.log("Clicking on Logout link...");
        await this.page.waitForTimeout(500);
        // await this.page.getByText('Logout').click()
        await this.page.locator(this.logoutButton).click()
        console.log("Clicked on Logout link.");
    }

    
}