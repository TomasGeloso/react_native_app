import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, Modal } from 'react-native';
import CustomButton from './CustomButton';

const CustomAlertModal = ({ title, message, visible, onCancel, onConfirm, confirmationButtonType, ...props}) => {

return (
    <View>
        {visible && <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />}
        <Modal
            animationType="none"
            transparent={true}
            onRequestClose={onCancel}
            visible={visible}
            {...props}
        >
            <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View className="bg-primary rounded-xl border-2 border-primary-400 p-6 items-center shadow-sm m-4">
                    <Text className="text-xl font-bold mb-4">
                        {title}
                    </Text>
                    <Text className="text-center mb-6">
                        {message}
                    </Text>
                    <View className="flex-row justify-between w-full">
                        <CustomButton
                            title="Cancel"
                            onPress={onCancel}
                            type='secondary'
                            containerStyles="w-1/2 mr-2"
                        />
                        <CustomButton
                            title="Confirm"
                            onPress={onConfirm}
                            type={confirmationButtonType}
                            containerStyles="w-1/2 ml-2"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    </View>
);
};

export default CustomAlertModal;

