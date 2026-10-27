const countries = document.querySelectorAll(".country");
const svg = document.getElementById("map-svg");

let displayedCountry = null;

// let visitedColor = "#3FAA40";
// let visitedHighlightColor = "#3d8c40";
// let unvisitedColor = "#A63E3F";
// let unvisitedHighlightColor = "#91383a";

let visitedColor = "#32d635";
let visitedHighlightColor = "#3FAA40";

let unvisitedColor = "#d4393c";
let unvisitedHighlightColor = "#A63E3F";

let visitedSelectedColor = "#3FAA40";
let unvisitedSelectedColor = "#A63E3F";
let visitedHighlightSelectedColor = "#409741";
let unvisitedHighlightSelectedColor = "#8b3b3c";


const codeMappings = {
    "AF": "afghanistan",
    "AO": "angola",
    "AL": "albania",
    "AE": "united_arab_emirates",
    "AR": "argentina",
    "AM": "armenia",
    "AU": "australia",
    "AT": "austria",
    "AZ": "azerbaijan",
    "BI": "burundi",
    "BE": "belgium",
    "BJ": "benin",
    "BF": "burkina_faso",
    "BD": "bangladesh",
    "BG": "bulgaria",
    "BH": "bahrain",
    "BA": "bosnia_and_herzegovina",
    "BY": "belarus",
    "BZ": "belize",
    "BO": "bolivia",
    "BR": "brazil",
    "BN": "brunei_darussalam",
    "BT": "bhutan",
    "BW": "botswana",
    "CF": "central_african_republic",
    "CA": "canada",
    "CH": "switzerland",
    "CL": "chile",
    "CN": "china",
    "CI": "côte_d'ivoire",
    "CM": "cameroon",
    "CD": "democratic_republic_of_the_congo",
    "CG": "republic_of_congo",
    "CO": "colombia",
    "CR": "costa_rica",
    "CU": "cuba",
    "CZ": "czech_republic",
    "DE": "germany",
    "DJ": "djibouti",
    "DK": "denmark",
    "DO": "dominican_republic",
    "DZ": "algeria",
    "EC": "ecuador",
    "EG": "egypt",
    "ER": "eritrea",
    "EE": "estonia",
    "ET": "ethiopia",
    "FI": "finland",
    "FJ": "fiji",
    "GA": "gabon",
    "GB": "united_kingdom",
    "GE": "georgia",
    "GH": "ghana",
    "GN": "guinea",
    "GM": "the_gambia",
    "GW": "guinea",
    "GQ": "equatorial_guinea",
    "GR": "greece",
    "GL": "greenland",
    "GT": "guatemala",
    "GY": "guyana",
    "HN": "honduras",
    "HR": "croatia",
    "HT": "haiti",
    "HU": "hungary",
    "ID": "indonesia",
    "IN": "india",
    "IE": "ireland",
    "IR": "iran",
    "IQ": "iraq",
    "IS": "iceland",
    "IL": "israel",
    "IT": "italy",
    "JM": "jamaica",
    "JO": "jordan",
    "JP": "japan",
    "KZ": "kazakhstan",
    "KE": "kenya",
    "KG": "kyrgyzstan",
    "KH": "cambodia",
    "KR": "south_korea",
    "XK": "kosovo",
    "KW": "kuwait",
    "LA": "laos",
    "LB": "lebanon",
    "LR": "liberia",
    "LY": "libya",
    "LK": "sri_lanka",
    "LS": "lesotho",
    "LT": "lithuania",
    "LU": "luxembourg",
    "LV": "latvia",
    "MA": "morocco",
    "MD": "moldova",
    "MG": "madagascar",
    "MX": "mexico",
    "MK": "macedonia",
    "ML": "mali",
    "MM": "myanmar",
    "ME": "montenegro",
    "MN": "mongolia",
    "MZ": "mozambique",
    "MR": "mauritania",
    "MW": "malawi",
    "MY": "malaysia",
    "NA": "namibia",
    "NE": "niger",
    "NG": "nigeria",
    "NI": "nicaragua",
    "NL": "netherlands",
    "NO": "norway",
    "NP": "nepal",
    "NZ": "new_zealand",
    "OM": "oman",
    "PK": "pakistan",
    "PA": "panama",
    "PE": "peru",
    "PH": "philippines",
    "PG": "papua_new_guinea",
    "PL": "poland",
    "KP": "north_korea",
    "PT": "portugal",
    "PY": "paraguay",
    "PS": "palestine",
    "QA": "qatar",
    "RO": "romania",
    "RU": "russia",
    "RW": "rwanda",
    "EH": "western_sahara",
    "SA": "saudi_arabia",
    "SD": "sudan",
    "SS": "south_sudan",
    "SN": "senegal",
    "SL": "sierra_leone",
    "SV": "el_salvador",
    "RS": "serbia",
    "SR": "suriname",
    "SK": "slovakia",
    "SI": "slovenia",
    "SE": "sweden",
    "SZ": "swaziland",
    "SY": "syria",
    "TD": "chad",
    "TG": "togo",
    "TH": "thailand",
    "TJ": "tajikistan",
    "TM": "turkmenistan",
    "TL": "timor-leste",
    "TN": "tunisia",
    "TR": "turkey",
    "TW": "taiwan",
    "TZ": "tanzania",
    "UG": "uganda",
    "UA": "ukraine",
    "UY": "uruguay",
    "US": "united_states",
    "UZ": "uzbekistan",
    "VE": "venezuela",
    "VN": "vietnam",
    "VU": "vanuatu",
    "YE": "yemen",
    "ZA": "south_africa",
    "ZM": "zambia",
    "ZW": "zimbabwe",
    "SO": "somalia",
    "GF": "french_guiana",
    "FR": "france",
    "ES": "spain",
    "AW": "aruba",
    "AI": "anguilla",
    "AD": "andorra",
    "AG": "antigua_and_barbuda",
    "BS": "bahamas",
    "BM": "bermuda",
    "BB": "barbados",
    "KM": "comoros",
    "CV": "cape_verde",
    "KY": "cayman_islands",
    "DM": "dominica",
    "FK": "falkland_islands",
    "FO": "faeroe_islands",
    "GD": "grenada",
    "HK": "hong_kong",
    "KN": "saint_kitts_and_nevis",
    "LC": "saint_lucia",
    "LI": "liechtenstein",
    "MF": "saint_martin",
    "MV": "maldives",
    "MT": "malta",
    "MS": "montserrat",
    "MU": "mauritius",
    "NC": "new_caledonia",
    "NR": "nauru",
    "PN": "pitcairn_islands",
    "PR": "puerto_rico",
    "PF": "french_polynesia",
    "SG": "singapore",
    "SB": "solomon_islands",
    "ST": "são_tomé_and_principe",
    "SX": "saint_martin",
    "SC": "seychelles",
    "TC": "turks_and_caicos_islands",
    "TO": "tonga",
    "TT": "trinidad_and_tobago",
    "VC": "saint_vincent_and_the_grenadines",
    "VG": "british_virgin_islands",
    "VI": "united_states_virgin_islands",
    "CY": "cyprus",
    "RE": "reunion",
    "YT": "mayotte",
    "MQ": "martinique",
    "GP": "guadeloupe",
    "CW": "curaco",
    "IC": "canary_islands",
    "BL": "saint_barthélemy",
    "GU": "guam",
    "WS": "samoa",
    "AS": "american_samoa",
    "MP": "northern_mariana_islands",
    "PW": "palau",
    "MH": "marshall_islands",
    "FM": "micronesia",
    "TV": "tuvalu",
    "BQS": "caribbean_netherlands",
    "BQB": "caribbean_netherlands",
    "BQS": "caribbean_netherlands",
    "VA": "vatican_city",
}


