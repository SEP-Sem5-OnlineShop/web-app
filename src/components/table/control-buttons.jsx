import React, {useState} from "react";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

import ModelBody from "../modals/modelBody";
import LoadingButton from "../form-components/loading-button";

export default function ControlButtons ({id, type, api}) {

    const [loading, setLoading] = useState(false)

    const handleClick = async (id) => {
        setLoading(true)
        try {
            const {data, status} = await api.delete(id)
            if(data && data.message==="Success" && status===200) {
                toast.success(`Successfully deleted a ${type}!`)
            }
        }
        catch (e) {
            toast.error(e.responseText)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className={"flex justify-center"}>
            <Link to={`/app/${type}/${id}`}>
                <LoadingButton outlined={true} color={'warn'} text={'Update'}>Edit</LoadingButton>
            </Link>
            <ModelBody color={'danger'} buttonColor={'danger'} fontColor={'white'} loading={loading}
                       onClick={async () => await handleClick(id)}
                       modalText={'Do you want to continue with the deletion?'}
                       buttonText={'Delete'}
            />
        </div>
    )
}