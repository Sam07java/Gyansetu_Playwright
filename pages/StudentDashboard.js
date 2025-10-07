exports.StudentDashboard = class StudentDashboard {
    constructor(page) {
        this.page = page;
        this.signupChatCloseButton = 'button[aria-label="close"]'
        this.chatCloseConformButton = 'Ok'
    }

    async close_signupChat_ifPresent() {
        const path = require("path");   
        try {
            console.log("Checking for signup chat popup...");
            const isChatVisible = await this.page.locator(this.signupChatCloseButton).isVisible({ timeout: 5000 });
            if (isChatVisible) {
                console.log("Signup chat popup is visible. Closing it...");
                await this.page.locator(this.signupChatCloseButton).click();
                await this.page.waitForTimeout(500);
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
}