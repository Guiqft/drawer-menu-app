import React from 'react';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import styles from './styles';

import Home from '../pages/Home';
import Contact from '../pages/Contact';
import About from '../pages/About';

import ProfileImg from '../assets/profile-picture.png';

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
                <AppStack.Screen name="Contact" component={Contact} />
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

            <View style={styles.menuItemList}>
                <DrawerItem 
                    label="Home"
                    //'style': style the item view
                    //'labelStyle': style only the item text
                    style={styles.menuItem}
                    labelStyle={styles.menuItemText}
                    onPress={() => props.navigation.navigate("Home")}
                    icon={() => <Feather name="home" size={24} color="#E5E5E5" />}
                /> 
                <DrawerItem 
                    label="Contact"
                    style={styles.menuItem}
                    labelStyle={styles.menuItemText}
                    onPress={() => props.navigation.navigate("Contact")}
                    icon={() => <Feather name="phone" size={24} color="#E5E5E5" />}
                />
                <DrawerItem 
                    label="About"
                    style={styles.menuItem}
                    labelStyle={styles.menuItemText}
                    onPress={() => props.navigation.navigate("About")}
                    icon={() => <Feather name="info" size={24} color="#E5E5E5" />}
                />
            </View>
        </DrawerContentScrollView>
    );
}

export default function Drawer(){
    const [progress, setProgress] = React.useState(new Animated.Value(0));

    const scale = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    });

    const borderRadius = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0, 30],
    });

    const ScreensStyles = { borderRadius, transform: [{ scale }] };

    return(
        <NavigationContainer>
            <AppDrawer.Navigator 
                initialRouteName="Home"
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={styles.drawerStyles}
                // drawerContentOptions={{
                //     activeBackgroundColor: "black",
                //     itemContainerStyle: {
                //         backgroundColor: "black",
                //     },
                // }}
                contentContainerStyle={{ flex: 1 }}
                sceneContainerStyle={{
                    backgroundColor: "#FF4F5B",
                }}
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