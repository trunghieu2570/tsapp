import { Request, Response, Router } from "express";
import Controller from "./controller";

export default class IndexController extends Controller {
    constructor() {
        super();
    }
    protected routes(): void {
        this.get('/', (req: Request, res: Response) => {
            res.render('index');
        });
    }
}