import { Menu, Transition } from '@headlessui/react'
import { useSelector, useDispatch } from "react-redux"
import { Fragment, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { thunks } from "../../store"
import { Link } from 'react-router-dom'

export default function Example() {
  const userData = useSelector(state => state.user.userData)
  const dispatch = useDispatch()
  const history = useHistory()

  const logout = async () => {
    try {
      await dispatch(thunks.user.signOUt())
      history.push("/auth/login")
    }
    catch (e) {
      console.log('Something went wrong!')
    }
  }

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-secondary bg-cardColor rounded-md bg-opacity-70 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {`Hi ${userData.firstName || ""} ${userData.lastName || ""}!`}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-textLight' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={() => history.push('/app/profile')}
                  >
                    My Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-textLight' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                  >
                    <Link to={`/app/order_history`}>
                    Orders
                    </Link>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-violet-500 text-textLight' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    onClick={async () => logout()}
                  >
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}