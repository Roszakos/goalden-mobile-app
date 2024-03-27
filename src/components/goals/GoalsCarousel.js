import React, {useRef} from 'react';
import { Dimensions, View, StyleSheet, Pressable } from 'react-native';
import { Text, Icon, useTheme } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
 
export default function GoalsCarousel({goals}) {
  const width = Dimensions.get('window').width;
  const { colors } = useTheme();
  const carousel = useRef();

    return (
        <View 
			style={{
				flex: 1, 
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<Pressable onPress={() => carousel.current.prev()}>
				<Icon
					source="arrow-left-thin"
					size={40}
				/>
			</Pressable>
			<Carousel
				ref={carousel}
				loop={true}
				width={width * 0.8}
				height={130}
				style={styles.container}
				data={goals}
				scrollAnimationDuration={500}
				renderItem={({ index }) => (
					<View style={styles.itemContainer}>
						<Pressable style={styles.pressable}>
							<View style={[styles.cardContent]}>
								<Text 
									variant="titleMedium" 
									style={[styles.goalTitle, {backgroundColor: colors.background, color: colors.secondary}]}
								>
									{goals[index].title}
								</Text>
							</View>
						</Pressable>
					</View>
				)}
			/>
			<Pressable onPress={() => carousel.current.next()}>
				<Icon
					source="arrow-right-thin"
					size={40}
				/>
			</Pressable>
		</View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
	backgroundColor: 'green',
  },
  pressable: {
	width: '100%',
	backgroundColor: 'red',
	height: 50,
	padding: 15,
    flex: 1,
    justifyContent: 'flex-end',

  },
  itemContainer: {
	width: '100%',
    backgroundColor: 'red',
	alignSelf: 'center',
    flex: 1,
  },
  goalTitle: {
    
  }
});
 