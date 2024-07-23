import { Component } from '@angular/core';
import * as ExcelJS from 'exceljs';
import * as JSZip from 'jszip';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileName: string = '';
  selectedFile: any = {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  convertFile() {
    if (this.selectedFile) {
      const workbook = new ExcelJS.Workbook();
      const reader = new FileReader();

      reader.onload = async (e: any) => {
        try {
          const buffer = e.target.result;
          await workbook.xlsx.load(buffer);

          const zip = new JSZip();

          workbook.eachSheet((sheet, id) => {
            console.log(`Processing Sheet ID: ${id}, Name: ${sheet.name}`);

            const sheetData: { [key: string]: string } = {};

            sheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
              // Assuming first row is a header and should be skipped
              if (rowNumber > 1) {
                const key = row.getCell(1).text.trim();
                const value = row.getCell(2).text.trim();
                if (key && value) {
                  sheetData[key] = value;
                }
              }
            });

            const jsonStr = JSON.stringify(sheetData, null, 2);
            zip.file(`${sheet.name}.json`, jsonStr);
          });

          zip.generateAsync({ type: 'blob' }).then((content) => {
            FileSaver.saveAs(content, 'sheets.zip');
          });

        } catch (error) {
          console.error('Error processing file:', error);
        }
      };

      reader.onerror = (error) => {
        console.error('File reading error:', error);
      };

      if (this.selectedFile) {
        reader.readAsArrayBuffer(this.selectedFile);
      } else {
        console.error('No file selected.');
      }
    }
  }

  convertJSON() {
    if (this.selectedFile) {
      const reader = new FileReader();

      const fileName = this.selectedFile.name.replace('.json', '');

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);

          if (typeof jsonData === 'object' && jsonData !== null) {
            await convertJsonToExcel(jsonData, fileName);
          } else {
            alert('Uploaded file does not contain valid JSON data.');
          }
        } catch (error) {
          console.error('Error parsing JSON file:', error);
          alert('Error parsing JSON file.');
        }
      };

      reader.onerror = (error) => {
        console.error('File reading error:', error);
        alert('Error reading file.');
      };

      reader.readAsText(this.selectedFile);
    } else {
      alert('No file selected.');
    }
  }
}

async function convertJsonToExcel(jsonData: { [key: string]: string }, sheetName: string) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(sheetName);

  // Add headers
  sheet.addRow(['Key', 'Value']);

  // Add data rows
  for (const [key, value] of Object.entries(jsonData)) {
    // Ensure key and value are strings
    const keyStr = String(key).trim();
    const valueStr = String(value).trim();
    sheet.addRow([keyStr, valueStr]);
  }

  // Save the workbook to a blob and then save it
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  FileSaver.saveAs(blob, sheetName+'.xlsx');
}