import * as path from "path";
import { Application } from "express";
import express from 'express';
import IndexController from './controllers/index';
import TestController from "./controllers/test";


export default class AppServer {
    public app: Application
    constructor() {
        this.app = express();
        this.setupControllers();
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
        this.app.use('/static', express.static(path.join(__dirname, 'public')));
    }

    private setupControllers(): void {
        this.app.use((new IndexController()).router);
        this.app.use((new TestController()).router);
    }

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        });
    }
}