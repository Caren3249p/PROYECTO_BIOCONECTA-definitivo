import { Response } from 'express';
export declare class ExportService {
    exportToPDF(data: any, reportType: string, res: Response): Promise<void>;
    exportToExcel(data: any, reportType: string, res: Response): Promise<void>;
    private getTitleByType;
    private addProjectReportToPDF;
    private addComparativeReportToPDF;
    private addDashboardReportToPDF;
    private addRiskReportToPDF;
    private addTemporalReportToPDF;
    private addProductivityReportToPDF;
    private addProjectReportToExcel;
    private addComparativeReportToExcel;
    private addDashboardReportToExcel;
    private addRiskReportToExcel;
    private addTemporalReportToExcel;
    private addProductivityReportToExcel;
}
