
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('popout').style.display = 'none';
    //fetching country details from API
    function fetchData() {
        fetch('https://restcountries.com/v3.1/all')
            .then(resp => resp.json())
            .then(data => renderCountries(data))
    }
    //Populate cards with country details
    function renderCountries(data) {
        for (const q of data) {            
            const countryUL = document.querySelector('#country-list');
            //Create all necessary elements
            const countryLi = document.createElement('div');           
            const p = document.createElement('p');
            const footer = document.createElement('footer');
            const br = document.createElement('br');
            const hr = document.createElement('hr')
            const flag = document.createElement('img');
            const region = document.createElement('p');
            const country = document.createElement('h5');
            const population = document.createElement('p');
            const btn = document.createElement("button");

            //Add appropriate classes and ids. Grab data and insert if needed.
            countryLi.className = 'card col-10 m-2 div-align';            
            p.className = 'mb-0';
            region.className = 'mb-0';                 
            countryLi.dataset.id = q.area;          
            flag.src = q.flags.png;
            flag.height = '50';
            flag.width = '50';            
            btn.className = 'btn btn-primary';            

            //Grab data and insert it into created elements
            if (typeof q.capital != "undefined") {
                p.innerHTML = "Capital : " + q.capital[0];
            } else {
                p.innerHTML = "Capital : Not Available";
            }            
            if (typeof q.capital != "undefined") {
                region.innerHTML = "Region : " + q.region;
            } else {
                region.innerHTML = "Region : Not Available";
            }            
            if (typeof q.country != "undefined" || typeof q.country != null) {
                country.innerHTML = q.name.common;
            } else {
                country.innerHTML = "Not Available";
            }
            if (typeof q.flags.png != "undefined" || typeof q.flags.png != null) {
                flag.innerHTML = q.flags.png;
            } else {
                flag.innerHTML = "Not Available";
            }            
            population.innerHTML = "Population : " + q.population;         
            btn.innerHTML = "Check Weather";
            btn.addEventListener('click', () => {
                getpopupdata(q.name.common);
            })

            //Append everything to main container           
            countryUL.appendChild(countryLi);
            countryLi.append(country);
            countryLi.append(flag);
            countryLi.append(p);
            countryLi.append(region);
            countryLi.append(population);
            countryLi.append(btn);
        }
    }
    function getpopupdata(q) {
        document.getElementById('popout').style.display = 'flex';
        document.getElementById('country-list').style.opacity = '0.7';        
        const api = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&appid=e855875d86159eccde0fb44231644630";
        fetch(api).then(response => response.json()).then((data) => {
            var country_name = data.name;
            var country_temp = data.main['temp'];
            var country_wind = data.wind['speed'];
            var country_humidity = data.main['humidity'];
            //Grab data and insert it into created elements           
            document.getElementById("span_country_name").innerHTML = country_name;
            document.getElementById("span_humidity").innerHTML = country_humidity;
            document.getElementById("span_country_wind").innerHTML = country_wind;
            document.getElementById("span_country_temp").innerHTML = country_temp;
        }).catch(err => {
            alert(err);
        })
    }
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.getElementById('popout').style.display = 'none';
    })
    //Call the function that will automatically run renderCountry() also 
    fetchData();
})

