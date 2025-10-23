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

      this.address1Element = 'input[name="address1"]'
      this.address2Element = 'input[name="address2"]'
      this.countryElement = 'select[name="rcrs-country"]'
      this.stateElement = 'select[name="rcrs-region"]'
      this.pinCodeElement = 'input[name="pincode"]'
      this.cityElement = 'input[name="city"]'
      this.districtElement = 'input[name="district"]'
      this.permenentAddressCheckboxElement = 'input[name="sameAsCurrent"]'

      this.hobbiesElement = '#demo-multiple-checkbox'
      this.KnownLanguagesElement = '#language-select-888'
      this.proficiencyElement = '#proficiency-select-888'

      this.acdemicHistoryElemet = '.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.css-1haoj0b'
      
      this.mobileNumberElement = 'input[name="phoneNum"]'
      this.whatsAppNumberElement = 'input[name="whatsappNum"]'
      this.emailIdElement = 'input[name="email"]'

      this.parentEmailElement = 'input[name="email"]'
      this.parentMobileElement = 'input[name="phone"]'

      this.classElement = '.MuiSelect-select.MuiSelect-outlined.Mui-disabled.MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled.MuiInputBase-inputSizeSmall.css-1haoj0b'
      this.subjectElement = '#mui-component-select-subject_id'
      this.teacherElement = '#mui-component-select-teacher_id'

      this.submitText = 'Submit'
      
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
        await this.page.locator(this.address1Element).first().fill(address1)
        console.log("Address1 entered:", address1);
    }

    async enter_Address2(address2){
        console.log("Entering Address2:", address2);
        await this.page.locator(this.address2Element).first().fill(address2)
        console.log("Address2 entered:", address2);
    }

    async select_Country(country){
        console.log("Selecting Country:", country);
        await this.page.locator(this.countryElement).first().selectOption(country);
        console.log("Country selected:", country);
    }

    async select_State(state){
        console.log("Selecting State:", state);
        await this.page.locator(this.stateElement).first().selectOption(state);
        console.log("State selected:", state);
    }

    async enter_PinCode(pinCode){
        console.log("Entering PinCode:", pinCode);
        await this.page.locator(this.pinCodeElement).first().fill(pinCode)
        console.log("PinCode entered:", pinCode);
    }

    async enter_City(city){
        console.log("Entering City:", city);
        await this.page.locator(this.cityElement).first().fill(city)
        console.log("City entered:", city);
    }

    async enter_District(district){
        console.log("Entering State:", district);
        await this.page.locator(this.districtElement).first().fill(district)
        console.log("State entered:", district);
    }

    async click_PermenmentAddressCheckbox(){
        console.log("Clicking Permenment Address Checkbox");
        await this.page.locator(this.permenentAddressCheckboxElement).check()
        console.log("Permenment Address Checkbox clicked");
    }

    async clickNextButton(){
        console.log("Clicking Next button");
        await this.page.getByRole('button', { name: this.NextButtonElement }).click()
        // await this.page.getByText(this.NextButtonElement).click()  }
        console.log("Next button clicked");
    }

    async getFirstNameValue() {
        const value = await this.page.locator(this.firstNameElement).getAttribute('value');
        console.log('First Name Value:', value);
        return value;
    }

    async getLastNameValue() {
        const value = await this.page.locator(this.lastNameElement).getAttribute('value');
        console.log('Last Name Value:', value);
        return value;
    }

    async getFatherNameValue() {
        const value = await this.page.locator(this.fatherNameElement).getAttribute('value');
        console.log('Father Name Value:', value);
        return value;
    }

    async getMotherNameValue() {
        const value = await this.page.locator(this.motherNameElement).getAttribute('value');
        console.log('Mother Name Value:', value);
        return value;
    }

    async getGuardianNameValue() {
        const value = await this.page.locator(this.guardianNameElement).getAttribute('value');
        console.log('Guardian Name Value:', value);
        return value;
    }

    async getAimValue() {
        const value = await this.page.locator(this.aimInputElement).getAttribute('value');
        console.log('Aim Value:', value);
        return value;
    }

    async address1Value() {
        const value = await this.page.locator(this.address1Element).first().getAttribute('value');
        console.log('Address 1 Value:', value);
        return value;
    }   

    async address2Value() {
        const value = await this.page.locator(this.address2Element).first().getAttribute('value');
        console.log('Address 2 Value:', value);
        return value;
    }

    async cityValue() {
        const value = await this.page.locator(this.cityElement).first().getAttribute('value');
        console.log('City Value:', value);
        return value;
    }

    async districtValue() {
        const value = await this.page.locator(this.districtElement).first().getAttribute('value');
        console.log('District Value:', value);
        return value;
    }

    async pinCodeValue() {
        const value = await this.page.locator(this.pinCodeElement).first().getAttribute('value');
        console.log('Pin Code Value:', value);
        return value;
    }

    async getSelectedCountry() {
        const value = await this.page.locator(this.countryElement).first().inputValue();
        console.log('Selected Country Value:', value);
        return value;
    }

    async getSelectedState() {
        const value = await this.page.locator(this.stateElement).first().inputValue();
        console.log('Selected State Value:', value);
        return value;
    }   

    async getSelectedHobbies() {
        const selectedOptions = await this.page.locator(this.hobbiesElement).textContent();
        console.log('Selected Hobbies:', selectedOptions);
        return selectedOptions;
    }

    async getSelectedKnownLanguages() {
        const selectedOptions = await this.page.locator(this.KnownLanguagesElement).textContent();
        console.log('Selected Languages:', selectedOptions);
        return selectedOptions;
    }

    async getSelectedProficiency() { 
        const selectedOptions = await this.page.locator(this.proficiencyElement).textContent();
        console.log('Selected Proficiency:', selectedOptions);
        return selectedOptions;
    }

    async getinstituteType() { 
        const selectedOptions = await this.page.locator(this.acdemicHistoryElemet).nth(0).textContent();
        console.log('Selected Institute Type:', selectedOptions);
        return selectedOptions;
    }

    async getinstituteName() { 
        const selectedOptions = await this.page.locator(this.acdemicHistoryElemet).nth(1).textContent();
        console.log('Selected Institute Name:', selectedOptions);
        return selectedOptions;
    }

    async getBoardType() { 
        const selectedOptions = await this.page.locator(this.acdemicHistoryElemet).nth(2).textContent();
        console.log('Selected Board Type:', selectedOptions);
        return selectedOptions;
    }

    async getClassValue() { 
        const selectedOptions = await this.page.locator(this.acdemicHistoryElemet).nth(3).textContent();
        console.log('Selected Class Value:', selectedOptions);
        return selectedOptions;
    }

    async getMobileNumberValue() {
        const value = await this.page.locator(this.mobileNumberElement).getAttribute('value');
        console.log('Mobile Number Value:', value);
        return value;
    }

    async getWhatsAppNumberValue() {
        const value = await this.page.locator(this.whatsAppNumberElement).getAttribute('value');
        console.log('WhatsApp Number Value:', value);
        return value;
    }

    async getEmailIdValue() {
        const value = await this.page.locator(this.emailIdElement).getAttribute('value');
        console.log('Email ID Value:', value);
        return value;
    }

    async getParentEmailValue(){
        const value = await this.page.locator(this.parentEmailElement).getAttribute('value')
        console.log('Parent Email ID '+ value)
        return value
    }

    async getParentPhoneNumberValue(){
        const value = await this.page.locator(this.parentMobileElement).getAttribute('value')
        console.log('Parent Mobile Number: '+value)
        return value
    }

    async getClassValue1(){
        const value = await this.page.locator(this.classElement).textContent()
        console.log('Class value '+ value)
        return value
    }

    async getSubjectValue(){
        const value = await this.page.locator(this.subjectElement).textContent()
        console.log('subject value: '+ value)
        return value
    }

    async getTeacherValue(){
        const value = await this.page.locator(this.teacherElement).textContent()
        console.log*('Teacher value: '+ value)
        return value
    }

    async clickSubmitButton(){
        console.log('Clicking on asubmit button')
        this.page.getByText(this.submitText).click()
    }

}