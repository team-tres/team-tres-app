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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-await-in-loop */
var client_1 = require("@prisma/client");
var bcrypt_1 = require("bcrypt");
var prisma = new client_1.PrismaClient();
function addTestData() {
    return __awaiter(this, void 0, void 0, function () {
        var testUsers, createdUserId, _i, testUsers_1, user, _a, createdUser, testCompanies, createdCompanyId, _b, testCompanies_1, company, createdCompany, financialTestData, _c, financialTestData_1, data;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    testUsers = [
                        {
                            email: 'kimoriyadex@gmail.com',
                            username: 'Kimoriya',
                            password: 'p',
                            role: client_1.Role.CLIENT,
                            companyIni: 'Kimoriya',
                            status: true,
                        },
                        {
                            email: 'admin@gmail.com',
                            username: 'admin',
                            password: 'p',
                            role: client_1.Role.CLIENT,
                            companyIni: 'Spire',
                            status: true,
                        },
                        {
                            email: 'analyst@gmail.com',
                            username: 'analyst',
                            password: 'p',
                            role: client_1.Role.CLIENT,
                            companyIni: 'Spire',
                            status: true,
                        },
                        {
                            email: 'auditor@gmail.com',
                            username: 'auditor',
                            password: 'p',
                            role: client_1.Role.CLIENT,
                            companyIni: 'Spire',
                            status: true,
                        },
                        {
                            email: 'client@gmail.com',
                            username: 'client',
                            password: 'p',
                            role: client_1.Role.CLIENT,
                            companyIni: 'Spire',
                            status: true,
                        },
                    ];
                    createdUserId = null;
                    _i = 0, testUsers_1 = testUsers;
                    _d.label = 1;
                case 1:
                    if (!(_i < testUsers_1.length)) return [3 /*break*/, 5];
                    user = testUsers_1[_i];
                    _a = user;
                    return [4 /*yield*/, (0, bcrypt_1.hash)(user.password, 10)];
                case 2:
                    _a.password = _d.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: user.email,
                                username: user.username,
                                password: user.password,
                                role: user.role,
                                status: user.status,
                                companyIni: user.companyIni,
                            },
                        })];
                case 3:
                    createdUser = _d.sent();
                    createdUserId = createdUser.id;
                    console.log("User created: ".concat(createdUser.username));
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5:
                    if (createdUserId === null) {
                        throw new Error('No user created.');
                    }
                    testCompanies = [
                        { name: 'Kimoriya' },
                    ];
                    createdCompanyId = null;
                    _b = 0, testCompanies_1 = testCompanies;
                    _d.label = 6;
                case 6:
                    if (!(_b < testCompanies_1.length)) return [3 /*break*/, 9];
                    company = testCompanies_1[_b];
                    return [4 /*yield*/, prisma.company.create({
                            data: company,
                        })];
                case 7:
                    createdCompany = _d.sent();
                    createdCompanyId = createdCompany.id;
                    console.log("Company created: ".concat(createdCompany.name));
                    _d.label = 8;
                case 8:
                    _b++;
                    return [3 /*break*/, 6];
                case 9:
                    if (createdCompanyId === null) {
                        throw new Error('No company created.');
                    }
                    financialTestData = [
                        {
                            companyId: createdCompanyId,
                            userId: createdUserId,
                            year: 2022,
                            revenue: 131345,
                            netSales: 131345,
                            costOfContracting: 48456,
                            overhead: 667,
                            costOfGoodsSold: 49123,
                            grossProfit: 82222,
                            grossMarginPercentage: 0.626000228406106,
                            salariesAndBenefits: 23872,
                            rentAndOverhead: 10087,
                            depreciationAndAmortization: 17205,
                            interest: 1500,
                            totalOperatingExpenses: 52664,
                            operatingExpensesPercentage: 0.4009593056454376,
                            profitFromOperations: 29558,
                            profitFromOperationsPercentage: 0.22504092276066848,
                            interestIncome: 0,
                            interestExpense: 0,
                            gainOnDisposalOfAssets: 0,
                            otherIncome: 0,
                            totalOtherIncome: 0,
                            totalOtherIncomePercentage: 0,
                            incomeBeforeIncomeTaxes: 29558,
                            pretaxIncomePercentage: 0.22504092276066848,
                            incomeTaxes: 8483,
                            netIncome: 21075,
                            netIncomePercentage: 0.16045528950473942,
                            cashAndCashEquivalents: 183715,
                            accountsReceivable: 6567,
                            inventory: 9825,
                            totalCurrentAssets: 200107,
                            propertyPlantAndEquipment: 40145,
                            investment: 0,
                            totalLongTermAssets: 40145,
                            totalAssets: 240252,
                            accountsPayable: 4912,
                            currentDebtService: 5000,
                            taxesPayable: 4265,
                            totalCurrentLiabilities: 14177,
                            longDebtService: 15000,
                            loansPayable: 20000,
                            totalLongTermLiabilities: 35000,
                            totalLiabilities: 49177,
                            equityCapital: 170000,
                            retainedEarnings: 21075,
                            totalStockholdersEquity: 191075,
                            totalLiabilitiesAndEquity: 240252,
                        },
                        {
                            companyId: createdCompanyId,
                            userId: createdUserId,
                            year: 2023,
                            revenue: 142341,
                            netSales: 142341,
                            costOfContracting: 52587,
                            overhead: 667,
                            costOfGoodsSold: 53254,
                            grossProfit: 89087,
                            grossMarginPercentage: 0.6258702692829192,
                            salariesAndBenefits: 23002,
                            rentAndOverhead: 11020,
                            depreciationAndAmortization: 16544,
                            interest: 900,
                            totalOperatingExpenses: 50466,
                            operatingExpensesPercentage: 0.3545429637279491,
                            profitFromOperations: 37621,
                            profitFromOperationsPercentage: 0.2713273055549701,
                            interestIncome: 0,
                            interestExpense: 0,
                            gainOnDisposalOfAssets: 0,
                            otherIncome: 0,
                            totalOtherIncome: 0,
                            totalOtherIncomePercentage: 0,
                            incomeBeforeIncomeTaxes: 38621,
                            pretaxIncomePercentage: 0.2713273055549701,
                            incomeTaxes: 10908,
                            netIncome: 27713,
                            netIncomePercentage: 0.1946944309791276,
                            cashAndCashEquivalents: 191069,
                            accountsReceivable: 7117,
                            inventory: 10531,
                            totalCurrentAssets: 208717,
                            propertyPlantAndEquipment: 38602,
                            investment: 20000,
                            totalLongTermAssets: 58602,
                            totalAssets: 267319,
                            accountsPayable: 5265,
                            currentDebtService: 5000,
                            taxesPayable: 5341,
                            totalCurrentLiabilities: 15606,
                            longDebtService: 15000,
                            loansPayable: 40000,
                            totalLongTermLiabilities: 55000,
                            totalLiabilities: 70606,
                            equityCapital: 170000,
                            retainedEarnings: 26713,
                            totalStockholdersEquity: 196713,
                            totalLiabilitiesAndEquity: 267319,
                        },
                        {
                            companyId: createdCompanyId,
                            userId: createdUserId,
                            year: 2024,
                            revenue: 150772,
                            netSales: 150772,
                            costOfContracting: 56643,
                            overhead: 667,
                            costOfGoodsSold: 18881,
                            grossProfit: 131891,
                            grossMarginPercentage: 0.8747711776722469,
                            salariesAndBenefits: 25245,
                            rentAndOverhead: 11412,
                            depreciationAndAmortization: 16080,
                            interest: 900,
                            totalOperatingExpenses: 93967,
                            operatingExpensesPercentage: 0.6232390629559865,
                            profitFromOperations: 39825,
                            profitFromOperationsPercentage: 0.2515321147162603,
                            interestIncome: 0,
                            interestExpense: 0,
                            gainOnDisposalOfAssets: 0,
                            otherIncome: 0,
                            totalOtherIncome: 16980,
                            totalOtherIncomePercentage: 0.11262038044199188,
                            incomeBeforeIncomeTaxes: 54904,
                            pretaxIncomePercentage: 0.3641524951582522,
                            incomeTaxes: 11598,
                            netIncome: 43306,
                            netIncomePercentage: 0.2872283978457539,
                            cashAndCashEquivalents: 189550,
                            accountsReceivable: 7539,
                            inventory: 11342,
                            totalCurrentAssets: 208431,
                            propertyPlantAndEquipment: 37521,
                            investment: 50000,
                            totalLongTermAssets: 87521,
                            totalAssets: 295952,
                            accountsPayable: 5671,
                            currentDebtService: 5000,
                            taxesPayable: 2054,
                            totalCurrentLiabilities: 12725,
                            longDebtService: 15000,
                            loansPayable: 70000,
                            totalLongTermLiabilities: 85000,
                            totalLiabilities: 97725,
                            equityCapital: 170000,
                            retainedEarnings: 28227,
                            totalStockholdersEquity: 198227,
                            totalLiabilitiesAndEquity: 295952,
                        },
                    ];
                    _c = 0, financialTestData_1 = financialTestData;
                    _d.label = 10;
                case 10:
                    if (!(_c < financialTestData_1.length)) return [3 /*break*/, 13];
                    data = financialTestData_1[_c];
                    return [4 /*yield*/, prisma.financialCompilation.create({
                            data: data,
                        })];
                case 11:
                    _d.sent();
                    _d.label = 12;
                case 12:
                    _c++;
                    return [3 /*break*/, 10];
                case 13:
                    console.log('Data added successfully!');
                    return [2 /*return*/];
            }
        });
    });
}
addTestData()
    .then(function () { return prisma.$disconnect(); })
    .catch(function (e) {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
