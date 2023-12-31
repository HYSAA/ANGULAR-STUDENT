import { Component, OnInit } from '@angular/core';
import { CollegeServiceService } from '../college-service.service';
import { Observable } from 'rxjs';
import { College } from '../Models/collegeModel';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit{

  colleges:  Array<College> = [];
  collid: number = null;
  collfullname: string = '';
  collshortname: string = '';
  printable: boolean = false;
  selectedCollege: any;
  edit: boolean = false;

  
  constructor (private collegeService : CollegeServiceService) {}

  ngOnInit(): void {
    this.fetchColleges();
  }

  public saveCollegeInfo(): void {
    let collData: College;

    collData = {
      collid: this.collid,
      collfullname: this.collfullname,
      collshortname: this.collshortname
       
    }

    this.collegeService.saveCollege(collData).subscribe(
      (data) => {
        window.location.reload();
        console.log('Sent Data',collData);
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
}

public printCollegeEntries(): void {
  this.fetchColleges(); 
  this.printable = true;
}

public removeCollege(collid: College):void{
  this.collegeService.removeCollege(collid).subscribe(data => {
    window.location.reload();
    console.log(data);
  });
}

public getCollegeInfo(collid: College): void{
  this.edit = true;

  this.collegeService.getCollegeInfo(collid).subscribe(data=>{
    this.selectedCollege = data;
    this.populateFormFields();
    console.log('Retrieved student data:', this.selectedCollege);
    // console.log(data);
  })
}


private populateFormFields(): void {
  if (this.selectedCollege) {
    this.collid = this.selectedCollege.collid;
    this.collfullname = this.selectedCollege.collfullname;
    this.collshortname = this.selectedCollege.collshortname;

  }
}


  public fetchColleges() {
    this.collegeService.fetchColleges().subscribe(
      (data: College[]) => {
        this.colleges = data;
        console.log(this.colleges); 
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  public updateCollegeInfo(): void {
    let collData: College;
    this.edit = true;

    collData = {
      collid: Number(this.collid) ,
      collfullname: this.collfullname,
      collshortname: this.collshortname,
 
    }

    this.collegeService.updateCollegeInfo(collData).subscribe(
      (data) => {
        window.location.reload();
        console.log('Sent Data',collData);
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
}

public clearEntries(): void {
  this.edit = false;

  this.collid = null;
  this.collfullname = '' ;
  this.collshortname = '' ;

  this.printable = false;
}


}
