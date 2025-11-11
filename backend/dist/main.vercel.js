"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = require("express");
const app_module_1 = require("./app.module");
let cachedApp;
async function handler(req, res) {
    if (!cachedApp) {
        const expressApp = (0, express_1.default)();
        const adapter = new platform_express_1.ExpressAdapter(expressApp);
        const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
        app.enableCors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true,
        });
        await app.init();
        cachedApp = expressApp;
    }
    return cachedApp(req, res);
}
//# sourceMappingURL=main.vercel.js.map