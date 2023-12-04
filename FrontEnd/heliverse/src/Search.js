import React, { useState } from 'react';
import axios from 'axios';
import "./css/Search.css"

function UserSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/users/search?name=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name"
            />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {searchResults.map((user) => (
                    <li key={user._id}>{user.first_name} - {user.email}</li>

                ))}
            </ul>
        </div>
    );
}

export default UserSearch;
