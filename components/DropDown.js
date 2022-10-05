import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState} from "react";


export default function DropDown(){
    const [open, setOpen] = useState(false)
    const [items, setItems] = useState([
        {label: "Aventura", value:"aventura"},
        {label: "Ação", value:"ação"},
        {label: "Jogos Antigos", value:"jogos Antigos"},
        {label: "Jogos Novos", value:"jogos Novos"},
        {label:"História", value:"história"},
        {label: "RPG", value: "rpg"},
        {label: "Multiplayer", value:"multiplayer"},
        {label: "Singleplayer", value:"singleplayer"},
        {label: "Consoles", value:"consoles"},
        {label:"PC", value:"pC"},
        {label:"Moba", value:"moba"},
        {label:"Terror", value: "terror"},
      ]);

    return(
        <View style={dropDownPickerStyle.dropView} >
        <DropDownPicker style={dropDownPickerStyle.list} placeholder="Categorias" open={open} items={items} setOpen={setOpen} setItems={setItems}/>
        </View>

    )
}

const dropDownPickerStyle = StyleSheet.create({
    list: {
        backgroundColor: "#f2f2f2"
    },
    item: {
        fontSize: 16,
        marginLeft: 8
    },
    dropView: {
        width: "90%",
        height: 25,
    }
})