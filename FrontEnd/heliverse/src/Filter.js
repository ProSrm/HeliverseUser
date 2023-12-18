import React, { useState } from 'react';
import axios from 'axios';
import "./css/UserFilter.css"

function UserFilter() {
    const [gender, setGender] = useState('');
    const [domain, setDomain] = useState('');
    const [available, setAvailable] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [checked, setChecked] = useState([]);


    const filter = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/filter?domain=${domain}&gender=${gender}&available=${available}`);
            setFilteredUsers(response.data);
            console.log(response.data);


        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    // Display list of people which selected . 
    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    return (
        <div>
            <label>Domain:
                <input type="text" name="domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
            </label>

            <label>Gender:
                <select name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </label>

            <label>Availability:
                <select name="available" value={available} onChange={(e) => setAvailable(e.target.value)}>
                    <option value="">Select Availability</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </label>
            <button onClick={filter}>filter</button>

            <ul>
                {filteredUsers.map((user) => (
                    <li key={user.id}>
                        <input
                            value={`${user.first_name}-${user.email}`}
                            type="checkbox"
                            onChange={handleCheck}
                        />

                        {user.first_name}---{user.email}</li>

                ))}
            </ul>
            <div>
                {`People selected are : ${checkedItems}`}
            </div>
        </div>
    );
}

export default UserFilter;
