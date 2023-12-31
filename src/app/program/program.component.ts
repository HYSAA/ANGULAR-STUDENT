import { Component, OnInit } from '@angular/core';
import { ProgramsServiceService } from '../programs-service.service';
import { College } from '../Models/collegeModel';
import { Department } from '../Models/departmentModle';
import { Program } from '../Models/programModel';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit{

  colleges:  Array<College> = [];
  departments: Array<Department> = [];
  programs: Array<Program> = [];

  selectedDepartment: Department = null;
  selectedCollege: College = null;

  progid: number = null;
  progfullname: string = '';
  progshortname: string = '';
  printable: boolean = false;
  selectedProgram: any;
  


  constructor (private programService : ProgramsServiceService) {}

  ngOnInit(): void {
    this.fetchColleges();
    this.fetchDepartments();
    this.fetchPrograms();
  }

  public fetchColleges() {
    this.programService.fetchColleges().subscribe(
      (data: College[]) => {
        this.colleges = data;
        console.log(this.colleges); 
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  public fetchDepartments() {
    this.programService.fetchDepartments().subscribe(
      (data: Department[]) => {
        this.departments = data;
        console.log(this.departments); 
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  public fetchPrograms() {
    this.programService.fetchPrograms().subscribe(
      (data: Program[]) => {
        this.programs = data;
        console.log(this.programs); 
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }


  filteredDepartments: Array<Department> = [];


  public filterDepartments(): void {
      if (this.selectedCollege) {
        this.filteredDepartments = this.departments.filter(department => department.deptcollid === this.selectedCollege.collid);
        
      } else {
          this.filteredDepartments = []; 
      }
  }



  public saveProgramInfo(): void {
    let progData: Program;
    let deptcollid =  Number(`${this.selectedDepartment.deptcollid}00${this.selectedCollege.collid}`);
    
    progData = {
      progid: this.progid,
      progfullname: this.progfullname,
      progshortname: this.progshortname,
      progcollid: this.selectedCollege.collid,
      // progcolldeptid: this.selectedDepartment.deptcollid,
      progcolldeptid: deptcollid,

    }

    this.programService.saveProgram(progData).subscribe(
      (data) => {
        window.location.reload();
        console.log('Sent Data',progData);
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
}

public printProgramEntries(): void {
  this.fetchPrograms(); 
  this.printable = true;
}


public removeProgram(progid: Program):void{
  this.programService.removeCollege(progid).subscribe(data => {
    window.location.reload();
    console.log(data);
  });
}

public getProgramInfo(progid: Program): void{
  this.programService.getCollegeInfo(progid).subscribe(data=>{
    this.selectedProgram = data;
    this.populateFormFields();
    console.log('Retrieved student data:', this.selectedProgram);
    // console.log(data);
  })
}

// private populateFormFields(): void {
//   if (this.selectedProgram) {
//     this.progid = this.selectedProgram.progid;
//     this.progfullname = this.selectedProgram.progfullname;
//     this.progshortname = this.selectedProgram.progshortname;
//     this.progcollid = this.colleges.find(college => college.collid === this.selectedDepartment.deptid);
//     this.progdeptcollid = this.selectedProgram.studyear;

//     if (this.selectedDepartment) {
//       this.filteredDepartments = this.programs.filter(program => program.progcollid === this.selectedDepartment.deptcollid);

//       if (this.filteredDepartments.length > 0) {
//         this.selectedProgram = this.filteredDepartments[0]; 
//       }
//     }
//   }
// }

private populateFormFields(): void {

  if (this.selectedProgram) {
    this.progid = this.selectedProgram.progid;
    this.progfullname = this.selectedProgram.progfullname;
    this.progshortname = this.selectedProgram.progshortname;
    this.selectedCollege =  this.colleges.find(college => college.collid === this.selectedProgram.progcollid);

    if (this.selectedCollege) {
      this.filteredDepartments = this.departments.filter(departments => departments.deptcollid === this.selectedCollege.collid);

      if (this.filteredDepartments.length > 0) {
        this.selectedDepartment = this.filteredDepartments[0]; // Select the first program from filteredPrograms
      }
    }
  }
}

public getDepartmentName(deptcollid: number, short: boolean = null): string{
  let foundName = this.departments.find(element =>
      element.deptcollid === deptcollid
  );
  short = short ?? true;
  return short ? foundName.deptshortname : foundName.deptfullname;
}

public getCollegeName(collid: number, short: boolean = null): string{
  let foundName = this.colleges.find(element => 
      element.collid === collid
      );

      short = short ?? true;
      return short ? foundName.collshortname : foundName.collfullname;
}


public updateProgramInfo(): void {
  let progData: Program;
    let deptcollid =  Number(`${this.selectedDepartment.deptcollid}00${this.selectedCollege.collid}`);
    
    progData = {
      progid: this.progid,
      progfullname: this.progfullname,
      progshortname: this.progshortname,
      progcollid: this.selectedCollege.collid,
      // progcolldeptid: this.selectedDepartment.deptcollid,
      progcolldeptid: deptcollid,

    }

    this.programService.updateCollegeInfo(progData).subscribe(
      (data) => {
        window.location.reload();
        console.log('Sent Data',progData);
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
}

}
