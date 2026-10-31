const countries = document.querySelectorAll(".country");
const svg = document.getElementById("map-svg");

let displayedCountry = null;

let visitedColor = "#32d635";
let visitedHighlightColor = "#3FAA40";
let unvisitedColor = "#d4393c";
let unvisitedHighlightColor = "#A63E3F";

let visitedSelectedColor = "#3FAA40";
let unvisitedSelectedColor = "#A63E3F";
let visitedHighlightSelectedColor = "#336934";
let unvisitedHighlightSelectedColor = "#663031";


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
 * Set the border color for an individual country, where the stroke width is proportionally scaled by the current zoom level
 * @param {*} country the country HTML element to color 
 * @param {*} strokeColor color of the stroke border
 * @param {*} strokeWidth the maximum width of the stroke border (at full zoom out)
 */
function setScaledCountryStroke(country, strokeColor, strokeWidth) {
    let [defaultX, defaultY, defaultWidth, defaultHeight] = defaultSvgView;
    let [vbX, vbY, vbWidth, vbHeight] = currSvgView;
    let zoomScale = vbWidth / defaultWidth;
    let scaledStrokeWidth = boundWithin(strokeWidth*zoomScale + 1, 1, strokeWidth)

    country.style.stroke = strokeColor;
    country.style.strokeWidth = `${scaledStrokeWidth}`;
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
        document.getElementById("error-info-box").style.display = "none";
        document.getElementById("cities-container").style.display = "block";
        document.getElementById(countryCode + "-photos").classList.remove("hidden");
    }
    else {
        document.getElementById("error-info-box").style.display = "block";
        document.getElementById("cities-container").style.display = "none";
        if (isVisited) {
            document.getElementById("error-info-box").innerHTML = `No Photos :(<br>Grant has not uploaded photos for ${getCountryPrintName(countryCode)}`;
        }
        else {
            document.getElementById("error-info-box").innerHTML = `No Photos :(<br>Grant has not been to ${getCountryPrintName(countryCode)}`;
        }
    }
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
<---            Country/City Selection Logic          --->
<--- ================================================ --*/
document.addEventListener("DOMContentLoaded", () => {
    hideAllCities();
});

function bringCountryToFront(country) {
    // Remove the country from it's current location in the DOM, and draw it as the last item in the SVG
    // NOTE: I am keeping the country SVG path elements in their region groups.
    //       Because of that, when a country is on a group border I need to remove it from the group and add it to the overall SVG.
    //       If I every remove the region group containers (which don't impact any visuals, and I'm leaving just for organization purposes),
    //       then this function will need to be updated to just re-append the country to the SVG to automatically move it to the end.
    country.remove(country);
    document.getElementById("map-svg").appendChild(country);
}

/**
 * Handle clicking on a country - select the country and display the photos
 * @param {*} country the country HTML object that was clicked 
 * @returns the string two-letter country code zoomed into 
 */
function handleClickedCountry(country) {
    // Unselect the previously selected country (if there is one)
    if (displayedCountry) {
        setScaledCountryStroke(document.getElementById(displayedCountry), "black", 1);
    }
    
    // Select new country
    let countryCode = country.getAttribute('id');
    displayedCountry = countryCode;

    // Show all data for clicked on country
    bringCountryToFront(country);
    setScaledCountryStroke(country, "gold", 5);
    setFlag(countryCode);
    displayCountryCities(countryCode);
    displayPhotos(countryCode);
    displayFunFacts(countryCode);

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
 * Display the fun facts for a given country
 * @param {*} countryCode the two-letter country code to display fun facts for
 */
function displayFunFacts(countryCode) {
    document.querySelectorAll(`.fun-facts`).forEach(funFactsElem => {
        funFactsElem.classList.add("hidden");
    });
    document.getElementById(`fun-facts-${countryCode}`).classList.remove("hidden");
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
    smoothViewBoxTransition(0, 0, 700, 300, 750);

    // Update selected border width
    if (displayedCountry) {
        setScaledCountryStroke(document.getElementById(displayedCountry), "gold", 5);
    }
});

/**
 * Moves the country name cursor textbox when zoomed in
 */
window.addEventListener("mousemove", (e) => {
    let cursorText = document.getElementById("cursor-text");
    cursorText.style.left = e.clientX + 16 + "px";
    cursorText.style.top = e.clientY + 16 + "px";
});


/*-- ================================================ --->
<---               SVG Drag & Zoom Logic              --->
<--- ================================================ --*/
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

