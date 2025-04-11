import { HorsesDetailsResponse, HorsesResponse } from "../../models/horse";
import api from "../../services/api";

// Get all horses
export const fetchHorses = async (page = 1): Promise<HorsesResponse> => {
  const response = await api.get<HorsesResponse>(`horses?page=${page}`);
  return response.data;
};

// Get single horse
export const fetchHorseById = async (
  id: number
): Promise<HorsesDetailsResponse> => {
  const response = await api.get<HorsesDetailsResponse>(`horses/${id}`);
  return response.data;
};
