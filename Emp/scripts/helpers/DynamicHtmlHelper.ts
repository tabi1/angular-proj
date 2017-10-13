/// <reference path="HelperReference.ts" />

module EmployeeManagement.Helpers {
    export class DynamicFunctions {
        // constructor() {}
        static showAddForm(visibilityFlag: Boolean,currentBtn,hiddenBtn) {
            let addForm = document.getElementById("addForm");
            let savebtn = document.getElementById(currentBtn);
            let editBtn = document.getElementById(hiddenBtn);
            if (visibilityFlag) {
                addForm.style.visibility = "visible";
                editBtn.style.display = "none";

            } else {
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

        static generateTable(array): string {

            if (array && array.length === 0) { return ""; }

            let htmlContent = "<table border='.1' style='width:90%' class='datatable'>";
            let tableHeaders = Object.keys(array[0]);
            tableHeaders.push("action");
           // tableHeaders.push("delete");

            /* Table header */
            let headerContent = "<tr bgcolor='lightblue'>";
            tableHeaders.forEach((header) => {
                headerContent += "<th>" + header + "</th>";
            });
            headerContent += "</tr>";

            /* Table Body */
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

            /* generate complete table and return */
            htmlContent += headerContent + tableBody + "</table>";

            return htmlContent;
        }

        /* Dropdown Creation*/
        static createDropDown(arr, dropDownId): string {
            if (arr && arr.length === 0) { return ""; }
            let htmlContent = "<select id=" + dropDownId + ">";
            let selected = "<option selected>select</option>"
            let optionValue = "";
            arr.forEach((item) => {
                optionValue += "<option value=" + (item.id) + ">" + (item.name) + "</option>";
            });
            return htmlContent += selected + optionValue + "</select>";
        }

    }
}