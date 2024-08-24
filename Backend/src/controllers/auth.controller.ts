import bcrypt from 'bcryptjs';
import express, { Request, Response, Router } from 'express';
import User from '../models/user.model';
import generatejwt from '../utils/generateToken';

//Login Method
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    const ismatching = await bcrypt.compare(password, user?.password || '');
    if (!ismatching) {
      return res.status(401).json({ message: 'Invalid Password' });
    }
    generatejwt(user._id, res);
    res.status(200).json({ message: 'Logged in Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

//Signup Method

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, username, password, confirmPass, gender } = req.body;

    //check for password and Confirm Passwords
    if (confirmPass != password) {
      return res.status(400).json({ message: 'Password Dont Match' });
    }

    const user = await User.findOne({ username: username });
    if (user) {
      res.status(400).json({ message: 'user Already exists' });
    }
    //hashing passwordss

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    //assign Randon Profile pic At start
    //https://avatar.iran.liara.run/public/boy
    const boyPfp = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlPfp = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === 'male' ? boyPfp : girlPfp,
    });
    if (newUser) {
      generatejwt(newUser._id, res);
      await newUser.save(); //save New User To Database
      console.log(newUser);
      res
        .status(201)
        .json({
          message: 'User Created Successfully',
          hashedPassword,
          _id: newUser._id,
        });
    } else {
      res.status(400).json({ message: 'NO new User' });
    }
  } catch (error) {
    res.status(500);
  }
};
//Logout Method
export const logout = (req: Request, res: Response) => {
  try {
    res.cookie('JWT', { maxAge: 0 });
    res.status(200).json({ message: 'Logged Out Successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
