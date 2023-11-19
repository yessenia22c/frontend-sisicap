import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment'
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import { map } from 'rxjs/operators';
@Injectable()
export class ExportarExcelService {
    private endpoint: string = environment.endPoint;
    private apiUrl: string = this.endpoint;

    constructor(private http: HttpClient) { }
    
    exportarReporteExcel(id_grupo_seguimiento: number): Observable<Blob> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            // Add any necessary headers, such as authentication tokens, if needed
        });
        return this.http.get(`${this.apiUrl}reporte/excel/${id_grupo_seguimiento}`, { responseType: 'blob' })
    }

}
// (data:any) => {
//     const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     const contentDispositionHeader = data.headers.get('content-disposition');
//     const fileName = contentDispositionHeader ? contentDispositionHeader.split(';')[1].split('filename=')[1].trim() : 'archivo.xlsx';
//     FileSaver.saveAs(blob, fileName)
// }