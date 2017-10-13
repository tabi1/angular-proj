/// <reference path="ServiceReference.ts" />
module EmployeeManagement.Services {
    export class BaseService {
        constructor() {

        }
        protected getPromise<T>(url: string): Promise<T[]> {
            return new Promise((resolve, reject) => {

                let xhttp = new XMLHttpRequest();
                xhttp.onload = function () {
                    let parsedResp = JSON.parse(xhttp.responseText);
                    resolve(parsedResp);
                };
                xhttp.onerror = function () {
                    return xhttp.statusText;
                }
                xhttp.open("GET", url, true);
                xhttp.send();
            });
        }
    }
}