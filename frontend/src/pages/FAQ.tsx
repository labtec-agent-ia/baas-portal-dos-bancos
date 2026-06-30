import { useState, ReactNode } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

interface FAQItemProps {
  question: string;
  answer: ReactNode;
  panel: string;
  expanded: string | false;
  handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const FAQItem = ({ question, answer, panel, expanded, handleChange }: FAQItemProps) => (
  <Accordion expanded={expanded === panel} onChange={handleChange(panel)}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}>
      <Typography>{question}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
        {answer}
      </Typography>
    </AccordionDetails>
  </Accordion>
);

export default function FAQ() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Central de Ajuda (FAQ)
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Encontre respostas para as perguntas mais comuns sobre o BaaS Portal dos Bancos.
      </Typography>

      <Paper elevation={0} sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 2 }}>
          Gestão de Contas e Clientes
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FAQItem
          panel="panel1"
          expanded={expanded}
          handleChange={handleChange}
          question="Como crio um novo cliente no BaaS?"
          answer="Para criar um novo cliente, acesse o menu 'Clientes' na barra lateral e clique no botão 'Novo Cliente'. Preencha as informações necessárias como Nome, CPF/CNPJ, E-mail e os limites desejados."
        />
        <FAQItem
          panel="panel2"
          expanded={expanded}
          handleChange={handleChange}
          question="Quais tipos de contas estão disponíveis?"
          answer="O BaaS suporta dois tipos de contas principais: Conta Corrente (para pessoas físicas e jurídicas) e Conta de Pagamento. O tipo de conta define os limites de transação e as funcionalidades disponíveis."
        />

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
          Transações e Transferências
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FAQItem
          panel="panel3"
          expanded={expanded}
          handleChange={handleChange}
          question="Como visualizar o histórico de transações de um cliente?"
          answer="Acesse o menu 'Transações' para visualizar uma lista completa e em tempo real. Você pode filtrar por cliente (ID), data, tipo de transação (Cash-in, Cash-out, Transferência Interna) e status."
        />
        <FAQItem
          panel="panel4"
          expanded={expanded}
          handleChange={handleChange}
          question="Como funcionam os limites transacionais?"
          answer="Os limites são definidos individualmente por cliente e por tipo de transação. O sistema automaticamente bloqueia transações que excedam o limite diário ou mensal configurado no perfil do cliente."
        />

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
          PIX e DICT
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FAQItem
          panel="panel5"
          expanded={expanded}
          handleChange={handleChange}
          question="Quais tipos de chaves PIX eu posso cadastrar?"
          answer="Através do nosso portal e das APIs, você pode cadastrar e gerenciar chaves do tipo: CPF, CNPJ, E-mail, Telefone Celular e Chave Aleatória (EVP)."
        />
        <FAQItem
          panel="panel6"
          expanded={expanded}
          handleChange={handleChange}
          question="Como funciona a portabilidade de chaves PIX?"
          answer="Se um cliente já possui uma chave cadastrada em outra instituição, ele precisará iniciar um processo de portabilidade. O status dessa solicitação ficará como 'Pendente de Portabilidade' até que seja confirmada via DICT."
        />

        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mt: 4 }}>
          Integrações e Webhooks
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <FAQItem
          panel="panel7"
          expanded={expanded}
          handleChange={handleChange}
          question="Como integro meu ERP com o BaaS?"
          answer="Nós fornecemos uma API RESTful completa. Vá até a seção 'Integrações' (se habilitada em seu plano) para gerar suas chaves de API e consultar a documentação técnica (Swagger)."
        />
        <FAQItem
          panel="panel8"
          expanded={expanded}
          handleChange={handleChange}
          question="Como configuro Webhooks para ser notificado de pagamentos?"
          answer="No painel de configurações de integração, você pode cadastrar a URL de callback do seu sistema. Nós enviaremos eventos POST sempre que houver confirmações de depósitos PIX, falhas em transferências ou aprovação de contas."
        />
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, bgcolor: 'background.paper', borderRadius: 2, border: '1px dashed', borderColor: 'divider' }}>
        <ContactSupportIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Ainda precisa de ajuda?
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" paragraph>
          Nossa equipe de suporte técnico está à disposição para auxiliar com integrações ou dúvidas avançadas.
        </Typography>
        <Button variant="contained" color="primary">
          Abrir Chamado de Suporte
        </Button>
      </Box>
    </Box>
  );
}
