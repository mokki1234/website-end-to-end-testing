const {test, expect}=require('@playwright/test');

test('first playwright test', async ({browser})=>
{
 const context= await browser.newContext();
 const page = await context.newPage();
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});

test("page playwright code",async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName=page.locator('#username');
    const password=page.locator('#password');
    const signIn= page.locator("[type='submit']")
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await userName.type("anshika@gmail.com");
    await password.type("learning");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy")
    await signIn.click();
    console.log(await page.locator(".card-body a").nth(0).textContent());
    console.log(await page.locator(".card-body a").last(1).textContent());
    const cartTitiles=await page.locator(".card-body a").allTextContents();
    console.log(cartTitiles);
    await page.close();



});

test("practice website", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".text-reset").click();
    await page.fill("#firstName", 'Rasheul');
    await page.fill("#lastName", 'islam');
    await page.fill("[type='email']",'aminul@gmail.com');
    await page.fill("#userMobile","1756465465");
    await page.selectOption("select[formcontrolname='occupation']",'Doctor');
    await page.locator("[value='Male']").click();
    await page.fill("#userPassword","@Aa12345648");
    await page.fill("#confirmPassword","@Aa12345648");
    await page.locator("[type='checkbox']").click();
    await page.locator("#login").click();
    await page.fill("#userEmail",'aminul@gmail.com');
    await page.fill("#userPassword","@Aay12345648");
    await page.locator("#login").click();
    console.log(await page.locator(".container b").nth(0).textContent());
    await page.close();



});

test("UI Controls", async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName=page.locator('#username');
    const signIn= page.locator("[type='submit']");
    const dropdown= page.locator("select.form-control");
    const documentLink=page.locator("[href*='documents-request']");
    await dropdown.selectOption("Teacher");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect (page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect (page.locator("#terms").last()).toBeChecked();
    await page.locator("#terms").uncheck();
    expect ( await page.locator("#terms").isChecked()).toBeFalsy();
    await expect (documentLink).toHaveAttribute("class","blinkingText");
    await documentLink.click();
    
    const [newpage] = await Promise.all([

        context.waitForEvent('page'),
        documentLink.click(),
    ]);

   const text= await newpage.locator(".red").textContent();
   const array= text.split('@');
    const domain=array[1].split(" ") [0];
    console.log(domain);
    await userName.type(domain);
    console.log(await userName.textContent());
   
});


test.only("child window Handle", async({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName=page.locator('#username');
    const documentLink=page.locator("[href*='documents-request']");
    await expect (documentLink).toHaveAttribute("class","blinkingText");
        
    const [newpage] = await Promise.all([

        context.waitForEvent('page'),
        documentLink.click(),
    ]);

   const text= await newpage.locator(".red").textContent();
   const array= text.split('@');
    const domain=array[1].split(" ") [0];
    console.log(domain);
    await userName.type(domain);
    await page.pause();
    console.log(await userName.textContent());
   
});
//race condition use for which server is not based on api service based calls server side 
/*await Promise.all([
    page.waitForNavigation(),
    page.locator("#login").click(),
]);*/
//console.log(await page.locator(".container b").nth(0).textContent());
// this method for network calls service based 
//await page.waitForLoadState('networkidle');

//css selector
/* if id is present 
css-> tagname#id or #id
class is present
css-> tagname.class or .class
css based on attribute
css-> [attribute='value'] or tagname[attribute='value']
travarsing with parent to child
css-> partenttagname >> childgame*/
