/// <reference path="ComponentReference.ts" />

module EmployeeManagement.Components {
    import helper = EmployeeManagement.Helpers;
    import models = EmployeeManagement.Models;
    export class AddEmployee {
        save: (result: models.EmployeeDetailedInfo, event: Function) => any;
        edit: (result: models.EmployeeDetailedInfo, event: Function) => any;
        private addEvent: Function;
        constructor(department: models.EmployeeDepartment[], employeeStatus: models.EmployeeStatus[]) {
            let empDetails: models.EmployeeDetailedInfo;
            this.save = saveButton;
            this.edit = editButton;

            let save = () => {
                empDetails.fullName = helper.ArrayHelper.getElementById("secondName", "string");
                empDetails.departmentId = helper.ArrayHelper.getElementById("depts", "number");
                empDetails.deptName = helper.ArrayHelper.getById(department, empDetails.departmentId);
                empDetails.employeeStatus = helper.ArrayHelper.getElementById("statuss", "number");
                empDetails.statusName = helper.ArrayHelper.getById(employeeStatus, empDetails.employeeStatus);
                empDetails.salary = helper.ArrayHelper.getElementById("secondSalary", "number");
                empDetails.joiningDate = helper.ArrayHelper.getElementById("secondDate", "string");
                this.addEvent(empDetails);
            }
            let edit = () => {
                empDetails.fullName = helper.ArrayHelper.getElementById("secondName", "string");
                empDetails.departmentId = helper.ArrayHelper.getElementById("depts", "number");
                empDetails.deptName = helper.ArrayHelper.getById(department, empDetails.departmentId);
                empDetails.employeeStatus = helper.ArrayHelper.getElementById("statuss", "number");
                empDetails.statusName = helper.ArrayHelper.getById(employeeStatus, empDetails.employeeStatus);
                empDetails.salary = helper.ArrayHelper.getElementById("secondSalary", "number");
                empDetails.joiningDate = helper.ArrayHelper.getElementById("secondDate", "string");
                this.addEvent(empDetails);
            }
            document.getElementById("buttonSave").addEventListener("click", save);
            document.getElementById('buttonEdit').addEventListener("click", edit);


            function saveButton(result: models.EmployeeDetailedInfo, event: Function) {
                this.addEvent = event;
                empDetails = result;
            }
            function editButton(result: models.EmployeeDetailedInfo, event: Function) {
                this.addEvent = event;
                empDetails = result;
            }
        }
    }
}