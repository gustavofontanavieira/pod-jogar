import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import categorieService from "../services/categoriesService";

export default function DropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const categories = [];
  const [items, setItems] = useState(categories);

  categorieService.getAllCategories().then((response) => {
    response.map((item) => {
      categories.push({ label: item.name, value: item.name.toLowerCase() });
    });
  });

  return (
    <View style={dropDownPickerStyle.dropView}>
      <DropDownPicker
        style={dropDownPickerStyle.list}
        placeholder="Categorias"
        open={open}
        items={items}
        setOpen={setOpen}
        setItems={setItems}
        setValue={setValue}
        value={value}
      />
    </View>
  );
}

const dropDownPickerStyle = StyleSheet.create({
  list: {
    backgroundColor: "#f2f2f2",
  },
  item: {
    fontSize: 16,
    marginLeft: 8,
  },
  dropView: {
    width: "90%",
    height: 25,
  },
});
