// import React, { Component } from 'react';
// import {View,StyleSheet,Text,ScrollView,TouchableOpacity} from 'react-native';
// import AppHeaderInner from '../../components/AppHeaderInner';
// import Colors from '../../constants/Colors';
// import fontSelector from '../../constants/FontSelectors';
// import Spinner from 'react-native-loading-spinner-overlay';
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { BASE_URL } from '../../configs';
// import axios from 'axios';
// import RazorpayCheckout from 'react-native-razorpay';




// class LoanDetails extends Component{
//     constructor(props){
//         super(props);
//         this.state={
//             list: {},
//             screenLoading: true,
//             disabled: true,
//             date:null
//         }
//     }

//     componentDidMount() {
//         this._focusListener = this.props.navigation.addListener('focus', () => {
//             this._reload()
//         });
//     }
    

//     _reload = () => {
//         var today = new Date();
//         var dd = String(today.getDate()).padStart(2, '0');
//         var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//         var yyyy = today.getFullYear();

//         today = dd + '/' + mm + '/' + yyyy;

//         var dt = today;
//         console.log('date',dt)
//         console.log('dataaaaaa',this.props.route.params)
         
//         let payload = this.props.route.params
                 
//                 console.log("payload", payload.token)
//                 const url = `${BASE_URL}Auth/get-loan-details`;
//                 console.log(url)
//                 console.log(payload.token)
//                 const request = axios({
//                     method: 'POST',
//                     url: url,
//                     data: payload,
//                     headers: {
//                         // "Content-Type": 'application/json',
//                         "Authorization": `Bearer ${payload.token}`
//                     }
//                 });
//                 request.then((res) =>{
//                     console.log('dataaaa',res.data.data)
//                     this.setState({ 
//                         list: res.data.data,
//                         screenLoading: false,
//                         date:dt
//                      })
                    
//                 })
                
//                 // return request.then(
//                 //     response => {
//                 //         // console.log("response", response)
//                 //         resolve(response.data);
//                 //     },
//                 //     err => {
        
//                 //         // console.log("err===((", err.response)
//                 //     }
//                 // );
            
        
        
//         }
//         payHandler = (paymentmethod) =>{
//            if(paymentmethod){
//                console.log('it is true')
               
//             let pyload = this.props.route.params;
//             const obj = {
//                 user_id:this.props.route.params.user_id,
//                 emi:this.state.list.total_amnt_paid
//             }
//             console.log('pyload',pyload)
//             console.log('dta',obj)
                     
//                     console.log("payload", pyload.token)
//                     const url = `${BASE_URL}Auth/order-details`;
//                     console.log(url)
//                     console.log(pyload.token)
//                     const request = axios({
//                         method: 'POST',
//                         url: url,
//                         data: obj,
//                         headers: {
//                             // "Content-Type": 'application/json',
//                             "Authorization": `Bearer ${pyload.token}`
//                         }
//                     });
//                     request.then((res) =>{
//                         const datas = res.data.data
//                         console.log('cvalueee',datas)
//                         var options = {
//                             description: 'EMI Payment',
//                             image: 'https://i.imgur.com/3g7nmJC.png',
//                             currency: 'INR',
//                             key: 'rzp_test_7jh7xVeFYorTkB',
//                             amount: datas.id,
//                             name: 'Perpetuty Capital',
//                             order_id: datas.id,//Replace this with an order_id created using Orders API.
//                             prefill: {
//                                 email: this.state.list.email,
//                                 contact: this.state.list.user_mobile,
//                                 name: this.state.list.full_name
//                             },
//                             theme: { color: '#53a20e' }
//                         }
                        
