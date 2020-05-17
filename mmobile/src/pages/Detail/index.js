import React, { version } from 'react'
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native'
import styles from './styles'
import {Feather}  from '@expo/vector-icons'
import logoigm from '../../assets/logo.png'
import {useNavigation, useRoute} from '@react-navigation/native'
import * as mailComposer from 'expo-mail-composer'


export default function Details(){
    const  navigation  = useNavigation()
    const route = useRoute()

    const incident = route.params.incident
    const message = `Ola ${incident.name} estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de R$${incident.value}`

    function navigateBack(){
        navigation.goBack()
    }

    function sendMail(email){
        mailComposer.composeAsync({
            subject:`Heroi do caso:  ${incident.title}`,
            recipients:[email],
            body: message
        })
    }

    function sendWhatsApp(number){
        Linking.openURL(`whatsapp://send?phone=${number}&text=${message}`)

    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoigm}></Image>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={16} color="#E82041"></Feather>

                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop:0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>

                <Text style={styles.incidentProperty}>Caso:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>


                <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-Br', {style:'currency', currency:'BRL'}).format(incident.value)}</Text>
            </View>

            <View style={styles.contact}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso</Text>

                <Text style={styles.heroDescription}>Entre em contato</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity 
                    style={styles.action}
                    onPress={()=>sendWhatsApp(incident.whatsapp)}>
                       <Text style={styles.actionText}>Whatsapp</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.action}
                    onPress={()=>sendMail(incident.email)}>
                        <Text style={styles.actionText}>Email</Text>
                </TouchableOpacity>

            </View>
            
        </View>
    )
}