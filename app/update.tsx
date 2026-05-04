import axios from "axios";
import { useRouter } from "expo-router";
import { handleUrlParams } from "expo-router/build/fork/getStateFromPath-forks";
import { useState } from "react";
import {Alert,Button,StyleSheet,Text,TextInput,View} from "react-native"

const API_BASE = "https://petstore.swagger.io/v2"

export default function UpdatePet(){
    const[id,setId]=useState("")
    const[newName,setNewName]=useState("")
    const router = useRouter()//Hook de navegação

    //PUT - Função para atualizar o pet.

    const handleUpdate = async()=>{
        //Validação simples dos campos
        if(!id || !newName){
            Alert.alert("Aviso","Preencha todos os campos!")
            return
        }

        const updatePet = {
            id:Number(id),
            name:newName,
            status:"available",
            photoUrls:["https://www.fiap.com.br"]
        }

        try{
            await axios.put(`${API_BASE}/pet`,updatePet,{
                headers:{"Content-Type":"application/json"}
            })
            Alert.alert("Sucesso","Pet atualizado com sucesso!")
            router.back()//Retorna para a tela index
        }catch(error){
            console.log(error)
            Alert.alert("Error","Falha ao atualizar PET")
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Atualizar Pet</Text>
            <TextInput 
                placeholder="Digite o ID do pet"
                style={styles.input}
                value={id}
                onChangeText={(value)=>setId(value)}
                keyboardType="numeric"
            />

            <TextInput 
                placeholder="Digite o novo nome do pet"
                style={styles.input}
                value={newName}
                onChangeText={(value)=>setNewName(value)}
            />
            <Button 
                title="Atualizar pet"
                onPress={handleUpdate}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"#ccc"
    },
    title:{
        fontSize:22,
        fontWeight:"bold",
        marginBottom:20
    },
    input:{
        borderWidth:1,
        padding:8,
        borderRadius:8,
        marginBottom:10
    }
})