/*-- ================================================ --->
<---                  Helper Functions                --->
<--- ================================================ --*/
/**
 * Formats the behind the scenes country name to a printable version.
 * Capitalizes the first character, and all characters following "special" characters in the country name.
 * Replace underscores with spaces
 * @param {*} name the country name to convert to print version
 */
function getCountryPrintName(code) {
    let name = codeMappings[code];
    let printName = "";
    printName += name[0].toUpperCase();
    name = name.replaceAll("_", " ");
    for (let i = 1; i < name.length; i++) {
        if (("-' _".includes(name[i - 1])) && !(name[i - 1] == " " && name[i + 1] == "'")) { // Second boolean is an exception made for Côte d'Ivoire
            printName += name[i].toUpperCase();
        }
        else {
            printName += name[i];
        }
    }

    return printName
}

/**
 * Set the color for an individual country 
 * @param {*} country the country HTML element to color 
 * @param {*} colorVisited the color to set if a visited country
 * @param {*} colorUnvisited the color to set if an unvisited country 
 */
function setCountryColor(country, colorVisited, colorUnvisited) {
    country.style.fill = (country.classList.contains("visited")) ? colorVisited : colorUnvisited;
}

/**
 * Set the border color for an individual country 
 * @param {*} country the country HTML element to color 
 * @param {*} strokeColor color of the stroke border
 * @param {*} strokeWidth width of the stroke border
 */
