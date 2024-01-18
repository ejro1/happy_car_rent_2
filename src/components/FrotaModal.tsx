import React from 'react';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonImg } from '@ionic/react';
import '../css/FrotaModal.css';

interface FrotaModalProps {
  itemSelected: Veículos | null;
  onClose: (feito: boolean, id: number) => void;
}

interface Veículos {
  id: number;
  nome: string;
  categoria: any;
  descricao: string;
    motor?: string;
    potencia?: string;
    transmissao?: string;
    combustivel?: string;
    capacidade?: string;
  Preco: string;
  imagem: string;
  storeId: number[];
}

const FrotaModal: React.FC<FrotaModalProps> = ({ itemSelected, onClose }) => {
  return (
    <IonModal isOpen={itemSelected !== null}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{itemSelected?.nome}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => onClose(false, itemSelected!.id)}>Fechar</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>{itemSelected?.descricao}</p>
        <p>{itemSelected?.categoria}</p>
        <p>{itemSelected?.motor}</p>
        <p>{itemSelected?.potencia}</p>
        <p>{itemSelected?.transmissao}</p>
        <p>{itemSelected?.combustivel}</p>
        <p>{itemSelected?.capacidade}</p>
        <p>{itemSelected?.Preco}</p>
        <IonImg src={itemSelected?.imagem} alt="Veiculo" />
        <IonButton onClick={() => onClose(true, itemSelected!.id)}>Alugar</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default FrotaModal;
