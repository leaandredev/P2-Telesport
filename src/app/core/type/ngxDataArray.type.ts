export interface NgxDataArray {
  name: string | Date;
  value: number;
}

export interface NgxLineData {
  name: string;
  series: NgxDataArray[];
}
