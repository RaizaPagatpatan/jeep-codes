import React, { useState } from 'react';
import '../assets/css/Content.css';

function App() {
    
    const jeepRoutes = [
        ["", "Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliet", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo"],
        ["01A", "1", "2", "3", "", "4", "", "5", "", "", "", "", "", "", "", "", "", "", ""],
        ["02B", "1", "", "2", "3", "", "4", "5", "", "", "", "", "", "", "", "", "", "", ""],
        ["03C", "", "", "1", "2", "", "3", "", "4", "5", "", "", "", "", "", "", "", "", ""],
        ["04A", "", "", "1", "", "2", "3", "4", "5", "", "", "", "", "", "", "", "", "", ""],
        ["04D", "", "", "1", "", "", "2", "3", "4", "", "", "", "", "", "", "5", "", "", ""],
        ["06B", "", "", "", "1", "", "", "", "2", "", "3", "4", "5", "", "", "", "", "", ""],
        ["06D", "", "", "", "1", "", "2", "", "3", "", "4", "", "", "", "5", "", "", "", ""],
        ["10C", "", "", "", "", "", "1", "2", "3", "4", "5", "", "", "", "", "", "", "", ""],
        ["10H", "", "", "", "", "", "", "", "1", "", "2", "", "3", "", "", "4", "", "5", ""],
        ["11A", "", "", "", "", "", "1", "2", "", "", "3", "", "", "", "", "4", "5", "", ""],
        ["11B", "", "", "", "", "", "1", "2", "", "", "", "", "3", "", "", "", "4", "5", ""],
        ["20A", "", "", "", "", "", "", "", "", "1", "2", "", "", "", "3", "", "4", "", "5"],
        ["20C", "", "", "", "", "", "1", "", "2", "3", "4", "", "", "", "", "", "", "", "5"],
        ["42C", "", "", "", "", "", "", "1", "2", "3", "4", "", "", "", "5", "", "", "", ""],
        ["42D", "", "", "", "", "", "", "1", "", "", "2", "3", "", "", "", "4", "5", "", ""]

    ];
 
    const [inputValue, setInputValue] = useState('');
    const [output, setOutput] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const findCommonPlaces = (codes) => {
        const commonPlaces = {};
        for (const code of codes) {
            const route = findRoute(code);
            if (route) {
                route.forEach(place => {
                    if (commonPlaces[place]) {
                        commonPlaces[place].push(code);
                    } else {
                        commonPlaces[place] = [code];
                    }
                });
            }
        }
        return commonPlaces;
    };

    const findRoute = (code) => {
        const index = jeepRoutes.findIndex(row => row[0] === code);
        if (index !== -1) {
            const route = [];
            for (let i = 1; i < jeepRoutes[index].length; i++) {
                if (jeepRoutes[index][i] !== "" && jeepRoutes[0][i] !== "") {
                    route.push(jeepRoutes[0][i]);
                }
            }
            return route;
        }
        return null;
    };

    

    const handleProcess = () => {
        const codes = inputValue.split(',').map(code => code.trim());
        const commonPlaces = findCommonPlaces(codes);
        
        const outputText = codes.map(code => {
            const route = findRoute(code);
            if (route) {
                const updatedRouteFormat = route.map(place => {
                    const commonCount = commonPlaces[place] ? commonPlaces[place].filter(c => codes.includes(c)).length : 0;
                    if (commonCount === 2) {
                        return `<span style="color: blue">${place}</span>`;
                    } else if (commonCount > 1) {
                        return `<span style="color: red">${place}</span>`;
                    } else {
                        return `<span style="color: black">${place}</span>`;
                    }
                });
                return `${code} => ${updatedRouteFormat.join(' <-> ')}`;
            } else {
                return `${code} => Route not found`;
            }
        }).join(', ');
        setOutput(outputText);
    };
    



    return (
        <div>
            <h2>Routes</h2>
            <div>
                <input type="text" value={inputValue} onChange={handleInputChange} />
                <button onClick={handleProcess}>Process</button>
            </div>
            <div className="output">
                <p className="output-text" dangerouslySetInnerHTML={{ __html: output }}></p>
            </div>
          


            {/* table display for reference only */}
            <div className="table-container">
            <table>
                <tbody>
                    {jeepRoutes.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cellData, colIndex) => (
                                <td key={colIndex}>{cellData}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default App;
