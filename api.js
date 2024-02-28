
require('dotenv').config(); // Cargar variables de entorno desde .env
const axios = require('axios');

const API_KEY = process.env.API_KEY;
const API_URL = 'https://api-test.envia.com/ship/generate/';

const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
};

async function generarGuia(data) {
    const { strContent, intAmount, strNameOrigin, strNameDestination } = data;
    const amount = parseInt(intAmount);
    // console.log(strContent, intAmount)
    const bodydata = {
            origin: {
                name: strNameOrigin,
                company: "oskys factory",
                email: "osg2osf8@gmail.com",
                phone: "8116300800",
                street: "av vasconcelos",
                number: "1400",
                district: "mirasierra",
                city: "Monterrey",
                state: "NL",
                country: "MX",
                postalCode: "66236",
                reference: ""
            },
            destination: {
                name: strNameDestination,
                company: "empresa two",
                email: "osg2osf8@gmail.com",
                phone: "8116300800",
                street: "av vasconcelos",
                number: "1400",
                district: "palo blanco",
                city: "monterrey",
                state: "NL",
                country: "MX",
                postalCode: "66240",
                reference: ""
            },
            packages: [
                {
                    content: strContent,
                    amount: amount,
                    type: "box",
                    dimensions: {
                        length: 2,
                        width: 5,
                        height: 5
                    },
                    weight: 63,
                    insurance: 0,
                    declaredValue: 400,
                    weightUnit: "KG",
                    lengthUnit: "CM"
                }
            ],
            shipment: {
                carrier: "fedex",
                service: "ground",
                type: 1
            },
            settings: {
                printFormat: "PDF",
                printSize: "STOCK_4X6",
                comments: "comentarios de el envío"
            }
        };

    
    try {
        const response = await axios.post(API_URL, bodydata, { headers });
        return response.data;
    } catch (error) {
        console.error('Error generando guía:', error);
        throw error;
    }
}

module.exports = { generarGuia };