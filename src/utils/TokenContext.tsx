import React from 'react'
import { AuthResponse } from 'msal'

const TokenContext = React.createContext<AuthResponse|null>(null)

const TokenProvider = TokenContext.Provider
const TokenConsumer = TokenContext.Consumer

export default TokenContext
export { TokenProvider, TokenConsumer }
