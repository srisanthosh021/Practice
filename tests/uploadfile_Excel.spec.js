const ExcelJS = require("exceljs");
const {test,expect} = require("@playwright/test");
async function excelRun(fileDir, text, replaceText, change) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(fileDir);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, text);
    const cell = worksheet.getCell(output.row + change.rowChange, output.column + change.columnChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(fileDir);


}
async function readExcel(worksheet, text) {
    let output = { row: 0, column: 0 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, columnNumber) => {
            if (cell.value === text) {
                output.row = rowNumber;
                output.column = columnNumber;
            }

        })
    })
    return output;
}


test("Upload Excel", async({page}) => {
    const textSearch = "Mango";
    const updatedValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button", {name: 'Download'}).click();
    const download = await downloadPromise;
    const filePath = "/Users/welcome/Downloads/download.xlsx";
    await download.saveAs(filePath);
    await excelRun(filePath, "Mango", updatedValue,{rowChange:0, columnChange:2});
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles(filePath);
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updatedValue);


})