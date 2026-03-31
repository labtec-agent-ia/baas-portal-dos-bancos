import axios from 'axios';
import https from 'https';
import fs from 'fs';

const httpsAgent = new https.Agent({
  cert: fs.readFileSync('/secrets/client_cert.pem'),
  key : fs.readFileSync('/secrets/client_key.pem'),
  ca  : fs.readFileSync('/secrets/ca.pem')
});

async function sendPix(toKey: string, amount: number, description: string) {
  const token = await getBankAccessToken(); // client‑credentials flow
  const payload = {
    chave: toKey,
    valor: amount,
    descricao: description
  };
  const resp = await axios.post(
    'https://api.banco.com.br/pix/payments',
    payload,
    {
      httpsAgent,
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return resp.data;
}
