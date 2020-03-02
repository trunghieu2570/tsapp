import { Request, Response } from 'express';
import Controller from './controller';

export default class Post extends Controller {
    constructor() {
        super();
    }

    protected routes(): void {
        this.get('/post/:id', (req: Request, res: Response) => {
            switch (req.query.action) {
                case 'edit':
                    res.send('editing...');
                    break;
                default:
                    res.render('post', { id: req.params.id });
                    break;
            }

        });

    }
}