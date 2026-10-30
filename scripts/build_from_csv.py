import sys
import os
import csv
from bs4 import BeautifulSoup, Comment
from bs4.formatter import HTMLFormatter
from pathlib import Path

un_countries = [ "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Republic of the Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Côte d'Ivoire", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "MyanmarX", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "São Tomé and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"]
un_countries = ["".join(char for char in s if char.isalnum()) for s in un_countries]

# TODO: just redo entire build file at some point, is very messy due to so many big design changes

# This file will update the website based on the info countries.csv
# This is intended to do EVERYTHING, that way Grant doesn't have to every look at any code, and can just make his changes in the CSV

# Get command line arguments
cwd = os.getcwd().replace("\\", "/")
if (cwd.split("/")[-1].lower() != "grants_map" and cwd.split("/")[-1].lower() != "grantsmap"):
    exit("ERROR: This script must be run from the project root directory")

if len(sys.argv) > 1:
    print("This script takes no arguments! Usage:")
    print("python3 build_from_csv.py") 
    exit()

# Read in data from CSV
csv_data = None
with open("countries.csv", mode="r", newline="", encoding="utf-8") as file:
    reader = csv.reader(file)
    csv_data = list(reader)

# Read in HTML file as string
html_string = None
with open("index.html", "r", encoding="utf-8") as file:
    html_string = file.read()

soup = BeautifulSoup(html_string, "html.parser")



# /*-- ================================================ --->
# <---                PULL CSV CHANGES                  --->
# <--- ================================================ --*/
country_count = 0
un_count = 0
country_table_html = "<tbody>\n\t\t\t\t\t"
fun_facts_html = "<div id=\"fun-facts-container\">\n\t\t\t\t"
for row in csv_data[1:]:
    (country_code, country_name, visited, year_visited, capital, language, population) = row
    visited = visited.strip().lower() == "true"

    path_element = soup.find(id=country_code)
    if path_element == None:
        print(f"WARNING: Country {country_name} ({country_code}) was listed in CSV but not found drawn in the map")
        continue

    # Set visited class in path if needed
    if visited and "visited" not in path_element["class"]:
        print(f"INFO: Marking {country_name} ({country_code}) as visited")
        path_string = f"<path id=\"{country_code}\" class=\"country visited"
        html_string = html_string.replace(f"<path id=\"{country_code}\" class=\"country", path_string)

    elif not visited and "visited" in path_element["class"]:
        print(f"INFO: Removing visited mark from {country_name} ({country_code})")
        path_string = f"<path id=\"{country_code}\" class=\"country"
        html_string = html_string.replace(f"<path id=\"{country_code}\" class=\"country visited", path_string)

    # Update table
    if visited:
        country_count += 1
        country_entry = f"<tr><td><span class=\"country-entry\" data-code=\"{country_code}\">{country_name.replace('_', ' ').title()}</span></td><td>{year_visited}</td></tr>\n\t\t\t\t\t"
        country_table_html += country_entry.expandtabs(4)

    if "".join(char for char in country_name if char.isalnum()) in un_countries:
        un_count += 1
    
    # Add fun facts for each country
    fun_fact_entry = f"<div id=\"fun-facts-{country_code}\" class=\"fun-facts hidden\"><span class=\"capital\">Capital</span><span>{capital}</span><span class=\"language\">Official Language(s)</span><span>{language}</span><span class=\"population\">Population</span><span>{population}</span></div>\n\t\t\t\t"
    fun_facts_html += fun_fact_entry.expandtabs(4)


# /*-- ================================================ --->
# <---               PULL IMAGE CHANGES                 --->
# <--- ================================================ --*/
# Fill the caption cache
caption_cache = {}
for photo_elem in html_string.split("div class=\"photo-wrapper")[1:]:
    # Get image filename
    start = photo_elem.find("src=\"images/") + len("src=\"images/")
    end = photo_elem.find("\"", start)
    filename = photo_elem[start:end]

    # Remove order number in filename
    segments = filename.split("_") # countryCode, cityName, orderNum, extraInfo.extension
    segments.pop(2)
    filename = "_".join(segments)

    # Get caption
    start = photo_elem.find("<div class=\"photo-caption\">") + len("<div class=\"photo-caption\">")
    end = photo_elem.find("</div>", start)
    caption = photo_elem[start:end]

    # Add to cache
    caption_cache[filename] = caption


