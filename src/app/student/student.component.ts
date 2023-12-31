import { Component } from '@angular/core';
import { StudentServiceService } from '../student-service.service';
import { OnInit } from '@angular/core';
import { College } from '../Models/collegeModel';
import { Program } from '../Models/programModel';
import { Student } from '../Models/studentModel';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  studID: number = null;
  studFirstName: string = '';
  studMidName: string = '';
  studLastName: string = '';
  selectedCollege: College = null;
  selectedProgram: Program = null;
  studYear: number = null ;

  printable: boolean = false;
  selectedStudent: any;
  edit: boolean = false;

  constructor (private studentService : StudentServiceService) {}
  ngOnInit(): void {
    this.fetchStudents();
    this.fetchColleges();
    this.fetchPrograms();
  }

  students:  Array<Student> = [];
  colleges:  Array<College> = [];
  programs:  Array<Program> = [];

  public saveStudentInfo(): void {
        let studData: Student;

        studData = {
            studID: Number(this.studID),
            studFirstName: this.studFirstName,
            studLastName: this.studLastName,
            studMidName: this.studMidName,
            studCollId: this.selectedCollege.collid,
            studProgId: this.selectedProgram.progid,
            studYear: Number(this.studYear),
        }

        this.studentService.saveStudent(studData).subscribe(
          (data) => {
            window.location.reload();
            console.log('Sent Data',studData);
            console.log(data);
          },
          (error) => {
            console.error(error);
          }
        );
  }

     
  public fetchStudents() {
    this.studentService.fetchStudent().subscribe(
      (data: Student[]) => {
        this.students = data;
        console.log(this.students); 
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  public fetchColleges() {
    this.studentService.fetchColleges().subscribe(
      (data: College[]) => {
        this.colleges = data;
        console.log(this.colleges); 
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  public fetchPrograms() {
    this.studentService.fetchPrograms().subscribe(
      (data: Program[]) => {
        this.programs = data;
        console.log(this.programs); 
      },
      (error) => {
        console.error('Error fetching programs:', error);
      }
    );
  }

  filteredPrograms: Array<Program> = [];

  public filterPrograms(): void {
      if (this.selectedCollege) {
          this.filteredPrograms = this.programs.filter(programs => programs.progcollid === this.selectedCollege.collid);
      } else {
          this.filteredPrograms = []; 
      }
  }

  public printStudentEntries(): void {
    this.fetchStudents(); 
    this.printable = true;
  }

  public removeStudent(studid: Student):void{
    this.studentService.removeStudent(studid).subscribe(data => {
      window.location.reload();
      console.log(data);
    });
  }

  public getStudentInfo(studid: Student): void{
    this.edit = true;
    this.studentService.getStudentInfo(studid).subscribe(data=>{
      this.selectedStudent = data;
      this.populateFormFields();
      console.log('Retrieved student data:', this.selectedStudent);
    })
  }



  private populateFormFields(): void {
    if (this.selectedStudent) {
      this.studID = this.selectedStudent.studid;
      this.studFirstName = this.selectedStudent.studfirstname;
      this.studMidName = this.selectedStudent.studmidname;
      this.studLastName = this.selectedStudent.studlastname;
      this.selectedCollege = this.colleges.find(college => college.collid === this.selectedStudent.studcollid);
      this.filterPrograms();
      if (this.selectedStudent.studprogid) {
        this.selectedProgram = this.filteredPrograms.find(program => program.progid === this.selectedStudent.studprogid);
      }
      this.studYear = this.selectedStudent.studyear;

  
    }
  }

  public getProgramName(progid: number, short: boolean = null): string{
    let foundName = this.programs.find(element =>
        element.progid === progid
    );
    short = short ?? true;
    return short ? foundName.progshortname : foundName.progfullname;
  }
  
  public getCollegeName(collid: number, short: boolean = null): string{
    let foundName = this.colleges.find(element => 
        element.collid === collid
        );
  
        short = short ?? true;
        return short ? foundName.collshortname : foundName.collfullname;
  }

  public updateStudentInfo(): void {
        // let studData: StudentUpdate;
        let studData: Student;

        this.edit = false;


        studData = {
            studID: Number(this.studID),
            studFirstName: this.studFirstName,
            studLastName: this.studLastName,
            studMidName: this.studMidName, 
            studCollId: this.selectedCollege.collid,
            studProgId: this.selectedProgram.progid,
            studYear: Number(this.studYear),

            
        }
        // this.studentService.updateStudentInfo(this.studID, studData).subscribe(

        // this.studentService.updateStudent(studData.studID, studData).subscribe(
          this.studentService.updateStudentInfo(studData).subscribe(
          (data) => {
            window.location.reload();

            console.log('Sent Data' , studData);

            console.log(data);
          },
          (error) => {
            console.error(error);
          }
        );
    }

    public clearEntries(): void {
      this.edit = false;

      this.studID = null;
      this.studFirstName = '' ;
      this.studMidName = '' ;
      this.studLastName = '' ;
      this.selectedProgram = null ;
      this.selectedCollege = null ;
      this.studYear = null ;
      this.printable = false;
   }

}
