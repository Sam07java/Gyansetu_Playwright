import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { SignupPAge } from '../pages/SignupPage'
import { login_Data, Signup_chat_input } from '../testData/loginData.json'
import { SignUpChat } from '../pages/signup-chat_Page'
import { DatePickerHelper } from '../utility/datePickerHelper'
import { StudentDashboard } from '../pages/StudentDashboard'
require('dotenv').config()
import { StudentProfileEditPage } from '../pages/studentProfileEditPage' 
// test.use({
//   viewport: null,
//   deviceScaleFactor: undefined,
//   launchOptions: {
//     args: ['--start-maximized']
//   }
// })


test.beforeEach(async ({page})=>{
    // const context = await browser.newContext();
  // page = await context.newPage();

  const login = new LoginPage(page)
  await login.gotoURL()

  const homepage = new HomePage(page)
  await homepage.clickOnSign_In_Emailand_Phone()
})

test.afterEach(async ({page})=>{
 await page.waitForTimeout(3000)
    const Studentdashboard = new StudentDashboard(page)
      await Studentdashboard.clickon_Logout()
})

test.skip('Login for admin',async ({page})=>{

  const login = new LoginPage(page)

  await login.login(process.env.USER_NAME_ADMIN, process.env.PASSWOR_ADMIN)
  

   let sidebar = page.locator('.metismenu');
   await sidebar.hover()

   await sidebar.getByText('Master Management').click()
   await sidebar.getByText('Institution Management').click()
   await sidebar.getByText('Institute').click()

      // const Studentdashboard = new StudentDashboard(page)
      // await Studentdashboard.close_signupChat_ifPresent()
      // await Studentdashboard.clickon_Logout()
   
    await page.pause()
})

test.skip('Login for student', async ({page})=>{
  const login = new LoginPage(page)
    await login.login(login_Data.studentUserName, login_Data.student_password)
    //  "vidyavijay049@yopmail.com",
    // await page.waitForTimeout(3000)
    // const Studentdashboard = new StudentDashboard(page)
    //   await Studentdashboard.clickon_Logout()
  })

test.only('SignUp for student', async ({page})=>{
    
    const homepage = new HomePage(page)
    const signuppage = new SignupPAge(page)
    const Studentdashboard = new StudentDashboard(page)

    await homepage.click_signUp_button()
    
    await signuppage.signUp( login_Data.studentUserName , login_Data.student_password, login_Data.student_phoneNumber)

    const toaster = page.locator("//div[@class='Toastify__toast-body']/div[2]")
    const toast = await toaster.textContent()

    console.log('toaster alert:'+ toast);

    switch (toast?.trim()) {
      case 'User with this email already exist':
      expect(toast).toContain('email')
      console.log(toast);
      break

      case 'User with this phone number already exist':
      expect(toast).toContain('phone number')
      console.log(toast);
      break

      case 'User created successfully':
      expect(toast).toBe('User created successfully')
      console.log(toast);
      page.pause()
      // page.waitForTimeout(3000)
        await Studentdashboard.close_Signup_chat()
      //   await Studentdashboard.close_signupChat_ifPresent()
        // await Studentdashboard.clickon_Logout()
      break

      default:throw new Error(`Unexpected toaster message: ${toast}`)
    }
    
})


