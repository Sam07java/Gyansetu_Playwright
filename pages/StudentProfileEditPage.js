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
      this.submitButtonElement = 'button[type="submit"]'
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

}