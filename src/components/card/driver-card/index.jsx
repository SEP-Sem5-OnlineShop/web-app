import {getFileUrl} from "../../../api/azure-storage-blob";
import { Link } from "react-router-dom";

export default function DriverCard({ data, vendor_id }) {
    return (
        <div className="bg-gray-200 font-sans h-full w-full flex flex-row justify-center items-center">
            <div className="card w-96 mx-auto bg-primary rounded-xl shadow-xl hover:shadow py-4">
                <img className="w-32 mx-auto rounded-full border-8 border-white"
                     src={getFileUrl(data.imageUrl || "")} alt="" />
                <Link to={`/vendor_${vendor_id}/driver_${data._id}`}>
                <div className="text-center mt-2 text-xl font-medium">{`${data.firstName || ""} ${data.lastName || ""}`}</div>
                </Link>
                <div className="text-center mt-2 font-light text-sm">{data.email || ""}</div>
                <div className="text-center font-normal text-lg">{`Call me :- ${data.telephone || ""}`}</div>
            </div>
        </div>
    )
}