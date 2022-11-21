import { Form, useParams } from 'react-router-dom';

import React, { useState } from 'react';
import Header from "../components/Header";
import NoticeTable from "../components/NoticeTable";



const Notice = () => {



    return (

        <div className="Notice">
            <NoticeTable />
        </div>

    );
}

export default Notice;