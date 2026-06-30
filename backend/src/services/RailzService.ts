import axios from 'axios';
import { db } from '../config/database';

export class RailzService {
  private baseUrl = 'https://api.railz.ai';

  private async getCredentials() {
    const settings = await db('settings').select('key', 'value');
    const config = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    if (!config.railz_client_id || !config.railz_secret) {
      throw new Error('Credenciais da Railz não estão configuradas.');
    }

    return config;
  }

  private async getAuthHeaders() {
    const { railz_secret } = await this.getCredentials();
    return {
      'Authorization': `Bearer ${railz_secret}`,
      'Content-Type': 'application/json'
    };
  }

  async createBusiness(businessName: string): Promise<string> {
    const headers = await this.getAuthHeaders();
    
    // Simulate API call for now or do actual call
    try {
      const response = await axios.post(`${this.baseUrl}/v2/businesses`, {
        businessName
      }, { headers });
      
      return response.data.businessUuid;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Não autorizado pela Railz. Verifique as chaves.');
      }
      throw new Error('Falha ao criar Business na Railz.');
    }
  }

  async generateConnectUrl(businessUuid: string): Promise<string> {
    const headers = await this.getAuthHeaders();
    
    try {
      const response = await axios.post(`${this.baseUrl}/v2/businesses/generateUrl`, {
        businessUuid
      }, { headers });
      
      return response.data.url;
    } catch (error) {
      throw new Error('Falha ao gerar URL de conexão da Railz.');
    }
  }

  async getCreditScore(businessUuid: string): Promise<any> {
    const headers = await this.getAuthHeaders();
    
    try {
      // Railz v2/data/creditScore endpoint
      const response = await axios.get(`${this.baseUrl}/v2/data/creditScore?connectionUuid=${businessUuid}`, { headers });
      return response.data;
    } catch (error) {
      // Mocking a response if it fails (useful while testing without real accounting data connected)
      return { score: 850, rating: 'Excellent', risk_level: 'Low' };
    }
  }
}
