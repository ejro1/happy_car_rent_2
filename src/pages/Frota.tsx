import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonLabel,
  IonThumbnail,
  IonSearchbar,
} from '@ionic/react';
import { getInboxItems } from '../Utils/Veículos';
import FrotaModal from '../components/FrotaModal';
import '../css/Frota.css';

interface Veículos {
  categoria: any;
  id: number;
  nome: string;
  descripção: string;
  Dadostécnicos: {
    motor?: string;
    potencia?: string;
    transmissão?: string;
    combustível?: string;
    capacidade?: string;
  };
  Preço: string;
  storeId: number[];
  image: string;
}

const Frota: React.FC = () => {
  const [VeículoSelected, setVeículoSelected] = useState<Veículos | null>(null);
  const [Veículos, setFrota] = useState<any[]>([]);
  const { storeId } = useParams<{ storeId?: string }>();
  const history = useHistory();

  // Función para obtener las tiendas desde el backend

  useEffect(() => {
  const fetchFrota = async () => {
    try {
      const response = await fetch('http://localhost:3000/Frota');
      const frotaData = await response.json();
      console.log('Dados da Frota:', frotaData);
      setFrota(frotaData);
    } catch (error) {
      console.error('Erro ao obter dados das frota:', (error as Error).message);
    }
  };
    fetchFrota();
  }, []);

  const handleClickVeículo = async (Veículo: Veículos) => {
    setVeículoSelected(Veículo);
  };

  const handleCloseModal = () => {
    setVeículoSelected(null);
  };

  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonSearchbar></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense"></IonHeader>
        <IonList>
          {Veículos.map((Veículo, index) => (
            <IonCard key={`Veículo_${index}`} onClick={() => handleClickVeículo(Veículo)}>
              <IonCardHeader>
                <IonCardTitle>{Veículo.nome}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="thumbnail-container">
                  <IonThumbnail slot="start">
                    <img alt={Veículo.nome} src={Veículo.imagem} />
                  </IonThumbnail>
                  <div className="info-container">
                    <IonLabel>{Veículo.categoria}</IonLabel>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
      <FrotaModal itemSelected={VeículoSelected} onClose={handleCloseModal} />
    </IonPage>
  );
};

export default Frota;
