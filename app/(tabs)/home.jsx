import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, Pressable, TextInput, Modal, SafeAreaView, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { MoreVertical, Search, Plus, Camera } from 'react-native-feather';
import useSample from '@hooks/useSample';
import Logo from '@assets/logo.svg';
import FormField from '@components/FormField';
import CustomButton from '@components/CustomButton';
import { Picker } from 'react-native-picker/picker';

const Home = () => {
  const { samples, loading, error } = useSample();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSample, setSelectedSample] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  //  modal states
  const [selectedSampleType, setSelectedSampleType] = useState(null);
  const [selectedTestSpecimenType, setSelectedTestSpecimenType] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const filteredSamples = samples.filter(
    (sample) =>
      sample.sample_Number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.dimentions.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSample = useCallback(
    ({ item }) => (
      <Pressable className="flex-row m-2 bg-white rounded-xl border border-gray-300 p-1">
        
        <View className="bg-primary-100 rounded-md h-[50px] w-[50px] my-auto mr-2"></View>
        
        <View className="flex-1">
          <Text className="text-lg font-bold">M {item.sample_Number}</Text>
          <Text>{item.dimentions}</Text>
          <Text>{item.date_Received}</Text>
        </View>
        <Pressable className="justify-center">
          <MoreVertical color="gray" width={30} height={20} />
        </Pressable>
      </Pressable>
    ),
    []
  );

  const handleSamplePress = useCallback((sample) => {
    setSelectedSample(sample);
    setDetailModalVisible(true);
  }, []);

  const handleAddSample = useCallback(() => {
    setDetailModalVisible(true);
  }, []);

  const handleCreateSample = useCallback(() => {}, []);

  return (
    <SafeAreaView
      className="h-full"
      style={Platform.OS !== "web" ? { paddingTop: 48 } : {}}
    >
      <View>
        <Logo className="m-4" width={200} height={50} />
      </View>

      {error ? <CustomAlert message={error} /> : null}

      {loading ? (
        <View className="mt-7">
          <ActivityIndicator size="large" color="#111827" />
        </View>
      ) : (
        <View>
          <Pressable
            className="flex-row items-center justify-between bg-primary-100 rounded-full mx-3 p-2 px-3 shadow"
            onPress={() => this.textInput.focus()}
          >
            <TextInput
              ref={(input) => {
                this.textInput = input;
              }}
              className="flex-1 text-base"
              placeholder="Buscar muestras..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Search color="#666" width={25} height={25} />
          </Pressable>

          <FlatList
            data={filteredSamples}
            renderItem={renderSample}
            keyExtractor={(sample) => sample.id.toString()}
            className="m-1"
          />
        </View>
      )}

      <Pressable
        className="absolute right-5 bottom-5 bg-secondary w-14 h-14 rounded-xl justify-center items-center shadow-lg"
        onPress={handleAddSample}
      >
        <Plus color="#FFF" width={35} height={35} />
      </Pressable>

      <Modal
        visible={detailModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <View className="h-full bg-primary">
          <View className="m-2">
            <Text className="text-2xl font-csanssemibold">Crear Muestra</Text>

            <View className="m-2">
              <View className="flex justify-center items-center bg-primary-100 rounded-md h-32 w-32 my-auto mr-2">
                <Camera color="#111827" />
              </View>

              <View className="mt-2">
                <FormField
                  label="Número de Muestra"
                  value={selectedSample?.sample_Number}
                />

                <Picker
                  selectedValue={selectedSampleType}
                  onValueChange={(sampleTypeValue, sampleTypeIndex) =>
                    setSelectedLanguage(sampleTypeValue)
                  }
                >
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>

                <FormField
                  label="Dimensiones"
                  value={selectedSample?.dimentions}
                />

                <View className="flex-row justify-end items-center m-2 ">
                  <CustomButton
                    title="Cancelar"
                    type="secondary"
                    containerStyles="mr-2"
                    onPress={() => setDetailModalVisible(false)}
                  />
                  <CustomButton
                    title="Crear"
                    type="primary"
                    onPress={handleCreateSample}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default Home;