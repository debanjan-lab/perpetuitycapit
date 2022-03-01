import React, { Component } from 'react';
import { Text, View,ScrollView,StyleSheet } from 'react-native';
import AppHeaderInner from '../../components/AppHeaderInner';
import NoRecord from '../../components/NoRecord';
import Colors from '../../constants/Colors';
import { getApprovedLoan } from '../../redux/actions/LoanActions';
import { connect } from 'react-redux';
import { BASE_URL } from '../../configs';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios';
import moment from 'moment';


const Row = ({ value}) => {
    return (

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
    )
}




class transactionHistory extends Component{
    constructor(props){
        super(props);
        this.state={
            // list:[{Date:'8th Oct,2021',vehicle:'Commercial vehicle',amount:'5000'},
            // {Date:'8th Oct,2021',vehicle:'Car Loan',amount:'10000'}],
            list:[],
            screenLoading:false
        }
    }
    componentDidMount() {
        this._focusListener = this.props.navigation.addListener('focus', () => {
            this._reload()
        });
    }

//     _reload = () => {
//         this.setState({ screenLoading: true })
//         let user_id = this.props.auth.user_id;
//         let token = this.props.auth.api_token;
//         let obj = {
//             user_id: user_id,
//             token: token
//         }
//         console.log('objjj',obj)
//         getApprovedLoan(obj).then((res) => {
//             console.log("applied loans", res.data)
//             res.data.map((item) =>{
//                 const payload = {
//                     user_id: user_id,
//                     loan_id:item.loan_id
//                 }
//                 console.log('payload',payload)
//              const url = `${BASE_URL}Auth/get-transaction-details`;
//              console.log(url)
//              const request = axios({
//                  method: 'POST',
//                  url: url,
//                  data: payload,
//                  headers: {
//                      // "Content-Type": 'application/json',
//                      "Authorization": `Bearer ${token}`
//                  }
//              });
//              request.then((res) =>{
//                  if(item){
//                      console.log('responsedata',res.data.data)

//             var strng = res.data.data[0].payment_date
//   var arr = strng.split("-").reverse();
// var month =["1",'Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
// var day = '';
// if(arr[0] == 1){
//   day = 1+'st'
// }
// else if(arr[0] == 2){
//   day = 2+'nd'
// }
// else if(arr[0] == 3){
//    day = 3+'rd'
// }
// else if(arr[0]>3 && arr[0]<10){
//   day = arr[0].split('')[1]+'th'
// }
// else if(arr[0]>9){
//   day = arr[0] +'th'
// }
 
// var dat = day +" "+month[parseInt(arr[1])]+","+arr[2]
// console.log(dat)
         



//                     this.setState({
//                         list: [...this.state.list,{payment_date:dat,amount:res.data.data[0].amount,loan_type:res.data.data[1].loan_type}],
//                         screenLoading: false
//                     })
//                  }
                
            
//                  })
//             })

            
//             //  alert(res.message)
//             // this.setState({
//             //     list: res.status ? res.data : [],
//             //     screenLoading: false
//             // })
//         })

//     }
_reload = () => {
    this.setState({ screenLoading: true })
    var user_id = this.props.auth.user_id;
    let token = this.props.auth.api_token;

    let obj = {
        user_id: user_id,
    }
    
    
    console.log('sdhjgdssga',user_id)
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
   console.log('chsaggdgds',res.data.data)
   
   res.data.data.map((item) =>{
       let dat = moment(new Date(item.payment_date)).format('Do MMM , YYYY')
    console.log('daat',dat)

    this.setState({
     list: [...this.state.list,{payment_date:dat,amount:item.amount,loan_type:item.loan_type}],
     screenLoading: false
 })

   })
  
    })
}

    render(){
        console.log('listing',this.state.list)
        return(
            <ScrollView contentContainerStyle={styles.container}>
            <Spinner visible={this.state.screenLoading} />
            <View style={{ flex: 1 }}>
                <AppHeaderInner
                    headerText="Transaction History"
                    navigation={this.props.navigation}
                    goBack={true}
                />
                    <View style={{ padding: 20 }}>
                    {!this.state.screenLoading && this.state.list.length < 1 && <NoRecord />}
                    {
                        this.state.list.map((value, key) => {
                            return (
                                <Row value={value} key={key}/>
                            )
                        })
                    }
                </View>
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


export default connect(mapStateToProps)(transactionHistory);


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