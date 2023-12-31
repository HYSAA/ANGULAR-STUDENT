import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { College } from './Models/collegeModel';

@Injectable({
  providedIn: 'root'
})
export class CollegeServiceService {
  baseURL: string = 'http://localhost/usjr-app/api/'; 
  

  constructor(private http: HttpClient) { }


  public fetchColleges(): Observable<any> {
    let data =  this.http.get(this.baseURL + 'getcolleges.php');
    console.log(data);
    return this.http.get(this.baseURL + 'getcolleges.php');
  }

  public fetchDepartments(): Observable<any> {
    let data =  this.http.get(this.baseURL + 'getdepartmentss.php');
    console.log(data);
    return this.http.get(this.baseURL + 'getdepartments.php');
  }


  public saveCollege(collData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/savecollege.php`, collData, { responseType: 'text' });
  }

  public removeCollege(collData : College) : Observable <any>{
    return this.http.post(this.baseURL + 'removecollege.php' , collData);
  }

  public getCollegeInfo(collData : College) : Observable<any>{
    return this.http.post(this.baseURL + 'getcollegeinfo.php' , collData);
   }

   public updateCollegeInfo(collData: College): Observable<any> {
    return this.http.post(`${this.baseURL}/postcollegeupdates.php`, collData, { responseType: 'text' });
  }

}
