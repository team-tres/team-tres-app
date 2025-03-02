"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calculateResidualEffects3 = function (data) {
    var principal = data.principal, annualReturnRate = data.annualReturnRate, startYr = data.startYr, endYr = data.endYr;
    var totalInterestsLost = [];
    var currentYr = startYr;
    var yearCount = 1;
    while (currentYr <= endYr) {
        var totalLoss = 0;
        // Calculate compounding interest loss from each past year
        totalLoss += principal * Math.pow((1 + annualReturnRate), yearCount) - principal;
        totalInterestsLost.push(Math.round(totalLoss));
        currentYr++;
        yearCount++;
    }
    return totalInterestsLost;
};
// Example Usage
var exampleData = {
    principal: 50000, // Principal loss per year
    annualReturnRate: 0.0602, // 6.02%
    startYr: 2025,
    endYr: 2036,
};
console.log(calculateResidualEffects3(exampleData));
exports.default = calculateResidualEffects3;
