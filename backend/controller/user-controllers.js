'use strict';

import { getDatabase, ref, push, get, remove, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebase.js";
import User from "../models/user-models.js"


const app = initializeApp(firebaseConfig)
const db = getDatabase(app);

export const addUser = async (req, res, next) => {
  try {
    const { id, nama, alamat, umur } = req.body;
    const newUser = new User(id, nama, alamat, umur);
      
    const usersRef = ref(db, 'users');
    await push(usersRef, newUser);

    res.status(201).send('Record saved successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const userRef = ref(db, `users/${id}`);
    
    await update(userRef, req.body);
    
    res.status(200).send('Data updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getUserAll = async (req, res, next) => {
  try {
    const userRef = ref(db, 'users');
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).send('Data Kosong');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const userRef = ref(db, `users/${id}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      res.status(200).json(snapshot.val());
    } else {
      res.status(404).send('Client Tidak Tersedia');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params; 
    const userRef = ref(db, `users/${id}`);
    
    await remove(userRef);
    
    res.status(200).send('Client deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
