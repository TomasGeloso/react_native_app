import React, { useState } from 'react';
import { View } from 'react-native';
import ConfirmationAlertButton from '@components/ConfirmationAlertButton';

const AlertButton = () => {

  const handleButtonPress = async () => {
    const result = await showAlert();
    if (result) {
      console.log('Confirmado');
      // Aquí puedes poner el código que se ejecutará después de confirmar
    } else {
      console.log('Cancelado');
      // Aquí puedes poner el código que se ejecutará después de cancelar
    }
  };

  return (
    <View className="flex-1 items-center justify-center h-full">
      <ConfirmationAlertButton
        buttonTitle="Abrir Alerta"
        buttonType="primary"
        alertTitle="Título de la alerta"
        alertMessage="Mensaje de la alerta"
        onConfirm={() => console.log('Confirmado')}
        onCancel={() => console.log('Cancelado')}
      />
    </View>
  );
};

export default AlertButton;

