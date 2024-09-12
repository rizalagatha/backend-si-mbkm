const Dosbing = require('../models/dosbing');

// Create a new Dosbing
const createDosbing = async (req, res) => {
  const { NIP_dosbing, nama_dosbing } = req.body;
  try {
    const dosbing = await Dosbing.create({
      NIP_dosbing,
      nama_dosbing
    });
    res.status(201).json({ message: 'Dosbing created successfully', dosbing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Dosbing
const getAllDosbing = async (req, res) => {
  try {
    const dosbing = await Dosbing.findAll();
    res.status(200).json(dosbing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Dosbing by NIP
const getDosbingByNIP = async (req, res) => {
  const { NIP_dosbing } = req.params;
  try {
    const dosbing = await Dosbing.findByPk(NIP_dosbing);
    if (dosbing) {
      res.status(200).json(dosbing);
    } else {
      res.status(404).json({ message: 'Dosbing not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Dosbing
const updateDosbing = async (req, res) => {
  const { NIP_dosbing } = req.params;
  const { nama_dosbing } = req.body;
  try {
    const [updated] = await Dosbing.update(
      { nama_dosbing },
      { where: { NIP_dosbing } }
    );
    if (updated) {
      const updatedDosbing = await Dosbing.findByPk(NIP_dosbing);
      res.status(200).json({ message: 'Dosbing updated successfully', updatedDosbing });
    } else {
      res.status(404).json({ message: 'Dosbing not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Dosbing
const deleteDosbing = async (req, res) => {
  const { NIP_dosbing } = req.params;
  try {
    const deleted = await Dosbing.destroy({ where: { NIP_dosbing } });
    if (deleted) {
      res.status(204).json({ message: 'Dosbing deleted successfully' });
    } else {
      res.status(404).json({ message: 'Dosbing not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createDosbing,
  getAllDosbing,
  getDosbingByNIP,
  updateDosbing,
  deleteDosbing
};
