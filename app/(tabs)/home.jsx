import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  Modal,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Search, Plus, Camera, Filter } from "react-native-feather";
import Logo from "@assets/logo.svg";

import useSample from "@hooks/useSample";
import useMaterials from "@hooks/useMaterials";
import useSampleTypes from "@hooks/useSampleTypes";
import useTestSpecimenTypes from "@hooks/useTestSpecimenTypes";

import FormField from "@components/FormField";
import CustomButton from "@components/CustomButton";
import CustomAlert from "@components/CustomAlert";
import CustomPicker from "@components/CustomPicker";
import ConfirmationAlertButton from "@components/ConfirmationAlertButton";
import { SampleCard } from "@components/SampleCard";

import { sampleValidationSchema } from "@schemas/sample";

const Home = () => {
  // Fetch data from API --------------------------------------------------------------------------------------
  const {
    samples,
    loading,
    error: sampleError,
    postSample,
    putSample,
    deleteSample,
  } = useSample();
  const {
    materials: fetchedMaterials,
    loading: loadingMaterials,
    error: errorMaterials,
  } = useMaterials();
  const {
    sampleTypes: fetchedSampleTypes,
    loading: loadingSampleTypes,
    error: errorSampleTypes,
  } = useSampleTypes();
  const {
    testSpecimenTypes: fetchedTestSpecimenTypes,
    loading: loadingTestSpecimenTypes,
    error: errorTestSpecimenTypes,
  } = useTestSpecimenTypes();

  // Set dropdown items when data is fetched ------------------------------------------------------------------
  useEffect(() => {
    if (fetchedMaterials && fetchedMaterials.length > 0) {
      const formattedMaterials = fetchedMaterials.map((material) => ({
        label: material.name,
        value: material.id,
      }));
      setMaterials(formattedMaterials);
    }

    if (fetchedSampleTypes && fetchedSampleTypes.length > 0) {
      const formattedSampleTypes = fetchedSampleTypes.map((sampleType) => ({
        label: sampleType.name,
        value: sampleType.id,
      }));
      setSampleTypes(formattedSampleTypes);
    }

    if (fetchedTestSpecimenTypes && fetchedTestSpecimenTypes.length > 0) {
      const formattedTestSpecimenTypes = fetchedTestSpecimenTypes.map(
        (testSpecimenType) => ({
          label: testSpecimenType.name,
          value: testSpecimenType.id,
        })
      );
      setTestSpecimenTypes(formattedTestSpecimenTypes);
    }
  }, [fetchedMaterials, fetchedSampleTypes, fetchedTestSpecimenTypes]);

  // Home screen states ---------------------------------------------------------------------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSelected, setIsFilterSelected] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const textInputRef = useRef(null);

  // Create/Edit sample Modal states --------------------------------------------------------------------------
  const [createSampleError, setCreateSampleError] = useState(null);
  const [isEditingSample, setIsEditingSample] = useState(false);
  const [selectedSampleToEdit, setSelectedSampleToEdit] = useState(null);

  // SampleTypes dropdown states
  const [selectedSampleType, setSelectedSampleType] = useState(null);
  const [sampleTypes, setSampleTypes] = useState([]);

  // TestSpecimenTypes dropdown states
  const [selectedTestSpecimenType, setSelectedTestSpecimenType] =
    useState(null);
  const [testSpecimenTypes, setTestSpecimenTypes] = useState([]);

  // Materials dropdown states
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [materials, setMaterials] = useState([]);

  // Dropdown open/close states
  const [dropdownStates, setDropdownStates] = useState({
    sampleTypes: false,
    materials: false,
    testSpecimenTypes: false,
  });

  // Text based input states
  const [textSampleData, setTextSampleData] = useState({
    sampleNumber: "",
    dimentions: "",
    observations: "",
  });

  // Search samples by filter ----------------------------------------------------------------------------------
  const filteredSamples = useCallback(() => {
    if (!searchQuery.trim()) return samples;
    
    return samples.filter(sample => {
      return (
        sample?.sample_Number?.toString().toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        sample?.dimentions?.toString().toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
        sample?.material?.name?.toLowerCase().includes(searchQuery.toLowerCase().trim()) || 
        sample?.sample_Type?.name?.toLowerCase().includes(searchQuery.toLowerCase().trim()) 
      );
    });
  }, [samples, searchQuery]);

  // Sample item ----------------------------------------------------------------------------------------------
  const renderSample = useCallback(
    ({ item }) => (
      <SampleCard
        sample={item}
        className="m-1"
        onEditPress={() => handleEditSamplePress(item)}
      />
    ),
    []
  );

  // Edit button in sample card
  const handleEditSamplePress = useCallback((sample) => {
    setIsEditingSample(true);
    setSelectedSampleToEdit(sample);

    setSelectedMaterial(sample.material_Id);
    setSelectedSampleType(sample.sample_Type_Id);
    setSelectedTestSpecimenType(sample.test_Specimen_Type_Id);
    setTextSampleData({
      sampleNumber: sample.sample_Number,
      dimentions: sample.dimentions,
      observations: sample.observations || "",
    });
    setDetailModalVisible(true);
  }, []);

  // Create new sample button ---------------------------------------------------------------------------------
  const handleCreateSampleModal = useCallback(() => {
    setIsEditingSample(false);
    setDetailModalVisible(true);
  }, []);

  // Create/Edit sample modal ---------------------------------------------------------------------------------
  // Cancel button in create sample modal
  const handleCancelCreateSample = useCallback(() => {
    setDetailModalVisible(false);
    handleOpenDropdown(false);
    resetFormData();
  }, []);

  // Delete button in Create/Edit sample modal when editing
  const handleDeleteSample = useCallback(async () => {
    try {
      await deleteSample(selectedSampleToEdit.id);
      resetFormData();
    } catch (error) {
      console.error("Error deleting sample:", error);
    }
  }, [selectedSampleToEdit]);

  // Create/Edit button in Create/Edit sample modal
  // When Creating
  const handleCreateSample = useCallback(async () => {
    try {
      const newSampleData = {
        sample_Number: textSampleData.sampleNumber,
        sample_Type_Id: selectedSampleType,
        material_Id: selectedMaterial,
        test_Specimen_Type_Id: selectedTestSpecimenType,
        dimentions: textSampleData.dimentions,
        observations: textSampleData.observations,
      };

      await sampleValidationSchema.validate(newSampleData);
      await postSample(newSampleData);

      resetFormData();
    } catch (error) {
      setCreateSampleError(error);
      console.error("Error creating sample:", error);
    }
  }, [
    textSampleData,
    selectedSampleType,
    selectedMaterial,
    selectedTestSpecimenType,
  ]);

  // When Editing
  const handleEditSample = useCallback(async () => {
    try {
      const editedSampleData = {
        sample_Number: textSampleData.sampleNumber,
        sample_Type_Id: selectedSampleType,
        material_Id: selectedMaterial,
        test_Specimen_Type_Id: selectedTestSpecimenType,
        dimentions: textSampleData.dimentions,
        observations: textSampleData.observations,
      };

      await sampleValidationSchema.validate(editedSampleData);
      await putSample(selectedSampleToEdit.id, editedSampleData);

      resetFormData();
    } catch (error) {
      setCreateSampleError(error);
      console.error("Error editing sample:", error);
    }
  }, [
    textSampleData,
    selectedSampleType,
    selectedMaterial,
    selectedTestSpecimenType,
    selectedSampleToEdit,
  ]);

  // Open/close other dropdowns when one is pressed -----------------------------------------------------------
  const handleOpenDropdown = useCallback((dropdownId) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      sampleTypes: false,
      materials: false,
      testSpecimenTypes: false,
      [dropdownId]: !prevState[dropdownId],
    }));
  }, []);

  // Reset form data ------------------------------------------------------------------------------------------
  const resetFormData = () => {
    setTextSampleData({
      sampleNumber: "",
      dimentions: "",
      observations: "",
    });
    setSelectedMaterial(null);
    setSelectedSampleType(null);
    setSelectedTestSpecimenType(null);
    setDetailModalVisible(false);
  };


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
        <View className="h-full pb-20">

          <View className="flex-row gap-1 mx-2 items-center justify-between">
            <View className="flex-row items-center bg-primary-100 rounded-full p-2 px-3 shadow-sm flex-1">
              <TextInput
                ref={textInputRef}
                className="flex-1 text-base border-0 outline-none font-csansregular"
                placeholder="Buscar muestras..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Pressable onPress={() => textInputRef.current?.focus()}>
                <Search color="#6B7280" width={25} height={25} />
              </Pressable>
            </View>

            <Pressable 
              className={`${isFilterSelected ? "bg-gray-300" : "bg-primary-100"} rounded-full p-3`}
              onPress={() => setIsFilterSelected(!isFilterSelected)}
            >
              <Filter color="#6B7280" width={20} height={20} />
            </Pressable>
          </View>
          {isFilterSelected && (
          <View className="flex gap-2 mx-1 my-2">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {sampleTypes.map((type, index) => (
                <Pressable
                  key={type.value}
                  className={`${
                    searchQuery === type.label
                      ? "bg-gray-300 border-primary-400"
                      : "bg-primary-100 border-primary-100"
                  } rounded-full ${
                    index !== 0 ? "mx-2" : ""
                  } p-2 px-3 shadow-sm`}
                  onPress={() => setSearchQuery(type.label)}
                >
                  <Text className="text-base font-csansregular">
                    {type.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {materials.map((material, index) => (
                <Pressable
                  key={material.value}
                  className={`${
                    searchQuery === material.label
                      ? "bg-gray-300"
                      : "bg-primary-100"
                  } rounded-full ${
                    index !== 0 ? "mx-2" : ""
                  } p-2 px-3 shadow-sm`}
                  onPress={() => setSearchQuery(material.label)}
                >
                  <Text className="text-base font-csansregular">
                    {material.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          )}
          
          <FlashList
            data={filteredSamples()}
            renderItem={renderSample}
            keyExtractor={(sample) => sample.id.toString()}
            className="m-1"
            contentContainerStyle={{ paddingBottom: 9 }}
            estimatedItemSize={169}
            ListEmptyComponent={() => (
              <View className="flex-1 m-3 justify-center items-center">
                <Text className="text-primary-500">
                  No se encontraron resultados
                </Text>
              </View>
            )}
          />
        </View>
      )}

      {sampleError ? (
        <CustomAlert containerStyles="m-2" message={sampleError.message} />
      ) : null}

      <Pressable
        className="absolute right-5 bottom-5 bg-secondary w-14 h-14 rounded-xl justify-center items-center shadow-lg"
        onPress={handleCreateSampleModal}
      >
        <Plus color="#FFF" width={35} height={35} />
      </Pressable>

      {/* ------------------------------ Create Sample ------------------------------*/}

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
          <ScrollView 
          className="h-full bg-primary"
          nestedScrollEnabled={true}
          >
            <View className="m-2 bg-primary z-40">
              <Text className="text-2xl font-csanssemibold">Crear Muestra</Text>
            </View>

            {createSampleError ? (
              <CustomAlert
                containerStyles="m-2"
                message={createSampleError.message}
              />
            ) : null}

            <View className="m-2">
              <View>
                <Text className="text-base font-csanssemibold text-secondary-100 mb-1">
                  Foto de la Muestra
                </Text>
                <View className="flex justify-center items-center bg-primary-100 rounded-md h-32 w-32">
                  <Camera color="#111827" />
                </View>
              </View>

              <View className="mt-2">
                <FormField
                  label="Número de Muestra"
                  placeholder="Ej: 001"
                  otherStyles="my-2"
                  keyboardType="numeric"
                  value={textSampleData.sampleNumber}
                  handleChangeText={(e) =>
                    setTextSampleData({ ...textSampleData, sampleNumber: e })
                  }
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
                  value={textSampleData.dimentions}
                  handleChangeText={(e) =>
                    setTextSampleData({ ...textSampleData, dimentions: e })
                  }
                />

                <FormField
                  label="Observaciones"
                  placeholder="Observaciones..."
                  otherStyles="my-2"
                  multiline
                  value={textSampleData.observations}
                  handleChangeText={(e) =>
                    setTextSampleData({ ...textSampleData, observations: e })
                  }
                />

                <View className="flex-row justify-end gap-2 items-center m-2 ">
                  <CustomButton
                    title="Cancelar"
                    type="secondary"
                    onPress={handleCancelCreateSample}
                  />

                  {isEditingSample ? (
                    <>
                      <ConfirmationAlertButton
                        buttonTitle="Eliminar"
                        buttonType="danger"
                        alertTitle="Confirmar Eliminación"
                        alertMessage="¿Estás seguro de que deseas eliminar esta muestra?"
                        onConfirm={handleDeleteSample}
                        onCancel={() => {}}
                      />
                      <ConfirmationAlertButton
                        buttonTitle="Modificar"
                        buttonType="primary"
                        alertTitle="Confirmar Modificación"
                        alertMessage="¿Estás seguro de que deseas modificar esta muestra?"
                        onConfirm={handleEditSample}
                        onCancel={() => {}}
                      />
                    </>
                  ) : (
                    <ConfirmationAlertButton
                      buttonTitle="Crear"
                      buttonType="primary"
                      alertTitle="Confirmar Creación"
                      alertMessage="¿Estás seguro de que deseas crear esta muestra?"
                      onConfirm={handleCreateSample}
                      onCancel={() => {}}
                    />
                  )}
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
