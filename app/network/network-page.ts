import { EventData, fromObjectRecursive } from 'tns-core-modules/data/observable';
import { Page } from 'tns-core-modules/ui/page';
import * as http from "tns-core-modules/http";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
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
