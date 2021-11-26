/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/database.ts":
/*!********************************!*\
  !*** ./src/server/database.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.FactionModel = exports.FactionSchema = void 0;\r\nconst typegoose_1 = __webpack_require__(/*! @typegoose/typegoose */ \"@typegoose/typegoose\");\r\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\r\n// Схема для базы данных MongoDB;\r\nclass FactionSchema {\r\n    constructor(name) {\r\n        this.name = name;\r\n        this.players = [];\r\n    }\r\n}\r\n__decorate([\r\n    (0, typegoose_1.prop)(),\r\n    __metadata(\"design:type\", String)\r\n], FactionSchema.prototype, \"name\", void 0);\r\n__decorate([\r\n    (0, typegoose_1.prop)({ type: [String] }),\r\n    __metadata(\"design:type\", Array)\r\n], FactionSchema.prototype, \"players\", void 0);\r\nexports.FactionSchema = FactionSchema;\r\n// Модель фракции;\r\nexports.FactionModel = (0, typegoose_1.getModelForClass)(FactionSchema);\r\n(async () => {\r\n    console.log(\"connect to db...\");\r\n    console.log(mongoose_1.default.connect);\r\n    mp.events.delayInitialization = true; // Задержать инициализацию сервера\r\n    await mongoose_1.default.connect(\"mongodb://localhost:27017/\", { dbName: \"test\" });\r\n})();\r\n\n\n//# sourceURL=webpack://test/./src/server/database.ts?");

/***/ }),

/***/ "./src/server/decorators.ts":
/*!**********************************!*\
  !*** ./src/server/decorators.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\n// Декораторы для эвентов и команд Rage Multiplayer;\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.event = exports.cmd = void 0;\r\nconst cmd = (cmdName, description) => {\r\n    // cmdName - название команды, description можно использовать для подсказок в чате;\r\n    return (target, propertyKey) => {\r\n        mp.events.addCommand(cmdName !== null && cmdName !== void 0 ? cmdName : propertyKey, Reflect.get(target, propertyKey));\r\n    };\r\n};\r\nexports.cmd = cmd;\r\nconst event = (name) => {\r\n    return (target, propertyKey) => {\r\n        mp.events.add(name !== null && name !== void 0 ? name : propertyKey, Reflect.get(target, propertyKey));\r\n    };\r\n};\r\nexports.event = event;\r\n\n\n//# sourceURL=webpack://test/./src/server/decorators.ts?");

/***/ }),

