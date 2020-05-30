import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Home from './pages/Home';
import About from './pages/About';

import ProfileImg from './assets/profile-picture.png';

const AppStack = createStackNavigator();
const AppDrawer = createDrawerNavigator();

const Screens = ({ navigation, style }) =>{
    return(
        <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
            <AppStack.Navigator screenOptions = {{
                headerTransparent: true,
                headerTitle: null,
                headerLeft: () => (
                    <TouchableOpacity 
                        style={styles.menuButton}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="menu" size={24} color="white" />
                    </TouchableOpacity>
                )
            }}>
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="About" component={About} />
            </AppStack.Navigator>
        </Animated.View>
    );
};

const DrawerContent = props => {
    return(
        <DrawerContentScrollView {...props}>
            <View style={styles.profileInfos}>
                <Image source={ProfileImg}/>
                <Text style = {styles.profileInfosText}> 
                    Guilherme Oliveira 
                </Text>
            </View>

            <DrawerItem 
                label="Home"
                labelStyle={styles.menuItem}
                onPress={() => props.navigation.navigate("Home")}
                icon={() => <Feather name="home" size={24} color="black" />}
            /> 
            <DrawerItem 
                label="About"
                labelStyle={styles.menuItem}
                onPress={() => props.navigation.navigate("About")}
                icon={() => <Feather name="info" size={24} color="black" />}
            /> 
        </DrawerContentScrollView>
    );
}

export default function Routes(){
    const [progress, setProgress] = React.useState(new Animated.Value(0));

    const scale = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });

    const ScreensStyles = { transform: [{ scale }] };

    return(
        <NavigationContainer>
            <AppDrawer.Navigator 
                drawerType="slide"
                overlayColor="transparent"
                drawerContentOptions={{
                    activeBackgroundColor: "transparent",
                    activeTintColor: "green",
                    inactiveTintColor: "green",
                }}
                initialRouteName="Home"
                drawerContent={props => {
                    setProgress(props.progress);
                    return <DrawerContent {...props} />;
                }}
            >
                <AppDrawer.Screen name="Screens">
                    {props => <Screens {...props} style={ScreensStyles} />}
                </AppDrawer.Screen>
            </AppDrawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    stack: {
        flex: 1,
        shadowColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5,
    },

    menuButton: {
        backgroundColor: "black",
        padding: 5,
        marginLeft: 10,
        borderRadius: 5,
    },

    profileInfos: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        marginLeft: 10,
    },

    profileInfosText: {
        fontWeight: "bold",
        fontSize: 19,
        marginLeft: 17,
    },

    menuItem: {
        marginLeft: -13,
    },
});