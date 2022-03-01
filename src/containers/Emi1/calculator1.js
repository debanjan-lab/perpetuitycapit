


import React, { Component } from 'react';
import { View,Text,StyleSheet,TextInput,TouchableOpacity,Modal} from 'react-native';
import DashboardCard from '../../components/DashboardCard';
import DashboardHeader from '../../components/DashboardHeader';
import DashboardHeaderInner from '../../components/DashboardHeaderInner';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Colors from '../../constants/Colors';

class CalculateEmi1 extends Component{
    constructor(){
        super();
        this.state = {
            loanAmountValue: 50000,
            minLoanAmount: 50000,
            maxLoanAmount: 5000000,
            interestRateValue:'',
            tenureValue: 1,
            minTenure: 1,
            maxTenure: 5,
            checked:false,
            emiamnt:0,
            visible:false,
            total_amount_payable:0,
            totinterest:0
        }
    }
    _calculateEMI = (value, field) => {
        console.log('field',field)
        console.log('value',value)
        this.setState({
            [field]: value
    
        },() =>{
            this._doCalculateEMI()
        })
      
        }
        _doCalculateEMI = () => {
            var lnamnt = this.state.loanAmountValue;
            var lninterest = this.state.interestRateValue;
            var mytenure = this.state.tenureValue;
            var inrate = parseFloat((lninterest * mytenure) / 100);
            var totinterest = parseFloat(lnamnt * inrate);
            var emiamnt = parseInt((totinterest + lnamnt) / (mytenure * 12));
            var total_amount_payable = parseInt(totinterest + lnamnt);
            this.setState({emiamnt:emiamnt,totinterest:totinterest,total_amount_payable:total_amount_payable})
            var loanAmountValue = this.state.loanAmountValue
    
        }

