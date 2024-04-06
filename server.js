var express = require('express');
var app = express();
var fs = require('fs');
const cors = require('cors');

// const productdata= require('./json/product.json');
app.use(cors({
  origin: "http://localhost:3000",
}))
//Endpoint to get product list and descriptions


//get all products

app.get('/doctor/doctors/', function (req, res) {
    fs.readFile("./json/doctor.json", 'utf8', function (err, data) { 
        res.end(data);
    });
})

app.get('/doctor/doctorsearch', function (req, res) {
    const query = req.query.q;
    const location = req.query.location;

    // Check if both query and location are empty
    if (!query && !location) {
        return res.status(400).json({ error: "Both search query and location are missing" });
    }

    // Read the doctor JSON file
    fs.readFile("./json/doctor.json", 'utf8', function (err, doctorData) {
        if (err) {
            console.error('Error reading doctor JSON file:', err);
            return res.status(500).send('Internal Server Error');
        }

        try {
            doctorData = JSON.parse(doctorData);
            let filteredDoctors = doctorData.SearchList;

            // Filter doctors by query if provided
            if (query) {
                filteredDoctors = filteredDoctors.filter(item =>
                    item.Display_Name.toLowerCase().includes(query.toLowerCase())
                );
            }

            // Filter doctors by location if provided
            if (location) {
                // Read the location JSON file
                fs.readFile("./json/locations.json", 'utf8', function (err, locData) {
                    if (err) {
                        console.error('Error reading location JSON file:', err);
                        return res.status(500).send('Internal Server Error');
                    }

                    try {
                        locData = JSON.parse(locData);
                        const locationData = locData.ZipCodes.find(zip => zip.city.toLowerCase() === location.toLowerCase());

                        if (locationData) {
                            // Filter doctors by location
                            filteredDoctors = filteredDoctors.filter(doctor =>
                                doctor.State === locationData.state_id
                            );
                        }
                        console.log(filteredDoctors);
                        // Return filtered doctors
                        res.json(filteredDoctors);
                    } catch (error) {
                        console.error('Error parsing location JSON data:', error);
                        return res.status(500).send('Internal Server Error');
                    }
                });
            } else {
                // Return filtered doctors if location is not provided
               res.json(filteredDoctors);
            }
        } catch (error) {
            console.error('Error parsing doctor JSON data:', error);
            return res.status(500).send('Internal Server Error');
        }
    });
});

app.get('/doctor/insurances/', function (req, res) {
    fs.readFile("./json/insurance.json", 'utf8', function (err, data) { 
        res.end(data);
    });
})
app.get('/doctor/locations/', function (req, res) {
    fs.readFile("./json/locations.json", 'utf8', function (err, data) { 
        res.end(data);
    });
})
app.get('/doctor/benefit/', function (req, res) {
    fs.readFile("./json/benefits.json", 'utf8', function (err, data) { 
        res.end(data);
    });
})
app.get('/doctor/featured/', function (req, res) {
    fs.readFile("./json/featured.json", 'utf8', function (err, data) { 
        res.end(data);
    });
})
app.get('/doctor/common/', function (req, res) {
    fs.readFile("./json/common.json", 'utf8', function (err, data) { 
        res.end(data);
    });
}),
app.get('/doctor/commontext/', function (req, res) {
    fs.readFile("./json/commontext.json", 'utf8', function (err, data) {  
        res.end(data);
    });
}),
app.get('/doctor/topCard/', function (req, res) {
    fs.readFile("./json/topCard.json", 'utf8', function (err, data) {    
        res.end(data);
    });
})
app.get('/doctor/benefitdoc/', function (req, res) {
    fs.readFile("./json/benefitdoc.json", 'utf8', function (err, data) {     
        res.end(data);
    });
}),
app.get('/doctor/testimonials/', function (req, res) {
    fs.readFile("./json/testimonials.json", 'utf8', function (err, data) {    
        res.end(data);
    });
})
app.get('/doctor/health/', function (req, res) {
    fs.readFile("./json/health.json", 'utf8', function (err, data) {    
        res.end(data);
    });
})
app.get('/doctor/article/', function (req, res) {
    fs.readFile("./json/article.json", 'utf8', function (err, data) {    
        res.end(data);
    });
})
app.get('/doctor/footer/', function (req, res) {
    fs.readFile("./json/footer.json", 'utf8', function (err, data) {    
        res.end(data);
    });
})

//Get images


/* var base64str = base64_encode('./products/images/Product101_Image_1.jpg');
console.log(base64str);
  
function base64_encode(file) {
    return "data:image/jpg;base64,"+fs.readFileSync(file, 'base64');
}
 */


//API for searchbar and product details
app.get('/ecomm/products/:id', (req, resp) => {
  const { id } = req.params;
   const fouduser = productdata.find((user) =>user.id === id);
  resp.send(fouduser)
});


//server Creation to listen at port 9090
var server = app.listen(9090, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Rest Api for Product description", host, port);
})