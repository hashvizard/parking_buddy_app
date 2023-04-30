import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

const DialogBox = ({
    title,description,actionText,pressed,alertSucces
}) => {
  const {alert} = useSelector(state=> state.appState);

  const hideDialog = () => pressed();

  return (
    <View style={{position:"absolute",width:"100%",height:"100%",zIndex:alert ? 4 : -1}}>
        <Portal>
          <Dialog visible={alert} onDismiss={()=> hideDialog()}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{description}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={()=> alertSucces()}>{actionText}</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};

export default DialogBox;