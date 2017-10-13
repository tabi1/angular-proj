/// <reference path="ComponentReference.ts" />
module EmployeeManagement.Components {
    import models = EmployeeManagement.Models;
    import helper = EmployeeManagement.Helpers;
    import services = EmployeeManagement.Services;
    export class Employee {
        res: models.EmployeeDetailedInfo;
        constructor() {
            let employeeService = new services.EmployeeService();
            let employees: models.Employee[];
            let department: models.EmployeeDepartment[];
            let employeeDetails: models.EmployeeDetails[];
            let employeeStatus: models.EmployeeStatus[];
            helper.DynamicFunctions.showAddForm(false, "buttonSave", "buttonEdit");
            let addEmployee: EmployeeManagement.Components.AddEmployee;

            function initalizeAddEmployee() {
                addEmployee = new AddEmployee(department, employeeStatus);
            }

            Promise.all([employeeService.getEmployee(), employeeService.getEmployeeDepartment(), employeeService.
                getEmployeeDetails(), employeeService.getEmployeeStatus()]).then((values) => {
                    employees = values[0];
                    department = values[1];
                    employeeDetails = (values[2]);
                    employeeStatus = (values[3]);
                    initalizeAddEmployee();
                    getEmpDetails(employees, department, employeeStatus, employeeDetails);
                });
            let empDetailList: models.EmployeeDetailedInfo[];
            function getEmpDetails(employees: models.Employee[], department: models.EmployeeDepartment[],
                employeeStatus: models.EmployeeStatus[], employeeDetails: models.EmployeeDetails[]): void {
                empDetailList = employees.map((emp: models.Employee) => {
                    let employeeObj = new models.EmployeeDetailedInfo();
                    employeeObj.empId = emp.id;
                    employeeObj.fullName = emp.firstName + " " + emp.lastName;
                    employeeObj.deptName = helper.ArrayHelper.getById(department, emp.departmentId);
                    employeeObj.statusName = helper.ArrayHelper.getById(employeeStatus, emp.employeeStatus);
                    employeeObj.joiningDate = helper.ArrayHelper.getJoiningDate(employeeDetails, emp.id);
                    employeeObj.salary = helper.ArrayHelper.getEmployeeBySalary(employeeDetails, emp.id);
                    employeeObj.departmentId = emp.departmentId;
                    employeeObj.employeeStatus = emp.employeeStatus;
                    return employeeObj;
                });



                let deptDropdownId: string = "deptid"
                let deptDropdownData: string = helper.DynamicFunctions.createDropDown(department, deptDropdownId);
                document.getElementById("deptDropdown").innerHTML = deptDropdownData;

                let statusDropdownId: string = "statid";
                let statusDropdownData: string = helper.DynamicFunctions.createDropDown(employeeStatus, statusDropdownId);
                document.getElementById("statusDropdown").innerHTML = statusDropdownData;

                let deptDropdown: string = "depts"
                let deptData: string = helper.DynamicFunctions.createDropDown(department, deptDropdown);
                document.getElementById("secondDept").innerHTML = deptData;

                let statusDropdown: string = "statuss";
                let statusData: string = helper.DynamicFunctions.createDropDown(employeeStatus, statusDropdown);
                document.getElementById("secondStatus").innerHTML = statusData;

                let tableData: string = helper.DynamicFunctions.generateTable(empDetailList);
                document.getElementById("empTable").innerHTML = tableData;

                bindSelectRowEvents();
                bindDeleteRowEvent();
            }
            let searchEmp = () => {
                let nametxt: string = helper.ArrayHelper.getElementById<string>("nametxt", "string");
                let deptId: number = helper.ArrayHelper.getElementById<number>("deptid", "number");
                let statId: number = helper.ArrayHelper.getElementById<number>("statid", "number");
                let salarytxt: number = helper.ArrayHelper.getElementById<number>("salarytxt", "number");
                let selectedJoiningDate: string = helper.ArrayHelper.getElementById<string>("date", "string");
                var array = [];

                if (nametxt.length > 0)
                    array.push({ name: "fullName", value: nametxt });
                if (!isNaN(deptId))
                    array.push({ name: "departmentId", value: deptId });
                if (!isNaN(statId))
                    array.push({ name: "employeeStatus", value: statId });
                if (salarytxt > 1)
                    array.push({ name: "salary", value: salarytxt });
                if (selectedJoiningDate.length > 1)
                    array.push({ name: "joiningDate", value: selectedJoiningDate });
                let filteredResult: models.EmployeeDetailedInfo[] = empDetailList;
                array.forEach((item) => {
                    filteredResult = helper.ArrayHelper.getFilterArray(filteredResult, item.name, item.value);
                });

                if (filteredResult.length > 0) {
                    console.log(filteredResult);
                    let tableData = helper.DynamicFunctions.generateTable(filteredResult);
                    document.getElementById("empTable").innerHTML = tableData;
                    document.getElementById("para").innerHTML = "";
                }
                else {
                    document.getElementById("para").innerHTML = "No Match Found";
                    let tableData = helper.DynamicFunctions.generateTable([]);
                    document.getElementById("empTable").innerHTML = tableData;
                }
            }

            let add = () => {
                helper.DynamicFunctions.showAddForm(true, "buttonSave", "buttonEdit");
                let empObj = new models.EmployeeDetailedInfo();
                empObj.empId = empDetailList.length + 1;
                addEmployee.save(empObj, addEvent);
            }

            function addEvent(res) {
                empDetailList.push(res);
                let tableData = helper.DynamicFunctions.generateTable(empDetailList);
                document.getElementById("empTable").innerHTML = tableData;
                helper.DynamicFunctions.showAddForm(false, "buttonSave", "buttonEdit");
            }

            let selectedEmpId;
            let populateRow = (event) => {
                helper.DynamicFunctions.showAddForm(true, "buttonEdit", "buttonSave")
                selectedEmpId = event.target.parentNode.parentNode.cells[0].textContent;
                let selectedEmp = helper.ArrayHelper.getByRowId(empDetailList, parseInt(selectedEmpId));

                (document.getElementById('secondName') as HTMLInputElement).value = selectedEmp.fullName;
                (document.getElementById('depts') as HTMLInputElement).value = selectedEmp.departmentId;
                (document.getElementById('statuss') as HTMLInputElement).value = selectedEmp.employeeStatus;
                (document.getElementById('secondSalary') as HTMLInputElement).value = selectedEmp.salary;
                (document.getElementById('secondDate') as HTMLInputElement).value = selectedEmp.joiningDate;
                let empObj = new models.EmployeeDetailedInfo();
                empObj.empId = parseInt(selectedEmpId);
                addEmployee.edit(empObj, editEvent);
            }
            function editEvent(res: models.EmployeeDetailedInfo) {
                let selectedObjForEdit = empDetailList.find((i) => {
                    return i.empId == selectedEmpId;
                });
                selectedObjForEdit.fullName = res.fullName;
                selectedObjForEdit.deptName = res.deptName;
                selectedObjForEdit.statusName = res.statusName;
                selectedObjForEdit.joiningDate = res.joiningDate;
                selectedObjForEdit.salary = res.salary;
                selectedObjForEdit.departmentId = res.departmentId;
                selectedObjForEdit.employeeStatus = res.employeeStatus;
                empDetailList[selectedEmpId - 1] = selectedObjForEdit;

                let tableData = helper.DynamicFunctions.generateTable(empDetailList);
                document.getElementById("empTable").innerHTML = tableData;
                helper.DynamicFunctions.showAddForm(false, "buttonsave", "buttonEdit");
            }
            function bindSelectRowEvents() {
                let btns = document.getElementsByClassName("selectBtn");
                for (let i = 0; i < btns.length; i++) {
                    btns[i].addEventListener("click", populateRow);
                }
            }
            let deleteRow = (event) => {
                if (confirm("Are you sure?") == true) {
                    let selectedRowId = event.target.parentNode.parentNode.cells[0].textContent;
                    helper.DynamicFunctions.deleteById(empDetailList, parseInt(selectedRowId));
                    let tableData = helper.DynamicFunctions.generateTable(empDetailList);
                    document.getElementById("empTable").innerHTML = tableData;
                    helper.DynamicFunctions.showAddForm(false, "buttonsave", "buttonEdit");
                    bindDeleteRowEvent();
                } else {
                }
            }
            function bindDeleteRowEvent() {
                let delBtn = document.getElementsByClassName("deleteBtn");
                for (let i = 0; i < delBtn.length; i++) {
                    delBtn[i].addEventListener("click", deleteRow);
                }
            }
            let resetClick = () => {
                (document.getElementById('nametxt') as HTMLInputElement).value = "";
                (document.getElementById('deptid') as HTMLInputElement).value = "";
                (document.getElementById('statid') as HTMLInputElement).value = "";
                (document.getElementById('salarytxt') as HTMLInputElement).value = "";
                (document.getElementById('date') as HTMLInputElement).value = "";
                let tableData: string = helper.DynamicFunctions.generateTable(empDetailList);
                document.getElementById("para").innerHTML = "";
                document.getElementById("empTable").innerHTML = tableData;
            }
            let cancelForm = () => {
                (document.getElementById('secondName') as HTMLInputElement).value = "";
                (document.getElementById('depts') as HTMLInputElement).value = "";
                (document.getElementById('statuss') as HTMLInputElement).value = "";
                (document.getElementById('secondSalary') as HTMLInputElement).value = "";
                (document.getElementById('secondDate') as HTMLInputElement).value = "";
                helper.DynamicFunctions.showAddForm(false, "buttonEdit", "buttonSave")
            }
            document.getElementById("search").addEventListener("click", searchEmp);
            document.getElementById("btnAdd").addEventListener("click", add);
            document.getElementById("resetBtn").addEventListener("click", resetClick);
            document.getElementById("cancelbtn").addEventListener("click", cancelForm);
        }
    }
}