//                         RazorpayCheckout.open(options).then((data) => {
//                             const val = {
//                                 user_id:this.props.route.params.user_id,
//                                 emi_id:this.state.list.emi_id,
//                                 emi_number:this.state.list.emi_number,
//                                 loan_id:this.state.list.loan_id,
//                                 order_id:datas.id,
//                                 emi:this.state.list.total_amnt_paid,
//                                 trx_id:data.razorpay_payment_id,
//                                 penalty:this.state.list.penalty,
//                                 emi_paid_status_id:this.state.list.emi_paid_status_id,
//                                 actual_emi:this.state.list.emival,
//                                 payment_date:this.state.date,
//                                 razorpay_signature:data.razorpay_signature,
//                                 status:2
//                             }
//                             console.log('all values',val)
//                             console.log('token',pyload.token)

//                             const urll = `${BASE_URL}Auth/loan-payment`;

//                             const requestt = axios({
//                                 method:'POST',
//                                 url:urll,
//                                 data:val,
//                                 headers: {
//                                     // "Content-Type": 'application/json',
//                                     "Authorization": `Bearer ${pyload.token}`
//                                 }
//                             })
//                             // handle success
//                             console.log('Successs',data);
//                             alert(`Success: ${data.razorpay_payment_id}`);
//                             requestt.then((res) =>{
//                              console.log('ressss',res)
                             
//                             })

//                         }).catch((error) => {
//                             // handle failure
//                             console.log('error',error);
//                         });
//                         this.props.navigation.navigate('DashboardScreen')
//                         // this.paymentgateway(res.data.data)
//                         // this.props.navigation.navigate('Pay',res.data.data)
                        
//                     })



//            }
           
//         }
//         // paymentgateway = (data) =>{
//         //     console.log('rajesh',data.id,data.amount)
          

//         // }

        
        
//     render(){
       

//         return(
//           <View>
//           {this.state.list ?
//             <ScrollView contentContainerStyle={styles.containers}>
//             <Spinner visible={this.state.screenLoading} />
              
            
//                 <View style={{ flex: 1 }}>
//                     <AppHeaderInner
//                         headerText="Loan Details"
//                         navigation={this.props.navigation}
//                         goBack={true}
//                     />



//                     <View style={{ padding: 20 }}>
//                     <View style={styles.rowContainer}>
//                     <View style={{  padding: 10, borderBottomLeftRadius: 10,borderBottomRightRadius: 10,backgroundColor: '#EEF9EF'}}>
//                     <View style={{ justifyContent: 'center',alignItems:'center',flexDirection:'column' }}>
//                     <Text style={{color:'#1A5632'}}>Amount Payable</Text>
//                     <Text style={{fontSize:20,color:'black'}}>₹ {this.state.list.total_amnt_paid}</Text>         
//                 </View>
//                 <View style={{ margin: 10 ,borderBottomColor:'black', borderWidth: 0.25 }} />
//                 <View style={styles.container}>
//                 <Text>Payment Date</Text>
//                 <Text style={styles.txtColor}>{this.state.list.payment_date}</Text>         
//             </View>
//                             </View>
//                             </View>
//                     </View>





//                     <Text style={{marginLeft:35,color:'#1A5632'}}>Details of Loan</Text>
//                     <View style={{paddingHorizontal:20,marginVertical:10}}>
                    
//                     <View style={styles.rowContainer}>
//                     <View style={styles.successRow}>
//                     <View style={styles.container}>
//                                 <Text>EMI Amount</Text>
//                                 <Text style={styles.txtColor}>₹ {this.state.list.emival}</Text>         
//                             </View>
//                             <View style={styles.container}>
//                             <Text>No. of EMI Due</Text>
//                             <Text style={styles.txtColor}>{this.state.list.emi_count} month</Text>         
//                         </View>
//                         <View style={styles.container}>
//                         <Text>Amount Which They Want to Pay</Text>
//                         <Text style={styles.txtColor}>₹ {this.state.list.total_amnt_paid}</Text>         
//                     </View>
//                             </View>
//                             </View>
//                     </View>

//                     <Text style={{marginLeft:35,color:'#1A5632'}}>Details of Loan</Text>
//                     <View style={{paddingHorizontal:20,marginVertical:10}}>
                    
