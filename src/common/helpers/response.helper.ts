import { Response } from 'express';

export class ResponseHelpers {
  static setHeadersForExcelReport(res: Response, filename: string) {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=' + filename);

    return res;
  }
}
