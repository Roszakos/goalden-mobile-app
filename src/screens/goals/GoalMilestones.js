import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

// My components
import FormTextInput from '../../components/FormTextInput';

export default function GoalDetails({goal}) {
    const {colors} = useTheme();
    return (
        <View>
            <Text>Milestones</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
})