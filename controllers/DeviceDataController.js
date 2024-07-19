import { DeviceData } from "../models/DeviceDataModel.js"

export const getAllDeviceData = async (req, res) => {
  try {
    const deviceDatas = await DeviceData.find();
    res.status(200).json(deviceDatas);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getDeviceDataById = async (req, res) => {
  try {
    const deviceData = await DeviceData.findById(req.params.deviceData_id);
    if (!deviceData) {
      return res.status(400).json({ message: "DeviceData not found" });
    }
    res.status(200).json(deviceData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createDeviceData = async (req, res) => {
  try {
    const newDeviceData = req.body;

    const deviceData = new DeviceData(newDeviceData);
    await deviceData.save();

    res.status(200).json(deviceData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateDeviceData = async (req, res) => {
  try {
    const updateDeviceData = req.body;

    const deviceData = await DeviceData.findByIdAndUpdate(req.params.deviceData_id, req.body, { new: true, runValidators: true });
    if (!deviceData) {
      return res.status(400).json({ message: "DeviceData not found" });
    }

    res.status(200).json(deviceData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteDeviceData = async (req, res) => {
  try {
    const deviceData = await DeviceData.findByIdAndDelete(req.params.deviceData_id);
    if (!deviceData) {
      return res.status(400).json({ message: "DeviceData not found" });
    }
    res.status(200).json({ message: "DeviceData deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}