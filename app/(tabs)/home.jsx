import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Modal,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { MoreVertical, Search, Plus, Camera } from "react-native-feather";
import DropDownPicker from "react-native-dropdown-picker";
import Logo from "@assets/logo.svg";
import useSample from "@hooks/useSample";
import FormField from "@components/FormField";
import CustomButton from "@components/CustomButton";
import CustomAlert from "@components/CustomAlert";
import CustomPicker from "@components/CustomPicker";

const Home = () => {
  const { samples, loading, error } = useSample();

  // Home screen states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSample, setSelectedSample] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // Modal states
  const [dropdownStates, setDropdownStates] = useState({  // dropdown open/close states
    sampleTypes: false,
    materials: false,
    testSpecimenTypes: false,
  });

  const [selectedSampleType, setSelectedSampleType] = useState(null);
  const [sampleTypes, setSampleTypes] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  const [selectedTestSpecimenType, setSelectedTestSpecimenType] =
    useState(null);
  const [testSpecimenTypes, setTestSpecimenTypes] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materials, setMaterials] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

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

  const handleOpenDropdown = useCallback((dropdownId) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      sampleTypes: false,
      materials: false,
      testSpecimenTypes: false,
      [dropdownId]: !prevState[dropdownId],
    }));
  }, []);

  return (
    <SafeAreaView
      className="h-full"
      style={Platform.OS !== "web" ? { paddingTop: 48 } : {}}
    >
      <View className="m-4">
        <Logo width={200} height={50} />
      </View>

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

      {error ? (
        <CustomAlert containerStyles="m-2" message={error.message} />
      ) : null}

      <Pressable
        className="absolute right-5 bottom-5 bg-secondary w-14 h-14 rounded-xl justify-center items-center shadow-lg"
        onPress={handleAddSample}
      >
        <Plus color="#FFF" width={35} height={35} />
      </Pressable>

      <Modal
        visible={detailModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "android" ? "padding" : "height"}
          className="h-full"
        >
          <ScrollView className="h-full bg-primary">
            <View className="m-2 bg-primary z-40">
              <Text className="text-2xl font-csanssemibold">Crear Muestra</Text>
            </View>

            <View className="m-2">
              <View className="flex justify-center items-center bg-primary-100 rounded-md h-32 w-32 my-auto mr-2">
                <Camera color="#111827" />
              </View>

              <View className="mt-2">
                <FormField
                  label="Número de Muestra"
                  placeholder="Ej: 001"
                  otherStyles="my-2"
                  value={selectedSample?.sample_Number}
                />

                <CustomPicker
                  label="Tipo de Muestra"
                  className="my-2 z-30"
                  open={dropdownStates.sampleTypes}
                  items={sampleTypes}
                  value={selectedSampleType}
                  setOpen={() => handleOpenDropdown("sampleTypes")}
                  setValue={setSelectedSampleType}
                  setItems={setSampleTypes}
                />
                <CustomPicker
                  label="Material"
                  className="my-2 z-20"
                  open={dropdownStates.materials}
                  items={materials}
                  value={selectedMaterial}
                  setOpen={() => handleOpenDropdown("materials")}
                  setValue={setSelectedMaterial}
                  setItems={setMaterials}
                />

                <CustomPicker
                  label="Tipo de Probeta"
                  className="my-2 z-10"
                  open={dropdownStates.testSpecimenTypes}
                  items={testSpecimenTypes}
                  value={selectedTestSpecimenType}
                  setOpen={() => handleOpenDropdown("testSpecimenTypes")}
                  setValue={setSelectedTestSpecimenType}
                  setItems={setTestSpecimenTypes}
                />

                <FormField
                  label="Dimensiones"
                  placeholder="Ej: 10x10x10"
                  otherStyles="my-2"
                  value={selectedSample?.dimentions}
                />

                <FormField
                  label="Observaciones"
                  placeholder="Observaciones..."
                  otherStyles="my-2"
                  value={selectedSample?.observations}
                  multiline
                />

                <View className="flex-row justify-end items-center m-2 ">
                  <CustomButton
                    title="Cancelar"
                    type="secondary"
                    containerStyles="mr-2"
                    onPress={() => {
                      setDetailModalVisible(false); // close modal
                      handleOpenDropdown(false); // close all dropdowns
                    }}
                  />
                  <CustomButton
                    title="Crear"
                    type="primary"
                    onPress={handleCreateSample}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
