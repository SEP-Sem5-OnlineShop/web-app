import * as React from "react";

import newMember from "../../assets/svg/home-admin/join.svg"
import vendorList from "../../assets/svg/home-admin/community.svg"
import profile from "../../assets/svg/home-admin/profile.svg"

export default function iconPanel() {
    return (
        <div className='h-full flex flex justiify center'>
            <button className='h-full flex flex-col items-center justify-between mx-4 bg-white hover:bg-primary'>
                <img className="w-14 lg:w-16 " src={newMember} alt='newMember' />
                <span className='text-sm font-semibold'>New Vendor<br></br>Requests</span>
            </button>
            <button className='h-full flex flex-col items-center justify-between mx-4 bg-white hover:bg-primary'>
                <img className="w-14 lg:w-16" src={vendorList} alt='vendorList' />
                <span className='text-sm font-semibold'>Vendor<br></br>Details</span>
            </button>
            <button className='h-full flex flex-col items-center justify-between mx-4 bg-white hover:bg-primary'>
                <img className="w-14 lg:w-16" src={profile} alt='profile' />
                <span className='text-sm font-semibold'>Profile</span>
            </button>
        </div>
    )
}