import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api'

interface TTransaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string
}

interface TTransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext<TTransaction[]>([])

export function TransactionsProvider({ children }: TTransactionsProviderProps) {
    const [ transactions, setTransactions ] = useState<TTransaction[]>([]) 

    useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    }, [])

    return (
        <TransactionsContext.Provider value={transactions}>
            {children}
        </TransactionsContext.Provider>
    )
}