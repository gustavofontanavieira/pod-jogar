import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native"

export default function Card(){
    return(
        <TouchableOpacity style={cardStyle.podCard}>
            <View style={cardStyle.viewImage}>
             <Image source={require('../assets/images/login/ghost.jpg')} style={cardStyle.podImage} />
            </View>
            <View style={cardStyle.cardText}>
                <Text style={cardStyle.cardTitle}>Ghost B.C</Text>
                <Text style={cardStyle.cardDescription}>Black metal band</Text>
            </View>
        </TouchableOpacity>
    )
}


const cardStyle = StyleSheet.create({
    podCard : {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: 360,
        height: 70,
        marginTop: 12,
        backgroundColor: "#2c2c2b",
        borderRadius: 5
    },
    cardText: {
        marginLeft: 20,
    },
    cardTitle: {
        color: "#f2f2f2",
        fontSize: 15
    },
    cardDescription: {
        color: "#f2f2f2",
        fontSize: 10
    },
    viewImage:{
        height: "100%",
        width: "20%"
    },
    podImage: {
        width: "100%",
        height: "100%",
    }

})