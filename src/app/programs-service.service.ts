import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramsServiceService {
  baseURL: string = 'http://localhost/usjr-app/api/'; 


  constructor(private http: HttpClient) { }

  public fetchColleges(): Observable<any> {
    let data =  this.http.get(this.baseURL + 'getcolleges.php');
    console.log(data);
    return this.http.get(this.baseURL + 'getcolleges.php');
  }

  public fetchDepartments(): Observable<any> {
    let data =  this.http.get(this.baseURL + 'getdepartments.php');
    console.log(data);
    return this.http.get(this.baseURL + 'getdepartments.php');
  }

  public fetchPrograms(): Observable<any> {
    let data =  this.http.get(this.baseURL + 'getprograms.php');
    console.log(data);
    return this.http.get(this.baseURL + 'getprograms.php');
  }


  public saveProgram(progData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/saveprogram.php`, progData, { responseType: 'text' });
  }

  public removeCollege(progData : any) : Observable <any>{
    return this.http.post(this.baseURL + 'removeprogram.php' , progData);
  }

  public getCollegeInfo(progData : any) : Observable<any>{
    return this.http.post(this.baseURL + 'getprograminfo.php' , progData);
   }

   public updateCollegeInfo(progData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/postprogramupdates.php`, progData, { responseType: 'text' });
  }


}
