"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CalculateStressTest3 = function (data) {
    var total = data.totalAssets - data.newExpenses;
    var totalExpenses = data.totalExpenses + data.newExpenses;
    return { total: total, totalExpenses: totalExpenses };
};
var sampleData2025 = {
    totalAssets: 205752,
    newExpenses: 50000,
    totalExpenses: 52589,
};
var sampleData2026 = {
    totalAssets: 207633,
    newExpenses: 50000,
    totalExpenses: 52564,
};
var sampleData2027 = {
    totalAssets: 207272,
    newExpenses: 50000,
    totalExpenses: 52930,
};
console.log(CalculateStressTest3(sampleData2025));
console.log(CalculateStressTest3(sampleData2026));
console.log(CalculateStressTest3(sampleData2027));
exports.default = CalculateStressTest3;
