/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import "./bundle-config";
import * as app from 'tns-core-modules/application';

console.log("Start the debug session with the --debug-brk flag, and don't comment the 'debugger' statement in order to pause this early of application execution.");

debugger;

app.run({ moduleName: 'app-root' });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
