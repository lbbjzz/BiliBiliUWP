/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import axios from 'axios';
import qs from './node_modules/qs';
import './davidshimjs-qrcodejs-04f46c6/qrcode.js';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  // Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let [qrCodeApi, getQrCode] = useState('');
  const [noUpdate, setNoUpdate] = useState(true); //阻止useEffect的无限循环

  const getQrCodeMethod = () => {
    const data = {
      appkey: '4409e2ce8ffd12b8',
      local_id: 0,
      ts: 0,
      sign: 'e134154ed6add881d28fbdf68653cd9c',
    };
    // console.log('1', data.appkey);
    setNoUpdate(true);
    getQrCode(
      'https://passport.bilibili.com/x/passport-tv-login/h5/qrcode/auth?auth_code=c3a4cae69e8ef18c5dac6134de9eb801',
    );
    console.log('2', qrCodeApi);
    // axios({
    //   url: 'http://passport.snm0516.aisee.tv/x/passport-tv-login/qrcode/auth_code',
    //   method: 'post',
    //   data: qs.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    // }).then(res => {
    //   // console.log(res.data.data.url);
    //   getQrCode(res.data.data.url);
    //   console.log('1', qrCode);
    //   console.log('2', res.data.data.url);
    // });
  };

  React.useEffect(() => {
    // console.log('componentDidMount');
    getQrCodeMethod();
    return () => {
      // console.log('componentWillUnmount');
    };
  }, [noUpdate]);

  let qrcode = new QRCode('qrcode2', {
    text: "http://jindo.dev.naver.com/collie",// 链接
    width: 128,
    height: 128,
    colorDark: "#9400ff", // 暗处颜色
    colorLight: "#fff", // 亮处颜色
    /*
        二维码纠错级别：[百度知道](https://zhidao.baidu.com/question/521133757.html)
        按照容错率从小到大可分(<7%),M(<15%),Q(<25%),H(<30%).容错率也叫纠错率。二维码在被遮挡部分面积后仍能被正常扫描，纠错率指的就是二维码能被正常扫描时允许被遮挡的最大面积占总面积的比率。
        QRCode.CorrectLevel.H--[L|M|Q|H]
    */
    correctLevel: QRCode.CorrectLevel.H,
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <Image source={qrCode} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See QRCode ">
            <Text style={styles.highlight}>{qrCode}</Text>
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
