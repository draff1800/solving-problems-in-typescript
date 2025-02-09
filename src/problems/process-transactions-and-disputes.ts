/**
 * You are building a transaction dispute resolution system for a financial services company. 
 * Customers can dispute transactions that they believe are fraudulent or incorrect.
 * Your task is to implement a function that processes a list of transactions and a list of disputes, 
 * returning the final balance after resolving the disputes.
 */

export interface Transaction {
    id: string,
    amount: number,
    currency: string,
}

export const processTransactionsAndDisputes = (transactions: Transaction[], disputes: string[]): number => {
    let totalAmount: number = 0;

    transactions.forEach(transaction => {
        if (!disputes.includes(transaction.id)) {
            totalAmount += convertAmountToUsd(transaction.currency, transaction.amount)
        }
    })

    return Math.round(totalAmount * 100) / 100;
}

const convertAmountToUsd = (currency: string, amount: number) => {
    switch(currency) {
        case "CAD": {
            return amount * 0.7;
        }
        case "GBP": {
            return amount * 1.24;
        }
        default: {
            return amount;
        }
    }
}
