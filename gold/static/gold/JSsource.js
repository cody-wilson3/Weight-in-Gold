
updateLine = document.querySelector("#updateThis");
equalButton = document.querySelector("#equals");

updateLine.innerText = "fetching the current price of gold";
const myAPI = "kSJ39AFrnjQQhCa6nAYm";

// const theUrl = `https://data.nasdaq.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=kSJ39AFrnjQQhCa6nAYm&limit=1`;
// fetch         ("https://data.nasdaq.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=rERAPrPQm1mA9RrCYUkK%22)

var goldprice = 0;
var theData;
fetch("https://data.nasdaq.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=kSJ39AFrnjQQhCa6nAYm&limit=1")
    .then(response => {
        return response.json();
    })
    .then(json => {
        if (json.error){
            createErrorDiv("nice try, I'm gonna have to use that one.")
        }

        goldprice = json.dataset_data.data[0][1];
        updateLine.innerText = `The current price of Troy Gold is ${goldprice}`;
    })
    .catch(err => {
        // let message = `Request to ${theUrl} didn't work`;
        console.log(err);
        document.querySelector('#updateThis').textContent = err;
    })
    .finally(() => {
        document.querySelector('#updateThis').textContent += "  All done!";
    });


equalButton.addEventListener("click", () => {
    weight = document.getElementById("userWeight");
    currUnit = document.getElementById("unitWeight");

    weightValue = weight.value;
    UnitString = currUnit.value;
    if ((weight.value == "Infinity") || (isNaN(weight.valueAsNumber)) || weight.value < 0) {
        createErrorDiv("Input must be a positive number");
    }
    
    else {
        fetch(`http://localhost:8000/unitconv/convert?from=${UnitString}&to=t_oz&value=${weightValue}`)
            .then(response => {
                updateLine.innerText = 'Converting your weight to Gold'
                return response.json();
            })
            .then(json => {
                newDiv = document.createElement("div");
                newDiv.setAttribute("class", "recentCalcs");
                newDiv.innerText = `Your weight is worth ${formatter.format(json.value * goldprice)} in gold`;
                newDiv.addEventListener("click", (e) => {
                    e.target.remove();
                })
                endBlock = document.getElementById("centeredDiv");
                endBlock.appendChild(newDiv);
            })
            .catch(err => {
                console.log(err);
                document.querySelector('#updateThis').textContent = err;
            })
            .finally(() => {
                statusDiv = document.querySelector('#updateThis');
                statusDiv.textContent += "  All done!";
            });
    }
})

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits:0,
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

function createErrorDiv(errorMessage) {
    let centeredDiv = document.getElementById("centeredDiv");
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "newErrorDiv");
    newDiv.innerText = errorMessage;
    newDiv.addEventListener("click", (e) => { e.target.remove() });
    centeredDiv.appendChild(newDiv);
}