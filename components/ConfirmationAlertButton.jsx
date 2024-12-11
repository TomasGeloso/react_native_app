import React, { useState } from 'react';
import { View } from 'react-native';
import CustomButton from '@components/CustomButton';
import CustomAlertModal from '@components/CustomAlertModal';

const ConfirmationAlertButton = ({ 
  buttonTitle, 
  alertTitle, 
  alertMessage, 
  onConfirm, 
  onCancel,
  buttonType = 'primary',
  buttonStyles = {}
}) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleShowAlert = () => {
    setIsAlertVisible(true);
  };

  const handleConfirm = () => {
    setIsAlertVisible(false);
    onConfirm();
  };

  const handleCancel = () => {
    setIsAlertVisible(false);
    if (onCancel) onCancel();
  };

  return (
    <View>
      <CustomButton
        title={buttonTitle}
        onPress={handleShowAlert}
        type={buttonType}
        containerStyles={buttonStyles}
      />
      <CustomAlertModal
        title={alertTitle}
        message={alertMessage}
        visible={isAlertVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        confirmationButtonType={buttonType}
      />
    </View>
  );
};

export default ConfirmationAlertButton;

