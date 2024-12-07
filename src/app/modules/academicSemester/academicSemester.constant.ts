import {
   TAcademicSemesterCodeMapper,
   TMonths,
   TSemesterCode,
   TSemesterName,
} from "./academicSemester.interface";

export const Months: TMonths[] = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];

export const SemesterNames: TSemesterName[] = ["Autumn", "Summer", "Fall"];
export const SemesterCodes: TSemesterCode[] = ["01", "02", "03"];

export const SemesterCodeMapper: TAcademicSemesterCodeMapper = {
   Autumn: "01",
   Summer: "02",
   Fall: "03",
};
