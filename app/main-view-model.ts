import { Observable } from 'data/observable';
import * as frame from "ui/frame";
import { StackLayout } from "ui/layouts/stack-layout";
import { FlexboxLayout } from "ui/layouts/flexbox-layout";
import { Label } from "ui/label";
import { Color } from "color";

const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export class HelloWorldModel extends Observable {

    private _counter: number;
    private _message: string;
    private _page;
    private _viewIds: string[];

    constructor(page) {
        super();
        this._page = page;
        this._viewIds = [];
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange('message', value)
        }
    }

    public tapLogs() {
        console.log(this.generateRandomString(this.generateRandomInteger(5, 300), true));
    }

    public navigateToNetworkPage() {
        this.navigateWithContext("network/network-page");
    }

    public addViews() {
        let container: FlexboxLayout = <FlexboxLayout>this.getViewById("flexboxContainer");

        if (container) {
            let newView = new StackLayout();
            newView.backgroundColor = this.generateRandomColor();
            newView.minHeight = this.generateRandomInteger();
            newView.margin = this.generateRandomInteger(0, 10);
            newView.color = new Color(this.generateRandomColor());
            let newLabel = new Label();
            newLabel.text = this.generateRandomString(this.generateRandomInteger(20, 100), true);
            newLabel.textWrap = true;
            newView.addChild(newLabel);
            let viewId = this.generateRandomString(12);
            newView.id = viewId;

            this._viewIds.push(viewId);

            container.addChild(newView);
        }
    }

    public removeView() {
        let container: FlexboxLayout = <FlexboxLayout>this.getViewById("flexboxContainer");

        if (container) {
            if (this._viewIds.length < 1) {
                alert("No elements in the parent flexbox container to remove views from.");
                return;
            }
            
            let randomViewIdIndex = this.generateRandomInteger(0, this._viewIds.length - 1);
            let randomViewId = this._viewIds[randomViewIdIndex];

            let child: any = frame.getViewById(container, randomViewId);

            container.removeChild(child);

            this._viewIds.splice(randomViewIdIndex, 1);
        }
    }

    public debugCodeBlock1() {
        const limit = 2000;
        let result = this.generateRandomString(limit);
        return this.transformDebugCodeBlock1Result(result);
    }

    private generateRandomInteger(start: number = 1, end: number = 200): number {
        return Math.floor(Math.random() * end) + start;
    }

    private generateRandomString(len: number = 6, includeSpaces: boolean = false) {
        let result = "";

        let availableCharacters = possibleChars;
        
        if (includeSpaces) {
            availableCharacters += "           ";
        }

        for (let i = 0; i < len; i++) {
            result += availableCharacters.charAt(Math.floor(Math.random() * availableCharacters.length));
        }

        return result;
    }

    private generateRandomColor() {
        return "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    }

    private transformDebugCodeBlock1Result(val) {
        return val + "\n";
    }

    private navigateWithContext(moduleName: string, context: any = {}) {
        frame.topmost().navigate({
            moduleName: moduleName,
            context: context,
            clearHistory: false
        });
    }

    private getViewById(id: string) {
        return frame.getViewById(this._page, id);
    }
}