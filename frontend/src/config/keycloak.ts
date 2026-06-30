import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8099', // URL do Keycloak via Docker
  realm: 'baas-realm',
  clientId: 'baas-frontend'
};

// Dependendo do bundler (Vite), o importe default pode estar aninhado.
const KC = typeof Keycloak === 'function' ? Keycloak : (Keycloak as any).default || Keycloak;

const keycloak = new KC(keycloakConfig);

export default keycloak;
