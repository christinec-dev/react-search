import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import _ from "lodash";
import { Form } from "react-bootstrap";
import AutoComplete from "./AutoComplete";
import useOutsideClick from "../custom-hooks/useOutsideClick";

const InputControl = ({ name, label, placeholder }) => {
    const [documentRef, isVisible, setIsVisible] = useOutsideClick();
    const [suggestions, setSuggestions] = useState([]);
    const [selectedCountry, setSelectedCountry]= useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const ref = useRef();

    //eliminates unnecessary API calls & lets us call the API only after 300 milliseconds has passed once the user has stopped typing
    useEffect(() => {
        ref.current = _.debounce(processRequest, 300);
    }, []);

    //we make an API call to get the list of countries
    function processRequest(searchValue) {
        axios
            .get('/countries.json')
            .then((response) => {
                const countries = response.data;

                // filter out only the countries that match the provides search term
                const result = countries.filter((country) => 
                    country.toLowerCase().includes(searchValue.toLowerCase())
                );

                //we're setting out the list of countries in the suggestions state
                setSuggestions(result);

                //checking the length of the result array to display or hide the suggestion box
                if (result.length > 0) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false)
                }
                setErrorMsg('')
            })
        .catch(() => setErrorMsg('Something went wrong. Try again later'));
    }

    //handles the search term when input is added within textbox, & showing suggestions only if isVisible is true which happens when we get results from the API inside the processRequest function
    function handleSearch(evt) {
        evt.preventDefault();
        const { value } = evt.target;
        setSearchTerm(value);
        ref.current(value);
    }

    //Once we click on any of the suggestion, the handleSuggestionClick function gets executed which is updating the selectedCountry and hiding the suggestions
    function handleSuggestionClick(countryValue) {
        setSelectedCountry(countryValue);
        setIsVisible(false);
    }

    return (
        <Form.Group controlId="searchTerm">
                <Form.Control
                className="input-control col-12"
                type="text"
                value={searchTerm}
                name={name}
                onChange={handleSearch}
                autoComplete="off"
                placeholder={placeholder}
                />
                <div ref={documentRef}>
                    {isVisible && (
                        <AutoComplete
                        isVisible={isVisible}
                        suggestions={suggestions}
                        handleSuggestionClick={handleSuggestionClick}
                        />
                    )}
                </div>
                {selectedCountry && (
                <div className="selected-country">
                    Your selected country: {selectedCountry}
                </div>
                )}
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        </Form.Group> 
    )
}

export default InputControl;