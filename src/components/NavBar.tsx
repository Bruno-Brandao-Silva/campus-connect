import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Feed } from '@screens/Feed';
import { PostForm } from '@screens/PostForm';
import { Profile } from '@screens/Profie';
import { Search } from '@screens/Search';
import { House, MagnifyingGlass, UserCircle } from 'phosphor-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export function NavBar() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Feed"
                screenOptions={{
                    headerShown: false,
                    tabBarActiveBackgroundColor: '#001B1B',
                    tabBarInactiveBackgroundColor: '#001B1B',
                    tabBarLabelStyle: { display: 'none' }, // Hide the label
                    tabBarActiveTintColor: '#BF6A1F', // Set the active icon color

                    tabBarStyle: [{
                        borderTopWidth: 1,
                        borderTopColor: '#001B1B',
                    }]
                }}
            >
                <Tab.Screen
                    name="Feed"
                    component={Feed}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <House size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={Search}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MagnifyingGlass size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Post"
                    component={PostForm}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="plus-box-multiple-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <UserCircle size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}