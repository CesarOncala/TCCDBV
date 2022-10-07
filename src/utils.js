import {Alert} from 'react-native'

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

 export {Message}