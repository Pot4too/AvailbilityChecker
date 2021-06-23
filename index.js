const Puppeteer = require('Puppeteer');

async function Check()
{
    const Browser = await Puppeteer.launch();
    const Page = await Browser.newPage();
    await Page.goto('')   //URL Adress of a website on which you want to check smthing.
}