function setCountryStroke(country, strokeColor, strokeWidth) {
    country.style.stroke = strokeColor;
    country.style.strokeWidth = strokeWidth;
}

/**
 * Show the text box that displays the country name by the cursor
 * @param {*} country the country HTML element to show 
 */
function showCountryCursorName(country) {
    document.getElementById("cursor-text").style.display = "block";
    document.getElementById("cursor-text").innerText = getCountryPrintName(country.getAttribute('id'));
}

/**
 * Hide the text box that displays the country name by the cursor
 */
function hideCountryCursorName() {
    document.getElementById("cursor-text").style.display = "none";
}

/**
 * Hide all photos for all countries
 */
function hideAllDisplayedPhotos() {
    document.querySelector(".country-photos:not(.hidden)")?.classList.add("hidden");
}

/**
 * Handle logic for displaying the photos and additional info for the given country.
 * Only displays if it the country has been visited and contains photos
 * @param {*} countryCode the two-letter country code for the country to display
 */
function displayPhotos(countryCode) {
    hideAllDisplayedPhotos();
    document.getElementById("primary-info-box").textContent = `Photos from ${getCountryPrintName(countryCode)}`;

    let isVisited = document.getElementById(`${countryCode}`).classList.contains("visited");
    let hasPhotos = (document.getElementById(countryCode + "-photos") != null);
    
    if (isVisited && hasPhotos) {
        document.getElementById("secondary-info-box").style.display = "none";
        document.getElementById("cities-container").style.display = "block";
        document.getElementById(countryCode + "-photos").classList.remove("hidden");
    }
    else {
        document.getElementById("secondary-info-box").style.display = "block";
        document.getElementById("cities-container").style.display = "none";
        if (isVisited) {
            document.getElementById("secondary-info-box").innerHTML = `No Photos :(<br>Grant has not uploaded photos for ${getCountryPrintName(countryCode)}`;
        }
        else {
            document.getElementById("secondary-info-box").innerHTML = `No Photos :(<br>Grant has not been to ${getCountryPrintName(countryCode)}`;
        }
    }
}

/**
 * Prevent hitboxes from having cursors displayed over them.
 * Used when you zoom into a hitbox, so you can select the individual countries within them
 */
function removeHitboxPointer() {
    document.querySelectorAll(".hitbox").forEach(hitbox => {
        hitbox.classList.remove("pointer-cursor");
    });
}

/**
 * Add cursors being displayed when hovering over hitboxes
 */
function addHitboxPointer() {
    document.querySelectorAll(".hitbox").forEach(hitbox => {
        hitbox.classList.add("pointer-cursor");
    });
}

/**
 * Set the displayed flag to the given country
 * @param {*} countryCode the two-letter country code to display the flag for
 */
function setFlag(countryCode) {
    let flagDisplay = document.getElementById("flag-container");
    flagDisplay.style.display = "block";
    flagDisplay.className = `fi fi-${countryCode.toLowerCase()}`;
}

/**
 * Hide all city rows in the city table
 */
function hideAllCities() {
    document.querySelectorAll(".city-row").forEach(cityRow => {
        cityRow.style.display = "none";
    });
}

/**
 * Get a random integer within a range
 * @param {*} min the minimum value
 * @param {*} max the maximum value
 * @returns a random integer [min, max]
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Bound a value within a minimum and maximum value if it goes over
 * @param {*} value the value to bound
 * @param {*} min the minimum allowed value, inclusive
 * @param {*} max the maximum allowed value, inclusive
 * @returns the value if it is within the bounds, otherwise return the bound it is closest to
 */
function boundWithin(value, min, max) {
    if (min == null && max == null) {
        return value;
    }
    else if (min == null) {
        return Math.min(value, max);

    }
    else if (max == null) {
        return Math.max(value, min);

    }
    else {
        return Math.min(Math.max(value, min), max);
    }
}


/*-- ================================================ --->
<---                     Zoom Logic                   --->
<--- ================================================ --*/
/**
 * Draw an SVG line according to the attributes given
 * @param {*} x1 x for point 1
 * @param {*} y1 y for point 1
 * @param {*} x2 x for point 2
 * @param {*} y2 y for point 2
 * @param {*} color stroke color of the line
 * @param {*} thickness thickness of the line
 */
