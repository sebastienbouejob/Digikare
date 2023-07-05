import React from 'react'
import Prototypes from 'prop-types'
import {Provider} from "react-redux";
import {CssBaseline, StyledEngineProvider} from "@mui/material";
import {BrowserRouter} from "react-router-dom";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import enLocal from 'date-fns/locale/en-GB'
import frLocal from 'date-fns/locale/fr'

const language = navigator.language.split(/[-_]/)[0];
const locale = (language === 'fr' ? frLocal : enLocal);


const ProviderWrapper = (props: any) => {
    return (
        <Provider store={props.store}>
            <StyledEngineProvider injectFirst>
                    <React.Fragment>
                        <CssBaseline/>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                            {props.children}
                        </LocalizationProvider>
                    </React.Fragment>
            </StyledEngineProvider>
        </Provider>
    );
}


ProviderWrapper.prototype = {
    children: Prototypes.shape({}).isRequired,
    store: Prototypes.shape({}).isRequired,
}

export default  ProviderWrapper;