# Add images into the photo container
cities_table_html = "<tbody>\n\t\t\t\t\t\t"
photos_html = "<div id=\"photos-container\">\n\t\t\t"

current_country = None
current_city = None

for filepath in sorted(Path("./images").glob("*")):
    if not filepath.is_file():
        continue
    
    valid_extensions = {".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"}
    if not filepath.suffix.lower() in valid_extensions:
        print(f"File {filepath} in images folder is not an image file! Must have extension {valid_extensions}")

    # Get info about image
    try:
        metadata = filepath.name.replace(".", "_").split("_")
        country_code = metadata[0].upper()
        raw_city_name = metadata[1]
        formatted_city_name = metadata[1].replace("-", " ").title()
        order = int(metadata[2])
    except Exception as e:
        print(f"ERROR: filename \"{filepath.name}\" does not follow the format <CountryCode>_<CityName>_<OrderingNumber>_<ExtraInfo>! Make sure to use hyphens (-) instead of spaces in the city name.\n\tExample filenames: \"us_boston_1_example.jpg\" or \"us_san-antonio_4_riverwalk.jpg\")")
        continue

    # Determine if we have moved on to a new country
    is_new_country = country_code != current_country
    if is_new_country:
        # Close the old country photo container, and open a new one for this country
        photo_container_string = f"</div>\n\t\t\t<div id=\"{country_code}-photos\" class=\"country-photos hidden\">\n\t\t\t"
        if current_country == None:
            photo_container_string = photo_container_string.replace("</div>\n\t\t\t", "")
        photos_html += photo_container_string

        current_country = country_code
    
    # Determine if we have moved on to a new city
    is_new_city = raw_city_name != current_city
    if is_new_city:
        # Add divider for each city
        photos_html += f"\t<div id=\"{country_code}-{raw_city_name}\" class=\"city-divider\">{formatted_city_name}</div>\n\t\t\t"
        current_city = raw_city_name 

    # Add the city to the table
    city_entry = f"<tr class=\"city-row {country_code}-city\"><td><span class=\"city-entry\" data-photos=\"{country_code}-{raw_city_name}\">{formatted_city_name}</span></td></tr>\n\t\t\t\t\t\t"
    if city_entry.strip() not in cities_table_html:
        cities_table_html += city_entry.expandtabs(4)

    # Try to get caption from cache
    segments = filepath.name.split("_") # countryCode, cityName, orderNum, extraInfo.extension
    segments.pop(2)
    filename = "_".join(segments)
    caption = caption_cache.get(filename) or ""
    
    # Add the image to the country's photo container HTML
    photos_html += \
        f"""    <div class=\"photo-wrapper\">
                    <img class=\"photo\" src=\"{filepath}\">
                    <div class=\"photo-caption\">{caption}</div>
                </div>
            """

# Close last photos container
photos_html += "</div>\n\t\t"



# /*-- ================================================ --->
# <---                  WRITE CHANGES                   --->
# <--- ================================================ --*/
# Replace country table
start = html_string.find("<tbody>", html_string.index("table id=\"countries-table\""))
end = html_string.find("</tbody>", start)
html_string = html_string[:start] + country_table_html[:-4] + html_string[end:]

# Add fun facts
start = html_string.find("<div id=\"fun-facts-container\">")
end = html_string.find("</div> <!-- END OF FUN FACTS -->", start)
html_string = html_string[:start] + fun_facts_html[:-4] + html_string[end:]

# Replace country count
start = html_string.find("# Countries visited - ") + len("# Countries visited - ")
end = html_string.find("</div>", start)
html_string = html_string[:start] + str(country_count) + html_string[end:]

# Replace country count
start = html_string.find("# Countries visited - ") + len("# Countries visited - ")
end = html_string.find("</div>", start)
html_string = html_string[:start] + str(country_count) + html_string[end:]

# Replace cities table
start = html_string.find("<tbody>", html_string.index("table id=\"cities-table\""))
end = html_string.find("</tbody>", start)
html_string = html_string[:start] + cities_table_html[:-4] + html_string[end:]

# Replace photos container
start = html_string.find("<div id=\"photos-container\">")
end = html_string.find("</div> <!-- END OF PHOTOS -->", start)
html_string = html_string[:start] + photos_html + html_string[end:]

# Write changes to HTML
with open("index.html", "w", encoding="utf-8") as file:
    file.write(html_string)