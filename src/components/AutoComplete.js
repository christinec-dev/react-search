import React from "react";

export default function AutoComplete({ isVisible, suggestions, handleSuggestionClick }) {
    return (
        <div className={`${isVisible ? 'show suggestion-box' : 'suggestion-box'}`}>
            <ul>
                {/* showing the suggestions to the user once the user types something in the input textbox */}
                {suggestions.map((country,index) => (
                    <li key={index} onClick={() => handleSuggestionClick(country)}>
                        {country}
                    </li>
                ))}
            </ul>
        </div>
    )
}