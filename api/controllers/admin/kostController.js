const Kost = require('../../models/Kost');
const cloudinary = require('../../config/cloudinary');
const { uploadImage } = require('../../config/cloudinary');

// Get all kost
exports.getAllKost = async (req, res) => {
    try {
        const kosts = await Kost.find();
        res.status(200).json({ success: true, data: kosts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching kost data' });
    }
};

// Get single kost
exports.getKostById = async (req, res) => {
    try {
        const kost = await Kost.findById(req.params.id);
        if (!kost) return res.status(404).json({ success: false, message: 'Kost not found' });
        res.status(200).json({ success: true, data: kost });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching kost data' });
    }
};

// Create new kost
exports.createKost = async (req, res) => {
    try {
        const {
            roomType,
            price,
            totalRooms,
            availableRooms,
            description,
            facilities,
            status,
        } = req.body;

        // Ambil file path dari req.files
        const imagePaths = req.files.map(file => file.path); // atau file.filename jika disimpan di server

        if (!roomType || !price || !totalRooms || !availableRooms || imagePaths.length === 0) {
            return res.status(400).json({ success: false, message: 'Semua field wajib diisi termasuk gambar' });
        }

        const newKost = new Kost({
            roomType,
            price: parseInt(price),
            totalRooms: parseInt(totalRooms),
            availableRooms: parseInt(availableRooms),
            description,
            facilities: facilities ? facilities.split(',').map(f => f.trim()) : [],
            images: imagePaths,
            status: status || 'available',
        });

        const savedKost = await newKost.save();
        res.status(201).json({ success: true, data: savedKost, message: 'Kost created successfully' });
    } catch (error) {
        console.error('Error creating kost:', error);
        res.status(500).json({ success: false, message: 'Error creating kost' });
    }
};

// PUT /kosts/:id
exports.updateKost = async (req, res) => {
    try {
        const updated = await Kost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ success: false, message: 'Kost not found' });

        res.status(200).json({ success: true, data: updated });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// DELETE /kosts/:id
exports.deleteKost = async (req, res) => {
    try {
        const deleted = await Kost.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Kost not found' });

        res.status(200).json({ success: true, message: 'Kost deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};