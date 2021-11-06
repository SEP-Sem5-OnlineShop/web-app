import React, {useEffect} from "react"
import {Loader} from '@googlemaps/js-api-loader';
import {useDispatch, useSelector} from "react-redux";
import {axios, driverApi} from "../api";
import {actions} from "../store";
import {driverCustomerSocket} from "../socket";
import {getFileUrl} from "../api/azure-storage-blob";
import {useHistory} from "react-router-dom"

export default function CustomerMap() {
    const loader = new Loader({
        apiKey: "AIzaSyBo-7VdOVmwdviU_GNBfkmEN63Wfn1dvvs",
        version: "weekly",
        libraries: ["places"]
    });
    let onlineDrivers = useSelector(state => state.map.onlineDrivers)
    const dispatch = useDispatch()
    const history = useHistory()

    let map, googleInstance, marker
    let latitudeLongitude = { lat: 6.7324, lng: 81.1345 }

    const initMap = async (drivers) => {
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
                const driversObj = {}
                googleInstance = google
                map = new google.maps.Map(document.getElementById("map"), mapOptions);
                const distanceMatrixService = new google.maps.DistanceMatrixService()
                const origin = new google.maps.LatLng(latitudeLongitude.lat, latitudeLongitude.lng)



                const updateMarkerWindow = (distanceMatrixService, origin, destination, infoWindow, driver, user, marker) => {
                    distanceMatrixService.getDistanceMatrix(
                        {
                            origins: [origin],
                            destinations: [destination],
                            travelMode: 'DRIVING',
                        }, (response, status) => {
                            const result = response.rows[0].elements[0]
                            if(result.distance.value < 5000) {
                                marker.setMap(map)
                                infoWindow = new google.maps.InfoWindow({
                                    content: `
                                        <div>
                                            <div class="flex items-center">
                                                <div style='
                                                background-image: url(${getFileUrl(user.driver.vehicle ? user.driver.vehicle.imageUrl: user.driver.shopImageUrl)}); 
                                                width: 80px; height: 80px;
                                                background-size: cover;
                                                background-position: center;
                                                background-repeat: no-repeat;
                                                ' />
                                            </div>
                                            <div class="ml-2 flex flex-col">
                                                <span class="text-textLight font-bold text-lg">${user.driver.shop}</span>
                                                <span class="text-textLight font-bold text-sm">${user.driver.vehicle ? user.driver.vehicle.plateNumber : ""}</span>
                                                <span class="text-sm">${user.driver.vehicle ? `${user.driver.vehicle.brand} ${user.driver.vehicle.model}` : ""}</span>
                                                <span class="text-sm">Arrival at ${result.duration.text}</span>
                                                <span class="text-sm">${result.distance.text} ahead</span>
                                            </div>
                                        </div>
                                    `,
                                });
                            }
                            else marker.setMap(null)
                        });
                    marker.addListener('mouseover', function() {
                        infoWindow ? infoWindow.open({
                            anchor: marker,
                            map,
                            shouldFocus: false,
                        }) : (() => {})()
                    });
                    marker.addListener('mouseout', function() {
                        infoWindow ? infoWindow.close() :  (() => {})()
                    });
                    marker.addListener('click', function () {
                        history.push(`/vendor_${user['driver']['vendorId']}/driver_${
                            driver.user && driver.user.length ? user['_id'] : user['user_id']}`)
                    })
                }

                marker = new google.maps.Marker({
                    position: latitudeLongitude,
                    map: map
                })

                Object.values(drivers).forEach(driver => {
                    console.log(driver)
                    if(driver.location) {
                        const driverLatLng = driver.location['coordinates']
                        const marker = new google.maps.Marker({
                            position: {lat: parseFloat(driverLatLng[0]), lng: parseFloat(driverLatLng[1])},
                            map: map,
                            icon: "https://img.icons8.com/color/48/000000/truck--v2.png"
                        })
                        let infoWindow
                        const destination = new google.maps.LatLng(driverLatLng[0], driverLatLng[1])
                        const user = driver.user && driver.user.length ? driver.user[0] : driver

                        driversObj[driver["user_id"]] = marker
                        updateMarkerWindow(distanceMatrixService, origin, destination, infoWindow, driver, user, marker)
                    }
                })


                driverCustomerSocket.on("driver:update-location", (payload) => {
                    console.log(payload)
                    const marker = driversObj[payload["user_id"]]
                    const loginStatus = payload["loginStatus"]
                    let lat = payload["coordinates"][0]
                    let lng = payload["coordinates"][1]
                    if (loginStatus === "login") {
                        if(marker) {
                            const position = new googleInstance.maps.LatLng(lat, lng)
                            marker.setPosition(position)
                            let infoWindow
                            updateMarkerWindow(distanceMatrixService, origin, position, infoWindow, {}, payload["user"], marker)
                        }
                        else {
                            driversObj[payload["user_id"]] = new google.maps.Marker({
                                position: {lat: parseFloat(lat), lng: parseFloat(lng)},
                                map: map,
                                icon: "https://img.icons8.com/color/48/000000/truck--v2.png"
                            })
                        }
                    }
                    else {
                        marker ? marker.setMap(null) : (() => {})()
                    }
                })

                const geocoder = new google.maps.Geocoder()
                geocoder.geocode({location: latitudeLongitude})
                    .then(response => {
                        // console.log(response.results)
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
                    await initMap(drivers)
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

    return (
        <div id='map' className="w-full" style={{ minHeight: 'calc(100vh - 7rem)' }} />
    )
}