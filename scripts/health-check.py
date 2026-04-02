#!/usr/bin/env python3
"""
Health Check Script para BaaS Portal
Verifica a saúde de todos os serviços
"""

import requests
import sys
from datetime import datetime
import json

# ANSI Colors
RED = '\033[91m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'

SERVICES = {
    'Frontend': 'https://localhost',
    'Backend': 'http://localhost:3000/health',
    'Keycloak': 'http://localhost:8080/health/ready',
    'PostgreSQL': 'http://localhost:5432/health',  # via health check proxy
    'Redis': 'http://localhost:6379/health',  # via health check proxy
    'Prometheus': 'http://localhost:9090/-/healthy',
    'Grafana': 'http://localhost:3001/api/health',
}

def check_service(name, url):
    """Verificar saúde de um serviço"""
    try:
        if name == 'Frontend':
            # Frontend é servido por HTTPS
            response = requests.get(url, verify=False, timeout=5)
        else:
            response = requests.get(url, timeout=5)
        
        if response.status_code == 200:
            print(f"{GREEN}✓{RESET} {name:<15} - {GREEN}HEALTHY{RESET}")
            return True
        else:
            print(f"{RED}✗{RESET} {name:<15} - {YELLOW}Status: {response.status_code}{RESET}")
            return False
    except requests.exceptions.Timeout:
        print(f"{RED}✗{RESET} {name:<15} - {RED}TIMEOUT{RESET}")
        return False
    except requests.exceptions.ConnectionError:
        print(f"{RED}✗{RESET} {name:<15} - {RED}CONNECTION ERROR{RESET}")
        return False
    except Exception as e:
        print(f"{RED}✗{RESET} {name:<15} - {RED}ERROR: {str(e)}{RESET}")
        return False

def check_logs():
    """Verificar logs para erros"""
    print(f"\n{BLUE}📋 Verificando logs recentes...{RESET}")
    # Você pode adicionar lógica para verificar logs aqui

def main():
    """Main function"""
    print(f"{BLUE}{'='*50}{RESET}")
    print(f"{BLUE}BaaS Portal - Health Check{RESET}")
    print(f"{BLUE}{'='*50}{RESET}")
    print(f"Timestamp: {datetime.now().isoformat()}\n")
    
    results = {}
    for service, url in SERVICES.items():
        results[service] = check_service(service, url)
    
    # Summary
    total = len(results)
    healthy = sum(1 for v in results.values() if v)
    
    print(f"\n{BLUE}{'='*50}{RESET}")
    print(f"Summary: {GREEN}{healthy}/{total}{RESET} serviços saudáveis")
    
    if healthy == total:
        print(f"{GREEN}✓ Todos os serviços estão OK{RESET}")
        return 0
    else:
        print(f"{RED}✗ Alguns serviços com problemas{RESET}")
        check_logs()
        return 1

if __name__ == '__main__':
    sys.exit(main())
