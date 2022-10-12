import {Alert} from 'react-native'
import m from '../assets/m.png'
import dbv from '../assets/dbv.png'
import up from '../assets/up.jpg'

function Message(title,message,okFunction,cancelFunction,cancelbutton = true){
    return Alert.alert(
         title,
         message,
         [
          cancelbutton && {
             text: "Cancelar",
             onPress: () => cancelFunction != null? cancelFunction() : ()=>{},
             style: "cancel"
           },
           { text: "OK", onPress: () => okFunction != null? okFunction() : ()=>{}}
         ]
       );
 }


 const images = {
    m,
    dbv,
    up
 }
 


 export {Message,images}