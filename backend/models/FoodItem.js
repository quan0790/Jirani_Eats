import mongoose from 'mongoose';


const foodItemSchema = new mongoose.Schema({
title: { type: String, required: true },
description: { type: String },
quantity: { type: Number, default: 1 },
unit: { type: String, default: 'portion' },
pickupLocation: {
address: { type: String },
lat: { type: Number },
lng: { type: Number }
},
isAvailable: { type: Boolean, default: true },
postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
createdAt: { type: Date, default: Date.now }
});


const FoodItem = mongoose.model('FoodItem', foodItemSchema);
export default FoodItem;