export interface NgxDataArray {
  name: string | Date;
  value: number;
  city?: string;
  athleteCounts?: number;
}

export interface NgxLineData {
  name: string;
  series: NgxDataArray[];
}
