let baseUrl = "";


// Function to fetch JSON from a URL and process the first item
async function fetchAndProcessJson(url) {
    try {
        // Fetch the JSON data from the URL
        const response = await fetch(url);

        // Check if the response is OK (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        // Parse the JSON data
        const jsonData = await response.json();

        // Check if jsonData is an array and has at least one item
        if (!Array.isArray(jsonData.fields) || jsonData.features.length === 0) {
            throw new Error('JSON data is not an array or is empty');
        }

        // Get the first item from the array
        const firstItem = jsonData.features[0];

        // Create a new object with the keys as properties
        const result = { ...firstItem };

        // Output the result (or use it as needed)
        console.log(result);

        displayKeysInList(result);


        // // Return the result if needed for further processing
        // return result;
    } catch (error) {
        // Handle errors (e.g., network errors, JSON parsing errors)
        console.error('Failed to fetch and process JSON:', error);
    }
}

function displayKeysInList(obj) {
    // Get the ul element by its id
    const ul = document.getElementById('keyList');

    // Clear existing list items
    ul.innerHTML = '';

    // Iterate over the keys of the object
    for (let key in obj) {
        // Create a list item for each key
        const li = document.createElement('li');

        // Create a checkbox for the list item
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'keyCheckbox';
        checkbox.value = key;
        li.appendChild(checkbox);

        // Add label text for the key
        const labelText = document.createTextNode(key);
        li.appendChild(labelText);

        // Check if the value of the key is an object (nested keys)
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Create a nested ul element for nested keys
            const nestedUl = document.createElement('ul');

            // Iterate over the nested keys
            for (let nestedKey in obj[key]) {
                // Create a list item for each nested key
                const nestedLi = document.createElement('li');

                // Create a checkbox for the nested key
                const nestedCheckbox = document.createElement('input');
                nestedCheckbox.type = 'checkbox';
                nestedCheckbox.name = 'nestedKeyCheckbox';
                nestedCheckbox.value = nestedKey;
                nestedLi.appendChild(nestedCheckbox);

                // Add label text for the nested key
                const nestedLabelText = document.createTextNode(nestedKey);
                nestedLi.appendChild(nestedLabelText);

                // Append the nested list item to the nested ul element
                nestedUl.appendChild(nestedLi);
            }

            // Append the nested ul element to the main list item
            li.appendChild(nestedUl);
        }

        // Append the list item to the ul element
        ul.appendChild(li);
    }
}

function getUrlBeforeWhere(url) {
    // Find the position of "?where"
    const whereIndex = url.indexOf("?where");
    
    // If "?where" is found, return the part of the URL before it
    if (whereIndex !== -1) {
      return url.substring(0, whereIndex);
    }
    
    // If "?where" is not found, return the original URL
    return url;
  }

// Function to collect checked items into an array
function collectCheckedItems() {
    const checkedItems = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        checkedItems.push(checkbox.value);
    });
    console.log(checkedItems);

    //insert new path and download button
    let openApi = OpenApiObj;
    openApi.servers[0].url = baseUrl;

    let path = pathObj;
    path.get.parameters.forEach(parameter => {
        if (parameter.name === "outFields") {
            parameter.schema.example = checkedItems.join(',');
        }
    });

    openApi.paths["/testPath"] = path;

    // Convert openApi object to JSON string
    const jsonStr = JSON.stringify(openApi, null, 2);

    // Create a Blob object representing the JSON data
    const blob = new Blob([jsonStr], { type: 'application/json' });

    // Create a link element to trigger the download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'openApi.json';
    
    // Append the link to the body and trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);

}

function getUrlData() {
    const inputUrl = document.getElementById("urlInput").value;
    const url = inputUrl;
    baseUrl = getUrlBeforeWhere(url);
    fetchAndProcessJson(url);
}



document.getElementById('getUrl').addEventListener('click', getUrlData)

// Assuming you have a button with id "textBtn", add an event listener to call collectCheckedItems
const textBtn = document.getElementById('getChecked');
textBtn.addEventListener('click', collectCheckedItems);

