import { EventData, fromObjectRecursive } from 'data/observable';
import { Page } from 'ui/page';
import * as http from "tns-core-modules/http";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    /*
    This gets a reference this page’s <Page> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <Page>args.object;

    /*
    A page’s bindingContext is an object that should be used to perform
    data binding between XML markup and TypeScript code. Properties
    on the bindingContext can be accessed using the {{ }} syntax in XML.
    In this example, the {{ message }} and {{ onTap }} bindings are resolved
    against the object returned by createViewModel().

    You can learn more about data binding in NativeScript at
    https://docs.nativescript.org/core-concepts/data-binding.
    */
    page.bindingContext = fromObjectRecursive({
        imageSrc: "",
        getNoBody() {
            http.getJSON("https://httpbin.org/get").then((res) => {
                console.log(res);
            }, (rej) => {
                alert("Failed to make request to remote API. " + rej);
            }).catch((err) => {
                alert("Failed to make request to remote API. " + err);
            });
        },
        getWithBody() {
            const requestOptions = {
                url: "https://httpbin.org/get",
                headers: {
                    "X-Arbitrary-Header": "My custom Arbitrary Header value"
                },
                method: "GET",
            }
            http.request(requestOptions).then((res) => {
                if (res.statusCode >= 200 && res.statusCode < 400) {
                    let jsonRes = res.content.toJSON();

                    console.log(jsonRes);
                } else {
                    alert("Failed fetching response. Code: " + res.statusCode);
                }
            }, (rej) => {
                alert("Failed to make request to remote API. " + rej);
            }).catch((err) => {
                alert("Failed to make request to remote API. " + err);
            });
        },
        postHeaders() {
            const requestOptions = {
                url: "https://httpbin.org/post",
                headers: {
                    Authorization: "Bearer AAAAAAAAAAAAAAAAAAAAAAqV2AAAAAAAAW%2BRfD5YPhcJmnEQErGpBw2gDGA%3DxOTFG633CY24wqx1Z1I7zdaJDh0He5UNF0n6D0RvcM3T1nKmYw",
                    "X-Arbitrary-Header": "My custom Arbitrary Header value"
                },
                method: "POST",
                content: JSON.stringify({
                    user: "user name",
                    password: "password",
                    token: "123718idjskmz"
                })
            }
            http.request(requestOptions).then((res) => {
                if (res.statusCode >= 200 && res.statusCode < 400) {
                    let jsonRes = res.content.toJSON();

                    console.log(jsonRes);
                } else {
                    alert("Failed fetching response. Code: " + res.statusCode);
                }
            }, (rej) => {
                alert("Failed to make request to remote API. " + rej);
            }).catch((err) => {
                alert("Failed to make request to remote API. " + err);
            });
        },
        getUnauthorized() {
            http.getJSON("https://httpbin.org/status/403").then((res) => {
                console.log(res);
            }, (rej) => {
                alert("Failed to make request to remote API. " + rej);
            }).catch((err) => {
                alert("Failed to make request to remote API. " + err);
            });
        },
        getDelayed() {
            http.getJSON("https://httpbin.org/delay/3").then((res) => {
                console.log(res);
            }, (rej) => {
                alert("Failed to make request to remote API. " + rej);
            }).catch((err) => {
                alert("Failed to make request to remote API. " + err);
            });
        },
        getImage() {
            http.getImage("https://httpbin.org/image/png").then((res) => {
                console.log(res);
                this.set("imageSrc", res);
            }, (rej) => {
                alert("Failed to make request to remote API. " + rej);
            }).catch((err) => {
                alert("Failed to make request to remote API. " + err);
            });
        },
        getBinaryData() {
            const requestOptions = {
                url: "https://httpbin.org/bytes/2048",
                headers: {
                },
                method: "GET",
            }
            http.request(requestOptions).then((res) => {
                if (res.statusCode >= 200 && res.statusCode < 400) {
                    let jsonRes = res.content.raw;

                    console.log(jsonRes);
                } else {
                    alert("Failed fetching response. Code: " + res.statusCode);
                }
            }, (rej) => {
                alert("Failed to make request to remote API. " + rej);
            }).catch((err) => {
                alert("Failed to make request to remote API. " + err);
            });
        }
    });
}