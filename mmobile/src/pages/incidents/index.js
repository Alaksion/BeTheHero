import React, {useEffect, useState} from 'react'
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native'
import styles from './styles'
import {Feather} from '@expo/vector-icons'
import {useNavigation, useTheme} from '@react-navigation/native'
import api from '../../services/api'


import logoImg from '../../assets/logo.png'

export default function  Incidents(){
    const navigation  =  useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateDetail(incident){
        navigation.navigate('Details', {incident})

    }

    async function loadIncidents(){
        if(loading){
            return
        }

        if(total>0  && incidents.length ===  total){
            return
        }

        setLoading(true)

        const res = await api.get('incidents', {params: {page}})

        setIncidents([...incidents, ...res.data])
        setTotal(res.headers['x-total-count'])
        setLoading(false)
        setPage(page + 1)
    }

    useEffect(()=>{
        loadIncidents()
    }, [])

    return(
        <View style={styles.container}>

            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text  style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem vindo</Text>
            <Text style={styles.description}>Escolha um dos casos e salve o dia!</Text>

            <FlatList 
            style={styles.incidentList}
            data={incidents}
            keyExtractor={incident => String(incident.id)}
            showsVerticalScrollIndicator={true}
            onEndReached={loadIncidents}
            onEndReachedThreshold={0.2}
            renderItem={({item:incident})=>(
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>Caso:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style:  'currency', currency:'BRL'}).format(incident.value)}</Text>

                    <TouchableOpacity style={styles.detailButton} onPress={()=>navigateDetail(incident)}>
                        <Text style={styles.detailButtonText}>Ver mais Detalhes</Text>
                        <Feather name={'arrow-right'} size={16} color={'#e02041'}></Feather>
                    </TouchableOpacity>

                </View>
                
            )}
            />
        </View>
    )
}