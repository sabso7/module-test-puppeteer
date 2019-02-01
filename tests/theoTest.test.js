const timeout = 15000;

// test d'un raccourcisseur d'URL
describe("Shorten Anonymous", () => {
    let page;

    let data = Math.floor(Date.now()).toString();

    // vérification du chargement de la page d'accueil
    test('test theo tt', async () => {
        await page.goto('http://polr.alwaysdata.net');
        await page.waitForSelector('.long-link-input');
        await page.type('.long-link-input', 'https://jestjs.io/docs/en/getting-started');
        await page.screenshot({path: './tests/img/test1.png'});

        await page.waitForSelector('#show-link-options');
        await page.$eval('#show-link-options', el => el.click());
        await page.waitForSelector('.custom-url-field');


        await page.type('.custom-url-field' ,data);
        await page.waitForSelector('#shorten');
        await page.$eval( '#shorten', el => el.click() );
        await page.waitForSelector('input.result-box');
        const val = await page.$eval('input.result-box', el => el.value);
        expect(val).toBe('http:\/\/polr\.alwaysdata\.net\/' + data);
        await page.screenshot({path: './tests/img/test2.png'});
    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});