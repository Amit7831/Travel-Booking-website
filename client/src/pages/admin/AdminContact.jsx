import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminContact = () => {
    const url = import.meta.env.VITE_BACKEND_URL;

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchContacts = async () => {
        try {
            const getUrl = url + "/contact/get";
            const res = await axios.get(getUrl);

            if (res.data.status) {
                setContacts(res.data.contact);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Page Title */}
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Contact Messages
            </h2>

            {/* Card Container */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">

                {loading ? (
                    <div className="p-6 text-center text-lg font-semibold">
                        Loading Contacts...
                    </div>
                ) : contacts.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        No Contact Messages Found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-green-600 text-white">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Phone</th>
                                    <th className="p-4">Message</th>
                                </tr>
                            </thead>

                            <tbody>
                                {contacts.map((ele, index) => (
                                    <tr
                                        key={index}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="p-4 font-medium text-gray-700">
                                            {ele?.name}
                                        </td>

                                        <td className="p-4 text-blue-600">
                                            {ele?.email}
                                        </td>

                                        <td className="p-4 text-gray-600">
                                            {ele?.phone}
                                        </td>

                                        <td className="p-4 text-gray-700 max-w-xs truncate">
                                            {ele?.message}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminContact;
