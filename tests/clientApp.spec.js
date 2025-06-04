const {test,expect}=require('@playwright/test');
const { Console } = require('console');

test.only("practice website", async({page})=>
{
   // Navigate to website
await page.goto("https://rahulshettyacademy.com/client");
const email='aminul@gmail.com';
const productName="IPHONE 13 PRO";
const products=page.locator(".card-body");
const cardtitles= page.locator(".container b");
await page.fill("#userEmail",'aminul@gmail.com');
await page.fill("#userPassword","@Aa12345648");
await page.locator("#login").click();
 // Wait for products to load
await page.waitForLoadState('networkidle');
const cartTitiles=await cardtitles.allTextContents();
console.log(cartTitiles);
const count = await products.count();
for(let i=0; i < count; ++i)
{
   if (await products.nth(i).locator("b").textContent()===productName)
   {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
      
   }
   
}
// Go to cart
await page.locator("[routerlink*='cart']").click();
await page.locator(".cart li").first().waitFor();
const bool=await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible(); // tag wise text can used in css
expect(bool).toBeTruthy();
// Checkout
await page.locator("text=Checkout").click();
 // Select Country
await page.locator("[placeholder*='Country']").type("ban",{delay:100});
const dropdown= page.locator(".ta-results");
await dropdown.waitFor();
const dropdowncount=await dropdown.locator("button").count();
const OptionName=" Bangladesh";
for(let i=0; i<dropdowncount;++i)
{
   const text=await dropdown.locator("button").nth(i).textContent();
  if(text ===OptionName)
  {
   await dropdown.locator("button").nth(i).click();
   break;
  }
}


  // Confirm email is displayed in form

 const actualemail=await page.locator(".user__name input[type='text']").inputValue(); //(.user__name [type='text']) (.user__name input[type='text'])
 expect(actualemail).toBe(email);
 //select dropdown
await page.locator("select.input.ddl").nth(0).selectOption({ label: '05' });
await page.locator("select.input.ddl").nth(1).selectOption({ label: '30' });
await page.locator('input[type="text"]').nth(1).type("478");
await page.locator('input[type="text"]').nth(2).fill('AMinul islam');
await page.locator('[name="coupon"]').fill('"coupon"');
await page.locator(".action__submit").click();
//order deatils page
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderID=await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderID);
await page.locator("label[routerlink*='myorders']").click();
//order page history page
await page.locator("tbody").waitFor();
const rows=  await page.locator("tbody tr").count();
const ordertable=page.locator("tbody tr th");
for (let i=0; i<rows;++i)
{
   const orderserial=ordertable.nth(i).textContent();
   if(orderserial==orderID)
   {
        await ordertable.locator("button").first().click()
         break; 
   }
}
const orderdetails= await page.locator(".col-text").textContent();
expect(orderdetails.includes(orderID)).toBeTruthy();



});