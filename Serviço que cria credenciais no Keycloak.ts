// src/clients/clients.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { KeycloakAdminClient } from '../keycloak/keycloak-admin.client';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private repo: Repository<Client>,
    private kcAdmin: KeycloakAdminClient,
  ) {}

  async create(dto: CreateClientDto) {
    const client = this.repo.create(dto);
    await this.repo.save(client);

    // cria cliente no Keycloak com scope pix:write
    await this.kcAdmin.createClient({
      clientId: `client-${client.id}`,
      secret: true,
      redirectUris: ['https://portal.seudominio.com/callback'],
      clientAuthenticatorType: 'client-secret',
      defaultClientScopes: ['pix:write'],
    });

    return client;
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}
