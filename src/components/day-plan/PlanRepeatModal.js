import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'
import React from 'react'

export default function PlanRepeatModal({showModal, setShowModal, returnSelectedOption, availablePlans}) {
  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          returnSelectedOption(3);
          setShowModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Do you want to repeat one of your previous plans?
            </Text>
            <View style={styles.topButtonsView}>
              <Pressable
                style={styles.buttonChoosePressable}
                disabled={!availablePlans[0]}
                onPress={() => {
                  returnSelectedOption(1);
                  setShowModal(false);
                }}
              >
                <View style={styles.buttonChoose}>
                  <View style={[styles.button, availablePlans[0] ? null : styles.buttonInactive]}>
                    <Text style={styles.textStyle}>
                      Use yesterday plan
                    </Text>
                  </View>
                </View>
              </Pressable>
              <Pressable
                style={styles.buttonChoosePressable}
                disabled={!availablePlans[1]}
                onPress={() => {
                  returnSelectedOption(2);
                  setShowModal(false);
                }}
              >
                <View style={styles.buttonChoose}>
                  <View style={[styles.button, availablePlans[1] ? null : styles.buttonInactive]}>
                    <Text style={styles.textStyle}>
                      Use last weeks plan
                    </Text>
                  </View>
                </View>
              </Pressable>
            </View>
            <View style={styles.buttonCloseView}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  returnSelectedOption(3);
                  setShowModal(false);
                }}>
                <Text style={styles.textStyle}>
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '95%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 25,
  },
  button: {
    borderRadius: 6,
    padding: 10,
  },
  buttonClose: {
    backgroundColor: '#d42f2f',
    elevation: 10,
  },
  buttonChoose: {
    backgroundColor: '#1bad0e',
    elevation: 10,
    borderRadius: 6,
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
  },
  buttonCloseView: {
    marginTop: 20,
    alignItems: 'flex-end',
    width: '100%'
  },
  buttonChoosePressable: {
    borderRadius: 6,
  },
  buttonInactive: {
    backgroundColor: '#000',
    opacity: 0.6
  }
})