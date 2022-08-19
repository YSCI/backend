import { Alignment, Borders, Cell, Column } from 'exceljs';
import * as _ from 'lodash';
import { ExportColumnsDto } from '../dto/export-columns.dto';

export class ExcelHelpers {
  private static defaultWidth = 10;
  private static alignmentCenter: Partial<Alignment> = {
    vertical: 'middle',
    horizontal: 'center',
  };
  private static alignmentLeft: Partial<Alignment> = {
    vertical: 'middle',
    horizontal: 'left',
  };
  private static border: Partial<Borders> = {
    top: { style: 'thin' },
    left: { style: 'thin' },
    bottom: { style: 'thin' },
    right: { style: 'thin' },
  };

  static autoFitColumns(columns: Partial<Column>[]) {
    columns.forEach(function (column) {
      let maxLength = 0;
      column['eachCell']({ includeEmpty: true }, function (cell) {
        const columnLength = cell.value
          ? cell.value.toString().length * 1.3
          : ExcelHelpers.defaultWidth;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width =
        maxLength < ExcelHelpers.defaultWidth
          ? ExcelHelpers.defaultWidth
          : maxLength;
    });
  }

  static setCellBorders(cell: Cell) {
    cell.border = this.border;
  }

  static setCellAlignment(cell: Cell, alignment: 'center' | 'left') {
    cell.alignment =
      alignment === 'center' ? this.alignmentCenter : this.alignmentLeft;
  }

  static setColumnBorders(column: Partial<Column>) {
    column.border = this.border;
  }

  static setColumnAlignment(
    column: Partial<Column>,
    alignment: 'center' | 'left',
  ) {
    column.alignment =
      alignment === 'center' ? this.alignmentCenter : this.alignmentLeft;
  }

  static setColumnsAlignment(
    columns: Partial<Column>[],
    alignment: 'center' | 'left',
  ) {
    columns.forEach((column) => this.setColumnAlignment(column, alignment));
  }

  static setColumnsBorder(columns: Partial<Column>[]) {
    columns.forEach((column) => this.setColumnBorders(column));
  }

  static parseDeepDataToRows<T>(data: T[], columns: Array<ExportColumnsDto>) {
    const result = [];
    for (const item of data) {
      const temp = [];
      for (const column of columns) {
        temp.push(_.get(item, column.key));
      }

      result.push(temp);
    }

    return result;
  }
}