//                     <View style={styles.rowContainer}>
//                     <View style={styles.successRow}>
//                     <View style={styles.container}>
//                                 <Text>LAN</Text>
//                                 <Text style={styles.txtColor}>{this.state.list.lan_no}</Text>         
//                             </View>
//                             <View style={styles.container}>
//                             <Text>Type</Text>
//                             <Text style={styles.txtColor}>{this.state.list.type}</Text>         
//                         </View>
//                         <View style={styles.container}>
//                         <Text>Amount</Text>
//                         <Text style={styles.txtColor}>₹ {this.state.list.amount}</Text>
//                         </View>   
//                         <View style={styles.container}>
//                         <Text>Interest</Text>
//                         <Text style={styles.txtColor}>{this.state.list.interest}%</Text>    
//                         </View>
//                         <View style={styles.container}>
//                         <Text>Date</Text>
//                         <Text style={styles.txtColor}>{this.state.list.startdate} to {this.state.list.enddate}</Text>      
                            
//                     </View>
//                             </View>
//                             </View>
//                     </View>
//                     <Text style={{marginLeft:35,color:'#1A5632'}}>Details of Borrow</Text>
//                     <View style={{paddingHorizontal:20,marginVertical:10}}>
                    
//                     <View style={styles.rowContainer}>
//                     <View style={styles.successRow}>
//                     <View style={styles.container}>
//                                 <Text>Name</Text>
//                                 <Text style={styles.txtColor}>{this.state.list.full_name}</Text>         
//                             </View>
//                             <View style={styles.container}>
//                             <Text>Address</Text>
//                             <Text style={styles.txtColor}>{this.state.list.loan_applied_under_city}</Text>         
//                         </View>
//                         <View style={styles.container}>
//                         <Text>Phone</Text>
//                         <Text style={styles.txtColor}>+91 {this.state.list.user_mobile}</Text>         
//                     </View>
//                     <View style={styles.container}>
//                         <Text>Email</Text>
//                         <Text style={styles.txtColor}>{this.state.list.email}</Text>         
//                     </View>
//                             </View>
//                             </View>
//                     </View>
//                     { this.state.list.paymentMethod ? 
//                     <TouchableOpacity
                   
//                     style={{
//                         backgroundColor: Colors.greenColor,
//                         alignItems: 'center',
//                         paddingVertical: wp(3.5),
//                         borderRadius: wp(7),
//                         marginTop: wp(5),
//                         marginHorizontal:20
//                     }}
//                     onPress={() =>this.payHandler(this.state.list.paymentMethod)}
//                   >
                    
//                         <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.whiteColor}}>Pay Now</Text> 
                        
//                   </TouchableOpacity>
//                   : 
//                   <View>
//                   <Text style={{color:'red'}}>payment method not active/available, please contact admin</Text>
//                   <TouchableOpacity
//                     style={{
//                         backgroundColor: Colors.greenColor,
//                         alignItems: 'center',
//                         paddingVertical: wp(3.5),
//                         borderRadius: wp(7),
//                         marginTop: wp(2),
//                         marginHorizontal:20
//                     }}
//                     disabled={this.state.disabled}
//                   >
                    
//                         <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.whiteColor}}>Pay Now</Text> 
                        
//                   </TouchableOpacity>
//                   </View>
//                 }
//                 </View>
//             </ScrollView>
//         :
//     <View>
//     {alert('the payment has already paid')}
//     {this.props.navigation.navigate('ApprovedLoan')}
//     </View>
//     }
//           </View>
//         )
//     }
// }
// export default LoanDetails  


