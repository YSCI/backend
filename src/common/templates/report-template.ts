import { Workbook } from 'exceljs';
import { toRoman } from 'roman-numerals';
import { Student } from 'src/student/entities/student.entity';
import { Subject } from 'src/subject/entities/subject.entity';
import { ExcelHelpers } from '../helpers/excel.helper';
import { ReportType } from '../types/report.type';

const headerRow = 1;
const startColumn = 1;
const startRow = 4;
const ratingsDataStartColumnIndex = 6;

export const generateReport = async (
  students: Partial<Student>[],
  subjects: Partial<Subject>[],
  professionCode: string,
  academicYears: Array<number>,
  semesters: Array<number>,
  type: ReportType,
) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Pension');

  const groupNumbers = students.map((student) => student.group.number);
  const header = worksheet.getCell(headerRow, startColumn);
  header.value = ` ${professionCode},     ${groupNumbers} խմբեր ${academicYears.join(
    '-',
  )} ուս. տարվա ${type === ReportType.Pension ? 'կրթաթոշակ' : 'ռոտացիա'}`;
  ExcelHelpers.setCellAlignment(header, 'center');

  let step = 0;

  worksheet.mergeCells(['C3', 'E4']);
  worksheet.mergeCells(['A3', 'A4']);
  worksheet.mergeCells(['B3', 'B4']);

  worksheet.getColumn(startColumn + step++).width = 4;
  worksheet.getColumn(startColumn + step++).width = 8;
  worksheet.getColumn(startColumn + step++).width = 15;
  worksheet.getColumn(startColumn + step++).width = 15;
  worksheet.getColumn(startColumn + step++).width = 15;

  worksheet.getRow(startRow).height = 230;

  const a3 = worksheet.getCell(startRow, startColumn);
  a3.value = '№';
  ExcelHelpers.setCellAlignment(a3, 'center');
  ExcelHelpers.setCellBorders(a3);

  const b3 = worksheet.getCell(startRow, startColumn + 1);
  ExcelHelpers.setCellBorders(b3);

  const c3 = worksheet.getCell(startRow, startColumn + 2);
  c3.value = 'Ուսանողի ազգանունը, անունը, հայրանունը';
  ExcelHelpers.setCellAlignment(c3, 'center');
  ExcelHelpers.setCellBorders(c3);

  let count = 0;
  let currentTitleCellColumnIdx = 0;
  const groupedBySemestersSubjects = semesters.map((semester) =>
    subjects.filter((subject) => subject.semesters.includes(semester)),
  );
  for (let i = 0; i < groupedBySemestersSubjects.length; i++) {
    for (let j = 0; j < groupedBySemestersSubjects[i].length; j++) {
      const cell = worksheet.getCell(startRow, startColumn + step + count);
      cell.value = groupedBySemestersSubjects[i][j].name;
      ExcelHelpers.setCellBorders(cell);

      const column = worksheet.getColumn(startColumn + step + count);
      column.alignment = { textRotation: 90, horizontal: 'left' };
      column.width = 3;

      count++;
    }

    const title = worksheet.getCell(
      startRow - 1,
      startColumn + step + currentTitleCellColumnIdx,
    );
    worksheet.mergeCells([
      +title.row,
      +title.col,
      startRow - 1,
      startColumn + step + count - 1,
    ]);
    title.value = `Առարկաներ ${toRoman(i + 1)} կիսամյակ`;
    ExcelHelpers.setCellAlignment(title, 'center');
    ExcelHelpers.setCellBorders(title);

    currentTitleCellColumnIdx = count;
  }

  // TODO: add total rates sum for Rotation report type

  worksheet.mergeCells(headerRow, startColumn, headerRow, count + step);
  worksheet.mergeCells(headerRow + 1, startColumn, headerRow + 1, count + step);

  step = 0;
  for (let i = 0; i < students.length; i++) {
    const indexCell = worksheet.getCell(startRow + i + 1, startColumn + step++);
    indexCell.value = i + 1;
    ExcelHelpers.setCellAlignment(indexCell, 'center');
    ExcelHelpers.setCellBorders(indexCell);

    const groupNumberCell = worksheet.getCell(
      startRow + i + 1,
      startColumn + step++,
    );
    groupNumberCell.value = students[i].group.number;
    ExcelHelpers.setCellAlignment(groupNumberCell, 'center');
    ExcelHelpers.setCellBorders(groupNumberCell);

    const firstnameCell = worksheet.getCell(
      startRow + i + 1,
      startColumn + step++,
    );
    firstnameCell.value = students[i].firstname;
    ExcelHelpers.setCellAlignment(firstnameCell, 'left');
    ExcelHelpers.setCellBorders(firstnameCell);

    const lastnameCell = worksheet.getCell(
      startRow + i + 1,
      startColumn + step++,
    );
    lastnameCell.value = students[i].lastname;
    ExcelHelpers.setCellAlignment(lastnameCell, 'left');
    ExcelHelpers.setCellBorders(lastnameCell);

    const fathernameCell = worksheet.getCell(
      startRow + i + 1,
      startColumn + step++,
    );
    fathernameCell.value = students[i].fathername;
    ExcelHelpers.setCellAlignment(fathernameCell, 'left');
    ExcelHelpers.setCellBorders(fathernameCell);

    step = 0;
  }

  const reducedStudents = students.map((student) => ({
    ...student,
    rates: student.rates.reduce((acc, curr) => {
      acc[curr.subjectId] = curr.rate;
      return acc;
    }, {} as { [x: number]: number }),
  }));

  const allSubjects = groupedBySemestersSubjects.flat();
  for (let i = 0; i < reducedStudents.length; i++) {
    for (let j = 0; j < allSubjects.length; j++) {
      const cell = worksheet.getCell(
        startRow + i + 1,
        ratingsDataStartColumnIndex + j,
      );
      cell.value = reducedStudents[i].rates[allSubjects[j].id] ?? '—';
      ExcelHelpers.setCellAlignment(cell, 'center');
      ExcelHelpers.setCellBorders(cell);
    }
  }

  return await workbook.xlsx.writeBuffer();
};
