# MQTT_REACT
Uso de la librería mqtt para react Native

Para el uso de mqtt en React Native se utilizó la librería <a href="https://github.com/AnxiousDarkly/react-native-mqtt">react_native_mqtt</a>
La librería de MQTT requiere de la libreria <a href="https://react-native-async-storage.github.io/async-storage/docs/install/">async-storage</a>

Para implementarla en tu proyecto solo cambia el host y puerto
```
const client = new Paho.MQTT.Client('TU_HOST O IP', PUERTO, 'APP_Android'); 
```
si tu broker MQTT necesita credenciales cambia el usuario y contraseña.
```
client.connect({
  useSSL: true, 
  userName:'TU_USUARIO', 
  password:'PASSWORD', 
  onSuccess: this.onConnect
});
```
Para cambiar el topic
```
message.destinationName = 'TU_TOPIC';
```
