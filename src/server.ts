import { Server } from "@overnightjs/core";
import * as controllers from "./controllers";
import * as path from "path";

export default class AppServer extends Server {
    constructor() {
        super();
        this.setupControllers();
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
    }

    private setupControllers(): void {
        const controllerInstances = [];
        for (const name of Object.keys(controllers)) {
            const controller = (controllers as any)[name];
            if (typeof controller === 'function') {
                controllerInstances.push(new controller());
            }
        }
        super.addControllers(controllerInstances);
    }
    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        });
    }
}