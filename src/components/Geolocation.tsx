import React, { useState, useEffect } from 'react';
import { getInboxItems } from '../Utils/DatosdaLojas';
import { Position } from '@capacitor/geolocation';

const Ubicação = () => {
    const [ubicacionActual, setubicacaoActual] = useState({ latitude: 0, longitude: 0 });
    const [ciudadActual, setCiudadActual] = useState('');

    const obtenerUbicacion = async () => {
        try {
            const position = await new Promise<Position>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            if (position && position.coords) {
                setubicacaoActual({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });

                // Enviar coordenadas al backend y obtener la ciudad
                const ciudad = await enviarCoordenadasAlBackend(position.coords.latitude, position.coords.longitude);
                setCiudadActual(ciudad);
            }
        } catch (error) {
            console.error('Error al obtener la ubicación:', error);
        }
    };

    const enviarCoordenadasAlBackend = async (latitude: number, longitude: number) => {
        try {
            const response = await fetch('/api/getCity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ latitude, longitude }),
            });

            if (response.ok) {
                const data = await response.json();
                return data.city;
            } else {
                console.error('Error al enviar coordenadas al backend:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error al enviar coordenadas al backend:', error);
            return null;
        }
    };

    useEffect(() => {
        obtenerUbicacion();
    }, []); 

    return (
        <div>
            
        </div>
    );
};

export default Ubicação;