/***/ "./src/server/faction.ts":
/*!*******************************!*\
  !*** ./src/server/faction.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\nvar __metadata = (this && this.__metadata) || function (k, v) {\r\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Faction = void 0;\r\nconst database_1 = __webpack_require__(/*! ./database */ \"./src/server/database.ts\");\r\nconst decorators_1 = __webpack_require__(/*! ./decorators */ \"./src/server/decorators.ts\");\r\n/*\r\n *Класс фракции\r\n */\r\nclass Faction {\r\n    constructor(factionName, location) {\r\n        // Инициализация фракции\r\n        this.inited = false;\r\n        this.name = factionName;\r\n        this.location = location;\r\n        Faction.list.push(this);\r\n        this.init();\r\n    }\r\n    async init() {\r\n        console.log(\"faction\", this.name, \"init...\");\r\n        let doc = await database_1.FactionModel.findOne({ name: this.name });\r\n        if (!doc) {\r\n            const schema = new database_1.FactionSchema(this.name);\r\n            doc = await database_1.FactionModel.create(schema);\r\n        }\r\n        this.inited = true;\r\n        this.document = doc;\r\n        if (!Faction.list.find((x) => !x.inited)) {\r\n            // Если все фракции закончили инициализацию, то инициализировать сервер\r\n            mp.events.delayInitialization = false;\r\n            console.log(\"Factions inited\");\r\n        }\r\n    }\r\n    // Создание расширенных полей PlayerMp;\r\n    playerCreated(entity) {\r\n        if (entity.type === \"player\") {\r\n            const player = entity;\r\n            player.faction = null;\r\n            player.inviteToFaction = null;\r\n        }\r\n    }\r\n    // Спавн игрока в локации фракции;\r\n    spawn(player) {\r\n        if (this.document.players.includes(player.rgscId)) {\r\n            player.spawn(this.location);\r\n            player.faction = this;\r\n        }\r\n    }\r\n    async invite(player) {\r\n        this.document.players.push(player.rgscId);\r\n        player.faction = this;\r\n        player.inviteToFaction = null;\r\n        await this.document.save();\r\n    }\r\n    async kick(player) {\r\n        this.document.players = this.document.players.filter((x) => x !== player.rgscId); // Удаление игрока из списка участников фракции\r\n        player.faction = null;\r\n        await this.document.save();\r\n    }\r\n    // Команды\r\n    static cmdAdminInvite(player, _, factionName) {\r\n        const faction = this.list.find((x) => x.name === factionName);\r\n        if (!faction) {\r\n            player.outputChatBox(\"Фракции с таким названием не существует\");\r\n            return;\r\n        }\r\n        faction.invite(player);\r\n        player.outputChatBox(\"Вы были добавлены во фракцию \" + faction.name);\r\n    }\r\n    static cmdInvite(player, _, id) {\r\n        const targetPlayer = mp.players.at(+id);\r\n        if (!player.faction) {\r\n            player.outputChatBox(\"Вы не состоите во фракции\");\r\n            return;\r\n        }\r\n        if (!targetPlayer) {\r\n            player.outputChatBox(\"Такого игрока нет в сети\");\r\n            return;\r\n        }\r\n        if (targetPlayer.inviteToFaction) {\r\n            player.outputChatBox(\"Игрок уже имеет активное приглашение во фракцию\");\r\n        }\r\n        else {\r\n            targetPlayer.inviteToFaction = player.faction;\r\n        }\r\n    }\r\n    static cmdKick(player, _, id) {\r\n        const targetPlayer = mp.players.at(+id);\r\n        const faction = player.faction;\r\n        if (targetPlayer && targetPlayer.faction === faction && faction) {\r\n            faction.kick(targetPlayer);\r\n            player.outputChatBox(\"Вы кикнули игрока из фракции\");\r\n            return;\r\n        }\r\n        else {\r\n            player.outputChatBox(\"Игрока с таким ID нет в сети, либо у Вас нет прав кикнуть его\");\r\n            return;\r\n        }\r\n    }\r\n    static cmdAccept(player) {\r\n        if (player.faction) {\r\n            player.outputChatBox(\"Вы состоите во фракции\");\r\n            return;\r\n        }\r\n        if (!player.inviteToFaction) {\r\n            player.outputChatBox(\"У Вас нет активных приглашений во фракцию\");\r\n            return;\r\n        }\r\n        player.outputChatBox(\"Вы вступили во фракцию \" + player.inviteToFaction.name);\r\n        player.inviteToFaction.invite(player);\r\n    }\r\n    static cmdDeciline(player) {\r\n        if (player.inviteToFaction) {\r\n            player.inviteToFaction = null;\r\n            player.outputChatBox(\"Вы отклонили приглашение во фракцию\");\r\n        }\r\n        else {\r\n            player.outputChatBox(\"У Вас нет активных приглашений во фракцию\");\r\n        }\r\n    }\r\n}\r\nFaction.list = []; // Список всех фракций;\r\n__decorate([\r\n    (0, decorators_1.event)(\"entityCreated\" /* ENTITY_CREATED */),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], Faction.prototype, \"playerCreated\", null);\r\n__decorate([\r\n    (0, decorators_1.event)(\"playerJoin\" /* PLAYER_JOIN */),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], Faction.prototype, \"spawn\", null);\r\n__decorate([\r\n    (0, decorators_1.cmd)(\"adminInvite\", \"Пригласить себя во фракцию\"),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object, String, String]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], Faction, \"cmdAdminInvite\", null);\r\n__decorate([\r\n    (0, decorators_1.cmd)(\"invite\", \"Пригласить игрока во фракцию\"),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object, String, String]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], Faction, \"cmdInvite\", null);\r\n__decorate([\r\n    (0, decorators_1.cmd)(\"kick\", \"Выгнать игрока из фракции\"),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object, String, String]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], Faction, \"cmdKick\", null);\r\n__decorate([\r\n    (0, decorators_1.cmd)(\"accept\", \"Принять приглашение во фракцию\"),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], Faction, \"cmdAccept\", null);\r\n__decorate([\r\n    (0, decorators_1.cmd)(\"deciline\", \"Отклонить приглашение во фракцию\"),\r\n    __metadata(\"design:type\", Function),\r\n    __metadata(\"design:paramtypes\", [Object]),\r\n    __metadata(\"design:returntype\", void 0)\r\n], Faction, \"cmdDeciline\", null);\r\nexports.Faction = Faction;\r\n// Создание экземпляра класса фракции LSPD\r\nnew Faction(\"LSPD\", new mp.Vector3(0, 0, 0));\r\n\n\n//# sourceURL=webpack://test/./src/server/faction.ts?");

/***/ }),

/***/ "./src/server/index.ts":
/*!*****************************!*\
  !*** ./src/server/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n__webpack_require__(/*! ./faction */ \"./src/server/faction.ts\");\r\n\n\n//# sourceURL=webpack://test/./src/server/index.ts?");

/***/ }),

/***/ "@typegoose/typegoose":
/*!***************************************!*\
  !*** external "@typegoose/typegoose" ***!
  \***************************************/
/***/ ((module) => {

module.exports = require("@typegoose/typegoose");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/index.ts");
/******/ 	
/******/ })()
;