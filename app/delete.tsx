import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {Alert,Button,StyleSheet,Text,TextInput,View} from "react-native"

const API_BASE = "https://petstore.swagger.io/v2"

export default function DeletePet(){
    const[id,setId]=useState("")
    const router = useRouter()//Hook de navegação

    const handleDelete = async()=>{
        //Validação no campo ID
        if(!id){
            Alert.alert("Aviso","Informe o ID do pet a ser deletado")
            return
        }

        try{
            await axios.delete(`${API_BASE}/pet/${id}`,{
                headers:{api_key:"special-key"}
            })
            Alert.alert("Sucesso","Pet Deletado com sucesso.")
            router.back()
        }catch(error){
            console.log("Error:",error)
            Alert.alert("Erro","Falha ao deletar pet.")
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Deletar Pet</Text>
            <TextInput 
                placeholder="Digite o ID do pet"
                style={styles.input}
                value={id}
                onChangeText={(value)=>setId(value)}
                keyboardType="numeric"
            />
            <Button 
                title="Deletar"
                onPress={handleDelete}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{flex:1,padding:20,backgroundColor:"#ccc"},
    input:{
        borderWidth:1,
        padding:8,
        borderRadius:8,
        marginBottom:10
    },
    title:{
        fontSize:22,
        fontWeight:"bold",
        marginBottom:20
    }
})