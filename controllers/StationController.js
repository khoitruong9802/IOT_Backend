import { Station } from "../models/StationModel.js"

export const getAllStation = async (req, res) => {
  try {
    const stations = await Station.find();
    res.status(200).json(stations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.station_id);
    if (!station) {
      return res.status(400).json({ message: "Station not found" });
    }
    res.status(200).json(station);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const createStation = async (req, res) => {
  try {
    const newStation = req.body;

    const station = new Station(newStation);
    await station.save();

    res.status(200).json(station);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateStation = async (req, res) => {
  try {
    const updateStation = req.body;

    const station = await Station.findByIdAndUpdate(req.params.station_id, req.body, { new: true, runValidators: true });
    if (!station) {
      return res.status(400).json({ message: "Station not found" });
    }

    res.status(200).json(station);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.station_id);
    if (!station) {
      return res.status(400).json({ message: "Station not found" });
    }
    res.status(200).json({ message: "Station deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}