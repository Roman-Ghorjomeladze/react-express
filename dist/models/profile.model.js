"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const contract_model_1 = require("./contract.model");
let Profile = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({
            timestamps: true,
            tableName: "Profile",
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = sequelize_typescript_1.Model;
    let _instanceExtraInitializers = [];
    let _firstName_decorators;
    let _firstName_initializers = [];
    let _lastName_decorators;
    let _lastName_initializers = [];
    let _profession_decorators;
    let _profession_initializers = [];
    let _balance_decorators;
    let _balance_initializers = [];
    let _type_decorators;
    let _type_initializers = [];
    let _Contractors_decorators;
    let _Contractors_initializers = [];
    let _Clients_decorators;
    let _Clients_initializers = [];
    var Profile = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.firstName = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _firstName_initializers, void 0));
            this.lastName = __runInitializers(this, _lastName_initializers, void 0);
            this.profession = __runInitializers(this, _profession_initializers, void 0);
            this.balance = __runInitializers(this, _balance_initializers, void 0);
            this.type = __runInitializers(this, _type_initializers, void 0);
            this.Contractors = __runInitializers(this, _Contractors_initializers, void 0);
            this.Clients = __runInitializers(this, _Clients_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "Profile");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _firstName_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false,
            })];
        _lastName_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false,
            })];
        _profession_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false,
            })];
        _balance_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.DECIMAL(12, 2),
                allowNull: false,
            })];
        _type_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.ENUM,
                allowNull: false,
            })];
        _Contractors_decorators = [(0, sequelize_typescript_1.HasMany)(() => contract_model_1.Contract, { foreignKey: 'ContractorId', as: 'Contractor' })];
        _Clients_decorators = [(0, sequelize_typescript_1.HasMany)(() => contract_model_1.Contract, { foreignKey: 'ClientId', as: 'Client' })];
        __esDecorate(null, null, _firstName_decorators, { kind: "field", name: "firstName", static: false, private: false, access: { has: obj => "firstName" in obj, get: obj => obj.firstName, set: (obj, value) => { obj.firstName = value; } }, metadata: _metadata }, _firstName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _lastName_decorators, { kind: "field", name: "lastName", static: false, private: false, access: { has: obj => "lastName" in obj, get: obj => obj.lastName, set: (obj, value) => { obj.lastName = value; } }, metadata: _metadata }, _lastName_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _profession_decorators, { kind: "field", name: "profession", static: false, private: false, access: { has: obj => "profession" in obj, get: obj => obj.profession, set: (obj, value) => { obj.profession = value; } }, metadata: _metadata }, _profession_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _balance_decorators, { kind: "field", name: "balance", static: false, private: false, access: { has: obj => "balance" in obj, get: obj => obj.balance, set: (obj, value) => { obj.balance = value; } }, metadata: _metadata }, _balance_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type, set: (obj, value) => { obj.type = value; } }, metadata: _metadata }, _type_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _Contractors_decorators, { kind: "field", name: "Contractors", static: false, private: false, access: { has: obj => "Contractors" in obj, get: obj => obj.Contractors, set: (obj, value) => { obj.Contractors = value; } }, metadata: _metadata }, _Contractors_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _Clients_decorators, { kind: "field", name: "Clients", static: false, private: false, access: { has: obj => "Clients" in obj, get: obj => obj.Clients, set: (obj, value) => { obj.Clients = value; } }, metadata: _metadata }, _Clients_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Profile = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Profile = _classThis;
})();
exports.Profile = Profile;
//# sourceMappingURL=profile.model.js.map