import Controller from "./controller";
import { Request, Response } from "express";

export default class TestController extends Controller {
    protected routes(): void {
        this.get('/test', (req: Request, res: Response) => {
            res.render('test');
        });
    }
}