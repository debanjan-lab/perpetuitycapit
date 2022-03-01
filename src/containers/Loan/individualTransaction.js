import React, { Component } from 'react';
import { View,Text,ScrollView,StyleSheet} from 'react-native';
import { connect } from 'react-redux';
import AppHeaderInner from '../../components/AppHeaderInner';
import Colors from '../../constants/Colors';
import { BASE_URL } from '../../configs';
import axios from 'axios';
import NoRecord from '../../components/NoRecord';
import moment from 'moment';





class individualTransction extends Component{
    constructor(props){
        super(props);
        this.state={
            list:[],
            screenLoading:false
        }
    }
    componentDidMount() {
        this._focusListener = this.props.navigation.addListener('focus', () => {
            this._reload()
        });
    }
    _reload = () => {
        
        const loanId = this.props.route.params;
        let user_id = this.props.auth.user_id;
        let token = this.props.auth.api_token;
        let obj = {
            user_id: user_id,
            loan_id: loanId
        }
        
        console.log('sdhjgdssga',loanId)
        console.log('ooobbjjjj',obj)
        const url = `${BASE_URL}Auth/get-transaction-details`;
        console.log(url)
        const request = axios({
            method: 'POST',
            url: url,
            data: obj,
            headers: {
                // "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        request.then((res) =>{
       console.log('chsaggdgds',res)
       if(res.data.data.transaction.length){
        let dat = moment(new Date(res.data.data.transaction[0].payment_date)).format('Do MMM , YYYY')
        console.log('daat',dat)
               
        this.setState({
         list: [...this.state.list,{payment_date:dat,amount:res.data.data.transaction[0].amount,loan_type:res.data.data.loan_type}],
         screenLoading: false
     })

       }
       
        })
    }
    
    
    render(){
        console.log('listing',this.state.list)
        return(
            <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flex: 1 }}>
                <AppHeaderInner
                    headerText="Individual Transaction History"
                    navigation={this.props.navigation}
                    goBack={true}
                />
                { this.state.list.length < 1 && <NoRecord />}
             {   this.state.list.map((value, key) => {
                    return (
                        <View key={key} style={{ padding: 20 }}>
                    <View style={styles.successRow}>
                    <View style={{ justifyContent: 'space-between', 
                    flexDirection: 'row',}}>
                    <View>
                    <Text style={styles.dateText}>{value.payment_date}</Text>
                    <Text style={styles.loanTypeDecription}>{value.loan_type}</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.loanTypeDecription}>₹ {value.amount}</Text>
                    </View>
                    
                    </View>
                </View>
                   
                </View>
                    )
                })}
                    
            </View>
        </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    };
};


export default connect(mapStateToProps)(individualTransction);


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    successRow: {
        backgroundColor: Colors.lightGreen,
        marginTop: 20,
        padding: 20,
        borderRadius: 10
    },
    loanTypeDecription: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
        margin: 2
    },
    dateText: {
        color: '#1A5632',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 10
    }
})