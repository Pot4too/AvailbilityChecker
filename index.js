const puppeteer = require('Puppeteer');
const delay = require('delay');

const UserAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/85.0.4182.0 Safari/537.36";



async function Main()
{
    do{
        await StartBrowser();
        await Stealth();
        await NurseGreen();
        await Browser.close();
        Log();
        await delay(300000);
        console.log('--------------------');
    }while (1 == 1)
}

var AvailbilityStealth;
const StealthURL = 'https://www.canyon.com/cs-sk/horska-kola/enduro-bikes/torque/al/torque-5/2665.html?dwvar_2665_pv_rahmenfarbe=BK%2FGY';
async function Stealth()
{
    try
    {
        await Page.goto(StealthURL);  //URL Adress of a website on which you want to check smthing.
        AvailbilityStealth = await Page.$eval('li.productConfiguration__optionListItem:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)' , el => el.innerHTML); 
    } catch (error)
    {
        console.log('Error in Stealth, index.js');
        console.log(error);
    }
}

var AvailbilityNurseGreen;
const NurseGreenURL = 'https://www.canyon.com/cs-sk/horska-kola/enduro-bikes/torque/al/torque-5/2665.html?dwvar_2665_pv_rahmenfarbe=GN%2FBK';
async function NurseGreen()
{
    try
    {
        await Page.goto(NurseGreenURL);  //URL Adress of a website on which you want to check smthing.
        AvailbilityNurseGreen = await Page.$eval('li.productConfiguration__optionListItem:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)' , el => el.innerHTML); 
    } catch (error)
    {
        console.log('Error in NurseGreen, index.js');
        console.log(error);
    }
}


let Browser;
let Page;
async function StartBrowser()
{
    try
    {
        console.log('|Process Started|');
        Browser = await puppeteer.launch({ headless: true, slowMo: 10 });
        Page = await Browser.newPage();
        await Page.setUserAgent(UserAgent);
        
    } catch (error)
    {
        console.log('Error in StartBrowser, index.js');
        console.log(error);
    }
}

var NurseGreenTxT;
var StealthTxT;
function Log()
{
    if (AvailbilityStealth.includes('Vyprodáno') !== true)
        StealthTxT = 'Available';
    else
        StealthTxT = 'Unavailable';
    
    
    if (AvailbilityNurseGreen.includes('Vyprodáno') !== true)
        NurseGreenTxT = 'Available';
    else
        NurseGreenTxT = 'Unavailable';
    
    console.log('Stealth: ' + StealthTxT);
    console.log('Nurse Green: ' + NurseGreenTxT);
}

Main();