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

const ID_COLUMN = 7;

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);

  try {
    const sheet = getOrCreateSheet();
    const exercises = data.exercises || [];
    const id = data.id || "";

    removeSessionRows(sheet, data);

    if (exercises.length === 0) {
      sheet.appendRow([data.date, data.name, "", "", "", data.notes || "", id]);
    } else {
      exercises.forEach(function (ex) {
        sheet.appendRow([data.date, data.name, ex.name, ex.value, ex.target, data.notes || "", id]);
      });
    }
  } finally {
    lock.releaseLock();
  }

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Removes this session's earlier rows so a resubmission overwrites them.
// Rows saved before session IDs existed are matched on date and workout name.
function removeSessionRows(sheet, data) {
  if (!data.id) return;
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const rows = sheet.getRange(2, 1, lastRow - 1, ID_COLUMN).getValues();
  const previousDate = data.previousDate || data.date;

  for (let i = rows.length - 1; i >= 0; i--) {
    const rowId = rows[i][ID_COLUMN - 1];
    const legacyMatch = !rowId && rows[i][1] === data.name && sameDate(rows[i][0], previousDate);
    if (rowId === data.id || legacyMatch) sheet.deleteRow(i + 2);
  }
}

function sameDate(cell, text) {
  const value = cell instanceof Date
    ? (cell.getMonth() + 1) + "/" + cell.getDate() + "/" + cell.getFullYear()
    : String(cell);
  return value === text;
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(["Date", "Workout", "Exercise", "Value", "Target", "Notes", "Session ID"]);
  }
  if (!sheet.getRange(1, ID_COLUMN).getValue()) sheet.getRange(1, ID_COLUMN).setValue("Session ID");
  return sheet;
}
