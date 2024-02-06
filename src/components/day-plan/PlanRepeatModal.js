import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'

export default function PlanRepeatModal({showModal, setShowModal, returnSelectedOption, availablePlans}) {

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Do you want to reuse one of your previous plans?
            </Text>
            <View style={styles.topButtonsView}>
            {
              availablePlans[0] ? (
                <Pressable
                  style={[styles.button, styles.buttonChoose]}
                  onPress={() => {
                    returnSelectedOption(1);
                    setShowModal(false);
                  }}>
                  <Text style={styles.textStyle}>
                    Use yesterday plan
                  </Text>
                </Pressable>
              ) : (null)
            }
            {
              availablePlans[1] ? (
                <Pressable
                  style={[styles.button, styles.buttonChoose]}
                  onPress={() => {
                    returnSelectedOption(2);
                    setShowModal(false);
                  }}>
                  <Text style={styles.textStyle}>
                    Use last weeks plan
                  </Text>
                </Pressable>
              ) : (null)
            }
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setShowModal(false);
              }}>
              <Text style={styles.textStyle}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 22,
  // },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#d42f2f',
    marginTop: 8
  },
  buttonChoose: {
    backgroundColor: '#1bad0e',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  topButtonsView: {
    flexDirection: 'row',
    gap: 4,
  }
})