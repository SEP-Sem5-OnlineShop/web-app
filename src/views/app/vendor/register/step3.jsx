import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import InputWithValidation from "../../../../components/input-with-validation";
import SelectWithValidation from "../../../../components/select-with-validation";

export default function Step3(props) {

    const [array, setArray] = useState(["1"])

    const comProps = {
        formik: props.formik || {},
        setActiveTab: props.setActiveTab || (() => {})
    }
    useEffect(() => {
        let array = []
        for (let i = 1; i<parseInt(comProps.formik.values.vehicles)+1; i++) {
            array.push(i)
        }
        setArray(array)
    }, [comProps.formik.values.vehicles])

    return (
        <React.Fragment>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="mb-5"><span className="text-xl text-medium">Vehicles Details</span></div>
                    <SelectWithValidation
                        formik={comProps.formik}
                        id="vehicles"
                        name="vehicles"
                        label="Number of Vehicles"
                        items={["1","2","3","4","5"]}
                        className="mb-4"
                    />
                    <motion.div layout>
                        {
                            array.map((item,index) => {
                                return <InputWithValidation
                                    key={item}
                                    formik={comProps.formik}
                                    id={`vehicleNo${item}`}
                                    name={`vehicleNo${item}`}
                                    label={`Vehicle #${item}`}
                                    items={["1","2","3","4","5"]}
                                    className="mb-4"
                                />
                            })
                        }
                    </motion.div>

                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => comProps.setActiveTab(2)}
                        className="p-2 text-white rounded bg-textLight">Back</button>
                    <button
                        type="submit"
                        onClick={() => {}}
                        className="p-2 text-white rounded bg-textLight">Submit</button>
                </div>
            </div>
        </React.Fragment>
    )
}