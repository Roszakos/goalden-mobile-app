import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import React, { useState, useContext } from 'react'
import { GoalListGroupContext } from '../contexts/GoalListGroupContext';

const dropdownPicks = [
  {pick: 0, label: 'All'},
  {pick: 1, label: 'Low priority'},
  {pick: 2, label: 'Medium priority'},
  {pick: 3, label: 'High priority'},
];

export default function GoalsOrderPicker() {
  const { currentGroup, changeGroup } = useContext(GoalListGroupContext);

  const [allPicks, setAllPicks] = useState(dropdownPicks);
  const [currentPick, setCurrentPick] = useState(allPicks[currentGroup]);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.container}>
        <View style={styles.currentPickView}>
          <TouchableHighlight 
            onPress={() => {
              setShowMenu(previousValue => !previousValue);
            }}
          >
            <Text style={styles.currentPickText}>{currentPick.label}</Text>
          </TouchableHighlight>
        </View>
        <View style={[styles.dropdownMenuView, {display: showMenu ? 'flex' : 'none'}]}>
          {
            allPicks.map((pick) => {
              if (pick !== currentPick) {
                return(
                  <TouchableHighlight
                    onPress={() => {
                      setCurrentPick(pick);
                      setShowMenu(false);
                      changeGroup(pick.pick);
                    }}
                    key={pick.pick}
                  >
                    <Text style={styles.dropdownPickText}>{pick.label}</Text>
                  </TouchableHighlight>
                )
              }
            })
          }
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    alignItems: 'flex-end',
    marginRight: 10,
    backgroundColor: 'rgba(186, 222, 196,0.7)',
    position: 'absolute',
    top: 5,
    right: 5
  },
  currentPickView: {
    width: '100%'
  },
  currentPickText: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignSelf: 'flex-end'
  },
  dropdownMenuView: {
    width: '100%',
    alignItems: 'stretch',
  },
  dropdownPickText: {
    fontSize: 14,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignSelf: 'flex-end'
  },
})