"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = require("express");
const app_module_1 = require("./app.module");
let cachedApp;
const handler = async (req, res) => {
    if (!cachedApp) {
        const expressApp = (0, express_1.default)();
        const adapter = new platform_express_1.ExpressAdapter(expressApp);
        const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
        await app.init();
        cachedApp = expressApp;
    }
    return cachedApp(req, res);
};
exports.handler = handler;
//# sourceMappingURL=main.vercel.js.map