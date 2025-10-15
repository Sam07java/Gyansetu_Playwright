exports.SignUpChat = 
class SignUpChat {
    constructor(page) {
        this.page = page;
        this.forTextField = '.form-control'
        this.dropdownButton = '.css-19bb58m'
        this.dropdownOptions = '[role="option"]'
        this.viewProfileButton = '.chatinput-body'
        this.skipElement = 'Skip'

    }
            
    async enter_the_details(data) {
        // const path = require("path");
        // try {
        console.log('Entering data on text field...');
        await this.page.locator(this.forTextField).fill(data);
        await this.page.locator(this.forTextField).press('Enter');
        console.log(`Data entered successfully: ${data}`);
        // } catch (error) {
        // console.error('❌ Failed to enter full name:', error);
        // // capture screenshot for debugging
        //  const screenshotPath = path.resolve(__dirname, "../screenshot", `error_enter_fullname_${Date.now()}.png`);
        // await this.page.screenshot({ path: screenshotPath });
        // }
    }


   async select_Expectedoption(expectedOption) {
      const path = require("path");
      try {
        // await this.page.locator(this.dropdownButton).waitFor({ state: 'visible', timeout: 10000 });
        console.log("Opening dropdown...");
        await this.page.locator(this.dropdownButton).click();
        await this.page.waitForTimeout(500);  // wait for options to load
        const alloptions = await this.page.$$(this.dropdownOptions);
        console.log(`Found ${alloptions.length} options in dropdown`);

        let optionFound = false;

        for (const option of alloptions) {
            const text = (await option.textContent()).trim().toLowerCase();
            console.log(`Checking option: "${text}"`);
            if (text === expectedOption.toLowerCase()) {
                console.log(`✅ Match found: "${text}" — clicking this option`);
                await option.click();
                optionFound = true;
                break;
            }
        }
            this.page.waitForTimeout(1000);

            if(!optionFound) {
            console.warn(`⚠️ Option "${expectedOption}" not found in dropdown`);
            }
        } catch (error) {
                console.error(`❌ Failed to select expected option "${expectedOption}":`, error);

                // Take screenshot if possible
            try {
                if (!this.page.isClosed()) {
                const screenshotPath = path.resolve(
                    __dirname,
                    "../screenshot",
                    `error_select_option_${expectedOption}_${Date.now()}.png`
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


        // } catch (error) {
        //     console.error(`❌ Failed to select expected option "${expectedOption}":`, error);
        //     //     const screenshotPath = path.resolve(__dirname, "../screenshot", `error_select_option_${Date.now()}.png`);
        //     // await this.page.screenshot({ path: screenshotPath });

        //     try {
        //             if (!this.page.isClosed()) {   // ✅ check before screenshot
        //             const path = require("path");
        //             const screenshotPath = path.resolve(__dirname, "../screenshot", `error_select_option_${Date.now()}.png`);
        //             await this.page.screenshot({ path: screenshotPath });
        //             console.log(`📸 Screenshot saved at: ${screenshotPath}`);
        //         } else {
        //             console.warn("⚠️ Page already closed, skipping screenshot");
        //         }
        // } catch (screenshotError) {
        // console.error("❌ Failed to capture screenshot:", screenshotError);
        // }
        // }
    }


    async upload_profile_pic(fileName) {
         const path = require("path");
    //  try {
        console.log(`Uploading profile picture: ${fileName}...`);

        // Resolve absolute path from relative path
        const filePath = path.resolve(__dirname, "../imageProPic", fileName);

        // Upload file
        await this.page.locator(this.forTextField).setInputFiles(filePath);
        console.log("✅ Profile picture uploaded successfully");

        // } catch (error) {
        // console.error(`❌ Failed to upload profile picture "${fileName}":`, error);

        // // Screenshot for debugging
        //     const screenshotPath = path.resolve(__dirname, "../screenshot", `error_upload_profile_${Date.now()}.png`);
        // await this.page.screenshot({ path: screenshotPath });
        // }
    }


    async selectYourMobileNumberCountryCode() {
         const path = require("path");
        // try {
            // Wait for flag dropdown and click
            const flagDropdown = this.page.locator('.selected-flag');
            await flagDropdown.waitFor({ state: 'visible', timeout: 10000 });
            await flagDropdown.click();
            console.log("Clicked on country flag dropdown");

            // Wait for India option and click
            const indiaOption = this.page.locator("//li[@data-flag-key='flag_no_0']");
            await indiaOption.waitFor({ state: 'visible', timeout: 10000 });
            await indiaOption.click();
            console.log("Selected India country code ✅");

        // } catch (error) {
        //     console.error("❌ Failed to select mobile number country code:", error);
        //     // If you have a screenshot utility, you can use:
        //          const screenshotPath = path.resolve(__dirname, "../screenshot", `error_select_mobile_country_${Date.now()}.png`);
       
        //     await this.page.screenshot({ path: screenshotPath });
        // }
    }

    async click_on_viewProfile() {
        await this.page.locator(this.viewProfileButton).click();
    }

    async click_on_skip() {
        await this.page.getByText(this.skipElement).click();
    }
        
}