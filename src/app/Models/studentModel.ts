import { College } from "./collegeModel";
import { Program } from "./programModel";

export type Student = {
  studID: number;
  studFirstName: string;
  studLastName: string;
  studMidName?: string;
  studProgId: number;
  studCollId: number
  studYear: number;
}