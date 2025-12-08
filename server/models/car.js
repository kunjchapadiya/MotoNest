const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    model: {
        type: String,
        required: true
    },
    brand: {
        type: String,      // ✅ FIXED
        required: true,
        enum: [
            "Audi", "BMW", "Mercedes-Benz", "Porsche", "Ferrari",
            "Lamborghini", "Land Rover", "Bentley", "Rolls-Royce", "Volvo"
        ]
    },
    registrationState: {
        type: String,
        required: true,
        enum: [
            "AP", "AR", "AS", "BR", "CG", "GA", "GJ", "HR", "HP", "JH",
            "KA", "KL", "MP", "MH", "MN", "ML", "MZ", "NL", "OD", "PB",
            "RJ", "SK", "TN", "TS", "TR", "UP", "UK", "WB",
            "AN", "CH", "DN", "DL", "JK", "LA", "LD", "PY"
        ]
    },
    year: {
        type: Number,
        required: true,
        min: 2000,
        max: 2025
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Array,
        required: true,
        default: []
    },
    kmDriven: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true,
        enum: ["Petrol", "Diesel", "Electric", "Hybrid"]
    },
    transmission: {
        type: String,
        required: true,
        enum: ["Manual", "Automatic"]
    },
    owner: {
        type: String,
        required: true,
        enum: ["First", "Second", "Third"]
    },
    color: {
        type: String,
        required: true
    },
    bodyType: {
        type: String,
        required: true,
        enum: ["sedan", "hatchback", "suv", "sport", "coupe"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Car", carSchema);
