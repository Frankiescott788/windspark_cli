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
const prompts_1 = require("@clack/prompts");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, prompts_1.intro)('Welcome to My CLI Tool!');
        const name = yield (0, prompts_1.text)({
            message: 'What is your name?',
            placeholder: 'Type your name...',
        });
        const proceed = yield (0, prompts_1.confirm)({
            message: `Hi ${name}, do you want to proceed?`,
        });
        if (!proceed) {
            (0, prompts_1.outro)('Okay, bye!');
            process.exit(0);
        }
        (0, prompts_1.outro)('Thanks for using My CLI Tool!');
    });
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
