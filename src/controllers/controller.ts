import { Router } from "express";

/**
 * Base controller class.
 * Middleware method should be overrided.
 */
export default class Controller {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    /**
     * middleware
     */
    protected routes(): void { }

    /**
     * Call router get method
     * @param path router path
     * @param handlers list of handlers
     */
    protected get(path: string, handlers: any): void {
        this.router.get(path, handlers);
    }

    /**
     * Call router post method
     * @param path router path
     * @param handlers list of handlers
     */
    protected post(path: string, handlers: any): void {
        this.router.post(path, handlers);
    }


}