import express, { Request, Response } from "express";
import User from "../models/user.model";

export const getUsersForSidebar = async (req: any, res: Response) => {
    try {
        const loggedInUserId = req.user?._id; // Ensure req.user exists
        if (!loggedInUserId) return res.status(400).json({ message: 'User not found' });

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } });
        console.log(filteredUsers);
        res.status(200).json(filteredUsers);
    
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
};