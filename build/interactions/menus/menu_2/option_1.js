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
module.exports = {
    menu_id: "select2",
    menu_value: "first_option",
    description: "Option 1 of menu 2",
    execute(interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            return interaction.reply({ content: 'Thing one was selected from menu two!', components: [], ephemeral: false });
        });
    }
};