test.only('Login for New student sign-up Chat', async ({page})=>{

  const login = new LoginPage(page)
    await login.login(login_Data.studentUserName, login_Data.student_password)
    await page.waitForTimeout(3000)
  
  const sigupChat = new SignUpChat(page)
  const studentdashboard = new StudentDashboard(page)
    //FullName
    await sigupChat.enter_the_details(Signup_chat_input.firstName +' '+Signup_chat_input.lastName)

    //dob
    const dateSelect = new DatePickerHelper(page)
    await  dateSelect.selectDate('20', 'June', '2000')

    //Aim
    await sigupChat.enter_the_details(Signup_chat_input.Aim)
    
    //Gender
    await sigupChat.select_Expectedoption(Signup_chat_input.Gender)
    
    //Mother Name
    await sigupChat.enter_the_details(Signup_chat_input.motherName)

    //Father Name
    await sigupChat.enter_the_details(Signup_chat_input.fatherName)

    //Guardian Name
    await sigupChat.enter_the_details(Signup_chat_input.guardianName)
    // await sigupChat.enter_the_details('Susheel')
    
    // Pro Pic upload
    // await page.setDefaultTimeout(3000);
    await sigupChat.upload_profile_pic("uytr.jpg")

    //Entity
    await sigupChat.select_Expectedoption(Signup_chat_input.instituteType)

    //Select School
    await sigupChat.select_Expectedoption(Signup_chat_input.instituteName)
    // await page.waitForTimeout(1000)
    //Board
    await sigupChat.select_Expectedoption('CBSE')
    // await page.waitForTimeout(1000)
    //Class
    await sigupChat.select_Expectedoption(Signup_chat_input.class)
    // await page.waitForTimeout(1000)

    //Hobbies
    // await sigupChat.click_on_skip()
    await sigupChat.select_Expectedoption(Signup_chat_input.hobbies)
    // await page.waitForTimeout(2000)

    //Language
    await sigupChat.select_Expectedoption(Signup_chat_input.languages)
    // await page.waitForTimeout(1000)

    //Langiage Proficiency
    await sigupChat.select_Expectedoption(Signup_chat_input.proficiency)

    //mobile country code  
    await sigupChat.selectYourMobileNumberCountryCode()

    //Whatzp Number
    await sigupChat.enter_the_details(Signup_chat_input.whatzup_Number)

    //Select Subject
    await sigupChat.select_Expectedoption(Signup_chat_input.subject)

    //Select Teacher
    await sigupChat.select_Expectedoption(Signup_chat_input.teacher)

    // Parent Email Address
    await sigupChat.enter_the_details(login_Data.parent_username)

    // Parent Phone Number
    await sigupChat.enter_the_details(login_Data.parent_phoneNumber)

    // Country
    // await page.pause()
    await sigupChat.select_Expectedoption(Signup_chat_input.country)
    // await page.pause()

    // Stategit
    await sigupChat.select_Expectedoption(Signup_chat_input.state)
    // await page.pause()

    // District
    await sigupChat.enter_the_details(Signup_chat_input.district)

    // City
    await sigupChat.enter_the_details(Signup_chat_input.city)

    // Pincode
    await sigupChat.enter_the_details(Signup_chat_input.pincode)

    // First Address
    await sigupChat.enter_the_details(Signup_chat_input.address1)

    // Second Address
    await sigupChat.enter_the_details(Signup_chat_input.address2)

    //click on view profile
    await page.pause()
    await sigupChat.click_on_viewProfile()
    await page.waitForTimeout(1000)

    
    // //logout after signup chat
    // await Studentdashboard.clickon_Logout()

})

