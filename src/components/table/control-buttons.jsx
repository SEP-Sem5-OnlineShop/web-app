import React, {useState} from "react";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

import vehicleApi from "../../api/app/vehicle";

import ModelBody from "../modals/modelBody";
import LoadingButton from "../loading-button";

export default function ControlButtons ({id}) {

    const [loading, setLoading] = useState(false)

    const handleClick = async (id) => {
        setLoading(true)
        try {
            const {data, status} = await vehicleApi.delete(id)
            if(data && data.message==="Success" && status===200) {
                toast.success("Successfully deleted a vehicle!")
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
            <Link to={`/app/vehicle/${id}`}>
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