import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'

interface TTransaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string
}

type TTransactionInput = Omit<TTransaction, 'id' | 'createdAt'>

interface TTransactionsProviderProps {
    children: ReactNode
}

interface TTransactionsContextData {
    transactions: TTransaction[]
    createTransaction: (transaction: TTransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TTransactionsContextData>(
    {} as TTransactionsContextData
)

export function TransactionsProvider({ children }: TTransactionsProviderProps) {
    const [ transactions, setTransactions ] = useState<TTransaction[]>([]) 

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
        .then()
    }, [])

    async function createTransaction(transactionInput: TTransactionInput) {
        const response = await api.post('/transactions', {
            ...transactionInput, 
            createdAt: new Date()
        })

        const { transaction } = response.data

        setTransactions([
            ...transactions, 
            transaction
        ])
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)

    return context
}