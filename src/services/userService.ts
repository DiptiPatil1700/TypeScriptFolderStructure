import User from '../models/User';
import { IUser } from '../interfaces/User';

const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

const updateUser = async (id: string, updateData: Partial<IUser>): Promise<IUser | null> => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  return await User.findByIdAndDelete(id);
};

export default {
  getUserById,
  updateUser,
  deleteUser,
};
