import React from 'react'
// Placeholder login page: integrate Keycloak here.
export default function Login() {
  const oidcUrl = import.meta.env.VITE_KEYCLOAK_URL || 'https://keycloak.example'
  const realm = import.meta.env.VITE_KEYCLOAK_REALM || 'realm'
  const client = import.meta.env.VITE_KEYCLOAK_CLIENT || 'portal-web'

  const loginUrl = `${oidcUrl}/realms/${realm}/protocol/openid-connect/auth?client_id=${client}&response_type=code`

  return (
    <div style={{ maxWidth: 720 }}>
      <h2>Login</h2>
      <p>Esta página deve iniciar o fluxo OIDC com Keycloak.</p>
      <p>
        Endpoint de exemplo: <code>{loginUrl}</code>
      </p>
      <a href={loginUrl}>
        <button>Fazer login (abrir Keycloak)</button>
      </a>
    </div>
  )
}