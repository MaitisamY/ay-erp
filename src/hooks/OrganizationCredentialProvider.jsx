import { createContext, useContext, useState, useEffect } from 'react'

const OrganizationCredentialContext = createContext()

export const useOrganizationCredential = () => { 
    return useContext(OrganizationCredentialContext)
}

export const OrganizationCredentialProvider = ({ children }) => {

    const [organizationCredential, setOrganizationCredential] = useState(null)

    useEffect(() => {
        const storedOrganizationCredential = localStorage.getItem('organizationCredential')
        if (storedOrganizationCredential) {
            setOrganizationCredential(storedOrganizationCredential)
        }
    }, [])

    const setOrgCreds = (newOrganizationCredential) => {
        setOrganizationCredential(newOrganizationCredential)
        localStorage.setItem('organizationCredential', newOrganizationCredential)
    }

    return (
        <OrganizationCredentialContext.Provider value={{ organizationCredential, setOrgCreds }}>
            {children}
        </OrganizationCredentialContext.Provider>
    )
}