// const styles = StyleSheet.create({
//     successRow: {
//         padding: 10,
//         borderBottomLeftRadius: 10,
//         borderBottomRightRadius: 10,
//         backgroundColor: '#FFFFFF'
//     },
//     container:{
//     justifyContent: 'space-between', 
//     flexDirection: 'row',
//     marginBottom:2
//     },
//     containers: {
//         flexGrow: 1,
//         backgroundColor: 'white'
//     },
//     rowContainer: {
//         borderWidth: 1.5,
//         borderColor: '#C7C7C7',
//         borderRadius: 10,
//         marginBottom: 5,
        
//     },
//     txtColor:{
//         color:'#1A5632'
//     },
//     button:{
//         backgroundColor:'#1A5632'
//     }
   
// })



import React, { Component } from 'react';
import {View,StyleSheet,Text,ScrollView,TouchableOpacity} from 'react-native';
import AppHeaderInner from '../../components/AppHeaderInner';
import Colors from '../../constants/Colors';
import fontSelector from '../../constants/FontSelectors';
import Spinner from 'react-native-loading-spinner-overlay';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BASE_URL } from '../../configs';
import axios from 'axios';
import RazorpayCheckout from 'react-native-razorpay';




class LoanDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            list: {},
            screenLoading: true,
            disabled: true,
            date:null
        }
    }

    componentDidMount() {
        this._focusListener = this.props.navigation.addListener('focus', () => {
            this._reload()
        });
    }
    

    _reload = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;

        var dt = today;
        console.log('date',dt)
        console.log('dataaaaaa',this.props.route.params)
         
        let payload = this.props.route.params
                 
                console.log("payload", payload.token)
                const url = `${BASE_URL}Auth/get-loan-details`;
                console.log(url)
                console.log(payload.token)
                const request = axios({
                    method: 'POST',
                    url: url,
                    data: payload,
                    headers: {
                        // "Content-Type": 'application/json',
                        "Authorization": `Bearer ${payload.token}`
                    }
                });
                request.then((res) =>{
                    console.log('dataaaa',res.data.data)
                    this.setState({ 
                        list: res.data.data,
                        screenLoading: false,
                        date:dt
                     })
                    
                })
                
                // return request.then(
                //     response => {
                //         // console.log("response", response)
                //         resolve(response.data);
                //     },
                //     err => {
        
                //         // console.log("err===((", err.response)
                //     }
                // );
            
        
        
        }
        payHandler = (paymentmethod) =>{
           if(paymentmethod){
               console.log('it is true')
               
            let pyload = this.props.route.params;
            const obj = {
                user_id:this.props.route.params.user_id,
                emi:this.state.list.total_amnt_paid
            }
            console.log('pyload',pyload)
            console.log('dta',obj)
                     
                    console.log("payload", pyload.token)
                    const url = `${BASE_URL}Auth/order-details`;
                    console.log(url)
                    console.log(pyload.token)
                    const request = axios({
                        method: 'POST',
                        url: url,
                        data: obj,
                        headers: {
                            // "Content-Type": 'application/json',
                            "Authorization": `Bearer ${pyload.token}`
                        }
                    });
                    request.then((res) =>{
                        const datas = res.data.data
                        console.log('cvalueee',datas)
                        var options = {
                            description: 'EMI Payment',
                            image: 'https://i.imgur.com/3g7nmJC.png',  //'../images/splash_srceen.png'
                            currency: 'INR',
                            key: 'rzp_test_7jh7xVeFYorTkB',
                            amount: datas.id,
                            name: 'Perpetuty Capital',
                            order_id: datas.id,//Replace this with an order_id created using Orders API.
                            prefill: {
                                email: this.state.list.email,
                                contact: this.state.list.user_mobile,
                                name: this.state.list.full_name
                            },
                            theme: { color: '#53a20e' }
                        }
                        
                        RazorpayCheckout.open(options).then((data) => {
                            const val = {
                                user_id:this.props.route.params.user_id,
                                emi_id:this.state.list.emi_id,
                                emi_number:this.state.list.emi_number,
                                loan_id:this.state.list.loan_id,
                                order_id:datas.id,
                                emi:this.state.list.total_amnt_paid,
                                trx_id:data.razorpay_payment_id,
                                penalty:this.state.list.penalty,
                                emi_paid_status_id:this.state.list.emi_paid_status_id,
                                actual_emi:this.state.list.emival,
                                payment_date:this.state.date,
                                razorpay_signature:data.razorpay_signature,
                                status:2
                            }
                            console.log('all values',val)
                            console.log('token',pyload.token)

                            const urll = `${BASE_URL}Auth/loan-payment`;

                            const requestt = axios({
                                method:'POST',
                                url:urll,
                                data:val,
                                headers: {
                                    // "Content-Type": 'application/json',
                                    "Authorization": `Bearer ${pyload.token}`
                                }
                            })
                            // handle success
                            console.log('Successs',data);
                            alert(`Success: ${data.razorpay_payment_id}`);
                            requestt.then((res) =>{
                             console.log('ressss',res)
                             
                            })

                        }).catch((error) => {
                            // handle failure
                            console.log('error',error);
                        });
                        this.props.navigation.navigate('ApprovedLoan')
                        // this.paymentgateway(res.data.data)
                        // this.props.navigation.navigate('Pay',res.data.data)
                        
                    })



           }
           
        }
        // paymentgateway = (data) =>{
        //     console.log('rajesh',data.id,data.amount)
          

        // }

        
        
    render(){
       

       return(
          
            <ScrollView contentContainerStyle={styles.container}>
            <Spinner visible={this.state.screenLoading} />
            <View style={{ flex: 1 }}>
                <AppHeaderInner
                    headerText="Loan Details"
                    navigation={this.props.navigation}
                    goBack={true}
                />
                <View style={{ paddingHorizontal:20,paddingVertical:10 }}>
                <View style={styles.successRow}>
                                    <View style={{ justifyContent: 'center',alignItems:'center',flexDirection:'column' }}>
                                    <Text style={{color:'#1A5632'}}>Amount Payable</Text>
                                    <Text style={{fontSize:20,color:'black'}}>₹ {this.state.list.total_amnt_paid}</Text>         
                                </View>
                                <View style={{ margin: 5 ,borderBottomColor:'black', borderWidth: 0.25 }} />
                                <View style={styles.Wrapper}>
                                <Text>Payment Date</Text>
                                <Text style={styles.txtColor}>{this.state.list.payment_date}</Text>         
                            </View>
                                            </View>
      
                <Text style={{marginLeft:18,color:'#1A5632',marginVertical:10}}>Details of Loan</Text>
                <View style={styles.Row}>
                <View style={styles.Wrapper}>
                                                <Text>EMI Amount</Text>
                                                <Text style={styles.txtColor}>₹ {this.state.list.emival}</Text>         
                                            </View>
                                            <View style={styles.Wrapper}>
                                            <Text>No. of EMI Duration</Text>
                                            <Text style={styles.txtColor}>{this.state.list.emi_count} month</Text>         
                                        </View>
                                        <View style={styles.Wrapper}>
                                            <Text> EMI No</Text>
                                            <Text style={styles.txtColor}>{this.state.list.emi_number}/{this.state.list.emi_count} month</Text>         
                                        </View>
                                        <View style={styles.Wrapper}>
                                        <Text>Amount Which They Want to Pay</Text>
                                        <Text style={styles.txtColor}>₹ {this.state.list.total_amnt_paid}</Text>         
                                    </View>
                
                </View>
    <Text style={{marginLeft:18,color:'#1A5632',marginVertical:5}}>Details of Loan</Text>
    <View style={styles.Row}>
    <View style={styles.Wrapper}>
    <Text>LAN</Text>
    <Text style={styles.txtColor}>{this.state.list.lan_no}</Text>         
    </View>
    <View style={styles.Wrapper}>
    <Text>Type</Text>
    <Text style={styles.txtColor}>{this.state.list.type}</Text>         
    </View>
    <View style={styles.Wrapper}>
    <Text>Amount</Text>
    <Text style={styles.txtColor}>₹ {this.state.list.amount}</Text>
    </View>   
    <View style={styles.Wrapper}>
    <Text>Interest</Text>
    <Text style={styles.txtColor}>{this.state.list.interest}%</Text>    
    </View>
    <View style={styles.Wrapper}>
    <Text>Date</Text>
    <Text style={styles.txtColor}>{this.state.list.startdate} to {this.state.list.enddate}</Text>      
    
    </View>
    
    
    </View>
    
    <Text style={{marginLeft:18,color:'#1A5632',marginVertical:5}}>Details of Borrow</Text>
    <View style={styles.Row}>
    <View style={styles.Wrapper}>
                                    <Text>Name</Text>
                                    <Text style={styles.txtColor}>{this.state.list.full_name}</Text>         
                                </View>
                                <View style={styles.Wrapper}>
                                <Text>Address</Text>
                                <Text style={styles.txtColor}>{this.state.list.loan_applied_under_city}</Text>         
                            </View>
                            <View style={styles.Wrapper}>
                            <Text>Phone</Text>
                            <Text style={styles.txtColor}>+91 {this.state.list.user_mobile}</Text>         
                        </View>
                        <View style={styles.Wrapper}>
                            <Text>Email</Text>
                            <Text style={styles.txtColor}>{this.state.list.email}</Text>         
                        </View>
    </View>
               
                
                </View>
                { this.state.list.paymentMethod ? 
                                        <TouchableOpacity
                                       
                                        style={{
                                            backgroundColor: Colors.greenColor,
                                            alignItems: 'center',
                                            paddingVertical: wp(3.5),
                                            borderRadius: wp(7),
                                            marginTop: wp(5),
                                            marginHorizontal:20
                                        }}
                                        onPress={() =>this.payHandler(this.state.list.paymentMethod)}
                                      >
                                        
                                            <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.whiteColor}}>Pay Now</Text> 
                                            
                                      </TouchableOpacity>
                                      : 
                                      <View>
                                      <Text style={{color:'red'}}>payment method not active/available, please contact admin</Text>
                                      <TouchableOpacity
                                        style={{
                                            backgroundColor: Colors.greenColor,
                                            alignItems: 'center',
                                            paddingVertical: wp(3.5),
                                            borderRadius: wp(7),
                                            marginTop: wp(2),
                                            marginHorizontal:20
                                        }}
                                        disabled={this.state.disabled}
                                      >
                                        
                                            <Text style={{ fontFamily: fontSelector('regular'), fontSize: wp(3.5), color: Colors.whiteColor}}>Pay Now</Text> 
                                            
                                      </TouchableOpacity>
                                      </View>
                                    }
            </View>
            
                </ScrollView>
       
    
       )
    }
}
export default LoanDetails  


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: 'white'
    },
    successRow: {
        backgroundColor: Colors.lightGreen,
        marginTop: 20,
        padding: 10,
        borderRadius: 10
    },
    Row: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth:1,
        borderColor: '#C7C7C7'
    },
    rowText: {
        color: Colors.mainTextColor,
        fontSize: wp(4.3),
        fontFamily: fontSelector('medium'),
        fontWeight: '500',
        padding: 5
    },
    icon: {
        height: wp(6),
        width: wp(6),
        resizeMode: 'contain'
    },
    repayButton: {
        padding: 8,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#1A5632',
        borderRadius: 5
    },
    repayText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    dateText: {
        color: '#1A5632',
        fontSize: 16,
        fontWeight: '700',
        marginTop: 10
    },
    loanType: {
        color: '#1A5632',
        fontSize: 15,
        fontWeight: '500',
    },
    loanTypeDecription: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '700',
        margin: 2
    },
        Wrapper:{
    justifyContent:'space-between',
    flexDirection: 'row',
    marginBottom:2
    },
    txtColor:{
                color:'#1A5632'
            },


});