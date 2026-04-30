import { useState } from "react";
import { Alert,Button,StyleSheet,Text,TextInput,View } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

const API_BASE = "https://petstore.swagger.io/v2"

export default function CreatePet(){
    const[name,setName]=useState("")
    const router = useRouter()//Hook de navegação

    const handleCreate = async ()=>{
        //Validação simples para nao permitir que o campo
        //do nome do pet esteja vazio
        if(!name.trim()){
            Alert.alert("Aviso","Informe o nome do pet!")
            return
        }

        const newPet = {
            id:Math.floor(Math.random()*10),
            name:name,
            status:"available",
            photoUrls:["https://www.fiap.com.br"]
        }
        
        console.log(newPet)//Mostra o pet que vai ser criado

        try{
            await axios.post(`${API_BASE}/pet`,newPet,{
                headers:{"Content-Type":"application/json"}
            })
            Alert.alert("Sucesso","Pet criado com sucesso.")
            setName("") //Limpar o TextInput do nome do pet
            router.back()//Volta para tela de listagem

        }catch(error){
            console.log(error)
            Alert.alert("Erro","Falha ao criar Pet.")
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Criar novo pet</Text>
            <TextInput 
                placeholder="Digite o nome do PET"
                style={styles.input}
                value={name}
                onChangeText={(value)=>setName(value)}
            />
            <Button 
                title="Criar Pet"
                onPress={handleCreate}
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