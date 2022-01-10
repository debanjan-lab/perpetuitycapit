import React from 'react';
import {
    SafeAreaView,
    StyleSheet
} from 'react-native';
import { Provider } from "react-redux";
import Store from "./redux/store";
import App from './App'
import Pay from './pay'
const Index = () => {
    return (
        <Provider store={Store}>
            <SafeAreaView style={styles.container}>
                <App />
            </SafeAreaView>
        </Provider>
    );
};
export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
});