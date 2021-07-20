describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-stories&args=&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-appwithredux--app-with-redux-stories&args=&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-example&args=&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-is-done-stories&args=&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-task--task-is-not-done-stories&args=&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});