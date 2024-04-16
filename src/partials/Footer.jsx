import '../styles/footer.css'

import { useOrganizationCredential } from '../hooks/OrganizationCredentialProvider'

function Footer() {

    const { organizationCredential } = useOrganizationCredential()

    return (
        <footer>
            <p>Copyright © {new Date().getFullYear()}. {organizationCredential === null || !organizationCredential.name 
            ? 'Organization Name' : organizationCredential.name}.</p>
        </footer>
    )
}

export default Footer
