/// <reference path="ModelReference.ts" />

module EmployeeManagement.Models {
    export class EmployeeDetailedInfo {
        public empId: number;
        public fullName: string;
        public deptName: string;
        public statusName: string;
        public salary: number | string;
        public joiningDate: string;
        public departmentId: number;
        public employeeStatus: number;
        constructor() {
        }
    }
    export class Employee {
        id: number;
        firstName: string;
        lastName: string;
        departmentId: number;
        employeeStatus: number;
    }
    export class EmployeeDepartment {
        id: number;
        name: string;
    }
    export class EmployeeDetails {
        id: number;
        employeeId: number;
        joiningDate: string;
        salary: number;
    }
    export class EmployeeStatus {
        id: number;
        name: string;
    }

    // function show(visibilityflag){
    //     let addform=document.getElementById("a dd-form");
    //     if(visibilityflag)
    //     addform.style.visibility="visibe";
    //     else
    //     addform.style.visibility="hidden";
    // }
    // show(false);
}