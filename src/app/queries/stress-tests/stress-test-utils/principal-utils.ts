/**
 * Calculates the principal differences between baseline and stress test loan balances.
 * The principal is calculated by subtracting the stress test loan balance from the baseline loan balance.
 *
 * @param baselineBalances An array of baseline loan balances over time
 * @param stressTestBalances An array of stress test loan balances over time (decreased interest rate)
 * @returns An array of principal values (the differences between the baseline and stress test loan balances)
 */
function calculatePrincipal(baselineBalances: number[], stressTestBalances: number[]): number[] {
  if (baselineBalances.length !== stressTestBalances.length) {
    throw new Error('Mismatched array lengths in calculatePrincipal.');
  }
  return baselineBalances.map((balance, index) => {
    const principal = balance - stressTestBalances[index];
    return principal;
  });
}

export default calculatePrincipal;
