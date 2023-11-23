import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feed } from '@screens/Feed';
import { Profile } from '@screens/Profie';
import { PostForm } from '@screens/PostForm';
import { Search } from '@screens/Search';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

export function NavBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Feed"
                screenOptions={{
                    headerShown: false,
                    tabBarInactiveBackgroundColor: '#00ff00',
                    tabBarActiveTintColor: '#e91e63',
                }}
            >
                <Tab.Screen
                    name="Feed"
                    component={Feed}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={Search}
                    options={{
                        tabBarLabel: 'Search',
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="magnifying-glass" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Post"
                    component={PostForm}
                    options={{
                        tabBarLabel: 'Post',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus-box-multiple-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="account" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}