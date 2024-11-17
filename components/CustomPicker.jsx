import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { ChevronDown, ChevronUp, Check } from "react-native-feather";

const CustomPicker = ({ label, className, ...props }) => {
  return (
    <View className={className}>
      <Text className="text-sm font-medium font-psemibold text-gray-700 mb-1">{label}</Text>
      <DropDownPicker
        style={{    // style prop
          borderColor: "#d1d5db",
          borderWidth: 2,
        }}
        dropDownContainerStyle={{   // dropDown containers styles  
          borderColor: "#d1d5db",
          borderWidth: 2,
        }}
        textStyle={{    // text styles
          color: "#374151",
          fontFamily: "CerebriSans-SemiBold",
          fontSize: 15,
        }}
        placeholderStyle={{ // placeholder styles
          color: "#d1d5db",
        }}
        listItemLabelStyle={{   // list item label styles
            color: "#d1d5db",
        }}
        selectedItemLabelStyle={{ // selected item label styles
          color: "#374151",
        }}
        ArrowDownIconComponent={({style}) => <ChevronDown stroke="#374151" strokeWidth={1.5} />}
        ArrowUpIconComponent={({style}) => <ChevronUp stroke="#374151" strokeWidth={1.5} />}
        TickIconComponent={({style}) => <Check stroke="#374151" strokeWidth={1.5} />}
        listMode="SCROLLVIEW" // Instead of FLATLIST, wich cannot be nested inside a ScrollView
        {...props}
      />
    </View>
  );
};

export default CustomPicker;
