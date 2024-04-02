import React, {useRef} from 'react';
import { Dimensions, View, StyleSheet, Pressable } from 'react-native';
import { Text, Icon, useTheme } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
 
export default function GoalsCarousel({goals}) {
  const width = Dimensions.get('window').width;
  const { colors } = useTheme();
  const carousel = useRef();
  console.log(goals);
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
				height={180}
				style={[styles.container, {borderColor: colors.tertiary}]}
				data={goals}
				scrollAnimationDuration={500}
				renderItem={({ index }) => (
					<View style={[styles.itemContainer, {backgroundColor: colors.lighterBackground}]}>
						<Pressable style={styles.pressable}>
							<View style={[styles.cardContent]}>
								<View style={[styles.topBar, {backgroundColor: colors.lighterBackground}]}>
									<Text 
										variant="titleMedium" 
										style={[styles.goalTitle, {color: colors.text}]}
									>
										{goals[index].title}
									</Text>
								</View>
								<View style={[styles.bottomBar, {backgroundColor: colors.background, borderTopColor: colors.tertiary}]}>
									<LinearGradient 
										colors={['rgba(28,27,27,1)', 'rgba(33,20,42,1)', colors.darkerPrimary]}
										locations={[0.2, 0.6, 0.8]}
										start={[0, 1]}
										end={[1, 0]}
										style={styles.bottomBarLine}
									>
										<Text>Time Left</Text>
										<Text>28 days</Text>
									</LinearGradient>
									<LinearGradient 
										colors={['rgba(0,0,0,1)',  'rgba(33,20,42,1)', 'rgba(133,83,168,1)']}
										locations={[0.2, 0.6, 0.8]}
										start={[0, 1]}
										end={[1, 0]}
										style={styles.bottomBarLine}
									>
										<Text>Milestones</Text>
										<Text>3 / 5</Text>
									</LinearGradient>
								</View>
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
	borderWidth: 2,
	borderRadius: 15
  },
  pressable: {
	width: '100%',
    flex: 1
  },
  itemContainer: {
	width: '100%',
	alignSelf: 'center',
    flex: 1,
  },
  topBar: {
	flex: 1,
	alignItems: 'center',
	padding: 14
  },
  cardContent: {
	flex: 1,
	justifyContent: 'space-between'
  },
  bottomBar: {
	borderTopWidth: 1,
  },
  bottomBarLine: {
	padding: 5,
	paddingHorizontal: 10,
	flexDirection: 'row',
	justifyContent: 'space-between',
  }
});
 