function drawSvgLine(x1, y1, x2, y2, color, thickness) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", color);
    line.setAttribute("stroke-width", thickness);
    line.setAttribute("stroke-linecap", "round");
    svg.appendChild(line);
}

/**
 * Smoothly zoom into a viewbox of the SVG
 * @param {*} targetX x of the top left corner viewbox
 * @param {*} targetY y of the top left corner viewbox
 * @param {*} targetWidth width of the final viewbox
 * @param {*} targetHeight height of the final viewbox
 * @param {*} duration how long the transition should take, in seconds
 */
function smoothViewBoxTransition(targetX, targetY, targetWidth, targetHeight, duration) {
    let start = performance.now();
    
    // Parse current viewBox
    let currentAttr = svg.getAttribute('viewBox').split(' ').map(Number);
    let [startX, startY, startWidth, startHeight] = currentAttr;

    function step(time) {
        let elapsed = time - start;
        let progress = Math.min(elapsed / duration, 1);

        let ease = 1 - Math.pow(1 - progress, 3);

        let x = startX + (targetX - startX) * ease;
        let y = startY + (targetY - startY) * ease;
        let width = startWidth + (targetWidth - startWidth) * ease;
        let height = startHeight + (targetHeight - startHeight) * ease;

        svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

/**
 * Get how much padding to add to a zoom viewbox
 * @param {*} totalWidth total width of the SVG
 * @param {*} totalHeight total heigh of the SVG
 * @param {*} zoomWidth width of the zoomed viewbox
 * @param {*} zoomHeight height of the zoomed viewbox
 * @returns tuple of [widthPadding, heightPadding], in px
 */
function getZoomPaddings(totalWidth, totalHeight, zoomWidth, zoomHeight) {
    let widthScale = zoomWidth / totalWidth;
    let heightScale = zoomHeight / totalHeight;
    let scale = 1;

    let baseWidthPadding = 25;
    let baseHeightPadding = baseWidthPadding*(totalHeight/totalWidth);

    // If width bound
    let widthPadding = 0;
    let heightPadding = 0;
    if (widthScale >= heightScale) {
        scale = widthScale;
        widthPadding = baseWidthPadding + ((totalWidth * scale - zoomWidth) / 2);
        heightPadding = ((totalHeight * scale - zoomHeight) / 2);
    }
    // If height bound
    else {
        scale = heightScale;
        heightPadding = baseHeightPadding + ((totalHeight * scale - zoomHeight) / 2);
        widthPadding = baseWidthPadding + ((totalWidth * scale - zoomWidth) / 2);
    }

    return [widthPadding, heightPadding]
}


/*-- ================================================ --->
<---              Core Functionality Logic            --->
<--- ================================================ --*/
document.addEventListener("DOMContentLoaded", () => {
    hideAllCities();
});

/**
 * Handle clicking on a country - select the country and display the photos
 * @param {*} country the country HTML object that was clicked 
 * @returns the string two-letter country code zoomed into 
 */
function handleClickedCountry(country) {
    // Unselect the previously selected country (if there is one)
    if (displayedCountry) {
        setCountryStroke(document.getElementById(displayedCountry), "black", "1");
    }
    
    // Select new country
    let countryCode = country.getAttribute('id');
    displayedCountry = countryCode;

    // Show all data for clicked on country
    setCountryStroke(country, "gold", "5");
    setFlag(countryCode);
    displayCountryCities(countryCode);
    displayPhotos(countryCode);

    return countryCode;
}

/**
 * Display the photos for a given country
 * @param {*} countryCode the two-letter country code to display photos for
 */
function displayCountryCities(countryCode) {
    hideAllCities();
    document.querySelectorAll(`.${countryCode}-city`).forEach(cityEntry => {
        cityEntry.style.display = "table-row";
    });
}

/**
 * Add event listeners to each country object - clicking and hovering
 */
countries.forEach(country => {
    // Handle clicking a country - zoom to region and scale up
    country.addEventListener('click', () => {
        handleClickedCountry(country);
    });

    // Highlight on hover
    country.addEventListener('mouseenter', () => {
        setCountryColor(country, visitedHighlightColor, unvisitedHighlightColor);
        showCountryCursorName(country);
    });

    // Unhighlight on ending hover
    country.addEventListener('mouseleave', () => {
        setCountryColor(country, visitedColor, unvisitedColor);
        hideCountryCursorName();
    });
});

/**
 * Handles logic for clicking on an entry in the country table.
 */
document.querySelectorAll(".country-entry").forEach(countryEntry => {
    countryEntry.addEventListener("click", () => {
        handleClickedCountry(document.getElementById(countryEntry.dataset.code));
    })
});

/**
 * Handles logic for clicking on an entry in the city table.
 * Will jump to the photos for that specific city
 */
document.querySelectorAll(".city-entry").forEach(cityEntry => {
    cityEntry.addEventListener("click", () => {
        document.getElementById(cityEntry.dataset.photos).scrollIntoView();
    })
});

/**
 * Handles logic for clicking on the overlay "back" button.
 * Zooms out to the original view
 */
document.getElementById("overlay-btn").addEventListener("click", () => {
    currSvgView = defaultSvgView;
    document.getElementById("overlay-btn").classList.add("hidden");
    addHitboxPointer();
    smoothViewBoxTransition(0, 0, 700, 300, 750);
});

/**
 * Moves the country name cursor textbox when zoomed in
 */
window.addEventListener("mousemove", (e) => {
    let cursorText = document.getElementById("cursor-text");
    cursorText.style.left = e.clientX + 16 + "px";
    cursorText.style.top = e.clientY + 16 + "px";
});




let zoomScale = 0.1; // Zoom in/out 10% each time
let maxZoomScale = 20; // 20x zoom increase

let defaultSvgView = svg.getAttribute("viewBox").trim().split(/[\s,]+/).map(Number);
let currSvgView = defaultSvgView;

svg.addEventListener("wheel", (e) => {
    e.preventDefault();

    // Get cursor location within the SVG bounding box (as a fraction of the SVG's width/height)
    let rect = svg.getBoundingClientRect();
    let fracX = (e.clientX - rect.left) / rect.width;
    let fracY = (e.clientY - rect.top) / rect.height;

    // Use cursor fraction to get the current cursor location
    let [defaultX, defaultY, defaultWidth, defaultHeight] = defaultSvgView;
    let [vbX, vbY, vbWidth, vbHeight] = currSvgView;
    let cursorX = vbX + fracX * vbWidth;
    let cursorY = vbY + fracY * vbHeight;

    // Determine if zooming in or out
    let zoomDir = (e.deltaY > 0) ? 1 : -1;
    let zoomFactor = Math.exp(2*zoomDir * zoomScale);

    // Calculate shift values
    let newWidth = boundWithin(vbWidth * zoomFactor, defaultWidth/maxZoomScale, defaultWidth);
    let newHeight = newWidth * (defaultHeight / defaultWidth);
    let newX = boundWithin(cursorX - (fracX * newWidth), 0, defaultWidth - newWidth);
    let newY = boundWithin(cursorY - (fracY * newHeight), 0, defaultHeight - newHeight);
    
    console.log(`newX = ${newX}px`);
    console.log(`newY = ${newY}px`);
    console.log(`newWidth = ${newWidth}px`);
    console.log(`newHeight = ${newHeight}px`);

    // Perform the actual zoom
    currSvgView = [newX, newY, newWidth, newHeight];
    smoothViewBoxTransition(newX, newY, newWidth, newHeight, 100);
    document.getElementById("overlay-btn").classList.remove("hidden");
});


/*
let isDragging = false;
let startX, startY;
let initialX, initialY;

svg.addEventListener("pointerdown", (e) => {
    isDragging = true;
    svg.setPointerCapture(e.pointerId);

    let currentViewBox = svg.getAttribute("viewBox");
    let [x, y, width, height] = currentViewBox.split(/[\s,]+/);
    
    initialX = parseFloat(x) || 0;
    initialY = parseFloat(y) || 0;
    startX = e.clientX;
    startY = e.clientY;
});

svg.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    
    // Calculate distance moved
    const dx = startX - e.clientX;
    const dy = startY - e.clientY;
    
    // Update SVG attributes
    let currentViewBox = svg.getAttribute("viewBox");
    let [x, y, width, height] = currentViewBox.split(/[\s,]+/);
    svg.setAttribute("viewBox", `${initialX + dx} ${initialY + dy} ${width} ${height}`);
});

svg.addEventListener("pointerup", (e) => {
    isDragging = false;
    svg.releasePointerCapture(e.pointerId);
});
*/