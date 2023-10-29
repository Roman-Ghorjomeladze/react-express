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
exports.Contract = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const profile_model_1 = require("./profile.model");
const job_model_1 = require("./job.model");
let Contract = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({
            timestamps: true,
            tableName: "Contract",
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = sequelize_typescript_1.Model;
    let _instanceExtraInitializers = [];
    let _terms_decorators;
    let _terms_initializers = [];
    let _status_decorators;
    let _status_initializers = [];
    let _Contractor_decorators;
    let _Contractor_initializers = [];
    let _Client_decorators;
    let _Client_initializers = [];
    let _Jobs_decorators;
    let _Jobs_initializers = [];
    var Contract = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.terms = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _terms_initializers, void 0));
            this.status = __runInitializers(this, _status_initializers, void 0);
            this.Contractor = __runInitializers(this, _Contractor_initializers, void 0);
            this.Client = __runInitializers(this, _Client_initializers, void 0);
            this.Jobs = __runInitializers(this, _Jobs_initializers, void 0);
        }
    };
    __setFunctionName(_classThis, "Contract");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _terms_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false,
            })];
        _status_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.ENUM,
                allowNull: false,
            })];
        _Contractor_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => profile_model_1.Profile, { as: 'Contractor', foreignKey: 'ContractorId' })];
        _Client_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => profile_model_1.Profile, { as: 'Client', foreignKey: 'ClientId' })];
        _Jobs_decorators = [(0, sequelize_typescript_1.HasMany)(() => job_model_1.Job)];
        __esDecorate(null, null, _terms_decorators, { kind: "field", name: "terms", static: false, private: false, access: { has: obj => "terms" in obj, get: obj => obj.terms, set: (obj, value) => { obj.terms = value; } }, metadata: _metadata }, _terms_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: obj => "status" in obj, get: obj => obj.status, set: (obj, value) => { obj.status = value; } }, metadata: _metadata }, _status_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _Contractor_decorators, { kind: "field", name: "Contractor", static: false, private: false, access: { has: obj => "Contractor" in obj, get: obj => obj.Contractor, set: (obj, value) => { obj.Contractor = value; } }, metadata: _metadata }, _Contractor_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _Client_decorators, { kind: "field", name: "Client", static: false, private: false, access: { has: obj => "Client" in obj, get: obj => obj.Client, set: (obj, value) => { obj.Client = value; } }, metadata: _metadata }, _Client_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _Jobs_decorators, { kind: "field", name: "Jobs", static: false, private: false, access: { has: obj => "Jobs" in obj, get: obj => obj.Jobs, set: (obj, value) => { obj.Jobs = value; } }, metadata: _metadata }, _Jobs_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Contract = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Contract = _classThis;
})();
exports.Contract = Contract;
Contract.belongsTo(profile_model_1.Profile, { as: 'Contractor' });
Contract.belongsTo(profile_model_1.Profile, { as: 'Client' });
Contract.hasMany(job_model_1.Job);
//# sourceMappingURL=contract.model.js.map