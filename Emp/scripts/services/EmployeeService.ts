/// <reference path="ServiceReference.ts" />
module EmployeeManagement.Services {
    import models = EmployeeManagement.Models;
    import helper = EmployeeManagement.Helpers;
    export class EmployeeService extends EmployeeManagement.Services.BaseService {
         
        constructor() {
            super();
           
        }
        getEmployee(): Promise<models.Employee[]> {
            return this.getPromise<models.Employee>("http://localhost:4000/emp");
        }

        getEmployeeDepartment(): Promise<models.EmployeeDepartment[]> {
            return this.getPromise<models.EmployeeDepartment>("http://localhost:4000/emp/departments");
        }

        getEmployeeDetails(): Promise<models.EmployeeDetails[]> {
            return this.getPromise<models.EmployeeDetails>("http://localhost:4000/emp/details");
        }

        getEmployeeStatus(): Promise<models.EmployeeStatus[]> {
            return this.getPromise<models.EmployeeStatus>("http://localhost:4000/emp/status");
        }


        
    }
}