test.only('validation of signup chat inputs with data of profile edit page', async ({page})=>{
  const login = new LoginPage(page)
    await login.login(login_Data.studentUserName, login_Data.student_password)
    await page.waitForTimeout(2000)

  const studentdashboard = new StudentDashboard(page)
   // await studentdashboard.close_signupChat_ifPresent()
    await studentdashboard.clickon_Profile()

  const profileEdit = new StudentProfileEditPage(page)
   await page.waitForTimeout(2000)
    //Validating First Name
    const firstNameValue = await profileEdit.getFirstNameValue()
    console.log('First Name from Profile Edit Page: '+ firstNameValue);
    await expect(firstNameValue).toBe(Signup_chat_input.firstName);

    //Validating Last Name
    const lastNameValue = await profileEdit.getLastNameValue()
    console.log('Last Name from Profile Edit Page: '+ lastNameValue);
    await expect(lastNameValue).toBe(Signup_chat_input.lastName);

    //Father Name
    const fatherNameValue = await profileEdit.getFatherNameValue()
    console.log('Father Name from Profile Edit Page: '+ fatherNameValue);
    await expect(fatherNameValue).toBe(Signup_chat_input.fatherName);

    //Mother Name
    const motherNameValue = await profileEdit.getMotherNameValue()
    console.log('Mother Name from Profile Edit Page: '+ motherNameValue);
    await expect(motherNameValue).toBe('Anvi J');

    //Guardian Name
    const guardianNameValue = await profileEdit.getGuardianNameValue()
    console.log('Guardian Name from Profile Edit Page: '+ guardianNameValue);
    await expect(guardianNameValue).toBe('Afsal P');

    //Aim
    const aimValue = await profileEdit.getAimValue()
    console.log('Aim from Profile Edit Page: '+ aimValue);
    await expect(aimValue).toBe('Sasas');



    await profileEdit.clickNextButton();
    await page.waitForTimeout(3000)

    // address page validations
    //Address1
    const address1Value = await profileEdit.address1Value()
    console.log('Address1 from Profile Edit Page: '+ address1Value);
    await expect(address1Value).toBe('fsd');

    // Address2
    const address2Value = await profileEdit.address2Value()
    console.log('Address2 from Profile Edit Page: '+ address2Value);
    await expect(address2Value).toBe('fsdfd');

    // City
    const cityValue =  await profileEdit.cityValue()
    console.log('City from Profile Edit Page: '+ cityValue);
    await expect(cityValue).toBe('Alapy');

    // District
    const districtValue = await profileEdit.districtValue()
    console.log('District from Profile Edit Page: '+ districtValue);
    await expect(districtValue).toBe('Alappuzha');

    // Pincode
    const pincodeValue = await profileEdit.pinCodeValue()
    console.log('Pincode from Profile Edit Page: '+ pincodeValue);
    await expect(pincodeValue).toBe('877712');

    // Country
    const countryValue = await profileEdit.getSelectedCountry()
    console.log('Country from Profile Edit Page: '+ countryValue);
    await expect(countryValue).toBe('India');

    // State
    const stateValue = await profileEdit.getSelectedState()
    console.log('State from Profile Edit Page: '+ stateValue);
    await expect(stateValue).toBe('Kerala');


    await profileEdit.clickNextButton();
    await page.waitForTimeout(2000)


    // Hobbies and Language Page validations
    const hobbiesValue = await profileEdit.getSelectedHobbies()
    console.log('Hobbies from Profile Edit Page: '+ hobbiesValue);
    await expect(hobbiesValue).toBe('Writing');

    const knownLanguagesValue = await profileEdit.getSelectedKnownLanguages()
    console.log('Known Languages from Profile Edit Page: '+ knownLanguagesValue);
    await expect(knownLanguagesValue).toBe('Hindi');

    const proficiencyValue = await profileEdit.getSelectedProficiency()
    console.log('Proficiency from Profile Edit Page: '+ proficiencyValue);
    await expect(proficiencyValue).toBe('Both');

    await profileEdit.clickNextButton();
    await page.waitForTimeout(3000)

    // Academic History Page
    const instituteTypeValue = await profileEdit.getinstituteType()
    console.log('Institute Type from Profile Edit Page: '+ instituteTypeValue);
    await expect(instituteTypeValue).toBe('School');

    // Institute Name
    const instituteNameValue = await profileEdit.getinstituteName()
    console.log('Institute Name from Profile Edit Page: '+ instituteNameValue);
    await expect(instituteNameValue).toBe('Manimal HSS');

    // Board
    const boardValue = await profileEdit.getBoardType()
    console.log('Board from Profile Edit Page: '+ boardValue);
    await expect(boardValue).toBe('CBSE');

    // Class
    const classValue = await profileEdit.getClassValue()
    console.log('Class from Profile Edit Page: '+ classValue);
    await expect(classValue).toBe('class 10');


    await profileEdit.clickNextButton();
    await page.waitForTimeout(2000)

    // Contact Details Page validations
    const mobileNumberValue = await profileEdit.getMobileNumberValue()
    console.log('Mobile Number from Profile Edit Page: '+ mobileNumberValue);
    await expect(mobileNumberValue).toBe(login_Data.student_phoneNumber);

    const whatsAppNumberValue = await profileEdit.getWhatsAppNumberValue()
    console.log('WhatsApp Number from Profile Edit Page: '+ whatsAppNumberValue);
    await expect(whatsAppNumberValue).toBe('9988812345');

    const emailIdValue = await profileEdit.getEmailIdValue()
    console.log('Email ID from Profile Edit Page: '+ emailIdValue);
    await expect(emailIdValue).toBe(login_Data.studentUserName);  

    await profileEdit.clickNextButton();
    await page.waitForTimeout(2000)


    // Parent Email and Phone Number verification
      
    const parentEmailIDValue = await profileEdit.getParentEmailValue()
    console.log('Parent email id value: '+ parentEmailIDValue)
    await expect.soft(parentEmailIDValue).toBe(login_Data.parent_username)

    const parentphoneNumberValue = await profileEdit.getParentPhoneNumberValue()
    console.log('Parent phone number: '+ parentphoneNumberValue)
    await expect.soft(parentphoneNumberValue).toBe(login_Data.parent_phoneNumber)


    await profileEdit.clickNextButton();
    await page.waitForTimeout(2000)


    const classValues = await profileEdit.getClassValue1()
    console.log('class value: '+ classValue)
    await expect.soft(classValues).toBe('class_10')

    const subjectValue = await profileEdit.getSubjectValue()
    console.log('Get subject value: '+ subjectValue)
    await expect.soft(subjectValue).toBe('Mathematics')

    const teacherValue = await profileEdit.getTeacherValue()
    console.log('Teacher name selected by student :'+ teacherValue)
    await expect(teacherValue).toBe('Sharu abu')

    await profileEdit.clickSubmitButton()

    // //Logout
    // await page.waitForTimeout(3000)
    // const Studentdashboard = new StudentDashboard(page)
    // await Studentdashboard.clickon_Logout()
})

