exports.StudentProfileEditPage = 
class StudentProfileEditPage {
    constructor(page) {
      this.page = page;
      this.firstNameElement = 'input[name="first_name"]'
      this.lastNameElement = 'input[name="last_name"]'
      this.fatherNameElement = 'input[name="father_name"]'
      this.motherNameElement = 'input[name="mother_name"]'
      this.guardianNameElement = 'input[name="guardian_name"]'
      this.aimInputElement = 'input[name="aim"]'
      this.propicElement = 'input[name="pic_path"]'
      this.NextButtonElement = 'Next'
    }

    async enterFirstName(firstName){
        console.log("Entering first name:", firstName);
        await this.page.locator(this.firstNameElement).fill(firstName)
    }

    async enterLastName(lastName){
        console.log("Entering last name:", lastName);
        await this.page.locator(this.lastNameElement).fill(lastName)
    }   

    async enterFatherName(fatherName){
        console.log("Entering father name:", fatherName);
        await this.page.locator(this.fatherNameElement).fill(fatherName)
    }

    async enterMotherName(motherName){
        console.log("Entering mother name:", motherName);
        await this.page.locator(this.motherNameElement).fill(motherName)
    } 

    async enterGuardianName(guardianName){
        console.log("Entering guardian name:", guardianName);
        await this.page.locator(this.guardianNameElement).fill(guardianName)
    }

    async enterAim(aim){
        console.log("Entering aim:", aim);
        await this.page.locator(this.aimInputElement).fill(aim)
    }

    async selectGender(gender){
        console.log("Selecting gender:", gender);
        // const gen =this.page.getByRole('button', { value: 'male' })
        if(gender.toLowerCase() === 'male'){
            console.log("Gender already selected:", gender);
        }else{ 
            await this.page.locator("input[value='female']").check()
            // await this.page.getByRole('radio', { value: 'female' }).check()
            console.log("Gender selected:", gender);    
        }
    }

    async uploadProfilePicture(fileName) {
        console.log(`Uploading profile picture from: ${fileName}....`);
        const path = require("path");
        const filePath = path.resolve(__dirname, "../imageProPic",fileName);
        console.log("Resolved file path:", filePath);
        const file = await this.page.locator(this.propicElement);
        await file.setInputFiles(filePath);
        console.log("Profile picture uploaded.");
    }

    async enter_Address1(address1){
        console.log("Entering Address1:", address1);
        await this.page.locator('input[name="address1"]').first().fill(address1)
        console.log("Address1 entered:", address1);
    }

    async enter_Address2(address2){
        console.log("Entering Address2:", address2);
        await this.page.locator('input[name="address2"]').first().fill(address2)
        console.log("Address2 entered:", address2);
    }

    async select_Country(country){
        console.log("Selecting Country:", country);
        await this.page.locator('select[name="rcrs-country"]').first().selectOption(country);
        console.log("Country selected:", country);
    }

    async select_State(state){
        console.log("Selecting State:", state);
        await this.page.locator('select[name="rcrs-region"]').first().selectOption(state);
        console.log("State selected:", state);
    }

    async enter_PinCode(pinCode){
        console.log("Entering PinCode:", pinCode);
        await this.page.locator('input[name="pincode"]').first().fill(pinCode)
        console.log("PinCode entered:", pinCode);
    }

    async enter_City(city){
        console.log("Entering City:", city);
        await this.page.locator('input[name="city"]').first().fill(city)
        console.log("City entered:", city);
    }

    async enter_District(district){
        console.log("Entering State:", district);
        await this.page.locator('input[name="district"]').first().fill(district)
        console.log("State entered:", district);
    }

    async click_PermenmentAddressCheckbox(){
        console.log("Clicking Permenment Address Checkbox");
        await this.page.locator('input[name="sameAsCurrent"]').check()
        console.log("Permenment Address Checkbox clicked");
    }

    async clickNextButton(){
        console.log("Clicking Next button");
        await this.page.getByRole('button', { name: this.NextButtonElement }).click()
        // await this.page.getByText(this.NextButtonElement).click()  }
        console.log("Next button clicked");
    }
}