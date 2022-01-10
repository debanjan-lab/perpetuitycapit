import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const Pay = () => {
    return (
        <TouchableOpacity onPress={() => {
            var options = {
                description: 'Credits towards consultation',
                image: 'https://i.imgur.com/3g7nmJC.png',
                currency: 'INR',
                key: 'rzp_test_7jh7xVeFYorTkB',
                amount: '5000',
                name: 'Acme Corp',
                order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
                prefill: {
                    email: 'gaurav.kumar@example.com',
                    contact: '9191919191',
                    name: 'Gaurav Kumar'
                },
                theme: { color: '#53a20e' }
            }
            RazorpayCheckout.open(options).then((data) => {
                // handle success
                alert(`Success: ${data.razorpay_payment_id}`);
            }).catch((error) => {
                // handle failure
                console.warn(`Error: ${error.code} | ${error.description}`);
            });
        }}>
            <Text>Click here</Text>
        </TouchableOpacity>
    );
};
export default Pay;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
});