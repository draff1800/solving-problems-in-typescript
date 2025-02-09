import {type Transaction, processTransactionsAndDisputes } from "../../src/problems/process-transactions-and-disputes.js"

describe('processTransactionsAndDisputes', () => {
    test('Handles 0 transactions with no disputes', () => {
        // GIVEN
        const transactions: Transaction[] = []

        // WHEN
        const result = processTransactionsAndDisputes(transactions, [])

        // THEN
        expect(result).toBe(0)
    })

    test('Handles 1 transaction with an invalid dispute', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10, currency: "USD"},
        ]
        const disputes = ["1b"]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, disputes)

        // THEN
        expect(result).toBe(10)
    })

    test('Handles 3 transactions, all disputed', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10, currency: "USD"},
            {id: "1b", amount: 15, currency: "USD"},
            {id: "1c", amount: 20, currency: "USD"}
        ]
        const disputes = ["1a", "1b", "1c"]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, disputes)

        // THEN
        expect(result).toBe(0)
    })

    test('Handles 3 transactions, with 1 duplicated dispute', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10, currency: "USD"},
            {id: "1b", amount: 15, currency: "USD"},
            {id: "1c", amount: 20, currency: "USD"}
        ]
        const disputes = ["1a", "1a"]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, disputes)

        // THEN
        expect(result).toBe(35)
    })


    test('Handles 3 transactions (Whole USD) with no disputes', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10, currency: "USD"},
            {id: "1b", amount: 15, currency: "USD"},
            {id: "1c", amount: 20, currency: "USD"}
        ]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, [])

        // THEN
        expect(result).toBe(45)
    })

    test('Handles 3 transactions (Whole USD) with 1 refund and no disputes', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10, currency: "USD"},
            {id: "1b", amount: -15, currency: "USD"},
            {id: "1c", amount: 20, currency: "USD"}
        ]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, [])

        // THEN
        expect(result).toBe(15)
    })

    test('Handles 3 transactions (Decimal USD) with no disputes', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10.50, currency: "USD"},
            {id: "1b", amount: 15.23, currency: "USD"},
            {id: "1c", amount: 20.80, currency: "USD"}
        ]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, [])

        // THEN
        expect(result).toBe(46.53)
    })

    test('Handles 5 transactions (Whole USD) with 2 disputes', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10, currency: "USD"},
            {id: "1b", amount: 15, currency: "USD"},
            {id: "1c", amount: 20, currency: "USD"},
            {id: "1d", amount: 25, currency: "USD"},
            {id: "1e", amount: 30, currency: "USD"}
        ]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, ["1a", "1b"])

        // THEN
        expect(result).toBe(75)
    })

    test('Handles 5 transactions (Decimal USD) with 2 disputes', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10.20, currency: "USD"},
            {id: "1b", amount: 15.30, currency: "USD"},
            {id: "1c", amount: 20.40, currency: "USD"},
            {id: "1d", amount: 25.50, currency: "USD"},
            {id: "1e", amount: 30.30, currency: "USD"}
        ]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, ["1a", "1b"])

        // THEN
        expect(result).toBe(76.2)
    })

    test('Handles 3 transactions (Whole USD, CAD and GBP) with no disputes', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10, currency: "USD"},
            {id: "1b", amount: 15, currency: "CAD"},
            {id: "1c", amount: 20, currency: "GBP"}
        ]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, [])

        // THEN
        expect(result).toBe(45.3)
    })

    test('Handles 3 transactions (Decimal USD, CAD and GBP) with no disputes', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10.10, currency: "USD"},
            {id: "1b", amount: 15.23, currency: "CAD"},
            {id: "1c", amount: 20.37, currency: "GBP"}
        ]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, [])

        // THEN
        expect(result).toBe(46.02)
    })

    test('Handles 5 transactions (Whole USD, CAD and GBP) with 2 disputes', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10, currency: "USD"},
            {id: "1b", amount: 15, currency: "CAD"},
            {id: "1c", amount: 20, currency: "GBP"},
            {id: "1d", amount: 25, currency: "USD"},
            {id: "1e", amount: 30, currency: "CAD"}
        ]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, ["1a", "1e"])

        // THEN
        expect(result).toBe(60.3)
    })

    test('Handles 5 transactions (Decimal USD, CAD and GBP) with 2 disputes', () => {
        // GIVEN
        const transactions: Transaction[] = [
            {id: "1a", amount: 10.12, currency: "USD"},
            {id: "1b", amount: 15.15, currency: "CAD"},
            {id: "1c", amount: 20.98, currency: "GBP"},
            {id: "1d", amount: 25.56, currency: "USD"},
            {id: "1e", amount: 30.34, currency: "CAD"}
        ]

        // WHEN
        const result = processTransactionsAndDisputes(transactions, ["1a", "1e"])

        // THEN
        expect(result).toBe(62.18)
    })
})