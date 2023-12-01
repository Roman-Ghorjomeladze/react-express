"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
init();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app_1.app.listen(3001, () => {
                console.log('Express App Listening on Port 3001');
            });
        }
        catch (error) {
            console.error(`An error occurred: ${JSON.stringify(error)}`);
            process.exit(1);
        }
    });
}
