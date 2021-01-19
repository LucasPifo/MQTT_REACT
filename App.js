import React, {Component} from 'react';
import { StyleSheet, View, ToastAndroid, Button, Text, ActivityIndicator, Modal, Alert } from 'react-native';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-community/async-storage';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync : {
  }
});

export default class Aplicacion extends Component{
  constructor(props) {
    super(props);
    const client = new Paho.MQTT.Client('TU_HOST O IP', PUERTO, 'APP_Android'); 
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
    client.connect({
      useSSL: true, 
      userName:'TU_USUARIO', 
      password:'PASSWORD', 
      onSuccess: this.onConnect
    });
    this.state = {
      client,
      modal: true,
      estatus: '',
    };
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  onConnectionLost = (responseObject) => {
    if(responseObject.errorCode !== 0){
      ToastAndroid.show('onConnectionLost:'+responseObject.errorMessage,ToastAndroid.SHORT,ToastAndroid.CENTER);
    }
  }

  onConnect = () => {
    const { client } = this.state;
    client.subscribe('Instruccion');
    ToastAndroid.show("¡Se conectó exitosamente!",ToastAndroid.SHORT,ToastAndroid.CENTER);
    this.setState({modal: false});
  }

  onMessageArrived = (message) => {
    if(message.payloadString == 'Encender'){
      this.setState({estatus:'Encendido'});
    }else{
      this.setState({estatus:'Apagado'});
    }
  }

  render() {
    const { modal, estatus } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Prueba conexión con MQTT y control de Salidas de PLC S7 1200
          </Text>
        </View>
        <View style={styles.tablero}>
          <Button
            title="Activar Salida"
            color="#41BE44"
            onPress={() => {
              const { client } = this.state;
              let message = new Paho.MQTT.Message('Encender');
              message.destinationName = 'TU_TOPIC';
              client.send(message);
            }}
          />
          <Button
            title="Desactivar Salida"
            color="#F53030"
            onPress={() => {
              const { client } = this.state;
              let message = new Paho.MQTT.Message('Apagar');
              message.destinationName = 'TU_TOPIC';
              client.send(message);
            }}
          />
        </View>    
        <View>
          <Text style={styles.respuesta}>
            {estatus}
          </Text>
        </View>   
        <Modal animationType="slide" transparent visible={modal}>
          <View>
            <ActivityIndicator size="large" color="#F26000" />
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: 'black',
    padding: 10
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold"
  },
  tablero: {
    padding: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  respuesta:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
});
