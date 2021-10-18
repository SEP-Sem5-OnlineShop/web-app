import React, {useEffect, useState} from "react"
import { Loader } from '@googlemaps/js-api-loader';
import {useDispatch, useSelector} from "react-redux";
import {axios, driverApi} from "../api";
import {actions} from "../store";

export default function CustomerMap() {
    const loader = new Loader({
        apiKey: "AIzaSyBo-7VdOVmwdviU_GNBfkmEN63Wfn1dvvs",
        version: "weekly",
        libraries: ["places"]
    });
    const onlineDrivers = useSelector(state => state.map.onlineDrivers)
    const dispatch = useDispatch()

    let map
    let latitudeLongitude = { lat: 6.7324, lng: 81.1345 }

    const initMap = (drivers) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    latitudeLongitude = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                })
        }

        const mapOptions = {
            center: latitudeLongitude,
            zoom: 15,
        }


        loader.load()
            .then(google => {
                map = new google.maps.Map(document.getElementById("map"), mapOptions);

                new google.maps.Marker({
                    position: latitudeLongitude,
                    map: map
                })

                Object.values(drivers).forEach(driver => {
                    const driverLatLng = driver.location['coordinates']
                    new google.maps.Marker({
                        position: {lat: parseFloat(driverLatLng[0]), lng: parseFloat(driverLatLng[1])},
                        map: map
                    })
                })

                const geocoder = new google.maps.Geocoder()
                geocoder.geocode({location: latitudeLongitude})
                    .then(response => {
                        console.log(response.results)
                    })

            })
            .catch(e => {
                console.log(e)
            })

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
            infoWindow.setPosition(pos);
            infoWindow.setContent(
                browserHasGeolocation
                    ? "Error: The Geolocation service failed."
                    : "Error: Your browser doesn't support geolocation."
            );
            infoWindow.open(map);
        }
    }

    useEffect(async () => {
        const source = axios.CancelToken.source()
        let mounted = true

        try {
            const nearbyDrivers = await driverApi.getNearbyDrivers(source, latitudeLongitude)
            const drivers = []
            if(nearbyDrivers && nearbyDrivers.data && nearbyDrivers.status===200) {
                const fetchedDrivers = nearbyDrivers.data.data || []
                fetchedDrivers.forEach(driver => {
                    drivers[driver['user_id']] = driver
                })
                if (mounted) {
                    dispatch(actions.map.setOnlineDrivers(drivers))
                }
            }
        }
        catch (e) {

        }
        return () => {
            source.cancel()
            mounted = false
        }
    }, [])

    useEffect(() => {
        console.log(onlineDrivers)
        initMap(onlineDrivers)
    }, [onlineDrivers])

    return (
        <div id='map' className="w-full" style={{ minHeight: 'calc(100vh - 7rem)' }} />
    )
}