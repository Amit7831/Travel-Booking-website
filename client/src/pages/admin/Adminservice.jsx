import React, { useEffect, useState } from "react";
import axios from "axios";

const Adminservice = () => {

    const url = import.meta.env.VITE_BACKEND_URL;
    const [service, setService] = useState([]);

    {/* useState for Admin form add package */ }

    const [addPackage, setAddPackage] = useState(false)


    {/* put data by admin */ }
    const [packageName, setPackageName] = useState("")
    const [place, setPlace] = useState("")
    const [duration, setDuration] = useState("")
    const [pricePerPersion, setPricePerPersion] = useState("")
    const [availableBookingSeat, setAvailableBookingSeat] = useState("")
    const [dateDeadline, setDateDeadline] = useState("")
    const [accommodation, setAccommodation] = useState("")
    const [transport, setTransport] = useState("")
    const [image, setImage] = useState("")

    const handleSubmit = async () => {
        try {
            const postUrl = url + "/service/add";
            const res = await axios.post(postUrl, {
                packageName,
                place,
                duration,
                pricePerPersion,
                availableBookingSeat,
                dateDeadline,
                accommodation,
                transport,
                image,
            });

            if (res?.data?.status) {
                alert(res?.data?.message);
                setPackageName("");
                setPlace("");
                setDuration("");
                setPricePerPersion("");
                setAvailableBookingSeat("");
                setDateDeadline("");
                setAccommodation("");
                setTransport("");
                setImage("");

                fetchService();
            } else {
                console.log("Somthing went wrong");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchService = async () => {
        try {
            const getUrl = url + "/service/get";
            const res = await axios.get(getUrl);
            if (res.data.status) {
                setService(res.data.service);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchService();
    }, []);


    return (
        <div className="text-xs sm:text-sm  ">
            {/* Admin panel Services add table */}
            <div className="flex justify-end p-1  ">
                <button onClick={() => setAddPackage(true)} className=" rounded-2xl  hover:text-slate-100  active:translate-y-1 transition-all duration-200 bg-green-500 p-1" >
                    Add Package
                </button>

            </div>
            <table className="w-full ">
                <thead className="border  bg-sky-300">
                    <tr>
                        <td>PackageName</td>
                        <td>Place</td>
                        <td>Duration</td>
                        <td>Price</td>
                        <td>Available</td>
                        <td>Date</td>
                        <td>Accomodation</td>
                        <td>Transport</td>
                        <td>Img</td>
                    </tr>
                </thead>
                <tbody>
                    {service?.length > 0 &&
                        service.map((ele) => (
                            <tr key={ele._id} className="border text-center">
                                <td>{ele?.packageName}</td>
                                <td>{ele?.place}</td>
                                <td>{ele?.duration}</td>
                                <td>{ele?.pricePerPersion}</td>
                                <td>{ele?.availableBookingSeat}</td>
                                <td>{ele?.dateDeadline}</td>
                                <td>{ele?.accommodation}</td>
                                <td>{ele?.transport}</td>
                                <td>{ele?.image}</td>
                            </tr>
                        ))}
                </tbody>
            </table>


            <div className={`absolute top-0  bottom-0   right-0 overflow-hidden bg-blue-200 transition-all ${addPackage ? 'w-full' : 'w-0'}`}>
                    <button
                        className="bg-green-500 w-10 hover:bg-gray-800 h-10 text-white p-2 rounded-lg mt-2"
                        onClick={() => {
                        
                            setAddPackage(false);
                        }}
                    >
                        Back
                    </button>
                <div className="flex flex-col justify-center items-center p-4 text-sm  gap-2">
                    <input className="input w-1/2 text-sm placeholder:text-sm" type="text" placeholder="Package name"
                        onChange={(e) => setPackageName(e.target.value)}
                        value={packageName}
                    />

                    <input className="input w-1/2 text-sm placeholder:text-sm" type="text" placeholder="Place"
                        onChange={(e) => setPlace(e.target.value)}
                        value={place}
                    />

                    <input className="input w-1/2 text-sm placeholder:text-sm" type="text" placeholder="Duration"
                        onChange={(e) => setDuration(e.target.value)}
                        value={duration}
                    />

                    <input className="input w-1/2 text-sm placeholder:text-sm" type="number" placeholder="Price per person"
                        onChange={(e) => setPricePerPersion(e.target.value)}
                        value={pricePerPersion}
                    />

                    <input className="input w-1/2 text-sm placeholder:text-sm" type="number" placeholder="Available seats"
                        onChange={(e) => setAvailableBookingSeat(e.target.value)}
                        value={availableBookingSeat}
                    />

                    <input className="input w-1/2 text-sm placeholder:text-sm" type="date"
                        onChange={(e) => setDateDeadline(e.target.value)}
                        value={dateDeadline}
                    />

                    <input className="input w-1/2 text-sm placeholder:text-sm rounded-sm placeholder:border-none" type="text" placeholder="Accommodation"
                        onChange={(e) => setAccommodation(e.target.value)}
                        value={accommodation}
                    />

                    <input className="input w-1/2 text-sm placeholder:text-sm" type="text" placeholder="Transport"
                        onChange={(e) => setTransport(e.target.value)}
                        value={transport}
                    />

                    <input className="input w-1/2 text-sm placeholder:text-sm" type="text" placeholder="Image URL"
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />

                    <button
                        className="bg-green-500 text-white p-2 hover:bg-gray-800 rounded mt-2"
                        onClick={() => {
                            handleSubmit();
                            setAddPackage(false);
                        }}
                    >
                        Submit
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Adminservice