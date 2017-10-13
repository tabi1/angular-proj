var EmployeeManagement;
(function (EmployeeManagement) {
    var Models;
    (function (Models) {
        class EmployeeDetailedInfo {
            constructor() {
            }
        }
        Models.EmployeeDetailedInfo = EmployeeDetailedInfo;
        class Employee {
        }
        Models.Employee = Employee;
        class EmployeeDepartment {
        }
        Models.EmployeeDepartment = EmployeeDepartment;
        class EmployeeDetails {
        }
        Models.EmployeeDetails = EmployeeDetails;
        class EmployeeStatus {
        }
        Models.EmployeeStatus = EmployeeStatus;
    })(Models = EmployeeManagement.Models || (EmployeeManagement.Models = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
class GenericArray {
}
var EmployeeManagement;
(function (EmployeeManagement) {
    var Helpers;
    (function (Helpers) {
        class ArrayHelper {
            static getById(array, id) {
                let selectedItem = array.find((item) => {
                    return item.id === id;
                });
                if (selectedItem)
                    return selectedItem.name;
                else
                    return "NA";
            }
            static getByPropertyName(arrayObj, propertyName, propertyValue) {
                return arrayObj.find((item) => {
                    return item[propertyName] === propertyValue;
                });
            }
            static getJoiningDate(det, id) {
                let stat = det.find((val) => {
                    return val.id == id;
                });
                if (stat) {
                    let date = new Date(stat.joiningDate);
                    let momentDate = moment(stat.joiningDate).format("YYYY-MM-DD");
                    return momentDate;
                }
                else
                    return "NA";
            }
            static getEmployeeBySalary(empDtl, id) {
                let selectedItem = empDtl.find((item) => {
                    return item.id === id;
                });
                if (selectedItem) {
                    return selectedItem.salary;
                }
                else
                    return "NA";
            }
            static getElementById(elementId, returnType) {
                let selectedElement = document.getElementById(elementId);
                if (selectedElement) {
                    if (returnType === "number") {
                        let convertToInteger = parseInt(selectedElement.value);
                        return convertToInteger;
                    }
                    else {
                        return selectedElement.value;
                    }
                }
            }
            static getByRowId(array, id) {
                let selectedItem = array.find((item) => {
                    return item.empId === id;
                });
                if (selectedItem) {
                    return selectedItem;
                }
                else
                    return "";
            }
            static getFilterArray(array, propertyName, propertyValue) {
                return array.filter((item) => {
                    if (isNaN(propertyValue)) {
                        var lowerPropertyValue = propertyValue.toLowerCase();
                        var arr = (item[propertyName]).toLowerCase();
                        return arr.includes(lowerPropertyValue);
                    }
                    else if (!isNaN(propertyValue)) {
                        return item[propertyName] === propertyValue;
                    }
                    else {
                        return item[propertyName] === propertyValue;
                    }
                });
            }
        }
        Helpers.ArrayHelper = ArrayHelper;
    })(Helpers = EmployeeManagement.Helpers || (EmployeeManagement.Helpers = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Helpers;
    (function (Helpers) {
        class DynamicFunctions {
            static showAddForm(visibilityFlag, currentBtn, hiddenBtn) {
                let addForm = document.getElementById("addForm");
                let savebtn = document.getElementById(currentBtn);
                let editBtn = document.getElementById(hiddenBtn);
                if (visibilityFlag) {
                    addForm.style.visibility = "visible";
                    editBtn.style.display = "none";
                }
                else {
                    addForm.style.visibility = "hidden";
                }
            }
            static deleteById(array, id) {
                let index = 0;
                let selectedItem = array.filter((item) => {
                    if (item.empId === id)
                        return item.empId === id;
                });
                for (let i = 0; i < selectedItem.length; i++) {
                    index = array.indexOf(selectedItem[i]);
                    array.splice(index, 1);
                }
            }
            static generateTable(array) {
                if (array && array.length === 0) {
                    return "";
                }
                let htmlContent = "<table border='.1' style='width:90%' class='datatable'>";
                let tableHeaders = Object.keys(array[0]);
                tableHeaders.push("action");
                let headerContent = "<tr bgcolor='lightblue'>";
                tableHeaders.forEach((header) => {
                    headerContent += "<th>" + header + "</th>";
                });
                headerContent += "</tr>";
                let tableBody = "";
                array.forEach((item) => {
                    tableBody += "<tr  class='add-form'>";
                    let i = 0;
                    tableHeaders.forEach((th) => {
                        if (i < 8) {
                            tableBody += "<th>" + item[th] + "</th>";
                            ++i;
                        }
                        else {
                            tableBody += "<th><input type='button' id='select' class='selectBtn' value='Select' /><input type='button' class='deleteBtn button-warning' value='Delete' /></th>";
                        }
                    });
                    tableBody += "</tr>";
                });
                htmlContent += headerContent + tableBody + "</table>";
                return htmlContent;
            }
            static createDropDown(arr, dropDownId) {
                if (arr && arr.length === 0) {
                    return "";
                }
                let htmlContent = "<select id=" + dropDownId + ">";
                let selected = "<option selected>select</option>";
                let optionValue = "";
                arr.forEach((item) => {
                    optionValue += "<option value=" + (item.id) + ">" + (item.name) + "</option>";
                });
                return htmlContent += selected + optionValue + "</select>";
            }
        }
        Helpers.DynamicFunctions = DynamicFunctions;
    })(Helpers = EmployeeManagement.Helpers || (EmployeeManagement.Helpers = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Services;
    (function (Services) {
        class BaseService {
            constructor() {
            }
            getPromise(url) {
                return new Promise((resolve, reject) => {
                    let xhttp = new XMLHttpRequest();
                    xhttp.onload = function () {
                        let parsedResp = JSON.parse(xhttp.responseText);
                        resolve(parsedResp);
                    };
                    xhttp.onerror = function () {
                        return xhttp.statusText;
                    };
                    xhttp.open("GET", url, true);
                    xhttp.send();
                });
            }
        }
        Services.BaseService = BaseService;
    })(Services = EmployeeManagement.Services || (EmployeeManagement.Services = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Services;
    (function (Services) {
        class EmployeeService extends EmployeeManagement.Services.BaseService {
            constructor() {
                super();
            }
            getEmployee() {
                return this.getPromise("http://localhost:4000/emp");
            }
            getEmployeeDepartment() {
                return this.getPromise("http://localhost:4000/emp/departments");
            }
            getEmployeeDetails() {
                return this.getPromise("http://localhost:4000/emp/details");
            }
            getEmployeeStatus() {
                return this.getPromise("http://localhost:4000/emp/status");
            }
        }
        Services.EmployeeService = EmployeeService;
    })(Services = EmployeeManagement.Services || (EmployeeManagement.Services = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Components;
    (function (Components) {
        var models = EmployeeManagement.Models;
        var helper = EmployeeManagement.Helpers;
        var services = EmployeeManagement.Services;
        class Employee {
            constructor() {
                let employeeService = new services.EmployeeService();
                let employees;
                let department;
                let employeeDetails;
                let employeeStatus;
                helper.DynamicFunctions.showAddForm(false, "buttonSave", "buttonEdit");
                let addEmployee;
                function initalizeAddEmployee() {
                    addEmployee = new Components.AddEmployee(department, employeeStatus);
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
                let empDetailList;
                function getEmpDetails(employees, department, employeeStatus, employeeDetails) {
                    empDetailList = employees.map((emp) => {
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
                    let deptDropdownId = "deptid";
                    let deptDropdownData = helper.DynamicFunctions.createDropDown(department, deptDropdownId);
                    document.getElementById("deptDropdown").innerHTML = deptDropdownData;
                    let statusDropdownId = "statid";
                    let statusDropdownData = helper.DynamicFunctions.createDropDown(employeeStatus, statusDropdownId);
                    document.getElementById("statusDropdown").innerHTML = statusDropdownData;
                    let deptDropdown = "depts";
                    let deptData = helper.DynamicFunctions.createDropDown(department, deptDropdown);
                    document.getElementById("secondDept").innerHTML = deptData;
                    let statusDropdown = "statuss";
                    let statusData = helper.DynamicFunctions.createDropDown(employeeStatus, statusDropdown);
                    document.getElementById("secondStatus").innerHTML = statusData;
                    let tableData = helper.DynamicFunctions.generateTable(empDetailList);
                    document.getElementById("empTable").innerHTML = tableData;
                    bindSelectRowEvents();
                    bindDeleteRowEvent();
                }
                let searchEmp = () => {
                    let nametxt = helper.ArrayHelper.getElementById("nametxt", "string");
                    let deptId = helper.ArrayHelper.getElementById("deptid", "number");
                    let statId = helper.ArrayHelper.getElementById("statid", "number");
                    let salarytxt = helper.ArrayHelper.getElementById("salarytxt", "number");
                    let selectedJoiningDate = helper.ArrayHelper.getElementById("date", "string");
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
                    let filteredResult = empDetailList;
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
                };
                let add = () => {
                    helper.DynamicFunctions.showAddForm(true, "buttonSave", "buttonEdit");
                    let empObj = new models.EmployeeDetailedInfo();
                    empObj.empId = empDetailList.length + 1;
                    addEmployee.save(empObj, addEvent);
                };
                function addEvent(res) {
                    empDetailList.push(res);
                    let tableData = helper.DynamicFunctions.generateTable(empDetailList);
                    document.getElementById("empTable").innerHTML = tableData;
                    helper.DynamicFunctions.showAddForm(false, "buttonSave", "buttonEdit");
                }
                let selectedEmpId;
                let populateRow = (event) => {
                    helper.DynamicFunctions.showAddForm(true, "buttonEdit", "buttonSave");
                    selectedEmpId = event.target.parentNode.parentNode.cells[0].textContent;
                    let selectedEmp = helper.ArrayHelper.getByRowId(empDetailList, parseInt(selectedEmpId));
                    document.getElementById('secondName').value = selectedEmp.fullName;
                    document.getElementById('depts').value = selectedEmp.departmentId;
                    document.getElementById('statuss').value = selectedEmp.employeeStatus;
                    document.getElementById('secondSalary').value = selectedEmp.salary;
                    document.getElementById('secondDate').value = selectedEmp.joiningDate;
                    let empObj = new models.EmployeeDetailedInfo();
                    empObj.empId = parseInt(selectedEmpId);
                    addEmployee.edit(empObj, editEvent);
                };
                function editEvent(res) {
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
                    }
                    else {
                    }
                };
                function bindDeleteRowEvent() {
                    let delBtn = document.getElementsByClassName("deleteBtn");
                    for (let i = 0; i < delBtn.length; i++) {
                        delBtn[i].addEventListener("click", deleteRow);
                    }
                }
                let resetClick = () => {
                    document.getElementById('nametxt').value = "";
                    document.getElementById('deptid').value = "";
                    document.getElementById('statid').value = "";
                    document.getElementById('salarytxt').value = "";
                    document.getElementById('date').value = "";
                    let tableData = helper.DynamicFunctions.generateTable(empDetailList);
                    document.getElementById("para").innerHTML = "";
                    document.getElementById("empTable").innerHTML = tableData;
                };
                let cancelForm = () => {
                    document.getElementById('secondName').value = "";
                    document.getElementById('depts').value = "";
                    document.getElementById('statuss').value = "";
                    document.getElementById('secondSalary').value = "";
                    document.getElementById('secondDate').value = "";
                    helper.DynamicFunctions.showAddForm(false, "buttonEdit", "buttonSave");
                };
                document.getElementById("search").addEventListener("click", searchEmp);
                document.getElementById("btnAdd").addEventListener("click", add);
                document.getElementById("resetBtn").addEventListener("click", resetClick);
                document.getElementById("cancelbtn").addEventListener("click", cancelForm);
            }
        }
        Components.Employee = Employee;
    })(Components = EmployeeManagement.Components || (EmployeeManagement.Components = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    var Components;
    (function (Components) {
        var helper = EmployeeManagement.Helpers;
        class AddEmployee {
            constructor(department, employeeStatus) {
                let empDetails;
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
                };
                let edit = () => {
                    empDetails.fullName = helper.ArrayHelper.getElementById("secondName", "string");
                    empDetails.departmentId = helper.ArrayHelper.getElementById("depts", "number");
                    empDetails.deptName = helper.ArrayHelper.getById(department, empDetails.departmentId);
                    empDetails.employeeStatus = helper.ArrayHelper.getElementById("statuss", "number");
                    empDetails.statusName = helper.ArrayHelper.getById(employeeStatus, empDetails.employeeStatus);
                    empDetails.salary = helper.ArrayHelper.getElementById("secondSalary", "number");
                    empDetails.joiningDate = helper.ArrayHelper.getElementById("secondDate", "string");
                    this.addEvent(empDetails);
                };
                document.getElementById("buttonSave").addEventListener("click", save);
                document.getElementById('buttonEdit').addEventListener("click", edit);
                function saveButton(result, event) {
                    this.addEvent = event;
                    empDetails = result;
                }
                function editButton(result, event) {
                    this.addEvent = event;
                    empDetails = result;
                }
            }
        }
        Components.AddEmployee = AddEmployee;
    })(Components = EmployeeManagement.Components || (EmployeeManagement.Components = {}));
})(EmployeeManagement || (EmployeeManagement = {}));
var EmployeeManagement;
(function (EmployeeManagement) {
    class App {
        constructor() {
            const employee = new EmployeeManagement.Components.Employee();
        }
    }
    new App();
})(EmployeeManagement || (EmployeeManagement = {}));
