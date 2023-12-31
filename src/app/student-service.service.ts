import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './Models/studentModel';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  baseURL: string = 'http://localhost/usjr-app/api/'; 

  constructor(private http: HttpClient) { }

  public fetchStudent(): Observable<any> {
    let data =  this.http.get(this.baseURL + 'getstudents.php');
    console.log(data);
    return this.http.get(this.baseURL + 'getstudents.php');
  }


  public fetchColleges(): Observable<any> {
    let data =  this.http.get(this.baseURL + 'getcolleges.php');
    console.log(data);
    return this.http.get(this.baseURL + 'getcolleges.php');
  }


  public fetchPrograms(): Observable<any> {
    let data =  this.http.get(this.baseURL + 'getprograms.php');
    console.log(data);
    return this.http.get(this.baseURL + 'getprograms.php');
  }


  saveStudent(studData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/savestudent.php`, studData, { responseType: 'text' });
  }

  removeStudent(studData : Student) : Observable <any>{
    return this.http.post(this.baseURL + 'removestudent.php' , studData);
  }

  getStudentInfo(studData : Student) : Observable<any>{
    return this.http.post(this.baseURL + 'getstudentinfo.php' , studData);
   }

  updateStudentInfo(studData: Student): Observable<any> {
    return this.http.put(`${this.baseURL}/poststudentupdates.php`, studData, { responseType: 'text' });
  }


}
