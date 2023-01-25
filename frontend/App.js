import React from 'react';
import axios from 'axios';
import {
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

// All of your regular imports
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {RNHoleView} from 'react-native-hole-view';



// inside your component
const App = () => {
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([
      BarcodeFormat.ALL_FORMATS, // You can only specify a particular format
    ]);
  const [code,setCode]=React.useState('');
  const [name,setName]=React.useState('');
  const [desc,setDesc]=React.useState('');
  const [price,setPrice]=React.useState('');
  const [firstScan,setFirstScan]=React.useState(false);
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

  const getDetails = async () => {
    await axios({
      method: 'get',
      url: `${baseUrl}/products/${code}`,
    }).then((response) => {
      setName(response.data.name);
      setDesc(response.data.description);
      setPrice(response.data.price);
      //console.log(name);
    });
  };

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
              console.log(scannedBarcode.rawValue);
              setFirstScan(true);
            }
            // if(scan===true){
            //   setCode('');
            //   setName('');
            //   setScan(false);
            //   setFirstScan(false);
            // }

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
              style={styles.rnholeView}
            />
        <Text style={styles.barcodeText}
          onPress={()=>getDetails()}>{code}
        </Text>

        <Text style={styles.detailsName}>{name}</Text>
        <Text style={styles.detailsDesc}>{desc}</Text>
        <Text style={styles.detailsPrice}>{price}</Text>

        <TouchableOpacity style={styles.button}
          onPress={() => setFirstScan(false)}
          style={styles.button}>
          {/* <Image source={backIcon} /> */}
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
        </>
      )
    
  );
}

export default App;


// Styles:

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    left: 20,
    top: 20,
    backgroundColor: 'grey',
    width: 80,
    height: 45,
    borderRadius: 10,
  },
  detailsName:{
    position: 'absolute',
    alignSelf: 'center',
    top: '75%',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 13,
  },
  detailsDesc:{
    position: 'absolute',
    alignSelf: 'center',
    top: '78%',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 13,
  },
  detailsPrice:{
    position: 'absolute',
    alignSelf: 'center',
    top: '81%',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 13,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 13,
  },
  barcodeText: {
    position: 'absolute',
    alignSelf: 'center',
    top: '70%',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 13,
  },
  rnholeView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  
});
