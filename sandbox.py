# fastapi/pix_service.py
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from utils import get_bank_token, sign_payload

router = APIRouter()

class PixPayment(BaseModel):
    chave: str
    valor: float
    descricao: str

@router.post("/pix/payments")
async def create_payment(p: PixPayment, token: str = Depends(get_bank_token)):
    signed = sign_payload(p.dict())
    # chamada ao banco (exemplo mock)
    resp = await bank_client.post("/pix/payments", json=signed, headers={"Authorization": f"Bearer {token}"})
    if resp.status_code != 200:
        raise HTTPException(status_code=400, detail="Falha ao criar PIX")
    return resp.json()
