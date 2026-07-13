// Google Apps Script backend for Endure's "Save to Google Sheet" feature.
//
// Setup:
// 1. Open the target Google Sheet.
// 2. Extensions → Apps Script.
// 3. Delete any starter code and paste this file's contents in.
// 4. Deploy → New deployment → type "Web app".
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Authorize when prompted, then copy the web app URL (ends in /exec).
// 6. In Endure, go to Settings → Google Sheets and paste that URL in.

const SHEET_NAME = "Log";

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = getOrCreateSheet();
  const exercises = data.exercises || [];

  if (exercises.length === 0) {
    sheet.appendRow([data.date, data.name, "", "", "", data.notes || ""]);
  } else {
    exercises.forEach(function (ex) {
      sheet.appendRow([data.date, data.name, ex.name, ex.value, ex.target, data.notes || ""]);
    });
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Date", "Workout", "Exercise", "Value", "Target", "Notes"]);
  }
  return sheet;
}