test.skip('Login for student enter the deatils on profile edit page', async ({page})=>{
  const login = new LoginPage(page)
    await login.login(login_Data.studentUserName, login_Data.student_password)
    await page.waitForTimeout(3000)

    const Studentdashboard = new StudentDashboard(page)
    await Studentdashboard.close_signupChat_ifPresent()

    await Studentdashboard.clickon_Profile()

    const profileEdit = new StudentProfileEditPage(page)
    
    // First Page
    //Enter First name
    await profileEdit.enterFirstName('Sameer')
    //Enter Last name
    await profileEdit.enterLastName('Salim')
    //DOB
    const dateSelect = new DatePickerHelper(page)
    await  dateSelect.selectDate('20', 'June', '2000', { clickSubmit: false })
    // Gender
    await profileEdit.selectGender('Female')
    //Father Name
    await profileEdit.enterFatherName('Arun BB')
    //Mother Name
    await profileEdit.enterMotherName('Anvi J')
    //Guardian Name
    await profileEdit.enterGuardianName('Afsal P')
    //Aim
    await profileEdit.enterAim('Sasas')
    //Profile Pic upload
    await profileEdit.uploadProfilePicture("uytr.jpg")
    // Cliclk on Next button
    await profileEdit.clickNextButton()


    // Address Page
    await profileEdit.enter_Address1('fsd')
    await profileEdit.enter_Address2('fsdfd')
    await profileEdit.select_Country('India')
    await profileEdit.select_State('Kerala')
    await profileEdit.enter_City('Alapy')
    await profileEdit.enter_District('Alappuzha')
    await profileEdit.enter_PinCode('877712')
    await profileEdit.click_PermenmentAddressCheckbox()
    await profileEdit.clickNextButton()

    //Hobbies and Language Page
    
    await page.pause()

    // await Studentdashboard.clickon_Logout()
})
 