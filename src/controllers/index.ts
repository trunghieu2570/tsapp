import { Controller, Get } from "@overnightjs/core";
import { Request, Response} from "express";

@Controller('/')
export class MainController {
    @Get()
    get(req: Request, res: Response): any {
        res.render('index')
    }
}