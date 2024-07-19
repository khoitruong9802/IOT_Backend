import { Device } from "../models/DeviceModel.js"

export const getAllDevice = async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json(devices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getDeviceById = async (req, res) => {
  try {
    const device = await Device.findById(req.params.device_id);
    if (!device) {
      return res.status(400).json({ message: "Device not found" });
    }
    res.status(200).json(device);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createDevice = async (req, res) => {
  try {
    const newDevice = req.body;

    const device = new Device(newDevice);
    await device.save();

    res.status(200).json(device);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateDevice = async (req, res) => {
  try {
    const updateDevice = req.body;

    const device = await Device.findByIdAndUpdate(req.params.device_id, req.body, { new: true, runValidators: true });
    if (!device) {
      return res.status(400).json({ message: "Device not found" });
    }

    res.status(200).json(device);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.device_id);
    if (!device) {
      return res.status(400).json({ message: "Device not found" });
    }
    res.status(200).json({ message: "Device deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}