import React,{ ReactNode} from "react";
import {store} from "../redux/store";

import { Provider } from "react-redux";

interface ProvidersProps{
    children:ReactNode;
}
export function Providers({children}:ProvidersProps){

    return <Provider store={store}>{children}</Provider>
        
}