    render(){
        return(
            
            <View style={styles.container}>
            <DashboardHeader/>
            <DashboardHeaderInner
            headerText="EMI Calculator"
            navigation={this.props.navigation}
            goBack={true}/>

             <View style={{padding:15}}>
             <View style={{marginBottom:30,marginTop:25}}>
             <View  style={{flexDirection:'row',justifyContent:'space-between',marginBottom:8}}>
             <Text style={{marginLeft:14,color:'#4B0082',fontWeight:'bold',marginTop:3}}>Loan Amount</Text>
             <View style={styles.lnamount}><Text style={{color:Colors.mainTextColor,fontWeight:'bold'}}>₹ {this.state.loanAmountValue}</Text></View>
             </View>
             <Slider
                            thumbTintColor="#4B0082"
                            minimumValue={this.state.minLoanAmount}
                            maximumValue={this.state.maxLoanAmount}
                            minimumTrackTintColor="#4B0082"
                            maximumTrackTintColor="#4B0082"
                            onSlidingComplete={value => this._calculateEMI(value, 'loanAmountValue')}
                            step={1}
                        />
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{marginLeft:15}}>₹{this.state.minLoanAmount}</Text>
                        <Text style={{marginRight:15}}>₹{this.state.maxLoanAmount}</Text>
                        </View>
             </View>
                      <View>
                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                      <Text style={{marginLeft:14,color:'#4B0082',fontWeight:'bold',marginTop:3}}>Loan Duration</Text>
                      <Text style={{marginRight:15,color:Colors.mainTextColor,fontWeight:'bold'}}>{this.state.tenureValue} Years</Text>
                      </View>
                      <Slider
                      thumbTintColor="#4B0082"
                      minimumValue={this.state.minTenure}
                      maximumValue={this.state.maxTenure}
                      minimumTrackTintColor="#4B0082"
                      maximumTrackTintColor="#4B0082"
                      onSlidingComplete={value => this._calculateEMI(value, 'tenureValue')}
                      step={1}
                  />
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text  style={{marginLeft:15}}>{this.state.minTenure} Years</Text>
                  <Text  style={{marginRight:15}}>{this.state.maxTenure} Years</Text>
                  </View>
                  <View>
                 
                   
                  </View>
                      </View>

                      <View style={{flexDirection:'row',marginLeft:15,marginTop:20}}>
                      <Text style={{fontSize:30,fontWeight:'bold',color:'#3CB371'}}> ₹ {this.state.emiamnt} /  -  </Text>
                      <Text style={{fontSize:15,fontWeight:'bold',color:'#3CB371',marginTop:12}}>EMI For 4 yeaars</Text>
                      </View>

                      <View>
                      <Text style={{marginTop:20,marginLeft:15,marginBottom:10}}>Interest Rate</Text>
                      <View>
                      <View style={{marginLeft:15,borderWidth:this.state.checked ? 1 : 0,width:52,borderRadius:5,borderColor:Colors.subTextColor}}>
                      { this.state.checked &&
                          <View style={{width:40,height:20}}>
                          <TextInput 
                          style={{marginVertical:-12}} 
                          value={this.state.interestRateValue} 
                        keyboardType='decimal-pad'
                         maxLength={4}
                         onChangeText={(val) =>this.state.checked && this.setState({interestRateValue:val},() => this._doCalculateEMI())}
                          /></View>
                        }
                        {  !this.state.checked &&
                            <View>
                            <Text style={{marginBottom:4,marginLeft:4,color:Colors.mainTextColor}}>
                            {this.state.interestRateValue}
                            </Text>
                            </View>
                        }
                      <View style={{marginTop:-20,marginLeft:38,width:10}}>
                      <Text style={{color:Colors.mainTextColor}}>
                      %
                      </Text>
                      </View>
                      </View>
                     { this.state.checked &&
                          <View style={{marginTop:-20,marginLeft:71}}>
                      <TouchableOpacity onPress={()=> this.setState({checked:false})}>
                       <MaterialCommunityIcons name='reload' size={17} color='#4B0082'/>
                       </TouchableOpacity>
                      </View>}
                     { !this.state.checked &&
                         <View style={{marginTop:-20,marginLeft:71}}>
                      <TouchableOpacity onPress={()=> this.setState({checked:true})}>
                        <MaterialIcons name='edit' size={17} color='#4B0082' />
                         </TouchableOpacity>
                         </View>}
                      </View>
                      </View>
                      <View>
                      <TouchableOpacity onPress={() => this.setState({visible:true})}>
                      <Text
                       style={{marginLeft:14,color:'#4B0082',fontWeight:'bold',marginTop:3,marginTop:25}}
                       >View Loan Breakup
                       </Text>
                      </TouchableOpacity>
                      <Modal transparent={true} visible={this.state.visible}>
                      <View style={{backgroundColor:'#000000aa',flex:1}}>
                      <View style={{backgroundColor:'#ffffff',marginTop:280,borderRadius:10,flex:1}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:25,paddingTop:15}}>
                    <Text style={{color:Colors.mainTextColor,fontWeight:'bold',marginTop:5}}>Loan Breakup</Text>
                    <TouchableOpacity onPress={() => this.setState({visible:false})}><Entypo name='cross' size={25}/></TouchableOpacity>
                    </View>
                    <View style={{borderBottomWidth:1,borderBottomColor:Colors.subTextColor,marginTop:10}}/>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:25,marginVertical:20}}>
                    <Text>Principal Loan Amount</Text>
                    <Text style={{color:'#3CB371',fontWeight:'bold',fontSize:15}}>₹ {this.state.loanAmountValue}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:25,marginVertical:20}}>
                    <Text>Total Interest Payable</Text>
                    <Text style={{color:'#3CB371',fontWeight:'bold',fontSize:15}}>₹ {this.state.totinterest}</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:25,marginVertical:20,backgroundColor:Colors.greyColor,padding:20}}>
                    <Text style={{color:Colors.mainTextColor,fontWeight:'bold'}}>Total Amount Payable</Text>
                    <Text style={{color:Colors.mainTextColor,fontWeight:'bold',fontSize:15}}>₹ {this.state.total_amount_payable}</Text>
                    </View>
                      </View>
                      </View>
                      </Modal>
                      </View>
             </View>
           
            </View>
        )
    }
}

export default CalculateEmi1;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:Colors.whiteColor,
    },
lnamount:{
    paddingHorizontal:15,
    borderRadius:5,
    paddingVertical:2,
    borderColor:Colors.subTextColor,
    borderWidth:1,
    marginRight:15,
}
})



// <View><Text style={{marginBottom:2,marginLeft:4}}>12.5</Text></View>