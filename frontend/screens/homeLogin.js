import React from 'react';
import axios from 'axios';
import {
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';

// All of your regular imports
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {RNHoleView} from 'react-native-hole-view';
import { globalStyles } from '../styles/global';
import { SearchBar } from 'react-native-elements';




// inside your component
export default function HomeLogin({ navigation, route }) {
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([
      BarcodeFormat.ALL_FORMATS, // You can only specify a particular format
    ]);
  const [code,setCode]=React.useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [firstScan,setFirstScan]=React.useState(false);
  //const [nameUser,setNameUser]=React.useState('LOGIN');
  //const [scan,setScan]=React.useState(false);

  const [barcode, setBarcode] = React.useState('');
  const [hasPermission, setHasPermission] = React.useState(false);
  const [isScanned, setIsScanned] = React.useState(false);
  const baseUrl = 'http://3.123.65.51:3000';
    
  React.useEffect(() => {
      checkCameraPermission();
    }, []);

  const checkCameraPermission = async () => {
      const currentStatus = await Camera.getCameraPermissionStatus();
      if(currentStatus === 'denied') {
        const newStatus = await Camera.requestCameraPermission();
        if(newStatus === 'authorized') {
          setHasPermission(true);
        }
        else {
          setHasPermission(false);
        }
      }
      else {
        setHasPermission(true);
      }      
  };
  const {response}= route.params
  const {id,email,firstName,lastName,role,productsHistory} = response.data;
  const pressHandler = () =>{
    navigation.navigate('InfoUser',{response});
  }

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleFinalSearch= () => {
    const res=response.data
    console.log(res)
    console.log(typeof id);
    const barCode=searchQuery
    axios.post(`http://3.123.65.51:3000/saveProduct/${barCode}`,{
        userId:id
      })
      .then((response) => {});
    navigation.navigate('Info', {code: searchQuery})
    setSearchQuery('')
  };

  const pressBack=()=>{
    setFirstScan(false);
  }

  React.useEffect(() => {
      toggleActiveState();
      return () => {
        barcodes;
      };
    }, [barcodes]);
    
  const toggleActiveState = async () => {
      if (barcodes && barcodes.length > 0 && isScanned === false ) {
        setIsScanned(true);
        //setCode('');
        
        barcodes.forEach(async scannedBarcode => {
          if (scannedBarcode.rawValue !== '') {
            
            setBarcode(scannedBarcode.rawValue);
            if( firstScan === false){
              setCode(scannedBarcode.rawValue);
              setFirstScan(true);
            }
            setIsScanned(false);
          }
        });
      }
    };
  return(
    
    device != null &&
      hasPermission && (
        <>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={!isScanned}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
            audio={false}
          />
        <RNHoleView
          holes={[
            {
              x: 70,
              y: 150,
              width: 250,
              height: 200,
              borderRadius: 10,
            },
          ]}
          style={globalStyles.rnholeView}
        />

        <TouchableOpacity
          onPress={()=> navigation.navigate('Info', {code})}
          style={globalStyles.backbutton}>
          <Text style={globalStyles.barcodeText}>{code}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.backbutton}
          onPress={pressBack}
          style={globalStyles.backbutton}>
          <MaterialIcons name='arrow-back' size={30} color="#fff" />
          <Text style={globalStyles.buttonText}>BACK</Text>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.loginbutton}
          onPress={pressHandler}
          style={globalStyles.loginbutton}>
          <MaterialIcons name='login' size={30} color="#fff" />

            <Text style={globalStyles.buttonText}>{firstName}</Text>
        </TouchableOpacity>

        <Text style={{top:90, color:'#E0E0E0', textAlign: 'center'}}>Tineti dispozitivul nemiscat pana cand este detectat codul de bare</Text>

        <View style={{top:410, width:300, alignSelf:'center'}}>
          <SearchBar style={{}}
            placeholder="Caută..."
            onChangeText={(q) => {
              setSearchQuery(q)
            }}
            value={searchQuery}
            onSubmitEditing={handleFinalSearch}
            containerStyle={{ borderRadius: 30, backgroundColor: '#C0C0C0' }}
            inputStyle={{ borderRadius: 30,backgroundColor: '#D0D0D0'}}
            inputContainerStyle={{ borderRadius: 30,backgroundColor: '#D0D0D0'}}
          />
        </View>
        </>
      )
  );
}


