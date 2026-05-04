import { Text, FlatList, StyleSheet, View, Alert, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useCallback } from "react";
import { useRouter,useFocusEffect } from "expo-router";
import axios from "axios"

//URL Base do Swagger(PetStore)
const API_BASE = "https://petstore.swagger.io/v2"

//Interface (tipagem do Pet)
interface Pet {
    id: number,
    name: string,
    status: "available" | "pending" | "sold"
}

export default function App() {
    const [pets, setPets] = useState<Pet[]>([])
    const router = useRouter()//Hook de navegação,

    //GET - Buscar os pets disponíveis
    const fetchPets = async () => {
        try {
            const response = await axios.get<Pet[]>(`${API_BASE}/pet/findByStatus`, {
                params: {
                    status: "available"
                }
            })

            //Ordeanar os pets pelo id
            const sortedPets = response.data.sort((a,b)=>a.id-b.id)
            
            //Armazena os pets no estado
            setPets(sortedPets)
        } catch (error) {
            console.log(error)
            Alert.alert("Error", "Falha ao buscar os pets.")
        }
    }

    //Buscar os pets ao iniciar o app
    useEffect(() => {
        fetchPets()
    }, [])

    //Busca sempre os pets quando a tela index recebe foco
    useFocusEffect(
        useCallback(()=>{//O useCallBack guarda uma função na memória
            //para que ela não seja recriada toda hora quando o componente
            //renderiza
            fetchPets()
        },[fetchPets])
    )
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={pets}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                renderItem={({ item }) => {
                    
                    return (
                        <View style={styles.card}>
                            <Text>ID do pet:{item.id}</Text>
                            <Text>Nome do pet:{item.name}</Text>
                        </View>

                    )
                }}
            />

            <View style={styles.buttons}>
                <Button title="Criar Pet" onPress={()=>router.push("./create")}/>
                <Button title="Atualizar Pet" onPress={()=>router.push("/update")}/>
                <Button title="Deletar Pet" onPress={()=>router.push("/delete")}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ccc"
    },
    card:{
        backgroundColor:"#fff",
        padding:10,
        marginVertical:6,
        borderRadius:10
    },
    buttons:{
        marginTop:20,
        gap:10
    }
})