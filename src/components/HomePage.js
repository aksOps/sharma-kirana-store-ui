import React, {useEffect, useState} from 'react';
import {Button} from "antd";
import {GET_ALL_CUSTOMER} from "../api/constant"
import axios from "axios";
import {AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const HomePage = () => {
    const [source, setSource] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [gridApi, setGridApi] = useState(null);
    useEffect(() => {
        const getAllCustomer = async () => {
            await axios.get(GET_ALL_CUSTOMER)
                .then(function (response) {
                    if (response.status === 200) {
                        setLoaded(true)
                        setSource(response.data);
                        console.log(response.data)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        if (!loaded) {
            getAllCustomer().then()
        }
        if (gridApi) {
            gridApi.sizeColumnsToFit();
        }
    })


    const columns = [
        {
            headerName: 'Name',
            field: 'name',
        },
        {
            headerName: 'Mobile Number',
            field: 'mobileNumber',
        },
        {
            headerName: 'Address',
            field: 'address',
        },
        {
            headerName: 'Id',
            field: 'id',
            hide: true,
        }
    ];

    return (
        <div style={{width: '100%', height: '100%'}}>
            <div
                className="ag-theme-alpine"
                style={{
                    height: '600px',
                    width: '100%'
                }}
            >

                <AgGridReact
                    columnDefs={columns}
                    rowData={source}
                    onGridReady={(params) => {
                        setGridApi(params.api);
                    }}
                >

                </AgGridReact>
            </div>
            <br/>
            <Button>Test Button</Button>
        </div>

    );
}

export default HomePage;