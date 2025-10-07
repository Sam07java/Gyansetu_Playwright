import {test, expect} from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { SignupPAge } from '../pages/SignupPage'
import { login_Data } from '../testData/loginData.json'
import { SignUpChat } from '../pages/signup-chat_Page'
import { DatePickerHelper } from '../utility/datePickerHelper'


test.beforeEach(async ({page})=>{
    // const context = await browser.newContext();
  // page = await context.newPage();

  const login = new LoginPage(page)
  await login.gotoURL()

  const homepage = new HomePage(page)
  await homepage.clickOnSign_In_Emailand_Phone()
})

test.skip('Login',async ({page})=>{

  const login = new LoginPage(page)

  await login.login(process.env.USER_NAME_ADMIN, process.env.PASSWOR_ADMIN)

   let sidebar = page.locator('.metismenu');
   await sidebar.hover()

   await sidebar.getByText('Master Management').click()
   await sidebar.getByText('Institution Management').click()
   await sidebar.getByText('Institute').click()
   
     await page.pause()
})

test('SignUp for student', async ({page})=>{
    
    const homepage = new HomePage(page)
    const signuppage = new SignupPAge(page)

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
      await page.pause();
      break

      default:throw new Error(`Unexpected toaster message: ${toast}`)
    }
    
})

test.skip('Login for New student sign-up Chat', async ({page})=>{

  const login = new LoginPage(page)
    await login.login(login_Data.studentUserName, login_Data.student_password)
    await page.waitForTimeout(3000)
  
  const sigupChat = new SignUpChat(page)
    //FullName
    await sigupChat.enter_the_details('Sameer Salim')

    //dob
    const dateSelect = new DatePickerHelper(page)
    await  dateSelect.selectDate('20', 'June', '2000')

    //Aim
    await sigupChat.enter_the_details('Sasas')
    
    //Gender
    await sigupChat.select_Expectedoption('female')
    
    //Mother Name
    await sigupChat.enter_the_details('Anvi J')

    //Father Name
    await sigupChat.enter_the_details('Arun BB')

    //Guardian Name
    await sigupChat.enter_the_details('Afsal P')
    // await sigupChat.enter_the_details('Susheel')
    
    // Pro Pic upload
    // await page.setDefaultTimeout(3000);
    await sigupChat.upload_profile_pic("uytr.jpg")

    //Entity
    await sigupChat.select_Expectedoption('School')

    //Select School
    await sigupChat.select_Expectedoption('Manimal HSS')
    // await page.waitForTimeout(1000)
    //Board
    await sigupChat.select_Expectedoption('CBSE')
    // await page.waitForTimeout(1000)
    //Class
    await sigupChat.select_Expectedoption('class_10')
    // await page.waitForTimeout(1000)

    //Hobbies
    // await sigupChat.click_on_skip()
    await sigupChat.select_Expectedoption('Writing')
    // await page.waitForTimeout(2000)

    //Language
    await sigupChat.select_Expectedoption('Hindi')
    // await page.waitForTimeout(1000)

    //Langiage Proficiency
    await sigupChat.select_Expectedoption('Both')

    //mobile country code  
    await sigupChat.selectYourMobileNumberCountryCode()

    //Whatzp Number
    await sigupChat.enter_the_details('9988812345')

    //Select Subject
    await sigupChat.select_Expectedoption('Mathematics')

    //Select Teacher
    await sigupChat.select_Expectedoption('Sharu abu')

    // Parent Email Address
    await sigupChat.enter_the_details(login_Data.parent_username)

    // Parent Phone Number
    await sigupChat.enter_the_details(login_Data.parent_phoneNumber)

    // Country
    await sigupChat.select_Expectedoption('India')

    // Stategit
    await sigupChat.select_Expectedoption('Kerala')

    // District
    await sigupChat.enter_the_details('Alappuzha')

    // City
    await sigupChat.enter_the_details('Alapy')

    // Pincode
    await sigupChat.enter_the_details('877712')

    // First Address
    await sigupChat.enter_the_details('fsd')

    // Second Address
    await sigupChat.enter_the_details('fsdfd')

    //click on view profile
    await sigupChat.click_on_viewProfile()

    await page.pause()
})