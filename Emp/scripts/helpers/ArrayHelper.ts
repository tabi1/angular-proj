/// <reference path="HelperReference.ts" />

class GenericArray {
    id: number;
    name: string;
}

module EmployeeManagement.Helpers {
    export class ArrayHelper {
        static getById(array, id) {
            let selectedItem = array.find((item) => {
                return item.id === id;
            });
            if (selectedItem)
                return selectedItem.name;
            else
                return "NA";
        }

        // static getById<A extends GenericArray>(arrayObj: Array<A>, id: number) {
        //     return arrayObj.find((item: A) => {
        //         return item.id === id;
        //     });
        // }

        static getByPropertyName<T, U>(arrayObj: Array<T>, propertyName: string, propertyValue: U) {
            return arrayObj.find((item: T) => {
                return item[propertyName] === propertyValue;
            });
        }

        static getJoiningDate(det, id) {
            let stat = det.find((val) => {
                return val.id == id;
            })
            if (stat) {
                let date = new Date(stat.joiningDate);
                let momentDate = moment(stat.joiningDate).format("YYYY-MM-DD");
                return momentDate;
            } else
                return "NA";
        }

        static getEmployeeBySalary(empDtl, id) {
            let selectedItem = empDtl.find((item) => {
                return item.id === id;
            });

            if (selectedItem) {
                return selectedItem.salary;
            } else
                return "NA";

        }

        static getElementById<T>(elementId: string, returnType: string): T {

            let selectedElement: any = document.getElementById(elementId);

            if (selectedElement) {

                if (returnType === "number") {
                    let convertToInteger: any = parseInt(selectedElement.value);
                    return convertToInteger;
                } else {
                    return selectedElement.value;
                }
            }
        }

        static getByRowId(array, id: number) {
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
                } else if (!isNaN(propertyValue)) {
                    return item[propertyName] === propertyValue;
                }
                else {
                    return item[propertyName] === propertyValue;
                }
            });
        }
    }
}