let zoomRate = 0.1; // Zoom in/out 10% each time
let maxZoomRate = 20; // 20x zoom increase

let defaultSvgView = svg.getAttribute("viewBox").trim().split(/[\s,]+/).map(Number);
let currSvgView = defaultSvgView;

/**
 * Listener to zoom into SVG when scroll wheel is used
 */
svg.addEventListener("wheel", (e) => {
    let zoomDir = (e.deltaY > 0) ? 1 : -1;
    let [defaultX, defaultY, defaultWidth, defaultHeight] = defaultSvgView;
    let [vbX, vbY, vbWidth, vbHeight] = currSvgView;

    // Do not block/prevent webpage scrolling if we are already zoomed all the way out and trying to zoom out more, or vice versa
    // if ((vbWidth == defaultWidth && zoomDir == 1) || (vbWidth == defaultWidth/maxZoomRate && zoomDir == -1)) {
    //     return;
    // }

    e.preventDefault();

    // Get cursor location within the SVG bounding box (as a fraction of the SVG's width/height)
    let rect = svg.getBoundingClientRect();
    let fracX = (e.clientX - rect.left) / rect.width;
    let fracY = (e.clientY - rect.top) / rect.height;

    // Use cursor fraction to get the current cursor location within SVG
    let cursorX = vbX + fracX * vbWidth;
    let cursorY = vbY + fracY * vbHeight;

    // Calculate shift values
    let zoomAmount = Math.exp(2*zoomDir * zoomRate);
    let newWidth = boundWithin(vbWidth * zoomAmount, defaultWidth/maxZoomRate, defaultWidth);
    let newHeight = newWidth * (defaultHeight / defaultWidth);
    let newX = boundWithin(cursorX - (fracX * newWidth), 0, defaultWidth - newWidth);
    let newY = boundWithin(cursorY - (fracY * newHeight), 0, defaultHeight - newHeight);

    // Perform the actual zoom
    currSvgView = [newX, newY, newWidth, newHeight];
    smoothViewBoxTransition(newX, newY, newWidth, newHeight, 100);
    document.getElementById("overlay-btn").classList.remove("hidden");

    // Update selected border width
    if (displayedCountry) {
        setScaledCountryStroke(document.getElementById(displayedCountry), "gold", 5);
    }
});

let isCursorDown = false;
let isDragging = false;
let startX, startY;
let initialX, initialY;

/**
 * Listener for start of drag for SVG
 * When clicking on SVG, set initial values needed when dragging
 */
svg.addEventListener("pointerdown", (e) => {
    isCursorDown = true;
    isDragging = false;
    initialX = currSvgView[0];
    initialY = currSvgView[1];
    startX = e.clientX;
    startY = e.clientY;
});

/**
 * Listener to handle actual drag
 * Calculate distance moved and update SVG accordingly
 */
svg.addEventListener("pointermove", (e) => {
    if (!isCursorDown) return;

    // Calculate current zoom scale
    let [defaultX, defaultY, defaultWidth, defaultHeight] = defaultSvgView;
    let [vbX, vbY, vbWidth, vbHeight] = currSvgView;
    
    let zoomScale = vbWidth / defaultWidth;
    
    // Calculate distance moved
    let dx = (startX - e.clientX) * zoomScale;
    let dy = (startY - e.clientY) * zoomScale;

    // Stop other onclick events once the mouse has moved far enough (so we can differentiate between a "drag" and a "click")
    if (isCursorDown && !isDragging) {
        if (Math.sqrt(dx**2, dy**2) >= 5*zoomScale) {
            isDragging = true;
            svg.setPointerCapture(e.pointerId);
            svg.style.cursor = "grabbing";
        }
        else {
            return;
        }
    };
    
    // Update SVG attributes
    let newX = boundWithin(initialX + dx, defaultX, defaultX + defaultWidth - vbWidth);
    let newY = boundWithin(initialY + dy, defaultY, defaultY + defaultHeight - vbHeight);
    svg.setAttribute("viewBox", `${newX} ${newY} ${vbWidth} ${vbHeight}`);
    currSvgView = [newX, newY, vbWidth, vbHeight];
});

/**
 * Listener for end of drag for SVG
 * Reset the dragging values back to defaults
 */
svg.addEventListener("pointerup", (e) => {
    isCursorDown = false;
    isDragging = false;
    svg.style.cursor = "grab";
    svg.releasePointerCapture(e.pointerId);
});
