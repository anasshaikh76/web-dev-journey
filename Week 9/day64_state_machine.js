// Problem 1 — Best Time to Buy and Sell Stock I

{
    function maxProfit(prices) {
        let minPrice = Infinity;
        let maxProfit = 0;

        for (let price of prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }

    console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (buy 1, sell 6)
    console.log(maxProfit([7, 6, 4, 3, 1]));   // 0 (no profit possible)
}

// Problem 2 — Best Time to Buy and Sell Stock II

{
    function maxProfit(prices) {
        let profit = 0;

        for (let i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }

    function maxProfitDP(prices) {
        let holding = -prices[0];
        let notHolding = 0;

        for (let i = 1; i < prices.length; i++) {
            holding = Math.max(holding, notHolding - prices[i]);
            notHolding = Math.max(notHolding, holding + prices[i]);
        }
        return notHolding;
    }

    console.log(maxProfit([7, 1, 5, 3, 6, 4]));    // 7 (1→5, 3→6 = 4+3)
    console.log(maxProfitDP([7, 1, 5, 3, 6, 4]));  // 7
}
// Note: LeetCode #122 — with unlimited transactions, grab every upward move! State machine tracks holding vs notHolding states!

// Problem 3 — Best Time to Buy and Sell Stock III

{
    function maxProfit(prices) {
        let buy1 = -Infinity, sell1 = 0;
        let buy2 = -Infinity, sell2 = 0;

        for (let price of prices) {
            buy1 = Math.max(buy1, -price);
            sell1 = Math.max(sell1, buy1 + price);
            buy2 = Math.max(buy2, sell1 - price);
            sell2 = Math.max(sell2, buy2 + price);
        }
        return sell2;
    }

    console.log(maxProfit([3, 3, 5, 0, 0, 3, 1, 4])); // 6
    console.log(maxProfit([1, 2, 3, 4, 5]));         // 4
    console.log(maxProfit([7, 6, 4, 3, 1]));         // 0
}
// Note: LeetCode #123 — track 4 states: buy1, sell1, buy2, sell2. Each state depends on previous state! This is the state machine in action!

// Problem 4 — Best Time to Buy and Sell Stock IV

{
    function maxProfit(k, prices) {
        const n = prices.length;
        if (k >= Math.floor(n / 2)); {
            let profit = 0;

            for (let i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) {
                    profit += prices[i] - prices[i - 1];
                }
            }
            return profit;
        }

        const dp = Array.from({length: k+1},
                   () => [-Infinity, -Infinity]);
        dp[0][0] = 0;

        for (let price of prices) {
            for (let i = k; i >= 1; i--) {
                dp[i][0] = Math.max(dp[i][0], dp[i][1] + price);   // sell
                dp[i][1] = Math.max(dp[i][1], dp[i-1][0] - price); // buy
            }
        }

        return Math.max(0, ...dp.map(d => d[0]));
    }

    console.log(maxProfit(2, [3,2,6,5,0,3])); // 7
    console.log(maxProfit(2, [1,2,3,4,5]));   // 4
}
// Note: LeetCode #188 — generalization of Problem 3! k transactions = k pairs of buy/sell states. If k >= n/2, treat as unlimited!

// Problem 5 — Best Time to Buy and Sell Stock with Cooldown

{
    function maxProfit(prices) {
        let holding = -prices[0];
        let sold = 0;
        let cooldown = 0;

        for (let i = 1; i < prices.length; i++) {
            const prevHolding = holding;
            const prevSold = sold;
            const prevCooldown = cooldown;

            holding = Math.max(prevHolding, prevCooldown - prices[i]);
            sold = prevHolding + prices[i];
            cooldown = Math.max(prevCooldown, prevSold);
        }
        return Math.max(sold, cooldown);
    }

    console.log(maxProfit([1,2,3,0,2])); // 3 (buy 1, sell 2, cool, buy 0, sell 2)
    console.log(maxProfit([1]));          // 0
}
// Note: LeetCode #309 — 3 states now: holding, sold (cooldown), cooldown (ready). Can only buy from cooldown state!

// Problem 6 — Best Time to Buy and Sell Stock with Transaction Fee

{
    function maxProfit(prices, fee) {
        let holding = -prices[0];
        let notHolding = 0;

        for (let i = 1; i < prices.length; i++) {
            holding = Math.max(holding, notHolding - prices[i]);
            notHolding = Math.max(notHolding, holding + prices[i] - fee);
        }
        return notHolding;
    }

    console.log(maxProfit([1,3,2,8,4,9], 2)); // 8
    console.log(maxProfit([1,3,7,5,10,3], 3)); // 6
}
// Note: LeetCode #714 — same as Problem 2 (unlimited) but subtract fee when selling! Only worthwhile moves get made!

// Problem 7 — State Machine Summary Problem

{
    // Visualize all stock states as a state machine

    function stockStateMachine(prices, maxTransactions = Infinity,
                                cooldown = false, fee = 0) {

        console.log("State Machine Framework:");
        console.log("========================");
        console.log("States: HOLDING, NOT_HOLDING");
        console.log("Transitions:");
        console.log("  NOT_HOLDING → HOLDING: BUY (subtract price)");
        console.log("  HOLDING → NOT_HOLDING: SELL (add price, subtract fee)");
        if (cooldown) console.log("  After SELL: must wait 1 day");
        console.log("");

        // General solution
        let hold = -prices[0];
        let free = 0;
        let cool = 0;

        for (let i = 1; i < prices.length; i++) {
            const prevHold = hold;
            const prevFree = free;
            const prevCool = cool;

            if (cooldown) {
                hold = Math.max(prevHold, prevCool - prices[i]);
                cool = Math.max(prevCool, prevFree);
                free = prevHold + prices[i] - fee;
            } else {
                hold = Math.max(prevHold, prevFree - prices[i]);
                free = Math.max(prevFree, prevHold + prices[i] - fee);
            }
        }

        return cooldown ? Math.max(free, cool) : free;
    }

    // Test all variations
    const prices = [1,2,3,0,2];
    console.log("No cooldown, no fee:", stockStateMachine(prices));
    console.log("With cooldown:", stockStateMachine(prices, Infinity, true));
    console.log("With fee=1:", stockStateMachine(prices, Infinity, false, 1));
}
// Note: This problem shows how ONE framework handles all stock variations. The key is always tracking states and their transitions!