import {wrapper} from "../store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css'
import React, { useEffect } from 'react';


const App = ({ Component, pageProps }) => {

  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
},[])
  return <Component {...pageProps} />;
};




export default wrapper.withRedux(App);